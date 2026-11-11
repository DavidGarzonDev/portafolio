import { describe, expect, it, beforeEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { UI } from './ui'
import { LANGS, type Localized } from './types'
import { detectLang, STORAGE_KEY } from './detectLang'
import LanguageProvider from './LanguageProvider'
import Header from '@/pages/Header'
import { EXPERIENCE, PERSONAL_INFO, PROJECTS_DATA } from '@/constants'

const isLocalized = (v: unknown): v is Localized =>
  typeof v === 'object' && v !== null && LANGS.every((l) => l in (v as object))

/** Recorre un objeto y devuelve todos los textos bilingües que encuentre. */
const collectLocalized = (value: unknown, path = ''): [string, Localized][] => {
  if (isLocalized(value)) return [[path, value]]
  if (Array.isArray(value)) return value.flatMap((v, i) => collectLocalized(v, `${path}[${i}]`))
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).flatMap(([k, v]) => collectLocalized(v, path ? `${path}.${k}` : k))
  }
  return []
}

describe('traducciones', () => {
  it('todos los textos de la interfaz existen en español e inglés', () => {
    for (const [key, text] of Object.entries(UI)) {
      for (const lang of LANGS) expect(text[lang].trim(), `${key}.${lang}`).not.toBe('')
    }
  })

  it('todo el contenido (proyectos, experiencia, perfil) está en los dos idiomas', () => {
    const texts = collectLocalized({ PROJECTS_DATA, EXPERIENCE, PERSONAL_INFO })
    expect(texts.length).toBeGreaterThan(10)
    for (const [path, text] of texts) {
      for (const lang of LANGS) expect(text[lang].trim(), `${path}.${lang}`).not.toBe('')
    }
  })
})

describe('idioma', () => {
  beforeEach(() => window.localStorage.clear())

  it('usa el idioma guardado por el visitante', () => {
    window.localStorage.setItem(STORAGE_KEY, 'en')
    expect(detectLang()).toBe('en')
    window.localStorage.setItem(STORAGE_KEY, 'es')
    expect(detectLang()).toBe('es')
  })

  it('el botón ES/EN cambia los textos, el idioma del documento y lo recuerda', () => {
    render(
      <MemoryRouter>
        <LanguageProvider initial="es">
          <Header />
        </LanguageProvider>
      </MemoryRouter>,
    )
    expect(screen.getAllByText('Proyectos').length).toBeGreaterThan(0)
    expect(document.documentElement.lang).toBe('es')

    fireEvent.click(screen.getAllByRole('button', { name: UI.switchLanguage.es })[0])

    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0)
    expect(screen.queryByText('Proyectos')).toBeNull()
    expect(document.documentElement.lang).toBe('en')
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('en')
  })
})
