"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import type { GalleryItem } from "@/lib/gallery";
import { ease } from "@/lib/motion";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { SmartImage } from "./SmartImage";

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  const step = useCallback(
    (direction: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + direction + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    lockScroll();
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open, onClose, step]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Campaign image: ${item.caption}`}
          className="fixed inset-0 z-[125] flex flex-col bg-ink/97 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: ease.editorial }}
        >
          <header className="flex shrink-0 items-center justify-between px-5 py-5 md:px-10">
            <span className="eyebrow text-ivory/50">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="text-chrome transition-colors duration-500 hover:text-ivory"
            >
              <X className="h-6 w-6" strokeWidth={1.1} aria-hidden="true" />
            </button>
          </header>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-3 pb-4 md:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                className="relative h-full max-h-full w-full max-w-6xl"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.6, ease: ease.editorial }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) step(1);
                  else if (info.offset.x > 70) step(-1);
                }}
              >
                <SmartImage
                  asset={item}
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  quality={88}
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <footer className="flex shrink-0 items-center justify-between gap-6 px-5 py-5 md:px-10">
            <div className="min-w-0">
              <p className="truncate text-sm text-ivory">{item.caption}</p>
              <p className="eyebrow mt-1 text-[9px] text-ivory/40">{item.location}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory transition-colors duration-500 hover:border-ivory/70"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory transition-colors duration-500 hover:border-ivory/70"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
              </button>
            </div>
          </footer>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
