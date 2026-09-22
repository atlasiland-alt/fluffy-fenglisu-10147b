import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { statuses } from '@/data/site'
import { PageHeader, Pull, Reveal } from '@/components/ui'

export const Route = createFileRoute('/request')({
  component: RequestPage,
  head: () => ({
    meta: [
      { title: 'Start a request — iLands Store' },
      {
        name: 'description',
        content:
          'Describe the job in your own words. Messy is fine. We review the request and send back a scope with deliverables, boundaries, price, and timeline before any work begins.',
      },
    ],
  }),
})

const FORM_NAME = 'deskwork-request'
const FORM_ENDPOINT = '/__forms.html'

type Fields = {
  name: string
  email: string
  request: string
  background: string
  materials: string
  deadline: string
  avoid: string
}

const EMPTY: Fields = {
  name: '',
  email: '',
  request: '',
  background: '',
  materials: '',
  deadline: '',
  avoid: '',
}

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&')
}

function RequestPage() {
  return (
    <>
      <PageHeader
        index="06"
        kicker="Start a request"
        title="Tell us what you need"
        lead={
          <>
            <p>
              You don&rsquo;t need to know exactly what you need. Just tell us
              what you&rsquo;re trying to accomplish, in your own words.
            </p>
            <p className="mt-4">
              We read every request ourselves. If we can help, we&rsquo;ll send
              back a scope with the deliverables, price, and timeline. If we
              can&rsquo;t, we&rsquo;ll tell you.
            </p>
          </>
        }
      />

      <section className="border-b-2 border-ink">
        <div className="mx-auto grid max-w-[1180px] gap-14 px-5 py-20 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16 lg:px-8 lg:py-24">
          <RequestForm />
          <Sidebar />
        </div>
      </section>
    </>
  )
}

function RequestForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>(
    'idle',
  )

  const update =
    (key: keyof Fields) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setFields((prev) => ({ ...prev, [key]: event.target.value }))
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!fields.name.trim()) next.name = 'We need something to call you.'
    if (!fields.email.trim()) {
      next.email = 'We need a way to send your scope back.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
      next.email = 'That address looks incomplete.'
    }
    if (fields.request.trim().length < 12) {
      next.request =
        'A sentence or two is plenty — just tell us what you’re after.'
    }
    return next
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setState('sending')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, 'bot-field': '', ...fields }),
      })
      if (!response.ok) throw new Error(`Status ${response.status}`)
      setState('sent')
    } catch {
      setState('failed')
    }
  }

  if (state === 'sent') {
    return (
      <div>
        <div className="card p-8 lg:p-10">
          <p className="stamp -rotate-2">Request received</p>
          <h2 className="display mt-7 text-[clamp(2rem,5.5vw,3rem)]">
            That&rsquo;s on our desk now.
          </h2>
          <p className="mt-6 text-lg text-ink-2">
            Thanks, {fields.name.trim().split(' ')[0] || 'friend'}. We&rsquo;ll
            read it, work out what the job actually requires, and come back to{' '}
            <span className="font-mono text-[0.9375rem]">
              {fields.email.trim()}
            </span>{' '}
            with a scope &mdash; deliverables, boundaries, price, and an
            estimated turnaround.
          </p>
          <p className="mt-5 text-ink-2">
            Nothing starts, and nothing is charged, until you approve that scope.
          </p>

          <div className="mt-9 border-t border-dotted border-ink-3/60 pt-7">
            <p className="label text-ink-3">Your status right now</p>
            <ol className="mt-5 space-y-3">
              {statuses.slice(0, 3).map((status, i) => (
                <li key={status.title} className="flex items-start gap-4">
                  <span
                    className={`label flex h-8 w-8 shrink-0 items-center justify-center border-[1.5px] ${
                      i === 0
                        ? 'border-stamp bg-stamp text-paper'
                        : 'border-ink-3 text-ink-3'
                    }`}
                  >
                    {`0${i + 1}`}
                  </span>
                  <span>
                    <span className="headline block text-[1.0625rem]">
                      {status.title}
                    </span>
                    <span className="block text-[0.9375rem] text-ink-2">
                      {status.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/how-it-works" className="btn btn-ghost">
              See all seven statuses
            </Link>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setFields(EMPTY)
                setState('idle')
              }}
            >
              Send another request
            </button>
          </div>
        </div>
      </div>
    )
  }

  const sending = state === 'sending'

  return (
    <div>
      <form
        name={FORM_NAME}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        noValidate
        className="card p-6 lg:p-9"
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <p className="hidden">
          <label>
            Don&rsquo;t fill this out if you&rsquo;re human
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <p className="label border-b-2 border-ink pb-4 text-ink-3">
          Request form &mdash; in your own words
        </p>

        <div className="mt-8 grid gap-7 sm:grid-cols-2">
          <Field
            label="Your name"
            name="name"
            value={fields.name}
            onChange={update('name')}
            error={errors.name}
            required
            autoComplete="name"
            placeholder="Marisol Trenholm"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={fields.email}
            onChange={update('email')}
            error={errors.email}
            required
            autoComplete="email"
            placeholder="you@somewhere.com"
          />
        </div>

        <div className="mt-7">
          <Field
            label="What are you trying to accomplish?"
            name="request"
            value={fields.request}
            onChange={update('request')}
            error={errors.request}
            required
            textarea
            rows={7}
            hint="Plain language is fine. So is a half-formed idea."
            placeholder="I found an abandoned-looking house on Quarry Road and I'm curious about its history. Can you find out who owned it and what it was used for?"
          />
        </div>

        <div className="mt-9 border-t border-dotted border-ink-3/60 pt-8">
          <p className="label text-ink-3">
            Helpful if you have it &mdash; all optional
          </p>

          <div className="mt-6 space-y-7">
            <Field
              label="Why you're looking for it"
              name="background"
              value={fields.background}
              onChange={update('background')}
              textarea
              rows={3}
              hint="Context helps us aim the work at the right thing."
            />
            <Field
              label="Anything you already have"
              name="materials"
              value={fields.materials}
              onChange={update('materials')}
              textarea
              rows={3}
              hint="Addresses, names, dates, documents, photos, links, files. Describe it here and we'll tell you how to send it."
            />
            <div className="grid gap-7 sm:grid-cols-2">
              <Field
                label="Any deadlines"
                name="deadline"
                value={fields.deadline}
                onChange={update('deadline')}
                hint="We'll say whether it's realistic."
                placeholder="Before the county meeting on the 14th"
              />
              <Field
                label="Anything you definitely don't want"
                name="avoid"
                value={fields.avoid}
                onChange={update('avoid')}
                hint="Boundaries are easier set up front."
                placeholder="No contacting the current owner"
              />
            </div>
          </div>
        </div>

        {state === 'failed' ? (
          <p
            role="alert"
            className="mt-8 border-2 border-stamp bg-stamp/10 px-5 py-4 text-[0.9375rem]"
          >
            That didn&rsquo;t send. Check your connection and try again &mdash;
            your answers are still here.
          </p>
        ) : null}

        <div className="mt-9 flex flex-col gap-5 border-t-2 border-ink pt-7 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" className="btn" disabled={sending}>
            {sending ? 'Sending…' : 'Send the request'}
          </button>
          <p className="label max-w-[26ch] text-ink-3">
            No payment now. Nothing starts until you approve a scope.
          </p>
        </div>
      </form>

      <div className="mt-8">
        <Pull>Messy is fine. That&rsquo;s what we&rsquo;re here for.</Pull>
      </div>
    </div>
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

  const shared = {
    id,
    name,
    value,
    onChange,
    placeholder,
    autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy || undefined,
    className: `mt-2.5 w-full border-[1.5px] bg-paper px-4 py-3 font-body text-[1.0625rem] text-ink placeholder:text-ink-3/60 focus:bg-manila/10 ${
      error ? 'border-stamp' : 'border-ink'
    }`,
  }

  return (
    <div>
      <label htmlFor={id} className="label flex items-baseline gap-2 text-ink-2">
        {label}
        {required ? (
          <span className="text-stamp" aria-hidden>
            required
          </span>
        ) : null}
      </label>

      {textarea ? (
        <textarea {...shared} rows={rows} className={`${shared.className} resize-y`} />
      ) : (
        <input {...shared} type={type} />
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

function Sidebar() {
  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <Reveal className="card bg-manila/20 p-7">
        <p className="label text-ink-3">What happens next</p>
        <ol className="mt-5 space-y-4">
          {statuses.slice(0, 4).map((status, i) => (
            <li key={status.title} className="flex gap-4">
              <span className="label pt-0.5 text-stamp">{`0${i + 1}`}</span>
              <span>
                <span className="headline block text-[1.0625rem]">
                  {status.title}
                </span>
                <span className="block text-[0.9375rem] text-ink-2">
                  {status.body}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <Link
          to="/how-it-works"
          className="label mt-6 inline-flex items-center gap-2 border-b border-ink pb-0.5 text-ink hover:text-stamp"
        >
          All seven statuses <span aria-hidden>&rarr;</span>
        </Link>
      </Reveal>

      <Reveal delay={80} className="border-[1.5px] border-dashed border-ink-3 p-7">
        <p className="label text-ink-3">You don&rsquo;t need to</p>
        <ul className="mt-5 space-y-3 text-[0.9875rem] text-ink-2">
          <li>Choose an iLander.</li>
          <li>Know which service category it falls under.</li>
          <li>Write a perfect prompt.</li>
          <li>Organize your material first.</li>
        </ul>
      </Reveal>

      <Reveal delay={140} className="border-2 border-stamp bg-stamp/5 p-7">
        <p className="label text-stamp">Before you ask</p>
        <ul className="mt-5 space-y-3 text-[0.9875rem]">
          <li>We do not enter buildings or trespass.</li>
          <li>No original photography unless specifically arranged.</li>
          <li>No legal conclusions.</li>
          <li>
            We can&rsquo;t guarantee information that cannot be verified &mdash;
            and we&rsquo;ll say so rather than filling the gap.
          </li>
        </ul>
      </Reveal>
    </aside>
  )
}
