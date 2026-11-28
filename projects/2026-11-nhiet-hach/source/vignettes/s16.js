import { deuteriumNucleus } from "./deuterium-nucleus/deuterium-nucleus.js";
import { tritiumNucleus } from "./tritium-nucleus/tritium-nucleus.js";

export async function build(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ ground: false, surroundings: false });
  const d = deuteriumNucleus(kit), tr = tritiumNucleus(kit);
  d.group.scale.setScalar(0.3); tr.group.scale.setScalar(0.3);
  d.group.position.x = -0.2; tr.group.position.x = 0.2;
  kit.group.add(d.group, tr.group);
  const chamber = new THREE.Mesh(new THREE.TorusGeometry(1, 0.07, 8, 48), kit.toon("#9EA7B5"));
  kit.group.add(chamber);
  const beams = [];
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    const ray = kit.beads([[Math.cos(a) * 2.5, Math.sin(a) * 2.5, 0], [Math.cos(a) * 1.1, Math.sin(a) * 1.1, 0]], { color: "#FCD53E", glow: "#FCD53E", spacing: 0.5 });
    kit.group.add(ray.group); beams.push(ray);
  }
  const laser = kit.beat("sentence43");
  const camera = kit.camera({ pos: [0, 0, 12], look: [0, 0, 0], fov: 40 });
  kit.label({ text: "Tối đa 192 chùm laser", at: laser, hold: 4, y: 420, size: 48 });
  kit.group.scale.setScalar(0.75);   // keeps every subject inside the 9:16 safe zone through the push
  return { scene, camera, hero: chamber, update(t) {
    d.update(t); tr.update(t); beams.forEach(b => b.update(t - laser));
    kit.push(camera, t, { pos: [0, 0, 12], look: [0, 0, 0], amount: 2, dur: 8, fov: 40 });
  } };
}
