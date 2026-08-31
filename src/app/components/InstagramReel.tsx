"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The motion post, shown as the Reel it is.
 *
 * The sibling carousel gets feed chrome (InstagramPost); this piece is 9:16, so
 * feed chrome would be the wrong frame — Instagram gives a vertical video the
 * Reels player, where the interface sits *over* the artwork rather than around
 * it. That difference is worth keeping: it is a real constraint the piece was
 * designed against, since anything in the bottom-left corner competes with the
 * caption and anything down the right edge competes with the action rail.
 *
 * Playback follows the same in-view policy as the rest of the site: the file is
 * not fetched until the reel is near the viewport, and it pauses on the way
 * out. Sound starts muted because it must — a browser refuses to autoplay an
 * unmuted video — so the speaker is the one control the visitor genuinely needs
 * and the only interactive element besides tap-to-pause.
 */

function Glyph({
  d,
  filled = false,
  className = "size-[26px]",
}: {
  d: string | string[];
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {(Array.isArray(d) ? d : [d]).map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  );
}

const HEART =
  "M12 20.4S3.6 15.3 3.6 9.6a4.4 4.4 0 0 1 8.4-1.8 4.4 4.4 0 0 1 8.4 1.8c0 5.7-8.4 10.8-8.4 10.8Z";
const COMMENT = "M21 11.5a8.5 8.5 0 0 1-12.2 7.7L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z";
const SHARE = "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z";
const BOOKMARK = "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z";
const MORE = "M6 12h.01M12 12h.01M18 12h.01";
const CAMERA = [
  "M3 8.5A2.5 2.5 0 0 1 5.5 6h2L9 4h6l1.5 2h2A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-8Z",
  "M12 9.2a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6Z",
];
const NOTE = "M9 18V5l10-2v13M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm10-2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z";
const SPEAKER_ON = ["M4 9.5h3.5L12 5.5v13L7.5 14.5H4v-5Z", "M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"];
const SPEAKER_OFF = ["M4 9.5h3.5L12 5.5v13L7.5 14.5H4v-5Z", "M16.5 9.5l5 5M21.5 9.5l-5 5"];
const PLAY = "M8 5.5v13l11-6.5-11-6.5Z";

export default function InstagramReel({
  handle,
  avatar,
  caption,
  src,
  poster,
  label,
}: {
  handle: string;
  avatar: string;
  caption: string;
  src: string;
  poster: string;
  /** describes the reel for anyone who cannot watch it */
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!v.src && v.dataset.src) v.src = v.dataset.src;
          // autoplay can still be refused (Low Power Mode, reduced motion);
          // the play badge below is what the visitor taps when it is
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  };

  return (
    <div className="mx-auto w-full max-w-[330px]">
      <div className="relative overflow-hidden rounded-[26px] bg-black shadow-[0_22px_60px_rgba(0,64,27,0.22)]">
        <video
          ref={ref}
          data-src={src}
          poster={poster}
          aria-label={label}
          muted={muted}
          loop
          playsInline
          preload="none"
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          onClick={toggle}
          className="block aspect-[9/16] w-full cursor-pointer object-cover"
        />

        {/* ── player chrome, over the artwork ────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 flex flex-col">
          {/* Both scrims are heavier than Instagram's own, because Instagram
              can assume a photographic frame behind its chrome and this reel
              opens on near-white — without them the white interface lands on
              white artwork and disappears. */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[110px] bg-gradient-to-b from-black/45 to-transparent"
          />

          {/* top bar */}
          <div className="relative flex items-start justify-between p-3.5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            <span className="font-figtree text-[17px] font-bold leading-none">
              Reels
            </span>
            <Glyph d={CAMERA} className="size-[22px]" />
          </div>

          <div className="flex-1" />

          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[250px] bg-gradient-to-t from-black/80 via-black/45 to-transparent"
            />

            <div className="relative flex items-end gap-3 p-3.5">
              {/* caption block */}
              <div className="min-w-0 flex-1 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatar}
                    alt=""
                    className="size-7 shrink-0 rounded-full object-cover ring-1 ring-white/70"
                  />
                  <span className="font-figtree truncate text-[13px] font-semibold">
                    {handle}
                  </span>
                  <span className="font-figtree shrink-0 rounded-[4px] border border-white/80 px-2 py-[3px] text-[11px] font-semibold leading-none">
                    Follow
                  </span>
                </div>

                <p className="font-figtree mt-2 line-clamp-2 text-[12.5px] leading-[1.35] text-white/95">
                  {caption}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-white/90">
                  <Glyph d={NOTE} className="size-[13px]" />
                  <span className="font-figtree truncate text-[11.5px]">
                    {handle} · Original audio
                  </span>
                </div>
              </div>

              {/* action rail */}
              <div className="flex shrink-0 flex-col items-center gap-4 pb-1 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                <Glyph d={HEART} />
                <Glyph d={COMMENT} />
                <Glyph d={SHARE} className="size-[25px]" />
                <Glyph d={BOOKMARK} className="size-[24px]" />
                <Glyph d={MORE} className="size-[22px]" />
              </div>
            </div>
          </div>
        </div>

        {/* ── the two real controls ──────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute reel" : "Mute reel"}
          className="absolute right-3.5 top-11 grid size-8 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
        >
          <Glyph d={muted ? SPEAKER_OFF : SPEAKER_ON} className="size-[15px]" />
        </button>

        {paused && (
          <button
            type="button"
            onClick={toggle}
            aria-label="Play reel"
            className="absolute inset-0 grid place-items-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm">
              <Glyph d={PLAY} filled className="size-7 translate-x-[2px]" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
