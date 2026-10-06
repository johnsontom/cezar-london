"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { images } from "@/lib/images";
import { ErrorBoundary } from "./ErrorBoundary";
import { Reveal, RevealLines } from "./Reveal";

const ChromeEmblem = dynamic(
  () => import("./three/ChromeEmblem").then((module) => module.ChromeEmblem),
  { ssr: false },
);

/** WebGL is optional: the emblem is an enhancement, never a requirement. */
function supportsWebgl() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

/** Static chrome emblem used before WebGL is ready and for reduced motion. */
function StaticEmblem() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[74%] max-w-[26rem] animate-float-slow">
        <Image
          src={images.chromeLogo.src}
          alt="The CEZAR LONDON chrome monogram emblem"
          width={images.chromeLogo.width}
          height={images.chromeLogo.height}
          sizes="(min-width: 1024px) 26rem, 74vw"
          className="h-auto w-full"
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-[-20%] left-0 w-1/3 animate-sheen bg-gradient-to-r from-transparent via-white/35 to-transparent mix-blend-overlay" />
        </div>
      </div>
    </div>
  );
}

export function ChromeLogoReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef(0);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(false);

  const stageInView = useInView(stageRef, { margin: "-5% 0px -5% 0px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 1, 0.35]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    tiltRef.current = (value - 0.5) * 2;
  });

  useEffect(() => {
    if (stageInView) setMounted(true);
  }, [stageInView]);

  useEffect(() => {
    setWebglAvailable(supportsWebgl());
  }, []);

  const handleReady = useCallback(() => setReady(true), []);
  const showWebgl = !reduced && webglAvailable;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="chrome-emblem-heading"
      className="relative overflow-hidden bg-ink py-24 md:py-32 lg:py-44"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[110vw] w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[70vw] md:w-[70vw]"
        style={{
          opacity: reduced ? 0.7 : glowOpacity,
          background:
            "radial-gradient(circle, rgba(141,21,56,0.32) 0%, rgba(141,21,56,0.06) 42%, transparent 68%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[36vw] md:w-[36vw]"
        style={{
          background:
            "radial-gradient(circle, rgba(199,199,199,0.14) 0%, transparent 62%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 select-none text-center md:block"
      >
        <span
          className="display text-[16vw] leading-none text-transparent"
          style={{ WebkitTextStroke: "1px rgba(245,242,237,0.055)" }}
        >
          CEZAR
        </span>
      </div>

      <div className="shell relative z-10 flex flex-col items-center">
        <Reveal y={16}>
          <span id="chrome-emblem-heading" className="eyebrow text-chrome">
            The CEZAR mark
          </span>
        </Reveal>

        <div
          ref={stageRef}
          className="relative mt-10 aspect-square w-full max-w-[22rem] sm:max-w-[28rem] lg:max-w-[34rem]"
        >
          {showWebgl && mounted ? (
            <div className="absolute inset-0">
              <ErrorBoundary
                label="Chrome emblem"
                fallback={null}
                onError={() => setWebglAvailable(false)}
              >
                <ChromeEmblem
                  active={stageInView}
                  animate={showWebgl}
                  tiltRef={tiltRef}
                  onReady={handleReady}
                />
              </ErrorBoundary>
            </div>
          ) : null}
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-editorial"
            style={{ opacity: showWebgl && ready ? 0 : 1 }}
            aria-hidden={showWebgl && ready}
          >
            <StaticEmblem />
          </div>
        </div>

        <p className="eyebrow mt-10 hidden text-[9px] text-ivory/35 lg:block">
          Move your cursor — the chrome follows the light
        </p>

        <h2 className="display mt-14 max-w-4xl text-center text-[2rem] leading-[1.05] text-ivory sm:text-[2.75rem] lg:text-[3.5rem]">
          <RevealLines
            lines={["The mark of", "the house."]}
            stagger={0.1}
          />
        </h2>

        <Reveal delay={0.2} y={20}>
          <p className="mx-auto mt-8 max-w-prose text-center text-sm leading-relaxed text-ivory/50 md:text-[0.9375rem]">
            Every CEZAR piece is cut from the same intention: contemporary design, a
            distinctive sense of identity, and the confidence to be different.
          </p>
        </Reveal>

        <Reveal delay={0.3} y={20} className="mt-10">
          <Link href="/about" className="btn">
            <span>The house of CEZAR</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
