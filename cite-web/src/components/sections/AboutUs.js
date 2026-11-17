import { approach } from "@/constants/ServicesList"
import Link from "next/link"

function AboutUs() {
  return (
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
  )
}

export default AboutUs