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
