// entanglement (sentences 27-30). Moves: a yellow link joins two Bloch spheres A and B (entangle). Interacts: a probe
// measures A, it turns green on one pole, and B snaps to the matching pole a moment later (correlate, instant).
// Result: an arrow labelled ">c" from A to B is crossed out: no message travels faster than light (no_ftl).
import { blochSphere } from "./bloch-sphere/bloch-sphere.js";
import { C, B, at, arrow, tile, quantumWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("quantum", quantumWorld);
  const set = new THREE.Group();
  set.position.set(...B);
  kit.group.add(set);
  const pair = [-1.0, 1.0].map(x => {
    const s = blochSphere(kit, { radius: 0.9 });
    s.group.scale.setScalar(0.6);
    s.group.position.set(x, 0, 0);
    set.add(s.group);
    return s;
  });
  // the entanglement link between the two sphere centres, and a pulse that runs along it
  const cy = 0.6 * 1.54 * 0.9;
  const link = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.0, 10), kit.toon(C.ent, { emissive: C.ent }));
  link.rotation.z = Math.PI / 2;
  link.position.set(0, cy, 0);
  link.userData.baseScale = 1;
  set.add(link);
  const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), kit.toon(C.ent, { emissive: C.ent }));
  set.add(pulse);
  // the faster-than-light message arrow over the pair
  const msg = new THREE.Group();
  msg.position.set(-0.9, 2.15, 0);
  arrow(kit, msg, 1.8, "#E6E6E1", 0.07);
  const ctag = tile(kit, ">c", { w: 0.44, h: 0.3, d: 0.06, color: "#E6E6E1", fg: C.ink });
  ctag.position.set(0.9, 0.3, 0);
  msg.add(ctag);
  msg.userData.baseScale = 1;
  set.add(msg);
  kit.ink(set);

  const ent = kit.beat("entangle");
  const corr = kit.beat("correlate");
  const inst = kit.beat("instant");
  const noFtl = kit.beat("no_ftl");
  const left = at(B, [-0.5, 2.7, 9.2], [-0.15, 1.15, 0]);
  const right = at(B, [0.5, 2.7, 9.2], [0.15, 1.15, 0]);
  const camera = kit.camera(left);

  // a label, not a callout: the pill for this text is wider than the 768 px pill limit and the kit cuts it
  kit.label({ text: "Vướng víu lượng tử", at: ent, hold: Math.min(3.2, corr - ent - 0.3), y: 470 });
  kit.label({ text: "Tương quan chặt chẽ", at: corr, hold: Math.min(3.2, noFtl - corr - 0.4), y: 470 });
  kit.mark({ kind: "x", anchor: ctag, at: noFtl, hold: 2.0, size: 150 });
  kit.label({ text: "Không nhanh hơn ánh sáng", at: noFtl - 1.3, hold: 2.1, y: 470 });

  return {
    scene: world.scene,
    camera,
    hero: [pair[0].group, pair[1].group, link],
    update(t) {
      kit.popIn(link, t, ent - 0.1);
      // A is measured from correlate, B follows on the instant beat; both land on pole 0
      const cA = kit.clamp01((t - (corr - 0.6)) / 1.2);
      const cB = t < inst - 0.5 ? 0 : 0.55 + 0.45 * kit.clamp01((t - (inst - 0.5)) / 0.4);
      pair[0].update(t, cA > 0 ? { mode: "collapse_result", collapse: cA, target: 0 } : { mode: "entangled_pair", phaseOffset: 0, entangled: t >= ent });
      pair[1].update(t, cB > 0 ? { mode: "collapse_result", collapse: cB, target: 0 } : { mode: "entangled_pair", phaseOffset: Math.PI, entangled: t >= ent });
      const run = kit.progress(t, inst - 0.6, 0.3);
      pulse.visible = run > 0 && run < 1;
      pulse.position.set(kit.lerp(-1.0, 1.0, run), cy, 0);
      kit.popIn(msg, t, noFtl - 0.5);
      kit.drift(camera, t, { from: left, to: right, start: 0.3, dur: Math.max(4, noFtl + 1) });
    },
  };
}
