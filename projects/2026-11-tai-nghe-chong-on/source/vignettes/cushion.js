// cushion.js (r1): Exploded ear pad blocks part of noise, then outer shell slides open for 3D cutaway.
import { headphoneWorld } from "./hook.js";
import { waveRibbon } from "./wave-ribbon/wave-ribbon.js";

export async function build(kit) {
  const world = await kit.world("headphone", headphoneWorld);
  const { PALETTE } = kit;
  const poseA = { pos: [4.8, 2.3, 8.2], look: [0.6, 1.55, 0], fov: 40 };
  const poseB = { pos: [4.5, 2.35, 7.9], look: [0.75, 1.55, 0], fov: 40 };
  const camera = kit.camera(poseA);

  const blockBeat = kit.beat("block");
  const ancBeat = kit.beat("anc");

  const redWave = waveRibbon(kit, { length: 2.2, amp: 0.38, freq: 1.8, color: PALETTE.accent });
  redWave.group.position.set(2.3, 1.25, 0.2);
  kit.group.add(redWave.group);

  kit.callout({ text: "MẠCH CHỐNG ỒN", anchor: world.hp.anchors.chip, at: ancBeat, hold: 1.4 });

  return {
    scene: world.scene,
    camera,
    hero: world.hp.group,
    update(t) {
      const ex = kit.ease(kit.progress(t, blockBeat - 0.2, 0.7), "out");
      const cw = kit.ease(kit.progress(t, ancBeat - 0.1, 0.7), "out");
      world.set(t, { explode: ex, cutaway: cw, ancOn: cw });
      redWave.update(t, { amp: 0.38 * (1 - 0.45 * ex) });
      kit.drift(camera, t, { from: poseA, to: poseB, start: 0, dur: 3.6 });
    },
  };
}
