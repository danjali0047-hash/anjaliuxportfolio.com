"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PROJECTS,
  bandsToGradient,
  getNextProject,
  getProject,
} from "@/app/projects/projects";

/**
 * Shared chrome for every case study, so a case study reads as another room in
 * the portfolio rather than a document that opened in its own tab:
 *
 *  - a sticky bar carrying the portfolio's name, the current project, and
 *    pills for the other two case studies (jump sideways without going home)
 *  - a reading-progress line, since these pages are very tall
 *  - "Back" that steps through browser history when the visitor came from the
 *    landing page, so they land back on the open folder at the same scroll spot
 *  - a closing block that hands off to the next case study
 *
 * The case-study artwork itself is passed in as `children`.
 */
export default function CaseStudyShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const project = getProject(slug);
  const next = getNextProject(slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Prefer history.back() so the landing page restores its scroll position and
  // the projects folder is still open — falls back to a normal push for anyone
  // who deep-linked straight into the case study.
  const goBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const cameFromSite =
      typeof document !== "undefined" &&
      document.referrer &&
      new URL(document.referrer).origin === window.location.origin;
    if (cameFromSite && window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
  };

  if (!project) return <>{children}</>;

  const others = PROJECTS.filter((p) => p.slug !== slug);

  return (
    <main className="bg-[#f9f9f9]">
      {/* ── pinned top bar ─────────────────────────────────────────────────
          `fixed`, not `sticky`: globals.css puts `overflow-x: hidden` on body,
          which makes body a scroll container and stops sticky children from
          ever engaging in Chrome/Safari. The spacer below reserves its height. */}
      <header className="fixed inset-x-0 top-0 z-[200] border-b border-black/[0.07] bg-[#f9f9f9]/85 backdrop-blur-md">
        {/* same column as the artwork below, so the back arrow lines up with
            the case study's left edge instead of floating in the margin */}
        <div className="mx-auto flex h-[62px] max-w-[1440px] items-center gap-4 px-4 sm:px-8 lg:px-12">
          <Link
            href="/"
            onClick={goBack}
            className="font-figtree group flex shrink-0 items-center gap-2 text-sm font-semibold text-[#222]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#222] text-white transition-colors group-hover:bg-[#00af26]">
              ←
            </span>
            <span className="hidden transition-colors group-hover:text-[#00af26] sm:inline">
              Anjali&apos;s portfolio
            </span>
          </Link>

          <div className="min-w-0 flex-1 text-center">
            <p className="font-figtree truncate text-[15px] font-bold text-[#222]">
              {project.title}
            </p>
            <p className="font-figtree hidden truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-[#00af26] sm:block">
              {project.meta}
            </p>
          </div>

          <nav className="flex shrink-0 items-center gap-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="font-figtree hidden rounded-full px-3 py-1.5 text-[13px] font-semibold text-[#666] ring-1 ring-black/10 transition-colors hover:bg-white hover:text-[#00af26] md:inline-block"
              >
                {p.title}
              </Link>
            ))}
            <a
              href={project.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="font-figtree rounded-full bg-[#222] px-3.5 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#00af26]"
            >
              PDF
            </a>
          </nav>
        </div>

        {/* reading progress */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[3px] bg-[#00af26] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </header>

      {/* height reserved for the fixed bar */}
      <div aria-hidden className="h-[62px]" />

      {/* ── the case study itself ──────────────────────────────────────────
          The artwork is a fixed 1728px-wide design and ScaledCanvas sizes
          itself from this container, so the container width *is* the zoom
          control: rendered size = container / 1728.

          Running it edge-to-edge is what made it read as a document zoomed to
          fit the window. Capping at 1440 with real side padding gives the
          column margins on any laptop and lands body copy near 15px, which is
          normal web reading size. Raise CONTENT_MAX to zoom the whole case
          study up (less margin), lower it to zoom down (more margin) — the two
          move together, because the copy is baked into the images and can't be
          sized independently of them. */}
      {/* This wrapper's height is exactly the artwork's rendered height (the
          column adds no vertical padding), so a percentage-based band gradient
          lines up with the slides at any scale. */}
      <div
        className="case-study-fade"
        style={{
          background: project.pageBands
            ? bandsToGradient(project.pageBands)
            : project.pageBg ?? "#ffffff",
        }}
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
          {children}
        </div>
      </div>

      {/* ── hand-off to the next case study ────────────────────────────── */}
      <footer className="bg-[#141414] px-4 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-figtree text-xs font-bold uppercase tracking-[0.12em] text-[#00af26]">
            Next case study
          </p>

          <Link
            href={`/projects/${next.slug}`}
            className="group mt-6 flex flex-col gap-6 sm:flex-row sm:items-center"
          >
            <div className="h-[120px] w-full shrink-0 overflow-hidden rounded-2xl bg-[#222] sm:w-[200px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={next.thumb}
                alt=""
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0">
              <h2 className="font-figtree text-3xl font-bold text-white transition-colors group-hover:text-[#00af26] md:text-5xl">
                {next.title}
              </h2>
              <p className="font-figtree mt-2 text-lg text-white/60">
                {next.tagline}
              </p>
            </div>
            <span className="font-figtree ml-auto hidden shrink-0 items-center gap-2 text-sm font-semibold text-white sm:flex">
              View
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
            <Link
              href="/"
              onClick={goBack}
              className="font-figtree text-sm font-semibold text-white transition-colors hover:text-[#00af26]"
            >
              ← Back to portfolio
            </Link>
            <Link
              href="/projects"
              className="font-figtree text-sm font-semibold text-white/60 transition-colors hover:text-[#00af26]"
            >
              All case studies
            </Link>
            <a
              href="mailto:danjali0047@gmail.com"
              className="font-figtree text-sm font-semibold text-white/60 transition-colors hover:text-[#00af26]"
            >
              danjali0047@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
