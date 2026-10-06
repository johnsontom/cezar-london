import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that apply to the use of the CEZAR LONDON website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="TERMS & CONDITIONS"
      updated="October 2026"
      sections={[
        {
          heading: "Use of this website",
          body: (
            <p>
              By using this website you agree to these terms. The content, design and
              photography are owned by {site.name} and may not be reproduced without
              permission.
            </p>
          ),
        },
        {
          heading: "Product information",
          body: (
            <>
              <p>
                Product names, colourways, sizes and availability shown on this website are
                placeholder content prepared for design purposes. They will be replaced with
                the brand&apos;s confirmed catalogue data.
              </p>
              <p>
                Colour reproduction varies between screens. Final colour, composition and
                finish are confirmed on the physical garment.
              </p>
            </>
          ),
        },
        {
          heading: "Orders and payment",
          body: (
            <p>
              Online checkout is not enabled in this build. Adding an item to the bag does
              not create an order and no payment is taken. Orders are placed by contacting
              the studio directly until a payment provider is connected.
            </p>
          ),
        },
        {
          heading: "Shipping, returns and exchanges",
          body: (
            <p>
              Shipping destinations, delivery times, return windows and exchange conditions
              have not been supplied by the business and are therefore not stated here. They
              must be added before the site goes live.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              The website is provided as is. The business is not liable for indirect losses
              arising from use of the site, to the extent permitted by law. Nothing here
              limits rights you have under consumer law.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: (
            <p>
              The governing law, registered company number and registered office must be
              confirmed by the business and added to this section before launch.
            </p>
          ),
        },
      ]}
    />
  );
}
