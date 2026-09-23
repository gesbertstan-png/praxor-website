import { IMAGES, srcSet, type ImageKey } from "../../lib/images";

type PictureProps = {
  image: ImageKey;
  sizes: string;
  priority?: boolean;
  alt?: string;
  position?: string;
};

/** Responsive AVIF/WebP picture with intrinsic size (no layout shift) and a tone-matched backdrop. */
export function Picture({ image, sizes, priority = false, alt, position }: PictureProps) {
  const meta = IMAGES[image];
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(image, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(image, "webp")} sizes={sizes} />
      <img
        src={`/images/${image}-${meta.widths[1]}.webp`}
        width={meta.width}
        height={meta.height}
        alt={alt ?? meta.alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        style={{ backgroundColor: meta.color, objectPosition: position }}
      />
    </picture>
  );
}
