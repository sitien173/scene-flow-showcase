// Sentence 5: a hard cut to the compressor cutaway. The piston squeezes the gas; the outlet line and a thermometer
// turn hot on "nóng hơn".
import { compressor } from "./compressor/compressor.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("compressor", k => {
    const scene = k.stage({ yard: 9 });
    const unit = compressor(k, { cutaway: true });
    scene.add(unit.group);
    return { scene, unit };
  });
  const unit = world.unit;
  const camera = kit.camera({ pos: [0.2, 2.2, 8.2], look: [0.2, 1.7, 0], fov: 40 });
  const squeeze = kit.beat("squeeze");
  const hot = kit.beat("hot");
  const gasIn = kit.beads(unit.path("in"), { distance: 8.2, color: "#F6B58A", start: 0, onTop: true });
  const gasOut = kit.beads(unit.path("out"), { distance: 8.2, color: "#F08A4B", glow: "#FFD2B0", start: squeeze, onTop: true });
  // a thermometer beside the shell: glass tube, bulb and a red column that rises with the heat
  const meter = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.2, 12), kit.toon("#FFFFFF"));
  glass.position.y = 0.75;
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 10), kit.toon("#DD3428"));
  bulb.position.y = 0.12;
  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 10), kit.toon("#DD3428"));
  column.geometry.translate(0, 0.5, 0);
  column.position.set(0, 0.2, 0.05);
  meter.add(glass, bulb, column);
  kit.ink(meter);
  meter.position.set(-0.7, 0.25, 1.9);
  kit.group.add(gasIn.group, gasOut.group, meter);
  return {
    scene: world.scene,
    camera,
    hero: [unit.group, meter],
    update(t) {
      const heat = kit.ease(kit.progress(t, squeeze, hot - squeeze + 0.4), "inOut");
      unit.update(t, { rate: 1.5, heat });
      kit.setPose(camera, { pos: [0.2, 2.2, 8.2], look: [0.2, 1.7, 0], fov: 40 });
      gasIn.update(t);
      gasOut.update(t);
      kit.popIn(meter, t, squeeze - 0.2);
      column.scale.y = 0.15 + 0.95 * heat;
      kit.bigText({ text: "NÓNG HƠN BẾP", at: hot, hold: 1.4, y: kit.H - 200, size: 96 });
    },
  };
}
