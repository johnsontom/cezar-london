"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Hairline chrome progress indicator pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 40, restDelta: 0.001 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[90] h-px w-full origin-left bg-gradient-to-r from-transparent via-chrome to-chrome/0"
    />
  );
}
