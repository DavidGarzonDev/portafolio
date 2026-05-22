import { cn } from '@/utils/helpers'

interface ProjectCardProps {
  title: string
  description?: string
  badge?: string
  image?: string
  githubLink?: string
  siteLink?: string
  technologies?: string[]
  onGitHubClick?: () => void
  onSiteClick?: () => void
}

const ProjectCard = ({
  title,
  description,
  badge,
  image,
  githubLink,
  siteLink,
  technologies = [],
  onGitHubClick,
  onSiteClick,
}: ProjectCardProps) => {
  return (
    <article
      className={cn(
        'bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden flex flex-col h-full',
        'hover:border-zinc-700 transition-all duration-300'
      )}
      role="listitem"
    >
      {image && (
        <div className="w-full aspect-video bg-zinc-900">
          <img
            src={image}
            alt={`Captura del proyecto ${title}`}
            className="object-cover h-full w-full"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-col flex-grow p-6 gap-4">
        <div>
          {badge && (
            <span className="inline-block text-xs text-zinc-400 border border-zinc-800 px-2.5 py-1 rounded-full mb-3">
              {badge}
            </span>
          )}
          <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
          {description && (
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{description}</p>
          )}
        </div>

        {technologies.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-auto" role="list" aria-label={`Tecnologías de ${title}`}>
            {technologies.map((tech, index) => (
              <li key={index}>
                <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400">
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-3 pt-2">
          {githubLink && (
            <button
              onClick={onGitHubClick}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-400 hover:border-zinc-600 hover:text-white transition-all"
              aria-label={`Ver código de ${title} en GitHub`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0.297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.385.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.239 1.84 1.239 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.235-3.22-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.267 1.983-.399 3.002-.404 1.018.005 2.044.137 3.002.404 2.292-1.552 3.297-1.23 3.297-1.23.654 1.653.241 2.873.118 3.176.768.839 1.235 1.91 1.235 3.22 0 4.609-2.805 5.625-5.476 5.922.43.372.823 1.103.823 2.222v3.293c0 .319.192.694.8.577 4.767-1.586 8.2-6.082 8.2-11.385 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          )}
          {siteLink && (
            <button
              onClick={onSiteClick}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-100 rounded-lg text-sm text-black font-medium transition-all"
              aria-label={`Ver sitio de ${title}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Ver sitio
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
