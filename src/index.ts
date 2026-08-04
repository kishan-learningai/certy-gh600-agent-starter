import type { Issue, TraceEntry, AgentResult } from './types'
import { createPlan } from './agent/planner'
import { validatePlan } from './agent/validator'
import { execute } from './agent/executor'
import { createState, transition, type AgentState } from './agent/state'
import { readIssue } from './tools/readIssue'
import { inputFilter } from './guards/inputFilter'
import { redact } from './guards/outputRedactor'
import { approvalGate } from './guards/approvalGate'
import { EpisodicMemory } from './memory/episodicMemory'

export interface RunOptions {
  humanApproved?: boolean
  now?: string
  memory?: EpisodicMemory
}

export interface RunOutput {
  result: AgentResult | null
  trace: TraceEntry[]
  state: AgentState
  blocked?: string
}

// The agent loop: filter -> read -> plan -> validate -> approve -> execute ->
// redact -> remember. Every step is recorded in the trace for debugging and eval.
export function runAgent(issue: Issue, opts: RunOptions = {}): RunOutput {
  const trace: TraceEntry[] = []
  let state = createState(`issue-${issue.number}`)

  const filter = inputFilter(`${issue.title} ${issue.body}`)
  trace.push({ step: 'input_filter', detail: filter.safe ? 'clean' : `flagged: ${filter.flagged.join(', ')}` })
  if (!filter.safe) {
    state = transition(state, 'blocked')
    return { result: null, trace, state, blocked: 'input rejected by guardrail' }
  }

  state = transition(state, 'planning')
  const issueData = readIssue(issue)
  const plan = createPlan(issueData)
  trace.push({ step: 'plan', detail: `tool=${plan.tool} risky=${plan.risky}` })

  const validation = validatePlan(plan)
  trace.push({ step: 'validate', detail: validation.ok ? 'ok' : validation.errors.join('; ') })
  if (!validation.ok) {
    state = transition(state, 'blocked')
    return { result: null, trace, state, blocked: 'plan failed validation' }
  }

  state = transition(state, 'awaiting_approval')
  const decision = approvalGate(plan, opts.humanApproved ?? false)
  trace.push({ step: 'approval', detail: decision.reason })
  if (!decision.approved) {
    state = transition(state, 'blocked')
    return { result: null, trace, state, blocked: 'awaiting human approval' }
  }

  state = transition(state, 'executing')
  const summary = redact(execute(plan, issueData))
  trace.push({ step: 'execute', detail: `produced ${summary.length} chars` })

  state = transition(state, 'done')
  const result: AgentResult = { summary, tool: plan.tool, approved: decision.approved }

  const memory = opts.memory ?? new EpisodicMemory()
  memory.record({ issue: issue.number, tool: plan.tool, approved: decision.approved, at: opts.now ?? '1970-01-01T00:00:00Z' })

  return { result, trace, state }
}

// Demo run when invoked directly (npm start). Cross-platform entry check.
if (process.argv[1] && process.argv[1].endsWith('index.ts')) {
  const out = runAgent(
    { number: 1, title: 'Fix crash on login', body: 'The app crashes with an error when a user logs in.' },
    { humanApproved: true },
  )
  console.log(JSON.stringify(out, null, 2))
}
