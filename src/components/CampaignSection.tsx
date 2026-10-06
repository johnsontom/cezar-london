"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { SmartImage } from "./SmartImage";
import { TiltFrame } from "./TiltFrame";

/**
 * "BEYOND THE ORDINARY"
 * GSAP drives the layered scroll parallax. It is imported dynamically so the
 * library never delays the first paint.
 */
export function CampaignSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const insetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let context: { revert: () => void } | null = null;
    let removeRefresh: (() => void) | null = null;

    const setup = async () => {
      const [gsapModule, triggerModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      const gsap = gsapModule.gsap ?? gsapModule.default;
      const { ScrollTrigger } = triggerModule;
      gsap.registerPlugin(ScrollTrigger);

      const shared = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      } as const;

      context = gsap.context(() => {
        if (bandRef.current) {
          gsap.fromTo(
            bandRef.current,
            { yPercent: -7, scale: 1.16 },
            { yPercent: 7, scale: 1, ease: "none", scrollTrigger: { ...shared } },
          );
        }
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { yPercent: 16 },
            { yPercent: -10, ease: "none", scrollTrigger: { ...shared } },
          );
        }
        if (insetRef.current) {
          gsap.fromTo(
            insetRef.current,
            { yPercent: 10 },
            { yPercent: -12, ease: "none", scrollTrigger: { ...shared } },
          );
        }
      }, sectionRef);

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      removeRefresh = () => window.removeEventListener("load", refresh);
    };

    void setup();

    return () => {
      cancelled = true;
      removeRefresh?.();
      context?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="campaign-heading"
      className="relative overflow-hidden bg-ink py-20 md:py-28 lg:py-32"
    >
      <div className="shell-wide">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-800 sm:aspect-[4/3] lg:aspect-[16/9]">
          <div ref={bandRef} className="absolute inset-[-5%] will-change-transform">
            <SmartImage
              asset={images.colourGroup}
              sizes="100vw"
              quality={86}
              className="object-cover"
              objectPosition="center 37%"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/25" />

          <div ref={titleRef} className="absolute inset-x-0 bottom-0 p-6 md:p-12 lg:p-16">
            <span className="eyebrow text-chrome">The campaign</span>
            <h2
              id="campaign-heading"
              className="display mt-4 text-[13.5vw] leading-[0.86] text-ivory sm:text-[4.5rem] lg:text-[7rem]"
            >
              BEYOND THE
              <br />
              ORDINARY
            </h2>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="display text-[1.6rem] leading-[1.3] text-ivory md:text-[2.1rem]">
              {site.statement}
            </p>
            <Link
              href="/gallery"
              className="link-underline eyebrow mt-10 inline-flex items-center gap-2 text-ivory/75 transition-colors duration-500 hover:text-ivory"
            >
              View the campaign gallery
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div ref={insetRef} className="relative aspect-[3/4] w-full will-change-transform">
              <TiltFrame className="absolute inset-0" intensity={4}>
                <div className="relative h-full w-full overflow-hidden bg-ink-800">
                  <SmartImage
                    asset={images.nightCampaign}
                    sizes="(min-width: 1024px) 32vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </TiltFrame>
            </div>
            <p className="eyebrow mt-5 text-[9px] text-ivory/35">
              Campaign set II — London, after dark
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
