'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'

/**
 * Shapes the motion personality of the ASCII signature.
 * `cursor` is the pointer position normalized to [-1, 1] relative to
 * the viewport center; `elapsed` is seconds since mount.
 */
function animateFrame(mesh: THREE.Mesh, cursor: { x: number; y: number }, elapsed: number) {
  // TODO(kedar): this is yours to shape — see the note in the chat.
  // Default: slow drift, with the cursor gently steering the tilt.
  mesh.rotation.x += 0.003 + cursor.y * 0.004
  mesh.rotation.y += 0.005 + cursor.x * 0.006
  mesh.position.y = Math.sin(elapsed * 0.8) * 0.15
}

export function AsciiScene({ size = 180 }: { size?: number }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 4.6

    const light = new THREE.PointLight(0xffffff, 400)
    light.position.set(4, 4, 6)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, 0.1))

    const mesh = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.15, 0.38, 120, 18),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
    )
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: false })
    renderer.setSize(size, size)

    const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true, resolution: 0.14 })
    effect.setSize(size, size)
    effect.domElement.className = 'ascii-scene-surface'
    host.appendChild(effect.domElement)

    const cursor = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointerMove)

    let frame = 0
    let running = true
    const start = performance.now()

    const tick = () => {
      if (!running) return
      cursor.x += (target.x - cursor.x) * 0.05
      cursor.y += (target.y - cursor.y) * 0.05
      animateFrame(mesh, cursor, (performance.now() - start) / 1000)
      effect.render(scene, camera)
      if (!reducedMotion) frame = requestAnimationFrame(tick)
    }
    tick()

    // Don't burn GPU while the tab or section is offscreen.
    const observer = new IntersectionObserver(([entry]) => {
      if (reducedMotion) return
      running = entry.isIntersecting
      if (running) {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(tick)
      }
    })
    observer.observe(host)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      host.removeChild(effect.domElement)
      mesh.geometry.dispose()
      ;(mesh.material as THREE.Material).dispose()
      renderer.dispose()
    }
  }, [size])

  return <div ref={hostRef} className="ascii-scene" style={{ width: size, height: size }} aria-hidden="true" />
}
