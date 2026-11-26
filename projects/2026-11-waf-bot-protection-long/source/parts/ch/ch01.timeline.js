/* chapter 01: THE ATTACK BEGINS */
/* c1a: sentences 1-4 */
      show("#c1a-win", @@t:c1a-chip@@, 0.6, 60);
      pop("#c1a-count", @@t:c1a-chip@@ + 0.3, 0.5, 0.8);
      tl.fromTo("#c1a-users .cu", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out", immediateRender: false }, @@t:c1a-crowd@@);
      stream("#c1a-stream .dot", @@t:c1a-surge@@, 1.2, 0, 300, 0.1);
      bump("#c1a-win", @@t:c1a-surge@@, 1.02);
      chapterCard("c1a", @@t:c1a-num@@, @@t:c1a-chip@@);
/* c1b: sentences 5-8 */
      pop("#c1b-pill", @@t:c1b-pill@@, 0.5, 0.8);
      bump("#c1b-pill", @@t:c1b-pill@@, 1.04);
      show("#c1b-bot1", @@t:c1b-login@@, 0.5, 40);
      show("#c1b-bot2", @@t:c1b-scrape@@, 0.5, 40);
      show("#c1b-bot3", @@t:c1b-api@@, 0.5, 40);
      stream("#c1b-stream .dot", @@t:c1b-api@@, 1.0, 0, 130, 0.08);
      bump("#c1b-win", @@t:c1b-api@@, 1.02);
/* c1c: sentences 9-12 */
      meter("c1c-m-lat", @@t:c1c-lat@@, 85, 1.0, 10);
      meter("c1c-m-db", @@t:c1c-db@@, 95, 0.8, 10);
      meter("c1c-m-to", @@t:c1c-timeout@@, 100, 0.8, 10);
      show("#c1c-503", @@t:c1c-503@@, 0.5, 80);
/* c1d: sentences 13-14 */
      pop("#c1d-q", @@t:c1d-q@@, 0.5, 0.6);
      stream("#c1d-stream .dot", @@t:c1d-q@@, 1.2, 0, 300, 0.1);
      pop("#c1d-aws", @@t:c1d-aws@@, 0.6, 0.7);
