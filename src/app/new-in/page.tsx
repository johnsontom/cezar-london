import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { newArrivals, products } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "New In",
  description:
    "The newest CEZAR LONDON pieces — the latest additions to the Signature, Essential and Movement collections.",
};

export default function NewInPage() {
  const items = newArrivals.length > 0 ? newArrivals : products.slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Just arrived"
        titleLines={["NEW IN"]}
        description="The latest additions to the CEZAR wardrobe, photographed as part of the current campaign."
        image={images.nightCampaign}
        objectPosition="center 28%"
        size="short"
      />

      <section className="bg-ink py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="display text-[2.25rem] leading-[0.95] text-ivory md:text-[3rem]">
              The latest pieces
            </h2>
            <Link
              href="/collections"
              className="link-underline eyebrow text-ivory/60 transition-colors duration-500 hover:text-ivory"
            >
              Browse all collections
            </Link>
          </div>

          <div className="mt-14">
            <ProductGrid products={items} columns={4} />
          </div>

          <Reveal delay={0.1} y={20} className="mt-14">
            <p className="max-w-prose text-[11px] leading-relaxed text-ivory/30">
              {site.productNotice}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ivory/10 bg-ink-900 py-20 md:py-24">
        <div className="shell flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="display max-w-2xl text-[2rem] leading-[1.05] text-ivory md:text-[2.75rem]">
            Looking for something specific?
          </h2>
          <Link href="/contact#enquire" className="btn">
            <span>Enquire with the studio</span>
          </Link>
        </div>
      </section>
    </>
  );
}
