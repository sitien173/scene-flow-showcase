import { chargeParticle } from "./charge-particle/charge-particle.js";
import { deuteriumNucleus } from "./deuterium-nucleus/deuterium-nucleus.js";
import { tritiumNucleus } from "./tritium-nucleus/tritium-nucleus.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const particleKit = { ...kit, toon: (color, ...args) => kit.toon(color === "#00B4D8" ? "#3562B3" : color, ...args) };
  const electron = chargeParticle(particleKit);
  electron.group.children.forEach(child => { child.visible = child.name === "electron"; });
  const d = deuteriumNucleus(kit), tr = tritiumNucleus(kit);
  kit.group.add(electron.group, d.group, tr.group);
  const atom = kit.beat("sentence6"), fusion = kit.beat("sentence7");
  const camera = kit.camera({ pos: [0, 0, 16], look: [0, 0, 0], fov: 40 });
  kit.label({ text: "Hạt nhân và electron", at: atom, hold: 4, y: 420, size: 48 });
  kit.label({ text: "Nhiệt hạch", at: fusion, hold: 4, y: 420, size: 60 });
  return { scene, camera, hero: [d.group, tr.group], update(t) {
    d.update(t); tr.update(t); electron.update(t);
    const merge = kit.progress(t, fusion, 2.2);
    d.group.position.x = -1.35 * (1 - merge);
    tr.group.position.x = 1.35 * (1 - merge);
    electron.group.visible = t >= atom && t < fusion;
    electron.group.rotation.z = t * 1.1;
    kit.push(camera, t, { pos: [0, 0, 16], look: [0, 0, 0], amount: 1, dur: 10, fov: 40 });
  } };
}
