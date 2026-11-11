import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utils/helpers'

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

      {/* Brazos */}
      <g className="fill-white buddy-arm-left">
        <P x={0} y={6} w={2} h={2} />
      </g>
      <g className="fill-white buddy-arm-right">
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

/** Muñequito principal de la portada. */
const PixelBuddy = () => (
  <div className="flex justify-center h-16 w-full max-w-xs mx-auto mb-8 overflow-hidden" aria-hidden="true">
    <Walker distance={110} duration={12} />
  </div>
)

/**
 * Posición, recorrido y tamaño de cada muñequito del fondo. Están sobre todo en los
 * márgenes para no tapar el contenido; los marcados como `desktop` no salen en celular.
 */
const CROWD = [
  { top: '14%', left: '6%', distance: 40, duration: 9, delay: 0, size: 36, opacity: 0.95 },
  { top: '30%', left: '88%', distance: 50, duration: 11, delay: 1.5, size: 44, opacity: 0.9 },
  { top: '52%', left: '4%', distance: 35, duration: 8, delay: 3, size: 28, opacity: 0.85, desktop: true },
  { top: '70%', left: '90%', distance: 30, duration: 10, delay: 0.8, size: 32, opacity: 0.95 },
  { top: '86%', left: '12%', distance: 60, duration: 13, delay: 2.2, size: 40, opacity: 0.9, desktop: true },
  { top: '13%', left: '72%', distance: 45, duration: 12, delay: 4, size: 26, opacity: 0.8, desktop: true },
  { top: '42%', left: '94%', distance: 20, duration: 7, delay: 1, size: 24, opacity: 0.8, desktop: true },
  { top: '92%', left: '78%', distance: 50, duration: 10, delay: 3.5, size: 34, opacity: 0.9 },
  { top: '64%', left: '2%', distance: 25, duration: 9, delay: 5, size: 22, opacity: 0.75, desktop: true },
  { top: '22%', left: '18%', distance: 30, duration: 14, delay: 2.8, size: 20, opacity: 0.7, desktop: true },
] as const

/** Grupo de muñequitos que caminan por el fondo de todo el sitio. */
export const BuddyCrowd = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
    {CROWD.map((b, i) => (
      <div
        key={i}
        className={cn('absolute', 'desktop' in b && b.desktop && 'hidden md:block')}
        style={{ top: b.top, left: b.left, opacity: b.opacity, transform: 'translate(-50%, -50%)' }}
      >
        <Walker distance={b.distance} duration={b.duration} delay={b.delay} size={b.size} />
      </div>
    ))}
  </div>
)

export default PixelBuddy
