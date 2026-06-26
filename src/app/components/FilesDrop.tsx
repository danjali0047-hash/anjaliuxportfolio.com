"use client";

import { useEffect } from "react";
import { lockScroll, unlockScroll } from "./scrollLock";

/**
 * Plays the "file dropped onto the table" (Z-axis) entrance on the UX Projects
 * folder ([data-files-drop]) and a synthesized "thud" when it lands.
 *
 * The folder is always visible (opacity untouched); this only plays the
 * fly-in-and-bounce + impact sound. The drop fires when the fold is well in
 * view and re-arms when it scrolls out, so it replays on each scroll-in. Uses a
 * window `scroll` listener + getBoundingClientRect for reliability inside the
 * scaled canvas.
 *
 * Drop timing (animation is 1s): hard impact ~50% (≈500ms), lighter second
 * bounce ~76% (≈770ms) — the two thuds are scheduled to match.
 */
export default function FilesDrop() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>("[data-files-drop]");
    if (!el) return;

    // --- audio: lazily-created, gesture-unlocked AudioContext ---
    type AC = AudioContext;
    let ctx: AC | null = null;
    const getCtx = (): AC | null => {
      if (typeof window === "undefined") return null;
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      if (!ctx) ctx = new Ctor();
      if (ctx.state === "suspended") void ctx.resume();
      return ctx;
    };

    // Browsers only allow audio after a user gesture — unlock on first one.
    const unlock = () => {
      getCtx();
    };
    const gestures = ["pointerdown", "keydown", "touchstart"] as const;
    gestures.forEach((g) =>
      window.addEventListener(g, unlock, { once: true, passive: true }),
    );

    // A short, punchy impact: a low body thump + a quick broadband slap.
    const thud = (strength = 1) => {
      const ac = ctx;
      if (!ac || ac.state !== "running") return;
      const now = ac.currentTime;

      const body = ac.createOscillator();
      body.type = "sine";
      body.frequency.setValueAtTime(165, now);
      body.frequency.exponentialRampToValueAtTime(46, now + 0.17);
      const bodyGain = ac.createGain();
      bodyGain.gain.setValueAtTime(0.0001, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.55 * strength, now + 0.012);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      body.connect(bodyGain).connect(ac.destination);
      body.start(now);
      body.stop(now + 0.34);

      const dur = 0.08;
      const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      }
      const noise = ac.createBufferSource();
      noise.buffer = buf;
      const lp = ac.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 1100;
      const noiseGain = ac.createGain();
      noiseGain.gain.setValueAtTime(0.32 * strength, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      noise.connect(lp).connect(noiseGain).connect(ac.destination);
      noise.start(now);
    };

    // --- drop trigger ---
    let armed = true;
    let iLocked = false; // does THIS component currently hold the scroll lock?
    const timers: number[] = [];
    const play = () => {
      el.classList.remove("is-dropped");
      void el.offsetWidth; // force reflow so the animation restarts cleanly
      el.classList.add("is-dropped");
      // schedule the impact sounds to match the animation's two landings
      timers.forEach(clearTimeout);
      timers.length = 0;
      getCtx();
      timers.push(window.setTimeout(() => thud(1), 500));
      timers.push(window.setTimeout(() => thud(0.5), 770));
      // freeze the page for the drop so the user can watch it land
      if (!iLocked) {
        lockScroll();
        iLocked = true;
      }
      timers.push(
        window.setTimeout(() => {
          if (iLocked) {
            unlockScroll();
            iLocked = false;
          }
        }, 850),
      );
    };

    const evaluate = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (armed && r.top < vh * 0.05 && r.top > -vh * 0.12 && r.bottom > vh * 0.1) {
        play();
        armed = false;
      } else if (r.top > vh * 0.45 || r.bottom < vh * 0.05) {
        armed = true; // re-arm once it has moved out of the play zone
      }
    };

    const settle = window.setTimeout(evaluate, 600);

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        evaluate();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.clearTimeout(settle);
      timers.forEach(clearTimeout);
      gestures.forEach((g) => window.removeEventListener(g, unlock));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (iLocked) {
        unlockScroll();
        iLocked = false;
      }
      if (raf) cancelAnimationFrame(raf);
      if (ctx) void ctx.close();
    };
  }, []);

  return null;
}
