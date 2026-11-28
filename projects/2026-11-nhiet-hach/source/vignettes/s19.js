import { sun } from "./sun/sun.js";
import { tokamakCutaway } from "./tokamak-cutaway/tokamak-cutaway.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const star = sun(kit), reactor = tokamakCutaway(kit);
  star.group.position.set(-1.6, 0, 0); reactor.group.position.set(1.6, 0, 0);
  star.group.scale.setScalar(0.72); reactor.group.scale.setScalar(0.72);
  kit.group.add(star.group, reactor.group);
  const pose = { pos: [0, 3, 12], look: [0, 0, 0], fov: 40 };
  const camera = kit.camera(pose);
  kit.label({ text: "Nóng gấp khoảng 10 lần", at: kit.beat("sentence50"), hold: 5, y: 420, size: 49 });
  kit.label({ text: "Lõi Mặt Trời", at: kit.beat("sentence51"), hold: 3, x: 330, y: 1180, size: 42 });
  kit.label({ text: "Plasma", at: kit.beat("sentence51"), hold: 3, x: 690, y: 1180, size: 42 });
  kit.group.scale.setScalar(0.55);   // keeps every subject inside the 9:16 safe zone through the push
  return { scene, camera, hero: [star.group, reactor.group], update(t) {
    star.update(t); reactor.update(t);
    kit.push(camera, t, { ...pose, amount: 1.2, dur: 7 });
  } };
}
