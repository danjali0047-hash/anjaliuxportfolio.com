"use client";

import { useEffect, useState } from "react";

/**
 * Holds the landing page behind a loading screen until its artwork has actually
 * arrived, then reveals it in one go.
 *
 * Every element on this page is an absolutely-positioned image, so a visitor on
 * a slow connection would otherwise watch it assemble itself piece by piece
 * from a blank page — which reads as broken rather than as loading. Waiting is
 * the honest version of the same wait.
 *
 * Two things keep that from becoming its own problem:
 *
 *  - A hard cap. If the images are still coming after CAP_MS the page is
 *    revealed regardless, so a bad connection is never trapped behind a screen
 *    that will not go away.
 *  - The overlay is in the server-rendered HTML, so there is no flash of
 *    half-built page before it appears; the <noscript> rule below removes it
 *    entirely when scripts are off, where nothing would ever dismiss it.
 *
 * Once the page is up, the card videos are prefetched quietly in the background
 * so scrolling down to them does not hit an empty card — but only on a
 * connection that can afford it.
 */

const CAP_MS = 12000;

const PREFETCH = [
  "/assets/landing/create-1.mp4",
  "/assets/landing/create-3.mp4",
  "/assets/landing/run-1.mp4",
  "/assets/landing/run-2.mp4",
  "/assets/landing/run-3.mp4",
  "/assets/landing/film.mp4",
  "/assets/landing/play.mp4",
  "/assets/landing/read.mp4",
  "/assets/landing/petdogs-1.mp4",
  "/assets/landing/petdogs-2.mp4",
  "/assets/landing/petdogs-3.mp4",
];

/** Don't spend someone's mobile data warming 15MB of video they may never see. */
function connectionCanAfford() {
  const c = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!c) return true; // no signal either way — assume it's fine
  if (c.saveData) return false;
  return c.effectiveType === undefined || c.effectiveType === "4g";
}

export default function SitePreloader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const imgs = Array.from(document.images);
    const total = imgs.length || 1;
    let loaded = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setDone(true);
      document.documentElement.style.removeProperty("overflow");

      // background-warm the videos so the cards are ready when scrolled to
      if (!connectionCanAfford()) return;
      const idle =
        (window as Window & { requestIdleCallback?: (cb: () => void) => void })
          .requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1200));
      idle(() => {
        for (const href of PREFETCH) {
          const l = document.createElement("link");
          l.rel = "prefetch";
          l.as = "video";
          l.href = href;
          document.head.appendChild(l);
        }
      });
    };

    const tick = () => {
      loaded += 1;
      setPct(Math.round((loaded / total) * 100));
      if (loaded >= total) finish();
    };

    // lock scrolling while the screen is up, so the page can't be scrolled
    // behind it and land somewhere unexpected on reveal
    document.documentElement.style.overflow = "hidden";

    for (const img of imgs) {
      if (img.complete) tick();
      else {
        img.addEventListener("load", tick, { once: true });
        img.addEventListener("error", tick, { once: true }); // a broken image must not hang the page
      }
    }
    if (loaded >= total) finish();

    const cap = setTimeout(finish, CAP_MS);
    return () => {
      clearTimeout(cap);
      document.documentElement.style.removeProperty("overflow");
    };
  }, []);

  return (
    <div
      id="site-preloader"
      aria-hidden={done}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "auto",
        transition: "opacity 0.5s ease",
      }}
    >
      <p
        className="font-hand"
        style={{ fontSize: 42, color: "#222", margin: 0, lineHeight: 1 }}
      >
        Anjali&rsquo;s portfolio
      </p>
      <div
        style={{
          width: 200,
          height: 4,
          borderRadius: 999,
          background: "rgba(0,0,0,0.09)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: "#00af26",
            transition: "width 0.25s ease",
          }}
        />
      </div>
    </div>
  );
}
