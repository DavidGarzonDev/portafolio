import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './pages/Header'
import Footer from './pages/Footer'
import Hero from './pages/Hero'
import TechSlider from './components/TechSlider'
import './styles/index.css'

const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen" role="status" aria-label="Cargando">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white" />
  </div>
)

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <span className="text-6xl font-bold text-white">404</span>
    <p className="text-zinc-400">Página no encontrada.</p>
  </div>
)

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <TechSlider />
              </>
            } />
            <Route path="/about" element={<section aria-label="Sobre mí"><About /></section>} />
            <Route path="/projects" element={<section aria-label="Proyectos"><Projects /></section>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
