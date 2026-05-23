'use client'

import { useState, useEffect, ReactNode, useRef } from 'react'

interface HoverChipProps {
  text: string
  children: ReactNode
}

export function HoverChip({ text, children }: HoverChipProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const chipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let x = e.clientX
      let y = e.clientY

      // Simple edge detection to keep chip in viewport
      if (chipRef.current) {
        const rect = chipRef.current.getBoundingClientRect()
        if (x + rect.width + 20 > window.innerWidth) {
          x = x - rect.width - 20
        }
        if (y + rect.height + 20 > window.innerHeight) {
          y = y - rect.height - 20
        }
      }

      setMousePos({ x, y })
    }

    if (isVisible) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isVisible])

  return (
    <span
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className="inline-block"
    >
      {children}
      <div
        ref={chipRef}
        className={`cursor-chip ${isVisible ? 'cursor-chip-active' : ''}`}
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      >
        {text}
      </div>
    </span>
  )
}
