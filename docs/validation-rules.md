# Validation rules

The validator (`src/agent/validator.ts`) enforces:

- **A plan must have steps.** An empty plan is rejected.
- **The tool must be on the allowlist** (`readIssue`, `createPlan`, `suggestFix`,
  `writeSummary`). An unknown tool is rejected, which stops the agent calling
  something it should not.
- **The plan must not be too long** (more than 20 steps), a simple guard against
  runaway planning loops.

Validation runs before the approval gate, so a malformed plan never reaches a human
or an executor. Add your own rules in the lab, for example requiring a rationale or
limiting which files a fix may touch.
