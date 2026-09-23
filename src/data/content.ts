/* ─── NOVA Atelier — All site copy ───────────────────────────────────────── *
 * Edit text here. No copy is hardcoded inside JSX components.
 * ───────────────────────────────────────────────────────────────────────── */

// ─── Shared Interfaces ────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
}

export interface HeroCard {
  id: string
  label: string
  alt: string
  imageSrc: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  location: string
  year: string
  category: string
  imageSrc: string
  alt: string
  featured?: boolean
}

export interface Stat {
  value: string
  label: string
}

export interface ApproachStep {
  number: string
  title: string
  body: string
}

export interface Service {
  id: string
  title: string
  description: string
  imageSrc: string
  alt: string
}

export interface JournalPost {
  id: string
  date: string
  category: string
  title: string
  excerpt: string
  imageSrc: string
  alt: string
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  { label: 'Work',     href: '#selected-work' },
  { label: 'Studio',   href: '#studio' },
  { label: 'Approach', href: '#approach' },
  { label: 'Journal',  href: '#journal' },
  { label: 'Contact',  href: '#contact' },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const heroContent = {
  topLeft: {
    line1: 'PREMIUM ARCHITECTURE',
    line2: '& INTERIOR STUDIO',
  },
  topRight: {
    line1: 'SINCE 2012',
    line2: 'BARCELONA · MADRID',
  },
  headline: 'Spaces with a point of view.',
  subheadline: 'Architecture · Interiors · Landscape',
  villaAlt: 'Contemporary villa with timber and white stone facades surrounded by palm trees',
  villaCaption: 'CASA LUMEN',
  villaCaptionSub: 'BY NOVA ATELIER',
} as const

export const heroCards: HeroCard[] = [
  {
    id: 'card-1',
    label: 'Residential Architecture',
    alt: 'Elegant residential architecture project by NOVA Atelier',
    imageSrc: '/images/hero/card-1.jpg',
  },
  {
    id: 'card-2',
    label: 'Hospitality Spaces',
    alt: 'Luxury hospitality interior space designed by NOVA Atelier',
    imageSrc: '/images/hero/card-2.jpg',
  },
  {
    id: 'card-3',
    label: 'Interior Design',
    alt: 'Refined interior design project showcasing bespoke materials',
    imageSrc: '/images/hero/card-3.jpg',
  },
  {
    id: 'card-4',
    label: 'Landscape & Gardens',
    alt: 'Curated landscape and garden design integrated with architecture',
    imageSrc: '/images/hero/card-4.jpg',
  },
]

// ─── Selected Work ────────────────────────────────────────────────────────────

export const selectedWorkContent = {
  eyebrow: 'Selected Work',
  headline: 'Projects that define a generation of living.',
  cta: 'View All Projects',
}

export const projects: Project[] = [
  {
    id: 'casa-lumen',
    title: 'Casa Lumen',
    subtitle: 'A villa defined by light and local stone',
    location: 'Costa Brava, Spain',
    year: '2024',
    category: 'Residential',
    imageSrc: '/images/projects/casa-lumen.jpg',
    alt: 'Casa Lumen — a contemporary villa in Costa Brava with timber and stone facades',
    featured: true,
  },
  {
    id: 'hotel-sirena',
    title: 'Hotel Sirena',
    subtitle: 'Boutique hospitality redefined for the Mediterranean',
    location: 'Palma de Mallorca, Spain',
    year: '2023',
    category: 'Hospitality',
    imageSrc: '/images/projects/hotel-sirena.jpg',
    alt: 'Hotel Sirena — a boutique hotel with calm, curated interiors in Mallorca',
  },
  {
    id: 'residences-montserrat',
    title: 'Residences Montserrat',
    subtitle: 'Urban living sculpted around natural light',
    location: 'Barcelona, Spain',
    year: '2023',
    category: 'Residential',
    imageSrc: '/images/projects/residences-montserrat.jpg',
    alt: 'Residences Montserrat — multi-unit urban residences in central Barcelona',
  },
  {
    id: 'finca-alba',
    title: 'Finca Alba',
    subtitle: 'Rustic landscape meets rigorous contemporary form',
    location: 'Seville, Spain',
    year: '2022',
    category: 'Landscape',
    imageSrc: '/images/projects/finca-alba.jpg',
    alt: 'Finca Alba — a rural estate with expansive curated gardens in Seville',
  },
  {
    id: 'torre-blanca',
    title: 'Torre Blanca',
    subtitle: 'A private penthouse of absolute restraint',
    location: 'Madrid, Spain',
    year: '2022',
    category: 'Interiors',
    imageSrc: '/images/projects/torre-blanca.jpg',
    alt: 'Torre Blanca — a penthouse apartment interior in central Madrid',
  },
  {
    id: 'spa-solstice',
    title: 'Spa Solstice',
    subtitle: "Wellness architecture aligned with the sun's arc",
    location: 'Ibiza, Spain',
    year: '2021',
    category: 'Hospitality',
    imageSrc: '/images/projects/spa-solstice.jpg',
    alt: 'Spa Solstice — a luxury wellness facility in Ibiza oriented to natural light',
  },
]

// ─── Studio Introduction ──────────────────────────────────────────────────────

export const studioContent = {
  eyebrow: 'The Studio',
  headline: 'We build for the way\npeople truly live.',
  body: [
    'Founded in Barcelona in 2012, NOVA Atelier is a multidisciplinary studio that architects space, curates interiors, and composes landscape as a unified discipline.',
    'We believe that great architecture is not an object placed in the world, but a conversation between a building, its landscape, and the people who inhabit it. Every project begins with a rigorous study of context — climate, material culture, the specific light of a place.',
    'Our team of fourteen architects, interior designers, and landscape specialists works across Spain and Southern Europe, taking on a selective number of commissions each year to maintain the standard our clients expect.',
  ],
  cta: 'Meet the Studio',
  imageSrc: '/images/studio/studio-interior.jpg',
  imageAlt: 'Interior of the NOVA Atelier studio showing drafting tables, material samples, and architectural models',
}

// ─── Numbers / Philosophy ─────────────────────────────────────────────────────

export const numbersContent = {
  eyebrow: 'By the Numbers',
  philosophy: '"We do not design buildings. We design the way light enters a room."',
  philosophyAttribution: '— Founder, NOVA Atelier',
}

export const stats: Stat[] = [
  { value: '12+',  label: 'Years of Practice' },
  { value: '78',   label: 'Projects Completed' },
  { value: '4',    label: 'Countries' },
  { value: '14',   label: 'Specialists' },
  { value: '3×',   label: 'AR Award Winner' },
]

// ─── Approach ─────────────────────────────────────────────────────────────────

export const approachContent = {
  eyebrow: 'Our Approach',
  headline: 'A process built on listening.',
}

export const approachSteps: ApproachStep[] = [
  {
    number: '01',
    title: 'Discover',
    body: 'Every engagement begins with immersive research: site visits, climate analysis, material culture studies, and long conversations with the people who will inhabit the space.',
  },
  {
    number: '02',
    title: 'Conceive',
    body: 'From research emerges a singular concept — not an aesthetic, but a spatial logic that governs every decision, from the orientation of a window to the texture of a floor.',
  },
  {
    number: '03',
    title: 'Develop',
    body: 'Concept becomes detail. Our architects and interior designers work in parallel, ensuring that architecture and interiors share one vocabulary rather than two competing ones.',
  },
  {
    number: '04',
    title: 'Deliver',
    body: 'We remain on site from groundbreaking through the final placement of furniture. Craft requires proximity. The finished space is our only measure of success.',
  },
]

// ─── Featured Project ─────────────────────────────────────────────────────────

export const featuredProjectContent = {
  eyebrow: 'Featured Project',
  title: 'Casa Lumen',
  location: 'Costa Brava, Spain · 2024',
  category: 'Residential Architecture',
  body: [
    'Set on a limestone outcrop above the Mediterranean, Casa Lumen was designed around a single obsession: the way the Catalan light changes from hour to hour.',
    'The house uses a palette of three materials — local limestone, FSC-certified Douglas fir, and raw-rolled steel — applied with the rigour of a material study. Every aperture was modelled at the summer and winter solstice before it was fixed.',
  ],
  stats: [
    { label: 'Area', value: '620 m²' },
    { label: 'Year', value: '2024' },
    { label: 'Status', value: 'Completed' },
  ],
  cta: 'View Full Case Study',
  imageSrc: '/images/projects/casa-lumen-featured.jpg',
  imageAlt: 'Casa Lumen viewed from the terrace showing limestone walls and timber pergola against a blue Mediterranean sky',
}

// ─── Services ─────────────────────────────────────────────────────────────────

export const servicesContent = {
  eyebrow: 'What We Do',
  headline: 'Full-spectrum design,\nfrom site to detail.',
}

export const services: Service[] = [
  {
    id: 'architecture',
    title: 'Architecture',
    description: 'New construction, additions, and adaptive reuse — from concept through construction documents and site supervision.',
    imageSrc: '/images/services/architecture.jpg',
    alt: 'Architectural model and elevation drawings on a drafting table',
  },
  {
    id: 'interiors',
    title: 'Interior Design',
    description: 'Bespoke interior environments for residential, hospitality, and cultural clients. Material selection, furniture design, lighting design.',
    imageSrc: '/images/services/interiors.jpg',
    alt: 'Refined living room interior with natural materials and considered lighting',
  },
  {
    id: 'landscape',
    title: 'Landscape & Gardens',
    description: 'Site design, planting strategy, water features, and exterior living spaces conceived as extensions of the interior.',
    imageSrc: '/images/services/landscape.jpg',
    alt: 'Curated garden landscape with native planting and stone pathways',
  },
  {
    id: 'advisory',
    title: 'Design Advisory',
    description: 'For developers and private clients who require strategic design input before committing to a full commission.',
    imageSrc: '/images/services/advisory.jpg',
    alt: 'Architect presenting design options to clients in a meeting room',
  },
]

// ─── Journal ──────────────────────────────────────────────────────────────────

export const journalContent = {
  eyebrow: 'Journal',
  headline: 'Thinking in public.',
  cta: 'Read All Posts',
}

export const journalPosts: JournalPost[] = [
  {
    id: 'post-1',
    date: 'September 2026',
    category: 'Material Culture',
    title: 'On limestone, and the patience of stone.',
    excerpt: 'We have been using Marès stone on the Costa Brava for three years now. Here is what we have learned about working with a material that is literally alive.',
    imageSrc: '/images/journal/limestone.jpg',
    alt: 'Close-up detail of Marès limestone with shadow lines cast across its surface',
  },
  {
    id: 'post-2',
    date: 'July 2026',
    category: 'Practice',
    title: 'Why we still make physical models.',
    excerpt: 'In an era of real-time rendering and AI visualisation, we remain committed to the cardboard model. Here is why the handmade form still teaches us things the screen cannot.',
    imageSrc: '/images/journal/models.jpg',
    alt: 'Architectural models made from cardboard and balsa wood on a studio desk',
  },
  {
    id: 'post-3',
    date: 'May 2026',
    category: 'Landscape',
    title: 'The garden as architecture.',
    excerpt: 'A conversation with our landscape lead on why we refuse to separate inside from out, and how planting design should begin on the first day of a project, not the last.',
    imageSrc: '/images/journal/garden.jpg',
    alt: 'Lush garden terrace connected seamlessly to an interior living space',
  },
]

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contactContent = {
  eyebrow: 'Start a Conversation',
  headline: 'Let us build something worth remembering.',
  body: 'We take on a small number of commissions each year. If your project aligns with our practice, we would be glad to hear from you.',
  offices: [
    {
      city: 'Barcelona',
      address: 'Carrer de Provença 247, 08008',
      phone: '+34 93 000 0000',
      email: 'bcn@novaatelier.studio',
    },
    {
      city: 'Madrid',
      address: 'Calle de Serrano 41, 28001',
      phone: '+34 91 000 0000',
      email: 'mad@novaatelier.studio',
    },
  ],
  cta: 'Send an Enquiry',
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export const footerContent = {
  tagline: 'Architecture with a point of view.',
  copyright: `© ${new Date().getFullYear()} NOVA Atelier SL. All rights reserved.`,
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn',  href: 'https://linkedin.com' },
    { label: 'Pinterest', href: 'https://pinterest.com' },
  ],
}
