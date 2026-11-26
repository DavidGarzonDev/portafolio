import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/utils/helpers'

interface FitLineProps {
  children: ReactNode
  className?: string
  /** Altura máxima de la letra, en porcentaje del alto de la ventana (vh). */
  maxVh?: number
  /** Altura máxima de la letra en píxeles. */
  maxPx?: number
  /**
   * Si el tope de altura impide llenar la medida, abre el espaciado entre letras
   * (hasta este máximo, en em) para que la línea siga ocupando todo el ancho.
   */
  maxTrack?: number
}

const BASE = 100

/**
 * Una línea de cartel compuesta a todo el ancho, como con tipos de madera:
 * mide el texto a un tamaño base y lo escala para llenar su contenedor,
 * sin pasar del alto máximo. Se recalcula al cambiar el tamaño o al cargar la fuente.
 */
const FitLine = ({ children, className, maxVh, maxPx, maxTrack = 0 }: FitLineProps) => {
  const boxRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const box = boxRef.current
    const text = textRef.current
    if (!box || !text) return

    const fit = () => {
      text.style.fontSize = `${BASE}px`
      text.style.letterSpacing = ''
      const natural = text.scrollWidth
      const available = box.clientWidth
      if (!natural || !available) return
      let size = (available / natural) * BASE
      if (maxVh) size = Math.min(size, (window.innerHeight * maxVh) / 100)
      if (maxPx) size = Math.min(size, maxPx)
      text.style.fontSize = `${size}px`
      if (maxTrack > 0) {
        const chars = Math.max((text.textContent ?? '').length - 1, 1)
        const gap = available - text.scrollWidth
        if (gap > 1) {
          const track = Math.min(gap / chars, maxTrack * size)
          text.style.letterSpacing = `${track}px`
        }
      }
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(box)
    document.fonts?.ready.then(fit).catch(() => {})
    window.addEventListener('resize', fit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [maxVh, maxPx, maxTrack])

  return (
    <span ref={boxRef} className={cn('block w-full min-w-0 overflow-x-clip pt-[0.14em]', className)}>
      <span ref={textRef} className="inline-block whitespace-nowrap leading-[0.86]">
        {children}
      </span>
    </span>
  )
}

export default FitLine
