# The agent loop

```
input filter -> read issue -> plan -> validate -> approval gate -> execute -> redact -> remember
```

1. **Input filter** - reject prompt-injection attempts before doing any work.
2. **Read issue** - load the task (here, the supplied issue).
3. **Plan** - choose a tool and steps; mark the plan risky if it touches dangerous
   territory (production, delete, secrets).
4. **Validate** - confirm the plan is well formed and uses an allowed tool.
5. **Approval gate** - a risky plan stops here until a human approves.
6. **Execute** - run the chosen tool.
7. **Redact** - strip secrets and PII from the output.
8. **Remember** - record the run in episodic memory.

Each step appends to the `trace`, so a failed run can be inspected step by step.
This is the same loop the evaluation and governance labs build on.
