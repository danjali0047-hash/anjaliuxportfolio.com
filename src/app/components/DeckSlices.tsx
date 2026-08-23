/**
 * A tall design deck, delivered as horizontal slices stacked seamlessly.
 *
 * These decks are single very tall pages — Delish is 3842×25440 at 2x, nearly
 * 98 million pixels. Mobile Safari refuses to decode an image that large and
 * either drops it or silently downsamples it, so one file is not an option no
 * matter how well it compresses. Slicing keeps every piece around 15Mpx, well
 * inside that budget, and has the side benefit that the top of the deck paints
 * while the rest is still arriving.
 *
 * The slices must butt together with no seam: `block` kills the inline-image
 * baseline gap, and each slice is cut on an exact pixel boundary so no row is
 * duplicated or dropped between them.
 */
export default function DeckSlices({
  dir,
  name,
  count,
  alt,
  maxWidth,
}: {
  /** folder under /assets, e.g. "delish" */
  dir: string;
  /** file stem, e.g. "delish" for delish-1.jpg */
  name: string;
  count: number;
  /** describes the deck as a whole — the slices are decorative individually */
  alt: string;
  /** the render's own width; past it the artwork would upscale */
  maxWidth: number;
}) {
  return (
    <div role="img" aria-label={alt} style={{ maxWidth, margin: "0 auto" }}>
      {Array.from({ length: count }, (_, i) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={i}
          src={`/assets/${dir}/${name}-${i + 1}.jpg`}
          alt=""
          // the first slice is the hero, so it should not wait for lazy loading
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      ))}
    </div>
  );
}
