import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/utils/helpers'

interface FitLineProps {
  children: ReactNode
  className?: string
  /** Altura máxima de la letra, en porcentaje del alto de la ventana (vh). */
  maxVh?: number
  /** Altura máxima de la letra en píxeles. */
  maxPx?: number
}

const BASE = 100

/**
 * Una línea de cartel compuesta a todo el ancho, como con tipos de madera:
 * mide el texto a un tamaño base y lo escala para llenar su contenedor,
 * sin pasar del alto máximo. Se recalcula al cambiar el tamaño o al cargar la fuente.
 */
const FitLine = ({ children, className, maxVh, maxPx }: FitLineProps) => {
  const boxRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const box = boxRef.current
    const text = textRef.current
    if (!box || !text) return

    const fit = () => {
      text.style.fontSize = `${BASE}px`
      const natural = text.scrollWidth
      const available = box.clientWidth
      if (!natural || !available) return
      let size = (available / natural) * BASE
      if (maxVh) size = Math.min(size, (window.innerHeight * maxVh) / 100)
      if (maxPx) size = Math.min(size, maxPx)
      text.style.fontSize = `${size}px`
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
  }, [maxVh, maxPx])

  return (
    <span ref={boxRef} className={cn('block w-full min-w-0 overflow-x-clip pt-[0.14em]', className)}>
      <span ref={textRef} className="inline-block whitespace-nowrap leading-[0.86]">
        {children}
      </span>
    </span>
  )
}

export default FitLine
