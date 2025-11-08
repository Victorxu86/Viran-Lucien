import Image from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  price?: string;
  imageSrc: string;
};

export default function ProductCard({
  title,
  subtitle,
  price,
  imageSrc,
}: Props) {
  return (
    <article className="space-y-3">
      <div className="media-hover media-frame rounded-sm">
        <Image
          src={imageSrc}
          alt={title}
          width={1200}
          height={1500}
          className="w-full h-auto"
          priority={false}
        />
      </div>
      <div className="text-sm">
        <div className="text-foreground">{title}</div>
        {subtitle ? <div className="text-zinc-600">{subtitle}</div> : null}
        {price ? <div className="mt-1">{price}</div> : null}
      </div>
    </article>
  );
}


