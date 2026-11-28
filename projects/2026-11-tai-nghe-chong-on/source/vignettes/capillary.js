// Sentence 7: a short flight round to the capillary tube. The pressure drops, the beads turn cold and run on into
// the evaporator; a sweep marks "lạnh đi".
import { benchWorld } from "./pipe.js";

export async function build(kit) {
  const world = await kit.world("bench", benchWorld);
  const pose = { pos: [-5.6, 1.4, -6], look: [-0.5, 1.6, -0.7], fov: 40 };
  const camera = kit.camera(pose);
  const drop = kit.beat("drop");
  const cold = kit.beat("cold");
  const tube = kit.beads(world.box.path("capillary"), { distance: 7.4, color: "#FFFFFF", start: 0, end: cold + 0.4, onTop: true });
  const coil = kit.beads(world.box.path("evaporator"), { distance: 7.4, color: "#7FC4E8", glow: "#E6F6FF", start: cold, onTop: true });
  kit.group.add(tube.group, coil.group);
  return {
    scene: world.scene,
    camera,
    hero: world.box.group,
    update(t) {
      world.box.update(t, { heat: 0.4, frost: 0.6 + 0.4 * kit.ease(kit.progress(t, cold, 0.8), "out") });
      kit.crane(camera, t, { ...pose, height: 0.9, dur: 3.5 });
      tube.update(t);
      coil.update(t);
      kit.callout({ text: "Giảm áp", anchor: world.box.anchors.capillary, at: drop, hold: 1.5 });
      kit.sweep({ at: cold });
    },
  };
}
