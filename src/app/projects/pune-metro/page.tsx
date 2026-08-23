import type { Metadata } from "next";
import CaseStudyShell from "@/app/components/CaseStudyShell";
import DeckSlices from "@/app/components/DeckSlices";

export const metadata: Metadata = {
  title: "Pune Metro — Case Study | Anjali Dubey",
  description:
    "Pune Metro — a digital companion for urban commuters. UX case study by Anjali Dubey.",
};

const PROTOTYPE_URL =
  "https://www.figma.com/proto/JzPMqAaVwrNFmuq4GMYL8x/Pune-Metro?node-id=197-293&t=rbFIRh3CgrA2qPW2-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=293%3A1088&show-proto-sidebar=1";

/**
 * The "View Prototype" pill is painted into the artwork, so there is no element to
 * link — this is a transparent hotspot laid over it. The pill's solid body
 * measures x 130–617, y 27856–27975 of the 3456×29130 artwork; these bounds add
 * a few pixels so the rounded caps are covered too. Percentages rather than
 * pixels, so the hotspot tracks the button at any scale.
 */
const PROTOTYPE_HOTSPOT = {
  left: "3.6458%",
  top: "95.5991%",
  width: "14.3229%",
  height: "0.4634%",
};

export default function PuneMetroPage() {
  return (
    <CaseStudyShell slug="pune-metro">
      <div style={{ position: "relative" }}>
        <DeckSlices
          dir="pune-metro"
          name="pune-metro"
          count={7}
          maxWidth={3456}
          alt="Pune Metro — UX case study"
        />
        <a
          href={PROTOTYPE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View the Pune Metro prototype in Figma (opens in a new tab)"
          className="artwork-hotspot"
          style={{ position: "absolute", ...PROTOTYPE_HOTSPOT }}
        />
      </div>
    </CaseStudyShell>
  );
}
