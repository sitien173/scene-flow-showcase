/* chapter 02: UNDERSTANDING BOTS AND DDOS */
/* c2a: sentences 15-17 */
      chapterCard("c2a", @@t:c2a-num@@, @@t:c2a-chip@@);
      show("#c2a-good", @@t:c2a-split@@, 0.5, 40);
      show("#c2a-bad", @@t:c2a-split@@ + 0.1, 0.5, 40);
      show("#c2a-scraper, #c2a-stuff, #c2a-hoard", @@t:c2a-split@@ + 0.4, 0.5, 40);
/* c2b: sentences 18-20 */
      show("#c2b-googlebot", @@t:c2b-allow@@, 0.5, 40);
      pop("#c2b-allow", @@t:c2b-allow@@ + 0.2, 0.5, 0.8);
      show("#c2b-site", @@t:c2b-allow@@, 0.6, 40);
      pop("#c2b-mon", @@t:c2b-mon@@, 0.5, 0.8);
      show("#c2b-bad", @@t:c2b-bad@@, 0.5, 40);
      bump("#c2b-bad", @@t:c2b-bad@@ + 0.3, 1.05);
/* c2c: sentences 21-24 */
      show("#c2c-r1", @@t:c2c-r1@@, 0.5, 40);
      show("#c2c-r2", @@t:c2c-r2@@, 0.5, 40);
      pop("#c2c-cs", @@t:c2c-cs@@, 0.5, 0.7);
/* c2d: sentences 25-27 */
      tl.to("#c2d-seats .ltile", { autoAlpha: 0.4, duration: 0.5, stagger: 0.06, immediateRender: false }, @@t:c2d-seats@@);
      stream("#c2d-stream .dot", @@t:c2d-flood@@, 1.2, 0, 900, 0.05);
      bump("#c2d-srv", @@t:c2d-flood@@ + 1.0, 1.04);
      pop("#c2d-acr", @@t:c2d-acr@@, 0.5, 0.7);
/* c2e: sentences 28-30 */
      show("#c2e-bot", @@t:c2e-circ@@, 0.6, 40);
      show("#c2e-ddos", @@t:c2e-circ@@ + 0.2, 0.6, 40);
      pop("#c2e-l1", @@t:c2e-circ@@ + 0.3, 0.5, 0.8);
      pop("#c2e-l2", @@t:c2e-circ@@ + 0.5, 0.5, 0.8);
      tl.to("#c2e-ddos", { scale: 0.9, duration: 0.8, ease: "power2.out", transformOrigin: "50% 50%" }, @@t:c2e-shrink@@);
