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
    title: 'Conectate OSS',
    description:
      'Plataforma OSS para un proveedor de internet por fibra óptica con más de 2.300 clientes, construida desde cero y en uso diario. Incluye facturación y cobranza propias, bot de WhatsApp que valida comprobantes de pago con IA, integración con SmartOLT para diagnosticar equipos, mapa de la red FTTH, tickets de soporte con evidencia, instalaciones, inventario, RRHH con reloj biométrico y permisos por rol. Lista para crecer a varias empresas.',
    badge: 'Empresa real · En producción',
    githubLink: undefined,
    siteLink: undefined,
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'TDD', 'DDD'],
  },
  {
    id: '2',
    title: 'Gessat',
    description:
      'Plataforma para que las empresas colombianas lleven su SG-SST: gestión y carga de documentos de seguridad y salud en el trabajo, capacitaciones para sus trabajadores y pagos integrados con Wompi. En uso por clientes reales.',
    badge: 'Cliente real · En producción',
    githubLink: undefined,
    siteLink: 'https://gessat.com.co',
    technologies: ['React', 'Vite', 'Python', 'Wompi', 'PostgreSQL', 'TailwindCSS'],
  },
  {
    id: '3',
    title: 'Pizzatelo',
    description:
      'Menú web interactivo para Pizzatelo Yumbo: catálogo de pizzas con filtros, buscador, ficha de detalle, métodos de pago y pedido directo por WhatsApp. Sitio estático optimizado para SEO.',
    badge: 'Cliente real · En producción',
    githubLink: 'https://github.com/DavidGarzonDev/Pizzatelo',
    siteLink: 'https://pizzatelo-menu.vercel.app',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'SSG'],
  },
] as const

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
  { name: 'Git' },
  { name: 'TDD' },
  { name: 'DDD' },
] as const

export const PERSONAL_INFO = {
  name: 'David Garzón',
  title: 'Desarrollador Fullstack',
  description:
    'Desarrollador Full Stack. Hoy diseño y desarrollo la plataforma con la que opera un proveedor de internet por fibra óptica, usando Python (FastAPI), React y PostgreSQL. Trabajo con Clean Architecture, DDD, POO y principios SOLID, con TDD estricto y un flujo SDD (propuesta, spec, diseño, tareas) apoyado en agentes de IA con Claude Code.',
  passion:
    'Me interesa construir software mantenible que genere valor real. Si tienes un proyecto o una idea, hablemos — mi meta a largo plazo es tener mi propia empresa de desarrollo.',
  location: 'Yumbo, Valle del Cauca',
  techStack: 'Python (FastAPI), React, TypeScript y PostgreSQL',
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
  {
    id: '4',
    role: 'Desarrollador Full Stack',
    company: 'Conéctate Telecomunicaciones',
    type: 'work' as const,
    duration: 'Jun 2026 — Actualidad',
    location: 'Yumbo, Valle del Cauca',
    logo: 'conectate',
    current: true,
    description:
      'Diseño y desarrollo de Conectate OSS, la plataforma con la que opera el ISP. Es un monolito modular con Clean Architecture y DDD (24 módulos), con más de 1.000 archivos de pruebas y despliegues con Docker y migraciones de base de datos. Migré la facturación desde WispHub a un sistema propio. Integraciones con SmartOLT, WhatsApp Cloud API, Wompi, OpenAI y telefonía IP. Desarrollo con agentes de IA (Claude Code), con revisiones y controles de calidad.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'TDD', 'DDD'],
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
