'use client'

import { useEffect, useRef } from 'react'
import CiteLogo from '../logo_design/CiteLogo'

export default function MainVisualCard() {
  const cardRef = useRef(null)
  const labelTopRef = useRef(null)
  const labelBottomRef = useRef(null)

  useEffect(() => {
    const cardEl = cardRef.current
    const topEl = labelTopRef.current
    const bottomEl = labelBottomRef.current

    if (!cardEl || !bottomEl) return

    let lastScrollY = window.scrollY

    const CARD_BASE_SCALE = 1
    const CARD_MAX_ZOOM = 0.45 / 7.4
    let cardTargetScale = CARD_BASE_SCALE
    let cardCurrentScale = CARD_BASE_SCALE
    const EASE = 0.045

    const TOP_BASE_SCALE = 1
    const TOP_MAX_ZOOM = 0.32
    const TOP_EASE = 0.005

    const BOTTOM_BASE_SCALE = 1
    const BOTTOM_MAX_ZOOM = 0.18
    const BOTTOM_EASE = 0.03

    let topTargetScale = TOP_BASE_SCALE
    let topCurrentScale = TOP_BASE_SCALE
    let bottomTargetScale = BOTTOM_BASE_SCALE
    let bottomCurrentScale = BOTTOM_BASE_SCALE

    const TOP_WIGGLE_SPEED = 0.00028
    const TOP_WIGGLE_AMP = 1.1
    const TOP_WIGGLE_Y_AMP = 3
    let topWigglePhase = 0

    const BOTTOM_WIGGLE_SPEED = 0.00019
    const BOTTOM_WIGGLE_AMP = 0.7
    const BOTTOM_WIGGLE_Y_AMP = 2
    let bottomWigglePhase = Math.PI / 2

    const onScroll = () => {
      const y = window.scrollY
      lastScrollY = y
      const zoomFactor = Math.min(1, Math.max(0, y / 800))

      cardTargetScale = CARD_BASE_SCALE + zoomFactor * CARD_MAX_ZOOM
      topTargetScale = TOP_BASE_SCALE + zoomFactor * TOP_MAX_ZOOM
      bottomTargetScale = BOTTOM_BASE_SCALE + zoomFactor * BOTTOM_MAX_ZOOM
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    let rafId
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = now - lastTime
      lastTime = now

      cardCurrentScale += (cardTargetScale - cardCurrentScale) * EASE
      cardEl.style.transform = `scale(${cardCurrentScale.toFixed(4)})`

      if (topEl) {
        topCurrentScale += (topTargetScale - topCurrentScale) * TOP_EASE
        topWigglePhase += dt * TOP_WIGGLE_SPEED
        const topRot = Math.sin(topWigglePhase) * TOP_WIGGLE_AMP
        const topY = Math.cos(topWigglePhase * 1.3) * TOP_WIGGLE_Y_AMP
        topEl.style.transform =
          `translateY(${topY.toFixed(2)}px) scale(${topCurrentScale.toFixed(4)}) ` +
          `rotate(${topRot.toFixed(3)}deg)`
      }

      bottomCurrentScale += (bottomTargetScale - bottomCurrentScale) * BOTTOM_EASE
      bottomWigglePhase += dt * BOTTOM_WIGGLE_SPEED
      const bottomRot = Math.sin(bottomWigglePhase) * BOTTOM_WIGGLE_AMP
      const bottomY = Math.cos(bottomWigglePhase * 1.3) * BOTTOM_WIGGLE_Y_AMP
      bottomEl.style.transform =
        `translateY(${bottomY.toFixed(2)}px) scale(${bottomCurrentScale.toFixed(4)}) ` +
        `rotate(${bottomRot.toFixed(3)}deg)`

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
      ref={cardRef}
      className="relative flex h-72 w-72 items-center justify-center rounded-[2.5rem] border border-border bg-surface shadow-2xl sm:h-96 sm:w-96"
      style={{
        transform: 'scale(1)',
        transformOrigin: 'center',
        willChange: 'transform',
      }}
    >
      <div className="absolute inset-5 rounded-[2rem] border border-dashed border-border-hover" />

      <div
        className="absolute inset-0 rounded-[2.5rem]"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(var(--secondary-glow), 0.12), transparent 65%)',
        }}
      />

      <div className="relative text-center">
        <CiteLogo size="md" />
        <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-muted">
          BUSINESS SOLUTIONS
        </p>
        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
      </div>

      <div
        ref={labelBottomRef}
        className="absolute -bottom-4 -right-4 rounded-xl border border-border bg-surface-elevated px-5 py-3 shadow-xl glow-primary"
        style={{ transformOrigin: 'center', willChange: 'transform' }}
      >
        <span className="text-sm font-semibold text-primary">
          Technology Support
        </span>
      </div>
    </div>
  )
}