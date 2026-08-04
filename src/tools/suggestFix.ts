import type { Issue } from '../types'

export function suggestFix(issue: Issue): string {
  return `Suggested fix for #${issue.number}: review "${issue.title}", add a regression test, and open a pull request describing the change.`
}
