// Vignette 9 (mlc_two_bit): Four threshold voltage regions (#F59E0B) encode four bit pairs (00, 01, 10, 11)
// so a single memory cell can store 2 bits.
import { cellLabWorld } from "./threshold_v.js";
import { memoryCell } from "./memory-cell/memory-cell.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("cell_lab", cellLabWorld);
  const X = 5.5;

  const cell = memoryCell(kit, { mode: "multi_level" });
  cell.group.scale.setScalar(0.8);
  cell.group.position.set(X - 0.65, 0.0, 0.0);
  kit.group.add(cell.group);

  // Four stacked/stepped threshold regions (#F59E0B)
  const regions = new THREE.Group();
  regions.position.set(X + 0.65, 0.0, 0.0);
  const bars = [];
  for (let i = 0; i < 4; i++) {
    const h = 0.30 + i * 0.28;
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.24, h, 0.28), kit.toon("#F59E0B"));
    b.position.set(-0.42 + i * 0.28, h / 2, 0);
    regions.add(b);
    bars.push(b);
  }
  kit.ink(regions);
  kit.group.add(regions);

  const fourAnchor = new THREE.Object3D();
  fourAnchor.position.set(X + 0.65, 0.95, 0.14);
  kit.group.add(fourAnchor);

  const pose = { pos: [X + 0.05, 1.62, 6.7], look: [X + 0.05, 0.82, 0], fov: 38 };
  const camera = kit.camera(pose);
  const four = kit.beat("four");
  const pairs = kit.beat("pairs");
  const twoBit = kit.beat("two_bit");

  kit.callout({
    text: "4 VÙNG NGƯỠNG",
    anchor: fourAnchor,
    at: four,
    hold: 3.5,
    gap: 220,
  });
  kit.card({
    title: "4 CẶP BIT (MINH HỌA)",
    body: "00 · 01 · 10 · 11",
    at: pairs,
    hold: 4.1,
    y: 475,
    width: 640,
  });
  kit.bigText({
    text: "2 BIT / Ô",
    at: twoBit,
    hold: 2.0,
    y: 560,
    size: 104,
  });

  return {
    scene: world.scene,
    camera,
    hero: [cell.group, regions],
    update(t) {
      const level = Math.min(3, Math.floor(kit.clamp01(t / 13.0) * 4));
      cell.update(t, {
        mode: "multi_level",
        level,
        levels: 4,
        gateGlow: 0.6,
        showGauge: true,
      });

      const split = kit.ease(kit.progress(t, four - 0.6, 1.0), "out");
      bars.forEach((b, i) => {
        b.scale.y = 0.25 + 0.75 * split * (i === level ? 1.08 : 0.95);
      });

      kit.drift(camera, t, {
        from: pose,
        to: { pos: [X + 0.45, 1.62, 6.3], look: [X + 0.25, 0.82, 0], fov: 38 },
        start: pairs - 0.5,
        dur: 4.5,
      });
    },
  };
}
