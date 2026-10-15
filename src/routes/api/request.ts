import { createFileRoute } from '@tanstack/react-router'

type RequestPayload = {
  name: string
  email: string
  request: string
  background?: string
  materials?: string
  deadline?: string
  avoid?: string
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

function isRequestPayload(value: unknown): value is RequestPayload {
  if (!isRecord(value)) return false

  return (
    typeof value.name === 'string' &&
    typeof value.email === 'string' &&
    typeof value.request === 'string' &&
    ['background', 'materials', 'deadline', 'avoid', 'bot-field'].every(
      (key) => value[key] === undefined || typeof value[key] === 'string',
    )
  )
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const Route = createFileRoute('/api/request')({
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

        if (!isRequestPayload(body)) {
          return Response.json({ ok: false }, { status: 400 })
        }

        const name = body.name.trim()
        const email = body.email.trim()
        const requestText = body.request.trim()
        if (
          !name ||
          !emailPattern.test(email) ||
          requestText.length < 12
        ) {
          return Response.json({ ok: false }, { status: 400 })
        }

        const apiKey = runtimeEnv('RESEND_API_KEY')
        const recipient = runtimeEnv('RESEND_TO')
        const sender = runtimeEnv('RESEND_FROM')
        if (!apiKey || !recipient || !sender) {
          return Response.json(
            { ok: false, error: 'unconfigured' },
            { status: 500 },
          )
        }

        const optionalFields = [
          ['background', body.background],
          ['materials', body.materials],
          ['deadline', body.deadline],
          ['avoid', body.avoid],
        ].filter(
          (field): field is [string, string] =>
            typeof field[1] === 'string' && field[1].trim().length > 0,
        )
        const text = [
          `Name: ${name}`,
          `Email: ${email}`,
          `Request: ${requestText}`,
          ...optionalFields.map(([label, value]) => `${label}: ${value.trim()}`),
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
              subject: `New deskwork request from ${name}`,
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
