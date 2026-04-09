import { useCallback, useEffect, useState } from 'react'

const KEY = 'portfolio-theme'

export type ThemeMode = 'dark' | 'light'

function getStored(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  const v = localStorage.getItem(KEY) as ThemeMode | null
  if (v === 'light' || v === 'dark') return v
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  return 'dark'
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => getStored())

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next)
    localStorage.setItem(KEY, next)
    document.documentElement.setAttribute('data-theme', next)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', next === 'light' ? '#fafafa' : '#0a0a0a')
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return { theme, setTheme, toggleTheme }
}
