'use client'

import { useEffect, useState } from 'react'
import { styles } from '../styles'

type ThemeKey = 'default' | 'midnight' | 'amber'

const themeOptions: Array<{ key: ThemeKey; label: string }> = [
  { key: 'default', label: 'Default' },
  { key: 'midnight', label: 'Midnight' },
  { key: 'amber', label: 'Amber' },
]

const storageKey = 'portfolio-theme'

function isThemeKey(value: string | null): value is ThemeKey {
  return value === 'default' || value === 'midnight' || value === 'amber'
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeKey>('default')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey)

    if (isThemeKey(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.dataset.theme = theme
    }
    window.localStorage.setItem(storageKey, theme)
  }, [theme])

  const activeTheme = themeOptions.find((option) => option.key === theme) ?? themeOptions[0]

  return (
    <div style={styles.themeDock} aria-label="Theme selector">
      <button
        type="button"
        className="footer-theme-button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls="theme-palette-panel"
        aria-label={isOpen ? 'Collapse theme palette' : 'Expand theme palette'}
        title={activeTheme.label}
        style={isOpen ? { ...styles.themeTrigger, ...styles.themeTriggerOpen } : styles.themeTrigger}
      >
        <span style={styles.themeTriggerIconWrap}>
          <PaletteIcon />
        </span>
      </button>

      <div
        id="theme-palette-panel"
        style={isOpen ? { ...styles.themePalette, ...styles.themePaletteOpen } : styles.themePalette}
        aria-hidden={!isOpen}
      >
        <div style={styles.themePaletteHeader}>
          <span style={styles.themePaletteTitle}>Palette</span>
          <span style={styles.themePaletteHint}>{activeTheme.label}</span>
        </div>
        <div style={styles.themeSwatchGrid}>
          {themeOptions.map((option) => {
            const isActive = option.key === theme
            const swatchStyle =
              option.key === 'default'
                ? styles.themeSwatchDefault
                : option.key === 'midnight'
                  ? styles.themeSwatchMidnight
                  : styles.themeSwatchAmber

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setTheme(option.key)}
                aria-pressed={isActive}
                aria-label={`Switch to ${option.label} theme`}
                title={option.label}
                style={isActive ? { ...styles.themeSwatchButton, ...styles.themeSwatchButtonActive } : styles.themeSwatchButton}
              >
                <span style={{ ...styles.themeSwatchPreview, ...swatchStyle }} />
                <span style={styles.themeSwatchLabel}>{option.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function PaletteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={styles.themeTriggerSvg}>
      <path
        d="M12 3C6.48 3 2 7.03 2 12c0 4.42 3.58 8 8 8h2.25c.69 0 1.25-.56 1.25-1.25 0-.38-.16-.74-.44-.99l-1.14-1.04a1.25 1.25 0 0 1-.42-.94v-.5A1.25 1.25 0 0 1 12.72 14h2.03c.69 0 1.25-.56 1.25-1.25 0-.38.31-.69.69-.69h1.46C19.81 12.06 21 10.62 21 9c0-3.31-4.03-6-9-6Zm-4 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm2.5-3.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm4 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm2.5 3.75a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
        fill="currentColor"
      />
    </svg>
  )
}