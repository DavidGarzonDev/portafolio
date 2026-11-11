import type { IconType } from 'react-icons'
import { FaJava } from 'react-icons/fa'
import {
  SiChatwoot,
  SiDocker,
  SiFastapi,
  SiFlask,
  SiGit,
  SiJavascript,
  SiMeta,
  SiN8N,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiPreact,
  SiProxmox,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'

const ICONS: Record<string, IconType> = {
  Python: SiPython,
  FastAPI: SiFastapi,
  Flask: SiFlask,
  PostgreSQL: SiPostgresql,
  React: SiReact,
  Preact: SiPreact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  TailwindCSS: SiTailwindcss,
  Vite: SiVite,
  Docker: SiDocker,
  Proxmox: SiProxmox,
  Git: SiGit,
  n8n: SiN8N,
  Chatwoot: SiChatwoot,
  Meta: SiMeta,
  OpenAI: SiOpenai,
  Java: FaJava,
}

interface TechIconProps {
  name: string
  className?: string
}

/** Logo monocromático de una tecnología. No renderiza nada si no hay logo para ese nombre. */
const TechIcon = ({ name, className = 'w-3.5 h-3.5' }: TechIconProps) => {
  const Icon = ICONS[name]
  return Icon ? <Icon className={className} aria-hidden="true" /> : null
}

export default TechIcon
