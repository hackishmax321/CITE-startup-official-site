'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import MainVisualCard from '../designs/hero_design/MainVisualCard'
import ArtDesign from '../designs/hero_design/ArtDesign'
import SimpleCard from '../designs/hero_design/SimpleCard'
import { hero_cards } from '@/constants/TechnologiesList'

const EASE = [0.22, 1, 0.36, 1]
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const badgeVariant = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
}

const buttonVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
}

const visualVariant = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[680px] items-center px-6 py-24 overflow-hidden isolate"
    >
      {/* Background effects (unchanged) */}
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
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={badgeVariant}>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-primary">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              Web &amp; 3D Solutions
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-2xl text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Smart technology.
            <span className="mt-2 block text-gradient">Better business.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-lg leading-8 text-muted"
          >
            We build websites, custom software and intelligent digital solutions
            designed around your business. Transform your ideas into practical
            technology and better experiences.
          </motion.p>

          {/* Hero buttons */}
          <motion.div
            className="mt-9 flex flex-wrap gap-4"
            variants={container}
          >
            <motion.div variants={buttonVariant}>
              <Link href="#contact" className="btn btn-primary">
                Start a Project →
              </Link>
            </motion.div>
            <motion.div variants={buttonVariant}>
              <Link href="#services" className="btn btn-outline">
                Explore Services
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-sm text-muted-strong"
          >
            Creative solutions. Practical technology. Business-focused results.
          </motion.p>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
          variants={visualVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
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
        </motion.div>
      </div>
    </section>
  )
}