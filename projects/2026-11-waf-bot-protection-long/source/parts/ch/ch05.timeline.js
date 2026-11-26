/* chapter 05: AWS WAF: INSPECT EVERY REQUEST */
/* c5a: sentences 54-55 */
      chapterCard("c5a", @@t:c5a-num@@, @@t:c5a-chip@@);
      pop("#c5a-waf", @@t:c5a-waf@@, 0.6, 0.8);
      pop("#c5a-gate", @@t:c5a-guard@@, 0.6, 0.9);
      show("#c5a-v0, #c5a-v1, #c5a-v2", @@t:c5a-guard@@ + 0.2, 0.5, 30);
/* c5b: sentences 56-58 */
      pop("#c5b-lbl", @@t:c5b-acl@@, 0.5, 0.8);
      tl.fromTo("#c5b-chips .chip", { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.25, ease: "power3.out", immediateRender: false }, @@t:c5b-chips@@);
/* c5c: sentences 59-61 */
      pop("#c5c-card", @@t:c5c-card@@, 0.5, 0.8);
      show("#c5c-r0, #c5c-i0", @@t:c5c-ip@@, 0.5, 30);
      show("#c5c-r1, #c5c-i1", @@t:c5c-ip@@ + 0.4, 0.5, 30);
      show("#c5c-r2, #c5c-i2", @@t:c5c-ip@@ + 0.8, 0.5, 30);
      tl.to("#c5c-r0", { backgroundColor: "var(--accent)", duration: 0.2, immediateRender: false }, @@t:c5c-order@@);
      tl.to("#c5c-r1", { backgroundColor: "var(--accent)", duration: 0.2, immediateRender: false }, @@t:c5c-order@@ + 0.5);
      tl.to("#c5c-r2", { backgroundColor: "var(--accent)", duration: 0.2, immediateRender: false }, @@t:c5c-order@@ + 1.0);
/* c5d: sentences 62-64 */
      show("#c5d-allow", @@t:c5d-pills@@, 0.5, 30);
      show("#c5d-block", @@t:c5d-pills@@ + 0.2, 0.5, 30);
      show("#c5d-chal", @@t:c5d-pills@@ + 0.4, 0.5, 30);
      pop("#c5d-edge", @@t:c5d-edge@@, 0.6, 0.8);
      pop("#c5d-origin", @@t:c5d-origin@@, 0.6, 0.8);
