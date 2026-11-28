// antiphase.js (m1 step 3): Speaker driver emits green anti-phase wave aligned peak-to-trough with red noise wave.
import { headphoneWorld } from "./hook.js";
import { speakerDriver } from "./speaker-driver/speaker-driver.js";
import { waveRibbon } from "./wave-ribbon/wave-ribbon.js";
import { earModel } from "./ear-model/ear-model.js";

export async function build(kit) {
  const world = await kit.world("headphone", headphoneWorld);
  const { PALETTE } = kit;
  const pose = { pos: [0.2, 1.5, 8.0], look: [0.2, 1.4, 2.2], fov: 36 };
  const camera = kit.camera(pose);

  const emitBeat = kit.beat("emit");
  const peakBeat = kit.beat("peak");

  const drv = speakerDriver(kit, {});
  drv.group.position.set(-1.6, 1.35, 2.2);

  const redWave = waveRibbon(kit, { length: 2.8, amp: 0.34, freq: 2.0, phase: 0, color: PALETTE.accent });
  redWave.group.position.set(0.2, 1.82, 2.2);

  const greenWave = waveRibbon(kit, { length: 2.8, amp: 0.34, freq: 2.0, phase: Math.PI, color: PALETTE.good });
  greenWave.group.position.set(0.2, 0.92, 2.2);

  const ear = earModel(kit, {});
  ear.group.position.set(2.0, 1.35, 2.2);
  ear.group.scale.setScalar(0.85);

  kit.group.add(drv.group, redWave.group, greenWave.group, ear.group);

  kit.callout({ text: "SÓNG NGƯỢC PHA", anchor: greenWave.anchors.center, at: emitBeat, hold: 1.5 });
  kit.label({ text: "ĐỈNH ↔ ĐÁY", at: peakBeat, hold: 1.4, y: 1020, size: 62 });

  return {
    scene: world.scene,
    camera,
    hero: [drv.group, greenWave.group],
    update(t) {
      world.set(t, { visible: false });
      const em = kit.ease(kit.progress(t, emitBeat - 0.1, 0.5), "out");
      drv.update(t, { oscillate: em, emit: em });
      redWave.update(t, {});
      greenWave.update(t, { amp: 0.34 * em, reveal: em });
      ear.update(t, {});

      kit.setPose(camera, pose);
    },
  };
}
