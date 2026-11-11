export type Lang = 'es' | 'en'

/** Un texto en los dos idiomas del sitio. */
export type Localized = Record<Lang, string>

export const LANGS: readonly Lang[] = ['es', 'en']
