// quiet.js (m1 step 5): Dusk light; only a small purple residual wave reaches ear-model.
import { headphoneWorld } from "./hook.js";
import { waveRibbon } from "./wave-ribbon/wave-ribbon.js";
import { earModel } from "./ear-model/ear-model.js";

export async function build(kit) {
  const world = await kit.world("headphone", headphoneWorld);
  const { PALETTE } = kit;
  const poseA = { pos: [0.75, 1.55, 8.4], look: [0.75, 1.4, 2.2], fov: 38 };
  const poseB = { pos: [0.85, 1.65, 9.0], look: [0.75, 1.4, 2.2], fov: 38 };
  const camera = kit.camera(poseA);

  const weakBeat = kit.beat("weak");
  const lessBeat = kit.beat("less");

  const resWave = waveRibbon(kit, { length: 2.5, amp: 0.11, freq: 2.0, color: PALETTE.shade });
  resWave.group.position.set(-0.1, 1.35, 2.2);

  const ear = earModel(kit, {});
  ear.group.position.set(1.5, 1.4, 2.2);
  ear.group.scale.setScalar(0.95);

  kit.group.add(resWave.group, ear.group);

  kit.mark({ kind: "check", anchor: resWave.anchors.center, at: lessBeat, hold: 1.2 });
  kit.callout({ text: "SÓNG YẾU HƠN", anchor: ear.anchors.canal, at: lessBeat, hold: 1.4 });

  return {
    scene: world.scene,
    camera,
    hero: [ear.group, resWave.group],
    update(t) {
      world.set(t, { visible: false });
      const calm = kit.ease(kit.progress(t, weakBeat - 0.2, 0.7), "out");
      resWave.update(t, { amp: 0.14 - 0.05 * calm });
      ear.update(t, { quietGlow: 0.5 + 0.5 * calm });

      kit.drift(camera, t, { from: poseA, to: poseB, start: 0, dur: 3.3 });
    },
  };
}
