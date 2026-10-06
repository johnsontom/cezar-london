import type { ReactNode } from "react";
import type { ImageAsset } from "@/lib/images";
import { RevealLines } from "./Reveal";
import { SmartImage } from "./SmartImage";

type PageHeroProps = {
  eyebrow: string;
  titleLines: string[];
  description?: string;
  image: ImageAsset;
  objectPosition?: string;
  /** Short heroes suit utility pages, tall heroes suit editorial pages. */
  size?: "short" | "tall";
  children?: ReactNode;
  priority?: boolean;
};

export function PageHero({
  eyebrow,
  titleLines,
  description,
  image,
  objectPosition = "center 30%",
  size = "tall",
  children,
  priority = true,
}: PageHeroProps) {
  return (
    <section
      className="grain relative flex w-full items-end overflow-hidden bg-ink"
      style={{ minHeight: size === "tall" ? "78svh" : "56svh" }}
    >
      <div className="absolute inset-0">
        <SmartImage
          asset={image}
          priority={priority}
          quality={86}
          sizes="100vw"
          className="object-cover"
          objectPosition={objectPosition}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />

      <div className="shell relative z-10 w-full pb-14 pt-[calc(var(--nav-h)+4rem)] md:pb-20">
        <span className="eyebrow text-chrome">{eyebrow}</span>
        <h1 className="display mt-5 text-[14vw] leading-[0.88] text-ivory sm:text-[4.5rem] lg:text-[6rem]">
          <RevealLines lines={titleLines} />
        </h1>
        {description ? (
          <p className="mt-8 max-w-prose text-sm leading-relaxed text-ivory/60 md:text-[0.9375rem]">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
