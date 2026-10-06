import Link from "next/link";
import { BrandStory } from "@/components/BrandStory";
import { CampaignGallery } from "@/components/CampaignGallery";
import { CampaignFilm } from "@/components/CampaignFilm";
import { CampaignSection } from "@/components/CampaignSection";
import { ChromeLogoReveal } from "@/components/ChromeLogoReveal";
import { CollectionShowcase } from "@/components/CollectionShowcase";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredProducts } from "@/lib/products";
import { site } from "@/lib/site";

const ticker = [
  "A NEW STANDARD OF MOVEMENT",
  "LONDON",
  "CONTEMPORARY DESIGN",
  "CEZAR",
  "DESIGNED TO MOVE",
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section aria-label="Brand statement" className="border-y border-ivory/10 bg-ink py-7">
        <Marquee items={ticker} srText={site.tagline} />
      </section>

      <CollectionShowcase />

      <ChromeLogoReveal />

      <section aria-labelledby="the-edit-heading" className="relative bg-ink-900 py-24 md:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow="Selected pieces"
            lines={["THE EDIT"]}
            description="A first look at the pieces shaping the CEZAR wardrobe — cut to move, finished to last."
            link={{ label: "Shop new in", href: "/new-in" }}
            headingClassName="text-[16vw] leading-[0.88] md:text-[7rem] lg:text-[9rem]"
            className="mb-16 md:mb-20"
            headingId="the-edit-heading"
          />

          <ProductGrid products={featuredProducts.slice(0, 4)} columns={4} />

          <Reveal delay={0.1} y={20} className="mt-14">
            <p className="max-w-prose text-[11px] leading-relaxed text-ivory/30">
              {site.productNotice}
            </p>
          </Reveal>
        </div>
      </section>

      <CampaignSection />

      <CampaignFilm />

      <BrandStory />

      <section aria-labelledby="gallery-preview-heading" className="relative bg-ink py-24 md:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow="Campaign gallery"
            lines={["THE CAMPAIGN"]}
            description="Photographed across the studio, the interior and the city at night — the CEZAR campaign in full."
            link={{ label: "Open the gallery", href: "/gallery" }}
            className="mb-14 md:mb-20"
            headingClassName="text-[12vw] leading-[0.9] md:text-[5.5rem] lg:text-[6.5rem]"
            headingId="gallery-preview-heading"
          />

          <CampaignGallery compact />

          <Reveal delay={0.1} y={20} className="mt-14">
            <Link href="/gallery" className="btn">
              <span>View full campaign</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactSection compact />
    </>
  );
}
