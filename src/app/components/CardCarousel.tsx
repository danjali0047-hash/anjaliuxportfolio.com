"use client";

import { useEffect, useRef } from "react";
import * as A from "../landing-assets";

/**
 * "OTHER THAN THAT" cards. Once you've scrolled the strip fully into view, the
 * page scroll PAUSES and each scroll tick slides the cards sideways instead —
 * so you can see them all, patiently — and once the last card is shown, normal
 * vertical scrolling resumes. Implemented by intercepting wheel/touch input
 * (the page genuinely stops, so the card motion stays smooth — no fighting a
 * moving scroll). Works on trackpad, mouse wheel, and touch.
 *
 * Rendered inside the scaled canvas, so sizes are native (1728-wide) px.
 */
type Card = { label: string; img?: string; videos?: string[]; pos: string; bg: string; weight?: number; lx?: number; ly?: number; fs?: number; href?: string };
const CARDS: Card[] = [
  { label: "I create", videos: ["/assets/landing/create-1.mp4", "/assets/landing/create-3.mp4", "/assets/landing/create-1.mp4"], pos: "50% 50%", bg: "#222", weight: 800, lx: 44, ly: 40, fs: 42, href: "https://www.instagram.com/anjaliiiii.dubey/" },
  { label: "I run", videos: ["/assets/landing/run-1.mp4", "/assets/landing/run-2.mp4", "/assets/landing/run-3.mp4"], pos: "50% 50%", bg: "#222" },
  { label: "I Film", videos: ["/assets/landing/film.mp4"], pos: "50% 50%", bg: "#222", href: "https://www.youtube.com/watch?v=9rQjUOFmK-I" },
  { label: "I play", videos: ["/assets/landing/play.mp4"], pos: "50% 50%", bg: "#222" },
  { label: "I read", videos: ["/assets/landing/read.mp4"], pos: "50% 50%", bg: "#222" },
  { label: "I pet", videos: ["/assets/landing/petdogs-1.mp4", "/assets/landing/petdogs-2.mp4", "/assets/landing/petdogs-3.mp4"], pos: "50% 50%", bg: "#222" },
];

const LEFT = 106;
const TOP = 3169;
const STRIP_W = 1516; // visible content width (106 .. 1622)
const CARD_W = 700;
const CARD_H = 400;
const GAP = 36;
const TOTAL = CARDS.length * CARD_W + (CARDS.length - 1) * GAP;
const OVERFLOW = Math.max(0, TOTAL - STRIP_W);
// extra scroll the user "holds" on the last card before the page releases
const HOLD = 350;
const MAX = OVERFLOW + HOLD;
// Pin anchor: the "OTHER THAN THAT" title sits at native 2958 (this far above
// the cards). The scroll pins to ONE fixed page position — the title resting
// PIN_MARGIN px below the top of the viewport (by which point the grey UX
// background has scrolled away just above it) — so it stops in exactly the same
// place every time, regardless of scroll speed or direction.
const TITLE_ABOVE = TOP - 2958;
const PIN_MARGIN = 40;

export default function CardCarousel() {
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const track = trackRef.current;
    if (!strip || !track) return;

    let progress = 0; // current card shift (native px)
    let target = 0; // where the cards ease to (0 = start, MAX = fully revealed)
    let engaged = false; // true while the page is frozen and the cards slide
    let raf = 0;
    const draw = () => {
      // cards stop at OVERFLOW; progress can go further (the HOLD) without moving
      const shift = Math.min(progress, OVERFLOW);
      track.style.transform = `translate3d(${-shift}px, 0, 0)`;
    };
    const loop = () => {
      progress += (target - progress) * 0.2;
      if (Math.abs(target - progress) < 0.4) {
        progress = target;
        draw();
        raf = 0;
        return;
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    const ease = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const scaleOf = () => {
      const r = strip.getBoundingClientRect();
      return strip.offsetWidth ? r.width / strip.offsetWidth : 1;
    };

    // The ONE fixed page scroll position the carousel pins at: the title resting
    // PIN_MARGIN px below the top. (window.scrollY + rect.top) is the title's
    // absolute page position and stays constant as you scroll, so this value is
    // the same every time — that's what makes the stop point consistent.
    const pinScrollY = () => {
      const r = strip.getBoundingClientRect();
      const scale = strip.offsetWidth ? r.width / strip.offsetWidth : 1;
      return Math.round(window.scrollY + r.top - TITLE_ABOVE * scale - PIN_MARGIN);
    };

    let prevY = window.scrollY;

    // Snap exactly onto the pin and freeze there. scroll-behavior is forced to
    // "auto" so the jump is truly instant (the page's smooth-scroll CSS would
    // otherwise animate it and we'd freeze mid-animation at a random spot — the
    // old "stops in a different place every time" bug).
    const engage = () => {
      const de = document.documentElement;
      const prevBehavior = de.style.scrollBehavior;
      de.style.scrollBehavior = "auto";
      window.scrollTo(0, pinScrollY());
      de.style.overflowY = "hidden";
      de.style.scrollBehavior = prevBehavior;
      engaged = true;
      prevY = window.scrollY;
    };
    const release = () => {
      document.documentElement.style.overflowY = "";
      prevY = window.scrollY;
    };

    // Engagement is detected from the REAL scroll position crossing the pin, so
    // it catches every speed — including a fast fling that would skip a
    // delta-based catch window and "not stop".
    const onScroll = () => {
      if (engaged) return;
      const curY = window.scrollY;
      const pinY = pinScrollY();
      if (curY > prevY) {
        // scrolling down: pin when we cross it, if cards still have room forward
        if (prevY < pinY && curY >= pinY && target < MAX - 0.5) engage();
      } else if (curY < prevY) {
        // scrolling up: pin when we cross it, if cards still have room to rewind
        if (prevY > pinY && curY <= pinY && target > 0.5) engage();
      }
      prevY = curY;
    };

    // While engaged, vertical input slides the cards instead of the page.
    const slide = (deltaScreen: number, preventDefault: () => void) => {
      if (!engaged) return;
      const scale = scaleOf();
      const next = target + deltaScreen / scale;
      if (deltaScreen > 0 && next >= MAX) {
        target = MAX;
        ease();
        engaged = false;
        release();
        return; // finished forward (incl. the HOLD) — let the page scroll on
      }
      if (deltaScreen < 0 && next <= 0) {
        target = 0;
        ease();
        engaged = false;
        release();
        return; // back at the start — release upward
      }
      preventDefault();
      target = Math.max(0, Math.min(MAX, next));
      ease();
    };

    const onWheel = (e: WheelEvent) => {
      slide(e.deltaY, () => e.preventDefault());
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchY;
      const dy = touchY - y; // swipe up => positive (same sense as scroll down)
      touchY = y;
      slide(dy, () => e.preventDefault());
    };

    // Lazy: the card videos (preload="none") only download + play once the
    // carousel nears the viewport, and pause when it leaves — so the home page
    // doesn't fetch ~140MB of video up front.
    const setVideos = (play: boolean) => {
      strip.querySelectorAll("video").forEach((v) => {
        const vid = v as HTMLVideoElement;
        if (play) void vid.play().catch(() => {});
        else vid.pause();
      });
    };
    const io = new IntersectionObserver(
      (entries) => setVideos(entries.some((e) => e.isIntersecting)),
      { rootMargin: "400px 0px" },
    );
    io.observe(strip);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.style.overflowY = "";
    };
  }, []);

  return (
    <div ref={stripRef} style={{ position: "absolute", left: LEFT, top: TOP, width: STRIP_W, height: CARD_H, overflow: "hidden" }}>
      <div ref={trackRef} style={{ display: "flex", gap: GAP, height: "100%", width: TOTAL, willChange: "transform" }}>
        {CARDS.map((c) => (
          <div
            key={c.label}
            onClick={c.href ? () => window.open(c.href, "_blank", "noopener,noreferrer") : undefined}
            role={c.href ? "link" : undefined}
            tabIndex={c.href ? 0 : undefined}
            onKeyDown={
              c.href
                ? (e) => {
                    if (e.key === "Enter") window.open(c.href, "_blank", "noopener,noreferrer");
                  }
                : undefined
            }
            style={{
              position: "relative",
              flex: "0 0 auto",
              width: CARD_W,
              height: CARD_H,
              borderRadius: 14,
              overflow: "hidden",
              background: c.bg,
              boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
              cursor: c.href ? "pointer" : "default",
            }}
          >
            {c.videos && (
              <div style={{ position: "absolute", inset: 0, display: "flex", gap: 4 }}>
                {c.videos.map((vsrc, vi) => (
                  <video
                    key={`${vi}-${vsrc}`}
                    ref={(el) => {
                      if (el) el.muted = true; // force muted (React's `muted` attr is unreliable)
                    }}
                    src={vsrc}
                    muted
                    loop
                    playsInline
                    preload="none" /* don't download until the carousel scrolls into view */
                    // equal columns; cover fills each (the portrait clip's status bar gets cropped)
                    style={{ flex: "1 1 0", minWidth: 0, height: "100%", objectFit: "cover", objectPosition: c.pos, pointerEvents: "none", userSelect: "none" }}
                  />
                ))}
              </div>
            )}
            {c.img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.img}
                alt=""
                draggable={false}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: c.pos, pointerEvents: "none", userSelect: "none" }}
              />
            )}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.32)" }} />
            {c.videos && (
              // extra top-down dark gradient so the label stays readable over the busy video
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 32%, rgba(0,0,0,0) 60%)",
                  pointerEvents: "none",
                }}
              />
            )}
            <span style={{ position: "absolute", left: c.lx ?? 44, top: c.ly ?? 40, color: "#fff", fontFamily: "var(--ff-poppins), sans-serif", fontSize: c.fs ?? 42, fontWeight: c.weight ?? 800, textTransform: "uppercase", textShadow: "0 1px 6px rgba(0,0,0,0.45)" }}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
