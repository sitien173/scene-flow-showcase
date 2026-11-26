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
