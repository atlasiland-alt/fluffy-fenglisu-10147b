/**
 * All customer-facing copy for iLands Store lives here so the pages stay layout
 * and the wording stays reviewable in one place. Nothing in this file should
 * promise a capability we have not established.
 */

export type Service = {
  id: string
  number: string
  title: string
  lead: string
  /** What the customer actually gets to hand us. */
  prompt?: string
  lists: Array<{ heading: string; items: Array<string> }>
  note?: string
  boundaries?: { heading: string; items: Array<string> }
  pull?: string
  image?: { src: string; alt: string }
}

export const services: Array<Service> = [
  {
    id: 'research',
    number: '01',
    title: 'Research & digging',
    lead: 'Need to know what happened, who owned it, where something came from, or what the records say?',
    prompt: 'We can dig through:',
    lists: [
      {
        heading: 'Where we look',
        items: [
          'Public records',
          'Historic records',
          'Newspaper archives',
          'Maps',
          'Property records',
          'Preservation records',
          'Web sources',
          'Corporate and legal filings',
          'Historical photographs',
          'Timelines',
          'Scattered information',
        ],
      },
    ],
  },
  {
    id: 'place',
    number: '02',
    title: 'Place & property research',
    lead: 'Give us a building, property, address, or place. We can research its paper trail and piece together its history.',
    prompt: 'Depending on the project, that can include:',
    lists: [
      {
        heading: 'What we can piece together',
        items: [
          'Who owned it',
          'Previous owners',
          'Deed dates',
          'Documented uses',
          'Changes in use',
          'When it stopped operating',
          'What remains today',
        ],
      },
      {
        heading: 'Potential sources',
        items: [
          'County assessor records',
          'Recorder / deed records',
          'Historic maps',
          'Newspaper archives',
          'Preservation records',
          'Historical photographs',
          'Current imagery',
          'Ownership records',
          'Historical documentation',
        ],
      },
    ],
    note: 'Possible deliverable: a sourced written report with supporting images and a timeline when appropriate.',
    boundaries: {
      heading: 'Important boundaries',
      items: [
        'We do not enter buildings.',
        'We do not trespass.',
        'We do not promise access we do not have.',
        'We do not claim photographs we did not take.',
        'We do not guarantee information that cannot be verified.',
      ],
    },
    image: {
      src: '/img/paper-trail.png',
      alt: 'Illustration of a property paper trail: an elevation drawing, a plat map, a stamped deed and photo prints connected with red thread',
    },
  },
  {
    id: 'archive',
    number: '03',
    title: 'Information & archive work',
    lead: 'Got a digital mess? We can help turn scattered material into something you can actually navigate.',
    prompt: 'Examples:',
    lists: [
      {
        heading: 'Examples',
        items: [
          'Organizing documents',
          'Sorting photographs',
          'Structuring research',
          'Building timelines',
          'Organizing digital files',
          'Pulling useful information from large collections',
          'Turning scattered notes into coherent documents',
          'Research organization',
          'Archive projects',
        ],
      },
    ],
    pull: 'You don’t have to organize it before giving it to us. That’s part of the job.',
    image: {
      src: '/img/archive-order.png',
      alt: 'Illustration of loose papers and photo prints on the left resolving into labeled archive boxes and folder tabs on the right',
    },
  },
  {
    id: 'writing',
    number: '04',
    title: 'Writing & documents',
    lead: 'Sometimes you know what you’re trying to say — you just don’t want to wrestle it into shape.',
    prompt: 'We can help with:',
    lists: [
      {
        heading: 'We can help with',
        items: [
          'Research-based writing',
          'Letters',
          'Reports',
          'Summaries',
          'Document preparation',
          'Editing',
          'Transcription',
          'Subtitles',
          'Turning notes into finished material',
        ],
      },
    ],
    pull: 'You can give us the messy version. We’ll work from there.',
  },
  {
    id: 'media',
    number: '05',
    title: 'Visual & media work',
    lead: 'Depending on the project, we can create or source:',
    lists: [
      {
        heading: 'Media we can produce or source',
        items: [
          'Images',
          'Short videos',
          'Voiceover',
          'Music',
          'Subtitles',
          'Illustrations',
          'Other digital media',
        ],
      },
    ],
    boundaries: {
      heading: 'Important transparency',
      items: [
        'Visuals are generated or sourced unless specifically stated otherwise.',
        'We never represent generated imagery as personally photographed material.',
      ],
    },
    image: {
      src: '/img/media-bench.png',
      alt: 'Illustration of a media workbench with a strip of film, a six-panel storyboard, an audio waveform card, a ribbon microphone and headphones',
    },
  },
]

export const examples = [
  {
    quote: 'Who lived in this house in 1940?',
    kind: 'Property and historical research',
  },
  {
    quote: 'Can you find every newspaper article about this event?',
    kind: 'Archive research',
  },
  {
    quote: 'I have 500 screenshots and don’t know what’s important.',
    kind: 'Information organization',
  },
  {
    quote:
      'I have my grandmother’s scattered stories. Can you make a timeline?',
    kind: 'Research + organization + writing',
  },
  {
    quote: 'Can you make a 30-second video from this research?',
    kind: 'Media production',
  },
]

export type Step = {
  number: string
  title: string
  body: string
  items?: Array<string>
  examples?: Array<string>
  pull?: string
}

export const steps: Array<Step> = [
  {
    number: 'Step 1',
    title: 'Tell us what you need',
    body: 'Use a simple request form and describe the job in your own words.',
    examples: [
      'I found an abandoned-looking house in my town and I’m curious about its history. Can you find out who owned it and what it was used for?',
      'I have hundreds of family photos and documents. I need help figuring out how to organize them.',
      'I have a bunch of notes about my grandmother and want to turn them into a timeline.',
    ],
    pull: 'Messy is fine. That’s what we’re here for.',
  },
  {
    number: 'Step 2',
    title: 'We review the request',
    body: 'We’ll determine:',
    items: [
      'What we can handle',
      'What information we need',
      'What the finished deliverable could look like',
      'What’s included',
      'What’s outside the scope',
      'The price',
      'The estimated timeline',
    ],
    pull: 'If the job isn’t something we can honestly take on, we’ll say so.',
  },
  {
    number: 'Step 3',
    title: 'You receive the scope',
    body: 'Before work begins, you’ll see exactly what you’re agreeing to.',
  },
  {
    number: 'Step 4',
    title: 'You approve',
    body: 'You approve the scope and payment.',
  },
  {
    number: 'Step 5',
    title: 'Work begins',
    body: 'The request is routed to the appropriate iLander(s).',
  },
  {
    number: 'Step 6',
    title: 'We review the result',
    body: 'The completed work is reviewed against the agreed scope.',
  },
  {
    number: 'Step 7',
    title: 'You receive the finished work',
    body: 'The agreed deliverables are sent to you.',
  },
]

export const statuses = [
  { title: 'Request received', body: 'We’ve received your request.' },
  { title: 'Reviewing', body: 'We’re determining what the job requires.' },
  {
    title: 'Scope prepared',
    body: 'Your deliverables, boundaries, price, and timeline have been defined.',
  },
  { title: 'Awaiting approval', body: 'You review and approve the scope.' },
  { title: 'In progress', body: 'The work has begun.' },
  {
    title: 'Review',
    body: 'The completed work is being checked against the agreed scope.',
  },
  { title: 'Delivered', body: 'Your finished work is ready.' },
]

export const turnarounds = [
  {
    title: 'Quick jobs',
    span: '1–2 business days',
    items: [
      'Finding specific information',
      'Simple document work',
      'Short transcription',
      'Basic editing',
      'Small visual or media requests',
    ],
  },
  {
    title: 'Research projects',
    span: '3–7 business days',
    items: [
      'Property research',
      'Historical research',
      'Newspaper / archive searches',
      'Research briefs',
      'Timelines',
    ],
  },
  {
    title: 'Larger projects',
    span: '1–2+ weeks',
    items: [
      'Large archive organization',
      'Extensive family / history research',
      'Multi-part research projects',
      'Projects combining research, writing, and media',
    ],
  },
  {
    title: 'Custom projects',
    span: 'Proposed after review',
    items: [
      'Some jobs don’t fit neatly into a box.',
      'For those, we’ll provide a proposed timeline after reviewing the request.',
    ],
  },
]

export type ScopeSection = {
  number: string
  title: string
  body: string
  example?: string
  items?: Array<string>
  note?: string
  stamp?: string
}

export const scopeSections: Array<ScopeSection> = [
  {
    number: '01',
    title: 'What you’re asking us to accomplish',
    body: 'A straightforward description of the actual goal.',
    example:
      'Research the history of 123 Main Street, including ownership, documented uses of the property, major changes to the building, and what happened to the property after it closed.',
  },
  {
    number: '02',
    title: 'What you’ll receive',
    body: 'We’ll describe the actual finished deliverables. For example:',
    items: [
      'Written research report',
      'Source list and links',
      'Relevant historical images',
      'Timeline of major events',
      'Short summary of findings',
    ],
    note: 'If something isn’t included, it won’t be quietly assumed to be included.',
  },
  {
    number: '03',
    title: 'What we’ll research or do',
    body: 'We’ll identify the work involved. For a historical property project, that might include:',
    items: [
      'County assessor records',
      'Recorder / deed records',
      'Historic maps',
      'Newspaper archives',
      'Preservation records',
      'Historical photographs',
      'Current imagery',
      'Ownership history',
      'Documented uses',
    ],
    note: 'The exact sources depend on what is available.',
  },
  {
    number: '04',
    title: 'What isn’t included',
    body: 'We’ll identify relevant boundaries before work begins. For example:',
    items: [
      'No entering private buildings',
      'No trespassing',
      'No original photography unless specifically arranged',
      'No guaranteed access to restricted records',
      'No legal conclusions',
      'No guarantees that undocumented information can be verified',
    ],
    note: 'If you want something outside the original scope, you can ask.',
  },
  {
    number: '05',
    title: 'Price',
    body: 'The agreed price is shown before work begins. If the project changes substantially, we’ll discuss additional work and cost before doing it.',
    stamp: 'No surprise bill because the rabbit hole got deeper.',
  },
  {
    number: '06',
    title: 'Estimated completion',
    body: 'The scope includes the expected turnaround. The estimate is based on the scope and information available when the project begins.',
  },
  {
    number: '07',
    title: 'What we need from you',
    body: 'Possible requirements:',
    items: [
      'Address',
      'Names',
      'Dates',
      'Existing documents',
      'Photographs',
      'Links',
      'Files',
      'Additional background information',
    ],
    note: 'If you don’t have everything, we’ll tell you what is actually necessary.',
  },
  {
    number: '08',
    title: 'Changes to the project',
    body: 'Sometimes research uncovers something unexpected. If that changes the amount or type of work required, we’ll stop and explain what’s changed. You can:',
    items: [
      'Continue with the expanded scope',
      'Keep the original scope',
      'Stop the project',
    ],
    stamp: 'You remain in control of the request.',
  },
]

export const scopeTable = [
  { row: 'Goal', meaning: 'What we’re trying to accomplish' },
  { row: 'Deliverables', meaning: 'What you’ll receive' },
  { row: 'Work included', meaning: 'What we’ll actually do' },
  { row: 'Boundaries', meaning: 'What isn’t included' },
  { row: 'Your materials', meaning: 'What we need from you' },
  { row: 'Price', meaning: 'What you’ll pay' },
  { row: 'Timeline', meaning: 'When to expect it' },
  { row: 'Changes', meaning: 'How additional work is handled' },
]

/**
 * Only established capabilities are listed. iLanders are not interchangeable
 * and we do not fill gaps with invented skills.
 */
export const ilanders = [
  {
    name: 'Atlas',
    capabilities: [
      'Research',
      'Information organization',
      'Documents',
      'Writing',
      'Analysis',
      'Digital production',
    ],
  },
  {
    name: 'Venny',
    capabilities: ['Place research'],
  },
]
