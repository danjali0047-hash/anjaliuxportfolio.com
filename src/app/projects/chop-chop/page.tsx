import type { Metadata } from "next";
import CaseStudyShell from "@/app/components/CaseStudyShell";
import DeckSlices from "@/app/components/DeckSlices";

export const metadata: Metadata = {
  title: "Chop Chop — Case Study | Anjali Dubey",
  description:
    "Chop Chop — a daily meal planner taken from idea to deployment in six hours. UX case study by Anjali Dubey.",
};

export default function ChopChopPage() {
  return (
    <CaseStudyShell slug="chop-chop">
      <DeckSlices
        dir="chop-chop"
        name="chop-chop"
        count={4}
        maxWidth={3456}
        alt="Chop Chop — UX case study"
      />
    </CaseStudyShell>
  );
}
