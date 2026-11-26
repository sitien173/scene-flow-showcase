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

      /* ---- flash sale: shared moves ---- */
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

      /* ---- h1: the clock hits noon, the shop opens its sale, the crowd floods in, the server room waits ---- */
      tl.fromTo("#h1-cam", { scale: 1, transformOrigin: "495px 30%" }, { scale: 1.06, duration: 1.3, ease: "power1.inOut", transformOrigin: "495px 30%" }, 0);
      pop("#h1-clock", 0, 0.4, 0.85);
      swap("#h1-d0", "#h1-d1", 0.15);
      swap("#h1-d1", "#h1-d2", 0.30);
      var tNoon = @@t:h1-noon@@;
      swap("#h1-d2", "#h1-d3", tNoon);
      bump("#h1-clock", tNoon, 1.08);
      show("#h1-series", 0.3, 0.4, 20);
      tl.to("#h1-clock", { y: -300, duration: 0.5, ease: "power3.inOut" }, @@t:h1-site@@ - 0.1);
      tl.fromTo("#h1-phone", { autoAlpha: 0, y: 300 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, @@t:h1-site@@);
      pop("#h1-sale", @@t:h1-sale@@ - 0.1, 0.45, 0.4);
      var tCrowd = @@t:h1-crowd@@;
      gone(["#h1-clock", "#h1-phone", "#h1-sale"], tCrowd - 0.1, 0.18);
      gone("#h1-series", @@t:h1-site@@ - 0.1, 0.18);
            tl.fromTo("#h1-crowd", { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out" }, tCrowd);
      tl.fromTo("#h1-crowd-img", { scale: 1.25 }, { scale: 1, duration: 1.3, ease: "power2.out" }, tCrowd);
      show("#h1-num", @@t:h1-one@@, 0.3, 20);
      var tCount = @@t:h1-count@@;
      swap("#h1-n0", "#h1-n1", tCount);
      swap("#h1-n1", "#h1-n2", tCount + 0.14);
      swap("#h1-n2", "#h1-n3", tCount + 0.28);
      swap("#h1-n3", "#h1-n4", tCount + 0.42);
      bump("#h1-num", tCount + 0.42, 1.1);
      var tHunt = @@t:h1-hunt@@;
      show("#h1-btn", tHunt - 0.35, 0.35, 30);
      for (var k = 0; k < 12; k++) {
        fly("#h1-c" + k, tHunt + k * 0.06, 140 + (k % 6) * 130 - 467, 800 + Math.floor(k / 6) * 110 - 1342, 0.45, 0.6);
      }
      bump("#h1-btn", tHunt + 0.5, 1.06);
      bump("#h1-btn", tHunt + 0.95, 1.06);
      var tDc = @@t:h1-dc@@;
      gone(["#h1-crowd", "#h1-num", "#h1-btn"], tDc - 0.1, 0.18);
      tl.fromTo("#h1-dc", { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out" }, tDc);
      tl.fromTo("#h1-dc-img", { scale: 1 }, { scale: 1.2, duration: 1.0, ease: "power2.in" }, tDc);
      var tCrash = @@t:h1-crash@@;
      tl.fromTo("#h1-dim", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15, ease: "power1.out" }, tCrash);
      pop("#h1-alert", tCrash, 0.4, 0.6);

      /* ---- p1: every request pours into one server; CPU, RAM and the database choke; the phone shows 503 ---- */
      var P1 = @@start:p1@@;
      for (var k = 0; k < 10; k++) {
        fly("#p1-c" + k, P1 + 0.05 + k * 0.17, (k % 2 ? 1 : -1) * (60 + (k % 5) * 45), -200, 0.4, 0.6);
        if (k % 3 === 0) bump("#p1-srv", P1 + 0.45 + k * 0.17, 1.04);
      }
      var tCpu = @@t:p1-cpu@@, tFull = @@t:p1-full@@;
      tl.fromTo("#p1-cam", { y: 300 }, { y: 0, duration: 0.6, ease: "power3.inOut" }, tCpu - 0.5);
      show("#p1-cpu", tCpu - 0.1, 0.35, 24);
      tl.fromTo("#p1-cpu-f", { scaleX: 0 }, { scaleX: 1, duration: tFull - tCpu, ease: "power1.in" }, tCpu);
      tint("#p1-cpu-fb", tFull - 0.3, 0.3);
      pop("#p1-100", tFull, 0.4, 0.6);
      tint("#p1-srv .ov", tFull, 0.2);
      tl.fromTo("#p1-srv", { x: -8 }, { x: 8, duration: 0.06, repeat: 7, yoyo: true, ease: "none", immediateRender: false }, tFull);
      tl.to("#p1-srv", { x: 0, duration: 0.05, ease: "none" }, tFull + 0.48);
      tl.fromTo("#p1-cam", { scale: 1, transformOrigin: "50% 40%" }, { scale: 1.04, duration: 2.4, ease: "power1.inOut", transformOrigin: "50% 40%" }, tCpu);
      var tRam = @@t:p1-ram@@;
      show("#p1-ram", tCpu + 0.1, 0.35, 24);
      tl.fromTo("#p1-ram-f", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power1.in" }, tRam);
      tint("#p1-ram-fb", tRam + 0.35, 0.25);
      var tDb = @@t:p1-db@@, tJam = @@t:p1-jam@@;
      show("#p1-db", tCpu + 0.25, 0.35, 24);
      tl.set("#p1-db-f", { scaleX: 0 }, 0);
      for (var k = 0; k < 6; k++) {
        tl.fromTo("#p1-j" + k, { autoAlpha: 0, x: -360 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power3.out" }, tDb + 0.05 + k * 0.05);
        tl.set("#p1-j" + k, { attr: { class: "rq bad" } }, tJam);
      }
      pop("#p1-warn", tJam - 0.1, 0.4, 0.5);
      var tErr = @@t:p1-err@@;
      gone(["#p1-srv", "#p1-cpu", "#p1-ram", "#p1-db", "#p1-warn"].concat(ids("p1-j", 6)), tErr - 0.05, 0.2);
      tl.to("#p1-cam", { scale: 1, duration: 0.3, ease: "power2.out" }, tErr);
      tl.fromTo("#p1-phone", { autoAlpha: 0, x: -320, filter: "blur(8px)" }, { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out" }, tErr);
      tl.to("#p1-phone", { scale: 1.08, duration: 2.6, ease: "power1.inOut" }, tErr + 0.5);

      /* ---- c1: a crowd of users, few of them asking at once; requests split into four kinds ---- */
      var C1 = @@start:c1@@;
      tl.fromTo("#c1-grid", { scale: 1.5, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.7, ease: "power3.out", transformOrigin: "50% 50%" }, C1);
      show("#c1-p1", @@t:c1-users@@, 0.4, 24);
      var tNot = @@t:c1-not@@;
      tl.fromTo("#c1-cam", { y: 90 }, { y: 0, duration: 0.5, ease: "power3.inOut" }, tNot - 0.5);
      tl.to("#c1-grid .cold", { opacity: 0.15, duration: 0.4, ease: "power1.out" }, tNot);
      tl.set("#c1-grid .hot", { attr: { class: "ico u hot acc" } }, tNot);
      show("#c1-neq", tNot, 0.3, 16);
      pop("#c1-p2", tNot + 0.12, 0.45, 0.7);
      bump("#c1-p2", @@t:c1-req@@, 1.08);
      var tKey = @@t:c1-key@@;
      lift(["#c1-grid", "#c1-p1", "#c1-neq", "#c1-p2"], tKey - 0.1);
      for (var k = 0; k < 5; k++) fly("#c1-s" + k, tKey + 0.2 + k * 0.28, 0, -90, 0.4);
      var tLanes = @@t:c1-lanes@@;
      for (var k = 0; k < 4; k++) {
        tl.fromTo("#c1-l" + k, { autoAlpha: 0, x: 60 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power3.out" }, tLanes + k * 0.1);
        for (var j = 0; j < 3; j++) send("#c1-l" + k + "c" + j, tLanes + 0.3 + j * 0.35 + k * 0.08, 590, 0, 0.9);
      }
      tl.fromTo(ids("c1-lf", 4), { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "power2.out", stagger: 0.08 }, @@t:c1-kinds@@);

      /* ---- s1: slot 1, CloudFront; static files go to the edge cache; S3 keeps them, the origin rests ---- */
      var S1 = @@start:s1@@;
      pop("#s1-mon", S1 + 0.05, 0.4, 0.4);
      pop("#s1-burst", S1, 0.45, 0.5);
      pop("#s1-num", S1, 0.45, 0.5);
      var tCf = @@t:s1-cf@@;
      tl.fromTo("#s1-bw", { x: 313, y: 270, scale: 1.8, transformOrigin: "182px 590px" }, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "power3.inOut", transformOrigin: "182px 590px" }, tCf - 0.45);
      pop("#s1-cf", tCf - 0.1, 0.5, 0.6);
      show("#s1-cfn", tCf + 0.1, 0.4, 20);
      var tPage = @@t:s1-page@@;
      tl.fromTo("#s1-page", { autoAlpha: 0, y: 120, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, tPage);
      tl.fromTo("#s1-page img", { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.08, duration: 1.8, ease: "power1.inOut", transformOrigin: "50% 50%" }, tPage + 0.3);
      var tStatic = @@t:s1-static@@;
      lift("#s1-page", tStatic - 0.1);
      show("#s1-box", tStatic + 0.1, 0.4, 30);
      pop("#s1-img", @@t:s1-img@@, 0.4, 0.6);
      pop("#s1-css", @@t:s1-css@@, 0.4, 0.6);
      var tJs = @@t:s1-js@@;
      pop("#s1-js", tJs, 0.4, 0.6);
      tl.to("#s1-img", { x: 163, y: 318, scale: 0.45, duration: 0.45, ease: "power3.inOut" }, tJs + 0.4);
      tl.to("#s1-css", { x: 0, y: 318, scale: 0.45, duration: 0.45, ease: "power3.inOut" }, tJs + 0.45);
      tl.to("#s1-js", { x: -163, y: 318, scale: 0.45, duration: 0.45, ease: "power3.inOut" }, tJs + 0.5);
      pop("#s1-tick", @@t:s1-cache@@, 0.4, 0.3);
      var tS3 = @@t:s1-s3@@;
      gone(["#s1-burst", "#s1-num", "#s1-cf", "#s1-cfn", "#s1-box", "#s1-img", "#s1-css", "#s1-js", "#s1-tick"], tS3 - 0.12, 0.2);
      tl.fromTo("#s1-links", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1, ease: "none" }, tS3);
      draw("#s1-lk", tS3 + 0.1, 0.6);
      pop("#s1-user", tS3, 0.4, 0.6);
      pop("#s1-cf2", tS3 + 0.06, 0.4, 0.6);
      pop("#s1-s3", tS3 + 0.12, 0.5, 0.6);
      pop("#s1-origin", tS3 + 1.2, 0.4, 0.6);
      var tCut = @@t:s1-cut@@;
      tl.fromTo("#s1-r0", { autoAlpha: 0, y: 0 }, { autoAlpha: 1, y: 150, duration: 0.45, ease: "power2.inOut" }, tCut);
      tl.set("#s1-r0", { attr: { class: "rq ok" } }, tCut + 0.45);
      pop("#s1-hit", tCut + 0.45, 0.35, 0.4);
      tl.to("#s1-r0", { y: 0, duration: 0.45, ease: "power2.inOut" }, tCut + 0.6);
      tl.fromTo("#s1-r1", { autoAlpha: 0, y: 0 }, { autoAlpha: 1, y: 150, duration: 0.45, ease: "power2.inOut" }, tCut + 0.7);
      tl.set("#s1-r1", { attr: { class: "rq ok" } }, tCut + 1.15);
      tl.to("#s1-r1", { y: 0, duration: 0.45, ease: "power2.inOut" }, tCut + 1.3);
      tl.to("#s1-origin", { opacity: 0.3, duration: 0.5, ease: "power1.out" }, tCut + 0.5);

      /* ---- s2: slot 2, the load balancer spreads requests over healthy servers only ---- */
      var S2 = @@start:s2@@;
      pop("#s2-mon", S2 + 0.05, 0.4, 0.4);
      var tAlb = @@t:s2-alb@@;
      pop("#s2-elb", S2 + 0.15, 0.5, 0.6);
      tl.fromTo("#s2-elb", { x: 180 }, { x: 0, duration: 0.5, ease: "power3.inOut" }, tAlb - 0.35);
      pop("#s2-alb", tAlb + 0.1, 0.5, 0.6);
      var tSpread = @@t:s2-spread@@;
      gone(["#s2-elb", "#s2-alb"], tSpread - 0.15, 0.2);
      pop("#s2-hub", tSpread, 0.45, 0.6);
      tl.fromTo("#s2-links", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1, ease: "none" }, tSpread + 0.1);
      draw(ids("s2-lk", 4), tSpread + 0.1, 0.4, 0.06);
      pop(ids("s2-sv", 4), tSpread + 0.15, 0.4, 0.6);
      var SX = [180, 390, 600, 810];
      for (var k = 0; k < 4; k++) send("#s2-r" + k, tSpread + 0.6 + k * 0.15, SX[k] - 495, 495, 0.5);
      var tHealthy = @@t:s2-healthy@@;
      tint("#s2-sv3 .ov", tHealthy, 0.2);
      pop("#s2-bad", tHealthy, 0.35, 0.4);
      tl.to("#s2-lk3", { opacity: 0.2, duration: 0.3, ease: "power1.out" }, tHealthy);
      pop(ids("s2-ok", 3), tHealthy + 0.15, 0.35, 0.4);
      for (var k = 0; k < 3; k++) send("#s2-r" + (k + 4), tHealthy + 0.4 + k * 0.15, SX[k] - 495, 495, 0.5);
      pop("#s2-old", @@t:s2-instead@@, 0.4, 0.6);
      pop("#s2-x", @@t:s2-one@@, 0.35, 0.5);

      /* ---- s3: slot 3, EC2 Auto Scaling adds servers as traffic climbs and removes them as it falls ---- */
      var S3 = @@start:s3@@;
      pop("#s3-mon", S3 + 0.05, 0.4, 0.4);
      pop("#s3-burst", S3, 0.45, 0.5);
      pop("#s3-num", S3, 0.45, 0.5);
      tl.fromTo("#s3-bw", { x: 323, scale: 1.8, transformOrigin: "172px 860px" }, { x: 0, scale: 1, duration: 0.5, ease: "power3.inOut", transformOrigin: "172px 860px" }, @@t:s3-ec2@@ - 0.5);
      pop("#s3-ec2", @@t:s3-ec2@@ - 0.1, 0.5, 0.6);
      pop("#s3-asg", @@t:s3-asg@@ - 0.1, 0.5, 0.6);
      var tNeed = @@t:s3-need@@, tLaunch = @@t:s3-launch@@;
      tl.to("#s3-head", { y: -300, scale: 0.6, duration: 0.5, ease: "power3.inOut", transformOrigin: "495px 860px" }, tNeed - 0.1);
      gone(".s3lab", tNeed - 0.15, 0.15);
      tl.fromTo("#s3-frame", { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" }, tNeed);
      pop(ids("s3-i", 3), tNeed + 0.1, 0.4, 0.6);
      show("#s3-chart", tNeed, 0.4, 24);
      tl.fromTo("#s3-up", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: tLaunch + 0.6 - tNeed, ease: "power1.in" }, tNeed + 0.1);
      pop("#s3-i3", @@t:s3-auto@@, 0.45, 0.5);
      pop("#s3-i4", @@t:s3-maybe@@, 0.45, 0.5);
      pop("#s3-i5", tLaunch, 0.45, 0.5);
      tl.fromTo("#s3-down", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" }, @@t:s3-drop@@);
      tl.to(["#s3-i5", "#s3-i4", "#s3-i3"], { autoAlpha: 0, scale: 0.6, duration: 0.3, ease: "power2.in", stagger: 0.15 }, @@t:s3-shrink@@);
      var tCost = @@t:s3-cost@@;
      gone("#s3-chart", tCost - 0.3, 0.2);
      show("#s3-cost", tCost - 0.1, 0.35, 20);
      tl.fromTo("#s3-cfill", { scaleX: 1 }, { scaleX: 0.45, duration: 0.6, ease: "power2.out" }, tCost + 0.2);

      /* ---- s4: slot 4, slow jobs go to the SQS queue; workers take them; the shopper is done at once ---- */
      var S4 = @@start:s4@@;
      pop("#s4-mon", S4 + 0.05, 0.4, 0.4);
      pop("#s4-phone", S4, 0.45, 0.8);
      var tWait = @@t:s4-wait@@;
      tl.fromTo("#s4-phone", { x: 273, y: 150 }, { x: 0, y: 0, duration: 0.55, ease: "power3.inOut" }, tWait - 0.4);
      pop("#s4-hour", tWait, 0.4, 0.6);
      tl.to("#s4-hour", { rotation: 180, duration: 0.6, ease: "power2.inOut" }, tWait + 0.6);
      tl.fromTo("#s4-mail", { autoAlpha: 0, x: 120 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: "power3.out" }, @@t:s4-mail@@ - 0.1);
      tl.fromTo("#s4-bill", { autoAlpha: 0, x: 120 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: "power3.out" }, @@t:s4-bill@@ - 0.1);
      var tSqs = @@t:s4-sqs@@;
      pop("#s4-sqs", tSqs - 0.1, 0.5, 0.6);
      tl.fromTo("#s4-tube", { autoAlpha: 0, scaleX: 0, transformOrigin: "0% 50%" }, { autoAlpha: 1, scaleX: 1, duration: 0.45, ease: "power3.out", transformOrigin: "0% 50%" }, tSqs + 0.1);
      var tQueue = @@t:s4-queue@@;
      gone("#s4-hour", tQueue - 0.1, 0.2);
      /* the queue grows: jobs fly from the shop into the tube, the email and invoice cards join them */
      fly("#s4-q0", tSqs + 0.55, 180 - 796, 708 - 1098, 0.5, 1, true);
      fly("#s4-q1", tSqs + 0.8, 180 - 696, 708 - 1098, 0.5, 1, true);
      tl.to("#s4-mail", { x: -292, y: 370, scale: 0.3, duration: 0.45, ease: "power3.in" }, tQueue);
      tl.to("#s4-mail", { autoAlpha: 0, duration: 0.2, ease: "none" }, tQueue + 0.2);
      fly("#s4-q2", tQueue + 0.45, 396 - 596, 0, 0.35, 1, true);
      tl.to("#s4-bill", { x: -292, y: 210, scale: 0.3, duration: 0.45, ease: "power3.in" }, tQueue + 0.15);
      tl.to("#s4-bill", { autoAlpha: 0, duration: 0.2, ease: "none" }, tQueue + 0.35);
      fly("#s4-q3", tQueue + 0.6, 396 - 496, 0, 0.3, 1, true);
      fly("#s4-q4", tQueue + 0.85, 180 - 396, 708 - 1098, 0.45, 1, true);
      var tWork = @@t:s4-work@@;
      pop(ids("s4-w", 3), tWork, 0.4, 0.6);
      /* the queue drains: each worker takes the job at the head, the rest move up */
      function sink(sel, t, dx, dy) {
        tl.to(sel, { x: dx, y: dy, duration: 0.4, ease: "power2.in" }, t);
        tl.to(sel, { autoAlpha: 0, duration: 0.1, ease: "none" }, t + 0.4);
      }
      var tW = tWork + 0.5;
      sink("#s4-q0", tW, -23, 175);
      sink("#s4-q1", tW + 0.15, -93, 175);
      sink("#s4-q2", tW + 0.3, -163, 175);
      pop("#s4-wok1", tW + 0.6, 0.35, 0.4);
      pop("#s4-wok0", tW + 0.75, 0.35, 0.4);
      tl.to("#s4-q3", { x: 300, duration: 0.4, ease: "power2.inOut" }, tW + 0.75);
      tl.to("#s4-q4", { x: 300, duration: 0.4, ease: "power2.inOut" }, tW + 0.85);
      sink("#s4-q3", tW + 1.3, 277, 175);
      sink("#s4-q4", tW + 1.45, 207, 175);
      var tDone = @@t:s4-instead@@;
      gone("#s4-wait", tDone, 0.15);
      pop("#s4-ok", tDone, 0.4, 0.5);
      bump("#s4-phone", tDone + 0.05, 1.05);

      /* ---- s5: slot 5, ElastiCache answers hot reads so the database breathes; CloudWatch watches and alerts ---- */
      var S5 = @@start:s5@@;
      pop("#s5-mon", S5 + 0.05, 0.4, 0.4);
      pop(["#s5-app", "#s5-db"], S5, 0.4, 0.7);
      tint("#s5-db .ov", S5 + 0.3, 0.2);
      tl.fromTo(ids("s5-j", 5), { autoAlpha: 0, x: -300 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 }, S5 + 0.1);
      for (var k = 0; k < 5; k++) tl.set("#s5-j" + k, { attr: { class: "rq bad" } }, S5 + 0.9);
      show("#s5-load", S5 + 0.5, 0.35, 24);
      tl.set("#s5-lf", { opacity: 0 }, 0);
      tl.fromTo("#s5-lf", { scaleX: 0, opacity: 1 }, { scaleX: 1, opacity: 1, duration: 0.6, ease: "power1.in" }, S5 + 0.6);
      pop("#s5-ec", @@t:s5-cache@@ - 0.1, 0.5, 0.6);
      var tHit = @@t:s5-hit@@;
      pop("#s5-zap", tHit, 0.4, 0.4);
      gone(ids("s5-j", 5), tHit, 0.25);
      for (var k = 0; k < 3; k++) fly("#s5-h" + k, tHit + 0.1 + k * 0.25, -315, -500, 0.5);
      tl.to("#s5-db .ov", { opacity: 0, duration: 0.3, ease: "power1.out" }, tHit + 0.4);
      tl.to("#s5-lf", { scaleX: 0.3, duration: 0.6, ease: "power2.out" }, tHit + 0.4);
      tl.to("#s5-lf", { opacity: 0, duration: 0.3, ease: "none" }, tHit + 0.8);
      tl.fromTo("#s5-lo", { opacity: 0, scaleX: 0.3 }, { opacity: 1, scaleX: 0.3, duration: 0.3, ease: "none" }, tHit + 0.8);
      var tCw = @@t:s5-cw@@;
      gone(["#s5-app", "#s5-db", "#s5-load", "#s5-ec", "#s5-zap"], tCw - 0.12, 0.2);
      tl.fromTo("#s5-page", { autoAlpha: 0, y: 120, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, tCw);
      var tCwl = @@t:s5-cwlogo@@;
      pop("#s5-cw", tCwl - 0.1, 0.5, 0.6);
      show("#s5-cwn", tCwl + 0.1, 0.4, 20);
      var tWatch = @@t:s5-watch@@;
      tl.fromTo("#s5-cwcam", { y: 180 }, { y: 0, duration: 0.5, ease: "power3.inOut" }, tWatch - 0.45);
      show(ids("s5-ch", 3), tWatch, 0.4, 24);
      draw(ids("s5-cl", 3), tWatch + 0.2, 0.8, 0.12);
      var tAlarm = @@t:s5-alarm@@;
      draw("#s5-spike", tAlarm, 0.3);
      pop("#s5-bell", tAlarm, 0.4, 0.5);
      tl.fromTo("#s5-bell", { rotation: -14 }, { rotation: 14, duration: 0.08, repeat: 5, yoyo: true, ease: "none", immediateRender: false }, tAlarm + 0.3);
      tl.to("#s5-bell", { rotation: 0, duration: 0.08, ease: "none" }, tAlarm + 0.78);

      /* ---- r1: one big server is not the answer; the whole architecture lands; then it becomes a plan to test ---- */
      var R1 = @@start:r1@@;
      pop("#r1-big", R1, 0.5, 0.6);
      tl.to("#r1-big", { scale: 1.15, duration: 1.8, ease: "power1.inOut" }, R1 + 0.5);
      var tX = @@t:r1-x@@;
      pop("#r1-x", tX, 0.3, 0.5);
      tint("#r1-big .ov", tX, 0.2);
      var tZoom = @@t:r1-zoom@@;
      tl.to(["#r1-big", "#r1-x"], { autoAlpha: 0, scale: 1.8, filter: "blur(10px)", duration: 0.3, ease: "power2.in" }, tZoom - 0.05);
      tl.fromTo("#r1-dia", { autoAlpha: 0, scale: 1.8, transformOrigin: "495px 820px" }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power3.out", transformOrigin: "495px 820px" }, tZoom);
      var tDist = @@t:r1-dist@@, tRc = @@t:r1-cache@@, tSc = @@t:r1-scale@@, tAs = @@t:r1-async@@;
      ring("#r1-g0", tDist, tRc);
      pop("#r1-k0", tDist, 0.4, 0.6);
      ring(["#r1-g1", "#r1-g1b"], tRc, tSc);
      pop("#r1-k1", tRc, 0.4, 0.6);
      ring("#r1-g2", tSc, tAs);
      pop("#r1-k2", tSc, 0.4, 0.6);
      var tAws = @@t:r1-aws@@;
      ring("#r1-g3", tAs, tAws);
      pop("#r1-k3", tAs, 0.4, 0.6);
      gone(ids("r1-k", 4), tAws - 0.1, 0.25);
      tl.to("#r1-dia", { scale: 0.5, duration: 0.6, ease: "power3.inOut", transformOrigin: "495px 400px" }, tAws);
      pop("#r1-bp", tAws + 0.45, 0.4, 0.9);
      pop("#r1-arch", @@t:r1-arch@@, 0.4, 0.6);
      var tTest = @@t:r1-test@@, tLoad = @@t:r1-load@@;
      pop("#r1-test", tTest, 0.4, 0.6);
      show("#r1-chart", tAws + 0.15, 0.35, 24);
      tl.fromTo("#r1-cl", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: tLoad - tTest - 0.5, ease: "power1.in" }, tTest + 0.5);
      pop("#r1-hit", tLoad, 0.35, 0.3);
      bump("#r1-chart", tLoad, 1.03);

      /* ---- e1: back to noon; the buy button turns into a tick; AWS in plain text ---- */
      var E1 = @@start:e1@@;
      pop("#e1-ok", E1 + 0.2, 0.35, 0.6);
      gone("#e1-buy", E1 + 0.15, 0.1);
      bump("#e1-phone", E1 + 0.25, 1.04);
      pop("#e1-aws", @@t:e1-aws@@, 0.5, 0.7);

      tl.set({}, {}, @@end@@);
