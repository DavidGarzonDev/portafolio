/**
 * Silueta original de un castillo gótico, dibujada con formas simples (torres, agujas,
 * almenas y ventanas ojivales), con una capa lejana entre niebla y otra cercana en negro.
 */

const GROUND = 420

interface Tower {
  x: number
  w: number
  top: number
  /** Altura de la aguja cónica; 0 = torre con almenas. */
  spire: number
}

const Spire = ({ x, w, top, spire }: Tower) =>
  spire > 0 ? (
    <>
      <polygon points={`${x - 5},${top} ${x + w / 2},${top - spire} ${x + w + 5},${top}`} />
      <rect x={x + w / 2 - 1} y={top - spire - 14} width={2} height={16} />
      <rect x={x - 6} y={top - 6} width={w + 12} height={8} />
    </>
  ) : (
    <>
      {Array.from({ length: Math.floor(w / 10) }, (_, i) => (
        <rect key={i} x={x + i * 10 + 1} y={top - 8} width={6} height={9} />
      ))}
    </>
  )

const TowerShape = (t: Tower) => (
  <>
    <rect x={t.x} y={t.top} width={t.w} height={GROUND - t.top} />
    <Spire {...t} />
  </>
)

/** Ventana ojival (arco apuntado). */
const Window = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <path d={`M${x},${y + h} V${y + w * 0.6} Q${x},${y} ${x + w / 2},${y - w * 0.35} Q${x + w},${y} ${x + w},${y + w * 0.6} V${y + h} Z`} />
)

const FAR: Tower[] = [
  { x: 40, w: 36, top: 240, spire: 80 },
  { x: 430, w: 40, top: 230, spire: 96 },
  { x: 560, w: 50, top: 250, spire: 0 },
  { x: 840, w: 46, top: 245, spire: 0 },
  { x: 960, w: 36, top: 225, spire: 100 },
  { x: 1370, w: 40, top: 235, spire: 84 },
]

/** Torres altas a los lados para enmarcar el texto; el centro queda bajo. */
const NEAR: Tower[] = [
  { x: 110, w: 40, top: 262, spire: 70 },
  { x: 162, w: 60, top: 172, spire: 110 },
  { x: 236, w: 76, top: 112, spire: 132 },
  { x: 326, w: 50, top: 202, spire: 92 },
  { x: 388, w: 30, top: 262, spire: 60 },
  { x: 1022, w: 32, top: 252, spire: 64 },
  { x: 1066, w: 54, top: 192, spire: 102 },
  { x: 1134, w: 72, top: 132, spire: 126 },
  { x: 1220, w: 58, top: 182, spire: 98 },
  { x: 1292, w: 40, top: 272, spire: 66 },
]

const HALLS = [
  { x: 140, w: 260, top: 286, peak: 236 },
  { x: 1046, w: 260, top: 292, peak: 246 },
]

const WINDOWS = [
  { x: 260, y: 160, w: 14, h: 30, lit: true },
  { x: 282, y: 160, w: 14, h: 30, lit: false },
  { x: 262, y: 236, w: 22, h: 44, lit: true },
  { x: 184, y: 222, w: 16, h: 32, lit: false },
  { x: 343, y: 246, w: 14, h: 28, lit: true },
  { x: 1160, y: 180, w: 14, h: 30, lit: false },
  { x: 1180, y: 180, w: 14, h: 30, lit: true },
  { x: 1158, y: 254, w: 22, h: 44, lit: false },
  { x: 1240, y: 226, w: 16, h: 32, lit: true },
  { x: 1086, y: 240, w: 14, h: 28, lit: true },
  { x: 712, y: 352, w: 16, h: 40, lit: true },
]

const GothicSkyline = () => (
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46vh] min-h-[260px]" aria-hidden="true">
    <div className="noir-horizon absolute inset-0" />
    <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax meet" className="absolute inset-0 h-full w-full">
      {/* Castillo lejano, perdido en la niebla */}
      <g fill="#3a3a3f" opacity="0.7">
        {FAR.map((t) => (
          <TowerShape key={t.x} {...t} />
        ))}
        <rect x="0" y="330" width="1440" height="90" />
      </g>

      {/* Niebla entre las dos capas */}
      <rect x="0" y="200" width="1440" height="220" fill="url(#noir-fog-mid)" />

      {/* Castillo cercano */}
      <g fill="#050505">
        {NEAR.map((t) => (
          <TowerShape key={t.x} {...t} />
        ))}
        {/* Naves con techo a dos aguas */}
        {HALLS.map((h) => (
          <g key={h.x}>
            <rect x={h.x} y={h.top} width={h.w} height={GROUND - h.top} />
            <polygon points={`${h.x - 4},${h.top + 2} ${h.x + h.w / 2},${h.peak} ${h.x + h.w + 4},${h.top + 2}`} />
          </g>
        ))}
        {/* Portón central bajo */}
        <rect x="676" y="318" width="88" height="102" />
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={677 + i * 11} y="310" width="7" height="9" />
        ))}
        {/* Murallas con almenas */}
        <rect x="0" y="352" width="1440" height="68" />
        {Array.from({ length: 72 }, (_, i) => (
          <rect key={i} x={i * 20 + 4} y="344" width="11" height="9" />
        ))}
      </g>

      {/* Ventanas: algunas con luz tenue */}
      {WINDOWS.map((w, i) => (
        <g key={i} fill={w.lit ? '#a1a1aa' : '#121214'} className={w.lit ? 'noir-window' : undefined} style={{ animationDelay: `${i * 0.7}s` }}>
          <Window {...w} />
        </g>
      ))}

      <defs>
        <linearGradient id="noir-fog-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d4d4d8" stopOpacity="0" />
          <stop offset="0.7" stopColor="#d4d4d8" stopOpacity="0.22" />
          <stop offset="1" stopColor="#d4d4d8" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>

    {/* Bancos de niebla que se mueven despacio por delante */}
    <div className="noir-fog noir-fog-a absolute inset-x-0 bottom-0 h-1/2" />
    <div className="noir-fog noir-fog-b absolute inset-x-0 bottom-0 h-1/3" />

    {/* Un ave que cruza el cielo de vez en cuando */}
    <svg viewBox="0 0 60 24" className="noir-bird absolute left-0 top-[8%] w-10" fill="#050505">
      <path d="M0,12 Q12,0 24,10 Q30,14 36,10 Q48,0 60,12 Q48,6 36,14 Q30,18 24,14 Q12,6 0,12 Z" />
    </svg>
  </div>
)

export default GothicSkyline
