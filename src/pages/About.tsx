import { motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import { SOCIAL_LINKS, PERSONAL_INFO, EXPERIENCE, type ExperienceItem } from '@/constants'
import useLanguage from '@/i18n/useLanguage'
import useSEO from '@/hooks/useSEO'
import TechIcon from '@/components/TechIcon'
import MiFoto from '@/assets/mi-foto.jpg'
import GithubIcon from '@/assets/github-icon.png'
import LinkedinIcon from '@/assets/linkedln-icon.png'
import UnivalleLogo from '@/assets/Univalle.svg.png'
import SiesaLogo from '@/assets/siesa.png'
import ConectateLogo from '@/assets/conectate-logo.png'

const LOGOS: Record<NonNullable<ExperienceItem['logo']>, string> = {
  univalle: UnivalleLogo,
  siesa: SiesaLogo,
  conectate: ConectateLogo,
}

const ColombiaFlag = ({ label }: { label: string }) => (
  <svg width="22" height="15" viewBox="0 0 22 15" role="img" aria-label={label}>
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

const AwardIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="8" r="6" strokeWidth={1.5} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
  </svg>
)

const WORK = EXPERIENCE.filter((item) => item.type === 'work')
const EDUCATION = EXPERIENCE.filter((item) => item.type === 'education')

/** Logo de la empresa sin fondo; su ancho se ajusta al logo para que el nombre quede pegado. */
const CompanyLogo = ({ item }: { item: ExperienceItem }) => {
  const { t } = useLanguage()
  if (!item.logo) {
    return (
      <div className="flex-shrink-0 h-20 min-w-20 px-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
        <span className="text-lg font-bold text-zinc-300">{item.company.charAt(0)}</span>
      </div>
    )
  }
  return (
    <img
      src={LOGOS[item.logo]}
      alt={`${t('logoOf')} ${item.company}`}
      className="flex-shrink-0 h-20 sm:h-24 w-auto max-w-[10rem] sm:max-w-[12rem] object-contain"
    />
  )
}

const Timeline = ({ items }: { items: readonly ExperienceItem[] }) => {
  const { t, tr } = useLanguage()
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-800" aria-hidden="true" />

      <ol className="space-y-12">
        {items.map((item) => (
          <motion.li
            key={item.id}
            className="relative pl-12"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`absolute left-0 top-7 sm:top-9 w-8 h-8 rounded-full flex items-center justify-center border ${
              item.current
                ? 'bg-white text-black border-white'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}>
              {item.type === 'education' ? <GraduationIcon /> : <BriefcaseIcon />}
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <CompanyLogo item={item} />
              <div className="min-w-[12rem] flex-1">
                <p className="text-base font-medium text-zinc-200">{item.company}</p>
                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                  <span className="text-xs text-zinc-500">{tr(item.duration)}</span>
                  {item.current && (
                    <span className="text-xs text-white border border-white/20 bg-white/5 px-2 py-0.5 rounded-full">
                      {t('current')}
                    </span>
                  )}
                  {item.internship && (
                    <span className="text-xs text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded-full">
                      {t('internship')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <h3 className="text-white font-semibold text-lg leading-tight">{tr(item.role)}</h3>
            <p className="text-zinc-600 text-sm mb-2">{tr(item.location)}</p>

            {item.achievement && (
              <p className="inline-flex items-center gap-2 text-sm text-zinc-200 border border-zinc-800 bg-zinc-900 rounded-lg px-3 py-1.5 mb-3">
                <AwardIcon />
                {tr(item.achievement)}
              </p>
            )}

            <p className="text-zinc-400 text-sm leading-relaxed mb-3">{tr(item.description)}</p>

            <ul className="flex flex-wrap gap-2" aria-label={t('technologiesUsed')}>
              {item.tags.map((tag) => (
                <li key={tag}>
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 border border-zinc-800 bg-zinc-900 px-2.5 py-1 rounded-full">
                    <TechIcon name={tag} className="w-3 h-3" />
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

const About = () => {
  const { t, tr } = useLanguage()
  useSEO({ title: t('seoAboutTitle'), description: t('seoAboutDescription') })
  return (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
            <div className="flex-shrink-0 w-48 md:w-64">
              <img
                src={MiFoto}
                alt={`${t('photoOf')} ${PERSONAL_INFO.name}`}
                className="w-full aspect-square rounded-full object-cover border border-zinc-800"
              />
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <ColombiaFlag label={t('flagLabel')} />
                <p className="text-zinc-600 text-xs tracking-widest uppercase">
                  {PERSONAL_INFO.location}
                </p>
              </div>
              <h2 className="text-sm text-zinc-500 mb-1">{t('hello')}</h2>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-2">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 font-light mb-6">
                {tr(PERSONAL_INFO.title)}
              </p>
              <p className="text-zinc-300 leading-relaxed mb-4">
                {tr(PERSONAL_INFO.description)}
              </p>
              <p className="text-zinc-500 leading-relaxed">
                {tr(PERSONAL_INFO.passion)}
              </p>

              <nav className="flex justify-center md:justify-start gap-3 mt-8" aria-label={t('socialLinks')}>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:bg-zinc-800 transition-all"
                  aria-label={`GitHub ${t('opensNewTab')}`}
                >
                  <img src={GithubIcon} alt="GitHub" className="w-5 h-5 invert" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:bg-zinc-800 transition-all"
                  aria-label={`LinkedIn ${t('opensNewTab')}`}
                >
                  <img src={LinkedinIcon} alt="LinkedIn" className="w-5 h-5" />
                </a>
                <a
                  href="/Cv/HvAc.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-400 hover:border-zinc-600 hover:text-white hover:bg-zinc-800 transition-all"
                  aria-label={t('downloadCv')}
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

        {/* Experiencia */}
        <FadeIn delay={0.1}>
          <section className="mb-24" aria-labelledby="experience-title">
            <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">{t('experienceEyebrow')}</p>
            <h2 id="experience-title" className="text-2xl font-bold text-white tracking-tight mb-10">{t('experienceTitle')}</h2>
            <Timeline items={WORK} />
          </section>
        </FadeIn>

        {/* Educación */}
        <FadeIn delay={0.1}>
          <section aria-labelledby="education-title">
            <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">{t('educationEyebrow')}</p>
            <h2 id="education-title" className="text-2xl font-bold text-white tracking-tight mb-10">{t('educationTitle')}</h2>
            <Timeline items={EDUCATION} />
          </section>
        </FadeIn>

      </div>
    </div>
  )
}

export default About
