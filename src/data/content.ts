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
  slug: string
  title: string
  category: string
  year: string
  city: string
  country: string
  image: {
    src: string
    alt: string
  }
  aspect: 'landscape' | 'portrait'
  href: string
}

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
}

export interface StudioContent {
  statement: string
  intro: string
  paragraphs: [string, string]
  cta: {
    label: string
    href: string
  }
  studioImage: ImageAsset
  slides: ImageAsset[]
}

export interface Stat {
  value: string
  label: string
}

export interface NumbersStat {
  value: string
  label: string
}

export interface NumbersContent {
  tag: string
  stats: NumbersStat[]
  images: ImageAsset[]
  quote: string
}

export interface ApproachStep {
  number: string
  title: string
  description: string
  image: ImageAsset
}

export interface ApproachContent {
  intro: {
    ringTitle: string
    caption: string
    leftLabel: string
    rightLabel: string
    image: ImageAsset
  }
  steps: ApproachStep[]
}

export interface ServiceItem {
  slug: string
  title: string
  descriptor: string
  href: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export interface ServicesContent {
  tag: string
  items: ServiceItem[] /* exactly 4 */
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
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Approach', href: '#approach' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
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
  // Desktop top-bar nav links (shown in hero header, hidden on mobile)
  navLinks: [
    { label: 'Work', href: '#work', active: true },
    { label: 'Studio', href: '#studio', active: false },
    { label: 'Approach', href: '#approach', active: false },
    { label: 'Journal', href: '#journal', active: false },
    { label: 'Contact', href: '#contact', active: false },
  ],
  eyebrow: 'Architecture & Interior Studio',
  headlineLine1: 'Spaces with',
  headlineLine2: 'a point of view.',
  tags: ['Architecture', 'Interiors', 'Landscape'],
  description1:
    'Founded in Barcelona in 2012, NOVA Atelier works across architecture, interiors and the selection of materials.',
  description2:
    'Every project begins with the site, the light and the daily rituals of the people who will live there.',
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
    slug: 'hotel-sirena',
    title: 'Hotel Sirena',
    category: 'Hospitality',
    year: '2023',
    city: 'Palma de Mallorca',
    country: 'Spain',
    image: {
      src: '/images/projects/hotel-sirena.jpg',
      alt: 'Hotel Sirena — a boutique hotel with calm, curated interiors in Mallorca',
    },
    aspect: 'landscape',
    href: '/work/hotel-sirena',
  },
  {
    slug: 'residences-montserrat',
    title: 'Residences Montserrat',
    category: 'Residential',
    year: '2023',
    city: 'Barcelona',
    country: 'Spain',
    image: {
      src: '/images/projects/residences-montserrat.jpg',
      alt: 'Residences Montserrat — multi-unit urban residences in central Barcelona',
    },
    aspect: 'portrait',
    href: '/work/residences-montserrat',
  },
  {
    slug: 'finca-alba',
    title: 'Finca Alba',
    category: 'Landscape',
    year: '2022',
    city: 'Seville',
    country: 'Spain',
    image: {
      src: '/images/projects/finca-alba.jpg',
      alt: 'Finca Alba — a rural estate with expansive curated gardens in Seville',
    },
    aspect: 'landscape',
    href: '/work/finca-alba',
  },
  {
    slug: 'torre-blanca',
    title: 'Torre Blanca',
    category: 'Interiors',
    year: '2022',
    city: 'Madrid',
    country: 'Spain',
    image: {
      src: '/images/projects/torre-blanca.jpg',
      alt: 'Torre Blanca — a penthouse apartment interior in central Madrid',
    },
    aspect: 'landscape',
    href: '/work/torre-blanca',
  },
]

// ─── Studio Introduction ──────────────────────────────────────────────────────

export const studioContent: StudioContent = {
  statement:
    'We design spaces that feel inevitable, shaped by light, material and the way people live.',
  intro:
    'Founded in Barcelona in 2012, NOVA Atelier works across architecture, interiors and the selection of materials. Every project begins with the site, the light and the daily rituals of the people who will live there.',
  paragraphs: [
    'Our work brings together considered spatial planning, natural stone, timber and lime, and precise detailing to create spaces that feel grounded, warm and enduring.',
    'From first sketch to final handover, we work closely with clients, engineers and local craftspeople, so every decision supports the atmosphere, function and longevity of the home.',
  ],
  cta: {
    label: 'Discover the studio',
    href: '#studio',
  },
  studioImage: {
    src: '/images/studio/studio-interior.jpg',
    alt: 'NOVA Atelier studio interior showing drafting tables and material samples',
    width: 600,
    height: 400,
  },
  slides: [
    {
      src: '/images/projects/casa-lumen-featured.jpg',
      alt: 'Casa Lumen — modern villa with clean geometric lines and floor-to-ceiling glass',
      width: 1400,
      height: 950,
    },
    {
      src: '/images/hero/card-2.jpg',
      alt: 'Curated architectural interior featuring bespoke woodwork and warm ambient light',
      width: 1200,
      height: 800,
    },
    {
      src: '/images/projects/finca-alba.jpg',
      alt: 'Finca Alba — estate landscape integrated with native stone terraces',
      width: 1400,
      height: 933,
    },
    {
      src: '/images/projects/torre-blanca.jpg',
      alt: 'Torre Blanca — minimal penthouse residence in natural earth tones',
      width: 1400,
      height: 933,
    },
  ],
}

// ─── Numbers / Stats ──────────────────────────────────────────────────────────

export const numbersContent: NumbersContent = {
  tag: 'By the numbers',
  stats: [
    { value: '12+', label: 'Years' },
    { value: '48', label: 'Projects' },
    { value: '2012', label: 'Since' },
    { value: '9', label: 'Cities' },
    { value: '17', label: 'Awards' },
  ],
  images: [
    {
      src: '/images/projects/hotel-sirena.jpg',
      alt: 'Hotel Sirena boutique hospitality project in Mallorca',
      width: 800,
      height: 580,
    },
    {
      src: '/images/projects/residences-montserrat.jpg',
      alt: 'Residences Montserrat urban living architecture in Barcelona',
      width: 800,
      height: 580,
    },
    {
      src: '/images/projects/casa-lumen.jpg',
      alt: 'Casa Lumen contemporary coastal residence in Costa Brava',
      width: 800,
      height: 580,
    },
    {
      src: '/images/projects/finca-alba.jpg',
      alt: 'Finca Alba rural landscape and architectural estate in Seville',
      width: 800,
      height: 580,
    },
    {
      src: '/images/projects/torre-blanca.jpg',
      alt: 'Torre Blanca penthouse interior and terrace in Madrid',
      width: 800,
      height: 580,
    },
  ],
  quote: "Good architecture doesn't compete with its surroundings. It gives them meaning.",
}

export const stats: NumbersStat[] = numbersContent.stats

// ─── Approach ─────────────────────────────────────────────────────────────────

export const approachContent: ApproachContent = {
  intro: {
    ringTitle: 'Our approach',
    caption: 'Four steps, from the first conversation to the final detail.',
    leftLabel: 'Barcelona',
    rightLabel: 'Madrid',
    image: {
      src: '/images/projects/casa-lumen-featured.jpg',
      alt: 'NOVA Atelier architectural practice in Barcelona and Madrid',
      width: 1400,
      height: 950,
    },
  },
  steps: [
    {
      number: '01',
      title: 'Understand',
      description: 'We study the site, people and context.',
      image: {
        src: '/images/projects/hotel-sirena.jpg',
        alt: 'Studying site conditions, light, and architectural context',
        width: 1400,
        height: 933,
      },
    },
    {
      number: '02',
      title: 'Define',
      description: 'We establish the concept, materials and spatial language.',
      image: {
        src: '/images/projects/residences-montserrat.jpg',
        alt: 'Defining spatial language and material palette',
        width: 1200,
        height: 800,
      },
    },
    {
      number: '03',
      title: 'Create',
      description: 'Architecture becomes drawings, materials and details.',
      image: {
        src: '/images/projects/torre-blanca.jpg',
        alt: 'Drafting architectural drawings and crafting bespoke details',
        width: 1400,
        height: 933,
      },
    },
    {
      number: '04',
      title: 'Refine',
      description: 'Every element is considered until the space feels complete.',
      image: {
        src: '/images/projects/finca-alba.jpg',
        alt: 'Refining elements on site until complete harmony is achieved',
        width: 1400,
        height: 933,
      },
    },
  ],
}

export const approachSteps: ApproachStep[] = approachContent.steps

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

export const servicesContent: ServicesContent = {
  tag: 'What we do',
  items: [
    {
      slug: 'architecture',
      title: 'Architecture',
      descriptor: 'Residential / Hospitality / Commercial',
      href: '#contact',
      image: {
        src: '/images/projects/casa-lumen.jpg',
        alt: 'Contemporary architecture with clean lines and natural light',
        width: 1400,
        height: 933,
      },
    },
    {
      slug: 'interior-design',
      title: 'Interior Design',
      descriptor: 'Concept / Materiality / Furniture',
      href: '#contact',
      image: {
        src: '/images/projects/torre-blanca.jpg',
        alt: 'Refined interior design featuring natural wood and warm textures',
        width: 1400,
        height: 933,
      },
    },
    {
      slug: 'landscape',
      title: 'Landscape',
      descriptor: 'Gardens / Outdoor spaces / Integration',
      href: '#contact',
      image: {
        src: '/images/projects/finca-alba.jpg',
        alt: 'Expansive curated gardens and native stone terraces',
        width: 1400,
        height: 933,
      },
    },
    {
      slug: 'design-consultancy',
      title: 'Design Consultancy',
      descriptor: 'Strategy / Development / Art direction',
      href: '#contact',
      image: {
        src: '/images/projects/hotel-sirena.jpg',
        alt: 'Strategic design development and architectural consulting',
        width: 1400,
        height: 933,
      },
    },
  ],
}

export const services: ServiceItem[] = servicesContent.items

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
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Pinterest', href: 'https://pinterest.com' },
  ],
}
