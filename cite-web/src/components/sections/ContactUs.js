"use client"

import Link from "next/link"
import { motion } from "framer-motion"

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

const buttonVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
}

function ContactUs() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(var(--primary-glow), 0.10), transparent 65%)",
        }}
      />

      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.p
          variants={fadeUp}
          className="font-semibold uppercase tracking-widest text-primary"
        >
          Let's Work Together
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="mt-5 text-4xl font-bold text-foreground sm:text-5xl"
        >
          Have an Idea?{" "}
          <span className="text-gradient">Let's Build It.</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-6 leading-7 text-muted">
          Whether you need a business website, a custom software solution or an
          interactive digital experience, SmartDev is ready to help.
        </motion.p>

        {/* Buttons — pop in one-by-one */}
        <motion.div
          className="mt-9 flex flex-wrap justify-center gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={buttonVariant}>
            <Link href="mailto:hello@smartdev.lk" className="btn btn-primary">
              Contact SmartDev →
            </Link>
          </motion.div>

          <motion.div variants={buttonVariant}>
            <Link href="#services" className="btn btn-outline">
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ContactUs