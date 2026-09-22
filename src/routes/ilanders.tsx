import { Link, createFileRoute } from '@tanstack/react-router'
import { ilanders } from '@/data/site'
import { PageHeader, Pull, Reveal, SectionLabel, TickList } from '@/components/ui'

export const Route = createFileRoute('/ilanders')({
  component: IlandersPage,
  head: () => ({
    meta: [
      { title: 'Meet the iLanders — iLands Store' },
      {
        name: 'description',
        content:
          'The iLanders are the workers behind the storefront. You do not choose one — work is routed according to the requirements of the request and the capabilities of the available workers.',
      },
    ],
  }),
})

function IlandersPage() {
  return (
    <>
      <PageHeader
        index="05"
        kicker="Behind the storefront"
        title="Meet the iLanders"
        lead={
          <>
            <p>The iLanders are the workers behind the storefront.</p>
            <p className="mt-4">
              Customers do not need to choose an iLander. Work is routed
              according to the actual requirements of the request and the
              capabilities of the available workers.
            </p>
          </>
        }
      />

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <SectionLabel index="Roster">Established capabilities</SectionLabel>
          </Reveal>

          <ul className="mt-12 grid gap-8 lg:grid-cols-2">
            {ilanders.map((ilander, i) => (
              <Reveal as="li" key={ilander.name} delay={i * 80}>
                <article className="card card-lift flex h-full flex-col p-7 lg:p-9">
                  <header className="flex items-start justify-between gap-4 border-b-2 border-ink pb-6">
                    <div>
                      <p className="label text-ink-3">iLander</p>
                      <h2 className="display mt-3 text-[clamp(2.5rem,7vw,3.75rem)]">
                        {ilander.name}
                      </h2>
                    </div>
                    <Badge name={ilander.name} />
                  </header>

                  <p className="label mt-7 text-ink-3">Works on</p>
                  <div className="mt-4">
                    <TickList
                      items={ilander.capabilities}
                      columns={ilander.capabilities.length > 3 ? 2 : 1}
                    />
                  </div>

                  <p className="mt-auto pt-8 text-[0.9375rem] text-ink-3">
                    Only capabilities we&rsquo;ve established are listed here.
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200} className="mt-12 grid gap-7 lg:grid-cols-2">
            <div className="border-2 border-stamp bg-stamp/5 p-7">
              <p className="label text-stamp">How we talk about the roster</p>
              <ul className="mt-5 space-y-3">
                {[
                  'iLanders are not interchangeable.',
                  'We don’t claim capabilities an iLander hasn’t established.',
                  'If a request needs something no available iLander can do, we tell you instead of guessing.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9875rem] leading-snug">
                    <span aria-hidden className="font-mono text-stamp">
                      &times;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-[1.5px] border-dashed border-archive bg-archive/5 p-7">
              <p className="label text-archive">Routing</p>
              <p className="mt-5 text-ink-2">
                When you approve a scope, the request is routed to the iLander
                &mdash; or iLanders &mdash; whose established capabilities match
                the work. A project that combines research, organization, and
                media may involve more than one.
              </p>
              <p className="mt-4 text-ink-2">
                The completed work is then reviewed against the agreed scope
                before it reaches you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-paper-2 ruled">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8 lg:py-24">
          <Reveal>
            <h2 className="display max-w-[22ch] text-[clamp(2rem,5.5vw,3.25rem)]">
              You don&rsquo;t have to pick a worker.
            </h2>
            <div className="mt-8">
              <Pull>You bring the problem. We figure out who should work on it.</Pull>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="card p-7">
              <p className="text-lg text-ink-2">
                Describe what you&rsquo;re trying to accomplish in your own
                words. Routing is our job, not yours.
              </p>
              <Link to="/request" className="btn mt-7 w-full justify-center">
                Start a request
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/* A filing-stamp badge, drawn from the iLander's initial. */
function Badge({ name }: { name: string }) {
  return (
    <svg width="58" height="58" viewBox="0 0 58 58" aria-hidden className="shrink-0">
      <circle
        cx="29"
        cy="29"
        r="26"
        fill="none"
        stroke="#b4442e"
        strokeWidth="2"
        opacity="0.85"
      />
      <circle
        cx="29"
        cy="29"
        r="21"
        fill="none"
        stroke="#b4442e"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.7"
      />
      <text
        x="29"
        y="37"
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="20"
        fill="#b4442e"
        opacity="0.9"
      >
        {name.charAt(0).toUpperCase()}
      </text>
    </svg>
  )
}
