import { technologies } from "@/constants/TechnologiesList"
import Link from "next/link"

function Technologies() {
  return (
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
  )
}

export default Technologies