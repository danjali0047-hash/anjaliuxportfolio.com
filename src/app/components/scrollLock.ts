// Shared, ref-counted page scroll lock. Several components freeze the page
// (the OTHER THAN THAT carousel while it slides, and the UX-folder drop). If
// each toggled document.documentElement.style.overflowY directly, whoever wrote
// last would win — one could release a freeze the other still needs, or leave
// the page stuck. Ref-counting fixes that: the page only unfreezes when every
// holder has released.
let count = 0;

export function lockScroll(): void {
  count += 1;
  if (typeof document !== "undefined") {
    document.documentElement.style.overflowY = "hidden";
  }
}

export function unlockScroll(): void {
  count = Math.max(0, count - 1);
  if (count === 0 && typeof document !== "undefined") {
    document.documentElement.style.overflowY = "";
  }
}
