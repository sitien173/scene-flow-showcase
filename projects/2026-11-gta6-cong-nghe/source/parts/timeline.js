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

      /* pictures: one card per scene; a still holds 3 to 5 s with a slow push-in or pan, a trailer clip plays in its own window */
      tl.set("#p-h2-1", { autoAlpha: 1 }, 2.34);
      tl.fromTo("#p-h2-1", { scale: 1.0, transformOrigin: "50% 50%" }, { scale: 1.12, transformOrigin: "50% 50%", duration: 1.84, ease: "none" }, 2.34);
      tl.set("#p-h2-1", { autoAlpha: 0 }, 4.18);
      tl.set("#p-h2-4", { autoAlpha: 1 }, 6.53);
      tl.fromTo("#p-h2-4", { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%", duration: 2.95, ease: "none" }, 6.53);
      tl.set("#p-g1-1", { autoAlpha: 1 }, 9.48);
      tl.fromTo("#p-g1-1", { scale: 1.0, transformOrigin: "50% 35%" }, { scale: 1.12, transformOrigin: "50% 35%", duration: 3.78, ease: "none" }, 9.48);
      tl.set("#p-g2-1", { autoAlpha: 1 }, 13.26);
      tl.fromTo("#p-g2-1", { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%", duration: 3.3, ease: "none" }, 13.26);
      tl.set("#p-g2-1", { autoAlpha: 0 }, 16.56);
      tl.set("#p-g2-4", { autoAlpha: 1 }, 23.10);
      tl.fromTo("#p-g2-4", { scale: 1.0, transformOrigin: "50% 50%" }, { scale: 1.12, transformOrigin: "50% 50%", duration: 4.4, ease: "none" }, 23.10);
      tl.set("#p-g3-1", { autoAlpha: 1 }, 27.50);
      tl.fromTo("#p-g3-1", { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%", duration: 3.23, ease: "none" }, 27.50);
      tl.set("#p-g3-1", { autoAlpha: 0 }, 30.73);
      tl.set("#p-g3-3", { autoAlpha: 1 }, 32.62);
      tl.fromTo("#p-g3-3", { scale: 1.0, transformOrigin: "50% 35%" }, { scale: 1.12, transformOrigin: "50% 35%", duration: 1.54, ease: "none" }, 32.62);
      tl.set("#p-m1-1", { autoAlpha: 1 }, 34.16);
      tl.fromTo("#p-m1-1", { scale: 1.0, transformOrigin: "50% 50%" }, { scale: 1.12, transformOrigin: "50% 50%", duration: 4.22, ease: "none" }, 34.16);
      tl.set("#p-m1-1", { autoAlpha: 0 }, 38.38);
      tl.set("#p-m1-2", { autoAlpha: 1 }, 38.38);
      tl.fromTo("#p-m1-2", { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%", duration: 3.76, ease: "none" }, 38.38);
      tl.set("#p-m1-2", { autoAlpha: 0 }, 42.14);
      tl.set("#p-m1-3", { autoAlpha: 1 }, 42.14);
      tl.fromTo("#p-m1-3", { scale: 1.0, transformOrigin: "50% 35%" }, { scale: 1.12, transformOrigin: "50% 35%", duration: 3.08, ease: "none" }, 42.14);
      tl.set("#p-m2-2", { autoAlpha: 1 }, 47.10);
      tl.fromTo("#p-m2-2", { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%", duration: 3.7, ease: "none" }, 47.10);
      tl.set("#p-m2-2", { autoAlpha: 0 }, 50.80);
      tl.set("#p-m2-3", { autoAlpha: 1 }, 50.80);
      tl.fromTo("#p-m2-3", { scale: 1.0, transformOrigin: "50% 50%" }, { scale: 1.12, transformOrigin: "50% 50%", duration: 3.13, ease: "none" }, 50.80);
      tl.set("#p-m2-3", { autoAlpha: 0 }, 53.93);
      tl.set("#p-m2-4", { autoAlpha: 1 }, 53.93);
      tl.fromTo("#p-m2-4", { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%", duration: 3.56, ease: "none" }, 53.93);
      tl.set("#p-m2-4", { autoAlpha: 0 }, 57.49);
      tl.set("#p-l1-1", { autoAlpha: 1 }, 60.92);
      tl.fromTo("#p-l1-1", { scale: 1.0, transformOrigin: "50% 35%" }, { scale: 1.12, transformOrigin: "50% 35%", duration: 2.1, ease: "none" }, 60.92);
      tl.set("#p-l1-1", { autoAlpha: 0 }, 63.02);
      tl.set("#p-l2-2", { autoAlpha: 1 }, 68.31);
      tl.fromTo("#p-l2-2", { scale: 1.0, transformOrigin: "50% 50%" }, { scale: 1.12, transformOrigin: "50% 50%", duration: 2.48, ease: "none" }, 68.31);
      tl.set("#p-l2-2", { autoAlpha: 0 }, 70.79);
      tl.set("#p-l2-4", { autoAlpha: 1 }, 73.02);
      tl.fromTo("#p-l2-4", { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%", duration: 3.06, ease: "none" }, 73.02);
      tl.set("#p-l3-1", { autoAlpha: 1 }, 76.08);
      tl.fromTo("#p-l3-1", { scale: 1.0, transformOrigin: "50% 35%" }, { scale: 1.12, transformOrigin: "50% 35%", duration: 1.68, ease: "none" }, 76.08);
      tl.set("#p-l3-1", { autoAlpha: 0 }, 77.76);
      tl.set("#p-l4-1", { autoAlpha: 1 }, 80.46);
      tl.fromTo("#p-l4-1", { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%", duration: 2.82, ease: "none" }, 80.46);
      tl.set("#p-l4-1", { autoAlpha: 0 }, 83.28);
      tl.set("#p-l4-2", { autoAlpha: 1 }, 83.28);
      tl.fromTo("#p-l4-2", { scale: 1.0, transformOrigin: "50% 50%" }, { scale: 1.12, transformOrigin: "50% 50%", duration: 2.02, ease: "none" }, 83.28);
      tl.set("#p-l4-2", { autoAlpha: 0 }, 85.30);
      tl.set("#p-l4-3", { autoAlpha: 1 }, 85.30);
      tl.fromTo("#p-l4-3", { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%", duration: 2.54, ease: "none" }, 85.30);
      tl.set("#p-l5-1", { autoAlpha: 1 }, 87.84);
      tl.fromTo("#p-l5-1", { scale: 1.0, transformOrigin: "50% 35%" }, { scale: 1.12, transformOrigin: "50% 35%", duration: 3.3, ease: "none" }, 87.84);
      tl.set("#p-l5-1", { autoAlpha: 0 }, 91.14);
      tl.set("#p-r1-1", { autoAlpha: 1 }, 95.42);
      tl.fromTo("#p-r1-1", { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%", duration: 2.14, ease: "none" }, 95.42);
      tl.set("#p-r1-1", { autoAlpha: 0 }, 97.56);
      tl.set("#p-r1-2", { autoAlpha: 1 }, 97.56);
      tl.fromTo("#p-r1-2", { scale: 1.0, transformOrigin: "50% 50%" }, { scale: 1.12, transformOrigin: "50% 50%", duration: 3.76, ease: "none" }, 97.56);
      tl.set("#p-r2-4", { autoAlpha: 1 }, 107.38);
      tl.fromTo("#p-r2-4", { scale: 1.0, transformOrigin: "50% 35%" }, { scale: 1.12, transformOrigin: "50% 35%", duration: 3.14, ease: "none" }, 107.38);
      tl.set("#p-t1-1", { autoAlpha: 1 }, 110.94);
      tl.fromTo("#p-t1-1", { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%", duration: 2.94, ease: "none" }, 110.94);
      tl.set("#p-t1-1", { autoAlpha: 0 }, 113.88);
      tl.set("#p-t1-2", { autoAlpha: 1 }, 113.88);
      tl.fromTo("#p-t1-2", { scale: 1.0, transformOrigin: "50% 35%" }, { scale: 1.12, transformOrigin: "50% 35%", duration: 2.2, ease: "none" }, 113.88);
      tl.set("#p-t1-2", { autoAlpha: 0 }, 116.08);
      tl.set("#p-t1-3", { autoAlpha: 1 }, 116.08);
      tl.fromTo("#p-t1-3", { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%", duration: 3.18, ease: "none" }, 116.08);
      tl.set("#p-t2-1", { autoAlpha: 1 }, 119.26);
      tl.fromTo("#p-t2-1", { scale: 1.0, transformOrigin: "50% 50%" }, { scale: 1.12, transformOrigin: "50% 50%", duration: 2.35, ease: "none" }, 119.26);
      tl.set("#p-t2-1", { autoAlpha: 0 }, 121.61);
      tl.set("#p-t3-2", { autoAlpha: 1 }, 125.38);
      tl.fromTo("#p-t3-2", { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%", duration: 2.56, ease: "none" }, 125.38);
      tl.set("#p-t3-2", { autoAlpha: 0 }, 127.94);
      tl.set("#p-e1-3", { autoAlpha: 1 }, 136.28);
      tl.fromTo("#p-e1-3", { scale: 1.0, transformOrigin: "50% 35%" }, { scale: 1.12, transformOrigin: "50% 35%", duration: 4.46, ease: "none" }, 136.28);
      tl.set("#p-e1-3", { autoAlpha: 0 }, 140.74);
      tl.set("#p-e1-4", { autoAlpha: 1 }, 140.74);
      tl.fromTo("#p-e1-4", { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%", duration: 2.38, ease: "none" }, 140.74);
      tl.set("#p-e1-4", { autoAlpha: 0 }, 143.12);
      tl.set("#p-e2-1", { autoAlpha: 1 }, 145.20);
      tl.fromTo("#p-e2-1", { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%", duration: 0.56, ease: "none" }, 145.20);
      tl.set("#p-e2-1", { autoAlpha: 0 }, 146.02);
      tl.set("#p-e2-2", { autoAlpha: 1 }, 146.02);
      tl.fromTo("#p-e2-2", { scale: 1.0, transformOrigin: "50% 35%" }, { scale: 1.12, transformOrigin: "50% 35%", duration: 0.88, ease: "none" }, 146.02);
      tl.set("#p-e2-2", { autoAlpha: 0 }, 147.12);
      tl.set("#p-e2-4", { autoAlpha: 1 }, 147.12);
      tl.fromTo("#p-e2-4", { scale: 1.0, transformOrigin: "50% 50%" }, { scale: 1.12, transformOrigin: "50% 50%", duration: 1.24, ease: "none" }, 147.12);
      tl.set("#p-e2-4", { autoAlpha: 0 }, 148.36);
      tl.set("#p-e2-5", { autoAlpha: 1 }, 148.36);
      tl.fromTo("#p-e2-5", { scale: 1.14, xPercent: -3, transformOrigin: "50% 50%" }, { scale: 1.14, xPercent: 3, transformOrigin: "50% 50%", duration: 1.73, ease: "none" }, 148.36);

      /* h2 */
      pop("#h2-rs", @@t:h2-rockstar@@, 0.5);
      gone("#h2-rs", @@t:h2-off@@);

      /* g1 */
      show("#g1-pl", 9.48, 0.4, 30);
      show("#g1-pt", 9.48, 0.4, 24);

      /* g2 */
      pop("#g2-ue", @@t:g2-unreal@@, 0.5);
      tl.to("#g2-ue", { autoAlpha: 0.35, duration: 0.3, ease: "power1.out" }, @@t:g2-rockstar@@);
      pop("#g2-rs", @@t:g2-rockstar@@, 0.5);
      pop("#g2-rage", @@t:g2-rage@@, 0.5);
      bump("#g2-rs", @@t:g2-rockstar2@@, 1.12);
      gone(["#g2-ue", "#g2-rs", "#g2-rage"], @@t:g2-2006@@ - 0.3);
      pop("#g2-y", @@t:g2-2006@@, 0.4);
      pop("#g2-iv", @@t:g2-iv@@, 0.4);
      pop("#g2-v", @@t:g2-v@@, 0.4);
      pop("#g2-vi", @@t:g2-vi@@, 0.4);

      /* g3 */
      pop("#g3-cpp", @@t:g3-cpp@@, 0.5);
      pop("#g3-perf", @@t:g3-perf@@, 0.4);
      pop("#g3-mem", @@t:g3-mem@@, 0.4);
      pop("#g3-hw", @@t:g3-hw@@, 0.4);

      /* m1 */
      show("#m1-pl", 34.21, 0.4, 30);
      show("#m1-pt", 34.34, 0.4, 24);
      gone("#m1-pl", 38.18);
      pop("#m1-ps5", @@t:m1-ps5@@, 0.5);
      show(["#m1-l1", "#m1-t1"], @@t:m1-ram@@, 0.35, 16);
      pop("#m1-v1", @@t:m1-16@@, 0.4);
      sweep("#m1-f1", @@t:m1-16@@, 0.4);
      show(["#m1-l2", "#m1-t2"], @@t:m1-ssd@@, 0.35, 16);
      pop("#m1-v2", @@t:m1-212@@, 0.4);
      sweep("#m1-f2", @@t:m1-212@@, 1.0);
      show("#m1-pn", @@start:m1@@, 0.35, 24);

      /* m2 */
      pop("#m2-ws", @@t:m2-ws@@, 0.4);
      tl.fromTo("#m2-car", { autoAlpha: 0, x: 0 }, { autoAlpha: 1, x: 0, duration: 0.3, ease: "power1.out" }, @@t:m2-drive@@);
      tl.fromTo("#m2-car", { x: 0 }, { x: 790, duration: 60.52 - @@t:m2-drive@@, ease: "none", immediateRender: false }, @@t:m2-drive@@ + 0.3);
      tl.fromTo(ids("m2-b", 8), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: "power1.out", stagger: 0.06 }, @@t:m2-drive@@);
      tl.fromTo("#m2-sc .blk i", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "power1.out", stagger: 0.3 }, @@t:m2-load@@);
      pop("#m2-ssd", @@t:m2-ssd@@, 0.4);
      pop("#m2-free", @@t:m2-free@@, 0.4);
      tl.to(["#m2-b0", "#m2-b1", "#m2-b2", "#m2-b3"], { autoAlpha: 0.2, duration: 0.3, ease: "power1.out", stagger: 0.3 }, @@t:m2-free@@ + 0.2);
      show("#m2-pn", @@start:m2@@, 0.35, 24);

      /* l1 */
      show("#l1-pl", 60.96, 0.4, 30);
      show("#l1-pt", 61.07, 0.4, 24);
      gone("#l1-pl", @@t:l1-loop@@ - 0.25);
      pop(["#l1-ring", "#l1-disc"], @@t:l1-loop@@, 0.4);
      tl.fromTo("#l1-ring", { rotation: 0, transformOrigin: "50% 50%" }, { rotation: 360 * (66.34 - @@t:l1-loop@@), transformOrigin: "50% 50%", duration: 66.34 - @@t:l1-loop@@, ease: "none", immediateRender: false }, @@t:l1-loop@@);
      pop("#l1-30", @@t:l1-30@@, 0.4, 0.5);
      pop("#l1-lps", @@t:l1-lps@@, 0.35);

      /* l2 */
      gone("#l2-30", 68.20);
      pop("#l2-phys", @@t:l2-phys@@, 0.4);
      tl.to("#l2-phys", { opacity: 0.55, duration: 0.2, ease: "power1.out" }, @@t:l2-ai@@);
      pop("#l2-ai", @@t:l2-ai@@, 0.4);
      tl.to("#l2-ai", { opacity: 0.55, duration: 0.2, ease: "power1.out" }, @@t:l2-anim@@);
      pop("#l2-anim", @@t:l2-anim@@, 0.4);

      /* l3 */
      pop(["#l3-a", "#l3-b", "#l3-c"], @@t:l3-tasks@@, 0.4);
      pop("#l3-cpu", @@t:l3-cpu@@, 0.4);
      tl.fromTo("#l3-sc .core i", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "power1.out", stagger: 0.03 }, @@t:l3-cpu@@);
      pop("#l3-mt", @@t:l3-mt@@, 0.4);

      /* l4 */
      pop("#l4-lod", @@t:l4-lod@@, 0.4);
      pop("#l4-near", @@t:l4-front@@, 0.4);
      gone("#l4-near", 85.30);
      pop("#l4-far", @@t:l4-street@@, 0.4);

      /* l5 */
      pop("#l5-rs", @@t:l5-rockstar@@, 0.5);
      gone("#l5-rs", @@t:l5-base@@ - 0.1);
      pop("#l5-cpu", @@t:l5-cpu@@, 0.4);
      pop("#l5-pro", @@t:l5-pro@@, 0.5);
      pop("#l5-chip", @@t:l5-prochip@@, 0.4);
      sweep("#l5-b1", @@t:l5-prochip@@, 0.5);
      pop("#l5-base", @@t:l5-base@@, 0.5);
      sweep("#l5-b2", @@t:l5-base@@ + 0.1, 0.5);
      pop("#l5-fps", @@t:l5-fps@@, 0.4);
      show("#l5-pn", @@t:l5-cpu@@ - 0.35, 0.35, 24);

      /* r1 */
      show("#r1-pl", 95.52, 0.4, 30);
      show("#r1-pt", 95.62, 0.4, 24);
      pop("#r1-cpu", @@t:r1-cpu@@, 0.45);
      tl.fromTo("#r1-arr", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1, ease: "none" }, @@t:r1-move@@);
      draw("#r1-draw", @@t:r1-move@@, 0.4);
      pop("#r1-gpu", @@t:r1-gpu@@, 0.45);
      pop("#r1-rt", @@t:r1-rt@@, 0.4);

      /* r2 */
      pop("#r2-rt", @@t:r2-ray@@, 0.4);
      pop("#r2-refl", @@t:r2-refl@@, 0.4);
      pop("#r2-light", @@t:r2-light@@, 0.4);
      pop("#r2-ps5", @@t:r2-ps5@@, 0.5);
      pop("#r2-pro", @@t:r2-pro@@, 0.4);
      pop("#r2-shadow", @@t:r2-shadow@@, 0.4);
      show("#r2-pn", @@start:r2@@, 0.35, 24);


      /* t1 */
      show("#t1-pl", 110.98, 0.4, 30);
      show("#t1-pt", 111.09, 0.4, 24);
      gone("#t1-pl", @@t:t1-game@@ - 0.3);
      pop("#t1-game", @@t:t1-game@@, 0.4);
      pop("#t1-maya", @@t:t1-maya@@, 0.5);
      pop("#t1-hou", @@t:t1-houdini@@, 0.5);

      /* t2 */
      pop("#t2-mc", @@t:t2-mocap@@, 0.4);

      /* t3 */
      pop("#t3-crowd", @@t:t3-crowd@@, 0.4);
      gone("#t3-crowd", @@t:t3-ver@@ - 0.2);
      tl.fromTo(["#t3-v1", "#t3-v2", "#t3-v3"], { autoAlpha: 0, scale: 0.7, transformOrigin: "50% 50%" }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)", transformOrigin: "50% 50%", stagger: 0.2 }, @@t:t3-ver@@);
      gone(["#t3-v1", "#t3-v2", "#t3-v3"], @@t:t3-perforce@@ - 0.3);
      pop("#t3-pf", @@t:t3-perforce@@, 0.5);

      /* e1 */
      pop(["#e1-l", "#e1-r"], @@t:e1-two@@, 0.45, 0.9);
      pop("#e1-con", @@t:e1-console@@, 0.4);
      pop("#e1-rage", @@t:e1-rage@@, 0.4);
      pop("#e1-cpu", @@t:e1-cpu@@, 0.35);
      pop("#e1-gpu", @@t:e1-gpu@@, 0.35);
      pop("#e1-ssd", @@t:e1-ssd@@, 0.35);
      pop("#e1-rs", @@t:e1-rockstar@@, 0.5);
      pop("#e1-3d", @@t:e1-3d@@, 0.35);
      pop("#e1-mc", @@t:e1-mocap@@, 0.35);
      pop("#e1-ver", @@t:e1-ver@@, 0.35);
      show("#e1-pn", @@start:e1@@, 0.35, 24);

      /* e2 */
      pop("#e2-p", @@t:e2-punch@@, 0.4, 0.85);

      tl.set({}, {}, @@end@@);
