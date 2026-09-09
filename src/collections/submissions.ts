import type { CollectionConfig } from 'payload'
import type { CleverFormsPluginOptions } from '../types.js'
import { createSubmissionHook } from '../runtime/submissionHook.js'

export const createSubmissionsCollection = (
  slug: string,
  formsSlug: string,
  adminGroup: string,
  options: CleverFormsPluginOptions,
): CollectionConfig => ({
  slug,
  admin: { group: adminGroup, defaultColumns: ['form', 'status', 'submittedAt'] },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: { beforeChange: [createSubmissionHook(formsSlug, options)] },
  fields: [
    { name: 'form', type: 'relationship', relationTo: formsSlug, required: true, index: true },
    { name: 'status', type: 'select', required: true, defaultValue: 'submitted', options: ['submitted'], admin: { readOnly: true } },
    { name: 'data', type: 'json', required: true },
    { name: 'submittedAt', type: 'date', required: true, admin: { readOnly: true } },
    { name: 'submitterEmail', type: 'email' },
    { name: 'sourceURL', type: 'text' },
  ],
  timestamps: true,
})
