import type { Localized } from './types'

/** Textos de la interfaz. El contenido (proyectos, experiencia) vive en `constants`. */
export const UI = {
  // SEO
  seoHomeTitle: { es: 'David Garzón — Desarrollador Fullstack', en: 'David Garzón — Fullstack Developer' },
  seoHomeDescription: {
    es: 'Desarrollador Fullstack de Colombia. Construyo software completo, de la idea al producto.',
    en: 'Fullstack developer from Colombia. I build complete software, from idea to product.',
  },
  seoAboutTitle: { es: 'Sobre mí — David Garzón', en: 'About — David Garzón' },
  seoAboutDescription: {
    es: 'Mi experiencia, educación y stack tecnológico como Desarrollador Fullstack.',
    en: 'My experience, education and tech stack as a Fullstack Developer.',
  },
  seoProjectsTitle: { es: 'Proyectos — David Garzón', en: 'Projects — David Garzón' },
  seoProjectsDescription: {
    es: 'Proyectos reales en producción: Conectate OSS, Gessat y el menú web de Pizzatelo.',
    en: 'Real projects in production: Conectate OSS, Gessat and the Pizzatelo web menu.',
  },

  // Encabezado y pie
  navLabel: { es: 'Navegación principal', en: 'Main navigation' },
  mobileNavLabel: { es: 'Menú de navegación móvil', en: 'Mobile navigation menu' },
  homeLabel: { es: 'David Garzón — Inicio', en: 'David Garzón — Home' },
  openMenu: { es: 'Abrir menú', en: 'Open menu' },
  closeMenu: { es: 'Cerrar menú', en: 'Close menu' },
  switchLanguage: { es: 'Cambiar idioma a inglés', en: 'Switch language to Spanish' },
  socialLinks: { es: 'Enlaces sociales', en: 'Social links' },
  opensNewTab: { es: '(se abre en nueva pestaña)', en: '(opens in a new tab)' },
  sendEmailTo: { es: 'Enviar correo a', en: 'Send an email to' },

  // Portada
  available: { es: 'Disponible para proyectos', en: 'Available for projects' },
  tagline: {
    es: 'Construyo software completo, de la idea al producto.',
    en: 'I build complete software, from idea to product.',
  },
  viewProjects: { es: 'Ver proyectos', en: 'View projects' },
  techListLabel: { es: 'Tecnologías que utilizo', en: 'Technologies I use' },

  // Sobre mí
  hello: { es: 'Hola, soy', en: "Hi, I'm" },
  photoOf: { es: 'Foto de', en: 'Photo of' },
  flagLabel: { es: 'Bandera de Colombia', en: 'Flag of Colombia' },
  downloadCv: { es: 'Descargar CV', en: 'Download CV' },
  experienceEyebrow: { es: 'Recorrido', en: 'Journey' },
  experienceTitle: { es: 'Experiencia', en: 'Experience' },
  educationEyebrow: { es: 'Formación', en: 'Background' },
  educationTitle: { es: 'Educación', en: 'Education' },
  current: { es: 'Actual', en: 'Current' },
  internship: { es: 'Práctica', en: 'Internship' },
  logoOf: { es: 'Logo de', en: 'Logo of' },
  technologiesUsed: { es: 'Tecnologías usadas', en: 'Technologies used' },

  // Proyectos
  projectsEyebrow: { es: 'Trabajo', en: 'Work' },
  projectsTitle: { es: 'Proyectos', en: 'Projects' },
  projectsIntro: {
    es: 'Cosas que construí y que están funcionando en producción para clientes reales.',
    en: 'Things I built that are running in production for real clients.',
  },
  projectScreenshot: { es: 'Imagen del proyecto', en: 'Project image' },
  technologiesOf: { es: 'Tecnologías de', en: 'Technologies of' },
  viewSite: { es: 'Ver sitio', en: 'View site' },
  viewSiteOf: { es: 'Ver sitio de', en: 'View site of' },
  viewCodeOf: { es: 'Ver código en GitHub de', en: 'View GitHub code of' },
  featured: { es: 'Destacado', en: 'Featured' },
  privateProject: { es: 'Plataforma privada', en: 'Private platform' },

  // General
  loading: { es: 'Cargando', en: 'Loading' },
  notFound: { es: 'Página no encontrada.', en: 'Page not found.' },

  // Muñequito
  buddyHello: { es: '¡Hola!', en: 'Hi!' },
  buddyJump: { es: 'Hacer saltar al muñequito', en: 'Make the buddy jump' },
} as const satisfies Record<string, Localized>

export type UIKey = keyof typeof UI
