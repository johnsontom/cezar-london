import type { ReactNode } from "react";
import { site } from "@/lib/site";

export type LegalSection = {
  heading: string;
  body: ReactNode;
};

/**
 * Shared shell for the legal pages.
 * The copy is placeholder material that must be reviewed by the brand's legal
 * adviser before launch — it is deliberately explicit about that.
 */
export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <header className="bg-ink pb-14 pt-[calc(var(--nav-h)+5rem)]">
        <div className="shell">
          <span className="eyebrow text-chrome">{eyebrow}</span>
          <h1 className="display mt-5 text-[14vw] leading-[0.9] text-ivory sm:text-[4rem] lg:text-[5rem]">
            {title}
          </h1>
          <p className="mt-6 text-[11px] uppercase tracking-[0.26em] text-ivory/35">
            Last updated {updated}
          </p>
        </div>
      </header>

      <section className="border-t border-ivory/10 bg-ink pb-24 pt-14 md:pb-32">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-12">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="display text-[1.5rem] text-ivory md:text-[1.875rem]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-ivory/55">
                    {section.body}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-ivory/12 p-6">
              <h2 className="eyebrow text-ivory/50">Placeholder notice</h2>
              <p className="mt-4 text-sm leading-relaxed text-ivory/50">
                This page contains placeholder legal copy prepared for design purposes. It
                must be reviewed and replaced by the brand&apos;s legal adviser before the
                site is published.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ivory/50">
                Questions can be sent to{" "}
                <a
                  href={`mailto:${site.contact.businessEmail}`}
                  className="text-chrome underline decoration-chrome/40 underline-offset-4"
                >
                  {site.contact.businessEmail}
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
