import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'

// Must match the inline boot script in index.html, which applies the theme before first paint.
const STORAGE_KEY = 'pip-theme'
const THEME_COLORS: Record<Theme, string> = { light: '#f4f1e8', dark: '#000000' }

const listeners = new Set<() => void>()

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const query = window.matchMedia?.('(prefers-color-scheme: dark)')
  // Follow the OS until the visitor picks a theme themselves.
  const handleSystemChange = () => {
    if (!readStored()) applyTheme(systemTheme())
  }
  query?.addEventListener?.('change', handleSystemChange)
  return () => {
    listeners.delete(listener)
    query?.removeEventListener?.('change', handleSystemChange)
  }
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function setTheme(next: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Private mode or blocked storage: the switch still applies for this visit.
  }

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const doc = document as Document & { startViewTransition?: (update: () => void) => unknown }

  // Cross-fade the whole page instead of snapping between a light and a dark frame.
  if (!reducedMotion && doc.startViewTransition) {
    doc.startViewTransition(() => flushSync(() => applyTheme(next)))
  } else {
    applyTheme(next)
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'light' as Theme)
  return { theme, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}
