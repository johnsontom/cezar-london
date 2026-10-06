"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { Cursor } from "./Cursor";
import { PageIntro } from "./PageIntro";
import { ScrollProgress } from "./ScrollProgress";

/**
 * Global client providers.
 * MotionConfig honours the operating system's reduced-motion preference for
 * every Framer Motion animation across the site.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        {children}
        <CartDrawer />
        <Cursor />
        <ScrollProgress />
        <PageIntro />
      </CartProvider>
    </MotionConfig>
  );
}
