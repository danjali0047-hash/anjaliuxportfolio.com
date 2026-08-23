/**
 * "GRAPHIC DESIGN WORK" — three polaroids pegged to a fairy-light string,
 * hung on a grey wall.
 *
 * Rendered INSIDE the scaled canvas, so every coordinate here is native
 * (1728-wide) px, same as Landing.tsx.
 *
 * To fill it in: drop the artwork into `public/assets/graphic-design/`, then set
 * `title` and `img` on the matching entry below. An entry with no `img` renders
 * as an empty frame, so a half-finished wall still hangs correctly.
 */
import * as A from "../landing-assets";

type Piece = {
  /** caption handwritten across the polaroid's bottom margin */
  title: string;
  /** e.g. "/assets/graphic-design/poster-series.jpg" — omit for an empty frame */
  img?: string;
  /** optional link out (Instagram post, Behance, Drive folder…) */
  href?: string;
  /** centre of the polaroid, measured from the string's left end */
  cx: number;
  /** resting tilt in degrees — nothing hangs perfectly straight */
  tilt: number;
  /** length of string between the light wire and the peg */
  drop: number;
  /** seconds — desynchronises the sway so the three don't swing in lockstep */
  sway: number;
};

// cx / tilt / drop are deliberately uneven: matched spacing reads as a grid,
// and the point of a washing line is that it doesn't. The drops also counteract
// the wire's own rise and fall, so the photos end up at roughly — but not
// exactly — the same height.
const PIECES: Piece[] = [
  { title: "Poster series", cx: 210, tilt: -3.5, drop: 24, sway: 5.4 },
  { title: "Social creatives", cx: 745, tilt: 2.4, drop: 58, sway: 6.7 },
  { title: "Brand identity", cx: 1275, tilt: -1.8, drop: 44, sway: 6.0 },
];

// strip geometry — same left margin and content width as the cards carousel
const LEFT = 106;
const TOP = 3150;
const STRIP_W = 1516;
const STRIP_H = 490;

// Group238158.png, cropped to its content. Rendered at the strip's full width.
const ART_W = 4559;
const ART_H = 332;
const LIGHTS_H = (STRIP_W * ART_H) / ART_W;

/**
 * The wire's height sampled off the artwork itself (41 even steps across its
 * width, as a fraction of the image height) — the string is hand-drawn and
 * wanders, so there's no curve to solve. Pegs interpolate into this table,
 * which is what keeps them biting the wire instead of floating near it.
 */
const WIRE = [
  0.3404, 0.3404, 0.4608, 0.5512, 0.6175, 0.6747, 0.6777, 0.6355, 0.5873,
  0.5572, 0.4639, 0.3012, 0.2169, 0.1536, 0.0452, 0.0964, 0.2620, 0.3675,
  0.4066, 0.4428, 0.4970, 0.4970, 0.4428, 0.3765, 0.2952, 0.1747, 0.0392,
  0.1506, 0.2139, 0.2982, 0.4578, 0.5512, 0.5843, 0.6325, 0.6747, 0.6717,
  0.6114, 0.5482, 0.4578, 0.3373, 0.3373,
];
const wireY = (x: number) => {
  const t = Math.max(0, Math.min(1, x / STRIP_W)) * (WIRE.length - 1);
  const i = Math.min(WIRE.length - 2, Math.floor(t));
  return (WIRE[i] + (WIRE[i + 1] - WIRE[i]) * (t - i)) * LIGHTS_H;
};

// polaroid proportions: even margin on three sides, deep margin under the photo
const FRAME_W = 310;
const MAT = 14;
const PHOTO = FRAME_W - MAT * 2; // square window
const CAPTION_H = 66;

export default function GraphicDesignWork() {
  return (
    <div
      id="graphic-design"
      className="absolute"
      style={{ left: LEFT, top: TOP, width: STRIP_W, height: STRIP_H }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={A.imgGroup238158}
        className="absolute left-0 top-0 max-w-none pointer-events-none"
        style={{ width: STRIP_W, height: LIGHTS_H }}
      />

      {PIECES.map((p, i) => {
        const Tag = p.href ? "a" : "div";
        return (
          // Anchored at the point on the wire where the peg bites, so the sway
          // below pivots from the peg — the way a hanging photo actually moves.
          <div
            key={p.title}
            className="absolute"
            style={{ left: p.cx - FRAME_W / 2, top: wireY(p.cx), width: FRAME_W, zIndex: 2 + i }}
          >
            <div
              className="gd-sway origin-top"
              style={{ ["--tilt" as string]: `${p.tilt}deg`, animationDuration: `${p.sway}s` }}
            >
              {/* string from the wire down to the peg */}
              <div
                className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-[#4a3b2c]"
                style={{ height: p.drop + 10 }}
              />
              <Tag
                {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative block bg-white shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out hover:scale-[1.03]"
                style={{ marginTop: p.drop, padding: MAT, paddingBottom: CAPTION_H, borderRadius: 3 }}
              >
                {/* wooden peg, straddling the top edge of the frame */}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-0 h-[34px] w-[15px] -translate-x-1/2 -translate-y-[18px] rounded-[3px] bg-[#d8a86a] shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
                >
                  <span className="absolute inset-x-0 top-[13px] h-[3px] bg-[#8d8d8d]" />
                  <span className="absolute inset-y-[3px] left-1/2 w-[1px] -translate-x-1/2 bg-[#b98c53]" />
                </span>

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
                  className="font-hand absolute inset-x-0 text-center text-[30px] leading-none text-[#333]"
                  style={{ bottom: CAPTION_H / 2 - 12 }}
                >
                  {p.title}
                </p>
              </Tag>
            </div>
          </div>
        );
      })}
    </div>
  );
}
