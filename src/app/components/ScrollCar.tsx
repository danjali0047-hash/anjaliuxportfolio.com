"use client";

import { useEffect } from "react";

/**
 * Drives the car (#scroll-car) along the road's white dashed centreline
 * (#road-path) as the user scrolls past the "ROAD SO FAR" section.
 *
 * The path is the centreline lifted straight out of the road artwork — the
 * "Vector 1295" stroke in Group238204.svg — mapped into canvas coordinates, so
 * the car sits on the dashes rather than near them. It also turns to the path's
 * tangent, so it leans into each bend instead of holding one fixed angle
 * through a road that swings 40 degrees.
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

    /**
     * Where the car points when nothing has rotated it. The sprite is drawn
     * facing left — its wing mirrors sit forward of centre — so 180deg, and the
     * markup turns it a further -84.24deg, leaving it at 95.76deg: very nearly
     * straight down the page. That was a fair average for a road whose heading
     * actually swings between 70deg and 110deg, which is why the car looked
     * wrong through the bends rather than at any one point.
     */
    const SPRITE_HEADING = 95.76;
    const homeX = car.offsetLeft + car.offsetWidth / 2;
    const homeY = car.offsetTop + car.offsetHeight / 2;

    // a little smoothing so scrolling feels fluid, not jumpy
    car.style.transition = "translate 0.18s ease-out, rotate 0.18s ease-out";

    const apply = (p: number) => {
      const len = total * (1 - p); // path runs bottom->top, so invert
      const pt = path.getPointAtLength(len);

      // Steer along the dashed centreline. The car travels toward DECREASING
      // length, because len is derived from (1 - p), so the heading is taken
      // from the point just ahead of it minus the one just behind — sampling
      // both sides keeps it steady through the curves instead of jittering.
      const eps = Math.min(8, total / 2);
      const ahead = path.getPointAtLength(Math.max(0, len - eps));
      const behind = path.getPointAtLength(Math.min(total, len + eps));
      const heading =
        (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;

      car.style.translate = `${pt.x - homeX}px ${pt.y - homeY}px`;
      car.style.rotate = `${heading - SPRITE_HEADING}deg`;
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
