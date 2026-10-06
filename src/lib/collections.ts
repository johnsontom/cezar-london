import { images, type ImageAsset } from "./images";

export type CollectionSlug =
  | "signature-collection"
  | "essential-collection"
  | "movement-collection"
  | "womens-collection";

export type Collection = {
  slug: CollectionSlug;
  /** Display categories proposed for the brand - easy to rename or replace. */
  name: string;
  shortName: string;
  number: string;
  tagline: string;
  description: string;
  hero: ImageAsset;
  portrait: ImageAsset;
  accent: ImageAsset;
  productSlugs: string[];
};

export const collections: Collection[] = [
  {
    slug: "signature-collection",
    name: "The Signature Collection",
    shortName: "Signature",
    number: "01",
    tagline: "THE HOUSE SILHOUETTE",
    description:
      "The defining CEZAR line. Considered tailoring in a second-skin handle, built around the sculpted jacket and cropped legging that hold their shape from the studio to the street.",
    hero: images.blackCapriSet,
    portrait: images.nightRooftop,
    accent: images.colourGroup,
    productSlugs: ["black-cezar-capri-set"],
  },
  {
    slug: "essential-collection",
    name: "The Essential Collection",
    shortName: "Essential",
    number: "02",
    tagline: "THE EVERYDAY FOUNDATION",
    description:
      "Quiet, precise pieces made to layer, travel and live in. Refined enough to wear long after the workout has finished, and simple enough to become the foundation of everything else.",
    hero: images.beigeCapriSet,
    portrait: images.pinkCapriSet,
    accent: images.pinkDuo,
    productSlugs: ["beige-cezar-capri-set"],
  },
  {
    slug: "movement-collection",
    name: "The Movement Collection",
    shortName: "Movement",
    number: "03",
    tagline: "BUILT FOR MOTION",
    description:
      "Compression-led construction with contoured seaming that follows the body through every direction of travel. Designed to disappear once it is on.",
    hero: images.blueCapriSet,
    portrait: images.nightBedroom,
    accent: images.nightRooftop,
    productSlugs: ["blue-cezar-capri-set"],
  },
  {
    slug: "womens-collection",
    name: "The Women's Collection",
    shortName: "Women",
    number: "04",
    tagline: "STRENGTH IN SOFTNESS",
    description:
      "The CEZAR wardrobe for women. Strength and softness drawn into the same line, with sculpted shapes cut for presence and finished with restraint.",
    hero: images.redCapriSet,
    portrait: images.nightCampaign,
    accent: images.groupTrio,
    productSlugs: ["red-cezar-capri-set", "pink-cezar-capri-set"],
  },
];

export const getCollection = (slug: string): Collection | undefined =>
  collections.find((collection) => collection.slug === slug);

export const collectionSlugs = collections.map((collection) => collection.slug);