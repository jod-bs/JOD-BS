/* ==========================================================================
   JOD Business Services — SEO Landing Page interactions
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // This entire block is the original SEO Page script, now covering the
  // SEO Page, the PPC Page and the Social Media Marketing Page — the three
  // pages that share this hero/journey/services/process/faq body template.
  // It is guarded on #serviceTabs (a body element unique to this template)
  // rather than the header, because all three pages now render the SAME
  // home-header/home-nav markup as index.html/about.html/contact.html —
  // that header's scroll-state, mobile toggle and dropdown behaviour is
  // handled once, generically, by the HOME PAGE / SITE HEADER — scoped
  // init further down this file, so it isn't duplicated here.
  if (!document.getElementById("serviceTabs")) return;

  // The interactive rendering logic below is identical across all three
  // pages; only the underlying content data (queries/services/process/faqs)
  // is swapped based on these flags, so the SEO Page's original behaviour
  // and content are completely unchanged.
  const isPPCPage = document.body.classList.contains("ppc-page");
  const isSMMPage = document.body.classList.contains("smm-page");

  const svgCheck =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>';
  const svgArrow =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>';

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------------- Hero search demo (typing + cycling chips) ---------------- */
  const seoQueries = [
    "SEO Company in Chennai",
    "SEO Services in Chennai",
    "Best SEO Agency in Chennai",
  ];
  const ppcQueries = [
    "PPC Agency in Chennai",
    "Google Ads Company Chennai",
    "Best PPC Services Chennai",
  ];
  const smmQueries = [
    "Social Media Marketing Agency in Chennai",
    "Social Media Marketing Company Chennai",
    "Best Social Media Agency Chennai",
  ];
  const queries = isPPCPage ? ppcQueries : isSMMPage ? smmQueries : seoQueries;
  const typedEl = document.getElementById("typedQuery");
  const resultEl = document.getElementById("demoResult");
  const chips = document.querySelectorAll("#demoChips .chip");
  let qIndex = 0,
    charIndex = 0,
    deleting = false;

  function typeLoop() {
    const current = queries[qIndex];
    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        resultEl.classList.add("show");
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        resultEl.classList.remove("show");
        qIndex = (qIndex + 1) % queries.length;
        setTimeout(typeLoop, 400);
        return;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  let chipIndex = 0;
  setInterval(() => {
    chips.forEach((c) => c.classList.remove("active"));
    chips[chipIndex].classList.add("active");
    chipIndex = (chipIndex + 1) % chips.length;
  }, 2200);

  /* ---------------- Customer journey auto-stepper ---------------- */
  const jsteps = document.querySelectorAll(".jstep");
  if (jsteps.length) {
    let jIndex = 0;
    setInterval(() => {
      jsteps.forEach((s) => s.classList.remove("active"));
      jsteps[jIndex].classList.add("active");
      jIndex = (jIndex + 1) % jsteps.length;
    }, 1900);
  }

  /* ---------------- Services: seven disciplines data (SEO Page) ---------------- */
  const seoServices = [
    {
      label: "Technical SEO",
      headline:
        "We identify and address technical issues that may prevent search engines from properly crawling, understanding, and indexing your website.",
      text: "Our technical SEO approach can include:",
      checks: [
        "Crawl and indexing analysis",
        "Website architecture",
        "Internal linking",
        "Canonical tags",
        "XML sitemaps",
        "Robots.txt",
        "Website performance",
        "Core Web Vitals",
        "Mobile usability",
        "Technical error identification",
      ],
      outro:
        "A technically sound website gives search engines a clearer understanding of your content and helps create a better experience for users.",
    },
    {
      label: "Keyword Research & Search Intent",
      headline:
        "The right keywords are not simply the ones with the highest search volume.",
      text: "We research how your potential customers search for your products, services, and solutions and identify opportunities based on:",
      checks: [
        "Business relevance",
        "Search intent",
        "Customer needs",
        "Competition",
        "Location",
        "Commercial value",
        "Existing website opportunities",
      ],
      outro:
        "We then map relevant search terms to the pages that are best positioned to address those searches. This helps ensure that the right search terms reach the right pages and the right audiences.",
    },
    {
      label: "On-Page SEO",
      headline:
        "On-page SEO helps both search engines and users understand what each page is about and why it is relevant.",
      text: "We optimise important elements such as:",
      checks: [
        "Title tags",
        "Meta descriptions",
        "H1, H2 and H3 headings",
        "Page content",
        "URL structure",
        "Internal links",
        "Image optimisation",
        "Content structure",
        "Search intent alignment",
      ],
      outro:
        "The objective is not simply to optimise individual elements, but to create pages that are clear, relevant, useful, and aligned with what customers are looking for.",
    },
    {
      label: "Content Optimisation",
      headline: "Good SEO content should do more than include keywords.",
      text: "It should answer customer questions, demonstrate relevance, provide useful information, and support people when they are evaluating their options. We optimise existing website content and identify opportunities for new content based on:",
      checks: [
        "Search demand",
        "Customer questions",
        "Search intent",
        "Topical relevance",
        "Competitor content",
        "Business priorities",
      ],
      outro:
        "This helps build a website that is useful to both search engines and potential customers.",
    },
    {
      label: "Local SEO in Chennai",
      headline:
        "For businesses serving customers in Chennai, local search visibility can play an important role in attracting nearby customers.",
      text: "Our local SEO services can include:",
      checks: [
        "Local keyword research",
        "Google Business Profile optimisation",
        "Location-specific landing pages",
        "Chennai-focused content",
        "Business information consistency",
        "Review strategy",
        "Local relevance signals",
      ],
      outro:
        "The goal is to strengthen your presence when potential customers are searching for relevant products or services in Chennai and the locations you serve.",
    },
    {
      label: "Authority & Link Building",
      headline:
        "In competitive industries, strong content and technical SEO may need to be supported by greater website authority.",
      text: "We focus on building relevant and credible link opportunities that support your website's authority and relevance. Our approach prioritises quality, relevance, and long-term value rather than simply pursuing a large number of low-quality backlinks.",
      checks: [],
    },
    {
      label: "SEO Analytics & Reporting",
      headline:
        "SEO performance should be measured against more than keyword rankings.",
      text: "We track meaningful indicators such as:",
      checks: [
        "Organic traffic",
        "Search impressions",
        "Organic clicks",
        "Keyword visibility",
        "Search rankings",
        "Landing-page performance",
        "Organic enquiries",
        "Conversions",
        "Local search visibility",
      ],
      outro:
        "Regular analysis helps identify what is improving, what needs attention, and where the next opportunities for growth may lie.",
    },
  ];

  /* ---------------- Services: seven disciplines data (PPC Page) ---------------- */
  const ppcServices = [
    {
      label: "Google Search Ads",
      headline: "Connect With Customers Right When They Are Searching",
      text: "Connect with potential customers right when they are actively searching for products or services that match what you provide.<br>We work on:",
      checks: [
        "Campaign Structure",
        "Keyword Targeting",
        "Search Intent",
        "Match Types",
        "Negative Keywords",
        "Ad Groups",
        "Ad Copy",
        "Bid Strategy",
        "Budget Allocation",
      ],
      outro:
        "The focus is on making your campaigns relevant to the searches that matter to your business.",
    },
    {
      label: "Keyword & Search Intent Research",
      headline: "Find the Keywords Worth Bidding On",
      text: "A keyword can generate thousands of searches and still be a poor choice for your campaign.<br>We evaluate keywords based on:",
      checks: [
        "Search Intent",
        "Business Relevance",
        "Commercial Value",
        "Competition",
        "Customer Stage",
        "Expected Conversion Potential",
      ],
      outro:
        "This helps reduce wasted spend on searches that are unlikely to contribute to your goals.",
    },
    {
      label: "Ad Copy & Creative Messaging",
      headline:
        "Make the Connection Between the Search and Your Business Clear",
      text: "Your advertisement has limited space to convince someone to take the next step.<br>We develop messaging around:",
      checks: [
        "Customer Needs",
        "Search Intent",
        "Business Value",
        "Offers",
        "Differentiators",
        "Calls to Action",
      ],
      outro:
        "The goal is to make the connection between what the customer searched for and what your business offers as clear as possible.",
    },
    {
      label: "Campaign Setup & Management",
      headline: "Structure the Campaign Before Optimisation Can Help",
      text: "A campaign needs the right structure before optimisation can make a meaningful difference.<br>We manage areas such as:",
      checks: [
        "Campaign Configuration",
        "Targeting",
        "Location Settings",
        "Audience Settings",
        "Keyword Organisation",
        "Budget Allocation",
        "Bidding",
        "Ad Assets",
        "Search Terms",
        "Negative Keyword Management",
      ],
      outro:
        "Campaigns are reviewed and adjusted based on performance rather than left running on autopilot.",
    },
    {
      label: "Landing Page & Conversion Optimisation",
      headline: "A Successful Ad Cannot Compensate for a Confusing Page",
      text: "If someone clicks your advertisement but cannot quickly understand what you offer or what to do next, part of your advertising investment is lost.<br>We look at the connection between the advertisement and landing page, including:",
      checks: [
        "Message Consistency",
        "Offer Clarity",
        "Page Structure",
        "Calls to Action",
        "User Experience",
        "Conversion Opportunities",
      ],
    },
    {
      label: "Conversion Tracking",
      headline: "Understand What Happens After the Click",
      text: "Clicks and impressions tell you what happened before the visitor reached your website. Conversion tracking helps you understand what happened after.<br>We set up and review tracking for relevant actions such as:",
      checks: [
        "Form Submissions",
        "Calls",
        "Enquiries",
        "Purchases",
        "Sign-Ups",
        "Other Valuable Customer Actions",
      ],
      outro: "This gives campaigns a stronger basis for optimisation.",
    },
    {
      label: "Campaign Monitoring & Optimisation",
      headline: "PPC Requires Ongoing Attention",
      text: "PPC requires ongoing attention.<br>We monitor performance across areas such as:",
      checks: [
        "Search Terms",
        "Click-Through Rate",
        "Cost Per Click",
        "Conversion Rate",
        "Cost Per Conversion",
        "Campaign Performance",
        "Keyword Performance",
        "Budget Utilisation",
      ],
      outro:
        "Based on what the data shows, we refine targeting, keywords, ads, bids, budgets, and other campaign elements.",
    },
  ];

  /* ---------------- Services: six disciplines data (Social Media Marketing Page) ---------------- */
  const smmServices = [
    {
      label: "Social Media Strategy",
      headline:
        "We start by understanding your business, audience, competitors, brand position, and goals.",
      text: "The strategy determines:",
      checks: [
        "Which platforms matter to your business",
        "What type of audience you want to reach",
        "What your brand should communicate",
        "Which content themes are relevant",
        "What role each platform should play",
        "What actions do you want the audience to take?",
      ],
      outro:
        "This gives your social media activity a direction instead of simply filling a content calendar.",
    },
    {
      label: "Content Planning",
      headline: "Good social media content starts before the post is designed.",
      text: "We plan content around different purposes, such as:",
      checks: [
        "Brand awareness",
        "Education",
        "Product or service communication",
        "Customer questions",
        "Industry insights",
        "Trust building",
        "Community interaction",
        "Offers and campaigns",
      ],
      outro:
        "This creates a healthier mix of content rather than repeating the same type of post every week.",
    },
    {
      label: "Content Creation",
      headline:
        "Your audience should connect with your brand even before catching a glimpse of your logo.",
      text: "We create social content around your brand voice, visual identity, audience interests, and communication goals. Depending on the platform and strategy, this can include:",
      checks: [
        "Static posts",
        "Carousels",
        "Short-form videos",
        "Reels",
        "Educational content",
        "Promotional creatives",
        "Brand storytelling",
        "Campaign content",
      ],
    },
    {
      label: "Community Engagement",
      headline: "Social media is not only about publishing.",
      text: "People may comment, ask questions, mention your brand, share content, or send messages. Those interactions can influence how they perceive your business.",
      checks: [],
      outro:
        "We focus on meaningful engagement that keeps your brand present in relevant conversations and builds stronger connections with your audience.",
    },
    {
      label: "Social Media Campaigns",
      headline:
        "When you have a product launch, offer, event, announcement, or specific business objective, regular content may not be enough.",
      text: "We plan campaigns around a clear purpose, audience, message, content direction, and call to action.",
      checks: [],
    },
    {
      label: "Performance Analysis",
      headline: "Not every post will perform in the same way.",
      text: "We review relevant performance signals to understand:",
      checks: [
        "Which content attracts attention",
        "What audiences interact with",
        "Which formats perform better",
        "What topics create interest",
        "Where engagement drops",
        "Which content supports business objectives",
      ],
      outro: "These insights help shape better content decisions over time.",
    },
  ];

  const services = isPPCPage
    ? ppcServices
    : isSMMPage
      ? smmServices
      : seoServices;

  const tabsWrap = document.getElementById("serviceTabs");
  const panel = document.getElementById("servicePanel");

  services.forEach((s, i) => {
    const tab = document.createElement("button");
    tab.className = "service-tab" + (i === 0 ? " active" : "");
    tab.type = "button";
    tab.setAttribute("role", "tab");
    tab.dataset.index = i;
    tab.innerHTML = `<span class="tnum">${String(i + 1).padStart(2, "0")}</span><span class="tlabel">${s.label}</span>${svgArrow}`;
    tab.addEventListener("click", () => selectService(i));
    tabsWrap.appendChild(tab);
  });

  function selectService(i) {
    const s = services[i];
    tabsWrap
      .querySelectorAll(".service-tab")
      .forEach((t, idx) => t.classList.toggle("active", idx === i));
    panel.innerHTML = `
      <span class="snum">Service ${String(i + 1).padStart(2, "0")} of ${String(services.length).padStart(2, "0")}</span>
      <h3>${s.label}</h3>
      <p class="headline">${s.headline}</p>
      ${s.text ? `<p>${s.text}</p>` : ""}
      ${s.checks && s.checks.length ? `<div class="check-grid">${s.checks.map((c) => `<div class="check-item">${svgCheck}<span>${c}</span></div>`).join("")}</div>` : ""}
      ${s.outro ? `<p class="outro" style="margin-top:18px">${s.outro}</p>` : ""}
    `;
  }
  selectService(0);

  /* ---------------- SEO / PPC Page — Services mobile prev/next arrows ----------------
     Design-only change: the Services section on seo.html/ppc-agency-in-chennai.html now
     shows the SAME numbered-accordion #serviceTabs/#servicePanel markup that the branding
     page already uses (see #seoServicesWrap/#ppcServicesWrap in style.css) instead of the
     old dots-carousel, which stays in the DOM hidden, not deleted. On mobile the tab list
     is hidden in favour of a single panel + these prev/next arrows, arrows-only (no
     autoplay), mirroring branding-company-in-chennai.html's own #brcServicesPrev/#brcServicesNext
     behaviour exactly. Content (the seoServices/ppcServices arrays above) is untouched. */
  if (!isSMMPage) {
    let svcIndex = 0;
    const svcPrevBtn = document.querySelector(
      "#seoServicesWrap .smm-slider-arrow-prev, #ppcServicesWrap .smm-slider-arrow-prev",
    );
    const svcNextBtn = document.querySelector(
      "#seoServicesWrap .smm-slider-arrow-next, #ppcServicesWrap .smm-slider-arrow-next",
    );
    function svcGoTo(i) {
      svcIndex = ((i % services.length) + services.length) % services.length;
      selectService(svcIndex);
    }
    if (svcPrevBtn) svcPrevBtn.addEventListener("click", () => svcGoTo(svcIndex - 1));
    if (svcNextBtn) svcNextBtn.addEventListener("click", () => svcGoTo(svcIndex + 1));
    // Keep svcIndex in sync when a desktop tab is clicked directly.
    tabsWrap.querySelectorAll(".service-tab").forEach((tab, i) => {
      tab.addEventListener("click", () => {
        svcIndex = i;
      });
    });
  }

  /* ---------------- Social Media Page — Services single-slide auto-carousel ----------------
     Reuses the #serviceTabs/#servicePanel/selectService() built just above — adds a 5s
     autoplay loop, a smooth crossfade on every panel swap, and mobile-only prev/next
     arrows (#smmServicesPrev/#smmServicesNext, only present in this page's markup).
     Scoped entirely to isSMMPage so seo.html/ppc-agency-in-chennai.html (which hide this
     whole component in favour of their own .seo-slider cards) are completely unaffected. */
  if (isSMMPage) {
    const smmWrap = document.querySelector(".services-wrap");
    const smmPrev = document.getElementById("smmServicesPrev");
    const smmNext = document.getElementById("smmServicesNext");
    let smmIndex = 0;
    let smmTimer;

    function smmGoTo(i, userTriggered) {
      smmIndex = ((i % services.length) + services.length) % services.length;
      panel.classList.add("smm-panel-fade");
      setTimeout(() => {
        selectService(smmIndex);
        panel.classList.remove("smm-panel-fade");
      }, 300);
      if (userTriggered) smmRestart();
    }
    function smmRestart() {
      clearInterval(smmTimer);
      smmTimer = setInterval(() => smmGoTo(smmIndex + 1, false), 5000);
    }

    smmRestart();
    if (smmWrap) {
      smmWrap.addEventListener("mouseenter", () => clearInterval(smmTimer));
      smmWrap.addEventListener("mouseleave", smmRestart);
    }
    if (smmPrev) smmPrev.addEventListener("click", () => smmGoTo(smmIndex - 1, true));
    if (smmNext) smmNext.addEventListener("click", () => smmGoTo(smmIndex + 1, true));
    // Keep smmIndex/the autoplay timer in sync when a tab is clicked directly (desktop).
    tabsWrap.querySelectorAll(".service-tab").forEach((tab, i) => {
      tab.addEventListener("click", () => {
        smmIndex = i;
        smmRestart();
      });
    });
  }

  /* ---------------- Why JOD cards: auto-highlight + hover ---------------- */
  // Scoped to #whyGrid so any other static, non-cycling ".why-card"-styled
  // cards elsewhere on the page (e.g. the SEO Page's SEO/AEO/GEO cards)
  // are not swept into this animation.
  const whyCards = document.querySelectorAll("#whyGrid .why-card");
  let whyIndex = 0;
  let whyTimer;
  function setWhyActive(i) {
    whyCards.forEach((c) => c.classList.remove("active"));
    whyCards[i].classList.add("active");
  }
  function startWhyCycle() {
    whyTimer = setInterval(() => {
      whyIndex = (whyIndex + 1) % whyCards.length;
      setWhyActive(whyIndex);
    }, 2400);
  }
  setWhyActive(0);
  startWhyCycle();
  whyCards.forEach((card, i) => {
    card.addEventListener("mouseenter", () => {
      clearInterval(whyTimer);
      whyIndex = i;
      setWhyActive(i);
    });
    card.addEventListener("mouseleave", startWhyCycle);
  });

  /* ---------------- SEO Page — Services & Why JOD sliders (3-visible, "hide not delete" redesign) ----------------
     Only runs where these new slider containers exist. #whyTrack is now shared
     by seo.html, ppc-agency-in-chennai.html, and social-media-marketing-agency-in-chennai.html
     (each page's own DOM, same ids); #seoServicesTrack still only exists on
     seo.html/ppc-agency-in-chennai.html, so that half of the block still no-ops
     on social-media-marketing-agency-in-chennai.html, which keeps its original
     tabbed Services panel, completely unaffected. */
  function initSlideCarousel({ track, prevBtn, nextBtn, dotsWrap, autoplay }) {
    if (!track) return;
    const cards = Array.from(track.children);
    if (!cards.length) return;

    // Append a duplicate of every real card right after the last one. This
    // lets the track keep scrolling forward past the end into an exact
    // repeat of the sequence instead of having to jump/scroll backward to
    // restart it. Once that duplicate lap has scrolled into place we reset
    // the scroll position back to the matching real card with no animation
    // — the duplicate is pixel-identical, so nothing visibly jumps.
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    let index = 0;
    let wrapping = false; // true while waiting to silently reset after a lap

    function cardStep() {
      const style = getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || "0") || 0;
      return cards[0].getBoundingClientRect().width + gap;
    }
    function visibleCount() {
      const step = cardStep();
      if (!step) return 1;
      return Math.max(
        1,
        Math.round(track.parentElement.getBoundingClientRect().width / step),
      );
    }
    function maxIndex() {
      return Math.max(0, cards.length - visibleCount());
    }
    function buildDots() {
      if (!dotsWrap) return;
      const max = maxIndex();
      dotsWrap.innerHTML = "";
      for (let i = 0; i <= max; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "seo-slider-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        dot.addEventListener("click", () => {
          wrapping = false;
          index = i;
          scrollToIndex(true);
        });
        dotsWrap.appendChild(dot);
      }
    }
    function updateChrome() {
      const max = maxIndex();
      const activeDot = Math.min(index, max);
      if (prevBtn) prevBtn.disabled = index <= 0;
      if (nextBtn) nextBtn.disabled = false; // continuous loop — never a dead end
      if (dotsWrap)
        dotsWrap
          .querySelectorAll(".seo-slider-dot")
          .forEach((d, i) => d.classList.toggle("active", i === activeDot));
    }
    // Scrolls to the current `index`, which may run past the last real card
    // into the cloned lap; scheduleWrap() below silently resets it once that
    // lap finishes scrolling into view, so the loop only ever moves forward.
    function scrollToIndex(animate) {
      track.scrollTo({
        left: index * cardStep(),
        behavior: animate ? "smooth" : "auto",
      });
      updateChrome();
      if (index >= cards.length) scheduleWrap();
    }
    function scheduleWrap() {
      if (wrapping) return;
      wrapping = true;
      let settled = false;
      const settle = () => {
        if (settled) return;
        settled = true;
        track.removeEventListener("scrollend", settle);
        wrapping = false;
        index -= cards.length;
        track.scrollTo({ left: index * cardStep(), behavior: "auto" });
        updateChrome();
      };
      // Prefer scrollend for a snap timed exactly to when the animation
      // lands, but always keep a timeout backstop too — if scrollend never
      // fires (interrupted scroll, no actual distance to travel, older
      // browsers) the loop must not get stuck mid-lap forever.
      track.addEventListener("scrollend", settle, { once: true });
      setTimeout(settle, 600);
    }

    buildDots();
    scrollToIndex(false);

    if (prevBtn)
      prevBtn.addEventListener("click", () => {
        index = Math.max(0, index - 1);
        scrollToIndex(true);
      });
    if (nextBtn)
      nextBtn.addEventListener("click", () => {
        index += 1;
        scrollToIndex(true);
      });

    let scrollTimer;
    track.addEventListener("scroll", () => {
      if (wrapping) return;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const step = cardStep();
        if (step) index = Math.round(track.scrollLeft / step);
        updateChrome();
        if (index >= cards.length) scheduleWrap();
      }, 120);
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildDots();
        scrollToIndex(false);
      }, 150);
    });

    // Subtle, self-pacing "marquee-style" auto-advance — pauses on hover/focus
    // and whenever the track is manually scrolled or paged, so it never fights
    // the visitor's own interaction. Always steps forward by one card; the
    // cloned lap above keeps the wraparound seamless instead of reversing.
    if (autoplay) {
      let autoTimer;
      function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
          index += 1;
          scrollToIndex(true);
        }, 3800);
      }
      function stopAuto() {
        clearInterval(autoTimer);
      }
      track.addEventListener("mouseenter", stopAuto);
      track.addEventListener("mouseleave", startAuto);
      track.addEventListener("focusin", stopAuto);
      track.addEventListener("focusout", startAuto);
      if (prevBtn) prevBtn.addEventListener("click", startAuto);
      if (nextBtn) nextBtn.addEventListener("click", startAuto);
      startAuto();
    }
  }

  // Shared "premium slider" services track — same #servicesTrack id/markup
  // used by both seo.html and ppc-agency-in-chennai.html (each has its own
  // DOM, so the shared id is safe). Icons map 1:1 to the seven entries in
  // whichever services array is active for this page.
  const servicesTrack = document.getElementById("servicesTrack");
  if (servicesTrack) {
    const seoServiceIcons = [
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09A1.65 1.65 0 0015.4 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.19.4.51.74.91.94"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h5"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-7.4 7-12.5A7 7 0 105 9.5C5 14.6 12 22 12 22z"/><circle cx="12" cy="9.5" r="2.4"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.5.5l2-2a5 5 0 00-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 00-7.5-.5l-2 2a5 5 0 007 7l1.5-1.5"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V10M10 19V4M16 19v-7M22 19H2"/></svg>',
    ];
    const ppcServiceIcons = [
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-7.4 7-12.5A7 7 0 105 9.5C5 14.6 12 22 12 22z"/><circle cx="12" cy="9.5" r="2.4"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h5"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V10M10 19V4M16 19v-7M22 19H2"/></svg>',
    ];
    const serviceIcons = isPPCPage ? ppcServiceIcons : seoServiceIcons;
    servicesTrack.innerHTML = services
      .map(
        (s, i) => `
      <article class="seo-slide-card seo-service-card">
        <div class="seo-service-top">
          <span class="seo-service-icon">${serviceIcons[i] || svgCheck}</span>
          <span class="seo-service-num">${String(i + 1).padStart(2, "0")}</span>
        </div>
        <h3>${s.label}</h3>
        <p class="seo-service-headline">${s.headline}</p>
        ${s.text ? `<p class="seo-service-headline">${s.text}</p>` : ""}
        ${
          s.checks && s.checks.length
            ? `<div class="seo-service-checks">${s.checks
                .map((c) => `<span>${svgCheck}${c}</span>`)
                .join("")}</div>`
            : ""
        }
        ${s.outro ? `<p class="seo-service-outro">${s.outro}</p>` : ""}
      </article>
    `,
      )
      .join("");
    initSlideCarousel({
      track: servicesTrack,
      prevBtn: document.getElementById("servicesPrev"),
      nextBtn: document.getElementById("servicesNext"),
      dotsWrap: document.getElementById("servicesDots"),
      autoplay: true,
    });
  }

  const whyTrack = document.getElementById("whyTrack");
  if (whyTrack && whyCards.length) {
    whyCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.remove("active");
      // Some pages (e.g. social-media-marketing-agency-in-chennai.html) give
      // their source .why-card elements "reveal"/"reveal-delay-N" scroll-in
      // classes. Those clones are appended here, after the page's reveal
      // IntersectionObserver already ran io.observe() on load, so they'd
      // never get their "in-view" class and would stay invisible forever.
      // Strip any reveal classes so cloned slide cards just render normally.
      clone.classList.remove(
        "reveal",
        "reveal-delay-1",
        "reveal-delay-2",
        "reveal-delay-3",
        "reveal-delay-4",
        "reveal-delay-5",
      );
      clone.classList.add("seo-slide-card");
      whyTrack.appendChild(clone);
    });
    initSlideCarousel({
      track: whyTrack,
      prevBtn: document.getElementById("whyPrev"),
      nextBtn: document.getElementById("whyNext"),
      dotsWrap: document.getElementById("whyDots"),
      autoplay: true,
    });
  }

  /* ---------------- Stats counters (count up on view) ---------------- */
  const statEls = document.querySelectorAll(".stat .num");
  const statIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const decimals = (el.dataset.count.split(".")[1] || "").length;
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();
        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = eased * target;
          el.textContent =
            (decimals ? value.toFixed(decimals) : Math.round(value)) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        statIO.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  statEls.forEach((el) => statIO.observe(el));

  /* ---------------- Process stepper (7 steps, auto-advance) — SEO Page ---------------- */
  const seoProcess = [
    {
      label: "Understand",
      text: "We start by understanding your business, your customers, your services, and what search success should look like for you.",
    },
    {
      label: "Research",
      text: "We study search behaviour, competitors, keywords, existing visibility, content, technical health, and market opportunities.",
    },
    {
      label: "Diagnose",
      text: "We identify what is holding your search presence back — technically, structurally, and in terms of content and authority.",
    },
    {
      label: "Plan",
      text: "We turn findings into a prioritized plan, focused on the areas that matter most for your business right now.",
    },
    {
      label: "Implement",
      text: "We put the plan into action — technical fixes, content work, structure improvements, and visibility building.",
    },
    {
      label: "Measure",
      text: "We track what changes across organic search and, where available, emerging AI-search visibility signals.",
    },
    {
      label: "Improve",
      text: "Search keeps evolving. We revisit, refine, and adjust the strategy as your business and search itself change.",
    },
  ];

  /* ---------------- Process stepper (7 steps, auto-advance) — PPC Page ---------------- */
  const ppcProcess = [
    {
      label: "Understand",
      text: "We start by understanding your business, your customers, your offer, your sales cycle, and what a successful campaign should achieve for you.",
    },
    {
      label: "Audit",
      text: "If you already run Google Ads, we review the existing account, campaign structure, tracking setup and past performance. If you are starting fresh, we map out the right starting position.",
    },
    {
      label: "Research",
      text: "We study search behaviour, keyword and search intent, competitors, and the audience and locations most relevant to your business.",
    },
    {
      label: "Strategy",
      text: "We turn findings into a campaign structure, keyword mapping, budget allocation and bidding approach built around your business objective.",
    },
    {
      label: "Build & Launch",
      text: "We set up campaigns, ad groups, ad copy, extensions and conversion tracking, and align your landing pages before going live.",
    },
    {
      label: "Monitor",
      text: "Once campaigns are live, we track search terms, click-through rate, cost per click, conversion rate and cost per conversion.",
    },
    {
      label: "Optimise & Scale",
      text: "We refine targeting, keywords, ads, bids and budgets based on real performance data, and scale the campaigns that work.",
    },
  ];

  /* ---------------- Process stepper (7 steps, auto-advance) — Social Media Marketing Page ---------------- */
  const smmProcess = [
    {
      label: "Understand",
      text: "We start by understanding your business, audience, competitors, brand position, and goals — so every decision that follows has a reason behind it.",
    },
    {
      label: "Audit",
      text: "If you already have active profiles, we review your existing content, engagement history, and platform presence. If you are starting fresh, we map out the right starting position.",
    },
    {
      label: "Strategy",
      text: "We decide which platforms matter to your business, what your brand should communicate, and what actions you want your audience to take.",
    },
    {
      label: "Content Planning",
      text: "We plan content around different purposes — awareness, education, trust building, community interaction, and offers — so your presence has a healthier content mix.",
    },
    {
      label: "Create & Publish",
      text: "We produce and publish content shaped around your brand voice, visual identity, and the platform it is built for, from static posts to reels and campaign creative.",
    },
    {
      label: "Engage & Monitor",
      text: "We respond to comments, questions and messages, and run campaigns around launches, offers and announcements — keeping your brand present in relevant conversations.",
    },
    {
      label: "Analyse & Improve",
      text: "We review relevant performance signals to understand what is working, then use those insights to shape better content decisions over time.",
    },
  ];

  const process = isPPCPage ? ppcProcess : isSMMPage ? smmProcess : seoProcess;

  const stepsWrap = document.getElementById("processSteps");
  const fill = document.getElementById("processFill");
  const detail = document.getElementById("processDetail");

  // Guarded — the SEO Page no longer includes a Process section, so these
  // elements won't exist there; the PPC and Social Media pages still do.
  if (stepsWrap && fill && detail) {
    process.forEach((p, i) => {
      const step = document.createElement("button");
      step.type = "button";
      step.className = "pstep";
      step.dataset.index = i;
      step.innerHTML = `<span class="circle">${String(i + 1).padStart(2, "0")}</span><span class="plabel">${p.label}</span>`;
      step.addEventListener("click", () => {
        clearInterval(processTimer);
        setProcessStep(i);
        processTimer = setInterval(advanceProcess, 3200);
      });
      stepsWrap.appendChild(step);
    });

    var setProcessStep = function (i) {
      const pstepEls = stepsWrap.querySelectorAll(".pstep");
      pstepEls.forEach((el, idx) => {
        el.classList.toggle("active", idx === i);
        el.classList.toggle("done", idx < i);
      });
      fill.style.width = (i / (process.length - 1)) * 100 + "%";
      const p = process[i];
      detail.innerHTML = `
        <span class="pd-num">Step ${String(i + 1).padStart(2, "0")} of ${String(process.length).padStart(2, "0")}</span>
        <h3>${p.label}</h3>
        <p>${p.text}</p>
      `;
    };

    var processIndex = 0;
    var advanceProcess = function () {
      processIndex = (processIndex + 1) % process.length;
      setProcessStep(processIndex);
    };
    setProcessStep(0);
    var processTimer = setInterval(advanceProcess, 3200);
  }

  /* ---------------- Marquee: duplicate items for seamless loop ---------------- */
  // Guarded — the SEO Page no longer includes a Platforms marquee section.
  const track = document.getElementById("marqueeTrack");
  if (track) track.innerHTML += track.innerHTML;

  /* ---------------- FAQ: data, accordion — SEO Page ---------------- */
  const seoFaqs = [
    {
      q: "Why is my website not appearing on Google?",
      a: "Several factors can affect your website's visibility, including technical issues, weak content, search intent, competition, website authority, and poor optimisation. An SEO assessment can help identify what is limiting your visibility.",
    },
    {
      q: "How can SEO help my business get more customers?",
      a: "SEO helps your business appear when potential customers are actively searching for your products or services. The goal is to attract relevant visitors and create a clear path from search results to enquiries or conversions.",
    },
    {
      q: "Do I need SEO if my website is already ranking?",
      a: "Yes. Search rankings can change as competitors, search behaviour, content, and search algorithms evolve. Ongoing SEO helps maintain visibility, improve important pages, and identify new opportunities for growth.",
    },
    {
      q: "Can SEO help me reach customers in Chennai and other locations?",
      a: "Yes. SEO can be targeted to Chennai, multiple service areas, regional markets, or wider audiences depending on your business objectives. Location-focused strategies can be used where local visibility is important.",
    },
    {
      q: "How do I know whether my SEO investment is working?",
      a: "SEO should be measured through more than rankings. We look at organic traffic, search visibility, clicks, landing-page performance, enquiries, conversions, and other business-relevant indicators.",
    },
    {
      q: "Is traditional SEO still important with AI search?",
      a: "Yes. Strong SEO fundamentals remain important as search evolves. AEO and GEO can complement SEO by helping your content become clearer, more structured, and easier to understand across answer-based and AI-driven search experiences.",
    },
    {
      q: "How is your SEO approach different from other agencies?",
      a: "We do not follow the same checklist for every business. We first understand your website, market, audience, competition, and business objectives, then prioritise the SEO work that is most relevant to your situation.",
    },
  ];

  /* ---------------- FAQ: data, filter pills, accordion — PPC Page ---------------- */
  const ppcFaqs = [
    {
      cat: "general",
      q: "What does a PPC agency in Chennai do?",
      a: "A PPC agency manages paid advertising campaigns to help businesses reach relevant audiences through platforms such as Google Ads. This can include campaign strategy, keyword research, ad creation, targeting, budget management, conversion tracking, and ongoing optimisation.",
    },
    {
      cat: "services",
      q: "What Google Ads services does JOD provide?",
      a: "Our Google Ads services include campaign setup, keyword and search intent research, Search Ads, ad copy, campaign management, landing-page optimisation, conversion tracking, and performance optimisation.",
    },
    {
      cat: "general",
      q: "Is PPC suitable for my business?",
      a: "PPC can be useful when your potential customers actively search for the products or services you offer. Its suitability depends on your market, competition, customer behaviour, offer, budget, and conversion process.",
    },
    {
      cat: "budget",
      q: "How much should I spend on Google Ads?",
      a: "There is no single budget that works for every business. The right starting budget depends on factors such as keyword costs, competition, target location, expected conversion value, and your business objectives.",
    },
    {
      cat: "performance",
      q: "How quickly can Google Ads generate results?",
      a: "PPC can start generating traffic soon after campaigns become active, but traffic does not automatically mean profitable results. Campaign performance depends on targeting, keywords, ad messaging, landing pages, conversion tracking, competition, and ongoing optimisation.",
    },
    {
      cat: "services",
      q: "Can you improve an existing Google Ads campaign?",
      a: "Yes. We can review an existing campaign to identify issues with targeting, keywords, search terms, ads, budget allocation, conversion tracking, and landing-page experience before recommending improvements.",
    },
    {
      cat: "general",
      q: "Do you provide Google Ads services for businesses in Chennai?",
      a: "Yes. We provide Google Ads services in Chennai for businesses targeting customers in Chennai and other locations based on their campaign requirements.",
    },
    {
      cat: "performance",
      q: "How do you measure Google Ads performance?",
      a: "We look beyond impressions and clicks. Depending on the campaign objective, we can track conversions, cost per conversion, conversion rate, qualified enquiries, sales, and other business-relevant actions.",
    },
  ];

  /* ---------------- FAQ: data, filter pills, accordion — Social Media Marketing Page ---------------- */
  const smmFaqs = [
    {
      cat: "general",
      q: "What does a social media marketing agency in Chennai do?",
      a: "A social media marketing agency plans and manages a brand’s presence across relevant social platforms. This can include strategy, content planning, content creation, community engagement, campaigns, and performance analysis.",
    },
    {
      cat: "services",
      q: "What social media marketing services does JOD provide?",
      a: "We provide social media strategy, content planning, content creation, community engagement, campaign management, and performance analysis.",
    },
    {
      cat: "platforms",
      q: "Which social media platforms do you manage?",
      a: "The right platforms depend on your audience, industry, business goals, and content format. We identify the platforms where your target audience is most relevant rather than recommending every platform by default.",
    },
    {
      cat: "content",
      q: "How often should a business post on social media?",
      a: "There is no universal posting frequency that works for every business. Consistency, content quality, audience relevance, and the purpose of each post are generally more important than simply increasing the number of posts.",
    },
    {
      cat: "performance",
      q: "Can social media generate leads for my business?",
      a: "Yes, depending on your business model, audience, offer, platform, content, and conversion journey. Social media can contribute to awareness, consideration, enquiries, and customer acquisition when the strategy is connected to a clear business objective.",
    },
    {
      cat: "services",
      q: "Do you create the content as well as manage social media?",
      a: "Yes. Our social media services can include content planning and content creation along with publishing, engagement, campaigns, and performance analysis.",
    },
    {
      cat: "performance",
      q: "How do you measure social media performance?",
      a: "We look at metrics relevant to the objective, which can include reach, engagement, audience response, content performance, profile activity, enquiries, and other business-related actions.",
    },
    {
      cat: "general",
      q: "Can you manage social media for a new business?",
      a: "Yes. A new business can use social media to establish its brand identity, communicate its offering, build awareness, educate its audience, and create an initial community around the business.",
    },
  ];

  const faqs = isPPCPage ? ppcFaqs : isSMMPage ? smmFaqs : seoFaqs;

  const faqList = document.getElementById("faqList");
  const pills = document.querySelectorAll("#faqPills .pill");

  function renderFaqs(filter) {
    faqList.innerHTML = "";
    faqs
      .filter((f) => filter === "all" || f.cat === filter)
      .forEach((f, i) => {
        const item = document.createElement("div");
        item.className = "faq-item";
        item.innerHTML = `
        <button class="faq-q" type="button">
          <span>${f.q}</span>
          <span class="qicon">+</span>
        </button>
        <div class="faq-a"><p>${f.a}</p></div>
      `;
        const qBtn = item.querySelector(".faq-q");
        const aBox = item.querySelector(".faq-a");
        qBtn.addEventListener("click", () => {
          const isOpen = item.classList.contains("open");
          faqList.querySelectorAll(".faq-item.open").forEach((el) => {
            el.classList.remove("open");
            el.querySelector(".faq-a").style.maxHeight = null;
          });
          if (!isOpen) {
            item.classList.add("open");
            aBox.style.maxHeight = aBox.scrollHeight + "px";
          }
        });
        faqList.appendChild(item);
      });
  }
  renderFaqs("all");

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      renderFaqs(pill.dataset.cat);
    });
  });

  /* ---------------- Footer year ---------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ==========================================================================
   ==========================================================================
   HOME HEADER / SITE NAV — scoped init
   Runs on every page that renders the shared #homeHeader/#homeNav markup —
   index.html, about.html, contact.html, SEO.html, ppc-agency-in-chennai.html
   and social-media-marketing-agency-in-chennai.html all now share this one
   header/nav, so its scroll-state, mobile toggle and dropdown behaviour is
   handled once here instead of being duplicated per page. Guarded on the
   #homeHeader element itself (rather than a body class) so it works
   regardless of which body-level classes a given page carries. Every
   section below already null-guards its own elements (homeServiceTabs,
   homeJourneyCard, homeFaqPills, etc.), so on pages that only render the
   header — like the SEO/PPC/Social Media landing pages — those home-page
   content sections simply find nothing and no-op; they can never touch or
   break that content.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("homeHeader")) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const svgArrowSm =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>';

  /* Center an active item within its own horizontally-scrolling row —
     scrolls ONLY that row's scrollLeft, never the page. (scrollIntoView()
     was used here previously; when the row isn't vertically scrollable it
     walks up to the document and yanks the whole page's scroll position,
     which is what caused the reported auto-jumping while reading.) */
  function homeScrollRowTo(container, activeEl) {
    if (!container || !activeEl) return;
    const target =
      activeEl.offsetLeft - (container.clientWidth - activeEl.offsetWidth) / 2;
    container.scrollTo({
      left: Math.max(0, target),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  /* ---------------- Header: scroll state ---------------- */
  const header = document.getElementById("homeHeader");
  if (header) {
    const onScroll = () =>
      header.classList.toggle("home-scrolled", window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById("homeNavToggle");
  const homeNav = document.getElementById("homeNav");
  if (navToggle && homeNav) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.classList.toggle("home-open");
      homeNav.classList.toggle("home-mobile-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    homeNav.querySelectorAll(":scope > a").forEach((a) =>
      a.addEventListener("click", () => {
        navToggle.classList.remove("home-open");
        homeNav.classList.remove("home-mobile-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }),
    );
  }

  /* ---------------- Services / Insights dropdowns ---------------- */
  const homeNavItems = document.querySelectorAll(".home-nav-item");
  const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const isDesktopNav = () => window.innerWidth > 900;
  let homeDdCloseTimer = null;

  function openHomeDropdown(item, btn) {
    clearTimeout(homeDdCloseTimer);
    homeNavItems.forEach((i) => {
      if (i !== item) {
        i.classList.remove("home-open");
        const b = i.querySelector(".home-dd-toggle");
        if (b) b.setAttribute("aria-expanded", "false");
      }
    });
    item.classList.add("home-open");
    btn.setAttribute("aria-expanded", "true");
  }
  function closeHomeDropdown(item, btn) {
    item.classList.remove("home-open");
    btn.setAttribute("aria-expanded", "false");
  }

  homeNavItems.forEach((item) => {
    const btn = item.querySelector(".home-dd-toggle");
    if (!btn) return;
    btn.setAttribute("aria-expanded", "false");

    /* Hover: open immediately on enter, close shortly after the pointer
       leaves the item (button + dropdown together, since mouseenter/leave
       don't fire while moving between a parent and its own descendants) —
       the short delay keeps the menu open while crossing the gap on the
       way to the dropdown and feels intentional rather than twitchy. */
    if (canHover) {
      item.addEventListener("mouseenter", () => {
        if (!isDesktopNav()) return;
        openHomeDropdown(item, btn);
      });
      item.addEventListener("mouseleave", () => {
        if (!isDesktopNav()) return;
        clearTimeout(homeDdCloseTimer);
        homeDdCloseTimer = setTimeout(() => closeHomeDropdown(item, btn), 220);
      });
    }

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isMobile = window.innerWidth <= 900;
      const isOpen = item.classList.contains("home-open");
      homeNavItems.forEach((i) => {
        if (i !== item && !isMobile) i.classList.remove("home-open");
        if (i !== item && !isMobile) {
          const b = i.querySelector(".home-dd-toggle");
          if (b) b.setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("home-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        item.classList.remove("home-open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
    btn.addEventListener("focus", () => {
      if (isDesktopNav()) openHomeDropdown(item, btn);
    });
  });
  document.addEventListener("click", () => {
    homeNavItems.forEach((i) => {
      i.classList.remove("home-open");
      const b = i.querySelector(".home-dd-toggle");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      homeNavItems.forEach((i) => {
        i.classList.remove("home-open");
        const b = i.querySelector(".home-dd-toggle");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    }
  });

  /* ---------------- Logo marquee: duplicate items for a seamless loop ---------------- */
  const homeLogoTrack = document.getElementById("homeLogoMarqueeTrack");
  if (homeLogoTrack) homeLogoTrack.innerHTML += homeLogoTrack.innerHTML;

  /* ---------------- Our Clients: auto-scroll, drag to move, then resume ---------------- */
  const clientsTrack = document.getElementById("homeClientsTrack");
  const clientsViewport = document.getElementById("homeClientsViewport");
  if (clientsTrack && clientsViewport) {
    clientsViewport.classList.add("is-draggable");

    let offset = 0;
    let half = 0;
    let dragging = false;
    let lastX = 0;
    let lastTime = performance.now();

    const marqueeDuration = () => {
      if (window.innerWidth <= 540) return 18000;
      if (window.innerWidth <= 860) return 22000;
      return 28000;
    };

    const measure = () => {
      half = clientsTrack.scrollWidth / 2;
    };

    clientsViewport.querySelectorAll("img").forEach((img) => {
      img.draggable = false;
      img.addEventListener("load", measure);
    });

    const wrapOffset = (value) => {
      if (half <= 0) return 0;
      let next = value % half;
      if (next > 0) next -= half;
      return next;
    };

    const applyOffset = () => {
      clientsTrack.style.transform = "translate3d(" + offset + "px,0,0)";
    };

    const onPointerDown = (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragging = true;
      lastX = event.clientX;
      clientsViewport.classList.add("is-dragging");
      clientsViewport.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!dragging) return;
      const delta = event.clientX - lastX;
      lastX = event.clientX;
      offset = wrapOffset(offset + delta);
      applyOffset();
    };

    const endDrag = (event) => {
      if (!dragging) return;
      dragging = false;
      clientsViewport.classList.remove("is-dragging");
      if (clientsViewport.hasPointerCapture(event.pointerId)) {
        clientsViewport.releasePointerCapture(event.pointerId);
      }
    };

    clientsViewport.addEventListener("pointerdown", onPointerDown);
    clientsViewport.addEventListener("pointermove", onPointerMove);
    clientsViewport.addEventListener("pointerup", endDrag);
    clientsViewport.addEventListener("pointercancel", endDrag);

    measure();
    window.addEventListener("resize", () => {
      measure();
      offset = wrapOffset(offset);
      applyOffset();
    });

    const step = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      if (!dragging && !prefersReducedMotion && half > 0) {
        offset = wrapOffset(offset - (half / (marqueeDuration() / 1000)) * dt);
        applyOffset();
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------------- Reveal on scroll (home-reveal + floating cards) ---------------- */
  const revealTargets = document.querySelectorAll(
    ".home-reveal, .home-float-card, .home-float-pill",
  );
  if (revealTargets.length) {
    if (prefersReducedMotion) {
      revealTargets.forEach((el) => el.classList.add("home-in-view"));
    } else {
      const homeIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("home-in-view");
              homeIO.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      revealTargets.forEach((el) => homeIO.observe(el));
    }
  }

  /* ---------------- Hero stat count-up ---------------- */
  const homeStatEls = document.querySelectorAll(".home-num[data-home-count]");
  if (homeStatEls.length) {
    const statIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.dataset.homeCount);
          const decimals = (el.dataset.homeCount.split(".")[1] || "").length;
          const suffix = el.dataset.homeSuffix || "";
          if (prefersReducedMotion) {
            el.textContent =
              (decimals ? target.toFixed(decimals) : target) + suffix;
            statIO.unobserve(el);
            return;
          }
          const duration = 1400;
          const start = performance.now();
          function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = eased * target;
            el.textContent =
              (decimals ? value.toFixed(decimals) : Math.round(value)) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          statIO.unobserve(el);
        });
      },
      { threshold: 0.4 },
    );
    homeStatEls.forEach((el) => statIO.observe(el));
  }

  /* ---------------- Services showcase (10 disciplines) ---------------- */
  const homeServices = [
    {
      label: "SEO",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
      headline: "Not Getting Found When Your Customers Search?",
      text: "Your customers are searching for products and services like yours every day. SEO makes it easier for them to discover your business when those searches happen. We improve your website&#39;s technical foundation, content, search relevance, and authority to build stronger organic visibility.",
      checks: [
        "Technical SEO",
        "On-Page SEO",
        "Keyword Research",
        "Content Optimization",
        "Local SEO",
        "Authority &amp; Link Building",
        "SEO Analytics",
      ],
      stat1: ["+248%", "Traffic"],
      stat2: ["1,240", "Keywords"],
      cta: "Explore SEO Services",
      link: "seo-company-in-chennai.html",
    },
    {
      label: "PPC & Google Ads",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l18-7-7 18-2.5-7L3 11z"/></svg>',
      headline: "Getting Clicks but Not Enough Business?",
      text: "Running Google Ads is not just about getting clicks. If the wrong audience is reached, keywords are poorly targeted, or landing pages don&#39;t convert, your advertising budget can be wasted. We build Google Ads campaigns around the searches your customers are actually making, with the right targeting, messaging, landing pages, and conversion tracking.",
      checks: [
        "Market &amp; Keyword Research",
        "Campaign Strategy",
        "Ad Creation",
        "Conversion Tracking",
        "Campaign Management",
        "Performance Optimization",
      ],
      stat1: ["3.4x", "ROAS"],
      stat2: ["-38%", "Cost/Click"],
      cta: "Explore Google Ads",
      link: "ppc-agency-in-chennai.html",
    },
    {
      label: "Social Media Marketing",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-3.9M8.6 13.5l6.8 3.9"/></svg>',
      headline: "Posting Regularly but Not Getting Enough Engagement?",
      text: "Being active on social media doesn&#39;t automatically build a strong brand. If your content isn&#39;t reaching the right audience, creating interest, or encouraging interaction, your social presence can easily get lost. We create social media strategies and content designed to make your brand more visible, relevant, and engaging — turning followers into an active audience and potential customers.",
      checks: [
        "Social Media Strategy",
        "Content Planning",
        "Content Creation",
        "Community Engagement",
        "Campaign Management",
        "Performance Analysis",
      ],
      stat1: ["+312%", "Engagement"],
      stat2: ["50+", "Posts/Month"],
      cta: "Explore Social Media Marketing",
      link: "social-media-marketing-agency-in-chennai.html",
    },
    {
      label: "Website Design & Development",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 9l-4 4 4 4M16 9l4 4-4 4M13 5l-2 16"/></svg>',
      headline: "Turn Your Website Into a Stronger Business Asset",
      text: "Your website is often the first serious interaction a customer has with your business. We design and develop websites that make information easy to find, communicate your value clearly, build trust, and guide visitors toward action.",
      checks: [
        "Website Strategy",
        "UI/UX Design",
        "Business Websites",
        "Conversion-Focused Landing Pages",
        "WordPress Development",
        "SEO-Friendly Website Structure",
        "Website Performance Optimization",
      ],
      stat1: ["1.2s", "Load Time"],
      stat2: ["+64%", "Conversions"],
      cta: "Explore Website Solutions",
      link: "#contact",
    },
    {
      label: "Content Marketing",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16M4 12h10M4 19h13"/></svg>',
      headline: "Creating Content but Not Getting the Right Response?",
      text: "Content should do more than fill your website or social media calendar. If it doesn&#39;t answer customer questions, build trust, or support their decision-making, it may not contribute to business growth. We create purposeful content that educates your audience, strengthens brand authority, improves search visibility, and guides potential customers toward action.",
      checks: [
        "Website Content",
        "SEO Content",
        "Blog Content",
        "Landing Page Content",
        "Service Page Content",
        "Content Strategy",
      ],
      stat1: ["120+", "Articles"],
      stat2: ["+90%", "Organic Reads"],
      cta: "Explore Content Marketing",
      link: "content-marketing-agency-in-chennai.html",
    },
    {
      label: "Brand Positioning",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12v18l-6-4-6 4V3z"/></svg>',
      headline:
        "Is Your Brand Struggling to Stand Out in a Competitive Market?",
      text: "Strong positioning makes it easier for customers to understand what your business stands for and why it deserves their attention. We define the ideas, messages, and market position that make your brand easier to recognize and remember.",
      checks: [
        "Brand Strategy",
        "Brand Messaging",
        "Value Proposition",
        "Market Positioning",
        "Brand Communication",
      ],
      stat1: ["8.4x", "Brand Recall"],
      stat2: ["40+", "Brands Built"],
      cta: "Explore Brand Positioning",
      link: "#contact",
    },
    {
      label: "Personal Branding",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>',
      headline: "Is Your Expertise Not Getting the Recognition It Deserves?",
      text: "Having expertise is not enough if your professional presence doesn&#39;t clearly communicate who you are, what you know, and the value you bring. We guide founders, executives, consultants, and professionals to build a clear and credible personal brand that communicates their expertise, strengthens their visibility, and supports their professional goals.",
      checks: [
        "Executive Branding",
        "LinkedIn Branding",
        "Personal Brand Strategy",
        "Thought Leadership Content",
        "Profile Positioning",
      ],
      stat1: ["+520%", "Profile Views"],
      stat2: ["5x", "Inbound Leads"],
      cta: "Explore Personal Branding",
      link: "#contact",
    },
    {
      label: "Video Production",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="15" height="14" rx="2"/><path d="M22 8l-5 4 5 4V8z"/></svg>',
      headline: "Is Your Brand Struggling to Communicate Its Story Clearly?",
      text: "Some products, services, and brand experiences are difficult to explain through text alone. Without the right visual communication, your message may fail to capture attention or leave a lasting impression. We create purposeful videos that simplify your message, showcase your products and services, and communicate your brand story across marketing, social media, campaigns, and business communication.",
      checks: [
        "Brand Videos",
        "Product Videos",
        "Promotional Videos",
        "Corporate Videos",
        "Social Media Videos",
        "Event Videos",
      ],
      stat1: ["2.1M", "Total Views"],
      stat2: ["+75%", "Watch Time"],
      cta: "Explore Video Production",
      link: "video-production-company-in-chennai.html",
    },
    {
      label: "Influencer Marketing",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="3"/><circle cx="17" cy="16" r="3"/><path d="M10.5 9.5L14.5 13.5"/></svg>',
      headline: "Struggling to Reach the Right Audience Through Social Media?",
      text: "Having a large audience doesn&#39;t always mean reaching the right people. Choosing creators without considering their audience, relevance, or brand fit can result in poor engagement and wasted marketing spend. We plan influencer campaigns around audience relevance, creator credibility, brand fit, and campaign objectives to connect your business with communities that are more likely to trust and engage with your brand.",
      checks: [
        "Influencer Discovery",
        "Creator Selection",
        "Campaign Strategy",
        "Campaign Management",
        "Brand Collaborations",
        "Campaign Analysis",
      ],
      stat1: ["60+", "Creators"],
      stat2: ["4.6x", "Avg. ROI"],
      cta: "Explore Influencer Marketing",
      link: "#contact",
    },
    {
      label: "AI, Automation & CRM Solutions",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l1.6 4.8L18 8l-4.4 1.2L12 14l-1.6-4.8L6 8l4.4-1.2L12 2z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/></svg>',
      headline: "Are Manual Processes Slowing Down Your Business?",
      text: "As your business grows, managing leads, follow-ups, customer communication, sales activities, and reporting manually can become time-consuming and difficult to manage. We connect CRM, automation, AI, and your existing business tools to streamline workflows, improve customer journeys, reduce repetitive work, and help your team operate more efficiently.",
      checks: [
        "CRM &amp; Lead Management",
        "Lead &amp; Follow-Up Automation",
        "Marketing Automation",
        "AI-Powered Workflows",
        "CRM &amp; Platform Integration",
      ],
      stat1: ["-42%", "CAC"],
      stat2: ["24/7", "Optimization"],
      cta: "Explore AI & Automation",
      link: "#contact",
    },
  ];

  const homeTabsWrap = document.getElementById("homeServiceTabs");
  const homePanel = document.getElementById("homeServicePanel");
  const homeServicePrev = document.getElementById("homeServicePrev");
  const homeServiceNext = document.getElementById("homeServiceNext");
  const homeServiceDots = document.getElementById("homeServiceDots");
  let homeServiceTimer = null;

  if (homeTabsWrap && homePanel) {
    homeServices.forEach((s, i) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "home-service-tab" + (i === 0 ? " home-active" : "");
      tab.setAttribute("role", "tab");
      tab.dataset.index = i;
      tab.innerHTML = `<span class="home-tnum">${String(i + 1).padStart(2, "0")}</span><span>${s.label}</span>`;
      tab.addEventListener("click", () => {
        stopHomeServiceCycle();
        goHomeServiceTo(i);
        startHomeServiceCycle();
      });
      homeTabsWrap.appendChild(tab);

      if (homeServiceDots) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "home-service-dot" + (i === 0 ? " home-active" : "");
        dot.setAttribute("aria-label", `Go to ${s.label}`);
        dot.addEventListener("click", () => {
          stopHomeServiceCycle();
          goHomeServiceTo(i, i > homeServiceIndex ? "next" : "prev");
          startHomeServiceCycle();
        });
        homeServiceDots.appendChild(dot);
      }
    });

    function selectHomeService(i, dir) {
      const s = homeServices[i];
      homeTabsWrap
        .querySelectorAll(".home-service-tab")
        .forEach((t, idx) => t.classList.toggle("home-active", idx === i));
      if (homeServiceDots) {
        homeServiceDots
          .querySelectorAll(".home-service-dot")
          .forEach((d, idx) => d.classList.toggle("home-active", idx === i));
      }
      homePanel.innerHTML = `
        <div class="home-service-visual">
          <div class="home-service-visual-top"><span>SERVICE ${String(i + 1).padStart(2, "0")} / ${homeServices.length}</span><span>${s.label.toUpperCase()}</span></div>
          <div class="home-service-visual-mid">
            <span class="home-service-glow" aria-hidden="true"></span>
            <span class="home-service-grid" aria-hidden="true"></span>
            <svg class="home-service-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="50" y1="50" x2="6" y2="9"/>
              <line x1="50" y1="50" x2="94" y2="23"/>
              <line x1="50" y1="50" x2="6" y2="75"/>
              <line x1="50" y1="50" x2="94" y2="92"/>
              <circle cx="6" cy="9" r="1.6"/>
              <circle cx="94" cy="23" r="1.6"/>
              <circle cx="6" cy="75" r="1.6"/>
              <circle cx="94" cy="92" r="1.6"/>
            </svg>
            <span class="home-service-ring home-service-ring-outermost" aria-hidden="true"></span>
            <span class="home-service-ring home-service-ring-outer" aria-hidden="true"></span>
            <span class="home-service-ring home-service-ring-inner" aria-hidden="true"></span>
            <div class="home-service-visual-icon">${s.icon}</div>
            <span class="home-service-chip home-service-chip-a">${s.checks[0]}</span>
            <span class="home-service-chip home-service-chip-b">${s.checks[s.checks.length - 1]}</span>
            <span class="home-service-chip home-service-chip-c">${s.checks[2]}</span>
            <span class="home-service-chip home-service-chip-d">${s.checks[1] || s.checks[0]}</span>
            <span class="home-service-dot home-service-dot-1" aria-hidden="true"></span>
            <span class="home-service-dot home-service-dot-2" aria-hidden="true"></span>
            <span class="home-service-dot home-service-dot-3" aria-hidden="true"></span>
            <span class="home-service-dot home-service-dot-4" aria-hidden="true"></span>
            <span class="home-service-dot home-service-dot-5" aria-hidden="true"></span>
          </div>
          <div class="home-service-visual-stats">
            <div><strong>${s.stat1[0]}</strong><span>${s.stat1[1]}</span></div>
            <div><strong>${s.stat2[0]}</strong><span>${s.stat2[1]}</span></div>
          </div>
        </div>
        <div class="home-service-info">
          <span class="home-snum">Service ${String(i + 1).padStart(2, "0")} of ${homeServices.length}</span>
          <h3>${s.label}</h3>
          <p><strong>${s.headline}</strong><br>${s.text}</p>
          <div class="home-check-list">
            ${s.checks.map((c) => `<div class="home-check-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg><span>${c}</span></div>`).join("")}
          </div>
          <div class="home-service-actions">
            <a href="${s.link}" class="home-btn home-btn-primary">${s.cta} ${svgArrowSm}</a>
          </div>
        </div>
      `;
      const activeTab = homeTabsWrap.querySelector(
        ".home-service-tab.home-active",
      );
      homeScrollRowTo(homeTabsWrap.parentElement, activeTab);

      if (dir && !prefersReducedMotion) {
        homePanel.classList.remove("home-slide-next", "home-slide-prev");
        void homePanel.offsetWidth; /* restart animation */
        homePanel.classList.add(
          dir === "next" ? "home-slide-next" : "home-slide-prev",
        );
      }
    }
    /* ---------------------------------------------------------------
       State machine for the slider. Every entry point (auto-advance,
       tabs, dots, arrows, swipe) funnels through goHomeServiceTo() so
       the displayed slide, homeServiceIndex, and the animation are
       always in lockstep — this is what guarantees the sequence is
       always exactly 1→2→3→...→10→1 with nothing skipped.
       ----------------------------------------------------------------- */
    let homeServiceIndex = 0;
    let homeServiceBusy = false; // true while a slide transition is in flight
    const HOME_SERVICE_INTERVAL_MS = 5000;
    const HOME_SERVICE_TRANSITION_MS = 520; // matches the .5s CSS animation

    function goHomeServiceTo(targetIndex, dir) {
      // Ignore any request that arrives mid-transition instead of queuing
      // it — this is what prevents double-advances / skipped slides if
      // multiple triggers fire close together (e.g. touch + synthetic
      // mouse events on hybrid devices, or rapid clicking).
      if (homeServiceBusy) return;
      const total = homeServices.length;
      const normalized = ((targetIndex % total) + total) % total;
      homeServiceIndex = normalized;
      selectHomeService(homeServiceIndex, dir);
      if (dir && !prefersReducedMotion) {
        homeServiceBusy = true;
        setTimeout(() => {
          homeServiceBusy = false;
        }, HOME_SERVICE_TRANSITION_MS);
      }
    }
    selectHomeService(0);

    function advanceHomeService() {
      goHomeServiceTo(homeServiceIndex + 1, "next");
    }
    function startHomeServiceCycle() {
      // Always clear any existing timer before creating a new one so
      // repeated calls (hover in/out, touch + mouse on hybrid devices,
      // etc.) can never stack multiple intervals — a stacked interval is
      // exactly what causes slides to appear to "skip" a number.
      clearInterval(homeServiceTimer);
      homeServiceTimer = null;
      if (prefersReducedMotion) return;
      homeServiceTimer = setInterval(advanceHomeService, HOME_SERVICE_INTERVAL_MS);
    }
    function stopHomeServiceCycle() {
      clearInterval(homeServiceTimer);
      homeServiceTimer = null;
    }
    startHomeServiceCycle();
    homeTabsWrap.addEventListener("mouseenter", stopHomeServiceCycle);
    homeTabsWrap.addEventListener("mouseleave", startHomeServiceCycle);
    // Pause while the tab is in the background so a throttled interval
    // can't queue up several advances and fire them back-to-back once the
    // tab becomes visible again.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopHomeServiceCycle();
      else startHomeServiceCycle();
    });

    /* ---- Mobile slider: prev/next arrows + swipe ---- */
    function goHomeService(delta) {
      stopHomeServiceCycle();
      goHomeServiceTo(homeServiceIndex + delta, delta > 0 ? "next" : "prev");
      startHomeServiceCycle();
    }
    if (homeServicePrev && homeServiceNext) {
      homeServicePrev.addEventListener("click", () => goHomeService(-1));
      homeServiceNext.addEventListener("click", () => goHomeService(1));
    }

    let homeSwipeStartX = 0,
      homeSwipeStartY = 0,
      homeSwipeTracking = false;
    homePanel.addEventListener(
      "touchstart",
      (e) => {
        const t = e.changedTouches[0];
        homeSwipeStartX = t.clientX;
        homeSwipeStartY = t.clientY;
        homeSwipeTracking = true;
        stopHomeServiceCycle();
      },
      { passive: true },
    );
    homePanel.addEventListener(
      "touchend",
      (e) => {
        if (!homeSwipeTracking) return;
        homeSwipeTracking = false;
        const t = e.changedTouches[0];
        const dx = t.clientX - homeSwipeStartX;
        const dy = t.clientY - homeSwipeStartY;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          goHomeService(dx < 0 ? 1 : -1);
        } else {
          startHomeServiceCycle();
        }
      },
      { passive: true },
    );
  }

  /* ---------------- Journey: 8 milestones ---------------- */
  const homeJourney = [
    {
      label: "Business Consultation",
      short: "Consultation",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
      text: "We begin by understanding your business, objectives, challenges, audience, current digital presence, and growth priorities.",
      stat1: ["45 min", "Discovery Calls"],
      stat2: ["6+", "Stakeholders"],
    },
    {
      label: "Market &amp; Competitor Research",
      short: "Research",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M8 17v-4M12 17V9M16 17v-6"/></svg>',
      text: "We study your industry, competitors, audience behaviour, search opportunities, and market conditions to identify areas worth pursuing.",
      stat1: ["30+", "Data Points"],
      stat2: ["12", "Channels Audited"],
    },
    {
      label: "Strategy Development",
      short: "Strategy",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
      text: "We translate research into a practical strategy with the right channels, priorities, messaging, campaigns, and digital activities aligned with your goals.",
      stat1: ["1", "Custom Roadmap"],
      stat2: ["90-Day", "Plan"],
    },
    {
      label: "Content &amp; Campaign Planning",
      short: "Content",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
      text: "We develop content, creative, campaigns, and messaging based on your audience, their needs, and their decision-making journey.",
      stat1: ["20+", "Assets"],
      stat2: ["1", "Brand Voice Guide"],
    },
    {
      label: "Multi-Channel Execution",
      short: "Execution",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 00-2.9-.1z"/><path d="M12 15l-3-3a22 22 0 012-3.9A12.9 12.9 0 0122 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 01-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/></svg>',
      text: "We execute across SEO, Google Ads, social media, content, websites, branding, video, AI, and technology solutions based on what your business actually needs.",
      stat1: ["Multi", "Channel Launch"],
      stat2: ["100%", "On Schedule"],
    },
    {
      label: "Performance Monitoring",
      short: "Tracking",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>',
      text: "We track key performance metrics to measure results, identify areas for improvement, and uncover new opportunities for growth.",
      stat1: ["Live", "Dashboards"],
      stat2: ["66+", "Signals"],
    },
    {
      label: "Continuous Optimization",
      short: "Optimization",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>',
      text: "We use performance insights to refine campaigns, improve content, strengthen customer experiences, and make better marketing decisions.",
      stat1: ["Weekly", "Reviews"],
      stat2: ["A/B", "Testing"],
    },
    {
      label: "Sustainable Growth",
      short: "Growth",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
      text: "We scale what works, expanding into the channels, audiences, and opportunities that deliver results so your growth keeps compounding over time.",
      stat1: ["Scale", "What Works"],
      stat2: ["Long-Term", "Partnership"],
    },
  ];

  const jCard = document.getElementById("homeJourneyCard");
  const jFill = document.getElementById("homeJourneyFill");
  const jTrack = document.getElementById("homeJourneyTrack");
  const jPrev = document.getElementById("homeJourneyPrev");
  const jNext = document.getElementById("homeJourneyNext");
  let homeJourneyTimer;

  if (jCard && jFill && jTrack && jPrev && jNext) {
    jTrack.innerHTML =
      '<span class="home-jt-line" aria-hidden="true"></span><span class="home-jt-line-fill" aria-hidden="true"></span>';
    const jLineFill = jTrack.querySelector(".home-jt-line-fill");
    homeJourney.forEach((m, i) => {
      const node = document.createElement("button");
      node.type = "button";
      node.className = "home-jt-node";
      node.title = m.label.replace("&amp;", "&");
      node.innerHTML = `<span class="home-jt-circle">${m.icon}</span><span class="home-jt-num">${String(i + 1).padStart(2, "0")}</span><span class="home-jt-label">${m.short}</span>`;
      node.addEventListener("click", () => {
        clearInterval(homeJourneyTimer);
        node.classList.remove("home-jt-clicked");
        void node.offsetWidth;
        node.classList.add("home-jt-clicked");
        setHomeJourney(i);
        startHomeJourneyCycle();
      });
      jTrack.appendChild(node);
    });

    function setHomeJourney(i) {
      const nodes = jTrack.querySelectorAll(".home-jt-node");
      nodes.forEach((n, idx) => {
        n.classList.toggle("home-active", idx === i);
        n.classList.toggle("home-done", idx < i);
        if (idx === i) n.setAttribute("aria-current", "step");
        else n.removeAttribute("aria-current");
      });
      jFill.style.width = ((i + 1) / homeJourney.length) * 100 + "%";
      jLineFill.style.width = ((i + 0.85) / homeJourney.length) * 100 + "%";
      // Re-trigger the pulse/flash animations on every step change by
      // removing then re-adding the class after a forced reflow.
      jFill.classList.remove("home-jf-pulse");
      jCard.classList.remove("home-jc-flash");
      void jFill.offsetWidth;
      jFill.classList.add("home-jf-pulse");
      jCard.classList.add("home-jc-flash");
      const m = homeJourney[i];
      jCard.innerHTML = `
        <div class="home-jc-icon">${m.icon}</div>
        <div class="home-jc-body">
          <span class="home-jc-kicker">Milestone ${String(i + 1).padStart(2, "0")} of ${homeJourney.length}</span>
          <h3>${m.label}</h3>
          <p>${m.text}</p>
        </div>
        <div class="home-jc-stats">
          <div class="home-jc-stat"><strong>${m.stat1[0]}</strong><span>${m.stat1[1]}</span></div>
          <div class="home-jc-stat"><strong>${m.stat2[0]}</strong><span>${m.stat2[1]}</span></div>
        </div>
      `;
      jPrev.disabled = i === 0;
      jNext.innerHTML =
        i === homeJourney.length - 1
          ? `Restart ${svgArrowSm}`
          : `Next Step ${svgArrowSm}`;
      const activeNode = jTrack.querySelector(".home-jt-node.home-active");
      homeScrollRowTo(jTrack.parentElement, activeNode);
    }

    let homeJourneyIndex = 0;
    function goHomeJourney(delta) {
      homeJourneyIndex =
        (homeJourneyIndex + delta + homeJourney.length) % homeJourney.length;
      setHomeJourney(homeJourneyIndex);
    }
    jPrev.addEventListener("click", () => {
      clearInterval(homeJourneyTimer);
      goHomeJourney(-1);
      startHomeJourneyCycle();
    });
    jNext.addEventListener("click", () => {
      clearInterval(homeJourneyTimer);
      goHomeJourney(1);
      startHomeJourneyCycle();
    });

    function startHomeJourneyCycle() {
      if (prefersReducedMotion) return;
      homeJourneyTimer = setInterval(() => goHomeJourney(1), 4200);
    }
    setHomeJourney(0);
    startHomeJourneyCycle();
    jCard
      .closest(".home-journey-box")
      .addEventListener("mouseenter", () => clearInterval(homeJourneyTimer));
    jCard
      .closest(".home-journey-box")
      .addEventListener("mouseleave", startHomeJourneyCycle);
  }

  /* ---------------- FAQ ---------------- */
  const homeFaqs = [
    {
      cat: "strategy",
      q: "What does JOD Business Services do?",
      a: "JOD Business Services is a tech-driven digital marketing company in Chennai that brings together strategy, branding, technology, creative, and digital marketing. We help businesses build stronger digital ecosystems through solutions such as SEO, Google Ads, social media, websites, content, branding, video, AI, automation, and CRM.",
    },
    {
      cat: "strategy",
      q: "Why should I choose JOD instead of a traditional digital marketing agency?",
      a: "We don’t treat marketing channels as isolated activities. We first understand your business challenge, then connect the right strategy, technology, creative, and marketing solutions around your goals. This helps create a more connected approach rather than simply running individual campaigns.",
    },
    {
      cat: "strategy",
      q: "Do you work with businesses outside Chennai?",
      a: "Yes. While JOD Business Services is based in Chennai, we work with businesses across Tamil Nadu and other parts of India. Our digital services allow us to collaborate with businesses regardless of location.",
    },
    {
      cat: "strategy",
      q: "How do you create a digital marketing strategy for a business?",
      a: "We start by understanding your business objectives, audience, market, competitors, existing digital presence, and growth challenges. We then identify the right channels and develop a practical strategy based on what your business actually needs.",
    },
    {
      cat: "services",
      q: "Can JOD help if our marketing is not generating enough leads?",
      a: "Yes. We can assess your website, SEO, Google Ads, social media, content, branding, conversion journey, and other digital touchpoints to identify where potential customers are being lost and recommend solutions to improve visibility, engagement, and conversions.",
    },
    {
      cat: "services",
      q: "What do AI and automation mean for a business?",
      a: "AI and automation can help businesses reduce manual work and improve how they manage leads, customer communication, follow-ups, marketing workflows, CRM processes, research, content, and reporting. We identify where technology can create practical value rather than using AI simply because it is available.",
    },
    {
      cat: "services",
      q: "Do you provide video production and influencer marketing?",
      a: "Yes. Our creative services include video production and influencer marketing, planned around your brand, audience, campaign objectives, and communication goals.",
    },
  ];

  const homeFaqPills = document.getElementById("homeFaqPills");
  const homeFaqList = document.getElementById("homeFaqList");

  if (homeFaqPills && homeFaqList) {
    const cats = ["all", "strategy", "services"];
    const catLabels = {
      all: "All",
      strategy: "Strategy",
      services: "Services",
    };
    cats.forEach((cat, i) => {
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = "home-pill" + (i === 0 ? " home-active" : "");
      pill.dataset.cat = cat;
      pill.textContent = catLabels[cat];
      pill.addEventListener("click", () => {
        homeFaqPills
          .querySelectorAll(".home-pill")
          .forEach((p) => p.classList.remove("home-active"));
        pill.classList.add("home-active");
        renderHomeFaqs(cat);
      });
      homeFaqPills.appendChild(pill);
    });

    function renderHomeFaqs(filter) {
      homeFaqList.innerHTML = "";
      homeFaqs
        .filter((f) => filter === "all" || f.cat === filter)
        .forEach((f) => {
          const item = document.createElement("div");
          item.className = "home-faq-item";
          item.innerHTML = `
          <button class="home-faq-q" type="button" aria-expanded="false">
            <span>${f.q}</span>
            <span class="home-qicon">+</span>
          </button>
          <div class="home-faq-a"><p>${f.a}</p></div>
        `;
          const qBtn = item.querySelector(".home-faq-q");
          const aBox = item.querySelector(".home-faq-a");
          qBtn.addEventListener("click", () => {
            const isOpen = item.classList.contains("home-open");
            homeFaqList
              .querySelectorAll(".home-faq-item.home-open")
              .forEach((el) => {
                el.classList.remove("home-open");
                el.querySelector(".home-faq-q").setAttribute(
                  "aria-expanded",
                  "false",
                );
                el.querySelector(".home-faq-a").style.maxHeight = null;
              });
            if (!isOpen) {
              item.classList.add("home-open");
              qBtn.setAttribute("aria-expanded", "true");
              aBox.style.maxHeight = aBox.scrollHeight + "px";
            }
          });
          homeFaqList.appendChild(item);
        });
    }
    renderHomeFaqs("all");
  }

  /* ---------------- Footer year ---------------- */
  const homeYear = document.getElementById("homeYear");
  if (homeYear) homeYear.textContent = new Date().getFullYear();
});

/* ==========================================================================
   ==========================================================================
   CONTACT PAGE — scoped init (contact.html)
   Runs only when <body class="contact-page"> is present, and only touches
   #contactForm / #contactSuccess if they exist — so it can never affect the
   SEO Page, the Home Page, or the About Page.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("contact-page")) return;

  const form = document.getElementById("contactForm");
  const successBox = document.getElementById("contactSuccess");
  if (!form || !successBox) return;

  // The HTML ships a relative fallback ("thank-you.html") for _next since
  // the page doesn't know its own domain in advance. Rewrite it to a full
  // absolute URL on whatever domain the page is actually served from —
  // FormSubmit only reliably honours _next as an absolute URL, so this
  // makes the post-submit redirect work correctly on localhost, a temp
  // hosting subdomain, or the final production domain without editing.
  const nextField = form.querySelector('input[name="_next"]');
  if (nextField) nextField.value = window.location.origin + "/thank-you.html";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(input, hasError) {
    const field = input.closest(".contact-field");
    if (field) field.classList.toggle("contact-field-error", hasError);
  }

  function validateField(input) {
    let valid = true;
    if (input.hasAttribute("required") && !input.value.trim()) valid = false;
    if (
      valid &&
      input.type === "email" &&
      input.value.trim() &&
      !emailPattern.test(input.value.trim())
    )
      valid = false;
    setFieldError(input, !valid);
    return valid;
  }

  const trackedInputs = form.querySelectorAll(
    ".contact-input, .contact-textarea",
  );
  trackedInputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      const field = input.closest(".contact-field");
      if (field && field.classList.contains("contact-field-error"))
        validateField(input);
    });
  });

  form.addEventListener("submit", (e) => {
    let allValid = true;
    let firstInvalid = null;
    form.querySelectorAll("[required]").forEach((input) => {
      const ok = validateField(input);
      if (!ok) {
        allValid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });
    if (!allValid) {
      e.preventDefault();
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Valid — let the browser submit natively to mail-handler.php (see
    // the form's action="mail-handler.php" + hidden _next field in the
    // HTML), which sends every field over SMTP to the configured inbox
    // and then redirects the visitor to thank-you.html. No
    // preventDefault() here on purpose.
  });
});

/* ==========================================================================
   ==========================================================================
   BOOK FREE CONSULTATION — reusable modal (site-wide)
   Builds and injects one modal into <body> at runtime, then wires up every
   [data-consult-trigger] element on the page (header CTA, hero CTAs, etc.)
   to open it instead of navigating away. Completely self-contained — no
   page template needs to embed the modal markup — and safe to include on
   every page: it no-ops if there are no triggers on the page (e.g.
   about.html, which is intentionally left untouched).
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll("[data-consult-trigger]");
  if (!triggers.length) return;

  const overlay = document.createElement("div");
  overlay.className = "consult-modal-overlay";
  overlay.id = "consultModalOverlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="consult-modal" role="dialog" aria-modal="true" aria-labelledby="consultModalTitle" tabindex="-1">
      <button type="button" class="consult-modal-close" id="consultModalClose" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      
      <form class="consult-modal-form" id="consultModalForm" method="POST" action="mail-handler.php" novalidate>
        <input type="hidden" name="_subject" value="New Enquiry — JOD Website (Book Free Consultation)">
        <input type="hidden" name="_next" value="thank-you.html">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_captcha" value="false">
        <input type="text" name="_honey" style="position:absolute;left:-9999px" tabindex="-1" autocomplete="off">
        <div class="consult-field">
          <label for="cm-name">Full Name</label>
          <input class="consult-input" type="text" id="cm-name" name="name" placeholder="Vijay" autocomplete="name" required>
          <span class="consult-field-error-msg">Please enter your name.</span>
        </div>
        <div class="consult-field">
          <label for="cm-business">Business Name</label>
          <input class="consult-input" type="text" id="cm-business" name="business" placeholder="JOD Business Services" autocomplete="organization">
        </div>
        <div class="consult-field">
          <label for="cm-email">Email Address</label>
          <input class="consult-input" type="email" id="cm-email" name="email" placeholder="you@company.com" autocomplete="email" required>
          <span class="consult-field-error-msg">Please enter a valid email.</span>
        </div>
        <div class="consult-field">
          <label for="cm-phone">Phone Number</label>
          <input class="consult-input" type="tel" id="cm-phone" name="phone" placeholder="+91 XXXXX XXXXX" autocomplete="tel">
        </div>
        <div class="consult-field consult-field-full">
          <label for="cm-service">Service Interested In</label>
          <div class="consult-select-wrap">
            <select id="cm-service" name="service" defaultValue="">
              <option value="" selected disabled>Choose a service</option>
              <option>SEO</option>
              <option>PPC &amp; Google Ads</option>
              <option>Social Media Marketing</option>
              <option>Website Design &amp; Development</option>
              <option>Content Marketing</option>
              <option>Brand Positioning</option>
              <option>Personal Branding</option>
              <option>Video Production</option>
              <option>Influencer Marketing</option>
              <option>AI, Automation &amp; CRM Solutions</option>
              <option>Not Sure Yet</option>
            </select>
            <svg class="consult-select-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>
        <div class="consult-field consult-field-full">
          <label for="cm-message">Message</label>
          <textarea class="consult-textarea" id="cm-message" name="message" rows="4" placeholder="Tell us about your project, goals, and timeline..." required></textarea>
          <span class="consult-field-error-msg">Please tell us a little about your project.</span>
        </div>
        <div class="consult-field-full">
          <button type="submit" class="consult-submit-btn">
            Book Free Consultation
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
          
        </div>
      </form>
      <div class="consult-modal-success" id="consultModalSuccess" hidden>
        <span class="consult-success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span>
        <h3>Request received!</h3>
        <p>Thanks for reaching out — our team will get back to you within one business day.</p>
        <button type="button" class="consult-success-close">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const form = overlay.querySelector("#consultModalForm");
  const closeBtn = overlay.querySelector("#consultModalClose");
  const successBox = overlay.querySelector("#consultModalSuccess");
  const successCloseBtn = overlay.querySelector(".consult-success-close");
  let lastFocused = null;

  // Rewrite the relative _next fallback to an absolute URL on whatever
  // domain the page is actually served from — see the matching comment
  // in the CONTACT PAGE init above for why.
  const modalNextField = form.querySelector('input[name="_next"]');
  if (modalNextField)
    modalNextField.value = window.location.origin + "/thank-you.html";

  function resetModal() {
    form.hidden = false;
    form.classList.remove("consult-hidden");
    successBox.hidden = true;
    successBox.classList.remove("consult-visible");
    form.reset();
    form
      .querySelectorAll(".consult-field-error")
      .forEach((f) => f.classList.remove("consult-field-error"));
  }

  function onKeydown(e) {
    if (e.key === "Escape") closeModal();
  }

  function openModal(e) {
    if (e) e.preventDefault();
    lastFocused = document.activeElement;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("consult-lock");
    document.addEventListener("keydown", onKeydown);
    setTimeout(() => {
      const firstInput = form.querySelector(".consult-input");
      if (firstInput) firstInput.focus();
    }, 300);
  }

  function closeModal() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("consult-lock");
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && typeof lastFocused.focus === "function")
      lastFocused.focus();
    setTimeout(resetModal, 350);
  }

  triggers.forEach((t) => t.addEventListener("click", openModal));
  closeBtn.addEventListener("click", closeModal);
  successCloseBtn.addEventListener("click", closeModal);
  overlay.addEventListener("mousedown", (e) => {
    if (e.target === overlay) closeModal();
  });

  /* ---- validation + fake submit — mirrors #contactForm on contact.html ---- */
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(input, hasError) {
    const field = input.closest(".consult-field");
    if (field) field.classList.toggle("consult-field-error", hasError);
  }

  function validateField(input) {
    let valid = true;
    if (input.hasAttribute("required") && !input.value.trim()) valid = false;
    if (
      valid &&
      input.type === "email" &&
      input.value.trim() &&
      !emailPattern.test(input.value.trim())
    )
      valid = false;
    setFieldError(input, !valid);
    return valid;
  }

  form
    .querySelectorAll(".consult-input, .consult-textarea")
    .forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => {
        const field = input.closest(".consult-field");
        if (field && field.classList.contains("consult-field-error"))
          validateField(input);
      });
    });

  form.addEventListener("submit", (e) => {
    let allValid = true;
    let firstInvalid = null;
    form.querySelectorAll("[required]").forEach((input) => {
      const ok = validateField(input);
      if (!ok) {
        allValid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });
    if (!allValid) {
      e.preventDefault();
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Valid — let the browser submit natively to mail-handler.php (see
    // the form's action="mail-handler.php" + hidden _next field above),
    // which sends every field over SMTP to the configured inbox and then
    // redirects the visitor to thank-you.html. No preventDefault() here
    // on purpose — same pattern as the full contact page form.
  });
});

/* ==========================================================================
   Generic "static services cards → numbered accordion" converter
   ==========================================================================
   Design-only change, content untouched: content-marketing/personal-branding/
   video-production/web-design/web-development each already had their own
   Services content hardcoded as static .seo-service-card articles inside a
   dots-carousel (.seo-slider). Rather than retype that content into a JS data
   array (risking transcription drift), this reads each page's existing cards
   straight out of the DOM at runtime and builds the SAME numbered-accordion
   #service-tabs/#service-panel component the branding page uses, so every
   service page's Services section now looks identical — only the content
   (unchanged, just moved) differs per page. The old dots-carousel stays in
   the DOM, hidden via the .services-old-slider class (hide, don't delete).

   Markup contract (see each page's #services section):
     <div class="services-wrap" id="...ServicesWrap" data-tabs-track="...Track">
       <button class="smm-slider-arrow smm-slider-arrow-prev">...</button>
       <div class="service-tabs" role="tablist"></div>
       <div class="service-panel"></div>
       <button class="smm-slider-arrow smm-slider-arrow-next">...</button>
     </div>
   #...Track is the id of the (now-hidden) .seo-slider-track holding the real
   .seo-service-card articles this reads content from.
   Independent of, and not gated behind, the #serviceTabs-guarded listener
   above — this runs on every page and simply no-ops where no
   [data-tabs-track] wrapper exists (i.e. everywhere except these 5 pages). */
document.addEventListener("DOMContentLoaded", () => {
  const svgArrow =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>';

  document.querySelectorAll("[data-tabs-track]").forEach((wrap) => {
    const track = document.getElementById(wrap.dataset.tabsTrack);
    const tabsEl = wrap.querySelector(".service-tabs");
    const panelEl = wrap.querySelector(".service-panel");
    if (!track || !tabsEl || !panelEl) return;

    const cards = Array.from(track.children).filter(
      (el) => el.nodeType === 1 && !el.hasAttribute("aria-hidden"),
    );
    if (!cards.length) return;

    let index = 0;

    function render(i) {
      index = i;
      const card = cards[i];
      const clone = card.cloneNode(true);
      const badge = clone.querySelector(".seo-service-top");
      if (badge) badge.remove();
      panelEl.innerHTML = `<span class="snum">Service ${String(i + 1).padStart(2, "0")} of ${String(cards.length).padStart(2, "0")}</span>${clone.innerHTML}`;
      tabsEl
        .querySelectorAll(".service-tab")
        .forEach((t, idx) => t.classList.toggle("active", idx === i));
    }

    cards.forEach((card, i) => {
      const labelEl = card.querySelector("h3");
      const label = labelEl ? labelEl.textContent : `Service ${i + 1}`;
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "service-tab" + (i === 0 ? " active" : "");
      tab.setAttribute("role", "tab");
      tab.dataset.index = i;
      tab.innerHTML = `<span class="tnum">${String(i + 1).padStart(2, "0")}</span><span class="tlabel">${label}</span>${svgArrow}`;
      tab.addEventListener("click", () => render(i));
      tabsEl.appendChild(tab);
    });
    render(0);

    function goTo(i) {
      render(((i % cards.length) + cards.length) % cards.length);
    }
    const prevBtn = wrap.querySelector(".smm-slider-arrow-prev");
    const nextBtn = wrap.querySelector(".smm-slider-arrow-next");
    if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));
  });

/* ==========================================================================
   Site-wide scroll parallax — runs on every page (unlike the blocks above,
   this isn't gated on a page-specific element) so hero/decorative visuals
   marked with data-parallax get a subtle scroll-linked depth effect
   consistently across the whole site. Transform-only + rAF-batched +
   IntersectionObserver-gated for performance, and it backs off entirely
   under prefers-reduced-motion or on narrow/mobile viewports.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
  if (!parallaxEls.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return; // elements stay static, no listeners attached

  const MOBILE_BREAKPOINT = 768; // parallax disabled below this width for perf

  const items = parallaxEls.map((el) => ({
    el,
    speed: parseFloat(el.dataset.parallax) || 0.1,
    active: false,
  }));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const item = items.find((it) => it.el === entry.target);
        if (item) item.active = entry.isIntersecting;
      });
    },
    { rootMargin: "20% 0px 20% 0px" },
  );
  items.forEach((item) => io.observe(item.el));

  let ticking = false;
  function applyParallax() {
    ticking = false;
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      items.forEach((item) => {
        item.el.style.transform = "";
      });
      return;
    }
    const vh = window.innerHeight;
    items.forEach((item) => {
      if (!item.active) return;
      const rect = item.el.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - vh / 2;
      const shift = (centerOffset * -item.speed).toFixed(1);
      item.el.style.transform = `translate3d(0, ${shift}px, 0)`;
    });
  }
  function requestTick() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(applyParallax);
    }
  }
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick, { passive: true });
  applyParallax();
});
});

/* ---------------- Email links ----------------
   Desktop browsers usually have no mail app registered for mailto:, so the
   click silently does nothing. Open Gmail's compose window for the clicked
   address instead. Touch devices keep the native mailto: (opens the mail app). */
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="mailto:"]');
  if (!link || e.defaultPrevented) return;
  if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

  const mailto = new URL(link.href);
  const compose = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: decodeURIComponent(mailto.pathname),
  });
  const fieldMap = { subject: "su", body: "body", cc: "cc", bcc: "bcc" };
  mailto.searchParams.forEach((value, key) => {
    const gmailKey = fieldMap[key.toLowerCase()];
    if (gmailKey) compose.set(gmailKey, value);
  });

  e.preventDefault();
  window.open(
    "https://mail.google.com/mail/?" + compose.toString(),
    "_blank",
    "noopener",
  );
});
