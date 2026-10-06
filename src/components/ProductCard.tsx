"use client";

import Link from "next/link";
import { availabilityLabels, formatPrice, type Product } from "@/lib/products";
import { SmartImage } from "./SmartImage";

type ProductCardProps = {
  product: Product;
  sizes?: string;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
};

export function ProductCard({
  product,
  sizes = "(min-width: 1280px) 24vw, (min-width: 768px) 33vw, 100vw",
  onQuickView,
  priority = false,
}: ProductCardProps) {
  const [primary, secondary] = product.images;

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative block overflow-hidden bg-ink-800"
        aria-label={`${product.name}, ${product.collectionLabel} Collection`}
      >
        <div className="relative aspect-[3/4] w-full">
          <div className="absolute inset-0 transition-transform duration-[1600ms] ease-editorial group-hover:scale-[1.05]">
            <SmartImage
              asset={primary}
              sizes={sizes}
              priority={priority}
              className="object-cover"
            />
          </div>
          {secondary ? (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-[1100ms] ease-editorial group-hover:opacity-100">
              <SmartImage asset={secondary} sizes={sizes} className="object-cover" />
            </div>
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-70" />
        </div>

        {product.isNew ? (
          <span className="absolute left-4 top-4 border border-ivory/30 bg-ink/50 px-2.5 py-1 text-[9px] uppercase tracking-[0.3em] text-ivory backdrop-blur-sm">
            New
          </span>
        ) : null}
      </Link>

      {onQuickView ? (
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute bottom-[calc(25%+1rem)] left-1/2 z-10 hidden -translate-x-1/2 border border-ivory/40 bg-ink/60 px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] text-ivory backdrop-blur-md transition-all duration-500 ease-editorial hover:bg-ivory hover:text-ink md:block lg:opacity-0 lg:group-hover:opacity-100"
        >
          Quick view
        </button>
      ) : null}

      <div className="mt-5 flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-sm leading-snug text-ivory">
            <Link
              href={`/products/${product.slug}`}
              className="transition-colors duration-500 hover:text-chrome"
            >
              {product.name}
            </Link>
          </h3>
          <span className="shrink-0 text-xs text-chrome">{formatPrice(product)}</span>
        </div>

        <p className="eyebrow text-[9px] text-ivory/40">
          {product.collectionLabel} — {product.category}
        </p>

        <div className="mt-1 flex items-center gap-2">
          {product.colours.slice(0, 5).map((colour) => (
            <span
              key={colour.name}
              title={colour.name}
              style={{ backgroundColor: colour.hex }}
              className="h-3 w-3 rounded-full border border-ivory/25"
            />
          ))}
          <span className="ml-1 text-[10px] text-ivory/35">
            {product.colours.length} colours
          </span>
        </div>

        <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-ivory/30">
          {availabilityLabels[product.availability]}
        </p>
      </div>
    </article>
  );
}
