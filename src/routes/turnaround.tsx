import { Link, createFileRoute } from '@tanstack/react-router'
import { turnarounds } from '@/data/site'
import { PageHeader, Pull, Reveal, SectionLabel, TickList } from '@/components/ui'

export const Route = createFileRoute('/turnaround')({
  component: TurnaroundPage,
  head: () => ({
    meta: [
      { title: 'How long will my request take? — iLands Store' },
      {
        name: 'description',
        content:
          'Quick jobs run 1–2 business days, research projects 3–7, larger projects 1–2+ weeks. Every request gets an estimated turnaround before work begins.',
      },
    ],
  }),
})

function TurnaroundPage() {
  return (
    <>
      <PageHeader
        index="04"
        kicker="Turnaround"
        title="How long will my request take?"
        lead="Every request is different, but we'll give you an estimated turnaround before work begins."
      />

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <SectionLabel index="Estimates">Typical ranges</SectionLabel>
          </Reveal>

          <ul className="mt-12 grid gap-7 lg:grid-cols-2">
            {turnarounds.map((band, i) => (
              <Reveal as="li" key={band.title} delay={i * 70}>
                <article
                  className={`card card-lift flex h-full flex-col p-7 lg:p-8 ${i === 3 ? 'border-dashed bg-manila/15' : ''}`}
                >
                  <p className="label text-ink-3">{band.title}</p>
                  <p className="display mt-4 text-[clamp(1.75rem,4.5vw,2.75rem)] text-stamp">
                    {band.span}
                  </p>
                  <div className="mt-6 border-t border-dotted border-ink-3/60 pt-5">
                    {i === 3 ? (
                      <div className="space-y-3 text-ink-2">
                        {band.items.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    ) : (
                      <>
                        <p className="label mb-4 text-ink-3">Examples</p>
                        <TickList items={band.items} />
                      </>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-archive text-paper">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-8 lg:py-28">
          <Reveal>
            <p className="label text-manila">Commitment</p>
            <h2 className="display mt-6 max-w-[20ch] text-[clamp(2.25rem,6vw,3.5rem)] text-paper">
              Your timeline is part of your scope.
            </h2>
            <p className="mt-7 text-lg text-paper/85">
              Before work begins, you&rsquo;ll know:
            </p>
            <ul className="mt-5 space-y-3">
              {[
                'What we’re doing',
                'What you’ll receive',
                'What it costs',
                'When you can expect it',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-paper/90">
                  <span aria-hidden className="mt-[0.5em] h-[7px] w-[7px] shrink-0 bg-manila" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90} className="space-y-8">
            <div className="border-l-4 border-manila bg-paper/5 px-6 py-5">
              <p className="text-lg text-paper/90">
                If something changes during the project, we&rsquo;ll let you know
                rather than silently moving the finish line.
              </p>
            </div>

            <div className="card p-7 text-ink">
              <p className="label text-stamp">Need it sooner?</p>
              <p className="mt-4 font-display text-[1.375rem] leading-tight font-medium">
                Tell us when you need it.
              </p>
              <p className="mt-3 text-ink-2">
                We&rsquo;ll let you know whether that deadline is realistic
                before you commit to the project.
              </p>
              <Link to="/request" className="btn mt-7 w-full justify-center">
                Start a request
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-paper-2">
        <div className="mx-auto max-w-[1180px] px-5 py-16 lg:px-8 lg:py-20">
          <Reveal>
            <Pull>
              No surprise bill because the rabbit hole got deeper. If the project
              changes substantially, we&rsquo;ll discuss the additional work and
              cost before doing it.
            </Pull>
          </Reveal>
        </div>
      </section>
    </>
  )
}
