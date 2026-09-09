import test from 'node:test'
import assert from 'node:assert/strict'
import { conditionMatches } from '../runtime/logic.js'
import { CleverFormsValidationError, validateSubmission } from '../runtime/validation.js'
import type { CleverFormDefinition } from '../types.js'

const form: CleverFormDefinition = {
  id: 'test',
  title: 'Test Form',
  status: 'published',
  pages: [{
    fields: [
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'role', label: 'Role', type: 'select', choices: [{ label: 'Member', value: 'member' }] },
      { name: 'detail', label: 'Detail', type: 'text', required: true, conditionalLogic: { enabled: true, field: 'role', operator: 'equals', value: 'member' } },
    ],
  }],
}

test('conditional logic evaluates expected values', () => {
  assert.equal(conditionMatches({ enabled: true, field: 'status', operator: 'equals', value: 'yes' }, { status: 'yes' }), true)
  assert.equal(conditionMatches({ enabled: true, field: 'status', operator: 'equals', value: 'yes' }, { status: 'no' }), false)
})

test('validation accepts valid input and strips unknown keys', () => {
  const output = validateSubmission(form, { email: 'person@example.org', role: 'member', detail: 'hello', injected: 'nope' })
  assert.deepEqual(output, { email: 'person@example.org', role: 'member', detail: 'hello' })
})

test('validation rejects forged choices', () => {
  assert.throws(
    () => validateSubmission(form, { email: 'person@example.org', role: 'admin' }),
    CleverFormsValidationError,
  )
})
