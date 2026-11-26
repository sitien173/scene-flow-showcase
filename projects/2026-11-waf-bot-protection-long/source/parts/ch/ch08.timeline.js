/* chapter 08: ANTI-DDOS MANAGED RULE GROUP */
/* c8a: sentences 93-96 */
      chapterCard("c8a", @@t:c8a-num@@, @@t:c8a-chip@@);
      stream("#c8a-stream .dot", @@t:c8a-src@@, 1.4, 0, 900, 0.04);
      show("#c8a-end", @@t:c8a-src@@ + 0.6, 0.5);
      show("#c8a-gauge", @@t:c8a-gauge@@ - 0.5, 0.4);
      meter("c8a-gauge", @@t:c8a-gauge@@, 95, 1.2, 10);
      pop("#c8a-flood", @@t:c8a-flood@@, 0.5, 0.8);
/* c8b: sentences 97-99 */
      pop("#c8b-hdr", @@t:c8b-card@@, 0.5, 0.8);
      show("#c8b-card", @@t:c8b-card@@, 0.5, 40);
      pop("#c8b-icon", @@t:c8b-card@@ + 0.2, 0.5, 0.8);
      show("#c8b-t1", @@t:c8b-tag@@, 0.5, 30);
      show("#c8b-t2", @@t:c8b-tag@@ + 0.4, 0.5, 30);
/* c8c: sentences 100-102 */
      show("#c8c-chart", @@t:c8c-base@@, 0.6, 30);
      show("#c8c-soft", @@t:c8c-soft@@, 0.5, 30);
      show("#c8c-hard", @@t:c8c-hard@@, 0.5, 30);
/* c8d: sentences 103-107 */
      pop("#c8d-surge", @@t:c8d-surge@@, 0.5, 0.8);
      pop("#c8d-blk", @@t:c8d-block@@, 0.5, 0.8);
      show("#c8d-u0, #c8d-u1, #c8d-u2, #c8d-u3", @@t:c8d-block@@ + 0.2, 0.5, 30);
      pop("#c8d-date", @@t:c8d-date@@, 0.5, 0.8);
      show("#c8d-cfg", @@t:c8d-cfg@@, 0.5, 30);
