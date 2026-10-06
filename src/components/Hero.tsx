"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { images } from "@/lib/images";
import { ease } from "@/lib/motion";
import { site } from "@/lib/site";
import { SmartImage } from "./SmartImage";

const headlineGradient = {
  backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, #F0EFEC 52%, #B4B4B4 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const onMove = (event: PointerEvent) => {
      setPointer({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-label="CEZAR LONDON campaign"
      className="grain relative h-screen w-full overflow-hidden bg-ink"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* Campaign photography with cinematic reveal + scroll parallax */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: imageY, scale: imageScale }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduced ? { opacity: 0 } : { clipPath: "inset(0% 100% 0% 0%)", scale: 1.1 }}
          animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          transition={{ duration: 1.7, ease: ease.editorial }}
        >
          <motion.div
            className="absolute inset-0 hidden md:block"
            animate={reduced ? undefined : { x: pointer.x * -12, y: pointer.y * -10 }}
            transition={{ duration: 1.2, ease: ease.editorial }}
          >
            <SmartImage
              asset={images.nightRooftop}
              priority
              quality={88}
              sizes="100vw"
              className="object-cover"
              objectPosition="center 32%"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 md:hidden"
            animate={reduced ? undefined : { x: pointer.x * -8 }}
            transition={{ duration: 1.2, ease: ease.editorial }}
          >
            <SmartImage
              asset={images.nightCampaign}
              priority
              quality={88}
              sizes="100vw"
              className="object-cover"
              objectPosition="center 30%"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Art-directed scrims */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/25 to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_220px_rgba(0,0,0,0.85)]" />

      <motion.div
        className="shell relative z-10 flex h-full flex-col justify-end pb-16 md:justify-center md:pb-0"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-[min(92vw,1180px)]">
          <motion.div
            className="mb-8 flex items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: ease.editorial, delay: 0.5 }}
          >
            <span className="h-px w-10 bg-chrome/70" />
            <span className="eyebrow text-ivory/70">Campaign 01 — London</span>
          </motion.div>

          <h1 className="display text-[19vw] leading-[0.85] tracking-tighter2 md:text-[13.5vw] lg:text-[11.5vw] xl:text-[10.5rem]">
            {["CEZAR", "LONDON"].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.02em]">
                <motion.span
                  className="block"
                  style={headlineGradient}
                  initial={reduced ? { opacity: 0 } : { y: "108%" }}
                  animate={reduced ? { opacity: 1 } : { y: "0%" }}
                  transition={{
                    duration: 1.4,
                    ease: ease.editorial,
                    delay: 0.55 + index * 0.12,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="eyebrow mt-8 max-w-[22ch] text-ivory/75 md:max-w-none"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: ease.editorial, delay: 1.05 }}
          >
            {site.tagline}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: ease.editorial, delay: 1.2 }}
          >
            <Link href="/collections" className="btn" data-cursor data-cursor-label="View">
              <span>Discover the collection</span>
            </Link>
            <Link
              href="/gallery"
              className="link-underline eyebrow inline-flex items-center gap-2 text-ivory/70 transition-colors duration-500 hover:text-ivory"
            >
              View campaign
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-10 right-[var(--shell-x)] z-10 hidden flex-col items-center gap-4 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: ease.editorial, delay: 1.5 }}
      >
        <span className="eyebrow rotate-180 text-[9px] text-ivory/50 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-0 animate-scroll-line bg-chrome" />
        </span>
      </motion.div>
    </section>
  );
}
