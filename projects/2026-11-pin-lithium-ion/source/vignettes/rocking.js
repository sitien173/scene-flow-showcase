// Vignette 13 (rocking, sentences 32-33): occlude pass-through to seesaw metaphor world;
// cell-cutaway balances on a minimalist rocking fulcrum, sliding purple Li+ ions back and forth.
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";
import { electrolyteMedium } from "./electrolyte-medium/electrolyte-medium.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("seesaw", k => {
    const scene = k.stage({ yard: 8, clear: 6, seed: 19 });

    // Minimalist seesaw fulcrum on the ground
    const fulcrum = new THREE.Mesh(
      new THREE.CylinderGeometry(0.10, 0.52, 0.72, 3),
      k.toon("#4C536B")
    );
    fulcrum.rotation.y = Math.PI / 2;
    fulcrum.position.set(0, 0.36, 0);
    k.ink(fulcrum);
    scene.add(fulcrum);

    const plankPivot = new THREE.Group();
    plankPivot.position.set(0, 0.72, 0);
    scene.add(plankPivot);

    const plank = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.12, 1.32), k.toon("#D98245"));
    plank.position.set(0, 0.06, 0);
    k.ink(plank);
    plankPivot.add(plank);

    const cell = cellCutaway(k, { openCutaway: 1, mode: "rocking" });
    cell.group.position.set(0, 0.12, 0);
    plankPivot.add(cell.group);

    const electrolyte = electrolyteMedium(k, { fill: 1, showBlock: 0 });
    electrolyte.group.position.set(0, 0.23, -0.02);
    plankPivot.add(electrolyte.group);

    return { scene, plankPivot, cell, electrolyte };
  });

  const startPose = { pos: [0.22, 1.85, 9.2], look: [0.18, 1.35, 0], fov: 40 };
  const camera = kit.camera(startPose);
  const hundreds = kit.beat("hundreds");
  kit.bigText({ text: "HÀNG TRĂM LẦN", at: hundreds, hold: 0.78, y: 550 });

  return {
    scene: world.scene,
    camera,
    hero: [world.cell.group, world.plankPivot],
    update(t) {
      const tilt = Math.sin(t * 1.9) * 0.13;
      world.plankPivot.rotation.z = tilt;
      world.cell.update(t, { openCutaway: 1, mode: "rocking", tilt: 0, showIons: true });
      const dir = Math.cos(t * 1.9) >= 0 ? -1 : 1;
      world.electrolyte.update(t, { fill: 1, flowDir: dir, showBlock: 0, showIons: true });

      if (t >= 0.8) {
        kit.orbit(camera, t - 0.8, {
          center: [0.18, 1.35, 0],
          radius: 9.2,
          height: 0.50,
          angle: 0.02,
          speed: 0.06 * Math.sin(t * 0.9),
          look: [0.18, 1.35, 0],
          fov: 40,
        });
      } else {
        kit.setPose(camera, startPose);
      }
    },
  };
}
