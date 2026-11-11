import type { Localized } from '@/i18n/types'

export const NAV_ITEMS = [
  { label: { es: 'Sobre mí', en: 'About' }, href: '/about' },
  { label: { es: 'Proyectos', en: 'Projects' }, href: '/projects' },
] as const satisfies readonly { label: Localized; href: string }[]

export const SOCIAL_LINKS = {
  github: 'https://github.com/DavidGarzonDev',
  linkedin: 'https://www.linkedin.com/in/davidgarzondev/',
  email: 'juan.garzon.montenegro@correounivalle.edu.co',
} as const

export interface ProjectData {
  id: string
  title: string
  description: Localized
  badge: Localized
  githubLink?: string
  siteLink?: string
  technologies: readonly string[]
}

const REAL_CLIENT: Localized = { es: 'Cliente real · En producción', en: 'Real client · In production' }

export const PROJECTS_DATA: readonly ProjectData[] = [
  {
    id: '1',
    title: 'Conectate OSS',
    description: {
      es: 'Plataforma de gestión operativa para un proveedor de internet por fibra óptica, diseñada y construida desde cero y en uso diario en producción. Centraliza facturación y cobranza, pagos en línea, clientes, soporte técnico, instalaciones, inventario y documentación de la red. Incluye atención omnicanal integrada con Meta (WhatsApp, Facebook e Instagram), Chatwoot y n8n, con un asistente que responde a los clientes con información en tiempo real de la plataforma. Arquitectura multiempresa con control de acceso por roles.',
      en: 'Operations platform for a fiber-optic internet provider, designed and built from scratch and used daily in production. It brings together billing and collections, online payments, customers, technical support, installations, inventory and network documentation. It includes omnichannel customer service integrated with Meta (WhatsApp, Facebook and Instagram), Chatwoot and n8n, with an assistant that answers customers using real-time data from the platform. Multi-tenant architecture with role-based access control.',
    },
    badge: { es: 'Empresa real · En producción', en: 'Real company · In production' },
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'n8n', 'Chatwoot', 'Meta'],
  },
  {
    id: '2',
    title: 'Gessat',
    description: {
      es: 'Plataforma para que las empresas colombianas lleven su SG-SST: gestión y carga de documentos de seguridad y salud en el trabajo, capacitaciones para sus trabajadores y pagos integrados con Wompi. En uso por clientes reales.',
      en: 'Platform for Colombian companies to run their occupational health and safety management system (SG-SST): document management and uploads, employee training courses and payments integrated with Wompi. Used by real clients.',
    },
    badge: REAL_CLIENT,
    siteLink: 'https://gessat.com.co',
    technologies: ['React', 'Vite', 'Python', 'Wompi', 'PostgreSQL', 'TailwindCSS'],
  },
  {
    id: '3',
    title: 'Pizzatelo',
    description: {
      es: 'Menú web interactivo para Pizzatelo Yumbo: catálogo de pizzas con filtros, buscador, ficha de detalle, métodos de pago y pedido directo por WhatsApp. Sitio estático optimizado para SEO.',
      en: 'Interactive web menu for Pizzatelo Yumbo: pizza catalog with filters, search, detail view, payment methods and ordering straight through WhatsApp. Static site optimized for SEO.',
    },
    badge: REAL_CLIENT,
    githubLink: 'https://github.com/DavidGarzonDev/Pizzatelo',
    siteLink: 'https://pizzatelo-menu.vercel.app',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'SSG'],
  },
]

export const TECH_STACK = [
  { name: 'React' },
  { name: 'TypeScript' },
  { name: 'JavaScript' },
  { name: 'Python' },
  { name: 'FastAPI' },
  { name: 'Preact' },
  { name: 'Next.js' },
  { name: 'PostgreSQL' },
  { name: 'SQL' },
  { name: 'Docker' },
  { name: 'n8n' },
  { name: 'Chatwoot' },
  { name: 'Git' },
  { name: 'TDD' },
  { name: 'DDD' },
] as const

export const PERSONAL_INFO = {
  name: 'David Garzón',
  title: { es: 'Desarrollador Fullstack', en: 'Fullstack Developer' },
  description: {
    es: 'Desarrollador Full Stack. Diseño y construyo plataformas empresariales que operan en producción todos los días, con Python (FastAPI), React, TypeScript y PostgreSQL. Trabajo con Clean Architecture, DDD, POO y principios SOLID, con TDD estricto y un flujo SDD (propuesta, spec, diseño, tareas) apoyado en agentes de IA con Claude Code.',
    en: 'Full Stack Developer. I design and build business platforms that run in production every day, with Python (FastAPI), React, TypeScript and PostgreSQL. I work with Clean Architecture, DDD, OOP and SOLID principles, strict TDD and an SDD workflow (proposal, spec, design, tasks) powered by AI agents with Claude Code.',
  },
  passion: {
    es: 'Me interesa construir software mantenible que genere valor real. Si tienes un proyecto o una idea, hablemos — mi meta a largo plazo es tener mi propia empresa de desarrollo.',
    en: "I care about building maintainable software that creates real value. If you have a project or an idea, let's talk — my long-term goal is to run my own software company.",
  },
  location: 'Yumbo, Valle del Cauca',
} as const

export interface ExperienceItem {
  id: string
  role: Localized
  company: string
  type: 'work' | 'education'
  duration: Localized
  location: Localized
  logo?: 'conectate' | 'siesa' | 'univalle'
  current?: boolean
  achievement?: Localized
  description: Localized
  tags: readonly string[]
}

export const EXPERIENCE: readonly ExperienceItem[] = [
  {
    id: '4',
    role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
    company: 'Conéctate Telecomunicaciones',
    type: 'work',
    duration: { es: 'Jun 2026 — Actualidad', en: 'Jun 2026 — Present' },
    location: { es: 'Yumbo, Valle del Cauca', en: 'Yumbo, Colombia' },
    logo: 'conectate',
    current: true,
    description: {
      es: 'Diseño y desarrollo de Conectate OSS, la plataforma con la que opera la empresa: un monolito modular con Clean Architecture y DDD, construido con TDD y desplegado con Docker. Migré la facturación desde un sistema de terceros a una solución propia. Implementé la atención omnicanal con Meta, Chatwoot y n8n, además de integraciones con pasarelas de pago, gestión de red y telefonía IP. Desarrollo asistido por agentes de IA (Claude Code) con revisión y control de calidad en cada entrega.',
      en: "Design and development of Conectate OSS, the platform the company runs on: a modular monolith with Clean Architecture and DDD, built with TDD and deployed with Docker. I migrated billing from a third-party system to an in-house solution. I implemented omnichannel customer service with Meta, Chatwoot and n8n, plus integrations with payment gateways, network management and VoIP. AI-assisted development (Claude Code) with review and quality control on every delivery.",
    },
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'n8n', 'Chatwoot'],
  },
  {
    id: '2',
    role: { es: 'Ejecutivo de Soporte Técnico — Nube', en: 'Cloud Technical Support Specialist' },
    company: 'Siesa',
    type: 'work',
    duration: { es: 'Sep 2025 — Mar 2026', en: 'Sep 2025 — Mar 2026' },
    location: { es: 'Colombia', en: 'Colombia' },
    logo: 'siesa',
    description: {
      es: 'Desarrollo y optimización de herramientas internas con Python, Flask y SQL para automatizar procesos de soporte. Integración de servicios mediante APIs, refactorización de código y soporte técnico a usuarios en entornos de nube.',
      en: 'Built and optimized internal tools with Python, Flask and SQL to automate support processes. Service integration through APIs, code refactoring and technical support for users in cloud environments.',
    },
    tags: ['Python', 'Flask', 'SQL', 'APIs REST'],
  },
  {
    id: '1',
    role: { es: 'Tecnología en Desarrollo de Software', en: 'Software Development Technologist' },
    company: 'Universidad del Valle',
    type: 'education',
    duration: { es: '2022 — 2026', en: '2022 — 2026' },
    location: { es: 'Yumbo, Valle del Cauca', en: 'Yumbo, Colombia' },
    logo: 'univalle',
    achievement: {
      es: 'Reconocido como mejor graduando del programa',
      en: 'Recognized as the top graduate of the program',
    },
    description: {
      es: 'Formación en fundamentos de ingeniería de software, programación orientada a objetos, bases de datos PostgreSQL, UX/UI, redes y sistemas operativos.',
      en: 'Training in software engineering fundamentals, object-oriented programming, PostgreSQL databases, UX/UI, networking and operating systems.',
    },
    tags: ['Python', 'Java', 'SQL', 'React', 'Scrum'],
  },
]
