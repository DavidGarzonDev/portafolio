import { motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import { SOCIAL_LINKS, PERSONAL_INFO, EXPERIENCE } from '@/constants'
import MiFoto from '@/assets/mi-foto.jpg'
import GithubIcon from '@/assets/github-icon.png'
import LinkedinIcon from '@/assets/linkedln-icon.png'
import UnivalleLogo from '@/assets/Univalle.svg.png'
import SiesaLogo from '@/assets/siesa.png'

const LOGOS: Record<string, string> = {
  univalle: UnivalleLogo,
  siesa: SiesaLogo,
}

const ColombiaFlag = () => (
  <svg width="22" height="15" viewBox="0 0 22 15" aria-label="Bandera de Colombia">
    <rect width="22" height="7.5" fill="#FCD116" />
    <rect y="7.5" width="22" height="3.75" fill="#003893" />
    <rect y="11.25" width="22" height="3.75" fill="#CE1126" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const GraduationIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
)

const About = () => {
  return (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
            <div className="flex-shrink-0 w-48 md:w-64">
              <img
                src={MiFoto}
                alt={`Foto de ${PERSONAL_INFO.name}`}
                className="w-full aspect-square rounded-full object-cover border border-zinc-800"
              />
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <ColombiaFlag />
                <p className="text-zinc-600 text-xs tracking-widest uppercase">
                  {PERSONAL_INFO.location}
                </p>
              </div>
              <h2 className="text-sm text-zinc-500 mb-1">Hola, soy</h2>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-2">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 font-light mb-6">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-zinc-300 leading-relaxed mb-4">
                {PERSONAL_INFO.description}
              </p>
              <p className="text-zinc-500 leading-relaxed">
                {PERSONAL_INFO.passion}
              </p>

              <nav className="flex justify-center md:justify-start gap-3 mt-8" aria-label="Redes sociales">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:bg-zinc-800 transition-all"
                  aria-label="GitHub — abre en nueva pestaña"
                >
                  <img src={GithubIcon} alt="GitHub" className="w-5 h-5 invert" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:bg-zinc-800 transition-all"
                  aria-label="LinkedIn — abre en nueva pestaña"
                >
                  <img src={LinkedinIcon} alt="LinkedIn" className="w-5 h-5" />
                </a>
                <a
                  href="/Cv/cv-h.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-400 hover:border-zinc-600 hover:text-white hover:bg-zinc-800 transition-all"
                  aria-label="Descargar CV"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  CV
                </a>
              </nav>
            </div>
          </div>
        </FadeIn>

        {/* Timeline */}
        <FadeIn delay={0.1}>
          <div>
            <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Recorrido</p>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-10">Experiencia</h2>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-800" aria-hidden="true" />

              <ol className="space-y-10">
                {EXPERIENCE.map((item) => {
                  const isCurrent = 'current' in item && item.current

                  return (
                    <motion.li
                      key={item.id}
                      className="relative pl-12"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center border ${
                        isCurrent
                          ? 'bg-white text-black border-white'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                      }`}>
                        {item.type === 'education' ? <GraduationIcon /> : <BriefcaseIcon />}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        {item.logo && LOGOS[item.logo] ? (
                          <div className="bg-white rounded-lg px-3 py-1.5 inline-flex items-center h-9">
                            <img
                              src={LOGOS[item.logo]}
                              alt={`Logo de ${item.company}`}
                              className="h-5 w-auto object-contain"
                            />
                          </div>
                        ) : (
                          <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 inline-flex items-center h-9">
                            <span className="text-xs text-zinc-400 font-medium">{item.company}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-zinc-600">{item.duration}</span>
                          {isCurrent && (
                            <span className="text-xs text-white border border-white/20 bg-white/5 px-2 py-0.5 rounded-full">
                              Actual
                            </span>
                          )}
                          {item.type === 'education' && (
                            <span className="text-xs text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full">
                              Educación
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-white font-semibold text-lg leading-tight">{item.role}</h3>
                      <p className="text-zinc-600 text-sm mb-2">{item.location}</p>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-3">{item.description}</p>

                      <ul className="flex flex-wrap gap-2" aria-label="Tecnologías usadas">
                        {item.tags.map((tag) => (
                          <li key={tag}>
                            <span className="text-xs text-zinc-500 border border-zinc-800 bg-zinc-900 px-2.5 py-1 rounded-full">
                              {tag}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.li>
                  )
                })}
              </ol>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  )
}

export default About
