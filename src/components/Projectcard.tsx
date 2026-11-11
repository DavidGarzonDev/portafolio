import { useRef, type MouseEvent } from 'react'
import { cn } from '@/utils/helpers'
import TechIcon from '@/components/TechIcon'
import useLanguage from '@/i18n/useLanguage'
import type { ProjectData } from '@/constants'

interface ProjectCardProps {
  project: ProjectData
  image?: string
  /** Tarjeta destacada: ocupa todo el ancho con la imagen al lado del texto. */
  featured?: boolean
  priority?: boolean
}

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.385.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.239 1.84 1.239 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.235-3.22-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.267 1.983-.399 3.002-.404 1.018.005 2.044.137 3.002.404 2.292-1.552 3.297-1.23 3.297-1.23.654 1.653.241 2.873.118 3.176.768.839 1.235 1.91 1.235 3.22 0 4.609-2.805 5.625-5.476 5.922.43.372.823 1.103.823 2.222v3.293c0 .319.192.694.8.577 4.767-1.586 8.2-6.082 8.2-11.385 0-6.627-5.373-12-12-12z" />
  </svg>
)

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth={1.5} />
    <path strokeLinecap="round" strokeWidth={1.5} d="M8 11V7a4 4 0 018 0v4" />
  </svg>
)

const ProjectCard = ({ project, image, featured = false, priority = false }: ProjectCardProps) => {
  const { t, tr } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const { title, siteLink, githubLink, technologies } = project

  // Luz suave que sigue al cursor dentro de la tarjeta (sin re-renderizar).
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        'group relative h-full overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950',
        'transition-[transform,border-color,box-shadow] duration-300 ease-out',
        'motion-safe:hover:-translate-y-1 hover:border-zinc-700',
        'hover:shadow-[0_24px_60px_-24px_rgba(255,255,255,0.14)]',
        featured ? 'flex flex-col md:grid md:grid-cols-[1.1fr_1fr]' : 'flex flex-col'
      )}
    >
      {/* Luz que sigue al cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.07), transparent 45%)',
        }}
        aria-hidden="true"
      />

      {image && (
        <div
          className={cn(
            'relative overflow-hidden aspect-video',
            featured ? 'bg-[#09090b]' : 'bg-zinc-900',
            featured ? 'md:aspect-auto md:h-full md:min-h-[22rem] border-b md:border-b-0 md:border-r border-zinc-900' : 'border-b border-zinc-900'
          )}
        >
          <img
            src={image}
            alt={`${t('projectScreenshot')} ${title}`}
            className={cn(
              'absolute inset-0 h-full w-full transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]',
              // La destacada se muestra completa: su portada ya trae el fondo oscuro de la tarjeta.
              featured ? 'object-contain' : 'object-cover'
            )}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent" aria-hidden="true" />
          {featured && (
            <span className="absolute left-4 top-4 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-black">
              {t('featured')}
            </span>
          )}
        </div>
      )}

      <div className={cn('relative z-20 flex flex-grow flex-col gap-5', featured ? 'p-6 md:p-8' : 'p-6')}>
        <div>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            {tr(project.badge)}
          </span>

          <h3 className={cn('font-bold tracking-tight text-white', featured ? 'text-3xl' : 'text-2xl')}>{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{tr(project.description)}</p>
        </div>

        {technologies.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2" aria-label={`${t('technologiesOf')} ${title}`}>
            {technologies.map((tech) => (
              <li key={tech}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
                  <TechIcon name={tech} />
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-3 border-t border-zinc-900 pt-5">
          {siteLink && (
            <a
              href={siteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              aria-label={`${t('viewSiteOf')} ${title} ${t('opensNewTab')}`}
            >
              {t('viewSite')}
              <ArrowIcon className="h-4 w-4 transition-transform motion-safe:group-hover/link:-translate-y-0.5 motion-safe:group-hover/link:translate-x-0.5" />
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
              aria-label={`${t('viewCodeOf')} ${title} ${t('opensNewTab')}`}
            >
              <GitHubIcon />
              GitHub
            </a>
          )}
          {!siteLink && !githubLink && (
            <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
              <LockIcon />
              {t('privateProject')}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
