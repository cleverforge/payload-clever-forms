export type CleverFormsClientOptions = {
  baseURL?: string
  submissionsSlug?: string
  fetcher?: typeof fetch
}

export type SubmitFormInput = {
  form: string | number
  data: Record<string, unknown>
  submitterEmail?: string
  sourceURL?: string
}

const jsonRequest = async <T>(fetcher: typeof fetch, url: string, init: RequestInit): Promise<T> => {
  const response = await fetcher(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error((body as { message?: string }).message ?? `Clever Forms request failed (${response.status})`)
  return body as T
}

export const createCleverFormsClient = (options: CleverFormsClientOptions = {}) => {
  const baseURL = (options.baseURL ?? '').replace(/\/$/, '')
  const submissionsSlug = options.submissionsSlug ?? 'clever-form-submissions'
  const fetcher = options.fetcher ?? fetch

  return {
    submit: (input: SubmitFormInput) => jsonRequest(fetcher, `${baseURL}/api/${submissionsSlug}`, {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  }
}
