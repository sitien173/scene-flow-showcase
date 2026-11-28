    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      /* Every cue is in RECORDED seconds (syl-times.json). autoAlpha sits in the TO vars:
         GSAP re-applies a completed tween's end state on every seek. */
      function pop(sel, t, d, s) {
        tl.fromTo(sel, { autoAlpha: 0, scale: s || 0.7, transformOrigin: "50% 50%" },
                       { autoAlpha: 1, scale: 1, duration: d || 0.5, ease: "back.out(1.6)", transformOrigin: "50% 50%" }, t);
      }
      function show(sel, t, d, y) {
        tl.fromTo(sel, { autoAlpha: 0, y: y === undefined ? 36 : y },
                       { autoAlpha: 1, y: 0, duration: d || 0.5, ease: "power3.out" }, t);
      }
      function bump(sel, t, k, base) {
        var b = base === undefined ? 1 : base;
        tl.to(sel, { scale: b * k, duration: 0.12, ease: "power2.out" }, t);
        tl.to(sel, { scale: b, duration: 0.3, ease: "back.out(2)" }, t + 0.12);
      }
      function gone(sel, t, d) {
        tl.to(sel, { autoAlpha: 0, duration: d || 0.25, ease: "power1.out" }, t);
      }
      function lift(sel, t) {
        tl.to(sel, { autoAlpha: 0, y: -40, duration: 0.3, ease: "power2.in" }, t);
      }
      function draw(sel, t, d, stagger) {
        tl.fromTo(sel, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: d || 0.4, ease: "power2.out", stagger: stagger || 0 }, t);
      }
      function sweep(sel, t, d) {
        tl.fromTo(sel, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: d || 0.45, ease: "power2.out", transformOrigin: "0% 50%" }, t);
      }
      function flash(t, a) {
        tl.fromTo("#flash", { autoAlpha: a }, { autoAlpha: 0, duration: 0.4, ease: "power2.out", immediateRender: false }, t);
      }
      function ids(prefix, n) {
        var a = [];
        for (var k = 0; k < n; k++) a.push("#" + prefix + k);
        return a;
      }
      /* a ring that marks a control on the evidence, then lets go */
      function ring(sel, t, off) {
        tl.fromTo(sel, { autoAlpha: 0, scale: 1.08, transformOrigin: "50% 50%" },
                       { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power3.out", transformOrigin: "50% 50%" }, t);
        if (off) gone(sel, off, 0.2);
      }
      /* a click lands: the violet ripple at page point (X, Y) */
      function pulse(sel, t, X, Y) {
        tl.fromTo(sel, { autoAlpha: 1, x: X, y: Y, scale: 0.3 },
          { autoAlpha: 0, x: X, y: Y, scale: 1.6, duration: 0.45, ease: "power2.out", immediateRender: false }, t);
      }
      /* the house cursor: its tip sits 23,13 px into the 100 px glyph */
      function click(cur, cp, t, X, Y) {
        tl.to(cur, { scale: 0.84, duration: 0.08, ease: "power2.in", transformOrigin: "23% 13%" }, t - 0.04);
        tl.to(cur, { scale: 1, duration: 0.2, ease: "power2.out", transformOrigin: "23% 13%" }, t + 0.06);
        pulse(cp, t, X, Y);
      }

      /* @geo */

      /* The three steps. A step opens on its tile; when the step has been named the tile flies up into
         its slot in the tracker and lights it (violet ring); the step before it is ticked done. */
      function done(k, t) {
        tl.to("#tk" + k + "-r", { autoAlpha: 0, duration: 0.2, ease: "power1.out" }, t);
        pop("#tk" + k + "-dn", t + 0.05, 0.35, 0.3);
      }
      function lit(k, t) {
        tl.to("#tk" + k, { opacity: 1, duration: 0.15, ease: "none" }, t);
        tl.fromTo("#tk" + k + "-r", { autoAlpha: 0, scale: 1.3 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, t);
        bump("#tk" + k, t + 0.02, 1.14);
        if (k > 0) done(k - 1, t);
      }
      function opener(p, k, tIn, tNum, tFly, cx, cy, size) {
        tl.fromTo(p + "-t", { autoAlpha: 0, scale: 0.5, rotation: -12 },
          { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.6)" }, tIn);
        pop(p + "-n", tNum, 0.4, 0.3);
        tl.to(p + "-t", { x: GEO.tk[k] + 56 - cx, y: 148 - cy, scale: 112 / size, duration: 0.45, ease: "power3.inOut" }, tFly);
        tl.set(p + "-t", { autoAlpha: 0 }, tFly + 0.45);
        lit(k, tFly + 0.44);
      }

      // <seams:auto>
      // </seams:auto>

      /* @timeline */
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
