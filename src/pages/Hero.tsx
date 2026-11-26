import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/constants'
import useSEO from '@/hooks/useSEO'
import PixelBuddy from '@/components/PixelBuddy'
import useLanguage from '@/i18n/useLanguage'
import DarkKnight from '@/components/noir/DarkKnight'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const Hero = () => {
  const { t, tr } = useLanguage()
  useSEO({ title: t('seoHomeTitle'), description: t('seoHomeDescription') })
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 pt-20 pb-[14vh] text-center" aria-label={t('seoHomeTitle')}>
      <DarkKnight className="absolute bottom-0 left-1/2 h-[62vh] aspect-[400/620] -translate-x-1/2 opacity-30 md:left-auto md:right-[2%] md:h-[84vh] md:translate-x-0 md:opacity-100" />
      <motion.div
        className="relative max-w-4xl mx-auto w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <PixelBuddy />
        </motion.div>

        <motion.p variants={item} className="text-zinc-500 text-xs tracking-[0.3em] uppercase mb-8 text-center">
          {t('available')}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-7xl md:text-9xl lg:text-[10rem] font-semibold text-white tracking-tight leading-[0.9] mb-8 drop-shadow-[0_0_40px_rgba(0,0,0,0.9)]"
        >
          {PERSONAL_INFO.name.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </motion.h1>

        <motion.p variants={item} className="text-xl md:text-2xl text-zinc-400 font-light max-w-lg mx-auto mb-12">
          {tr(PERSONAL_INFO.title)}. {t('tagline')}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/projects"
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-100 text-black font-medium rounded-lg transition-all text-sm"
          >
            {t('viewProjects')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-sm border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white rounded-lg transition-all text-sm"
          >
            LinkedIn
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
