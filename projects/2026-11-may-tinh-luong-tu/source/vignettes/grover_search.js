// grover_search (sentences 38-41). Moves: a shuffled phone book of twelve name cards stands up (phonebook); a blue
// cursor checks the cards one by one and reaches the target only halfway through (half). Interacts: Grover's search
// flashes all cards purple and amplifies the target in three steps (grover). Result: the target card turns green
// after far fewer steps (thousand).
import { C, A, at, box, tile, appsWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("apps", appsWorld);
  const set = new THREE.Group();
  set.position.set(...A);
  kit.group.add(set);
  box(kit, set, [2.7, 1.65, 0.1], "#383E52", [0, 1.45, -0.12]);
  const NAMES = ["Minh", "An", "Quân", "Hà", "Chi", "Phúc", "Lan", "Bảo", "Nga", "Dũng", "Khoa", "Giang"];
  const TARGET = 6;
  const cards = NAMES.map((s, i) => {
    const g = tile(kit, s, { w: 0.56, h: 0.4, d: 0.08, color: "#E6E6E1", fg: C.ink });
    g.position.set(-0.96 + 0.64 * (i % 4), 1.95 - 0.5 * Math.floor(i / 4), 0);
    set.add(g);
    return g;
  });
  const cursor = box(kit, set, [0.66, 0.5, 0.04], C.bit, [0, 0, -0.04]);
  kit.ink(set);

  const book = kit.beat("phonebook");
  const half = kit.beat("half");
  const grover = kit.beat("grover");
  const thousand = kit.beat("thousand");
  const pose = at(A, [0, 2.1, 8.4], [0, 1.45, 0]);
  const near = at(A, [0, 2.2, 7.8], [0, 1.75, 0]);
  const camera = kit.camera(pose);

  kit.callout({ text: "Danh bạ lộn xộn", anchor: cards[1], at: book, hold: 2.4, gap: 320 });
  kit.label({ text: "Dò lần lượt: nửa danh bạ", at: half - 0.6, hold: Math.min(2.6, grover - half), y: 470 });
  kit.label({ text: "Thuật toán Grover", at: grover, hold: Math.min(3.0, thousand - grover - 0.3), y: 470 });
  kit.card({ title: "Grover (1996) · 1 triệu tên", body: "Thường: 500.000 · Lượng tử: cỡ 1.000", at: thousand, hold: 2.4, y: 420, width: 760 });

  return {
    scene: world.scene,
    camera,
    hero: cards,
    update(t) {
      // classical scan: one card per step from phonebook + 1.5, landing on the target at half
      const k = Math.floor(kit.clamp01((t - book - 1.5) / (half - book - 1.5 + 1e-6)) * TARGET + 1e-6);
      const scanning = t >= book + 1.5 && t < grover - 0.4;
      cursor.visible = scanning;
      cursor.position.set(cards[Math.min(k, TARGET)].position.x, cards[Math.min(k, TARGET)].position.y, -0.04);
      // Grover: three amplification pulses from grover, the target ends green and large
      const g = kit.progress(t, grover - 0.2, Math.max(1, thousand - grover - 0.4));
      const pulse = Math.floor(g * 3 + 1e-6);
      cards.forEach((c, i) => {
        let col = "#E6E6E1";
        if (scanning && i < k) col = C.bit;
        if (g > 0 && g < 1) col = (g * 3) % 1 < 0.5 ? C.sup : "#E6E6E1";
        if (i === TARGET && g > 0) col = g >= 1 ? C.res : C.sup;
        c.userData.body.material.color.set(col);
        const s = i === TARGET ? 1 + 0.12 * Math.min(pulse, 3) : g >= 1 ? 0.85 : 1;
        c.scale.setScalar(s);
        c.position.z = i === TARGET ? 0.1 * Math.min(pulse, 3) : 0;
      });
      kit.drift(camera, t, { from: pose, to: near, start: grover - 0.5, dur: 2.5 });
    },
  };
}
