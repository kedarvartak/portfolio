---
title: Not Breaking Certificate-Pinned Apps
date: 2026-06-23
excerpt: Why passive key logging is invisible to certificate pinning, and what visibility looks like for apps outside our scope.
---

# Not Breaking Certificate-Pinned Apps

## The short version

In our design, pinning never applies, so a pinned app like Apple Music **cannot break under
our capture layer** — because there is no capture layer in its path. We do passive key
logging plus read-only packet copying. We never terminate TLS, never present a certificate,
and never impersonate a server. The pinned app does its own normal handshake with the real
server and is satisfied. The only thing pinning defends against is a man-in-the-middle, and
we are never the man in the middle.

This means the usual hard problem — "detect that a flow is pinned and route it differently so
you don't break it" — is something we **do not have to solve at all**. Every flow is handled
the same passive way. There is no path in which we inject a certificate that a pinned app
could reject.

## The asymmetry that makes this safe

| Approach | In the connection's path? | Pinned app result |
|----------|---------------------------|-------------------|
| Active MITM proxy (terminate TLS with own cert) | Yes | **Breaks** — app rejects the cert, handshake fails |
| Our passive key logging | No | **Works normally** — app never sees us |

Because only active interception breaks pinning, and we never do active interception,
"don't break the pinned app" reduces to one fact: we are passive.

## The right outcome when you cannot safely read a flow

The governing principle: **fail closed on capture, fail open on connectivity.** Losing
visibility into a flow is acceptable; breaking the user's app is not. Availability on the
user's machine takes precedence; capture is best-effort.

When a flow cannot be read, you do not go dark and you do not escalate to something invasive.
You record the honest metadata you can see without decryption and label it, for example:

```
app=Music.app host=*.apple.com bytes=1.2MB status=ENCRYPTED_NOT_CAPTURED reason=PINNED_NATIVE_TLS
```

That turns "we don't know" into "this app talked to this host, this many bytes, contents not
read, here is why" — an auditable fact, with the app fully intact.

## Can we track something like Apple Music?

Not its contents — and that is expected, not a failure.

| Question | Answer |
|----------|--------|
| Can we read Apple Music's traffic? | **No.** It is a native macOS app on Secure Transport / Network.framework, not Chromium. It does not honor `SSLKEYLOGFILE`, so no keys are ever written for us to use. It is also pinned and SIP-protected. |
| Do we break it? | **No.** We are passive, so it keeps working normally — we simply have no readable copy. |
| What is the ceiling for an app like this? | Metadata only — which host it contacted, byte counts, timing — recorded without decryption and labelled with a reason. Never its plaintext, on any passive method. |

Apple Music sits firmly outside our scope. Keyhole is built for Chromium-based desktop apps
(Claude desktop, Codex desktop, ChatGPT desktop), which write their keys via
`SSLKEYLOGFILE`. A native, pinned, SIP-protected app writes no keys, so there is nothing to
decrypt — but because our method is passive, the correct and automatic outcome is that it
keeps running untouched and simply does not appear, decrypted, in the log.

---

**Next:** [Tying a Decrypted Flow Back to Its Process](/writeups/third)
