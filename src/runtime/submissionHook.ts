import type { CollectionBeforeChangeHook } from 'payload'
import type { CleverFormDefinition, CleverFormsPluginOptions } from '../types.js'
import { validateSubmission } from './validation.js'

export const createSubmissionHook = (
  formsSlug: string,
  options: CleverFormsPluginOptions,
): CollectionBeforeChangeHook => async ({ data, operation, req }) => {
  if (operation !== 'create') return data

  const formID = typeof data.form === 'object' && data.form !== null ? data.form.id : data.form
  if (!formID) throw new Error('A form is required.')

  const form = await req.payload.findByID({ collection: formsSlug, id: formID, depth: 0, req }) as unknown as CleverFormDefinition
  if (form.status !== 'published') throw new Error('This form is not accepting submissions.')
  if (form.settings?.requireAuthentication && !req.user) throw new Error('Authentication is required to submit this form.')

  const validated = validateSubmission(form, (data.data ?? {}) as Record<string, unknown>)

  data.data = validated
  data.status = 'submitted'
  data.submittedAt = new Date().toISOString()
  delete data.integrationResults
  delete data.ipAddress
  delete data.userAgent

  if (options.onSubmission) await options.onSubmission({ form, data: validated, req })

  return data
}
