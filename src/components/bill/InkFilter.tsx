/**
 * Filtro SVG de tinta de imprenta, usado por la clase `.bill-ink`:
 * desplaza un poco los bordes (tipos de madera gastados) y abre pequeños
 * vacíos donde la tinta no cargó. Se monta una sola vez en la app.
 */
const InkFilter = () => (
  <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
    <filter id="bill-ink-fx" x="-2%" y="-10%" width="104%" height="120%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" result="edge" />
      <feDisplacementMap in="SourceGraphic" in2="edge" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="rough" />
      <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="4" seed="9" result="grain" />
      {/* Alfa = 1 salvo donde el ruido es alto: ahí la tinta no cargó */}
      <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -40 0 0 0 29.2" result="voids" />
      <feComposite in="rough" in2="voids" operator="in" />
    </filter>
  </svg>
)

export default InkFilter
