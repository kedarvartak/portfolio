---
title: "Q3 — Always Tie a Captured Flow to Its App: Where It Gets Hard and What Breaks Naive Approaches"
date: 2026-06-23
excerpt: Identity is free when you launch the app yourself. Here is the join needed when many apps are captured at once.
---

# Tying a Decrypted Flow Back to Its Process

> **Q3:** Always tie a captured flow to its app/process. A keylog file gives you keys but no identity. How do you guarantee every decrypted flow maps back to the exact process and binary that sent it, including short-lived connections? Tell me where this gets hard and what breaks naive approaches.

## The problem

A key log gives you keys (keyed by `client_random`), and a capture gives you 4-tuples. Neither
says *which binary* sent the flow. Decryption tells you what was said, not who said it.

## Today: identity comes from scope

Keyhole observes **one desktop app at a time**. We launch that app ourselves with
`SSLKEYLOGFILE` set, so the only keys and flows in the log are its own, and we separate output
by host (`:authority`). Identity is trivial because we already know the one app we
launched — there is nothing to disambiguate.

## If we go global: one join, one rule

Once many apps are captured at once (see the future scope post), identity needs an explicit join:

```
client_random  ->  4-tuple  ->  PID  ->  signed binary
```

The capture gives both the `client_random` (to find the keys) and the 4-tuple (to find the
process); the OS tells you which process owned that socket; that names the binary.

## Why the shortcuts break

| Shortcut | Why it fails | Fix |
|----------|--------------|-----|
| Poll `/proc/net/tcp` | misses sockets that open and close between polls | capture at `connect()` |
| `4-tuple -> PID` map | ports get reused by another process | key on `(4-tuple, time)` |
| PID as identity | PIDs recycle to a different binary | key on `(PID, start-time)` |
| Read exe later | short process already exited | hash the binary at connect |
| Trust the socket owner | a broker (browser network service, VPN) owns it for others | report the broker honestly |

## Summary

Right now, identity is free because we are scoped to a single launched app. To attribute every
flow across many apps, bind each connection to its owning process at socket-creation time and
key it on time — that is the whole guarantee, and every polling- or PID-only shortcut breaks
on short-lived connections, port reuse, or PID recycling.

---

**Next:** [Coverage Matrix: Which Apps Keyhole Can See](/writeups/fourth)
