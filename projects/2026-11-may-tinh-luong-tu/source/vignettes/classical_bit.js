// classical_bit (sentences 5-7). Moves: photo, note and message icons slide into a row of memory cells and
// become 0/1 blocks (media); a lever switch flips between 0 and 1 (switch). Interacts: the bit blocks pass one by
// one through a logic gate. Result: each block leaves the gate changed, one step at a time (logic).
import { memoryCell } from "./memory-cell/memory-cell.js";
import { C, B, at, box, tile, labWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("lab", labWorld);
  const set = new THREE.Group();
  set.position.set(...B);
  kit.group.add(set);

  // three memory cells in a row, the classical store
  const cells = [-1.2, 0, 1.2].map(x => {
    const m = memoryCell(kit, { gateColor: C.bit, substrateColor: "#3D5580" });
    m.group.scale.setScalar(0.5);
    m.group.position.set(x, 0, -0.9);
    set.add(m.group);
    return m;
  });

  // media icons that slide in and turn into bits
  const icons = ["ẢNH", "NHẠC", "TIN"].map((s, i) => {
    const g = tile(kit, s, { w: 0.62, h: 0.42, color: "#E6E6E1", fg: C.ink });
    g.position.set(-1.2 + i * 1.2, 1.25, -0.9);
    set.add(g);
    return g;
  });
  const BITS = "01101001";
  const bits = [...BITS].map(ch => {
    const g = tile(kit, ch, { w: 0.34, h: 0.34, d: 0.2, color: C.bit });
    set.add(g);
    return g;
  });

  // lever switch: base, two labelled stops, a lever that flips from 0 to 1
  const sw = new THREE.Group();
  sw.position.set(-1.55, 0, 1.0);
  box(kit, sw, [0.9, 0.16, 0.5], "#383E52", [0, 0.08, 0]);
  const off = tile(kit, "0", { w: 0.26, h: 0.26, color: C.bit });
  off.position.set(-0.32, 0.36, 0.12);
  const on = tile(kit, "1", { w: 0.26, h: 0.26, color: C.bit });
  on.position.set(0.32, 0.36, 0.12);
  const lever = new THREE.Group();
  lever.position.set(0, 0.16, 0);
  box(kit, lever, [0.08, 0.6, 0.08], "#C8CCD4", [0, 0.3, 0]);
  box(kit, lever, [0.18, 0.14, 0.18], C.bit, [0, 0.62, 0]);
  sw.add(off, on, lever);
  set.add(sw);

  // logic gate on the conveyor: bits enter on the left and leave on the right
  const gate = new THREE.Group();
  gate.position.set(0.35, 0, 1.0);
  box(kit, gate, [3.6, 0.08, 0.5], "#C8CCD4", [0.2, 0.04, 0]);
  const gbody = tile(kit, "AND", { w: 0.7, h: 0.6, d: 0.5, color: "#383E52" });
  gbody.position.set(0.2, 0.42, 0);
  gate.add(gbody);
  set.add(gate);
  kit.ink(set);

  const media = kit.beat("media");
  const swB = kit.beat("switch");
  const logic = kit.beat("logic");

  const start = at(B, [0, 2.4, 8.4], [0, 0.85, 0]);
  const row = at(B, [-0.9, 1.6, 4.6], [-0.6, 0.6, 0.6]);
  const along = at(B, [1.0, 1.6, 4.4], [0.7, 0.5, 0.9]);
  const camera = kit.camera(start);

  kit.callout({ text: "0 hoặc 1", anchor: lever, at: swB, hold: 2.2, gap: 260 });
  kit.card({ title: "Xử lý nối tiếp", body: "PHÉP TOÁN LOGIC", at: logic, hold: 2.4, anchor: gbody, y: 470, width: 640 });

  return {
    scene: world.scene,
    camera,
    hero: [gate, sw],
    update(t) {
      gate.visible = t >= logic - 0.8;
      cells.forEach(m => m.update(t, { mode: "trapped_charge" }));
      // icons drop into the cells, then their bits sit in a row in front of the cells
      icons.forEach((g, i) => {
        const x = kit.ease(kit.progress(t, media + 0.3 * i, 0.8), "inOut");
        g.position.y = kit.lerp(1.25, 0.6, x);
        g.visible = x < 1;
        g.scale.setScalar(1 - 0.6 * x);
      });
      const made = media + 1.6;
      bits.forEach((g, i) => {
        // on the conveyor: bit i passes the gate at logic + 0.35 i; it flips from its value to the gate output
        const travel = kit.clamp01((t - (logic - 0.6) - 0.35 * i) / 1.6);
        const x = t < logic - 0.6 ? -1.25 + 0.36 * i - 0.6 : kit.lerp(-1.25 + 0.36 * i - 0.6, 2.1 + 0.36 * i - 0.6, kit.ease(travel, "inOut"));
        g.position.set(x, 0.3, 1.0);
        g.visible = t >= made + 0.1 * i;
        kit.popIn(g, t, made + 0.1 * i);
        g.userData.body.material.color.set(travel > 0.5 ? C.ink : C.bit);
      });
      // the lever rests on 0, flips to 1 on the switch beat
      lever.rotation.z = kit.lerp(0.5, -0.5, kit.ease(kit.progress(t, swB, 0.3), "out"));
      if (t < swB - 1) kit.drift(camera, t, { from: start, to: row, start: 0.6, dur: 3 });
      else if (t < logic - 0.8) kit.setPose(camera, row);
      else kit.drift(camera, t, { from: row, to: along, start: logic - 0.8, dur: 2.6 });
    },
  };
}
