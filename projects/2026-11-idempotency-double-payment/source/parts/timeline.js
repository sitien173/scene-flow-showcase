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

      /* hook: the phone pops, the price pill shows, the pay button is pressed on each press, the loader turns
         while the second press waits, then the second charge chip and the starburst "2" land */
      pop("#h1-phone", @@start:h1@@, 0.5);
      show("#h1-price", @@t:h1-price@@, 0.4, 16);
      bump("#h1-btn", @@t:h1-pay@@, 1.12);
      bump("#h1-btn", @@t:h1-second@@, 1.12);
      tl.fromTo("#h1-load", { rotation: 0 }, { rotation: 720, duration: 3.5, ease: "none" }, @@t:h1-second@@);
      show("#h1-two", @@t:h1-two@@, 0.4, 16);
      pop("#h1-burst", @@t:h1-two@@, 0.5);
      pop("#h1-num", @@t:h1-two@@, 0.5);
      tl.to("#w-h1", { scale: 1.06, duration: 14, ease: "none" }, @@start:h1@@);

      /* p1: the request goes out, the response breaks: SUCCESS at the provider, TIMEOUT where the response is lost */
      show("#p1-phone", @@start:p1@@, 0.4, 16);
      show("#p1-server", @@start:p1@@ + 0.3, 0.4, 16);
      show("#p1-gate", @@start:p1@@ + 0.6, 0.4, 16);
      pop("#p1-success", @@t:p1-success@@, 0.45);
      pop("#p1-timeout", @@t:p1-lost@@, 0.45);
      pop("#p1-unknown-chip", @@t:p1-unknown@@, 0.5);

      /* r1: the second request is charged as new, the statement shows the two debits and the total */
      show("#r1-gate", @@start:r1@@, 0.4, 24);
      pop("#r1-tag", @@t:r1-stamp@@ - 1.2, 0.45);
      show("#r1-stmt", @@t:r1-stamp@@ - 0.6, 0.45, 24);
      pop("#r1-total", @@t:r1-stamp@@, 0.45);

      /* c1: chapter opener on the word "nguyên" */
      pop("#c1-tile", @@start:c1@@, 0.5);
      show("#c1-title", @@t:c1-principle@@, 0.4, 24);
      pop("#c1-burst", @@start:c1@@, 0.5);
      pop("#c1-mascot", @@start:c1@@, 0.5);
      tl.fromTo("#c1-tile", { rotation: 0 }, { rotation: 90, duration: 4, ease: "none" }, @@start:c1@@);

      /* d1: three identical requests go in, one result comes out; the two extra requests fade */
      show("#d1-r1", @@start:d1@@, 0.4, 16);
      show("#d1-r2", @@start:d1@@ + 0.3, 0.4, 16);
      show("#d1-r3", @@start:d1@@ + 0.6, 0.4, 16);
      show("#d1-x3", @@start:d1@@ + 0.6, 0.4, 16);
      show("#d1-sys", @@start:d1@@ + 1.2, 0.4, 16);
      pop("#d1-res", @@t:d1-result@@, 0.5);
      pop("#d1-x1", @@t:d1-result@@, 0.45);

      /* k1: the key tile pops on its word, the key chip types in */
      pop("#k1-key", @@start:k1@@, 0.5);
      show("#k1-chip", @@t:k1-key@@, 0.4, 16);
      show("#k1-label", @@t:k1-key@@ + 0.3, 0.4, 16);

      /* k2: the first request times out, the second request carries the same key, grouped as one */
      show("#k2-g1", @@start:k2@@, 0.4, 16);
      pop("#k2-timeout", @@t:k2-timeout@@, 0.45);
      show("#k2-g2", @@t:k2-same@@, 0.4, 16);
      pop("#k2-eq", @@t:k2-same@@ + 0.2, 0.4);
      show("#k2-new", @@start:k2@@ + 4, 0.4, 16);

      /* a1: the architecture builds up on its words, the Powertools chip on the Lambda tile */
      show("#a1-phone", @@start:a1@@, 0.4, 16);
      pop("#a1-gw", @@t:a1-gateway@@, 0.45);
      pop("#a1-lambda", @@t:a1-lambda@@, 0.45);
      show("#a1-powertools", @@t:a1-lambda@@ + 0.4, 0.4, 16);
      pop("#a1-db", @@t:a1-dynamo@@, 0.45);
      show("#a1-state", @@t:a1-dynamo@@ + 0.4, 0.4, 16);
      show("#a1-title", @@start:a1@@, 0.4, 24);

      /* w1: the first request inserts a row: INPROGRESS, one charge, then COMPLETED with the stored response */
      show("#w1-table", @@start:w1@@, 0.4, 16);
      pop("#w1-inprog", @@t:w1-first@@, 0.45);
      show("#w1-row", @@t:w1-first@@ + 0.2, 0.4, 16);
      show("#w1-charge", @@t:w1-run@@, 0.4, 16);
      pop("#w1-done", @@t:w1-done@@, 0.45);
      pop("#w1-resp", @@t:w1-done@@ + 0.3, 0.45);
      tl.fromTo("#w-w1", { scale: 1 }, { scale: 1.04, duration: 6, ease: "none" }, @@start:w1@@);

      /* x1: the same key hits the COMPLETED row; the provider is skipped; the stored response comes back */
      show("#x1-req", @@start:x1@@, 0.4, 16);
      pop("#x1-key", @@t:x1-check@@, 0.45);
      pop("#x1-complete", @@t:x1-found@@, 0.45);
      pop("#x1-stop", @@t:x1-stop@@, 0.45);
      pop("#x1-resp", @@t:x1-return@@, 0.45);

      /* g1: the backend sends the same key to the provider; one ledger line */
      show("#g1-lambda", @@start:g1@@, 0.4, 24);
      pop("#g1-header", @@t:g1-key@@, 0.45);
      show("#g1-gate", @@t:g1-key@@ + 0.5, 0.4, 16);
      show("#g1-optional", @@t:g1-debit@@ - 1.0, 0.4, 16);
      show("#g1-debit", @@t:g1-debit@@, 0.4, 16);

      /* e1: the confirmation: the check pops, the title shows, one debit, the starburst with the big number 1 */
      pop("#e1-ok", @@t:e1-confirm@@, 0.5);
      show("#e1-title", @@t:e1-confirm@@ + 0.2, 0.4, 24);
      show("#e1-stmt", @@t:e1-one@@ - 0.4, 0.4, 16);
      pop("#e1-burst", @@t:e1-one@@, 0.5);
      bump("#e1-num", @@t:e1-one@@, 1.3);

      /* v1: the split screen, then three use cases pop on their words */
      show("#v1-no", @@start:v1@@, 0.4, 24);
      show("#v1-yes", @@start:v1@@ + 0.3, 0.4, 24);
      pop("#v1-pill", @@t:v1-idem@@, 0.45);
      pop("#v1-thanh", @@t:v1-thanh@@, 0.45);
      pop("#v1-dat", @@t:v1-dat@@, 0.45);
      pop("#v1-phan", @@t:v1-phan@@, 0.45);

      /* m1: the request counter runs, the single correct result stays, the thesis shows */
      show("#m1-count", @@start:m1@@, 0.4, 16);
      show("#m1-sys", @@start:m1@@ + 0.3, 0.4, 16);
      pop("#m1-res", @@t:m1-right@@, 0.5);
      show("#m1-thesis", @@t:m1-right@@, 0.4, 24);
      bump("#m1-count", @@t:m1-count@@, 1.2);

      /* o1: the result card becomes the channel logo, the series name follows */
      pop("#o1-logo", @@t:o1-logo@@, 0.5);
      show("#o1-brand", @@t:o1-logo@@ + 0.3, 0.4, 24);
      show("#o1-series", @@t:o1-logo@@ + 0.6, 0.4, 16);
      tl.set({}, {}, @@end@@);
