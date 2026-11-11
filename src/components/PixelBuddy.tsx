import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react'
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
 * Hay un solo muñequito visible. Vive en la portada mientras se ve la sección principal;
 * al bajar o cambiar de página salta en arco hasta la esquina inferior, y vuelve igual.
 * Los dos lugares están siempre montados (uno invisible) para poder medir de dónde sale
 * y a dónde llega cada salto.
 */
let inHero = typeof window !== 'undefined' && window.location.pathname === '/'
let heroRect: DOMRect | null = null
let floatEl: HTMLElement | null = null
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

const JUMP_SECONDS = 1.1
/** Momentos del salto (fracción de la duración): agacharse, despegar, aterrizar. */
const TAKEOFF = 0.12
const LANDING = 0.85
const SAMPLES = 24

/**
 * Salto en parábola desde un desplazamiento (dx, dy) hasta su sitio.
 * Avanza a velocidad horizontal constante y la altura sigue una curva cuadrática en el
 * tiempo (como un tiro con gravedad), así el recorrido es una curva y no un triángulo.
 */
const jumpFrom = ({ dx, dy, toTop }: { dx: number; dy: number; toTop: number }) => {
  // Punto más alto: 140px sobre el más alto de los dos extremos, pero siempre debajo del menú.
  const peakTop = Math.max(Math.min(toTop + dy, toTop) - 140, 90)
  const peak = peakTop - toTop
  // Los saltos largos duran un poco más para que no parezca que sale disparado.
  const duration = Math.min(JUMP_SECONDS + Math.hypot(dx, dy) / 1400, 1.8)

  // Bézier cuadrática que pasa por el punto más alto en la mitad del vuelo.
  const cy = 2 * peak - dy / 2
  const xs: number[] = [dx]
  const ys: number[] = [dy]
  const times: number[] = [0]
  for (let i = 0; i <= SAMPLES; i++) {
    const s = i / SAMPLES
    xs.push(dx * (1 - s))
    ys.push((1 - s) * (1 - s) * dy + 2 * s * (1 - s) * cy)
    times.push(TAKEOFF + s * (LANDING - TAKEOFF))
  }
  xs.push(0)
  ys.push(0)
  times.push(1)

  return {
    duration,
    target: {
      opacity: 1,
      x: xs,
      y: ys,
      scaleY: [1, 0.8, 1.12, 1, 0.78, 1],
      scaleX: [1, 1.12, 0.92, 1, 1.18, 1],
      transition: {
        x: { duration, times, ease: 'linear' as const },
        y: { duration, times, ease: 'linear' as const },
        scaleX: { duration, times: [0, TAKEOFF, 0.3, 0.8, 0.9, 1] },
        scaleY: { duration, times: [0, TAKEOFF, 0.3, 0.8, 0.9, 1] },
      },
    },
  }
}

/** Saltito en el mismo sitio (al cambiar de página). Aterriza en el 72% de la animación. */
const HOP_SECONDS = 0.95
const HOP_LANDING = 0.72
const HOP = {
  opacity: 1,
  x: 0,
  y: [0, 0, -70, 0, -16, 0],
  scaleY: [1, 0.8, 1.12, 0.8, 1.04, 1],
  scaleX: [1, 1.12, 0.92, 1.15, 0.98, 1],
  transition: {
    duration: HOP_SECONDS,
    times: [0, 0.12, 0.42, HOP_LANDING, 0.86, 1],
    ease: ['easeOut', 'easeOut', 'easeIn', 'easeOut', 'easeIn'] as const,
  },
}

/** Rectángulo del dibujo (no de su caja), que se mueve mientras camina. */
const rectOf = (el: HTMLElement) => (el.querySelector('svg') ?? el).getBoundingClientRect()

const offsetFrom = (from: DOMRect, el: HTMLElement) => {
  const to = rectOf(el)
  // Se comparan los pies (borde inferior) y el centro horizontal.
  return {
    dx: from.left + from.width / 2 - (to.left + to.width / 2),
    dy: from.bottom - to.bottom,
    toTop: to.top,
  }
}

/* ── Polvo al aterrizar ─────────────────────────────── */

/** Pixeles que salen de los pies: hacia los lados y un poco hacia arriba. */
const DUST = [
  { x: -34, y: -14, s: 4 },
  { x: -24, y: -22, s: 3 },
  { x: -16, y: -8, s: 4 },
  { x: -42, y: -6, s: 3 },
  { x: -8, y: -18, s: 3 },
  { x: 34, y: -14, s: 4 },
  { x: 24, y: -22, s: 3 },
  { x: 16, y: -8, s: 4 },
  { x: 42, y: -6, s: 3 },
  { x: 8, y: -18, s: 3 },
]

interface Puff {
  id: number
  x: number
  y: number
}

/** Lanza una nube de polvo bajo el muñequito, medida respecto a `container`. */
const useDust = (container: RefObject<HTMLElement | null>, body: RefObject<HTMLElement | null>) => {
  const [puffs, setPuffs] = useState<Puff[]>([])
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), [])

  const land = useCallback(
    (delayMs: number) => {
      const t = window.setTimeout(() => {
        if (!container.current || !body.current) return
        const box = container.current.getBoundingClientRect()
        const feet = rectOf(body.current)
        const puff = { id: Date.now() + Math.random(), x: feet.left + feet.width / 2 - box.left, y: feet.bottom - box.top }
        setPuffs((list) => [...list, puff])
        const clear = window.setTimeout(() => setPuffs((list) => list.filter((p) => p.id !== puff.id)), 900)
        timers.current.push(clear)
      }, delayMs)
      timers.current.push(t)
    },
    [container, body],
  )

  return { puffs, land }
}

const Dust = ({ puffs }: { puffs: Puff[] }) => (
  <>
    {puffs.map((p) => (
      <span key={p.id} className="absolute pointer-events-none" style={{ left: p.x, top: p.y }}>
        {DUST.map((d, i) => (
          <motion.span
            key={i}
            className="absolute block bg-white"
            style={{ width: d.s, height: d.s, marginLeft: -d.s / 2, marginTop: -d.s }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: d.x, y: [0, d.y, d.y + 6], opacity: [1, 0.9, 0], scale: [1, 1, 0.5] }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </span>
    ))}
  </>
)

/* ── Muñequito de la portada ─────────────────────────────── */

const PixelBuddy = () => {
  const slotRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const visible = useInHero()
  const jump = useAnimationControls()
  const reduceMotion = useReducedMotion()
  const first = useRef(true)
  const { puffs, land } = useDust(slotRef, bodyRef)

  // Saber si la portada está en pantalla y recordar dónde está el muñequito.
  useEffect(() => {
    const slot = slotRef.current
    if (!slot) return
    const remember = () => {
      if (bodyRef.current && inHero) heroRect = rectOf(bodyRef.current)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        remember()
        setInHero(entry.isIntersecting)
      },
      // Salta justo cuando la portada llega al borde del menú (64px), antes de esconderse.
      { threshold: 0, rootMargin: '-72px 0px 0px 0px' },
    )
    observer.observe(slot)
    const timer = window.setInterval(remember, 200)
    window.addEventListener('scroll', remember, { passive: true })
    return () => {
      observer.disconnect()
      window.clearInterval(timer)
      window.removeEventListener('scroll', remember)
      setInHero(false)
    }
  }, [])

  // Volver desde la esquina a la portada con un salto.
  useEffect(() => {
    const isFirst = first.current
    first.current = false
    if (!visible) {
      jump.set({ opacity: 0 })
      return
    }
    if (isFirst || reduceMotion || !floatEl || !bodyRef.current) {
      jump.set({ opacity: 1, x: 0, y: 0 })
      return
    }
    jump.set({ x: 0, y: 0 })
    const offset = offsetFrom(rectOf(floatEl), bodyRef.current)
    const { duration, target } = jumpFrom(offset)
    jump.set({ x: offset.dx, y: offset.dy, opacity: 1 })
    jump.start(target)
    land(duration * LANDING * 1000)
  }, [visible, jump, reduceMotion, land])

  return (
    <div
      ref={slotRef}
      className="relative z-40 flex justify-center h-16 w-full max-w-xs mx-auto mb-8"
      aria-hidden="true"
    >
      <motion.div
        ref={bodyRef}
        animate={jump}
        initial={{ opacity: visible ? 1 : 0 }}
        style={{ originY: 1 }}
      >
        <Walker distance={110} duration={12} />
      </motion.div>
      <Dust puffs={puffs} />
    </div>
  )
}

/* ── Muñequito de la esquina ─────────────────────────────── */

/** El muñequito en la esquina inferior; salta cada vez que cambias de página. */
export const FloatingBuddy = () => {
  const visibleInHero = useInHero()
  const { pathname } = useLocation()
  const jump = useAnimationControls()
  const reduceMotion = useReducedMotion()
  const boxRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const wasInHero = useRef(visibleInHero)
  const first = useRef(true)
  const { puffs, land } = useDust(boxRef, ref)

  useEffect(() => {
    floatEl = ref.current
    return () => {
      floatEl = null
    }
  }, [])

  useEffect(() => {
    const cameFromHero = wasInHero.current && !visibleInHero
    const isFirst = first.current
    wasInHero.current = visibleInHero
    first.current = false

    if (visibleInHero) {
      jump.set({ opacity: 0 })
      return
    }
    if (reduceMotion) {
      jump.set({ opacity: 1, x: 0, y: 0 })
      return
    }
    if (cameFromHero && heroRect && ref.current) {
      jump.set({ x: 0, y: 0 })
      const offset = offsetFrom(heroRect, ref.current)
      const { duration, target } = jumpFrom(offset)
      jump.set({ x: offset.dx, y: offset.dy, opacity: 1 })
      jump.start(target)
      land(duration * LANDING * 1000)
      return
    }
    if (isFirst) {
      jump.set({ opacity: 1, x: 0, y: 0 })
      return
    }
    jump.start(HOP)
    land(HOP_SECONDS * HOP_LANDING * 1000)
  }, [pathname, visibleInHero, reduceMotion, jump, land])

  return (
    <div ref={boxRef} className="fixed bottom-4 left-6 md:left-10 z-40 pointer-events-none" aria-hidden="true">
      <motion.div
        ref={ref}
        animate={jump}
        initial={{ opacity: visibleInHero ? 0 : 1 }}
        style={{ originY: 1 }}
      >
        <Walker distance={24} duration={8} size={48} />
      </motion.div>
      <Dust puffs={puffs} />
    </div>
  )
}

export default PixelBuddy
