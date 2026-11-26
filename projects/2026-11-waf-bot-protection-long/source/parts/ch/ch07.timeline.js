/* chapter 07: AWS WAF BOT CONTROL */
/* c7a: sentences 78-79 */
      chapterCard("c7a", @@t:c7a-num@@, @@t:c7a-chip@@);
      show("#c7a-q", @@t:c7a-q@@, 0.5, 40);
      pop("#c7a-ltile", @@t:c7a-tile@@, 0.6, 0.8);
/* c7b: sentences 80-82 */
      pop("#c7b-hdr", @@t:c7b-hdr@@, 0.5, 0.8);
      show("#c7b-card", @@t:c7b-hdr@@, 0.5, 40);
      pop("#c7b-icon", @@t:c7b-hdr@@ + 0.2, 0.5, 0.8);
      show("#c7b-common", @@t:c7b-two@@, 0.5, 40);
      show("#c7b-targ", @@t:c7b-two@@ + 0.4, 0.5, 40);
      bump("#c7b-common", @@t:c7b-common@@, 1.04);
/* c7c: sentences 83-84 */
      show("#c7c-k0, #c7c-k1", @@t:c7c-cells@@, 0.5, 30);
      show("#c7c-k2, #c7c-k3", @@t:c7c-cells@@ + 0.4, 0.5, 30);
      tl.to("#c7c-k0", { boxShadow: "0 0 0 8px var(--term-text)", duration: 0.4, immediateRender: false }, @@t:c7c-search@@);
/* c7d: sentences 85-88 */
      pop("#c7d-s1", @@t:c7d-targ@@, 0.5, 0.8);
      show("#c7d-s2, #c7d-s3", @@t:c7d-sig@@, 0.5, 30);
      meter("c7d-meter", @@t:c7d-sig@@, 90, 1.0, 0);
      show("#c7d-captcha", @@t:c7d-chal@@, 0.5, 30);
      show("#c7d-chall", @@t:c7d-chal@@ + 0.2, 0.5, 30);
/* c7e: sentences 89-92 */
      show("#c7e-google", @@t:c7e-allow@@, 0.5, 30);
      pop("#c7e-allow", @@t:c7e-allow@@ + 0.2, 0.5, 0.8);
      show("#c7e-scr", @@t:c7e-limit@@, 0.5, 30);
      pop("#c7e-limit", @@t:c7e-limit@@ + 0.2, 0.5, 0.8);
      pop("#c7e-block", @@t:c7e-limit@@ + 0.4, 0.5, 0.8);
      pop("#c7e-q", @@t:c7e-q@@, 0.5, 0.9);
