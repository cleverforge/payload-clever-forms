import type { CollectionConfig } from 'payload'
import { createFormFields } from '../fields/formFields.js'
import type { CleverFormsFieldConfig } from '../types.js'

export const createFormsCollection = (
  slug: string,
  adminGroup: string,
  fields?: CleverFormsFieldConfig,
): CollectionConfig => ({
  slug,
  admin: {
    group: adminGroup,
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'updatedAt'],
  },
  access: {
    read: ({ req }) => req.user ? true : { status: { equals: 'published' } },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'status', type: 'select', required: true, defaultValue: 'draft', options: ['draft', 'published', 'archived'], index: true },
    ...createFormFields(fields),
    {
      name: 'settings', type: 'group', fields: [
        { name: 'submitButtonLabel', type: 'text', defaultValue: 'Submit', localized: true },
        { name: 'successMessage', type: 'textarea', defaultValue: 'Thank you. Your form has been submitted.', localized: true },
        { name: 'requireAuthentication', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
  timestamps: true,
})
