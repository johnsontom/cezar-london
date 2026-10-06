import { images, type ImageAsset } from "./images";

export type GalleryItem = ImageAsset & {
  id: string;
  /** Caption copy is proposed editorial text and is fully editable. */
  caption: string;
  location: string;
  orientation: "portrait" | "landscape" | "square";
  /** Editorial grid weight used by the masonry layout. */
  weight: "tall" | "wide" | "standard";
};

/**
 * The campaign gallery holds the group and lifestyle photography.
 * Single-model product shots live on the product pages instead.
 */
export const gallery: GalleryItem[] = [
  {
    id: "colour-group",
    ...images.colourGroup,
    caption: "The full range, seated",
    location: "Campaign Set I",
    orientation: "portrait",
    weight: "tall",
  },
  {
    id: "night-rooftop",
    ...images.nightRooftop,
    caption: "Rooftop, after dark",
    location: "Campaign Set II",
    orientation: "landscape",
    weight: "wide",
  },
  {
    id: "group-trio",
    ...images.groupTrio,
    caption: "Three of a kind",
    location: "Campaign Set I",
    orientation: "portrait",
    weight: "standard",
  },
  {
    id: "black-car",
    ...images.blackCar,
    caption: "Black, after hours",
    location: "Studio & street",
    orientation: "portrait",
    weight: "standard",
  },
  {
    id: "pink-lounge",
    ...images.pinkLounge,
    caption: "Blush, at home",
    location: "Interior",
    orientation: "portrait",
    weight: "standard",
  },
  {
    id: "night-campaign",
    ...images.nightCampaign,
    caption: "At the edge of the city",
    location: "Campaign Set II",
    orientation: "portrait",
    weight: "tall",
  },
  {
     id: "night-Black",
    ...images.nightBlack,
    caption: "Clock it",
    location: "Campaign Set ",
    orientation: "portrait",
    weight: "tall",
  },
  {
     id: "group-Black",
    ...images.groupBlack,
    caption: "Group capri set",
    location: "Campaign Set Group",
    orientation: "portrait",
    weight: "tall",
  },
  {
    id: "car-group",
    ...images.carGroup,
    caption: "Night drive",
    location: "Campaign Set III",
    orientation: "portrait",
    weight: "standard",
  },
  {
    id: "pink-duo",
    ...images.pinkDuo,
    caption: "Two of a kind",
    location: "Interior",
    orientation: "portrait",
    weight: "standard",
  },
  {
    id: "night-bedroom",
    ...images.nightBedroom,
    caption: "Late light",
    location: "Interior",
    orientation: "portrait",
    weight: "standard",
  },
  {
    id: "banner",
    ...images.banner,
    caption: "The mark",
    location: "Campaign",
    orientation: "landscape",
    weight: "wide",
  },
];