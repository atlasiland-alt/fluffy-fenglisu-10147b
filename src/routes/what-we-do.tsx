import { Link, createFileRoute } from '@tanstack/react-router'
import { services } from '@/data/site'
import {
  Illustration,
  PageHeader,
  Pull,
  Reveal,
  TickList,
} from '@/components/ui'

export const Route = createFileRoute('/what-we-do')({
  component: WhatWeDoPage,
  head: () => ({
    meta: [
      { title: 'What we do — iLands Store' },
      {
        name: 'description',
        content:
          'Research and digging, place and property research, information and archive work, writing and documents, visual and media work — including the boundaries we hold to.',
      },
    ],
  }),
})

function WhatWeDoPage() {
  return (
    <>
      <PageHeader
        index="01"
        kicker="What we do"
        title="What we do"
        lead={
          <>
            <p className="font-display text-[1.375rem] leading-tight font-medium text-ink lg:text-[1.75rem]">
              Sometimes you don&rsquo;t need another app. You need somebody
              &mdash; or something &mdash; to actually do the work.
            </p>
            <p className="mt-5">
              iLands Store handles practical digital deskwork, research,
              organization, writing, and media projects.
            </p>
          </>
        }
      >
        <nav className="flex flex-wrap gap-3">
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="label border-[1.5px] border-ink px-3.5 py-2.5 text-ink-2 transition-colors hover:bg-ink hover:text-paper"
            >
              <span className="text-stamp">{service.number}</span>{' '}
              {service.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={`scroll-mt-24 border-b-2 border-ink ${i % 2 === 1 ? 'bg-paper-2' : ''}`}
        >
          <div className="mx-auto max-w-[1180px] px-5 py-18 lg:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <Reveal>
                <p className="display text-[clamp(3.5rem,11vw,7rem)] leading-none text-manila">
                  {service.number}
                </p>
                <h2 className="display mt-4 max-w-[16ch] text-[clamp(1.875rem,5vw,3rem)]">
                  {service.title}
                </h2>
                {service.image ? (
                  <Illustration
                    src={service.image.src}
                    alt={service.image.alt}
                    width={560}
                    className="mt-10 hidden lg:block"
                  />
                ) : null}
              </Reveal>

              <Reveal delay={90}>
                <p className="font-display text-[1.25rem] leading-snug font-medium lg:text-[1.5rem]">
                  {service.lead}
                </p>

                {service.prompt && service.lists.length === 1 ? (
                  <p className="label mt-8 text-ink-3">{service.prompt}</p>
                ) : null}

                <div
                  className={`mt-6 grid gap-8 ${service.lists.length > 1 ? 'sm:grid-cols-2' : ''}`}
                >
                  {service.lists.map((list, li) => (
                    <div key={list.heading} className="card p-6">
                      <p className="label border-b border-dotted border-ink-3/60 pb-3 text-ink-3">
                        {list.heading}
                      </p>
                      <div className="mt-4">
                        <TickList
                          items={list.items}
                          columns={
                            service.lists.length === 1 && list.items.length > 6
                              ? 2
                              : 1
                          }
                        />
                      </div>
                      {li === 0 && service.lists.length > 1 && service.prompt ? (
                        <p className="label mt-5 text-ink-3">{service.prompt}</p>
                      ) : null}
                    </div>
                  ))}
                </div>

                {service.note ? (
                  <p className="mt-8 border-[1.5px] border-dashed border-archive bg-archive/5 px-5 py-4 text-ink-2">
                    {service.note}
                  </p>
                ) : null}

                {service.pull ? (
                  <div className="mt-8">
                    <Pull>{service.pull}</Pull>
                  </div>
                ) : null}

                {service.boundaries ? (
                  <div className="mt-8 border-2 border-stamp bg-stamp/5 p-6">
                    <p className="label text-stamp">
                      {service.boundaries.heading}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {service.boundaries.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[0.9875rem] leading-snug text-ink"
                        >
                          <span aria-hidden className="font-mono text-stamp">
                            &times;
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {service.image ? (
                  <Illustration
                    src={service.image.src}
                    alt={service.image.alt}
                    width={760}
                    className="mt-10 lg:hidden"
                  />
                ) : null}
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="border-b-2 border-ink bg-archive text-paper">
        <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-24">
          <Reveal>
            <p className="label text-manila">Not sure what you need</p>
            <h2 className="display mt-6 max-w-[22ch] text-[clamp(2.25rem,6.5vw,4rem)] text-paper">
              Not sure if we do it?
            </h2>
            <p className="mt-7 font-display text-[1.75rem] leading-none font-semibold text-manila lg:text-[2.25rem]">
              Ask anyway.
            </p>
            <div className="mt-8 max-w-[52ch] space-y-4 text-lg text-paper/90">
              <p>You don&rsquo;t have to know exactly what service you need.</p>
              <p>Tell us what you&rsquo;re trying to accomplish.</p>
              <p>
                If we can help, we&rsquo;ll figure out how. If we can&rsquo;t,
                we&rsquo;ll tell you.
              </p>
            </div>
            <Link
              to="/request"
              className="btn mt-9 border-manila bg-manila text-ink hover:border-paper hover:bg-paper"
            >
              Start a request
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
