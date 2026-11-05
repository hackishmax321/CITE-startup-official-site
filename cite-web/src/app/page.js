
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Modern, responsive and SEO-friendly websites designed to establish your online presence and grow your business.",
    tags: ["Business Websites", "Portfolio Websites", "Landing Pages"],
  },
  {
    number: "02",
    title: "Business Solutions",
    description:
      "Practical software solutions that simplify daily operations, improve productivity and support business growth.",
    tags: ["POS Systems", "Management Systems", "Custom Software"],
  },
  {
    number: "03",
    title: "Interactive 3D Experiences",
    description:
      "Engaging digital experiences with interactive 3D elements and modern web technologies.",
    tags: ["Three.js", "3D Websites", "Creative Experiences"],
  },
];

const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "JavaScript",
  "Python",
  "Firebase",
  "MongoDB",
  "Three.js",
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            SmartDev<span className="text-green-600">.</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
            <Link href="#home" className="transition hover:text-green-600">
              Home
            </Link>
            <Link href="#services" className="transition hover:text-green-600">
              Services
            </Link>
            <Link href="#about" className="transition hover:text-green-600">
              About
            </Link>
            <Link href="#technologies" className="transition hover:text-green-600">
              Technologies
            </Link>
          </div>

          <Link
            href="#contact"
            className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Let's Talk
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative flex min-h-[680px] items-center bg-gradient-to-br from-white via-green-50 to-white px-6 py-24"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100/60 px-4 py-2 text-sm font-medium text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Web & 3D Solutions
            </div>

            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
              Building Digital Experiences for{" "}
              <span className="text-green-600">Modern Businesses.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
              We transform ideas into powerful digital experiences through
              modern websites, custom business solutions and interactive
              technologies.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="rounded-lg bg-green-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-1 hover:bg-green-700"
              >
                Start a Project →
              </Link>

              <Link
                href="#services"
                className="rounded-lg border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-800 transition hover:border-green-600 hover:text-green-600"
              >
                Explore Services
              </Link>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Creative solutions. Practical technology. Business-focused
              results.
            </p>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
            <div className="absolute inset-8 rounded-full bg-green-200/40 blur-3xl" />

            <div className="relative flex h-72 w-72 items-center justify-center rounded-[2.5rem] border border-green-200 bg-white shadow-2xl shadow-green-900/10 sm:h-96 sm:w-96">
              <div className="absolute inset-5 rounded-[2rem] border border-dashed border-green-300" />

              <div className="text-center">
                <div className="text-7xl font-black tracking-tighter text-gray-900">
                  SD<span className="text-green-600">.</span>
                </div>
                <p className="mt-3 text-sm font-semibold tracking-[0.3em] text-gray-500">
                  SMART DEVELOPMENT
                </p>
              </div>

              <div className="absolute -right-5 top-12 rounded-xl border border-gray-100 bg-white px-5 py-3 shadow-xl">
                <span className="text-sm font-semibold text-green-700">
                  Web Solutions
                </span>
              </div>

              <div className="absolute -bottom-4 left-0 rounded-xl border border-gray-100 bg-white px-5 py-3 shadow-xl">
                <span className="text-sm font-semibold text-gray-800">
                  Creative Technology
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-semibold uppercase tracking-widest text-green-600">
              What We Do
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
              Digital Solutions for Every Idea.
            </h2>
            <p className="mt-5 leading-7 text-gray-600">
              From establishing your online presence to developing custom
              business applications, we help turn your ideas into reality.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.number}
                className="rounded-2xl border border-gray-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl"
              >
                <span className="text-sm font-bold text-green-600">
                  {service.number}
                </span>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-semibold uppercase tracking-widest text-green-600">
              About SmartDev
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-gray-950 sm:text-5xl">
              Technology That Works for Your Business.
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              SmartDev focuses on delivering accessible, creative and
              effective digital solutions. We believe every business should
              have the opportunity to benefit from modern technology,
              regardless of its size or budget.
            </p>

            <p className="mt-5 leading-8 text-gray-600">
              Our approach combines modern development technologies,
              practical thinking and attention to the unique requirements of
              every project.
            </p>

            <Link
              href="#contact"
              className="mt-8 inline-block font-semibold text-green-700 hover:text-green-800"
            >
              Discuss your project →
            </Link>
          </div>

          <div className="rounded-3xl bg-gray-950 p-10 text-white sm:p-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-400">
              Our Approach
            </p>

            <div className="mt-10 space-y-9">
              {[
                ["01", "Understand", "We start with your goals and requirements."],
                ["02", "Create", "We develop solutions around your needs."],
                ["03", "Deliver", "We focus on quality, usability and results."],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-5">
                  <span className="text-lg font-bold text-green-400">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section id="technologies" className="bg-green-50 px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-semibold uppercase tracking-widest text-green-700">
            Our Technology Stack
          </p>

          <h2 className="mt-4 text-3xl font-bold text-gray-950 sm:text-4xl">
            Powered by Modern Technologies.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            We use reliable and modern technologies to build scalable,
            maintainable and engaging digital products.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-xl border border-green-200 bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-gray-950 px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-semibold uppercase tracking-widest text-green-400">
            Let's Work Together
          </p>

          <h2 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
            Have an Idea? Let's Build It.
          </h2>

          <p className="mt-6 leading-7 text-gray-400">
            Whether you need a business website, a custom software solution
            or an interactive digital experience, SmartDev is ready to help.
          </p>

          <Link
            href="mailto:hello@smartdev.lk"
            className="mt-9 inline-flex rounded-lg bg-green-500 px-8 py-4 font-bold text-white transition hover:bg-green-600"
          >
            Contact SmartDev →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950 px-6 py-8 text-center text-sm text-gray-500">
        <p>
            © 2026 SmartDev – Web & 3D Solutions.
            All rights reserved.
        </p>
        </footer>
    </main>
  );
}
