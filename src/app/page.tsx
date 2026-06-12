import Landing from "./components/Landing";
import ScaledCanvas from "./components/ScaledCanvas";
import HeroDragLayer from "./components/HeroDragLayer";
import HeroSounds from "./components/HeroSounds";
import NotebookReveal from "./components/NotebookReveal";
import ScrollCar from "./components/ScrollCar";
import FolderStickers from "./components/FolderStickers";
import FilesDrop from "./components/FilesDrop";
import ProjectCards from "./components/ProjectCards";
import PhotoSwap from "./components/PhotoSwap";
import CardCarousel from "./components/CardCarousel";

// Native dimensions of the Figma landing frame (node 1:2).
const LANDING_WIDTH = 1728;
const LANDING_HEIGHT = 5051;

export default function Home() {
  return (
    <main className="bg-[#f9f9f9]">
      <ScaledCanvas width={LANDING_WIDTH} height={LANDING_HEIGHT}>
        <div style={{ width: LANDING_WIDTH, height: LANDING_HEIGHT, position: "relative" }}>
          <Landing />
          {/* Transparent hover hit-area over the whole notebook (sits above the
              overlapping collage photos so hovering anywhere on the notebook works) */}
          <div
            data-notebook
            aria-hidden
            style={{
              position: "absolute",
              left: 1339,
              top: 267,
              width: 549,
              height: 600,
              zIndex: 46,
              cursor: "pointer",
            }}
          />
          {/* Dark backdrop revealed when the notebook is hovered */}
          <div
            id="hero-dim"
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: 0,
              pointerEvents: "none",
              transition: "opacity 0.45s ease",
              zIndex: 40,
            }}
          />
          {/* Open-notebook image that zooms into the hero centre on hover */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="open-notebook"
            src="/assets/landing/open-notebook.png"
            alt="Open notebook — About me and my to-do's"
            style={{
              position: "absolute",
              left: 864 - 500,
              top: 558 - 424,
              width: 1000,
              height: 708,
              objectFit: "contain",
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.55))",
              opacity: 0,
              scale: "0.82",
              transformOrigin: "center",
              pointerEvents: "none",
              transition: "opacity 0.45s ease, scale 0.45s cubic-bezier(0.2,0.8,0.2,1)",
              zIndex: 100,
            }}
          />
          {/* Project cards that fly out of the UX Projects folder on click */}
          <ProjectCards />
          {/* Horizontal swipe/drag carousel for the OTHER THAN THAT cards */}
          <CardCarousel />
        </div>
      </ScaledCanvas>
      <HeroDragLayer />
      <HeroSounds />
      <NotebookReveal />
      <ScrollCar />
      <FolderStickers />
      <FilesDrop />
      <PhotoSwap />
      {/* Road centreline (white dashed line) mapped into native canvas coords,
          used to drive the car along the road on scroll. */}
      <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
        <path
          id="road-path"
          fill="none"
          d="M 1507.8 1992 L 1549.43 1880.36 C 1595.98 1755.57 1595.98 1618.18 1549.43 1493.38 C 1506.68 1378.75 1503.09 1253.18 1539.24 1136.3 L 1621.60 870"
        />
      </svg>
    </main>
  );
}
