'use client'

import { useEffect, useRef } from 'react'

const SPARK_COLORS = [
  'rgba(80, 150, 255, 1)',   // blueish
  'rgba(40, 200, 220, 1)',   // sea blue
  'rgba(150, 90, 255, 1)',   // purple
  'rgba(110, 180, 255, 1)',  // light blue
  'rgba(60, 220, 210, 1)',   // aqua sea
]

const SPARK_COUNT = 24

// Gaussian-ish distribution centered on 50% with adjustable spread.
// Returns a value in [0, 1], clamped to [margin, 1 - margin].
const centerBiased = (margin = 0.15, spread = 0.18) => {
  // Sum of two uniforms ≈ triangular distribution around 0.5
  const raw = (Math.random() + Math.random()) / 2 // peaks at 0.5
  // Apply spread: pull toward center with `spread` weight
  const biased = 0.5 + (raw - 0.5) * (spread / 0.5) * 2
  return Math.min(1 - margin, Math.max(margin, biased))
}

export default function CenteredGlowSparks({ style = {} }) {
  const layerRef = useRef(null)

  useEffect(() => {
    const layerEl = layerRef.current
    if (!layerEl) return

    const sparks = []

    // Position helpers -- each spark picks a "ring" bias:
    //   - inner core (~60%): very close to center
    //   - mid ring (~30%): moderate distance
    //   - outer halo (~10%): further out but still inside safe margin
    const pickPosition = () => {
      const r = Math.random()
      let margin, spread
      if (r < 0.6) {
        margin = 0.30   // keep 30% from each edge -> tight center cluster
        spread = 0.12
      } else if (r < 0.9) {
        margin = 0.22
        spread = 0.18
      } else {
        margin = 0.15
        spread = 0.22
      }
      return {
        x: centerBiased(margin, spread) * 100,
        y: centerBiased(margin, spread) * 100,
      }
    }

    const createSpark = () => {
      const color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)]

      // Large sparks rare
      const roll = Math.random()
      let size
      if (roll > 0.85) size = 6 + Math.random() * 4
      else if (roll > 0.5) size = 3 + Math.random() * 2.5
      else size = 1.5 + Math.random() * 1.5

      const { x, y } = pickPosition()

      const el = document.createElement('div')
      el.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: ${color};
        box-shadow: 0 0 ${size * 2.5}px ${size * 0.8}px ${color},
                    0 0 ${size * 6}px ${size * 1.5}px ${color.replace('1)', '0.35)')};
        pointer-events: none;
        opacity: 0;
        will-change: opacity, transform;
        transform: translate(-50%, -50%);
      `
      el.style.left = `${x}%`
      el.style.top = `${y}%`
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      layerEl.appendChild(el)

      return {
        el,
        size,
        opacity: 0,
        fadeInSpeed: 0.006 + Math.random() * 0.01,
        fadeOutSpeed: 0.004 + Math.random() * 0.008, // ease-out speed
        delay: 300 + Math.random() * 2500,
        holdTime: 400 + Math.random() * 1400,
        state: 'waiting', // waiting | fading-in | holding | fading-out | done
        age: 0,
        maxOpacity: 0.7 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
      }
    }

    for (let i = 0; i < SPARK_COUNT; i++) sparks.push(createSpark())

    let rafId
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = now - lastTime
      lastTime = now

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i]

        if (s.state === 'waiting') {
          s.age += dt
          if (s.age >= s.delay) {
            s.state = 'fading-in'
            s.age = 0
          }
          continue
        }

        if (s.state === 'fading-in') {
          // Ease in (exponential approach)
          s.opacity += s.fadeInSpeed * (1 - s.opacity)
          if (s.opacity >= s.maxOpacity * 0.98) {
            s.opacity = s.maxOpacity
            s.state = 'holding'
            s.age = 0
          }
          s.el.style.opacity = s.opacity.toFixed(3)
          s.pulsePhase += dt * 0.004
          const pulse = 1 + Math.sin(s.pulsePhase) * 0.15
          s.el.style.transform = `translate(-50%, -50%) scale(${pulse.toFixed(3)})`
          continue
        }

        if (s.state === 'holding') {
          s.age += dt
          s.pulsePhase += dt * 0.004
          const pulse = 1 + Math.sin(s.pulsePhase) * 0.15
          s.el.style.transform = `translate(-50%, -50%) scale(${pulse.toFixed(3)})`
          if (s.age >= s.holdTime) {
            s.state = 'fading-out'
            s.age = 0
          }
          continue
        }

        if (s.state === 'fading-out') {
          // Natural ease-out (exponential decay toward 0)
          s.opacity += (0 - s.opacity) * s.fadeOutSpeed * (dt / 16)
          // Shrink slightly as it fades for a soft dissolve
          const lifeRatio = Math.max(0, s.opacity / s.maxOpacity)
          s.pulsePhase += dt * 0.004
          const pulse = 1 + Math.sin(s.pulsePhase) * 0.15
          const scale = pulse * (0.6 + 0.4 * lifeRatio)
          s.el.style.opacity = s.opacity.toFixed(3)
          s.el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`

          if (s.opacity <= 0.01) {
            s.opacity = 0
            s.el.style.opacity = '0'
            s.state = 'done'
            s.age = 0
          }
          continue
        }

        if (s.state === 'done') {
          s.age += dt
          if (s.age >= 600 + Math.random() * 1800) {
            const fresh = createSpark()
            // Take over the freshly-positioned element's styles, then remove it
            s.el.style.left = fresh.el.style.left
            s.el.style.top = fresh.el.style.top
            s.el.style.width = fresh.el.style.width
            s.el.style.height = fresh.el.style.height
            s.el.style.background = fresh.el.style.background
            s.el.style.boxShadow = fresh.el.style.boxShadow
            fresh.el.remove()

            s.size = fresh.size
            s.opacity = 0
            s.el.style.opacity = '0'
            s.fadeInSpeed = fresh.fadeInSpeed
            s.fadeOutSpeed = fresh.fadeOutSpeed
            s.delay = fresh.delay
            s.holdTime = fresh.holdTime
            s.maxOpacity = fresh.maxOpacity
            s.pulsePhase = fresh.pulsePhase
            s.age = 0
            s.state = 'waiting'
          }
          continue
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      sparks.forEach((s) => s.el.remove())
    }
  }, [])

  return (
    <div
      ref={layerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 9,
        ...style,
      }}
    />
  )
}