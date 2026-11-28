// nisq_limits (sentences 49-50). Starts on the end pose of sycamore_molecule with the same chip in the same place
// (light transition). Moves: the chip runs its sampling task (beat 49). Interacts: red noise sparks spread over an
// extended grid of qubit pads. Result: a red boundary line marks how far a circuit can grow before noise wins.
import { qubitChip } from "./qubit-chip/qubit-chip.js";
import { C, A, at, box, appsWorld, SYC_END, syc } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("apps", appsWorld);
  const set = new THREE.Group();
  set.position.set(...A);
  kit.group.add(set);
  const chip = qubitChip(kit, { mode: "grid_53" });
  chip.group.scale.setScalar(syc.chipScale);
  chip.group.position.set(...syc.chipPos);
  set.add(chip.group);
  // extended grid of pads to the left of the chip: the bigger circuit noise would need to cross
  const pads = [];
  for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) {
    pads.push(box(kit, set, [0.16, 0.05, 0.16], C.sup, [-1.9 + i * 0.3, 0.03, -0.3 + j * 0.3]));
  }
  const sparks = Array.from({ length: 18 }, () => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), kit.toon(C.noise, { emissive: C.noise }));
    set.add(m);
    return m;
  });
  const limit = box(kit, set, [0.05, 0.05, 1.4], C.noise, [-0.95, 0.06, 0.15]);
  limit.userData.baseScale = 1;
  kit.ink(set);

  const sampleB = kit.beat("rand" + "om");
  const noiseB = kit.beat("noise_limit");
  const back = at(A, [-0.15, 3.0, 9.8], [-0.15, 0.8, 0]);
  const camera = kit.camera(SYC_END);

  // a label, not a callout: the pill for this text is wider than the 768 px pill limit and the kit cuts it
  kit.label({ text: "Lấy mẫu giả ngẫu nhiên", at: sampleB, hold: Math.min(3.0, noiseB - sampleB - 0.3), y: 470 });
  kit.card({ title: "John Preskill (2018)", body: "Nhiễu giới hạn kích thước mạch", at: noiseB, hold: 2.6, y: 420, width: 720 });

  return {
    scene: world.scene,
    camera,
    hero: [chip.group, limit],
    update(t) {
      chip.update(t, { mode: "grid_53" });
      kit.popSeq(pads, t, sampleB + 1.2, { span: 1.2 });
      // sparks drift over the pads on fixed paths; their number grows from noise_limit - 1
      const n = Math.floor(sparks.length * kit.progress(t, noiseB - 1, 1.5));
      sparks.forEach((m, i) => {
        m.visible = i < n;
        const u = t * (0.5 + 0.07 * i) + i * 1.7;
        m.position.set(-1.9 + 1.5 * (0.5 + 0.5 * Math.sin(u)), 0.22 + 0.12 * Math.sin(u * 2.3), -0.3 + 0.9 * (0.5 + 0.5 * Math.cos(u * 0.8 + i)));
      });
      kit.popIn(limit, t, noiseB);
      kit.drift(camera, t, { from: SYC_END, to: back, start: 0.6, dur: Math.max(4, noiseB + 1.5) });
    },
  };
}
