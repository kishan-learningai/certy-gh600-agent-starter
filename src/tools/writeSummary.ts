import type { Issue } from '../types'

export function writeSummary(issue: Issue): string {
  const body = issue.body.length > 140 ? `${issue.body.slice(0, 140)}...` : issue.body
  return `Summary of #${issue.number} (${issue.title}): ${body}`
}
