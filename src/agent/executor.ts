import type { Issue, Plan } from '../types'
import { suggestFix } from '../tools/suggestFix'
import { writeSummary } from '../tools/writeSummary'

// Runs the tool the plan selected. Deterministic and side-effect free.
export function execute(plan: Plan, issue: Issue): string {
  switch (plan.tool) {
    case 'suggestFix':
      return suggestFix(issue)
    case 'writeSummary':
      return writeSummary(issue)
    default:
      return writeSummary(issue)
  }
}
