import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import NoirLight from './NoirLight'

/**
 * Caballero oscuro original, recortado contra una luz granulada en WebGL.
 * La armadura se arma por piezas (yelmo, hombreras de tres placas, brazos, peto,
 * faldar, escarcelas, rodilleras, grebas y escarpes) y la mitad derecha es el reflejo
 * de la izquierda. Un filtro SVG le da el borde áspero de fotocopia; la capa ondea y
 * la figura se mueve un poco con el mouse.
 */

const ARMOR = '#050506'
const CLOAK = '#0e0e11'
const FOLD = '#070709'
const EDGE = '#a1a1aa'
const RIM = '#ececef'

/* ── Mitades (se dibujan a la izquierda y se reflejan) ─────────────────── */

const CapeHalf = () => (
  <g>
    <path
      fill={CLOAK}
      d="M200,198 L150,194 Q110,204 96,240 Q78,330 64,430 Q54,520 42,616 L56,604 L64,630 L78,602 L90,634 L102,604 L116,632 L126,604 L140,626 L150,602 L160,622 L170,560 L176,420 L184,300 Z"
    />
    <path fill={FOLD} d="M120,250 Q100,400 84,612 L96,606 Q112,420 130,262 Z" />
    <path fill={FOLD} d="M150,262 Q140,420 130,622 L140,614 Q150,430 162,272 Z" />
    <path fill={FOLD} d="M100,300 Q86,420 70,600 L76,598 Q92,430 106,310 Z" />
    <g fill="none" stroke={EDGE} strokeOpacity="0.16" strokeWidth="1">
      <path d="M130,262 Q112,420 96,606" />
      <path d="M162,272 Q150,430 140,614" />
    </g>
  </g>
)

const LegHalf = () => (
  <g>
    {/* Escarcelas: placas que cuelgan del faldar */}
    <path d="M150,352 L198,352 L198,368 L146,371 Z" />
    <path d="M146,371 L198,368 L198,384 L142,389 Z" />
    <path d="M142,389 L198,384 L198,402 L140,407 Z" />
    {/* Muslo, rodillera con ala, greba y escarpe */}
    <path d="M158,406 L196,404 L194,470 L160,470 Z" />
    <path d="M155,468 Q176,454 197,468 Q197,492 176,502 Q155,492 155,468 Z" />
    <path d="M156,476 L138,468 L148,498 Z" />
    <path d="M160,500 L194,500 L192,600 L162,600 Z" />
    <path d="M158,600 L194,600 L196,620 Q170,630 144,624 Z" />
    <path fill="none" d="M150,612 Q170,606 196,610" />
  </g>
)

const TorsoHalf = () => (
  <g>
    {/* Peto, placarte y faldar */}
    <path d="M200,212 L160,212 Q147,232 149,262 Q151,300 162,320 Q180,334 200,336 Z" />
    <path d="M200,282 L166,290 Q172,316 200,324 Z" />
    <path d="M162,320 Q180,334 200,336 L200,346 Q178,344 157,331 Z" />
    <path d="M157,331 Q178,344 200,346 L200,354 Q176,353 152,342 Z" />
    {/* Gorjal en placas */}
    <path d="M200,176 L172,178 L162,198 L200,204 Z" />
    <path fill="none" d="M168,188 L200,191" />
  </g>
)

const ArmHalf = () => (
  <g>
    <path d="M150,268 L134,280 L130,304 L146,308 Z" />
    {/* Codera con púa */}
    <path d="M128,300 Q117,313 128,327 Q141,331 151,316 Z" />
    <path d="M121,316 L98,322 L123,328 Z" />
    {/* Brazal y guantelete sobre la empuñadura */}
    <path d="M134,322 L152,315 L178,338 L166,351 Z" />
    <path d="M165,336 Q178,325 197,327 L199,352 Q182,357 167,350 Z" />
    <path fill="none" d="M172,333 L174,350 M179,330 L181,352 M186,329 L188,353 M193,328 L194,353" />
  </g>
)

const PauldronHalf = () => (
  <g>
    {/* Tres placas superpuestas */}
    <path d="M188,188 Q150,175 116,189 Q91,204 85,237 Q108,224 132,224 Q156,220 176,226 Z" />
    <path d="M176,226 Q150,222 128,228 Q103,236 95,257 Q118,248 138,250 Q156,250 170,256 Z" />
    <path d="M170,256 Q150,252 134,256 Q115,262 109,279 Q130,272 146,274 Q160,276 168,282 Z" />
    {/* Púas */}
    <polygon points="104,204 76,158 118,196" />
    <polygon points="126,192 114,136 142,188" />
    <polygon points="150,186 148,146 164,186" />
    <polygon points="92,224 58,204 96,236" />
    {/* Remaches */}
    <g fill="#1c1c20" stroke="none">
      <circle cx="110" cy="214" r="1.8" />
      <circle cx="128" cy="207" r="1.8" />
      <circle cx="148" cy="203" r="1.8" />
      <circle cx="168" cy="204" r="1.8" />
    </g>
  </g>
)

const HelmHalf = () => (
  <g>
    {/* Cuerno curvo con anillos */}
    <path d="M174,102 Q150,96 134,72 Q120,48 124,14 Q133,44 148,64 Q160,79 184,86 Z" />
    <path fill="none" d="M140,58 L148,52 M134,42 L141,38 M130,28 L136,25 M152,72 L158,64" />
    {/* Media celada */}
    <path d="M200,72 Q166,82 165,122 L170,170 Q184,182 200,185 Z" />
    <path fill="none" d="M169,140 L200,141" />
    {/* Respiraderos */}
    <g fill="#18181b" stroke="none">
      <circle cx="186" cy="152" r="1.6" />
      <circle cx="192" cy="158" r="1.6" />
      <circle cx="184" cy="161" r="1.6" />
      <circle cx="190" cy="166" r="1.6" />
    </g>
  </g>
)

/** Rima de luz en el contorno exterior (lado izquierdo; el derecho es su reflejo). */
const RimHalf = ({ strength }: { strength: number }) => (
  <g fill="none" stroke={RIM} strokeLinecap="round" opacity={strength}>
    <path d="M168,160 L165,122 Q166,84 198,72" strokeWidth="1.6" />
    <path d="M124,16 Q120,48 136,70 Q152,88 176,96" strokeWidth="1.3" />
    <path d="M85,236 Q91,204 116,189 Q150,175 186,187" strokeWidth="1.7" />
    <path d="M76,158 L104,204 M114,136 L126,192 M58,204 L92,224 M148,146 L150,186" strokeWidth="1" />
    <path d="M96,240 Q78,330 64,430 Q54,520 42,616" strokeWidth="1.2" opacity="0.7" />
    <path d="M98,322 L121,316 M117,313 Q117,300 128,300" strokeWidth="1" />
    <path d="M138,468 L148,498" strokeWidth="0.9" />
  </g>
)

const Mirror = ({ children }: { children: React.ReactNode }) => <g transform="matrix(-1 0 0 1 400 0)">{children}</g>

/* ── Piezas centrales ─────────────────── */

const Sword = () => (
  <g>
    {/* Hoja con canal central */}
    <path fill={ARMOR} d="M191,360 L209,360 L206,582 L200,616 L194,582 Z" />
    <path fill="none" stroke={RIM} strokeOpacity="0.55" strokeWidth="1" d="M192,362 L195,582 L200,614" />
    <path fill="none" stroke={RIM} strokeOpacity="0.25" strokeWidth="0.8" d="M208,362 L205,582 L200,614" />
    <path fill="none" stroke={EDGE} strokeOpacity="0.35" strokeWidth="1.4" d="M200,368 L200,540" />
    {/* Guarda con extremos enrollados */}
    <path fill={ARMOR} d="M150,352 Q170,345 200,348 Q230,345 250,352 L252,361 Q235,356 200,358 Q165,356 148,361 Z" />
    <circle cx="148" cy="356" r="5" fill={ARMOR} />
    <circle cx="252" cy="356" r="5" fill={ARMOR} />
    <path fill="none" stroke={RIM} strokeOpacity="0.45" strokeWidth="1" d="M146,352 Q170,344 200,347 Q230,344 254,352" />
    {/* Empuñadura y pomo */}
    <rect x="196" y="316" width="8" height="32" fill={ARMOR} />
    <path fill={ARMOR} d="M200,300 L208,310 L200,320 L192,310 Z" />
  </g>
)

const Knight = () => (
  <svg viewBox="0 0 400 640" className="relative h-full w-full overflow-visible" preserveAspectRatio="xMidYMax meet">
    <defs>
      {/* Borde áspero de fotocopia */}
      <filter id="noir-rough" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>

    <g filter="url(#noir-rough)">
      {/* Capa que ondea */}
      <g className="noir-cape">
        <CapeHalf />
        <Mirror>
          <CapeHalf />
        </Mirror>
        <rect x="150" y="196" width="100" height="240" fill={CLOAK} />
      </g>

      {/* Armadura: cada placa con su borde tenue */}
      <g fill={ARMOR} stroke={EDGE} strokeOpacity="0.28" strokeWidth="0.8" strokeLinejoin="round">
        <LegHalf />
        <Mirror>
          <LegHalf />
        </Mirror>
        <TorsoHalf />
        <Mirror>
          <TorsoHalf />
        </Mirror>
        <path fill="none" d="M200,214 L200,336" />
        {/* Cinturón con hebilla */}
        <rect x="152" y="344" width="96" height="9" />
        <rect x="192" y="342" width="16" height="13" fill="#0d0d10" />
      </g>

      <Sword />

      <g fill={ARMOR} stroke={EDGE} strokeOpacity="0.28" strokeWidth="0.8" strokeLinejoin="round">
        <ArmHalf />
        <Mirror>
          <ArmHalf />
        </Mirror>
        <PauldronHalf />
        <Mirror>
          <PauldronHalf />
        </Mirror>
        <HelmHalf />
        <Mirror>
          <HelmHalf />
        </Mirror>
        {/* Cresta central del yelmo */}
        <polygon points="196,78 200,46 204,78" />
        <path fill="none" d="M200,74 L200,122" />
      </g>

      {/* Rendija del visor con brillo tenue */}
      <rect className="noir-visor" x="176" y="124" width="48" height="3.6" rx="1.6" fill="#e4e4e7" stroke="none" />

      <RimHalf strength={0.6} />
      <Mirror>
        <RimHalf strength={0.32} />
      </Mirror>
    </g>
  </svg>
)

const DarkKnight = ({ className = '' }: { className?: string }) => {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 18 })
  const sy = useSpring(my, { stiffness: 40, damping: 18 })
  // El caballero se mueve al revés que el mouse, para dar profundidad
  const x = useTransform(sx, (v) => v * -10)
  const y = useTransform(sy, (v) => v * -5)

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
      <NoirLight className="absolute -inset-x-[60%] -top-[14%] -bottom-[4%]" cx={0.5} cy={0.73} />
      <motion.div className="relative h-full w-full" style={{ x, y }}>
        <Knight />
      </motion.div>
      <div className="noir-fog noir-fog-a absolute -inset-x-1/2 bottom-0 h-1/4" />
    </div>
  )
}

export default DarkKnight
