      /* cleanui. Every beat time below is a recorded anchor word (cues.json), filled in by build.py.
         Motion is a pure function of the timeline time: no real-time CSS animation, no randomness. */

      /* the soft seams. A slide: the card that leaves blurs out in 0.20 s, the card that arrives clears in 0.47 s.
         A fade: the outgoing card dissolves in 0.23 s, the incoming one in 0.27 s, with no blur. seam-stamp moves
         the cards and sets the hard cuts; this adds only the blur or the opacity. */
      var SLIDES = @@slides@@;
      SLIDES.forEach(function (s) {
        if (s.fade) {
          tl.fromTo(s.exit, { autoAlpha: 1 }, { autoAlpha: 0, duration: s.exDur, ease: "power1.in", immediateRender: false }, s.cut - s.exDur);
          tl.fromTo(s.entry, { autoAlpha: 0 }, { autoAlpha: 1, duration: s.enDur, ease: "power1.out", immediateRender: false }, s.cut);
          return;
        }
        tl.fromTo(s.exit, { filter: "blur(0px)" }, { filter: "blur(" + s.blur + "px)", duration: s.exDur, ease: "power3.in", immediateRender: false }, s.cut - s.exDur);
        tl.fromTo(s.entry, { filter: "blur(" + s.blur + "px)" }, { filter: "blur(0px)", duration: s.enDur, ease: "power4.out", immediateRender: false }, s.cut);
      });

      /* caption band per scene: y 300 (top) or y 980 (mid). The band is set at the scene's start time. */
      var BANDS = @@bands@@;
      BANDS.forEach(function (b) { tl.set(".kc", { top: b[1] }, b[0]); });

      /* media cards (cues.json "media"): on its scene's start, a card slides in from the right, tilted and blurred,
         and settles in 0.53 s. The seam blurs it out with its scene. */
      var MEDIA = @@media@@;
      MEDIA.forEach(function (m) {
        tl.fromTo(m[0], { x: 260, rotation: 6, scale: 1.06, filter: "blur(10px)", transformOrigin: "50% 50%" },
                        { x: 0, rotation: 0, scale: 1, filter: "blur(0px)", transformOrigin: "50% 50%", duration: 0.53,
                          ease: "power3.out", immediateRender: false }, m[1]);
      });

      /* shared component helpers (parts/ch/README.md). Every call is a tween on tl at a recorded time. */
      /* a meter fills from its from-percent to its percent; fill is the .fill inside the meter */
      function meter(id, t, pct, d, from) {
        tl.fromTo("#" + id + " .fill", { scaleX: (from || 0) / 100 }, { scaleX: pct / 100, duration: d || 0.6, ease: "power2.out", immediateRender: false }, t);
      }
      /* a row of dots (class dot) under a container, each moving from x0 to x1 with a delay of gap per dot */
      function stream(sel, t, dur, x0, x1, gap) {
        document.querySelectorAll(sel).forEach(function (el, k) {
          tl.set(el, { autoAlpha: 0 }, 0);
          tl.fromTo(el, { x: x0, autoAlpha: 0 }, { x: x1, autoAlpha: 1, duration: dur, ease: "none", immediateRender: false }, t + k * gap);
          tl.to(el, { autoAlpha: 0, duration: 0.01, immediateRender: false }, t + k * gap + dur);
        });
      }
      /* the chapter card (STORYBOARD B9): the card elements pop in on t, leave at tChip, the chip pops in */
      function chapterCard(id, t, tChip) {
        pop("#" + id + "-num", t, 0.5);
        pop("#" + id + "-tile", t + 0.05, 0.6, 0.6);
        show("#" + id + "-title", t + 0.15, 0.5);
        pop("#" + id + "-burst", t + 0.2, 0.6, 0.4);
        pop("#" + id + "-mascot", t + 0.3, 0.6, 0.6);
        gone(["#" + id + "-num", "#" + id + "-tile", "#" + id + "-title", "#" + id + "-burst", "#" + id + "-mascot"].join(", "), tChip, 0.35);
        pop("#" + id + "-chip", tChip + 0.1, 0.5, 0.6);
      }

/* chapter 01: THE ATTACK BEGINS */
/* c1a: sentences 1-4 */
      show("#c1a-win", @@t:c1a-chip@@, 0.6, 60);
      pop("#c1a-count", @@t:c1a-chip@@ + 0.3, 0.5, 0.8);
      tl.fromTo("#c1a-users .cu", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out", immediateRender: false }, @@t:c1a-crowd@@);
      stream("#c1a-stream .dot", @@t:c1a-surge@@, 1.2, 0, 300, 0.1);
      bump("#c1a-win", @@t:c1a-surge@@, 1.02);
      chapterCard("c1a", @@t:c1a-num@@, @@t:c1a-chip@@);
/* c1b: sentences 5-8 */
      pop("#c1b-pill", @@t:c1b-pill@@, 0.5, 0.8);
      bump("#c1b-pill", @@t:c1b-pill@@, 1.04);
      show("#c1b-bot1", @@t:c1b-login@@, 0.5, 40);
      show("#c1b-bot2", @@t:c1b-scrape@@, 0.5, 40);
      show("#c1b-bot3", @@t:c1b-api@@, 0.5, 40);
      stream("#c1b-stream .dot", @@t:c1b-api@@, 1.0, 0, 130, 0.08);
      bump("#c1b-win", @@t:c1b-api@@, 1.02);
/* c1c: sentences 9-12 */
      meter("c1c-m-lat", @@t:c1c-lat@@, 85, 1.0, 10);
      meter("c1c-m-db", @@t:c1c-db@@, 95, 0.8, 10);
      meter("c1c-m-to", @@t:c1c-timeout@@, 100, 0.8, 10);
      show("#c1c-503", @@t:c1c-503@@, 0.5, 80);
/* c1d: sentences 13-14 */
      pop("#c1d-q", @@t:c1d-q@@, 0.5, 0.6);
      stream("#c1d-stream .dot", @@t:c1d-q@@, 1.2, 0, 300, 0.1);
      pop("#c1d-aws", @@t:c1d-aws@@, 0.6, 0.7);
/* chapter 02: UNDERSTANDING BOTS AND DDOS */
/* c2a: sentences 15-17 */
      chapterCard("c2a", @@t:c2a-num@@, @@t:c2a-chip@@);
      show("#c2a-good", @@t:c2a-split@@, 0.5, 40);
      show("#c2a-bad", @@t:c2a-split@@ + 0.1, 0.5, 40);
      show("#c2a-scraper, #c2a-stuff, #c2a-hoard", @@t:c2a-split@@ + 0.4, 0.5, 40);
/* c2b: sentences 18-20 */
      show("#c2b-googlebot", @@t:c2b-allow@@, 0.5, 40);
      pop("#c2b-allow", @@t:c2b-allow@@ + 0.2, 0.5, 0.8);
      show("#c2b-site", @@t:c2b-allow@@, 0.6, 40);
      pop("#c2b-mon", @@t:c2b-mon@@, 0.5, 0.8);
      show("#c2b-bad", @@t:c2b-bad@@, 0.5, 40);
      bump("#c2b-bad", @@t:c2b-bad@@ + 0.3, 1.05);
/* c2c: sentences 21-24 */
      show("#c2c-r1", @@t:c2c-r1@@, 0.5, 40);
      show("#c2c-r2", @@t:c2c-r2@@, 0.5, 40);
      pop("#c2c-cs", @@t:c2c-cs@@, 0.5, 0.7);
/* c2d: sentences 25-27 */
      tl.to("#c2d-seats .ltile", { autoAlpha: 0.4, duration: 0.5, stagger: 0.06, immediateRender: false }, @@t:c2d-seats@@);
      stream("#c2d-stream .dot", @@t:c2d-flood@@, 1.2, 0, 900, 0.05);
      bump("#c2d-srv", @@t:c2d-flood@@ + 1.0, 1.04);
      pop("#c2d-acr", @@t:c2d-acr@@, 0.5, 0.7);
/* c2e: sentences 28-30 */
      show("#c2e-bot", @@t:c2e-circ@@, 0.6, 40);
      show("#c2e-ddos", @@t:c2e-circ@@ + 0.2, 0.6, 40);
      pop("#c2e-l1", @@t:c2e-circ@@ + 0.3, 0.5, 0.8);
      pop("#c2e-l2", @@t:c2e-circ@@ + 0.5, 0.5, 0.8);
      tl.to("#c2e-ddos", { scale: 0.9, duration: 0.8, ease: "power2.out", transformOrigin: "50% 50%" }, @@t:c2e-shrink@@);
/* chapter 03: UNDERSTANDING ATTACK LAYERS */
/* c3a: sentences 31-32 */
      chapterCard("c3a", @@t:c3a-num@@, @@t:c3a-chip@@);
      show("#c3a-l0, #c3a-l1, #c3a-l2, #c3a-l3, #c3a-l4, #c3a-l5, #c3a-l6", @@t:c3a-chip@@ + 0.1, 0.5, 30);
      pop("#c3a-net", @@t:c3a-net@@, 0.5, 0.9);
/* c3b: sentences 33-34 */
      pop("#c3b-udp", @@t:c3b-udp@@, 0.5, 0.8);
      pop("#c3b-syn", @@t:c3b-udp@@ + 0.3, 0.5, 0.8);
      stream("#c3b-stream .dot", @@t:c3b-udp@@, 1.0, 0, 640, 0.08);
      meter("c3b-bw", @@t:c3b-drain@@, 5, 1.2, 80);
      meter("c3b-conn", @@t:c3b-drain@@ + 0.3, 5, 1.2, 80);
/* c3c: sentences 35-37 */
      pop("#c3c-l7", @@t:c3c-l7@@, 0.5, 0.7);
      show("#c3c-r1", @@t:c3c-req@@, 0.5, 40);
      show("#c3c-r2", @@t:c3c-req@@ + 0.3, 0.5, 40);
      show("#c3c-r3", @@t:c3c-req@@ + 0.6, 0.5, 40);
      bump("#c3c-srv", @@t:c3c-end@@, 1.05);
/* c3d: sentences 38-41 */
      pop("#c3d-l1", @@t:c3d-hard@@, 0.5, 0.8);
      pop("#c3d-shield", @@t:c3d-tiles@@, 0.6, 0.8);
      pop("#c3d-waf", @@t:c3d-tiles@@ + 0.2, 0.6, 0.8);
      pop("#c3d-l2", @@t:c3d-tiles@@ + 0.4, 0.5, 0.8);
      tl.fromTo("#c3d-gap", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.5, ease: "power2.out", immediateRender: false }, @@t:c3d-tiles@@ + 0.3);
/* chapter 04: AWS SHIELD: PROTECT THE INFRASTRUCTURE */
/* c4a: sentences 42-44 */
      chapterCard("c4a", @@t:c4a-num@@, @@t:c4a-chip@@);
      pop("#c4a-tile", @@t:c4a-tile@@, 0.6, 0.8);
      show("#c4a-std", @@t:c4a-tiers@@, 0.5, 40);
      show("#c4a-adv", @@t:c4a-tiers@@ + 0.2, 0.5, 40);
/* c4b: sentences 45-47 */
      show("#c4b-arc", @@t:c4b-auto@@, 0.8, 40);
      pop("#c4b-cf", @@t:c4b-cf@@, 0.6, 0.8);
      pop("#c4b-r53", @@t:c4b-cf@@ + 0.2, 0.6, 0.8);
      pop("#c4b-layers", @@t:c4b-layers@@, 0.5, 0.8);
      pop("#c4b-fee", @@t:c4b-fee@@, 0.5, 0.8);
/* c4c: sentences 48-50 */
      pop("#c4c-icon", @@t:c4c-head@@, 0.6, 0.8);
      show("#c4c-r1", @@t:c4c-row1@@, 0.5, 40);
      show("#c4c-r2", @@t:c4c-row2@@, 0.5, 40);
      show("#c4c-r3", @@t:c4c-row3@@, 0.5, 40);
      pop("#c4c-paid", @@t:c4c-paid@@, 0.5, 0.8);
/* c4d: sentences 51-53 */
      tl.fromTo("#c4d-gap", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, @@t:c4d-gap@@);
      tl.to("#c4d-waf", { x: -200, duration: 0.8, ease: "power2.out" }, @@t:c4d-waf@@);
/* chapter 05: AWS WAF: INSPECT EVERY REQUEST */
/* c5a: sentences 54-55 */
      chapterCard("c5a", @@t:c5a-num@@, @@t:c5a-chip@@);
      pop("#c5a-waf", @@t:c5a-waf@@, 0.6, 0.8);
      pop("#c5a-gate", @@t:c5a-guard@@, 0.6, 0.9);
      show("#c5a-v0, #c5a-v1, #c5a-v2", @@t:c5a-guard@@ + 0.2, 0.5, 30);
/* c5b: sentences 56-58 */
      pop("#c5b-lbl", @@t:c5b-acl@@, 0.5, 0.8);
      tl.fromTo("#c5b-chips .chip", { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.25, ease: "power3.out", immediateRender: false }, @@t:c5b-chips@@);
/* c5c: sentences 59-61 */
      pop("#c5c-card", @@t:c5c-card@@, 0.5, 0.8);
      show("#c5c-r0, #c5c-i0", @@t:c5c-ip@@, 0.5, 30);
      show("#c5c-r1, #c5c-i1", @@t:c5c-ip@@ + 0.4, 0.5, 30);
      show("#c5c-r2, #c5c-i2", @@t:c5c-ip@@ + 0.8, 0.5, 30);
      tl.to("#c5c-r0", { backgroundColor: "var(--accent)", duration: 0.2, immediateRender: false }, @@t:c5c-order@@);
      tl.to("#c5c-r1", { backgroundColor: "var(--accent)", duration: 0.2, immediateRender: false }, @@t:c5c-order@@ + 0.5);
      tl.to("#c5c-r2", { backgroundColor: "var(--accent)", duration: 0.2, immediateRender: false }, @@t:c5c-order@@ + 1.0);
/* c5d: sentences 62-64 */
      show("#c5d-allow", @@t:c5d-pills@@, 0.5, 30);
      show("#c5d-block", @@t:c5d-pills@@ + 0.2, 0.5, 30);
      show("#c5d-chal", @@t:c5d-pills@@ + 0.4, 0.5, 30);
      pop("#c5d-edge", @@t:c5d-edge@@, 0.6, 0.8);
      pop("#c5d-origin", @@t:c5d-origin@@, 0.6, 0.8);
/* chapter 06: RATE-BASED RULES */
/* c6a: sentences 65-67 */
      chapterCard("c6a", @@t:c6a-num@@, @@t:c6a-chip@@);
      show("#c6a-chart", @@t:c6a-chip@@, 0.8, 40);
      bump("#c6a-chart", @@t:c6a-spike@@, 1.02);
/* c6b: sentences 68-71 */
      pop("#c6b-ep", @@t:c6b-count@@, 0.5, 0.8);
      show("#c6b-counter", @@t:c6b-count@@, 0.6, 40);
      tl.fromTo("#c6b-thr", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, @@t:c6b-thr@@);
      pop("#c6b-act", @@t:c6b-act@@, 0.5, 0.8);
/* c6c: sentences 72-74 */
      pop("#c6c-no", @@t:c6c-no@@, 0.5, 0.8);
      tl.fromTo("#c6c-dots circle", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.03, immediateRender: false }, @@t:c6c-no@@);
      tl.fromTo("#c6c-fill", { scaleY: 0.1, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 1.2, ease: "power2.out", transformOrigin: "50% 100%", immediateRender: false }, @@t:c6c-total@@);
/* c6d: sentences 75-77 */
      show("#c6d-office", @@t:c6d-office@@, 0.6, 40);
      show("#c6d-mobile", @@t:c6d-office@@ + 0.3, 0.6, 40);
      pop("#c6d-tag", @@t:c6d-office@@ + 0.2, 0.5, 0.8);
      tl.to("#c6d-o3, #c6d-m2", { autoAlpha: 0.3, duration: 0.6, ease: "power1.out", immediateRender: false }, @@t:c6d-cut@@);
/* chapter 07: AWS WAF BOT CONTROL */
/* c7a: sentences 78-79 */
      chapterCard("c7a", @@t:c7a-num@@, @@t:c7a-chip@@);
      show("#c7a-q", @@t:c7a-q@@, 0.5, 40);
      pop("#c7a-ltile", @@t:c7a-tile@@, 0.6, 0.8);
/* c7b: sentences 80-82 */
      pop("#c7b-hdr", @@t:c7b-hdr@@, 0.5, 0.8);
      show("#c7b-card", @@t:c7b-hdr@@, 0.5, 40);
      pop("#c7b-icon", @@t:c7b-hdr@@ + 0.2, 0.5, 0.8);
      show("#c7b-common", @@t:c7b-two@@, 0.5, 40);
      show("#c7b-targ", @@t:c7b-two@@ + 0.4, 0.5, 40);
      bump("#c7b-common", @@t:c7b-common@@, 1.04);
/* c7c: sentences 83-84 */
      show("#c7c-k0, #c7c-k1", @@t:c7c-cells@@, 0.5, 30);
      show("#c7c-k2, #c7c-k3", @@t:c7c-cells@@ + 0.4, 0.5, 30);
      tl.to("#c7c-k0", { boxShadow: "0 0 0 8px var(--term-text)", duration: 0.4, immediateRender: false }, @@t:c7c-search@@);
/* c7d: sentences 85-88 */
      pop("#c7d-s1", @@t:c7d-targ@@, 0.5, 0.8);
      show("#c7d-s2, #c7d-s3", @@t:c7d-sig@@, 0.5, 30);
      meter("c7d-meter", @@t:c7d-sig@@, 90, 1.0, 0);
      show("#c7d-captcha", @@t:c7d-chal@@, 0.5, 30);
      show("#c7d-chall", @@t:c7d-chal@@ + 0.2, 0.5, 30);
/* c7e: sentences 89-92 */
      show("#c7e-google", @@t:c7e-allow@@, 0.5, 30);
      pop("#c7e-allow", @@t:c7e-allow@@ + 0.2, 0.5, 0.8);
      show("#c7e-scr", @@t:c7e-limit@@, 0.5, 30);
      pop("#c7e-limit", @@t:c7e-limit@@ + 0.2, 0.5, 0.8);
      pop("#c7e-block", @@t:c7e-limit@@ + 0.4, 0.5, 0.8);
      pop("#c7e-q", @@t:c7e-q@@, 0.5, 0.9);
/* chapter 08: ANTI-DDOS MANAGED RULE GROUP */
/* c8a: sentences 93-96 */
      chapterCard("c8a", @@t:c8a-num@@, @@t:c8a-chip@@);
      stream("#c8a-stream .dot", @@t:c8a-src@@, 1.4, 0, 900, 0.04);
      show("#c8a-end", @@t:c8a-src@@ + 0.6, 0.5);
      show("#c8a-gauge", @@t:c8a-gauge@@ - 0.5, 0.4);
      meter("c8a-gauge", @@t:c8a-gauge@@, 95, 1.2, 10);
      pop("#c8a-flood", @@t:c8a-flood@@, 0.5, 0.8);
/* c8b: sentences 97-99 */
      pop("#c8b-hdr", @@t:c8b-card@@, 0.5, 0.8);
      show("#c8b-card", @@t:c8b-card@@, 0.5, 40);
      pop("#c8b-icon", @@t:c8b-card@@ + 0.2, 0.5, 0.8);
      show("#c8b-t1", @@t:c8b-tag@@, 0.5, 30);
      show("#c8b-t2", @@t:c8b-tag@@ + 0.4, 0.5, 30);
/* c8c: sentences 100-102 */
      show("#c8c-chart", @@t:c8c-base@@, 0.6, 30);
      show("#c8c-soft", @@t:c8c-soft@@, 0.5, 30);
      show("#c8c-hard", @@t:c8c-hard@@, 0.5, 30);
/* c8d: sentences 103-107 */
      pop("#c8d-surge", @@t:c8d-surge@@, 0.5, 0.8);
      pop("#c8d-blk", @@t:c8d-block@@, 0.5, 0.8);
      show("#c8d-u0, #c8d-u1, #c8d-u2, #c8d-u3", @@t:c8d-block@@ + 0.2, 0.5, 30);
      pop("#c8d-date", @@t:c8d-date@@, 0.5, 0.8);
      show("#c8d-cfg", @@t:c8d-cfg@@, 0.5, 30);
/* chapter 09: PROTECTING THE ORIGIN */
/* c9a: sentences 108-110 */
      chapterCard("c9a", @@t:c9a-num@@, @@t:c9a-chip@@);
      pop("#c9a-cf", @@t:c9a-chain@@, 0.5, 0.8);
      pop("#c9a-waf", @@t:c9a-chain@@ + 0.2, 0.5, 0.8);
      pop("#c9a-alb", @@t:c9a-chain@@ + 0.4, 0.5, 0.8);
      show("#c9a-srv1, #c9a-srv2", @@t:c9a-chain@@ + 0.6, 0.5, 30);
      tl.fromTo("#c9a-bypass", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.8, ease: "power2.out", immediateRender: false }, @@t:c9a-bypass@@);
/* c9b: sentences 111-113 */
      show("#c9b-atk", @@t:c9b-atk@@, 0.5, 30);
      show("#c9b-alb", @@t:c9b-direct@@ - 0.4, 0.5, 30);
      tl.fromTo("#c9b-red", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.7, ease: "power2.out", immediateRender: false }, @@t:c9b-direct@@);
      show("#c9b-cf, #c9b-waf", @@t:c9b-path@@, 0.5, 30);
      pop("#c9b-gate", @@t:c9b-gate@@, 0.5, 0.8);
/* c9c: sentences 114-117 */
      show("#c9c-card", @@t:c9c-sg@@, 0.5, 40);
      pop("#c9c-sg", @@t:c9c-sg@@, 0.5, 0.8);
      show("#c9c-rule", @@t:c9c-sg@@ + 0.3, 0.5, 30);
      show("#c9c-hdr", @@t:c9c-hdr@@, 0.5, 30);
      pop("#c9c-rej", @@t:c9c-rej@@, 0.5, 0.6);
/* chapter 10: MONITORING AND VISIBILITY */
/* c10a: sentences 118-120 */
      chapterCard("c10a", @@t:c10a-num@@, @@t:c10a-chip@@);
      show("#c10a-dash", @@t:c10a-dash@@, 0.5, 40);
      pop("#c10a-lbl", @@t:c10a-dash@@, 0.5, 0.8);
      show("#c10a-k0, #c10a-k1", @@t:c10a-cnt@@, 0.5, 30);
      show("#c10a-k2, #c10a-k3", @@t:c10a-cnt@@ + 0.3, 0.5, 30);
/* c10b: sentences 121-122 */
      show("#c10b-bot", @@t:c10b-bot@@, 0.5, 40);
      meter("c10b-m0", @@t:c10b-bot@@, 80, 0.8, 0);
      meter("c10b-m1", @@t:c10b-bot@@ + 0.2, 55, 0.8, 0);
      meter("c10b-m2", @@t:c10b-bot@@ + 0.4, 35, 0.8, 0);
      pop("#c10b-cwi", @@t:c10b-cw@@, 0.5, 0.8);
      show("#c10b-cw", @@t:c10b-cw@@, 0.5, 40);
      tl.fromTo("#c10b-ch1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, immediateRender: false }, @@t:c10b-cw@@ + 0.3);
/* c10c: sentences 123-125 */
      pop("#c10c-sig", @@t:c10c-sig@@, 0.5, 0.8);
      show("#c10c-card", @@t:c10c-sig@@, 0.5, 40);
      show("#c10c-u1, #c10c-u2", @@t:c10c-sig@@ + 0.3, 0.5, 30);
      show("#c10c-u3", @@t:c10c-block@@, 0.5, 30);
      pop("#c10c-cnt", @@t:c10c-count@@, 0.5, 0.8);
/* c10d: sentences 126-128 */
      pop("#c10d-lbl", @@t:c10d-count@@, 0.5, 0.8);
      show("#c10d-m0", @@t:c10d-count@@, 0.5, 30);
      show("#c10d-m1", @@t:c10d-block@@, 0.5, 30);
      show("#c10d-m2", @@t:c10d-block@@ + 0.3, 0.5, 30);
      show("#c10d-m3", @@t:c10d-block@@ + 0.6, 0.5, 30);
      bump("#c10d-m1", @@t:c10d-block@@, 1.05);
/* chapter 11: THE COMPLETE ARCHITECTURE */
/* c11a: sentences 129-131 */
      chapterCard("c11a", @@t:c11a-num@@, @@t:c11a-chip@@);
      pop("#c11a-users", @@t:c11a-chip@@ + 0.1, 0.5, 0.8);
      pop("#c11a-r53", @@t:c11a-r53@@, 0.5, 0.8);
      pop("#c11a-cf", @@t:c11a-cf@@, 0.5, 0.8);
/* c11b: sentences 132-134 */
      pop("#c11b-shield", @@t:c11b-shield@@, 0.5, 0.8);
      pop("#c11b-waf", @@t:c11b-waf@@, 0.5, 0.8);
      pop("#c11b-acl", @@t:c11b-waf@@ + 0.2, 0.5, 0.8);
      pop("#c11b-rate", @@t:c11b-rate@@, 0.5, 0.8);
      pop("#c11b-rl", @@t:c11b-rate@@ + 0.2, 0.5, 0.8);
/* c11c: sentences 135-137 */
      pop("#c11c-bot", @@t:c11c-bot@@, 0.5, 0.8);
      pop("#c11c-ddos", @@t:c11c-ddos@@, 0.5, 0.8);
      pop("#c11c-dl", @@t:c11c-ddos@@ + 0.2, 0.5, 0.8);
      show("#c11c-adv", @@t:c11c-adv@@, 0.5, 30);
      pop("#c11c-sh", @@t:c11c-adv@@ + 0.2, 0.5, 0.8);
      pop("#c11c-opt", @@t:c11c-adv@@ + 0.4, 0.5, 0.8);
/* c11d: sentences 138-141 */
      pop("#c11d-alb", @@t:c11d-alb@@, 0.5, 0.8);
      stream("#c11d-stream .dot", @@t:c11d-stream@@, 1.2, 0, 300, 0.1);
      show("#c11d-s1, #c11d-s2, #c11d-s3, #c11d-s4", @@t:c11d-alb@@ + 0.3, 0.5, 30);
      pop("#c11d-cw", @@t:c11d-dash@@, 0.5, 0.8);
      pop("#c11d-dash", @@t:c11d-dash@@, 0.5, 0.8);
/* c11e: sentences 142-144 */
      show("#c11e-1", @@t:c11e-l1@@, 0.5, 30);
      show("#c11e-2", @@t:c11e-l1@@ + 0.6, 0.5, 30);
      show("#c11e-3", @@t:c11e-l1@@ + 1.2, 0.5, 30);
      show("#c11e-4", @@t:c11e-l1@@ + 1.8, 0.5, 30);
/* c11f: sentences 145-146 */
      pop("#c11f-aws", @@t:c11f-brand@@, 0.6, 0.8);
      show("#c11f-logo", @@t:c11f-brand@@, 0.5, 20);
      pop("#c11f-brand", @@t:c11f-brand@@ + 0.2, 0.5, 0.8);
      gone("#c11f-brand", @@t:c11f-bye@@, 0.2);
      pop("#c11f-bye", @@t:c11f-bye@@, 0.5, 0.8);
      tl.set({}, {}, @@end@@);
