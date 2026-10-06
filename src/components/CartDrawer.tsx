"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import { site } from "@/lib/site";
import { ease } from "@/lib/motion";
import { SmartImage } from "./SmartImage";

export function CartDrawer() {
  const { lines, count, isOpen, closeBag, removeLine, setQuantity } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBag();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeBag]);

  const priced = lines.every((line) => typeof line.product.priceGBP === "number");
  const total = lines.reduce(
    (sum, line) => sum + (line.product.priceGBP ?? 0) * line.quantity,
    0,
  );

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[120]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: ease.editorial }}
        >
          <button
            type="button"
            aria-label="Close shopping bag"
            onClick={closeBag}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/70 backdrop-blur-[2px]"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.75, ease: ease.editorial }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[26rem] flex-col border-l border-ivory/10 bg-ink-900"
          >
            <header className="flex items-center justify-between border-b border-ivory/10 px-6 py-6">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-4 w-4 text-chrome" strokeWidth={1.25} aria-hidden="true" />
                <span className="eyebrow text-ivory">
                  Bag{count > 0 ? ` (${count})` : ""}
                </span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={closeBag}
                aria-label="Close shopping bag"
                className="text-chrome transition-colors duration-500 hover:text-ivory"
              >
                <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
                <p className="display text-3xl text-ivory/80">Your bag is empty.</p>
                <p className="max-w-[24ch] text-sm leading-relaxed text-ivory/50">
                  Explore the collection and add pieces to begin.
                </p>
                <Link href="/collections" onClick={closeBag} className="btn">
                  <span>Discover the collection</span>
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="flex flex-col gap-6">
                  {lines.map((line) => (
                    <li key={line.key} className="flex gap-4">
                      <Link
                        href={`/products/${line.product.slug}`}
                        onClick={closeBag}
                        className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-ink-800"
                      >
                        <SmartImage
                          asset={line.product.images[0]}
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-3">
                          <Link
                            href={`/products/${line.product.slug}`}
                            onClick={closeBag}
                            className="text-sm leading-snug text-ivory transition-colors duration-500 hover:text-chrome"
                          >
                            {line.product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeLine(line.key)}
                            className="eyebrow text-[9px] text-ivory/40 transition-colors duration-500 hover:text-ivory"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="eyebrow text-[9px] text-ivory/45">
                          {line.colour} / {line.size}
                        </p>
                        <p className="text-xs text-chrome">{formatPrice(line.product)}</p>
                        <div className="mt-2 inline-flex items-center gap-4 border border-ivory/15 px-3 py-1.5 self-start">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.key, line.quantity - 1)}
                            aria-label={`Reduce quantity of ${line.product.name}`}
                            className="text-chrome transition-colors duration-300 hover:text-ivory"
                          >
                            <Minus className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
                          </button>
                          <span className="w-5 text-center text-xs tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.key, line.quantity + 1)}
                            aria-label={`Increase quantity of ${line.product.name}`}
                            className="text-chrome transition-colors duration-300 hover:text-ivory"
                          >
                            <Plus className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {lines.length > 0 ? (
              <footer className="border-t border-ivory/10 px-6 py-6">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow text-ivory/50">Subtotal</span>
                  <span className="text-sm text-ivory">
                    {priced
                      ? new Intl.NumberFormat("en-GB", {
                          style: "currency",
                          currency: "GBP",
                          maximumFractionDigits: 0,
                        }).format(total)
                      : "Price on request"}
                  </span>
                </div>
                <button type="button" disabled className="btn btn-solid mt-5 w-full">
                  <span>Checkout</span>
                </button>
                <p className="mt-4 text-[11px] leading-relaxed text-ivory/40">
                  Online checkout and payment are not connected to this build yet. To complete an
                  order, email{" "}
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-chrome underline decoration-chrome/40 underline-offset-4 transition-colors duration-300 hover:text-ivory"
                  >
                    {site.contact.email}
                  </a>
                  .
                </p>
              </footer>
            ) : null}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
