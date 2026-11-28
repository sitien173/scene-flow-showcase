// cancel.js (m1 step 4): Red and green waves converge and overlap near ear-model, cancelling amplitude.
import { headphoneWorld } from "./hook.js";
import { waveRibbon } from "./wave-ribbon/wave-ribbon.js";
import { earModel } from "./ear-model/ear-model.js";

export async function build(kit) {
  const world = await kit.world("headphone", headphoneWorld);
  const { PALETTE } = kit;
  const pose = { pos: [0.5, 1.5, 6.8], look: [0.5, 1.4, 2.2], fov: 34 };
  const camera = kit.camera(pose);

  const meetBeat = kit.beat("meet");
  const offsetBeat = kit.beat("offset");

  const redWave = waveRibbon(kit, { length: 2.6, amp: 0.38, freq: 2.0, phase: 0, color: PALETTE.accent });
  const greenWave = waveRibbon(kit, { length: 2.6, amp: 0.38, freq: 2.0, phase: Math.PI, color: PALETTE.good });
  const ear = earModel(kit, {});
  ear.group.position.set(1.65, 1.4, 2.2);
  ear.group.scale.setScalar(0.95);

  kit.group.add(redWave.group, greenWave.group, ear.group);

  kit.callout({ text: "BÙ TRỪ NHAU", anchor: ear.anchors.canal, at: offsetBeat, hold: 1.4 });

  return {
    scene: world.scene,
    camera,
    hero: [ear.group, redWave.group],
    update(t) {
      world.set(t, { visible: false });
      const merge = kit.ease(kit.progress(t, meetBeat, 0.9), "inOut");
      const damp = kit.ease(kit.progress(t, offsetBeat - 0.3, 0.8), "out");

      redWave.group.position.set(-0.1, 1.4 + 0.42 * (1 - merge), 2.2);
      greenWave.group.position.set(-0.1, 1.4 - 0.42 * (1 - merge), 2.25);
      const amp = 0.38 * (1 - 0.72 * damp);
      redWave.update(t, { amp });
      greenWave.update(t, { amp });
      ear.update(t, { quietGlow: damp * 0.6 });

      kit.push(camera, t, { ...pose, amount: 0.45, start: meetBeat, dur: 1.8 });
    },
  };
}
