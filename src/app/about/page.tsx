import type { Metadata } from "next";
import Link from "next/link";
import { Activity, Minus, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealLines } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "CEZAR LONDON represents confidence, individuality and modern movement — a contemporary fashion house built on considered design.",
};

const principles = [
  {
    icon: Activity,
    title: "Movement",
    copy: "Pieces are drafted to follow the body rather than resist it, so the line stays clean through every direction of travel.",
  },
  {
    icon: Sparkles,
    title: "Individuality",
    copy: "The CEZAR wardrobe is designed to be worn on your terms — styled back with what you already own, and made your own.",
  },
  {
    icon: Minus,
    title: "Restraint",
    copy: "Colour, hardware and branding stay deliberate and minimal. Nothing is added that does not earn its place.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The house"
        titleLines={["MORE THAN", "WHAT YOU WEAR."]}
        description="CEZAR LONDON is a contemporary fashion house creating luxury activewear and lifestyle clothing for those who express themselves through every detail."
        image={images.colourGroup}
        objectPosition="center 30%"
      />

      <section className="bg-ink py-24 md:py-32">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal y={16}>
              <span className="eyebrow text-chrome">Our point of view</span>
            </Reveal>
            <h2 className="display mt-6 text-[2.25rem] leading-[0.98] text-ivory md:text-[3rem]">
              <RevealLines lines={["Contemporary design,", "distinctive identity."]} />
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1} y={24}>
              <p className="text-sm leading-relaxed text-ivory/60 md:text-base">
                CEZAR LONDON represents confidence, individuality and modern movement.
                Created for those who express themselves through every detail, our
                collections bring together contemporary design and a distinctive sense of
                identity.
              </p>
            </Reveal>
            <Reveal delay={0.18} y={24}>
              <p className="mt-6 text-sm leading-relaxed text-ivory/45 md:text-base">
                Every collection is drawn as a complete wardrobe — sculpted outerwear,
                considered essentials and movement-led pieces that share one language. The
                result is a wardrobe that works as hard off the studio floor as it does on
                it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Design principles" className="border-y border-ivory/10 bg-ink-900">
        <div className="shell grid grid-cols-1 divide-y divide-ivory/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} y={30} delay={index * 0.08}>
              <div className="flex h-full flex-col gap-5 py-12 md:px-8 md:py-16 lg:px-12">
                <principle.icon className="h-5 w-5 text-chrome" strokeWidth={1.1} aria-hidden="true" />
                <h3 className="display text-2xl text-ivory md:text-[1.75rem]">
                  {principle.title}
                </h3>
                <p className="max-w-prose text-sm leading-relaxed text-ivory/50">
                  {principle.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-24 md:py-32">
        <div className="shell grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[images.blueCapriSet, images.blackCapriSet, images.pinkDuo].map((image, index) => (
            <Reveal
              key={image.src}
              y={36}
              delay={index * 0.08}
              className={index === 1 ? "sm:mt-16" : ""}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-800">
                <SmartImage
                  asset={image}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-ivory/10 bg-ink-900 py-20 md:py-24">
        <div className="shell flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-chrome">Work with us</span>
            <h2 className="display mt-5 max-w-2xl text-[2rem] leading-[1.05] text-ivory md:text-[2.75rem]">
              Press, wholesale and collaboration enquiries
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/contact#enquire" className="btn">
              <span>Contact the studio</span>
            </Link>
            <a
              href={`mailto:${site.contact.businessEmail}`}
              className="link-underline eyebrow text-ivory/60 transition-colors duration-500 hover:text-ivory"
            >
              {site.contact.businessEmail}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
