import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How CEZAR LONDON handles personal information collected through this website.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="PRIVACY POLICY"
      updated="October 2026"
      sections={[
        {
          heading: "What this policy covers",
          body: (
            <p>
              This policy explains how {site.name} handles personal information submitted
              through this website. It describes what the site does today and marks clearly
              where further detail is required from the business.
            </p>
          ),
        },
        {
          heading: "Information we collect",
          body: (
            <>
              <p>
                The site collects the information you choose to provide through the contact
                form: your name, email address and message. It also collects an email
                address if you subscribe to the newsletter.
              </p>
              <p>
                The shopping bag is stored locally in your own browser so it is still there
                when you return. That data never leaves your device.
              </p>
            </>
          ),
        },
        {
          heading: "How information is used",
          body: (
            <p>
              Information you submit is used only to respond to your enquiry or to send the
              newsletter you asked for. It is not sold, and it is not used for advertising.
            </p>
          ),
        },
        {
          heading: "Third parties and cookies",
          body: (
            <>
              <p>
                This build does not set advertising or analytics cookies. If analytics,
                payment providers or marketing tools are added later, this section must be
                updated with the providers used, what they collect and the lawful basis for
                processing.
              </p>
              <p>
                The newsletter and contact forms only transmit data to a destination once one
                has been configured by the business. Until then, nothing is stored or sent.
              </p>
            </>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              You can ask to see, correct or delete the personal information we hold about
              you, and you can unsubscribe from the newsletter at any time. Requests can be
              sent to{" "}
              <a
                href={`mailto:${site.contact.businessEmail}`}
                className="text-chrome underline decoration-chrome/40 underline-offset-4"
              >
                {site.contact.businessEmail}
              </a>
              .
            </p>
          ),
        },
        {
          heading: "Retention and contact",
          body: (
            <p>
              Enquiries are kept only as long as needed to deal with your request and any
              follow-up. The retention period, the registered company details and the data
              protection contact must be confirmed by the business before launch.
            </p>
          ),
        },
      ]}
    />
  );
}
