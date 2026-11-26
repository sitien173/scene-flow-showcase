      /* c8a: a chapter card, then the Order Confirmed screen, then four side tasks run one after another. Sentences 95-98. */
      chapterCard("c8a", @@t:c8a-num@@, @@t:c8a-chip@@);
      pop("#c8a-grp", @@t:c8a-chip@@, 0.6, 0.8);
      pop("#c8a-t1", @@t:c8a-email@@, 0.5, 0.8);
      pop("#c8a-t2", @@t:c8a-invoice@@, 0.5, 0.8);
      pop("#c8a-t3", @@t:c8a-ship@@, 0.5, 0.8);
      pop("#c8a-t4", @@t:c8a-report@@, 0.5, 0.8);
      pop("#c8a-seg0, #c8a-seg1, #c8a-seg2, #c8a-seg3, #c8a-clock", @@t:c8a-chip@@ + 0.3, 0.5, 0.8);
      gone("#c8a-check, #c8a-done", @@t:c8a-wait@@, 0.3);
      pop("#c8a-spin", @@t:c8a-wait@@, 0.5, 0.8);
      tl.to("#c8a-spin", { rotation: 1080, duration: 3, ease: "none", transformOrigin: "50% 50%" }, @@t:c8a-wait@@);
      sweep("#c8a-f0", @@t:c8a-wait@@, 0.9);
      sweep("#c8a-f1", @@t:c8a-wait@@ + 0.9, 0.9);
      sweep("#c8a-f2", @@t:c8a-wait@@ + 1.8, 0.9);
      sweep("#c8a-f3", @@t:c8a-wait@@ + 2.7, 0.9);
      pop("#c8a-hot", @@t:c8a-slow@@, 0.4, 0.8);
      tl.to("#c8a-grp", { x: -5, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, @@t:c8a-slow@@);
      /* c8b: four tasks slide in, the phone confirms, SQS appears, four messages queue and reach three workers. Sentences 99-103. */
      pop("#c8b-check", @@t:c8b-async@@, 0.5, 0.8);
      tl.fromTo("#c8b-c1, #c8b-c2, #c8b-c3, #c8b-c4", { x: -220, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" }, @@t:c8b-async@@);
      pop("#c8b-sqs", @@t:c8b-simple@@, 0.6, 0.8);
      sweep("#c8b-lane", @@t:c8b-queue@@, 0.6);
      pop("#c8b-q", @@t:c8b-queue@@, 0.5, 0.8);
      for (var k = 0; k < 4; k++) {
        pop("#c8b-m" + k, @@t:c8b-send@@ + 0.4 * k, 0.3, 0.6);
        tl.to("#c8b-m" + k, { x: 860, duration: 1.4, ease: "none" }, @@t:c8b-send@@ + 0.4 * k + 0.3);
        gone("#c8b-m" + k, @@t:c8b-send@@ + 0.4 * k + 1.7, 0.2);
      }
      for (var w = 0; w < 3; w++) {
        pop("#c8b-w" + w, @@t:c8b-worker@@ + 0.15 * w, 0.5, 0.8);
        bump("#c8b-w" + w, @@t:c8b-each@@ + 0.5 * w, 1.05);
      }
      /* c8c: same pipe, producers and consumers pulse out of step, a spike fills the queue, then three workers join. Sentences 104-106. */
      pop("#c8c-p1", @@t:c8c-prod@@, 0.5, 0.8);
      pop("#c8c-p2", @@t:c8c-prod@@ + 0.2, 0.5, 0.8);
      for (var i = 0; i < 4; i++) bump("#c8c-app", @@t:c8c-same@@ + 0.3 * i, 1.04);
      for (var w = 0; w < 3; w++) for (var j = 0; j < 2; j++) bump("#c8c-w" + w, @@t:c8c-same@@ + 0.45 * w + 0.9 * j + 0.2, 1.04);
      pop("#c8c-depth", @@t:c8c-spike@@, 0.5, 0.8);
      meter("c8c-depth", @@t:c8c-spike@@, 85, 0.8, 20);
      tl.call(function () { document.getElementById("c8c-depth").classList.add("over"); }, null, @@t:c8c-spike@@);
      for (var m = 0; m < 4; m++) {
        pop("#c8c-m" + m, @@t:c8c-spike@@ + 0.1 * m, 0.3, 0.6);
        tl.to("#c8c-m" + m, { x: 860, duration: 1.2, ease: "none" }, @@t:c8c-spike@@ + 0.1 * m + 0.3);
        gone("#c8c-m" + m, @@t:c8c-spike@@ + 0.1 * m + 1.5, 0.2);
      }
      meter("c8c-depth", @@t:c8c-wait@@, 30, 0.8, 85);
      tl.call(function () { document.getElementById("c8c-depth").classList.remove("over"); }, null, @@t:c8c-wait@@);
      for (var n = 3; n < 6; n++) pop("#c8c-w" + n, @@t:c8c-scale@@ + 0.15 * (n - 3), 0.5, 0.8);
      /* c8d: the SQS promise is shown with its traps: duplicates, ordering, a retry and the dead letter queue. Sentences 107-110. */
      pop("#c8d-spk", @@t:c8d-myth@@, 0.5, 0.8);
      pop("#c8d-x", @@t:c8d-myth@@ + 0.6, 0.4, 0.6);
      pop("#c8d-std", @@t:c8d-std@@, 0.5, 0.8);
      pop("#c8d-q", @@t:c8d-std@@, 0.5, 0.8);
      pop("#c8d-m42", @@t:c8d-dup@@, 0.4, 0.8);
      pop("#c8d-m42b", @@t:c8d-dup@@ + 0.25, 0.4, 0.8);
      tl.to("#c8d-m42", { x: 900, duration: 1.6, ease: "none" }, @@t:c8d-dup@@ + 0.4);
      gone("#c8d-m42", @@t:c8d-dup@@ + 2.0, 0.2);
      tl.to("#c8d-m42b", { x: 900, y: 80, duration: 1.6, ease: "none" }, @@t:c8d-dup@@ + 0.65);
      pop("#c8d-ledger", @@t:c8d-dup@@ + 1.5, 0.5, 0.8);
      tl.to("#c8d-m42b", { autoAlpha: 0.35, duration: 0.4 }, @@t:c8d-dupr@@);
      pop("#c8d-m1", @@t:c8d-order@@, 0.3, 0.8);
      pop("#c8d-m2", @@t:c8d-order@@, 0.3, 0.8);
      pop("#c8d-m3", @@t:c8d-order@@, 0.3, 0.8);
      tl.to("#c8d-m1", { x: 600, duration: 1.5, ease: "none" }, @@t:c8d-order@@ + 0.3);
      gone("#c8d-m1", @@t:c8d-order@@ + 1.8, 0.2);
      tl.to("#c8d-m2", { x: 440, duration: 1.2, ease: "none" }, @@t:c8d-order@@ + 0.3);
      gone("#c8d-m2", @@t:c8d-order@@ + 1.5, 0.2);
      tl.to("#c8d-m3", { x: 300, duration: 1.9, ease: "none" }, @@t:c8d-order@@ + 0.3);
      gone("#c8d-m3", @@t:c8d-order@@ + 2.2, 0.2);
      pop("#c8d-m7", @@t:c8d-fail@@, 0.3, 0.8);
      tl.to("#c8d-m7", { x: 300, duration: 1.2, ease: "none" }, @@t:c8d-fail@@ + 0.3);
      pop("#c8d-n1", @@t:c8d-fail@@ + 1.5, 0.2, 0.6);
      gone("#c8d-n1", @@t:c8d-fail@@ + 1.8, 0.1);
      pop("#c8d-n2", @@t:c8d-fail@@ + 1.9, 0.2, 0.6);
      gone("#c8d-n2", @@t:c8d-fail@@ + 2.2, 0.1);
      pop("#c8d-n3", @@t:c8d-fail@@ + 2.3, 0.2, 0.6);
      gone("#c8d-n3", @@t:c8d-fail@@ + 2.6, 0.1);
      tl.to("#c8d-m7", { x: -300, y: 370, duration: 0.9, ease: "power2.in" }, @@t:c8d-dlq@@);
      pop("#c8d-dlqlab", @@t:c8d-dlq@@, 0.5, 0.8);
      pop("#c8d-mag", @@t:c8d-invest@@, 0.5, 0.8);
      /* c8e: the core transaction holds its consistency, then a lane task blocks the core, which falls and returns. Sentences 111-112. */
      pop("#c8e-core", @@t:c8e-core@@, 0.6, 0.8);
      pop("#c8e-pkg", @@t:c8e-core@@ + 0.2, 0.5, 0.8);
      pop("#c8e-card", @@t:c8e-core@@ + 0.3, 0.5, 0.8);
      pop("#c8e-lock", @@t:c8e-consist@@, 0.5, 0.8);
      tl.to("#c8e-grp", { y: 120, duration: 0.6, ease: "power2.in" }, @@t:c8e-drop@@);
      pop("#c8e-x", @@t:c8e-block@@, 0.4, 0.6);
      tl.to("#c8e-grp", { y: 0, duration: 0.5, ease: "back.out(1.4)" }, @@t:c8e-block@@);
      gone("#c8e-x", @@t:c8e-block@@ + 0.8, 0.3);
