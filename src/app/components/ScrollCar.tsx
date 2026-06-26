"use client";

import { useEffect } from "react";

/**
 * Drives the car (#scroll-car) along the road centreline (#road-path) as the
 * user scrolls past the "ROAD SO FAR" section. The car follows the curve from
 * top to bottom and rotates to the path's tangent so it always faces the way
 * the road bends.
 */
export default function ScrollCar() {
  useEffect(() => {
    const road = document.getElementById("road-track");
    const car = document.getElementById("scroll-car");
    const path = document.getElementById(
      "road-path",
    ) as SVGPathElement | null;
    if (!road || !car || !path) return;

    const total = path.getTotalLength();
    const homeX = car.offsetLeft + car.offsetWidth / 2;
    const homeY = car.offsetTop + car.offsetHeight / 2;

    // a little smoothing so scrolling feels fluid, not jumpy
    car.style.transition = "translate 0.18s ease-out";

    const apply = (p: number) => {
      const len = total * (1 - p); // path runs bottom->top, so invert
      const pt = path.getPointAtLength(len);
      // move along the road only — keep the car's original orientation (no rotation)
      car.style.translate = `${pt.x - homeX}px ${pt.y - homeY}px`;
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = road.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      apply(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
