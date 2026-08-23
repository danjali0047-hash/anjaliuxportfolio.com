import type { Metadata } from "next";
import DeckSlices from "@/app/components/DeckSlices";
import GraphicWorkShell from "@/app/components/GraphicWorkShell";
import { bandsToGradient } from "@/app/projects/projects";

export const metadata: Metadata = {
  title: "Coo — Shared living | Anjali Dubey",
  description:
    "Coo — brand identity for a shared-living app. Graphic design work by Anjali Dubey.",
};

/**
 * Background bands behind the deck. Read off the render's own edge columns
 * (median of a 14px strip each side, so content that bleeds to the edge doesn't
 * skew the sample) against the 8787px-tall image. The mood-board photos run
 * full bleed, so no solid colour can truly continue them — that stretch falls
 * back to the cream the section sits on.
 *
 * The deck runs edge to edge, so these are visible in two places: on displays
 * wider than the render, where the artwork stops and the bands carry the colour
 * out to the edges; and behind the artwork while it loads, which is worth
 * having for a 1.7MB image — the page arrives in the deck's own colours rather
 * than as a white gap.
 */
const BANDS = {
  height: 8787,
  bands: [
    { to: 1620, color: "#eadcc9" }, // hero photograph, warm
    { to: 3800, color: "#fefbf2" }, // mood board, cream
    { to: 4962, color: "#ffffff" }, // logo rationale
    { to: 8617, color: "#000000" }, // brand guidelines and app mockups
    { to: 8787, color: "#f8cb46" }, // closing yellow
  ],
};

export default function CooPage() {
  return (
    <GraphicWorkShell
      title="Coo"
      meta="Shared living · Brand identity"
      background={bandsToGradient(BANDS)}
    >
      <DeckSlices
        dir="coo"
        name="coo"
        count={3}
        maxWidth={3840}
        alt="Coo — brand identity for a shared-living app: logo, mood board, type and colour system, and app mockups"
      />
    </GraphicWorkShell>
  );
}
