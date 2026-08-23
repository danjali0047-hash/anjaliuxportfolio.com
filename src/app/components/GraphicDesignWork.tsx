/**
 * "GRAPHIC DESIGN WORK" gallery — the strip of pieces that sits under the
 * UX Projects fold, between the folder and "OTHER THAN THAT".
 *
 * Rendered INSIDE the scaled canvas, so every coordinate here is native
 * (1728-wide) px, same as Landing.tsx.
 *
 * To fill it in: drop the artwork into `public/assets/graphic-design/` and set
 * `img` on the matching entry below. Any entry left without an `img` renders as
 * a dashed empty slot, so a half-finished gallery still lays out correctly.
 */

type Piece = {
  /** caption printed under the artwork, in the handwritten face */
  title: string;
  /** e.g. "/assets/graphic-design/posters.jpg" — omit for an empty slot */
  img?: string;
  /** optional link out (Instagram post, Behance, Drive folder…) */
  href?: string;
  /** degrees of tilt — keeps the wall from looking like a spreadsheet */
  rotate: number;
  /** vertical nudge from the strip's top edge */
  dy: number;
};

const PIECES: Piece[] = [
  { title: "Posters", rotate: -3.2, dy: 8 },
  { title: "Instagram creatives", rotate: 2.1, dy: 30 },
  { title: "Branding", rotate: -1.4, dy: 0 },
  { title: "Typography", rotate: 2.8, dy: 26 },
  { title: "Illustration", rotate: -2.3, dy: 12 },
];

// strip geometry — same left margin and content width as the cards carousel
const LEFT = 106;
const TOP = 3169;
const STRIP_W = 1516;
const TILE_W = 280;
const TILE_H = 340;
const GAP = (STRIP_W - PIECES.length * TILE_W) / (PIECES.length - 1); // 29

export default function GraphicDesignWork() {
  return (
    <div
      id="graphic-design"
      className="absolute"
      style={{ left: LEFT, top: TOP, width: STRIP_W, height: 400 }}
    >
      {PIECES.map((p, i) => {
        const Tag = p.href ? "a" : "div";
        return (
          <Tag
            key={p.title}
            {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group absolute block origin-center transition-transform duration-200 ease-out hover:z-10 hover:scale-[1.04]"
            style={{
              left: i * (TILE_W + GAP),
              top: p.dy,
              width: TILE_W,
              transform: `rotate(${p.rotate}deg)`,
            }}
          >
            {/* white paper mount, so each piece reads as a print pinned to the wall */}
            <div className="rounded-[10px] bg-white p-[10px] shadow-[0_10px_26px_rgba(0,0,0,0.14)] transition-shadow duration-200 group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
              {p.img ? (
                <div
                  className="overflow-hidden rounded-[6px] bg-[#eee]"
                  style={{ height: TILE_H }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={p.title}
                    src={p.img}
                    className="block size-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="flex items-center justify-center rounded-[6px] border-2 border-dashed border-[#d4d4d4] bg-[#f4f4f4]"
                  style={{ height: TILE_H }}
                >
                  <span className="font-figtree text-[15px] font-medium text-[#b0b0b0]">
                    Artwork coming soon
                  </span>
                </div>
              )}
              <p className="font-hand mt-[10px] mb-[2px] text-center text-[26px] leading-none text-[#333]">
                {p.title}
              </p>
            </div>
          </Tag>
        );
      })}
    </div>
  );
}
