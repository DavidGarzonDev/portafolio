import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '@/constants'
import { cn } from '@/utils/helpers'
import useLanguage from '@/i18n/useLanguage'
import { LANGS } from '@/i18n/types'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { lang, toggleLang, t, tr } = useLanguage()

  const langSwitch = (
    <button
      type="button"
      onClick={toggleLang}
      className="flex items-center rounded-full border border-zinc-800 p-0.5 text-xs font-medium hover:border-zinc-600 transition-colors"
      aria-label={t('switchLanguage')}
    >
      {LANGS.map((l) => (
        <span
          key={l}
          className={cn(
            'px-2 py-0.5 rounded-full uppercase transition-colors',
            l === lang ? 'bg-white text-black' : 'text-zinc-500'
          )}
        >
          {l}
        </span>
      ))}
    </button>
  )

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-zinc-900">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" aria-label={t('navLabel')}>
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-white hover:text-zinc-300 transition-colors tracking-tight"
            aria-label={t('homeLabel')}
          >
            DG.
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'text-sm transition-colors',
                  isActive(item.href)
                    ? 'text-white font-medium'
                    : 'text-zinc-500 hover:text-white'
                )}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {tr(item.label)}
              </Link>
            ))}
            {langSwitch}
          </div>

          <div className="md:hidden flex items-center gap-2">
          {langSwitch}
          <button
            className="p-2 text-zinc-500 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-zinc-900 py-3"
            role="menu"
            aria-label={t('mobileNavLabel')}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'block px-2 py-3 text-sm transition-colors',
                  isActive(item.href)
                    ? 'text-white font-medium'
                    : 'text-zinc-500 hover:text-white'
                )}
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
              >
                {tr(item.label)}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
