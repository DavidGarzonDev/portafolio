import { useEffect, useState } from 'react'

/** Genera una vez una textura de ruido en blanco y negro para el grano de película. */
const makeGrain = (size = 220) => {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  const img = ctx.createImageData(size, size)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v
    img.data[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  return canvas.toDataURL('image/png')
}

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
