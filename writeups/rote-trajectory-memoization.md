---
title: Rote: Memoizing Agent Trajectories Instead of Re-Deriving Them
date: 2026-07-04
excerpt: A technical look at Rote's tool-boundary recorder, typed playbook DAG, assertion-gated executor, environment fingerprints, and planned self-healing repair loop.
---

# Rote: Memoizing Agent Trajectories Instead of Re-Deriving Them

An agent can solve the same class of task twice and pay almost the full discovery cost both times. It searches for the same files, probes the same tools, hits the same dead ends, and asks the model to choose every next action again. The first run produced a valuable artifact—the procedure—but most harnesses preserve only the conversation or a few extracted facts.

[Rote](https://github.com/kedarvartak/rote) is an experiment in **trajectory memoization**: capture a successful agent run, turn its essential procedure into a parameterized and assertion-gated playbook, and replay that playbook without putting an LLM planner in the control loop for every step.

The computer-science analogy is memoization with a stronger invalidation policy. The expensive computation is exploration. The cache key combines task class with an environment fingerprint. The cached value is an executable step DAG. Assertions, verification, scoped repair, and full-agent fallback replace a simple TTL.

![Excalidraw diagram separating the read, write, and reuse paths of an agent harness](/rote/reuse-path.svg)

## The missing reuse path

Agent-efficiency systems usually optimize one of two paths. Rote is aimed at a third.

| Path | What it preserves | What it saves | What still happens next run |
| --- | --- | --- | --- |
| Read path | A compressed representation of logs, tool output, or conversation | Input tokens | The agent still plans and executes the procedure again |
| Write path | Semantic facts and preferences across sessions | Re-discovery of knowledge | The model still interprets those facts and controls each step |
| Reuse path | The executable procedure that produced a successful outcome | Planning calls, dead-end tools, latency, and their tokens | Only matching, essential steps, slot fills, assertions, and verification |

Compression and semantic memory remain useful. Rote sits at a different layer and composes with both: compression reduces what the model reads; memory restores what it should know; trajectory reuse avoids asking it to rediscover what to do.

## Why the tool-call boundary is load-bearing

Rote records at the harness’s tool-dispatch boundary, not at the LLM API boundary. A model request contains tokens. A tool call contains structure: a tool name, typed arguments, a result, timing, errors, and an observable relationship with later calls.

That difference determines what can be compiled.

| LLM API boundary | Tool-call boundary |
| --- | --- |
| Flat prompt and completion streams | Named operations with structured arguments |
| Can compress text | Can identify and skip operations |
| Dependencies must be inferred from prose | Results can be traced into later arguments |
| Cannot directly assert an external side effect | Can check the state produced by each action |

The implemented recorder is an MCP stdio proxy. It starts a downstream MCP server, forwards JSON-RPC lines unchanged, and correlates `tools/call` requests with responses by ID. Forwarding happens before recording so observability does not gate the client’s result.

For every correlated call, the recorder appends a `TrajectoryEvent` containing the run ID, monotonic sequence, timestamp, tool, arguments, result digest, duration, and any error. Large outputs spill into a content-addressed blob directory instead of bloating the event log. A `RunManifest` captures the task spec, outcome, time range, token-usage sidecars, and environment fingerprint.

![Existing Excalidraw architecture diagram from the Rote repository](/rote/architecture.svg)

## The repository as it exists today

Rote’s architecture is deliberately larger than its current implementation. Keeping that boundary explicit matters more than presenting a roadmap as a finished product.

| Capability | Current state | Important detail |
| --- | --- | --- |
| Typed core model | Built | Zod schemas and TypeScript types for trajectories, manifests, fingerprints, playbooks, patches, expectations, and token usage |
| MCP recorder | Built | Transparent JSON-RPC forwarding, append-only trajectories, blob spill, and session fingerprints |
| Replay executor | Built | Topological DAG execution, deterministic/slot/judgment steps, parameter binding, retries, expectations, final verification, and fallback result |
| Run inspection CLI | Built | Lists recorded runs and renders run detail |
| Automated benchmark harness | Next milestone | Must measure warm replay against a cache-adjusted cold baseline |
| Semantic matcher | Planned | Hard fingerprint gate, then semantic shortlist and typed parameter binding |
| Automatic distiller | Planned | Causal pruning, parameterization, assertion synthesis, and shadow validation |
| Scoped repair and patch history | Planned | Current `repair` policy safely degrades to fallback rather than pretending repair exists |

The current repository has 28 test files across the core, recorder, executor, and CLI packages. The build order is intentional: prove that hand-written playbooks and the executor can deliver the economics before building an LLM compiler that generates playbooks.

## The playbook is the reusable unit

A Rote playbook is not a prompt containing instructions. It is a versioned, auditable DAG with typed parameters, explicit dependencies, constrained LLM slots, per-step postconditions, and an end-to-end verification plan.

![Excalidraw diagram of the anatomy of a Rote playbook](/rote/playbook-anatomy.svg)

| Playbook field | Role |
| --- | --- |
| Task signature | Describes the task class and environment in which replay is valid |
| Parameters | Typed inputs lifted out of one concrete run, such as a branch, report date, or form value |
| Steps | Deterministic, slot, or judgment nodes with explicit dependencies |
| `expect` | A closed assertion DSL evaluated after a step |
| `on_fail` | Retry, repair, or fallback policy; repair currently falls back safely |
| `verify` | Final outcome checks that must pass before success is reported |
| Version and confidence | Basis for append-only patches, rollback, and future drift gating |

Rote keeps the step vocabulary small:

1. A **deterministic step** renders parameter bindings into tool arguments and dispatches the tool directly. It requires no LLM call.
2. A **slot step** gives an LLM a narrow prompt and bounded token budget to produce one content value. That value becomes a binding and is still assertion-gated.
3. A **judgment step** asks for a constrained classification from a declared option set. Output outside that set is a hard error, never an improvised branch.

This separates control from content. The playbook owns navigation; the model is called only where the procedure genuinely requires generated content or bounded judgment.

## What the executor actually guarantees

The executor validates the playbook, computes a topological order, and walks the DAG. Arguments and expectations are rendered from typed bindings. Each successful step updates a structured world state derived from the result; the expectation evaluator checks that state before execution continues.

The v1 expectation DSL is closed rather than allowing arbitrary code:

| Assertion family | Examples |
| --- | --- |
| Process | exit code, non-empty output, regex match |
| Browser | selector visible/absent, input value, URL contains text, page text visible |
| Structured data | JSON path exists or equals an expected value |
| Final verification | The same primitives evaluated after all steps complete |

A replay result always reports its outcome, run ID, completed step IDs, failed step, reason, and attempt counts. Recording already-completed steps on fallback is important: side effects may have occurred, and the caller needs that information before deciding whether a full agent can safely restart.

The strongest invariant is simple: **passing every step is not enough**. Every final `verify` assertion must also pass. A verification failure returns failure, never success.

## Fingerprints prevent unsafe reuse

Memoization is only correct when the cache key describes the environment that gave the procedure meaning. Rote fingerprints the sorted tool inventory and tool-schema hashes together with a target identity, such as a repository remote, domain, or API base, plus relevant surface versions.

Canonical serialization makes the hash stable across irrelevant key ordering, while a tool-schema change produces a different fingerprint. The planned matcher treats fingerprint equality as a hard first-stage gate. Semantic similarity is not allowed to replay a staging procedure against production or a browser playbook against a different tool surface.

Only after that structural match will the planned second stage shortlist playbooks by task intent and use one bounded model call to confirm the match and extract typed parameter bindings. A timeout, invalid binding, low confidence, or missing parameter becomes a cache miss and returns control to the ordinary agent.

## From cold exploration to warm replay

![Existing Excalidraw run-lifecycle diagram from the Rote repository](/rote/run-lifecycle.svg)

The intended lifecycle has three modes:

| Mode | Control flow | Artifact |
| --- | --- | --- |
| Cold | A full agent explores and the recorder captures its trajectory | A successful run that can be distilled |
| Warm | A matching playbook executes only essential steps | A replay trajectory and increased confidence |
| Drift | An assertion catches a changed selector, flag, API, or repository surface | Eventually a versioned patch, or a full-agent fallback |

The repository uses illustrative economics—roughly 40 calls and 210k tokens cold versus 6 calls and 18k tokens warm—to state the target, not a finished benchmark result. The next benchmark milestone is the credibility gate: at least 80% token reduction against a cache-adjusted baseline, at success parity, on a frozen browser-automation suite. If the executor cannot achieve that with hand-written playbooks, automating the distiller does not rescue the thesis.

That standard is useful because token reduction alone is insufficient. The benchmark also needs tool-call count, wall-clock time, artifact equivalence, false-match rate, and success parity. A cheap replay that occasionally submits the wrong form is not optimization; it is a reliability bug.

## Distillation is a compiler problem

The planned distiller receives a successful trajectory and must answer three hard questions:

1. Which calls were causally necessary, and which were abandoned exploration?
2. Which literals are task parameters versus stable environment constants or derived values?
3. Which observed states can become cheap assertions that detect drift?

Causal pruning should be deterministic where possible. A tool result is live if it feeds the arguments of a later live step or the final outcome. Side-effecting operations such as writes, clicks, submissions, and shell mutations must be preserved even when their returned text is never referenced. Parameterization and assertion synthesis can use an offline model because they happen once after a successful run, outside the latency-sensitive path.

Generated playbooks will not enter the store immediately. The design requires a shadow replay against the live environment first. Only a green replay promotes the artifact to version 1.

## Drift should trigger repair, not silent continuation

![Existing Excalidraw repair-ladder diagram from the Rote repository](/rote/repair-ladder.svg)

The planned repair ladder is deliberately asymmetric:

1. Retry failures that look transient.
2. Give a repair model only the failed step, its expected postcondition, current observed state, and local intent.
3. Re-run the proposed replacement and persist it as a new playbook version only if the assertion passes.
4. If repair fails or the task was mismatched, fall back to a full agent run and record new training data.

The key is repair scope. Re-planning the entire task after one selector moves discards most of the value of the playbook. Repairing one node preserves the known-good procedure and turns environment drift into a versioned patch. A bad patch can roll back because earlier playbook versions remain available.

Today, scoped repair is not implemented. The executor sees a repair policy and returns fallback immediately. That is the correct incomplete behavior: fail open toward the baseline agent rather than silently skipping a check or claiming self-healing that did not happen.

## The engineering thesis

Rote is not trying to replace agents with hand-authored workflows. Humans do not author the procedure; a successful agent run discovers it. It is not semantic memory because it stores operations rather than facts. It is not a compression proxy because it prevents work rather than shrinking the transcript of that work.

The project’s real bet is that repeated agent workloads have a fat enough head for learned procedures to amortize: browser operations, release routines, ticket triage, report generation, repository maintenance, and other tasks whose inputs change more often than their structure.

If that bet holds, the marginal cost of a known task approaches the **verification floor**: match it, bind inputs, execute essential steps, and prove the outcome. That floor cannot honestly be zero. Verification is what separates reusable agent infrastructure from a macro that fails quietly.

The implementation, architecture docs, and milestone gates are available in the [Rote repository](https://github.com/kedarvartak/rote).
