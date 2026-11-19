"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { technologies } from "@/constants/TechnologiesList"
import {
  Code2, Database, Cloud, Server, Smartphone, Palette, GitBranch,
  Layers, Cpu, Globe, Boxes, Terminal, Zap, Shield, Rocket,
  Binary, Braces, Workflow, MonitorSmartphone, Container,
} from "lucide-react"

const EASE = [0.22, 1, 0.36, 1]

// ---- Map tech names → Lucide icons. Extend to match your list.
const iconMap = {
  react: Code2,
  nextjs: Globe,
  typescript: Braces,
  javascript: Binary,
  node: Server,
  "node.js": Server,
  express: Terminal,
  mongodb: Database,
  postgresql: Database,
  mysql: Database,
  redis: Database,
  prisma: Layers,
  tailwind: Palette,
  "tailwind css": Palette,
  css: Palette,
  html: Code2,
  git: GitBranch,
  github: GitBranch,
  docker: Container,
  aws: Cloud,
  vercel: Rocket,
  firebase: Zap,
  graphql: Workflow,
  python: Terminal,
  figma: MonitorSmartphone,
  "react native": Smartphone,
  flutter: Smartphone,
  kubernetes: Boxes,
  linux: Cpu,
  default: Code2,
}

const getIcon = (name = "") => {
  const key = name.toLowerCase().trim()
  return iconMap[key] || iconMap.default
}

// Precompute tokens with icon + orbit angle
const tokens = technologies.map((name, i) => ({
  id: `tech-${i}-${name}`,
  name,
  Icon: getIcon(name),
  angle: (i / technologies.length) * Math.PI * 2,
}))

// ---------- Scroll reveal variants for heading ----------
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

function Technologies() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)

  // Scroll-linked parallax for the orbit ring
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 120])
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.05])

  // Active token — falls back to first token for the idle state
  const active = activeIndex !== null ? tokens[activeIndex] : tokens[0]
  const ActiveIcon = active.Icon

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className="relative overflow-hidden bg-surface px-6 py-24"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-40 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl text-center">
        {/* ---------- Heading ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase tracking-widest text-secondary"
          >
            Our Technology Stack
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
          >
            Powered by Modern Technologies.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl leading-7 text-muted"
          >
            We use reliable and modern technologies to build scalable,
            maintainable and engaging digital products.
          </motion.p>
        </motion.div>

        {/* ---------- Orbiting wheel ---------- */}
        <div className="relative mx-auto mt-20 flex h-[480px] w-full max-w-[560px] items-center justify-center sm:h-[560px]">
          {/* Outer decorative rings */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full border border-border/60"
            style={{ transform: "scale(0.95)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 rounded-full border border-dashed border-border/40"
            style={{ transform: "scale(0.78)" }}
          />

          {/* Rotating orbit layer (pauses on hover via activeIndex) */}
          <motion.div
            className="absolute inset-0"
            style={{ rotate: ringRotate, scale: ringScale }}
          >
            <motion.div
              className="relative h-full w-full"
              animate={{ rotate: activeIndex !== null ? 0 : 360 }}
              transition={{
                duration: 60,
                repeat: activeIndex !== null ? 0 : Infinity,
                ease: "linear",
              }}
            >
              {tokens.map((token, i) => {
                const Icon = token.Icon
                const radius = 200
                const x = Math.cos(token.angle) * radius
                const y = Math.sin(token.angle) * radius
                const isActive = activeIndex === i

                return (
                  <motion.button
                    key={token.id}
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onFocus={() => setActiveIndex(i)}
                    onBlur={() => setActiveIndex(null)}
                    aria-label={token.name}
                    className="absolute left-1/2 top-1/2 flex h-14 w-14 items-center justify-center rounded-2xl border bg-surface-elevated shadow-lg outline-none"
                    style={{
                      x,
                      y,
                      translateX: "-50%",
                      translateY: "-50%",
                    }}
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      borderColor: isActive ? "var(--primary)" : "var(--border)",
                      boxShadow: isActive
                        ? "0 0 30px -4px var(--primary)"
                        : "0 8px 20px -8px rgba(0,0,0,0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    whileHover={{ zIndex: 10 }}
                  >
                    {/* Counter-rotate so icons stay upright */}
                    <motion.span
                      className="flex h-full w-full items-center justify-center"
                      animate={{ rotate: activeIndex !== null ? 0 : -360 }}
                      transition={{
                        duration: 60,
                        repeat: activeIndex !== null ? 0 : Infinity,
                        ease: "linear",
                      }}
                    >
                      <Icon
                        className={`h-6 w-6 transition-colors ${
                          isActive ? "text-primary" : "text-muted"
                        }`}
                        strokeWidth={1.8}
                      />
                    </motion.span>
                  </motion.button>
                )
              })}
            </motion.div>
          </motion.div>

          {/* ---------- Center hub ---------- */}
          <div className="relative z-10 flex h-40 w-40 flex-col items-center justify-center rounded-full border border-primary/30 bg-surface-elevated shadow-[0_0_60px_-15px_var(--primary)]">
            {/* Pulsing rings */}
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-primary/30"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-primary/20"
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.8,
              }}
            />

            {/* Animated icon + name swap */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.6, rotate: -30, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.6, rotate: 30, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col items-center gap-2"
              >
                <ActiveIcon
                  className="h-12 w-12 text-primary"
                  strokeWidth={1.6}
                />
                <span className="max-w-[110px] truncate text-xs font-semibold uppercase tracking-wider text-muted">
                  {active.name}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Helper hint */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-6 text-xs uppercase tracking-widest text-muted/70"
        >
          Hover a technology to explore
        </motion.p>
      </div>
    </section>
  )
}

export default Technologies