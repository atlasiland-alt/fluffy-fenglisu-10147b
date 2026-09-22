import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { useState } from 'react'

import '../styles.css'

const siteName = 'iLands Store — Deskwork'
const siteDescription =
  'Research, digging, organizing, writing, finding things, building things. You bring us the task, we figure out the work behind it. No AI setup, no prompt engineering.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: siteName },
      { name: 'description', content: siteDescription },
      { name: 'theme-color', content: '#f4efe6' },
      { property: 'og:title', content: 'iLands Store — Get the deskwork done.' },
      { property: 'og:description', content: siteDescription },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..500&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

const NAV = [
  { to: '/what-we-do', label: 'What we do' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/scope', label: 'Scope' },
  { to: '/turnaround', label: 'Turnaround' },
  { to: '/ilanders', label: 'iLanders' },
] as const

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="grain">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}

function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-[1180px] items-stretch justify-between gap-4 px-5 lg:px-8">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="group flex shrink-0 items-center gap-3 py-3.5"
        >
          <Mark />
          <span className="leading-none">
            <span className="headline block text-[1.0625rem] tracking-tight">
              iLands Store
            </span>
            <span className="label mt-1 block text-ink-3 group-hover:text-stamp">
              Deskwork
            </span>
          </span>
        </Link>

        <nav className="hidden items-stretch lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="label flex items-center border-l border-dotted border-ink-3/50 px-5 text-ink-2 transition-colors hover:bg-manila/25 hover:text-ink"
              activeProps={{ className: 'bg-manila/35 text-ink' }}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center border-l border-dotted border-ink-3/50 pl-5">
            <Link to="/request" className="btn py-2.5">
              Start a request
            </Link>
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="label flex items-center gap-2 border-l border-dotted border-ink-3/50 px-4 lg:hidden"
        >
          {open ? 'Close' : 'Menu'}
          <span aria-hidden className="text-base leading-none">
            {open ? '×' : '≡'}
          </span>
        </button>
      </div>

      {open ? (
        <nav className="border-t border-dotted border-ink-3/60 bg-paper-2 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="label block border-b border-dotted border-ink-3/40 px-6 py-4 text-ink-2"
              activeProps={{ className: 'bg-manila/30 text-ink' }}
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 py-5">
            <Link to="/request" onClick={() => setOpen(false)} className="btn w-full justify-center">
              Start a request
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  )
}

/* A small filed-folder mark: a tab, a sheet, a paper clip of an idea. */
function Mark() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      aria-hidden
      className="shrink-0"
    >
      <rect x="1.5" y="6.5" width="27" height="20" fill="#c1912b" stroke="#1d1a15" strokeWidth="1.6" />
      <path d="M1.5 6.5h10l2.2 3.4h14.8" fill="none" stroke="#1d1a15" strokeWidth="1.6" />
      <rect x="6" y="12" width="18" height="11" fill="#f4efe6" stroke="#1d1a15" strokeWidth="1.4" />
      <path d="M9 16h9M9 19h6" stroke="#b4442e" strokeWidth="1.4" />
    </svg>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-archive text-paper">
      <div className="mx-auto max-w-[1180px] px-5 py-14 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="display text-[clamp(1.75rem,4vw,2.5rem)] text-paper">
              Bring us the messy thing.
              <br />
              <span className="text-manila">We&rsquo;ll figure out the deskwork.</span>
            </p>
            <Link to="/request" className="btn mt-7 border-manila bg-manila text-ink hover:border-paper hover:bg-paper">
              Start a request
            </Link>
          </div>

          <div>
            <p className="label border-b border-paper/30 pb-2 text-manila">Pages</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-manila hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/request" className="hover:text-manila hover:underline">
                  Start a request
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label border-b border-paper/30 pb-2 text-manila">
              How we work
            </p>
            <ul className="mt-4 space-y-3 text-[0.9375rem] text-paper/85">
              <li>We don&rsquo;t enter buildings and we don&rsquo;t trespass.</li>
              <li>
                We don&rsquo;t claim photographs we didn&rsquo;t take. Visuals are
                generated or sourced unless specifically stated otherwise.
              </li>
              <li>
                We don&rsquo;t guarantee information that cannot be verified, and
                we&rsquo;ll tell you when a job isn&rsquo;t something we can honestly
                take on.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-paper/25 pt-6 text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">iLands Store &mdash; Deskwork</p>
          <p className="label">
            Illustrations on this site are generated. Not photographs.
          </p>
        </div>
      </div>
    </footer>
  )
}

function NotFound() {
  return (
    <div className="mx-auto max-w-[760px] px-5 py-28 lg:px-8">
      <p className="label text-stamp">Nothing filed here</p>
      <h1 className="display mt-4 text-[clamp(2.5rem,8vw,4.5rem)]">
        That page isn&rsquo;t in the cabinet.
      </h1>
      <p className="mt-6 text-xl text-ink-2">
        The drawer you opened is empty. If you were looking for something specific,
        ask us and we&rsquo;ll go find it.
      </p>
      <div className="mt-9 flex flex-wrap gap-4">
        <Link to="/" className="btn">
          Back to the front desk
        </Link>
        <Link to="/request" className="btn btn-ghost">
          Start a request
        </Link>
      </div>
    </div>
  )
}
