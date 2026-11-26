/* chapter 03: UNDERSTANDING ATTACK LAYERS */
/* c3a: sentences 31-32 */
      chapterCard("c3a", @@t:c3a-num@@, @@t:c3a-chip@@);
      show("#c3a-l0, #c3a-l1, #c3a-l2, #c3a-l3, #c3a-l4, #c3a-l5, #c3a-l6", @@t:c3a-chip@@ + 0.1, 0.5, 30);
      pop("#c3a-net", @@t:c3a-net@@, 0.5, 0.9);
/* c3b: sentences 33-34 */
      pop("#c3b-udp", @@t:c3b-udp@@, 0.5, 0.8);
      pop("#c3b-syn", @@t:c3b-udp@@ + 0.3, 0.5, 0.8);
      stream("#c3b-stream .dot", @@t:c3b-udp@@, 1.0, 0, 640, 0.08);
      meter("c3b-bw", @@t:c3b-drain@@, 5, 1.2, 80);
      meter("c3b-conn", @@t:c3b-drain@@ + 0.3, 5, 1.2, 80);
/* c3c: sentences 35-37 */
      pop("#c3c-l7", @@t:c3c-l7@@, 0.5, 0.7);
      show("#c3c-r1", @@t:c3c-req@@, 0.5, 40);
      show("#c3c-r2", @@t:c3c-req@@ + 0.3, 0.5, 40);
      show("#c3c-r3", @@t:c3c-req@@ + 0.6, 0.5, 40);
      bump("#c3c-srv", @@t:c3c-end@@, 1.05);
/* c3d: sentences 38-41 */
      pop("#c3d-l1", @@t:c3d-hard@@, 0.5, 0.8);
      pop("#c3d-shield", @@t:c3d-tiles@@, 0.6, 0.8);
      pop("#c3d-waf", @@t:c3d-tiles@@ + 0.2, 0.6, 0.8);
      pop("#c3d-l2", @@t:c3d-tiles@@ + 0.4, 0.5, 0.8);
      tl.fromTo("#c3d-gap", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.5, ease: "power2.out", immediateRender: false }, @@t:c3d-tiles@@ + 0.3);
