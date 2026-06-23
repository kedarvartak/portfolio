---
title: Coverage Matrix: Which Apps Keyhole Can See
date: 2026-06-23
excerpt: A TLS-stack breakdown of which apps honor SSLKEYLOGFILE and the traps that catch you when you assume they all do.
---

# Coverage Matrix: Which Apps Keyhole Can See

## The matrix

| Category | Example | TLS stack | `SSLKEYLOGFILE` | Notable trap |
|----------|---------|-----------|:---------------:|--------------|
| Chromium browser | Chrome, Brave, Edge | static BoringSSL | **Yes** | If the browser is already running, a new launch hands off to the existing process and ignores the variable. The network-service process egresses all tabs under one PID. |
| Firefox | Firefox | NSS | **Yes** | Different library, same variable. |
| Electron desktop app | Claude desktop, Codex desktop, ChatGPT desktop, Slack, Discord, VS Code | bundled BoringSSL | **Yes** | Single-instance apps hand off to a running instance and ignore the variable — fully quit first. A hardened build could strip the callback. |
| `curl` (Linux/macOS) | curl over OpenSSL or GnuTLS | dynamic OpenSSL / GnuTLS | **Yes** | Works only because curl wired it. |
| `curl` (Windows, built-in) | Windows 10/11 `curl.exe` | **Schannel** | **No** | Major trap: the same `curl` command works on Linux but not on Windows, because the Windows build uses Schannel, which has no key log. |
| Other GnuTLS tools | wget, some apt tooling | GnuTLS | **Yes** | Version-dependent. |
| Node CLIs | npm, and most Node-based agents | OpenSSL statically in node | **No** | The #1 trap: "it's OpenSSL, so the switch works" is false. Node never wired the variable. Needs `--tls-keylog`, the `keylog` event, or eBPF. |
| Python tools | requests, httpx, the openai SDK | CPython `ssl` over OpenSSL | **No** | `SSLContext.keylog_filename` exists but is not read from the environment. Same OpenSSL-assumption trap. |
| Go CLIs | docker, kubectl, gh, terraform, ollama | pure-Go `crypto/tls` | **No** | Not OpenSSL at all. Own TLS stack ignores the variable; eBPF is the fallback and Go's register ABI makes uprobes hard. |
| Rust CLIs | rustls-based tools | rustls | **Partial** | `rustls::KeyLogFile` reads the variable only if the app constructs it; most don't. Inconsistent by design. |
| Java / JVM | Gradle, JetBrains IDEs, JVM services | JSSE | **No** | Own stack; ignores the variable. Needs a Java agent or `-Djavax.net.debug`. |
| .NET | desktop and service apps | SChannel (Windows) / OpenSSL (Linux) | **No** | SChannel has no portable key log. |
| Native macOS apps | Apple Music, Mail, App Store | Secure Transport / Network.framework | **No** | No key log. Also pinned and SIP-protected — out of scope for any passive method. |
| Native Windows apps | Store apps, many native | SChannel | **No** | No portable in-process key log. |
| SSH / SCP / SFTP | ssh, scp, rsync-over-ssh | SSH protocol, not TLS | **No** | Not TLS at all — `SSLKEYLOGFILE` is irrelevant. Common surprise when "capturing a terminal." |
| Server-side SaaS AI | Notion AI, Einstein, cloud Copilot | off-device | **No** | The model call never reaches the device; nothing to capture on the endpoint. |

## The traps, called out

- **"It uses OpenSSL, so it works" is false.** Having the library isn't enough — the app must also turn the switch on, and Node/Python don't.
- **curl gives two different answers.** Same command works on Linux (OpenSSL), fails on Windows (Schannel) — the TLS backend decides, not the command.
- **An app already running is missed.** Re-launching just wakes the old instance, which never saw the variable, so the log stays empty — always fully quit first.
- **A terminal captures nothing by itself.** You're capturing the program you run inside it, and `ssh`/`scp` aren't even TLS, so they're out entirely.
- **Go is its own world.** The biggest CLI family (docker, kubectl, gh) silently ignores the switch because it doesn't use OpenSSL at all.

## How this maps to our scope

Keyhole targets the rows marked **Yes** in the Electron and Chromium categories — the sealed
desktop apps (Claude desktop, Codex desktop, ChatGPT desktop) that bundle BoringSSL and honor
the switch. The matrix is derived from each app's TLS linkage, which is what determines the
outcome — not from the app's name or category.

---

**Next:** [Context Bloat as a Fleet Signal](/writeups/context-bloat-signal)
