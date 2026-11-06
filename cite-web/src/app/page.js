
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Modern, responsive and SEO-friendly websites designed to establish your online presence and grow your business.",
    tags: ["Business Websites", "Portfolio Websites", "Landing Pages"],
    symbol: "</>",
    color: "text-secondary",
  },
  {
    number: "02",
    title: "Business Solutions",
    description:
      "Practical software solutions that simplify daily operations, improve productivity and support business growth.",
    tags: ["POS Systems", "Management Systems", "Custom Software"],
    symbol: "⌘",
    color: "text-primary",
  },
  {
    number: "03",
    title: "Interactive 3D Experiences",
    description:
      "Engaging digital experiences with interactive 3D elements and modern web technologies.",
    tags: ["Three.js", "3D Websites", "Creative Experiences"],
    symbol: "◇",
    color: "text-highlight",
  },
];

const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "JavaScript",
  "Python",
  "FastAPI",
  "Firebase",
  "MongoDB",
  "MySQL",
  "Three.js",
  "Tailwind CSS",
  "AWS",
];

const approach = [
  {
    number: "01",
    title: "Understand",
    description: "We start by understanding your business goals, ideas and requirements.",
  },
  {
    number: "02",
    title: "Create",
    description: "We design and develop solutions tailored to your specific needs.",
  },
  {
    number: "03",
    title: "Deliver",
    description: "We focus on quality, usability and reliable digital experiences.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-background text-foreground">

      {/* =================================
          NAVIGATION
      ================================= */}

      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <nav className="section-container flex items-center justify-between py-4">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-foreground"
          >
            SmartDev<span className="text-primary">.</span>
          </Link>

          {/* Navigation links */}
          <div className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
            <Link href="#home" className="transition hover:text-primary">
              Home
            </Link>

            <Link href="#services" className="transition hover:text-primary">
              Services
            </Link>

            <Link href="#about" className="transition hover:text-primary">
              About
            </Link>

            <Link href="#technologies" className="transition hover:text-primary">
              Technologies
            </Link>
          </div>

          {/* CTA */}
          <Link href="#contact" className="btn btn-primary text-sm">
            Let's Talk →
          </Link>

        </nav>
      </header>


      {/* =================================
          HERO SECTION
      ================================= */}

      <section
        id="home"
        className="relative flex min-h-[680px] items-center px-6 py-24"
      >

        {/* Background effects */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% 35%, rgba(var(--secondary-glow), 0.15), transparent 45%), radial-gradient(ellipse at 15% 85%, rgba(var(--primary-glow), 0.09), transparent 40%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* Hero content */}
          <div>

            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-primary">

              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>

              Web & 3D Solutions

            </div>

            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">

              Smart technology.

              <span className="mt-2 block text-gradient">
                Better business.
              </span>

            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
              We build websites, custom software and intelligent digital
              solutions designed around your business. Transform your ideas
              into practical technology and better experiences.
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
                  "radial-gradient(circle, rgba(var(--secondary-glow), 0.28), rgba(var(--primary-glow), 0.10), transparent 70%)",
              }}
            />

            {/* Main visual card */}
            <div className="relative flex h-72 w-72 items-center justify-center rounded-[2.5rem] border border-border bg-surface shadow-2xl sm:h-96 sm:w-96">

              <div className="absolute inset-5 rounded-[2rem] border border-dashed border-border-hover" />

              <div
                className="absolute inset-0 rounded-[2.5rem]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(var(--secondary-glow), 0.12), transparent 65%)",
                }}
              />

              <div className="relative text-center">

                <div className="text-7xl font-black tracking-tighter text-foreground sm:text-8xl">
                  SD<span className="text-primary">.</span>
                </div>

                <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-muted">
                  SMART DEVELOPMENT
                </p>

                <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />

              </div>

              {/* Floating cards */}
              <div className="absolute -right-5 top-12 rounded-xl border border-border bg-surface-elevated px-5 py-3 shadow-xl glow-secondary">

                <span className="text-sm font-semibold text-secondary">
                  Web Solutions
                </span>

              </div>

              <div className="absolute -bottom-4 left-0 rounded-xl border border-border bg-surface-elevated px-5 py-3 shadow-xl glow-primary">

                <span className="text-sm font-semibold text-primary">
                  Creative Technology
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================
          SERVICES SECTION
      ================================= */}

      <section id="services" className="bg-surface px-6 py-24">

        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <div className="max-w-2xl">

            <p className="font-semibold uppercase tracking-widest text-primary">
              What We Do
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Digital Solutions for Every Idea.
            </h2>

            <p className="mt-5 leading-7 text-muted">
              From establishing your online presence to developing custom
              business applications, we help turn your ideas into reality.
            </p>

          </div>


          {/* Service cards */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {services.map((service) => (

              <article
                key={service.number}
                className="theme-card group p-8 transition duration-300 hover:-translate-y-2 hover:border-border-hover"
              >

                <div className="flex items-center justify-between">

                  <span className="text-sm font-bold text-primary">
                    {service.number}
                  </span>

                  <span className={`text-3xl font-bold ${service.color}`}>
                    {service.symbol}
                  </span>

                </div>

                <h3 className="mt-6 text-2xl font-bold text-foreground transition group-hover:text-primary">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-muted">
                  {service.description}
                </p>

                {/* Service tags */}
                <div className="mt-7 flex flex-wrap gap-2">

                  {service.tags.map((tag) => (

                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-muted"
                    >
                      {tag}
                    </span>

                  ))}

                </div>

                <div className="mt-8 h-px w-full bg-border transition group-hover:bg-primary" />

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =================================
          ABOUT SECTION
      ================================= */}

      <section id="about" className="px-6 py-24">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          {/* About content */}
          <div>

            <p className="font-semibold uppercase tracking-widest text-primary">
              About SmartDev
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Technology That Works for Your Business.
            </h2>

            <p className="mt-6 leading-8 text-muted">
              SmartDev focuses on delivering accessible, creative and
              effective digital solutions. We believe every business should
              have the opportunity to benefit from modern technology,
              regardless of its size or budget.
            </p>

            <p className="mt-5 leading-8 text-muted">
              Our approach combines modern development technologies,
              practical thinking and attention to the unique requirements of
              every project.
            </p>

            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-primary transition hover:text-accent"
            >
              Discuss your project
              <span>→</span>
            </Link>

          </div>


          {/* Our approach card */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated p-10 sm:p-14">

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

              <div className="mt-10 space-y-9">

                {approach.map((item) => (

                  <div key={item.number} className="flex gap-5">

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

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================
          TECHNOLOGIES SECTION
      ================================= */}

      <section
        id="technologies"
        className="relative overflow-hidden bg-surface px-6 py-24"
      >

        <div className="mx-auto max-w-7xl text-center">

          <p className="font-semibold uppercase tracking-widest text-secondary">
            Our Technology Stack
          </p>

          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Powered by Modern Technologies.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted">
            We use reliable and modern technologies to build scalable,
            maintainable and engaging digital products.
          </p>


          {/* Technology tags */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">

            {technologies.map((technology, index) => (

              <span
                key={technology}
                className={`rounded-xl border border-border bg-surface-elevated px-6 py-3 font-semibold text-muted transition duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary ${
                  index % 3 === 0 ? "hover:glow-primary" : ""
                }`}
              >
                {technology}
              </span>

            ))}

          </div>

        </div>

      </section>


      {/* =================================
          CONTACT CTA
      ================================= */}

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


      {/* =================================
          FOOTER
      ================================= */}

      <footer className="border-t border-border bg-[var(--footer-bg)] px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-[var(--footer-fg)]"
          >
            SmartDev<span className="text-primary">.</span>
          </Link>

          <p className="text-sm text-muted">
            © 2026 SmartDev – Web & 3D Solutions. All rights reserved.
          </p>

          <Link
            href="#home"
            className="text-sm font-medium text-primary transition hover:text-accent"
          >
            Back to Top ↑
          </Link>

        </div>

      </footer>

    </main>
  );
}
