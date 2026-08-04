export interface RunRecord {
  issue: number
  tool: string
  approved: boolean
  at: string
}

// Episodic memory: a log of what the agent did, run by run.
export class EpisodicMemory {
  private runs: RunRecord[] = []

  record(record: RunRecord): void {
    this.runs.push(record)
  }

  all(): RunRecord[] {
    return [...this.runs]
  }

  lastForIssue(issueNumber: number): RunRecord | undefined {
    return [...this.runs].reverse().find((r) => r.issue === issueNumber)
  }
}
