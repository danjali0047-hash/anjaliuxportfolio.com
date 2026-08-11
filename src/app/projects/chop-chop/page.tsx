import type { Metadata } from "next";
import CaseStudyShell from "@/app/components/CaseStudyShell";

export const metadata: Metadata = {
  title: "Chop Chop — Case Study | Anjali Dubey",
  description:
    "Chop Chop — a daily meal planner taken from idea to deployment in six hours. UX case study by Anjali Dubey.",
};

export default function ChopChopPage() {
  return (
    <CaseStudyShell slug="chop-chop">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/chop-chop/full.png"
        alt="Chop Chop — UX case study"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </CaseStudyShell>
  );
}
