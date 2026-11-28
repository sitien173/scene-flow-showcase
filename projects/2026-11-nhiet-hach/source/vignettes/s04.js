import { chargeParticle } from "./charge-particle/charge-particle.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const particleKit = { ...kit, toon: (color, ...args) => kit.toon(color === "#00B4D8" ? "#3562B3" : color, ...args) };
  const particles = Array.from({ length: 4 }, () => chargeParticle(particleKit));
  particles.forEach(p => {
    p.group.children.forEach(child => { child.visible = child.name === "hole"; });
    kit.group.add(p.group);
  });
  const split = kit.beat("sentence9");
  const energy = kit.beads([[0, 0, 0], [0, 1.5, 0]], { color: "#FCD53E", glow: "#FCD53E", spacing: 0.4 });
  kit.group.add(energy.group);
  const camera = kit.camera({ pos: [0, 0, 10], look: [0, 0, 0], fov: 40 });
  kit.label({ text: "Hợp ≠ tách", at: kit.beat("sentence8"), hold: 6, y: 420, size: 60 });
  return { scene, camera, hero: particles.map(p => p.group), update(t) {
    const phase = kit.progress(t, 0, Math.max(split, 0.1));
    const apart = kit.progress(t, split, 2);
    particles.forEach(p => p.update(t));
    particles[0].group.position.set(-1.5 + phase, 0, 0);
    particles[1].group.position.set(0.5 - phase, 0, 0);
    particles[2].group.position.set(-0.5 - apart, -1, 0);
    particles[3].group.position.set(-0.5 + apart, -1, 0);
    particles[0].group.visible = t < split; particles[1].group.visible = t < split;
    particles[2].group.visible = t >= split; particles[3].group.visible = t >= split;
    energy.update(t);
    kit.push(camera, t, { pos: [0, 0, 10], look: [0, 0, 0], amount: 1, dur: 8, fov: 40 });
  } };
}
