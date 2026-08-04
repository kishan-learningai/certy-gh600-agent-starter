# Architecture

A single-agent design with clear separation between planning, execution, memory,
and guardrails.

- **Planner** (`src/agent/planner.ts`) - turns an issue into a `Plan` (steps, the
  tool to use, and whether the work is risky). Rule-based and deterministic.
- **Validator** (`src/agent/validator.ts`) - rejects malformed or unsafe plans
  (unknown tool, no steps, suspiciously long plans).
- **Executor** (`src/agent/executor.ts`) - runs the selected tool.
- **State** (`src/agent/state.ts`) - an explicit status machine: idle, planning,
  awaiting_approval, executing, done, blocked.
- **Tools** (`src/tools/`) - small, typed functions the agent can call.
- **Memory** (`src/memory/`) - episodic (a log of runs) and semantic (recall by
  keyword).
- **Guards** (`src/guards/`) - input filter, output redactor, approval gate.

Every run returns a **trace**, which is what you evaluate and debug against.
