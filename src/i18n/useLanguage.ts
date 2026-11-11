import { useContext } from 'react'
import { LanguageContext } from './context'

const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  return ctx
}

export default useLanguage
