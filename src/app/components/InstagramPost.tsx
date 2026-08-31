"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A carousel post, shown in the app it was actually made for.
 *
 * Instagram is the only place these five slides are ever seen in order, and a
 * grid of five thumbnails loses the thing the deck is meant to show — that the
 * cover splits the frame and each swipe hands one service a polaroid. So the
 * slides are put back in the chrome they were designed against.
 *
 * Paging is native horizontal scroll with CSS snap points rather than a
 * transform: a real swipe on a phone then behaves exactly as it does in the
 * app — it tracks the finger, it is interruptible, and it needs no touch
 * handlers of ours. The arrows are for pointer devices, which have nothing to
 * swipe with, and the dots and counter follow the scroll position rather than
 * driving it, so however the visitor moves the strip the chrome agrees.
 */

type Slide = { src: string; alt: string };

function Icon({ d, filled = false }: { d: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="size-6"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const HEART =
  "M12 20.4S3.6 15.3 3.6 9.6a4.4 4.4 0 0 1 8.4-1.8 4.4 4.4 0 0 1 8.4 1.8c0 5.7-8.4 10.8-8.4 10.8Z";
const COMMENT =
  "M21 11.5a8.5 8.5 0 0 1-12.2 7.7L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z";
const SHARE = "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z";
const BOOKMARK = "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z";
const CHEVRON_L = "M15 19 8 12l7-7";
const CHEVRON_R = "M9 5l7 7-7 7";

export default function InstagramPost({
  handle,
  avatar,
  caption,
  slides,
}: {
  handle: string;
  avatar: string;
  caption: string;
  slides: Slide[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // The scroll position is the single source of truth for which slide is
  // showing — a swipe, an arrow and a dot all move the rail, and this reads
  // back whatever they did.
  const onScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const i = Math.round(rail.scrollLeft / rail.clientWidth);
    setIndex(Math.min(slides.length - 1, Math.max(0, i)));
  }, [slides.length]);

  const goTo = useCallback((i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({ left: i * rail.clientWidth, behavior: "smooth" });
  }, []);

  // arrow keys page the carousel once it has focus, the way any other
  // horizontally paged control should
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      goTo(index + (e.key === "ArrowRight" ? 1 : -1));
    };
    rail.addEventListener("keydown", onKey);
    return () => rail.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const atStart = index === 0;
  const atEnd = index === slides.length - 1;

  return (
    <article className="mx-auto w-full max-w-[470px] overflow-hidden rounded-[12px] border border-[#dbdbdb] bg-white text-[#262626]">
      {/* ── post header ──────────────────────────────────────────────── */}
      <header className="flex items-center gap-3 px-3.5 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt=""
          className="size-8 shrink-0 rounded-full object-cover ring-1 ring-black/10"
        />
        <p className="font-figtree min-w-0 flex-1 truncate text-[14px] font-semibold leading-none">
          {handle}
        </p>
        <span aria-hidden className="text-[20px] leading-none text-[#262626]">
          ⋯
        </span>
      </header>

      {/* ── media ────────────────────────────────────────────────────── */}
      <div className="group relative bg-black">
        <div
          ref={railRef}
          onScroll={onScroll}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={`${handle} carousel post, ${slides.length} slides`}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain outline-none [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70 [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((s, i) => (
            <div key={s.src} className="w-full shrink-0 snap-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className="block aspect-[4/5] w-full select-none object-cover"
              />
            </div>
          ))}
        </div>

        {/* slide counter, as the app puts it */}
        <span className="font-figtree pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[12px] font-semibold tabular-nums text-white">
          {index + 1}/{slides.length}
        </span>

        {/* Arrows exist for pointer devices; a touch screen already has the
            swipe, so they stay out of the way until a mouse is over the post. */}
        {[
          { side: "left", d: CHEVRON_L, to: index - 1, hide: atStart, label: "Previous slide" },
          { side: "right", d: CHEVRON_R, to: index + 1, hide: atEnd, label: "Next slide" },
        ].map((b) => (
          <button
            key={b.side}
            type="button"
            onClick={() => goTo(b.to)}
            aria-label={b.label}
            className={`absolute top-1/2 hidden size-7 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#262626] shadow-sm transition-opacity duration-150 hover:bg-white sm:grid ${
              b.side === "left" ? "left-2.5" : "right-2.5"
            } ${b.hide ? "pointer-events-none opacity-0" : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"}`}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={b.d} />
            </svg>
          </button>
        ))}
      </div>

      {/* ── actions ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 px-3.5 pb-1 pt-3">
        <span aria-hidden><Icon d={HEART} /></span>
        <span aria-hidden><Icon d={COMMENT} /></span>
        <span aria-hidden className="-ml-0.5"><Icon d={SHARE} /></span>

        {/* dots sit between the media and the caption, centred on the post */}
        <div className="flex flex-1 justify-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`size-1.5 rounded-full transition-colors duration-200 ${
                i === index ? "bg-[#0095f6]" : "bg-[#c7c7c7]"
              }`}
            />
          ))}
        </div>

        <span aria-hidden><Icon d={BOOKMARK} /></span>
      </div>

      {/* ── caption ──────────────────────────────────────────────────── */}
      <div className="px-3.5 pb-4 pt-2">
        <p className="font-figtree text-[14px] leading-[1.45]">
          <span className="font-semibold">{handle}</span>{" "}
          <span className="text-[#262626]">{caption}</span>
        </p>
      </div>
    </article>
  );
}
