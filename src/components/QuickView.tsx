"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { ease } from "@/lib/motion";
import { availabilityLabels, formatPrice, type Product } from "@/lib/products";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { SmartImage } from "./SmartImage";

type QuickViewProps = {
  product: Product | null;
  onClose: () => void;
};

export function QuickView({ product, onClose }: QuickViewProps) {
  const { addLine } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [colour, setColour] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!product) return;
    setColour(product.colours[0]?.name ?? "");
    setSize("");
    setNotice(null);
    lockScroll();
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [product, onClose]);

  const handleAdd = () => {
    if (!product) return;
    if (!size) {
      setNotice("Please select a size.");
      return;
    }
    addLine({ slug: product.slug, size, colour, quantity: 1 });
    onClose();
  };

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          className="fixed inset-0 z-[115] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: ease.editorial }}
        >
          <button
            type="button"
            aria-label="Close quick view"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/80 backdrop-blur-[3px]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} quick view`}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.6, ease: ease.editorial }}
            className="relative grid max-h-[92svh] w-full max-w-4xl grid-cols-1 overflow-y-auto border border-ivory/10 bg-ink-900 sm:grid-cols-2"
          >
            <div className="relative aspect-[4/5] w-full bg-ink-800 sm:aspect-auto sm:min-h-[32rem]">
              <SmartImage
                asset={product.images[0]}
                sizes="(min-width:640px) 28rem, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-6 p-6 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow text-chrome">{product.collectionLabel} Collection</span>
                  <h2 className="display mt-3 text-3xl text-ivory">{product.name}</h2>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close quick view"
                  className="text-chrome transition-colors duration-500 hover:text-ivory"
                >
                  <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
                </button>
              </div>

              <p className="text-sm leading-relaxed text-ivory/55">{product.description}</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-ivory">{formatPrice(product)}</span>
                <span className="eyebrow text-[9px] text-ivory/45">
                  {availabilityLabels[product.availability]}
                </span>
              </div>

              <div>
                <span className="eyebrow text-[9px] text-ivory/45">
                  Colour — {colour}
                </span>
                <div className="mt-3 flex flex-wrap gap-3">
                  {product.colours.map((option) => (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => setColour(option.name)}
                      aria-label={option.name}
                      aria-pressed={colour === option.name}
                      style={{ backgroundColor: option.hex }}
                      className={`h-6 w-6 rounded-full border transition-[border-color,transform] duration-500 ${
                        colour === option.name
                          ? "border-ivory"
                          : "border-ivory/25 hover:border-ivory/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="eyebrow text-[9px] text-ivory/45">Size</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSize(option);
                        setNotice(null);
                      }}
                      aria-pressed={size === option}
                      className={`min-w-[3rem] border px-3 py-2 text-[11px] tracking-[0.14em] transition-colors duration-500 ${
                        size === option
                          ? "border-ivory bg-ivory text-ink"
                          : "border-ivory/20 text-ivory/70 hover:border-ivory/60"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {notice ? (
                <p role="alert" className="text-xs text-burgundy-500">
                  {notice}
                </p>
              ) : null}

              <div className="mt-auto flex flex-col gap-3">
                <button type="button" onClick={handleAdd} className="btn btn-solid w-full">
                  <span>Add to bag</span>
                </button>
                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="link-underline eyebrow inline-flex items-center gap-2 self-start text-ivory/65 transition-colors duration-500 hover:text-ivory"
                >
                  Full product details
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
