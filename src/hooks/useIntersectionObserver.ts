import { useState, useEffect, useRef, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

interface UseIntersectionObserverReturn {
  isVisible: boolean
  ref: React.RefObject<HTMLElement>
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options
  
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const hasTriggered = useRef(false)

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      setIsVisible(true)
      if (triggerOnce) {
        hasTriggered.current = true
      }
    } else if (!triggerOnce) {
      setIsVisible(false)
    }
  }, [triggerOnce])

  useEffect(() => {
    const element = ref.current
    if (!element || hasTriggered.current) return

    const observer = new IntersectionObserver(callback, {
      threshold,
      rootMargin,
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [callback, threshold, rootMargin])

  return { isVisible, ref }
}