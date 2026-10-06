"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { QuickView } from "./QuickView";

type ProductGridProps = {
  products: Product[];
  columns?: 2 | 3 | 4;
  sizes?: string;
  className?: string;
  showQuickView?: boolean;
};

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

const defaultSizes: Record<2 | 3 | 4, string> = {
  2: "(min-width: 640px) 48vw, 100vw",
  3: "(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw",
  4: "(min-width: 1024px) 23vw, 48vw",
};

export function ProductGrid({
  products,
  columns = 3,
  sizes,
  className = "",
  showQuickView = true,
}: ProductGridProps) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <>
      <div
        className={`grid grid-cols-1 gap-x-5 gap-y-14 ${columnClasses[columns]} ${className}`}
      >
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            sizes={sizes ?? defaultSizes[columns]}
            onQuickView={showQuickView ? setActiveProduct : undefined}
          />
        ))}
      </div>
      <QuickView product={activeProduct} onClose={() => setActiveProduct(null)} />
    </>
  );
}
