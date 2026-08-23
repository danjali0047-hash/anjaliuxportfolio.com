/**
 * Single source of truth for the three case studies.
 *
 * Used by the landing-page fly-out cards (ProjectCards), the /projects index,
 * and the shared case-study shell (back / next-project navigation). Keeping one
 * list means a new case study only has to be added here.
 */
/**
 * A deck whose background changes as you scroll. `bands` are measured in the
 * source image's own pixel rows (`height` is that image's full height), read
 * off the artwork's left and right edge columns, so the margins can switch
 * colour at exactly the rows the slides do.
 */
export type PageBands = {
  /** Full height of the source artwork, in its own pixels. */
  height: number;
  /** Each band runs from the previous band's `to` down to this one's. */
  bands: { to: number; color: string }[];
};

/**
 * Bands → a hard-stop vertical gradient. Each colour is emitted twice, at the
 * band's start and end, so there is no blend between bands. Positions are
 * percentages, which makes this independent of how far the artwork is scaled
 * down — the gradient tracks the image at any column width.
 */
export const bandsToGradient = ({ height, bands }: PageBands): string => {
  const pct = (y: number) => `${((y / height) * 100).toFixed(4)}%`;
  const stops: string[] = [];
  let from = 0;
  for (const band of bands) {
    stops.push(`${band.color} ${pct(from)}`, `${band.color} ${pct(band.to)}`);
    from = band.to;
  }
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  meta: string;
  thumb: string;
  /** Kept as an optional download on the case-study page — no longer the link target. */
  pdf: string;
  /**
   * Page background behind the case-study column, so the margins either side
   * continue the deck instead of framing it in white. Sampled from the deck's
   * own edge pixels; defaults to white when unset.
   */
  pageBg?: string;
  /** For decks that change background down the page. Takes precedence over `pageBg`. */
  pageBands?: PageBands;
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
    // the deck's black — modal colour of both edge columns, and both top corners
    pageBg: "#090909",
  },
  {
    slug: "pune-metro",
    title: "Pune Metro",
    tagline: "A digital companion for urban commuters",
    meta: "Mobile App · UX/UI",
    thumb: "/assets/pune-metro/thumb.png",
    pdf: "/pdfs/pune-metro.pdf",
    // This deck alternates blue and white. Boundary rows were read off
    // the artwork by taking the per-row median of a 14px strip at each edge (the
    // median ignores content that bleeds to the edge); the left and right
    // edges agree on every boundary below.
    pageBands: {
      height: 29130,
      bands: [
        { to: 3918, color: "#0f4462" },
        { to: 9749, color: "#ffffff" },
        { to: 27180, color: "#0f4462" },
        { to: 29130, color: "#ffffff" },
      ],
    },
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

/** The case study that follows `slug`, wrapping around at the end. */
export const getNextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};
