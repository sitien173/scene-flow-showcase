// interference (sentences 34-37). Moves: two purple waves travel side by side in two lanes (wave). Interacts: in the
// left lane crest meets trough and the sum goes flat; in the right lane crest meets crest and the sum rises and
// turns green (amplify). Result: the chance column of the right answer rises (measure); the label hands over to
// specific problems (specific).
import { C, B, at, bar, quantumWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("quantum", quantumWorld);
  const set = new THREE.Group();
  set.position.set(...B);
  kit.group.add(set);
  const N = 14;
  const bead = new THREE.BoxGeometry(0.09, 0.09, 0.09);
  const lanes = [{ x0: -1.75, phase: Math.PI }, { x0: 0.35, phase: 0 }].map(({ x0, phase }) => {
    const row = (z, color) => Array.from({ length: N }, (_, i) => {
      const m = new THREE.Mesh(bead, kit.toon(color));
      m.position.set(x0 + i * 0.1, 1.4, z);
      set.add(m);
      return m;
    });
    return { phase, a: row(-0.3, C.sup), b: row(0.3, C.sup), s: row(0, phase ? "#7A8299" : C.res) };
  });
  const cols = [[-1.1, "#7A8299"], [1.0, C.res]].map(([x, c]) => bar(kit, set, [0.34, 0.34], c, [x, 0, 0.2]));
  kit.ink(set);

  const amp = kit.beat("amplify");
  const meas = kit.beat("measure");
  const spec = kit.beat("specific");
  const pose = at(B, [0, 2.7, 10.0], [0, 1.2, 0]);
  const near = at(B, [0.1, 2.6, 9.6], [0.1, 1.2, 0]);
  const camera = kit.camera(pose);

  kit.label({ text: "Đỉnh + đỉnh = khuếch đại", at: amp, hold: Math.min(2.6, meas - amp - 0.1), y: 470 });
  kit.label({ text: "Bài toán cụ thể", at: spec - 1.3, hold: 2.0, y: 470 });

  return {
    scene: world.scene,
    camera,
    hero: [...cols],
    update(t) {
      // m: 0 = two separate waves, 1 = the waves merged into their sum
      const m = kit.ease(kit.progress(t, amp - 0.6, 1.0), "inOut");
      lanes.forEach(({ phase, a, b, s }) => {
        for (let i = 0; i < N; i++) {
          const ya = 0.28 * Math.sin(i * 0.55 - t * 3);
          const yb = 0.28 * Math.sin(i * 0.55 - t * 3 + phase);
          a[i].position.set(a[i].position.x, 1.4 + ya, -0.3 * (1 - m));
          b[i].position.set(b[i].position.x, 1.4 + yb, 0.3 * (1 - m));
          a[i].visible = b[i].visible = m < 0.98;
          s[i].visible = m > 0.02;
          s[i].position.y = 1.4 + m * (ya + yb);
        }
      });
      const r = kit.ease(kit.progress(t, meas - 0.2, 1.2), "out");
      cols[0].scale.y = 0.05 + 0.1 * r;
      cols[1].scale.y = 0.05 + 0.75 * r;
      kit.drift(camera, t, { from: pose, to: near, start: meas - 0.4, dur: 2.4 });
    },
  };
}
