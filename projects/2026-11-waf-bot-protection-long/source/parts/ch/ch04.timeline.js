/* chapter 04: AWS SHIELD: PROTECT THE INFRASTRUCTURE */
/* c4a: sentences 42-44 */
      chapterCard("c4a", @@t:c4a-num@@, @@t:c4a-chip@@);
      pop("#c4a-tile", @@t:c4a-tile@@, 0.6, 0.8);
      show("#c4a-std", @@t:c4a-tiers@@, 0.5, 40);
      show("#c4a-adv", @@t:c4a-tiers@@ + 0.2, 0.5, 40);
/* c4b: sentences 45-47 */
      show("#c4b-arc", @@t:c4b-auto@@, 0.8, 40);
      pop("#c4b-cf", @@t:c4b-cf@@, 0.6, 0.8);
      pop("#c4b-r53", @@t:c4b-cf@@ + 0.2, 0.6, 0.8);
      pop("#c4b-layers", @@t:c4b-layers@@, 0.5, 0.8);
      pop("#c4b-fee", @@t:c4b-fee@@, 0.5, 0.8);
/* c4c: sentences 48-50 */
      pop("#c4c-icon", @@t:c4c-head@@, 0.6, 0.8);
      show("#c4c-r1", @@t:c4c-row1@@, 0.5, 40);
      show("#c4c-r2", @@t:c4c-row2@@, 0.5, 40);
      show("#c4c-r3", @@t:c4c-row3@@, 0.5, 40);
      pop("#c4c-paid", @@t:c4c-paid@@, 0.5, 0.8);
/* c4d: sentences 51-53 */
      tl.fromTo("#c4d-gap", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, @@t:c4d-gap@@);
      tl.to("#c4d-waf", { x: -200, duration: 0.8, ease: "power2.out" }, @@t:c4d-waf@@);
