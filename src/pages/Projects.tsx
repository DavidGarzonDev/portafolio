import FadeIn from '@/components/FadeIn'
import ProjectCard from '@/components/Projectcard'
import { PROJECTS_DATA } from '@/constants'
import useSEO from '@/hooks/useSEO'
import { openInNewTab } from '@/utils/helpers'
import GessatImg from '@/assets/gessat.png'

const PROJECT_IMAGES: Record<string, string> = {
  '1': GessatImg,
}

const Projects = () => {
  useSEO({
    title: 'Proyectos — David Garzón',
    description: 'Proyectos reales en producción. Gessat: plataforma SG-SST para empresas colombianas.',
  })
  return (
    <section className="min-h-screen flex flex-col items-center py-24 px-6" aria-labelledby="projects-title">
      <div className="max-w-5xl w-full">
        <FadeIn>
          <p className="text-zinc-600 text-xs tracking-widest uppercase mb-3">Trabajo</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4" id="projects-title">
            Proyectos
          </h2>
          <p className="text-zinc-500 mb-16 max-w-xl">
            Cosas que construí y que están funcionando en producción para clientes reales.
          </p>
        </FadeIn>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Lista de proyectos"
        >
          {PROJECTS_DATA.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.1}>
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              badge={project.badge}
              image={PROJECT_IMAGES[project.id]}
              githubLink={project.githubLink}
              siteLink={project.siteLink}
              technologies={[...project.technologies]}
              priority={i === 0}
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
