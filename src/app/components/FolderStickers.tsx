"use client";

import { useEffect } from "react";

/**
 * Makes the stickers on the "UX Projects" folder ([data-sticker]) draggable.
 * Each sticker can be dragged anywhere within the folder area, snaps back to
 * its original spot after 5 seconds, and dragging never triggers the folder's
 * click-through navigation.
 */
export default function FolderStickers() {
  useEffect(() => {
    const stickers = Array.from(
      document.querySelectorAll<HTMLElement>("[data-sticker]"),
    );
    if (!stickers.length) return;

    // folder bounds in the folder component's local coordinate space (1728x1117)
    const FL = 180;
    const FR = 1540;
    const FT = 240;
    const FB = 1050;

    const cleanups: Array<() => void> = [];

    stickers.forEach((el) => {
      el.style.touchAction = "none";
      el.style.cursor = "grab";

      const homeL = el.offsetLeft;
      const homeT = el.offsetTop;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const minTx = FL - homeL;
      const maxTx = FR - homeL - w;
      const minTy = FT - homeT;
      const maxTy = FB - homeT - h;

      const cur = { x: 0, y: 0 };
      let start: { x: number; y: number; ox: number; oy: number; scale: number } | null = null;
      let moved = false;
      let returnTimer: number | undefined;
      let settleTimer: number | undefined;

      const onMove = (e: PointerEvent) => {
        if (!start) return;
        let nx = start.ox + (e.clientX - start.x) / start.scale;
        let ny = start.oy + (e.clientY - start.y) / start.scale;
        nx = Math.max(minTx, Math.min(maxTx, nx));
        ny = Math.max(minTy, Math.min(maxTy, ny));
        if (Math.abs(nx - start.ox) > 2 || Math.abs(ny - start.oy) > 2) moved = true;
        cur.x = nx;
        cur.y = ny;
        el.style.translate = `${nx}px ${ny}px`;
      };

      const onUp = () => {
        if (!start) return;
        start = null;
        el.style.cursor = "grab";
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        returnTimer = window.setTimeout(() => {
          el.style.transition = "translate 0.5s cubic-bezier(0.2, 0.8, 0.25, 1)";
          el.style.translate = "0px 0px";
          cur.x = 0;
          cur.y = 0;
          settleTimer = window.setTimeout(() => {
            el.style.transition = "";
            el.style.zIndex = "";
          }, 550);
        }, 5000);
      };

      const onDown = (e: PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (returnTimer) clearTimeout(returnTimer);
        if (settleTimer) clearTimeout(settleTimer);
        el.style.transition = "";
        const rect = el.getBoundingClientRect();
        const scale = el.offsetWidth ? rect.width / el.offsetWidth : 1;
        start = { x: e.clientX, y: e.clientY, ox: cur.x, oy: cur.y, scale };
        moved = false;
        el.style.cursor = "grabbing";
        el.style.zIndex = "40";
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      };

      // if a drag happened, swallow the click so the folder doesn't navigate
      const onClick = (e: MouseEvent) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      };

      el.addEventListener("pointerdown", onDown);
      el.addEventListener("click", onClick, true);
      cleanups.push(() => {
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("click", onClick, true);
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
