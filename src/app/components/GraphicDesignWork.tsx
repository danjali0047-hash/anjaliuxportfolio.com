/**
 * "GRAPHIC DESIGN WORK" — three polaroids pinned to the cork board.
 *
 * Rendered INSIDE the scaled canvas, so every coordinate here is native
 * (1728-wide) px, same as Landing.tsx.
 *
 * To fill it in: drop the artwork into `public/assets/graphic-design/`, then set
 * `title` and `img` on the matching entry below. An entry with no `img` renders
 * as an empty frame, so a half-finished board still pins up correctly.
 */
import * as A from "../landing-assets";

type Piece = {
  /** caption handwritten across the polaroid's bottom margin */
  title: string;
  /** e.g. "/assets/graphic-design/poster-series.jpg" — omit for an empty frame */
  img?: string;
  /** optional link out (Instagram post, Behance, Drive folder…) */
  href?: string;
  /** centre of the polaroid, from the left edge of the canvas */
  cx: number;
  /** top of the polaroid, from the top of the board */
  cy: number;
  /** resting tilt in degrees — nothing gets pinned up straight */
  tilt: number;
  /** push-pin colour */
  pin: string;
};

// Spacing, height and tilt are deliberately uneven: line three photos up and
// the board reads as a grid, which is the opposite of how anyone pins things.
const PIECES: Piece[] = [
  { title: "Poster series", cx: 455, cy: 320, tilt: -3.5, pin: "#d94b3f" },
  { title: "Social creatives", cx: 880, cy: 430, tilt: 2.4, pin: "#e8b23a" },
  { title: "Brand identity", cx: 1320, cy: 370, tilt: -1.8, pin: "#3f9d9b" },
];

// Image512.png — the board runs the full width of the canvas, ignoring the
// page's content margins, so it reads as a board on the wall rather than a
// picture in a column.
const CANVAS_W = 1728;
const TOP = 3150;
const ART_W = 1425;
const ART_H = 952;
const BOARD_H = Math.round((CANVAS_W * ART_H) / ART_W);

/**
 * Inside edges of the wooden frame, as fractions of the artwork — measured off
 * the PNG by finding where the bright frame gives way to the darker cork. Only
 * used by the dev-time assertion below, which is what stops a photo from being
 * pinned to the frame instead of the board.
 */
const CORK = { left: 0.094, right: 0.9481, top: 0.0924, bottom: 0.9244 };

// polaroid proportions: even margin on three sides, deep margin under the photo
const FRAME_W = 350;
const MAT = 16;
const PHOTO = FRAME_W - MAT * 2; // square window
const CAPTION_H = 74;
const FRAME_H = MAT + PHOTO + CAPTION_H;

if (process.env.NODE_ENV !== "production") {
  for (const p of PIECES) {
    const within =
      p.cx - FRAME_W / 2 >= CORK.left * CANVAS_W &&
      p.cx + FRAME_W / 2 <= CORK.right * CANVAS_W &&
      p.cy >= CORK.top * BOARD_H &&
      p.cy + FRAME_H <= CORK.bottom * BOARD_H;
    if (!within) console.warn(`"${p.title}" is pinned outside the cork area`);
  }
}

export default function GraphicDesignWork() {
  return (
    <div
      id="graphic-design"
      className="absolute left-0"
      style={{ top: TOP, width: CANVAS_W, height: BOARD_H }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={A.imgImage512}
        className="absolute left-0 top-0 max-w-none pointer-events-none"
        style={{ width: CANVAS_W, height: BOARD_H }}
      />

      {PIECES.map((p, i) => {
        const Tag = p.href ? "a" : "div";
        return (
          <Tag
            key={p.title}
            {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group absolute block bg-white shadow-[0_12px_26px_rgba(0,0,0,0.32)] transition-transform duration-200 ease-out hover:z-10 hover:scale-[1.04]"
            style={{
              left: p.cx - FRAME_W / 2,
              top: p.cy,
              width: FRAME_W,
              padding: MAT,
              paddingBottom: CAPTION_H,
              borderRadius: 3,
              // pivot at the pin, so hovering lifts the photo around the point
              // it's actually held by
              transformOrigin: "50% 0",
              transform: `rotate(${p.tilt}deg)`,
              zIndex: 2 + i,
            }}
          >
            {/* push pin, driven through the top of the frame */}
            <span
              aria-hidden
              className="absolute left-1/2 top-0 size-[26px] -translate-x-1/2 -translate-y-[13px] rounded-full shadow-[0_4px_7px_rgba(0,0,0,0.4)]"
              style={{
                background: `radial-gradient(circle at 34% 28%, rgba(255,255,255,0.85), rgba(255,255,255,0) 46%), ${p.pin}`,
              }}
            />

            {p.img ? (
              <div className="overflow-hidden bg-[#eee]" style={{ height: PHOTO }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={p.title} src={p.img} className="block size-full object-cover" />
              </div>
            ) : (
              <div
                className="flex items-center justify-center border-2 border-dashed border-[#dcdcdc] bg-[#f4f4f4]"
                style={{ height: PHOTO }}
              >
                <span className="font-figtree text-[15px] font-medium text-[#b4b4b4]">
                  Artwork coming soon
                </span>
              </div>
            )}

            <p
              className="font-hand absolute inset-x-0 text-center text-[32px] leading-none text-[#333]"
              style={{ bottom: CAPTION_H / 2 - 13 }}
            >
              {p.title}
            </p>
          </Tag>
        );
      })}
    </div>
  );
}
