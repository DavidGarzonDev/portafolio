import { useState, useEffect } from 'react'

const ScrollHint = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Ocultar después de hacer scroll
      if (window.scrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      role="status"
      aria-label="Desplázate hacia abajo"
    >
      <button
        onClick={() => {
          const projects = document.getElementById('projects')
          projects?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="flex flex-col items-center text-gray-400 hover:text-green-400 transition-colors"
        aria-label="Ir a proyectos"
      >
        <span className="text-sm mb-2">Desliza hacia abajo</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </div>
  )
}

export default ScrollHint