/**
 * ---------------------------------------------------------------------------
 * EDITABLE PLACEHOLDER CONTENT
 * ---------------------------------------------------------------------------
 * Contact details, social handles and legal copy below are placeholders.
 * Replace them with the brand's real information before launch.
 */

export const site = {
  name: "CEZAR LONDON",
  shortName: "CEZAR",
  tagline: "A NEW STANDARD OF MOVEMENT.",
  statement:
    "Designed for movement. Defined by individuality. Inspired by the confidence to be different.",
  description:
    "CEZAR LONDON is a contemporary fashion house creating luxury activewear and lifestyle clothing for those who express themselves through every detail.",
  url: "https://www.cezarlondon.com",

  contact: {
    email: "hello@cezarlondon.com",
    businessEmail: "studio@cezarlondon.com",
    whatsappLabel: "+44 0000 000000",
    whatsappUrl: "https://wa.me/440000000000",
    location: "London, United Kingdom",
  },

  social: {
    instagram: "https://www.instagram.com/cezarlondon",
    tiktok: "https://www.tiktok.com/@cezarlondon",
  },

  /** Shown wherever product data is still placeholder content. */
  productNotice:
    "Pricing, colours, sizes and availability shown here are placeholder content ready to be replaced with the brand's final catalogue data.",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "New In", href: "/new-in" },
  { label: "Collections", href: "/collections" },
  { label: "Women", href: "/collections/womens-collection" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const overlayNav: NavItem[] = [
  { label: "New In", href: "/new-in" },
  { label: "Collections", href: "/collections" },
  { label: "Women", href: "/collections/womens-collection" },
  { label: "Campaign", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
