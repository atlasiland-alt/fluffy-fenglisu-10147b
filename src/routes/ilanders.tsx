import { Link, createFileRoute } from '@tanstack/react-router'
import { getRosterOrder, rosterCopy } from '@/data/site'
import {
  IlanderProfileDetails,
  IlanderLinks,
  PageHeader,
  Pull,
  Reveal,
  SectionLabel,
  TickList,
  VerifiedBadge,
} from '@/components/ui'

export const Route = createFileRoute('/ilanders')({
  loader: () => ({ refDate: new Date().toISOString() }),
  component: IlandersPage,
  head: () => ({
    meta: [
      { title: 'Meet the Ilanders — DeskWorkz' },
      {
        name: 'description',
        content:
          'Meet the Ilanders and see their established skills and services. You do not choose one; I personally review requests and assign the work.',
      },
    ],
  }),
})

function IlandersPage() {
  const roster = getRosterOrder(new Date(Route.useLoaderData().refDate))

  return (
    <>
      <PageHeader
        index="05"
        kicker="Behind the storefront"
        title="Meet the Ilanders"
        lead={
          <>
            <p>The Ilanders are the workers behind the storefront.</p>
            <p className="mt-4">
              Customers do not need to choose an Ilander. I personally review
              each request and assign the work according to what it needs and the
              Ilanders&rsquo; established skills.
            </p>
          </>
        }
      />

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <SectionLabel index="Directory">
              {rosterCopy.sectionLabel}
            </SectionLabel>
            <p className="mt-4 text-ink-2">
              {rosterCopy.rotationNote}
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-8 lg:grid-cols-2">
            {roster.map((ilander, i) => (
              <Reveal as="li" key={ilander.displayName} delay={i * 80}>
                <article className="card card-lift flex h-full flex-col p-7 lg:p-9">
                  <header className="flex items-start justify-between gap-4 border-b-2 border-ink pb-6">
                    <div>
                      <p className="label text-archive">Ilander</p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
                        <h2 className="display text-[clamp(2.5rem,7vw,3.75rem)]">
                          {ilander.displayName}
                        </h2>
                        {ilander.verified ? <VerifiedBadge /> : null}
                      </div>
                      {i === 0 ? (
                        <span className="stamp mt-3">
                          {rosterCopy.leadingLabel}
                        </span>
                      ) : null}
                    </div>
                    <Badge name={ilander.displayName} />
                  </header>

                  <div className="mt-7">
                    <IlanderProfileDetails ilander={ilander} />
                  </div>
                  <p className="label mt-7 text-ink-3">Skills &amp; services</p>
                  <div className="mt-4">
                    <TickList
                      items={ilander.skillsAndServices}
                      columns={ilander.skillsAndServices.length > 3 ? 2 : 1}
                    />
                  </div>

                  {ilander.sample ? (
                    <div className="mt-7 border-t-2 border-dashed border-archive/60 pt-7">
                      <p className="label text-archive">{ilander.sample.kind}</p>
                      <h3 className="headline mt-3 text-xl">
                        {ilander.sample.title}
                      </h3>
                      <blockquote className="mt-4 border-l-2 border-stamp/50 pl-4 text-[0.9375rem] leading-relaxed text-ink-2">
                        {ilander.sample.body.split('\n\n').map((para) => (
                          <p key={para.slice(0, 24)} className="mt-3 first:mt-0">
                            {para}
                          </p>
                        ))}
                      </blockquote>
                      <p className="mt-4 text-[0.8125rem] text-ink-3">
                        Real delivered work, shown as sent.
                      </p>
                    </div>
                  ) : null}
                  <IlanderLinks links={ilander.links} />

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
                  'Ilanders are not interchangeable.',
                  'We don’t claim capabilities an Ilander hasn’t established.',
                  'If a request needs something no available Ilander can do, we tell you instead of guessing.',
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
              <p className="label text-archive">Manual assignment</p>
              <p className="mt-5 text-ink-2">
                When you approve a scope, I review the request and assign the
                work to Ilanders whose established skills fit. A project that combines research,
                organization, and media may involve more than one.
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
              <Pull>You bring the problem. I review it and assign the work.</Pull>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="card p-7">
              <p className="text-lg text-ink-2">
                Describe what you&rsquo;re trying to accomplish in your own
                words. Choosing an Ilander is not your job.
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
