import { Link, createFileRoute } from '@tanstack/react-router'
import { statuses, steps } from '@/data/site'
import { PageHeader, Pull, Reveal, SectionLabel, TickList } from '@/components/ui'

export const Route = createFileRoute('/how-it-works')({
  component: HowItWorksPage,
  head: () => ({
    meta: [
      { title: 'How it works — iLands Store' },
      {
        name: 'description',
        content:
          'Seven steps from a messy request to finished work: you describe the job, we review it, you get a scope with price and timeline, you approve, work is routed to the appropriate iLander(s), we review the result, you receive the deliverables.',
      },
    ],
  }),
})

function HowItWorksPage() {
  return (
    <>
      <PageHeader
        index="02"
        kicker="How it works"
        title="Start a request"
        lead={
          <>
            <p>You don&rsquo;t need to know exactly what you need.</p>
            <p className="mt-3">
              Just tell us what you&rsquo;re trying to accomplish.
            </p>
          </>
        }
      >
        <Link to="/request" className="btn">
          Start a request
        </Link>
      </PageHeader>

      <Steps />
      <WhatToWrite />
      <StatusTrack />
    </>
  )
}

function Steps() {
  return (
    <section className="border-b-2 border-ink">
      <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <SectionLabel index="Process">Seven steps</SectionLabel>
        </Reveal>

        <ol className="mt-12 space-y-7">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={Math.min(i, 4) * 60}>
              <article className="card card-lift grid gap-6 p-6 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-10 lg:p-8">
                <header className="flex items-start gap-4 lg:flex-col lg:gap-3">
                  <span className="display text-[3rem] leading-none text-manila lg:text-[4.5rem]">
                    {`0${i + 1}`}
                  </span>
                  <span>
                    <span className="label block text-stamp">{step.number}</span>
                    <h3 className="headline mt-2 text-[1.375rem] leading-tight lg:text-[1.625rem]">
                      {step.title}
                    </h3>
                  </span>
                </header>

                <div>
                  <p className="text-lg text-ink-2">{step.body}</p>

                  {step.items ? (
                    <div className="mt-5">
                      <TickList items={step.items} columns={2} />
                    </div>
                  ) : null}

                  {step.examples ? (
                    <ul className="mt-6 space-y-4">
                      {step.examples.map((example, ei) => (
                        <li
                          key={example}
                          className="border-l-2 border-manila bg-manila/10 px-5 py-4"
                        >
                          <p className="label text-ink-3">
                            {ei === 0 ? 'Example' : 'Another example'}
                          </p>
                          <p className="mt-2 font-body italic">
                            &ldquo;{example}&rdquo;
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {step.pull ? (
                    <div className="mt-6">
                      <Pull>{step.pull}</Pull>
                    </div>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function WhatToWrite() {
  return (
    <section className="border-b-2 border-ink bg-paper-2 ruled">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-8 lg:py-28">
        <Reveal>
          <SectionLabel index="Guidance">The request itself</SectionLabel>
          <h2 className="display mt-6 max-w-[20ch] text-[clamp(2.25rem,6vw,3.5rem)]">
            What should I write in the request?
          </h2>
          <p className="mt-8 font-display text-[2rem] leading-none font-semibold text-stamp lg:text-[2.75rem]">
            Whatever you know.
          </p>
        </Reveal>

        <Reveal delay={90}>
          <div className="card p-7">
            <p className="label border-b border-dotted border-ink-3/60 pb-3 text-ink-3">
              You can include
            </p>
            <div className="mt-5">
              <TickList
                items={[
                  'What you want to know or accomplish',
                  'Why you’re looking for it',
                  'Anything you already have',
                  'Any deadlines',
                  'Anything you definitely don’t want',
                ]}
              />
            </div>
          </div>
          <p className="mt-7 text-lg text-ink-2">
            You don&rsquo;t need to choose an iLander.
          </p>
          <div className="mt-5">
            <Pull>You bring the problem. We figure out who should work on it.</Pull>
          </div>
          <Link to="/request" className="btn mt-8">
            Start a request
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function StatusTrack() {
  return (
    <section className="border-b-2 border-ink bg-archive text-paper">
      <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <p className="label text-manila">Request status</p>
          <h2 className="display mt-6 max-w-[24ch] text-[clamp(2.25rem,6vw,3.5rem)] text-paper">
            Where your request stands
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg text-paper/85">
            Every request moves through the same seven statuses, in order. You
            always know which one you&rsquo;re in.
          </p>
        </Reveal>

        <ol className="mt-14 space-y-0">
          {statuses.map((status, i) => (
            <Reveal as="li" key={status.title} delay={Math.min(i, 5) * 70}>
              <div className="grid grid-cols-[2.75rem_1fr] gap-5 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
                <div className="flex flex-col items-center">
                  <span className="label flex h-11 w-11 items-center justify-center rounded-full border-2 border-manila bg-archive-2 text-manila">
                    {`0${i + 1}`}
                  </span>
                  {i < statuses.length - 1 ? (
                    <span
                      aria-hidden
                      className="mt-1 mb-1 w-px flex-1 border-l-2 border-dotted border-manila/60"
                      style={{ minHeight: '2.75rem' }}
                    />
                  ) : null}
                </div>

                <div
                  className={`pb-10 ${i === statuses.length - 1 ? 'pb-0' : ''}`}
                >
                  <h3 className="headline text-[1.375rem] text-paper lg:text-[1.625rem]">
                    {status.title}
                  </h3>
                  <p className="mt-2 max-w-[48ch] text-paper/80">{status.body}</p>
                  {i === statuses.length - 1 ? (
                    <p className="stamp mt-5 -rotate-2 border-manila text-manila">
                      Delivered
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120} className="mt-12 flex flex-wrap gap-4">
          <Link
            to="/request"
            className="btn border-manila bg-manila text-ink hover:border-paper hover:bg-paper"
          >
            Start a request
          </Link>
          <Link
            to="/scope"
            className="btn border-paper/70 bg-transparent text-paper hover:border-paper hover:bg-paper hover:text-ink"
          >
            See what a scope includes
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
