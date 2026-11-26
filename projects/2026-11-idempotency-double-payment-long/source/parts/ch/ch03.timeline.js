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
