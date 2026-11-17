'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// ---------- Shared collision registry ----------
// Each entry: { id, x, y, w, h }  (x/y = center %, w/h = approx size %)
const activeCards = new Set()
let nextId = 1

function rectsOverlap(a, b, padding = 4) {
  // Approximate card as % box; padding adds breathing room
  return !(
    a.x + a.w / 2 + padding < b.x - b.w / 2 ||
    a.x - a.w / 2 - padding > b.x + b.w / 2 ||
    a.y + a.h / 2 + padding < b.y - b.h / 2 ||
    a.y - a.h / 2 - padding > b.y + b.h / 2
  )
}

function pickPosition({ minX, maxX, minY, maxY, wPct, hPct, selfId, tries = 14 }) {
  for (let i = 0; i < tries; i++) {
    const x = minX + Math.random() * (maxX - minX)
    const y = minY + Math.random() * (maxY - minY)
    const candidate = { x, y, w: wPct, h: hPct }

    let collides = false
    for (const other of activeCards) {
      if (other.id === selfId) continue
      if (rectsOverlap(candidate, other, 3)) {
        collides = true
        break
      }
    }
    if (!collides) return { x, y }
  }
  // Fallback: any random spot (better than freezing)
  return {
    x: minX + Math.random() * (maxX - minX),
    y: minY + Math.random() * (maxY - minY),
  }
}

export default function SimpleCard({
  title,
  subtext,
  href,
  minX = 0,
  maxX = 100,
  minY = 0,
  maxY = 100,
  wiggleSpeed = 0.00025,
  wiggleAmp = 0.8,
  wiggleYAmp = 2,
  wigglePhase = 0,
  glowVar = '--primary-glow',
  width = 150,
  index = 0,
  staggerDelay = 180,
}) {
  const cardElRef = useRef(null)
  const idRef = useRef(null)
  if (idRef.current === null) idRef.current = nextId++

  const [pos, setPos] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [glitching, setGlitching] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Approx card size in % of the square hero container.
  // width=150px on a ~450px hero ≈ 33% wide; height ≈ 14%.
  const wPct = (width / 450) * 100
  const hPct = 14

  // 1) First position on mount (client-only)
  useEffect(() => {
    const p = pickPosition({
      minX, maxX, minY, maxY,
      wPct, hPct,
      selfId: idRef.current,
    })
    setPos(p)
    activeCards.add({ id: idRef.current, x: p.x, y: p.y, w: wPct, h: hPct })

    return () => {
      activeCards.delete(
        [...activeCards].find((c) => c.id === idRef.current)
      )
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 2) Staggered load-in
  useEffect(() => {
    if (!pos) return
    const t = setTimeout(() => setLoaded(true), index * staggerDelay)
    return () => clearTimeout(t)
  }, [pos, index, staggerDelay])

  // 3) Random glitch
  useEffect(() => {
    if (!loaded) return
    let timer
    const schedule = () => {
      timer = setTimeout(() => {
        setGlitching(true)
        const dur = 250 + Math.random() * 250
        setTimeout(() => setGlitching(false), dur)
        schedule()
      }, 3000 + Math.random() * 6000)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [loaded])

  // 4) Random hide → on unhide, RE-SUMMON at a new collision-free position
  useEffect(() => {
    if (!loaded) return
    let timer
    const schedule = () => {
      timer = setTimeout(() => {
        setHidden(true)
        const dur = 500 + Math.random() * 900
        setTimeout(() => {
          // Pick a NEW spot before revealing (avoid overlap with siblings)
          setPos((prev) => {
            const next = pickPosition({
              minX, maxX, minY, maxY,
              wPct, hPct,
              selfId: idRef.current,
            })
            // Update registry entry
            const entry = [...activeCards].find((c) => c.id === idRef.current)
            if (entry) {
              entry.x = next.x
              entry.y = next.y
            } else {
              activeCards.add({
                id: idRef.current, x: next.x, y: next.y, w: wPct, h: hPct,
              })
            }
            return next
          })
          setHidden(false)
          schedule()
        }, dur)
      }, 5000 + Math.random() * 7000)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [loaded]) // eslint-disable-line react-hooks/exhaustive-deps

  // 5) Wiggle + glitch jitter
  useEffect(() => {
    const el = cardElRef.current
    if (!el || !loaded) return

    let phase = wigglePhase
    let rafId
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = now - lastTime
      lastTime = now
      phase += dt * wiggleSpeed

      const rot = Math.sin(phase) * wiggleAmp
      const y = Math.cos(phase * 1.3) * wiggleYAmp

      const gx = glitching ? (Math.random() - 0.5) * 10 : 0
      const gy = glitching ? (Math.random() - 0.5) * 6 : 0
      const grot = glitching ? (Math.random() - 0.5) * 3 : 0

      el.style.transform =
        `translate(-50%, -50%) translate(${gx.toFixed(2)}px, ${(y + gy).toFixed(2)}px) ` +
        `rotate(${(rot + grot).toFixed(3)}deg)`

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [loaded, wiggleSpeed, wiggleAmp, wiggleYAmp, wigglePhase, glitching])

  // Placeholder until first position known
  if (!pos) {
    return (
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          zIndex: 25,
          pointerEvents: 'none',
          visibility: 'hidden',
        }}
        aria-hidden
      />
    )
  }

  return (
    <div
      className="absolute"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        zIndex: 25,
        pointerEvents: 'none',
        // smooth relocate when re-summoned
        transition: 'left 480ms cubic-bezier(0.22, 1, 0.36, 1), top 480ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <Link
        href={href || '#'}
        ref={cardElRef}
        className="simple-card group pointer-events-auto block rounded-2xl border border-border bg-surface-elevated px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        style={{
          width: `${width}px`,
          transform: 'translate(-50%, -50%)',
          transformOrigin: 'center',
          willChange: 'transform, opacity, filter',
          ['--card-glow']: `rgba(var(${glowVar}), 0.55)`,
          opacity: !loaded || hidden ? 0 : 1,
          filter: glitching ? 'hue-rotate(90deg) saturate(1.8)' : 'none',
          transition: loaded
            ? 'opacity 420ms ease, transform 320ms ease, filter 90ms linear'
            : 'opacity 520ms ease, transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
          scale: loaded ? 1 : 0.85,
        }}
      >
        <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </div>
        {subtext && (
          <p className="mt-1 text-[11px] leading-snug text-muted line-clamp-2">
            {subtext}
          </p>
        )}

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
          style={{
            boxShadow: `0 0 22px 4px var(--card-glow), 0 0 2px 0 var(--card-glow) inset`,
          }}
        />

        {glitching && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background:
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)',
              mixBlendMode: 'overlay',
            }}
          />
        )}

        <style jsx>{`
          .simple-card:active {
            transform: translate(-50%, -50%) scale(0.97) !important;
          }
          .simple-card:active span[aria-hidden] {
            opacity: 1;
            box-shadow: 0 0 34px 8px var(--card-glow),
              0 0 3px 0 var(--card-glow) inset;
          }
        `}</style>
      </Link>
    </div>
  )
}