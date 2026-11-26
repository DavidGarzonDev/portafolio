import { useEffect, useState } from 'react'
import { makeGrain } from './grain'

/**
 * Caballero oscuro original en silueta, recortado contra un círculo de luz granulada:
 * yelmo con cuernos y visor que brilla tenue, hombreras con púas, capa rasgada y una
 * espada clavada que sostiene con las dos manos. Algunos bordes reciben la luz de atrás.
 */

const W = 400
const DARK = '#030304'
const CLOAK = '#101014'
const RIM = '#e4e4e7'
const EDGE = '#a1a1aa'

type Pt = [number, number]
const pts = (list: Pt[]) => list.map(([x, y]) => `${x},${y}`).join(' ')
/** Refleja un polígono de la mitad izquierda a la derecha. */
const mirror = (list: Pt[]): Pt[] => list.map(([x, y]) => [W - x, y])

/* Mitad izquierda de cada pieza (la derecha se obtiene con `mirror`) */
const CAPE: Pt[] = [
  [152, 196], [118, 230], [96, 300], [80, 380], [70, 460], [60, 540], [52, 620],
  [74, 600], [86, 624], [104, 596], [118, 620], [132, 598], [148, 620], [150, 420], [156, 300],
]
const HORN: Pt[] = [[176, 100], [156, 92], [136, 76], [122, 52], [120, 26], [128, 6], [132, 30], [142, 54], [160, 72], [180, 82]]
const PAULDRON: Pt[] = [
  [170, 186], [140, 184], [112, 194], [94, 214], [86, 240], [104, 232], [120, 238], [110, 252], [104, 270],
  [126, 258], [146, 260], [140, 276], [160, 268], [172, 238],
]
const SPIKES: Pt[][] = [
  [[104, 206], [80, 168], [116, 200]],
  [[124, 194], [112, 146], [138, 190]],
  [[146, 188], [144, 150], [158, 187]],
  [[92, 224], [62, 206], [96, 236]],
]
const ARM: Pt[] = [[146, 250], [132, 290], [134, 326], [154, 350], [180, 356], [186, 340], [164, 318], [160, 280], [168, 252]]
const LEG: Pt[] = [[156, 392], [198, 392], [196, 470], [192, 620], [146, 620], [150, 470]]

const DarkKnight = ({ className = '' }: { className?: string }) => {
  const [grain, setGrain] = useState('')
  useEffect(() => {
    setGrain(makeGrain(180))
  }, [])

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      {/* Círculo de luz granulada detrás del caballero */}
      <div className="noir-spot absolute left-1/2 top-[30%] aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full">
        {grain && <div className="noir-spot-grain absolute inset-0 rounded-full" style={{ backgroundImage: `url(${grain})` }} />}
      </div>

      <svg viewBox="0 0 400 620" className="relative h-full w-full" preserveAspectRatio="xMidYMax meet">
        {/* Capa, un tono más clara para separar la armadura */}
        <g fill={CLOAK}>
          <polygon points={pts(CAPE)} />
          <polygon points={pts(mirror(CAPE))} />
          <rect x="150" y="196" width="100" height="220" />
        </g>
        <g fill={DARK}>

          {/* Piernas y grebas */}
          <polygon points={pts(LEG)} />
          <polygon points={pts(mirror(LEG))} />

          {/* Faldar de placas */}
          <polygon points={pts([[154, 330], [246, 330], [256, 396], [144, 396]])} />

          {/* Peto */}
          <polygon points={pts([[148, 222], [252, 222], [246, 300], [232, 336], [200, 346], [168, 336], [154, 300]])} />

          {/* Brazos hacia la empuñadura */}
          <polygon points={pts(ARM)} />
          <polygon points={pts(mirror(ARM))} />

          {/* Hombreras con púas */}
          <polygon points={pts(PAULDRON)} />
          <polygon points={pts(mirror(PAULDRON))} />
          {SPIKES.map((s, i) => (
            <g key={i}>
              <polygon points={pts(s)} />
              <polygon points={pts(mirror(s))} />
            </g>
          ))}

          {/* Gorjal */}
          <polygon points={pts([[172, 166], [228, 166], [240, 194], [160, 194]])} />

          {/* Yelmo con cuernos */}
          <path d="M173,170 L169,124 Q166,84 200,72 Q234,84 231,124 L227,170 Q214,182 200,184 Q186,182 173,170 Z" />
          <polygon points={pts(HORN)} />
          <polygon points={pts(mirror(HORN))} />
          {/* Cresta central */}
          <polygon points={pts([[196, 78], [200, 52], [204, 78]])} />

          {/* Espada clavada: pomo, guarda y hoja */}
          <circle cx="200" cy="330" r="8" />
          <rect x="196" y="334" width="8" height="18" />
          <path d="M156,352 Q200,344 244,352 L244,360 Q200,354 156,360 Z" />
          <polygon points={pts([[192, 360], [208, 360], [205, 560], [200, 600], [195, 560]])} />
        </g>

        {/* Rendija del visor con un brillo tenue */}
        <rect className="noir-visor" x="180" y="122" width="40" height="3.5" rx="1.5" fill="#d4d4d8" />
        <rect x="198" y="126" width="4" height="26" fill="#0e0e10" />

        {/* Bordes iluminados por la luz de atrás */}
        <g fill="none" stroke={RIM} strokeLinecap="round" opacity="0.55">
          <path d="M172,162 L169,124 Q166,86 198,74" strokeWidth="1.6" />
          <path d="M128,8 Q118,40 140,62 Q156,76 178,84" strokeWidth="1.2" />
          <path d="M86,240 L94,214 Q110,195 140,185" strokeWidth="1.6" />
          <path d="M80,168 L104,206" strokeWidth="1" />
          <path d="M112,146 L124,194" strokeWidth="1" />
          <path d="M62,206 L92,224" strokeWidth="1" />
          <path d="M118,230 Q98,300 82,380 Q72,460 62,540" strokeWidth="1.1" opacity="0.6" />
          <path d="M156,352 Q200,344 244,352" strokeWidth="1" />
          <path d="M192,362 L195,560" strokeWidth="0.9" />
        </g>
        {/* Placas de la armadura */}
        <g fill="none" stroke={EDGE} strokeLinecap="round" strokeLinejoin="round" opacity="0.35" strokeWidth="1">
          <path d="M148,222 L252,222" />
          <path d="M154,300 Q200,318 246,300" />
          <path d="M162,262 Q200,276 238,262" />
          <path d="M200,226 L200,300" />
          <path d="M154,330 L246,330" />
          <path d="M150,352 L144,396 M176,352 L172,396 M224,352 L228,396 M250,352 L256,396" />
          <path d="M136,300 Q146,306 160,300 M264,300 Q254,306 240,300" />
          <path d="M140,322 Q150,330 164,326 M260,322 Q250,330 236,326" />
          <path d="M168,340 Q184,334 196,338 M232,340 Q216,334 204,338" />
          <path d="M150,470 L196,470 M204,470 L250,470" />
          <path d="M172,140 L228,140" />
        </g>
        {/* Filos de la espada hasta el suelo */}
        <g fill="none" stroke={RIM} strokeLinecap="round">
          <path d="M193,362 L196,560 L200,600" strokeWidth="1" opacity="0.6" />
          <path d="M207,362 L204,560 L200,600" strokeWidth="0.8" opacity="0.3" />
          <path d="M200,364 L200,590" strokeWidth="0.6" opacity="0.25" />
        </g>
        <g fill="none" stroke={RIM} strokeLinecap="round" opacity="0.3">
          <path d="M229,160 L230,118 Q230,84 202,76" strokeWidth="1.2" />
          <path d="M314,240 L306,214 Q290,195 260,185" strokeWidth="1.2" />
        </g>
      </svg>

      {/* Niebla a sus pies */}
      <div className="noir-fog noir-fog-a absolute -inset-x-1/2 bottom-0 h-1/3" />
    </div>
  )
}

export default DarkKnight
