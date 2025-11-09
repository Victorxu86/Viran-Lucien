"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  images: string[];
  className?: string;
};

export default function Gallery({ images, className = "" }: Props) {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const go = (n: number) => {
    setIdx((i) => {
      const next = (i + n + images.length) % images.length;
      return next;
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  return (
    <div className={`gallery ${className}`}>
      <div className="media-frame relative overflow-hidden gallery-main">
        <div
          ref={trackRef}
          className="gallery-track"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={src + i} className="gallery-slide">
              <img src={src} alt={`view ${i + 1}`} className="w-full h-auto" />
            </div>
          ))}
        </div>
        {images.length > 1 ? (
          <>
            <button
              aria-label="Previous image"
              className="gallery-arrow left"
              onClick={() => go(-1)}
            >
              ‹
            </button>
            <button
              aria-label="Next image"
              className="gallery-arrow right"
              onClick={() => go(1)}
            >
              ›
            </button>
          </>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="gallery-thumbs">
          {images.map((src, i) => (
            <button
              key={src + i}
              className={`gallery-thumb ${i === idx ? "is-active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`view ${i + 1}`}
            >
              <img src={src} alt={`thumb ${i + 1}`} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}


