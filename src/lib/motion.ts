import type { Transition, Variants } from "framer-motion";

/** Shared motion language. Slow, weighted and intentional. */

export const ease = {
  editorial: [0.16, 1, 0.3, 1] as const,
  silk: [0.65, 0, 0.35, 1] as const,
  soft: [0.33, 1, 0.68, 1] as const,
};

export const transition = {
  editorial: { duration: 0.9, ease: ease.editorial } satisfies Transition,
  silk: { duration: 1.2, ease: ease.silk } satisfies Transition,
  quick: { duration: 0.5, ease: ease.editorial } satisfies Transition,
  slow: { duration: 1.4, ease: ease.editorial } satisfies Transition,
};

/** Masked line reveal used for editorial headings. */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  visible: (custom: number = 0) => ({
    y: "0%",
    transition: { duration: 1.1, ease: ease.editorial, delay: custom * 0.08 },
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: ease.editorial, delay: custom * 0.08 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    transition: { duration: 1.1, ease: ease.editorial, delay: custom * 0.08 },
  }),
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", scale: 1.08 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1.4, ease: ease.editorial },
  },
};
