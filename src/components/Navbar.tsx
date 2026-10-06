"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { primaryNav } from "@/lib/site";
import { BrandMark } from "./BrandMark";
import { MobileMenu } from "./MobileMenu";

const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function Navbar() {
  const pathname = usePathname();
  const { count, openBag, pulse } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] border-b transition-[background-color,border-color,backdrop-filter] duration-700 ease-editorial ${
          scrolled
            ? "border-ivory/10 bg-ink/75 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/60"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="shell-wide flex h-[var(--nav-h)] items-center justify-between gap-6">
          <BrandMark priority sizeClassName="h-8 lg:h-10" />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActivePath(pathname, item.href)}
                aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                className="link-underline eyebrow text-ivory/75 transition-colors duration-500 hover:text-ivory"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={openBag}
              className="group relative flex items-center gap-2 text-ivory transition-opacity duration-500 hover:opacity-75"
              aria-label={count > 0 ? `Open shopping bag, ${count} items` : "Open shopping bag"}
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.25} aria-hidden="true" />
              <span className="eyebrow hidden text-[10px] text-ivory/80 md:inline">Bag</span>
              {count > 0 ? (
                <motion.span
                  key={pulse}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: [0.4, 1.25, 1], opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[9px] font-medium leading-none text-ivory"
                >
                  {count}
                </motion.span>
              ) : null}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="relative flex h-6 w-7 flex-col items-end justify-center gap-[6px] lg:hidden"
            >
              <span className="h-px w-7 bg-ivory transition-transform duration-500 ease-editorial" />
              <span className="h-px w-4 bg-ivory transition-[width,transform] duration-500 ease-editorial" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
