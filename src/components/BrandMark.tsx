import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";

type BrandMarkProps = {
  className?: string;
  /** Tailwind size classes for the emblem. */
  sizeClassName?: string;
  withWordmark?: boolean;
  priority?: boolean;
};

/**
 * The official CEZAR chrome emblem, used exactly as supplied and never
 * redrawn or distorted. The adjacent wordmark is set in type, not a logo.
 */
export function BrandMark({
  className = "",
  sizeClassName = "h-9 lg:h-11",
  withWordmark = true,
  priority = false,
}: BrandMarkProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 transition-opacity duration-500 hover:opacity-80 ${className}`}
    >
      <Image
        src={images.chromeLogo.src}
        alt=""
        aria-hidden="true"
        width={images.chromeLogo.width}
        height={images.chromeLogo.height}
        priority={priority}
        sizes="120px"
        className={`${sizeClassName} w-auto shrink-0 object-contain`}
      />
      {withWordmark ? (
        <span className="eyebrow whitespace-nowrap text-[10px] leading-none text-ivory">
          CEZAR LONDON
        </span>
      ) : null}
    </Link>
  );
}
