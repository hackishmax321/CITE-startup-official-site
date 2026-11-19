'use client'

import { useEffect, useRef } from 'react'

// Size map: base (mobile) + sm (≥640px) + optional lg (≥1024px)
const SIZE_MAP = {
    ts:  { base: 'text-xl',  sm: 'sm:text-2xl'  },
  xs:  { base: 'text-4xl',  sm: 'sm:text-5xl'  },
  sm:  { base: 'text-5xl',  sm: 'sm:text-6xl'  },
  md:  { base: 'text-6xl',  sm: 'sm:text-7xl'  },
  lg:  { base: 'text-7xl',  sm: 'sm:text-8xl'  },
  xl:  { base: 'text-8xl',  sm: 'sm:text-9xl'  },
}

export default function CiteLogo({ size = 'lg', className = '' }) {
  const dotRef = useRef(null)

  useEffect(() => {
    const dotEl = dotRef.current
    if (!dotEl) return

    let dotBlinkPhase = 0
    const DOT_BLINK_SPEED = 0.005
    dotEl.style.opacity = '1'

    let rafId
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = now - lastTime
      lastTime = now

      dotBlinkPhase += dt * DOT_BLINK_SPEED
      const dotOn = Math.sin(dotBlinkPhase) > 0 ? 1 : 0
      dotEl.style.opacity = dotOn ? '1' : '0'

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const { base, sm } = SIZE_MAP[size] ?? SIZE_MAP.lg

  return (
    <div
      className={`font-black tracking-tighter text-foreground ${base} ${sm} ${className}`}
    >
      CITE
      <span
        ref={dotRef}
        className="text-primary"
        style={{ willChange: 'opacity', display: 'inline-block' }}
      >
        .
      </span>
    </div>
  )
}