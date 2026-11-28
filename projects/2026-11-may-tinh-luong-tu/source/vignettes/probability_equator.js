// probability_equator (sentences 22-23). Moves: the Bloch vector tips from near the north pole down to the equator
// (prob to equator). Interacts: two green bars show the chance to read 0 and 1, and their heights follow the
// latitude of the vector. Result: on the glowing equator both bars stand level at 50/50.
import { blochSphere } from "./bloch-sphere/bloch-sphere.js";
import { C, B, at, bar, tile, quantumWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("quantum", quantumWorld);
  const set = new THREE.Group();
  set.position.set(...B);
  kit.group.add(set);
  const sphere = blochSphere(kit, { radius: 0.9 });
  sphere.group.scale.setScalar(0.72);
  sphere.group.position.set(-0.55, 0, 0);
  set.add(sphere.group);
  const bars = [0.55, 1.0].map(x => bar(kit, set, [0.3, 0.3], C.res, [x, 0, 0.2]));
  ["0", "1"].forEach((s, i) => {
    const g = tile(kit, s, { w: 0.34, h: 0.3, d: 0.08, color: "#E6E6E1", fg: "#1C1C20" });
    g.position.set(bars[i].position.x, 0.15, 0.45);
    set.add(g);
  });
  kit.ink(set);

  const prob = kit.beat("prob");
  const equator = kit.beat("equator");
  const pose = at(B, [0.1, 2.1, 7.0], [0.1, 1.15, 0]);
  const near = at(B, [0.3, 1.9, 6.0], [0.1, 1.1, 0]);
  const camera = kit.camera(pose);

  kit.callout({ text: "Đường xích đạo", anchor: sphere.anchors.equator, at: equator, hold: 1.4, gap: 300 });
  kit.card({ title: "Xác suất đo", body: "0: 50% · 1: 50%", at: equator + 1.5, hold: 2.4, y: 440, width: 640 });

  return {
    scene: world.scene,
    camera,
    hero: [sphere.group, ...bars],
    update(t) {
      const theta = kit.lerp(0.3, Math.PI / 2, kit.ease(kit.progress(t, prob, Math.max(1, equator - prob)), "inOut"));
      sphere.update(t, { mode: "superposition", theta, phi: 0.6 + t * 0.6, color: C.sup, equatorGlow: kit.progress(t, equator - 0.2, 0.5) });
      // chance to read 0 is cos^2(theta/2), to read 1 is sin^2(theta/2)
      const p0 = Math.cos(theta / 2) ** 2;
      bars[0].scale.y = 0.05 + 1.5 * p0;
      bars[1].scale.y = 0.05 + 1.5 * (1 - p0);
      kit.drift(camera, t, { from: pose, to: near, start: 0.3, dur: Math.max(2, equator + 1) });
    },
  };
}
