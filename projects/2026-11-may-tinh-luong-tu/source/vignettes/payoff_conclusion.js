// payoff_conclusion (sentences 54-55). Moves: the qubit chip sits under its classical control unit (ctrl).
// Interacts: a blue bit block and a Bloch qubit pop up side by side (payoff). Result: the qubit is read and lands
// green on one pole, beside the bit that only ever had two states: a different machine for different questions.
import { qubitChip } from "./qubit-chip/qubit-chip.js";
import { memoryCell } from "./memory-cell/memory-cell.js";
import { blochSphere } from "./bloch-sphere/bloch-sphere.js";
import { C, B, at, tile, labWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("lab", labWorld);
  const set = new THREE.Group();
  set.position.set(...B);
  kit.group.add(set);
  const chip = qubitChip(kit, { mode: "control_hybrid" });
  chip.group.scale.setScalar(0.7);
  chip.group.position.set(0.8, 0, 0.2);
  set.add(chip.group);
  const cell = memoryCell(kit, { gateColor: C.bit, substrateColor: "#3D5580" });
  cell.group.scale.setScalar(0.55);
  cell.group.position.set(-1.0, 0, 0.3);
  set.add(cell.group);
  const bit = tile(kit, "0 | 1", { w: 0.7, h: 0.42, d: 0.3, color: C.bit });
  bit.position.set(-1.0, 1.55, 0.3);
  set.add(bit);
  const sphere = blochSphere(kit, { radius: 0.9 });
  sphere.group.scale.setScalar(0.45);
  sphere.group.userData.baseScale = 0.45;
  sphere.group.position.set(0.8, 1.0, 0.0);
  set.add(sphere.group);
  kit.ink(set);

  const ctrl = kit.beat("ctrl");
  const payoff = kit.beat("payoff");
  const pose = at(B, [0, 2.5, 8.8], [0, 1.2, 0]);
  const end = at(B, [0, 2.4, 8.2], [0, 1.3, 0]);
  const camera = kit.camera(pose);

  // a label, not a callout: the pill for this text is wider than the 768 px pill limit and the kit cuts it
  kit.label({ text: "Mạch điện tử thường điều khiển", at: ctrl, hold: Math.min(3.4, payoff - ctrl - 0.4), y: 470 });
  kit.bigText({ text: "Kiểu máy khác · câu hỏi khác", at: payoff - 1.3, hold: 2.7, y: 520 });

  return {
    scene: world.scene,
    camera,
    hero: [chip.group, cell.group],
    update(t) {
      chip.update(t, { mode: "control_hybrid" });
      cell.update(t, { mode: "trapped_charge" });
      kit.popIn(bit, t, payoff - 0.6);
      kit.popIn(sphere.group, t, payoff - 0.4);
      const c = kit.clamp01((t - (payoff + 0.8)) / 1.2);
      sphere.update(t, c > 0 ? { mode: "collapse_result", collapse: c, target: 0 } : { mode: "superposition", color: C.sup });
      kit.drift(camera, t, { from: pose, to: end, start: 0.4, dur: Math.max(4, payoff) });
    },
  };
}
