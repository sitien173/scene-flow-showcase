import { deuteriumNucleus } from "./deuterium-nucleus/deuterium-nucleus.js";
import { tritiumNucleus } from "./tritium-nucleus/tritium-nucleus.js";
import { sun } from "./sun/sun.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const d = deuteriumNucleus(kit), tr = tritiumNucleus(kit), star = sun(kit);
  d.group.position.x = -1.2; tr.group.position.x = 1.2;
  kit.group.add(d.group, tr.group, star.group);
  const emissions = kit.beat("sentence48"), reveal = kit.beat("sentence49");
  const camera = kit.camera({ pos: [0, 0, 16], look: [0, 0, 0], fov: 40 });
  kit.label({ text: "1 g D–T ≈ 9.000 lít dầu", at: kit.beat("sentence47"), hold: 5, y: 420, size: 45 });
  kit.label({ text: "Quá trình không thải CO₂", at: emissions, hold: 4, y: 510, size: 44 });
  return { scene, camera, hero: [d.group, tr.group, star.group], update(t) {
    d.update(t); tr.update(t); star.update(t);
    d.group.visible = t < reveal; tr.group.visible = t < reveal; star.group.visible = t >= reveal;
    kit.push(camera, t, { pos: [0, 0, 16], look: [0, 0, 0], amount: 1, dur: 10, fov: 40 });
  } };
}
