// qubit_intro (sentences 8-9): the qubit chip with its Bloch sphere above it (qubit: big text QUBIT), then three
// small examples of quantum systems pop in round the chip: a superconducting loop, a photon, a trapped ion (systems).
import { qubitChip } from "./qubit-chip/qubit-chip.js";
import { blochSphere } from "./bloch-sphere/bloch-sphere.js";
import { C, A, at, box, tile, quantumWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("quantum", quantumWorld);
  const set = new THREE.Group();
  set.position.set(...A);
  kit.group.add(set);

  const chip = qubitChip(kit, { mode: "overview" });
  set.add(chip.group);
  const sphere = blochSphere(kit, { radius: 0.6 });
  sphere.group.scale.setScalar(0.75);
  sphere.group.position.set(0, 0.3, -0.35);
  set.add(sphere.group);

  // three example systems on plinths
  const examples = [];
  const loop = new THREE.Group();
  box(kit, loop, [0.5, 0.1, 0.5], "#383E52", [0, 0.05, 0]);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 8, 24), kit.toon(C.sup));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.16;
  loop.add(ring);
  const photon = new THREE.Group();
  box(kit, photon, [0.5, 0.1, 0.5], "#383E52", [0, 0.05, 0]);
  const ph = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 10), kit.toon("#FCD53E", { emissive: "#FCD53E" }));
  ph.position.y = 0.42;
  photon.add(ph);
  const ion = new THREE.Group();
  box(kit, ion, [0.5, 0.1, 0.5], "#383E52", [0, 0.05, 0]);
  [-0.18, 0.18].forEach(x => box(kit, ion, [0.06, 0.6, 0.06], "#C8CCD4", [x, 0.4, 0]));
  const ionBall = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), kit.toon(C.sup));
  ionBall.position.y = 0.45;
  ion.add(ionBall);
  [[loop, -1.55, 1.0], [photon, 0, 1.55], [ion, 1.55, 1.0]].forEach(([g, x, z]) => { g.position.set(x, 0, z); set.add(g); examples.push(g); });
  const tags = ["SIÊU DẪN", "PHOTON", "ION"].map((s, i) => {
    const g = tile(kit, s, { w: 0.9, h: 0.26, d: 0.06, color: "#E6E6E1", fg: C.ink });
    g.position.set(examples[i].position.x, 0.12, examples[i].position.z + 0.42);
    g.rotation.x = -0.5;
    set.add(g);
    return g;
  });
  kit.ink(set);

  const qubit = kit.beat("qubit");
  const systems = kit.beat("systems");
  const pose = at(A, [0, 3.4, 7.2], [0, 1.0, 0]);
  const near = at(A, [0, 3.0, 6.4], [0, 1.0, 0]);
  const side = at(A, [1.6, 2.8, 6.4], [0, 0.8, 0.4]);
  const camera = kit.camera(pose);

  kit.bigText({ text: "Qubit", at: qubit, hold: 2.4, y: 600 });
  // a label, not a callout: the pill for this text is wider than the 768 px pill limit and the kit cuts it
  kit.label({ text: "Siêu dẫn · photon · ion", at: systems, hold: 2.2, y: 470 });

  return {
    scene: world.scene,
    camera,
    hero: [chip.group, sphere.group],
    update(t) {
      chip.update(t, { mode: "overview" });
      sphere.update(t, {});
      ph.position.y = 0.42 + 0.06 * Math.sin(t * 5);
      ionBall.position.y = 0.45 + 0.03 * Math.sin(t * 3);
      kit.popSeq(examples, t, systems - 0.6, { span: 0.9 });
      kit.popSeq(tags, t, systems - 0.4, { span: 0.9 });
      if (t < systems - 1) kit.drift(camera, t, { from: pose, to: near, start: 0.9, dur: 3.5 });
      else kit.drift(camera, t, { from: near, to: side, start: systems - 1, dur: 3 });
    },
  };
}
