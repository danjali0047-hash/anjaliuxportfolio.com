import type { Metadata } from "next";
import CaseStudyShell from "@/app/components/CaseStudyShell";
import ScaledCanvas from "@/app/components/ScaledCanvas";
import { SERVEEZE } from "./serveeze-data";

export const metadata: Metadata = {
  title: "Serveeze — Case Study | Anjali Dubey",
  description:
    "Serveeze — a platform that simplifies hiring trusted house help in India. UX case study by Anjali Dubey.",
};

export default function ServeezePage() {
  return (
    <CaseStudyShell slug="serveeze">
      <ScaledCanvas width={SERVEEZE.width} height={SERVEEZE.height}>
        <div
          style={{
            position: "relative",
            width: SERVEEZE.width,
            height: SERVEEZE.height,
            background: SERVEEZE.bg,
          }}
        >
          {SERVEEZE.items.map((it, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={it.src}
              alt=""
              draggable={false}
              style={{
                position: "absolute",
                left: it.x,
                top: it.y,
                width: it.w,
                height: it.h,
                opacity: it.o,
                pointerEvents: "none",
              }}
            />
          ))}
        </div>
      </ScaledCanvas>
    </CaseStudyShell>
  );
}
