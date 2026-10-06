"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

/** Light page transition applied on every route change. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0.2 : 0.55, ease: ease.editorial }}
    >
      {children}
    </motion.div>
  );
}
