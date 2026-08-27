"use client";

import { useEffect } from "react";

/**
 * Hero audio interactions:
 *  - hovering the AirPods ([data-song]) plays a song; it pauses when you leave
 *    and resumes from where it stopped.
 *  - hovering the iced coffee ([data-slurp]) swirls the ice; a one-shot, so it
 *    restarts each time rather than resuming.
 * Browsers may block audio until the user has interacted with the page once;
 * after any interaction it plays reliably. Errors are swallowed silently.
 */
export default function HeroSounds() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // AirPods → song (play on hover, pause on leave)
    const pods = document.querySelector<HTMLElement>("[data-song]");
    if (pods) {
      const song = new Audio("/assets/sounds/tum-se-hi.mp3");
      song.preload = "auto";
      song.volume = 0.5;
      const playSong = () => {
        void song.play().catch(() => {});
      };
      const pauseSong = () => song.pause();
      pods.style.cursor = "pointer";
      pods.addEventListener("pointerenter", playSong);
      pods.addEventListener("pointerleave", pauseSong);
      cleanups.push(() => {
        pods.removeEventListener("pointerenter", playSong);
        pods.removeEventListener("pointerleave", pauseSong);
        song.pause();
      });
    }

    // Iced coffee → the sound of the ice being swirled. A one-shot, so it
    // restarts from the top on each hover rather than resuming: re-entering the
    // glass should sound like another swirl, not like the last one continuing.
    const glass = document.querySelector<HTMLElement>("[data-slurp]");
    if (glass) {
      const ice = new Audio("/assets/sounds/slurp.mp3");
      ice.preload = "auto";
      ice.volume = 0.45;
      const playIce = () => {
        ice.currentTime = 0;
        void ice.play().catch(() => {});
      };
      const stopIce = () => {
        ice.pause();
        ice.currentTime = 0;
      };
      glass.style.cursor = "pointer";
      glass.addEventListener("pointerenter", playIce);
      glass.addEventListener("pointerleave", stopIce);
      cleanups.push(() => {
        glass.removeEventListener("pointerenter", playIce);
        glass.removeEventListener("pointerleave", stopIce);
        ice.pause();
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
