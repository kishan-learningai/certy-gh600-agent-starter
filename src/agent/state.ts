export type AgentStatus =
  | 'idle'
  | 'planning'
  | 'awaiting_approval'
  | 'executing'
  | 'done'
  | 'blocked'

export interface AgentState {
  status: AgentStatus
  task: string
  history: AgentStatus[]
}

export function createState(task: string): AgentState {
  return { status: 'idle', task, history: ['idle'] }
}

export function transition(state: AgentState, to: AgentStatus): AgentState {
  return { ...state, status: to, history: [...state.history, to] }
}
