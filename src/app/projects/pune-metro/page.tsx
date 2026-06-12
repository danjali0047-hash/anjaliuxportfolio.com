import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pune Metro — Case Study | Anjali Dubey",
  description: "Pune Metro — UX case study by Anjali Dubey.",
};

export default function PuneMetroPage() {
  return (
    <main style={{ background: "#ffffff" }}>
      <div style={{ width: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/pune-metro/full.png"
          alt="Pune Metro — UX case study"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      <Link
        href="/"
        className="font-figtree fixed bottom-6 left-6 z-50 rounded-full bg-[#222] text-white px-5 py-2.5 text-sm font-semibold shadow-lg transition-colors hover:bg-[#00af26]"
      >
        ← Home
      </Link>
    </main>
  );
}
