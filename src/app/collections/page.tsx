import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { collections } from "@/lib/collections";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "The CEZAR LONDON collections — Signature, Essential, Movement and Women's. Contemporary design, distinctive identity.",
};

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="The collections"
        titleLines={["THE", "COLLECTIONS"]}
        description="Four chapters of the CEZAR wardrobe. Each one is designed as a complete line — worn together, or worn alone."
        image={images.colourGroup}
        objectPosition="center 32%"
      />

      <section className="bg-ink py-20 md:py-28">
        <div className="shell flex flex-col gap-20 md:gap-28">
          {collections.map((collection, index) => {
            const imageFirst = index % 2 === 0;
            return (
              <Reveal key={collection.slug} y={40}>
                <article className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  <div
                    className={`relative lg:col-span-7 ${
                      imageFirst ? "" : "lg:order-2 lg:col-start-6"
                    }`}
                  >
                    <Link
                      href={`/collections/${collection.slug}`}
                      data-cursor
                      data-cursor-label="Explore"
                      className="group relative block aspect-[4/5] w-full overflow-hidden bg-ink-800 sm:aspect-[16/11]"
                    >
                      <div className="absolute inset-0 transition-transform duration-[1600ms] ease-editorial group-hover:scale-[1.04]">
                        <SmartImage
                          asset={collection.hero}
                          sizes="(min-width: 1024px) 58vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-80" />
                    </Link>
                  </div>

                  <div className={`lg:col-span-4 ${imageFirst ? "lg:col-start-9" : ""}`}>
                    <span className="eyebrow text-chrome">
                      {collection.number} — {collection.tagline}
                    </span>
                    <h2 className="display mt-5 text-[2.25rem] leading-[0.95] text-ivory md:text-[3rem]">
                      {collection.name}
                    </h2>
                    <p className="mt-6 max-w-prose text-sm leading-relaxed text-ivory/55">
                      {collection.description}
                    </p>
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="link-underline eyebrow mt-8 inline-flex items-center gap-2 text-ivory/75 transition-colors duration-500 hover:text-ivory"
                    >
                      Explore collection
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="shell mt-24">
          <p className="max-w-prose text-[11px] leading-relaxed text-ivory/30">
            {site.productNotice}
          </p>
        </div>
      </section>
    </>
  );
}
