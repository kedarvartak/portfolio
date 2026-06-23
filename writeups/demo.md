---
title: "Extra — Windows Demo: Capturing Claude Desktop Traffic"
date: 2026-06-23
excerpt: Step-by-step: build the binary, log TLS keys, capture with pktmon, and read your own chat messages from the Claude desktop app.
---

# Windows Demo: Capturing Claude Desktop Traffic

> **Extra:** End-to-end walkthrough of the scoped Windows capture — from building the binary through reading your own Claude desktop chat in plaintext.

Capture and decrypt a single Chromium desktop app (e.g. Claude desktop) on Windows.
Run an **elevated** PowerShell (Run as administrator) — `pktmon` requires it.

---

## 0. Build the binary (once)

```powershell
cd keyhole\engine
go build -o ..\keyhole.exe .
cd ..
```

![go build](/keyhole/go-build.png)

---

## 1. Allow scripts for this session

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

---

## 2. Turn on key logging, then sign out / in

The Store (MSIX) build of Claude desktop only picks up environment variables from the
**login environment**, so set it persistently and refresh the session once.

```powershell
[Environment]::SetEnvironmentVariable('SSLKEYLOGFILE', "$env:TEMP\ai-sslkeys.log", 'User')
```

**Sign out of Windows and sign back in** (or reboot), then re-open an elevated PowerShell.

![set env](/keyhole/set-env.png)

---

## 3. Force TCP so traffic can be decoded

Keyhole decodes HTTP/2 over TCP. By default Chromium apps prefer QUIC (HTTP/3 over UDP/443),
which keyhole cannot read. This rule blocks only **UDP on port 443** and leaves TCP/443
untouched:

```
TCP 443  (HTTPS: HTTP/1.1, HTTP/2)  → untouched, works as before
UDP 443  (QUIC / HTTP-3)            → blocked → Chromium falls back to TCP/443 automatically
```

```powershell
New-NetFirewallRule -DisplayName "Block QUIC 443" -Direction Outbound `
  -Protocol UDP -RemotePort 443 -Action Block
```

**Is this safe?**

| Traffic | Affected? |
|---------|-----------|
| DNS, NTP, WebRTC, games, most VPNs (any UDP port other than 443) | No — rule only matches port 443 |
| QUIC / HTTP-3 in browsers and Electron apps | No break — designed to fall back to TCP/443 |
| A VPN tunneling over UDP/443 with no TCP fallback (e.g. some SSL-VPNs, WARP) | Could break — remove the rule while on that VPN |

The rule is **reversible** — remove it in step 7 once the capture is done.

---

## 4. Capture

Fully quit Claude first: right-click the tray icon → **Quit**, then confirm in Task Manager
that no Claude processes remain.

![task manager](/keyhole/claude-task-manager.png)

Start the capture from `F:\oximy\keyhole` (or wherever you cloned the repo):

```powershell
pktmon start --capture --pkt-size 0 --file-name "$env:TEMP\ai-capture.etl"
```

![pktmon start](/keyhole/pktmon-start.png)

Open Claude from the Start menu, send a message, and wait for the full reply.

![claude input](/keyhole/claude-input.png)

Then stop the capture and convert:

```powershell
pktmon stop
pktmon etl2pcap "$env:TEMP\ai-capture.etl" -o "$env:TEMP\ai-capture.pcapng"
```

![pktmon stop](/keyhole/pktmon-stop.png)

---

## 5. Decode

```powershell
.\keyhole.exe -pcap "$env:TEMP\ai-capture.pcapng" `
              -keylog "$env:TEMP\ai-sslkeys.log" `
              -filter claude -v > decoded.txt 2> diag.txt
```

---

## 6. Find your chat in the output

```powershell
# find the completion request (holds your prompt and Claude's reply):
Select-String -Path decoded.txt -Pattern 'chat_conversations/[0-9a-f-]+/completion'

# or search for exact words you typed:
Select-String -Path decoded.txt -Pattern 'hello'
```

The `>>> REQUEST` line holds the request body (`"prompt":"..."`); the paired `<<< RESPONSE`
below it is Claude's reply.

![hi prompt result](/keyhole/hi-prompt.png)

![full result](/keyhole/result.png)

---

## 7. Cleanup

These files hold a session token and your prompt — remove them when done.

```powershell
Remove-NetFirewallRule -DisplayName "Block QUIC 443"
[Environment]::SetEnvironmentVariable('SSLKEYLOGFILE', $null, 'User')
Remove-Item "$env:TEMP\ai-sslkeys.log", "$env:TEMP\ai-capture.etl", `
            "$env:TEMP\ai-capture.pcapng", decoded.txt, diag.txt `
            -ErrorAction SilentlyContinue
```

---

## Gotchas

| Issue | Fix |
|-------|-----|
| `pktmon` "cannot find the file specified" | Not elevated — run PowerShell as admin. |
| Key log stays 0 bytes | Variable wasn't set before the app started. Confirm with `[Environment]::GetEnvironmentVariable('SSLKEYLOGFILE','User')`, then sign out/in. |
| App was already running | Single-instance hand-off ignores the variable — fully quit first. |
| Lots of `no logged keys`, little decoded | Traffic was QUIC — confirm the Block QUIC 443 rule exists and Claude was restarted after it was added. |
| `-filter` returned nothing | Always give `-filter` a value (`-filter claude`) or omit it entirely. |

---

**Future scope:** [From Scoped to Global Capture](/writeups/fifth)
