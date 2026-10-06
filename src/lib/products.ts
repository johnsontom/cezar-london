import { images, type ImageAsset } from "./images";
import type { CollectionSlug } from "./collections";

/**
 * ---------------------------------------------------------------------------
 * PRODUCT DATA
 * ---------------------------------------------------------------------------
 * The range is one silhouette - the Cezar Capri Set, a zip-through jacket and
 * matching cropped legging - shown here in each of its colourways. Every
 * product carries a single studio image of the model wearing that set, so a
 * product card never mixes group campaign photography into the shop.
 *
 * Pricing, fabric composition and stock levels have not been supplied by the
 * brand, so none have been invented. Every product reports
 * `availability: "on-request"` and renders "Price on request" until real data
 * is added.
 *
 * Every field is intentionally plain data so it can be swapped for a CMS,
 * Shopify or custom commerce API without touching the components.
 */

export type ColourOption = {
  name: string;
  hex: string;
};

export type ProductAvailability = "available" | "on-request" | "coming-soon";

export type Product = {
  slug: string;
  name: string;
  collectionSlug: CollectionSlug;
  collectionLabel: string;
  category: string;
  /** Optional. Left undefined while the brand confirms pricing. */
  priceGBP?: number;
  colours: ColourOption[];
  sizes: string[];
  availability: ProductAvailability;
  description: string;
  /** Design details that read directly from the campaign photography. */
  details: string[];
  images: ImageAsset[];
  isNew?: boolean;
  featured?: boolean;
};

export const availabilityLabels: Record<ProductAvailability, string> = {
  available: "Available now",
  "on-request": "Availability on request",
  "coming-soon": "Arriving soon",
};

const COLOURS = {
  beige: { name: "Beige", hex: "#D9C4B0" },
  black: { name: "Black", hex: "#0B0B0B" },
  blue: { name: "Blue", hex: "#CBDDE0" },
  red: { name: "Red", hex: "#B01622" },
  pink: { name: "Pink", hex: "#E7C9CE" },
} satisfies Record<string, ColourOption>;

export const standardSizes = ["XS", "S", "M", "L", "XL"];

const DETAILS = [
  "Zip-through jacket with a stand collar",
  "Sculpted, waisted body with contoured seam",
  "Matching high-rise cropped legging",
  "Tonal CEZAR logo at the chest",
  "Four-way stretch, second-skin handle",
];

export const products: Product[] = [
  {
    slug: "beige-cezar-capri-set",
    name: "Beige Cezar Capri Set",
    collectionSlug: "essential-collection",
    collectionLabel: "Essential",
    category: "Capri Set",
    colours: [COLOURS.beige, COLOURS.black, COLOURS.blue, COLOURS.red, COLOURS.pink],
    sizes: standardSizes,
    availability: "on-request",
    description:
      "The Cezar Capri Set in beige. A sculpted, zip-through jacket with a stand collar and tonal CEZAR logo, cut to hold the waist, paired with a matching high-rise cropped legging.",
    details: DETAILS,
    images: [images.beigeCapriSet],
    featured: true,
  },
  {
    slug: "black-cezar-capri-set",
    name: "Black Cezar Capri Set",
    collectionSlug: "signature-collection",
    collectionLabel: "Signature",
    category: "Capri Set",
    colours: [COLOURS.black, COLOURS.beige, COLOURS.blue, COLOURS.red, COLOURS.pink],
    sizes: standardSizes,
    availability: "on-request",
    description:
      "The Cezar Capri Set in black. The defining CEZAR silhouette - a second-skin zip jacket with a sculpted waist and contoured sleeve, matched to the high-rise cropped legging.",
    details: DETAILS,
    images: [images.blackCapriSet],
    isNew: true,
    featured: true,
  },
  {
    slug: "blue-cezar-capri-set",
    name: "Blue Cezar Capri Set",
    collectionSlug: "movement-collection",
    collectionLabel: "Movement",
    category: "Capri Set",
    colours: [COLOURS.blue, COLOURS.beige, COLOURS.black, COLOURS.red, COLOURS.pink],
    sizes: standardSizes,
    availability: "on-request",
    description:
      "The Cezar Capri Set in pale blue. Built to follow movement rather than resist it, with a deep V opening at the collar and a clean, uninterrupted line through the leg.",
    details: DETAILS,
    images: [images.blueCapriSet],
    isNew: true,
    featured: true,
  },
  {
    slug: "red-cezar-capri-set",
    name: "Red Cezar Capri Set",
    collectionSlug: "womens-collection",
    collectionLabel: "Women",
    category: "Capri Set",
    colours: [COLOURS.red, COLOURS.beige, COLOURS.black, COLOURS.blue, COLOURS.pink],
    sizes: standardSizes,
    availability: "on-request",
    description:
      "The Cezar Capri Set in red. A considered, sculpted line in a saturated colourway - soft through the shoulder, corseted through the waist, finished with the tonal CEZAR logo.",
    details: DETAILS,
    images: [images.redCapriSet],
    featured: true,
  },
  {
    slug: "pink-cezar-capri-set",
    name: "Pink Cezar Capri Set",
    collectionSlug: "womens-collection",
    collectionLabel: "Women",
    category: "Capri Set",
    colours: [COLOURS.pink, COLOURS.beige, COLOURS.black, COLOURS.blue, COLOURS.red],
    sizes: standardSizes,
    availability: "on-request",
    description:
      "The Cezar Capri Set in blush pink. The CEZAR line softened - a zip-through jacket and cropped leg in a soft-touch handle that moves from the studio to the rest of the day.",
    details: DETAILS,
    images: [images.pinkCapriSet],
    isNew: true,
    featured: true,
  },
];

export const getProduct = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug);

export const productSlugs = products.map((product) => product.slug);

export const productsByCollection = (slug: CollectionSlug): Product[] =>
  products.filter((product) => product.collectionSlug === slug);

export const newArrivals = products.filter((product) => product.isNew);

export const featuredProducts = products.filter((product) => product.featured);

export const formatPrice = (product: Product): string =>
  typeof product.priceGBP === "number"
    ? new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
      }).format(product.priceGBP)
    : "Price on request";