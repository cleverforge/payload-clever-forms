import type { CleverFormCondition } from '../types.js'

const isEmpty = (value: unknown): boolean =>
  value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)

export const conditionMatches = (
  condition: CleverFormCondition | undefined,
  data: Record<string, unknown>,
): boolean => {
  if (!condition?.enabled || !condition.field) return true

  const actual = data[condition.field]
  const expected = condition.value ?? ''

  switch (condition.operator ?? 'equals') {
    case 'equals': return String(actual ?? '') === expected
    case 'notEquals': return String(actual ?? '') !== expected
    case 'contains': return Array.isArray(actual)
      ? actual.map(String).includes(expected)
      : String(actual ?? '').includes(expected)
    case 'isEmpty': return isEmpty(actual)
    case 'isNotEmpty': return !isEmpty(actual)
    default: return true
  }
}

export const evaluateCondition = conditionMatches
