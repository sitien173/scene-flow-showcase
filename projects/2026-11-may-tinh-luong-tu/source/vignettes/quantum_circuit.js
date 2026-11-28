// quantum_circuit (sentences 31-33). Moves: three qubit lines stand over the chip and gate blocks pop onto them in
// order while a pulse runs along each line (circuit). Interacts: yellow links join the lines and the chip lights its
// entanglement bus. Result: the chip switches to interference waves that build up the answer (interfere).
import { qubitChip } from "./qubit-chip/qubit-chip.js";
import { C, A, at, box, tile, quantumWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("quantum", quantumWorld);
  const set = new THREE.Group();
  set.position.set(...A);
  kit.group.add(set);
  const chip = qubitChip(kit, { mode: "overview" });
  chip.group.position.set(0, 0, -0.4);
  set.add(chip.group);
  const ys = [2.35, 1.95, 1.55];
  const lines = ys.map(y => box(kit, set, [2.6, 0.04, 0.04], "#C8CCD4", [0, y, 0.5]));
  const gates = [];
  [["H", -0.8, 0], ["H", -0.8, 1], ["X", 0.0, 2], ["H", 0.8, 0], ["Z", 0.8, 2]].forEach(([s, x, r]) => {
    const g = tile(kit, s, { w: 0.3, h: 0.3, d: 0.12, color: C.sup });
    g.position.set(x, ys[r], 0.5);
    set.add(g);
    gates.push(g);
  });
  const links = [[-0.4, 0, 1], [0.4, 1, 2]].map(([x, a, b]) => {
    const m = box(kit, set, [0.05, ys[a] - ys[b], 0.05], C.ent, [x, (ys[a] + ys[b]) / 2, 0.5]);
    m.userData.baseScale = 1;
    return m;
  });
  const pulses = ys.map(y => {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), kit.toon(C.sup, { emissive: C.sup }));
    p.position.set(-1.3, y, 0.5);
    set.add(p);
    return p;
  });
  kit.ink(set);

  const notAll = kit.beat("not_all");
  const circ = kit.beat("circuit");
  const inter = kit.beat("interfere");
  const pose = at(A, [0, 2.4, 7.0], [0, 1.4, 0]);
  const near = at(A, [0, 2.2, 5.6], [0, 1.2, 0]);
  const camera = kit.camera(pose);

  kit.card({ title: "Theo IBM", body: "Không thử mọi đáp án cùng lúc", at: notAll, hold: Math.min(3.0, circ - notAll - 0.2), y: 420, width: 700 });
  // a label, not a callout: the pill for this text is wider than the 768 px pill limit and the kit cuts it
  kit.label({ text: "Mạch lượng tử → giao thoa", at: inter - 1.2, hold: 2.1, y: 470 });

  return {
    scene: world.scene,
    camera,
    hero: [chip.group, ...gates],
    update(t) {
      const mode = t >= inter - 0.3 ? "interference" : t >= circ + 1 ? "entangle_circuit" : "overview";
      chip.update(t, { mode, showWaves: t >= inter - 0.3 });
      kit.popSeq(gates, t, circ - 0.3, { span: 1.0 });
      kit.popSeq(links, t, circ + 0.9, { span: 0.4 });
      pulses.forEach((p, i) => {
        const u = kit.progress(t, circ + 0.2 * i, 2.2);
        p.visible = u > 0 && u < 1;
        p.position.x = kit.lerp(-1.3, 1.3, u);
      });
      kit.drift(camera, t, { from: pose, to: near, start: inter - 0.6, dur: 2.2 });
    },
  };
}
