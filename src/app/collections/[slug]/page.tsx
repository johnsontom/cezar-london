import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { collectionSlugs, collections, getCollection } from "@/lib/collections";
import { productsByCollection } from "@/lib/products";
import { site } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collectionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection not found" };

  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      title: `${collection.name} — ${site.name}`,
      description: collection.description,
      images: [{ url: collection.hero.src }],
    },
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const index = collections.findIndex((item) => item.slug === collection.slug);
  const next = collections[(index + 1) % collections.length];
  const items = productsByCollection(collection.slug);

  return (
    <>
      <PageHero
        eyebrow={`Collection ${collection.number} — ${collection.tagline}`}
        titleLines={[collection.shortName.toUpperCase()]}
        description={collection.description}
        image={collection.hero}
        objectPosition="center 26%"
      >
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link href="#pieces" className="btn">
            <span>View the pieces</span>
          </Link>
          <Link
            href="/contact#enquire"
            className="link-underline eyebrow inline-flex items-center gap-2 text-ivory/70 transition-colors duration-500 hover:text-ivory"
          >
            Enquire about this collection
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
          </Link>
        </div>
      </PageHero>

      <section id="pieces" className="bg-ink py-24 md:py-32">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="display text-[2.25rem] leading-[0.95] text-ivory md:text-[3.25rem]">
              {collection.name}
            </h2>
            <p className="eyebrow text-ivory/40">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </p>
          </div>

          <div className="mt-14">
            {items.length > 0 ? (
              <ProductGrid products={items} columns={3} />
            ) : (
              <p className="text-sm text-ivory/50">
                Pieces for this collection are being added. Enquire and we will send the
                full line sheet.
              </p>
            )}
          </div>

          <Reveal delay={0.1} y={20} className="mt-14">
            <p className="max-w-prose text-[11px] leading-relaxed text-ivory/30">
              {site.productNotice}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ivory/10 bg-ink-900 py-20 md:py-24">
        <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow text-chrome">Next collection</span>
            <h2 className="display mt-5 text-[2.5rem] leading-[0.95] text-ivory md:text-[4rem]">
              {next.name}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
            <Link href={`/collections/${next.slug}`} className="btn">
              <span>Explore {next.shortName}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
