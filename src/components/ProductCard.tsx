import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  price?: string;
  imageSrc: string;
  secondaryImageSrc?: string;
  href?: string;
};

export default function ProductCard({
  title,
  subtitle,
  price,
  imageSrc,
  secondaryImageSrc,
  href,
}: Props) {
  const content = (
    <article className="card space-y-3">
      <div className="media-hover media-frame rounded-sm relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          width={1200}
          height={1500}
          className="w-full h-auto transition-opacity duration-300"
          priority={false}
        />
        {secondaryImageSrc ? (
          <Image
            src={secondaryImageSrc}
            alt={`${title} alternate view`}
            width={1200}
            height={1500}
            className="w-full h-auto absolute inset-0 opacity-0 transition-opacity duration-300"
            priority={false}
          />
        ) : null}
      </div>
      <div className="text-sm">
        <div className="text-foreground">{title}</div>
        {subtitle ? <div className="text-zinc-600">{subtitle}</div> : null}
        {price ? <div className="mt-1 card-price opacity-0 transition-opacity duration-300">{price}</div> : null}
      </div>
    </article>
  );
  return href
    ? <Link href={href.replace(/^\/product\/(.+)$/, (_m, s) => `/product?slug=${encodeURIComponent(s)}`)}>{content}</Link>
    : content;
}


