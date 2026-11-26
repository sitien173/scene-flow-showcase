/* chapter 10: MONITORING AND VISIBILITY */
/* c10a: sentences 118-120 */
      chapterCard("c10a", @@t:c10a-num@@, @@t:c10a-chip@@);
      show("#c10a-dash", @@t:c10a-dash@@, 0.5, 40);
      pop("#c10a-lbl", @@t:c10a-dash@@, 0.5, 0.8);
      show("#c10a-k0, #c10a-k1", @@t:c10a-cnt@@, 0.5, 30);
      show("#c10a-k2, #c10a-k3", @@t:c10a-cnt@@ + 0.3, 0.5, 30);
/* c10b: sentences 121-122 */
      show("#c10b-bot", @@t:c10b-bot@@, 0.5, 40);
      meter("c10b-m0", @@t:c10b-bot@@, 80, 0.8, 0);
      meter("c10b-m1", @@t:c10b-bot@@ + 0.2, 55, 0.8, 0);
      meter("c10b-m2", @@t:c10b-bot@@ + 0.4, 35, 0.8, 0);
      pop("#c10b-cwi", @@t:c10b-cw@@, 0.5, 0.8);
      show("#c10b-cw", @@t:c10b-cw@@, 0.5, 40);
      tl.fromTo("#c10b-ch1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, immediateRender: false }, @@t:c10b-cw@@ + 0.3);
/* c10c: sentences 123-125 */
      pop("#c10c-sig", @@t:c10c-sig@@, 0.5, 0.8);
      show("#c10c-card", @@t:c10c-sig@@, 0.5, 40);
      show("#c10c-u1, #c10c-u2", @@t:c10c-sig@@ + 0.3, 0.5, 30);
      show("#c10c-u3", @@t:c10c-block@@, 0.5, 30);
      pop("#c10c-cnt", @@t:c10c-count@@, 0.5, 0.8);
/* c10d: sentences 126-128 */
      pop("#c10d-lbl", @@t:c10d-count@@, 0.5, 0.8);
      show("#c10d-m0", @@t:c10d-count@@, 0.5, 30);
      show("#c10d-m1", @@t:c10d-block@@, 0.5, 30);
      show("#c10d-m2", @@t:c10d-block@@ + 0.3, 0.5, 30);
      show("#c10d-m3", @@t:c10d-block@@ + 0.6, 0.5, 30);
      bump("#c10d-m1", @@t:c10d-block@@, 1.05);
