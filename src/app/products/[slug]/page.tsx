import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { getProduct, products, productSlugs } from "@/lib/products";
import { site } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Piece not found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — ${site.name}`,
      description: product.description,
      images: [{ url: product.images[0].src }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.collectionSlug === product.collectionSlug && item.slug !== product.slug)
    .concat(products.filter((item) => item.slug !== product.slug))
    .slice(0, 3);

  return (
    <>
      <div className="bg-ink pt-[calc(var(--nav-h)+2rem)]">
        <nav aria-label="Breadcrumb" className="shell">
          <ol className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.26em] text-ivory/40">
            <li>
              <Link href="/" className="transition-colors duration-500 hover:text-ivory">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/collections"
                className="transition-colors duration-500 hover:text-ivory"
              >
                Collections
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/collections/${product.collectionSlug}`}
                className="transition-colors duration-500 hover:text-ivory"
              >
                {product.collectionLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ivory/70">{product.name}</li>
          </ol>
        </nav>
      </div>

      <section className="bg-ink py-12 md:py-16">
        <ProductDetail product={product} />
      </section>

      <section className="bg-ink-900 py-24 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Continue"
            lines={["YOU MAY ALSO LIKE"]}
            headingClassName="text-[10vw] leading-[0.9] md:text-[3.5rem] lg:text-[4.5rem]"
            className="mb-14"
          />
          <ProductGrid products={related} columns={3} />
        </div>
      </section>
    </>
  );
}
