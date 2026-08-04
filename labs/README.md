# Labs

Work in your own copy. Run `npm test` after each change.

1. **Read the loop** - run `npm start` and read the printed trace against
   `docs/agent-loop.md`.
2. **Improve the planner** - add a new keyword that marks a plan risky (for example
   `migrate`), and add a test for it.
3. **Add a validation rule** - require every plan to include a rationale; reject
   plans without one. Update `validator.ts` and add a test.
4. **Add a guardrail** - extend `outputRedactor.ts` to redact a new pattern (for
   example phone numbers) and test it.
5. **Use memory** - record two runs for the same issue and assert `lastForIssue`
   returns the most recent.
6. **Tighten approval** - require approval for any plan that uses `suggestFix` on a
   file under a protected path.
7. **Extend the trace** - add a `memory` step to the trace and assert it appears.
8. **Capstone** - wire the agent into the GitHub control plane lab so an issue label
   triggers a run and the summary is posted back as a comment.

Each task maps to a GH-600 domain; see the table in the README.
