// not_always_faster (sentences 51-53). Moves: a board of twelve everyday tasks pops up between a laptop and the
// qubit chip (ibm). Interacts: the tasks sort themselves, ten blue tasks slide to the laptop, two purple
// specialised tasks slide to the chip. Result: the laptop gets a check for most of the work (best).
import { qubitChip } from "./qubit-chip/qubit-chip.js";
import { C, A, at, tile, labWorld, laptop } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("lab", labWorld);
  const set = new THREE.Group();
  set.position.set(...A);
  kit.group.add(set);
  const lap = laptop(kit);
  lap.scale.setScalar(0.6);
  lap.position.set(-1.15, 0, 0.3);
  set.add(lap);
  const chip = qubitChip(kit, { mode: "overview" });
  chip.group.scale.setScalar(0.55);
  chip.group.position.set(1.15, 0, 0.3);
  set.add(chip.group);
  const TASKS = ["Web", "Email", "Game", "Phân tử", "Video", "Ảnh", "Chat", "Code", "Nhạc", "Tối ưu", "Bản đồ", "Excel"];
  const special = s => s === "Phân tử" || s === "Tối ưu";
  let nb = 0, nq = 0;
  const tasks = TASKS.map((s, i) => {
    const q = special(s);
    const g = tile(kit, s, { w: 0.5, h: 0.28, d: 0.06, color: q ? C.sup : C.bit });
    // home: a 4 x 3 grid in the middle; sorted: a 2-column stack over the laptop, or over the chip
    g.userData.home = [-0.87 + 0.58 * (i % 4), 2.45 - 0.36 * Math.floor(i / 4)];
    g.userData.sorted = q ? [1.15, 1.35 + 0.34 * nq++] : [-1.42 + 0.54 * (nb % 2), 1.15 + 0.32 * Math.floor(nb++ / 2)];
    set.add(g);
    return g;
  });
  kit.ink(set);

  const surprise = kit.beat("surprise");
  const ibm = kit.beat("ibm");
  const best = kit.beat("best");
  const pose = at(A, [0, 2.4, 9.8], [0, 1.4, 0]);
  const near = at(A, [0, 2.3, 9.2], [0, 1.4, 0]);
  const camera = kit.camera(pose);

  kit.bigText({ text: "Không nhanh hơn mọi việc", at: surprise, hold: Math.min(2.0, ibm - surprise), y: 560 });
  kit.mark({ kind: "check", anchor: lap, at: best, hold: 2.2, size: 150 });
  // a label, not a callout: the pill for this text is wider than the 768 px pill limit and the kit cuts it
  kit.label({ text: "Máy thường: phần lớn việc", at: best - 1.4, hold: 2.1, y: 470 });

  return {
    scene: world.scene,
    camera,
    hero: [lap, chip.group],
    update(t) {
      chip.update(t, { mode: "overview" });
      kit.popSeq(tasks, t, ibm, { span: 1.2 });
      const s = kit.ease(kit.progress(t, ibm + 2.4, Math.max(1.5, best - ibm - 3.2)), "inOut");
      tasks.forEach(g => {
        const [hx, hy] = g.userData.home, [sx, sy] = g.userData.sorted;
        g.position.set(kit.lerp(hx, sx, s), kit.lerp(hy, sy, s), 0.6);
      });
      kit.drift(camera, t, { from: pose, to: near, start: best - 0.6, dur: 2.2 });
    },
  };
}
