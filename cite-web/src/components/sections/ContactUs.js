import Link from "next/link"

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

        <div className="relative mx-auto max-w-3xl text-center">

          <p className="font-semibold uppercase tracking-widest text-primary">
            Let's Work Together
          </p>

          <h2 className="mt-5 text-4xl font-bold text-foreground sm:text-5xl">
            Have an Idea?{" "}
            <span className="text-gradient">
              Let's Build It.
            </span>
          </h2>

          <p className="mt-6 leading-7 text-muted">
            Whether you need a business website, a custom software solution
            or an interactive digital experience, SmartDev is ready to help.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">

            <Link
              href="mailto:hello@smartdev.lk"
              className="btn btn-primary"
            >
              Contact SmartDev →
            </Link>

            <Link
              href="#services"
              className="btn btn-outline"
            >
              Explore Services
            </Link>

          </div>

        </div>

    </section>
  )
}

export default ContactUs