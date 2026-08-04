// Redacts secrets and PII from anything the agent is about to output or store.
const PATTERNS: Array<[RegExp, string]> = [
  [/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '[redacted-email]'],
  [/GHAS_TRAINING_FAKE_TOKEN_DO_NOT_USE_[0-9]+/g, '[redacted-token]'],
  [/ghp_[A-Za-z0-9]{20,}/g, '[redacted-token]'],
]

export function redact(text: string): string {
  return PATTERNS.reduce((acc, [re, replacement]) => acc.replace(re, replacement), text)
}
