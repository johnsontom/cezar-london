import Image from "next/image";
import type { ImageAsset } from "@/lib/images";

type SmartImageProps = {
  asset: ImageAsset;
  /** Required: tells the browser which rendered size to download. */
  sizes: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  /** Override the art-directed focal point of the crop. */
  objectPosition?: string;
};

/**
 * Every campaign photograph on the site renders through this component so that
 * sizing, blur-up placeholders, lazy loading and alt text stay consistent.
 * The parent element owns the aspect ratio (the image uses fill).
 */
export function SmartImage({
  asset,
  sizes,
  className = "",
  priority = false,
  quality = 82,
  objectPosition,
}: SmartImageProps) {
  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      placeholder={asset.blurDataURL ? "blur" : "empty"}
      blurDataURL={asset.blurDataURL}
      className={className}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}
