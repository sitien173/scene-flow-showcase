// low_hum.js (w1): Compares steady low-freq engine hum (strongly cancelled) vs irregular high-freq wave.
import { headphoneWorld } from "./hook.js";
import { waveRibbon } from "./wave-ribbon/wave-ribbon.js";

export async function build(kit) {
  const world = await kit.world("headphone", headphoneWorld);
  const { PALETTE } = kit;
  const poseA = { pos: [2.0, 2.9, 10.6], look: [0, 2.15, 0], fov: 40 };
  const poseB = { pos: [2.4, 2.9, 10.4], look: [0.1, 2.15, 0], fov: 40 };
  const camera = kit.camera(poseA);

  const steadyBeat = kit.beat("steady");
  const jetBeat = kit.beat("jet");

  // Lower stream: steady low-frequency hum + anti-phase -> smooth damping
  const lowRed = waveRibbon(kit, { length: 3.4, amp: 0.34, freq: 1.2, color: PALETTE.accent });
  lowRed.group.position.set(0, 2.55, 0.3);
  const lowGreen = waveRibbon(kit, { length: 3.4, amp: 0.30, freq: 1.2, phase: Math.PI, color: PALETTE.good });
  lowGreen.group.position.set(0, 2.55, 0.42);

  // Upper stream: irregular high-frequency noise (less reduction)
  const highRed = waveRibbon(kit, { length: 3.4, amp: 0.28, freq: 2.6, irregular: 0.85, color: PALETTE.accent });
  highRed.group.position.set(0, 3.35, 0.3);

  kit.group.add(lowRed.group, lowGreen.group, highRed.group);

  kit.card({
    title: "HIỆU QUẢ NHẤT",
    body: "TIẾNG TRẦM, ĐỀU",
    anchor: lowRed.anchors.center,
    at: steadyBeat,
    hold: 1.8,
    y: 440,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.hp.group, lowRed.group],
    update(t) {
      world.set(t, { ancOn: 1, pulse: 0.6 });
      const damp = kit.ease(kit.progress(t, steadyBeat, 0.9), "out");
      lowRed.update(t, { amp: 0.34 * (1 - 0.7 * damp) });
      lowGreen.update(t, { amp: 0.30 * (1 - 0.65 * damp) });
      highRed.update(t, { amp: 0.28 * (1 - 0.2 * damp) });

      kit.drift(camera, t, { from: poseA, to: poseB, start: 0, dur: 4.0 });
    },
  };
}
