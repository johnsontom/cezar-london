"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { films } from "@/lib/films";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * The campaign films. Muted, autoplaying loops used as ambient art direction.
 * The source clips are portrait and landscape, so the layout pairs a tall
 * 9:16 reel with a wide 16:10 film.
 */
export function CampaignFilm() {
  const reduced = useReducedMotion();
  const autoPlay = !reduced;

  return (
    <section
      aria-labelledby="campaign-film-heading"
      className="relative overflow-hidden bg-ink-900 py-24 md:py-32"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="The film"
          lines={["IN MOTION"]}
          description="Two new films from the campaign, shot after dark on the rooftop and on the road. Played muted and on loop, as they were meant to be seen."
          link={{ label: "Open the campaign", href: "/gallery" }}
          headingId="campaign-film-heading"
          headingClassName="text-[13vw] leading-[0.9] md:text-[5.5rem] lg:text-[6.5rem]"
          className="mb-14 md:mb-20"
        />

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5" y={40}>
            <figure className="flex flex-col items-center gap-4">
              <div className="relative aspect-[9/16] h-[56vh] max-h-[600px] w-auto overflow-hidden bg-ink-800">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay={autoPlay}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={films.rooftop.poster}
                  width={films.rooftop.width}
                  height={films.rooftop.height}
                  aria-label={films.rooftop.label}
                >
                  <source src={films.rooftop.src} type="video/mp4" />
                </video>
              </div>
              <figcaption className="eyebrow text-[9px] text-ivory/40">
                {films.rooftop.title}
              </figcaption>
            </figure>
          </Reveal>

          <div className="flex flex-col gap-8 lg:col-span-7">
            <Reveal y={40} delay={0.08}>
              <figure className="flex flex-col gap-4">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-800">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay={autoPlay}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={films.car.poster}
                    width={films.car.width}
                    height={films.car.height}
                    aria-label={films.car.label}
                  >
                    <source src={films.car.src} type="video/mp4" />
                  </video>
                </div>
                <figcaption className="eyebrow text-[9px] text-ivory/40">
                  {films.car.title}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal y={24} delay={0.16}>
              <div className="max-w-prose">
                <p className="display text-[1.6rem] leading-[1.3] text-ivory md:text-[2rem]">
                  {site.statement}
                </p>
                <Link
                  href="/gallery"
                  className="link-underline eyebrow mt-8 inline-flex items-center gap-2 text-ivory/75 transition-colors duration-500 hover:text-ivory"
                >
                  Watch the full campaign
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}