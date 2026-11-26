      /* c2a: 100,000 people, sentences 16-19. A cut opens the chapter card. */
      chapterCard("c2a", @@t:c2a-num@@, @@t:c2a-chip@@);
      pop("#c2a-crowd", @@t:c2a-chip@@, 0.5, 0.9);
      pop("#c2a-pill", @@t:c2a-chip@@, 0.5, 0.8);
      pop("#c2a-neq", @@t:c2a-neq@@, 0.5, 0.6);
      show("#c2a-lane", @@t:c2a-neq@@, 0.5, 40);
      stream("#c2a-dots .dot", @@t:c2a-dots@@, 1.0, 0, 600, 0.11);
      pop("#c2a-eye", @@t:c2a-read@@, 0.5, 0.7);
      pop("#c2a-search", @@t:c2a-search@@, 0.5, 0.7);
      pop("#c2a-img", @@t:c2a-img@@, 0.5, 0.7);
      pop("#c2a-cart", @@t:c2a-order@@, 0.5, 0.7);
      /* c2b: five metrics, sentences 20-23. The slide seam opens the dashboard. */
      show("#c2b-dash .cell", @@t:c2b-frame@@, 0.4, 60);
      pop("#c2b-v1", @@t:c2b-users@@, 0.5, 0.8);
      draw("#c2b-ln", @@t:c2b-rps@@, 1.0);
      meter("c2b-m3", @@t:c2b-resp@@, 60, 0.8);
      meter("c2b-m4", @@t:c2b-err@@, 5, 0.6);
      meter("c2b-m5", @@t:c2b-db@@, 70, 0.8);
      bump("#c2b-dash .cell", @@t:c2b-all@@, 1.02);
      /* c2c: cache and write, sentences 24-25. The slide seam opens the left panel. */
      show("#c2c-left", @@t:c2c-cache@@, 0.6, 40);
      pop("#c2c-pillL", @@t:c2c-cache@@, 0.5, 0.8);
      pop("#c2c-crowdL", @@t:c2c-cache@@, 0.5, 0.9);
      pop("#c2c-cache", @@t:c2c-cache@@, 0.5, 0.8);
      stream("#c2c-stream .dot.read", @@t:c2c-cache@@, 1.0, 0, 300, 0.1);
      meter("c2c-mL", @@t:c2c-cache@@, 15, 0.6);
      show("#c2c-right", @@t:c2c-right@@, 0.6, 40);
      pop("#c2c-pillR", @@t:c2c-right@@, 0.5, 0.8);
      pop("#c2c-crowdR", @@t:c2c-right@@, 0.5, 0.9);
      pop("#c2c-db", @@t:c2c-right@@, 0.6, 0.8);
      stream("#c2c-stream .dot.wr", @@t:c2c-write@@, 1.0, 0, 300, 0.12);
      meter("c2c-mR", @@t:c2c-write@@, 90, 0.9, 15);
      bump("#c2c-pillL, #c2c-pillR", @@t:c2c-both@@, 1.05);
      tl.to("#c2c-pillL, #c2c-pillR", { autoAlpha: 0.5, duration: 0.4, ease: "power1.out" }, @@t:c2c-same@@);
      bump("#c2c-db", @@t:c2c-chiu@@, 1.04);
