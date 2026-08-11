/**
 * Single source of truth for the three case studies.
 *
 * Used by the landing-page fly-out cards (ProjectCards), the /projects index,
 * and the shared case-study shell (back / next-project navigation). Keeping one
 * list means a new case study only has to be added here.
 */
export type Project = {
  slug: string;
  title: string;
  tagline: string;
  meta: string;
  thumb: string;
  /** Kept as an optional download on the case-study page — no longer the link target. */
  pdf: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "serveeze",
    title: "Serveeze",
    tagline: "Simplifying domestic hiring in India",
    meta: "UX Case Study",
    thumb: "/assets/serveeze/thumb.png",
    pdf: "/pdfs/serveeze.pdf",
  },
  {
    slug: "chop-chop",
    title: "Chop Chop",
    tagline: "Your go-to daily meal planner",
    meta: "Idea to deployment · 6 hours",
    thumb: "/assets/chop-chop/thumb.png",
    pdf: "/pdfs/chop-chop.pdf",
  },
  {
    slug: "pune-metro",
    title: "Pune Metro",
    tagline: "A digital companion for urban commuters",
    meta: "Mobile App · UX/UI",
    thumb: "/assets/pune-metro/thumb.png",
    pdf: "/pdfs/pune-metro.pdf",
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

/** The case study that follows `slug`, wrapping around at the end. */
export const getNextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};
