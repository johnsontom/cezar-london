"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { images } from "@/lib/images";
import { ease } from "@/lib/motion";

const SESSION_KEY = "cezar-intro";
const HOLD_MS = 1150;

/**
 * First-load curtain: the chrome emblem settles, then the curtain lifts.
 * Only renders after mount, so a failed script can never leave it on screen.
 */
export function PageIntro() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-ink"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.95, ease: ease.editorial }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: ease.editorial }}
            className="relative w-[128px]"
          >
            <Image
              src={images.chromeLogo.src}
              alt=""
              width={images.chromeLogo.width}
              height={images.chromeLogo.height}
              priority
              className="h-auto w-full"
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: ease.editorial }}
            className="eyebrow absolute bottom-[12vh] text-ivory/45"
          >
            CEZAR LONDON
          </motion.span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: ease.editorial }}
            className="absolute bottom-[calc(12vh-1.75rem)] h-px w-[160px] origin-left bg-gradient-to-r from-transparent via-chrome to-transparent"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
