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

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return {
        ok: false,
        error: 'Email service is not configured. Please contact the site administrator.'
      }
    }

    const textBody = [
      `name: ${data.name.trim()}`,
      `email: ${data.email.trim()}`,
      `request: ${data.request.trim()}`,
      `background: ${data.background.trim()}`,
      `materials: ${data.materials.trim()}`,
      `deadline: ${data.deadline.trim()}`,
      `avoid: ${data.avoid.trim()}`
    ].join('\n\n')

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@deskworkz.com',
        to: ['requests@deskworkz.com'],
        reply_to: data.email.trim(),
        subject: `New DeskWork request from ${data.name.trim()}`,
        text: textBody
      })
    })

    if (!response.ok) {
      let message = 'Failed to send request email.'
      try {
        const responseBody = await response.json() as { message?: string }
        if (responseBody?.message) message = responseBody.message
      } catch {
        // Ignore JSON parsing errors and fall back to the default message.
      }

      return { ok: false, error: message }
    }

    return { ok: true }
  })