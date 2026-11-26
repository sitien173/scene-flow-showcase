/* chapter 09: PROTECTING THE ORIGIN */
/* c9a: sentences 108-110 */
      chapterCard("c9a", @@t:c9a-num@@, @@t:c9a-chip@@);
      pop("#c9a-cf", @@t:c9a-chain@@, 0.5, 0.8);
      pop("#c9a-waf", @@t:c9a-chain@@ + 0.2, 0.5, 0.8);
      pop("#c9a-alb", @@t:c9a-chain@@ + 0.4, 0.5, 0.8);
      show("#c9a-srv1, #c9a-srv2", @@t:c9a-chain@@ + 0.6, 0.5, 30);
      tl.fromTo("#c9a-bypass", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.8, ease: "power2.out", immediateRender: false }, @@t:c9a-bypass@@);
/* c9b: sentences 111-113 */
      show("#c9b-atk", @@t:c9b-atk@@, 0.5, 30);
      show("#c9b-alb", @@t:c9b-direct@@ - 0.4, 0.5, 30);
      tl.fromTo("#c9b-red", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.7, ease: "power2.out", immediateRender: false }, @@t:c9b-direct@@);
      show("#c9b-cf, #c9b-waf", @@t:c9b-path@@, 0.5, 30);
      pop("#c9b-gate", @@t:c9b-gate@@, 0.5, 0.8);
/* c9c: sentences 114-117 */
      show("#c9c-card", @@t:c9c-sg@@, 0.5, 40);
      pop("#c9c-sg", @@t:c9c-sg@@, 0.5, 0.8);
      show("#c9c-rule", @@t:c9c-sg@@ + 0.3, 0.5, 30);
      show("#c9c-hdr", @@t:c9c-hdr@@, 0.5, 30);
      pop("#c9c-rej", @@t:c9c-rej@@, 0.5, 0.6);
