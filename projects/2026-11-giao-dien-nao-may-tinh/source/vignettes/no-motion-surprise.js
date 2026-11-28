// no-motion-surprise.js — Scene 15 (sentences 41-42): the hand stays still while the motor cortex and a neuron fire; a pen stroke may decode more easily than a point-to-point cursor path.
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { SCREEN_AT, END_POSE } from "./typing-speed.js";
import { brainCutaway } from "./brain-cutaway/brain-cutaway.js";
import { neuronCell } from "./neuron-cell/neuron-cell.js";
import { screenCursor } from "./screen-cursor/screen-cursor.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[4];

  // Same monitor pose as typing-speed: the light change keeps the camera where it was.
  const screen = screenCursor(kit, { screenMode: "handwritingText" });
  screen.group.position.set(...SCREEN_AT);
  screen.group.rotation.y = -0.08;

  // A still hand block resting on a wheelchair armrest, left of the monitor.
  const rest = new THREE.Group();
  rest.position.set(sx - 1.55, BENCH_Y, sz + 0.75);
  const armMat = kit.toon("#2B2D38");
  const rail = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.12, 0.24), armMat);
  rail.position.set(0, 0.34, 0);
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.34, 0.14), armMat);
  post.position.set(0, 0.17, 0);
  const handBlock = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.11, 0.18), kit.toon(kit.PALETTE.wall || "#EFC7AD"));
  handBlock.position.set(0.06, 0.45, 0);
  rest.add(rail, post, handBlock);
  kit.ink(rest);
  const handAnchor = new THREE.Object3D();
  handAnchor.position.set(0.06, 0.56, 0);
  rest.add(handAnchor);

  const brain = brainCutaway(kit, { mode: "cortexLit" });
  brain.group.position.set(sx - 1.30, BENCH_Y, sz - 0.55);
  brain.group.scale.setScalar(0.78);
  brain.group.rotation.y = 0.35;

  const neuron = neuronCell(kit, { mode: "firing" });
  neuron.group.position.set(sx - 0.55, BENCH_Y + 0.75, sz - 0.95);
  neuron.group.scale.setScalar(0.42);

  const pBrain = new THREE.Vector3(sx - 1.05, BENCH_Y + 1.45, sz - 0.5);
  const pScr = new THREE.Vector3(sx + 0.25, BENCH_Y + 1.05, sz - 0.2);
  const beam = signalPulse(kit, { mode: "beam", length: pBrain.distanceTo(pScr), color: "#00B4D8" });
  aimBeam(beam, pBrain, pScr);

  kit.group.add(screen.group, rest, brain.group, neuron.group, beam.group);

  const handPose = { pos: [sx - 1.15, 2.05, sz + 3.6], look: [sx - 1.45, 1.40, sz + 0.6], fov: 40 };
  const brainPose = { pos: [sx - 0.85, 2.75, sz + 3.9], look: [sx - 1.1, 2.00, sz - 0.5], fov: 40 };
  const orbitAt = (t) => {
    const a = -0.35 + 0.08 * t;
    return { pos: [sx - 0.3 + 5.4 * Math.sin(a), 2.70, sz + 5.4 * Math.cos(a)], look: [sx - 0.3, 1.85, sz - 0.3], fov: 40 };
  };
  const camera = kit.camera(END_POSE);

  const stillHand = kit.beat("still_hand");
  const vs = kit.beat("handwriting_vs");
  const toHand = Math.max(0.9, stillHand - 0.9);
  const toBrain = stillHand + 1.6;
  const toOrbit = vs - 1.0;

  kit.callout({ text: "KHÔNG CỬ ĐỘNG", anchor: handAnchor, at: stillHand, hold: 2.6 });
  kit.card({ title: "CÓ THỂ DỄ GIẢI MÃ HƠN", body: "Nét chữ so với đưa con trỏ từ điểm tới điểm", at: vs, hold: 3.6, width: 720 });
  return {
    scene: world.scene,
    camera,
    hero: [rest, brain.group, neuron.group, screen.group],
    update(t) {
      brain.update(t, { mode: "cortexLit", cutaway: 0.92, cortexLit: 1.0 });
      neuron.update(t, { mode: "firing", fireRate: 1 });
      screen.update(t, { mode: "handwritingText" });
      beam.update(t, { active: 1 });

      if (t < toHand) {
        kit.fly(camera, t, { from: END_POSE, to: handPose, start: 0, dur: toHand, ease: "inOut" });
      } else if (t < toBrain) {
        kit.drift(camera, t, { from: handPose, to: { ...handPose, pos: [sx - 1.25, 2.10, sz + 3.4] }, start: toHand, dur: toBrain - toHand });
      } else if (t < toOrbit) {
        kit.fly(camera, t, { from: { ...handPose, pos: [sx - 1.25, 2.10, sz + 3.4] }, to: brainPose, start: toBrain, dur: Math.min(1.2, toOrbit - toBrain), ease: "inOut" });
      } else {
        kit.fly(camera, t, { from: brainPose, to: orbitAt(t), start: toOrbit, dur: 1.2, ease: "inOut" });
      }

    },
  };
}
