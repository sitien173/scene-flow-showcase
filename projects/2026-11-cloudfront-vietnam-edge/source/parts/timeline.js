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

      /* hook h1: the laptop shop in HCMC, the request, the arc to the US server, the distance, the question */
pop("#h1-laptop", @@t:h1-laptop@@, 0.5);
pop("#h1-req", @@t:h1-req@@, 0.4);
draw("#h1-arc", @@t:h1-arc@@, 1.0);
pop("#h1-hcm", @@t:h1-hcm@@, 0.4);
pop("#cam-h1 .srv", @@t:h1-arc@@ + 0.9, 0.4);
pop("#h1-km", @@t:h1-km@@, 0.5);
pop("#h1-q", @@t:h1-q@@, 0.5);
/* problem p1: the request hops through the network, the latency gauge climbs */
tl.set("#p1-needle", { autoAlpha: 0 }, 0);
pop("#p1-tile", @@start:p1@@, 0.5);
draw("#p1-route", @@t:p1-route@@, 1.2);
pop("#p1-hops", @@t:p1-hops@@, 0.4, 0.3);
pop("#p1-n-user", @@t:p1-chain@@ + 0.00, 0.45);
show("#p1-l-user", @@t:p1-chain@@ + 0.10, 0.35, 12);
pop("#p1-n-origin", @@t:p1-chain@@ + 0.12, 0.45);
show("#p1-l-origin", @@t:p1-chain@@ + 0.22, 0.35, 12);
pop("#p1-gauge", @@t:p1-gauge@@, 0.5);
tl.set("#p1-needle", { autoAlpha: 1 }, @@t:p1-gauge@@);
tl.fromTo("#p1-needle", { rotation: -70, transformOrigin: "50% 100%" }, { rotation: 55, transformOrigin: "50% 100%", duration: 0.9, ease: "power2.inOut" }, @@t:p1-needle@@);
sweep("#p1-line", @@t:p1-line@@, 0.5);
/* cdn s1: edge dots light up, the CloudFront logo, the Hanoi and HCMC pins */
pop("#s1-globe", @@t:s1-globe@@, 0.5);
tl.fromTo("#s1-edges circle", { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%" }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)", stagger: 0.04, transformOrigin: "50% 50%" }, @@t:s1-edges@@);
pop("#s1-logo", @@t:s1-logo@@, 0.5);
pop("#s1-edgebox", @@t:s1-edgebox@@, 0.5);
pop("#s1-han", @@t:s1-han@@, 0.4);
show("#s1-lab-han", @@t:s1-lab-han@@, 0.4, 16);
pop("#s1-hcm", @@t:s1-hcm@@, 0.4);
show("#s1-lab-hcm", @@t:s1-lab-hcm@@, 0.4, 16);
/* route s2: the camera moves to HCMC, the request tries three edges, the lowest latency one is kept */
tl.to("#cam-s2", { scale: 2.8, duration: 0.8, ease: "power2.inOut", transformOrigin: "315.8px 587.0px" }, @@t:s2-zoom@@);
draw("#s2-rt-edge", @@t:s2-rt-edge@@, 0.5);
draw("#s2-rt-han", @@t:s2-rt-han@@, 0.5);
draw("#s2-rt-sgp", @@t:s2-rt-sgp@@, 0.5);
pop("#s2-user", @@t:s2-user@@, 0.4);
pop("#s2-ehcm", @@t:s2-ehcm@@, 0.4);
pop("#s2-ehan", @@t:s2-ehan@@, 0.4);
pop("#s2-esgp", @@t:s2-esgp@@, 0.4);
pop("#s2-chip", @@t:s2-chip@@, 0.4);
pop("#s2-n-user", @@t:s2-chain@@ + 0.00, 0.45);
show("#s2-l-user", @@t:s2-chain@@ + 0.10, 0.35, 12);
pop("#s2-n-edge", @@t:s2-chain@@ + 0.12, 0.45);
show("#s2-l-edge", @@t:s2-chain@@ + 0.22, 0.35, 12);
pop("#s2-n-origin", @@t:s2-chain@@ + 0.24, 0.45);
show("#s2-l-origin", @@t:s2-chain@@ + 0.34, 0.35, 12);
show("#s2-lab-han", @@t:s2-zoom@@ + 0.8, 0.4, 12);
show("#s2-lab-hcm", @@t:s2-zoom@@ + 0.8, 0.4, 12);
show("#s2-lab-hsa", @@t:s2-zoom@@ + 0.8, 0.4, 12);
show("#s2-lab-tsa", @@t:s2-zoom@@ + 0.8, 0.4, 12);
/* hit h2: the edge shelf holds the file, CACHE HIT, a green loop, the US server is not needed */
pop("#h2-shelf", @@t:h2-shelf@@, 0.5);
pop("#h2-chip", @@t:h2-chip@@, 0.4);
pop("#h2-user", @@t:h2-user@@, 0.4);
pop("#h2-ehcm", @@t:h2-ehcm@@, 0.4);
draw("#h2-loop", @@t:h2-loop@@, 0.9);
pop("#h2-hit", @@t:h2-hit@@, 0.5);
pop("#h2-cross", @@t:h2-cross@@, 0.4);
pop("#h2-tick", @@t:h2-tick@@, 0.4);
/* miss m1: the shelf is empty, CACHE MISS, the request goes on to the Regional Edge Cache */
pop("#m1-shelf", @@t:m1-shelf@@, 0.4);
pop("#m1-chip", @@t:m1-chip@@, 0.4);
pop("#m1-pill", @@t:m1-pill@@, 0.5);
pop("#m1-n-user", @@t:m1-chain@@ + 0.00, 0.45);
show("#m1-l-user", @@t:m1-chain@@ + 0.10, 0.35, 12);
pop("#m1-n-edge", @@t:m1-chain@@ + 0.12, 0.45);
show("#m1-l-edge", @@t:m1-chain@@ + 0.22, 0.35, 12);
pop("#m1-n-reg", @@t:m1-chain@@ + 0.24, 0.45);
show("#m1-l-reg", @@t:m1-chain@@ + 0.34, 0.35, 12);
pop("#m1-n-origin", @@t:m1-chain@@ + 0.36, 0.45);
show("#m1-l-origin", @@t:m1-chain@@ + 0.46, 0.35, 12);
show("#m1-bypass", @@t:m1-bypass@@, 0.5, 20);
/* origin m2: the long trip to the US origin, the file is cached at the regional and edge tiers, next users are served fast */
draw("#m2-route", @@t:m2-route@@, 1.0);
pop("#m2-n-user", @@t:m2-chain@@ + 0.00, 0.45);
show("#m2-l-user", @@t:m2-chain@@ + 0.10, 0.35, 12);
pop("#m2-n-edge", @@t:m2-chain@@ + 0.12, 0.45);
show("#m2-l-edge", @@t:m2-chain@@ + 0.22, 0.35, 12);
pop("#m2-n-reg", @@t:m2-chain@@ + 0.24, 0.45);
show("#m2-l-reg", @@t:m2-chain@@ + 0.34, 0.35, 12);
pop("#m2-n-origin", @@t:m2-chain@@ + 0.36, 0.45);
show("#m2-l-origin", @@t:m2-chain@@ + 0.46, 0.35, 12);
pop("#m2-hcm", @@t:m2-hcm@@, 0.4);
pop("#m2-fr", @@t:m2-fr@@, 0.4);
pop("#m2-fe", @@t:m2-fe@@, 0.4);
pop("#m2-next", @@t:m2-next@@, 0.5, 0.3);
draw("#m2-next-lines path", @@t:m2-next-lines@@, 0.5, 0.1);
/* limit l1: static files are cached, account, cart and payment go to the backend */
pop("#l1-split", @@t:l1-split@@, 0.5);
show("#l1-lc", @@t:l1-lc@@, 0.4, 16);
pop("#l1-c0", @@t:l1-c0@@, 0.4);
pop("#l1-c1", @@t:l1-c1@@, 0.4);
pop("#l1-c2", @@t:l1-c2@@, 0.4);
show("#l1-lb", @@t:l1-lb@@, 0.4, 16);
pop("#l1-r0", @@t:l1-r0@@, 0.4);
pop("#l1-r1", @@t:l1-r1@@, 0.4);
pop("#l1-r2", @@t:l1-r2@@, 0.4);
draw("#l1-back-path", @@t:l1-back-path@@, 0.9);
pop("#l1-n-origin", @@t:l1-chain@@ + 0.00, 0.45);
show("#l1-l-origin", @@t:l1-chain@@ + 0.10, 0.35, 12);
/* reveal r1: the long path fades, the green hits sit near the users, the CloudFront logo and the thesis */
tl.to("#r1-arc", { opacity: 0.25, duration: 0.8, ease: "power1.in" }, @@t:r1-arc@@);
pop("#r1-edges", @@t:r1-edges@@, 0.5, 0.3);
pop("#r1-hcm", @@t:r1-hcm@@, 0.4);
pop("#r1-han", @@t:r1-han@@, 0.4);
tl.fromTo("#r1-ring1", { autoAlpha: 0, scale: 1, transformOrigin: "50% 50%" }, { autoAlpha: 1, scale: 1.1, duration: 0.2, transformOrigin: "50% 50%" }, @@t:r1-ring@@);
tl.to("#r1-ring1", { scale: 2.4, autoAlpha: 0, duration: 0.8, ease: "power2.out", transformOrigin: "50% 50%" }, @@t:r1-ring@@ + 0.2);
tl.fromTo("#r1-ring2", { autoAlpha: 0, scale: 1, transformOrigin: "50% 50%" }, { autoAlpha: 1, scale: 1.1, duration: 0.2, transformOrigin: "50% 50%" }, @@t:r1-ring@@ + 0.2);
tl.to("#r1-ring2", { scale: 2.4, autoAlpha: 0, duration: 0.8, ease: "power2.out", transformOrigin: "50% 50%" }, @@t:r1-ring@@ + 0.4);
pop("#r1-logo", @@t:r1-logo@@, 0.5);
show("#r1-lbl", @@t:r1-lbl@@, 0.4, 20);
show("#r1-thesis", @@t:r1-thesis@@, 0.5, 24);
pop("#r1-tick", @@t:r1-tick@@, 0.4);
/* outro e1: the channel logo over the faded map */
pop("#e1-logo", @@t:e1-logo@@, 0.5);

      tl.set({}, {}, @@end@@);
