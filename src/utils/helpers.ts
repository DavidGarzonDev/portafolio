// Utilidades generales

export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ')
}

export const openInNewTab = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
