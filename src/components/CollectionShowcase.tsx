import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/collections";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SmartImage } from "./SmartImage";
import { TiltFrame } from "./TiltFrame";

/**
 * Asymmetric editorial grid. Each collection gets a different crop and weight
 * so the page reads like a magazine spread rather than a product list.
 */
const layout = [
  { span: "lg:col-span-7", aspect: "aspect-[4/5] sm:aspect-[3/4]", offset: "", tilt: true },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:mt-36", tilt: false },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "", tilt: false },
  { span: "lg:col-span-7", aspect: "aspect-[4/5] sm:aspect-[5/4]", offset: "lg:mt-36", tilt: true },
];

export function CollectionShowcase() {
  return (
    <section
      id="collections"
      aria-labelledby="collection-showcase-heading"
      className="relative bg-ink py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="The CEZAR collection"
          lines={["THE CEZAR", "COLLECTION"]}
          description="Four chapters of the CEZAR wardrobe, photographed as a single campaign. Each collection is built to sit together or stand alone."
          link={{ label: "All collections", href: "/collections" }}
          className="mb-16 md:mb-24"
          headingId="collection-showcase-heading"
        />

        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-24">
          {collections.map((collection, index) => {
            const config = layout[index] ?? layout[0];
            return (
              <Reveal
                key={collection.slug}
                className={`group ${config.span} ${config.offset}`}
                y={44}
              >
                <div className={`relative w-full ${config.aspect}`}>
                  <TiltFrame
                    className="absolute inset-0"
                    intensity={config.tilt ? 4 : 0}
                  >
                    <Link
                      href={`/collections/${collection.slug}`}
                      data-cursor
                      data-cursor-label="Explore"
                      className="relative block h-full w-full overflow-hidden bg-ink-800"
                    >
                      <div className="absolute inset-0 transition-transform duration-[1600ms] ease-editorial group-hover:scale-[1.045]">
                        <SmartImage
                          asset={collection.hero}
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-85" />

                      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-9">
                        <span className="eyebrow text-chrome">
                          {collection.number} — {collection.tagline}
                        </span>
                        <h3 className="display text-3xl text-ivory md:text-[2.75rem]">
                          {collection.name}
                        </h3>
                        <span className="eyebrow inline-flex items-center gap-2 text-ivory/70 transition-colors duration-500 group-hover:text-ivory">
                          Explore collection
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform duration-700 ease-editorial group-hover:translate-x-1.5"
                            strokeWidth={1.25}
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  </TiltFrame>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
