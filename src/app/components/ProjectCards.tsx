"use client";

import { useEffect, useState } from "react";

/**
 * Click the UX Projects folder ([data-folder]) and the three case-study
 * "papers" fly out of it and fan into a row of project cards. Each card links
 * to its case study. Clicking the folder again, the backdrop, or Esc tucks
 * them back in. While open, the folder graphic ([data-files-drop]) fades
 * so the cards visually take its place.
 *
 * Rendered INSIDE the scaled canvas, so all coordinates are native (1728-wide)
 * pixels and scale with the rest of the page.
 */
const PROJECTS = [
  {
    slug: "serveeze",
    title: "Serveeze",
    tagline: "Simplifying domestic hiring in India",
    meta: "UX Case Study",
    thumb: "/assets/serveeze/thumb.png",
    pdf: "/pdfs/serveeze.pdf",
  },
  {
    slug: "chop-chop",
    title: "Chop Chop",
    tagline: "Your go-to daily meal planner",
    meta: "Idea to deployment · 6 hours",
    thumb: "/assets/chop-chop/thumb.png",
    pdf: "/pdfs/chop-chop.pdf",
  },
  {
    slug: "pune-metro",
    title: "Pune Metro",
    tagline: "A digital companion for urban commuters",
    meta: "Mobile App · UX/UI",
    thumb: "/assets/pune-metro/thumb.png",
    pdf: "/pdfs/pune-metro.pdf",
  },
];

// layout (native px) — dark fold spans y 1774..2891 (1117 tall), width 1728
const CARD_W = 440;
const CARD_H = 560;
const CARD_Y = 2052;
const CARD_X = [134, 644, 1154];
const FAN = [-5, 0, 5]; // open fan rotation
const CLOSED_ROT = [-13, 6, 15]; // tucked-in paper jitter
const ORIGIN_X = 864; // folder centre (where the papers emerge)
const ORIGIN_Y = 2120;

export default function ProjectCards() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const folder = document.querySelector<HTMLElement>("[data-folder]");
    if (!folder) return;

    const toggle = (e: Event) => {
      e.preventDefault();
      setOpen((o) => !o);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    folder.addEventListener("click", toggle);
    folder.addEventListener("keydown", onKey);
    return () => {
      folder.removeEventListener("click", toggle);
      folder.removeEventListener("keydown", onKey);
    };
  }, []);

  // slide the folder down + out of frame (behind the cards) + Esc-to-close
  useEffect(() => {
    // the whole front file AND the back file slide down + out as cards emerge
    const sliders = document.querySelectorAll<HTMLElement>(
      ".folder-graphic, .back-file",
    );
    sliders.forEach((el) => el.classList.toggle("folder-gone", open));

    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      aria-hidden={!open}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 70,
      }}
    >
      {/* backdrop — click to close */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "absolute",
          left: 0,
          top: 1774,
          width: 1728,
          height: 1117,
          background: "rgba(20,20,20,0.45)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      />

      {PROJECTS.map((p, i) => {
        const cx = CARD_X[i] + CARD_W / 2;
        const cy = CARD_Y + CARD_H / 2;
        const dx = ORIGIN_X - cx;
        const dy = ORIGIN_Y - cy;
        const closed = `translate(${dx}px, ${dy}px) scale(0.22) rotate(${CLOSED_ROT[i]}deg)`;
        const opened = `translate(0px, 0px) rotate(${FAN[i]}deg)`;
        return (
          <a
            key={p.slug}
            href={p.pdf}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.title} case study (PDF, opens in new tab)`}
            tabIndex={open ? 0 : -1}
            style={{
              position: "absolute",
              left: CARD_X[i],
              top: CARD_Y,
              width: CARD_W,
              height: CARD_H,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: 22,
              background: "#fff",
              boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
              transformOrigin: "center",
              transform: open ? opened : closed,
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition:
                "transform 0.62s cubic-bezier(0.2,0.85,0.25,1), opacity 0.4s ease",
              transitionDelay: open ? `${i * 0.09}s` : `${(2 - i) * 0.05}s`,
              textDecoration: "none",
            }}
          >
            <div style={{ width: "100%", height: 275, flexShrink: 0, overflow: "hidden", background: "#eee" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.thumb}
                alt={`${p.title} preview`}
                style={{ display: "block", height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "26px 28px" }}>
              <p
                style={{
                  fontFamily: "var(--ff-figtree), sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#00af26",
                  margin: 0,
                }}
              >
                {p.meta}
              </p>
              <h3
                style={{
                  fontFamily: "var(--ff-figtree), sans-serif",
                  fontSize: 34,
                  fontWeight: 700,
                  color: "#222",
                  margin: "6px 0 0",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--ff-figtree), sans-serif",
                  fontSize: 19,
                  color: "#666",
                  margin: "6px 0 0",
                }}
              >
                {p.tagline}
              </p>
              <span
                style={{
                  marginTop: "auto",
                  fontFamily: "var(--ff-figtree), sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#222",
                }}
              >
                View case study →
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
