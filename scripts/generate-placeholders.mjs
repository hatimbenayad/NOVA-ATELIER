/**
 * generate-placeholders.mjs
 * Generates soft-gradient SVG placeholder images for all project slots.
 * Run once: node scripts/generate-placeholders.mjs
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public', 'images')

// ── Palette — warm neutrals that match the brand ──────────────────────────────
const palettes = [
  ['#D8D3CB', '#C8C3BB'],  // warm taupe
  ['#CDD0CB', '#BCC0BB'],  // sage grey
  ['#D0CDCA', '#C0BDBA'],  // stone
  ['#D4D0CC', '#C4C0BC'],  // greige
  ['#CFCCC8', '#BFBCB8'],  // ash
  ['#D6D2CE', '#C5C1BD'],  // linen
]

const makeSvg = (label, w, h, colorA, colorB) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorA}"/>
      <stop offset="100%" stop-color="${colorB}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
    font-family="'Jost', 'Helvetica Neue', sans-serif"
    font-size="${Math.round(w * 0.018)}" fill="rgba(14,14,14,0.18)"
    letter-spacing="${Math.round(w * 0.004)}">
    ${label.toUpperCase()}
  </text>
</svg>`

const files = [
  // Projects
  { path: 'projects/residences-montserrat.jpg', label: 'Residences Montserrat', w: 880, h: 1100, p: palettes[0] },
  { path: 'projects/finca-alba.jpg',             label: 'Finca Alba',            w: 880, h: 1100, p: palettes[2] },
  { path: 'projects/torre-blanca.jpg',           label: 'Torre Blanca',          w: 880, h: 1100, p: palettes[3] },
  { path: 'projects/spa-solstice.jpg',           label: 'Spa Solstice',          w: 880, h: 1100, p: palettes[4] },
  // Services
  { path: 'services/architecture.jpg',  label: 'Architecture',   w: 1120, h: 960, p: palettes[0] },
  { path: 'services/interiors.jpg',     label: 'Interior Design', w: 1120, h: 960, p: palettes[1] },
  { path: 'services/landscape.jpg',     label: 'Landscape',      w: 1120, h: 960, p: palettes[2] },
  { path: 'services/advisory.jpg',      label: 'Advisory',       w: 1120, h: 960, p: palettes[3] },
  // Journal
  { path: 'journal/limestone.jpg', label: 'On Limestone', w: 960, h: 640, p: palettes[1] },
  { path: 'journal/models.jpg',    label: 'Physical Models', w: 960, h: 640, p: palettes[3] },
  { path: 'journal/garden.jpg',    label: 'The Garden', w: 960, h: 640, p: palettes[2] },
]

for (const { path: relPath, label, w, h, p } of files) {
  const fullPath = join(publicDir, relPath)
  mkdirSync(dirname(fullPath), { recursive: true })
  // Write as .svg but save with the .jpg extension — browsers display both,
  // and Vite serves them fine. For real images, just overwrite these files.
  writeFileSync(fullPath, makeSvg(label, w, h, p[0], p[1]))
  console.log(`✓ ${relPath}`)
}

console.log('\nAll placeholders generated. Drop real images over these files to replace them.')
