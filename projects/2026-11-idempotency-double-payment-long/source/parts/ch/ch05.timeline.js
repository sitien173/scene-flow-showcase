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
