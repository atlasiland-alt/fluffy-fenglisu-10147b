import { Link, createFileRoute } from '@tanstack/react-router'
import { examples, ilanders, services, statuses } from '@/data/site'
import { Illustration, Pull, Reveal, SectionLabel, TickList } from '@/components/ui'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      { title: 'iLands Store — Get the deskwork done.' },
      {
        name: 'description',
        content:
          'Research, digging, organizing, writing, finding things, building things. Tell us what you are trying to accomplish and we figure out the work behind it.',
      },
    ],
  }),
})

const TICKER = [
  'Deed records',
  'Newspaper archives',
  'Plat maps',
  'Assessor files',
  'Preservation records',
  'Scattered notes',
  'Photo envelopes',
  'Corporate filings',
  'Timelines',
  'Screenshot folders',
  'Historic maps',
  'Transcripts',
]

function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <WhatWeDo />
      <Examples />
      <NotSure />
      <ProcessStrip />
      <IlandersStrip />
    </>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink">
      <div className="pointer-events-none absolute inset-0 gridpaper opacity-70" aria-hidden />
      <div className="relative mx-auto grid max-w-[1180px] gap-14 px-5 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <div className="rise">
            <SectionLabel index="Front desk">iLands Store &mdash; Deskwork</SectionLabel>
          </div>

          <h1
            className="display rise mt-7 text-[clamp(3rem,10.5vw,6.5rem)]"
            style={{ animationDelay: '80ms' }}
          >
            Get the
            <br />
            deskwork
            <br />
            <span className="text-stamp">done.</span>
          </h1>

          <p
            className="rise mt-8 max-w-[34ch] font-display text-[1.375rem] leading-[1.25] font-medium lg:text-[1.625rem]"
            style={{ animationDelay: '170ms' }}
          >
            Research. Digging. Organizing. Writing. Finding things. Building
            things.
          </p>

          <p
            className="rise mt-5 max-w-[44ch] text-[1.125rem] text-ink-2 lg:text-xl"
            style={{ animationDelay: '230ms' }}
          >
            You bring us the task. We figure out the work behind it.
          </p>

          <ul
            className="rise mt-9 max-w-[42ch] border-y border-dotted border-ink-3/60 py-5"
            style={{ animationDelay: '300ms' }}
          >
            {[
              'No complicated AI setup.',
              'No prompt engineering required.',
              'Just tell us what you need.',
            ].map((line, i) => (
              <li key={line} className="label flex items-baseline gap-3 py-1.5 text-ink-2">
                <span className="text-manila">{`0${i + 1}`}</span>
                {line}
              </li>
            ))}
          </ul>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '370ms' }}
          >
            <Link to="/request" className="btn">
              Start a request
            </Link>
            <Link to="/what-we-do" className="btn btn-ghost">
              See what we do
            </Link>
          </div>
        </div>

        {/* The desk itself: taped-down artwork with an intake slip clipped over it. */}
        <div className="rise relative lg:pt-6" style={{ animationDelay: '240ms' }}>
          <div className="taped relative rotate-[-1.4deg]">
            <img
              src="/.netlify/images?url=%2Fimg%2Fdesk-overhead.png&w=900&fm=webp"
              srcSet="/.netlify/images?url=%2Fimg%2Fdesk-overhead.png&w=640&fm=webp 640w, /.netlify/images?url=%2Fimg%2Fdesk-overhead.png&w=900&fm=webp 900w, /.netlify/images?url=%2Fimg%2Fdesk-overhead.png&w=1400&fm=webp 1400w"
              sizes="(max-width: 1024px) 100vw, 520px"
              alt="Illustration of a research desk mid-project: manila folders, stamped documents, a folded plat map, photo prints, index cards, a magnifying glass and a coffee mug"
              className="block w-full border-[1.5px] border-ink bg-paper-2 shadow-[6px_8px_0_0_rgba(29,26,21,0.85)]"
              width="1400"
              height="770"
            />
          </div>

          <div className="card relative z-10 mx-auto -mt-10 w-[92%] rotate-[1deg] px-6 py-6 sm:w-[78%] lg:-mt-14 lg:ml-0">
            <p className="label border-b border-dotted border-ink-3/60 pb-3 text-ink-3">
              Intake slip &mdash; in your own words
            </p>
            <p className="mt-4 font-body text-[1.0625rem] leading-relaxed">
              &ldquo;There&rsquo;s a boarded-up storefront on my corner. Nobody
              knows what it used to be. Can you find out?&rdquo;
            </p>
            <p className="label mt-5 flex items-center gap-2 text-stamp">
              <span aria-hidden>&rarr;</span> That&rsquo;s a complete request
            </p>
          </div>

          <p className="label mt-6 text-center text-ink-3 lg:text-left">
            Illustration &mdash; generated, not a photograph
          </p>
        </div>
      </div>
    </section>
  )
}

function Ticker() {
  const band = [...TICKER, ...TICKER]
  return (
    <div className="overflow-hidden border-b-2 border-ink bg-archive py-3.5">
      <div className="marquee">
        {band.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="label flex items-center gap-8 whitespace-nowrap px-8 text-paper/85"
          >
            {item}
            <span aria-hidden className="text-manila">
              &#9670;
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

function WhatWeDo() {
  return (
    <section id="what-we-do" className="border-b-2 border-ink">
      <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <SectionLabel index="01">What we do</SectionLabel>
            <h2 className="display mt-6 text-[clamp(2.25rem,6vw,3.75rem)]">
              What we do
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="font-display text-[1.375rem] leading-tight font-medium lg:text-[1.75rem]">
              Sometimes you don&rsquo;t need another app. You need somebody
              &mdash; or something &mdash; to actually do the work.
            </p>
            <p className="mt-5 max-w-[56ch] text-lg text-ink-2">
              iLands Store handles practical digital deskwork, research,
              organization, writing, and media projects.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              as="li"
              key={service.id}
              delay={i * 70}
              className={i === 0 ? 'sm:col-span-2' : ''}
            >
              <Link
                to="/what-we-do"
                hash={service.id}
                className="card card-lift flex h-full flex-col p-6"
              >
                <span className="label flex items-center justify-between text-ink-3">
                  <span className="text-stamp">{service.number}</span>
                  <span aria-hidden>&nearr;</span>
                </span>
                <h3 className="headline mt-5 text-[1.5rem] lg:text-[1.75rem]">
                  {service.title}
                </h3>
                <p className="mt-3 text-ink-2">{service.lead}</p>
                <div className="mt-5 border-t border-dotted border-ink-3/60 pt-4">
                  <TickList
                    items={service.lists[0].items.slice(0, i === 0 ? 8 : 4)}
                    columns={i === 0 ? 2 : 1}
                  />
                </div>
              </Link>
            </Reveal>
          ))}

          <Reveal as="li" delay={services.length * 70}>
            <div className="card flex h-full flex-col justify-between bg-manila/25 p-6">
              <p className="font-display text-[1.375rem] leading-tight font-medium">
                Everything, in full detail &mdash; including what we won&rsquo;t
                do.
              </p>
              <Link to="/what-we-do" className="btn mt-7 w-full justify-center">
                See what we do
              </Link>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  )
}

function Examples() {
  return (
    <section className="border-b-2 border-ink bg-paper-2 ruled">
      <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <SectionLabel index="02">Real requests</SectionLabel>
          <h2 className="display mt-6 max-w-[26ch] text-[clamp(2.25rem,6vw,3.75rem)]">
            What does that actually look like?
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example, i) => (
            <Reveal as="li" key={example.quote} delay={i * 70}>
              <div
                className="card card-lift h-full p-6"
                style={{ transform: `rotate(${i % 2 === 0 ? -0.8 : 0.9}deg)` }}
              >
                <p className="label text-stamp">{`Q${i + 1}`}</p>
                <p className="headline mt-4 text-[1.375rem] leading-[1.15] lg:text-[1.5rem]">
                  &ldquo;{example.quote}&rdquo;
                </p>
                <p className="label mt-6 border-t border-dotted border-ink-3/60 pt-4 text-ink-3">
                  {example.kind}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal as="li" delay={examples.length * 70}>
            <div className="flex h-full flex-col justify-center border-[1.5px] border-dashed border-ink-3 p-6">
              <p className="font-display text-[1.375rem] leading-tight font-medium">
                Not sure if your project fits?
              </p>
              <p className="mt-3 text-ink-2">Ask anyway.</p>
              <Link to="/request" className="btn mt-6 w-full justify-center">
                Start a request
              </Link>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  )
}

function NotSure() {
  return (
    <section className="border-b-2 border-ink bg-archive text-paper">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <p className="label text-manila">Not sure what you need</p>
          <h2 className="display mt-6 text-[clamp(2.5rem,7vw,4.5rem)] text-paper">
            Not sure if we do it?
          </h2>
          <p className="mt-8 font-display text-[2rem] leading-none font-semibold text-manila lg:text-[2.75rem]">
            Ask anyway.
          </p>
        </div>

        <div className="space-y-5 text-lg text-paper/90">
          <p>You don&rsquo;t have to know exactly what service you need.</p>
          <p>Tell us what you&rsquo;re trying to accomplish.</p>
          <p className="border-l-4 border-manila pl-5">
            If we can help, we&rsquo;ll figure out how. If we can&rsquo;t,
            we&rsquo;ll tell you.
          </p>
          <Link
            to="/request"
            className="btn border-manila bg-manila text-ink hover:border-paper hover:bg-paper"
          >
            Start a request
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProcessStrip() {
  return (
    <section className="border-b-2 border-ink">
      <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <SectionLabel index="03">The process</SectionLabel>
            <h2 className="display mt-6 text-[clamp(2.25rem,6vw,3.5rem)]">
              Seven steps, no mystery
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg text-ink-2">
              You send the messy version. We review it, price it, scope it, and
              only then does anyone start working.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/how-it-works" className="btn btn-ghost">
                How it works
              </Link>
              <Link to="/scope" className="btn btn-ghost">
                Your scope
              </Link>
              <Link to="/turnaround" className="btn btn-ghost">
                Turnaround
              </Link>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ol className="card divide-y divide-dotted divide-ink-3/50">
              {statuses.map((status, i) => (
                <li key={status.title} className="flex gap-5 px-5 py-4 sm:px-7">
                  <span className="label w-6 shrink-0 pt-1 text-stamp">
                    {`0${i + 1}`}
                  </span>
                  <span>
                    <span className="headline block text-[1.125rem]">
                      {status.title}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] text-ink-2">
                      {status.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="label mt-4 text-ink-3">
              Every request moves through these seven statuses
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function IlandersStrip() {
  return (
    <section className="border-b-2 border-ink bg-paper-2">
      <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <Reveal>
            <SectionLabel index="04">Behind the storefront</SectionLabel>
            <h2 className="display mt-6 text-[clamp(2.25rem,6vw,3.5rem)]">
              Meet the iLanders
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg text-ink-2">
              The iLanders are the workers behind the storefront. You do not need
              to choose one. Work is routed according to the actual requirements
              of the request and the capabilities of the available workers.
            </p>
            <div className="mt-8">
              <Pull>You bring the problem. We figure out who should work on it.</Pull>
            </div>
            <Link to="/ilanders" className="btn mt-8">
              Meet the iLanders
            </Link>
          </Reveal>

          <Reveal delay={90} className="space-y-6">
            {ilanders.map((ilander) => (
              <div key={ilander.name} className="card card-lift p-6">
                <p className="display text-[2rem]">{ilander.name}</p>
                <p className="label mt-3 border-t border-dotted border-ink-3/60 pt-4 text-ink-3">
                  Established capabilities
                </p>
                <div className="mt-3">
                  <TickList items={ilander.capabilities} columns={ilander.capabilities.length > 3 ? 2 : 1} />
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={140} className="mt-16">
          <Illustration
            src="/img/archive-order.png"
            alt="Illustration of loose papers and photo prints on the left resolving into labeled archive boxes and folder tabs on the right"
            width={1180}
          />
        </Reveal>
      </div>
    </section>
  )
}
