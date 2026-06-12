"use client";

import { useEffect } from "react";

/**
 * When the closed notebook ([data-notebook]) is hovered, a dark backdrop
 * (#hero-dim) fades in and an open-notebook image (#open-notebook) zooms into
 * the centre of the hero. The closed notebook stays put as the hover target,
 * so there is no flicker.
 */
export default function NotebookReveal() {
  useEffect(() => {
    const wrap = document.querySelector<HTMLElement>("[data-notebook]");
    const dim = document.getElementById("hero-dim");
    const open = document.getElementById("open-notebook");
    const closed = document.getElementById("closed-notebook");
    // the sticky notes — pushed behind the dark filter while the diary is open
    const notes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-draggable]"),
    );
    if (!wrap || !dim || !open) return;

    const show = () => {
      dim.style.opacity = "0.62";
      open.style.opacity = "1";
      open.style.scale = "1";
      if (closed) closed.style.opacity = "0"; // hide the closed notebook while open
      notes.forEach((n) => (n.style.zIndex = "30")); // drop behind the backdrop (z 40)
    };
    const hide = () => {
      dim.style.opacity = "0";
      open.style.opacity = "0";
      open.style.scale = "0.82";
      if (closed) closed.style.opacity = "1";
      notes.forEach((n) => (n.style.zIndex = "")); // back to the front layer
    };

    wrap.style.cursor = "pointer";
    wrap.addEventListener("pointerenter", show);
    wrap.addEventListener("pointerleave", hide);

    return () => {
      wrap.removeEventListener("pointerenter", show);
      wrap.removeEventListener("pointerleave", hide);
    };
  }, []);

  return null;
}
