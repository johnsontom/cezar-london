import { blurData } from "./image-blur";

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

const make = (src: string, alt: string, width: number, height: number): ImageAsset => ({
  src,
  alt,
  width,
  height,
  blurDataURL: blurData[src],
});

/**
 * The supplied CEZAR LONDON photography.
 * Files live in /public/images and are used by next/image so they are served
 * as optimised AVIF/WebP at the correct size for every breakpoint.
 *
 * capriSet* are the product shots - one model, one garment per image.
 * colourGroup, groupTrio, carGroup and pinkDuo are campaign and lifestyle
 * shots used in the gallery rather than on a product card.
 */
export const images = {
  chromeLogo: make(
    "/images/cezar-chrome-logo.png",
    "The CEZAR LONDON chrome monogram emblem",
    1326,
    1022,
  ),
  chromeLogo3d: make(
    "/images/cezar-chrome-logo-3d.png",
    "The CEZAR LONDON chrome monogram emblem rendered in three dimensions",
    900,
    694,
  ),
  banner: make(
    "/images/cezar-banner.jpg",
    "Black and white CEZAR LONDON banner with the chrome CZ monogram between two models",
    2622,
    1206,
  ),

  /* ---- Product photography: one model, one garment ---- */
  beigeCapriSet: make(
    "/images/cezar-capri-set-beige.jpg",
    "CEZAR LONDON model in the beige Cezar Capri Set, zip jacket and cropped legging, against a studio wall",
    1040,
    1560,
  ),
  blackCapriSet: make(
    "/images/cezar-capri-set-black.jpg",
    "CEZAR LONDON model in the black Cezar Capri Set, zip jacket and cropped legging, against a studio wall",
    2481,
    3721,
  ),
  blueCapriSet: make(
    "/images/cezar-capri-set-blue.jpg",
    "CEZAR LONDON model in the pale blue Cezar Capri Set, zip jacket and cropped legging, against a studio wall",
    1066,
    1600,
  ),
  redCapriSet: make(
    "/images/cezar-capri-set-red.jpg",
    "CEZAR LONDON model in the red Cezar Capri Set, zip jacket and cropped legging, against a studio wall",
    3808,
    5712,
  ),
  pinkCapriSet: make(
    "/images/cezar-capri-set-pink.jpg",
    "CEZAR LONDON model in the blush pink Cezar Capri Set, zip jacket and cropped legging, against a studio wall",
    2730,
    4096,
  ),

  /* ---- Single-model lifestyle photography ---- */
  blackCar: make(
    "/images/cezar-black-car.jpg",
    "CEZAR LONDON model in the black Cezar Capri Set seated in a car at night",
    1040,
    1560,
  ),
  pinkLounge: make(
    "/images/cezar-capri-lounge.jpg",
    "CEZAR LONDON model in the blush pink Cezar Capri Set seated on a sofa at home",
    1066,
    1600,
  ),

  /* ---- Group and campaign photography ---- */
  colourGroup: make(
    "/images/cezar-colour-group.jpg",
    "Seven CEZAR LONDON models seated together wearing beige, black, blue, red and pink Cezar Capri Sets",
    1040,
    1560,
  ),
  groupTrio: make(
    "/images/cezar-group-trio.jpg",
    "Three CEZAR LONDON models seated together wearing black and red Cezar Capri Sets",
    1066,
    1600,
  ),
  carGroup: make(
    "/images/cezar-car-group.jpg",
    "Two CEZAR LONDON models in blush and beige Cezar Capri Sets in the back of a car at night",
    1040,
    1560,
  ),
  pinkDuo: make(
    "/images/cezar-pink-duo.jpg",
    "Two CEZAR LONDON models in blush pink Cezar Capri Sets seated on a sofa in a soft-lit interior",
    1066,
    1600,
  ),
  nightCampaign: make(
    "/images/cezar-night-campaign.jpg",
    "Two CEZAR LONDON models on a city balcony at night wearing blush and red Cezar Capri Sets",
    878,
    1560,
  ),
  nightRooftop: make(
    "/images/cezar-night-rooftop.jpg",
    "Three CEZAR LONDON models on a rooftop at night against the city skyline in blush and pale blue Cezar Capri Sets",
    1560,
    1040,
  ),
  nightBedroom: make(
    "/images/cezar-night-bedroom.jpg",
    "Two CEZAR LONDON models resting at night in blush Cezar Capri Sets beside a city window",
    1040,
    1560,
  ),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;