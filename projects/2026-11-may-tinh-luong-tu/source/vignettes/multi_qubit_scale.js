// multi_qubit_scale (sentences 24-26). Moves: four purple state tiles 00, 01, 10, 11 pop up over the chip (two_q),
// then eight three-bit tiles replace them (double). Interacts: each added qubit doubles the row of states.
// Result: the camera flies down to the chip, its 53-qubit grid glows and the big number appears (fifty_three).
import { qubitChip } from "./qubit-chip/qubit-chip.js";
import { C, A, at, tile, quantumWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("quantum", quantumWorld);
  const set = new THREE.Group();
  set.position.set(...A);
  kit.group.add(set);
  const chip = qubitChip(kit, { mode: "overview" });
  chip.group.position.set(0, 0, -0.5);
  set.add(chip.group);
  const mk = (s, x, y) => {
    const g = tile(kit, s, { w: 0.62, h: 0.36, d: 0.1, color: C.sup });
    g.position.set(x, y, 0.6);
    set.add(g);
    return g;
  };
  const two = ["00", "01", "10", "11"].map((s, i) => mk(s, -1.05 + 0.7 * i, 1.75));
  const three = ["000", "001", "010", "011", "100", "101", "110", "111"].map((s, i) => mk(s, -1.05 + 0.7 * (i % 4), i < 4 ? 2.2 : 1.7));
  kit.ink(set);

  const twoQ = kit.beat("two_q");
  const dbl = kit.beat("double");
  const f53 = kit.beat("fifty_three");
  const pose = at(A, [0, 2.6, 7.4], [0, 1.4, 0]);
  const near = at(A, [0, 2.3, 6.4], [0, 1.5, 0]);
  const chipClose = at(A, [0, 2.7, 3.4], [0, 0.25, -0.5]);
  const camera = kit.camera(pose);

  kit.card({ title: "2 qubit → 4", body: "3 qubit → 8", at: twoQ, hold: Math.min(5.6, f53 - twoQ - 0.4), y: 420, width: 640 });
  kit.bigText({ text: "53 qubit ≈ 10 triệu tỉ", at: f53 - 0.8, hold: 2.2, y: 560 });

  return {
    scene: world.scene,
    camera,
    hero: [chip.group, ...two],
    update(t) {
      chip.update(t, { mode: t >= f53 - 0.3 ? "grid_53" : "overview" });
      // the four tiles show from two_q until double; the eight tiles from double until fifty_three
      two.forEach((g, i) => { kit.popIn(g, t, twoQ + 0.12 * i); if (t >= dbl - 0.1) g.visible = false; });
      three.forEach((g, i) => { kit.popIn(g, t, dbl + 0.08 * i); if (t >= f53 - 0.4) g.visible = false; });
      if (t < f53 - 0.6) kit.drift(camera, t, { from: pose, to: near, start: 0.5, dur: Math.max(2, f53 - 1.2) });
      else kit.fly(camera, t, { from: near, to: chipClose, start: f53 - 0.6, dur: 1.4, ease: "stop" });
    },
  };
}
