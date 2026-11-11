import { motion, useReducedMotion } from 'framer-motion'

/**
 * Mascota pixel-art blanca que camina de lado a lado.
 * Cada "pixel" es una unidad del viewBox; shape-rendering="crispEdges" mantiene los bordes nítidos.
 */

const P = ({ x, y, w = 1, h = 1 }: { x: number; y: number; w?: number; h?: number }) => (
  <rect x={x} y={y} width={w} height={h} />
)

const Buddy = () => (
  <svg
    viewBox="0 0 16 15"
    className="w-16 h-auto"
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
        {/* Cuerpo con esquinas recortadas */}
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

const PixelBuddy = () => {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className="flex justify-center mb-8">
        <Buddy />
      </div>
    )
  }

  return (
    <div className="relative h-16 w-full max-w-xs mx-auto mb-8 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute left-1/2 bottom-0 -ml-8 buddy-walking"
        animate={{
          x: [-110, 110, 110, -110, -110],
          scaleX: [1, 1, -1, -1, 1],
        }}
        transition={{
          duration: 12,
          times: [0, 0.46, 0.5, 0.96, 1],
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <Buddy />
      </motion.div>
    </div>
  )
}

export default PixelBuddy
