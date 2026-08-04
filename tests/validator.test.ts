import test from 'node:test'
import assert from 'node:assert'
import { validatePlan } from '../src/agent/validator'
import type { Plan } from '../src/types'

const base: Plan = { steps: ['a', 'b'], tool: 'suggestFix', risky: false, rationale: '' }

test('accepts a good plan', () => {
  assert.ok(validatePlan(base).ok)
})

test('rejects an unknown tool', () => {
  const r = validatePlan({ ...base, tool: 'danger' as Plan['tool'] })
  assert.ok(!r.ok)
  assert.ok(r.errors.some((e) => e.includes('Tool not allowed')))
})

test('rejects an empty plan', () => {
  const r = validatePlan({ ...base, steps: [] })
  assert.ok(!r.ok)
})
