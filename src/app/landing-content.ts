/**
 * The landing page's words, in one place.
 *
 * The page has two layouts — the fixed 1728px canvas (Landing.tsx) and the
 * phone layout (LandingMobile.tsx) — and they must never disagree about what
 * Anjali's job title was or when she held it. The canvas keeps its own absolute
 * positions, because those are measured against artwork and can't be derived;
 * it takes only the text from here.
 */
import * as A from "./landing-assets";

export type Experience = {
  company: string;
  role: string;
  dates: string;
  blurb: string;
  logo: string;
  /** the logo's aspect on the phone layout, since these vary a lot */
  logoW: number;
  logoH: number;
};

/** Most recent first — the order both layouts read them in. */
export const EXPERIENCE: Experience[] = [
  {
    company: "Irbinor",
    role: "Graphic Designer",
    dates: "July 2026 - Present",
    blurb:
      "Designed Instagram posts and motion graphic videos for the brand, carrying one visual language across static creatives and short-form motion.",
    logo: A.imgIrbinorLogo,
    logoW: 44,
    logoH: 44,
  },
  {
    company: "Curvet",
    role: "Product Designer",
    dates: "Oct 2025 - June 2026",
    blurb:
      "Designed an AI-powered meal planning platform. Collaborated with developers to ship features. Improved user retention through UX.",
    logo: A.imgCurvetLogo,
    logoW: 72,
    logoH: 45,
  },
  {
    company: "HECARDS",
    role: "UI Designer",
    dates: "Jun 2025 - Jul 2025",
    blurb:
      "Directed the end-to-end UI design of the website, transforming ideas into intuitive and visually cohesive digital experiences.",
    logo: A.imgImage630,
    logoW: 48,
    logoH: 48,
  },
  {
    company: "The Climate Troopers",
    role: "UX Designer",
    dates: "Oct 2024 - Apr 2025",
    blurb:
      "Redesigned the website interactions to create a smoother user experience, while also leading form design and crafting posters and Instagram creatives.",
    logo: A.imgImage628,
    logoW: 84,
    logoH: 22,
  },
];

export type Contact = {
  key: string;
  label: string;
  href: string;
  icon: "email" | "phone" | "linkedin" | "instagram";
};

export const CONTACTS: Contact[] = [
  { key: "email", label: "danjali0047@gmail.com", href: "mailto:danjali0047@gmail.com", icon: "email" },
  { key: "linkedin", label: "Anjali Dubey", href: "https://www.linkedin.com/in/anjali-dubey-355b66291/", icon: "linkedin" },
  { key: "phone", label: "+91 8956449498", href: "tel:+918956449498", icon: "phone" },
  { key: "instagram", label: "@anjaliiiii.dubey", href: "https://www.instagram.com/anjaliiiii.dubey/", icon: "instagram" },
];

/** Section headings, shared so the two layouts announce the same page. */
export const SECTIONS = {
  roadSoFar: { title: "ROAD SO FAR", sub: "My Experiences" },
  uxProjects: { title: "UX PROJECTS", sub: "The ones I thought hardest about" },
  graphic: { title: "GRAPHIC DESIGN WORK", sub: "Because I called myself a visual designer" },
  otherThanThat: { title: "OTHER THAN THAT", sub: "Jack of all, master of none (yet)" },
  moreToLife: { title: "THERE'S ALWAYS MORE TO LIFE", sub: "Cheers to life (Click!!)" },
} as const;

export const RESUME_URL = "/pdfs/resume.pdf?v=4";
