import { tokamakCutaway } from "./tokamak-cutaway/tokamak-cutaway.js";
import { copperCoil } from "./copper-coil/copper-coil.js";
import { fieldLines } from "./field-lines/field-lines.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const reactor = tokamakCutaway(kit);
  const coil = copperCoil(kit, { variant: "solenoid", outerRadius: 0.5, length: 0.8 });
  const field = fieldLines(kit, { color: "#19C6D7", baseRadius: 0.5 });
  coil.group.position.set(-1.8, -0.4, 0); field.group.position.copy(coil.group.position);
  reactor.group.position.x = 0.45;
  kit.group.add(reactor.group, coil.group, field.group);
  const camera = kit.camera({ pos: [0, 4, 12], look: [0, 0, 0], fov: 40 });
  kit.label({ text: "ITER · 35 quốc gia", at: kit.beat("sentence39"), hold: 4, y: 420, size: 52 });
  kit.label({ text: "500 MW nhiệt hạch", at: kit.beat("sentence40"), hold: 4, y: 420, size: 51 });
  kit.label({ text: "Không phát điện", at: kit.beat("sentence41"), hold: 4, y: 510, size: 50 });
  kit.group.scale.setScalar(0.7);   // keeps every subject inside the 9:16 safe zone through the push
  return { scene, camera, hero: reactor.group, update(t) {
    reactor.update(t); coil.update(t); field.update(t, { oscillate: false });
    kit.orbit(camera, t, { center: [0, 0, 0], radius: 12, height: 4, speed: 0.025, fov: 40 });
  } };
}
