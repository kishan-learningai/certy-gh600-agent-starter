import type { Issue } from '../types'

// In a real agent this calls the GitHub API; here it returns the supplied issue
// so the lab runs with no network or tokens.
export function readIssue(issue: Issue): Issue {
  return issue
}
