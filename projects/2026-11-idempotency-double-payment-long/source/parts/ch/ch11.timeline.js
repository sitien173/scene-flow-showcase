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
