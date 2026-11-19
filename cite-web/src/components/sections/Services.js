"use client"

import { useRef } from "react"
import { services } from "@/constants/ServicesList"
import { motion, useMotionValue, useMotionTemplate } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const EASE = [0.22, 1, 0.36, 1]

// Reusable stagger container
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE },
  },
}

// One card with mouse-tracked spotlight
function ServiceCard({ service, index }) {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, color-mix(in srgb, var(--primary) 18%, transparent), transparent 80%)`

  // Make first card span 2 columns on md+ for bento feel
  const isFeatured = index === 0

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariant}
      onMouseMove={handleMouseMove}
      className={`theme-card group relative overflow-hidden p-8 transition duration-300 hover:-translate-y-1 hover:border-border-hover ${
        isFeatured ? "md:col-span-2 md:row-span-1" : ""
      }`}
    >
      {/* Mouse spotlight overlay */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* Corner brackets — appear on hover */}
      <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
      <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />

      {/* Header row */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-sm font-bold text-primary">
            {service.number}
          </span>
          {isFeatured && (
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
              Featured
            </span>
          )}
        </div>

        {/* Big symbol with glow */}
        <div className="relative">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          />
          <span
            className={`relative text-3xl font-bold transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 ${service.color}`}
          >
            {service.symbol}
          </span>
        </div>
      </div>

      {/* Title + description */}
      <div className={`relative z-10 ${isFeatured ? "md:mt-10" : "mt-6"}`}>
        <h3
          className={`font-bold text-foreground transition-colors duration-300 group-hover:text-primary ${
            isFeatured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {service.title}
        </h3>
        <p
          className={`mt-4 leading-7 text-muted ${
            isFeatured ? "max-w-lg text-base" : ""
          }`}
        >
          {service.description}
        </p>
      </div>

      {/* Tags */}
      <div className="relative z-10 mt-7 flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-muted transition-colors duration-300 group-hover:border-primary/30 group-hover:text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom row: animated divider + arrow */}
      <div className="relative z-10 mt-8 flex items-center justify-between gap-4">
        <div className="relative h-px flex-1 overflow-hidden bg-border">
          <span className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated text-muted transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-background">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.article>
  )
}

function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-surface px-6 py-24"
    >
      {/* Ambient background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading — animates in on scroll */}
        <motion.div
          className="max-w-2xl"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase tracking-widest text-primary"
          >
            What We Do
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Digital Solutions for Every Idea.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-5 leading-7 text-muted">
            From establishing your online presence to developing custom business
            applications, we help turn your ideas into reality.
          </motion.p>
        </motion.div>

        {/* Bento grid — staggered one-by-one */}
        <motion.div
          className="mt-14 grid auto-rows-fr gap-6 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services