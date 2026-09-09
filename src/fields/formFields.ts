import type { Field } from 'payload'
import type { CleverFormsFieldConfig } from '../types.js'

const defaultEnabled = {
  text: true, textarea: true, email: true, number: true, select: true,
  radio: true, checkbox: true, multiselect: true, date: true,
  heading: true, paragraph: true,
} as const

export const createFormFields = (config: CleverFormsFieldConfig = {}): Field[] => {
  const enabled = { ...defaultEnabled, ...config }
  const typeOptions = Object.entries(enabled)
    .filter(([, value]) => value !== false)
    .map(([value]) => ({ label: value, value }))

  const builderFields: Field[] = [
    { name: 'name', type: 'text', required: true },
    { name: 'label', type: 'text', required: true, localized: true },
    { name: 'type', type: 'select', required: true, options: typeOptions },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'placeholder', type: 'text', localized: true },
    { name: 'required', type: 'checkbox', defaultValue: false },
    {
      name: 'choices', type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'conditionalLogic', type: 'group', fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'field', type: 'text' },
        { name: 'operator', type: 'select', defaultValue: 'equals', options: ['equals', 'notEquals', 'contains', 'isEmpty', 'isNotEmpty'] },
        { name: 'value', type: 'text' },
      ],
    },
  ]

  return [{
    name: 'pages', type: 'array', required: true,
    admin: { description: 'Drag to reorder pages. Each page contains reorderable fields.' },
    fields: [
      { name: 'title', type: 'text', localized: true },
      { name: 'description', type: 'textarea', localized: true },
      { name: 'fields', type: 'array', required: true, fields: builderFields },
    ],
  }]
}
