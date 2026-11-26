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

      /* shared component helpers (parts/ch/README.md). Every call is a tween on tl at a recorded time. */
      /* a meter fills from its from-percent to its percent; fill is the .fill inside the meter */
      function meter(id, t, pct, d, from) {
        tl.fromTo("#" + id + " .fill", { scaleX: (from || 0) / 100 }, { scaleX: pct / 100, duration: d || 0.6, ease: "power2.out", immediateRender: false }, t);
      }
      /* a row of dots (class dot) under a container, each moving from x0 to x1 with a delay of gap per dot */
      function stream(sel, t, dur, x0, x1, gap) {
        document.querySelectorAll(sel).forEach(function (el, k) {
          tl.fromTo(el, { x: x0, autoAlpha: 0 }, { x: x1, autoAlpha: 1, duration: dur, ease: "none", immediateRender: false }, t + k * gap);
          tl.to(el, { autoAlpha: 0, duration: 0.01, immediateRender: false }, t + k * gap + dur);
        });
      }
      /* the chapter card (STORYBOARD B9): the card elements pop in on t, leave at tChip, the chip pops in */
      function chapterCard(id, t, tChip) {
        pop("#" + id + "-num", t, 0.5);
        pop("#" + id + "-tile", t + 0.05, 0.6, 0.6);
        show("#" + id + "-title", t + 0.15, 0.5);
        pop("#" + id + "-burst", t + 0.2, 0.6, 0.4);
        pop("#" + id + "-mascot", t + 0.3, 0.6, 0.6);
        gone(["#" + id + "-num", "#" + id + "-tile", "#" + id + "-title", "#" + id + "-burst", "#" + id + "-mascot"].join(", "), tChip, 0.35);
        pop("#" + id + "-chip", tChip + 0.1, 0.5, 0.6);
      }

