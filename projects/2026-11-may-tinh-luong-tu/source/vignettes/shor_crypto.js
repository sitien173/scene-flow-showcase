// shor_crypto (sentences 42-45). Moves: a big number block 391 splits into its two prime factors 17 and 23 beside a
// padlock (factor). Interacts: a chart rises with two curves, classical effort climbs steeply and Shor's stays low
// (shor). Result: a green NIST 2024 shield slides onto the padlock and the shackle closes (nist).
import { C, B, at, box, tile, appsWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("apps", appsWorld);
  const set = new THREE.Group();
  set.position.set(...B);
  kit.group.add(set);
  const num = tile(kit, "391", { w: 0.9, h: 0.5, d: 0.3, color: "#E6E6E1", fg: C.ink });
  num.position.set(-0.9, 0.6, 0.4);
  const fa = tile(kit, "17", { w: 0.5, h: 0.44, d: 0.3, color: C.sup });
  const fb = tile(kit, "23", { w: 0.5, h: 0.44, d: 0.3, color: C.sup });
  set.add(num, fa, fb);
  // padlock: body and a shackle that can rise and close
  const lock = new THREE.Group();
  lock.position.set(0.95, 0, 0.4);
  box(kit, lock, [0.7, 0.6, 0.3], "#C8CCD4", [0, 0.5, 0]);
  const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 8, 20, Math.PI), kit.toon("#C8CCD4"));
  lock.add(shackle);
  set.add(lock);
  const shield = tile(kit, "NIST", { w: 0.5, h: 0.5, d: 0.1, color: C.res, fg: C.ink });
  set.add(shield);
  // chart board: classical curve (blue) and Shor curve (purple), each a row of short bars
  const board = new THREE.Group();
  board.position.set(-0.05, 1.45, -0.3);
  box(kit, board, [2.3, 1.15, 0.06], "#383E52", [0, 0.55, -0.05]);
  const curve = (f, color) => Array.from({ length: 12 }, (_, i) => {
    const h = f(i / 11);
    const m = box(kit, board, [0.1, 0.1, 0.06], color, [-0.95 + i * 0.172, 0.08 + 0.95 * h, 0.02]);
    return m;
  });
  const classic = curve(x => x ** 3, C.bit);
  const shor = curve(x => 0.25 * x, C.sup);
  set.add(board);
  kit.ink(set);

  const factor = kit.beat("factor");
  const shorB = kit.beat("shor");
  const nist = kit.beat("nist");
  const pose = at(B, [-0.15, 2.2, 8.6], [-0.15, 1.2, 0]);
  const side = at(B, [0.35, 2.2, 8.2], [-0.05, 1.15, 0]);
  const camera = kit.camera(pose);

  // a label, not a callout: the pill for this text is wider than the 768 px pill limit and the kit cuts it
  kit.label({ text: "Thừa số nguyên tố", at: factor, hold: Math.min(3.0, shorB - factor - 0.3), y: 470 });
  kit.label({ text: "Thuật toán Peter Shor", at: shorB, hold: Math.min(3.4, nist - shorB - 0.3), y: 470 });
  kit.card({ title: "NIST 2024", body: "Chuẩn mã hóa mới", at: nist, hold: 2.4, anchor: lock, y: 420, width: 600 });

  return {
    scene: world.scene,
    camera,
    hero: [num, lock],
    update(t) {
      const s = kit.ease(kit.progress(t, factor + 0.3, 0.8), "out");
      num.visible = s < 0.05;
      fa.visible = fb.visible = s >= 0.05;
      fa.position.set(-0.9 - 0.4 * s, 0.6, 0.4);
      fb.position.set(-0.9 + 0.4 * s, 0.6, 0.4);
      const c = kit.progress(t, shorB - 0.3, 2.0);
      board.visible = c > 0;
      classic.forEach((m, i) => { m.visible = i / 11 <= c; });
      shor.forEach((m, i) => { m.visible = i / 11 <= c; });
      const n = kit.ease(kit.progress(t, nist - 0.3, 0.8), "out");
      shield.visible = n > 0;
      shield.position.set(kit.lerp(2.2, 0.95, n), 0.5, 0.6);
      const close = kit.ease(kit.progress(t, nist + 0.5, 0.4), "out");
      shackle.position.set(0, kit.lerp(1.0, 0.8, close), 0);
      kit.drift(camera, t, { from: pose, to: side, start: 0.4, dur: Math.max(4, nist + 1) });
    },
  };
}
