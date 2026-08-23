"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Chrome for a piece of graphic design work opened from the cork board, so it
 * reads as another room in the portfolio rather than a PDF that opened in its
 * own tab.
 *
 * Deliberately NOT CaseStudyShell. That shell is driven by the PROJECTS list,
 * which also feeds the landing page's UX Projects folder, the /projects index
 * and each case study's "next case study" hand-off — so putting a graphic
 * design piece through it would file it among the UX case studies everywhere
 * those appear. What is left once that coupling is dropped is genuinely
 * smaller: no sibling pills, no next-project hand-off, no PDF button.
 */
export default function GraphicWorkShell({
  title,
  meta,
  background,
  layout = "full",
  children,
}: {
  title: string;
  meta: string;
  /** CSS background behind the artwork — usually a band gradient */
  background?: string;
  /**
   * "full" runs the artwork edge to edge, which is right for work that was
   * designed at web proportions — it fills the window the way the real site
   * would. "column" caps it at 1440 with margins, for work that is really a
   * slide deck and would otherwise read as a document zoomed to fit.
   */
  layout?: "full" | "column";
  children: React.ReactNode;
}) {
  const router = useRouter();
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

  // Always ends up home. When the visitor came *straight* from the landing page
  // we step back through history rather than pushing, so the landing page
  // restores its scroll position — they return to the cork board where they
  // left it, not to the top of the page. A deep link falls through to a normal
  // navigation, where stepping back would leave the site entirely.
  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof document === "undefined" || !document.referrer) return;
    let from: URL;
    try {
      from = new URL(document.referrer);
    } catch {
      return;
    }
    const cameStraightFromHome =
      from.origin === window.location.origin && from.pathname === "/";
    if (cameStraightFromHome && window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <main className="bg-[#f9f9f9]">
      {/* `fixed`, not `sticky`: globals.css puts `overflow-x: hidden` on body,
          which makes body a scroll container and stops sticky children from
          ever engaging in Chrome/Safari. The spacer below reserves its height. */}
      <header className="fixed inset-x-0 top-0 z-[200] border-b border-black/[0.07] bg-[#f9f9f9]/85 backdrop-blur-md">
        <div
          className={`mx-auto flex h-[62px] items-center gap-4 px-4 sm:px-8 lg:px-12 ${
            layout === "full" ? "max-w-[1920px]" : "max-w-[1440px]"
          }`}
        >
          <Link
            href="/"
            onClick={goHome}
            className="font-figtree flex shrink-0 items-center gap-1.5 rounded-full bg-[#222] px-3.5 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#00af26]"
          >
            <span aria-hidden>←</span>
            Back
          </Link>

          <div className="min-w-0 flex-1 text-center">
            <p className="font-figtree truncate text-[15px] font-bold text-[#222]">
              {title}
            </p>
            <p className="font-figtree hidden truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-[#00af26] sm:block">
              {meta}
            </p>
          </div>

          {/* balances the Back pill so the title stays optically centred */}
          <div aria-hidden className="w-[86px] shrink-0" />
        </div>

        {/* reading progress — these pages are very tall */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[3px] bg-[#00af26] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </header>

      {/* height reserved for the fixed bar */}
      <div aria-hidden className="h-[62px]" />

      {/* This wrapper's height is exactly the artwork's rendered height (the
          column adds no vertical padding), so a percentage-based band gradient
          lines up with the deck at any scale. */}
      <div className="case-study-fade" style={{ background: background ?? "#ffffff" }}>
        {layout === "full" ? (
          children
        ) : (
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
            {children}
          </div>
        )}
      </div>

      <footer className="bg-[#141414] px-4 py-16 sm:px-8 md:py-24 lg:px-12">
        <div
          className={`mx-auto flex flex-wrap items-center gap-x-8 gap-y-3 ${
            layout === "full" ? "max-w-[1920px]" : "max-w-[1440px]"
          }`}
        >
          <Link
            href="/"
            onClick={goHome}
            className="font-figtree text-sm font-semibold text-white transition-colors hover:text-[#00af26]"
          >
            ← Back to home
          </Link>
          <Link
            href="/projects"
            className="font-figtree text-sm font-semibold text-white/60 transition-colors hover:text-[#00af26]"
          >
            UX case studies
          </Link>
          <a
            href="mailto:danjali0047@gmail.com"
            className="font-figtree text-sm font-semibold text-white/60 transition-colors hover:text-[#00af26]"
          >
            danjali0047@gmail.com
          </a>
        </div>
      </footer>
    </main>
  );
}
