import { useEffect, useRef, useSyncExternalStore } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/**
 * Mascotas pixel-art blancas.
 * Cada "pixel" es una unidad del viewBox; shape-rendering="crispEdges" mantiene los bordes nítidos.
 */

const P = ({ x, y, w = 1, h = 1 }: { x: number; y: number; w?: number; h?: number }) => (
  <rect x={x} y={y} width={w} height={h} />
)

export const Buddy = ({ size = 64 }: { size?: number }) => (
  <svg
    viewBox="0 0 16 15"
    width={size}
    height={(size * 15) / 16}
    shapeRendering="crispEdges"
    aria-hidden="true"
  >
    {/* Antena */}
    <g className="fill-zinc-500">
      <P x={7} y={1} w={1} h={2} />
    </g>
    <g className="fill-white buddy-antenna">
      <P x={6} y={0} w={3} h={1} />
    </g>

    {/* Cuerpo que rebota */}
    <g className="buddy-bob">
      <g className="fill-white">
        <P x={3} y={3} w={10} h={1} />
        <P x={2} y={4} w={12} h={6} />
        <P x={3} y={10} w={10} h={1} />
      </g>

      {/* Brazos: van dentro del cuerpo para que nunca se despeguen */}
      <g className="fill-white">
        <P x={0} y={6} w={2} h={2} />
        <P x={14} y={6} w={2} h={2} />
      </g>

      {/* Ojos que parpadean */}
      <g className="fill-[#0a0a0a] buddy-eyes">
        <P x={5} y={5} w={1} h={2} />
        <P x={10} y={5} w={1} h={2} />
      </g>

      {/* Boca de terminal: _ */}
      <g className="fill-zinc-400 buddy-cursor">
        <P x={7} y={8} w={2} h={1} />
      </g>
    </g>

    {/* Patas que se alternan */}
    <g className="fill-white buddy-legs-a">
      <P x={4} y={11} w={1} h={3} />
      <P x={10} y={11} w={1} h={3} />
    </g>
    <g className="fill-white buddy-legs-b">
      <P x={6} y={11} w={1} h={3} />
      <P x={12} y={11} w={1} h={3} />
    </g>
  </svg>
)

interface WalkerProps {
  /** Distancia en px que recorre hacia cada lado desde su punto de partida. */
  distance: number
  /** Segundos que tarda una ida y vuelta completa. */
  duration: number
  delay?: number
  size?: number
}

/** Un muñequito que camina de ida y vuelta, siempre mirando al frente (sin voltearse). */
const Walker = ({ distance, duration, delay = 0, size = 64 }: WalkerProps) => {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <Buddy size={size} />

  return (
    <motion.div
      className="buddy-walking"
      animate={{ x: [-distance, distance, distance, -distance, -distance] }}
      transition={{
        duration,
        delay,
        times: [0, 0.46, 0.5, 0.96, 1],
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      <Buddy size={size} />
    </motion.div>
  )
}

/*
 * Hay un solo muñequito. Vive en la portada mientras se ve la sección principal;
 * al bajar o cambiar de página salta a la esquina inferior. Los dos lugares comparten
 * `layoutId`, así framer-motion anima el viaje de un sitio al otro.
 */
let inHero = typeof window !== 'undefined' && window.location.pathname === '/'
const listeners = new Set<() => void>()
const setInHero = (value: boolean) => {
  if (inHero === value) return
  inHero = value
  listeners.forEach((l) => l())
}
const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}
const useInHero = () => useSyncExternalStore(subscribe, () => inHero, () => false)

const JUMP = { type: 'spring', stiffness: 260, damping: 22 } as const

/** Lugar del muñequito en la portada. */
const PixelBuddy = () => {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInHero()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInHero(entry.isIntersecting), {
      threshold: 0.1,
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      setInHero(false)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="flex justify-center h-16 w-full max-w-xs mx-auto mb-8 overflow-hidden"
      aria-hidden="true"
    >
      {visible && (
        <motion.div layoutId="pixel-buddy" transition={JUMP}>
          <Walker distance={110} duration={12} />
        </motion.div>
      )}
    </div>
  )
}

/** El muñequito en la esquina inferior; salta cada vez que cambias de página. */
export const FloatingBuddy = () => {
  const visibleInHero = useInHero()
  const { pathname } = useLocation()
  const hop = useAnimationControls()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (visibleInHero || reduceMotion) return
    hop.start({
      y: [0, -56, 0, -14, 0],
      scaleY: [1, 1.08, 0.85, 1.03, 1],
      transition: { duration: 0.9, times: [0, 0.35, 0.65, 0.82, 1], ease: 'easeOut' },
    })
  }, [pathname, visibleInHero, reduceMotion, hop])

  if (visibleInHero) return null

  return (
    <div className="fixed bottom-4 left-6 md:left-10 z-40 pointer-events-none" aria-hidden="true">
      <motion.div layoutId="pixel-buddy" transition={JUMP}>
        <motion.div animate={hop} style={{ originY: 1 }}>
          <Walker distance={24} duration={8} size={48} />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default PixelBuddy
