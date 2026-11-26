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
