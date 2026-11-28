// calibration.js — Scene 7 (sentences 16-18): Watch robot arm move & imagine control to pair neural signals with intent (<4 min).
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { brainCutaway } from "./brain-cutaway/brain-cutaway.js";
import { robotArm } from "./robot-arm/robot-arm.js";
import { controllerChip } from "./controller-chip/controller-chip.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[6];

  const brain = brainCutaway(kit, { mode: "implanted", arrayCount: 1 });
  brain.group.position.set(sx - 0.92, BENCH_Y, sz - 0.10);
  brain.group.scale.setScalar(0.76);
  brain.group.rotation.y = 0.28;

  const chip = controllerChip(kit, { mode: "lut_update" });
  chip.group.position.set(sx + 0.0, BENCH_Y, sz + 0.52);
  chip.group.scale.setScalar(0.66);

  const arm = robotArm(kit, { mode: "calibrateMotion" });
  arm.group.position.set(sx + 0.92, BENCH_Y, sz - 0.15);
  arm.group.scale.setScalar(0.80);
  arm.group.rotation.y = -0.32;

  const pBrain = new THREE.Vector3(sx - 0.55, BENCH_Y + 1.05, sz + 0.05);
  const pChip = new THREE.Vector3(sx - 0.15, BENCH_Y + 0.25, sz + 0.45);
  const beam = signalPulse(kit, { mode: "beam", length: pBrain.distanceTo(pChip), color: "#00B4D8" });
  aimBeam(beam, pBrain, pChip);

  const pairPkt = dataPacket(kit, { color: "#F59E0B" });
  pairPkt.group.scale.setScalar(0.70);

  kit.group.add(brain.group, chip.group, arm.group, beam.group, pairPkt.group);

  const poseL = { pos: [sx - 0.65, 2.85, sz + 8.6], look: [sx - 0.05, 2.20, sz], fov: 40 };
  const poseR = { pos: [sx + 0.65, 2.85, sz + 8.6], look: [sx + 0.10, 2.20, sz], fov: 40 };
  const camera = kit.camera(poseL);

  const learn = kit.beat("learn");
  const calib = kit.beat("calib");
  const fourMin = kit.beat("four_min");

  kit.callout({ text: "HỌC MẪU TÍN HIỆU", anchor: brain.anchors.cortex, at: learn, hold: 2.3 });
  kit.callout({ text: "TƯỞNG TƯỢNG", anchor: arm.anchors.gripper, at: calib, hold: 4.5 });
  kit.card({ title: "HIỆU CHỈNH ĐẦU TIÊN", body: "< 4 phút", at: fourMin - 1.2, hold: 1.7, anchor: chip.anchors.lut, y: 470, width: 540 });
  return {
    scene: world.scene,
    camera,
    hero: [brain.group, chip.group, arm.group],
    update(t) {
      brain.update(t, { mode: "implanted", cutaway: 0.95, cortexLit: 0.9, implanted: 1 });
      arm.update(t, { mode: "calibrateMotion" });
      chip.update(t, { mode: "lut_update", lutHostRow: Math.floor(t * 0.8) % 4, lutPhysRow: (Math.floor(t * 0.8) + 1) % 4 });
      beam.update(t, { active: 1 });

      const u = ((t * 0.45) % 1 + 1) % 1;
      pairPkt.group.position.set(kit.lerp(sx - 0.45, sx + 0.05, u), BENCH_Y + 0.60 + 0.14 * Math.sin(u * Math.PI), sz + 0.42);
      pairPkt.update(t, { pulse: 0.85 });

      kit.fly(camera, t, { from: poseL, to: poseR, start: 0, dur: 13.4, ease: "drift" });

    },
  };
}
