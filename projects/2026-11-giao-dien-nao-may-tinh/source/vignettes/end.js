// end.js — Scene 18 (sentences 48-50): the four-colour chain once more: neural spike, decoded counts, cursor command, green feedback.
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { brainCutaway } from "./brain-cutaway/brain-cutaway.js";
import { neuronCell } from "./neuron-cell/neuron-cell.js";
import { controllerChip } from "./controller-chip/controller-chip.js";
import { screenCursor } from "./screen-cursor/screen-cursor.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[7];

  const brain = brainCutaway(kit, { mode: "implanted" });
  brain.group.position.set(sx - 1.70, BENCH_Y, sz - 0.20);
  brain.group.scale.setScalar(0.72);
  brain.group.rotation.y = 0.3;

  const neuron = neuronCell(kit, { mode: "binned" });
  neuron.group.position.set(sx - 0.75, BENCH_Y + 0.55, sz - 0.70);
  neuron.group.scale.setScalar(0.34);

  const chip = controllerChip(kit, { mode: "dispatch_write" });
  chip.group.position.set(sx + 0.30, BENCH_Y, sz + 0.45);
  chip.group.scale.setScalar(0.70);

  const screen = screenCursor(kit, { screenMode: "cursorGrid" });
  screen.group.position.set(sx + 1.55, BENCH_Y, sz - 0.30);
  screen.group.scale.setScalar(0.68);
  screen.group.rotation.y = -0.3;

  const pBrain = new THREE.Vector3(sx - 1.45, BENCH_Y + 1.30, sz - 0.2);
  const pNeuron = new THREE.Vector3(sx - 0.30, BENCH_Y + 0.90, sz - 0.7);
  const pChip = new THREE.Vector3(sx + 0.30, BENCH_Y + 0.25, sz + 0.45);
  const pScr = new THREE.Vector3(sx + 1.40, BENCH_Y + 0.80, sz - 0.25);
  const beams = [[pBrain, pNeuron, "#00B4D8"], [pChip, pScr, "#E879F9"]].map(([a, b, c]) => {
    const s = signalPulse(kit, { mode: "beam", length: a.distanceTo(b), color: c });
    aimBeam(s, a, b);
    return s;
  });
  const counts = dataPacket(kit, { color: "#F59E0B" });
  counts.group.scale.setScalar(0.6);
  const feedback = dataPacket(kit, { kind: "good" });
  feedback.group.scale.setScalar(0.6);

  kit.group.add(brain.group, neuron.group, chip.group, screen.group, counts.group, feedback.group, ...beams.map((b) => b.group));

  const brainPose = { pos: [sx - 1.25, 2.65, sz + 4.4], look: [sx - 1.45, 1.95, sz - 0.2], fov: 40 };
  const chipPose = { pos: [sx + 0.55, 2.45, sz + 4.4], look: [sx + 0.55, 1.55, sz + 0.1], fov: 40 };
  const widePose = { pos: [sx, 4.1, sz + 9.0], look: [sx, 1.85, sz], fov: 40 };
  const camera = kit.camera(brainPose);

  const motorIntent = kit.beat("motor_intent");
  const stable = kit.beat("stable");
  const chain = kit.beat("chain");
  const toChip = stable - 1.4;
  const toWide = chain - 1.2;

  kit.callout({ text: "Ý ĐỊNH CỬ ĐỘNG", anchor: brain.anchors.cortex, at: motorIntent, hold: 2.8 });
  kit.callout({ text: "ỔN ĐỊNH", anchor: screen.anchors.cursor, at: stable, hold: 2.0 });
  kit.label({ text: "Ý ĐỊNH → XUNG ĐIỆN → DÃY SỐ → LỆNH", at: chain, hold: 3.0, y: 1180, size: 52 });
  return {
    scene: world.scene,
    camera,
    hero: [brain.group, chip.group, screen.group],
    update(t) {
      const fb = kit.ease(kit.progress(t, stable - 0.5, 0.8), "out");
      brain.update(t, { mode: "implanted", cutaway: 0.92, cortexLit: 1.0, feedback: fb });
      neuron.update(t, { mode: "binned", fireRate: 1 });
      chip.update(t, { mode: "dispatch_write", sending: true });
      screen.update(t, { mode: "cursorGrid", hit: fb > 0.5 && Math.sin(t * 1.9) > 0.4 ? 1 : 0 });
      beams.forEach((b) => b.update(t, { active: 1 }));

      const u = ((t * 0.6) % 1 + 1) % 1;
      counts.group.position.lerpVectors(pNeuron, pChip, u);
      counts.group.position.y += 0.15 * Math.sin(u * Math.PI);
      counts.update(t, { pulse: 0.7 });
      feedback.group.visible = fb > 0.1;
      feedback.group.position.lerpVectors(pScr, pBrain, u);
      feedback.group.position.y += 0.8 * Math.sin(u * Math.PI);
      feedback.update(t, { pulse: 0.8 });

      if (t < toChip) {
        kit.drift(camera, t, { from: brainPose, to: { ...brainPose, pos: [sx - 1.05, 2.6, sz + 4.2] }, start: 0, dur: toChip });
      } else if (t < toWide) {
        kit.fly(camera, t, { from: { ...brainPose, pos: [sx - 1.05, 2.6, sz + 4.2] }, to: chipPose, start: toChip, dur: 1.3, ease: "inOut" });
      } else {
        kit.fly(camera, t, { from: chipPose, to: widePose, start: toWide, dur: 1.8, ease: "inOut" });
      }

    },
  };
}
