/* c5a: opener on sentence 53; the ELB tile, then the ALB, replace the request stream; servers appear on "nhiều server". */
pop("#c5a-num", @@t:c5a-s53@@, 0.5, 0.8);
pop("#c5a-tile", @@t:c5a-s53@@ + 0.05, 0.6, 0.6);
pop("#c5a-burst", @@t:c5a-s53@@ + 0.2, 0.6, 0.4);
show("#c5a-title", @@t:c5a-s53@@, 0.5, 0);
pop("#c5a-mascot", @@t:c5a-s53@@ + 0.15, 0.6, 0.6);
gone("#c5a-num, #c5a-tile, #c5a-title, #c5a-burst, #c5a-mascot", @@t:c5a-chip@@, 0.35);
pop("#c5a-chip", @@t:c5a-chip@@ + 0.1, 0.5, 0.6);
stream("#c5a-stream .dot", @@t:c5a-chip@@ + 0.2, 0.8, 0, 460, 0.08);
pop("#c5a-s1, #c5a-s2, #c5a-s3, #c5a-s4", @@t:c5a-srv@@, 0.5, 0.8);
pop("#c5a-lb", @@t:c5a-elb@@, 0.6, 0.7);
pop("#c5a-elb", @@t:c5a-elb@@ + 0.15, 0.5, 0.6);
tl.fromTo("#c5a-name", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, @@t:c5a-elb@@ + 0.25);
tl.to("#c5a-name, #c5a-elb", { autoAlpha: 0, duration: 0.3 }, @@t:c5a-alb@@);
pop("#c5a-alb", @@t:c5a-alb@@ + 0.1, 0.5, 0.6);
pop("#c5a-pill", @@t:c5a-pill@@, 0.4, 0.6);

/* c5b: the ALB in front of two availability zones; six servers; requests fan out on "Thay". */
pop("#c5b-alb", @@t:c5b-alb@@, 0.6, 0.7);
draw("#c5b-ch0p, #c5b-ch1p, #c5b-ch2p", @@t:c5b-route@@, 0.4, 0.1);
tl.fromTo("#c5b-ch0, #c5b-ch1, #c5b-ch2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, @@t:c5b-route@@);
tl.fromTo("#c5b-d0", { x: 0, y: 0, autoAlpha: 0 }, { x: 518, y: -172, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5b-route@@ + 0.10);
tl.to("#c5b-d0", { autoAlpha: 0, duration: 0.2 }, @@t:c5b-route@@ + 1.00);
tl.fromTo("#c5b-d1", { x: 0, y: 0, autoAlpha: 0 }, { x: 818, y: -172, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5b-route@@ + 0.25);
tl.to("#c5b-d1", { autoAlpha: 0, duration: 0.2 }, @@t:c5b-route@@ + 1.15);
tl.fromTo("#c5b-d2", { x: 0, y: 0, autoAlpha: 0 }, { x: 1118, y: -172, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5b-route@@ + 0.40);
tl.to("#c5b-d2", { autoAlpha: 0, duration: 0.2 }, @@t:c5b-route@@ + 1.30);
tl.fromTo("#c5b-d3", { x: 0, y: 0, autoAlpha: 0 }, { x: 518, y: 248, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5b-route@@ + 0.55);
tl.to("#c5b-d3", { autoAlpha: 0, duration: 0.2 }, @@t:c5b-route@@ + 1.45);
tl.fromTo("#c5b-d4", { x: 0, y: 0, autoAlpha: 0 }, { x: 818, y: 248, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5b-route@@ + 0.70);
tl.to("#c5b-d4", { autoAlpha: 0, duration: 0.2 }, @@t:c5b-route@@ + 1.60);
tl.fromTo("#c5b-d5", { x: 0, y: 0, autoAlpha: 0 }, { x: 1118, y: 248, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5b-route@@ + 0.85);
tl.to("#c5b-d5", { autoAlpha: 0, duration: 0.2 }, @@t:c5b-route@@ + 1.75);
pop("#c5b-s1, #c5b-s2, #c5b-s3, #c5b-s4, #c5b-s5, #c5b-s6", @@t:c5b-srv@@, 0.5, 0.8);
pop("#c5b-ok1, #c5b-ok2, #c5b-ok3, #c5b-ok4, #c5b-ok5, #c5b-ok6", @@t:c5b-ok@@, 0.4, 0.5);
pop("#c5b-az1, #c5b-az2", @@t:c5b-az@@, 0.6, 0.9);
show("#c5b-lab1, #c5b-lab2", @@t:c5b-az@@, 0.4, 0);
pop("#c5b-ec2", @@t:c5b-ec2@@, 0.5, 0.6);

/* c5c: health check. Server 2 fails on "không còn khỏe mạnh"; requests go to the five healthy servers on "Nhờ vậy". */
pop("#c5c-heart", @@t:c5c-hc@@, 0.5, 0.7);
draw("#c5c-l0, #c5c-l1, #c5c-l2, #c5c-l3, #c5c-l4, #c5c-l5", @@t:c5c-hc@@ + 0.2, 0.6, 0.08);
pop("#c5c-u1, #c5c-u2, #c5c-u3, #c5c-u4", @@t:c5c-users@@, 0.4, 0.7);
pop("#c5c-uok1, #c5c-uok2, #c5c-uok3, #c5c-uok4", @@t:c5c-users@@ + 0.3, 0.4, 0.5);
bump("#c5c-heart", @@t:c5c-check@@, 1.12);
tl.to("#c5c-s2", { autoAlpha: 0.35, filter: "grayscale(1)", duration: 0.4 }, @@t:c5c-down@@);
pop("#c5c-x2", @@t:c5c-down@@, 0.4, 0.8);
tl.to("#c5c-ok2, #c5c-l1", { autoAlpha: 0, duration: 0.3 }, @@t:c5c-down@@);
tl.fromTo("#c5c-r0", { x: 0, y: 0, autoAlpha: 0 }, { x: 518, y: -172, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5c-reroute@@ + 0.00);
tl.to("#c5c-r0", { autoAlpha: 0, duration: 0.2 }, @@t:c5c-reroute@@ + 1.00);
tl.fromTo("#c5c-r1", { x: 0, y: 0, autoAlpha: 0 }, { x: 1118, y: -172, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5c-reroute@@ + 0.12);
tl.to("#c5c-r1", { autoAlpha: 0, duration: 0.2 }, @@t:c5c-reroute@@ + 1.12);
tl.fromTo("#c5c-r2", { x: 0, y: 0, autoAlpha: 0 }, { x: 518, y: 248, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5c-reroute@@ + 0.24);
tl.to("#c5c-r2", { autoAlpha: 0, duration: 0.2 }, @@t:c5c-reroute@@ + 1.24);
tl.fromTo("#c5c-r3", { x: 0, y: 0, autoAlpha: 0 }, { x: 818, y: 248, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5c-reroute@@ + 0.36);
tl.to("#c5c-r3", { autoAlpha: 0, duration: 0.2 }, @@t:c5c-reroute@@ + 1.36);
tl.fromTo("#c5c-r4", { x: 0, y: 0, autoAlpha: 0 }, { x: 1118, y: 248, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" }, @@t:c5c-reroute@@ + 0.48);
tl.to("#c5c-r4", { autoAlpha: 0, duration: 0.2 }, @@t:c5c-reroute@@ + 1.48);

/* c5d: the five columns take the accent one by one; traffic rises past the line and the chart dims the columns. */
pop("#c5d-col1, #c5d-col2, #c5d-col3, #c5d-col4, #c5d-col5", @@t:c5d-s64@@, 0.5, 0.7);
show("#c5d-ec2s", @@t:c5d-s64@@, 0.4, 0);
pop("#c5d-o1", @@t:c5d-s64@@ + 0.65, 0.4, 0.6);
pop("#c5d-o2", @@t:c5d-s64@@ + 0.80, 0.4, 0.6);
pop("#c5d-o3", @@t:c5d-s64@@ + 0.95, 0.4, 0.6);
pop("#c5d-o4", @@t:c5d-s64@@ + 1.10, 0.4, 0.6);
pop("#c5d-o5", @@t:c5d-s64@@ + 1.25, 0.4, 0.6);
show("#c5d-avail", @@t:c5d-avail@@, 0.4, 0);
meter("c5d-avail", @@t:c5d-avail@@ + 0.3, 100, 1.0, 0);
tl.to("#c5d-hist", { autoAlpha: 0.3, duration: 0.6, ease: "power1.out" }, @@t:c5d-chart@@);
gone("#c5d-avail", @@t:c5d-chart@@, 0.4);
show("#c5d-chart", @@t:c5d-chart@@ + 0.1, 0.5, 0);
draw("#c5d-traffic", @@t:c5d-chart@@ + 0.2, 1.4);
pop("#c5d-head", @@t:c5d-chart@@ + 1.5, 0.4, 0.6);
pop("#c5d-q", @@t:c5d-q@@, 0.5, 0.8);
pop("#c5d-elb", @@t:c5d-elb@@, 0.5, 0.7);
