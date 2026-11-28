import { tokamakCutaway } from "./tokamak-cutaway/tokamak-cutaway.js";
import { fieldLines } from "./field-lines/field-lines.js";
import { chargeParticle } from "./charge-particle/charge-particle.js";
import { neutron } from "./neutron/neutron.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const particleKit = { ...kit, toon: (color, ...args) => kit.toon(color === "#00B4D8" ? "#3562B3" : color, ...args) };
  const reactor = tokamakCutaway(kit), field = fieldLines(kit, { color: "#19C6D7", baseRadius: 0.5 });
  const helium = chargeParticle(particleKit), n = neutron(kit);
  helium.group.children.forEach(c => { c.visible = c.name === "hole"; });
  helium.group.scale.setScalar(0.55); n.group.scale.setScalar(0.55);
  kit.group.add(reactor.group, field.group, helium.group, n.group);
  const escape = kit.beat("sentence36"), wall = kit.beat("sentence37"), future = kit.beat("sentence38");
  const camera = kit.camera({ pos: [0, 4, 12], look: [0, 0, 0], fov: 40 });
  kit.label({ text: "Helium giữ nhiệt plasma", at: kit.beat("sentence35"), hold: 4, y: 420, size: 44 });
  kit.label({ text: "Neutron → thành lò → nhiệt", at: wall, hold: 4, y: 420, size: 42 });
  kit.label({ text: "Tương lai: hơi → tua bin → điện", at: future, hold: 4, y: 510, size: 39 });
  kit.group.scale.setScalar(0.7);   // keeps every subject inside the 9:16 safe zone through the push
  return { scene, camera, hero: reactor.group, update(t) {
    reactor.update(t); field.update(t, { oscillate: false }); helium.update(t); n.update(t);
    helium.group.position.set(Math.cos(t) * 1.1 - 0.55, 0.3, Math.sin(t) * 1.1);
    n.group.visible = t >= escape;
    n.group.position.set(kit.progress(t, escape, Math.max(0.5, wall - escape)) * 2, 0.4, 0);
    kit.push(camera, t, { pos: [0, 4, 12], look: [0, 0, 0], amount: 1.5, dur: 16, fov: 40 });
  } };
}
