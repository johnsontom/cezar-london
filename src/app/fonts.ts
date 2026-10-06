import { Cormorant_Garamond, Manrope } from "next/font/google";

/**
 * High-fashion serif for editorial headlines.
 * Paired with a precise geometric sans for navigation, product and body copy.
 */
export const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Cormorant Garamond", "Times New Roman", "serif"],
});

export const sansFont = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const fontVariables = `${displayFont.variable} ${sansFont.variable}`;
