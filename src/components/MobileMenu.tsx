"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MessageCircle, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { images } from "@/lib/images";
import { ease } from "@/lib/motion";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { overlayNav, site } from "@/lib/site";
import { SmartImage } from "./SmartImage";
import { InstagramIcon, TikTokIcon } from "./SocialIcons";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[110] flex flex-col bg-ink lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.8, ease: ease.editorial }}
        >
          <div className="shell flex h-[var(--nav-h)] shrink-0 items-center justify-between">
            <span className="eyebrow text-ivory">CEZAR LONDON</span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="text-chrome transition-colors duration-500 hover:text-ivory"
            >
              <X className="h-6 w-6" strokeWidth={1.1} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex-1 overflow-y-auto">
            <nav aria-label="Mobile" className="shell flex flex-col gap-1 pt-8">
              {overlayNav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: ease.editorial, delay: 0.18 + index * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="display block border-b border-ivory/10 py-5 text-[13vw] leading-[1.05] text-ivory transition-colors duration-500 hover:text-chrome xs:text-[2.75rem]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="shell mt-12 grid grid-cols-2 gap-6 pb-16">
              <div className="col-span-2 flex flex-wrap items-center gap-6">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="eyebrow inline-flex items-center gap-2 text-ivory/70 transition-colors duration-500 hover:text-ivory"
                >
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
                  Email
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="eyebrow inline-flex items-center gap-2 text-ivory/70 transition-colors duration-500 hover:text-ivory"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                  Instagram
                </a>
                <a
                  href={site.social.tiktok}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="eyebrow inline-flex items-center gap-2 text-ivory/70 transition-colors duration-500 hover:text-ivory"
                >
                  <TikTokIcon className="h-3.5 w-3.5" />
                  TikTok
                </a>
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="eyebrow inline-flex items-center gap-2 text-ivory/70 transition-colors duration-500 hover:text-ivory"
                >
                  <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
                  WhatsApp
                </a>
              </div>

              <div className="relative col-span-2 mt-4 aspect-[16/10] overflow-hidden bg-ink-800">
                <SmartImage
                  asset={images.nightRooftop}
                  sizes="100vw"
                  className="object-cover"
                  objectPosition="center 35%"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
