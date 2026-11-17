'use client'

import Link from 'next/link'
import MainVisualCard from '../designs/hero_design/MainVisualCard'
import ArtDesign from '../designs/hero_design/ArtDesign'
import SimpleCard from '../designs/hero_design/SimpleCard'
import { hero_cards } from '@/constants/TechnologiesList'



export default function Hero() {
  
  return (
    <section
      id="home"
      className="relative flex min-h-[680px] items-center px-6 py-24 overflow-hidden isolate"
    >
      {/* Background effects */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 80% 35%, rgba(var(--secondary-glow), 0.15), transparent 45%),
            radial-gradient(ellipse at 15% 85%, rgba(var(--primary-glow), 0.09), transparent 40%)
          `,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/back-support.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right bottom',
            backgroundSize: 'auto',
            transform: 'scaleX(-1)',
          }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Hero content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-primary">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            Web &amp; 3D Solutions
          </div>

          <h1 className="max-w-2xl text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Smart technology.
            <span className="mt-2 block text-gradient">Better business.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
            We build websites, custom software and intelligent digital solutions
            designed around your business. Transform your ideas into practical
            technology and better experiences.
          </p>

          {/* Hero buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="#contact" className="btn btn-primary">
              Start a Project →
            </Link>
            <Link href="#services" className="btn btn-outline">
              Explore Services
            </Link>
          </div>

          <p className="mt-8 text-sm text-muted-strong">
            Creative solutions. Practical technology. Business-focused results.
          </p>
        </div>

        {/* Hero visual */}
        <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
          {/* Glow effects */}
          <div
            className="absolute inset-8 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(var(--secondary-glow), 0.28), rgba(var(--primary-glow), 0.10), transparent 70%)',
            }}
          />

          {/* Main visual card */}
          <MainVisualCard />

          {/* Art layer */}
          <ArtDesign />

          {hero_cards.map((card, i) => (
            <SimpleCard key={i} {...card} index={i} staggerDelay={180} />
          ))}
        </div>
      </div>
    </section>
  )
}