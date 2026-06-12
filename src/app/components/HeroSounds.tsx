"use client";

import { useEffect } from "react";

/**
 * Hero audio interactions:
 *  - hovering the AirPods ([data-song]) plays a song; it pauses when you leave
 *    and resumes from where it stopped.
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

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
