import type { Metadata } from "next";
import GraphicWorkShell from "@/app/components/GraphicWorkShell";
import { bandsToGradient } from "@/app/projects/projects";

export const metadata: Metadata = {
  title: "Coo — Shared living | Anjali Dubey",
  description:
    "Coo — brand identity for a shared-living app. Graphic design work by Anjali Dubey.",
};

/**
 * Background bands behind the deck, so the margins either side continue the
 * artwork instead of framing it in white. Read off the render's own edge
 * columns (median of a 14px strip each side, so content that bleeds to the
 * edge doesn't skew the sample) against the 8787px-tall image.
 *
 * The mood-board photos run full bleed, so no solid colour can truly continue
 * them — that stretch falls back to the cream the section sits on.
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
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </GraphicWorkShell>
  );
}
