// record-modes.js — Scene 4 (sentences 8-10): Compare scalp EEG cap vs implanted motor cortex micro-array.
import { bciLabWorld, BENCH_Y, STATIONS } from "./open.js";
import { eegElectrodeCap } from "./eeg-electrode-cap/eeg-electrode-cap.js";
import { brainCutaway } from "./brain-cutaway/brain-cutaway.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[3];

  const eeg = eegElectrodeCap(kit, { mode: "sensing" });
  eeg.group.position.set(sx - 0.88, BENCH_Y, sz + 0.05);
  eeg.group.scale.setScalar(0.82);
  eeg.group.rotation.y = 0.24;

  const brain = brainCutaway(kit, { mode: "implanted", arrayCount: 1 });
  brain.group.position.set(sx + 0.88, BENCH_Y, sz - 0.05);
  brain.group.scale.setScalar(0.84);
  brain.group.rotation.y = -0.24;

  // Scalp EEG rings propagating upward
  const rings = signalPulse(kit, { mode: "rings", length: 1.1, color: "#00B4D8" });
  rings.group.position.set(sx - 0.88, BENCH_Y + 1.48, sz + 0.05);
  rings.group.rotation.x = -Math.PI / 2;

  // Direct beam from implanted array
  const beam = signalPulse(kit, { mode: "beam", length: 1.2, color: "#00B4D8" });
  beam.group.position.set(sx + 1.02, BENCH_Y + 1.44, sz - 0.02);
  beam.group.lookAt(new THREE.Vector3(sx + 1.55, BENCH_Y + 1.95, sz - 0.15));

  kit.group.add(eeg.group, brain.group, rings.group, beam.group);

  const poseA = { pos: [sx - 0.45, 2.75, sz + 8.7], look: [sx - 0.05, 2.25, sz], fov: 40 };
  const poseB = { pos: [sx + 0.35, 2.75, sz + 8.7], look: [sx + 0.10, 2.25, sz], fov: 40 };
  const poseImplant = { pos: [sx + 1.05, 2.75, sz + 5.5], look: [sx + 0.88, 2.25, sz - 0.05], fov: 40 };
  const camera = kit.camera(poseA);

  const two = kit.beat("two");
  const eegBeat = kit.beat("eeg");
  const implant = kit.beat("implant");

  kit.label({ text: "2 CÁCH GHI TÍN HIỆU", at: two, hold: 3.2, y: 500 });
  kit.callout({ text: "ĐIỆN NÃO ĐỒ (EEG)", anchor: eeg.anchors.electrodes, at: eegBeat, hold: 2.2 });
  kit.callout({ text: "CẤY VÀO VỎ NÃO", anchor: brain.anchors.array1, at: implant, hold: 2.8 });
  return {
    scene: world.scene,
    camera,
    hero: [eeg.group, brain.group],
    update(t) {
      const fadeEeg = 1 - kit.ease(kit.progress(t, implant, 1.2), "inOut");
      eeg.update(t, { mode: fadeEeg > 0.4 ? "sensing" : "inactive", sensing: fadeEeg, active: 0.35 + 0.65 * fadeEeg });
      rings.update(t, { active: fadeEeg });
      brain.update(t, { mode: "implanted", cutaway: 0.95, cortexLit: 0.9, implanted: 1 });
      beam.update(t, { active: 1 });

      if (t < implant - 0.4) {
        kit.drift(camera, t, { from: poseA, to: poseB, start: 0, dur: implant - 0.4 });
      } else {
        kit.fly(camera, t, { from: poseB, to: poseImplant, start: implant - 0.4, dur: 2.2, ease: "inOut" });
      }

    },
  };
}
