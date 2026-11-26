/* chapter 11: THE COMPLETE ARCHITECTURE */
/* c11a: sentences 129-131 */
      chapterCard("c11a", @@t:c11a-num@@, @@t:c11a-chip@@);
      pop("#c11a-users", @@t:c11a-chip@@ + 0.1, 0.5, 0.8);
      pop("#c11a-r53", @@t:c11a-r53@@, 0.5, 0.8);
      pop("#c11a-cf", @@t:c11a-cf@@, 0.5, 0.8);
/* c11b: sentences 132-134 */
      pop("#c11b-shield", @@t:c11b-shield@@, 0.5, 0.8);
      pop("#c11b-waf", @@t:c11b-waf@@, 0.5, 0.8);
      pop("#c11b-acl", @@t:c11b-waf@@ + 0.2, 0.5, 0.8);
      pop("#c11b-rate", @@t:c11b-rate@@, 0.5, 0.8);
      pop("#c11b-rl", @@t:c11b-rate@@ + 0.2, 0.5, 0.8);
/* c11c: sentences 135-137 */
      pop("#c11c-bot", @@t:c11c-bot@@, 0.5, 0.8);
      pop("#c11c-ddos", @@t:c11c-ddos@@, 0.5, 0.8);
      pop("#c11c-dl", @@t:c11c-ddos@@ + 0.2, 0.5, 0.8);
      show("#c11c-adv", @@t:c11c-adv@@, 0.5, 30);
      pop("#c11c-sh", @@t:c11c-adv@@ + 0.2, 0.5, 0.8);
      pop("#c11c-opt", @@t:c11c-adv@@ + 0.4, 0.5, 0.8);
/* c11d: sentences 138-141 */
      pop("#c11d-alb", @@t:c11d-alb@@, 0.5, 0.8);
      stream("#c11d-stream .dot", @@t:c11d-stream@@, 1.2, 0, 300, 0.1);
      show("#c11d-s1, #c11d-s2, #c11d-s3, #c11d-s4", @@t:c11d-alb@@ + 0.3, 0.5, 30);
      pop("#c11d-cw", @@t:c11d-dash@@, 0.5, 0.8);
      pop("#c11d-dash", @@t:c11d-dash@@, 0.5, 0.8);
/* c11e: sentences 142-144 */
      show("#c11e-1", @@t:c11e-l1@@, 0.5, 30);
      show("#c11e-2", @@t:c11e-l1@@ + 0.6, 0.5, 30);
      show("#c11e-3", @@t:c11e-l1@@ + 1.2, 0.5, 30);
      show("#c11e-4", @@t:c11e-l1@@ + 1.8, 0.5, 30);
/* c11f: sentences 145-146 */
      pop("#c11f-aws", @@t:c11f-brand@@, 0.6, 0.8);
      show("#c11f-logo", @@t:c11f-brand@@, 0.5, 20);
      pop("#c11f-brand", @@t:c11f-brand@@ + 0.2, 0.5, 0.8);
      gone("#c11f-brand", @@t:c11f-bye@@, 0.2);
      pop("#c11f-bye", @@t:c11f-bye@@, 0.5, 0.8);
