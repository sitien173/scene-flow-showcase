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

      /* ---- shared moves ---- */
      /* a request chip flies from an offset (dx, dy) to its own slot, then sinks into what it hit */
      function fly(sel, t, dx, dy, d, endScale, keep) {
        tl.fromTo(sel, { autoAlpha: 0, x: dx, y: dy, scale: 1 },
                       { autoAlpha: 1, x: 0, y: 0, scale: endScale || 1, duration: d || 0.45, ease: "power2.in" }, t);
        if (!keep) tl.to(sel, { autoAlpha: 0, duration: 0.1, ease: "none" }, t + (d || 0.45));
      }
      /* a chip leaves its slot for an offset and sinks there */
      function send(sel, t, dx, dy, d) {
        tl.fromTo(sel, { autoAlpha: 0, x: 0, y: 0 }, { autoAlpha: 1, x: dx, y: dy, duration: d || 0.5, ease: "power1.inOut" }, t);
        tl.to(sel, { autoAlpha: 0, duration: 0.1, ease: "none" }, t + (d || 0.5));
      }
      function swap(off, on, t) { tl.set(off, { autoAlpha: 0 }, t); tl.set(on, { autoAlpha: 1 }, t); }
      function tint(sel, t, d) { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: d || 0.25, ease: "power1.out" }, t); }

      /* ---- h1: a ticket shop opens; bots flood it; the question ---- */
tl.set("#h1-shop", { autoAlpha: 1 }, 0);
show("#h1-title", 0.3, 0.5, 20);
show("#h1-btn", @@t:h1-site@@, 0.4, 20);
var tBots = @@t:h1-bots@@;
for (var k = 0; k < 12; k++) fly("#h1-c" + k, tBots + k * 0.06, (k % 2 ? 1 : -1) * (60 + (k % 5) * 45), -360, 0.45, 1, true);
pop("#h1-bot", tBots + 0.1, 0.4, 0.6);

/* ---- a1: four ways bots hit the site; the server answers 503 ---- */
show("#a1-l0", @@start:a1@@, 0.4, 24);
show("#a1-l1", @@t:a1-scrape@@, 0.4, 24);
show("#a1-l2", @@t:a1-hold@@, 0.4, 24);
show("#a1-l3", @@t:a1-flood@@, 0.4, 24);
var tDeny = @@t:a1-deny@@;
pop("#a1-503", tDeny, 0.5, 0.6);
show("#a1-deny", tDeny + 0.1, 0.4, 20);

/* ---- s1: AWS Shield guards the edge at the network and transport layers ---- */
var tEdge = @@t:s1-aws@@;
show("#s1-frame", @@start:s1@@, 0.5, 24);
show("#s1-aws", tEdge, 0.5, 24);
show("#s1-name", tEdge + 0.1, 0.4, 20);
pop("#s1-std", @@t:s1-std@@, 0.45, 0.7);

/* ---- w1: AWS WAF checks each request: allow, challenge or block ---- */
show("#w1-gate", @@start:w1@@, 0.5, 24);
pop("#w1-waf", @@t:w1-waf@@, 0.45, 0.6);
var tRule = @@t:w1-rule@@;
show("#w1-allow", tRule, 0.4, 20);
show("#w1-chal", tRule + 0.15, 0.4, 20);
show("#w1-block", tRule + 0.3, 0.4, 20);

/* ---- r1: Rate-based Rules count requests per source; past the limit the source is throttled ---- */
var tCount = @@t:r1-count@@, tLimit = @@t:r1-limit@@;
show("#r1-name", @@start:r1@@, 0.4, 20);
show("#r1-chart", tCount - 0.2, 0.4, 24);
draw("#r1-cl", tCount, tLimit - tCount, 0);
pop("#r1-hit", tLimit, 0.35, 0.3);
show("#r1-lim", tLimit + 0.1, 0.4, 20);
show("#r1-ip", @@t:r1-gate@@, 0.4, 20);

/* ---- b1: Bot Control sorts bots: verified crawlers ALLOW, bad bots BLOCK, suspicious bots CAPTCHA ---- */
show("#b1-title", @@start:b1@@, 0.4, 20);
show("#b1-r0", @@t:b1-control@@, 0.4, 24);
show("#b1-r1", @@t:b1-limit@@, 0.4, 24);
show("#b1-r2", @@t:b1-captcha@@, 0.4, 24);

/* ---- d1: Anti-DDoS Managed Rule Group sees the HTTP flood; Shield Advanced sits beside it ---- */
var tFlood = @@t:d1-flood@@, tAn = @@t:d1-analyze@@;
show("#d1-chart", @@start:d1@@, 0.4, 24);
draw("#d1-cl", tFlood, tAn - tFlood, 0);
pop("#d1-waf", tAn, 0.45, 0.6);
show("#d1-name", tAn + 0.1, 0.4, 20);
pop("#d1-adv", @@t:d1-adv@@, 0.45, 0.7);

/* ---- e1: a real customer passes; the malicious requests are gone before the backend ---- */
var E1 = @@start:e1@@;
show(ids("e1-b", 4), E1, 0.4, 20);
var tReal = @@t:e1-real@@;
pop("#e1-ok", tReal, 0.35, 0.6);
gone("#e1-buy", tReal, 0.1);
gone(ids("e1-b", 4), @@t:e1-block@@, 0.25);
show("#e1-layers", @@t:e1-layers@@, 0.4, 20);

tl.set({}, {}, @@end@@);
