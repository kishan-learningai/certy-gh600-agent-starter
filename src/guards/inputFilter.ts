// Blocks obvious prompt-injection attempts before the agent plans.
const INJECTION_PATTERNS = [
  /ignore (all|previous) instructions/i,
  /disregard the (system|rules|policy)/i,
  /reveal your (system )?prompt/i,
  /you are now/i,
]

export interface FilterResult {
  safe: boolean
  flagged: string[]
  cleaned: string
}

export function inputFilter(input: string): FilterResult {
  const flagged = INJECTION_PATTERNS.filter((p) => p.test(input)).map((p) => p.source)
  return { safe: flagged.length === 0, flagged, cleaned: input }
}
