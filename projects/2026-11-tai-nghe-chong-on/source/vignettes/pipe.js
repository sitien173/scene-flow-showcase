// Sentence 4: the fridge alone on the paper stage (the bench world). The camera orbits behind it while beads carry
// the warm gas down the suction line to the compressor. benchWorld is shared by the back-of-fridge vignettes.
import { fridge } from "./fridge/fridge.js";

export function benchWorld(kit) {
  const scene = kit.stage({ yard: 7 });
  const box = fridge(kit, {});
  scene.add(box.group);
  return { scene, box };
}

export async function build(kit) {
  const world = await kit.world("bench", benchWorld);
  const camera = kit.camera({ pos: [5, 2.4, -3.6], look: [0, 1.3, -0.7], fov: 40 });
  const run = kit.beat("run");
  const comp = kit.beat("comp");
  const flow = kit.beads(world.box.path("suction"), { distance: 7.6, color: "#F6B58A", glow: "#FFE6CC", start: run - 0.3, onTop: true });
  kit.group.add(flow.group);
  return {
    scene: world.scene,
    camera,
    hero: world.box.group,
    update(t) {
      world.box.update(t, { heat: 0, frost: 0.6 });
      kit.orbit(camera, t, { center: [0, 1.3, -0.7], radius: 7.6, height: 1.2, angle: 2.2, speed: 0.12 });
      flow.update(t);
      kit.callout({ text: "Máy nén", anchor: world.box.anchors.compressor, at: comp, hold: 1.5 });
    },
  };
}
