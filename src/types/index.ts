// Tipos del Proyecto

export interface Project {
  id: string
  title: string
  description?: string
  badge?: string
  image?: string
  githubLink?: string
  siteLink?: string
  technologies: readonly string[]
}

export interface FormData {
  name: string
  email: string
  message: string
}

export interface FormErrors {
  name?: string
  email?: string
  message?: string
  submit?: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface NavItem {
  label: string
  href: string
}

export interface TechItem {
  name: string
  icon?: string
}