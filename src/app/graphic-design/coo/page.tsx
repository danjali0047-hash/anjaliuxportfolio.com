import type { Metadata } from "next";
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/coo/full.jpg"
        alt="Coo — brand identity for a shared-living app: logo, mood board, type and colour system, and app mockups"
        // Full width, but never past the render's own 2880px — beyond that it
        // would upscale, and the bands carry the colour out to the edges
        // instead. The deck was drawn at 1920, so on a normal display this
        // shows it at or near the size it was designed.
        style={{
          width: "100%",
          maxWidth: 2880,
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />
    </GraphicWorkShell>
  );
}
