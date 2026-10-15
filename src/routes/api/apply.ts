import { createFileRoute } from '@tanstack/react-router'

type ApplicationPayload = {
  name: string
  handle: string
  email: string
  capabilities: string
  sample: string
  why?: string
  'bot-field'?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function runtimeEnv(name: string): string | undefined {
  const cloudflareEnv = (globalThis as Record<string, unknown>).__CF_ENV__
  if (isRecord(cloudflareEnv) && typeof cloudflareEnv[name] === 'string') {
    return cloudflareEnv[name]
  }

  return process.env[name]
}

function isApplicationPayload(value: unknown): value is ApplicationPayload {
  if (!isRecord(value)) return false

  return (
    typeof value.name === 'string' &&
    typeof value.handle === 'string' &&
    typeof value.email === 'string' &&
    typeof value.capabilities === 'string' &&
    typeof value.sample === 'string' &&
    (value.why === undefined || typeof value.why === 'string') &&
    (value['bot-field'] === undefined ||
      typeof value['bot-field'] === 'string')
  )
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const Route = createFileRoute('/api/apply')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ ok: false }, { status: 400 })
        }

        if (!isRecord(body)) {
          return Response.json({ ok: false }, { status: 400 })
        }

        if (
          typeof body['bot-field'] === 'string' &&
          body['bot-field'].trim().length > 0
        ) {
          return Response.json({ ok: true })
        }

        if (!isApplicationPayload(body)) {
          return Response.json({ ok: false }, { status: 400 })
        }

        const name = body.name.trim()
        const handle = body.handle.trim()
        const email = body.email.trim()
        const capabilities = body.capabilities.trim()
        const sample = body.sample.trim()
        if (
          !name ||
          !handle ||
          !emailPattern.test(email) ||
          !capabilities ||
          !sample
        ) {
          return Response.json({ ok: false }, { status: 400 })
        }

        const apiKey = runtimeEnv('RESEND_API_KEY')
        const recipient = runtimeEnv('RESEND_TO')
        const sender = runtimeEnv('RESEND_FROM')
        if (!apiKey || !recipient || !sender) {
          return Response.json({ ok: false }, { status: 500 })
        }

        const why = body.why?.trim()
        const text = [
          `Display name: ${name}`,
          `Handle: ${handle}`,
          `Email: ${email}`,
          `Capabilities:\n${capabilities}`,
          `Sample of work:\n${sample}`,
          ...(why ? [`Why they want to join:\n${why}`] : []),
        ].join('\n\n')

        try {
          const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: sender,
              to: [recipient],
              reply_to: email,
              subject: `New iLander roster application from ${name}`,
              text,
            }),
          })

          if (!resendResponse.ok) {
            return Response.json({ ok: false }, { status: 502 })
          }
        } catch {
          return Response.json({ ok: false }, { status: 502 })
        }

        return Response.json({ ok: true })
      },
    },
  },
})
