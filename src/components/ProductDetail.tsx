"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { availabilityLabels, formatPrice, type Product } from "@/lib/products";
import { SmartImage } from "./SmartImage";
import { TiltFrame } from "./TiltFrame";

export function ProductDetail({ product }: { product: Product }) {
  const { addLine, openBag } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [colour, setColour] = useState(product.colours[0]?.name ?? "");
  const [size, setSize] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const handleAdd = () => {
    if (!size) {
      setNotice("Please select a size before adding to your bag.");
      return;
    }
    setNotice(null);
    addLine({ slug: product.slug, size, colour, quantity: 1 });
  };

  return (
    <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-800">
          <TiltFrame className="absolute inset-0" intensity={3}>
            <div className="relative h-full w-full">
              <SmartImage
                asset={product.images[activeImage]}
                priority
                quality={88}
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </div>
          </TiltFrame>
        </div>

        {product.images.length > 1 ? (
          <div className="mt-4 grid grid-cols-4 gap-3">
          {product.images.map((image, index) => (
            <button
              key={image.src + index}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1} of ${product.images.length}`}
              aria-current={activeImage === index}
              className={`relative aspect-[3/4] overflow-hidden bg-ink-800 transition-opacity duration-500 ${
                activeImage === index ? "opacity-100" : "opacity-55 hover:opacity-90"
              }`}
            >
              <SmartImage
                asset={image}
                sizes="(min-width: 1024px) 14vw, 24vw"
                className="object-cover"
              />
              {activeImage === index ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 border border-ivory/70"
                />
              ) : null}
            </button>
          ))}
          </div>
        ) : null}
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
          <Link
            href={`/collections/${product.collectionSlug}`}
            className="eyebrow inline-flex items-center gap-2 text-ivory/50 transition-colors duration-500 hover:text-ivory"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
            {product.collectionLabel} Collection
          </Link>

          <h1 className="display mt-6 text-[2.5rem] leading-[0.95] text-ivory md:text-[3.25rem]">
            {product.name}
          </h1>

          <div className="mt-5 flex items-center justify-between gap-6">
            <span className="text-sm text-ivory">{formatPrice(product)}</span>
            <span className="eyebrow text-[9px] text-ivory/45">
              {availabilityLabels[product.availability]}
            </span>
          </div>

          <p className="mt-7 max-w-prose text-sm leading-relaxed text-ivory/60">
            {product.description}
          </p>

          <div className="mt-10">
            <span className="eyebrow text-ivory/50">Colour — {colour}</span>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.colours.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setColour(option.name)}
                  aria-label={option.name}
                  aria-pressed={colour === option.name}
                  style={{ backgroundColor: option.hex }}
                  className={`h-8 w-8 rounded-full border transition-[border-color,transform] duration-500 ease-editorial ${
                    colour === option.name
                      ? "border-ivory"
                      : "border-ivory/25 hover:scale-105 hover:border-ivory/60"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-9">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-ivory/50">Size</span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-ivory/35">
                Sizes shown are placeholder
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSize(option);
                    setNotice(null);
                  }}
                  aria-pressed={size === option}
                  className={`min-w-[3.5rem] border px-4 py-3 text-[11px] tracking-[0.16em] transition-colors duration-500 ${
                    size === option
                      ? "border-ivory bg-ivory text-ink"
                      : "border-ivory/20 text-ivory/70 hover:border-ivory/60"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {notice ? (
            <p role="alert" className="mt-5 text-xs text-burgundy-500">
              {notice}
            </p>
          ) : null}

          <div className="mt-9 flex flex-col gap-3">
            <button type="button" onClick={handleAdd} className="btn btn-solid w-full">
              <span>Add to bag</span>
            </button>
            <button
              type="button"
              onClick={openBag}
              className="link-underline eyebrow self-center text-ivory/50 transition-colors duration-500 hover:text-ivory"
            >
              View bag
            </button>
          </div>

          <div className="mt-12 border-t border-ivory/10 pt-8">
            <h2 className="eyebrow text-ivory/50">Design details</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {product.details.map((detail) => (
                <li key={detail} className="flex items-start gap-3 text-sm text-ivory/60">
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-chrome"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                  {detail}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-prose text-[11px] leading-relaxed text-ivory/35">
              Full fabric composition, care instructions and current stock levels are
              available on request. Sizes and colourways shown are placeholder data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
