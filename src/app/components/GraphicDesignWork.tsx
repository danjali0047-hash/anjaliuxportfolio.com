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
  { title: "Poster series", cx: 210, tilt: -3.5, drop: 26, sway: 5.4 },
  { title: "Social creatives", cx: 745, tilt: 2.4, drop: 92, sway: 6.7 },
  { title: "Brand identity", cx: 1275, tilt: -1.8, drop: 62, sway: 6.0 },
];

// wall band — full canvas width, like the dark UX Projects fold above it
const WALL_TOP = 3100;
const WALL_H = 600;
const CANVAS_W = 1728;

// strip geometry — same left margin and content width as the cards carousel
const LEFT = 106;
const STRIP_TOP = 50; // within the wall
const STRIP_W = 1516;

// Group238158.png, cropped to its content. Rendered at the strip's full width.
const ART_W = 2978;
const ART_H = 333;
const LIGHTS_H = (STRIP_W * ART_H) / ART_W;

/**
 * The wire's height sampled off the artwork itself (33 even steps across its
 * width, as a fraction of the image height) — the string is hand-drawn and
 * wanders, so there's no curve to solve. Pegs interpolate into this table,
 * which is what keeps them biting the wire instead of floating near it.
 */
const WIRE = [
  0.3063, 0.3063, 0.4234, 0.5105, 0.5646, 0.6216, 0.6697, 0.6787, 0.6637,
  0.6126, 0.5886, 0.5586, 0.4895, 0.3754, 0.2312, 0.2072, 0.1502, 0.0571,
  0.0511, 0.1922, 0.3063, 0.3784, 0.4084, 0.4324, 0.4835, 0.4955, 0.4865,
  0.4414, 0.3844, 0.3303, 0.2402, 0.1261, 0.1261,
];
const wireY = (x: number) => {
  const t = Math.max(0, Math.min(1, x / STRIP_W)) * (WIRE.length - 1);
  const i = Math.min(WIRE.length - 2, Math.floor(t));
  return (WIRE[i] + (WIRE[i + 1] - WIRE[i]) * (t - i)) * LIGHTS_H;
};

/** bulb centres [x, y, r] as fractions of the artwork, also read off the PNG */
const BULBS = [
  [0.0126, 0.4682], [0.0964, 0.7426], [0.1896, 0.8894], [0.3059, 0.8027],
  [0.4394, 0.4413], [0.5604, 0.2596], [0.6939, 0.6214], [0.8102, 0.7082],
  [0.9034, 0.561], [0.9872, 0.2869],
];
const GLOW = 210; // diameter of the light each bulb throws onto the wall

// polaroid proportions: even margin on three sides, deep margin under the photo
const FRAME_W = 310;
const MAT = 14;
const PHOTO = FRAME_W - MAT * 2; // square window
const CAPTION_H = 66;

export default function GraphicDesignWork() {
  return (
    <div
      id="graphic-design"
      className="gd-wall absolute left-0 overflow-hidden"
      style={{ top: WALL_TOP, width: CANVAS_W, height: WALL_H }}
    >
      <div
        className="absolute"
        style={{ left: LEFT, top: STRIP_TOP, width: STRIP_W, height: WALL_H - STRIP_TOP }}
      >
        {/* Light the wall first, then lay the string over it — the glows are
            behind the artwork so the painted bulbs stay the brightest point. */}
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: LIGHTS_H }} aria-hidden>
          {BULBS.map(([bx, by], i) => (
            <div
              key={i}
              className="gd-glow absolute rounded-full"
              style={{
                left: bx * STRIP_W - GLOW / 2,
                top: by * LIGHTS_H - GLOW / 2,
                width: GLOW,
                height: GLOW,
                animationDelay: `${(i % 4) * 0.55}s`,
              }}
            />
          ))}
        </div>
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
                  className="group relative block bg-white shadow-[0_18px_38px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out hover:scale-[1.03]"
                  style={{ marginTop: p.drop, padding: MAT, paddingBottom: CAPTION_H, borderRadius: 3 }}
                >
                  {/* wooden peg, straddling the top edge of the frame */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-0 h-[34px] w-[15px] -translate-x-1/2 -translate-y-[18px] rounded-[3px] bg-[#d8a86a] shadow-[0_2px_5px_rgba(0,0,0,0.45)]"
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
    </div>
  );
}
