import { deuteriumNucleus } from "./deuterium-nucleus/deuterium-nucleus.js";
import { tritiumNucleus } from "./tritium-nucleus/tritium-nucleus.js";

export async function build(kit) {
  const scene = kit.stage({ ground: false, surroundings: false });
  const d = deuteriumNucleus(kit), tr = tritiumNucleus(kit);
  kit.group.add(d.group, tr.group);
  const repel = kit.beat("sentence22"), speed = kit.beat("sentence23");
  const pose = { pos: [0, 0, 11], look: [0, 0, 0], fov: 40 };
  const camera = kit.camera(pose);
  kit.label({ text: "Vượt lực đẩy", at: kit.beat("sentence21"), hold: 4, y: 420, size: 58 });
  kit.label({ text: "Chuyển động nhanh hơn", at: speed, hold: 3, y: 760, size: 46 });
  kit.group.scale.setScalar(0.55);   // keeps every subject inside the 9:16 safe zone through the push
  return { scene, camera, hero: [d.group, tr.group], update(t) {
    const approach = kit.progress(t, 0, Math.max(0.1, repel));
    const recoil = kit.progress(t, repel, 1.3);
    const separation = 1.8 - approach * 0.8 + recoil * 0.8;
    d.group.position.x = -separation;
    tr.group.position.x = separation;
    d.update(t); tr.update(t);
    kit.push(camera, t, { ...pose, amount: 1.3, dur: 9 });
  } };
}
