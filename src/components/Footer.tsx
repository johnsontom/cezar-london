import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";
import { InstagramIcon, TikTokIcon } from "./SocialIcons";

const shopLinks = [
  { label: "New In", href: "/new-in" },
  { label: "Collections", href: "/collections" },
  { label: "Women", href: "/collections/womens-collection" },
  { label: "Campaign", href: "/gallery" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Enquiries", href: "/contact#enquire" },
];

const legalLinks = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms & conditions", href: "/terms" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ivory/10 bg-ink-950">
      <div className="shell relative z-10 py-20 md:py-24">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Image
              src={images.chromeLogo.src}
              alt="CEZAR LONDON"
              width={images.chromeLogo.width}
              height={images.chromeLogo.height}
              sizes="180px"
              className="h-20 w-auto object-contain md:h-24"
            />
            <p className="display mt-8 max-w-sm text-2xl leading-[1.15] text-ivory/80">
              {site.tagline}
            </p>
            <div className="mt-10">
              <NewsletterForm />
            </div>
          </div>

          <nav aria-label="Shop" className="lg:col-span-3 lg:col-start-7">
            <h2 className="eyebrow text-ivory/40">Shop</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-ivory/70 transition-colors duration-500 hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="eyebrow text-ivory/40">Company</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-ivory/70 transition-colors duration-500 hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-ivory/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="eyebrow text-[9px] text-ivory/35">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="eyebrow text-[10px] text-ivory/35">
           <a
    href="https://jhnxncreativestudio.vercel.app"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-ivory transition-colors"
  >DESIGNED &amp; CREATED BY {"JHNXN "}</a>  
          </p>

          <div className="flex items-center gap-6">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-ivory/60 transition-colors duration-500 hover:text-ivory"
            >
              <InstagramIcon className="h-4 w-4" />
              <span className="eyebrow text-[9px]">Instagram</span>
            </a>
            <a
              href={site.social.tiktok}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-ivory/60 transition-colors duration-500 hover:text-ivory"
            >
              <TikTokIcon className="h-4 w-4" />
              <span className="eyebrow text-[9px]">TikTok</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline eyebrow text-[9px] text-ivory/45 transition-colors duration-500 hover:text-ivory"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-[10px] leading-relaxed text-ivory/25">
          {site.productNotice} Contact details, social handles and legal pages are
          placeholders ready to be replaced before launch.
        </p>
        
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none relative -mb-4 select-none overflow-hidden px-[var(--shell-x)]"
      >
        <span className="display block whitespace-nowrap text-[16vw] leading-[0.8] text-ivory/[0.045]">
          CEZAR LONDON
        </span>
      </div>
    </footer>
  );
}
