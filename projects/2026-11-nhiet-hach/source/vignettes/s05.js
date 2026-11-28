import { sun } from "./sun/sun.js";
import { chargeParticle } from "./charge-particle/charge-particle.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const star = sun(kit);
  const particleKit = { ...kit, toon: (color, ...args) => kit.toon(color === "#00B4D8" ? "#3562B3" : color, ...args) };
  const particles = [chargeParticle(particleKit), chargeParticle(particleKit)];
  particles.forEach(p => { p.group.children.forEach(child => { child.visible = child.name === "hole"; }); kit.group.add(p.group); });
  kit.group.add(star.group);
  const collision = kit.beat("sentence11");
  const energy = kit.beads([[0, 0, 1], [1.5, 1.5, 1]], { color: "#FCD53E", glow: "#FCD53E" });
  kit.group.add(energy.group);
  const camera = kit.camera({ pos: [0, 0, 10], look: [0, 0, 0], fov: 40 });
  kit.label({ text: "15 triệu °C", at: kit.beat("sentence10"), hold: 4, y: 420, size: 60 });
  kit.group.scale.setScalar(0.65);   // keeps every subject inside the 9:16 safe zone through the push
  return { scene, camera, hero: star.group, update(t) {
    const merge = kit.progress(t, collision, 2);
    star.update(t, { coreOnly: t >= collision });
    particles.forEach(p => { p.update(t); p.group.visible = t >= collision; });
    particles[0].group.position.x = -2 + merge;
    particles[1].group.position.x = -merge;
    energy.group.visible = t >= collision;
    energy.update(t - collision);
    kit.push(camera, t, { pos: [0, 0, 10], look: [0, 0, 0], amount: 2, dur: 8, fov: 40 });
  } };
}
