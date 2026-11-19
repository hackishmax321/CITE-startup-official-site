"use client"

import { approach } from "@/constants/ServicesList"
import Link from "next/link"
import { motion } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE },
  },
}

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

function AboutUs() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        {/* About content */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeUp}
            className="font-semibold uppercase tracking-widest text-primary"
          >
            About SmartDev
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl"
          >
            Technology That Works for Your Business.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 leading-8 text-muted">
            SmartDev focuses on delivering accessible, creative and effective
            digital solutions. We believe every business should have the
            opportunity to benefit from modern technology, regardless of its
            size or budget.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 leading-8 text-muted">
            Our approach combines modern development technologies, practical
            thinking and attention to the unique requirements of every project.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-primary transition hover:text-accent"
            >
              Discuss your project
              <span>→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Our approach card */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated p-10 sm:p-14"
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
            style={{
              background: "rgba(var(--secondary-glow), 0.12)",
            }}
          />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Approach
            </p>

            {/* Approach items — stagger one-by-one */}
            <motion.div
              className="mt-10 space-y-9"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {approach.map((item) => (
                <motion.div
                  key={item.number}
                  variants={itemVariant}
                  className="flex gap-5"
                >
                  <span className="text-lg font-bold text-primary">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUs