'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'

/**
 * Fades content up when it enters the viewport (or immediately on mount
 * for above-the-fold content). `delay` sequences the page-load timeline.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: {
  children: ReactNode
  delay?: number
  as?: 'div' | 'section' | 'article' | 'footer' | 'aside' | 'li' | 'span'
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.visibility = 'visible'
      return
    }

    gsap.set(el, { autoAlpha: 0, y: 18 })

    const show = () => {
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [delay])

  return (
    // @ts-expect-error — polymorphic ref across the allowed tags
    <Tag ref={ref} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </Tag>
  )
}
