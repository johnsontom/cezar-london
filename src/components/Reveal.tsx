"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { ease } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
};

/** Scroll-triggered fade and rise. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  duration = 1,
  amount = 0.2,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: ease.editorial, delay }}
    >
      {children}
    </motion.div>
  );
}

type RevealLinesProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
};

/** Masked, line-by-line editorial heading reveal. */
export function RevealLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.09,
}: RevealLinesProps) {
  const reduced = useReducedMotion();
  // The observer must watch the unclipped wrapper: the animated line sits
  // inside an overflow-hidden mask, so it can never intersect on its own.
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapperRef, { once: true, amount: 0.2 });

  return (
    <span ref={wrapperRef} className={className}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={reduced ? { y: 0, opacity: 0 } : { y: "112%", opacity: 0 }}
            animate={
              inView || reduced
                ? { y: "0%", opacity: 1 }
                : { y: "112%", opacity: reduced ? 1 : 0 }
            }
            transition={{
              duration: reduced ? 0.4 : 1.15,
              ease: ease.editorial,
              delay: delay + index * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
