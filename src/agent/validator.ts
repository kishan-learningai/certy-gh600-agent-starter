import type { Plan, ValidationResult, ToolName } from '../types'

const ALLOWED_TOOLS: ToolName[] = ['readIssue', 'createPlan', 'suggestFix', 'writeSummary']

export function validatePlan(plan: Plan): ValidationResult {
  const errors: string[] = []
  if (!plan.steps || plan.steps.length === 0) errors.push('Plan has no steps')
  if (!ALLOWED_TOOLS.includes(plan.tool)) errors.push(`Tool not allowed: ${plan.tool}`)
  if (plan.steps.length > 20) errors.push('Plan too long (possible loop)')
  return { ok: errors.length === 0, errors }
}
