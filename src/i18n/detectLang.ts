import type { Lang } from './types'

export const STORAGE_KEY = 'lang'

/** Idioma guardado por el visitante; si no hay, el de su navegador. */
export const detectLang = (): Lang => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {
    // Almacenamiento bloqueado: se usa el idioma del navegador.
  }
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}
