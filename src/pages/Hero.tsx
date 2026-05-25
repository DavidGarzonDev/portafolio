import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/constants'
import useSEO from '@/hooks/useSEO'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const Hero = () => {
  useSEO({
    title: 'David Garzón — Desarrollador Fullstack',
    description: 'Desarrollador Fullstack de Colombia. Construyo software completo, de la idea al producto.',
  })
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-16 text-center" aria-label="Presentación">
      <motion.div
        className="max-w-4xl mx-auto w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="text-zinc-600 text-xs tracking-widest uppercase mb-8 text-center">
          Disponible para proyectos
        </motion.p>

        <motion.h1
          variants={item}
          className="text-6xl md:text-8xl lg:text-[9rem] font-bold text-white tracking-tight leading-none mb-6"
        >
          {PERSONAL_INFO.name.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </motion.h1>

        <motion.p variants={item} className="text-xl md:text-2xl text-zinc-400 font-light max-w-lg mx-auto mb-12">
          {PERSONAL_INFO.title}. Construyo software completo, de la idea al producto.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/projects"
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-100 text-black font-medium rounded-lg transition-all text-sm"
          >
            Ver proyectos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-transparent border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white rounded-lg transition-all text-sm"
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
