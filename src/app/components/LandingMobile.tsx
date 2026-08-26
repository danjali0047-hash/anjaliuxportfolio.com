"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import * as A from "../landing-assets";
import { CONTACTS, EXPERIENCE, RESUME_URL, SECTIONS } from "../landing-content";
import { PROJECTS } from "../projects/projects";
import ContactIcon from "./ContactIcon";
import { CARDS } from "./CardCarousel";
import { PIECES } from "./GraphicDesignWork";

/**
 * The landing page at phone size.
 *
 * This is a separate layout rather than a set of breakpoints because the
 * desktop page cannot become this one by reflowing: it is a fixed 1728px
 * canvas of absolutely-positioned artwork, scaled to fit the window. On a 390px
 * screen that scale is 22%, which renders body copy at about 3.4px — fast, and
 * completely unreadable. Below `lg` the page is rebuilt here as ordinary
 * document flow at ordinary type sizes.
 *
 * The two layouts share their words (landing-content.ts) and their lists
 * (PROJECTS, PIECES, CARDS), so neither can quietly fall out of date.
 */

function Heading({ title, sub }: { title: string; sub: string }) {
  return (
    <header className="mb-7">
      <h2 className="font-figtree text-[30px] font-bold leading-[1.05] text-[#00af26]">
        {title}
      </h2>
      <p className="font-figtree mt-1.5 text-[15px] font-medium italic text-[#8a8a8a]">
        {sub}
      </p>
    </header>
  );
}

/** Videos are only fetched once they scroll into view, and pause when they leave. */
function useVideoInView() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            if (!v.src && v.dataset.src) v.src = v.dataset.src;
            void v.play().catch(() => {});
          } else v.pause();
        }
      },
      { rootMargin: "150px" },
    );
    root.querySelectorAll("video").forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function LandingMobile() {
  const lifeRef = useVideoInView();

  return (
    <main className="bg-[#f9f9f9] overflow-x-hidden">
      {/* ── hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={A.imgImage2}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative">
          <h1 className="font-figtree text-[34px] font-bold leading-[1.02] tracking-tight text-white sm:text-[40px]">
            WELCOME TO
            <br />
            ANJALI&rsquo;S PORTFOLIO
          </h1>

          {/* the two sticky notes, side by side and legible rather than scaled down */}
          <div className="mt-8 flex items-start justify-center gap-3">
            {[
              { note: A.imgNote, label: "Visual Designer", tilt: -6 },
              { note: A.imgNote1, label: "Product Designer", tilt: 5 },
            ].map((n) => (
              <div
                key={n.label}
                className="relative size-[132px] shrink-0"
                style={{ transform: `rotate(${n.tilt}deg)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src={n.note} className="absolute inset-0 size-full" />
                <span className="font-hand absolute inset-0 flex items-center justify-center px-3 text-center text-[20px] leading-tight text-[#222]">
                  {n.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center gap-3">
            <a
              href="#ux-projects-m"
              className="font-figtree w-[210px] rounded-full bg-white/25 px-6 py-3 text-[16px] font-bold text-white backdrop-blur-sm ring-1 ring-white/40 active:scale-[0.98]"
            >
              View Projects
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-figtree w-[210px] rounded-full bg-white/25 px-6 py-3 text-[16px] font-bold text-white backdrop-blur-sm ring-1 ring-white/40 active:scale-[0.98]"
            >
              View Resume
            </a>
          </div>
        </div>
      </section>

      {/* ── road so far ──────────────────────────────────────────────────── */}
      <section className="px-6 py-14">
        <Heading {...SECTIONS.roadSoFar} />
        <ol className="space-y-5">
          {EXPERIENCE.map((e) => (
            <li
              key={e.company}
              className="rounded-2xl bg-white p-5 shadow-[0_2px_14px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={e.logo}
                  width={e.logoW}
                  height={e.logoH}
                  className="shrink-0 object-contain"
                  style={{ width: e.logoW, height: e.logoH }}
                />
                <div className="min-w-0">
                  <h3 className="font-figtree text-[19px] font-semibold leading-tight text-[#333]">
                    {e.company}
                  </h3>
                  <p className="font-figtree text-[14px] text-[#777]">{e.role}</p>
                </div>
              </div>
              <p className="font-figtree mt-3 text-[13px] font-medium text-[#333]">
                {e.dates}
              </p>
              <p className="font-figtree mt-2 text-[14px] leading-relaxed text-[#8d8d8d]">
                {e.blurb}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── ux projects ──────────────────────────────────────────────────── */}
      <section id="ux-projects-m" className="scroll-mt-4 bg-[#282828] px-6 py-14">
        <header className="mb-7">
          <h2 className="font-hand text-[38px] leading-none text-white">
            UX Projects
          </h2>
          <p className="font-figtree mt-2 text-[15px] font-medium italic text-white/55">
            {SECTIONS.uxProjects.sub}
          </p>
        </header>
        <div className="space-y-5">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="block overflow-hidden rounded-2xl bg-white shadow-[0_6px_20px_rgba(0,0,0,0.3)] active:scale-[0.99]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#eee]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={p.thumb}
                  loading="lazy"
                  className="size-full object-cover object-top"
                />
              </div>
              <div className="p-4">
                <p className="font-figtree text-[11px] font-semibold uppercase tracking-[0.09em] text-[#00af26]">
                  {p.meta}
                </p>
                <h3 className="font-figtree mt-1 text-[20px] font-bold text-[#222]">
                  {p.title}
                </h3>
                <p className="font-figtree mt-1 text-[14px] leading-snug text-[#777]">
                  {p.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── graphic design work ──────────────────────────────────────────── */}
      <section className="bg-[#fbe6d4] px-6 py-14">
        <Heading {...SECTIONS.graphic} />
        <div className="space-y-6">
          {PIECES.filter((p) => p.img).map((p) => {
            const inner = (
              <>
                <div className="bg-white p-2.5 pb-11 shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
                  <div className="aspect-square overflow-hidden bg-[#eee]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={p.title}
                      src={p.img}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </div>
                  {p.caption && (
                    <p className="font-hand absolute inset-x-0 bottom-3 text-center text-[19px] leading-none text-[#333]">
                      {p.caption}
                    </p>
                  )}
                </div>
              </>
            );
            return p.page ? (
              <Link key={p.title} href={p.page} className="relative block active:scale-[0.99]">
                {inner}
              </Link>
            ) : (
              <div key={p.title} className="relative">
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── other than that ──────────────────────────────────────────────── */}
      <section className="py-14">
        <div className="px-6">
          <Heading {...SECTIONS.otherThanThat} />
        </div>
        {/* a native swipe strip — no scroll hijacking on touch, where stealing
            the scroll is the fastest way to make a page feel broken */}
        <div
          ref={lifeRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CARDS.map((c) => {
            const body = (
              <>
                {c.videos?.[0] ? (
                  <video
                    data-src={c.videos[0]}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="size-full object-cover"
                    style={{ objectPosition: c.pos }}
                  />
                ) : c.img ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img alt="" src={c.img} loading="lazy" className="size-full object-cover" />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-transparent" />
                <span className="font-poppins absolute left-4 top-4 text-[22px] font-extrabold uppercase text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                  {c.label}
                </span>
              </>
            );
            const cls =
              "relative aspect-[4/5] w-[76vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-2xl bg-[#222]";
            return c.href ? (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {body}
              </a>
            ) : (
              <div key={c.label} className={cls}>
                {body}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── there's always more to life ──────────────────────────────────── */}
      <section className="py-14">
        <div className="px-6">
          <Heading {...SECTIONS.moreToLife} />
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track marquee-a" style={{ height: 130 }}>
            {[...MARQUEE, ...MARQUEE].map((src, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={i}
                alt=""
                src={src}
                loading="lazy"
                className="mr-2.5 block h-full w-auto max-w-none rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#2a2a2a] px-6 py-14">
        <h2 className="font-figtree text-[20px] font-semibold text-white">
          Find me here
        </h2>
        <ul className="mt-6 space-y-4">
          {CONTACTS.map((c) => (
            <li key={c.key}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3.5"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white">
                  <ContactIcon name={c.icon} size={20} />
                </span>
                <span className="font-figtree break-all text-[15px] text-white underline decoration-from-font underline-offset-2">
                  {c.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="font-urbanist mt-12 text-[20px] leading-tight text-white/45">
          Made with
        </p>
        <p className="font-urbanist text-[24px] font-bold leading-tight text-white/60">
          Coffee, Procrastination and Love ❤️
        </p>
      </footer>
    </main>
  );
}

/** A short slice of the photo strip — the canvas runs all 54, which is a lot of
    image for a phone to carry for a decorative marquee. */
const MARQUEE = [
  A.ttaml3, A.ttaml8, A.ttaml14, A.ttaml19, A.ttaml23, A.ttaml28,
  A.ttaml33, A.ttaml38, A.ttaml43, A.ttaml47, A.ttaml51,
];
