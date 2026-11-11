import { createContext } from 'react'
import type { Lang, Localized } from './types'
import type { UIKey } from './ui'

export interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  /** Texto de la interfaz en el idioma actual. */
  t: (key: UIKey) => string
  /** Elige el idioma actual de un texto bilingüe. */
  tr: (text: Localized) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
