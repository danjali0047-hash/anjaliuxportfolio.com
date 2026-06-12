"use client";

import { useEffect, useState } from "react";

/**
 * Clicking the stacked hero photos shuffles them: the front polaroid
 * ([data-photo="front"]) slides back and down behind the stack, while the back
 * polaroid ([data-photo="back"]) rises up to the front. Clicking again swaps
 * them back. Pure class toggles; the motion is defined in globals.css.
 */
export default function PhotoSwap() {
  const [swapped, setSwapped] = useState(false);

  // attach click handlers to every photo so a click anywhere on the stack swaps
  useEffect(() => {
    const photos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-photo]"),
    );
    if (!photos.length) return;
    const onClick = () => setSwapped((s) => !s);
    photos.forEach((p) => {
      p.style.cursor = "pointer";
      p.addEventListener("click", onClick);
    });
    return () => photos.forEach((p) => p.removeEventListener("click", onClick));
  }, []);

  // apply the swap: front gets sent back, all back photos come to the front
  useEffect(() => {
    const front = document.querySelector<HTMLElement>('[data-photo="front"]');
    const backs = document.querySelectorAll<HTMLElement>('[data-photo="back"]');
    if (front) front.classList.toggle("sent-back", swapped);
    backs.forEach((b) => b.classList.toggle("brought-front", swapped));
  }, [swapped]);

  return null;
}
