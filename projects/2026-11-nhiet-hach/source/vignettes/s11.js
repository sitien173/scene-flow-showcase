import { tokamakCutaway } from "./tokamak-cutaway/tokamak-cutaway.js";
import { copperCoil } from "./copper-coil/copper-coil.js";
import { fieldLines } from "./field-lines/field-lines.js";
import { chargeParticle } from "./charge-particle/charge-particle.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const particleKit = { ...kit, toon: (color, ...args) => kit.toon(color === "#00B4D8" ? "#3562B3" : color, ...args) };
  const reactor = tokamakCutaway(kit), coil = copperCoil(kit, { variant: "solenoid", outerRadius: 0.5 });
  const field = fieldLines(kit, { color: "#19C6D7", baseRadius: 0.5 });
  const electron = chargeParticle(particleKit);
  electron.group.children.forEach(c => { c.visible = c.name === "electron"; });
  coil.group.position.x = -1.7; field.group.position.x = -1.7;
  electron.group.scale.setScalar(0.6);
  kit.group.add(reactor.group, coil.group, field.group, electron.group);
  const magnetic = kit.beat("sentence29");
  const camera = kit.camera({ pos: [0, 5, 18], look: [0, 0, 0], fov: 40 });
  kit.label({ text: "Từ trường giữ plasma", at: magnetic, hold: 4, y: 420, size: 49 });
  return { scene, camera, hero: reactor.group, update(t) {
    reactor.update(t); coil.update(t); field.update(t, { oscillate: false }); electron.update(t);
    field.group.visible = t >= magnetic;
    electron.group.position.set(Math.cos(t) * 1.1, 0.3, Math.sin(t) * 1.1);
    kit.push(camera, t, { pos: [0, 5, 18], look: [0, 0, 0], amount: 1, dur: 11, fov: 40 });
  } };
}
