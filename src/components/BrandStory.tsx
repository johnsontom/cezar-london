import Link from "next/link";
import { images } from "@/lib/images";
import { Reveal, RevealLines } from "./Reveal";
import { SmartImage } from "./SmartImage";

/** "MORE THAN WHAT YOU WEAR." — split-screen brand story. */
export function BrandStory() {
  return (
    <section
      aria-labelledby="brand-story-heading"
      className="relative overflow-hidden bg-ink-900 py-24 md:py-32 lg:py-40"
    >
      <div className="shell grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="relative lg:col-span-6" y={40}>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-800">
            <SmartImage
              asset={images.pinkDuo}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-10 -right-4 hidden h-40 w-40 items-center justify-center border border-ivory/10 bg-ink lg:flex xl:h-48 xl:w-48">
            <div className="relative w-[62%]">
              <SmartImage
                asset={images.chromeLogo}
                sizes="200px"
                className="object-contain"
              />
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal y={16}>
            <span className="eyebrow text-chrome">The brand story</span>
          </Reveal>

          <h2
            id="brand-story-heading"
            className="display mt-6 text-[2.6rem] leading-[0.95] text-ivory sm:text-[3.25rem] lg:text-[4rem]"
          >
            <RevealLines lines={["MORE THAN", "WHAT YOU WEAR."]} />
          </h2>

          <Reveal delay={0.15} y={24}>
            <p className="mt-8 max-w-prose text-sm leading-relaxed text-ivory/60 md:text-[0.9375rem]">
              CEZAR LONDON represents confidence, individuality and modern movement.
              Created for those who express themselves through every detail, our
              collections bring together contemporary design and a distinctive sense of
              identity.
            </p>
          </Reveal>

          <Reveal delay={0.22} y={24}>
            <p className="mt-6 max-w-prose text-sm leading-relaxed text-ivory/45 md:text-[0.9375rem]">
              Each collection is drawn as a complete wardrobe — pieces designed to be worn
              together, and to be worn far beyond the studio.
            </p>
          </Reveal>

          <Reveal delay={0.3} y={24} className="mt-10">
            <Link href="/about" className="btn">
              <span>About CEZAR LONDON</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
