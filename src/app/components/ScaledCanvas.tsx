"use client";

import { useEffect, useRef, useState } from "react";

type ScaledCanvasProps = {
  /** Native design width in px */
  width: number;
  /** Native design height in px */
  height: number;
  /** Extra zoom factor applied on top of the fit-to-width scale (1 = full size) */
  zoom?: number;
  children: React.ReactNode;
};

/**
 * Renders a fixed-size (native) design and scales it down to fit the viewport
 * width, preserving the exact pixel layout. Never scales up past 1:1.
 */
export default function ScaledCanvas({
  width,
  height,
  zoom = 1,
  children,
}: ScaledCanvasProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(zoom);

  useEffect(() => {
    const measure = () => {
      const available = outerRef.current?.clientWidth ?? window.innerWidth;
      // Always scale the design to exactly fill the viewport width — up or
      // down — so the layout is pixel-identical (just larger/smaller) at every
      // resolution and on every device. No 1:1 cap, so wide screens fill too.
      setScale((available / width) * zoom);
    };
    measure();
    window.addEventListener("resize", measure);
    // also re-measure when the URL bar shows/hides etc. on mobile
    window.addEventListener("orientationchange", measure);
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined" && outerRef.current) {
      ro = new ResizeObserver(measure);
      ro.observe(outerRef.current);
    }
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      ro?.disconnect();
    };
  }, [width, zoom]);

  return (
    <div ref={outerRef} className="w-full overflow-hidden">
      <div
        style={{
          width: width * scale,
          height: height * scale,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            width,
            height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
