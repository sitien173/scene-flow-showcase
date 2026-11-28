// Vignette 10 (mlc_tradeoff): Multiple #E879F9 test voltage levels distinguish 4 regions;
// raw capacity increases per cell, but threshold regions squeeze closer together.
import { cellLabWorld } from "./threshold_v.js";
import { memoryCell } from "./memory-cell/memory-cell.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("cell_lab", cellLabWorld);
  const X = 11;

  const cell = memoryCell(kit, { mode: "multi_level" });
  cell.group.scale.setScalar(0.8);
  cell.group.position.set(X - 0.6, 0.0, 0.0);
  kit.group.add(cell.group);

  // Four threshold bars + 3 #E879F9 probe blades between them that squeeze closer together
  const stack = new THREE.Group();
  stack.position.set(X + 0.72, 0.0, 0.0);
  const bars = [];
  const probes = [];
  for (let i = 0; i < 4; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.18, 0.34), kit.toon("#F59E0B"));
    m.position.set(0, 0.22 + i * 0.32, 0);
    stack.add(m);
    bars.push(m);
  }
  for (let i = 0; i < 3; i++) {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.035, 0.40), kit.toon("#E879F9", { emissive: "#E879F9" }));
    p.position.set(0, 0.38 + i * 0.32, 0.02);
    stack.add(p);
    probes.push(p);
  }
  kit.ink(stack);
  kit.group.add(stack);

  const probeAnchor = new THREE.Object3D();
  probeAnchor.position.set(X + 0.72, 0.70, 0.22);
  kit.group.add(probeAnchor);

  const pose = { pos: [X + 0.1, 1.5, 6.4], look: [X + 0.1, 0.82, 0], fov: 38 };
  const camera = kit.camera(pose);
  const levels = kit.beat("levels");
  const capacity = kit.beat("capacity");
  const tight = kit.beat("tight");

  kit.callout({
    text: "NHIỀU MỨC THỬ",
    anchor: probeAnchor,
    at: levels,
    hold: 3.9,
    gap: 220,
  });
  kit.label({
    text: "+ SỨC CHỨA",
    at: capacity,
    hold: 2.8,
    y: 490,
    size: 62,
    color: "#2D884E",
  });
  kit.label({
    text: "KHE NGƯỠNG HẸP",
    at: tight,
    hold: 3.3,
    y: 490,
    size: 56,
    color: "#DD3428",
  });

  return {
    scene: world.scene,
    camera,
    hero: [cell.group, stack],
    update(t) {
      const squeeze = kit.ease(kit.progress(t, tight - 0.5, 1.5), "inOut");
      const gap = kit.lerp(0.34, 0.21, squeeze);
      bars.forEach((b, i) => {
        b.position.y = 0.24 + i * gap;
      });
      probes.forEach((p, i) => {
        p.position.y = 0.24 + (i + 0.5) * gap;
      });

      const level = Math.floor(t * 1.2) % 4;
      cell.update(t, { mode: "multi_level", level, levels: 4, gateGlow: 0.7 });

      kit.push(camera, t, { ...pose, amount: 0.9, start: tight - 0.4, dur: 2.8 });
    },
  };
}
