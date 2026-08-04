import type { Issue, Plan } from '../types'

// A deterministic, rule-based planner. No LLM call, so the agent runs anywhere.
const RISKY_KEYWORDS = ['delete', 'force push', 'production', 'secret', 'drop table', 'rm -rf','migrate']

export function createPlan(issue: Issue): Plan {
  const text = `${issue.title} ${issue.body}`.toLowerCase()
  const risky = RISKY_KEYWORDS.some((k) => text.includes(k))
  const isBug = /\b(bug|error|fail|crash|broken)\b/.test(text)
  const tool = isBug ? 'suggestFix' : 'writeSummary'
  const steps = [
    'Read the issue',
    isBug ? 'Diagnose the reported problem' : 'Summarise the request',
    `Use the ${tool} tool`,
    'Validate the result',
    risky ? 'Request human approval' : 'Proceed to execution',
  ]
  return {
    steps,
    tool,
    risky,
    rationale: isBug ? 'Issue looks like a bug report' : 'Issue is a general request',
  }
}
