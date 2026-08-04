export interface Issue {
  number: number
  title: string
  body: string
}

export type ToolName = 'readIssue' | 'createPlan' | 'suggestFix' | 'writeSummary'

export interface Plan {
  steps: string[]
  tool: ToolName
  risky: boolean
  rationale: string
}

export interface ValidationResult {
  ok: boolean
  errors: string[]
}

export interface AgentResult {
  summary: string
  tool: ToolName
  approved: boolean
}

export interface TraceEntry {
  step: string
  detail: string
}
