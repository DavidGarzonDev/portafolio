import { Link } from 'react-router-dom'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { PERSONAL_INFO, PROJECTS_DATA, SOCIAL_LINKS } from '@/constants'
import useSEO from '@/hooks/useSEO'
import PixelBuddy from '@/components/PixelBuddy'
import FitLine from '@/components/bill/FitLine'
import useLanguage from '@/i18n/useLanguage'

/*
 * La portada es un cartel de imprenta de Cali impreso al revés (tinta clara sobre negro):
 * el nombre en letras de madera a todo el ancho, el cargo en franja invertida,
 * «PRESENTA», los proyectos en cartelera y «ESCRÍBEME» como la línea final.
 */

const press: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

/** Cada línea entra como un golpe de prensa: un poco más grande y borrosa, y se asienta. */
const stamp: Variants = {
  hidden: { opacity: 0, scale: 1.04, filter: 'blur(3px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
  },
}

const Arrow = ({ className = 'h-[0.7em] w-[0.7em]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="square" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/** Regla de imprenta con un rombo al centro. */
const Ornament = () => (
  <span className="flex flex-1 items-center gap-2" aria-hidden="true">
    <span className="h-px flex-1 bg-[var(--ink-dim)]" />
    <span className="h-1.5 w-1.5 rotate-45 bg-[var(--ink)]" />
    <span className="h-px flex-1 bg-[var(--ink-dim)]" />
  </span>
)

/** El cabeza de cartel va primero; el resto, en el orden de la cartelera. */
const LINEUP = ['1', '4', '2', '3']

const Hero = () => {
  const { t, tr } = useLanguage()
  const reduce = useReducedMotion()
  useSEO({ title: t('seoHomeTitle'), description: t('seoHomeDescription') })

  const projects = LINEUP.map((id) => PROJECTS_DATA.find((p) => p.id === id)).filter((p) => p !== undefined)
  const [headliner, ...supporting] = projects

  return (
    <section className="relative px-4 pb-10 pt-20 sm:px-6" aria-labelledby="bill-name">
      <div className="mx-auto w-full max-w-6xl">
        <PixelBuddy />

        <motion.div
          className="bill relative border-2 border-[var(--ink)] px-4 py-5 sm:px-8 sm:py-7"
          variants={press}
          initial={reduce ? false : 'hidden'}
          animate="show"
        >
          {/* Nombre a todo el ancho */}
          <motion.h1 variants={stamp} id="bill-name" className="bill-ink font-woodtype uppercase text-[var(--ink)]">
            <FitLine maxVh={19}>{PERSONAL_INFO.name}</FitLine>
          </motion.h1>

          {/* Cargo en franja invertida */}
          <motion.div variants={stamp} className="mt-3 sm:mt-4">
            <p className="bg-[var(--ink)] px-3 py-1.5 text-center text-[var(--stock)]">
              <FitLine maxVh={5.5} className="bill-ink font-woodtype uppercase tracking-[0.08em]">
                {tr(PERSONAL_INFO.title)}
              </FitLine>
            </p>
            <p className="mt-2 text-center text-sm text-[var(--ink-dim)] sm:text-base">{t('tagline')}</p>
          </motion.div>

          {/* PRESENTA */}
          <motion.p variants={stamp} className="my-3 flex items-center gap-4 sm:my-5">
            <Ornament />
            <span className="bill-ink font-slab text-[clamp(1.25rem,3.2vh,2.25rem)] uppercase leading-none text-[var(--ink)]">
              {t('billPresents')}
            </span>
            <Ornament />
          </motion.p>

          {/* Cartelera: cabeza de cartel y tres proyectos debajo */}
          <motion.ul variants={stamp} className="grid min-w-0 grid-cols-1 gap-y-2 text-center" aria-label={t('projectsTitle')}>
            {headliner && (
              <li className="min-w-0">
                <Link to="/projects" className="bill-line group relative block">
                  <span className="bill-wipe" aria-hidden="true" />
                  <span className="relative block mix-blend-difference">
                    <FitLine maxVh={11} className="bill-ink font-woodtype uppercase text-[var(--ink)]">
                      {headliner.title}
                    </FitLine>
                    <span className="mt-1 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--ink)] sm:text-xs">
                      <span>{tr(headliner.badge)}</span>
                      <Arrow className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </li>
            )}
            <li className="grid min-w-0 grid-cols-1 border-t border-[var(--ink-dim)] pt-2 sm:grid-cols-3 sm:divide-x sm:divide-[var(--ink-dim)]">
              {supporting.map((p) => (
                <Link key={p.id} to="/projects" className="bill-line group relative block min-w-0 py-1 sm:px-4 sm:first:pl-0 sm:last:pr-0">
                  <span className="bill-wipe" aria-hidden="true" />
                  <span className="relative block mix-blend-difference">
                    <FitLine maxVh={6.5} className="bill-ink font-woodtype uppercase text-[var(--ink)]">
                      {p.title}
                    </FitLine>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-[var(--ink)] sm:text-[11px]">
                      {tr(p.badge)}
                    </span>
                  </span>
                </Link>
              ))}
            </li>
          </motion.ul>

          {/* Línea final: ESCRÍBEME */}
          <motion.div
            variants={stamp}
            className="mt-4 flex flex-col gap-3 bg-[var(--ink)] p-3 text-[var(--stock)] sm:mt-6 sm:flex-row sm:items-center sm:gap-6 sm:p-4"
          >
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="bill-cta group flex min-w-0 flex-1 items-center gap-3"
              aria-label={`${t('billWrite')}: ${SOCIAL_LINKS.email}`}
            >
              <FitLine maxVh={7.5} className="bill-ink font-woodtype uppercase">
                {t('billWrite')}
              </FitLine>
              <Arrow className="h-[min(7vh,3rem)] w-[min(7vh,3rem)] shrink-0 transition-transform motion-safe:group-hover:translate-x-2" />
            </a>
            <nav
              className="flex shrink-0 flex-wrap gap-x-5 gap-y-1 text-xs font-semibold uppercase tracking-[0.16em] sm:flex-col sm:items-end"
              aria-label={t('socialLinks')}
            >
              <a className="bill-small-link" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="bill-small-link" href={`mailto:${SOCIAL_LINKS.email}`}>
                {t('billEmail')}
              </a>
              <a className="bill-small-link" href="/Cv/HvAc.pdf" target="_blank" rel="noopener noreferrer">
                {t('downloadCv')}
              </a>
            </nav>
          </motion.div>
        </motion.div>

        {/* Pie de imprenta */}
        <p className="mt-3 flex flex-col gap-1 text-[10px] uppercase tracking-[0.24em] text-[var(--ink-dim)] sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
          <span>{t('billImprint')}</span>
          <span>{PERSONAL_INFO.location} · 2026</span>
        </p>
      </div>
    </section>
  )
}

export default Hero
