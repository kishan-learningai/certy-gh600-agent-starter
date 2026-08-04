# Risk register

| Risk | Mitigation in this starter |
| --- | --- |
| Prompt injection in issue text | `inputFilter` rejects known injection patterns |
| Agent takes a destructive action | `approvalGate` requires human approval for risky plans |
| Agent calls an unintended tool | `validatePlan` enforces a tool allowlist |
| Secrets or PII leak into output or memory | `redact` runs before output and storage |
| Runaway planning loop | plan length cap in the validator |
| Unverifiable behaviour | every run emits a `trace` for evaluation and debugging |

Extend this register as you add capabilities. Each new power the agent gains should
come with a matching guardrail.
