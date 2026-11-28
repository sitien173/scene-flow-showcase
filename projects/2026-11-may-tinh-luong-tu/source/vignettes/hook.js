// hook (sentences 1-4): a classical laptop with its memory-cell core beside the qubit chip and its Bloch sphere.
// question: callout "CHỈ NHANH HƠN?"; laptop: a speed gauge pops up between the machines; no: X over the gauge
// and "KHÔNG"; bit: the camera flies to the memory cell and labels it BIT.
import { memoryCell } from "./memory-cell/memory-cell.js";
import { qubitChip } from "./qubit-chip/qubit-chip.js";
import { blochSphere } from "./bloch-sphere/bloch-sphere.js";
import { C, A, at, box, labWorld, laptop } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("lab", labWorld);
  const set = new THREE.Group();
  set.position.set(...A);
  kit.group.add(set);

  const lap = laptop(kit);
  lap.position.set(-1.35, 0, 0.1);
  lap.rotation.y = 0.2;
  set.add(lap);
  const cell = memoryCell(kit, { gateColor: C.bit, substrateColor: "#3D5580" });
  cell.group.scale.setScalar(0.6);
  cell.group.position.set(-1.3, 0, 1.15);
  set.add(cell.group);

  const chip = qubitChip(kit, { mode: "overview" });
  chip.group.scale.setScalar(0.7);
  chip.group.position.set(1.3, 0, 0.5);
  chip.group.rotation.y = -0.2;
  set.add(chip.group);
  const sphere = blochSphere(kit, { radius: 0.62 });
  sphere.group.scale.setScalar(0.8);
  sphere.group.position.set(1.35, 0, -0.75);
  set.add(sphere.group);

  // speed gauge between the machines: the "only faster?" idea that the narration rejects
  const gauge = new THREE.Group();
  gauge.position.set(0, 1.75, 0.3);
  const disk = box(kit, gauge, [0.8, 0.5, 0.08], "#FCD53E");
  const needle = new THREE.Group();
  needle.position.set(0, -0.18, 0.06);
  box(kit, needle, [0.05, 0.36, 0.04], C.noise, [0, 0.16, 0]);
  gauge.add(needle);
  set.add(gauge);
  kit.ink(set);

  const wide = at(A, [0, 2.9, 8.6], [0, 1.3, 0]);
  const wide2 = at(A, [-0.2, 2.6, 7.6], [0, 1.2, 0]);
  const close = at(A, [-1.1, 1.7, 4.4], [-1.3, 0.65, 1.15], 38);
  const camera = kit.camera(wide);

  const question = kit.beat("question");
  const lapB = kit.beat("laptop");
  const no = kit.beat("no");
  const bit = kit.beat("bit");
  const flyAt = Math.min(no + 2.2, bit - 1.6);

  kit.callout({ text: "Chỉ nhanh hơn?", anchor: gauge, at: Math.max(question, 2.6), hold: 2.6, gap: 300 });
  kit.mark({ kind: "x", anchor: gauge, at: no, hold: 2.0, size: 170 });
  kit.bigText({ text: "Không", at: no, hold: 2.0, y: 560 });
  kit.label({ text: "Bit", at: bit - 0.4, hold: 2.0, y: 600, size: 80 });

  return {
    scene: world.scene,
    camera,
    hero: [lap, chip.group, sphere.group],
    update(t) {
      cell.update(t, { mode: t >= flyAt ? "tunnel_write" : "trapped_charge" });
      chip.update(t, { mode: "overview" });
      sphere.update(t, {});
      const g = kit.pop(t, lapB - 0.2, 0.3);
      gauge.visible = g > 0 && t < no + 2.2;
      gauge.scale.setScalar(Math.max(g, 1e-4));
      needle.rotation.z = 1.0 - 2.0 * kit.ease(kit.progress(t, lapB, 1.6), "out");
      if (t < flyAt) kit.drift(camera, t, { from: wide, to: wide2, start: 2.6, dur: 5 });
      else kit.fly(camera, t, { from: wide2, to: close, start: flyAt, dur: 1.4, ease: "stop" });
    },
  };
}
