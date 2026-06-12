"use client";

import { useEffect } from "react";

/**
 * Makes every [data-draggable] element in the hero draggable. The element can be
 * dragged anywhere; 5 seconds after release it smoothly animates back to its
 * original position. Drag distance is divided by the canvas scale so the card
 * tracks the cursor exactly even though the whole page is CSS-scaled.
 */
export default function HeroDragLayer() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-draggable]"),
    );
    const cleanups: Array<() => void> = [];

    els.forEach((el) => {
      el.style.touchAction = "none";
      el.style.cursor = "grab";

      let start: { x: number; y: number; ox: number; oy: number; scale: number } | null = null;
      const cur = { x: 0, y: 0 };
      let returnTimer: number | undefined;
      let settleTimer: number | undefined;

      const onMove = (e: PointerEvent) => {
        if (!start) return;
        cur.x = start.ox + (e.clientX - start.x) / start.scale;
        cur.y = start.oy + (e.clientY - start.y) / start.scale;
        el.style.translate = `${cur.x}px ${cur.y}px`;
      };

      const onUp = () => {
        if (!start) return;
        start = null;
        el.style.cursor = "grab";
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        // return to original spot after 5 seconds
        returnTimer = window.setTimeout(() => {
          el.style.transition = "translate 0.6s cubic-bezier(0.2, 0.8, 0.25, 1)";
          el.style.translate = "0px 0px";
          cur.x = 0;
          cur.y = 0;
          settleTimer = window.setTimeout(() => {
            el.style.transition = "";
            el.style.zIndex = "";
          }, 650);
        }, 5000);
      };

      const onDown = (e: PointerEvent) => {
        e.preventDefault();
        if (returnTimer) clearTimeout(returnTimer);
        if (settleTimer) clearTimeout(settleTimer);
        el.style.transition = "";
        const rect = el.getBoundingClientRect();
        const scale = el.offsetWidth ? rect.width / el.offsetWidth : 1;
        start = { x: e.clientX, y: e.clientY, ox: cur.x, oy: cur.y, scale };
        el.style.cursor = "grabbing";
        el.style.zIndex = "70";
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      };

      el.addEventListener("pointerdown", onDown);
      cleanups.push(() => {
        el.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        if (returnTimer) clearTimeout(returnTimer);
        if (settleTimer) clearTimeout(settleTimer);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
