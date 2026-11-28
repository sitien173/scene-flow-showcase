// app-robot-arm.js — Scene 11 (sentences 29-31): 3D command drives the robot arm to lift a coffee bottle; 4 of 6 attempts succeed.
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { robotArm } from "./robot-arm/robot-arm.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[1];

  const arm = robotArm(kit, { mode: "reach3d" });
  arm.group.position.set(sx + 0.10, BENCH_Y, sz + 0.05);
  arm.group.scale.setScalar(0.92);
  arm.group.rotation.y = -0.25;

  const pSrc = new THREE.Vector3(sx - 1.9, BENCH_Y + 0.30, sz + 0.20);
  const pArm = new THREE.Vector3(sx + 0.05, BENCH_Y + 0.35, sz + 0.05);
  const cmdBeam = signalPulse(kit, { mode: "beam", length: pSrc.distanceTo(pArm), color: "#E879F9" });
  aimBeam(cmdBeam, pSrc, pArm);

  // Six attempt tokens: four successes (green), two misses (red), in a row along the bench front.
  const tries = [];
  for (let i = 0; i < 6; i++) {
    const p = dataPacket(kit, { kind: i < 4 ? "good" : "bad" });
    p.group.position.set(sx - 1.05 + i * 0.42, BENCH_Y + 0.12, sz + 1.05);
    p.group.scale.setScalar(0.9);
    tries.push(p);
  }

  kit.group.add(arm.group, cmdBeam.group, ...tries.map((p) => p.group));

  const center = [sx + 0.05, BENCH_Y + 0.85, sz];
  const pushFrom = { pos: [sx + 1.2, 1.85, sz + 3.9], look: [sx + 0.05, BENCH_Y + 1.0, sz], fov: 40 };
  const pushTo = { pos: [sx + 0.9, 1.95, sz + 3.3], look: [sx + 0.05, BENCH_Y + 1.1, sz], fov: 40 };
  const widePose = { pos: [sx + 0.1, 2.30, sz + 5.3], look: [sx - 0.05, BENCH_Y + 0.75, sz + 0.4], fov: 40 };
  const orbitAt = (t) => {
    const a = -0.55 + 0.06 * t;
    return { pos: [center[0] + 4.2 * Math.sin(a), 1.55, center[2] + 4.2 * Math.cos(a)], look: [center[0], BENCH_Y + 0.95, center[2]], fov: 40 };
  };
  const camera = kit.camera(orbitAt(0));

  const arm3d = kit.beat("arm3d");
  const coffee = kit.beat("coffee");
  const fourSix = kit.beat("four_six");
  const toPush = coffee - 0.6;
  const toWide = fourSix - 1.0;

  kit.callout({ text: "ROBOT 3 CHIỀU", anchor: arm.anchors.gripper, at: arm3d, hold: 2.0 });
  kit.callout({ text: "CẦM CHAI CÀ PHÊ", anchor: arm.anchors.bottle, at: coffee, hold: 2.8 });
  kit.bigText({ text: "4 / 6 LẦN", at: fourSix, hold: 2.4, y: 560 });
  kit.label({ text: "~8,5 PHÚT", at: fourSix + 0.4, hold: 2.0, y: 700 });
  return {
    scene: world.scene,
    camera,
    hero: [arm.group],
    update(t) {
      const grasp = t >= coffee - 0.4;
      const hit = grasp ? kit.clamp01(kit.progress(t, coffee + 1.5, 0.4)) : 0;
      arm.update(t, { mode: grasp ? "graspBottle" : "reach3d", targetHit: hit });
      cmdBeam.update(t, { active: 1 });
      tries.forEach((p, i) => {
        kit.popIn(p.group, t, fourSix + i * 0.18, { dur: 0.3 });
        p.update(t, { pulse: 0.5 });
      });

      if (t < toPush) {
        kit.setPose(camera, orbitAt(t));
      } else if (t < toPush + 0.9) {
        kit.fly(camera, t, { from: orbitAt(toPush), to: pushFrom, start: toPush, dur: 0.9, ease: "inOut" });
      } else if (t < toWide) {
        kit.drift(camera, t, { from: pushFrom, to: pushTo, start: toPush + 0.9, dur: toWide - toPush - 0.9 });
      } else {
        kit.fly(camera, t, { from: pushTo, to: widePose, start: toWide, dur: 0.9, ease: "inOut" });
      }

    },
  };
}
