import { tokamakCutaway } from "./tokamak-cutaway/tokamak-cutaway.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const reactor = tokamakCutaway(kit);
  kit.group.add(reactor.group);
  const pose = { pos: [0, 3, 8], look: [0, 0, 0], fov: 40 };
  const camera = kit.camera(pose);
  kit.label({ text: "Điện nhiệt hạch còn ở phía trước", at: kit.beat("sentence52"), hold: 4, y: 520, size: 38 });
  kit.label({ text: "DEMO: kỳ vọng đến 2040", at: kit.beat("sentence53"), hold: 4, y: 510, size: 46 });
  kit.label({ text: "Điện: nửa sau thế kỷ", at: kit.beat("sentence54"), hold: 4, y: 510, size: 46 });
  kit.group.scale.setScalar(0.55);   // keeps every subject inside the 9:16 safe zone through the push
  return { scene, camera, hero: reactor.group, update(t) {
    reactor.update(t);
    kit.push(camera, t, { ...pose, amount: -3, dur: 13 });
  } };
}
