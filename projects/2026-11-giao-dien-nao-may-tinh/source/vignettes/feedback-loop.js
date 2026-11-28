// feedback-loop.js — Scene 9 (sentences 22-24): Visual feedback (#2D884E) closes the 4-color co-adaptation loop.
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { brainCutaway } from "./brain-cutaway/brain-cutaway.js";
import { controllerChip } from "./controller-chip/controller-chip.js";
import { robotArm } from "./robot-arm/robot-arm.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[8];

  const brain = brainCutaway(kit, { mode: "implanted", arrayCount: 1 });
  brain.group.position.set(sx - 0.90, BENCH_Y, sz - 0.25);
  brain.group.scale.setScalar(0.75);
  brain.group.rotation.y = 0.35;

  const chip = controllerChip(kit, { mode: "lut_update" });
  chip.group.position.set(sx + 0.0, BENCH_Y, sz + 0.50);
  chip.group.scale.setScalar(0.65);

  const arm = robotArm(kit, { mode: "reach3d" });
  arm.group.position.set(sx + 0.90, BENCH_Y, sz - 0.20);
  arm.group.scale.setScalar(0.75);
  arm.group.rotation.y = -0.35;

  const pBrain = new THREE.Vector3(sx - 0.55, BENCH_Y + 0.95, sz - 0.15);
  const pChip = new THREE.Vector3(sx, BENCH_Y + 0.28, sz + 0.45);
  const pArm = new THREE.Vector3(sx + 0.72, BENCH_Y + 0.75, sz - 0.12);

  const bNeural = signalPulse(kit, { mode: "beam", length: pBrain.distanceTo(pChip), color: "#00B4D8" });
  aimBeam(bNeural, pBrain, pChip);
  const bCmd = signalPulse(kit, { mode: "beam", length: pChip.distanceTo(pArm), color: "#E879F9" });
  aimBeam(bCmd, pChip, pArm);

  const fbBeads = kit.beads(
    [
      [sx + 0.78, BENCH_Y + 1.28, sz - 0.15],
      [sx, BENCH_Y + 1.62, sz - 0.42],
      [sx - 0.75, BENCH_Y + 1.32, sz - 0.20],
    ],
    { distance: 8.6, color: "#2D884E", glow: "#A7F3D0", start: 0, onTop: true }
  );

  const fbPkt = dataPacket(kit, { kind: "good", color: "#2D884E" });
  fbPkt.group.scale.setScalar(0.68);

  kit.group.add(brain.group, chip.group, arm.group, bNeural.group, bCmd.group, fbBeads.group, fbPkt.group);

  const center = [sx, 2.25, sz];
  const poseStart = { pos: [sx - 1.2, 2.75, sz + 8.5], look: center, fov: 40 };
  const poseHigh = { pos: [sx + 0.4, 4.15, sz + 8.6], look: [sx, 2.15, sz], fov: 40 };
  const camera = kit.camera(poseStart);

  const see = kit.beat("see");
  const adapt = kit.beat("adapt");
  const summary = kit.beat("summary");

  kit.callout({ text: "PHẢN HỒI THỊ GIÁC", anchor: fbPkt.anchors.center, at: see + 0.4, hold: 3.0 });
  kit.card({ title: "CÙNG THÍCH NGHI", body: "Người dùng & Bộ giải mã", at: adapt - 1.2, hold: 1.9, anchor: chip.anchors.lut, y: 470, width: 580 });
  kit.label({ text: "1 GHI · 2 LỌC · 3 GIẢI MÃ · 4 LỆNH", at: summary, hold: 3.8, y: 540, size: 52 });
  return {
    scene: world.scene,
    camera,
    hero: [brain.group, chip.group, arm.group],
    update(t) {
      const fbStrength = kit.clamp01(0.45 + 0.55 * kit.progress(t, see, 1.2));
      brain.update(t, { mode: "implanted", cutaway: 0.95, cortexLit: 0.9, implanted: 1, feedback: fbStrength });
      chip.update(t, { mode: "lut_update", sending: true, lutHostRow: Math.floor(t) % 4, lutPhysRow: (Math.floor(t) + 2) % 4 });
      arm.update(t, { mode: "reach3d", targetHit: 0.8 });

      bNeural.update(t, { active: 1 });
      bCmd.update(t, { active: 1 });
      fbBeads.update(t);

      const uFb = ((t * 0.48) % 1 + 1) % 1;
      fbPkt.group.position.set(
        kit.lerp(sx + 0.75, sx - 0.75, uFb),
        BENCH_Y + 1.30 + 0.34 * Math.sin(uFb * Math.PI),
        sz - 0.20 - 0.22 * Math.sin(uFb * Math.PI)
      );
      fbPkt.update(t, { pulse: 0.85 });

      if (t < summary) {
        kit.orbit(camera, t, { center, radius: 8.6, height: 0.52, angle: -0.14, speed: 0.06, fov: 40 });
      } else {
        const fromPose = {
          pos: [center[0] + 8.6 * Math.sin(-0.14 + 0.06 * summary), center[1] + 0.52, center[2] + 8.6 * Math.cos(-0.14 + 0.06 * summary)],
          look: center,
          fov: 40,
        };
        kit.fly(camera, t, { from: fromPose, to: poseHigh, start: summary, dur: 4.3, ease: "inOut" });
      }

    },
  };
}
