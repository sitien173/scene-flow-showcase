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

      /* c1a: a normal day, sentences 1-4. Ken Burns on the photo runs the whole scene. */
      tl.fromTo("#c1a-photo img", { scale: 1 }, { scale: 1.06, duration: 14.9, ease: "none" }, 0);
      tl.fromTo("#c1a-series", { autoAlpha: 0, x: -80 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }, @@t:c1a-series@@);
      tl.fromTo("#c1a-scrim", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "power1.out" }, @@t:c1a-scrim@@);
      tl.to("#c1a-photo img", { filter: "blur(8px)", duration: 0.6 }, @@t:c1a-scrim@@);
      show("#c1a-win", @@t:c1a-scrim@@, 0.6, 60);
      pop("#c1a-crowd", @@t:c1a-crowd@@, 0.5, 0.9);
      stream("#c1a-stream .dot", @@t:c1a-crowd@@ + 0.3, 1.2, 0, 300, 0.4);
      pop("#c1a-srv", @@t:c1a-server@@, 0.6, 0.8);
      pop("#c1a-db", @@t:c1a-server@@, 0.6, 0.8);
      meter("c1a-m-db", @@t:c1a-server@@ + 0.2, 20, 0.6);
      bump("#c1a-db", @@t:c1a-db@@, 1.06);
      bump("#c1a-buy", @@t:c1a-buy@@, 1.08);
      pop("#c1a-check", @@t:c1a-buy@@ + 0.2, 0.5, 0.6);
      /* c1b: the Flash Sale, sentences 5-8. The card opens on the cut and leaves for the chip on "Flash Sale". */
      chapterCard("c1b", @@t:c1b-num@@, @@t:c1b-chip@@);
      show("#c1b-win", @@t:c1b-chip@@, 0.6, 60);
      pop("#c1b-clock", @@t:c1b-noon@@, 0.6, 0.7);
      pop("#c1b-noon", @@t:c1b-noon@@, 0.5, 0.8);
      pop("#c1b-sale", @@t:c1b-sale@@, 0.5, 0.6);
      pop("#c1b-count-a", @@t:c1b-count@@, 0.45, 0.8);
      tl.fromTo("#c1b-photo", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "power1.out" }, @@t:c1b-photo@@);
      gone("#c1b-win", @@t:c1b-photo@@, 0.4);
      gone("#c1b-count-a", @@t:c1b-zero@@, 0.1);
      pop("#c1b-count-b", @@t:c1b-zero@@, 0.45, 0.8);
      gone("#c1b-photo", @@t:c1b-grid@@, 0.2);
      pop("#c1b-grid", @@t:c1b-grid@@, 0.6, 0.9);
      tl.fromTo("#c1b-ripple", { autoAlpha: 1, scale: 0.2 }, { autoAlpha: 0, scale: 3, duration: 0.8, ease: "power2.out", transformOrigin: "50% 50%" }, @@t:c1b-ripple@@);
      bump("#c1b-grid", @@t:c1b-ripple@@, 1.02);
      /* c1c: the flood, sentences 9-13. The slide seam opens the scene. */
      stream("#c1c-stream .dot", @@t:c1c-req@@, 1.4, 0, 260, 0.08);
      pop("#c1c-chart", @@t:c1c-rise@@, 0.5, 0.9);
      draw("#c1c-ln", @@t:c1c-rise@@ + 0.1, 0.9);
      meter("c1c-m-cpu", @@t:c1c-cpu@@, 100, 0.6, 20);
      tl.to("#c1c-srv", { x: -4, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, @@t:c1c-cpu@@);
      meter("c1c-m-db", @@t:c1c-db@@, 95, 0.6, 20);
      bump("#c1c-db", @@t:c1c-db@@, 1.04);
      pop("#c1c-timeout", @@t:c1c-timeout@@, 0.5, 0.8);
      show("#c1c-win", @@t:c1c-503@@, 0.4, 80);
      /* c1d: the question, sentences 14-15. The fade seam opens the scene. */
      pop("#c1d-srv", @@t:c1d-q@@, 0.6, 0.8);
      pop("#c1d-q", @@t:c1d-q@@, 0.5, 0.6);
      tl.fromTo("#c1d-crowd", { scale: 1 }, { scale: 0.3, transformOrigin: "50% 50%", duration: 1.2, ease: "power2.inOut" }, @@t:c1d-big@@);
      pop("#c1d-ok", @@t:c1d-ok@@, 0.5, 0.6);
      gone("#c1d-srv, #c1d-q, #c1d-ok", @@t:c1d-aws@@, 0.35);
      pop("#c1d-aws", @@t:c1d-aws@@, 0.6, 0.7);
      tl.fromTo("#c1d-rays", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: "power1.out" }, @@t:c1d-aws@@);
      tl.fromTo("#c1d-logos", { autoAlpha: 0, y: 40 }, { autoAlpha: 0.35, y: 0, duration: 0.6, ease: "power3.out" }, @@t:c1d-logos@@);
      /* c2a: 100,000 people, sentences 16-19. A cut opens the chapter card. */
      chapterCard("c2a", @@t:c2a-num@@, @@t:c2a-chip@@);
      pop("#c2a-crowd", @@t:c2a-chip@@, 0.5, 0.9);
      pop("#c2a-pill", @@t:c2a-chip@@, 0.5, 0.8);
      pop("#c2a-neq", @@t:c2a-neq@@, 0.5, 0.6);
      show("#c2a-lane", @@t:c2a-neq@@, 0.5, 40);
      stream("#c2a-dots .dot", @@t:c2a-dots@@, 1.0, 0, 600, 0.11);
      pop("#c2a-eye", @@t:c2a-read@@, 0.5, 0.7);
      pop("#c2a-search", @@t:c2a-search@@, 0.5, 0.7);
      pop("#c2a-img", @@t:c2a-img@@, 0.5, 0.7);
      pop("#c2a-cart", @@t:c2a-order@@, 0.5, 0.7);
      /* c2b: five metrics, sentences 20-23. The slide seam opens the dashboard. */
      show("#c2b-dash .cell", @@t:c2b-frame@@, 0.4, 60);
      pop("#c2b-v1", @@t:c2b-users@@, 0.5, 0.8);
      draw("#c2b-ln", @@t:c2b-rps@@, 1.0);
      meter("c2b-m3", @@t:c2b-resp@@, 60, 0.8);
      meter("c2b-m4", @@t:c2b-err@@, 5, 0.6);
      meter("c2b-m5", @@t:c2b-db@@, 70, 0.8);
      bump("#c2b-dash .cell", @@t:c2b-all@@, 1.02);
      /* c2c: cache and write, sentences 24-25. The slide seam opens the left panel. */
      show("#c2c-left", @@t:c2c-cache@@, 0.6, 40);
      pop("#c2c-pillL", @@t:c2c-cache@@, 0.5, 0.8);
      pop("#c2c-crowdL", @@t:c2c-cache@@, 0.5, 0.9);
      pop("#c2c-cache", @@t:c2c-cache@@, 0.5, 0.8);
      stream("#c2c-stream .dot.read", @@t:c2c-cache@@, 1.0, 0, 300, 0.1);
      meter("c2c-mL", @@t:c2c-cache@@, 15, 0.6);
      show("#c2c-right", @@t:c2c-right@@, 0.6, 40);
      pop("#c2c-pillR", @@t:c2c-right@@, 0.5, 0.8);
      pop("#c2c-crowdR", @@t:c2c-right@@, 0.5, 0.9);
      pop("#c2c-db", @@t:c2c-right@@, 0.6, 0.8);
      stream("#c2c-stream .dot.wr", @@t:c2c-write@@, 1.0, 0, 300, 0.12);
      meter("c2c-mR", @@t:c2c-write@@, 90, 0.9, 15);
      bump("#c2c-pillL, #c2c-pillR", @@t:c2c-both@@, 1.05);
      tl.to("#c2c-pillL, #c2c-pillR", { autoAlpha: 0.5, duration: 0.4, ease: "power1.out" }, @@t:c2c-same@@);
      bump("#c2c-db", @@t:c2c-chiu@@, 1.04);
      /* c3a: one server, sentences 26-28. A cut opens the chapter card; the server pops on "Website". */
      chapterCard("c3a", @@t:c3a-num@@, @@t:c3a-chip@@);
      pop("#c3a-x", @@t:c3a-title@@, 0.4, 0.8);
      gone("#c3a-x", @@t:c3a-chip@@, 0.3);
      pop("#c3a-srv", @@t:c3a-chip@@, 0.6, 0.8);
      bump("#c3a-srv", @@t:c3a-srv@@, 1.04);
      pop("#c3a-users", @@t:c3a-users@@, 0.6, 0.85);
      tl.fromTo("#c3a-d0", { x: 0, y: 0, autoAlpha: 0 }, { x: -330.0, y: 0.0, autoAlpha: 1, duration: 0.9, ease: "none", immediateRender: false }, @@t:c3a-hit@@ + 0.00);
      tl.to("#c3a-d0", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c3a-hit@@ + 0.90);
      tl.fromTo("#c3a-d1", { x: 0, y: 0, autoAlpha: 0 }, { x: -285.8, y: -165.0, autoAlpha: 1, duration: 0.9, ease: "none", immediateRender: false }, @@t:c3a-hit@@ + 0.06);
      tl.to("#c3a-d1", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c3a-hit@@ + 0.96);
      tl.fromTo("#c3a-d2", { x: 0, y: 0, autoAlpha: 0 }, { x: -165.0, y: -285.8, autoAlpha: 1, duration: 0.9, ease: "none", immediateRender: false }, @@t:c3a-hit@@ + 0.12);
      tl.to("#c3a-d2", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c3a-hit@@ + 1.02);
      tl.fromTo("#c3a-d3", { x: 0, y: 0, autoAlpha: 0 }, { x: 0.0, y: -330.0, autoAlpha: 1, duration: 0.9, ease: "none", immediateRender: false }, @@t:c3a-hit@@ + 0.18);
      tl.to("#c3a-d3", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c3a-hit@@ + 1.08);
      tl.fromTo("#c3a-d4", { x: 0, y: 0, autoAlpha: 0 }, { x: 165.0, y: -285.8, autoAlpha: 1, duration: 0.9, ease: "none", immediateRender: false }, @@t:c3a-hit@@ + 0.24);
      tl.to("#c3a-d4", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c3a-hit@@ + 1.14);
      tl.fromTo("#c3a-d5", { x: 0, y: 0, autoAlpha: 0 }, { x: 285.8, y: -165.0, autoAlpha: 1, duration: 0.9, ease: "none", immediateRender: false }, @@t:c3a-hit@@ + 0.30);
      tl.to("#c3a-d5", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c3a-hit@@ + 1.20);
      tl.fromTo("#c3a-d6", { x: 0, y: 0, autoAlpha: 0 }, { x: 330.0, y: -0.0, autoAlpha: 1, duration: 0.9, ease: "none", immediateRender: false }, @@t:c3a-hit@@ + 0.36);
      tl.to("#c3a-d6", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c3a-hit@@ + 1.26);
      tl.fromTo("#c3a-d7", { x: 0, y: 0, autoAlpha: 0 }, { x: 285.8, y: 165.0, autoAlpha: 1, duration: 0.9, ease: "none", immediateRender: false }, @@t:c3a-hit@@ + 0.42);
      tl.to("#c3a-d7", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c3a-hit@@ + 1.32);
      tl.fromTo("#c3a-d8", { x: 0, y: 0, autoAlpha: 0 }, { x: 165.0, y: 285.8, autoAlpha: 1, duration: 0.9, ease: "none", immediateRender: false }, @@t:c3a-hit@@ + 0.48);
      tl.to("#c3a-d8", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c3a-hit@@ + 1.38);
      tl.fromTo("#c3a-d9", { x: 0, y: 0, autoAlpha: 0 }, { x: 0.0, y: 330.0, autoAlpha: 1, duration: 0.9, ease: "none", immediateRender: false }, @@t:c3a-hit@@ + 0.54);
      tl.to("#c3a-d9", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c3a-hit@@ + 1.44);
      tl.fromTo("#c3a-d10", { x: 0, y: 0, autoAlpha: 0 }, { x: -165.0, y: 285.8, autoAlpha: 1, duration: 0.9, ease: "none", immediateRender: false }, @@t:c3a-hit@@ + 0.60);
      tl.to("#c3a-d10", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c3a-hit@@ + 1.50);
      tl.fromTo("#c3a-d11", { x: 0, y: 0, autoAlpha: 0 }, { x: -285.8, y: 165.0, autoAlpha: 1, duration: 0.9, ease: "none", immediateRender: false }, @@t:c3a-hit@@ + 0.66);
      tl.to("#c3a-d11", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c3a-hit@@ + 1.56);
      /* c3b: the work piles up, sentences 29-32. The slide seam opens the scene. */
      pop("#c3b-srv", @@t:c3b-traffic@@, 0.6, 0.8);
      stream("#c3b-stream .dot", @@t:c3b-traffic@@, 1.4, 0, 480, 0.1);
      pop("#c3b-code", @@t:c3b-code@@, 0.5, 0.6);
      pop("#c3b-q", @@t:c3b-q@@, 0.5, 0.6);
      pop("#c3b-read", @@t:c3b-read@@, 0.5, 0.6);
      pop("#c3b-ret", @@t:c3b-ret@@, 0.5, 0.6);
      meter("c3b-m-cpu", @@t:c3b-cpu@@, 95, 0.8, 20);
      meter("c3b-m-ram", @@t:c3b-ram@@, 90, 0.8, 20);
      meter("c3b-m-net", @@t:c3b-ram@@, 80, 1.0, 10);
      meter("c3b-m-conn", @@t:c3b-conn@@, 92, 0.8, 20);
      tl.to("#c3b-srv", { x: -5, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, @@t:c3b-limit@@);
      /* c3c: vertical scaling, sentences 33-37. The slide seam opens the scene. */
      pop("#c3c-arrow", @@t:c3c-up@@, 0.5, 0.8);
      tl.to("#c3c-srv", { scale: 1.3, transformOrigin: "50% 100%", duration: 0.8, ease: "power2.out" }, @@t:c3c-up@@);
      tl.fromTo("#c3c-cpu", { autoAlpha: 0, x: -120 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: "back.out(1.4)" }, @@t:c3c-chips@@);
      tl.fromTo("#c3c-ram", { autoAlpha: 0, x: -120 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: "back.out(1.4)" }, @@t:c3c-chips@@ + 0.2);
      show("#c3c-name", @@t:c3c-name@@, 0.5, 0);
      tl.fromTo("#c3c-ceil", { autoAlpha: 0, y: -120 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, @@t:c3c-ceil@@);
      pop("#c3c-x", @@t:c3c-down@@, 0.4, 0.8);
      tl.to("#c3c-srv", { autoAlpha: 0.35, filter: "grayscale(1)", duration: 0.3, ease: "power1.out" }, @@t:c3c-down@@);
      tl.to("#c3c-win", { filter: "grayscale(1)", duration: 0.5 }, @@t:c3c-all@@);
      /* c3d: horizontal scaling, sentences 38-40. The fade seam opens the scene on the photo. */
      tl.to("#c3d-photo img", { x: -60, duration: 14.5, ease: "none" }, @@t:c3d-photo@@);
      pop("#c3d-pill", @@t:c3d-pill@@, 0.5, 0.8);
      tl.to("#c3d-photo img", { filter: "blur(8px)", duration: 0.6 }, @@t:c3d-blur@@);
      tl.fromTo("#c3d-scrim", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "power1.out" }, @@t:c3d-blur@@);
      pop("#c3d-big", @@t:c3d-blur@@, 0.6, 0.8);
      gone("#c3d-big", @@t:c3d-split@@, 0.3);
      pop("#c3d-s1, #c3d-s2, #c3d-s3, #c3d-s4", @@t:c3d-split@@, 0.5, 0.8);
      stream("#c3d-stream .dot", @@t:c3d-stream@@, 1.2, 0, 1000, 0.1);
      tl.fromTo("#c3d-zone", { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.6, ease: "power2.out" }, @@t:c3d-aws@@);
      pop("#c3d-logo", @@t:c3d-aws@@, 0.5, 0.7);
/* c4a: chapter opener on sentence 41 ("Trước khi"); the card leaves on "ví dụ" (42) and the browser mock with its resources follows. */
pop("#c4a-num", @@t:c4a-s41@@, 0.5, 0.8);
pop("#c4a-tile", @@t:c4a-s41@@ + 0.05, 0.6, 0.6);
pop("#c4a-burst", @@t:c4a-s41@@ + 0.2, 0.6, 0.4);
show("#c4a-title", @@t:c4a-title@@, 0.5);
pop("#c4a-mascot", @@t:c4a-title@@ + 0.15, 0.6, 0.6);
gone("#c4a-num, #c4a-tile, #c4a-title, #c4a-burst, #c4a-mascot", @@t:c4a-chip@@, 0.35);
pop("#c4a-chip", @@t:c4a-chip@@ + 0.1, 0.5, 0.6);
pop("#c4a-win", @@t:c4a-chip@@, 0.6, 0.85);
pop("#c4a-s1, #c4a-s2, #c4a-s3, #c4a-s4", @@t:c4a-chip@@ + 0.2, 0.5, 0.8);
stream("#c4a-stream .dot", @@t:c4a-chip@@ + 0.2, 0.8, 0, 50, 0.08);
pop("#c4a-img", @@t:c4a-img@@, 0.5, 0.6);
pop("#c4a-logo", @@t:c4a-logo@@, 0.5, 0.6);
pop("#c4a-css", @@t:c4a-css@@, 0.5, 0.6);
pop("#c4a-js", @@t:c4a-js@@, 0.5, 0.6);
pop("#c4a-more", @@t:c4a-more@@, 0.5, 0.6);
pop("#c4a-b1, #c4a-b2, #c4a-b3, #c4a-b4", @@t:c4a-copy@@, 0.4, 0.5);
pop("#c4a-u1", @@t:c4a-users@@, 0.4, 0.6);
bump("#c4a-img", @@t:c4a-users@@ + 0.35, 1.04);
pop("#c4a-u2", @@t:c4a-users@@ + 0.35, 0.4, 0.6);
bump("#c4a-img", @@t:c4a-users@@ + 0.8, 1.04);
pop("#c4a-u3", @@t:c4a-users@@ + 0.7, 0.4, 0.6);
bump("#c4a-img", @@t:c4a-users@@ + 1.25, 1.04);

/* c4b: the CDN. The CloudFront tile pops on "CloudFront" (45), shrinks to the top left on "Content" (46), then the edge map draws. */
pop("#c4b-cf", @@t:c4b-cf@@, 0.6, 0.6);
tl.to("#c4b-cf", { x: -745, y: -265, scale: 0.34375, duration: 0.8, ease: "power3.inOut", transformOrigin: "50% 50%" }, @@t:c4b-cdn@@);
gone("#c4b-cfname", @@t:c4b-cdn@@, 0.2);
sweep("#c4b-grid", @@t:c4b-cdn@@, 0.9);
pop("#c4b-cdnchip", @@t:c4b-cdn@@ + 0.6, 0.5, 0.6);
pop("#c4b-p0", @@t:c4b-copies@@ + 0.00, 0.4, 0.4);
pop("#c4b-p1", @@t:c4b-copies@@ + 0.07, 0.4, 0.4);
pop("#c4b-p2", @@t:c4b-copies@@ + 0.14, 0.4, 0.4);
pop("#c4b-p3", @@t:c4b-copies@@ + 0.21, 0.4, 0.4);
pop("#c4b-p4", @@t:c4b-copies@@ + 0.28, 0.4, 0.4);
pop("#c4b-p5", @@t:c4b-copies@@ + 0.35, 0.4, 0.4);
pop("#c4b-p6", @@t:c4b-copies@@ + 0.42, 0.4, 0.4);
pop("#c4b-p7", @@t:c4b-copies@@ + 0.49, 0.4, 0.4);
bump("#c4b-p0, #c4b-p1, #c4b-p2, #c4b-p3, #c4b-p4, #c4b-p5, #c4b-p6, #c4b-p7", @@t:c4b-global@@, 1.15);
pop("#c4b-user", @@t:c4b-user@@, 0.5, 0.6);
pop("#c4b-origin", @@t:c4b-origin@@, 0.5, 0.6);
pop("#c4b-x", @@t:c4b-origin@@ + 0.9, 0.4, 0.8);
draw("#c4b-near", @@t:c4b-near@@, 0.45);
tl.fromTo("#c4b-run", { x: 0, y: 0, autoAlpha: 0 }, { x: 8, y: -79, autoAlpha: 1, duration: 0.4, ease: "power2.in" }, @@t:c4b-near@@ + 0.1);
tl.to("#c4b-run", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4b-near@@ + 0.5);
draw("#c4b-far", @@t:c4b-origin@@, 0.9);
gone("#c4b-far", @@t:c4b-origin@@ + 1.4, 0.6);

/* c4c: S3 holds the static files, CloudFront serves them from its cache, the backend gets fewer requests. The personal order passes the cache and reaches the backend. */
pop("#c4c-s3", @@t:c4c-open@@, 0.6, 0.7);
pop("#c4c-file", @@t:c4c-store@@ + 0.05, 0.4, 0.8);
tl.to("#c4c-file", { y: 90, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, @@t:c4c-store@@ + 0.3);
show("#c4c-s3name", @@t:c4c-s3@@, 0.4);
pop("#c4c-cf", @@t:c4c-dist@@, 0.6, 0.7);
pop("#c4c-users", @@t:c4c-dist@@ + 0.1, 0.6, 0.7);
pop("#c4c-shelf", @@t:c4c-dist@@ + 0.3, 0.6, 0.9);
pop("#c4c-m0, #c4c-m1, #c4c-m2", @@t:c4c-dist@@ + 0.5, 0.4, 0.8);
draw("#c4c-arA", @@t:c4c-dist@@ + 0.4, 0.6);
pop("#c4c-hA", @@t:c4c-dist@@ + 1, 0.3, 0.6);
stream(".c4c-ra", @@t:c4c-dist@@ + 1, 0.8, 0, 420, 0.25);
draw("#c4c-arB", @@t:c4c-dist@@ + 1.3, 0.6);
pop("#c4c-hB", @@t:c4c-dist@@ + 1.9, 0.3, 0.6);
stream(".c4c-rb", @@t:c4c-dist@@ + 1.9, 0.8, 0, 480, 0.25);
pop("#c4c-b1, #c4c-b2, #c4c-b3, #c4c-b4", @@t:c4c-backend@@, 0.5, 0.8);
show("#c4c-m-rps", @@t:c4c-backend@@, 0.4, 0);
meter("c4c-m-rps", @@t:c4c-backend@@, 30, 0.8, 90);
show("#c4c-m-ms", @@t:c4c-lat@@, 0.4, 0);
meter("c4c-m-ms", @@t:c4c-lat@@, 35, 0.8, 100);
tl.fromTo("#c4c-bk0", { y: 0, autoAlpha: 0 }, { y: 260, autoAlpha: 1, duration: 1.0, ease: "none" }, @@t:c4c-backend@@ + 0.00);
tl.to("#c4c-bk0", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.00);
tl.fromTo("#c4c-bk1", { y: 0, autoAlpha: 0 }, { y: 260, autoAlpha: 1, duration: 1.0, ease: "none" }, @@t:c4c-backend@@ + 0.02);
tl.to("#c4c-bk1", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.02);
tl.fromTo("#c4c-bk2", { y: 0, autoAlpha: 0 }, { y: 260, autoAlpha: 1, duration: 1.0, ease: "none" }, @@t:c4c-backend@@ + 0.04);
tl.to("#c4c-bk2", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.04);
tl.fromTo("#c4c-bk3", { y: 0, autoAlpha: 0 }, { y: 260, autoAlpha: 1, duration: 1.0, ease: "none" }, @@t:c4c-backend@@ + 0.06);
tl.to("#c4c-bk3", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.06);
tl.fromTo("#c4c-bk4", { y: 0, autoAlpha: 0 }, { y: 260, autoAlpha: 1, duration: 1.0, ease: "none" }, @@t:c4c-backend@@ + 0.08);
tl.to("#c4c-bk4", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.08);
tl.fromTo("#c4c-bk5", { y: 0, autoAlpha: 0 }, { y: 260, autoAlpha: 1, duration: 1.0, ease: "none" }, @@t:c4c-backend@@ + 0.10);
tl.to("#c4c-bk5", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.10);
tl.fromTo("#c4c-bk6", { y: 0, autoAlpha: 0 }, { y: 260, autoAlpha: 1, duration: 1.0, ease: "none" }, @@t:c4c-backend@@ + 0.12);
tl.to("#c4c-bk6", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.12);
tl.fromTo("#c4c-bk7", { y: 0, autoAlpha: 0 }, { y: 260, autoAlpha: 1, duration: 1.0, ease: "none" }, @@t:c4c-backend@@ + 0.14);
tl.to("#c4c-bk7", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.14);
tl.fromTo("#c4c-bk8", { y: 0, autoAlpha: 0 }, { y: 260, autoAlpha: 1, duration: 1.0, ease: "none" }, @@t:c4c-backend@@ + 0.16);
tl.to("#c4c-bk8", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.16);
tl.fromTo("#c4c-bk9", { y: 0, autoAlpha: 0 }, { y: 260, autoAlpha: 1, duration: 1.0, ease: "none" }, @@t:c4c-backend@@ + 0.18);
tl.to("#c4c-bk9", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.18);
tl.fromTo("#c4c-bk10", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.20);
tl.to("#c4c-bk10", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.70);
tl.fromTo("#c4c-bk11", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.22);
tl.to("#c4c-bk11", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.72);
tl.fromTo("#c4c-bk12", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.24);
tl.to("#c4c-bk12", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.74);
tl.fromTo("#c4c-bk13", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.26);
tl.to("#c4c-bk13", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.76);
tl.fromTo("#c4c-bk14", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.28);
tl.to("#c4c-bk14", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.78);
tl.fromTo("#c4c-bk15", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.30);
tl.to("#c4c-bk15", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.80);
tl.fromTo("#c4c-bk16", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.32);
tl.to("#c4c-bk16", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.82);
tl.fromTo("#c4c-bk17", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.34);
tl.to("#c4c-bk17", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.84);
tl.fromTo("#c4c-bk18", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.36);
tl.to("#c4c-bk18", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.86);
tl.fromTo("#c4c-bk19", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.38);
tl.to("#c4c-bk19", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.88);
tl.fromTo("#c4c-bk20", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.40);
tl.to("#c4c-bk20", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.90);
tl.fromTo("#c4c-bk21", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.42);
tl.to("#c4c-bk21", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.92);
tl.fromTo("#c4c-bk22", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.44);
tl.to("#c4c-bk22", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.94);
tl.fromTo("#c4c-bk23", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.46);
tl.to("#c4c-bk23", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.96);
tl.fromTo("#c4c-bk24", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.48);
tl.to("#c4c-bk24", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 0.98);
tl.fromTo("#c4c-bk25", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.50);
tl.to("#c4c-bk25", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.00);
tl.fromTo("#c4c-bk26", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.52);
tl.to("#c4c-bk26", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.02);
tl.fromTo("#c4c-bk27", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.54);
tl.to("#c4c-bk27", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.04);
tl.fromTo("#c4c-bk28", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.56);
tl.to("#c4c-bk28", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.06);
tl.fromTo("#c4c-bk29", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.58);
tl.to("#c4c-bk29", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.08);
tl.fromTo("#c4c-bk30", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.60);
tl.to("#c4c-bk30", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.10);
tl.fromTo("#c4c-bk31", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.62);
tl.to("#c4c-bk31", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.12);
tl.fromTo("#c4c-bk32", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.64);
tl.to("#c4c-bk32", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.14);
tl.fromTo("#c4c-bk33", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.66);
tl.to("#c4c-bk33", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.16);
tl.fromTo("#c4c-bk34", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.68);
tl.to("#c4c-bk34", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.18);
tl.fromTo("#c4c-bk35", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.70);
tl.to("#c4c-bk35", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.20);
tl.fromTo("#c4c-bk36", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.72);
tl.to("#c4c-bk36", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.22);
tl.fromTo("#c4c-bk37", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.74);
tl.to("#c4c-bk37", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.24);
tl.fromTo("#c4c-bk38", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.76);
tl.to("#c4c-bk38", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.26);
tl.fromTo("#c4c-bk39", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.78);
tl.to("#c4c-bk39", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.28);
tl.fromTo("#c4c-bk40", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.80);
tl.to("#c4c-bk40", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.30);
tl.fromTo("#c4c-bk41", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.82);
tl.to("#c4c-bk41", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.32);
tl.fromTo("#c4c-bk42", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.84);
tl.to("#c4c-bk42", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.34);
tl.fromTo("#c4c-bk43", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.86);
tl.to("#c4c-bk43", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.36);
tl.fromTo("#c4c-bk44", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.88);
tl.to("#c4c-bk44", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.38);
tl.fromTo("#c4c-bk45", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.90);
tl.to("#c4c-bk45", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.40);
tl.fromTo("#c4c-bk46", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.92);
tl.to("#c4c-bk46", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.42);
tl.fromTo("#c4c-bk47", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.94);
tl.to("#c4c-bk47", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.44);
tl.fromTo("#c4c-bk48", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.96);
tl.to("#c4c-bk48", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.46);
tl.fromTo("#c4c-bk49", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 0.98);
tl.to("#c4c-bk49", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.48);
tl.fromTo("#c4c-bk50", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 1.00);
tl.to("#c4c-bk50", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.50);
tl.fromTo("#c4c-bk51", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 1.02);
tl.to("#c4c-bk51", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.52);
tl.fromTo("#c4c-bk52", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 1.04);
tl.to("#c4c-bk52", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.54);
tl.fromTo("#c4c-bk53", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 1.06);
tl.to("#c4c-bk53", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.56);
tl.fromTo("#c4c-bk54", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 1.08);
tl.to("#c4c-bk54", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.58);
tl.fromTo("#c4c-bk55", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 1.10);
tl.to("#c4c-bk55", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.60);
tl.fromTo("#c4c-bk56", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 1.12);
tl.to("#c4c-bk56", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.62);
tl.fromTo("#c4c-bk57", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 1.14);
tl.to("#c4c-bk57", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.64);
tl.fromTo("#c4c-bk58", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 1.16);
tl.to("#c4c-bk58", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.66);
tl.fromTo("#c4c-bk59", { y: 0, autoAlpha: 0 }, { y: 110, autoAlpha: 1, duration: 0.5, ease: "none" }, @@t:c4c-backend@@ + 1.18);
tl.to("#c4c-bk59", { autoAlpha: 0, duration: 0.01, immediateRender: false }, @@t:c4c-backend@@ + 1.68);
pop("#c4c-lock", @@t:c4c-tu@@, 0.5, 0.7);
tl.to("#c4c-lock", { x: -440, duration: 0.6, ease: "power1.inOut" }, @@t:c4c-personal@@);
tl.to("#c4c-lock", { y: 300, duration: 0.7, ease: "power1.in" }, @@t:c4c-personal@@ + 0.6);
draw("#c4c-strike", @@t:c4c-personal@@ + 0.5, 0.35);
pop("#c4c-receipt", @@t:c4c-order@@, 0.5, 0.7);
/* c5a: opener on sentence 53; the ELB tile, then the ALB, replace the request stream; servers appear on "nhiều server". */
pop("#c5a-num", @@t:c5a-s53@@, 0.5, 0.8);
pop("#c5a-tile", @@t:c5a-s53@@ + 0.05, 0.6, 0.6);
pop("#c5a-burst", @@t:c5a-s53@@ + 0.2, 0.6, 0.4);
show("#c5a-title", @@t:c5a-s53@@, 0.5, 0);
pop("#c5a-mascot", @@t:c5a-s53@@ + 0.15, 0.6, 0.6);
gone("#c5a-num, #c5a-tile, #c5a-title, #c5a-burst, #c5a-mascot", @@t:c5a-chip@@, 0.35);
pop("#c5a-chip", @@t:c5a-chip@@ + 0.1, 0.5, 0.6);
stream("#c5a-stream .dot", @@t:c5a-chip@@ + 0.2, 0.8, 0, 460, 0.08);
pop("#c5a-s1, #c5a-s2, #c5a-s3, #c5a-s4", @@t:c5a-srv@@, 0.5, 0.8);
pop("#c5a-lb", @@t:c5a-elb@@, 0.6, 0.7);
pop("#c5a-elb", @@t:c5a-elb@@ + 0.15, 0.5, 0.6);
tl.fromTo("#c5a-name", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, @@t:c5a-elb@@ + 0.25);
tl.to("#c5a-name, #c5a-elb", { autoAlpha: 0, duration: 0.3 }, @@t:c5a-alb@@);
pop("#c5a-alb", @@t:c5a-alb@@ + 0.1, 0.5, 0.6);
pop("#c5a-pill", @@t:c5a-pill@@, 0.4, 0.6);

/* c5b: the ALB in front of two availability zones; six servers; requests fan out on "Thay". */
pop("#c5b-alb", @@t:c5b-alb@@, 0.6, 0.7);
draw("#c5b-ch0p, #c5b-ch1p, #c5b-ch2p", @@t:c5b-route@@, 0.4, 0.1);
tl.fromTo("#c5b-ch0, #c5b-ch1, #c5b-ch2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, @@t:c5b-route@@);
tl.fromTo("#c5b-d0", { x: 0, y: 0, autoAlpha: 0 }, { x: 518, y: -172, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5b-route@@ + 0.10);
tl.to("#c5b-d0", { autoAlpha: 0, duration: 0.2 }, @@t:c5b-route@@ + 1.00);
tl.fromTo("#c5b-d1", { x: 0, y: 0, autoAlpha: 0 }, { x: 818, y: -172, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5b-route@@ + 0.25);
tl.to("#c5b-d1", { autoAlpha: 0, duration: 0.2 }, @@t:c5b-route@@ + 1.15);
tl.fromTo("#c5b-d2", { x: 0, y: 0, autoAlpha: 0 }, { x: 1118, y: -172, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5b-route@@ + 0.40);
tl.to("#c5b-d2", { autoAlpha: 0, duration: 0.2 }, @@t:c5b-route@@ + 1.30);
tl.fromTo("#c5b-d3", { x: 0, y: 0, autoAlpha: 0 }, { x: 518, y: 248, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5b-route@@ + 0.55);
tl.to("#c5b-d3", { autoAlpha: 0, duration: 0.2 }, @@t:c5b-route@@ + 1.45);
tl.fromTo("#c5b-d4", { x: 0, y: 0, autoAlpha: 0 }, { x: 818, y: 248, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5b-route@@ + 0.70);
tl.to("#c5b-d4", { autoAlpha: 0, duration: 0.2 }, @@t:c5b-route@@ + 1.60);
tl.fromTo("#c5b-d5", { x: 0, y: 0, autoAlpha: 0 }, { x: 1118, y: 248, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5b-route@@ + 0.85);
tl.to("#c5b-d5", { autoAlpha: 0, duration: 0.2 }, @@t:c5b-route@@ + 1.75);
pop("#c5b-s1, #c5b-s2, #c5b-s3, #c5b-s4, #c5b-s5, #c5b-s6", @@t:c5b-srv@@, 0.5, 0.8);
pop("#c5b-ok1, #c5b-ok2, #c5b-ok3, #c5b-ok4, #c5b-ok5, #c5b-ok6", @@t:c5b-ok@@, 0.4, 0.5);
pop("#c5b-az1, #c5b-az2", @@t:c5b-az@@, 0.6, 0.9);
show("#c5b-lab1, #c5b-lab2", @@t:c5b-az@@, 0.4, 0);
pop("#c5b-ec2", @@t:c5b-ec2@@, 0.5, 0.6);

/* c5c: health check. Server 2 fails on "không còn khỏe mạnh"; requests go to the five healthy servers on "Nhờ vậy". */
pop("#c5c-heart", @@t:c5c-hc@@, 0.5, 0.7);
draw("#c5c-l0, #c5c-l1, #c5c-l2, #c5c-l3, #c5c-l4, #c5c-l5", @@t:c5c-hc@@ + 0.2, 0.6, 0.08);
pop("#c5c-u1, #c5c-u2, #c5c-u3, #c5c-u4", @@t:c5c-users@@, 0.4, 0.7);
pop("#c5c-uok1, #c5c-uok2, #c5c-uok3, #c5c-uok4", @@t:c5c-users@@ + 0.3, 0.4, 0.5);
bump("#c5c-heart", @@t:c5c-check@@, 1.12);
tl.to("#c5c-s2", { autoAlpha: 0.35, filter: "grayscale(1)", duration: 0.4 }, @@t:c5c-down@@);
pop("#c5c-x2", @@t:c5c-down@@, 0.4, 0.8);
tl.to("#c5c-ok2, #c5c-l1", { autoAlpha: 0, duration: 0.3 }, @@t:c5c-down@@);
tl.fromTo("#c5c-r0", { x: 0, y: 0, autoAlpha: 0 }, { x: 518, y: -172, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5c-reroute@@ + 0.00);
tl.to("#c5c-r0", { autoAlpha: 0, duration: 0.2 }, @@t:c5c-reroute@@ + 1.00);
tl.fromTo("#c5c-r1", { x: 0, y: 0, autoAlpha: 0 }, { x: 1118, y: -172, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5c-reroute@@ + 0.12);
tl.to("#c5c-r1", { autoAlpha: 0, duration: 0.2 }, @@t:c5c-reroute@@ + 1.12);
tl.fromTo("#c5c-r2", { x: 0, y: 0, autoAlpha: 0 }, { x: 518, y: 248, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5c-reroute@@ + 0.24);
tl.to("#c5c-r2", { autoAlpha: 0, duration: 0.2 }, @@t:c5c-reroute@@ + 1.24);
tl.fromTo("#c5c-r3", { x: 0, y: 0, autoAlpha: 0 }, { x: 818, y: 248, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5c-reroute@@ + 0.36);
tl.to("#c5c-r3", { autoAlpha: 0, duration: 0.2 }, @@t:c5c-reroute@@ + 1.36);
tl.fromTo("#c5c-r4", { x: 0, y: 0, autoAlpha: 0 }, { x: 1118, y: 248, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5c-reroute@@ + 0.48);
tl.to("#c5c-r4", { autoAlpha: 0, duration: 0.2 }, @@t:c5c-reroute@@ + 1.48);

/* c5d: the five columns take the accent one by one; traffic rises past the line and the chart dims the columns. */
pop("#c5d-col1, #c5d-col2, #c5d-col3, #c5d-col4, #c5d-col5", @@t:c5d-s64@@, 0.5, 0.7);
show("#c5d-ec2s", @@t:c5d-s64@@, 0.4, 0);
pop("#c5d-o1", @@t:c5d-s64@@ + 0.65, 0.4, 0.6);
pop("#c5d-o2", @@t:c5d-s64@@ + 0.80, 0.4, 0.6);
pop("#c5d-o3", @@t:c5d-s64@@ + 0.95, 0.4, 0.6);
pop("#c5d-o4", @@t:c5d-s64@@ + 1.10, 0.4, 0.6);
pop("#c5d-o5", @@t:c5d-s64@@ + 1.25, 0.4, 0.6);
show("#c5d-avail", @@t:c5d-avail@@, 0.4, 0);
meter("c5d-avail", @@t:c5d-avail@@ + 0.3, 100, 1.0, 0);
tl.to("#c5d-hist", { autoAlpha: 0.3, duration: 0.6, ease: "power1.out" }, @@t:c5d-chart@@);
gone("#c5d-avail", @@t:c5d-chart@@, 0.4);
show("#c5d-chart", @@t:c5d-chart@@ + 0.1, 0.5, 0);
draw("#c5d-traffic", @@t:c5d-chart@@ + 0.2, 1.4);
pop("#c5d-head", @@t:c5d-chart@@ + 1.5, 0.4, 0.6);
pop("#c5d-q", @@t:c5d-q@@, 0.5, 0.8);
pop("#c5d-elb", @@t:c5d-elb@@, 0.5, 0.7);
      /* c6a: chapter card on "Đây", the logo on "Auto Scaling". The group grows to three servers and the alarm fires. */
      pop("#c6a-num", @@t:c6a-num@@, 0.5);
      pop("#c6a-burst", @@t:c6a-num@@ + 0.2, 0.6, 0.4);
      pop("#c6a-tile", @@t:c6a-logo@@, 0.6, 0.6);
      show("#c6a-title", @@t:c6a-logo@@ + 0.1, 0.5);
      pop("#c6a-mascot", @@t:c6a-logo@@ + 0.2, 0.6, 0.6);
      gone("#c6a-num, #c6a-tile, #c6a-title, #c6a-burst, #c6a-mascot", @@t:c6a-chip@@, 0.35);
      pop("#c6a-chip", @@t:c6a-chip@@ + 0.1, 0.5, 0.7);
      pop("#c6a-plus", @@t:c6a-chip@@ + 0.2, 0.4, 0.7);
      pop("#c6a-x", @@t:c6a-x@@, 0.4, 0.6);
      show("#c6a-asg", @@t:c6a-asg@@, 0.6, 0);
      show("#c6a-asglogo", @@t:c6a-asg@@ + 0.1, 0.4);
      show("#c6a-asgname", @@t:c6a-asg@@ + 0.15, 0.4);
      pop("#c6a-s0", @@t:c6a-srv@@, 0.6, 0.8);
      pop("#c6a-s1", @@t:c6a-srv@@ + 0.12, 0.6, 0.8);
      pop("#c6a-s2", @@t:c6a-srv@@ + 0.24, 0.6, 0.8);
      pop("#c6a-count", @@t:c6a-srv@@ + 0.1, 0.5, 0.7);
      pop("#c6a-m0", @@t:c6a-srv@@, 0.5, 0.8);
      pop("#c6a-m1", @@t:c6a-srv@@ + 0.12, 0.5, 0.8);
      pop("#c6a-m2", @@t:c6a-srv@@ + 0.24, 0.5, 0.8);
      meter("c6a-m0", @@t:c6a-srv@@, 60, 0.6, 20);
      meter("c6a-m1", @@t:c6a-srv@@ + 0.12, 60, 0.6, 20);
      meter("c6a-m2", @@t:c6a-srv@@ + 0.24, 60, 0.6, 20);
      tl.set("#c6a-stream .dot", { autoAlpha: 0 }, 0);
      stream("#c6a-stream .dot", @@t:c6a-flash@@, 0.9, 0, 280, 0.09);
      meter("c6a-m0", @@t:c6a-vuot@@, 100, 0.4, 60);
      meter("c6a-m1", @@t:c6a-vuot@@, 100, 0.4, 60);
      meter("c6a-m2", @@t:c6a-vuot@@, 100, 0.4, 60);
      tl.set("#c6a-m0, #c6a-m1, #c6a-m2", { className: "meter over" }, @@t:c6a-vuot@@);
      pop("#c6a-alarm", @@t:c6a-vuot@@, 0.5, 0.7);

      /* c6b: two servers join the group, the group slides left and the CloudWatch dashboard opens. */
      pop("#c6b-g0", @@t:c6b-tu@@, 0.6, 0.8);
      pop("#c6b-g1", @@t:c6b-tu@@ + 0.12, 0.6, 0.8);
      gone("#c6b-n3", @@t:c6b-tu@@, 0.2);
      pop("#c6b-n5", @@t:c6b-tu@@ + 0.15, 0.4, 0.7);
      pop("#c6b-q", @@t:c6b-biet@@, 0.4, 0.7);
      tl.fromTo("#c6b-grp", { x: 0, scale: 1, transformOrigin: "0% 0%" }, { x: -320, scale: 0.6, transformOrigin: "0% 0%", duration: 0.6, ease: "power3.inOut" }, @@t:c6b-metrics@@);
      gone("#c6b-q", @@t:c6b-metrics@@, 0.2);
      show("#c6b-dash", @@t:c6b-metrics@@ + 0.1, 0.5);
      pop("#c6b-cwlogo", @@t:c6b-cw@@, 0.5, 0.7);
      show("#c6b-cwname", @@t:c6b-cw@@ + 0.1, 0.4);
      draw("#c6b-l1", @@t:c6b-cpu@@, 0.9);
      show("#c6b-t1", @@t:c6b-cpu@@ + 0.6, 0.4, 0);
      draw("#c6b-l2", @@t:c6b-req@@, 0.9);
      show("#c6b-t2", @@t:c6b-req@@ + 0.6, 0.4, 0);
      pop("#c6b-pill", @@t:c6b-tt@@, 0.5, 0.8);
      bump("#c6b-pill", @@t:c6b-duytri@@, 1.05);

      /* c6c: traffic rises, the group grows from 3 to 8 servers, then shrinks back to 3. */
      draw("#c6c-ln", @@t:c6c-tang@@, 1.2);
      pop("#c6c-s3", @@t:c6c-open@@, 0.5, 0.8);
      pop("#c6c-s4", @@t:c6c-tang@@ + 0.12, 0.5, 0.8);
      pop("#c6c-s5", @@t:c6c-tang@@ + 0.24, 0.5, 0.8);
      pop("#c6c-s6", @@t:c6c-tang@@ + 0.36, 0.5, 0.8);
      pop("#c6c-s7", @@t:c6c-tang@@ + 0.48, 0.5, 0.8);
      bump("#c6c-s0", @@t:c6c-mo@@, 1.04);
      gone("#c6c-s7", @@t:c6c-giam@@ + 0.00, 0.3);
      gone("#c6c-s6", @@t:c6c-giam@@ + 0.10, 0.3);
      gone("#c6c-s5", @@t:c6c-giam@@ + 0.20, 0.3);
      gone("#c6c-s4", @@t:c6c-giam@@ + 0.30, 0.3);
      gone("#c6c-s3", @@t:c6c-giam@@ + 0.40, 0.3);
      pop("#c6c-coin", @@t:c6c-lang@@, 0.5, 0.7);

      /* c6d: a new server starts late, its boot steps fill, then Scheduled Scaling builds capacity before the peak. */
      draw("#c6d-traffic", @@t:c6d-open@@, 1.0);
      draw("#c6d-cap-b", @@t:c6d-ngay@@ + 0.2, 1.0);
      pop("#c6d-ghost", @@t:c6d-open@@, 0.6, 0.8);
tl.to("#c6d-ghost", { autoAlpha: 0.35, filter: "grayscale(1)", duration: 0.4 }, @@t:c6d-ngay@@ + 0.6);
      pop("#c6d-hg", @@t:c6d-ngay@@ + 0.1, 0.5, 0.7);
      sweep("#c6d-f1", @@t:c6d-khoichay@@, 0.5);
      sweep("#c6d-f2", @@t:c6d-khoidong@@, 0.6);
      sweep("#c6d-f3", @@t:c6d-san@@, 0.5);
      show("#c6d-lag", @@t:c6d-san@@, 0.4, 0);
      gone("#c6d-ghost, #c6d-hg", @@t:c6d-biet@@, 0.3);
      pop("#c6d-cal", @@t:c6d-biet@@ + 0.2, 0.5, 0.7);
      gone("#c6d-lag", @@t:c6d-sched@@, 0.3);
      draw("#c6d-cap-a", @@t:c6d-sched@@, 0.9);
      pop("#c6d-sched", @@t:c6d-sched@@, 0.5, 0.8);
      pop("#c6d-logo", @@t:c6d-sched@@ + 0.1, 0.5, 0.7);
      pop("#c6d-gauge", @@t:c6d-test@@, 0.5, 0.7);
      pop("#c6d-file", @@t:c6d-chinh@@, 0.5, 0.7);
      /* c7a: chapter card on "Đến đây", six servers and the load balancer, then the group slides up and the database appears. */
      pop("#c7a-num", @@t:c7a-num@@, 0.5);
      pop("#c7a-burst", @@t:c7a-num@@ + 0.2, 0.6, 0.4);
      pop("#c7a-tile", @@t:c7a-num@@, 0.6, 0.6);
      show("#c7a-title", @@t:c7a-title@@, 0.5);
      pop("#c7a-mascot", @@t:c7a-title@@ + 0.1, 0.6, 0.6);
      gone("#c7a-num, #c7a-tile, #c7a-title, #c7a-burst, #c7a-mascot", @@t:c7a-chip@@, 0.35);
      pop("#c7a-chip", @@t:c7a-chip@@ + 0.1, 0.5, 0.7);
      pop("#c7a-s0", @@t:c7a-chip@@ + 0.00, 0.6, 0.8);
      pop("#c7a-s1", @@t:c7a-chip@@ + 0.08, 0.6, 0.8);
      pop("#c7a-s2", @@t:c7a-chip@@ + 0.16, 0.6, 0.8);
      pop("#c7a-s3", @@t:c7a-chip@@ + 0.24, 0.6, 0.8);
      pop("#c7a-s4", @@t:c7a-chip@@ + 0.32, 0.6, 0.8);
      pop("#c7a-s5", @@t:c7a-chip@@ + 0.40, 0.6, 0.8);
      pop("#c7a-alb", @@t:c7a-alb@@, 0.5, 0.7);
      pop("#c7a-asglogo", @@t:c7a-asg@@, 0.5, 0.7);
      tl.fromTo("#c7a-grp", { y: 0 }, { y: -160, duration: 0.6, ease: "power3.inOut" }, @@t:c7a-slow@@);
      pop("#c7a-db", @@t:c7a-db@@, 0.6, 0.7);
      draw("#c7a-lines polyline", @@t:c7a-db@@ + 0.1, 0.6, 0.05);

      /* c7b: ten servers query one database, the queue grows and the database becomes the bottleneck. */
      pop("#c7b-s0", @@t:c7b-muoi@@ + 0.00, 0.5, 0.7);
      pop("#c7b-s1", @@t:c7b-muoi@@ + 0.06, 0.5, 0.7);
      pop("#c7b-s2", @@t:c7b-muoi@@ + 0.12, 0.5, 0.7);
      pop("#c7b-s3", @@t:c7b-muoi@@ + 0.18, 0.5, 0.7);
      pop("#c7b-s4", @@t:c7b-muoi@@ + 0.24, 0.5, 0.7);
      pop("#c7b-s5", @@t:c7b-muoi@@ + 0.30, 0.5, 0.7);
      pop("#c7b-s6", @@t:c7b-muoi@@ + 0.36, 0.5, 0.7);
      pop("#c7b-s7", @@t:c7b-muoi@@ + 0.42, 0.5, 0.7);
      pop("#c7b-s8", @@t:c7b-muoi@@ + 0.48, 0.5, 0.7);
      pop("#c7b-s9", @@t:c7b-muoi@@ + 0.54, 0.5, 0.7);
      pop("#c7b-pill", @@t:c7b-muoi@@, 0.5, 0.8);
      draw("#c7b-lines polyline", @@t:c7b-truy@@, 0.5, 0.04);
      pop("#c7b-q0", @@t:c7b-tang@@ + 0.00, 0.4, 0.7);
      pop("#c7b-q1", @@t:c7b-tang@@ + 0.10, 0.4, 0.7);
      pop("#c7b-q2", @@t:c7b-tang@@ + 0.20, 0.4, 0.7);
      pop("#c7b-q3", @@t:c7b-tang@@ + 0.30, 0.4, 0.7);
      bump("#c7b-db", @@t:c7b-nut@@, 1.06);
      pop("#c7b-warn", @@t:c7b-nut@@, 0.5, 0.7);
      meter("c7b-lat", @@t:c7b-nut@@, 85, 0.6, 20);
      tl.set("#c7b-lat", { className: "meter over" }, @@t:c7b-nut@@);

      /* c7c: a cache sits between the servers and the database; product and category data are stored, then served. */
      show("#c7c-slot", @@t:c7c-cache@@, 0.4, 0);
      pop("#c7c-cache", @@t:c7c-amazon@@, 0.6, 0.7);
      pop("#c7c-name", @@t:c7c-amazon@@ + 0.1, 0.5, 0.8);
      pop("#c7c-p1", @@t:c7c-sanpham@@, 0.4, 0.7);
      tl.to("#c7c-p1", { x: 440, y: 150, duration: 0.6, ease: "power2.inOut" }, @@t:c7c-amazon@@);
      gone("#c7c-p1", @@t:c7c-amazon@@ + 0.6, 0.2);
      pop("#c7c-p2", @@t:c7c-danhmuc@@, 0.4, 0.7);
      tl.to("#c7c-p2", { x: 440, y: -70, duration: 0.6, ease: "power2.inOut" }, @@t:c7c-amazon@@ + 0.1);
      gone("#c7c-p2", @@t:c7c-amazon@@ + 0.7, 0.2);
      pop("#c7c-check", @@t:c7c-kiemtra@@, 0.4, 0.7);
      tl.set("#c7c-check", { className: "badge ok" }, @@t:c7c-hop@@);
      tl.to("#c7c-db", { opacity: 0.35, duration: 0.4 }, @@t:c7c-hop@@);
      meter("c7c-q", @@t:c7c-giam@@, 40, 0.8, 90);
      meter("c7c-r", @@t:c7c-tocdo@@, 25, 0.8, 70);

      /* c7d: a cache cannot replace the database; writes go straight to it, then Multi-AZ adds a standby in a second zone. */
      tl.to("#c7d-cache", { x: 700, duration: 0.5, ease: "power2.in" }, @@t:c7d-khongthe@@);
      tl.to("#c7d-cache", { x: 0, duration: 0.5, ease: "back.out(2)" }, @@t:c7d-khongthe@@ + 0.6);
      pop("#c7d-x", @@t:c7d-khongthe@@ + 0.5, 0.4, 0.6);
      gone("#c7d-x", @@t:c7d-khongthe@@ + 1.4, 0.2);
      pop("#c7d-cc", @@t:c7d-thanhtoan@@, 0.4, 0.7);
      tl.to("#c7d-cc", { x: 996, y: -244, duration: 0.7, ease: "power1.in" }, @@t:c7d-thanhtoan@@ + 0.2);
      gone("#c7d-cc", @@t:c7d-thanhtoan@@ + 0.9, 0.15);
      pop("#c7d-pk", @@t:c7d-tonkho@@, 0.4, 0.7);
      tl.to("#c7d-pk", { x: 996, y: -244, duration: 0.7, ease: "power1.in" }, @@t:c7d-tonkho@@ + 0.2);
      gone("#c7d-pk", @@t:c7d-tonkho@@ + 0.9, 0.15);
      pop("#c7d-rc", @@t:c7d-donhang@@, 0.4, 0.7);
      tl.to("#c7d-rc", { x: 996, y: -244, duration: 0.7, ease: "power1.in" }, @@t:c7d-donhang@@ + 0.2);
      gone("#c7d-rc", @@t:c7d-donhang@@ + 0.9, 0.15);
      pop("#c7d-lock", @@t:c7d-dongthoi@@, 0.4, 0.7);
      show("#c7d-az1", @@t:c7d-multi@@, 0.5, 0);
      show("#c7d-az2", @@t:c7d-multi@@ + 0.1, 0.5, 0);
      gone("#c7d-db", @@t:c7d-multi@@, 0.3);
      pop("#c7d-rds", @@t:c7d-multi@@, 0.5, 0.7);
      pop("#c7d-db1", @@t:c7d-multi@@ + 0.2, 0.5, 0.7);
      pop("#c7d-db2", @@t:c7d-multi@@ + 0.3, 0.5, 0.7);
      draw("#c7d-sync polyline", @@t:c7d-multi@@ + 0.5, 0.5);
      tl.to("#c7d-db1", { opacity: 0.35, duration: 0.4 }, @@t:c7d-sansang@@);
      pop("#c7d-gl", @@t:c7d-ghi@@, 0.4, 0.8);
      meter("c7d-w", @@t:c7d-ghi@@, 88, 0.6, 40);
      /* c8a: a chapter card, then the Order Confirmed screen, then four side tasks run one after another. Sentences 95-98. */
      chapterCard("c8a", @@t:c8a-num@@, @@t:c8a-chip@@);
      pop("#c8a-grp", @@t:c8a-chip@@, 0.6, 0.8);
      pop("#c8a-t1", @@t:c8a-email@@, 0.5, 0.8);
      pop("#c8a-t2", @@t:c8a-invoice@@, 0.5, 0.8);
      pop("#c8a-t3", @@t:c8a-ship@@, 0.5, 0.8);
      pop("#c8a-t4", @@t:c8a-report@@, 0.5, 0.8);
      pop("#c8a-seg0, #c8a-seg1, #c8a-seg2, #c8a-seg3, #c8a-clock", @@t:c8a-chip@@ + 0.3, 0.5, 0.8);
      gone("#c8a-check, #c8a-done", @@t:c8a-wait@@, 0.3);
      pop("#c8a-spin", @@t:c8a-wait@@, 0.5, 0.8);
      tl.to("#c8a-spin", { rotation: 1080, duration: 3, ease: "none", transformOrigin: "50% 50%" }, @@t:c8a-wait@@);
      sweep("#c8a-f0", @@t:c8a-wait@@, 0.9);
      sweep("#c8a-f1", @@t:c8a-wait@@ + 0.9, 0.9);
      sweep("#c8a-f2", @@t:c8a-wait@@ + 1.8, 0.9);
      sweep("#c8a-f3", @@t:c8a-wait@@ + 2.7, 0.9);
      pop("#c8a-hot", @@t:c8a-slow@@, 0.4, 0.8);
      tl.to("#c8a-grp", { x: -5, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, @@t:c8a-slow@@);
      /* c8b: four tasks slide in, the phone confirms, SQS appears, four messages queue and reach three workers. Sentences 99-103. */
      pop("#c8b-check", @@t:c8b-async@@, 0.5, 0.8);
      tl.fromTo("#c8b-c1, #c8b-c2, #c8b-c3, #c8b-c4", { x: -220, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" }, @@t:c8b-async@@);
      pop("#c8b-sqs", @@t:c8b-simple@@, 0.6, 0.8);
      sweep("#c8b-lane", @@t:c8b-queue@@, 0.6);
      pop("#c8b-q", @@t:c8b-queue@@, 0.5, 0.8);
      for (var k = 0; k < 4; k++) {
        pop("#c8b-m" + k, @@t:c8b-send@@ + 0.4 * k, 0.3, 0.6);
        tl.to("#c8b-m" + k, { x: 860, duration: 1.4, ease: "none" }, @@t:c8b-send@@ + 0.4 * k + 0.3);
        gone("#c8b-m" + k, @@t:c8b-send@@ + 0.4 * k + 1.7, 0.2);
      }
      for (var w = 0; w < 3; w++) {
        pop("#c8b-w" + w, @@t:c8b-worker@@ + 0.15 * w, 0.5, 0.8);
        bump("#c8b-w" + w, @@t:c8b-each@@ + 0.5 * w, 1.05);
      }
      /* c8c: same pipe, producers and consumers pulse out of step, a spike fills the queue, then three workers join. Sentences 104-106. */
      pop("#c8c-p1", @@t:c8c-prod@@, 0.5, 0.8);
      pop("#c8c-p2", @@t:c8c-prod@@ + 0.2, 0.5, 0.8);
      for (var i = 0; i < 4; i++) bump("#c8c-app", @@t:c8c-same@@ + 0.3 * i, 1.04);
      for (var w = 0; w < 3; w++) for (var j = 0; j < 2; j++) bump("#c8c-w" + w, @@t:c8c-same@@ + 0.45 * w + 0.9 * j + 0.2, 1.04);
      pop("#c8c-depth", @@t:c8c-spike@@, 0.5, 0.8);
      meter("c8c-depth", @@t:c8c-spike@@, 85, 0.8, 20);
      tl.call(function () { document.getElementById("c8c-depth").classList.add("over"); }, null, @@t:c8c-spike@@);
      for (var m = 0; m < 4; m++) {
        pop("#c8c-m" + m, @@t:c8c-spike@@ + 0.1 * m, 0.3, 0.6);
        tl.to("#c8c-m" + m, { x: 860, duration: 1.2, ease: "none" }, @@t:c8c-spike@@ + 0.1 * m + 0.3);
        gone("#c8c-m" + m, @@t:c8c-spike@@ + 0.1 * m + 1.5, 0.2);
      }
      meter("c8c-depth", @@t:c8c-wait@@, 30, 0.8, 85);
      tl.call(function () { document.getElementById("c8c-depth").classList.remove("over"); }, null, @@t:c8c-wait@@);
      for (var n = 3; n < 6; n++) pop("#c8c-w" + n, @@t:c8c-scale@@ + 0.15 * (n - 3), 0.5, 0.8);
      /* c8d: the SQS promise is shown with its traps: duplicates, ordering, a retry and the dead letter queue. Sentences 107-110. */
      pop("#c8d-spk", @@t:c8d-myth@@, 0.5, 0.8);
      pop("#c8d-x", @@t:c8d-myth@@ + 0.6, 0.4, 0.6);
      pop("#c8d-std", @@t:c8d-std@@, 0.5, 0.8);
      pop("#c8d-q", @@t:c8d-std@@, 0.5, 0.8);
      pop("#c8d-m42", @@t:c8d-dup@@, 0.4, 0.8);
      pop("#c8d-m42b", @@t:c8d-dup@@ + 0.25, 0.4, 0.8);
      tl.to("#c8d-m42", { x: 900, duration: 1.6, ease: "none" }, @@t:c8d-dup@@ + 0.4);
      gone("#c8d-m42", @@t:c8d-dup@@ + 2.0, 0.2);
      tl.to("#c8d-m42b", { x: 900, y: 80, duration: 1.6, ease: "none" }, @@t:c8d-dup@@ + 0.65);
      pop("#c8d-ledger", @@t:c8d-dup@@ + 1.5, 0.5, 0.8);
      tl.to("#c8d-m42b", { autoAlpha: 0.35, duration: 0.4 }, @@t:c8d-dupr@@);
      pop("#c8d-m1", @@t:c8d-order@@, 0.3, 0.8);
      pop("#c8d-m2", @@t:c8d-order@@, 0.3, 0.8);
      pop("#c8d-m3", @@t:c8d-order@@, 0.3, 0.8);
      tl.to("#c8d-m1", { x: 600, duration: 1.5, ease: "none" }, @@t:c8d-order@@ + 0.3);
      gone("#c8d-m1", @@t:c8d-order@@ + 1.8, 0.2);
      tl.to("#c8d-m2", { x: 440, duration: 1.2, ease: "none" }, @@t:c8d-order@@ + 0.3);
      gone("#c8d-m2", @@t:c8d-order@@ + 1.5, 0.2);
      tl.to("#c8d-m3", { x: 300, duration: 1.9, ease: "none" }, @@t:c8d-order@@ + 0.3);
      gone("#c8d-m3", @@t:c8d-order@@ + 2.2, 0.2);
      pop("#c8d-m7", @@t:c8d-fail@@, 0.3, 0.8);
      tl.to("#c8d-m7", { x: 300, duration: 1.2, ease: "none" }, @@t:c8d-fail@@ + 0.3);
      pop("#c8d-n1", @@t:c8d-fail@@ + 1.5, 0.2, 0.6);
      gone("#c8d-n1", @@t:c8d-fail@@ + 1.8, 0.1);
      pop("#c8d-n2", @@t:c8d-fail@@ + 1.9, 0.2, 0.6);
      gone("#c8d-n2", @@t:c8d-fail@@ + 2.2, 0.1);
      pop("#c8d-n3", @@t:c8d-fail@@ + 2.3, 0.2, 0.6);
      gone("#c8d-n3", @@t:c8d-fail@@ + 2.6, 0.1);
      tl.to("#c8d-m7", { x: -300, y: 370, duration: 0.9, ease: "power2.in" }, @@t:c8d-dlq@@);
      pop("#c8d-dlqlab", @@t:c8d-dlq@@, 0.5, 0.8);
      pop("#c8d-mag", @@t:c8d-invest@@, 0.5, 0.8);
      /* c8e: the core transaction holds its consistency, then a lane task blocks the core, which falls and returns. Sentences 111-112. */
      pop("#c8e-core", @@t:c8e-core@@, 0.6, 0.8);
      pop("#c8e-pkg", @@t:c8e-core@@ + 0.2, 0.5, 0.8);
      pop("#c8e-card", @@t:c8e-core@@ + 0.3, 0.5, 0.8);
      pop("#c8e-lock", @@t:c8e-consist@@, 0.5, 0.8);
      tl.to("#c8e-grp", { y: 120, duration: 0.6, ease: "power2.in" }, @@t:c8e-drop@@);
      pop("#c8e-x", @@t:c8e-block@@, 0.4, 0.6);
      tl.to("#c8e-grp", { y: 0, duration: 0.5, ease: "back.out(1.4)" }, @@t:c8e-block@@);
      gone("#c8e-x", @@t:c8e-block@@ + 0.8, 0.3);
      /* c9a: chapter card, then the traffic line beats the capacity line, the lag zone is marked, then capacity is rebuilt before the peak. Sentences 113-115. */
      chapterCard("c9a", @@t:c9a-num@@, @@t:c9a-chip@@);
      pop("#c9a-chart", @@t:c9a-chip@@ + 0.3, 0.6, 0.9);
      draw("#c9a-traf", @@t:c9a-chip@@ + 0.5, 1.4);
      pop("#c9a-zone", @@t:c9a-chip@@ + 1.2, 0.5, 0.9);
      pop("#c9a-x", @@t:c9a-no@@, 0.4, 0.6);
      gone("#c9a-x, #c9a-zone, #c9a-capL", @@t:c9a-prep@@, 0.4);
      draw("#c9a-capE", @@t:c9a-prep@@ + 0.1, 1.0);
      pop("#c9a-cal", @@t:c9a-sched@@, 0.5, 0.8);
      pop("#c9a-pill", @@t:c9a-sched@@ + 0.2, 0.5, 0.8);
      /* c9b: load test runs at three tiers, the stream ramps, latency breaks, then the errors rise. Sentences 116-121. */
      pop("#c9b-pill", @@t:c9b-load@@, 0.5, 0.8);
      pop("#c9b-gauge", @@t:c9b-load@@ + 0.2, 0.5, 0.8);
      pop("#c9b-chart", @@t:c9b-load@@ + 0.3, 0.6, 0.9);
      tl.set("#c9b-stream .dot", { autoAlpha: 0 }, 0);
      for (var i = 0; i < 20; i++) pop("#c9b-b" + i, (i < 5 ? @@t:c9b-sim@@ : i < 10 ? @@t:c9b-req@@ : @@t:c9b-limit@@) + 0.05 * (i % 5), 0.3, 0.6);
      stream("#c9b-stream .dot", @@t:c9b-req@@, 1.2, 0, 90, 0.12);
      stream("#c9b-stream .dot", @@t:c9b-limit@@, 1.2, 0, 90, 0.12);
      draw("#c9b-load", @@t:c9b-req@@, 2.0);
      draw("#c9b-lat", @@t:c9b-slow@@ - 0.6, 1.2);
      draw("#c9b-err", @@t:c9b-err@@ - 0.4, 0.8);
      tl.fromTo("#c9b-scan", { x: 0 }, { x: 660, duration: 1.4, ease: "none" }, @@t:c9b-limit@@);
      bump("#c9b-srv", @@t:c9b-slow@@, 1.06);
      pop("#c9b-m1", @@t:c9b-slow@@, 0.4, 0.6);
      pop("#c9b-m2", @@t:c9b-jam@@, 0.4, 0.6);
      bump("#c9b-db", @@t:c9b-jam@@, 1.06);
      pop("#c9b-m3", @@t:c9b-err@@, 0.4, 0.6);
      /* c9c: the three markers fly into the scaling config, the timeline shows servers before 12:00, the checklist ticks, then a WAF blocks bots while the stream flows. Sentences 122-125. */
      tl.set("#c9c-stream .dot", { autoAlpha: 0 }, 0);
      for (var k = 0; k < 3; k++) {
        pop("#c9c-mk" + k, @@t:c9c-open@@ + 0.15 * k, 0.4, 0.7);
        tl.to("#c9c-mk" + k, { x: -560, duration: 0.9, ease: "power2.in" }, @@t:c9c-result@@ + 0.5 + 0.15 * k);
        gone("#c9c-mk" + k, @@t:c9c-result@@ + 1.4 + 0.15 * k, 0.2);
        tl.fromTo("#c9c-sf" + k, { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: [0.35, 0.6, 0.9][k], transformOrigin: "50% 100%", duration: 1.2, ease: "power2.out" }, @@t:c9c-up@@ + 0.15 * k);
      }
      pop("#c9c-asg", @@t:c9c-setup@@, 0.5, 0.8);
      pop("#c9c-clk", @@t:c9c-setup@@ + 0.1, 0.5, 0.8);
      pop("#c9c-lb0, #c9c-lb1, #c9c-lb2", @@t:c9c-setup@@, 0.5, 0.8);
      pop("#c9c-axis, #c9c-line, #c9c-t11, #c9c-t12", @@t:c9c-open@@, 0.5, 0.8);
      for (var s = 0; s < 3; s++) pop("#c9c-s" + s, @@t:c9c-up@@ + 0.4 * s, 0.5, 0.8);
      gone("#c9c-tlg", @@t:c9c-quota@@, 0.35);
      gone("#c9c-cfg", @@t:c9c-quota@@, 0.35);
      pop("#c9c-chk", @@t:c9c-quota@@, 0.5, 0.8);
      pop("#c9c-ch0", @@t:c9c-quota@@, 0.5, 0.8);
      pop("#c9c-tk0", @@t:c9c-quota@@ + 0.3, 0.4, 0.6);
      pop("#c9c-ch1", @@t:c9c-db@@, 0.5, 0.8);
      pop("#c9c-tk1", @@t:c9c-db@@ + 0.3, 0.4, 0.6);
      pop("#c9c-ch2", @@t:c9c-queue@@, 0.5, 0.8);
      pop("#c9c-tk2", @@t:c9c-queue@@ + 0.3, 0.4, 0.6);
      pop("#c9c-ch3", @@t:c9c-budget@@, 0.5, 0.8);
      pop("#c9c-tk3", @@t:c9c-budget@@ + 0.3, 0.4, 0.6);
      gone("#c9c-chkg", @@t:c9c-bot@@, 0.4);
      pop("#c9c-bot", @@t:c9c-bot@@, 0.4, 0.7);
      stream("#c9c-stream .dot", @@t:c9c-bot@@ + 0.3, 1.6, 0, 1500, 0.2);
      tl.to("#c9c-bot", { y: -220, autoAlpha: 0, duration: 0.8, ease: "power2.in" }, @@t:c9c-waf@@ + 0.4);
      pop("#c9c-waf", @@t:c9c-waf@@, 0.6, 0.8);
      pop("#c9c-wafpill", @@t:c9c-waf@@ + 0.2, 0.5, 0.8);
      tl.fromTo("#c9c-gate", { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, transformOrigin: "50% 0%", duration: 0.5, ease: "power2.out" }, @@t:c9c-limitreq@@);
      /* c9d: a late spike on the left, then the calm scaled setup on the right, which is ready from the start. Sentences 126-127. */
      pop("#c9d-left, #c9d-siren, #c9d-lchart", @@t:c9d-open@@, 0.5, 0.8);
      draw("#c9d-lpath", @@t:c9d-react@@ + 0.3, 0.9);
      bump("#c9d-siren", @@t:c9d-react@@ + 0.4, 1.08);
      tl.to("#c9d-lg", { autoAlpha: 0.35, duration: 0.4 }, @@t:c9d-prep@@);
      show("#c9d-right, #c9d-cal, #c9d-shield, #c9d-rchart", @@t:c9d-prep@@, 0.6, 60);
      draw("#c9d-rpath", @@t:c9d-prep@@ + 0.4, 1.0);
      pop("#c9d-ok", @@t:c9d-prep@@ + 0.9, 0.4, 0.6);
      bump("#c9d-right", @@t:c9d-start@@, 1.05);
/* c10a: cut in. The chapter card opens; a tap on "Mua" sends the first request. */
chapterCard("c10a", @@t:c10a-num@@, @@t:c10a-chip@@);
pop("#c10a-phone", @@t:c10a-tap@@, 0.6, 0.85);
pop("#c10a-buy", @@t:c10a-tap@@, 0.3, 0.9);
tl.fromTo("#c10a-req", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "none" }, @@t:c10a-tap@@ + 0.3);
draw("#c10a-l-tap", @@t:c10a-tap@@ + 0.3, 0.4, 0);
tl.to("#c10a-req", { x: 402, y: -30, duration: 0.7, ease: "power1.inOut" }, @@t:c10a-visit@@);
pop("#c10a-client", @@t:c10a-visit@@, 0.5, 0.85);
draw("#c10a-l-cf", @@t:c10a-visit@@ + 0.3, 0.6, 0);
tl.to("#c10a-req", { x: 862, y: -50, duration: 0.7, ease: "power1.inOut" }, @@t:c10a-js@@ - 0.7);
pop("#c10a-cf", @@t:c10a-js@@ - 0.52, 0.5, 0.85);
pop("#c10a-l0", @@t:c10a-js@@, 0.3, 0.9);
pop("#c10a-l1", @@t:c10a-js@@ + 0.15, 0.3, 0.9);
pop("#c10a-l2", @@t:c10a-js@@ + 0.3, 0.3, 0.9);
tl.to("#c10a-req", { autoAlpha: 0, duration: 0.2 }, @@t:c10a-js@@ + 0.4);

/* c10b: the canvas pans right to the load balancer and the EC2 group. */
tl.to("#c10b-cv", { x: -1200, duration: 1.4, ease: "power2.inOut" }, @@t:c10b-order@@);
pop("#c10b-alb", @@t:c10b-alb@@, 0.6, 0.85);
draw("#c10b-l-cfalb", @@t:c10b-alb@@, 0.5, 0);
tl.fromTo("#c10b-req", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "none" }, @@t:c10b-alb@@ + 0.3);
draw("#c10b-l-t, #c10b-l-m, #c10b-l-b", @@t:c10b-alb@@ + 0.3, 0.5, 0);
tl.to("#c10b-req", { x: 488, y: -17, duration: 0.8, ease: "power1.inOut" }, @@t:c10b-live@@);
bump("#c10b-ec2m", @@t:c10b-live@@ + 0.6, 1.04);
pop("#c10b-chk0", @@t:c10b-check@@, 0.3, 0.9);
pop("#c10b-chk1", @@t:c10b-check@@ + 0.15, 0.3, 0.9);
pop("#c10b-chk2", @@t:c10b-check@@ + 0.3, 0.3, 0.9);
tl.to("#c10b-req", { autoAlpha: 0, duration: 0.2 }, @@t:c10b-check@@ + 0.6);
gone("#c10b-chk0", @@t:c10b-cond@@, 0.2);
gone("#c10b-chk1", @@t:c10b-cond@@ + 0.2, 0.2);
gone("#c10b-chk2", @@t:c10b-cond@@ + 0.4, 0.2);
pop("#c10b-tk0", @@t:c10b-cond@@ + 0.1, 0.3, 0.9);
pop("#c10b-tk1", @@t:c10b-cond@@ + 0.3, 0.3, 0.9);
pop("#c10b-tk2", @@t:c10b-cond@@ + 0.5, 0.3, 0.9);
pop("#c10b-cache", @@t:c10b-cache@@, 0.5, 0.85);
draw("#c10b-l-cache", @@t:c10b-cache@@, 0.5, 0);
tl.fromTo("#c10b-read", { autoAlpha: 0, x: 0, y: 0 }, { autoAlpha: 1, x: 512, y: -203, duration: 0.8, ease: "power1.inOut" }, @@t:c10b-cache@@);
tl.to("#c10b-read", { autoAlpha: 0, duration: 0.2 }, @@t:c10b-cache@@ + 0.85);
pop("#c10b-rds", @@t:c10b-write@@, 0.5, 0.85);
draw("#c10b-l-rds", @@t:c10b-write@@, 0.5, 0);
tl.fromTo("#c10b-write", { autoAlpha: 0, x: 0, y: 0 }, { autoAlpha: 1, x: 512, y: 37, duration: 0.8, ease: "power1.inOut" }, @@t:c10b-write@@);
tl.to("#c10b-write", { autoAlpha: 0, duration: 0.2 }, @@t:c10b-write@@ + 0.85);
pop("#c10b-lock", @@t:c10b-write@@ + 0.6, 0.4, 0.9);

/* c10c: the canvas pans to the EC2 that receives the order, then the queue and the workers. */
tl.set("#c10c-cv", { x: -1200 }, @@start:c10c@@);
tl.to("#c10c-cv", { x: -1820, duration: 1.5, ease: "power2.inOut" }, @@t:c10c-enter@@);
pop("#c10c-ec2", @@t:c10c-open@@, 0.6, 0.85);
pop("#c10c-receipt", @@t:c10c-receipt@@ + 0.3, 0.4, 0.9);
pop("#c10c-tick", @@t:c10c-logic@@, 0.4, 0.9);
pop("#c10c-sqs", @@t:c10c-sqs@@, 0.6, 0.85);
draw("#c10c-l-ec2", @@t:c10c-sqs@@, 0.5, 0);
draw("#c10c-l-sqs", @@t:c10c-sqs@@ + 0.3, 0.3, 0);
sweep("#c10c-track", @@t:c10c-sqs@@ + 0.3, 0.8);
tl.fromTo("#c10c-m0", { autoAlpha: 0, x: -120 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" }, @@t:c10c-sqs@@ + 0.6);
tl.fromTo("#c10c-m1", { autoAlpha: 0, x: -120 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" }, @@t:c10c-sqs@@ + 0.85);
tl.fromTo("#c10c-m2", { autoAlpha: 0, x: -120 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" }, @@t:c10c-sqs@@ + 1.1);
draw("#c10c-l-w0, #c10c-l-w1, #c10c-l-w2", @@t:c10c-workers@@ - 0.3, 0.5, 0);
pop("#c10c-w0", @@t:c10c-workers@@, 0.5, 0.85);
pop("#c10c-w1", @@t:c10c-workers@@ + 0.15, 0.5, 0.85);
pop("#c10c-w2", @@t:c10c-workers@@ + 0.3, 0.5, 0.85);
pop("#c10c-mail", @@t:c10c-mail@@, 0.4, 0.8);
pop("#c10c-inv", @@t:c10c-invoice@@, 0.4, 0.8);
pop("#c10c-sync", @@t:c10c-sync@@, 0.4, 0.8);
tl.to("#c10c-sync", { rotation: 360, duration: 1.2, ease: "none" }, @@t:c10c-sync@@ + 0.4);

/* c10d: the canvas zooms out; CloudWatch watches every node; one unhealthy server, then the roles. */
tl.set("#c10d-cv", { x: -1820, y: 0, scale: 1 }, @@start:c10d@@);
tl.to("#c10d-cv", { x: 64, y: 240, scale: 0.48, duration: 2.4, ease: "power2.inOut" }, @@t:c10d-enter@@);
pop("#c10d-cw", @@t:c10d-cw@@, 0.6, 0.85);
draw("#c10d-watch path", @@t:c10d-watch@@, 1.2, 0.06);
pop("#c10d-asgb", @@t:c10d-asg@@, 0.5, 0.85);
pop("#c10d-ec2m", @@t:c10d-asg@@, 0.5, 0.85);
pop("#c10d-ec2b", @@t:c10d-asg@@ + 0.3, 0.5, 0.85);
tl.to("#c10d-ec2t", { autoAlpha: 0.35, filter: "grayscale(1)", duration: 0.6 }, @@t:c10d-lb@@);
tl.to("#c10d-l-t", { autoAlpha: 0.2, duration: 0.6 }, @@t:c10d-lb@@);
tl.to("#c10d-req", { x: 488, y: -17, duration: 0.8, ease: "power1.inOut" }, @@t:c10d-lb@@);
bump("#c10d-client", @@t:c10d-roles@@, 1.05);
bump("#c10d-cf", @@t:c10d-roles@@ + 0.12, 1.05);
bump("#c10d-alb", @@t:c10d-roles@@ + 0.24, 1.05);
bump("#c10d-ec2m", @@t:c10d-roles@@ + 0.36, 1.05);
bump("#c10d-cache", @@t:c10d-roles@@ + 0.48, 1.05);
bump("#c10d-rds", @@t:c10d-roles@@ + 0.6, 1.05);
bump("#c10d-sqs", @@t:c10d-roles@@ + 0.72, 1.05);
bump("#c10d-w0", @@t:c10d-roles@@ + 0.84, 1.05);
bump("#c10d-w1", @@t:c10d-roles@@ + 0.96, 1.05);
bump("#c10d-w2", @@t:c10d-roles@@ + 1.08, 1.05);
pop("#c10d-single", @@t:c10d-single@@, 0.4, 0.9);
gone("#c10d-single", @@t:c10d-single@@ + 1.4, 0.5);
tl.to("#c10d-single", { autoAlpha: 0.35, filter: "grayscale(1)", duration: 0.5 }, @@t:c10d-single@@ + 0.5);
pop("#c10d-xbad", @@t:c10d-single@@ + 0.5, 0.4, 0.8);
gone("#c10d-xbad", @@t:c10d-single@@ + 1.4, 0.5);
/* c11a: cut in. The chapter card opens; the question appears; the thesis answers it; the architecture zooms out. */
chapterCard("c11a", @@t:c11a-num@@, @@t:c11a-chip@@);
pop("#c11a-pill", @@t:c11a-chip@@, 0.5, 0.85);
pop("#c11a-srv", @@t:c11a-chip@@, 0.6, 0.85);
pop("#c11a-q", @@t:c11a-chip@@ + 0.25, 0.4, 0.9);
gone("#c11a-pill", @@t:c11a-clear@@, 0.4);
gone("#c11a-srv", @@t:c11a-clear@@, 0.4);
gone("#c11a-q", @@t:c11a-clear@@, 0.4);
pop("#c11a-rays", @@t:c11a-clear@@, 0.8, 0.9);
show("#c11a-thesis", @@t:c11a-thesis@@, 0.6, 36);
pop("#c11a-t1", @@t:c11a-design@@, 0.5, 0.85);
pop("#c11a-t2", @@t:c11a-prep@@, 0.5, 0.85);
tl.to("#c11a-thesis", { y: -70, scale: 0.7, duration: 0.8, ease: "power2.inOut" }, @@t:c11a-up@@);
gone("#c11a-t1", @@t:c11a-up@@, 0.4);
gone("#c11a-t2", @@t:c11a-up@@, 0.4);
gone("#c11a-rays", @@t:c11a-up@@, 0.5);
tl.set("#c11a-cv", { x: 64, y: 240, scale: 0.48 }, @@start:c11a@@);
tl.fromTo("#c11a-cv", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: "power2.out" }, @@t:c11a-up@@ + 0.2);
bump("#c11a-alb", @@t:c11a-alb@@, 1.08);
bump("#c11a-cf", @@t:c11a-cache@@, 1.08);
bump("#c11a-cache", @@t:c11a-cache@@, 1.08);
bump("#c11a-zone", @@t:c11a-scale@@, 1.03);
bump("#c11a-sqs", @@t:c11a-async@@, 1.08);
bump("#c11a-cw", @@t:c11a-watch@@, 1.08);

/* c11b: the architecture dims, one node fails, then the load falls into a tower and the five pillars appear. */
tl.set("#c11b-cv", { x: 64, y: 240, scale: 0.48 }, @@start:c11b@@);
tl.to("#c11b-cv", { autoAlpha: 0.6, duration: 0.6 }, @@t:c11b-db@@);
bump("#c11b-rds", @@t:c11b-db@@, 1.1);
pop("#c11b-tri", @@t:c11b-db@@ + 0.2, 0.4, 0.9);
pop("#c11b-dbring", @@t:c11b-db@@ + 0.2, 0.5, 0.9);
pop("#c11b-snail", @@t:c11b-slow@@, 0.4, 0.9);
pop("#c11b-hg", @@t:c11b-boot@@, 0.4, 0.9);
pop("#c11b-ring", @@t:c11b-spof@@, 0.5, 0.9);
pop("#c11b-503", @@t:c11b-down@@, 0.4, 0.9);
tl.to("#c11b-cv", { x: 70, duration: 0.06 }, @@t:c11b-down@@);
tl.to("#c11b-cv", { x: 58, duration: 0.06 }, @@t:c11b-down@@ + 0.06);
tl.to("#c11b-cv", { x: 66, duration: 0.06 }, @@t:c11b-down@@ + 0.12);
tl.to("#c11b-cv", { x: 64, duration: 0.06 }, @@t:c11b-down@@ + 0.18);
tl.to("#c11b-cv", { x: 2200, autoAlpha: 0, duration: 1, ease: "power2.in" }, @@t:c11b-not@@);
gone("#c11b-503", @@t:c11b-not@@, 0.3);
pop("#c11b-tower", @@t:c11b-not@@ + 0.4, 0.6, 0.9);
tl.to("#c11b-tower", { rotation: -10, duration: 0.8, ease: "power2.in" }, @@t:c11b-tower@@);
pop("#c11b-neq", @@t:c11b-tower@@, 0.4, 0.9);
gone("#c11b-tower", @@t:c11b-p1@@, 0.4);
gone("#c11b-neq", @@t:c11b-p1@@, 0.4);
pop("#c11b-p1", @@t:c11b-p1@@, 0.5, 0.85);
pop("#c11b-p2", @@t:c11b-p2@@, 0.5, 0.85);
pop("#c11b-p3", @@t:c11b-p3@@, 0.5, 0.85);
pop("#c11b-p4", @@t:c11b-p4@@, 0.5, 0.85);
pop("#c11b-p5", @@t:c11b-p5@@, 0.5, 0.85);

/* c11c: a fade to the real world: a browser and a graph, then a crowd, a photo and a stream of users. */
tl.fromTo("#c11c-photo", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: "power1.out" }, @@t:c11c-out@@);
show("#c11c-browser", @@t:c11c-browser@@, 0.8, 36);
pop("#c11c-check", @@t:c11c-browser@@ + 0.6, 0.4, 0.9);
show("#c11c-chart", @@t:c11c-browser@@ + 0.2, 0.6, 36);
draw("#c11c-line", @@t:c11c-browser@@ + 0.4, 1.4, 0);
pop("#c11c-s0", @@t:c11c-browser@@ + 0.4, 0.4, 0.9);
pop("#c11c-s1", @@t:c11c-browser@@ + 0.52, 0.4, 0.9);
pop("#c11c-s2", @@t:c11c-browser@@ + 0.64, 0.4, 0.9);
pop("#c11c-s3", @@t:c11c-browser@@ + 0.76, 0.4, 0.9);
pop("#c11c-s4", @@t:c11c-browser@@ + 0.88, 0.4, 0.9);
pop("#c11c-s5", @@t:c11c-browser@@ + 1.0, 0.4, 0.9);
pop("#c11c-s6", @@t:c11c-browser@@ + 1.12, 0.4, 0.9);
pop("#c11c-s7", @@t:c11c-browser@@ + 1.24, 0.4, 0.9);
tl.fromTo("#c11c-crowd", { autoAlpha: 0, y: 36 }, { autoAlpha: 0.3, y: 0, duration: 1, ease: "power2.out" }, @@t:c11c-crowd@@);
tl.to("#c11c-browser", { x: -1100, autoAlpha: 0, duration: 0.8, ease: "power2.in" }, @@t:c11c-out@@);
gone("#c11c-crowd", @@t:c11c-out@@, 0.5);
gone("#c11c-chart", @@t:c11c-out@@, 0.5);
gone("#c11c-check", @@t:c11c-out@@, 0.3);
gone("#c11c-s0, #c11c-s1, #c11c-s2, #c11c-s3, #c11c-s4, #c11c-s5, #c11c-s6, #c11c-s7", @@t:c11c-out@@, 0.3);
draw("#c11c-arch path", @@t:c11c-distrib@@, 1.2, 0.12);
pop("#c11c-aws", @@t:c11c-aws@@, 0.6, 0.85);
tl.set("#c11c-stream .dot", { autoAlpha: 0 }, @@start:c11c@@);
tl.set("#c11c-stream .dot", { autoAlpha: 1 }, @@t:c11c-millions@@);
stream("#c11c-stream .dot", @@t:c11c-millions@@, 3.5, 0, 1960, 0.12);
tl.to("#c11c-photo img", { scale: 1.08, duration: 5, ease: "none" }, @@t:c11c-use@@);

/* c11d: the closing photo with a slow push-in; the AWS tile and the series pill. */
tl.to("#c11d-photo img", { scale: 1.05, duration: 5.5, ease: "none" }, @@t:c11d-thanks@@);
pop("#c11d-aws", @@t:c11d-aws@@, 0.6, 0.85);
pop("#c11d-pill", @@t:c11d-aws@@ + 0.3, 0.5, 0.9);
      tl.set({}, {}, @@end@@);
