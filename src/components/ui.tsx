import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/** Serve generated artwork through the Netlify Image CDN, never the raw PNG. */
export function cdn(src: string, w: number, format = 'webp') {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${w}&fm=${format}`
}

export function Illustration({
  src,
  alt,
  width,
  className = '',
  caption,
}: {
  src: string
  alt: string
  width: number
  className?: string
  caption?: string
}) {
  return (
    <figure className={className}>
      <img
        src={cdn(src, width)}
        srcSet={`${cdn(src, Math.round(width / 2))} ${Math.round(width / 2)}w, ${cdn(src, width)} ${width}w, ${cdn(src, width * 2)} ${width * 2}w`}
        sizes={`(max-width: 768px) 100vw, ${width}px`}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block w-full border-[1.5px] border-ink bg-paper-2"
      />
      <figcaption className="label mt-2 text-ink-3">
        {caption ?? 'Illustration — generated, not a photograph'}
      </figcaption>
    </figure>
  )
}

/** Fades a block up the first time it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    // @ts-expect-error -- polymorphic tag with a shared ref type
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export function SectionLabel({
  index,
  children,
}: {
  index?: string
  children: ReactNode
}) {
  return (
    <p className="label flex items-center gap-3 text-ink-3">
      {index ? <span className="text-stamp">{index}</span> : null}
      <span className="h-px w-8 bg-ink-3/60" aria-hidden />
      <span>{children}</span>
    </p>
  )
}

export function PageHeader({
  index,
  kicker,
  title,
  lead,
  children,
}: {
  index?: string
  kicker: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="border-b-2 border-ink bg-paper-2 gridpaper">
      <div className="mx-auto max-w-[1180px] px-5 py-16 lg:px-8 lg:py-24">
        <div className="rise">
          <SectionLabel index={index}>{kicker}</SectionLabel>
        </div>
        <h1 className="display rise mt-6 max-w-[22ch] text-[clamp(2.5rem,7.5vw,5rem)]" style={{ animationDelay: '90ms' }}>
          {title}
        </h1>
        {lead ? (
          <div
            className="rise mt-7 max-w-[62ch] text-[1.1875rem] leading-relaxed text-ink-2 lg:text-[1.3125rem]"
            style={{ animationDelay: '180ms' }}
          >
            {lead}
          </div>
        ) : null}
        {children ? (
          <div className="rise mt-9" style={{ animationDelay: '260ms' }}>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  )
}

/** A short, deliberate line we stand behind — set like a rubber stamp. */
export function Pull({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-4 border-stamp bg-stamp/5 px-5 py-4 font-body text-[1.0625rem] italic text-ink lg:text-lg">
      {children}
    </p>
  )
}

export function TickList({
  items,
  columns = 1,
  tone = 'ink',
}: {
  items: Array<string>
  columns?: 1 | 2
  tone?: 'ink' | 'stamp'
}) {
  return (
    <ul
      className={`space-y-2 ${columns === 2 ? 'sm:columns-2 sm:gap-x-10 sm:space-y-0' : ''}`}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 py-1 text-[0.9875rem] leading-snug text-ink-2 sm:break-inside-avoid"
        >
          <span
            aria-hidden
            className={`mt-[0.45em] h-[7px] w-[7px] shrink-0 ${tone === 'stamp' ? 'bg-stamp' : 'bg-archive'}`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
