import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './pages/Header'
import Footer from './pages/Footer'
import Hero from './pages/Hero'
import TechSlider from './components/TechSlider'
import CustomCursor from './components/CustomCursor'
import Particles from './components/Particles'
import { FloatingBuddy } from './components/PixelBuddy'
import PageTransition from './components/PageTransition'
import ScrollToTop from './components/ScrollToTop'
import useLanguage from './i18n/useLanguage'
import './styles/index.css'

const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))

const LoadingSpinner = () => {
  const { t } = useLanguage()
  return (
  <div className="flex items-center justify-center min-h-screen" role="status" aria-label={t('loading')}>
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white" />
  </div>
  )
}

const NotFound = () => {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <span className="text-6xl font-bold text-white">404</span>
      <p className="text-zinc-400">{t('notFound')}</p>
    </div>
  )
}

const App = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] isolate">
      <Particles />
      <FloatingBuddy />
      <ScrollToTop />
      <CustomCursor />
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <PageTransition>
                  <Hero />
                  <TechSlider />
                </PageTransition>
              } />
              <Route path="/about" element={
                <PageTransition>
                  <section><About /></section>
                </PageTransition>
              } />
              <Route path="/projects" element={
                <PageTransition>
                  <section><Projects /></section>
                </PageTransition>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
