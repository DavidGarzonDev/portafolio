/**
 * Silueta original de un castillo gótico con detalle arquitectónico: torres escalonadas con
 * matacanes, agujas curvas con buhardillas y cruces, naves con contrafuertes y pináculos,
 * crestería en los techos, rosetones, ventanas ojivales y una portada con rastrillo.
 * Cada forma tiene una cara un poco más clara para dar volumen.
 */
import type { ReactNode } from 'react'

const GROUND = 420
const DARK = '#050506'
const LIT = '#101014'
const GLASS = '#1a1a1e'
const GLOW = '#a1a1aa'

/* ── Piezas ─────────────────────────────── */

/** Ventana ojival; con `mullion` lleva un parteluz al centro. */
const Lancet = ({ x, y, w, h, lit = false, mullion = false, delay = 0 }: { x: number; y: number; w: number; h: number; lit?: boolean; mullion?: boolean; delay?: number }) => (
  <g className={lit ? 'noir-window' : undefined} style={lit ? { animationDelay: `${delay}s` } : undefined}>
    <path
      fill={lit ? GLOW : GLASS}
      d={`M${x},${y + h} V${y + w * 0.55} Q${x},${y} ${x + w / 2},${y - w * 0.45} Q${x + w},${y} ${x + w},${y + w * 0.55} V${y + h} Z`}
    />
    {mullion && <rect x={x + w / 2 - 0.75} y={y - w * 0.2} width={1.5} height={h + w * 0.2} fill={DARK} />}
  </g>
)

/** Cruz o remate en la punta de una aguja. */
const Finial = ({ cx, y }: { cx: number; y: number }) => (
  <g fill={DARK}>
    <rect x={cx - 1} y={y - 18} width={2} height={20} />
    <rect x={cx - 5} y={y - 13} width={10} height={2} />
    <circle cx={cx} cy={y - 1} r={2.4} />
  </g>
)

/** Pináculo pequeño (aguja de piedra) sobre contrafuertes y esquinas. */
const Pinnacle = ({ x, y, w = 10, h = 26 }: { x: number; y: number; w?: number; h?: number }) => (
  <g>
    <polygon fill={DARK} points={`${x},${y} ${x + w / 2},${y - h} ${x + w},${y}`} />
    <polygon fill={LIT} points={`${x},${y} ${x + w / 2},${y - h} ${x + w / 2},${y}`} />
    <rect fill={DARK} x={x + w / 2 - 0.6} y={y - h - 6} width={1.2} height={7} />
  </g>
)

interface TowerSpec {
  x: number
  w: number
  top: number
  /** Altura de la aguja; 0 = remate con almenas. */
  spire: number
  /** Cuerpo superior más angosto (torre escalonada). */
  tier?: number
  /** Ventanas con luz: índice de fila, -1 = cuerpo superior, -2 = buhardilla de la aguja. */
  lit?: number[]
}

/** Torre con matacán (voladizo con ménsulas), cuerpo superior opcional y aguja curva. */
const Tower = ({ x, w, top, spire, tier = 0, lit = [] }: TowerSpec) => {
  const parts: ReactNode[] = []
  parts.push(<rect key="body" fill={DARK} x={x} y={top} width={w} height={GROUND - top} />)
  parts.push(<rect key="body-lit" fill={LIT} x={x} y={top} width={w * 0.3} height={GROUND - top} />)

  // Matacán: voladizo con ménsulas triangulares
  const ledgeY = top - 10
  parts.push(<rect key="ledge" fill={DARK} x={x - 5} y={ledgeY} width={w + 10} height={10} />)
  for (let i = 0; i * 8 < w + 6; i++) {
    const cx = x - 4 + i * 8
    parts.push(<polygon key={`c${i}`} fill={DARK} points={`${cx},${top} ${cx + 4},${top + 7} ${cx + 8},${top}`} />)
  }

  // Cuerpo superior escalonado
  let baseY = ledgeY
  let bx = x - 5
  let bw = w + 10
  if (tier > 0) {
    bx = x + 4
    bw = w - 8
    baseY = ledgeY - tier
    parts.push(<rect key="tier" fill={DARK} x={bx} y={baseY} width={bw} height={tier} />)
    parts.push(<rect key="tier-lit" fill={LIT} x={bx} y={baseY} width={bw * 0.3} height={tier} />)
    parts.push(<Lancet key="tier-win" x={bx + bw / 2 - 4} y={baseY + 10} w={8} h={tier - 16} lit={lit.includes(-1)} />)
    parts.push(<Pinnacle key="pl" x={x - 5} y={ledgeY} w={8} h={20} />)
    parts.push(<Pinnacle key="pr" x={x + w - 3} y={ledgeY} w={8} h={20} />)
  }

  if (spire > 0) {
    // Aguja con lados curvos (cóncavos) y su mitad iluminada
    const cx = bx + bw / 2
    const tipY = baseY - spire
    const left = bx - 3
    const right = bx + bw + 3
    parts.push(
      <path key="spire" fill={DARK} d={`M${left},${baseY} Q${cx - bw * 0.1},${baseY - spire * 0.5} ${cx},${tipY} Q${cx + bw * 0.1},${baseY - spire * 0.5} ${right},${baseY} Z`} />,
    )
    parts.push(<path key="spire-lit" fill={LIT} d={`M${left},${baseY} Q${cx - bw * 0.1},${baseY - spire * 0.5} ${cx},${tipY} L${cx},${baseY} Z`} />)
    // Buhardilla en la aguja
    const dy = baseY - spire * 0.32
    parts.push(<polygon key="dormer-roof" fill={DARK} points={`${cx - 6},${dy} ${cx},${dy - 9} ${cx + 6},${dy}`} />)
    parts.push(<rect key="dormer" fill={DARK} x={cx - 5} y={dy} width={10} height={9} />)
    parts.push(<rect key="dormer-win" fill={lit.includes(-2) ? GLOW : GLASS} x={cx - 2} y={dy + 2} width={4} height={6} />)
    parts.push(<Finial key="finial" cx={cx} y={tipY} />)
  } else {
    for (let i = 0; i * 10 < bw - 4; i++) {
      parts.push(<rect key={`m${i}`} fill={DARK} x={bx + i * 10 + 1} y={baseY - 9} width={6} height={10} />)
    }
  }

  // Ventanas del cuerpo: ojivales y aspilleras alternadas
  const rows = Math.max(0, Math.floor((GROUND - top - 70) / 46))
  for (let r = 0; r < rows; r++) {
    const wy = top + 22 + r * 46
    const narrow = r % 2 === 1
    const ww = narrow ? 4 : Math.min(12, w * 0.24)
    parts.push(
      <Lancet key={`w${r}`} x={x + w / 2 - ww / 2} y={wy} w={ww} h={narrow ? 16 : 24} lit={lit.includes(r)} mullion={!narrow && ww >= 10} delay={r * 0.9 + x / 200} />,
    )
  }
  return <g>{parts}</g>
}

interface HallSpec {
  x: number
  w: number
  top: number
  roof: number
  /** Ventanales con luz por índice; 101 y 102 son las buhardillas del techo. */
  lit?: number[]
}

/** Nave larga con techo inclinado, crestería, contrafuertes con pináculos y ventanales. */
const Hall = ({ x, w, top, roof, lit = [] }: HallSpec) => {
  const parts: ReactNode[] = []
  const ridge = top - roof
  parts.push(<rect key="wall" fill={DARK} x={x} y={top} width={w} height={GROUND - top} />)
  parts.push(<polygon key="roof" fill={DARK} points={`${x - 4},${top + 1} ${x + 16},${ridge} ${x + w - 16},${ridge} ${x + w + 4},${top + 1}`} />)
  parts.push(<polygon key="roof-lit" fill={LIT} points={`${x - 4},${top + 1} ${x + 16},${ridge} ${x + 16},${top + 1}`} />)
  // Crestería sobre la cumbrera
  for (let cx = x + 20; cx < x + w - 20; cx += 9) {
    parts.push(<polygon key={`k${cx}`} fill={DARK} points={`${cx},${ridge + 1} ${cx + 3},${ridge - 7} ${cx + 6},${ridge + 1}`} />)
  }
  parts.push(<Finial key="f1" cx={x + 16} y={ridge} />)
  parts.push(<Finial key="f2" cx={x + w - 16} y={ridge} />)
  // Buhardillas en el techo
  for (let i = 1; i <= 2; i++) {
    const dx = x + (w * i) / 3
    const dy = top - roof * 0.45
    parts.push(<polygon key={`dr${i}`} fill={DARK} points={`${dx - 8},${dy} ${dx},${dy - 12} ${dx + 8},${dy}`} />)
    parts.push(<rect key={`db${i}`} fill={DARK} x={dx - 7} y={dy} width={14} height={roof * 0.45} />)
    parts.push(<Lancet key={`dw${i}`} x={dx - 3} y={dy + 4} w={6} h={9} lit={lit.includes(100 + i)} delay={i} />)
  }
  // Contrafuertes con pináculos y ventanales entre ellos
  const bays = Math.max(2, Math.round(w / 44))
  const step = w / bays
  for (let i = 0; i <= bays; i++) {
    const bx = x + i * step - 5
    parts.push(<rect key={`b${i}`} fill={DARK} x={bx} y={top - 4} width={10} height={GROUND - top + 4} />)
    parts.push(<rect key={`bl${i}`} fill={LIT} x={bx} y={top - 4} width={3} height={GROUND - top + 4} />)
    parts.push(<Pinnacle key={`p${i}`} x={bx} y={top - 4} />)
    if (i < bays) {
      parts.push(
        <Lancet key={`hw${i}`} x={bx + step / 2 - 4} y={top + 26} w={step * 0.34} h={46} lit={lit.includes(i)} mullion delay={i * 1.3} />,
      )
    }
  }
  return <g>{parts}</g>
}

/** Fachada con gablete y rosetón. */
const Gable = ({ cx, base, w, h, lit = false }: { cx: number; base: number; w: number; h: number; lit?: boolean }) => {
  const r = w * 0.2
  const ry = base - h * 0.42
  return (
    <g>
      <polygon fill={DARK} points={`${cx - w / 2},${base} ${cx},${base - h} ${cx + w / 2},${base}`} />
      <polygon fill={LIT} points={`${cx - w / 2},${base} ${cx},${base - h} ${cx},${base}`} />
      <Finial cx={cx} y={base - h} />
      <Pinnacle x={cx - w / 2 - 4} y={base} w={9} h={24} />
      <Pinnacle x={cx + w / 2 - 5} y={base} w={9} h={24} />
      <g className={lit ? 'noir-window' : undefined}>
        <circle cx={cx} cy={ry} r={r} fill={lit ? GLOW : GLASS} />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4
          return <line key={i} x1={cx} y1={ry} x2={cx + Math.cos(a) * r} y2={ry + Math.sin(a) * r} stroke={DARK} strokeWidth={1.4} />
        })}
        <circle cx={cx} cy={ry} r={r * 0.32} fill={DARK} />
      </g>
    </g>
  )
}

/** Portada central: dos torrecillas, arco apuntado y rastrillo. */
const Gatehouse = ({ cx }: { cx: number }) => (
  <g>
    <Tower x={cx - 58} w={26} top={300} spire={46} />
    <Tower x={cx + 32} w={26} top={300} spire={46} />
    <rect fill={DARK} x={cx - 34} y={316} width={68} height={GROUND - 316} />
    <rect fill={LIT} x={cx - 34} y={316} width={18} height={GROUND - 316} />
    {Array.from({ length: 7 }, (_, i) => (
      <rect key={i} fill={DARK} x={cx - 33 + i * 10} y={307} width={6} height={10} />
    ))}
    <path fill={GLASS} d={`M${cx - 16},${GROUND} V${358} Q${cx - 16},${338} ${cx},${330} Q${cx + 16},${338} ${cx + 16},${358} V${GROUND} Z`} />
    {Array.from({ length: 5 }, (_, i) => (
      <rect key={`v${i}`} fill={DARK} x={cx - 13 + i * 6.5} y={334} width={1.6} height={GROUND - 334} />
    ))}
    {Array.from({ length: 5 }, (_, i) => (
      <rect key={`h${i}`} fill={DARK} x={cx - 16} y={348 + i * 14} width={32} height={1.6} />
    ))}
  </g>
)

/* ── Composición ─────────────────────────────── */

const FAR: TowerSpec[] = [
  { x: 40, w: 36, top: 240, spire: 84 },
  { x: 430, w: 40, top: 230, spire: 100, tier: 22 },
  { x: 560, w: 50, top: 250, spire: 0 },
  { x: 840, w: 46, top: 245, spire: 0 },
  { x: 960, w: 36, top: 225, spire: 104, tier: 20 },
  { x: 1370, w: 40, top: 235, spire: 88 },
]

const GothicSkyline = () => (
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50vh] min-h-[280px]" aria-hidden="true">
    <div className="noir-horizon absolute inset-0" />
    <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax meet" className="absolute inset-0 h-full w-full">
      {/* Castillo lejano, perdido en la niebla */}
      <g opacity="0.42">
        {FAR.map((t) => (
          <Tower key={t.x} {...t} />
        ))}
        <rect fill={DARK} x="0" y="330" width="1440" height="90" />
      </g>

      <rect x="0" y="200" width="1440" height="220" fill="url(#noir-fog-mid)" />

      {/* Ala izquierda */}
      <Hall x={150} w={250} top={290} roof={44} lit={[1, 102]} />
      <Gable cx={275} base={292} w={70} h={86} lit />
      <Tower x={110} w={40} top={262} spire={74} lit={[0]} />
      <Tower x={166} w={56} top={176} spire={104} tier={26} lit={[1, -2]} />
      <Tower x={236} w={74} top={150} spire={124} tier={34} lit={[0, 2, -1]} />
      <Tower x={330} w={48} top={206} spire={90} lit={[1]} />
      <Tower x={392} w={30} top={262} spire={58} />

      {/* Ala derecha */}
      <Hall x={1046} w={260} top={296} roof={40} lit={[2, 101]} />
      <Gable cx={1180} base={298} w={64} h={80} />
      <Tower x={1022} w={32} top={256} spire={64} />
      <Tower x={1066} w={52} top={196} spire={98} tier={24} lit={[0, -1]} />
      <Tower x={1134} w={70} top={160} spire={118} tier={32} lit={[1, -2]} />
      <Tower x={1222} w={56} top={188} spire={96} lit={[0, 2]} />
      <Tower x={1294} w={40} top={274} spire={64} lit={[0]} />

      {/* Murallas con almenas y portada central */}
      <rect fill={DARK} x="0" y="356" width="1440" height="64" />
      {Array.from({ length: 72 }, (_, i) => (
        <rect key={i} fill={DARK} x={i * 20 + 4} y="347" width="11" height="10" />
      ))}
      <Gatehouse cx={720} />

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
    <svg viewBox="0 0 60 24" className="noir-bird absolute left-0 top-[8%] w-10" fill={DARK}>
      <path d="M0,12 Q12,0 24,10 Q30,14 36,10 Q48,0 60,12 Q48,6 36,14 Q30,18 24,14 Q12,6 0,12 Z" />
    </svg>
  </div>
)

export default GothicSkyline
