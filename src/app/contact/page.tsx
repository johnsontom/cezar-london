import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact CEZAR LONDON for orders, sizing, press or partnerships. Every message reaches the studio directly.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        titleLines={["LET'S TALK."]}
        description="Orders, sizing, press or partnerships — send us a note and the studio will come back to you."
        image={images.pinkDuo}
        objectPosition="center 35%"
        size="short"
      />
      <ContactSection />
    </>
  );
}
