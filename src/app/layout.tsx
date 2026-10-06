import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Luxury Activewear & Contemporary Clothing`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "CEZAR LONDON",
    "luxury activewear",
    "contemporary fashion",
    "designer zip jacket",
    "cropped legging",
    "London fashion brand",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    images: [{ url: images.colourGroup.src, width: images.colourGroup.width, height: images.colourGroup.height, alt: images.colourGroup.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={fontVariables}>
      <body className="min-h-screen bg-ink font-sans text-ivory antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:border focus:border-ivory/40 focus:bg-ink focus:px-5 focus:py-3 focus:text-[10px] focus:uppercase focus:tracking-[0.3em] focus:text-ivory"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
