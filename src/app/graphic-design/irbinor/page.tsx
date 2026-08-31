import type { Metadata } from "next";
import AutoVideo from "@/app/components/AutoVideo";
import GraphicWorkShell from "@/app/components/GraphicWorkShell";
import InstagramPost from "@/app/components/InstagramPost";

export const metadata: Metadata = {
  title: "Irbinor Events — Social creatives | Anjali Dubey",
  description:
    "Irbinor Events — logo, a 9:16 motion post and a five-slide Instagram carousel. Graphic design work by Anjali Dubey.",
};

/**
 * Unlike Delish and Coo, this piece was never a tall deck render — it is a
 * logo, one reel and a five-slide carousel, each made at its own aspect ratio
 * for Instagram. So it is laid out here as ordinary flow with `layout="full"`,
 * which lets the colour bands run edge to edge while the content inside stays
 * on a column, rather than being sliced with DeckSlices.
 */

// read off the logo artwork itself — the deep green is the mark, the amber is
// the sparkle and the "EVENTS" rule
const GREEN = "#00401b";
const GOLD = "#f8b038";
const CREAM = "#fdf8ef";

const SLIDES = [
  { n: 1, alt: "Cover slide — the Irbinor Events lockup over a four-up grid of event photography, captioned “What we do?”" },
  { n: 2, alt: "Concerts slide — a polaroid of a festival crowd captioned “Live loud”, over “turn every concert magic into a memory”" },
  { n: 3, alt: "Corporate slide — a polaroid of a rooftop toast captioned “Big goals”, over “create corporate events that inspire together”" },
  { n: 4, alt: "Weddings slide — a polaroid of a couple under falling petals captioned “It’s a yes!”, over “craft your wedding moments you’ll hold onto forever”" },
  { n: 5, alt: "Closing slide — “We create stories that are larger than life with a last mile touch”, signed off with the Irbinor Events lockup" },
];

// The brand's own channels — where the two posts above were actually published.
const CHANNELS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/irbinor_pvt_ltd/",
    primary: true,
    filled: false,
    paths: [
      "M7.5 2.75h9A4.75 4.75 0 0 1 21.25 7.5v9a4.75 4.75 0 0 1-4.75 4.75h-9A4.75 4.75 0 0 1 2.75 16.5v-9A4.75 4.75 0 0 1 7.5 2.75Z",
      "M12 8.05a3.95 3.95 0 1 1 0 7.9 3.95 3.95 0 0 1 0-7.9Z",
      "M17.35 6.4h.01",
    ],
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/irbinor/posts/?feedView=all",
    primary: false,
    filled: true,
    paths: [
      "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.25h4V21H3V9.25Z",
      "M9.5 9.25h3.83v1.6h.05c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.4c0-1.29-.03-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.86V21h-4V9.25Z",
    ],
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-figtree text-[12px] font-bold uppercase tracking-[0.18em]"
      style={{ color: GOLD }}
    >
      {children}
    </p>
  );
}

export default function IrbinorPage() {
  return (
    <GraphicWorkShell
      title="Irbinor Events"
      meta="Event brand · Social creatives"
      background={CREAM}
    >
      {/* ── title ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-10 md:py-28" style={{ background: CREAM }}>
        <div className="mx-auto max-w-[1080px]">
          <Eyebrow>Graphic design · Social</Eyebrow>
          <h1
            className="font-figtree mt-3 text-[46px] font-bold leading-[1.02] sm:text-[68px]"
            style={{ color: GREEN }}
          >
            Irbinor Events
          </h1>
          <p className="font-figtree mt-5 max-w-[620px] text-[17px] leading-[1.6] text-[#4a4a4a] sm:text-[19px]">
            An events company that runs weddings, concerts and corporate nights
            — three very different rooms under one name. The work below is the
            logo, and the first two posts that took it to Instagram: a motion
            piece to introduce the brand, and a carousel to say what it actually
            does.
          </p>

          <div
            aria-hidden
            className="mt-10 h-[3px] w-[120px] rounded-full"
            style={{ background: GOLD }}
          />
        </div>
      </section>

      {/* ── the mark ───────────────────────────────────────────────────── */}
      <section className="px-6 py-16 sm:px-10 md:py-24" style={{ background: GREEN }}>
        <div className="mx-auto grid max-w-[1080px] items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
          {/* the lockup is deep green on transparent, so it needs a light card
              under it — reversed out on the green band it would disappear */}
          <div
            className="flex items-center justify-center rounded-[20px] px-8 py-14 shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
            style={{ background: CREAM }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/irbinor/logo.png"
              alt="Irbinor Events logo — a script “I” with a gold sparkle, beside the wordmark IRBINOR over a rule and the word EVENTS"
              className="h-auto w-full max-w-[440px]"
            />
          </div>

          <div>
            <Eyebrow>The mark</Eyebrow>
            <h2 className="font-figtree mt-3 text-[30px] font-bold leading-[1.15] text-white sm:text-[38px]">
              One script stroke, one spark
            </h2>
            <p className="font-figtree mt-4 text-[16px] leading-[1.6] text-white/70 sm:text-[17px]">
              The monogram is drawn in a single unbroken stroke — the run-on
              quality of an evening that keeps going — and the sparkle sits
              where it lifts off. Deep green carries the formal end of the work,
              the amber keeps it from reading corporate.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { hex: GREEN, name: "Evergreen", ring: true },
                { hex: GOLD, name: "Spark" },
                { hex: CREAM, name: "Paper" },
              ].map((s) => (
                <div key={s.hex} className="flex items-center gap-2.5">
                  <span
                    className={`size-9 rounded-full ${s.ring ? "ring-2 ring-white/55" : ""}`}
                    style={{ background: s.hex }}
                  />
                  <span className="font-figtree text-[12px] font-semibold uppercase tracking-[0.08em] text-white/60">
                    {s.name}
                    <br />
                    <span className="tracking-normal text-white/40">
                      {s.hex.toUpperCase()}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── motion post ────────────────────────────────────────────────── */}
      <section className="px-6 py-16 sm:px-10 md:py-24" style={{ background: CREAM }}>
        <div className="mx-auto grid max-w-[1080px] items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <div className="order-2 md:order-1">
            <Eyebrow>Post one · Motion</Eyebrow>
            <h2
              className="font-figtree mt-3 text-[30px] font-bold leading-[1.15] sm:text-[38px]"
              style={{ color: GREEN }}
            >
              A ten-second introduction
            </h2>
            <p className="font-figtree mt-4 text-[16px] leading-[1.6] text-[#4a4a4a] sm:text-[17px]">
              The launch post had to answer “who?” before it sold anything, so
              it is built as a question and an answer rather than a montage.
              Flat illustration and type do the whole job — no stock footage —
              which keeps the brand’s own colours on screen for the full ten
              seconds and makes the piece cheap to re-cut for later campaigns.
            </p>
            <p className="font-figtree mt-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#9a9a9a]">
              9:16 reel · 1080 × 1920 · ~10s loop
            </p>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            <div
              className="w-full max-w-[330px] overflow-hidden rounded-[26px] bg-white p-2 shadow-[0_22px_60px_rgba(0,64,27,0.22)]"
            >
              <AutoVideo
                src="/assets/irbinor/motion.mp4"
                poster="/assets/irbinor/motion-poster.jpg"
                ariaLabel="Irbinor Events launch reel — an animated 9:16 Instagram post introducing the brand"
                className="block aspect-[9/16] w-full rounded-[18px] bg-white object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── carousel ───────────────────────────────────────────────────── */}
      <section className="px-6 py-16 sm:px-10 md:py-24" style={{ background: "#ffffff" }}>
        <div className="mx-auto max-w-[1080px]">
          <div className="max-w-[640px]">
            <Eyebrow>Post two · Carousel</Eyebrow>
            <h2
              className="font-figtree mt-3 text-[30px] font-bold leading-[1.15] sm:text-[38px]"
              style={{ color: GREEN }}
            >
              What we do, in five swipes
            </h2>
            <p className="font-figtree mt-4 text-[16px] leading-[1.6] text-[#4a4a4a] sm:text-[17px]">
              Three services that look nothing alike had to sit in one post. The
              cover splits the frame four ways so all of it is visible at once;
              then each middle slide hands a single service its own polaroid,
              pulled forward out of the same photo set, so the swipe feels like
              someone laying pictures on a table. The last slide puts the lockup
              back where the cover had it.
            </p>
          </div>

          <div className="mt-12">
            <InstagramPost
              handle="irbinor.events"
              avatar="/assets/graphic-design/irbinor.jpg"
              caption="We create stories that are larger than life, with a last mile touch."
              slides={SLIDES.map((s) => ({
                src: `/assets/irbinor/post-${s.n}.jpg`,
                alt: s.alt,
              }))}
            />
            <p className="font-figtree mt-5 text-center text-[13px] text-[#9a9a9a]">
              Swipe, or use the arrows, to move through the post
            </p>
          </div>
        </div>
      </section>

      {/* ── sign-off ───────────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-10 md:py-24" style={{ background: GREEN }}>
        <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-7 text-center">
          <div
            className="rounded-[16px] px-10 py-7 shadow-[0_18px_44px_rgba(0,0,0,0.26)]"
            style={{ background: CREAM }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/irbinor/logo.png"
              alt=""
              loading="lazy"
              className="h-auto w-full max-w-[260px]"
            />
          </div>
          <p className="font-hand text-[26px] leading-none text-white/80">
            larger than life, with a last mile touch
          </p>

          {/* Where this work actually lives. Buttons rather than links in a
              sentence: they are the one thing to do at the end of the page, so
              they are sized to be found rather than read past. */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-figtree inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[14px] font-semibold transition-[transform,background-color,color] duration-200 ease-out hover:scale-[1.04] active:scale-[0.98] ${
                  c.primary
                    ? "bg-[#fdf8ef] text-[#00401b] hover:bg-white"
                    : "text-white ring-1 ring-white/45 hover:bg-white hover:text-[#00401b]"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="size-[18px] shrink-0"
                  fill={c.filled ? "currentColor" : "none"}
                  stroke={c.filled ? "none" : "currentColor"}
                  strokeWidth={1.9}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {c.paths.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </GraphicWorkShell>
  );
}
