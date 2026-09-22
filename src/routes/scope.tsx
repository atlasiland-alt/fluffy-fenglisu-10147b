import { Link, createFileRoute } from '@tanstack/react-router'
import { scopeSections, scopeTable } from '@/data/site'
import { PageHeader, Pull, Reveal, SectionLabel, TickList } from '@/components/ui'

export const Route = createFileRoute('/scope')({
  component: ScopePage,
  head: () => ({
    meta: [
      { title: 'Your project scope — iLands Store' },
      {
        name: 'description',
        content:
          'Before work begins you receive a plain-English scope: the goal, the deliverables, the work included, the boundaries, what we need from you, the price, the timeline, and how changes are handled.',
      },
    ],
  }),
})

function ScopePage() {
  return (
    <>
      <PageHeader
        index="03"
        kicker="Project scope"
        title="Your project scope"
        lead={
          <>
            <p>
              Before work begins, you&rsquo;ll receive a clear scope for your
              request. The scope is your plain-English agreement for what
              we&rsquo;re actually doing.
            </p>
            <p className="mt-4">
              You don&rsquo;t need to figure this out yourself. We build it from
              the request you send us.
            </p>
          </>
        }
      />

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <SectionLabel index="Contents">The scope will include</SectionLabel>
          </Reveal>

          <ol className="mt-12 grid gap-7 lg:grid-cols-2">
            {scopeSections.map((section, i) => (
              <Reveal
                as="li"
                key={section.number}
                delay={Math.min(i, 4) * 60}
                className={i === 0 ? 'lg:col-span-2' : ''}
              >
                <article className="card card-lift flex h-full flex-col p-6 lg:p-8">
                  <header className="flex items-baseline gap-4">
                    <span className="display text-[2.25rem] leading-none text-manila">
                      {section.number}
                    </span>
                    <h3 className="headline text-[1.25rem] leading-tight lg:text-[1.5rem]">
                      {section.title}
                    </h3>
                  </header>

                  <p className="mt-5 text-ink-2">{section.body}</p>

                  {section.example ? (
                    <p className="mt-5 border-l-2 border-manila bg-manila/10 px-5 py-4 font-body italic">
                      &ldquo;{section.example}&rdquo;
                    </p>
                  ) : null}

                  {section.items ? (
                    <div className="mt-5">
                      <TickList
                        items={section.items}
                        columns={section.items.length > 5 ? 2 : 1}
                        tone={section.number === '04' ? 'stamp' : 'ink'}
                      />
                    </div>
                  ) : null}

                  {section.note ? (
                    <p className="mt-6 border-t border-dotted border-ink-3/60 pt-4 text-[0.9375rem] text-ink-3">
                      {section.note}
                    </p>
                  ) : null}

                  {section.stamp ? (
                    <p className="stamp mt-6 -rotate-1 self-start text-[0.6875rem]">
                      {section.stamp}
                    </p>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-paper-2 gridpaper">
        <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <SectionLabel index="Summary">Scope summary</SectionLabel>
              <h2 className="display mt-6 text-[clamp(2rem,5.5vw,3.25rem)]">
                Eight lines. That&rsquo;s the whole agreement.
              </h2>
              <div className="mt-8">
                <Pull>
                  No guessing. No hidden checklist. No surprise &ldquo;that&rsquo;s
                  technically outside the package&rdquo; at the end.
                </Pull>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="card overflow-hidden">
                <table className="w-full border-collapse text-left">
                  <caption className="label border-b-2 border-ink bg-ink px-5 py-3 text-left text-paper">
                    Scope summary
                  </caption>
                  <thead>
                    <tr className="border-b border-ink">
                      <th scope="col" className="label px-5 py-3 text-ink-3">
                        Line
                      </th>
                      <th scope="col" className="label px-5 py-3 text-ink-3">
                        What it means
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {scopeTable.map((row) => (
                      <tr
                        key={row.row}
                        className="border-b border-dotted border-ink-3/50 last:border-b-0"
                      >
                        <th
                          scope="row"
                          className="headline w-[38%] px-5 py-4 align-top text-[0.9375rem] tracking-normal"
                        >
                          {row.row}
                        </th>
                        <td className="px-5 py-4 align-top text-[0.9375rem] text-ink-2">
                          {row.meaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="label border-[1.5px] border-ink bg-manila px-4 py-3">
                  Approve the scope
                </span>
                <span aria-hidden className="font-mono text-2xl text-stamp">
                  &rarr;
                </span>
                <span className="label border-[1.5px] border-ink bg-ink px-4 py-3 text-paper">
                  Work begins
                </span>
              </div>

              <Link to="/request" className="btn mt-9">
                Start a request
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
