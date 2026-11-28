// measurement_collapse (sentences 19-21). Moves: a probe ring descends over the Bloch sphere (rule).
// Interacts: the ring meets the vector. Result: the vector snaps to one pole and turns green (collapse).
import { blochSphere } from "./bloch-sphere/bloch-sphere.js";
import { A, at, quantumWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("quantum", quantumWorld);
  const set = new THREE.Group();
  set.position.set(...A);
  kit.group.add(set);
  const sphere = blochSphere(kit, { radius: 0.9, mode: "collapse_result" });
  set.add(sphere.group);
  kit.ink(set);

  const rule = kit.beat("rule");
  const oneRes = kit.beat("one_res");
  const collapse = kit.beat("collapse");
  const pose = at(A, [0.6, 2.6, 7.0], [0, 1.5, 0]);
  const near = at(A, [0.3, 2.3, 5.4], [0, 1.6, 0]);
  const camera = kit.camera(pose);

  kit.callout({ text: "Phép đo", anchor: sphere.anchors.northPole, at: rule, hold: Math.min(2.6, oneRes - rule), gap: 300 });
  kit.label({ text: "Chỉ một kết quả", at: oneRes, hold: Math.min(2.4, collapse - oneRes - 0.2), y: 520 });
  kit.bigText({ text: "Sụp xuống → 0 hoặc 1", at: collapse, hold: 2.2, y: 560 });

  return {
    scene: world.scene,
    camera,
    hero: sphere.group,
    update(t) {
      // c: 0 to 0.55 while the probe descends from rule to collapse, then 0.55 to 1 as the vector snaps
      const c = t < collapse
        ? 0.55 * kit.clamp01((t - rule) / Math.max(0.5, collapse - rule))
        : 0.55 + 0.45 * kit.clamp01((t - collapse) / 0.5);
      sphere.update(t, { mode: "collapse_result", collapse: c, target: 0 });
      kit.drift(camera, t, { from: pose, to: near, start: collapse - 0.4, dur: 1.6 });
    },
  };
}
