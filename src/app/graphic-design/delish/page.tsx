import type { Metadata } from "next";
import DeckSlices from "@/app/components/DeckSlices";
import GraphicWorkShell from "@/app/components/GraphicWorkShell";
import { bandsToGradient } from "@/app/projects/projects";

export const metadata: Metadata = {
  title: "Delish — Bake house | Anjali Dubey",
  description:
    "Delish — brand identity for a bake house. Graphic design work by Anjali Dubey.",
};

/**
 * Background bands behind the deck, read off the render's own edge columns
 * (median of a 14px strip each side, so content bleeding to the edge doesn't
 * skew the sample) against the 25440px-tall render. Much of this deck is
 * photography running full bleed, where no solid colour can truly continue the
 * image — those stretches take the dominant tone of the photograph instead.
 *
 * Visible on displays wider than the render, and behind the deck while its
 * slices load, so the page arrives in its own colours rather than as a gap.
 */
const BANDS = {
  height: 25440,
  bands: [
    { to: 2152, color: "#7f5340" }, // hero photography, warm brown
    { to: 4416, color: "#fdfefc" }, // colour palette
    { to: 5052, color: "#e8ded2" }, // bakery photo strip
    { to: 9984, color: "#fbfbfa" }, // logo and explorations
    { to: 11832, color: "#f8e7d1" }, // cream
    { to: 12930, color: "#b2a184" }, // photography
    { to: 16226, color: "#241005" }, // dark packaging section
    { to: 18912, color: "#fcfef4" }, // social creatives
    { to: 21032, color: "#58212e" }, // maroon app section
    { to: 25440, color: "#fff7f9" }, // closing
  ],
};

export default function DelishPage() {
  return (
    <GraphicWorkShell
      title="Delish"
      meta="Bake house · Brand identity"
      background={bandsToGradient(BANDS)}
    >
      <DeckSlices
        dir="delish"
        name="delish"
        count={6}
        maxWidth={3842}
        alt="Delish — brand identity for a bake house: logo, colour palette, explorations, packaging, social creatives and app screens"
      />
    </GraphicWorkShell>
  );
}
