# GH-600 Agent Starter

The capstone repository for the **GitHub Agentic AI Developer (GH-600)** course by
[Certy](https://github.com/CertyPro). A small, **runnable** agent that reads a
GitHub issue, plans a response, validates it, asks for human approval on risky
work, runs a local tool, redacts its output, and records what it did.

> Deterministic and local: there is **no LLM call and no API key**, so it runs
> anywhere, including CI.

## Run it

```bash
npm install
npm start      # runs the demo agent loop and prints the trace
npm test       # 12 tests across the planner, validator, and guardrails
npm run typecheck
```

## The agent loop

`input filter -> read issue -> plan -> validate -> approval gate -> execute ->
redact -> remember`, with every step captured in a trace. See
[docs/agent-loop.md](docs/agent-loop.md).

| Part | Files | Exam link |
| --- | --- | --- |
| Planning and validation | `src/agent/planner.ts`, `validator.ts`, `state.ts` | 1.0 |
| Tools | `src/tools/` | 2.0 |
| Memory | `src/memory/` | 3.0 |
| Guardrails (input filter, redactor, approval gate) | `src/guards/` | 6.0 |
| Trace + tests (eval) | `traces/`, `tests/` | 4.0 |

## How to use this as a lab

1. Click **Use this template**, make it public, clone it, run the commands above.
2. Work through [`labs/`](labs/): tighten the planner, add a validation rule, add a
   guardrail, and extend the trace.
3. The two workflows (`agent-eval.yml`, `safety-checks.yml`) run your tests and type
   checks on every push.

## Links

- Free GH-600 course and mock exam: https://certy.pro
- Course content: https://github.com/CertyPro/certy-gh600-course-content

## Licence

[MIT](LICENSE).
