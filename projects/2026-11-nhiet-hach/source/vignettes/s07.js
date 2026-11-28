import { deuteriumNucleus } from "./deuterium-nucleus/deuterium-nucleus.js";
import { tritiumNucleus } from "./tritium-nucleus/tritium-nucleus.js";
import { neutron } from "./neutron/neutron.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const d = deuteriumNucleus(kit), tr = tritiumNucleus(kit), n = neutron(kit);
  d.group.position.x = -1.35;
  tr.group.position.x = 1.35;
  n.group.position.set(0, -1.2, 0);
  n.group.scale.setScalar(0.45);
  kit.group.add(d.group, tr.group, n.group);
  const detail = kit.beat("sentence17");
  const camera = kit.camera({ pos: [0, 0, 11], look: [0, 0, 0], fov: 40 });
  kit.label({ text: "Deuterium + Tritium", at: kit.beat("sentence16"), hold: 4, y: 420, size: 52 });
  kit.label({ text: "1 neutron", at: detail, hold: 4, x: 340, y: 740, size: 44 });
  kit.label({ text: "2 neutron", at: detail, hold: 4, x: 740, y: 740, size: 44 });
  kit.group.scale.setScalar(0.65);   // keeps every subject inside the 9:16 safe zone through the push
  return { scene, camera, hero: [d.group, tr.group], update(t) {
    d.update(t); tr.update(t); n.update(t);
    n.group.visible = t >= detail;
    kit.orbit(camera, t, { center: [0, 0, 0], radius: 11, height: 0.6, speed: 0.025, fov: 40 });
  } };
}
