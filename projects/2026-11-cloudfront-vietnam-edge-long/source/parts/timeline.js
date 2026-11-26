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

            /* h1 */
      show("#h1-browser", @@t:h1-1@@, 0.5, 36);
      pop("#h1-cur", @@t:h1-2@@, 0.4);
      gone("#h1-browser", @@t:h1-3@@);
      gone("#h1-cur", @@t:h1-3@@);
      gone("#h1-lbl-hcm", @@t:h1-3@@);
      tl.fromTo("#h1-map", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, @@t:h1-3@@);
      tl.fromTo("#h1-cam", { scale: 1.8, transformOrigin: "377.3px 512px" }, { scale: 1, duration: 0.6, ease: "power3.inOut", transformOrigin: "377.3px 512px" }, @@t:h1-3@@);
      pop("#h1-p-hcm", @@t:h1-3@@, 0.4);
      pop("#h1-p-us", (@@t:h1-3@@ + 0.2), 0.4);
      tl.fromTo("#h1-arc", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:h1-4@@);
      pop("#h1-km", (@@t:h1-4@@ + 0.45), 0.5);

      /* h2 */
      bump("#h2-key", @@t:h2-1@@, 1.18);
      pop("#h2-clock", @@t:h2-2@@, 0.4);
      tl.fromTo("#h2-hdr", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, @@t:h2-3@@);
      pop("#h2-img0", @@t:h2-4@@, 0.4, 0.5);
      pop("#h2-img1", (@@t:h2-4@@ + 0.15), 0.4, 0.5);
      pop("#h2-img2", (@@t:h2-4@@ + 0.3), 0.4, 0.5);
      tl.fromTo("#h2-txt0", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, @@t:h2-5@@);
      tl.fromTo("#h2-txt1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, (@@t:h2-5@@ + 0.1));
      tl.fromTo("#h2-txt2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, (@@t:h2-5@@ + 0.2));
      tl.fromTo("#h2-txt3", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, (@@t:h2-5@@ + 0.3));
      pop("#h2-cur", @@t:h2-6@@, 0.3);
      bump("#h2-buy", (@@t:h2-6@@ + 0.4), 1.12);

      /* h3 */
      tl.fromTo("#h3-page", { scale: 1, transformOrigin: "377px 512px" }, { scale: 0.12, duration: 0.7, ease: "power3.inOut", transformOrigin: "377px 512px" }, (@@t:h3-1@@ + 1.0));
      tl.fromTo("#h3-map", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, (@@t:h3-1@@ + 0.9));
      pop("#h3-p-hcm", (@@t:h3-1@@ + 0.9), 0.3);
      pop("#h3-p-us", (@@t:h3-1@@ + 0.9), 0.3);
      pop("#h3-pkt", @@t:h3-2@@, 0.3);
      tl.fromTo("#h3-pkt", { x: 0, y: 0 }, { x: -846.7, y: 204.3, duration: 1, ease: "power2.inOut" }, (@@t:h3-2@@ + 0.3));
      tl.fromTo("#h3-cam", { x: 220 }, { x: 0, duration: 0.5, ease: "power3.out" }, @@t:h3-3@@);
      pop("#h3-ring", @@t:h3-4@@, 0.3);
      gone("#h3-pkt", (@@t:h3-4@@ + 0.05), 0.1);

      /* h4 */
      pop("#h4-c1", @@t:h4-1@@, 0.3);
      gone("#h4-c1", (@@t:h4-1@@ + 0.6), 0.1);
      pop("#h4-c2", (@@t:h4-1@@ + 0.6), 0.3);
      gone("#h4-c2", (@@t:h4-1@@ + 1.2), 0.1);
      pop("#h4-c3", (@@t:h4-1@@ + 1.2), 0.3);
      pop("#h4-p-hcm", @@t:h4-1@@, 0.3);
      pop("#h4-p-us", @@t:h4-1@@, 0.3);
      tl.fromTo("#h4-a1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:h4-1@@ + 0.1));
      tl.fromTo("#h4-a2", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:h4-1@@ + 0.7));
      pop("#h4-img", (@@t:h4-1@@ + 0.4), 0.4);
      tl.fromTo("#h4-a3", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:h4-2@@);
      tl.fromTo("#h4-a4", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:h4-2@@ + 0.3));
      pop("#h4-q", @@t:h4-3@@, 0.4);
      pop("#h4-q-lbl", (@@t:h4-3@@ + 0.1), 0.3);
      tl.fromTo("#h4-a5", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:h4-3@@ + 0.4));
      tl.fromTo("#h4-cam", { scale: 1, transformOrigin: "437px 452px" }, { scale: 1.6, duration: 1.4, ease: "power3.inOut", transformOrigin: "437px 452px" }, @@t:h4-3@@);

      /* h5 */
      gone("#h5-q", (@@t:h5-1@@ + 0.9), 0.2);
      pop("#h5-n0", (@@t:h5-1@@ + 0.2), 0.3);
      pop("#h5-n1", (@@t:h5-1@@ + 0.25), 0.3);
      pop("#h5-n2", (@@t:h5-1@@ + 0.30000000000000004), 0.3);
      pop("#h5-n3", (@@t:h5-1@@ + 0.35000000000000003), 0.3);
      pop("#h5-n4", (@@t:h5-1@@ + 0.4), 0.3);
      pop("#h5-n5", (@@t:h5-1@@ + 0.45), 0.3);
      pop("#h5-n6", (@@t:h5-1@@ + 0.5), 0.3);
      pop("#h5-n7", (@@t:h5-1@@ + 0.55), 0.3);
      pop("#h5-n8", (@@t:h5-1@@ + 0.6000000000000001), 0.3);
      pop("#h5-n9", (@@t:h5-1@@ + 0.65), 0.3);
      pop("#h5-n10", (@@t:h5-1@@ + 0.7), 0.3);
      pop("#h5-n11", (@@t:h5-1@@ + 0.75), 0.3);
      pop("#h5-n12", (@@t:h5-1@@ + 0.8), 0.3);
      pop("#h5-n13", (@@t:h5-1@@ + 0.8500000000000001), 0.3);
      pop("#h5-n14", (@@t:h5-1@@ + 0.9000000000000001), 0.3);
      pop("#h5-n15", (@@t:h5-1@@ + 0.95), 0.3);
      pop("#h5-cdn", @@t:h5-2@@, 0.4);
      tl.fromTo("#h5-cdn-sub", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, (@@t:h5-2@@ + 0.2));
      gone("#h5-cdn", @@t:h5-3@@);
      gone("#h5-cdn-sub", @@t:h5-3@@);
      pop("#h5-cf", @@t:h5-3@@, 0.5);
      pop("#h5-cf-lbl", (@@t:h5-3@@ + 0.3), 0.4);
      tl.fromTo("#h5-a1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:h5-4@@);
      tl.fromTo("#h5-a2", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:h5-4@@ + 0.2));
      tl.fromTo("#h5-cam", { scale: 1.5, transformOrigin: "800px 400px" }, { scale: 1, duration: 0.7, ease: "power3.inOut", transformOrigin: "800px 400px" }, @@t:h5-4@@);

      /* c2o */
      pop("#c2o-ic", @@start:c2o@@, 0.5);
      pop("#c2o-burst", @@start:c2o@@, 0.5);
      pop("#c2o-mascot", @@start:c2o@@, 0.5);
      show("#c2o-t", @@t:c2o-1@@, 0.4, 24);
      pop("#c2o-lbl", @@t:c2o-1@@ + 0.3, 0.4);

      /* c2a */
      pop("#c2a-br", @@t:c2a-1@@, 0.5);
      pop("#c2a-srv", (@@t:c2a-1@@ + 0.2), 0.5);
      pop("#c2a-p1", @@t:c2a-2@@, 0.3);
      tl.fromTo("#c2a-p1", { x: 0, y: 0 }, { x: 990, y: 0, duration: 0.6, ease: "power2.inOut" }, (@@t:c2a-2@@ + 0.3));
      pop("#c2a-req", (@@t:c2a-2@@ + 0.3), 0.4);
      pop("#c2a-gear", @@t:c2a-3@@, 0.3);
      tl.to("#c2a-gear", { rotation: 360, duration: 0.9, ease: "none", transformOrigin: "50% 50%" }, @@t:c2a-3@@);
      pop("#c2a-p2", @@t:c2a-4@@, 0.3);
      tl.fromTo("#c2a-p2", { x: 0, y: 0 }, { x: -990, y: 0, duration: 0.6, ease: "power2.inOut" }, (@@t:c2a-4@@ + 0.3));
      pop("#c2a-res", (@@t:c2a-4@@ + 0.3), 0.4);

      /* c2b */
      pop("#c2b-clock", @@t:c2b-1@@, 0.5);
      tl.fromTo("#c2b-hand", { rotation: 0, transformOrigin: "50% 50%" }, { rotation: 360, duration: 1.6, ease: "none", transformOrigin: "50% 50%" }, @@t:c2b-1@@);
      tl.fromTo("#c2b-ring", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, @@t:c2b-2@@);
      pop("#c2b-lat", @@t:c2b-2@@, 0.4);
      tl.fromTo("#c2b-loop", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c2b-3@@);
      tl.fromTo("#c2b-back", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c2b-3@@ + 0.5));
      pop("#c2b-rtt", (@@t:c2b-3@@ + 0.2), 0.4);
      pop("#c2b-p", @@t:c2b-4@@, 0.3);
      tl.fromTo("#c2b-p", { x: 0, y: 0 }, { x: -1010, y: 0, duration: 0.8, ease: "power2.inOut" }, (@@t:c2b-4@@ + 0.3));

      /* c2c */
      tl.fromTo("#c2c-ruler", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }, @@t:c2c-1@@);
      tl.fromTo("#c2c-fib", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "power1.out" }, @@t:c2c-2@@);
      gone("#c2c-map", @@t:c2c-2@@, 0.2);
      pop("#c2c-sign", @@t:c2c-3@@, 0.5);

      /* c2d */
      pop("#c2d-n0", (@@t:c2d-1@@ + 0), 0.35);
      pop("#c2d-n1", (@@t:c2d-1@@ + 0.05), 0.35);
      pop("#c2d-n2", (@@t:c2d-1@@ + 0.1), 0.35);
      pop("#c2d-n3", (@@t:c2d-1@@ + 0.15000000000000002), 0.35);
      pop("#c2d-n4", (@@t:c2d-1@@ + 0.2), 0.35);
      pop("#c2d-l1", (@@t:c2d-1@@ + 0.2), 0.4);
      tl.to("#c2d-p1", { x: 175, duration: 0.2, ease: "power1.inOut" }, (@@t:c2d-2@@ + 0));
      tl.to("#c2d-p1", { x: 350, duration: 0.2, ease: "power1.inOut" }, (@@t:c2d-2@@ + 0.22));
      tl.to("#c2d-p1", { x: 525, duration: 0.2, ease: "power1.inOut" }, (@@t:c2d-2@@ + 0.44));
      tl.to("#c2d-p1", { x: 700, duration: 0.2, ease: "power1.inOut" }, (@@t:c2d-2@@ + 0.66));
      tl.to("#c2d-p1", { x: 875, duration: 0.2, ease: "power1.inOut" }, (@@t:c2d-2@@ + 0.88));
      tl.to("#c2d-p1", { x: 1050, duration: 0.2, ease: "power1.inOut" }, (@@t:c2d-2@@ + 1.1));
      tl.to("#c2d-p1", { x: 1225, duration: 0.2, ease: "power1.inOut" }, (@@t:c2d-2@@ + 1.32));
      tl.to("#c2d-p1", { x: 1400, duration: 0.2, ease: "power1.inOut" }, (@@t:c2d-2@@ + 1.54));
      pop("#c2d-n5", (@@t:c2d-3@@ + 0), 0.35);
      pop("#c2d-n6", (@@t:c2d-3@@ + 0.1), 0.35);
      pop("#c2d-n7", (@@t:c2d-3@@ + 0.2), 0.35);
      pop("#c2d-n8", (@@t:c2d-3@@ + 0.30000000000000004), 0.35);
      pop("#c2d-r0", @@t:c2d-4@@, 0.35);
      pop("#c2d-r1", @@t:c2d-4@@, 0.35);
      pop("#c2d-r2", @@t:c2d-4@@, 0.35);
      pop("#c2d-l2", (@@t:c2d-4@@ + 0.2), 0.4);
      tl.to("#c2d-p2", { x: 260, duration: 0.8, ease: "power1.inOut" }, (@@t:c2d-4@@ + 0.3));
      pop("#c2d-ring", @@t:c2d-5@@, 0.3);
      pop("#c2d-usring", @@t:c2d-6@@, 0.3);
      bump("#c2d-n8", (@@t:c2d-6@@ + 0.3), 1.15);

      /* c2e */
      sweep("#c2e-axis", @@t:c2e-1@@, 0.5);
      sweep("#c2e-g0", @@t:c2e-2@@, 0.4);
      sweep("#c2e-r0", @@t:c2e-2@@, 0.4);
      pop("#c2e-lbl0", @@t:c2e-2@@, 0.3);
      sweep("#c2e-g1", @@t:c2e-3@@, 0.4);
      sweep("#c2e-r1", @@t:c2e-3@@, 0.4);
      pop("#c2e-lbl1", @@t:c2e-3@@, 0.3);
      sweep("#c2e-g2", @@t:c2e-4@@, 0.4);
      sweep("#c2e-r2", @@t:c2e-4@@, 0.4);
      pop("#c2e-lbl2", @@t:c2e-4@@, 0.3);
      sweep("#c2e-g3", @@t:c2e-5@@, 0.4);
      sweep("#c2e-r3", @@t:c2e-5@@, 0.4);
      pop("#c2e-lbl3", @@t:c2e-5@@, 0.3);
      tl.to(".c2e-red", { scaleX: 1.6, duration: 0.6, ease: "power2.out", transformOrigin: "0% 50%" }, @@t:c2e-6@@);
      pop("#c2e-trao", @@t:c2e-8@@, 0.3);
      sweep("#c2e-tot-r", @@t:c2e-7@@, 0.5);
      sweep("#c2e-tot-g", (@@t:c2e-7@@ + 0.3), 0.6);
      pop("#c2e-tlbl", @@t:c2e-7@@, 0.3);
      tl.to("#c2e-tot-g", { scaleX: 1.2, duration: 0.4, ease: "power2.out", transformOrigin: "0% 50%" }, (@@t:c2e-7@@ + 0.8));

      /* c2f */
      pop("#c2f-s0", (@@t:c2f-1@@ + 0.000), 0.3);
      pop("#c2f-s1", (@@t:c2f-1@@ + 0.094), 0.3);
      pop("#c2f-s2", (@@t:c2f-1@@ + 0.188), 0.3);
      pop("#c2f-s3", (@@t:c2f-1@@ + 0.281), 0.3);
      pop("#c2f-s4", (@@t:c2f-1@@ + 0.375), 0.3);
      pop("#c2f-s5", (@@t:c2f-1@@ + 0.469), 0.3);
      pop("#c2f-s6", (@@t:c2f-1@@ + 0.563), 0.3);
      pop("#c2f-s7", (@@t:c2f-1@@ + 0.656), 0.3);
      pop("#c2f-s8", (@@t:c2f-1@@ + 0.750), 0.3);
      pop("#c2f-s9", (@@t:c2f-1@@ + 0.844), 0.3);
      pop("#c2f-s10", (@@t:c2f-1@@ + 0.938), 0.3);
      pop("#c2f-s11", (@@t:c2f-1@@ + 1.031), 0.3);
      pop("#c2f-s12", (@@t:c2f-1@@ + 1.125), 0.3);
      pop("#c2f-s13", (@@t:c2f-1@@ + 1.219), 0.3);
      pop("#c2f-s14", (@@t:c2f-1@@ + 1.313), 0.3);
      pop("#c2f-s15", (@@t:c2f-1@@ + 1.406), 0.3);
      pop("#c2f-tick", @@t:c2f-2@@, 0.3);
      tl.fromTo("#c2f-cable", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c2f-3@@);
      tl.fromTo("#c2f-cable2", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c2f-3@@ + 0.3));
      pop("#c2f-cab", @@t:c2f-3@@, 0.3);
      tl.fromTo("#c2f-cam", { scale: 1, transformOrigin: "900px 420px" }, { scale: 1.5, duration: 1.2, ease: "power3.inOut", transformOrigin: "900px 420px" }, @@t:c2f-3@@);
      tl.to("#c2f-cam", { scale: 1, duration: 0.6, ease: "power3.inOut", transformOrigin: "900px 420px" }, @@t:c2f-4@@);
      gone("#c2f-map", (@@t:c2f-4@@ + 0.2), 0.3);
      gone("#c2f-cable", @@t:c2f-4@@, 0.3);
      pop("#c2f-cdn", (@@t:c2f-4@@ + 0.4), 0.4);
      pop("#c2f-s0", (@@t:c2f-5@@ + 0), 0.2);
      pop("#c2f-s1", (@@t:c2f-5@@ + 0.1), 0.2);
      pop("#c2f-s2", (@@t:c2f-5@@ + 0.2), 0.2);
      pop("#c2f-s3", (@@t:c2f-5@@ + 0.30000000000000004), 0.2);
      pop("#c2f-s4", (@@t:c2f-5@@ + 0), 0.2);
      pop("#c2f-s5", (@@t:c2f-5@@ + 0.1), 0.2);
      pop("#c2f-s6", (@@t:c2f-5@@ + 0.2), 0.2);
      pop("#c2f-s7", (@@t:c2f-5@@ + 0.30000000000000004), 0.2);
      pop("#c2f-s8", (@@t:c2f-5@@ + 0), 0.2);
      pop("#c2f-s9", (@@t:c2f-5@@ + 0.1), 0.2);
      pop("#c2f-s10", (@@t:c2f-5@@ + 0.2), 0.2);
      pop("#c2f-s11", (@@t:c2f-5@@ + 0.30000000000000004), 0.2);
      pop("#c2f-s12", (@@t:c2f-5@@ + 0), 0.2);
      pop("#c2f-s13", (@@t:c2f-5@@ + 0.1), 0.2);
      pop("#c2f-s14", (@@t:c2f-5@@ + 0.2), 0.2);
      pop("#c2f-s15", (@@t:c2f-5@@ + 0.30000000000000004), 0.2);

      /* c3o */
      pop("#c3o-ic", @@t:c3o-1@@, 0.5);
      pop("#c3o-burst", @@t:c3o-1@@, 0.5);
      pop("#c3o-mascot", @@t:c3o-1@@, 0.5);
      show("#c3o-t", @@t:c3o-1@@, 0.4, 24);

      /* c3a */
      pop("#c3a-c0", (@@t:c3a-1@@ + 0), 0.4);
      pop("#c3a-c1", (@@t:c3a-1@@ + 0.15), 0.4);
      pop("#c3a-c2", (@@t:c3a-1@@ + 0.3), 0.4);
      pop("#c3a-c3", (@@t:c3a-1@@ + 0.44999999999999996), 0.4);
      pop("#c3a-lb0", (@@t:c3a-1@@ + 0.2), 0.3);
      pop("#c3a-lb1", (@@t:c3a-1@@ + 0.35), 0.3);
      pop("#c3a-lb2", (@@t:c3a-1@@ + 0.5), 0.3);
      pop("#c3a-lb3", (@@t:c3a-1@@ + 0.6499999999999999), 0.3);
      tl.fromTo("#c3a-l0", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c3a-2@@ + 0));
      tl.fromTo("#c3a-l1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c3a-2@@ + 0.15));
      tl.fromTo("#c3a-l2", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c3a-2@@ + 0.3));
      tl.fromTo("#c3a-l3", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c3a-2@@ + 0.44999999999999996));
      tl.to("#c3a-grp", { rotation: 4, duration: 2.2, ease: "power1.inOut", transformOrigin: "50% 50%" }, @@t:c3a-3@@);

      /* c3b */
      tl.fromTo("#c3b-a1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c3b-1@@);
      tl.fromTo("#c3b-a2", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, @@t:c3b-4@@);
      tl.fromTo("#c3b-a3", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3b-4@@ + 0.2));
      tl.fromTo("#c3b-cam", { scale: 1, transformOrigin: "800px 175px" }, { scale: 2.2, duration: 0.8, ease: "power3.inOut", transformOrigin: "800px 175px" }, @@t:c3b-2@@);
      gone("#c3b-map", (@@t:c3b-2@@ + 0.6), 0.2);
      tl.fromTo("#c3b-sec", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, (@@t:c3b-2@@ + 0.6));
      pop("#c3b-pk", @@t:c3b-3@@, 0.2);
      tl.fromTo("#c3b-pk", { x: 0 }, { x: 1100, duration: 1.0, ease: "power1.inOut" }, (@@t:c3b-3@@ + 0.2));
      pop("#c3b-tag-p", (@@t:c3b-1@@ + 0.1), 0.4);
      pop("#c3b-core", @@t:c3b-5@@, 0.3);

      /* c3c */
      tl.fromTo("#c3c-s0", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3c-1@@ + 0));
      tl.fromTo("#c3c-s1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3c-1@@ + 0.2));
      tl.fromTo("#c3c-s2", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3c-1@@ + 0.4));
      tl.fromTo("#c3c-s3", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3c-1@@ + 0.6000000000000001));
      tl.fromTo("#c3c-req", { x: 0, y: 0 }, { x: 846.7, y: -204.3, duration: 1.2, ease: "power2.inOut" }, (@@t:c3c-1@@ + 0.8));
      tl.to("#c3c-s1", { stroke: "#E5484D", duration: 0.3 }, @@t:c3c-2@@);
      tl.fromTo("#c3c-alt", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c3c-2@@ + 0.3));
      tl.fromTo("#c3c-cam", { scale: 1, transformOrigin: "800px 300px" }, { scale: 1.15, duration: 0.6, ease: "power3.inOut", transformOrigin: "800px 300px" }, @@t:c3c-2@@);
      tl.fromTo("#c3c-res", { x: 0, y: 0 }, { x: -846.7, y: 204.3, duration: 1.2, ease: "power2.inOut" }, @@t:c3c-3@@);
      pop("#c3c-d0", (@@t:c3c-4@@ + 0), 0.25);
      pop("#c3c-d1", (@@t:c3c-4@@ + 0.12), 0.25);
      pop("#c3c-d2", (@@t:c3c-4@@ + 0.24), 0.25);
      pop("#c3c-d3", (@@t:c3c-4@@ + 0.36), 0.25);
      pop("#c3c-d4", (@@t:c3c-4@@ + 0.48), 0.25);
      pop("#c3c-d5", (@@t:c3c-4@@ + 0.6), 0.25);
      pop("#c3c-d6", (@@t:c3c-4@@ + 0.72), 0.25);
      pop("#c3c-d7", (@@t:c3c-4@@ + 0), 0.25);
      pop("#c3c-d8", (@@t:c3c-4@@ + 0.12), 0.25);
      pop("#c3c-d9", (@@t:c3c-4@@ + 0.24), 0.25);
      pop("#c3c-d10", (@@t:c3c-4@@ + 0.36), 0.25);
      pop("#c3c-d11", (@@t:c3c-4@@ + 0.48), 0.25);
      pop("#c3c-d12", (@@t:c3c-4@@ + 0.6), 0.25);
      pop("#c3c-d13", (@@t:c3c-4@@ + 0.72), 0.25);

      /* c3d */
      tl.fromTo("#c3d-d1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, @@t:c3d-1@@);
      tl.fromTo("#c3d-d2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, (@@t:c3d-1@@ + 0.1));
      pop("#c3d-l1", (@@t:c3d-1@@ + 0.2), 0.3);
      pop("#c3d-l2", (@@t:c3d-1@@ + 0.25), 0.3);
      tl.fromTo("#c3d-n1", { rotation: 0, transformOrigin: "50% 100%" }, { rotation: 200, duration: 1.0, ease: "power2.inOut", transformOrigin: "50% 100%" }, @@t:c3d-2@@);
      tl.fromTo("#c3d-n2", { rotation: 0, transformOrigin: "50% 100%" }, { rotation: 120, duration: 1.0, ease: "power2.inOut", transformOrigin: "50% 100%" }, @@t:c3d-3@@);
      tl.fromTo("#c3d-grp", { scale: 1, transformOrigin: "960px 420px" }, { scale: 1.08, duration: 1.2, ease: "none", transformOrigin: "960px 420px" }, @@t:c3d-2@@);

      /* c3e */
      pop("#c3e-u0", (@@t:c3e-1@@ + 0), 0.3);
      pop("#c3e-u1", (@@t:c3e-1@@ + 0.04), 0.3);
      pop("#c3e-u2", (@@t:c3e-1@@ + 0.08), 0.3);
      pop("#c3e-u3", (@@t:c3e-1@@ + 0.12), 0.3);
      pop("#c3e-u4", (@@t:c3e-1@@ + 0.16), 0.3);
      pop("#c3e-u5", (@@t:c3e-1@@ + 0.2), 0.3);
      pop("#c3e-u6", (@@t:c3e-1@@ + 0.24), 0.3);
      pop("#c3e-u7", (@@t:c3e-1@@ + 0.28), 0.3);
      pop("#c3e-u8", (@@t:c3e-1@@ + 0.32), 0.3);
      pop("#c3e-u9", (@@t:c3e-1@@ + 0.36), 0.3);
      pop("#c3e-u10", (@@t:c3e-1@@ + 0.4), 0.3);
      pop("#c3e-u11", (@@t:c3e-1@@ + 0.44), 0.3);
      pop("#c3e-srv", @@t:c3e-1@@, 0.4);
      tl.fromTo("#c3e-long0", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3e-1@@ + 0.6));
      tl.fromTo("#c3e-long1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3e-1@@ + 0.6));
      tl.fromTo("#c3e-long2", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3e-1@@ + 0.6));
      tl.fromTo("#c3e-long3", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3e-1@@ + 0.6));
      tl.fromTo("#c3e-long4", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3e-1@@ + 0.6));
      tl.fromTo("#c3e-long5", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3e-1@@ + 0.6));
      tl.fromTo("#c3e-long6", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3e-1@@ + 0.6));
      tl.fromTo("#c3e-long7", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3e-1@@ + 0.6));
      tl.fromTo("#c3e-long8", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3e-1@@ + 0.6));
      tl.fromTo("#c3e-long9", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3e-1@@ + 0.6));
      tl.fromTo("#c3e-long10", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3e-1@@ + 0.6));
      tl.fromTo("#c3e-long11", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c3e-1@@ + 0.6));
      tl.fromTo("#c3e-thesis", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }, @@t:c3e-2@@);
      pop("#c3e-cp0", (@@t:c3e-2@@ + 0.2), 0.2);
      pop("#c3e-cp1", (@@t:c3e-2@@ + 0.4), 0.4);
      pop("#c3e-cp2", (@@t:c3e-2@@ + 0.6000000000000001), 0.4);
      pop("#c3e-cp3", (@@t:c3e-2@@ + 0.8), 0.4);
      pop("#c3e-masc", @@t:c3e-3@@, 0.4);
      bump("#c3e-cp0", @@t:c3e-4@@, 1.2);
      tl.to("#c3e-long0", { opacity: 0, duration: 0.4 }, @@t:c3e-2@@);
      tl.fromTo("#c3e-short0", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, @@t:c3e-2@@);
      tl.to("#c3e-long1", { opacity: 0, duration: 0.4 }, @@t:c3e-2@@);
      tl.fromTo("#c3e-short1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, @@t:c3e-2@@);
      tl.to("#c3e-long2", { opacity: 0, duration: 0.4 }, @@t:c3e-2@@);
      tl.fromTo("#c3e-short2", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, @@t:c3e-2@@);
      tl.to("#c3e-long3", { opacity: 0, duration: 0.4 }, @@t:c3e-2@@);
      tl.fromTo("#c3e-short3", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, @@t:c3e-2@@);
      tl.to("#c3e-long4", { opacity: 0, duration: 0.4 }, @@t:c3e-2@@);
      tl.fromTo("#c3e-short4", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, @@t:c3e-2@@);
      tl.to("#c3e-long5", { opacity: 0, duration: 0.4 }, @@t:c3e-2@@);
      tl.fromTo("#c3e-short5", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, @@t:c3e-2@@);
      tl.to("#c3e-long6", { opacity: 0, duration: 0.4 }, @@t:c3e-2@@);
      tl.fromTo("#c3e-short6", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, @@t:c3e-2@@);
      tl.to("#c3e-long7", { opacity: 0, duration: 0.4 }, @@t:c3e-2@@);
      tl.fromTo("#c3e-short7", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, @@t:c3e-2@@);
      tl.to("#c3e-long8", { opacity: 0, duration: 0.4 }, @@t:c3e-2@@);
      tl.fromTo("#c3e-short8", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, @@t:c3e-2@@);
      tl.to("#c3e-long9", { opacity: 0, duration: 0.4 }, @@t:c3e-2@@);
      tl.fromTo("#c3e-short9", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, @@t:c3e-2@@);
      tl.to("#c3e-long10", { opacity: 0, duration: 0.4 }, @@t:c3e-2@@);
      tl.fromTo("#c3e-short10", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, @@t:c3e-2@@);
      tl.to("#c3e-long11", { opacity: 0, duration: 0.4 }, @@t:c3e-2@@);
      tl.fromTo("#c3e-short11", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, @@t:c3e-2@@);

      /* c4o */
      pop("#c4o-ic", @@t:c4o-1@@, 0.5);
      pop("#c4o-burst", @@t:c4o-1@@, 0.5);
      pop("#c4o-mascot", @@t:c4o-1@@, 0.5);
      show("#c4o-t", @@t:c4o-1@@, 0.4, 24);

      /* c4a */
      tl.fromTo("#c4a-long1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, @@t:c4a-1@@);
      tl.fromTo("#c4a-long2", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c4a-1@@ + 0.2));
      tl.fromTo("#c4a-long3", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c4a-1@@ + 0.4));
      pop("#c4a-us", @@t:c4a-1@@, 0.4);
      pop("#c4a-pop0", (@@t:c4a-2@@ + 0), 0.3);
      pop("#c4a-pop1", (@@t:c4a-2@@ + 0.1), 0.3);
      pop("#c4a-pop2", (@@t:c4a-2@@ + 0.2), 0.3);
      pop("#c4a-pop3", (@@t:c4a-2@@ + 0.30000000000000004), 0.3);
      pop("#c4a-pop4", (@@t:c4a-2@@ + 0.4), 0.3);
      pop("#c4a-pop5", (@@t:c4a-2@@ + 0.5), 0.3);
      pop("#c4a-pop6", (@@t:c4a-2@@ + 0.6000000000000001), 0.3);
      pop("#c4a-pop7", (@@t:c4a-2@@ + 0.7000000000000001), 0.3);
      pop("#c4a-pop8", (@@t:c4a-2@@ + 0.8), 0.3);
      pop("#c4a-pop9", (@@t:c4a-2@@ + 0.9), 0.3);
      pop("#c4a-el1", (@@t:c4a-2@@ + 0.2), 0.3);
      pop("#c4a-el2", (@@t:c4a-2@@ + 0.4), 0.3);
      pop("#c4a-pop-lbl", @@t:c4a-3@@, 0.4);
      pop("#c4a-tag", (@@t:c4a-3@@ + 0.1), 0.3);
      pop("#c4a-eu", @@t:c4a-4@@, 0.2);
      tl.to("#c4a-eu", { autoAlpha: 0.2, duration: 0.25, yoyo: true, repeat: 3, ease: "none" }, @@t:c4a-4@@);

      /* c4b */
      pop("#c4b-mascot-bulb", @@t:c4b-1@@, 0.4);
      tl.fromTo("#c4b-a1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c4b-2@@);
      pop("#c4b-u0", (@@t:c4b-2@@ + 0), 0.25);
      pop("#c4b-u1", (@@t:c4b-2@@ + 0.05), 0.25);
      pop("#c4b-u2", (@@t:c4b-2@@ + 0.1), 0.25);
      pop("#c4b-u3", (@@t:c4b-2@@ + 0.15000000000000002), 0.25);
      pop("#c4b-u4", (@@t:c4b-2@@ + 0.2), 0.25);
      pop("#c4b-u5", (@@t:c4b-2@@ + 0.25), 0.25);
      pop("#c4b-u6", (@@t:c4b-2@@ + 0.30000000000000004), 0.25);
      pop("#c4b-u7", (@@t:c4b-2@@ + 0.35000000000000003), 0.25);
      pop("#c4b-f1", @@t:c4b-3@@, 0.2);
      tl.fromTo("#c4b-f1", { x: 0, y: 0 }, { x: -846.7, y: 204.3, duration: 0.9, ease: "power2.inOut" }, (@@t:c4b-3@@ + 0.2));
      pop("#c4b-f2", (@@t:c4b-3@@ + 0.3), 0.2);
      tl.fromTo("#c4b-f2", { x: 0, y: 0 }, { x: -846.7, y: 204.3, duration: 0.9, ease: "power2.inOut" }, (@@t:c4b-3@@ + 0.5));
      pop("#c4b-f3", (@@t:c4b-3@@ + 0.6), 0.2);
      tl.fromTo("#c4b-f3", { x: 0, y: 0 }, { x: -846.7, y: 204.3, duration: 0.9, ease: "power2.inOut" }, (@@t:c4b-3@@ + 0.8));
      pop("#c4b-kb", (@@t:c4b-3@@ + 0.2), 0.3);
      tl.to("#c4b-u0", { backgroundColor: "#30A46C", duration: 0.3, ease: "none" }, (@@t:c4b-4@@ + 0));
      tl.to("#c4b-u1", { backgroundColor: "#30A46C", duration: 0.3, ease: "none" }, (@@t:c4b-4@@ + 0.05));
      tl.to("#c4b-u2", { backgroundColor: "#30A46C", duration: 0.3, ease: "none" }, (@@t:c4b-4@@ + 0.1));
      tl.to("#c4b-u3", { backgroundColor: "#30A46C", duration: 0.3, ease: "none" }, (@@t:c4b-4@@ + 0.15000000000000002));
      tl.to("#c4b-u4", { backgroundColor: "#30A46C", duration: 0.3, ease: "none" }, (@@t:c4b-4@@ + 0.2));
      tl.to("#c4b-u5", { backgroundColor: "#30A46C", duration: 0.3, ease: "none" }, (@@t:c4b-4@@ + 0.25));
      tl.to("#c4b-u6", { backgroundColor: "#30A46C", duration: 0.3, ease: "none" }, (@@t:c4b-4@@ + 0.30000000000000004));
      tl.to("#c4b-u7", { backgroundColor: "#30A46C", duration: 0.3, ease: "none" }, (@@t:c4b-4@@ + 0.35000000000000003));
      tl.fromTo("#c4b-cam", { scale: 1, transformOrigin: "377.3px 512px" }, { scale: 1.5, duration: 1, ease: "power3.inOut", transformOrigin: "377.3px 512px" }, @@t:c4b-3@@);

      /* c4c */
      pop("#c4c-user", @@t:c4c-1@@, 0.4);
      pop("#c4c-e0", (@@t:c4c-1@@ + 0), 0.4);
      pop("#c4c-e1", (@@t:c4c-1@@ + 0.1), 0.4);
      pop("#c4c-e2", (@@t:c4c-1@@ + 0.2), 0.4);
      sweep("#c4c-b0", (@@t:c4c-1@@ + 0.3), 0.5);
      sweep("#c4c-b1", (@@t:c4c-1@@ + 0.4), 0.5);
      sweep("#c4c-b2", (@@t:c4c-1@@ + 0.5), 0.5);
      pop("#c4c-lat", (@@t:c4c-1@@ + 0.2), 0.3);
      tl.fromTo("#c4c-arc", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, @@t:c4c-2@@);
      bump("#c4c-e1", @@t:c4c-3@@, 1.15);

      /* c4d */
      pop("#c4d-edge", @@t:c4d-1@@, 0.4);
      pop("#c4d-scan", (@@t:c4d-1@@ + 0.2), 0.3);
      pop("#c4d-user", @@t:c4d-2@@, 0.4);
      tl.fromTo("#c4d-top", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c4d-2@@ + 0.2));
      pop("#c4d-yes", (@@t:c4d-2@@ + 0.4), 0.3);
      tl.fromTo("#c4d-mid", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, @@t:c4d-3@@);
      tl.fromTo("#c4d-end", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c4d-3@@ + 0.5));
      pop("#c4d-origin", (@@t:c4d-3@@ + 0.6), 0.4);
      pop("#c4d-no", (@@t:c4d-3@@ + 0.3), 0.3);

      /* c4e */
      tl.to("#c4e-b0", { scale: 0.7, duration: 0.5, ease: "power2.inOut", transformOrigin: "50% 50%" }, (@@t:c4e-1@@ + 0));
      tl.to("#c4e-b1", { scale: 0.7, duration: 0.5, ease: "power2.inOut", transformOrigin: "50% 50%" }, (@@t:c4e-1@@ + 0.05));
      tl.to("#c4e-b2", { scale: 0.7, duration: 0.5, ease: "power2.inOut", transformOrigin: "50% 50%" }, (@@t:c4e-1@@ + 0.1));
      tl.to("#c4e-b3", { scale: 0.7, duration: 0.5, ease: "power2.inOut", transformOrigin: "50% 50%" }, (@@t:c4e-1@@ + 0.15000000000000002));
      tl.to("#c4e-b4", { scale: 0.7, duration: 0.5, ease: "power2.inOut", transformOrigin: "50% 50%" }, (@@t:c4e-1@@ + 0.2));
      tl.to("#c4e-b5", { scale: 0.7, duration: 0.5, ease: "power2.inOut", transformOrigin: "50% 50%" }, (@@t:c4e-1@@ + 0.25));
      pop("#c4e-tag", @@t:c4e-2@@, 0.4);
      tl.fromTo("#c4e-rules", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, @@t:c4e-3@@);
      pop("#c4e-ch0", (@@t:c4e-3@@ + 0.3), 0.3);
      pop("#c4e-ch1", (@@t:c4e-3@@ + 0.5), 0.3);
      pop("#c4e-ch2", (@@t:c4e-3@@ + 0.7), 0.3);
      bump("#c4e-b0", (@@t:c4e-3@@ + 0.2), 1.08);

      /* c5o */
      pop("#c5o-ic", @@start:c5o@@, 0.5);
      pop("#c5o-burst", @@start:c5o@@, 0.5);
      pop("#c5o-mascot", @@start:c5o@@, 0.5);
      show("#c5o-t", @@t:c5o-1@@, 0.4, 24);
      pop("#c5o-hn", (@@t:c5o-1@@ + 0.3), 0.3);
      pop("#c5o-hcm", (@@t:c5o-1@@ + 0.45), 0.3);

      /* c5a */
      show("#c5a-browser", @@t:c5a-1@@, 0.5, 36);
      bump("#c5a-browser", (@@t:c5a-1@@ + 0.5), 1.03);
      gone("#c5a-browser", @@t:c5a-2@@, 0.4);
      tl.fromTo("#c5a-map", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }, (@@t:c5a-2@@ + 0.1));
      pop("#c5a-t1", (@@t:c5a-2@@ + 0.4), 0.3);
      pop("#c5a-hn", (@@t:c5a-2@@ + 0.4), 0.3);
      pop("#c5a-t2", (@@t:c5a-2@@ + 0.5), 0.3);
      pop("#c5a-hcm", (@@t:c5a-2@@ + 0.5), 0.3);
      pop("#c5a-date", @@t:c5a-3@@, 0.4);

      /* c5b */
      pop("#c5b-laptop", @@t:c5b-1@@, 0.4);
      tl.fromTo("#c5b-long", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }, (@@t:c5b-1@@ + 0.3));
      tl.fromTo("#c5b-short", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c5b-2@@);
      pop("#c5b-pkt", (@@t:c5b-2@@ + 0.5), 0.3);
      tl.fromTo("#c5b-alt", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c5b-2@@ + 0.6));
      pop("#c5b-hint", (@@t:c5b-2@@ + 0.8), 0.3);
      bump("#c5b-hcm", @@t:c5b-3@@, 1.2);

      /* c5c */
      show("#c5c-region", @@t:c5c-1@@, 0.5, 30);
      pop("#c5c-rlbl", (@@t:c5c-1@@ + 0.2), 0.3);
      pop("#c5c-ec2", (@@t:c5c-1@@ + 0.3), 0.3);
      pop("#c5c-db", (@@t:c5c-1@@ + 0.4), 0.3);
      pop("#c5c-lay", (@@t:c5c-1@@ + 0.5), 0.3);
      pop("#c5c-cfg", (@@t:c5c-1@@ + 0.6), 0.3);
      show("#c5c-edge", (@@t:c5c-1@@ + 0.3), 0.5, 30);
      pop("#c5c-elbl", (@@t:c5c-1@@ + 0.6), 0.3);
      pop("#c5c-sh0", (@@t:c5c-1@@ + 0.7), 0.3);
      pop("#c5c-sh1", (@@t:c5c-1@@ + 0.8), 0.3);
      pop("#c5c-sh2", (@@t:c5c-1@@ + 0.9), 0.3);
      pop("#c5c-ne", @@t:c5c-2@@, 0.3);
      tl.to("#c5c-back", { x: -420, duration: 0.7, ease: "power2.inOut" }, @@t:c5c-3@@);
      pop("#c5c-fn", @@t:c5c-4@@, 0.3);
      bump("#c5c-edge", (@@t:c5c-4@@ + 0.2), 1.04);
      bump("#c5c-region", @@t:c5c-5@@, 1.03);

      /* c5d */
      show("#c5d-region", @@t:c5d-1@@, 0.5, 30);
      pop("#c5d-rlbl", (@@t:c5d-1@@ + 0.2), 0.3);
      pop("#c5d-srv", (@@t:c5d-1@@ + 0.3), 0.3);
      pop("#c5d-db", @@t:c5d-2@@, 0.4);
      tl.fromTo("#c5d-route", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }, @@t:c5d-3@@);
      pop("#c5d-open", (@@t:c5d-3@@ + 0.3), 0.3);
      pop("#c5d-lock", (@@t:c5d-3@@ + 0.4), 0.3);
      pop("#c5d-copy", (@@t:c5d-3@@ + 0.7), 0.3);
      pop("#c5d-tick", @@t:c5d-4@@, 0.3);
      bump("#c5d-hcm", (@@t:c5d-4@@ + 0.2), 1.2);

      /* c5e */
      pop("#c5e-srv", @@t:c5e-1@@, 0.4);
      tl.fromTo("#c5e-s1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c5e-1@@ + 0.2));
      pop("#c5e-mid", (@@t:c5e-1@@ + 0.4), 0.3);
      tl.fromTo("#c5e-s2", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c5e-1@@ + 0.6));
      pop("#c5e-edge", (@@t:c5e-1@@ + 0.5), 0.4);
      tl.fromTo("#c5e-s3", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, (@@t:c5e-1@@ + 0.9));
      pop("#c5e-lap", (@@t:c5e-1@@ + 1.1), 0.4);
      pop("#c5e-thesis", @@t:c5e-2@@, 0.4);
      bump("#c5e-lap", @@t:c5e-3@@, 1.1);

      /* c6o */
      pop("#c6o-ic", @@start:c6o@@, 0.5);
      pop("#c6o-burst", @@start:c6o@@, 0.5);
      pop("#c6o-mascot", @@start:c6o@@, 0.5);
      show("#c6o-t", @@t:c6o-1@@, 0.4, 24);
      bump("#c6o-num", @@t:c6o-2@@, 1.1);

      /* c6a */
      show("#c6a-page", @@t:c6a-1@@, 0.5, 30);
      pop("#c6a-plbl", (@@t:c6a-1@@ + 0.2), 0.3);
      pop("#c6a-img", @@t:c6a-2@@, 0.3);
      pop("#c6a-logo", @@t:c6a-3@@, 0.3);
      pop("#c6a-css", @@t:c6a-4@@, 0.3);
      pop("#c6a-js", @@t:c6a-5@@, 0.3);
      show("#c6a-cache", @@t:c6a-6@@, 0.4, 30);
      pop("#c6a-cf", (@@t:c6a-6@@ + 0.1), 0.3);
      tl.to("#c6a-img", { x: 960, y: 260, duration: 0.6, ease: "power2.in" }, @@t:c6a-6@@);
      tl.to("#c6a-logo", { x: 940, y: 260, duration: 0.6, ease: "power2.in" }, (@@t:c6a-6@@ + 0.1));
      tl.to("#c6a-css", { x: 960, y: 240, duration: 0.6, ease: "power2.in" }, (@@t:c6a-6@@ + 0.2));
      tl.to("#c6a-js", { x: 940, y: 240, duration: 0.6, ease: "power2.in" }, (@@t:c6a-6@@ + 0.3));
      bump("#c6a-cache", (@@t:c6a-6@@ + 0.8), 1.03);

      /* c6b */
      pop("#c6b-pkt", @@t:c6b-1@@, 0.4);
      tl.to("#c6b-pkt", { x: 680, duration: 0.9, ease: "power2.inOut" }, (@@t:c6b-1@@ + 0.2));
      bump("#c6b-edge", @@t:c6b-3@@, 1.08);
      show("#c6b-shelf", @@t:c6b-2@@, 0.5, 30);
      tl.to("#c6b-scan", { x: 390, duration: 0.9, ease: "power1.inOut" }, (@@t:c6b-2@@ + 0.2));

      /* c6c */
      pop("#c6c-hit", @@t:c6c-1@@, 0.3);
      bump("#c6c-shelf", (@@t:c6c-1@@ + 0.2), 1.02);
      pop("#c6c-ring", @@t:c6c-2@@, 0.4);
      pop("#c6c-lbl", (@@t:c6c-2@@ + 0.1), 0.4);
      tl.fromTo("#w-c6c", { scale: 1.15 }, { scale: 1, duration: 0.6, ease: "power3.out" }, @@t:c6c-2@@);

      /* c6d */
      tl.fromTo("#c6d-long", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }, @@t:c6d-1@@);
      pop("#c6d-strike", (@@t:c6d-1@@ + 0.4), 0.3);
      tl.fromTo("#c6d-green", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c6d-2@@);
      pop("#c6d-pkt", (@@t:c6d-2@@ + 0.5), 0.3);
      pop("#c6d-user", (@@t:c6d-2@@ + 0.3), 0.3);
      bump("#c6d-hcm", @@t:c6d-3@@, 1.2);
      tl.to("#c6d-hn", { opacity: 0.35, duration: 0.4, ease: "power1.out" }, (@@t:c6d-3@@ + 0.2));
      pop("#c6d-cache", @@t:c6d-4@@, 0.3);
      pop("#c6d-valid", @@t:c6d-5@@, 0.3);

      /* c6e */
      pop("#c6e-phone", @@t:c6e-1@@, 0.4);
      tl.fromTo("#c6e-long", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }, (@@t:c6e-1@@ + 0.3));
      pop("#c6e-user", (@@t:c6e-1@@ + 0.4), 0.3);
      pop("#c6e-office", @@t:c6e-2@@, 0.4);
      pop("#c6e-doc", (@@t:c6e-2@@ + 0.3), 0.3);
      tl.to("#c6e-user", { x: -150, duration: 0.7, ease: "power2.inOut" }, @@t:c6e-3@@);
      pop("#c6e-x", @@t:c6e-4@@, 0.3);

      /* c6f */
      tl.to("#c6f-needle", { rotation: 60, transformOrigin: "320px 340px", duration: 0.9, ease: "power2.inOut" }, @@t:c6f-1@@);
      tl.to("#c6f-pkt", { x: -900, duration: 0.7, ease: "power3.in" }, (@@t:c6f-1@@ + 0.3));

      /* c6g */
      pop("#c6g-card", @@t:c6g-1@@, 0.4);
      pop("#c6g-ring", (@@t:c6g-1@@ + 0.2), 0.4);
      pop("#c6g-ttl", @@t:c6g-2@@, 0.3);
      show("#c6g-term", (@@t:c6g-2@@ + 0.3), 0.4, 24);
      pop("#c6g-pkt", @@t:c6g-4@@, 0.3);
      tl.to("#c6g-pkt", { x: 500, duration: 0.8, ease: "power2.inOut" }, (@@t:c6g-4@@ + 0.3));

      /* c6h */
      pop("#c6h-o", @@t:c6h-1@@, 0.4);
      pop("#c6h-e", (@@t:c6h-1@@ + 0.2), 0.4);
      pop("#c6h-ol", (@@t:c6h-1@@ + 0.4), 0.3);
      pop("#c6h-el", (@@t:c6h-1@@ + 0.5), 0.3);
      tl.to("#c6h-o", { scaleY: 0.3, duration: 0.9, ease: "power2.inOut" }, @@t:c6h-2@@);
      tl.to("#c6h-e", { scaleY: 0.85, duration: 0.9, ease: "power2.out" }, (@@t:c6h-2@@ + 0.2));

      /* c7o */
      pop("#c7o-ic", @@t:c7o-1@@, 0.5);
      pop("#c7o-burst", @@t:c7o-1@@, 0.5);
      pop("#c7o-mascot", @@t:c7o-1@@, 0.5);
      show("#c7o-t", @@t:c7o-1@@, 0.4, 24);
      show("#c7o-shelf", @@t:c7o-1@@, 0.5, 30);
      tl.to("#c7o-scan", { x: 450, duration: 1.0, ease: "power1.inOut" }, @@t:c7o-3@@);

      /* c7a */
      pop("#c7a-page", @@t:c7a-1@@, 0.4);
      pop("#c7a-new", (@@t:c7a-1@@ + 0.3), 0.3);
      show("#c7a-shelf", @@t:c7a-2@@, 0.5, 30);
      tl.to("#c7a-scan", { x: 390, duration: 0.9, ease: "power1.inOut" }, (@@t:c7a-2@@ + 0.2));
      pop("#c7a-x", @@t:c7a-3@@, 0.3);
      pop("#c7a-miss", (@@t:c7a-3@@ + 0.2), 0.3);

      /* c7b */
      tl.fromTo("#c7b-direct", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }, @@t:c7b-1@@);
      pop("#c7b-strike", (@@t:c7b-1@@ + 0.4), 0.3);
      show("#c7b-recbox", @@t:c7b-2@@, 0.4, 20);
      pop("#c7b-maybe", (@@t:c7b-2@@ + 0.3), 0.3);
      pop("#c7b-pkt", @@t:c7b-3@@, 0.3);
      tl.to("#c7b-pkt", { x: -840, duration: 1.1, ease: "power2.inOut" }, (@@t:c7b-3@@ + 0.3));
      tl.to("#c7b-bar", { x: -120, duration: 0.8, ease: "power2.inOut" }, @@t:c7b-4@@);
      pop("#c7b-tick", @@t:c7b-5@@, 0.3);

      /* c7c */
      pop("#c7c-x1", @@t:c7c-1@@, 0.3);
      pop("#c7c-x2", (@@t:c7c-1@@ + 0.1), 0.3);
      tl.to("#c7c-pkt", { x: 540, duration: 0.9, ease: "power2.inOut" }, (@@t:c7c-1@@ + 0.2));
      show("#c7c-org", @@t:c7c-2@@, 0.5, 30);
      pop("#c7c-olbl", (@@t:c7c-2@@ + 0.2), 0.3);
      pop("#c7c-s3", @@t:c7c-3@@, 0.3);
      pop("#c7c-l1", (@@t:c7c-3@@ + 0.1), 0.3);
      pop("#c7c-ec2", @@t:c7c-4@@, 0.3);
      pop("#c7c-l2", (@@t:c7c-4@@ + 0.1), 0.3);
      pop("#c7c-alb", @@t:c7c-5@@, 0.3);
      pop("#c7c-l3", (@@t:c7c-5@@ + 0.1), 0.3);
      pop("#c7c-http", @@t:c7c-6@@, 0.3);
      pop("#c7c-l4", (@@t:c7c-6@@ + 0.1), 0.3);
      tl.to("#c7c-s3, #c7c-ec2, #c7c-alb", { opacity: 0.35, duration: 0.5 }, @@t:c7c-7@@);
      tl.to("#c7c-http", { scale: 1.25, duration: 0.6, ease: "power2.out", transformOrigin: "50% 50%" }, @@t:c7c-7@@);
      pop("#c7c-my", (@@t:c7c-7@@ + 0.3), 0.3);

      /* c7d */
      pop("#c7d-org", @@t:c7d-1@@, 0.4);
      tl.fromTo("#c7d-line", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c7d-2@@);
      tl.to("#c7d-dot", { x: -1200, duration: 1.2, ease: "none" }, (@@t:c7d-2@@ + 0.2));
      show("#c7d-ke", @@t:c7d-3@@, 0.4, 20);
      show("#c7d-kr", (@@t:c7d-3@@ + 0.1), 0.4, 20);
      pop("#c7d-tk1", (@@t:c7d-3@@ + 0.3), 0.3);
      pop("#c7d-tk2", (@@t:c7d-3@@ + 0.4), 0.3);
      pop("#c7d-chip", @@t:c7d-4@@, 0.3);

      /* c7e */
      pop("#c7e-u2", @@t:c7e-1@@, 0.4);
      pop("#c7e-hit", (@@t:c7e-1@@ + 0.2), 0.3);
      tl.to("#c7e-pkt", { x: -420, duration: 0.6, ease: "power2.in" }, (@@t:c7e-1@@ + 0.2));
      bump("#c7e-img", @@t:c7e-2@@, 1.1);
      pop("#c7e-ring", (@@t:c7e-2@@ + 0.1), 0.3);

      /* c7f */
      show("#c7f-hitbox", @@t:c7f-1@@, 0.5, 30);
      show("#c7f-missbox", (@@t:c7f-1@@ + 0.2), 0.5, 30);
      tl.to("#c7f-h0", { backgroundColor: "#30A46C", duration: 0.3 }, @@t:c7f-2@@);
      pop("#c7f-hl", (@@t:c7f-2@@ + 0.1), 0.3);
      pop("#c7f-pkt", (@@t:c7f-2@@ + 0.2), 0.2);
      tl.to("#c7f-pkt", { x: -380, duration: 0.6, ease: "power2.out" }, (@@t:c7f-2@@ + 0.3));
      pop("#c7f-ml", @@t:c7f-3@@, 0.3);
      tl.to("#c7f-arrow", { x: 260, duration: 0.5, ease: "power2.out" }, (@@t:c7f-3@@ + 0.2));
      tl.to("#c7f-arrow", { x: 0, duration: 0.5, ease: "power2.in" }, (@@t:c7f-3@@ + 0.8));

      /* c7g */
      tl.fromTo("#c7g-fill", { scaleY: 0 }, { scaleY: 0.8, duration: 1.0, ease: "power2.out" }, @@t:c7g-1@@);
      pop("#c7g-hit", (@@t:c7g-1@@ + 0.4), 0.3);
      tl.to("#c7g-origin", { scale: 0.5, duration: 0.8, ease: "power2.inOut" }, @@t:c7g-2@@);

      /* c8o */
      pop("#c8o-ic", @@start:c8o@@, 0.5);
      pop("#c8o-burst", @@start:c8o@@, 0.5);
      pop("#c8o-mascot", @@start:c8o@@, 0.5);
      show("#c8o-t", @@t:c8o-1@@, 0.4, 24);
      show("#c8o-bar", @@t:c8o-1@@, 0.4, 0);
      pop("#c8o-rec", (@@t:c8o-1@@ + 0.3), 0.4);

      /* c8a */
      pop("#c8a-e0", @@t:c8a-1@@, 0.3);
      pop("#c8a-e1", (@@t:c8a-1@@ + 0.05), 0.3);
      pop("#c8a-e2", (@@t:c8a-1@@ + 0.1), 0.3);
      pop("#c8a-e3", (@@t:c8a-1@@ + 0.15), 0.3);
      pop("#c8a-e4", (@@t:c8a-1@@ + 0.2), 0.3);
      pop("#c8a-e5", (@@t:c8a-1@@ + 0.25), 0.3);
      show("#c8a-vmid", (@@t:c8a-1@@ + 0.4), 0.4, 0);
      show("#c8a-rshelf", @@t:c8a-2@@, 0.5, 30);
      pop("#c8a-tl2", (@@t:c8a-2@@ + 0.2), 0.3);
      pop("#c8a-obj", @@t:c8a-3@@, 0.3);
      tl.to("#c8a-obj", { y: 120, duration: 0.8, ease: "power2.inOut" }, (@@t:c8a-3@@ + 0.3));
      pop("#c8a-org", @@t:c8a-4@@, 0.3);
      tl.fromTo("#c8a-dot2", { y: 0 }, { y: 150, duration: 0.9, ease: "power1.inOut" }, (@@t:c8a-4@@ + 0.2));
      pop("#c8a-tl1", (@@t:c8a-1@@ + 0.3), 0.3);
      pop("#c8a-tl3", (@@t:c8a-4@@ + 0.3), 0.3);

      /* c8b */
      tl.fromTo("#c8b-curve", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" }, @@t:c8b-1@@);
      pop("#c8b-img", @@t:c8b-2@@, 0.3);
      pop("#c8b-vid", @@t:c8b-3@@, 0.3);
      pop("#c8b-pr", @@t:c8b-4@@, 0.3);
      tl.fromTo("#c8b-tail", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c8b-5@@);
      pop("#c8b-rec", (@@t:c8b-5@@ + 0.3), 0.3);

      /* c8c */
      show("#c8c-box", @@t:c8c-1@@, 0.4, 20);
      pop("#c8c-sh", (@@t:c8c-1@@ + 0.2), 0.3);
      pop("#c8c-l", @@t:c8c-2@@, 0.3);
      tl.fromTo("#c8c-l1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c8c-2@@ + 0.2));
      tl.to("#c8c-solid", { opacity: 1, duration: 0.4 }, @@t:c8c-3@@);
      pop("#c8c-opt", (@@t:c8c-3@@ + 0.2), 0.3);

      /* c8d */
      pop("#c8d-u0", @@t:c8d-1@@, 0.3);
      pop("#c8d-u1", (@@t:c8d-1@@ + 0.05), 0.3);
      pop("#c8d-u2", (@@t:c8d-1@@ + 0.1), 0.3);
      pop("#c8d-u3", (@@t:c8d-1@@ + 0.15), 0.3);
      pop("#c8d-u4", (@@t:c8d-1@@ + 0.2), 0.3);
      tl.fromTo("#c8d-a0", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c8d-2@@);
      tl.fromTo("#c8d-a1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c8d-2@@ + 0.05));
      tl.fromTo("#c8d-a2", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c8d-2@@ + 0.1));
      tl.fromTo("#c8d-a3", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c8d-2@@ + 0.15));
      tl.fromTo("#c8d-a4", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c8d-2@@ + 0.2));
      pop("#c8d-ring", (@@t:c8d-2@@ + 0.3), 0.3);
      pop("#c8d-cnt", (@@t:c8d-2@@ + 0.4), 0.3);
      pop("#c8d-file", @@t:c8d-4@@, 0.3);
      tl.to("#c8d-a0, #c8d-a1, #c8d-a2, #c8d-a3, #c8d-a4", { opacity: 0.15, duration: 0.4 }, @@t:c8d-3@@);
      pop("#c8d-sh", (@@t:c8d-3@@ + 0.1), 0.3);
      tl.fromTo("#c8d-so", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c8d-3@@ + 0.3));
      tl.to("#c8d-ring", { opacity: 0, duration: 0.4 }, @@t:c8d-3@@);
      tl.to("#c8d-file", { opacity: 0, duration: 0.3 }, (@@t:c8d-3@@ + 0.5));

      /* c8e */
      tl.to("#c8e-knob", { x: 110, duration: 0.5, ease: "power2.inOut" }, @@t:c8e-1@@);
      tl.to("#c8e-track", { backgroundColor: "#30A46C", duration: 0.5 }, @@t:c8e-1@@);
      pop("#c8e-coin", (@@t:c8e-1@@ + 0.3), 0.3);
      pop("#c8e-l1", (@@t:c8e-1@@ + 0.2), 0.3);
      pop("#c8e-small", @@t:c8e-2@@, 0.3);
      tl.fromTo("#c8e-x", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" }, (@@t:c8e-2@@ + 0.2));
      pop("#c8e-big", (@@t:c8e-2@@ + 0.2), 0.3);
      pop("#c8e-shield", (@@t:c8e-2@@ + 0.4), 0.3);
      pop("#c8e-l2", (@@t:c8e-2@@ + 0.5), 0.3);

      /* c9o */
      pop("#c9o-ic", @@start:c9o@@, 0.5);
      pop("#c9o-burst", @@start:c9o@@, 0.5);
      pop("#c9o-mascot", @@start:c9o@@, 0.5);
      show("#c9o-t", @@t:c9o-2@@, 0.4, 24);
      pop("#c9o-q", @@t:c9o-1@@, 0.4);
      pop("#c9o-k", (@@t:c9o-1@@ + 0.4), 0.3);

      /* c9a */
      tl.fromTo("#c9a-ring", { strokeDashoffset: 0 }, { strokeDashoffset: 1, duration: 2.6, ease: "none" }, @@t:c9a-1@@);
      pop("#c9a-t1", @@t:c9a-2@@, 0.25);
      pop("#c9a-t2", (@@t:c9a-2@@ + 0.2), 0.25);
      pop("#c9a-t3", (@@t:c9a-2@@ + 0.4), 0.25);
      pop("#c9a-lbl", (@@t:c9a-1@@ + 0.3), 0.3);
      pop("#c9a-org", @@t:c9a-3@@, 0.3);
      pop("#c9a-tk", (@@t:c9a-3@@ + 0.6), 0.3);
      tl.fromTo("#c9a-ring", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c9a-3@@ + 0.8));

      /* c9b */
      pop("#c9b-logo", @@t:c9b-1@@, 0.3);
      pop("#c9b-lbar", (@@t:c9b-1@@ + 0.2), 0.3);
      pop("#c9b-ll", (@@t:c9b-1@@ + 0.4), 0.3);
      tl.to("#c9b-lbar", { scaleX: 1.3, duration: 0.8, ease: "power2.inOut" }, @@t:c9b-2@@);
      pop("#c9b-price", @@t:c9b-3@@, 0.3);
      pop("#c9b-rbar", (@@t:c9b-3@@ + 0.2), 0.2);
      bump("#c9b-rbar", (@@t:c9b-3@@ + 0.5), 1.15);
      pop("#c9b-rl", (@@t:c9b-3@@ + 0.4), 0.3);

      /* c9c */
      show("#c9c-term", @@t:c9c-1@@, 0.5, 30);
      pop("#c9c-track", (@@t:c9c-1@@ + 0.2), 0.3);
      pop("#c9c-chip", @@t:c9c-3@@, 0.3);
      pop("#c9c-min", @@t:c9c-4@@, 0.3);
      pop("#c9c-max", (@@t:c9c-4@@ + 0.1), 0.3);
      pop("#c9c-mk", (@@t:c9c-4@@ + 0.2), 0.3);
      tl.to("#c9c-mk", { x: 600, duration: 0.5, ease: "power2.out" }, (@@t:c9c-4@@ + 0.5));
      tl.to("#c9c-mk", { x: 500, duration: 0.5, ease: "power2.inOut" }, (@@t:c9c-4@@ + 1.2));

      /* c9d */
      pop("#c9d-lbl", @@t:c9d-1@@, 0.3);
      tl.fromTo("#c9d-key", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.1, ease: "power2.out" }, (@@t:c9d-1@@ + 0.2));
      pop("#c9d-shelf", @@t:c9d-2@@, 0.4);
      tl.to("#c9d-t0", { fill: "#30A46C", duration: 0.25 }, @@t:c9d-3@@);
      tl.to("#c9d-t1", { fill: "#30A46C", duration: 0.25 }, @@t:c9d-4@@);
      tl.to("#c9d-t2", { fill: "#30A46C", duration: 0.25 }, @@t:c9d-5@@);
      tl.to("#c9d-t3", { fill: "#30A46C", duration: 0.25 }, @@t:c9d-6@@);
      tl.to("#c9d-shelf", { backgroundColor: "#30A46C", duration: 0.3 }, @@t:c9d-7@@);

      /* c9e */
      pop("#c9e-r0", @@t:c9e-1@@, 0.25);
      pop("#c9e-r1", (@@t:c9e-1@@ + 0.1), 0.25);
      pop("#c9e-r2", (@@t:c9e-1@@ + 0.2), 0.25);
      pop("#c9e-r3", (@@t:c9e-1@@ + 0.3), 0.25);
      show("#c9e-shelf", (@@t:c9e-1@@ + 0.4), 0.4, 20);
      tl.to("#c9e-fill", { scaleY: 0.4, duration: 1.0, ease: "power2.inOut" }, (@@t:c9e-1@@ + 0.5));
      pop("#c9e-hr", (@@t:c9e-1@@ + 0.6), 0.3);

      /* c9f */
      pop("#c9f-card", @@t:c9f-1@@, 0.4);
      pop("#c9f-la", (@@t:c9f-1@@ + 0.2), 0.3);
      tl.to("#c9f-red", { opacity: 1, duration: 0.3 }, @@t:c9f-2@@);
      pop("#c9f-warn", (@@t:c9f-2@@ + 0.1), 0.3);
      tl.fromTo("#c9f-card", { scale: 1.08 }, { scale: 1, duration: 0.5, ease: "power3.out" }, @@t:c9f-2@@);
      tl.fromTo("#c9f-arr", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c9f-3@@);
      pop("#c9f-b", (@@t:c9f-3@@ + 0.2), 0.3);
      pop("#c9f-lb", (@@t:c9f-3@@ + 0.3), 0.3);
      bump("#c9f-b", (@@t:c9f-3@@ + 0.6), 1.12);

      /* c9g */
      tl.to("#c9g-knob", { x: 110, duration: 0.5, ease: "power2.inOut" }, @@t:c9g-1@@);
      tl.fromTo("#c9g-strike", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" }, (@@t:c9g-1@@ + 0.4));
      pop("#c9g-lbl", (@@t:c9g-1@@ + 0.5), 0.3);
      pop("#c9g-r0", @@t:c9g-2@@, 0.3);
      pop("#c9g-r1", (@@t:c9g-2@@ + 0.15), 0.3);
      pop("#c9g-r2", (@@t:c9g-2@@ + 0.3), 0.3);
      pop("#c9g-r3", (@@t:c9g-2@@ + 0.45), 0.3);

      /* c10o */
      pop("#c10o-ic", @@start:c10o@@, 0.5);
      pop("#c10o-burst", @@start:c10o@@, 0.5);
      pop("#c10o-mascot", @@start:c10o@@, 0.5);
      show("#c10o-t", @@t:c10o-1@@, 0.4, 24);
      pop("#c10o-cf", (@@t:c10o-1@@ + 0.2), 0.3);
      pop("#c10o-x", @@t:c10o-2@@, 0.3);
      pop("#c10o-cart", (@@t:c10o-2@@ + 0.1), 0.3);

      /* c10a */
      tl.fromTo("#c10a-div", { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: "power2.out" }, @@t:c10a-1@@);
      show("#c10a-lhalf", @@t:c10a-2@@, 0.5, 0);
      pop("#c10a-ll", @@t:c10a-6@@, 0.3);
      pop("#c10a-rl", (@@t:c10a-6@@ + 0.1), 0.3);
      pop("#c10a-logo", @@t:c10a-3@@, 0.3);
      pop("#c10a-img", (@@t:c10a-3@@ + 0.1), 0.3);
      pop("#c10a-css", (@@t:c10a-3@@ + 0.2), 0.3);
      pop("#c10a-js", (@@t:c10a-3@@ + 0.3), 0.3);
      pop("#c10a-vid", (@@t:c10a-3@@ + 0.4), 0.3);
      pop("#c10a-u1", @@t:c10a-4@@, 0.3);
      tl.fromTo("#c10a-cdn", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c10a-5@@);
      pop("#c10a-edge", (@@t:c10a-5@@ + 0.1), 0.3);
      pop("#c10a-tick", @@t:c10a-7@@, 0.3);

      /* c10b */
      show("#c10b-rhalf", @@t:c10b-1@@, 0.5, 0);
      pop("#c10b-rl", (@@t:c10b-1@@ + 0.2), 0.3);
      pop("#c10b-a", @@t:c10b-2@@, 0.3);
      pop("#c10b-b", (@@t:c10b-2@@ + 0.1), 0.3);
      pop("#c10b-c", (@@t:c10b-2@@ + 0.2), 0.3);
      pop("#c10b-d", (@@t:c10b-2@@ + 0.3), 0.3);
      pop("#c10b-e", (@@t:c10b-2@@ + 0.4), 0.3);
      bump("#c10b-d", @@t:c10b-3@@, 1.1);
      bump("#c10b-e", (@@t:c10b-3@@ + 0.3), 1.1);

      /* c10c */
      pop("#c10c-a", @@t:c10c-1@@, 0.3);
      pop("#c10c-b", (@@t:c10c-1@@ + 0.1), 0.3);
      tl.to("#c10c-cart", { x: 330, duration: 0.8, ease: "power2.inOut" }, @@t:c10c-2@@);
      pop("#c10c-x", (@@t:c10c-2@@ + 0.6), 0.3);

      /* c10d */
      pop("#c10d-org", @@t:c10d-1@@, 0.4);
      tl.fromTo("#c10d-l2", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c10d-2@@);
      tl.to("#c10d-l2", { strokeWidth: 14, duration: 0.5, ease: "power1.out" }, (@@t:c10d-2@@ + 0.6));
      pop("#c10d-x", @@t:c10d-3@@, 0.3);
      tl.to("#c10d-bar", { opacity: 0.2, duration: 0.5 }, @@t:c10d-4@@);
      tl.to("#c10d-map", { opacity: 1, duration: 0.6 }, (@@t:c10d-4@@ + 0.1));
      bump("#c10d-hcm", @@t:c10d-5@@, 1.25);
      bump("#c10d-hn", (@@t:c10d-5@@ + 0.2), 1.25);

      /* c11o */
      pop("#c11o-ic", @@t:c11o-1@@, 0.5);
      pop("#c11o-burst", @@t:c11o-1@@, 0.5);
      pop("#c11o-mascot", @@t:c11o-1@@, 0.5);
      show("#c11o-t", @@t:c11o-1@@, 0.4, 24);

      /* c11a */
      tl.fromTo("#c11a-map", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }, @@t:c11a-1@@);
      tl.to("#c11a-cam", { scale: 1.05, duration: 10, ease: "none" }, @@t:c11a-1@@);
      pop("#c11a-user", (@@t:c11a-1@@ + 0.3), 0.3);
      pop("#c11a-u", @@t:c11a-2@@, 0.3);
      pop("#c11a-sign", @@t:c11a-3@@, 0.3);
      pop("#c11a-dns", (@@t:c11a-3@@ + 0.2), 0.3);
      pop("#c11a-pop", (@@t:c11a-3@@ + 0.4), 0.3);

      /* c11b */
      tl.fromTo("#c11b-map", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }, @@t:c11b-1@@);
      pop("#c11b-user", (@@t:c11b-1@@ + 0.1), 0.3);
      tl.fromTo("#c11b-arc", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c11b-2@@);
      pop("#c11b-edge", (@@t:c11b-2@@ + 0.3), 0.3);
      pop("#c11b-lbl", (@@t:c11b-2@@ + 0.5), 0.3);
      pop("#c11b-hit", @@t:c11b-3@@, 0.3);
      pop("#c11b-ok", @@t:c11b-4@@, 0.3);
      tl.to("#c11b-cam", { scale: 1.05, duration: 9, ease: "none" }, @@t:c11b-1@@);

      /* c11c */
      tl.fromTo("#c11c-map", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }, @@t:c11c-1@@);
      tl.to("#c11c-cam", { scale: 1.04, duration: 12, ease: "none" }, @@t:c11c-1@@);
      pop("#c11c-edge", (@@t:c11c-1@@ + 0.2), 0.3);
      pop("#c11c-rec", (@@t:c11c-1@@ + 0.3), 0.3);
      tl.fromTo("#c11c-er", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c11c-1@@ + 0.4));
      pop("#c11c-maybe", (@@t:c11c-1@@ + 0.6), 0.3);
      pop("#c11c-miss", (@@t:c11c-1@@ + 0.8), 0.3);
      tl.fromTo("#c11c-direct", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c11c-2@@ + 0.2));
      tl.fromTo("#c11c-ro", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, @@t:c11c-2@@);
      pop("#c11c-org", (@@t:c11c-2@@ + 0.4), 0.3);
      pop("#c11c-shelf", @@t:c11c-3@@, 0.4);

      /* c11d */
      pop("#c11d-user2", @@t:c11d-1@@, 0.3);
      tl.fromTo("#c11d-arc", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c11d-1@@ + 0.2));
      pop("#c11d-img", @@t:c11d-2@@, 0.3);
      bump("#c11d-img", (@@t:c11d-2@@ + 0.3), 1.12);
      pop("#c11d-hit", (@@t:c11d-2@@ + 0.2), 0.3);
      tl.to("#c11d-cam", { scale: 1.04, duration: 6.6, ease: "none" }, @@t:c11d-1@@);

      /* c11e */
      pop("#c11e-copy", @@t:c11e-1@@, 0.4);
      tl.fromTo("#c11e-strike", { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "power2.out" }, (@@t:c11e-1@@ + 0.6));
      tl.fromTo("#c11e-map", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "power1.out" }, (@@t:c11e-1@@ + 0.3));
      tl.fromTo("#c11e-long", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:c11e-1@@ + 0.8));
      tl.fromTo("#c11e-cam", { scale: 1.25 }, { scale: 1, duration: 1.0, ease: "power3.out" }, @@t:c11e-2@@);
      tl.to("#c11e-cam", { scale: 1.06, duration: 13, ease: "none" }, (@@t:c11e-2@@ + 1.0));
      tl.fromTo("#c11e-a1", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, (@@t:c11e-2@@ + 0.3));
      pop("#c11e-user", (@@t:c11e-2@@ + 0.2), 0.3);
      pop("#c11e-min", (@@t:c11e-2@@ + 0.4), 0.3);
      pop("#c11e-caching", @@t:c11e-3@@, 0.3);
      pop("#c11e-routing", @@t:c11e-4@@, 0.3);
      pop("#c11e-cf", @@t:c11e-5@@, 0.4);
      tl.to("#c11e-long", { opacity: 0.2, duration: 0.6 }, @@t:c11e-5@@);

      /* o1 */
      tl.to("#o1-cam", { scale: 1.08, duration: 9, ease: "none" }, @@t:o1-1@@);
      tl.fromTo("#o1-long", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }, @@t:o1-1@@);
      pop("#o1-user", (@@t:o1-1@@ + 0.2), 0.3);
      pop("#o1-km", (@@t:o1-1@@ + 0.4), 0.3);
      pop("#o1-clock", @@t:o1-3@@, 0.3);

      /* o2 */
      tl.to("#o2-pkg", { x: 242, y: 17, duration: 1.0, ease: "power2.in" }, @@t:o2-1@@);
      tl.fromTo("#o2-ring", { scale: 1, opacity: 1 }, { scale: 6, opacity: 0, duration: 0.8, ease: "power2.out" }, @@t:o2-2@@);
      tl.to("#o2-pkg", { opacity: 0, duration: 0.1 }, @@t:o2-2@@);
      tl.to("#o2-arc", { opacity: 0.2, duration: 1.0, ease: "power1.out" }, (@@t:o2-2@@ + 0.2));
      tl.to("#o2-long", { opacity: 0.2, duration: 1.0, ease: "power1.out" }, (@@t:o2-2@@ + 0.2));
      tl.fromTo("#o2-cam", { scale: 1.3 }, { scale: 1, duration: 1.1, ease: "power3.out" }, @@t:o2-3@@);
      tl.fromTo("#o2-short", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, (@@t:o2-3@@ + 0.3));
      pop("#o2-thesis", (@@t:o2-3@@ + 0.5), 0.5);

      /* o3 */
      tl.to("#o3-map", { opacity: 0.25, duration: 0.4 }, @@t:o3-2@@);
      tl.fromTo("#o3-tbl", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, @@t:o3-2@@);
      pop("#o3-r0", (@@t:o3-2@@ + 0.2), 0.3);
      pop("#o3-r1", (@@t:o3-2@@ + 0.4), 0.3);
      pop("#o3-r2", (@@t:o3-2@@ + 0.6), 0.3);
      tl.to("#o3-r1", { backgroundColor: "#EAF6EF", duration: 0.4 }, @@t:o3-5@@);
      tl.to("#o3-tbl", { opacity: 0, duration: 0.4 }, @@t:o3-3@@);
      tl.to("#o3-map", { opacity: 1, duration: 0.4 }, @@t:o3-3@@);
      tl.fromTo("#o3-cam", { scale: 1.4 }, { scale: 1, duration: 0.9, ease: "power3.out" }, @@t:o3-3@@);
      tl.to("#o3-cam", { scale: 1.08, duration: 5.0, ease: "none" }, (@@t:o3-3@@ + 0.9));
      pop("#o3-cf1", @@t:o3-1@@, 0.3);
      pop("#o3-cf2", (@@t:o3-1@@ + 0.2), 0.3);
      bump("#o3-u4", @@t:o3-6@@, 1.2);

      /* o4 */
      pop("#o4-logo", @@t:o4-1@@, 0.4);
      tl.to("#o4-orbit", { rotation: 360, duration: 3.9, ease: "none" }, @@t:o4-1@@);

      tl.set({}, {}, @@end@@);
