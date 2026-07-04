---
title: Glassbox: Making AI Agent Context Observable
date: 2026-07-04
excerpt: How Glassbox finds provably dead context in coding-agent sessions and removes it with a validated, lossless fork instead of a lossy summary.
---

# Glassbox: Making AI Agent Context Observable

Coding agents expose the conversation, but not the actual shape of the context window. After a long session, the model may still be carrying deleted files, outdated reads, superseded copies, and byte-identical duplicates. That invisible residue consumes tokens and gets ingested again on every turn.

[Glassbox](https://github.com/kedarvartak/glassbox) is a local-first inspector and cleaner for that problem. It reconstructs the context resident in a Claude Code transcript, explains where the tokens came from, identifies content that is provably dead, and writes a cleaned sibling session that can be resumed safely.

![Excalidraw-style overview of the Glassbox context analysis pipeline](/glassbox/context-pipeline.svg)

## The core idea: remove facts, not meaning

Most context compaction starts with a model-generated summary. That can shrink almost anything, but it is necessarily interpretive: details the summarizer considers unimportant disappear.

Glassbox takes a narrower approach. It only removes content when it can establish why that content is no longer useful.

| Classification | Proof | Example |
| --- | --- | --- |
| `gone` | The referenced file no longer exists on disk | A large read from a generated file that was deleted |
| `stale-drift` | The file changed after the captured read | The session carries an older version than the repository |
| `stale-superseded` | A later read of the same path replaced the older copy | The agent read one file four times while editing it |
| `duplicate` | The resident bytes have the same hash | The same tool result appears more than once |
| `spent` | The output appears to be one-shot and was not referenced again | A transient command result; detected, but opt-in because this is inferred |

The distinction between proof and inference matters. The first four classes are eligible for the default lossless fork. `spent` is visible to the user, but excluded by default because “not referenced again” is a heuristic rather than a structural fact.

## What the benchmark found

The current corpus covers 57 real Claude Code sessions of at least 150 KB, with 2.3 million context tokens in total.

| Metric | Result |
| --- | ---: |
| Provably reclaimable context | 1.37M tokens — 59.5% |
| Net reclaimed after tombstones | 1.29M tokens — 55.9% |
| Resident copies tombstoned | 2,051 |

One session went from 146.5k to 79.7k context tokens: 66,788 net tokens reclaimed, or a 46% lighter working context. Provider-reported token counts are used where available; individual segment sizes are shown as local estimates.

These numbers do not claim that every coding-agent session wastes half its window. They show that large, long-running sessions can accumulate a material amount of content whose redundancy is mechanically demonstrable.

## Architecture: raw transcript in, neutral model out

Glassbox is organized as a TypeScript monorepo with a one-way data flow. The Claude Code adapter owns knowledge of raw JSONL; analysis operates on a tool-neutral model; the CLI renders results and owns filesystem writes.

| Package | Responsibility | I/O boundary |
| --- | --- | --- |
| `core` | Neutral types for sessions, messages, tool calls, file operations, snapshots, and segments | No filesystem I/O |
| `adapter-claude-code` | Parse raw events, fork transcripts, and validate resume invariants | Understands Claude Code JSONL |
| `analysis` | Reconstruct context, classify segments, plan eviction, and calculate cost | Reads repository state through a port |
| `store` | Index parsed sessions in SQLite and watch for updates | Local index only |
| `cli` | Dispatch commands, render ANSI reports, and write validated forks | The only session-writing surface |

This separation makes another adapter possible without rewriting the detector or cost model. A future coding-agent integration needs to translate its transcript into the same core representation and implement its own safe fork semantics.

## Why cleanup creates a fork

Deleting transcript blocks directly is unsafe. Anthropic messages require each `tool_use` block to retain a matching `tool_result`, and resume logic also depends on parent links and valid JSONL structure.

Glassbox therefore replaces only the heavy payload with a short tombstone. Message order, tool-call pairing, and the rest of the transcript remain intact.

![Excalidraw-style comparison of destructive deletion, summary compaction, and a Glassbox lossless fork](/glassbox/lossless-fork.svg)

The fork pipeline has explicit gates:

| Stage | Input → output | Safety property |
| --- | --- | --- |
| Parse | Raw JSONL → neutral `Session` | Malformed events are surfaced before analysis |
| Analyze | Session + repository state → classified snapshot | Removal classes carry an explicit reason |
| Plan | Reclaimable report → `EvictionPlan` | Only enabled classes enter the plan |
| Fork | Raw transcript + plan → cleaned text | Original session is never opened for writing |
| Validate | Original and fork → invariant reports | No new orphan, dangling parent, empty content, or invalid JSON issue |
| Re-parse | Written sibling → `Session` | Final proof that the output remains loadable |

For reads, both the `tool_result.content` and its mirrored `toolUseResult` are stubbed so the payload cannot inflate again during resume. For writes and edits, large input fields such as `content`, `new_string`, and batched `edits` are replaced. Lines unrelated to an eviction pass through byte-for-byte.

## Observability before action

The cleaner is only one part of the tool. Glassbox first gives the user a way to inspect the window and decide whether cleanup is justified.

| Command | What it answers |
| --- | --- |
| `glassbox inspect <session>` | What is in this session, what costs tokens, and what is reclaimable? |
| `glassbox xray <session>` | Which sources and classifications dominate the window? |
| `glassbox cost <session>` | What did the provider report, and how is spend distributed? |
| `glassbox clean <session>` | What would be removed? Dry-run by default. |
| `glassbox clean <session> --fork` | Can a validated cleaned sibling be written? |
| `glassbox sessions` | Which indexed sessions are available? |
| `glassbox index` / `watch` | Can the local session index be built or updated continuously? |

That order is intentional: measure, explain, preview, then write a new artifact.

## Lossless is a structural claim

“Lossless” here has a precise scope. Glassbox preserves every segment not proven dead by the enabled rules, keeps the transcript’s resume structure valid, and leaves the original untouched. It does not claim that an arbitrary semantic classifier can know everything a model might find useful.

That is also why the project has a compaction bench. The implemented recall-fidelity evaluation generates questions about evicted blocks, replays them against the original and cleaned sessions, and uses an eviction-aware judge to classify the answers as equivalent, partial, or degraded. A stronger task-performance evaluation—comparing how both sessions complete the same coding task—is documented as future work rather than presented as finished.

## Why this matters beyond Claude Code

Agent systems are becoming long-lived engineering environments. Their memory needs the same qualities we expect from other infrastructure: visibility, explicit data lineage, conservative mutation, and validation at write boundaries.

Glassbox’s current adapter targets Claude Code, but the larger idea is tool-neutral: reconstruct the operational context, distinguish proof from guesswork, and make context maintenance inspectable. The best context window is not merely larger. It is one whose contents you can account for.

Source and installation instructions are available in the [Glassbox repository](https://github.com/kedarvartak/glassbox).
