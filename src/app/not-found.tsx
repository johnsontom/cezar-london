import Link from "next/link";
import Image from "next/image";
import { images } from "@/lib/images";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-ink">
      <div className="absolute inset-0 opacity-45">
        <Image
          src={images.nightRooftop.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/60" />

      <div className="shell relative z-10 flex flex-col items-start gap-8 py-24">
        <span className="eyebrow text-chrome">Error 404</span>
        <h1 className="display text-[16vw] leading-[0.88] text-ivory sm:text-[6rem]">
          OFF THE
          <br />
          RUNWAY
        </h1>
        <p className="max-w-prose text-sm leading-relaxed text-ivory/55">
          The page you were looking for is no longer here. Return to the collection or
          explore the campaign.
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/collections" className="btn">
            <span>View the collections</span>
          </Link>
          <Link
            href="/"
            className="link-underline eyebrow text-ivory/65 transition-colors duration-500 hover:text-ivory"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
