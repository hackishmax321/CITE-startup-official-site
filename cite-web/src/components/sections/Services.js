import { services } from "@/constants/ServicesList"
import Link from "next/link"

function Services() {
  return (
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
  )
}

export default Services