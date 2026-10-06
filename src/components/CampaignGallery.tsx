"use client";

import { useRef, useState } from "react";
import { gallery as allGallery, type GalleryItem } from "@/lib/gallery";
import { Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";
import { SmartImage } from "./SmartImage";

type CampaignGalleryProps = {
  items?: GalleryItem[];
  /** Renders a tighter editorial preview for the homepage. */
  compact?: boolean;
  className?: string;
};

const weightToAspect: Record<GalleryItem["weight"], string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  standard: "aspect-[4/5]",
};

export function CampaignGallery({
  items = allGallery,
  compact = false,
  className = "",
}: CampaignGalleryProps) {
  const shortlist = compact ? items.slice(0, 5) : items;
  const [index, setIndex] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    setIndex(null);
    lastTrigger.current?.focus();
  };

  return (
    <>
      <div
        className={`columns-1 gap-5 sm:columns-2 lg:columns-3 ${className}`}
      >
        {shortlist.map((item, itemIndex) => (
          <Reveal
            key={item.id}
            className="mb-5 break-inside-avoid"
            y={36}
            delay={(itemIndex % 3) * 0.06}
          >
            <button
              type="button"
              onClick={(event) => {
                lastTrigger.current = event.currentTarget;
                setIndex(itemIndex);
              }}
              data-cursor
              data-cursor-label="View"
              aria-label={`Open image: ${item.caption}`}
              className="group relative block w-full overflow-hidden bg-ink-800"
            >
              <div className={`relative w-full ${weightToAspect[item.weight]}`}>
                <div className="absolute inset-0 transition-transform duration-[1600ms] ease-editorial group-hover:scale-[1.04]">
                  <SmartImage
                    asset={item}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-0 transition-opacity duration-700 ease-editorial group-hover:opacity-100 group-focus-visible:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-left opacity-0 transition-all duration-700 ease-editorial group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <p className="text-sm text-ivory">{item.caption}</p>
                  <p className="eyebrow mt-1.5 text-[9px] text-ivory/50">{item.location}</p>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox items={shortlist} index={index} onClose={close} onIndexChange={setIndex} />
    </>
  );
}
