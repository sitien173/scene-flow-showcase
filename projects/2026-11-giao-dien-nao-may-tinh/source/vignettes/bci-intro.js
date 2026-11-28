// bci-intro.js — Scene 2 (sentences 3-5): Wheelchair immobile hand, neural bypass to cursor & robot arm, BCI bigText.
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { brainCutaway } from "./brain-cutaway/brain-cutaway.js";
import { screenCursor } from "./screen-cursor/screen-cursor.js";
import { robotArm } from "./robot-arm/robot-arm.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[1];

  // Minimal wheelchair armrest + static hand block on the left
  const restGroup = new THREE.Group();
  restGroup.position.set(sx - 0.95, BENCH_Y, sz + 0.42);
  const armMat = kit.toon("#2B2D38");
  const handMat = kit.toon(kit.PALETTE.wall || "#EFC7AD");
  const rail = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.12, 0.24), armMat);
  rail.position.set(0, 0.34, 0);
  const postA = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.34, 0.14), armMat);
  postA.position.set(-0.24, 0.17, 0);
  const postB = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.34, 0.14), armMat);
  postB.position.set(0.24, 0.17, 0);
  const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.045, 8, 18), armMat);
  wheel.position.set(-0.28, 0.34, -0.18);
  const handBlock = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.11, 0.18), handMat);
  handBlock.position.set(0.06, 0.45, 0);
  restGroup.add(rail, postA, postB, wheel, handBlock);
  kit.ink(restGroup);

  const handAnchor = new THREE.Object3D();
  handAnchor.position.set(0.06, 0.56, 0);
  restGroup.add(handAnchor);

  const brain = brainCutaway(kit, { mode: "cortexLit" });
  brain.group.position.set(sx - 0.78, BENCH_Y, sz - 0.42);
  brain.group.scale.setScalar(0.72);
  brain.group.rotation.y = 0.22;

  const screen = screenCursor(kit, { screenMode: "cursorGrid" });
  screen.group.position.set(sx + 0.88, BENCH_Y, sz - 0.38);
  screen.group.scale.setScalar(0.64);
  screen.group.rotation.y = -0.24;

  const arm = robotArm(kit, { mode: "reach3d" });
  arm.group.position.set(sx + 0.80, BENCH_Y, sz + 0.42);
  arm.group.scale.setScalar(0.76);
  arm.group.rotation.y = -0.35;

  const pStart = new THREE.Vector3(sx - 0.65, BENCH_Y + 1.15, sz - 0.35);
  const pScreen = new THREE.Vector3(sx + 0.72, BENCH_Y + 0.80, sz - 0.32);
  const pArm = new THREE.Vector3(sx + 0.68, BENCH_Y + 0.85, sz + 0.38);

  const beamScreen = signalPulse(kit, { mode: "beam", length: pStart.distanceTo(pScreen), color: "#00B4D8" });
  aimBeam(beamScreen, pStart, pScreen);
  const beamArm = signalPulse(kit, { mode: "beam", length: pStart.distanceTo(pArm), color: "#00B4D8" });
  aimBeam(beamArm, pStart, pArm);

  kit.group.add(restGroup, brain.group, screen.group, arm.group, beamScreen.group, beamArm.group);

  const orbitCenter = [sx, 2.25, sz];
  const startPose = { pos: [sx - 1.6, 2.85, sz + 8.6], look: orbitCenter, fov: 40 };
  const midPose = { pos: [sx + 1.3, 2.75, sz + 8.6], look: [sx + 0.25, 2.20, sz], fov: 40 };
  const pushPose = { pos: [sx + 1.1, 2.55, sz + 6.7], look: [sx + 0.58, 2.15, sz + 0.05], fov: 40 };
  const camera = kit.camera(startPose);

  const wheelchair = kit.beat("wheelchair");
  const control = kit.beat("control");
  const bci = kit.beat("bci");

  kit.callout({ text: "TAY BỊ LIỆT", anchor: handAnchor, at: wheelchair, hold: 2.3 });
  kit.mark({ kind: "x", anchor: handAnchor, at: wheelchair + 0.15, hold: 2.1 });
  kit.callout({ text: "CON TRỎ & ROBOT", anchor: arm.anchors.gripper, at: control, hold: 2.6 });
  kit.bigText({ text: "BCI", at: bci, hold: 1.5, y: 560 });
  return {
    scene: world.scene,
    camera,
    hero: [restGroup, brain.group, screen.group, arm.group],
    update(t) {
      brain.update(t, { mode: "cortexLit", cutaway: 0.9, cortexLit: 0.95 });
      const activeCtrl = kit.clamp01(kit.progress(t, control - 0.8, 0.8));
      screen.update(t, { mode: "cursorGrid", hit: activeCtrl > 0.5 ? (Math.sin(t * 2.5) > 0.5 ? 1 : 0) : 0 });
      arm.update(t, { mode: activeCtrl > 0.2 ? "reach3d" : "idle" });
      beamScreen.update(t, { active: 0.4 + 0.6 * activeCtrl });
      beamArm.update(t, { active: 0.4 + 0.6 * activeCtrl });

      if (t < control) {
        kit.fly(camera, t, { from: startPose, to: midPose, start: 0, dur: control, ease: "drift" });
      } else {
        kit.fly(camera, t, { from: midPose, to: pushPose, start: control, dur: 6.3, ease: "inOut" });
      }

    },
  };
}
