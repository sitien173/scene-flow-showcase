// kalman-decode.js — Scene 8 (sentences 19-21): Kalman filter maps spikes to velocity commands (#E879F9) for robot arm & cursor.
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { controllerChip } from "./controller-chip/controller-chip.js";
import { dataPacket } from "./data-packet/data-packet.js";
import { robotArm } from "./robot-arm/robot-arm.js";
import { screenCursor } from "./screen-cursor/screen-cursor.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[7];

  const chip = controllerChip(kit, { mode: "dispatch_write" });
  chip.group.position.set(sx, BENCH_Y, sz + 0.48);
  chip.group.scale.setScalar(0.76);

  const arm = robotArm(kit, { mode: "reach3d" });
  arm.group.position.set(sx - 0.92, BENCH_Y, sz - 0.36);
  arm.group.scale.setScalar(0.76);
  arm.group.rotation.y = 0.25;

  const screen = screenCursor(kit, { screenMode: "cursorGrid" });
  screen.group.position.set(sx + 0.92, BENCH_Y, sz - 0.38);
  screen.group.scale.setScalar(0.68);
  screen.group.rotation.y = -0.25;

  const inPkt = dataPacket(kit, { color: "#F59E0B" });
  inPkt.group.scale.setScalar(0.66);

  const velPkt = dataPacket(kit, { color: "#E879F9" });
  velPkt.group.scale.setScalar(0.72);

  const pChip = new THREE.Vector3(sx, BENCH_Y + 0.25, sz + 0.42);
  const pArm = new THREE.Vector3(sx - 0.78, BENCH_Y + 0.75, sz - 0.30);
  const pScr = new THREE.Vector3(sx + 0.78, BENCH_Y + 0.80, sz - 0.30);

  const beamArm = signalPulse(kit, { mode: "beam", length: pChip.distanceTo(pArm), color: "#E879F9" });
  aimBeam(beamArm, pChip, pArm);
  const beamScr = signalPulse(kit, { mode: "beam", length: pChip.distanceTo(pScr), color: "#E879F9" });
  aimBeam(beamScr, pChip, pScr);

  kit.group.add(chip.group, arm.group, screen.group, inPkt.group, velPkt.group, beamArm.group, beamScr.group);

  const closeChip = { pos: [sx + 0.1, 2.50, sz + 5.6], look: [sx, 1.85, sz + 0.35], fov: 40 };
  const wideLab = { pos: [sx, 2.95, sz + 8.9], look: [sx, 2.25, sz - 0.1], fov: 40 };
  const finalPose = { pos: [sx + 0.25, 2.90, sz + 8.5], look: [sx + 0.1, 2.25, sz - 0.1], fov: 40 };
  const camera = kit.camera(closeChip);

  const kalman = kit.beat("kalman");
  const velocity = kit.beat("velocity");
  const command = kit.beat("command");

  kit.bigText({ text: "KALMAN", at: kalman, hold: 2.0, y: 520 });
  kit.callout({ text: "BỘ GIẢI MÃ", anchor: chip.anchors.cmdCore, at: kalman, hold: 2.8 });
  kit.callout({ text: "ƯỚC TÍNH VẬN TỐC", anchor: velPkt.anchors.center, at: velocity, hold: 2.5 });
  kit.callout({ text: "LỆNH VẬN TỐC", anchor: screen.anchors.cursor, at: command, hold: 2.4 });
  return {
    scene: world.scene,
    camera,
    hero: [chip.group, arm.group, screen.group],
    update(t) {
      const cmdOn = kit.clamp01(0.35 + kit.progress(t, velocity - 0.6, 0.8) * 0.65);
      chip.update(t, { mode: "dispatch_write", sending: true, cmdStrength: cmdOn });
      arm.update(t, { mode: "reach3d" });
      screen.update(t, { mode: "cursorGrid", cursorX: 0.44 * Math.sin(t * 2.2), cursorY: 0.22 * Math.cos(t * 2.2) });

      beamArm.update(t, { active: cmdOn });
      beamScr.update(t, { active: cmdOn });

      const uIn = ((t * 0.7) % 1 + 1) % 1;
      inPkt.group.position.set(sx - 0.45 + 0.35 * uIn, BENCH_Y + 0.32 + 0.12 * Math.sin(uIn * Math.PI), sz + 0.65);
      inPkt.update(t, { pulse: 0.75 });

      const uOut = ((t * 0.6) % 1 + 1) % 1;
      velPkt.group.position.lerpVectors(pChip, pScr, uOut);
      velPkt.group.position.y += 0.15 * Math.sin(uOut * Math.PI);
      velPkt.update(t, { pulse: 0.9 });

      if (t < 4.5) {
        kit.drift(camera, t, { from: closeChip, to: { ...closeChip, pos: [sx - 0.1, 2.55, sz + 5.9] }, start: 0, dur: 4.5 });
      } else if (t < 9.5) {
        kit.fly(camera, t, { from: { ...closeChip, pos: [sx - 0.1, 2.55, sz + 5.9] }, to: wideLab, start: 4.5, dur: 5.0, ease: "inOut" });
      } else {
        kit.drift(camera, t, { from: wideLab, to: finalPose, start: 9.5, dur: 3.8 });
      }

    },
  };
}
