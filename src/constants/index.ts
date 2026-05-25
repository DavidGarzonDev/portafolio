export const NAV_ITEMS = [
  { label: 'Sobre mí', href: '/about' },
  { label: 'Proyectos', href: '/projects' },
] as const

export const SOCIAL_LINKS = {
  github: 'https://github.com/DavidGarzonDev',
  linkedin: 'https://www.linkedin.com/in/davidgarzondev/',
  email: 'juan.garzon.montenegro@correounivalle.edu.co',
} as const

export const PROJECTS_DATA = [
  {
    id: '1',
    title: 'Gessat',
    description:
      'Evolución y mantenimiento de plataforma web para una consultora especializada en SG-SST, utilizada por clientes reales. Implementación de funcionalidades para gestión y carga de documentos, integración de pagos con Wompi y módulo de cursos en desarrollo.',
    badge: 'Cliente real · En producción',
    githubLink: undefined,
    siteLink: 'https://gessat.com.co',
    technologies: ['React', 'Vite', 'Python', 'Wompi', 'PostgreSQL', 'TailwindCSS'],
  },
] as const

export const TECH_STACK = [
  { name: 'React' },
  { name: 'TypeScript' },
  { name: 'JavaScript' },
  { name: 'Python' },
  { name: 'FastAPI' },
  { name: 'Preact' },
  { name: 'PostgreSQL' },
  { name: 'SQL' },
  { name: 'Git' },
  { name: 'TDD' },
] as const

export const PERSONAL_INFO = {
  name: 'David Garzón',
  title: 'Desarrollador Fullstack',
  description:
    'Desarrollador Full Stack con experiencia en soluciones empresariales usando Python (FastAPI), React y SQL. He trabajado en entornos productivos reales, participando en levantamiento de requisitos, definición funcional y desarrollo de nuevas funcionalidades.',
  passion:
    'Me interesa construir software mantenible que genere valor real. Si tienes un proyecto o una idea, hablemos — mi meta a largo plazo es tener mi propia empresa de desarrollo.',
  location: 'Yumbo, Valle del Cauca',
  techStack: 'React, Python (FastAPI) y PostgreSQL',
} as const

export const EXPERIENCE = [
  {
    id: '1',
    role: 'Tecnología en Desarrollo de Software',
    company: 'Universidad del Valle',
    type: 'education' as const,
    duration: '2022 — 2026',
    location: 'Yumbo, Valle del Cauca',
    logo: 'univalle',
    description:
      'Formación en fundamentos de ingeniería de software, programación orientada a objetos, bases de datos PostgreSQL, UX/UI, redes y sistemas operativos.',
    tags: ['Python', 'Java', 'SQL', 'React', 'Scrum'],
  },
  {
    id: '2',
    role: 'Ejecutivo de Soporte Técnico — Nube',
    company: 'Siesa',
    type: 'work' as const,
    duration: 'Sep 2025 — Mar 2026',
    location: 'Colombia',
    logo: 'siesa',
    description:
      'Desarrollo y optimización de herramientas internas con Python, Flask y SQL para automatizar procesos de soporte. Integración de servicios mediante APIs, refactorización de código y soporte técnico a usuarios en entornos de nube.',
    tags: ['Python', 'Flask', 'SQL', 'APIs REST'],
  },
  {
    id: '3',
    role: 'Desarrollador Full Stack',
    company: 'Startup — España',
    type: 'work' as const,
    duration: 'Mar 2026 — May 2026',
    location: 'Remoto',
    logo: undefined,
    description:
      'Desarrollo y mantenimiento de un CRM empresarial para gestión comercial de e-commerce y dropshipping. Levantamiento de requisitos, elaboración de PRD, implementación de funcionalidades con FastAPI y Preact sobre arquitectura modular aplicando TDD, DDD y KISS.',
    tags: ['FastAPI', 'Python', 'Preact', 'SQL', 'TDD', 'DDD'],
  },
] as const

export const VALIDATION_MESSAGES = {
  required: (field: string) => `El ${field} es obligatorio`,
  invalidEmail: 'Correo no válido',
  minLength: (field: string, min: number) =>
    `El ${field} es muy corto (mínimo ${min} caracteres)`,
} as const

export const SUCCESS_MESSAGES = {
  formSent: '¡Mensaje enviado! Me pongo en contacto pronto.',
} as const

export const ERROR_MESSAGES = {
  formSend: 'No se pudo enviar el mensaje. Intenta de nuevo.',
  generic: 'Algo salió mal. Por favor, intenta más tarde.',
} as const
