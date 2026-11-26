import type React from 'react'
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

/** Cada línea entra como un golpe de prensa: llega un poco grande, se aplasta al tocar y se asienta. */
const stamp: Variants = {
  hidden: { opacity: 0, scaleX: 1.04, scaleY: 1.08 },
  show: {
    opacity: 1,
    scaleX: [1.04, 1.01, 1],
    scaleY: [1.08, 0.96, 1],
    transition: { duration: 0.34, times: [0, 0.6, 1], ease: 'easeOut' },
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

interface BillLineProps {
  to: string
  badge: string
  /** Tamaño de la letra según el puesto en la cartelera. */
  size: string
  arrow?: boolean
  children: React.ReactNode
}

/** Una línea de la cartelera: título en madera y su condición en letra pequeña. Puede partirse en dos renglones antes que encogerse. */
const BillLine = ({ to, badge, size, arrow = false, children }: BillLineProps) => (
  <Link to={to} className="bill-line group relative inline-block max-w-full px-2 py-0.5">
    <span className="bill-wipe" aria-hidden="true" />
    <span className="relative block mix-blend-difference">
      <span className={`bill-ink block text-balance pt-[0.12em] font-woodtype uppercase leading-[0.96] text-[var(--ink)] sm:leading-[0.88] ${size}`}>{children}</span>
      <span className="mt-1 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--ink)] sm:text-[11px]">
        <span>{badge}</span>
        {arrow && <Arrow className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" />}
      </span>
    </span>
  </Link>
)

/** El cabeza de cartel va primero; el resto, en el orden de la cartelera. */
const LINEUP = ['1', '4', '2', '3']

const Hero = () => {
  const { t, tr } = useLanguage()
  const reduce = useReducedMotion()
  useSEO({ title: t('seoHomeTitle'), description: t('seoHomeDescription') })

  const projects = LINEUP.map((id) => PROJECTS_DATA.find((p) => p.id === id)).filter((p) => p !== undefined)
  const [headliner, second, ...rest] = projects

  const projectLink = (id: string) => `/projects#proyecto-${id}`

  return (
    <section className="relative px-4 pb-8 pt-14 sm:px-6" aria-labelledby="bill-name">
      <div className="mx-auto w-full max-w-6xl">
        {/* El muñequito camina sobre el borde superior del cartel */}
        <PixelBuddy className="relative z-30 mx-auto -mb-[5px] md:mx-0 md:ml-6" />

        <motion.div
          className="bill relative border-2 border-[var(--ink)] px-4 py-4 sm:px-8 sm:py-5"
          variants={press}
          initial={reduce ? false : 'hidden'}
          animate="show"
        >
          {/* Nombre a toda la medida */}
          <motion.h1 variants={stamp} id="bill-name" className="font-woodtype uppercase text-[var(--ink)]">
            <FitLine maxVh={17} maxTrack={0.16} className="bill-ink text-center">
              {PERSONAL_INFO.name}
            </FitLine>
          </motion.h1>

          {/* Cargo en franja invertida y lema como letra pequeña */}
          <motion.div variants={stamp} className="mt-3">
            <p className="bg-[var(--ink)] px-3 py-1.5 text-center text-[var(--stock)]">
              <FitLine maxVh={5} className="bill-ink font-woodtype uppercase tracking-[0.08em]">
                {tr(PERSONAL_INFO.title)}
              </FitLine>
            </p>
            <p className="mt-2 text-balance text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-dim)] sm:text-[11px] sm:tracking-[0.22em]">
              {t('tagline')}
            </p>
          </motion.div>

          {/* PRESENTA */}
          <motion.p variants={stamp} className="my-2.5 flex items-center gap-4 sm:my-3">
            <Ornament />
            <span className="bill-ink font-slab text-[clamp(1.25rem,3vh,2.1rem)] uppercase leading-none text-[var(--ink)]">
              {t('billPresents')}
            </span>
            <Ornament />
          </motion.p>

          {/* Cartelera por orden de importancia: la letra baja de tamaño con cada puesto */}
          <motion.ul variants={stamp} className="grid min-w-0 justify-items-center gap-y-1 text-center" aria-label={t('projectsTitle')}>
            {headliner && (
              <li className="w-full min-w-0">
                <BillLine to={projectLink(headliner.id)} badge={tr(headliner.badge)} size="text-[clamp(2.25rem,min(10vh,13vw),7.25rem)]" arrow>
                  {headliner.title}
                </BillLine>
              </li>
            )}
            {second && (
              <li className="w-full min-w-0 border-t border-[var(--ink-dim)] pt-2">
                <BillLine to={projectLink(second.id)} badge={tr(second.badge)} size="text-[clamp(1.75rem,min(6.6vh,9vw),4.5rem)]">
                  {second.title}
                </BillLine>
              </li>
            )}
            <li className="flex w-full min-w-0 flex-col items-center gap-x-6 gap-y-1 border-t border-[var(--ink-dim)] pt-2 sm:flex-row sm:justify-center">
              {rest.map((p, i) => (
                <span key={p.id} className="flex items-center gap-6">
                  {i > 0 && <span className="hidden h-2 w-2 rotate-45 bg-[var(--ink)] sm:block" aria-hidden="true" />}
                  <BillLine to={projectLink(p.id)} badge={tr(p.badge)} size="text-[clamp(1.5rem,min(5.2vh,8.5vw),3.4rem)]">
                    {p.title}
                  </BillLine>
                </span>
              ))}
            </li>
          </motion.ul>

          {/* Línea final: ESCRÍBEME y sus vías, como un solo bloque centrado */}
          <motion.div
            variants={stamp}
            className="mt-3 flex flex-col items-center gap-2 bg-[var(--ink)] px-3 py-3 text-[var(--stock)] sm:mt-4 sm:flex-row sm:justify-center sm:gap-8"
          >
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="bill-cta group inline-flex items-center gap-[0.2em] text-[clamp(2.25rem,min(10vh,12vw),6.5rem)]"
              aria-label={`${t('billWrite')}: ${SOCIAL_LINKS.email}`}
            >
              <span className="bill-ink whitespace-nowrap pt-[0.1em] font-woodtype uppercase leading-[0.86] tracking-[0.04em]">
                {t('billWrite')}
              </span>
              <Arrow className="h-[0.62em] w-[0.62em] shrink-0 transition-transform motion-safe:group-hover:translate-x-2" />
            </a>
            <span className="hidden h-16 w-0.5 bg-[var(--stock)] sm:block" aria-hidden="true" />
            <nav
              className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs font-semibold uppercase tracking-[0.16em] sm:flex-col sm:items-start"
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
        <p className="mt-1.5 text-center text-[10px] uppercase tracking-[0.24em] text-[var(--ink-dim)] sm:text-right sm:text-[11px]">
          {t('billImprint')}
        </p>
      </div>
    </section>
  )
}

export default Hero
