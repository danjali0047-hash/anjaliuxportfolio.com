import type { Metadata } from "next";
import Link from "next/link";
import ScaledCanvas from "@/app/components/ScaledCanvas";
import { SERVEEZE } from "./serveeze-data";

export const metadata: Metadata = {
  title: "Serveeze — Case Study | Anjali Dubey",
  description:
    "Serveeze — a platform that simplifies hiring trusted house help in India. UX case study by Anjali Dubey.",
};

export default function ServeezePage() {
  return (
    <main style={{ background: SERVEEZE.bg }}>
      <ScaledCanvas width={SERVEEZE.width} height={SERVEEZE.height}>
        <div
          style={{
            position: "relative",
            width: SERVEEZE.width,
            height: SERVEEZE.height,
            background: SERVEEZE.bg,
          }}
        >
          {SERVEEZE.items.map((it, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={it.src}
              alt=""
              draggable={false}
              style={{
                position: "absolute",
                left: it.x,
                top: it.y,
                width: it.w,
                height: it.h,
                opacity: it.o,
                pointerEvents: "none",
              }}
            />
          ))}
        </div>
      </ScaledCanvas>

      {/* Floating back-to-home control */}
      <Link
        href="/"
        className="font-figtree fixed bottom-6 left-6 z-50 rounded-full bg-[#222] text-white px-5 py-2.5 text-sm font-semibold shadow-lg transition-colors hover:bg-[#00af26]"
      >
        ← Home
      </Link>
    </main>
  );
}
