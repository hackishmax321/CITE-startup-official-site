"use client"

import { useEffect, useRef } from "react"
import createGlobe from "cobe"
import { useMotionValue, useSpring } from "framer-motion"
import { twMerge } from "tailwind-merge"

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,                      // 🌑 dark globe
  diffuse: 1.2,
  mapSamples: 16000,            // ← bump to 20000+ for finer continents
  mapBrightness: 6,             // ← controls continent visibility
  baseColor: [1, 1, 1],         // ← continents = WHITE on dark globe
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [0.4, 0.4, 0.4],   // ← subtle ocean glow (not pure white)
  markers: [
    // 🇱🇰 Sri Lanka
    { location: [6.9271, 79.8612], size: 0.09 }, // Colombo
    { location: [6.0535, 80.221], size: 0.05 },  // Galle
    // 🇦🇺 Australia
    { location: [-37.8136, 144.9631], size: 0.09 }, // Melbourne
    // 🇮🇳 India
    { location: [13.0827, 80.2707], size: 0.05 }, // Chennai
    // 🇬🇧 UK
    { location: [51.5074, -0.1278], size: 0.05 }, // London
    // 🇺🇸 USA
    { location: [40.7128, -74.006], size: 0.05 }, // New York
  ],
}

export function Globe({ className, config = GLOBE_CONFIG }) {
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)
  const globeRef = useRef(null)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    let width = 0
    let destroyed = false

    // Init globe only when we have a real width
    const initGlobe = () => {
      if (destroyed) return
      const measured = wrapper.offsetWidth
      if (measured <= 0) return
      width = measured

      if (globeRef.current) {
        globeRef.current.destroy()
        globeRef.current = null
      }

      globeRef.current = createGlobe(canvas, {
        ...config,
        width: width * 2,
        height: width * 2,
        onRender: (state) => {
          if (!pointerInteracting.current) phiRef.current += 0.004
          state.phi = phiRef.current + rs.get()
          state.width = width * 2
          state.height = width * 2
        },
      })

      // Reveal canvas
      requestAnimationFrame(() => {
        if (canvas) canvas.style.opacity = "1"
      })
    }

    // First attempt (microtask so layout is ready)
    const raf = requestAnimationFrame(initGlobe)

    // Rebuild on resize for crisp rendering
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0
      if (w > 0 && Math.abs(w - width) > 1) {
        initGlobe()
      }
    })
    ro.observe(wrapper)

    return () => {
      destroyed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      if (globeRef.current) {
        globeRef.current.destroy()
        globeRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rs, config])

  return (
    <div
      ref={wrapperRef}
      className={twMerge(
        "relative mx-auto aspect-square w-full max-w-[340px]",
        className
      )}
    >
      {/* Soft glow so the globe pops even on light cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 m-auto h-3/4 w-3/4 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 [contain:layout_paint]"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}