'use client'

import { useEffect, useRef } from 'react'

export default function ArtDesign() {
  const artRef = useRef(null)

  useEffect(() => {
    const artEl = artRef.current
    if (!artEl) return

    let lastScrollY = window.scrollY
    let scrollBoost = 0

    const ART_BASE_SCALE = 3.4
    const ART_MAX_ZOOM = 0.45
    let artTargetScale = ART_BASE_SCALE
    let artCurrentScale = ART_BASE_SCALE
    let swingPhase = 0

    const EASE = 0.045
    const SWING_SPEED = 0.0003
    const SWING_AMP = 1.5
    const SWING_OFFSET = -0.3
    const BOOST_DECAY = 0.96

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY
      lastScrollY = y

      scrollBoost += delta * 0.002
      scrollBoost = Math.max(-1, Math.min(1, scrollBoost))

      const zoomFactor = Math.min(1, Math.max(0, y / 800))
      artTargetScale = ART_BASE_SCALE + zoomFactor * ART_MAX_ZOOM
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    let rafId
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = now - lastTime
      lastTime = now

      scrollBoost *= BOOST_DECAY

      artCurrentScale += (artTargetScale - artCurrentScale) * EASE
      swingPhase += dt * SWING_SPEED
      const swing =
        SWING_OFFSET +
        Math.sin(swingPhase) * SWING_AMP +
        scrollBoost * SWING_AMP * 0.6

      artEl.style.transform = `scale(${artCurrentScale.toFixed(4)}) rotate(${(swing - 5).toFixed(3)}deg)`

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={artRef}
      style={{
        height: '100%',
        width: '70%',
        position: 'absolute',
        backgroundImage: "url('/images/Glossy Blue Vein Branch Silhouette-1.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        transform: 'scale(3.4) rotate(-5.3deg)',
        transformOrigin: 'center',
        top: '-20%',
        willChange: 'transform',
        overflow: 'hidden',
        zIndex: 8
      }}
    />
  )
}