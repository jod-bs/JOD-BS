/* ==========================================================================
   INDEX3 — scroll engine for index3.html ONLY.

   Self-contained: guarded on body.index3-page, sits next to script.js
   (which still drives the shared header/nav dropdown, and the reused
   journey carousel / FAQ accordion / home-reveal logic) without touching
   index.html or index-demo.html. Three independent pieces, all scoped to
   this page and all skipped under prefers-reduced-motion:

   1. Horizontal pinned services gallery — trimmed port of index-demo.js's
      section 6 (+ the matching slice of its central scroll loop). The
      only bit of behavior the transplanted #services section
      (index-demo-h-*) needs that script.js doesn't already provide.
   2. Rotate-in reveal for the "full blue box" elements (.home-launch-box,
      .home-journey-box) — same idea as index-demo.css's
      ".index-demo-scale-in" (scale+rotate settling in as it enters view),
      applied here via a dedicated ".index3-rotate-in" class so it only
      ever touches index3.html's copies of those boxes.
   3. A small parallax-depth effect ([data-index3-speed]) for the soft
      background glows added to the Approach/journey section on this page
      — deliberately a NEW attribute (not the site's own [data-parallax])
      so this never doubles up with script.js's engine on the same
      elements, and keeps working even if that engine is fixed later.

   Everything else on this page (hero, about, FAQ, CTA) keeps using
   script.js exactly as index.html does, so it is deliberately NOT
   reproduced here.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("index3-page")) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const MOBILE_BREAKPOINT = 768;
  const isNarrow = () => window.innerWidth < MOBILE_BREAKPOINT;
  const headerH = () =>
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--home-header-h",
      ),
    ) || 88;

  /* ------------------------------------------------------------------ *
   * 1. Horizontal pinned services gallery
   * ------------------------------------------------------------------ */
  const hPin = document.querySelector(".index-demo-h-pin");
  const hTrack = document.querySelector("[data-demo-h-track]");
  const hProgressFill = document.querySelector(".index-demo-h-progress-fill");
  let hActive = false;
  function evaluateHPinMode() {
    if (!hPin || !hTrack) return;
    const shouldActivate = !prefersReducedMotion && !isNarrow();
    if (shouldActivate === hActive) return;
    hActive = shouldActivate;
    hPin.classList.toggle("index-demo-h-pin--active", hActive);
    if (!hActive) {
      hTrack.style.transform = "";
      if (hProgressFill) hProgressFill.style.transform = "scaleX(0)";
    }
  }
  evaluateHPinMode();

  /* ------------------------------------------------------------------ *
   * 2. Rotate-in reveal for the "full blue box" elements
   * ------------------------------------------------------------------ */
  (function initRotateIn() {
    const targets = document.querySelectorAll(".index3-rotate-in");
    if (!targets.length) return;
    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add("index3-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("index3-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((el) => io.observe(el));
  })();

  /* ------------------------------------------------------------------ *
   * 3. Background parallax glows: [data-index3-speed]
   * ------------------------------------------------------------------ */
  const parallaxItems = Array.from(
    document.querySelectorAll("[data-index3-speed]"),
  ).map((el) => ({
    el,
    speed: parseFloat(el.dataset.index3Speed) || 0.1,
    active: false,
  }));
  if (parallaxItems.length && !prefersReducedMotion) {
    const pio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = parallaxItems.find((it) => it.el === entry.target);
          if (item) item.active = entry.isIntersecting;
        });
      },
      { rootMargin: "25% 0px 25% 0px" },
    );
    parallaxItems.forEach((item) => pio.observe(item.el));
  }

  /* ------------------------------------------------------------------ *
   * Central rAF-batched scroll loop
   * ------------------------------------------------------------------ */
  let ticking = false;
  function applyFrame() {
    ticking = false;
    const vh = window.innerHeight;

    if (hActive && hPin && hTrack) {
      const rect = hPin.getBoundingClientRect();
      // The sticky card sits below the fixed header (top: var(--home-header-h)),
      // so its visible window is shorter than the full viewport by that much —
      // match that here so progress reaches exactly 1 as the pin finishes.
      const total = rect.height - (vh - headerH());
      if (total > 0) {
        const raw = -rect.top / total;
        const progress = Math.max(0, Math.min(1, raw));
        const maxTranslate = Math.max(0, hTrack.scrollWidth - window.innerWidth);
        hTrack.style.transform = `translate3d(${(-progress * maxTranslate).toFixed(1)}px, 0, 0)`;
        if (hProgressFill) hProgressFill.style.transform = `scaleX(${progress.toFixed(3)})`;
      }
    }

    if (!prefersReducedMotion && !isNarrow()) {
      parallaxItems.forEach((item) => {
        if (!item.active) return;
        const rect = item.el.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - vh / 2;
        const y = (centerOffset * -item.speed).toFixed(1);
        item.el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    }
  }
  function requestTick() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(applyFrame);
    }
  }
  window.addEventListener("scroll", requestTick, { passive: true });
  let resizeTimer = null;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        evaluateHPinMode();
        requestTick();
      }, 150);
    },
    { passive: true },
  );
  applyFrame();
});
