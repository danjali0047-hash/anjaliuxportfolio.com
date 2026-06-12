import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UX Projects | Anjali Dubey",
  description: "UX case studies by Anjali Dubey — Serveeze, Chop Chop, and Pune Metro.",
};

const PROJECTS = [
  {
    slug: "serveeze",
    title: "Serveeze",
    tagline: "Simplifying domestic hiring in India",
    meta: "UX Case Study",
    thumb: "/assets/serveeze/thumb.png",
  },
  {
    slug: "chop-chop",
    title: "Chop Chop",
    tagline: "Your go-to daily meal planner",
    meta: "Idea to deployment · 6 hours",
    thumb: "/assets/chop-chop/thumb.png",
  },
  {
    slug: "pune-metro",
    title: "Pune Metro",
    tagline: "A digital companion for urban commuters",
    meta: "Mobile App · UX/UI",
    thumb: "/assets/pune-metro/thumb.png",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9] px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="font-figtree text-sm font-semibold text-[#666] transition-colors hover:text-[#00af26]"
        >
          ← Back to home
        </Link>

        <header className="mt-6 mb-12">
          <p className="font-figtree text-sm font-bold uppercase tracking-wide text-[#00af26]">
            UX Projects
          </p>
          <h1 className="font-figtree mt-2 text-4xl md:text-6xl font-bold text-[#222]">
            Selected case studies
          </h1>
          <p className="font-figtree mt-4 max-w-xl text-lg text-[#666]">
            A look at how I take problems from research to polished, shipped
            experiences.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#eee]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.thumb}
                  alt={`${p.title} preview`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-figtree text-xs font-semibold uppercase tracking-wide text-[#00af26]">
                  {p.meta}
                </p>
                <h2 className="font-figtree mt-1 text-2xl font-bold text-[#222]">
                  {p.title}
                </h2>
                <p className="font-figtree mt-1 text-[#666]">{p.tagline}</p>
                <span className="font-figtree mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#222] transition-colors group-hover:text-[#00af26]">
                  View case study
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
