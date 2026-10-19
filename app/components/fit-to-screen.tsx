'use client'

import { useEffect } from 'react'

const MIN_SCALE = 0.72
const STEP = 0.02

// Pages that use this must never scroll vertically. If the content is still
// taller than the screen at an unusual window size, step the root font size
// down until both columns fit. Text never shrinks below MIN_SCALE.
export function FitToScreen() {
  useEffect(() => {
    const root = document.documentElement
    let frame = 0

    const overflows = () => {
      const panels = document.querySelectorAll<HTMLElement>('.split-container, .split-sidebar, .split-main')
      return Array.from(panels).some((el) => el.scrollHeight > el.clientHeight + 1)
    }

    const fit = () => {
      root.style.fontSize = ''
      // Small screens stack the columns and scroll normally.
      if (window.innerWidth <= 1024) return
      let scale = 1
      while (overflows() && scale > MIN_SCALE) {
        scale = Math.max(MIN_SCALE, scale - STEP)
        root.style.fontSize = `${scale * 100}%`
      }
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fit)
    }

    fit()
    document.fonts?.ready.then(schedule)
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', schedule)
      root.style.fontSize = ''
    }
  }, [])

  return null
}
