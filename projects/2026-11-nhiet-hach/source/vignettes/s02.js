import { sun } from "./sun/sun.js";
import { tokamakCutaway } from "./tokamak-cutaway/tokamak-cutaway.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const star = sun(kit);
  const reactor = tokamakCutaway(kit);
  star.group.position.x = -3;
  reactor.group.position.x = 3;
  kit.group.add(star.group, reactor.group);
  const reveal = kit.beat("sentence4");
  const from = { pos: [-3, 1, 11], look: [-3, 0, 0], fov: 40 };
  const to = { pos: [3, 4.2, 11.5], look: [3, 0, 0], fov: 40 };
  const camera = kit.camera(from);
  kit.label({ text: "Bên trong cỗ máy", at: reveal, hold: 3, y: 420, size: 60 });
  return { scene, camera, hero: [star.group, reactor.group], update(t) {
    star.update(t);
    reactor.update(t);
    kit.fly(camera, t, { from, to, start: reveal, dur: 2.5 });
  } };
}
