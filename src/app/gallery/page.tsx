import type { Metadata } from "next";
import { CampaignGallery } from "@/components/CampaignGallery";
import { CampaignFilm } from "@/components/CampaignFilm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { gallery } from "@/lib/gallery";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Campaign",
  description:
    "The CEZAR LONDON campaign gallery — studio, interior and city-at-night photography featuring the full collection.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Campaign gallery"
        titleLines={["BEYOND THE", "ORDINARY"]}
        description="The full CEZAR campaign, photographed across the studio, the interior and the city after dark. Select any image to view it full screen."
        image={images.nightRooftop}
        objectPosition="center 30%"
      />

      <section className="bg-ink py-20 md:py-28">
        <div className="shell">
          <CampaignGallery items={gallery} />
        </div>
      </section>

      <CampaignFilm />

      <section className="border-t border-ivory/10 bg-ink-900 py-20 md:py-24">
        <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7" y={36}>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-800 sm:aspect-[16/9]">
              <SmartImage
                asset={images.nightBedroom}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                objectPosition="center 35%"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-4 lg:col-start-9">
            <span className="eyebrow text-chrome">Campaign set II</span>
            <p className="display mt-6 text-[1.75rem] leading-[1.15] text-ivory md:text-[2.25rem]">
              London, after dark.
            </p>
            <p className="mt-6 max-w-prose text-sm leading-relaxed text-ivory/50">
              Shot on location above the city with the full CEZAR line in ivory, blush and
              burgundy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
