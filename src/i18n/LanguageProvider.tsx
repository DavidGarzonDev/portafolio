import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext } from './context'
import type { Lang, Localized } from './types'
import { detectLang, STORAGE_KEY } from './detectLang'
import { UI, type UIKey } from './ui'

const LanguageProvider = ({ children, initial }: { children: ReactNode; initial?: Lang }) => {
  const [lang, setLangState] = useState<Lang>(() => initial ?? detectLang())

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sin almacenamiento el cambio dura solo esta visita.
    }
  }, [])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === 'es' ? 'en' : 'es'),
      t: (key: UIKey) => UI[key][lang],
      tr: (text: Localized) => text[lang],
    }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
