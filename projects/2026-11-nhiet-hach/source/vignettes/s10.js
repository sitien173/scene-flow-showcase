import { chargeParticle } from "./charge-particle/charge-particle.js";
import { deuteriumNucleus } from "./deuterium-nucleus/deuterium-nucleus.js";
import { tritiumNucleus } from "./tritium-nucleus/tritium-nucleus.js";

export async function build(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ ground: false, surroundings: false });
  const particleKit = { ...kit, toon: (color, ...args) => kit.toon(color === "#00B4D8" ? "#3562B3" : color, ...args) };
  const electron = chargeParticle(particleKit);
  electron.group.children.forEach(c => { c.visible = c.name === "electron"; });
  const d = deuteriumNucleus(kit), tr = tritiumNucleus(kit);
  const plasma = new THREE.Mesh(new THREE.SphereGeometry(2.1, 24, 16), new THREE.MeshBasicMaterial({ color: "#E63D32", transparent: true, opacity: 0.15, depthWrite: false }));
  kit.group.add(plasma, d.group, tr.group, electron.group);
  const ionize = kit.beat("sentence25"), hot = kit.beat("sentence26");
  const camera = kit.camera({ pos: [0, 0, 11], look: [0, 0, 0], fov: 40 });
  kit.label({ text: "Khí → plasma", at: ionize, hold: 3, y: 420, size: 54 });
  kit.label({ text: "150 triệu °C", at: hot, hold: 4, y: 420, size: 58 });
  kit.group.scale.setScalar(0.6);   // keeps every subject inside the 9:16 safe zone through the push
  return { scene, camera, hero: [d.group, tr.group], update(t) {
    d.update(t); tr.update(t); electron.update(t);
    const q = kit.progress(t, ionize, 2);
    d.group.position.set(-1 + 0.25 * Math.sin(t * 2), 0, 0);
    tr.group.position.set(1 + 0.25 * Math.sin(t * 2 + 2), 0, 0);
    electron.group.position.set(q * 2, q, 0);
    plasma.visible = t >= ionize;
    kit.push(camera, t, { pos: [0, 0, 11], look: [0, 0, 0], amount: 1.5, dur: 10, fov: 40 });
  } };
}
