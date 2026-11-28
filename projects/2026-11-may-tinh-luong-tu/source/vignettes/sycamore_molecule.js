// sycamore_molecule (sentences 46-48). Moves: a molecule spins on the left while a blue supercomputer's progress bar
// crawls and stalls (molecule). Interacts: the Sycamore chip runs the same kind of task (sycamore). Result: the
// chip's bar fills in about 200 seconds while the classical bar is still near empty (ten_k). The camera ends on a
// fixed pose that nisq_limits starts from.
import { qubitChip } from "./qubit-chip/qubit-chip.js";
import { C, A, at, box, appsWorld, SYC_END, syc } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("apps", appsWorld);
  const set = new THREE.Group();
  set.position.set(...A);
  kit.group.add(set);
  const mol = new THREE.Group();
  mol.position.set(-1.2, 1.5, 0);
  [[0, 0, 0, "#DD3428"], [0.32, 0.2, 0, "#E6E6E1"], [-0.32, 0.2, 0, "#E6E6E1"], [0, -0.35, 0.1, "#5B7DB1"], [0.2, -0.55, -0.2, "#E6E6E1"]].forEach(([x, y, z, c]) => {
    const a = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), kit.toon(c));
    a.position.set(x, y, z);
    mol.add(a);
  });
  set.add(mol);
  // classical supercomputer rack with a progress bar
  box(kit, set, [0.7, 1.0, 0.5], C.bit, [-1.2, 0.5, 0.2]);
  const cBar = box(kit, set, [1, 0.12, 0.04], "#E6E6E1", [-1.2, 0.75, 0.47]);
  const chip = qubitChip(kit, { mode: "grid_53" });
  chip.group.scale.setScalar(syc.chipScale);
  chip.group.position.set(...syc.chipPos);
  set.add(chip.group);
  const qBar = box(kit, set, [1, 0.12, 0.04], C.res, [0.9, 1.25, 0.6]);
  kit.ink(set);

  const molB = kit.beat("molecule");
  const sycB = kit.beat("sycamore");
  const tenK = kit.beat("ten_k");
  const start = at(A, [-0.1, 2.6, 9.6], [-0.1, 1.0, 0]);
  const camera = kit.camera(start);

  // a label, not a callout: at 62 px the pill for this text is wider than the 768 px pill limit and the kit cuts it
  kit.label({ text: "Mô phỏng phân tử", at: molB, hold: Math.min(3.0, sycB - molB - 0.4), y: 470 });
  kit.card({ title: "Sycamore (2019) · 53 qubit", body: "~200 giây", at: sycB, hold: Math.min(4.0, tenK - sycB - 0.4), anchor: chip.anchors.die, y: 420, width: 640 });
  kit.label({ text: "Ước tính Google khi đó: ~10.000 năm", at: tenK - 2.2, hold: 3.1, y: 470 });

  return {
    scene: world.scene,
    camera,
    hero: [mol, chip.group],
    update(t) {
      mol.rotation.y = t * 0.6;
      chip.update(t, { mode: "grid_53" });
      // the classical bar crawls to 6 % and stalls; the quantum bar fills from sycamore within 2.5 s
      const cw = 0.02 + 0.06 * kit.ease(kit.progress(t, molB, 4), "out");
      cBar.scale.x = cw;
      cBar.position.x = -1.7 + 0.5 * cw;
      const qw = 0.02 + 0.98 * kit.progress(t, sycB, 2.5);
      qBar.visible = t >= sycB - 0.2;
      qBar.scale.x = qw;
      qBar.position.x = 0.4 + 0.5 * qw;
      kit.drift(camera, t, { from: start, to: SYC_END, start: 0.5, dur: Math.max(4, tenK - 1) });
    },
  };
}
