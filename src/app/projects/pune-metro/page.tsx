import type { Metadata } from "next";
import CaseStudyShell from "@/app/components/CaseStudyShell";

export const metadata: Metadata = {
  title: "Pune Metro — Case Study | Anjali Dubey",
  description:
    "Pune Metro — a digital companion for urban commuters. UX case study by Anjali Dubey.",
};

export default function PuneMetroPage() {
  return (
    <CaseStudyShell slug="pune-metro">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/pune-metro/full.png"
        alt="Pune Metro — UX case study"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </CaseStudyShell>
  );
}
