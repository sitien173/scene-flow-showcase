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
