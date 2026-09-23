import { createServerFn } from '@tanstack/react-start'

export type RequestFields = {
  name: string
  email: string
  request: string
  background: string
  materials: string
  deadline: string
  avoid: string
}

type RequestResult =
  | { ok: true }
  | { ok: false; error: string }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateRequest(data: RequestFields) {
  if (!data.name.trim()) return 'Name is required.'
  if (!data.email.trim()) return 'Email is required.'
  if (!emailPattern.test(data.email.trim())) return 'Email is invalid.'
  if (data.request.trim().length < 12) return 'Request is too short.'
  return null
}

export const submitRequest = createServerFn({ method: 'POST' })
  .inputValidator((data: RequestFields) => data)
  .handler(async ({ data }): Promise<RequestResult> => {
    const error = validateRequest(data)
    if (error) return { ok: false, error }

    return { ok: true }
  })