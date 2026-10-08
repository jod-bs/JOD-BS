/* ==========================================================================
   INDEX-DEMO — scroll/parallax engine for index-demo.html ONLY.

   Self-contained: guarded on body.index-demo-page so this file can safely
   sit next to script.js (which still drives the shared header/nav dropdown,
   the reused #homeJourney* carousel and #homeFaq* accordion) without ever
   touching index.html or any other page. Nothing here is referenced by, or
   modifies, script.js/style.css.

   Performance approach, matching the site-wide data-parallax engine in
   script.js: one scroll listener, rAF-batched, transform/opacity only,
   IntersectionObserver-gated so off-screen work is skipped, and a hard
   backoff under prefers-reduced-motion or narrow/mobile viewports.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("index-demo-page")) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const MOBILE_BREAKPOINT = 768;
  const isNarrow = () => window.innerWidth < MOBILE_BREAKPOINT;

  /* ------------------------------------------------------------------ *
   * 1. Reveal-on-scroll: fade / fade-left / fade-right / scale-in
   * ------------------------------------------------------------------ */
  (function initReveals() {
    const targets = document.querySelectorAll(
      ".index-demo-fade, .index-demo-fade-left, .index-demo-fade-right, .index-demo-scale-in",
    );
    if (!targets.length) return;
    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add("index-demo-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("index-demo-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((el) => io.observe(el));
  })();

  /* ------------------------------------------------------------------ *
   * 2. Hero title split-word mask reveal (runs once, shortly after load —
   *    the hero is above the fold so this is an intro animation, not a
   *    scroll trigger). Any element nested one level deep (e.g. the
   *    gradient ".index-demo-accent" span) is kept intact and revealed as
   *    a single atomic chunk, so its own background-clip:text gradient
   *    never gets split across freshly-created child spans.
   * ------------------------------------------------------------------ */
  function splitReveal(el) {
    if (!el) return;
    const nodes = Array.from(el.childNodes);
    el.textContent = "";
    let i = 0;
    const STEP = 0.045;
    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach((part) => {
          if (part === "") return;
          if (/^\s+$/.test(part)) {
            el.appendChild(document.createTextNode(part));
            return;
          }
          const mask = document.createElement("span");
          mask.className = "index-demo-split-mask";
          const word = document.createElement("span");
          word.className = "index-demo-split-word";
          word.style.transitionDelay = (i * STEP).toFixed(3) + "s";
          word.textContent = part;
          mask.appendChild(word);
          el.appendChild(mask);
          i += 1;
        });
      } else {
        const mask = document.createElement("span");
        mask.className = "index-demo-split-mask";
        const word = document.createElement("span");
        word.className = "index-demo-split-word";
        word.style.transitionDelay = (i * STEP).toFixed(3) + "s";
        word.appendChild(node);
        mask.appendChild(word);
        el.appendChild(mask);
        i += 1;
      }
    });
  }
  const heroTitle = document.getElementById("demoHeroTitle");
  if (heroTitle) {
    if (prefersReducedMotion) {
      // Leave the heading's markup untouched — nothing to reveal.
    } else {
      splitReveal(heroTitle);
      requestAnimationFrame(() => {
        setTimeout(() => heroTitle.classList.add("index-demo-split-in"), 200);
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * 3. Scroll-triggered count-up numbers
   * ------------------------------------------------------------------ */
  (function initCounters() {
    const counters = document.querySelectorAll("[data-demo-count]");
    if (!counters.length) return;
    function run(el) {
      const target = parseFloat(el.dataset.demoCount);
      const suffix = el.dataset.demoSuffix || "";
      const decimals = el.dataset.demoCount.includes(".")
        ? el.dataset.demoCount.split(".")[1].length
        : 0;
      if (prefersReducedMotion) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      function frame(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    counters.forEach((el) => io.observe(el));
  })();

  /* ------------------------------------------------------------------ *
   * 4. Cursor glow (desktop / hover-capable only)
   * ------------------------------------------------------------------ */
  (function initCursorGlow() {
    if (prefersReducedMotion) return;
    const canHover = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (!canHover) return;
    const glow = document.querySelector(".index-demo-cursor-glow");
    if (!glow) return;
    let raf = null;
    window.addEventListener(
      "pointermove",
      (e) => {
        glow.classList.add("index-demo-visible");
        if (raf) return;
        raf = requestAnimationFrame(() => {
          glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          raf = null;
        });
      },
      { passive: true },
    );
    document.addEventListener("pointerleave", () => glow.classList.remove("index-demo-visible"));
  })();

  /* ------------------------------------------------------------------ *
   * 5. Parallax depth: [data-demo-speed] (+ optional data-demo-rotate /
   *    data-demo-scale), IntersectionObserver-gated, rAF-batched.
   * ------------------------------------------------------------------ */
  const parallaxItems = Array.from(document.querySelectorAll("[data-demo-speed]")).map((el) => ({
    el,
    speed: parseFloat(el.dataset.demoSpeed) || 0.1,
    rotate: parseFloat(el.dataset.demoRotate) || 0,
    scaleAmt: parseFloat(el.dataset.demoScale) || 0,
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
   * 6. Horizontal pinned services gallery — progressive enhancement.
   *    Base CSS is already a working native horizontal swipe strip; this
   *    only upgrades it to a scroll-jacked pin on wide, motion-safe
   *    viewports by toggling "index-demo-h-pin--active".
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
   * 7. Journey connector line: SVG path drawn in as the section scrolls.
   * ------------------------------------------------------------------ */
  const journeySection = document.querySelector(".index-demo-journey");
  const journeyPath = document.getElementById("demoJourneyPath");
  let journeyPathLength = 0;
  if (journeyPath) {
    journeyPathLength = journeyPath.getTotalLength();
    journeyPath.style.strokeDasharray = String(journeyPathLength);
    journeyPath.style.strokeDashoffset = String(journeyPathLength);
  }

  /* ------------------------------------------------------------------ *
   * 8. Hero scroll cue fade + top progress bar
   * ------------------------------------------------------------------ */
  const scrollCue = document.querySelector(".index-demo-scroll-cue");
  const progressBar = document.getElementById("demoProgressBar");

  /* ------------------------------------------------------------------ *
   * Central rAF-batched scroll loop
   * ------------------------------------------------------------------ */
  let ticking = false;
  function applyFrame() {
    ticking = false;
    const vh = window.innerHeight;
    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - vh);
    const pageProgress = Math.min(1, window.scrollY / maxScroll);

    if (progressBar) progressBar.style.transform = `scaleX(${pageProgress})`;

    if (scrollCue) {
      const fade = Math.max(0, 1 - window.scrollY / (vh * 0.5));
      scrollCue.style.opacity = String(fade);
    }

    if (!prefersReducedMotion && !isNarrow()) {
      parallaxItems.forEach((item) => {
        if (!item.active) return;
        const rect = item.el.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - vh / 2;
        const localProgress = Math.max(-1, Math.min(1, centerOffset / (vh / 2)));
        const y = (centerOffset * -item.speed).toFixed(1);
        let transform = `translate3d(0, ${y}px, 0)`;
        if (item.rotate) transform += ` rotate(${(localProgress * item.rotate).toFixed(2)}deg)`;
        if (item.scaleAmt) {
          const s = 1 - Math.abs(localProgress) * item.scaleAmt;
          transform += ` scale(${s.toFixed(3)})`;
        }
        item.el.style.transform = transform;
      });
    }

    if (hActive && hPin && hTrack) {
      const rect = hPin.getBoundingClientRect();
      const total = rect.height - vh;
      if (total > 0) {
        const raw = -rect.top / total;
        const progress = Math.max(0, Math.min(1, raw));
        const maxTranslate = Math.max(0, hTrack.scrollWidth - window.innerWidth);
        hTrack.style.transform = `translate3d(${(-progress * maxTranslate).toFixed(1)}px, 0, 0)`;
        if (hProgressFill) hProgressFill.style.transform = `scaleX(${progress.toFixed(3)})`;
      }
    }

    if (journeyPath && journeySection && !prefersReducedMotion) {
      const rect = journeySection.getBoundingClientRect();
      const total = rect.height - vh * 0.5;
      const raw = (vh - rect.top) / Math.max(1, total + vh * 0.5);
      const progress = Math.max(0, Math.min(1, raw));
      journeyPath.style.strokeDashoffset = String(journeyPathLength * (1 - progress));
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
