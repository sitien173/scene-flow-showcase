import { deuteriumNucleus } from "./deuterium-nucleus/deuterium-nucleus.js";
import { tritiumNucleus } from "./tritium-nucleus/tritium-nucleus.js";

export async function build(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ ground: false, surroundings: false });
  const d = deuteriumNucleus(kit), tr = tritiumNucleus(kit);
  d.group.position.set(-1.2, -1.5, 0); tr.group.position.set(1.2, -1.5, 0);
  d.group.scale.setScalar(0.35); tr.group.scale.setScalar(0.35);
  kit.group.add(d.group, tr.group);
  const bars = [2.05, 3.15, 8.6].map((value, i) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1, 0.1), kit.toon(i === 0 ? "#3562B3" : "#FCD53E"));
    mesh.position.x = (i - 1) * 1.15; kit.group.add(mesh); return { mesh, value };
  });
  const result = kit.beat("sentence45"), later = kit.beat("sentence46");
  const camera = kit.camera({ pos: [0, 0, 11], look: [0, 0, 0], fov: 40 });
  kit.label({ text: "2,05 MJ → 3,15 MJ", at: result, hold: 5, y: 420, size: 50 });
  kit.label({ text: "2025: khoảng 8,6 MJ", at: later, hold: 4, y: 510, size: 46 });
  return { scene, camera, hero: bars.map(b => b.mesh), update(t) {
    d.update(t); tr.update(t);
    bars.forEach(({ mesh, value }, i) => {
      const h = Math.max(0.001, value / 4 * kit.progress(t, i === 2 ? later : result, 1.2));
      mesh.scale.y = h; mesh.position.y = -0.8 + h / 2;
    });
    kit.push(camera, t, { pos: [0, 0, 11], look: [0, 0, 0], amount: 1, dur: 12, fov: 40 });
  } };
}
