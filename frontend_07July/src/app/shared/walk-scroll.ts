/** Animate window scroll over `duration` ms so intermediate scroll positions
 *  (and therefore the walking character + footstep sounds) are actually visible,
 *  unlike native scrollIntoView({behavior:'smooth'}) which is too quick to see. */
export function walkScrollTo(targetId: string, duration = 1400) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const startY = window.scrollY;
  const endY = startY + el.getBoundingClientRect().top - 12;
  const dist = endY - startY;
  const startTime = performance.now();
  const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  function step(now: number) {
    const t = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + dist * ease(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
