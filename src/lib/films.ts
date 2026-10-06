/**
 * The campaign films.
 * Source .MOV files live in /assets/source-videos and are transcoded to
 * web-friendly H.264 MP4 for the browser. Posters are first-frame stills so
 * the section reads correctly before the video buffers.
 */
export type FilmAsset = {
  src: string;
  poster: string;
  width: number;
  height: number;
  orientation: "portrait" | "landscape";
  title: string;
  label: string;
};

export const films = {
  rooftop: {
    src: "/video/cezar-film-rooftop.mp4",
    poster: "/video/cezar-film-rooftop-poster.jpg",
    width: 720,
    height: 1280,
    orientation: "portrait",
    title: "Campaign Set II - the rooftop reel",
    label: "CEZAR LONDON models on a rooftop at night",
  },
  car: {
    src: "/video/cezar-film-car.mp4",
    poster: "/video/cezar-film-car-poster.jpg",
    width: 1280,
    height: 720,
    orientation: "landscape",
    title: "Campaign Set III - the night drive",
    label: "CEZAR LONDON model in the black Cezar Capri Set in a car at night",
  },
} satisfies Record<string, FilmAsset>;

export type FilmKey = keyof typeof films;