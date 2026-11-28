import { sun } from "./sun/sun.js";
import { tokamakCutaway } from "./tokamak-cutaway/tokamak-cutaway.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const star = sun(kit);
  const reactor = tokamakCutaway(kit);
  star.group.position.x = -3;
  reactor.group.position.x = 3;
  kit.group.add(star.group, reactor.group);
  const earth = kit.beat("sentence13");
  const steps = kit.beat("sentence14");
  const from = { pos: [-3, 0, 10], look: [-3, 0, 0], fov: 40 };
  const to = { pos: [3, 3.8, 11.5], look: [3, 0, 0], fov: 40 };
  const camera = kit.camera(from);
  kit.label({ text: "Một con đường khác", at: earth, hold: 4, y: 420, size: 58 });
  kit.label({ text: "Bốn bước", at: steps, hold: 3.5, y: 530, size: 54 });
  return { scene, camera, hero: [star.group, reactor.group], update(t) {
    star.update(t);
    reactor.update(t);
    kit.fly(camera, t, { from, to, start: earth, dur: 2.5 });
  } };
}
