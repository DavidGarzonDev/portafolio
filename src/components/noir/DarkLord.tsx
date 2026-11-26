import { useEffect, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import NoirLight from './NoirLight'

/**
 * Señor oscuro original visto en contrapicado: corona de cuchillas aserradas, casco
 * anguloso con carrilleras en punta, hombrera de escamas con púas en primer plano y un
 * brazo con guantelete que sostiene una maza de aletas.
 *
 * El acabado metálico sale de un filtro SVG: un relieve de ruido iluminado con
 * feSpecularLighting da el brillo martillado, y un umbral deja solo destellos blancos
 * ásperos, como de fotocopia, sobre las placas negras.
 */

type Pt = [number, number]

/** Punto y normal de una curva cuadrática (p0 → c → p1) en t. */
const quad = (p0: Pt, c: Pt, p1: Pt, t: number) => {
  const u = 1 - t
  const x = u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0]
  const y = u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]
  const dx = 2 * u * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0])
  const dy = 2 * u * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1])
  const len = Math.hypot(dx, dy) || 1
  return { x, y, nx: dy / len, ny: -dx / len, tx: dx / len, ty: dy / len }
}

/** Fila de púas a lo largo de una curva; `side` elige hacia qué lado apuntan. */
const spikesAlong = (p0: Pt, c: Pt, p1: Pt, n: number, len: number, side = 1, lean = 0.35) => {
  const out: string[] = []
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n
    const half = 0.42 / n
    const a = quad(p0, c, p1, t - half)
    const b = quad(p0, c, p1, t + half)
    const m = quad(p0, c, p1, t)
    const l = len * (0.75 + 0.5 * Math.abs(Math.sin(i * 2.3)))
    const ax = m.x + side * m.nx * l + m.tx * l * lean
    const ay = m.y + side * m.ny * l + m.ty * l * lean
    out.push(`${a.x.toFixed(1)},${a.y.toFixed(1)} ${ax.toFixed(1)},${ay.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`)
  }
  return out
}

/** Escama de la hombrera: placa curva con su fila de púas en el borde superior. */
const Lame = ({ d, edge, spikes, len }: { d: string; edge: [Pt, Pt, Pt]; spikes: number; len: number }) => (
  <g>
    <path d={d} />
    {spikesAlong(edge[0], edge[1], edge[2], spikes, len, 1).map((p, i) => (
      <polygon key={i} points={p} />
    ))}
  </g>
)

/** Cuchilla de la corona con muescas en un borde. */
const Blade = ({ base, tip, w, bend = 0, notches = 3 }: { base: Pt; tip: Pt; w: number; bend?: number; notches?: number }) => {
  const [bx, by] = base
  const [tx, ty] = tip
  const mx = (bx + tx) / 2 + bend
  const my = (by + ty) / 2
  const notchPts: string[] = []
  for (let i = 1; i <= notches; i++) {
    const t = i / (notches + 1)
    const px = bx - w / 2 + (tx - (bx - w / 2)) * t + bend * Math.sin(Math.PI * t)
    const py = by + (ty - by) * t
    notchPts.push(`${px},${py} ${px - w * 0.45},${py + 6} ${px + 1},${py + 9}`)
  }
  return (
    <g>
      <path d={`M${bx - w / 2},${by} Q${mx - w * 0.3},${my} ${tx},${ty} Q${mx + w * 0.3},${my} ${bx + w / 2},${by} Z`} />
      {notchPts.map((p, i) => (
        <polygon key={i} points={p} />
      ))}
    </g>
  )
}

/** Placas metálicas: relieve en degradado y un surco negro entre placa y placa. */
const Group = ({ children }: { children: ReactNode }) => (
  <g fill="url(#lord-relief)" stroke="#000" strokeWidth="2.5" strokeLinejoin="round">
    {children}
  </g>
)

const Lord = () => (
  <svg viewBox="0 0 520 720" className="relative h-full w-full overflow-visible" preserveAspectRatio="xMidYMax meet">
    <defs>
      {/* Relieve de cada placa: claro arriba (de donde viene la luz), oscuro abajo */}
      <linearGradient id="lord-relief" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.35" stopColor="#777777" />
        <stop offset="1" stopColor="#000000" />
      </linearGradient>

      {/*
        Metal martillado: el brillo de cada placa sale de su relieve (luminancia del
        degradado) más ruido, iluminado con feSpecularLighting. Un umbral deja solo
        destellos blancos ásperos y el resto se pinta casi negro.
      */}
      <filter id="lord-metal-fx" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="11" result="noise" />
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.33 0.33 0.33 0 0" result="lum" />
        <feGaussianBlur in="lum" stdDeviation="1.2" result="lumb" />
        <feComposite in="lumb" in2="noise" operator="arithmetic" k1="0.6" k2="1" k3="0.06" k4="0" result="height" />
        <feSpecularLighting in="height" surfaceScale="4" specularConstant="1.4" specularExponent="14" lightingColor="#ffffff" result="spec">
          <feDistantLight azimuth="245" elevation="35" />
        </feSpecularLighting>
        <feComposite in="spec" in2="SourceAlpha" operator="in" result="s" />
        <feComponentTransfer in="s" result="crust">
          <feFuncR type="discrete" tableValues="0 0 0 0.3 0.85 1" />
          <feFuncG type="discrete" tableValues="0 0 0 0.3 0.85 1" />
          <feFuncB type="discrete" tableValues="0 0 0 0.33 0.88 1" />
          <feFuncA type="discrete" tableValues="0 0 0 0.55 1 1" />
        </feComponentTransfer>
        <feFlood floodColor="#060607" result="black" />
        <feComposite in="black" in2="SourceAlpha" operator="in" result="base" />
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="edge" />
        <feMerge result="metal">
          <feMergeNode in="base" />
          <feMergeNode in="crust" />
        </feMerge>
        <feDisplacementMap in="metal" in2="edge" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      {/* Borde áspero para la masa oscura del cuerpo */}
      <filter id="lord-rough" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="3" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>

    {/* Masa del cuerpo y la capa, casi negra */}
    <g filter="url(#lord-rough)" fill="#040405">
      <path d="M96,720 L130,560 Q150,460 220,410 L340,404 Q410,420 446,480 L500,720 Z" />
    </g>

    <g filter="url(#lord-metal-fx)">
      {/* Hombrera derecha, detrás */}
      <Group>
        <Lame d="M328,396 Q372,382 412,402 Q426,414 424,430 Q392,420 360,428 Q340,430 326,420 Z" edge={[[332, 394], [372, 378], [414, 400]]} spikes={7} len={16} />
      </Group>

      {/* Peto en placas bajo el gorjal */}
      <Group>
        <path d="M214,420 Q282,398 350,420 L364,500 Q292,520 222,500 Z" />
        <path d="M222,500 Q292,520 364,500 L370,560 Q292,584 226,560 Z" />
        <path d="M226,560 Q292,584 370,560 L374,620 Q292,646 228,620 Z" />
        {/* Gorjal escalonado */}
        <path d="M246,336 Q286,350 330,336 L344,368 Q288,384 236,368 Z" />
        <path d="M236,368 Q288,384 344,368 L352,404 Q288,420 226,404 Z" />
      </Group>

      {/* Brazo extendido con codera de púa, guantelete y maza */}
      <Group>
        <path d="M362,412 Q414,404 458,438 L446,484 Q404,456 364,462 Z" />
        <path d="M372,420 Q410,418 440,440 L436,454 Q406,436 374,436 Z" />
        <path d="M440,446 Q474,452 478,488 Q458,502 436,488 Z" />
        <polygon points="470,462 512,444 476,486" />
        <polygon points="456,450 474,420 466,456" />
        <path d="M440,486 L476,490 L492,600 L452,604 Z" />
        <path d="M446,520 L482,522 L486,546 L448,546 Z" />
        <path d="M450,570 L488,570 L490,592 L452,594 Z" />
        {/* Guantelete con dedos y nudillos de púa */}
        <path d="M446,600 Q472,590 496,600 L500,646 Q474,658 444,646 Z" />
        <path d="M448,612 L498,612 M448,626 L500,626 M450,638 L498,638" fill="none" stroke="#000" strokeWidth="1.4" />
        <polygon points="452,600 446,584 460,598" />
        <polygon points="470,596 468,578 478,596" />
        <polygon points="488,598 492,580 496,602" />
        {/* Mango y cabeza de maza con aletas */}
        <rect x="466" y="644" width="12" height="40" />
        <path d="M472,676 L500,690 L512,716 L496,740 L472,752 L448,740 L432,716 L444,690 Z" />
        <polygon points="472,676 476,640 468,640" />
        <polygon points="500,690 530,684 510,704" />
        <polygon points="444,690 414,684 434,704" />
        <polygon points="512,716 540,724 512,730" />
        <polygon points="432,716 404,724 432,730" />
      </Group>

      {/* Casco facetado: cráneo, cresta de la frente, dos placas de cara, aletas y carrilleras */}
      <Group>
        <path d="M244,332 L236,252 Q240,202 262,172 L288,156 L314,172 Q336,202 340,252 L332,332 Q290,354 244,332 Z" />
        <path d="M238,242 L204,214 L236,266 Z" />
        <path d="M338,242 L374,214 L340,266 Z" />
        <path d="M246,226 L288,206 L330,226 L322,248 L288,232 L254,248 Z" />
        <path d="M254,248 L288,264 L286,340 L246,324 L240,274 Z" />
        <path d="M322,248 L288,264 L290,340 L330,324 L336,274 Z" />
        <path d="M241,290 L212,372 L258,332 Z" />
        <path d="M335,290 L366,376 L318,334 Z" />
        <path d="M284,262 L292,262 L291,342 L285,342 Z" />
        <path d="M262,180 L288,168 L314,180 L306,196 L288,188 L270,196 Z" />
      </Group>
      {/* Ojos rasgados */}
      <path d="M256,250 L282,263 L278,270 L253,259 Z" fill="#000" />
      <path d="M320,250 L294,263 L298,270 L323,259 Z" fill="#000" />

      {/* Corona de cuchillas aserradas */}
      <Group>
        <Blade base={[288, 166]} tip={[294, 14]} w={22} bend={4} notches={4} />
        <Blade base={[266, 178]} tip={[240, 48]} w={18} bend={-6} notches={3} />
        <Blade base={[312, 176]} tip={[344, 58]} w={18} bend={8} notches={3} />
        <Blade base={[250, 198]} tip={[208, 112]} w={14} bend={-6} notches={2} />
        <Blade base={[328, 198]} tip={[372, 124]} w={14} bend={8} notches={2} />
        <Blade base={[276, 170]} tip={[266, 78]} w={10} bend={-2} notches={2} />
      </Group>

      {/* Hombrera izquierda en primer plano: escamas con púas */}
      <Group>
        <Lame d="M222,402 Q156,366 102,396 Q70,420 58,468 Q100,442 142,446 Q184,448 220,468 Z" edge={[[220, 400], [150, 360], [62, 462]]} spikes={9} len={22} />
        <Lame d="M220,468 Q178,452 132,460 Q90,468 66,512 Q108,492 150,496 Q188,500 216,522 Z" edge={[[218, 466], [140, 446], [70, 506]]} spikes={8} len={16} />
        <Lame d="M216,522 Q180,506 140,512 Q102,520 84,560 Q124,542 160,548 Q192,552 214,574 Z" edge={[[214, 520], [144, 500], [88, 554]]} spikes={7} len={13} />
        <Lame d="M214,574 Q182,560 148,566 Q116,574 102,610 Q138,594 168,600 Q194,604 212,624 Z" edge={[[212, 572], [150, 554], [106, 604]]} spikes={6} len={11} />
        {/* Púas mayores */}
        <polygon points="96,400 54,318 120,390" />
        <polygon points="132,380 112,286 156,376" />
        <polygon points="172,376 170,302 190,382" />
      </Group>
    </g>
  </svg>
)

const DarkLord = ({ className = '' }: { className?: string }) => {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 18 })
  const sy = useSpring(my, { stiffness: 40, damping: 18 })
  // Se mueve al revés que el mouse, para dar profundidad
  const x = useTransform(sx, (v) => v * -12)
  const y = useTransform(sy, (v) => v * -6)

  useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my, reduce])

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <NoirLight className="absolute -inset-x-[55%] -top-[10%] -bottom-[4%]" cx={0.5} cy={0.66} />
      <motion.div className="relative h-full w-full" style={{ x, y }}>
        <Lord />
      </motion.div>
      <div className="noir-fog noir-fog-a absolute -inset-x-1/2 bottom-0 h-1/4" />
    </div>
  )
}

export default DarkLord
