// One-off asset generation for iLands Store illustrations.
// Run with: node scripts/gen-images.mjs   (requires Netlify AI Gateway env vars)
import { writeFileSync } from 'node:fs'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.NETLIFY_AI_GATEWAY_KEY,
  httpOptions: { baseUrl: process.env.NETLIFY_AI_GATEWAY_BASE_URL?.replace(/\/$/, '') },
})

const PALETTE =
  'Limited screenprint palette only: warm cream paper #F4EFE6, warm off-black ink #1E1B16, oxide red #B4442E, manila gold #C99A2E, deep archival green #2E4A45. ' +
  'Textured risograph / screenprint editorial illustration, visible halftone grain and slight print misregistration, flat shapes, hand-inked linework. ' +
  'Absolutely no legible text, no words, no letters, no numbers, no signage, no logos. No people. Matte, printed-on-paper feel, not glossy, not 3D render, not photographic.'

const JOBS = [
  {
    file: 'desk-overhead.png',
    prompt:
      'Overhead flat-lay illustration of a working research desk mid-project: open manila folders, a stack of deed-style documents with rubber-stamp marks, a folded property plat map, loose photographic prints with white borders, index cards, a spiral notebook, a magnifying glass, a chipped coffee mug, a pair of scissors, paper clips and a roll of tape. Slightly messy, arranged asymmetrically, papers overlapping at odd angles. ' +
      PALETTE,
  },
  {
    file: 'paper-trail.png',
    prompt:
      'Collage illustration of a property paper trail: a hand-drawn architectural elevation of a modest old two-story house, layered behind it a survey plat map with lot lines, a county deed document with a circular stamp, a clipped newspaper fragment rendered as abstract grey halftone lines instead of readable type, and two small square photo prints. Pieces pinned and taped together with a thin red thread connecting them. ' +
      PALETTE,
  },
  {
    file: 'archive-order.png',
    prompt:
      'Illustration in two halves without a hard border: on the left a chaotic drift of loose papers, photo envelopes, receipts and screenshots tumbling in a pile; on the right the same material resolved into neat labeled archive boxes, tidy folder tabs and a clean numbered card index. Sense of mess becoming order, left to right. ' +
      PALETTE,
  },
  {
    file: 'media-bench.png',
    prompt:
      'Illustration of a small media workbench viewed at an angle: a strip of 35mm film laid diagonally across the surface, a paper storyboard of six empty rectangles, an audio waveform drawn as a row of vertical ink bars on a card, a vintage ribbon microphone, and headphones coiled beside them. Craft-table feel, tools of the trade, asymmetric composition. ' +
      PALETTE,
  },
]

for (const job of JOBS) {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: job.prompt,
    })
    const part = res.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)
    if (!part) {
      console.error('no image returned for', job.file)
      continue
    }
    writeFileSync(`public/img/${job.file}`, Buffer.from(part.inlineData.data, 'base64'))
    console.log('wrote', job.file)
  } catch (err) {
    console.error('failed', job.file, err?.message ?? err)
  }
}
