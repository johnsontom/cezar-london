import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealLines } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  lines: string[];
  description?: string;
  link?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
  headingClassName?: string;
  /** Rendered on the <h2> so the owning section's aria-labelledby resolves. */
  headingId?: string;
};

export function SectionHeading({
  eyebrow,
  lines,
  description,
  link,
  align = "left",
  className = "",
  headingClassName = "text-[13vw] leading-[0.9] md:text-[6rem] lg:text-[7.5rem]",
  headingId,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-8 ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <div className={centered ? "flex flex-col items-center" : "max-w-4xl"}>
        <Reveal y={16}>
          <span className="eyebrow text-chrome">{eyebrow}</span>
        </Reveal>
        <h2 id={headingId} className={`display mt-6 text-ivory ${headingClassName}`}>
          <RevealLines lines={lines} />
        </h2>
        {description ? (
          <Reveal delay={0.15} y={20}>
            <p
              className={`mt-8 max-w-prose text-sm leading-relaxed text-ivory/55 md:text-[0.9375rem] ${
                centered ? "mx-auto" : ""
              }`}
            >
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>

      {link ? (
        <Reveal delay={0.2} y={20} className={centered ? "mt-2" : "shrink-0 md:pb-3"}>
          <Link
            href={link.href}
            className="link-underline eyebrow inline-flex items-center gap-2 text-ivory/75 transition-colors duration-500 hover:text-ivory"
          >
            {link.label}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
          </Link>
        </Reveal>
      ) : null}
    </div>
  );
}
