import { useEffect, useState } from 'react'
import { makeGrain } from './grain'

/**
 * Capa de cine antiguo en el fondo del sitio (detrás del contenido): grano que tiembla,
 * viñeta oscura en los bordes y un parpadeo muy leve. No toca textos ni imágenes.
 */
const NoirAtmosphere = () => {
  const [grain, setGrain] = useState('')

  useEffect(() => {
    setGrain(makeGrain())
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="noir-vignette absolute inset-0" />
      <div className="noir-flicker absolute inset-0" />
      {grain && (
        <div
          className="noir-grain absolute -inset-[220px]"
          style={{ backgroundImage: `url(${grain})` }}
        />
      )}
    </div>
  )
}

export default NoirAtmosphere
