import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Espera a que la página (cargada en diferido) pinte la tarjeta del ancla
      let tries = 0
      const id = window.setInterval(() => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (el || ++tries > 40) {
          window.clearInterval(id)
          el?.scrollIntoView({ block: 'start' })
        }
      }, 50)
      return () => window.clearInterval(id)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default ScrollToTop
