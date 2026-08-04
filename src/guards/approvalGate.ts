import type { Plan } from '../types'

export interface ApprovalDecision {
  approved: boolean
  reason: string
}

// Risky plans require an explicit human approval before the agent may execute.
export function approvalGate(plan: Plan, humanApproved: boolean): ApprovalDecision {
  if (!plan.risky) return { approved: true, reason: 'Low-risk plan, no approval needed' }
  if (humanApproved) return { approved: true, reason: 'Human approved a risky plan' }
  return { approved: false, reason: 'Risky plan requires human approval' }
}
