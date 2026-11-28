// Vignette 8 (slc_one_bit): 1-bit cell distinguishes 0 and 1 using one #E879F9 test line
// placed between two #F59E0B threshold voltage regions.
import { cellLabWorld } from "./threshold_v.js";
import { memoryCell } from "./memory-cell/memory-cell.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("cell_lab", cellLabWorld);
  const X = 0;

  const cell = memoryCell(kit, { mode: "trapped_charge" });
  cell.group.scale.setScalar(0.85);
  cell.group.position.set(X - 0.55, 0.0, 0.0);
  kit.group.add(cell.group);

  // Two threshold region pillars (#F59E0B) + #E879F9 test divider bar
  const chart = new THREE.Group();
  chart.position.set(X + 0.85, 0.0, 0.0);
  const lowReg = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.44, 0.34), kit.toon("#F59E0B"));
  lowReg.position.set(0, 0.22, 0);
  const highReg = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.54, 0.34), kit.toon("#F59E0B"));
  highReg.position.set(0, 1.05, 0);
  const divider = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.06, 0.42), kit.toon("#E879F9", { emissive: "#E879F9" }));
  divider.position.set(0, 0.62, 0.03);
  chart.add(lowReg, highReg, divider);
  kit.ink(chart);
  kit.group.add(chart);

  const divAnchor = new THREE.Object3D();
  divAnchor.position.set(X + 0.85, 0.62, 0.24);
  kit.group.add(divAnchor);

  const pose = { pos: [X + 0.12, 1.55, 6.2], look: [X + 0.12, 0.78, 0], fov: 38 };
  const camera = kit.camera(pose);
  const zeroOne = kit.beat("zero_one");
  const line = kit.beat("line");

  kit.bigText({
    text: "0 VÀ 1",
    at: zeroOne,
    hold: 3.4,
    y: 540,
    size: 104,
  });
  kit.callout({
    text: "VẠCH ĐIỆN ÁP THỬ",
    anchor: divAnchor,
    at: line,
    hold: 2.0,
    gap: 220,
  });

  return {
    scene: world.scene,
    camera,
    hero: [cell.group, chart],
    update(t) {
      const flip = kit.clamp01(kit.progress(t, zeroOne, 1.8));
      cell.update(t, {
        mode: "trapped_charge",
        charge: flip < 0.5 ? 0.25 : 0.78,
        probe: 0.52,
        gateGlow: 0.75,
        showGauge: false,
      });

      const drop = kit.ease(kit.progress(t, line - 0.5, 0.8), "out");
      divider.position.y = kit.lerp(1.45, 0.62, drop);
      divider.scale.x = 0.8 + 0.35 * drop;

      kit.drift(camera, t, {
        from: pose,
        to: { pos: [X + 0.22, 1.55, 5.75], look: [X + 0.20, 0.78, 0], fov: 38 },
        start: 0.8,
        dur: 5.5,
      });
    },
  };
}
