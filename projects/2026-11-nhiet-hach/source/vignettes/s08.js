import { deuteriumNucleus } from "./deuterium-nucleus/deuterium-nucleus.js";
import { tritiumNucleus } from "./tritium-nucleus/tritium-nucleus.js";
import { neutron } from "./neutron/neutron.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const d = deuteriumNucleus(kit), tr = tritiumNucleus(kit), n = neutron(kit);
  d.group.position.x = -1.5; tr.group.position.x = 1.5;
  n.group.position.set(0, -1.25, 0); n.group.scale.setScalar(0.5);
  kit.group.add(d.group, tr.group, n.group);
  const lithium = kit.beat("sentence19"), pair = kit.beat("sentence20");
  const pose = { pos: [0, 0, 12], look: [0, 0, 0], fov: 40 };
  const camera = kit.camera(pose);
  kit.label({ text: "Deuterium: nước biển", at: kit.beat("sentence18"), hold: 4, y: 420, size: 49 });
  kit.label({ text: "Lithium + neutron → tritium", at: lithium, hold: 4, y: 510, size: 42 });
  kit.label({ text: "Nhiên liệu D–T", at: pair, hold: 3, y: 420, size: 54 });
  kit.group.scale.setScalar(0.6);   // keeps every subject inside the 9:16 safe zone through the push
  return { scene, camera, hero: [d.group, tr.group, n.group], update(t) {
    d.update(t); tr.update(t); n.update(t);
    n.group.visible = t >= lithium;
    kit.push(camera, t, { ...pose, amount: 1.2, dur: 11 });
  } };
}
