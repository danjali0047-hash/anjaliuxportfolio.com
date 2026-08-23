/**
 * "GRAPHIC DESIGN WORK" — three polaroids pegged to a sagging fairy-light
 * string, the way you'd hang prints across a wall.
 *
 * Rendered INSIDE the scaled canvas, so every coordinate here is native
 * (1728-wide) px, same as Landing.tsx.
 *
 * To fill it in: drop the artwork into `public/assets/graphic-design/`, then set
 * `title` and `img` on the matching entry below. An entry with no `img` renders
 * as an empty frame, so a half-finished wall still hangs correctly.
 */

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
// and the point of a washing line is that it doesn't.
const PIECES: Piece[] = [
  { title: "Poster series", cx: 195, tilt: -3.5, drop: 22, sway: 5.4 },
  { title: "Social creatives", cx: 730, tilt: 2.4, drop: 8, sway: 6.7 },
  { title: "Brand identity", cx: 1240, tilt: -1.8, drop: 34, sway: 6.0 },
];

// strip geometry — same left margin and content width as the cards carousel
const LEFT = 106;
const TOP = 3120;
const STRIP_W = 1516;

// The wire is one quadratic bezier swag: both ends pinned at END_Y, pulled down
// to CTRL_Y in the middle. Because the control point sits at exactly half the
// width, x(t) collapses to t * STRIP_W — so a photo's x maps straight to t and
// we can drop a peg anywhere on the string without solving for the curve.
const END_Y = 18;
const CTRL_Y = 132;
const wireY = (x: number) => {
  const t = x / STRIP_W;
  const u = 1 - t;
  return u * u * END_Y + 2 * u * t * CTRL_Y + t * t * END_Y;
};

const BULBS = 23;

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
      style={{ left: LEFT, top: TOP, width: STRIP_W, height: 470 }}
    >
      {/* The light string. overflow visible so the bulb glows aren't clipped. */}
      <svg
        width={STRIP_W}
        height={170}
        viewBox={`0 0 ${STRIP_W} 170`}
        className="absolute left-0 top-0 overflow-visible"
        aria-hidden
      >
        <defs>
          <radialGradient id="gd-glow">
            <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#ffc046" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#ffc046" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d={`M 0 ${END_Y} Q ${STRIP_W / 2} ${CTRL_Y} ${STRIP_W} ${END_Y}`}
          fill="none"
          stroke="#4a4a4a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {Array.from({ length: BULBS }, (_, i) => {
          // skip the very ends so bulbs don't sit on the knots
          const x = ((i + 0.5) / BULBS) * STRIP_W;
          const y = wireY(x);
          return (
            <g key={i}>
              {/* socket: short lead from the wire down to the bulb */}
              <line x1={x} y1={y} x2={x} y2={y + 9} stroke="#4a4a4a" strokeWidth="2" />
              <circle cx={x} cy={y + 17} r="17" fill="url(#gd-glow)" className="gd-bulb" style={{ animationDelay: `${(i % 5) * 0.42}s` }} />
              <circle cx={x} cy={y + 17} r="5.5" fill="#ffcf5c" className="gd-bulb" style={{ animationDelay: `${(i % 5) * 0.42}s` }} />
              <circle cx={x - 1.4} cy={y + 15.6} r="1.6" fill="#fff6dc" />
            </g>
          );
        })}
      </svg>

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
                className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-[#5a5a5a]"
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
