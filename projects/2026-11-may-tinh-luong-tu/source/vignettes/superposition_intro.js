// superposition_intro (sentences 13-14). Moves: the Bloch vector drifts in superposition, then snaps to the north
// pole and turns green when it is read (read_01). Interacts: reading forces one value. Result: the vector returns to
// a purple superposition with its halo when the narration names superposition (superpos).
import { blochSphere } from "./bloch-sphere/bloch-sphere.js";
import { C, A, at, quantumWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("quantum", quantumWorld);
  const set = new THREE.Group();
  set.position.set(...A);
  kit.group.add(set);
  const sphere = blochSphere(kit, { radius: 0.9 });
  set.add(sphere.group);
  kit.ink(set);

  const read01 = kit.beat("read_01");
  const superpos = kit.beat("superpos");
  const pose = at(A, [0, 2.6, 7.0], [0, 1.55, 0]);
  const near = at(A, [0, 2.2, 5.6], [0, 1.45, 0]);
  const camera = kit.camera(pose);

  kit.label({ text: "Khi đọc: 0 hoặc 1", at: read01, hold: 2.6, y: 520 });
  kit.bigText({ text: "Chồng chập", at: superpos, hold: 2.2, y: 560 });

  return {
    scene: world.scene,
    camera,
    hero: sphere.group,
    update(t) {
      // k = 1 while the qubit is read, 0 in superposition
      const k = kit.ease(kit.progress(t, read01 - 0.2, 0.5), "out") * (1 - kit.ease(kit.progress(t, superpos - 0.5, 0.8), "inOut"));
      const free = 0.92 + 0.3 * Math.sin(t * 1.3);
      sphere.update(t, { mode: "superposition", theta: kit.lerp(free, 0, k), color: k > 0.5 ? C.res : C.sup });
      kit.drift(camera, t, { from: pose, to: near, start: 0.4, dur: Math.max(2, superpos + 1.5) });
    },
  };
}
