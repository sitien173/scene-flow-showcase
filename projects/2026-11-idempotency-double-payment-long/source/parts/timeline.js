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

      /* c1a */
      tl.fromTo("#w-c1a", { scale: 1 }, { scale: 1.06, duration: @@start:c1b@@ - @@start:c1a@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c1a@@);
      show("#c1a-series", 0.15, 0.5, 20);
      pop("#c1a-aws", 0.3, 0.5);
      show("#c1a-win", 0.35, 0.6, 60);
      pop("#c1a-phone", @@t:c1a-phone@@, 0.5);
      show("#c1a-name", @@t:c1a-phone@@ + 0.2, 0.4, 16);
      pop("#c1a-price", @@t:c1a-price@@, 0.5);
      gone("#c1a-series, #c1a-aws", @@t:c1a-form@@, 0.3);
      show("#c1a-form", @@t:c1a-form@@, 0.5, 24);
      pop("#c1a-btn", @@t:c1a-form@@ + 0.6, 0.45);
      tl.fromTo("#c1a-cur", { autoAlpha: 0, x: 300, y: 160 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.9, ease: "power2.inOut" }, @@t:c1a-pay@@ - 1.0);
      tl.to("#c1a-cur", { scale: 0.84, duration: 0.08, ease: "power2.in", transformOrigin: "23% 13%" }, @@t:c1a-pay@@ - 0.04);
      tl.to("#c1a-cur", { scale: 1, duration: 0.2, ease: "power2.out", transformOrigin: "23% 13%" }, @@t:c1a-pay@@ + 0.06);
      bump("#c1a-btn", @@t:c1a-pay@@, 0.9);
      gone("#c1a-btn", @@t:c1a-proc@@ - 0.6, 0.2);
      pop("#c1a-proc", @@t:c1a-proc@@ - 0.5, 0.45);
      tl.fromTo("#c1a-proc svg", { rotation: 0 }, { rotation: 900, duration: 3.2, ease: "none" }, @@t:c1a-proc@@ - 0.5);
      /* c1b */
      tl.fromTo("#w-c1b", { scale: 1 }, { scale: 1.12, duration: @@start:c1c@@ - @@start:c1b@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c1b@@);
      pop("#c1b-load", @@start:c1b@@ + 0.05, 0.45);
      pop("#c1b-timer", @@start:c1b@@ + 0.15, 0.45);
      tl.fromTo("#c1b-load .ico", { rotation: 0 }, { rotation: 540, duration: 2.8, ease: "none" }, @@start:c1b@@);
      tl.fromTo("#c1b-timer .ico", { rotation: 0 }, { rotation: 30, duration: 0.2, ease: "power2.out" }, @@t:c1b-two@@);
      tl.to("#c1b-timer .ico", { rotation: 60, duration: 0.2, ease: "power2.out" }, @@t:c1b-five@@);
      pop("#c1b-n1", @@t:c1b-one@@, 0.35);
      gone("#c1b-n1", @@t:c1b-two@@, 0.1);
      pop("#c1b-n2", @@t:c1b-two@@, 0.35);
      gone("#c1b-n2", @@t:c1b-five@@, 0.1);
      pop("#c1b-n5", @@t:c1b-five@@, 0.35);
      tl.to("#c1b-load, #c1b-timer", { opacity: 0.45, duration: 0.5, ease: "power1.out" }, @@t:c1b-stall@@);
      tl.fromTo("#c1b-ecg", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, @@t:c1b-worry@@ - 0.3);
      draw("#c1b-ecgp", @@t:c1b-worry@@ - 0.3, 1.2);
      /* c1c */
      tl.fromTo("#w-c1c", { scale: 1 }, { scale: 1.03, duration: @@start:c1d@@ - @@start:c1c@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c1c@@);
      pop("#c1c-q1", @@t:c1c-q1@@, 0.5);
      pop("#c1c-q2", @@t:c1c-q2@@, 0.5);
      pop("#c1c-q3", @@t:c1c-q3@@, 0.5);
      show("#c1c-btn", @@t:c1c-wait@@, 0.4, 24);
      show("#c1c-srv", @@t:c1c-wait@@ + 0.2, 0.4, 24);
      tl.fromTo("#c1c-cur", { autoAlpha: 0, x: 240, y: 220 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.7, ease: "power2.inOut" }, @@t:c1c-press@@ - 0.8);
      tl.to("#c1c-cur", { scale: 0.84, duration: 0.08, ease: "power2.in", transformOrigin: "23% 13%" }, @@t:c1c-press@@ - 0.04);
      tl.to("#c1c-cur", { scale: 1, duration: 0.2, ease: "power2.out", transformOrigin: "23% 13%" }, @@t:c1c-press@@ + 0.06);
      bump("#c1c-btn", @@t:c1c-press@@, 1.15);
      bump("#c1c-btn", @@t:c1c-again@@, 1.15);
      tl.fromTo("#c1c-p1", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 840, duration: 0.8, ease: "power2.in" }, @@t:c1c-press@@ + 0.1);
      tl.fromTo("#c1c-p2", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 840, duration: 0.8, ease: "power2.in" }, @@t:c1c-again@@);
      bump("#c1c-srv", @@t:c1c-again@@ + 0.8, 1.06);
      /* c1d */
      tl.fromTo("#w-c1d", { scale: 1.2 }, { scale: 1, duration: 0.8, ease: "power3.out", transformOrigin: "50% 40%" }, @@t:c1d-n2@@);
      show("#c1d-n1", @@t:c1d-n1@@, 0.45, -60);
      show("#c1d-n2", @@t:c1d-n2@@, 0.4, -60);
      tl.fromTo("#c1d-n2", { x: -6 }, { x: 6, duration: 0.06, repeat: 5, yoyo: true, ease: "none", immediateRender: false }, @@t:c1d-n2@@ + 0.4);
      pop("#c1d-x2", @@t:c1d-n2@@ + 0.5, 0.5, 0.4);
      /* c1e */
      tl.fromTo("#w-c1e", { scale: 1 }, { scale: 1.03, duration: @@start:c2a@@ - @@start:c1e@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c1e@@);
      chapterCard("c1e", @@start:c1e@@ + 0.05, @@t:c1e-chip@@);
      bump("#c1e-tile", @@t:c1e-pop@@, 1.08);
      pop("#c1e-ptr", @@t:c1e-user@@, 0.45);
      bump("#c1e-px", @@t:c1e-no@@, 1.3);
      gone("#c1e-ptr", @@t:c1e-chip@@, 0.3);
      pop("#c1e-cli", @@t:c1e-chip@@ + 0.2, 0.45);
      sweep("#c1e-l1", @@t:c1e-chip@@ + 0.4, 0.4);
      pop("#c1e-net", @@t:c1e-chip@@ + 0.5, 0.45);
      show("#c1e-netn", @@t:c1e-chip@@ + 0.6, 0.4, 16);
      sweep("#c1e-l2", @@t:c1e-chip@@ + 0.7, 0.4);
      pop("#c1e-srv", @@t:c1e-chip@@ + 0.8, 0.45);
      tl.fromTo("#c1e-pk", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 360, duration: 0.9, ease: "power1.inOut" }, @@t:c1e-chip@@ + 1.0);
      tl.to("#c1e-pk", { x: 0, duration: 0.5, ease: "power2.in" }, @@t:c1e-resend@@ - 0.5);
      tl.to("#c1e-pk", { x: 360, duration: 0.9, ease: "power1.inOut" }, @@t:c1e-resend@@);
      pop("#c1e-resend", @@t:c1e-resend@@, 0.45);
      tl.fromTo("#c1e-l2c", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, @@t:c1e-net@@);
      gone("#c1e-l2", @@t:c1e-net@@, 0.2);
      tl.fromTo("#c1e-zone", { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" }, @@t:c1e-zone@@);
      pop("#c1e-arch", @@t:c1e-zone@@ + 0.15, 0.45);
      /* c2a */
      tl.fromTo("#w-c2a", { scale: 1 }, { scale: 1.04, duration: @@start:c2b@@ - @@start:c2a@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c2a@@);
      chapterCard("c2a", @@start:c2a@@ + 0.05, @@t:c2a-chip@@);
      bump("#c2a-tile", @@t:c2a-pop@@, 1.08);
      pop("#c2a-cli", @@t:c2a-chip@@ + 0.2, 0.45);
      show("#c2a-be, #c2a-ben", @@t:c2a-chip@@ + 0.4, 0.4, 24);
      show("#c2a-gw, #c2a-gwn", @@t:c2a-chip@@ + 0.6, 0.4, 24);
      sweep("#c2a-l1", @@t:c2a-chip@@ + 0.8, 0.4);
      sweep("#c2a-l2", @@t:c2a-chip@@ + 0.9, 0.4);
      tl.fromTo("#c2a-pk", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 340, duration: 1.0, ease: "power2.inOut" }, @@t:c2a-send@@);
      /* c2b */
      tl.fromTo("#w-c2b", { scale: 1 }, { scale: 1.03, duration: @@start:c2c@@ - @@start:c2b@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c2b@@);
      pop("#c2b-chk", @@t:c2b-check@@, 0.45);
      tl.fromTo("#c2b-pk", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 280, duration: 0.9, ease: "power2.inOut" }, @@t:c2b-fwd@@);
      gone("#c2b-pk", @@t:c2b-fwd@@ + 1.0, 0.2);
      bump("#c2b-gw", @@t:c2b-fwd@@ + 1.0, 1.08);
      pop("#c2b-ok", @@t:c2b-ok@@, 0.45);
      pop("#c2b-succ", @@t:c2b-ok@@ + 0.1, 0.45);
      tl.fromTo("#c2b-res", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: -280, duration: 0.9, ease: "power2.inOut" }, @@t:c2b-ok@@ + 0.4);
      tl.to("#c2b-res", { x: -760, duration: 0.8, ease: "power2.out" }, @@t:c2b-stop@@);
      tl.to("#w-c2b .srv, #w-c2b .ltile, #w-c2b .tile", { opacity: 0.5, duration: 0.4 }, @@t:c2b-stop@@ + 0.5);
      pop("#c2b-q", @@t:c2b-q@@, 0.45);
      /* c2c */
      tl.fromTo("#w-c2c", { scale: 1 }, { scale: 1.03, duration: @@start:c2d@@ - @@start:c2c@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c2c@@);
      tl.fromTo("#c2c-res", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: -160, duration: 0.8, ease: "power1.in" }, @@start:c2c@@ + 0.3);
      gone("#c2c-res", @@t:c2c-lost@@, 0.1);
      tl.fromTo("#c2c-f0", { autoAlpha: 1, x: 0, y: 0 }, { autoAlpha: 0, x: -120, y: -100, duration: 0.7, ease: "power2.out" }, @@t:c2c-lost@@);
      tl.fromTo("#c2c-f1", { autoAlpha: 1, x: 0, y: 0 }, { autoAlpha: 0, x: 100, y: -120, duration: 0.7, ease: "power2.out" }, @@t:c2c-lost@@);
      tl.fromTo("#c2c-f2", { autoAlpha: 1, x: 0, y: 0 }, { autoAlpha: 0, x: 140, y: 20, duration: 0.7, ease: "power2.out" }, @@t:c2c-lost@@);
      tl.fromTo("#c2c-f3", { autoAlpha: 1, x: 0, y: 0 }, { autoAlpha: 0, x: 80, y: 120, duration: 0.7, ease: "power2.out" }, @@t:c2c-lost@@);
      tl.fromTo("#c2c-f4", { autoAlpha: 1, x: 0, y: 0 }, { autoAlpha: 0, x: -80, y: 110, duration: 0.7, ease: "power2.out" }, @@t:c2c-lost@@);
      tl.fromTo("#c2c-f5", { autoAlpha: 1, x: 0, y: 0 }, { autoAlpha: 0, x: -140, y: 0, duration: 0.7, ease: "power2.out" }, @@t:c2c-lost@@);
      pop("#c2c-to", @@t:c2c-to@@, 0.45);
      tl.to("#c2c-row", { autoAlpha: 0, scale: 0.8, duration: 0.4, ease: "power2.in", transformOrigin: "35% 45%" }, @@t:c2c-split@@ - 0.2);
      tl.fromTo("#c2c-left", { autoAlpha: 0, scale: 1.15 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" }, @@t:c2c-split@@ + 0.1);
      pop("#c2c-lok", @@t:c2c-done@@, 0.45);
      tl.fromTo("#c2c-right", { autoAlpha: 0, scale: 1.15 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" }, @@t:c2c-cli@@ - 1.2);
      tl.fromTo("#c2c-spin .ico", { rotation: 0 }, { rotation: 720, duration: 3, ease: "none" }, @@t:c2c-cli@@ - 1.2);
      /* c2d */
      tl.fromTo("#w-c2d", { scale: 1 }, { scale: 1.05, duration: @@start:c2e@@ - @@start:c2d@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c2d@@);
      pop("#c2d-net", @@t:c2d-net@@, 0.45);
      tl.fromTo("#c2d-pk", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 900, duration: 1.4, ease: "power1.inOut" }, @@t:c2d-send@@);
      gone("#c2d-pk", @@t:c2d-send@@ + 1.5, 0.2);
      tl.fromTo("#c2d-fog", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: "power1.out" }, @@t:c2d-fog@@);
      pop("#c2d-warn", @@t:c2d-warn@@, 0.5);
      gone("#c2d-row", @@t:c2d-cards@@, 0.3);
      show("#c2d-a", @@t:c2d-cards@@ + 0.2, 0.45, 40);
      show("#c2d-b", @@t:c2d-cards@@ + 0.5, 0.45, 40);
      pop("#c2d-q", @@t:c2d-q@@, 0.5);
      /* c2e */
      tl.fromTo("#w-c2e", { scale: 1 }, { scale: 1.03, duration: @@start:c3a@@ - @@start:c2e@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c2e@@);
      show("#c2e-led", @@start:c2e@@ + 0.3, 0.5, 80);
      gone("#c2e-r2", @@start:c2e@@, 0.01);
      tl.fromTo("#c2e-pk", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 400, duration: 0.9, ease: "power2.inOut" }, @@t:c2e-resend@@);
      tl.to("#c2e-pk", { x: 1000, duration: 0.9, ease: "power2.inOut" }, @@t:c2e-run@@);
      bump("#c2e-be", @@t:c2e-run@@, 1.06);
      gone("#c2e-pk", @@t:c2e-second@@, 0.15);
      bump("#c2e-gw", @@t:c2e-second@@, 1.1);
      show("#c2e-r2", @@t:c2e-second@@, 0.35, 30);
      pop("#c2e-x2", @@t:c2e-second@@ + 0.2, 0.5, 0.4);
      bump("#c2e-x2", @@t:c2e-grave@@, 1.15);
      tl.to("#c2e-gw", { backgroundColor: "var(--accent)", duration: 0.3 }, @@t:c2e-grave@@);
      /* c3a */
      tl.fromTo("#w-c3a", { scale: 1 }, { scale: 1.03, duration: @@start:c3b@@ - @@start:c3a@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c3a@@);
      chapterCard("c3a", @@start:c3a@@ + 0.05, @@t:c3a-chip@@);
      bump("#c3a-tile", @@t:c3a-pop@@, 1.08);
      pop("#c3a-srv", @@t:c3a-chip@@ + 0.2, 0.45);
      tl.fromTo("#c3a-loop", { autoAlpha: 0, rotation: -90 }, { autoAlpha: 1, rotation: 270, duration: 3, ease: "power1.inOut", transformOrigin: "50% 50%" }, @@t:c3a-chip@@ + 0.3);
      pop("#c3a-shield", @@t:c3a-safe@@, 0.5);
      show("#c3a-sn", @@t:c3a-safe@@ + 0.2, 0.4, 16);
      /* c3b */
      tl.fromTo("#w-c3b", { scale: 1 }, { scale: 1.03, duration: @@start:c3c@@ - @@start:c3b@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c3b@@);
      pop("#c3b-t1", @@t:c3b-t1@@, 0.45);
      show("#c3b-l1", @@t:c3b-t1@@ + 0.15, 0.4, 16);
      pop("#c3b-t2", @@t:c3b-t2@@, 0.45);
      show("#c3b-l2", @@t:c3b-t2@@ + 0.15, 0.4, 16);
      pop("#c3b-t3", @@t:c3b-t3@@, 0.45);
      show("#c3b-l3", @@t:c3b-t3@@ + 0.15, 0.4, 16);
      pop("#c3b-t4", @@t:c3b-t4@@, 0.45);
      show("#c3b-l4", @@t:c3b-t4@@ + 0.15, 0.4, 16);
      /* c3c */
      tl.fromTo("#w-c3c", { scale: 1 }, { scale: 1.05, duration: @@start:c3d@@ - @@start:c3c@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c3c@@);
      show("#c3c-la, #c3c-a", @@start:c3c@@ + 0.1, 0.45, 24);
      tl.fromTo("#c3c-af", { scaleX: 0 }, { scaleX: 0.6, duration: 1.4, ease: "none" }, @@start:c3c@@ + 0.4);
      tl.to("#c3c-af", { backgroundColor: "var(--accent)", duration: 0.2 }, @@t:c3c-err@@);
      pop("#c3c-ax", @@t:c3c-err@@, 0.45);
      tl.to("#c3c-af", { scaleX: 0, duration: 0.6, ease: "power2.in" }, @@t:c3c-restart@@);
      show("#c3c-lb, #c3c-b", @@t:c3c-auto@@ - 0.6, 0.45, 24);
      tl.fromTo("#c3c-bf", { scaleX: 0 }, { scaleX: 1, duration: 3.6, ease: "none" }, @@t:c3c-auto@@);
      pop("#c3c-r1", @@t:c3c-auto@@ + 0.6, 0.4);
      pop("#c3c-r2", @@t:c3c-auto@@ + 1.4, 0.4);
      pop("#c3c-r3", @@t:c3c-auto@@ + 2.6, 0.4);
      pop("#c3c-bok", @@t:c3c-auto@@ + 3.6, 0.45);
      pop("#c3c-aws", @@t:c3c-sdk@@, 0.5);
      pop("#c3c-sdk", @@t:c3c-sdk@@ + 0.2, 0.45);
      bump("#c3c-b", @@t:c3c-fit@@, 1.03);
      /* c3d */
      tl.fromTo("#w-c3d", { scale: 1 }, { scale: 1.03, duration: @@start:c3e@@ - @@start:c3d@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c3d@@);
      pop("#c3d-loop", @@start:c3d@@ + 0.1, 0.45);
      tl.fromTo("#c3d-loop .ico", { rotation: 0 }, { rotation: 360, duration: 2, ease: "power1.inOut" }, @@t:c3d-new@@);
      pop("#c3d-t1", @@t:c3d-order@@, 0.45); show("#c3d-l1", @@t:c3d-order@@ + 0.1, 0.4, 16);
      pop("#c3d-t2", @@t:c3d-pay@@, 0.45); show("#c3d-l2", @@t:c3d-pay@@ + 0.1, 0.4, 16);
      pop("#c3d-t3", @@t:c3d-res@@, 0.45); show("#c3d-l3", @@t:c3d-res@@ + 0.1, 0.4, 16);
      tl.fromTo("#c3d-t1-c1, #c3d-t2-c1, #c3d-t3-c1", { autoAlpha: 0, x: -24, y: -24 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.35, ease: "power2.out" }, @@t:c3d-many@@);
      tl.fromTo("#c3d-t1-c2, #c3d-t2-c2, #c3d-t3-c2", { autoAlpha: 0, x: -48, y: -48 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.35, ease: "power2.out" }, @@t:c3d-many@@ + 0.2);
      pop("#c3d-x3", @@t:c3d-many@@ + 0.4, 0.45);
      bump("#c3d-x3", @@t:c3d-bad@@, 1.3);
      /* c3e */
      tl.fromTo("#w-c3e", { scale: 1 }, { scale: 1.06, duration: @@start:c4a@@ - @@start:c3e@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c3e@@);
      pop("#c3e-loop", @@t:c3e-retry@@, 0.45);
      show("#c3e-ll", @@t:c3e-retry@@ + 0.2, 0.4, 16);
      tl.fromTo("#c3e-loop .ico", { rotation: 0 }, { rotation: 1080, duration: 4.5, ease: "none" }, @@t:c3e-retry@@);
      pop("#c3e-ok", @@t:c3e-once@@, 0.5);
      show("#c3e-lr", @@t:c3e-once@@ + 0.2, 0.4, 16);
      tl.fromTo("#c3e-rays", { autoAlpha: 0, rotation: 0 }, { autoAlpha: 1, rotation: 20, duration: 2.5, ease: "none" }, @@t:c3e-word@@);
      tl.fromTo("#c3e-word", { autoAlpha: 0, clipPath: "inset(0% 100% 0% 0%)" }, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power2.out" }, @@t:c3e-word@@);
      /* c4a */
      tl.fromTo("#w-c4a", { scale: 1 }, { scale: 1.04, duration: @@start:c4b@@ - @@start:c4a@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c4a@@);
      chapterCard("c4a", @@start:c4a@@ + 0.05, @@t:c4a-chip@@);
      bump("#c4a-tile", @@t:c4a-pop@@, 1.08);
      bump("#c4a-eq", @@t:c4a-same@@, 1.3);
      pop("#c4a-a1", @@t:c4a-chip@@ + 0.2, 0.4); pop("#c4a-a2", @@t:c4a-chip@@ + 0.35, 0.4); pop("#c4a-a3", @@t:c4a-chip@@ + 0.5, 0.4);
      sweep("#c4a-l1", @@t:c4a-chip@@ + 0.7, 0.4); sweep("#c4a-l2", @@t:c4a-chip@@ + 0.8, 0.4); sweep("#c4a-l3", @@t:c4a-chip@@ + 0.9, 0.4);
      pop("#c4a-res", @@t:c4a-chip@@ + 1.2, 0.45);
      show("#c4a-rl", @@t:c4a-chip@@ + 1.4, 0.4, 16);
      /* c4b */
      tl.fromTo("#w-c4b", { scale: 1 }, { scale: 1.05, duration: @@start:c4c@@ - @@start:c4b@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c4b@@);
      show("#c4b-code", @@start:c4b@@ + 0.2, 0.45, 30);
      show("#c4b-card", @@t:c4b-set@@, 0.45, 30);
      pop("#c4b-bal", @@t:c4b-set@@ + 0.2, 0.45);
      show("#c4b-n-0", @@t:c4b-ten@@ - 0.9 + 0.00, 0.12, 12);
      gone("#c4b-n-0", @@t:c4b-ten@@ - 0.9 + 0.20, 0.05);
      show("#c4b-n-1", @@t:c4b-ten@@ - 0.9 + 0.20, 0.12, 12);
      gone("#c4b-n-1", @@t:c4b-ten@@ - 0.9 + 0.40, 0.05);
      show("#c4b-n-2", @@t:c4b-ten@@ - 0.9 + 0.40, 0.12, 12);
      gone("#c4b-n-2", @@t:c4b-ten@@ - 0.9 + 0.60, 0.05);
      show("#c4b-n-3", @@t:c4b-ten@@ - 0.9 + 0.60, 0.12, 12);
      gone("#c4b-n-3", @@t:c4b-ten@@ - 0.9 + 0.80, 0.05);
      show("#c4b-n-4", @@t:c4b-ten@@ - 0.9 + 0.80, 0.12, 12);
      gone("#c4b-n-4", @@t:c4b-ten@@ - 0.9 + 1.00, 0.05);
      show("#c4b-n-5", @@t:c4b-ten@@ - 0.9 + 1.00, 0.12, 12);
      gone("#c4b-n-5", @@t:c4b-ten@@ - 0.9 + 1.20, 0.05);
      show("#c4b-n-6", @@t:c4b-ten@@ - 0.9 + 1.20, 0.12, 12);
      gone("#c4b-n-6", @@t:c4b-ten@@ - 0.9 + 1.40, 0.05);
      show("#c4b-n-7", @@t:c4b-ten@@ - 0.9 + 1.40, 0.12, 12);
      gone("#c4b-n-7", @@t:c4b-ten@@ - 0.9 + 1.60, 0.05);
      show("#c4b-n-8", @@t:c4b-ten@@ - 0.9 + 1.60, 0.12, 12);
      gone("#c4b-n-8", @@t:c4b-ten@@ - 0.9 + 1.80, 0.05);
      show("#c4b-n-9", @@t:c4b-ten@@ - 0.9 + 1.80, 0.12, 12);
      bump("#c4b-bal", @@t:c4b-same@@, 1.12);
      pop("#c4b-tag", @@t:c4b-idem@@, 0.45);
      /* c4c */
      tl.fromTo("#w-c4c", { scale: 1 }, { scale: 1.04, duration: @@start:c4d@@ - @@start:c4c@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c4c@@);
      show("#c4c-l", @@start:c4c@@ + 0.1, 0.4, 30);
      show("#c4c-lv", @@start:c4c@@ + 0.3, 0.4, 20);
      pop("#c4c-lok", @@start:c4c@@ + 0.5, 0.4);
      show("#c4c-r", @@t:c4c-add@@, 0.45, 30);
      show("#c4c-inc", @@t:c4c-add@@ + 0.3, 0.4, 16);
      show("#c4c-v-0", @@t:c4c-one@@ + 0.00, 0.12, 12);
      gone("#c4c-v-0", @@t:c4c-one@@ + 0.27, 0.05);
      show("#c4c-v-1", @@t:c4c-one@@ + 0.27, 0.12, 12);
      gone("#c4c-v-1", @@t:c4c-one@@ + 0.54, 0.05);
      show("#c4c-v-2", @@t:c4c-one@@ + 0.54, 0.12, 12);
      gone("#c4c-v-2", @@t:c4c-one@@ + 0.81, 0.05);
      show("#c4c-v-3", @@t:c4c-one@@ + 0.81, 0.12, 12);
      gone("#c4c-v-3", @@t:c4c-one@@ + 1.08, 0.05);
      show("#c4c-v-4", @@t:c4c-one@@ + 1.08, 0.12, 12);
      gone("#c4c-v-4", @@t:c4c-one@@ + 1.35, 0.05);
      show("#c4c-v-5", @@t:c4c-one@@ + 1.35, 0.12, 12);
      gone("#c4c-v-5", @@t:c4c-one@@ + 1.61, 0.05);
      show("#c4c-v-6", @@t:c4c-one@@ + 1.61, 0.12, 12);
      gone("#c4c-v-6", @@t:c4c-one@@ + 1.88, 0.05);
      show("#c4c-v-7", @@t:c4c-one@@ + 1.88, 0.12, 12);
      gone("#c4c-v-7", @@t:c4c-one@@ + 2.15, 0.05);
      show("#c4c-v-8", @@t:c4c-one@@ + 2.15, 0.12, 12);
      gone("#c4c-v-8", @@t:c4c-one@@ + 2.42, 0.05);
      show("#c4c-v-9", @@t:c4c-one@@ + 2.42, 0.12, 12);
      show("#c4c-n-0", @@t:c4c-one@@ + 0.00, 0.12, 12);
      gone("#c4c-n-0", @@t:c4c-one@@ + 0.27, 0.05);
      show("#c4c-n-1", @@t:c4c-one@@ + 0.27, 0.12, 12);
      gone("#c4c-n-1", @@t:c4c-one@@ + 0.54, 0.05);
      show("#c4c-n-2", @@t:c4c-one@@ + 0.54, 0.12, 12);
      gone("#c4c-n-2", @@t:c4c-one@@ + 0.81, 0.05);
      show("#c4c-n-3", @@t:c4c-one@@ + 0.81, 0.12, 12);
      gone("#c4c-n-3", @@t:c4c-one@@ + 1.08, 0.05);
      show("#c4c-n-4", @@t:c4c-one@@ + 1.08, 0.12, 12);
      gone("#c4c-n-4", @@t:c4c-one@@ + 1.35, 0.05);
      show("#c4c-n-5", @@t:c4c-one@@ + 1.35, 0.12, 12);
      gone("#c4c-n-5", @@t:c4c-one@@ + 1.61, 0.05);
      show("#c4c-n-6", @@t:c4c-one@@ + 1.61, 0.12, 12);
      gone("#c4c-n-6", @@t:c4c-one@@ + 1.88, 0.05);
      show("#c4c-n-7", @@t:c4c-one@@ + 1.88, 0.12, 12);
      gone("#c4c-n-7", @@t:c4c-one@@ + 2.15, 0.05);
      show("#c4c-n-8", @@t:c4c-one@@ + 2.15, 0.12, 12);
      gone("#c4c-n-8", @@t:c4c-one@@ + 2.42, 0.05);
      show("#c4c-n-9", @@t:c4c-one@@ + 2.42, 0.12, 12);
      bump("#c4c-v-9", @@t:c4c-k@@ + 0.3, 1.12);
      pop("#c4c-rx", @@t:c4c-not@@, 0.45);
      pop("#c4c-tag", @@t:c4c-not@@ + 0.2, 0.45);
      /* c4d */
      tl.fromTo("#w-c4d", { scale: 1 }, { scale: 1.06, duration: @@start:c5a@@ - @@start:c4d@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c4d@@);
      sweep("#c4d-l0", @@start:c4d@@ + 0.2, 0.5);
      sweep("#c4d-up", @@start:c4d@@ + 0.6, 0.4);
      sweep("#c4d-dn", @@start:c4d@@ + 0.7, 0.4);
      tl.fromTo("#c4d-pk", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 460, duration: 1.2, ease: "power2.inOut" }, @@t:c4d-pay@@);
      tl.to("#c4d-pk", { scale: 1.3, duration: 0.25, yoyo: true, repeat: 3, ease: "power1.inOut" }, @@t:c4d-many@@);
      pop("#c4d-sys", @@t:c4d-know@@, 0.45);
      gone("#c4d-pk", @@t:c4d-know@@, 0.2);
      pop("#c4d-new", @@t:c4d-new@@, 0.45);
      pop("#c4d-rt", @@t:c4d-rt@@, 0.45);
      show("#c4d-p1", @@t:c4d-know@@ + 0.4, 0.4, 20);
      show("#c4d-p2", @@t:c4d-know@@ + 0.6, 0.4, 20);
      pop("#c4d-q", @@t:c4d-know@@ + 0.8, 0.45);
      gone("#c4d-q", @@t:c4d-key@@, 0.2);
      tl.fromTo("#c4d-key", { autoAlpha: 0, y: -400 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "bounce.out" }, @@t:c4d-key@@);
      bump("#c4d-rt", @@t:c4d-key@@ + 0.7, 1.15);
      /* c5a */
      tl.fromTo("#w-c5a", { scale: 1 }, { scale: 1.04, duration: @@start:c5b@@ - @@start:c5a@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c5a@@);
      chapterCard("c5a", @@start:c5a@@ + 0.05, @@t:c5a-chip@@);
      bump("#c5a-tile", @@t:c5a-pop@@, 1.08);
      show("#c5a-win", @@t:c5a-chip@@ + 0.2, 0.5, 40);
      bump("#c5a-btn", @@t:c5a-pay@@, 1.12);
      pop("#c5a-pk", @@t:c5a-pay@@ + 0.3, 0.4);
      tl.fromTo("#c5a-uuid", { autoAlpha: 0, clipPath: "inset(0% 100% 0% 0%)" }, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "steps(18)" }, @@t:c5a-uuid@@);
      tl.to("#c5a-uuid", { y: -90, duration: 0.5, ease: "power2.inOut" }, @@t:c5a-send@@);
      tl.to("#c5a-pk, #c5a-uuid", { x: 220, duration: 0.8, ease: "power2.in" }, @@t:c5a-send@@ + 0.6);
      /* c5b */
      tl.fromTo("#w-c5b", { scale: 1 }, { scale: 1.05, duration: @@start:c5c@@ - @@start:c5b@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c5b@@);
      show("#c5b-code", @@start:c5b@@ + 0.1, 0.45, 30);
      bump("#c5b-code", @@t:c5b-hdr@@, 1.04);
      pop("#c5b-r1", @@t:c5b-hdr@@ + 0.6, 0.4);
      pop("#c5b-be", @@t:c5b-hdr@@ + 0.8, 0.4); show("#c5b-ben", @@t:c5b-hdr@@ + 0.9, 0.4, 12);
      tl.to("#c5b-r1", { x: 480, duration: 0.8, ease: "power1.in" }, @@t:c5b-to@@ - 0.9);
      gone("#c5b-r1", @@t:c5b-to@@ + 0.6, 0.3);
      pop("#c5b-to", @@t:c5b-to@@, 0.4);
      pop("#c5b-rt", @@t:c5b-rt@@, 0.4);
      tl.fromTo("#c5b-r2", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 640, duration: 1.0, ease: "power2.inOut" }, @@t:c5b-rt@@);
      bump("#c5b-r2", @@t:c5b-same@@, 1.12);
      bump("#c5b-be", @@t:c5b-be@@, 1.08);
      pop("#c5b-ok", @@t:c5b-one@@, 0.45);
      /* c5c */
      tl.fromTo("#w-c5c", { scale: 1 }, { scale: 1.03, duration: @@start:c5d@@ - @@start:c5c@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c5c@@);
      show("#c5c-l", @@start:c5c@@ + 0.1, 0.45, 30);
      show("#c5c-lt", @@start:c5c@@ + 0.3, 0.4, 16);
      pop("#c5c-lk", @@t:c5c-once@@, 0.45);
      pop("#c5c-lp1", @@t:c5c-once@@ + 0.3, 0.35); pop("#c5c-lp2", @@t:c5c-once@@ + 0.5, 0.35); pop("#c5c-lp3", @@t:c5c-once@@ + 0.7, 0.35);
      pop("#c5c-lok", @@t:c5c-press@@, 0.45);
      show("#c5c-r", @@t:c5c-press@@ + 0.4, 0.45, 30);
      pop("#c5c-rk1", @@t:c5c-newk@@ - 0.5, 0.4);
      pop("#c5c-rk2", @@t:c5c-newk@@, 0.45);
      show("#c5c-led", @@t:c5c-newk@@ + 0.4, 0.45, 30);
      gone("#c5c-d2", @@start:c5c@@, 0.01);
      show("#c5c-d2", @@t:c5c-two@@, 0.35, 20);
      pop("#c5c-rx", @@t:c5c-two@@ + 0.3, 0.45);
      /* c5d */
      tl.fromTo("#c5d-all", { scale: 1.35 }, { scale: 1, duration: 0.7, ease: "power3.out", transformOrigin: "20% 60%" }, @@t:c5d-diff@@ - 0.3);
      pop("#c5d-cart", @@start:c5d@@ + 0.1, 0.4);
      pop("#c5d-ka", @@start:c5d@@ + 0.3, 0.4);
      pop("#c5d-bag", @@t:c5d-buy@@, 0.45);
      pop("#c5d-kb", @@t:c5d-newk@@, 0.45);
      sweep("#c5d-la", @@t:c5d-diff@@, 0.5);
      sweep("#c5d-lb", @@t:c5d-diff@@ + 0.2, 0.5);
      pop("#c5d-sa", @@t:c5d-rt@@, 0.45);
      pop("#c5d-sb", @@t:c5d-new@@, 0.45);
      /* c5e */
      tl.fromTo("#w-c5e", { scale: 1 }, { scale: 1.04, duration: @@start:c5f@@ - @@start:c5e@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c5e@@);
      pop("#c5e-be", @@start:c5e@@ + 0.1, 0.4);
      pop("#c5e-mag", @@t:c5e-val@@, 0.45);
      tl.fromTo("#c5e-mag", { x: 0 }, { x: -60, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, @@t:c5e-val@@ + 0.5);
      show("#c5e-ka, #c5e-kb", @@t:c5e-old@@, 0.4, 20);
      show("#c5e-a", @@t:c5e-phone@@ - 0.3, 0.4, 30);
      show("#c5e-b", @@t:c5e-lap@@ - 0.3, 0.4, 30);
      bump("#c5e-bt", @@t:c5e-lap@@ + 0.2, 1.15);
      tl.to("#c5e-b", { x: 60, rotation: 4, duration: 0.3, ease: "back.out(3)" }, @@t:c5e-rej@@);
      pop("#c5e-x", @@t:c5e-rej@@, 0.45);
      pop("#c5e-err", @@t:c5e-rej@@ + 0.2, 0.45);
      bump("#c5e-err", @@t:c5e-same@@, 1.08);
      /* c5f */
      show("#c5f-doc", @@start:c5f@@ + 0.1, 0.5, 40);
      bump("#c5f-doc", @@t:c5f-src@@, 1.03);
      tl.fromTo("#c5f-doc-hl", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.out", transformOrigin: "0% 50%" }, @@t:c5f-hl@@);
      tl.to("#c5f-doc", { scale: 1.06, duration: 1.2, ease: "power2.inOut", transformOrigin: "50% 80%" }, @@t:c5f-intent@@);
      /* c6a */
      tl.fromTo("#w-c6a", { scale: 1 }, { scale: 1.04, duration: @@start:c6b@@ - @@start:c6a@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c6a@@);
      chapterCard("c6a", @@start:c6a@@ + 0.05, @@t:c6a-chip@@);
      bump("#c6a-tile", @@t:c6a-pop@@, 1.08);
      pop("#c6a-gw", @@t:c6a-gw@@, 0.5);
      pop("#c6a-lam", @@t:c6a-lam@@, 0.5);
      pop("#c6a-ddb", @@t:c6a-ddb@@, 0.5);
      /* c6b */
      pop("#c6b-cli", @@start:c6b@@ + 0.1, 0.4);
      pop("#c6b-gw", @@start:c6b@@ + 0.3, 0.4);
      sweep("#c6b-l1", @@start:c6b@@ + 0.5, 0.4);
      tl.fromTo("#c6b-pk", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 340, duration: 1.0, ease: "power2.inOut" }, @@t:c6b-send@@);
      bump("#c6b-pk", @@t:c6b-key@@, 1.15);
      bump("#c6b-gw", @@t:c6b-fwd@@, 1.08);
      sweep("#c6b-l2", @@t:c6b-fwd@@, 0.4);
      tl.to("#c6b-pk", { x: 900, duration: 0.9, ease: "power2.inOut" }, @@t:c6b-fwd@@ + 0.2);
      pop("#c6b-lam", @@t:c6b-lam@@, 0.45);
      tl.fromTo("#c6b-cv", { x: 0 }, { x: -120, duration: 2.0, ease: "power2.inOut" }, @@t:c6b-fwd@@);
      /* c6c */
      show("#c6c-pk", @@start:c6c@@ + 0.1, 0.3, 10);
      pop("#c6c-biz", @@t:c6c-before@@ + 0.3, 0.4); show("#c6c-bizn", @@t:c6c-before@@ + 0.4, 0.4, 12);
      tl.to("#c6c-pk", { x: 120, duration: 0.5, ease: "back.out(2)" }, @@t:c6c-before@@ + 0.6);
      draw("#c6c-probe", @@t:c6c-check@@, 0.5);
      tl.fromTo("#c6c-probe", { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "power2.out", transformOrigin: "50% 0%" }, @@t:c6c-check@@);
      tl.fromTo("#c6c-slot", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, @@t:c6c-store@@);
      pop("#c6c-ddb", @@t:c6c-ddb@@, 0.45);
      show("#c6c-ddbn", @@t:c6c-ddb@@ + 0.15, 0.4, 12);
      gone("#c6c-cv", @@t:c6c-end@@ - 0.2, 0.3);
      show("#c6c-tbl", @@t:c6c-end@@, 0.5, 60);
      /* c6d */
      tl.fromTo("#w-c6d", { scale: 1 }, { scale: 1.04, duration: @@start:c6e@@ - @@start:c6d@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c6d@@);
      show("#c6d-tbl", @@start:c6d@@ + 0.1, 0.45, 40);
      pop("#c6d-lam", @@start:c6d@@ + 0.2, 0.4);
      gone("#c6d-row, #c6d-row-ok, #c6d-row-rs", @@start:c6d@@, 0.01);
      show("#c6d-row", @@t:c6d-rec@@, 0.4, 20);
      pop("#c6d-row-ip", @@t:c6d-proc@@, 0.4);
      pop("#c6d-sp", @@t:c6d-proc@@, 0.3);
      tl.fromTo("#c6d-sp .ico", { rotation: 0 }, { rotation: 720, duration: 3.0, ease: "none" }, @@t:c6d-proc@@);
      pop("#c6d-gw", @@t:c6d-proc@@ + 0.4, 0.4); show("#c6d-gwn", @@t:c6d-proc@@ + 0.5, 0.4, 12);
      bump("#c6d-gw", @@t:c6d-done@@, 1.1);
      gone("#c6d-row-ip, #c6d-sp", @@t:c6d-ok@@ - 0.1, 0.15);
      pop("#c6d-row-ok", @@t:c6d-ok@@, 0.45);
      pop("#c6d-row-rs", @@t:c6d-ok@@ + 0.3, 0.45);
      /* c6e */
      tl.fromTo("#w-c6e", { scale: 1 }, { scale: 1.03, duration: @@start:c6f@@ - @@start:c6e@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c6e@@);
      show("#c6e-tbl", @@start:c6e@@ + 0.05, 0.4, 30);
      pop("#c6e-cli", @@start:c6e@@ + 0.1, 0.4);
      pop("#c6e-lam", @@start:c6e@@ + 0.2, 0.4);
      tl.fromTo("#c6e-pk", { autoAlpha: 0, y: 0 }, { autoAlpha: 1, y: -180, duration: 0.8, ease: "power2.inOut" }, @@t:c6e-req@@);
      tl.to("#c6e-pk", { autoAlpha: 0, duration: 0.2 }, @@t:c6e-req@@ + 0.8);
      bump("#c6e-row", @@t:c6e-req@@ + 0.9, 1.04);
      sweep("#c6e-lg", @@t:c6e-req@@ + 0.4, 0.4);
      pop("#c6e-gw", @@t:c6e-req@@ + 0.5, 0.4);
      tl.to("#c6e-lg, #c6e-gw", { opacity: 0.3, duration: 0.3 }, @@t:c6e-no@@);
      pop("#c6e-ban", @@t:c6e-no@@, 0.45);
      show("#c6e-rc", @@t:c6e-ret@@ - 0.3, 0.3, 10);
      tl.to("#c6e-rc", { x: -1050, y: 130, duration: 1.0, ease: "power2.inOut" }, @@t:c6e-ret@@);
      tl.to("#c6e-rck", { x: -1050, y: 130, duration: 1.0, ease: "power2.inOut" }, @@t:c6e-ret@@);
      pop("#c6e-rck", @@t:c6e-ret@@ - 0.3, 0.3);
      pop("#c6e-lbl", @@t:c6e-saved@@, 0.45);
      /* c6f */
      tl.fromTo("#w-c6f", { scale: 1 }, { scale: 1.05, duration: @@start:c6g@@ - @@start:c6f@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c6f@@);
      pop("#c6f-lam", @@start:c6f@@ + 0.1, 0.45);
      pop("#c6f-pkg", @@t:c6f-pt@@, 0.45);
      tl.fromTo("#c6f-lamw", { autoAlpha: 0, scale: 1.3 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" }, @@t:c6f-pt@@ + 0.2);
      show("#c6f-pt", @@t:c6f-pt@@ + 0.3, 0.45, 20);
      pop("#c6f-lib", @@t:c6f-lib@@, 0.45);
      show("#c6f-in", @@t:c6f-fn@@, 0.4, 16);
      tl.fromTo("#c6f-iu", { autoAlpha: 0, x: -200 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power3.out" }, @@t:c6f-iu@@);
      /* c6g */
      tl.fromTo("#w-c6g", { scale: 1 }, { scale: 1.04, duration: @@start:c7a@@ - @@start:c6g@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c6g@@);
      pop("#c6g-lam", @@start:c6g@@ + 0.1, 0.45);
      pop("#c6g-k", @@t:c6g-k@@, 0.45);
      pop("#c6g-ip", @@t:c6g-ip@@, 0.45);
      pop("#c6g-ok", @@t:c6g-ok@@, 0.45);
      pop("#c6g-ex", @@t:c6g-ex@@, 0.45);
      pop("#c6g-rs", @@t:c6g-rs@@, 0.45);
      tl.fromTo("#c6g-sh", { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)", transformOrigin: "50% 50%" }, @@t:c6g-safe@@);
      tl.fromTo("#c6g-d1", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 360, duration: 0.6, ease: "power2.in" }, @@t:c6g-safe@@ + 0.4);
      tl.to("#c6g-d1", { x: 0, autoAlpha: 0, duration: 0.6, ease: "power2.out" }, @@t:c6g-safe@@ + 1.0);
      tl.fromTo("#c6g-d2", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: -360, duration: 0.6, ease: "power2.in" }, @@t:c6g-dup@@);
      tl.to("#c6g-d2", { x: 0, autoAlpha: 0, duration: 0.6, ease: "power2.out" }, @@t:c6g-dup@@ + 0.6);
      /* c7a */
      tl.fromTo("#w-c7a", { scale: 1 }, { scale: 1.03, duration: @@start:c7b@@ - @@start:c7a@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c7a@@);
      chapterCard("c7a", @@start:c7a@@ + 0.05, @@t:c7a-chip@@);
      bump("#c7a-tile", @@t:c7a-pop@@, 1.08);
      bump("#c7a-ck", @@t:c7a-pop@@ + 0.4, 1.3);
      show("#c7a-tbl", @@t:c7a-chip@@ + 0.15, 0.4, 30);
      pop("#c7a-big", @@t:c7a-ip@@, 0.5);
      tl.to("#c7a-big", { scale: 1.25, duration: 1.2, ease: "power2.out" }, @@t:c7a-ip@@ + 0.5);
      /* c7b */
      tl.fromTo("#w-c7b", { scale: 1 }, { scale: 1.04, duration: @@start:c7c@@ - @@start:c7b@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c7b@@);
      pop("#c7b-lam", @@start:c7b@@ + 0.1, 0.4);
      tl.fromTo("#c7b-p1", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 760, duration: 0.9, ease: "power2.inOut" }, @@t:c7b-first@@);
      gone("#c7b-p1", @@t:c7b-rec@@ - 0.1, 0.2);
      show("#c7b-tbl", @@t:c7b-rec@@, 0.45, 30);
      bump("#c7b-row-ip", @@t:c7b-proc@@, 1.15);
      tl.fromTo("#c7b-p2, #c7b-p3", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 300, duration: 0.8, ease: "power2.in" }, @@t:c7b-stop@@ - 0.8);
      tl.fromTo("#c7b-gate", { autoAlpha: 0, scaleY: 0 }, { autoAlpha: 1, scaleY: 1, duration: 0.3, ease: "power3.in", transformOrigin: "50% 0%" }, @@t:c7b-stop@@);
      pop("#c7b-lock", @@t:c7b-stop@@ + 0.2, 0.4);
      tl.to("#c7b-p2, #c7b-p3", { x: 180, duration: 0.4, ease: "back.out(3)" }, @@t:c7b-stop@@ + 0.05);
      bump("#c7b-lock", @@t:c7b-sim@@, 1.2);
      /* c7c */
      gone("#c7c-row-ok, #c7c-row-rs", @@start:c7c@@, 0.01);
      bump("#c7c-lam", @@t:c7c-done@@, 1.08);
      pop("#c7c-row-rs", @@t:c7c-save@@, 0.4);
      tl.to("#c7c-row-ip", { clipPath: "inset(0% 0% 0% 100%)", duration: 0.3, ease: "power2.in" }, @@t:c7c-ok@@ - 0.2);
      gone("#c7c-row-ip", @@t:c7c-ok@@ + 0.1, 0.05);
      tl.fromTo("#c7c-row-ok", { autoAlpha: 0, clipPath: "inset(0% 100% 0% 0%)" }, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.35, ease: "power2.out" }, @@t:c7c-ok@@);
      pop("#c7c-big", @@t:c7c-ok@@ + 0.2, 0.5);
      tl.to("#c7c-tbl", { scale: 1.08, duration: 1.0, ease: "power2.out" }, @@t:c7c-ok@@);
      /* c7d */
      gone("#c7d-rc", @@start:c7d@@, 0.01);
      tl.fromTo("#c7d-pk", { autoAlpha: 0, x: -240 }, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out" }, @@t:c7d-resend@@);
      bump("#c7d-row", @@t:c7d-find@@, 1.04);
      tl.to("#c7d-pk", { autoAlpha: 0, duration: 0.25 }, @@t:c7d-find@@ + 0.4);
      bump("#c7d-row-ok", @@t:c7d-ok@@, 1.2);
      pop("#c7d-gw", @@t:c7d-again@@ - 0.5, 0.4);
      tl.to("#c7d-gw", { opacity: 0.35, duration: 0.3 }, @@t:c7d-again@@);
      pop("#c7d-ban", @@t:c7d-again@@, 0.4);
      show("#c7d-rc", @@t:c7d-saved@@ - 0.3, 0.3, 10);
      tl.to("#c7d-rc", { x: -1000, y: -200, duration: 0.9, ease: "power2.inOut" }, @@t:c7d-saved@@);
      tl.to("#c7d-rc", { autoAlpha: 0, scale: 0.6, duration: 0.25 }, @@t:c7d-saved@@ + 0.9);
      tl.fromTo("#c7d-all", { scale: 1.12 }, { scale: 1, duration: 0.6, ease: "power3.out", transformOrigin: "50% 0%" }, @@t:c7d-many@@ - 0.8);
      show("#c7d-nl", @@t:c7d-many@@ - 0.5, 0.3, 12);
      show("#c7d-led", @@t:c7d-many@@ - 0.5, 0.4, 20);
      show("#c7d-n-0", @@t:c7d-many@@ + 0.00, 0.12, 12);
      gone("#c7d-n-0", @@t:c7d-many@@ + 0.30, 0.05);
      show("#c7d-n-1", @@t:c7d-many@@ + 0.30, 0.12, 12);
      gone("#c7d-n-1", @@t:c7d-many@@ + 0.60, 0.05);
      show("#c7d-n-2", @@t:c7d-many@@ + 0.60, 0.12, 12);
      gone("#c7d-n-2", @@t:c7d-many@@ + 0.90, 0.05);
      show("#c7d-n-3", @@t:c7d-many@@ + 0.90, 0.12, 12);
      gone("#c7d-n-3", @@t:c7d-many@@ + 1.20, 0.05);
      show("#c7d-n-4", @@t:c7d-many@@ + 1.20, 0.12, 12);
      bump("#c7d-led", @@t:c7d-cons@@, 1.06);
      /* c7e */
      tl.fromTo("#w-c7e", { scale: 1 }, { scale: 1.04, duration: @@start:c8a@@ - @@start:c7e@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c7e@@);
      pop("#c7e-r1", @@start:c7e@@ + 0.1, 0.4);
      pop("#c7e-r2", @@t:c7e-r2@@, 0.45);
      pop("#c7e-ip", @@t:c7e-ip@@, 0.45);
      bump("#c7e-ip", @@t:c7e-mech@@, 1.12);
      pop("#c7e-t1", @@t:c7e-t1@@, 0.45);
      pop("#c7e-t2", @@t:c7e-t2@@, 0.45);
      pop("#c7e-gw", @@t:c7e-no@@ - 0.6, 0.4);
      sweep("#c7e-a1", @@t:c7e-no@@, 0.5);
      sweep("#c7e-a2", @@t:c7e-no@@ + 0.1, 0.4);
      pop("#c7e-x", @@t:c7e-no@@ + 0.5, 0.45);
      bump("#c7e-x", @@t:c7e-se@@, 1.25);
      /* c8a */
      tl.fromTo("#w-c8a", { scale: 1 }, { scale: 1.05, duration: @@start:c8b@@ - @@start:c8a@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c8a@@);
      chapterCard("c8a", @@start:c8a@@ + 0.05, @@t:c8a-chip@@);
      bump("#c8a-tile", @@t:c8a-pop@@, 1.08);
      pop("#c8a-btn", @@t:c8a-chip@@ + 0.2, 0.4);
      pop("#c8a-srv", @@t:c8a-chip@@ + 0.4, 0.4);
      tl.fromTo("#c8a-cur", { autoAlpha: 0, y: 120 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, @@t:c8a-press@@ - 0.6);
      tl.fromTo("#c8a-cur", { scale: 1 }, { scale: 0.84, duration: 0.1, yoyo: true, repeat: 5, ease: "power1.inOut", transformOrigin: "23% 13%", immediateRender: false }, @@t:c8a-press@@);
      bump("#c8a-btn", @@t:c8a-press@@, 1.12);
      tl.fromTo("#c8a-p1, #c8a-p2", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 800, duration: 1.0, ease: "power2.in" }, @@t:c8a-two@@);
      pop("#c8a-same", @@t:c8a-same@@, 0.45);
      /* c8b */
      tl.fromTo("#w-c8b", { scale: 1 }, { scale: 1.03, duration: @@start:c8c@@ - @@start:c8b@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c8b@@);
      show("#c8b-a-n, #c8b-b-n", @@start:c8b@@ + 0.1, 0.4, 16);
      pop("#c8b-a-c1, #c8b-b-c1", @@t:c8b-check@@, 0.4);
      pop("#c8b-a-c2, #c8b-b-c2", @@t:c8b-write@@, 0.4);
      pop("#c8b-a-no, #c8b-b-no", @@t:c8b-none@@, 0.45);
      show("#c8b-nk", @@t:c8b-none@@ + 0.1, 0.4, 16);
      pop("#c8b-a-one, #c8b-b-one", @@t:c8b-first@@, 0.5);
      pop("#c8b-a-c3, #c8b-b-c3", @@t:c8b-two@@ - 0.4, 0.4);
      tl.to("#c8b-a-c3, #c8b-b-c3", { backgroundColor: "var(--accent)", color: "var(--surface)", duration: 0.3 }, @@t:c8b-two@@);
      show("#c8b-led", @@t:c8b-two@@, 0.4, 30);
      pop("#c8b-x2", @@t:c8b-par@@, 0.5, 0.4);
      /* c8c */
      tl.fromTo("#w-c8c", { scale: 1 }, { scale: 1.03, duration: @@start:c8d@@ - @@start:c8c@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c8c@@);
      pop("#c8c-ddb", @@start:c8c@@ + 0.1, 0.4);
      tl.fromTo("#c8c-gate", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, @@t:c8c-atomic@@);
      bump("#c8c-gate", @@t:c8c-atomic@@, 1.08);
      pop("#c8c-cw", @@t:c8c-cw@@, 0.45);
      show("#c8c-code", @@t:c8c-cw@@ + 0.3, 0.45, 30);
      tl.fromTo("#c8c-a, #c8c-b", { autoAlpha: 0, x: -100 }, { autoAlpha: 1, x: 300, duration: 0.8, ease: "power2.in" }, @@t:c8c-only@@);
      tl.to("#c8c-a", { x: 960, duration: 0.6, ease: "power2.inOut" }, @@t:c8c-ok@@ - 0.5);
      gone("#c8c-a", @@t:c8c-ok@@ + 0.1, 0.2);
      show("#c8c-tbl", @@t:c8c-ok@@, 0.4, 20);
      tl.to("#c8c-b", { x: 120, duration: 0.4, ease: "back.out(3)" }, @@t:c8c-no@@);
      pop("#c8c-bx", @@t:c8c-no@@ + 0.1, 0.45);
      /* c8d */
      pop("#c8d-lam", @@start:c8d@@ + 0.1, 0.4);
      pop("#c8d-pt", @@t:c8d-pt@@, 0.45);
      pop("#c8d-ip", @@t:c8d-ip@@, 0.45);
      tl.fromTo("#c8d-p1, #c8d-p2", { autoAlpha: 0, x: 300 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" }, @@t:c8d-sim@@);
      tl.to("#c8d-p1, #c8d-p2", { x: 60, duration: 0.3, ease: "back.out(3)" }, @@t:c8d-sim@@ + 0.6);
      pop("#c8d-simple", @@t:c8d-id@@ - 0.4, 0.4);
      sweep("#c8d-strike", @@t:c8d-id@@ + 0.6, 0.4);
      tl.fromTo("#c8d-all", { scale: 1.15 }, { scale: 1, duration: 0.6, ease: "power3.out", transformOrigin: "50% 40%" }, @@t:c8d-c1@@ - 0.4);
      pop("#c8d-c1", @@t:c8d-c1@@, 0.45);
      pop("#c8d-c2", @@t:c8d-c2@@, 0.45);
      pop("#c8d-c3", @@t:c8d-c3@@, 0.45);
      /* c9a */
      tl.fromTo("#w-c9a", { scale: 1 }, { scale: 1.03, duration: @@start:c9b@@ - @@start:c9a@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c9a@@);
      chapterCard("c9a", @@start:c9a@@ + 0.05, @@t:c9a-chip@@);
      bump("#c9a-tile", @@t:c9a-pop@@, 1.08);
      tl.fromTo("#c9a-cloud", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, @@t:c9a-chip@@ + 0.2);
      pop("#c9a-aws", @@t:c9a-chip@@ + 0.3, 0.4);
      pop("#c9a-gw", @@t:c9a-chip@@ + 0.4, 0.4); pop("#c9a-lam", @@t:c9a-chip@@ + 0.55, 0.4); pop("#c9a-ddb", @@t:c9a-ddb@@, 0.4);
      pop("#c9a-sh", @@t:c9a-ddb@@ + 0.3, 0.45);
      tl.fromTo("#c9a-all", { scale: 1.2 }, { scale: 1, duration: 0.7, ease: "power3.out", transformOrigin: "35% 50%" }, @@t:c9a-out@@ - 0.2);
      pop("#c9a-pp", @@t:c9a-out@@, 0.45); show("#c9a-ppn", @@t:c9a-out@@ + 0.1, 0.4, 12);
      pop("#c9a-q", @@t:c9a-out@@ + 0.4, 0.45);
      /* c9b */
      tl.fromTo("#w-c9b", { scale: 1 }, { scale: 1.04, duration: @@start:c9c@@ - @@start:c9b@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c9b@@);
      pop("#c9b-lam", @@start:c9b@@ + 0.1, 0.4);
      sweep("#c9b-l", @@start:c9b@@ + 0.3, 0.4);
      pop("#c9b-pp", @@start:c9b@@ + 0.5, 0.4); show("#c9b-ppn", @@start:c9b@@ + 0.6, 0.4, 12);
      tl.fromTo("#c9b-pk", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 900, duration: 1.0, ease: "power2.inOut" }, @@t:c9b-send@@);
      gone("#c9b-pk", @@t:c9b-send@@ + 1.1, 0.2);
      pop("#c9b-ok", @@t:c9b-ok@@, 0.45);
      show("#c9b-led", @@t:c9b-ok@@ + 0.2, 0.4, 20);
      tl.fromTo("#c9b-lc", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, @@t:c9b-to@@);
      gone("#c9b-l", @@t:c9b-to@@, 0.2);
      pop("#c9b-to", @@t:c9b-to@@, 0.45);
      /* c9c */
      tl.fromTo("#w-c9c", { scale: 1 }, { scale: 1.03, duration: @@start:c9d@@ - @@start:c9c@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c9c@@);
      pop("#c9c-lam", @@start:c9c@@ + 0.1, 0.4);
      pop("#c9c-ip", @@t:c9c-own@@, 0.45);
      pop("#c9c-q", @@t:c9c-fail@@, 0.5);
      show("#c9c-led", @@t:c9c-fail@@ + 0.4, 0.4, 20);
      gone("#c9c-r2", @@start:c9c@@, 0.01);
      tl.fromTo("#c9c-pk", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 340, duration: 0.8, ease: "power2.in" }, @@t:c9c-new@@);
      gone("#c9c-pk", @@t:c9c-new@@ + 0.85, 0.1);
      show("#c9c-r2", @@t:c9c-again@@, 0.35, 20);
      pop("#c9c-x2", @@t:c9c-again@@ + 0.2, 0.5, 0.4);
      tl.to("#c9c-led", { scale: 1.08, duration: 0.8, ease: "power2.out" }, @@t:c9c-again@@);
      /* c9d */
      tl.fromTo("#w-c9d", { scale: 1 }, { scale: 1.03, duration: @@start:c9e@@ - @@start:c9d@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c9d@@);
      pop("#c9d-lam", @@start:c9d@@ + 0.1, 0.4);
      sweep("#c9d-l", @@start:c9d@@ + 0.3, 0.4);
      pop("#c9d-pp", @@t:c9d-support@@, 0.4); show("#c9d-ppn", @@t:c9d-support@@ + 0.1, 0.4, 12);
      pop("#c9d-k1", @@t:c9d-key@@, 0.45);
      tl.fromTo("#c9d-pk", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 420, duration: 1.0, ease: "power2.inOut" }, @@t:c9d-id@@);
      gone("#c9d-pk", @@t:c9d-recv@@, 0.2);
      pop("#c9d-k2", @@t:c9d-recv@@, 0.45);
      pop("#c9d-eq", @@t:c9d-dup@@, 0.45);
      show("#c9d-led", @@t:c9d-dup@@ + 0.3, 0.4, 20);
      pop("#c9d-rc", @@t:c9d-prev@@ - 0.3, 0.4);
      tl.to("#c9d-rc", { x: -1100, y: -200, duration: 1.0, ease: "power2.inOut" }, @@t:c9d-prev@@ + 0.3);
      pop("#c9d-prev", @@t:c9d-prev@@, 0.45);
      /* c9e */
      pop("#c9e-s1", @@t:c9e-s1@@, 0.45); show("#c9e-l1", @@t:c9e-s1@@ + 0.1, 0.4, 12);
      pop("#c9e-s2", @@t:c9e-s2@@, 0.45); show("#c9e-l2", @@t:c9e-s2@@ + 0.1, 0.4, 12);
      pop("#c9e-s3", @@t:c9e-s3@@, 0.45); show("#c9e-l3", @@t:c9e-s3@@ + 0.1, 0.4, 12);
      pop("#c9e-rt", @@t:c9e-before@@, 0.45);
      tl.to("#c9e-s1, #c9e-s2, #c9e-s3", { backgroundColor: "var(--term-text)", duration: 0.3, stagger: 0.25 }, @@t:c9e-before@@ + 0.4);
      tl.to("#c9e-rt", { backgroundColor: "var(--term-text)", color: "var(--ink)", duration: 0.3 }, @@t:c9e-before@@ + 1.3);
      tl.fromTo("#c9e-all", { scale: 1.12 }, { scale: 1, duration: 0.6, ease: "power3.out", transformOrigin: "50% 30%" }, @@t:c9e-each@@ - 0.6);
      pop("#c9e-c0", @@t:c9e-each@@ - 0.4 + 0, 0.4);
      pop("#c9e-c1", @@t:c9e-each@@ - 0.4 + 0.1, 0.4);
      pop("#c9e-c2", @@t:c9e-each@@ - 0.4 + 0.2, 0.4);
      pop("#c9e-c3", @@t:c9e-each@@ - 0.4 + 0.30000000000000004, 0.4);
      pop("#c9e-c4", @@t:c9e-each@@ - 0.4 + 0.4, 0.4);
      pop("#c9e-b0", @@t:c9e-fit@@ - 1.2 + 0, 0.4);
      pop("#c9e-b1", @@t:c9e-fit@@ - 1.2 + 0.25, 0.4);
      pop("#c9e-b2", @@t:c9e-fit@@ - 1.2 + 0.5, 0.4);
      pop("#c9e-b3", @@t:c9e-fit@@ - 1.2 + 0.75, 0.4);
      pop("#c9e-b4", @@t:c9e-fit@@ - 1.2 + 1, 0.4);
      /* c10a */
      tl.fromTo("#w-c10a", { scale: 1 }, { scale: 1.03, duration: @@start:c10b@@ - @@start:c10a@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c10a@@);
      chapterCard("c10a", @@start:c10a@@ + 0.05, @@t:c10a-chip@@);
      bump("#c10a-tile", @@t:c10a-pop@@, 1.08);
      pop("#c10a-ord", @@t:c10a-chip@@ + 0.2, 0.45);
      pop("#c10a-j1", @@t:c10a-mail@@, 0.4); show("#c10a-n1", @@t:c10a-mail@@ + 0.1, 0.4, 12);
      pop("#c10a-j2", @@t:c10a-inv@@, 0.4); show("#c10a-n2", @@t:c10a-inv@@ + 0.1, 0.4, 12);
      pop("#c10a-j3", @@t:c10a-ship@@, 0.4); show("#c10a-n3", @@t:c10a-ship@@ + 0.1, 0.4, 12);
      tl.fromTo("#c10a-lane", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, @@t:c10a-async@@);
      pop("#c10a-sqs", @@t:c10a-sqs@@, 0.45); show("#c10a-sqn", @@t:c10a-sqs@@ + 0.1, 0.4, 12);
      tl.fromTo("#c10a-m0", { autoAlpha: 0, y: -340, x: -540 }, { autoAlpha: 1, y: 0, x: 0, duration: 0.7, ease: "power2.in" }, @@t:c10a-async@@ + 0.2);
      tl.fromTo("#c10a-m1", { autoAlpha: 0, y: -340, x: -220 }, { autoAlpha: 1, y: 0, x: 0, duration: 0.7, ease: "power2.in" }, @@t:c10a-async@@ + 0.5);
      tl.fromTo("#c10a-m2", { autoAlpha: 0, y: -340, x: 100 }, { autoAlpha: 1, y: 0, x: 0, duration: 0.7, ease: "power2.in" }, @@t:c10a-async@@ + 0.8);
      /* c10b */
      tl.fromTo("#w-c10b", { scale: 1 }, { scale: 1.03, duration: @@start:c10c@@ - @@start:c10b@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c10b@@);
      tl.fromTo("#c10b-lane", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, @@start:c10b@@ + 0.1);
      pop("#c10b-sqs", @@start:c10b@@ + 0.2, 0.4);
      pop("#c10b-wk", @@t:c10b-note@@, 0.4); show("#c10b-wkn", @@t:c10b-note@@ + 0.1, 0.4, 12);
      pop("#c10b-std", @@t:c10b-std@@, 0.45);
      pop("#c10b-alo", @@t:c10b-alo@@, 0.45);
      tl.fromTo("#c10b-m1", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 640, duration: 1.0, ease: "power2.inOut" }, @@t:c10b-msg@@);
      tl.to("#c10b-m1", { x: 1000, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, @@t:c10b-msg@@ + 1.0);
      tl.fromTo("#c10b-m2", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 640, duration: 1.0, ease: "power2.inOut" }, @@t:c10b-many@@);
      pop("#c10b-x2", @@t:c10b-many@@ + 0.6, 0.45);
      /* c10c */
      tl.fromTo("#w-c10c", { scale: 1 }, { scale: 1.04, duration: @@start:c10d@@ - @@start:c10c@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c10c@@);
      pop("#c10c-wk", @@start:c10c@@ + 0.1, 0.4); show("#c10c-wkn", @@start:c10c@@ + 0.2, 0.4, 12);
      show("#c10c-tbl", @@t:c10c-own@@, 0.45, 20);
      gone("#c10c-r1", @@start:c10c@@, 0.01);
      tl.fromTo("#c10c-m1", { autoAlpha: 0, x: -100 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" }, @@t:c10c-save@@);
      show("#c10c-r1", @@t:c10c-id@@, 0.35, 16);
      pop("#c10c-mail", @@t:c10c-id@@ + 0.3, 0.4);
      pop("#c10c-ok", @@t:c10c-id@@ + 0.5, 0.4);
      tl.fromTo("#c10c-m2", { autoAlpha: 0, x: -100 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" }, @@t:c10c-no@@ - 0.5);
      pop("#c10c-dup", @@t:c10c-no@@, 0.4);
      pop("#c10c-skip", @@t:c10c-same@@, 0.45);
      /* c10d */
      tl.fromTo("#w-c10d", { scale: 1 }, { scale: 1.04, duration: @@start:c10e@@ - @@start:c10d@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c10d@@);
      pop("#c10d-app", @@start:c10d@@ + 0.1, 0.4); show("#c10d-appn", @@start:c10d@@ + 0.2, 0.4, 12);
      tl.set("#c10d-l", { rotation: -14, transformOrigin: "0% 50%" }, @@start:c10d@@);
      pop("#c10d-db", @@t:c10d-db@@, 0.45);
      sweep("#c10d-l", @@t:c10d-db@@ + 0.2, 0.4);
      pop("#c10d-sqs", @@t:c10d-msg@@, 0.45);
      pop("#c10d-dbok", @@t:c10d-ok@@, 0.45);
      tl.fromTo("#c10d-lq", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, @@t:c10d-fail@@ - 0.4);
      pop("#c10d-x", @@t:c10d-fail@@, 0.45);
      pop("#c10d-w1, #c10d-w2", @@t:c10d-back@@ - 0.3, 0.4);
      pop("#c10d-q1, #c10d-q2", @@t:c10d-back@@ + 0.3, 0.45);
      /* c10e */
      tl.fromTo("#w-c10e", { scale: 1 }, { scale: 1.04, duration: @@start:c10f@@ - @@start:c10e@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c10e@@);
      pop("#c10e-pat", @@t:c10e-pat@@, 0.45);
      pop("#c10e-db", @@t:c10e-idea@@, 0.4);
      show("#c10e-o", @@t:c10e-ord@@, 0.4, 20);
      show("#c10e-x", @@t:c10e-ev@@, 0.4, 20);
      gone("#c10e-o-r, #c10e-x-r", @@start:c10e@@, 0.01);
      tl.fromTo("#c10e-tx", { autoAlpha: 0, scale: 1.05 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out" }, @@t:c10e-tx@@);
      show("#c10e-o-r, #c10e-x-r", @@t:c10e-tx@@ + 0.2, 0.35, 16);
      tl.to("#c10e-o-r, #c10e-x-r", { backgroundColor: "color-mix(in srgb, var(--term-text) 30%, transparent)", duration: 0.3 }, @@t:c10e-tx@@ + 0.6);
      pop("#c10e-one", @@t:c10e-tx@@ + 0.6, 0.45);
      /* c10f */
      show("#c10f-ob", @@start:c10f@@ + 0.1, 0.4, 20);
      pop("#c10f-lam", @@t:c10f-read@@, 0.45);
      sweep("#c10f-l1", @@t:c10f-read@@ + 0.2, 0.3);
      pop("#c10f-sqs", @@t:c10f-send@@ - 0.3, 0.4);
      sweep("#c10f-l2", @@t:c10f-send@@ - 0.2, 0.3);
      tl.fromTo("#c10f-ev", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 260, duration: 0.8, ease: "power2.inOut" }, @@t:c10f-send@@);
      pop("#c10f-s1", @@t:c10f-sync@@, 0.4); pop("#c10f-s2", @@t:c10f-sync@@ + 0.2, 0.4);
      tl.to("#c10f-s1, #c10f-s2", { backgroundColor: "var(--term-text)", duration: 0.3 }, @@t:c10f-sync@@ + 0.6);
      gone("#c10f-all", @@t:c10f-guide@@ - 0.3, 0.3);
      show("#c10f-doc", @@t:c10f-guide@@, 0.45, 30);
      pop("#c10f-g1", @@t:c10f-rds@@, 0.4); pop("#c10f-g2", @@t:c10f-lam@@, 0.4); pop("#c10f-g3", @@t:c10f-sqs@@, 0.4);
      /* c11a */
      tl.fromTo("#w-c11a", { scale: 1 }, { scale: 1.04, duration: @@start:c11b@@ - @@start:c11a@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c11a@@);
      chapterCard("c11a", @@start:c11a@@ + 0.05, @@t:c11a-chip@@);
      bump("#c11a-tile", @@t:c11a-pop@@, 1.08);
      tl.fromTo("#c11a-sh", { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(2)", transformOrigin: "50% 50%" }, @@t:c11a-chip@@ + 0.2);
      pop("#c11a-lbl", @@t:c11a-chip@@ + 0.4, 0.4);
      draw("#c11a-cp", @@t:c11a-no@@, 0.4);
      tl.fromTo("#c11a-sh", { x: -8 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: "none", immediateRender: false }, @@t:c11a-no@@);
      /* c11b */
      tl.fromTo("#w-c11b", { scale: 1 }, { scale: 1.03, duration: @@start:c11c@@ - @@start:c11b@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c11b@@);
      pop("#c11b-tm", @@t:c11b-ttlb@@, 0.45); show("#c11b-ttl", @@t:c11b-ttlb@@ + 0.1, 0.4, 16);
      show("#c11b-bar", @@t:c11b-ttlb@@ + 0.3, 0.4, 20);
      tl.fromTo("#c11b-fill", { scaleX: 0 }, { scaleX: 0.5, duration: 0.5, ease: "power2.out" }, @@t:c11b-ttlb@@ + 0.5);
      pop("#c11b-knob", @@t:c11b-ttlb@@ + 0.6, 0.4);
      tl.to("#c11b-knob", { x: -700, duration: 0.6, ease: "power2.inOut" }, @@t:c11b-early@@);
      tl.to("#c11b-fill", { scaleX: 0.04, duration: 0.6, ease: "power2.inOut" }, @@t:c11b-early@@);
      show("#c11b-short", @@t:c11b-early@@, 0.3, 12);
      pop("#c11b-old", @@t:c11b-oldr@@, 0.4);
      pop("#c11b-new", @@t:c11b-oldr@@ + 0.4, 0.45);
      gone("#c11b-old, #c11b-new", @@t:c11b-forever@@ - 0.3, 0.25);
      tl.to("#c11b-knob", { x: 740, duration: 0.8, ease: "power2.inOut" }, @@t:c11b-forever@@);
      tl.to("#c11b-fill", { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, @@t:c11b-forever@@);
      show("#c11b-long", @@t:c11b-forever@@, 0.3, 12);
      show("#c11b-tbl", @@t:c11b-forever@@ + 0.3, 0.4, 20);
      tl.fromTo("#c11b-pile .sk", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15, stagger: 0.12 }, @@t:c11b-cost@@);
      /* c11c */
      tl.fromTo("#w-c11c", { scale: 1 }, { scale: 1.02, duration: @@start:c11d@@ - @@start:c11c@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c11c@@);
      pop("#c11c-lam", @@start:c11c@@ + 0.1, 0.4);
      pop("#c11c-ca", @@t:c11c-to@@, 0.45);
      tl.to("#c11c-lam", { opacity: 0.45, duration: 0.4 }, @@t:c11c-to@@ + 0.3);
      pop("#c11c-ip", @@t:c11c-ip@@, 0.45);
      tl.fromTo("#c11c-all", { scale: 1.1 }, { scale: 1, duration: 0.6, ease: "power3.out", transformOrigin: "50% 30%" }, @@t:c11c-when@@ - 0.4);
      pop("#c11c-root", @@t:c11c-when@@, 0.45);
      sweep("#c11c-b1", @@t:c11c-fail@@ - 0.2, 0.3); pop("#c11c-o1", @@t:c11c-fail@@, 0.4);
      tl.fromTo("#c11c-b2", { scaleY: 0 }, { scaleY: 1, duration: 0.3, transformOrigin: "50% 0%" }, @@t:c11c-rt@@ - 0.2); pop("#c11c-o2", @@t:c11c-rt@@, 0.4);
      sweep("#c11c-b3", @@t:c11c-ext@@ - 0.2, 0.3); pop("#c11c-o3", @@t:c11c-ext@@, 0.4);
      /* c11d */
      tl.fromTo("#w-c11d", { scale: 1 }, { scale: 1.04, duration: @@start:c11e@@ - @@start:c11d@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c11d@@);
      show("#c11d-ka, #c11d-kb", @@t:c11d-same@@, 0.4, 20);
      pop("#c11d-eq", @@t:c11d-same@@ + 0.3, 0.4);
      gone("#c11d-ap, #c11d-bp, #c11d-at, #c11d-bt, #c11d-ai, #c11d-bi", @@start:c11d@@, 0.01);
      show("#c11d-a", @@t:c11d-diff@@, 0.4, 20);
      show("#c11d-b", @@t:c11d-diff@@ + 0.3, 0.4, 20);
      pop("#c11d-ai", @@t:c11d-phone@@ - 1.2, 0.4); show("#c11d-ap", @@t:c11d-phone@@ - 1.0, 0.4, 12);
      show("#c11d-at", @@t:c11d-phone@@, 0.4, 12);
      pop("#c11d-bi", @@t:c11d-30@@ - 0.6, 0.4);
      show("#c11d-bp", @@t:c11d-30@@, 0.35, 12);
      show("#c11d-bt", @@t:c11d-lap@@, 0.35, 12);
      tl.to("#c11d-b", { x: 40, rotation: 3, duration: 0.3, ease: "back.out(3)" }, @@t:c11d-rej@@);
      pop("#c11d-x", @@t:c11d-rej@@, 0.45);
      pop("#c11d-rej", @@t:c11d-rej@@ + 0.2, 0.45);
      /* c11e */
      tl.fromTo("#w-c11e", { scale: 1 }, { scale: 1.05, duration: @@start:c12a@@ - @@start:c11e@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c11e@@);
      pop("#c11e-key", @@start:c11e@@ + 0.1, 0.45);
      tl.fromTo("#c11e-c1", { autoAlpha: 0, x: -120 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: "power3.out" }, @@t:c11e-c1@@);
      tl.fromTo("#c11e-c2", { autoAlpha: 0, x: 120 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: "power3.out" }, @@t:c11e-c2@@);
      tl.fromTo("#c11e-c3", { autoAlpha: 0, x: -120 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: "power3.out" }, @@t:c11e-c3@@);
      tl.fromTo("#c11e-c4", { autoAlpha: 0, x: 120 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: "power3.out" }, @@t:c11e-c4@@);
      tl.fromTo("#c11e-sh", { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)", transformOrigin: "50% 50%" }, @@t:c11e-c4@@ + 0.5);
      /* c12a */
      tl.fromTo("#w-c12a", { scale: 1 }, { scale: 1.05, duration: @@start:c12b@@ - @@start:c12a@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c12a@@);
      chapterCard("c12a", @@start:c12a@@ + 0.05, @@t:c12a-chip@@);
      bump("#c12a-tile", @@t:c12a-pop@@, 1.08);
      tl.fromTo("#c12a-dots .rdot", { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.25, stagger: 0.1, ease: "back.out(2)" }, @@t:c12a-cnt@@);
      pop("#c12a-tag", @@t:c12a-key@@ - 0.3, 0.45);
      tl.to("#c12a-d0", { x: 640, y: 490, scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, @@t:c12a-key@@ + 0.00);
      tl.to("#c12a-d1", { x: 490, y: 350, scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, @@t:c12a-key@@ + 0.05);
      tl.to("#c12a-d2", { x: 340, y: 210, scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, @@t:c12a-key@@ + 0.10);
      tl.to("#c12a-d3", { x: 190, y: 420, scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, @@t:c12a-key@@ + 0.15);
      tl.to("#c12a-d4", { x: 40, y: 280, scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, @@t:c12a-key@@ + 0.20);
      tl.to("#c12a-d5", { x: -110, y: 490, scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, @@t:c12a-key@@ + 0.25);
      tl.to("#c12a-d6", { x: -260, y: 350, scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, @@t:c12a-key@@ + 0.30);
      tl.to("#c12a-d7", { x: -410, y: 210, scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, @@t:c12a-key@@ + 0.35);
      tl.to("#c12a-d8", { x: -560, y: 420, scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, @@t:c12a-key@@ + 0.40);
      tl.to("#c12a-d9", { x: -710, y: 280, scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, @@t:c12a-key@@ + 0.45);
      bump("#c12a-tag", @@t:c12a-key@@ + 0.8, 1.1);
      /* c12b */
      tl.fromTo("#w-c12b", { scale: 1 }, { scale: 1.03, duration: @@start:c12c@@ - @@start:c12b@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c12b@@);
      pop("#c12b-gw", @@t:c12b-gw@@, 0.45);
      pop("#c12b-dot", @@t:c12b-gw@@ + 0.2, 0.3);
      tl.to("#c12b-dot", { x: 200, duration: 0.5, ease: "power2.inOut" }, @@t:c12b-gw@@ + 0.5);
      sweep("#c12b-l1", @@t:c12b-lam@@ - 0.3, 0.3); pop("#c12b-lam", @@t:c12b-lam@@, 0.45);
      tl.to("#c12b-dot", { x: 720, duration: 0.5, ease: "power2.inOut" }, @@t:c12b-lam@@ + 0.1);
      sweep("#c12b-l2", @@t:c12b-ddb@@ - 0.3, 0.3); pop("#c12b-ddb", @@t:c12b-ddb@@, 0.45);
      tl.to("#c12b-dot", { x: 1240, duration: 0.5, ease: "power2.inOut" }, @@t:c12b-ddb@@ + 0.1);
      tl.to("#c12b-dot", { autoAlpha: 0, scale: 0.4, duration: 0.25 }, @@t:c12b-ddb@@ + 0.6);
      pop("#c12b-pt", @@t:c12b-pt@@, 0.45);
      /* c12c */
      tl.fromTo("#w-c12c", { scale: 1 }, { scale: 1.02, duration: @@start:c12d@@ - @@start:c12c@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c12c@@);
      gone("#c12c-ppn, #c12c-pay, #c12c-l4, #c12c-sh, #c12c-rec, #c12c-sqs, #c12c-l5, #c12c-wk, #c12c-eid", @@start:c12c@@, 0.01);
      tl.fromTo("#c12c-all", { scale: 1 }, { scale: 0.86, duration: 0.8, ease: "power3.inOut", transformOrigin: "50% 40%" }, @@t:c12c-pay@@ - 0.4);
      sweep("#c12c-l4", @@t:c12c-pay@@ - 0.2, 0.3); pop("#c12c-pay", @@t:c12c-pay@@, 0.45);
      show("#c12c-ppn", @@t:c12c-pay@@ + 0.1, 0.4, 12);
      pop("#c12c-sh", @@t:c12c-pay@@ + 0.5, 0.4);
      pop("#c12c-rec", @@t:c12c-rec@@, 0.45);
      pop("#c12c-sqs", @@t:c12c-back@@, 0.45);
      sweep("#c12c-l5", @@t:c12c-back@@ + 0.3, 0.3); pop("#c12c-wk", @@t:c12c-back@@ + 0.5, 0.4);
      pop("#c12c-eid", @@t:c12c-re@@, 0.45);
      /* c12d */
      tl.fromTo("#w-c12d", { scale: 1 }, { scale: 1.04, duration: @@start:c12e@@ - @@start:c12d@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c12d@@);
      pop("#c12d-ok", @@t:c12d-rel@@, 0.45);
      tl.fromTo("#c12d-rain .rdot", { autoAlpha: 0, y: -380 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.in" }, @@t:c12d-many@@ - 1.2);
      pop("#c12d-t1", @@t:c12d-many@@, 0.4); pop("#c12d-t2", @@t:c12d-many@@ + 0.25, 0.4);
      /* c12e */
      tl.fromTo("#w-c12e", { scale: 1 }, { scale: 1.05, duration: @@start:c12f@@ - @@start:c12e@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c12e@@);
      tl.fromTo("#c12e-dots .rdot", { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.25, stagger: 0.06, ease: "back.out(2)" }, @@start:c12e@@ + 0.1);
      pop("#c12e-new", @@t:c12e-new@@ - 0.2, 0.45); show("#c12e-nl", @@t:c12e-new@@, 0.4, 20);
      tl.to("#c12e-d0", { x: 160, y: -340, duration: 0.6, ease: "power2.inOut" }, @@t:c12e-new@@ + 0.3);
      pop("#c12e-rt", @@t:c12e-rt@@ - 0.2, 0.45); show("#c12e-rl", @@t:c12e-rt@@, 0.4, 20);
      tl.to("#c12e-d1", { x: 910, y: -340, duration: 0.6, ease: "power2.inOut" }, @@t:c12e-rt@@ + 0.20);
      tl.to("#c12e-d2", { x: 780, y: -340, duration: 0.6, ease: "power2.inOut" }, @@t:c12e-rt@@ + 0.25);
      tl.to("#c12e-d3", { x: 650, y: -340, duration: 0.6, ease: "power2.inOut" }, @@t:c12e-rt@@ + 0.30);
      tl.to("#c12e-d4", { x: 520, y: -340, duration: 0.6, ease: "power2.inOut" }, @@t:c12e-rt@@ + 0.35);
      tl.to("#c12e-d5", { x: 390, y: -340, duration: 0.6, ease: "power2.inOut" }, @@t:c12e-rt@@ + 0.40);
      tl.to("#c12e-d6", { x: 260, y: -340, duration: 0.6, ease: "power2.inOut" }, @@t:c12e-rt@@ + 0.45);
      tl.to("#c12e-d7", { x: 130, y: -340, duration: 0.6, ease: "power2.inOut" }, @@t:c12e-rt@@ + 0.50);
      tl.to("#c12e-d8", { x: 0, y: -340, duration: 0.6, ease: "power2.inOut" }, @@t:c12e-rt@@ + 0.55);
      tl.to("#c12e-d9", { x: -130, y: -340, duration: 0.6, ease: "power2.inOut" }, @@t:c12e-rt@@ + 0.60);
      tl.to("#c12e-dots .rdot:not(#c12e-d0)", { scale: 0, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, @@t:c12e-old@@);
      pop("#c12e-ok", @@t:c12e-old@@ + 0.1, 0.5);
      tl.fromTo("#c12e-rays .ray", { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, @@t:c12e-old@@ + 0.2);
      /* c12f */
      tl.fromTo("#w-c12f", { scale: 1 }, { scale: 1.03, duration: @@start:ec@@ - @@start:c12f@@, ease: "none", transformOrigin: "50% 50%" }, @@start:c12f@@);
      pop("#c12f-logo", @@t:c12f-name@@ - 0.2, 0.5);
      show("#c12f-pill", @@t:c12f-ser@@ - 0.3, 0.4, 20);
      pop("#c12f-ok", @@t:c12f-ser@@ + 0.4, 0.4);
      tl.set({}, {}, @@end@@);
