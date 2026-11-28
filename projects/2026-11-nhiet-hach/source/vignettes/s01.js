import { sun } from "./sun/sun.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const star = sun(kit);
  kit.group.add(star.group);
  const rays = [];
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    const ray = kit.beads([[0, 0, 0.8], [Math.cos(a) * 2, Math.sin(a) * 2, 0.8]],
      { color: "#FCD53E", glow: "#FCD53E", speed: 0.7, spacing: 0.6 });
    kit.group.add(ray.group);
    rays.push(ray);
  }
  const pose = { pos: [0, 0, 10], look: [0, 0, 0], fov: 40 };
  const camera = kit.camera(pose);
  kit.label({ text: "Tái tạo Mặt Trời?", at: kit.beat("sentence1"), hold: 3.4, y: 420, size: 60 });
  kit.group.scale.setScalar(0.65);   // keeps every subject inside the 9:16 safe zone through the push
  return {
    scene, camera, hero: star.group,
    update(t) {
      star.update(t);
      rays.forEach(ray => ray.update(t));
      kit.push(camera, t, { ...pose, amount: 1.8, dur: 8 });
    },
  };
}
