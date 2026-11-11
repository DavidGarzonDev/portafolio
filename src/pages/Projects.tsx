import FadeIn from '@/components/FadeIn'
import ProjectCard from '@/components/Projectcard'
import { PROJECTS_DATA } from '@/constants'
import useSEO from '@/hooks/useSEO'
import { openInNewTab } from '@/utils/helpers'
import ConectateImg from '@/assets/conectate.jpg'
import GessatImg from '@/assets/gessat.jpg'
import useLanguage from '@/i18n/useLanguage'
import PizzateloImg from '@/assets/pizzatelo.jpg'

const PROJECT_IMAGES: Record<string, string> = {
  '1': ConectateImg,
  '2': GessatImg,
  '3': PizzateloImg,
}

const Projects = () => {
  const { t, tr } = useLanguage()
  useSEO({ title: t('seoProjectsTitle'), description: t('seoProjectsDescription') })
  return (
    <section className="min-h-screen flex flex-col items-center py-24 px-6" aria-labelledby="projects-title">
      <div className="max-w-5xl w-full">
        <FadeIn>
          <p className="text-zinc-600 text-xs tracking-widest uppercase mb-3">{t('projectsEyebrow')}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4" id="projects-title">
            {t('projectsTitle')}
          </h2>
          <p className="text-zinc-500 mb-16 max-w-xl">
            {t('projectsIntro')}
          </p>
        </FadeIn>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label={t('projectsListLabel')}
        >
          {PROJECTS_DATA.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.1}>
            <ProjectCard
              key={project.id}
              title={project.title}
              description={tr(project.description)}
              badge={tr(project.badge)}
              image={PROJECT_IMAGES[project.id]}
              githubLink={project.githubLink}
              siteLink={project.siteLink}
              technologies={[...project.technologies]}
              priority={i === 0}
              onGitHubClick={() => project.githubLink && openInNewTab(project.githubLink)}
              onSiteClick={() => project.siteLink && openInNewTab(project.siteLink)}
            />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
