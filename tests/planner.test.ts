import test from 'node:test'
import assert from 'node:assert'
import { createPlan } from '../src/agent/planner'

test('plans a fix for a bug issue', () => {
  const plan = createPlan({ number: 3, title: 'Bug: login crash', body: 'it throws an error' })
  assert.strictEqual(plan.tool, 'suggestFix')
  assert.strictEqual(plan.risky, false)
})

test('flags a risky plan', () => {
  const plan = createPlan({ number: 1, title: 'Delete production database', body: 'drop table users' })
  assert.strictEqual(plan.risky, true)
})

test('summarises a non-bug issue', () => {
  const plan = createPlan({ number: 2, title: 'Update the docs', body: 'add a getting-started section' })
  assert.strictEqual(plan.tool, 'writeSummary')
  assert.ok(plan.steps.length > 0)
})
