"use client";

import { useEffect, useRef } from "react";

/**
 * A muted loop that only costs anything while it is on screen: the file is not
 * fetched until the video scrolls into view, and playback pauses again once it
 * leaves. Same policy as the landing page's videos, packaged as a component so
 * a deck page can drop one in without carrying the observer itself.
 *
 * `src` is held in a data attribute rather than on the element, because a `src`
 * present at first paint is fetched immediately — which is the thing being
 * avoided.
 */
export default function AutoVideo({
  src,
  poster,
  className,
  ariaLabel,
}: {
  src: string;
  poster?: string;
  className?: string;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!v.src && v.dataset.src) v.src = v.dataset.src;
          // autoplay can still be refused (Low Power Mode, reduced motion);
          // the controls stay, so the visitor can start it themselves
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      data-src={src}
      poster={poster}
      aria-label={ariaLabel}
      muted
      loop
      playsInline
      controls
      preload="none"
      className={className}
    />
  );
}
