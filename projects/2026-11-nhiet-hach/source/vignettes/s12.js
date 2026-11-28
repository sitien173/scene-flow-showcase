import { deuteriumNucleus } from "./deuterium-nucleus/deuterium-nucleus.js";
import { tritiumNucleus } from "./tritium-nucleus/tritium-nucleus.js";
import { neutron } from "./neutron/neutron.js";
import { chargeParticle } from "./charge-particle/charge-particle.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const particleKit = { ...kit, toon: (color, ...args) => kit.toon(color === "#00B4D8" ? "#3562B3" : color, ...args) };
  const d = deuteriumNucleus(kit), tr = tritiumNucleus(kit), n = neutron(kit), helium = chargeParticle(particleKit);
  helium.group.children.forEach(c => { c.visible = c.name === "hole"; });
  helium.group.position.x = -1;
  kit.group.add(d.group, tr.group, n.group, helium.group);
  const collide = kit.beat("sentence31"), result = kit.beat("sentence32");
  const energy = kit.beads([[0, 0, 0], [2, 1.4, 0]], { color: "#FCD53E", glow: "#FCD53E" });
  kit.group.add(energy.group);
  const camera = kit.camera({ pos: [0, 0, 11], look: [0, 0, 0], fov: 40 });
  kit.label({ text: "Nóng · đặc · đủ lâu", at: kit.beat("sentence30"), hold: 4, y: 420, size: 50 });
  kit.label({ text: "D + T → helium + neutron", at: result, hold: 4, y: 420, size: 42 });
  kit.group.scale.setScalar(0.6);   // keeps every subject inside the 9:16 safe zone through the push
  return { scene, camera, hero: [d.group, tr.group, n.group], update(t) {
    d.update(t); tr.update(t); n.update(t); helium.update(t);
    const q = kit.progress(t, collide, Math.max(0.1, result - collide));
    d.group.position.x = -1.5 * (1 - q); tr.group.position.x = 1.5 * (1 - q);
    d.group.visible = t < result; tr.group.visible = t < result;
    helium.group.visible = t >= result; n.group.visible = t >= result;
    n.group.position.set(kit.progress(t, result, 2) * 2, 0.5, 0);
    energy.update(t - result);
    kit.push(camera, t, { pos: [0, 0, 11], look: [0, 0, 0], amount: 1.4, dur: 12, fov: 40 });
  } };
}
