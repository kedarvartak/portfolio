'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/** Splits the title into characters and staggers them up on load. */
export function AnimatedTitle({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const chars = el.querySelectorAll('.title-char')
    gsap.fromTo(
      chars,
      { yPercent: 110, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.7, delay, ease: 'power4.out', stagger: 0.028 }
    )
  }, [delay])

  return (
    <h1 ref={ref} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} className="title-char-mask" aria-hidden="true">
          <span className="title-char">{char === ' ' ? ' ' : char}</span>
        </span>
      ))}
    </h1>
  )
}
