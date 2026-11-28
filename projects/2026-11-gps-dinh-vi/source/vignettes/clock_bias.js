// m5 / clock_bias: Receiver clock offset makes signal look like it traveled longer,
// producing biased pseudorange (#F08A4B + #DD3428 delta ring).
import { orbitWorld } from "./sat_broadcast.js";
import { atomicClock } from "./atomic-clock/atomic-clock.js";
import { distanceSphere } from "./distance-sphere/distance-sphere.js";

export async function build(kit) {
  const world = await kit.world("orbit", orbitWorld);

  const p0 = { pos: [0.0, 1.25, 5.75], look: [0.0, 0.55, 0.4], fov: 40 };
  const p1 = { pos: [0.1, 1.35, 5.5], look: [0.0, 0.75, 0.6], fov: 40 };
  const camera = kit.camera(p0);

  const realProb = kit.beat("real_prob");
  const phoneClk = kit.beat("phone_clk");
  const fastClk = kit.beat("fast_clk");
  const pseudo = kit.beat("pseudo");

  const refClock = atomicClock(kit, { variant: "atomic", radius: 0.52 });
  refClock.group.position.set(-0.68, 1.25, 1.15);

  const rxClock = atomicClock(kit, { variant: "receiver", radius: 0.52 });
  rxClock.group.position.set(0.68, 1.25, 1.15);

  const s1 = distanceSphere(kit, { radius: 2.0 });
  s1.group.position.set(-0.85, 1.85, 0.15);

  kit.group.add(refClock.group, rxClock.group, s1.group);

  kit.callout({
    text: "LỆCH GIỜ GPS",
    anchor: rxClock.anchors.handTip,
    at: phoneClk,
    hold: pseudo - phoneClk - 0.35,
  });
  kit.card({
    title: "KHOẢNG CÁCH BIỂU KIẾN",
    body: "ĐO LẪN PHẦN LỆCH ĐỒNG HỒ",
    at: pseudo,
    hold: 2.7,
    y: 460,
    width: 680,
  });

  const satPos = [
    [-0.85, 1.85, 0.15],
    [1.5, 1.9, -0.5],
    [0.0, 2.25, -1.2],
  ];

  return {
    scene: world.scene,
    camera,
    hero: [refClock.group, rxClock.group, s1.group],
    update(t) {
      world.set(t, {
        planetPos: [0, -1.65, 0],
        atmosphere: 0,
        satPositions: satPos,
        satCount: 3,
        satScale: 0.65,
      });

      kit.popIn(refClock.group, t, realProb - 0.2, { dur: 0.3 });
      kit.popIn(rxClock.group, t, realProb, { dur: 0.3 });

      const biasVal = kit.lerp(0.0, 1.15, kit.ease(kit.progress(t, phoneClk, fastClk - phoneClk + 1.2), "inOut"));
      refClock.update(t, { speed: 0.7, bias: 0, pulse: 0.7 });
      rxClock.update(t, { speed: 0.7, bias: biasVal, pulse: t >= phoneClk ? 0.9 : 0.4 });

      const swell = kit.ease(kit.progress(t, pseudo - 0.3, 1.0), "out");
      s1.update(t, {
        opacity: t >= realProb ? 0.8 : 0.35,
        radiusScale: 1.0,
        bias: 0.42 * swell,
      });

      kit.fly(camera, t, { from: p0, to: p1, start: phoneClk, dur: 2.8, ease: "drift" });
    },
  };
}
