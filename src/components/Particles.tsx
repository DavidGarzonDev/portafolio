import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
  twinkle: number
}

/** Partículas blancas muy sutiles que flotan detrás de todo el sitio. */
const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let particles: Particle[] = []
    let frame = 0
    let width = 0
    let height = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Densidad baja: ~1 partícula por cada 18.000 px², con tope.
      const count = Math.min(Math.round((width * height) / 18000), 90)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.3,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -(Math.random() * 0.12 + 0.03),
        alpha: Math.random() * 0.25 + 0.05,
        twinkle: Math.random() * Math.PI * 2,
      }))
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx
          p.y += p.vy
          if (p.y < -4) { p.y = height + 4; p.x = Math.random() * width }
          if (p.x < -4) p.x = width + 4
          if (p.x > width + 4) p.x = -4
        }
        const a = p.alpha * (0.7 + 0.3 * Math.sin(t / 1400 + p.twinkle))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`
        ctx.fill()
      }
    }

    const loop = (t: number) => {
      draw(t)
      frame = requestAnimationFrame(loop)
    }

    resize()
    if (reduceMotion) {
      draw(0)
    } else {
      frame = requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default Particles
