/* chapter 06: RATE-BASED RULES */
/* c6a: sentences 65-67 */
      chapterCard("c6a", @@t:c6a-num@@, @@t:c6a-chip@@);
      show("#c6a-chart", @@t:c6a-chip@@, 0.8, 40);
      bump("#c6a-chart", @@t:c6a-spike@@, 1.02);
/* c6b: sentences 68-71 */
      pop("#c6b-ep", @@t:c6b-count@@, 0.5, 0.8);
      show("#c6b-counter", @@t:c6b-count@@, 0.6, 40);
      tl.fromTo("#c6b-thr", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, @@t:c6b-thr@@);
      pop("#c6b-act", @@t:c6b-act@@, 0.5, 0.8);
/* c6c: sentences 72-74 */
      pop("#c6c-no", @@t:c6c-no@@, 0.5, 0.8);
      tl.fromTo("#c6c-dots circle", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.03, immediateRender: false }, @@t:c6c-no@@);
      tl.fromTo("#c6c-fill", { scaleY: 0.1, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 1.2, ease: "power2.out", transformOrigin: "50% 100%", immediateRender: false }, @@t:c6c-total@@);
/* c6d: sentences 75-77 */
      show("#c6d-office", @@t:c6d-office@@, 0.6, 40);
      show("#c6d-mobile", @@t:c6d-office@@ + 0.3, 0.6, 40);
      pop("#c6d-tag", @@t:c6d-office@@ + 0.2, 0.5, 0.8);
      tl.to("#c6d-o3, #c6d-m2", { autoAlpha: 0.3, duration: 0.6, ease: "power1.out", immediateRender: false }, @@t:c6d-cut@@);
