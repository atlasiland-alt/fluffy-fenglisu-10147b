import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { joinCopy } from '@/data/site'
import { PageHeader } from '@/components/ui'

export const Route = createFileRoute('/join')({
  component: JoinPage,
  head: () => ({
    meta: [
      { title: joinCopy.pageTitle },
      { name: 'description', content: joinCopy.description },
    ],
  }),
})

type Fields = {
  name: string
  handle: string
  email: string
  capabilities: string
  sample: string
  why: string
}

const EMPTY: Fields = {
  name: '',
  handle: '',
  email: '',
  capabilities: '',
  sample: '',
  why: '',
}

function JoinPage() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>(
    'idle',
  )

  const update =
    (key: keyof Fields) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((previous) => ({ ...previous, [key]: event.target.value }))
      if (errors[key]) setErrors((previous) => ({ ...previous, [key]: undefined }))
    }

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!fields.name.trim()) next.name = joinCopy.validation.name
    if (!fields.handle.trim()) next.handle = joinCopy.validation.handle
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
      next.email = joinCopy.validation.email
    }
    if (!fields.capabilities.trim()) {
      next.capabilities = joinCopy.validation.capabilities
    }
    if (!fields.sample.trim()) next.sample = joinCopy.validation.sample
    return next
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setState('sending')
    try {
      const botField = new FormData(event.currentTarget).get('bot-field')
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          'bot-field': typeof botField === 'string' ? botField : '',
        }),
      })
      const result: unknown = await response.json()
      if (
        !response.ok ||
        typeof result !== 'object' ||
        result === null ||
        !('ok' in result) ||
        result.ok !== true
      ) {
        throw new Error('Application submission failed.')
      }
      setState('sent')
    } catch {
      setState('failed')
    }
  }

  if (state === 'sent') {
    return (
      <>
        <PageHeader
          index="07"
          kicker={joinCopy.kicker}
          title={joinCopy.title}
          lead={joinCopy.lead}
        />
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[760px] px-5 py-20 lg:px-8 lg:py-24">
            <div className="card p-8 lg:p-10">
              <p className="stamp -rotate-2">{joinCopy.receivedStamp}</p>
              <h2 className="display mt-7 text-[clamp(2rem,5.5vw,3rem)]">
                {joinCopy.receivedTitle}
              </h2>
              <p className="mt-6 text-lg text-ink-2">
                {joinCopy.receivedLead}
              </p>
            </div>
          </div>
        </section>
      </>
    )
  }

  const sending = state === 'sending'

  return (
    <>
      <PageHeader
        index="07"
        kicker={joinCopy.kicker}
        title={joinCopy.title}
        lead={joinCopy.lead}
      />
      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-[860px] px-5 py-20 lg:px-8 lg:py-24">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="card p-6 lg:p-9"
          >
            <input
              type="text"
              name="bot-field"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[10000px] h-px w-px overflow-hidden"
            />
            <p className="label border-b-2 border-ink pb-4 text-ink-3">
              {joinCopy.formLabel}
            </p>

            <div className="mt-8 grid gap-7 sm:grid-cols-2">
              <Field
                label={joinCopy.fields.name}
                name="name"
                value={fields.name}
                onChange={update('name')}
                error={errors.name}
                required
                autoComplete="name"
                placeholder={joinCopy.placeholders.name}
              />
              <Field
                label={joinCopy.fields.handle}
                name="handle"
                value={fields.handle}
                onChange={update('handle')}
                error={errors.handle}
                required
                hint={joinCopy.hints.handle}
                placeholder={joinCopy.placeholders.handle}
              />
              <Field
                label={joinCopy.fields.email}
                name="email"
                type="email"
                value={fields.email}
                onChange={update('email')}
                error={errors.email}
                required
                autoComplete="email"
                placeholder={joinCopy.placeholders.email}
              />
            </div>

            <div className="mt-7 space-y-7">
              <Field
                label={joinCopy.fields.capabilities}
                name="capabilities"
                value={fields.capabilities}
                onChange={update('capabilities')}
                error={errors.capabilities}
                required
                textarea
                rows={4}
                hint={joinCopy.hints.capabilities}
                placeholder={joinCopy.placeholders.capabilities}
              />
              <Field
                label={joinCopy.fields.sample}
                name="sample"
                value={fields.sample}
                onChange={update('sample')}
                error={errors.sample}
                required
                textarea
                rows={4}
                hint={joinCopy.hints.sample}
                placeholder={joinCopy.placeholders.sample}
              />
              <Field
                label={joinCopy.fields.why}
                name="why"
                value={fields.why}
                onChange={update('why')}
                textarea
                rows={3}
                hint={joinCopy.hints.why}
                placeholder={joinCopy.placeholders.why}
              />
            </div>

            {state === 'failed' ? (
              <p
                role="alert"
                className="mt-8 border-2 border-stamp bg-stamp/10 px-5 py-4 text-[0.9375rem]"
              >
                {joinCopy.failure}
              </p>
            ) : null}

            <div className="mt-9 border-t-2 border-ink pt-7">
              <button type="submit" className="btn" disabled={sending}>
                {sending ? joinCopy.sending : joinCopy.submit}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  required,
  textarea,
  rows = 3,
  type = 'text',
  placeholder,
  autoComplete,
}: {
  label: string
  name: string
  value: string
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  error?: string
  hint?: string
  required?: boolean
  textarea?: boolean
  rows?: number
  type?: string
  placeholder?: string
  autoComplete?: string
}) {
  const id = `field-${name}`
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(' ')
  const className = `mt-2.5 w-full border-[1.5px] bg-paper px-4 py-3 font-body text-[1.0625rem] text-ink placeholder:text-ink-3/60 focus:bg-manila/10 ${
    error ? 'border-stamp' : 'border-ink'
  }`
  const shared = {
    id,
    name,
    value,
    onChange,
    placeholder,
    autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy || undefined,
  }

  return (
    <div>
      <label htmlFor={id} className="label flex items-baseline gap-2 text-ink-2">
        {label}
        {required ? (
          <span className="text-stamp" aria-hidden>
            {joinCopy.requiredLabel}
          </span>
        ) : null}
      </label>
      {textarea ? (
        <textarea
          {...shared}
          rows={rows}
          className={`${className} resize-y`}
        />
      ) : (
        <input {...shared} type={type} className={className} />
      )}
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-[0.875rem] text-ink-3">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 font-mono text-[0.8125rem] text-stamp"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}
