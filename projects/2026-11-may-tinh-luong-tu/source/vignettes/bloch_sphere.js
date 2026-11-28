// bloch_sphere (sentences 15-18). Moves: the Bloch vector points to the north pole (0), then the south pole (1),
// then its tip sweeps over the whole surface (surface). Interacts: a memory cell beside it can only switch between
// two states (rotate). Result: a bit has two positions, a qubit a whole sphere of directions.
import { blochSphere } from "./bloch-sphere/bloch-sphere.js";
import { memoryCell } from "./memory-cell/memory-cell.js";
import { C, B, at, quantumWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("quantum", quantumWorld);
  const set = new THREE.Group();
  set.position.set(...B);
  kit.group.add(set);
  const sphere = blochSphere(kit, { radius: 0.9 });
  sphere.group.scale.setScalar(0.85);
  sphere.group.position.set(0.55, 0, 0);
  set.add(sphere.group);
  const cell = memoryCell(kit, { gateColor: C.bit, substrateColor: "#3D5580" });
  cell.group.scale.setScalar(0.55);
  cell.group.position.set(-1.35, 0, 0.4);
  cell.group.userData.baseScale = 0.55;
  set.add(cell.group);
  kit.ink(set);

  const sph = kit.beat("sphere");
  const poles = kit.beat("poles");
  const surface = kit.beat("surface");
  const rotate = kit.beat("rotate");

  const pose = at(B, [0.55, 2.4, 6.4], [0.55, 1.35, 0]);
  const side = at(B, [2.2, 2.4, 5.9], [0.55, 1.3, 0]);
  const wide = at(B, [-0.3, 2.6, 7.6], [-0.35, 1.0, 0]);
  const camera = kit.camera(pose);

  kit.callout({ text: "Quả cầu Bloch", anchor: sphere.anchors.center, at: sph, hold: 1.4, gap: 320 });
  kit.label({ text: "Bắc: 0 · Nam: 1", at: poles, hold: Math.min(3.4, surface - poles - 0.2), y: 470 });
  kit.label({ text: "Bit: 2 vị trí · Qubit: mặt cầu", at: rotate - 2.5, hold: 3.1, y: 1200, size: 48 });

  return {
    scene: world.scene,
    camera,
    hero: [sphere.group, cell.group],
    update(t) {
      // vector: free superposition, then north pole, then south pole, then a sweep over the surface
      let theta = 0.92 + 0.3 * Math.sin(t * 1.3);
      let phi = 0.45 + t * 1.15;
      if (t >= poles - 0.3 && t < surface - 0.3) {
        const half = (surface - poles) / 2;
        theta = kit.lerp(0, Math.PI, kit.ease(kit.progress(t, poles + half - 0.4, 0.8), "inOut"));
        theta = kit.lerp(0.92 + 0.3 * Math.sin(t * 1.3), theta, kit.ease(kit.progress(t, poles - 0.3, 0.5), "out"));
        phi = 0.45 + (poles - 0.3) * 1.15;
      } else if (t >= surface - 0.3) {
        const u = t - (surface - 0.3);
        theta = Math.PI / 2 + (Math.PI / 2 - 0.25) * Math.cos(u * 1.1);
        phi = 0.45 + (poles - 0.3) * 1.15 + u * 1.6;
      }
      sphere.update(t, { mode: "superposition", theta, phi, color: C.sup });
      // the memory cell appears on "rotate" and switches between its two states only
      kit.popIn(cell.group, t, rotate - 0.5);
      const flip = Math.floor(Math.max(0, t - rotate) / 0.8) % 2;
      cell.update(t, { mode: flip ? "threshold_read_block" : "threshold_read_pass" });
      if (t < rotate - 0.6) kit.drift(camera, t, { from: pose, to: side, start: sph + 0.4, dur: Math.max(2, rotate - sph - 1.2) });
      else kit.fly(camera, t, { from: side, to: wide, start: rotate - 0.6, dur: 1.4, ease: "stop" });
    },
  };
}
