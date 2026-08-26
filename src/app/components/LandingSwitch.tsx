"use client";

import { useSyncExternalStore } from "react";
import LandingDesktop from "./LandingDesktop";
import LandingMobile from "./LandingMobile";

/**
 * Picks the landing layout by viewport, rendering exactly one of them.
 *
 * Hiding one with CSS would be simpler, but a `display: none` subtree still
 * downloads its images — the phone would pay for the whole 1728px canvas it
 * never shows, which is most of what we just spent effort removing.
 *
 * The breakpoint is 1024px because that is roughly where the canvas stops being
 * legible: it scales to fit the window, so body copy set at 15px renders at
 * about 9px on a 1024px screen and 3.4px on a phone.
 *
 * The server can't know the viewport, so it renders the phone layout — the
 * lighter of the two, and semantic HTML rather than positioned artwork, which
 * is also the better thing for a crawler to find. A desktop visitor swaps to
 * the canvas on mount, behind the loading screen, and pays nothing for it: the
 * phone layout draws on a strict subset of the canvas's images.
 */

const QUERY = "(min-width: 1024px)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

export default function LandingSwitch() {
  const isDesktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false, // server: assume phone
  );
  return isDesktop ? <LandingDesktop /> : <LandingMobile />;
}
