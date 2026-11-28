// Sentence 3: into the open fridge to the evaporator at the back wall; cold beads run its coil, frost grows and
// the food wisps fade as the gas soaks up their heat.
import { kitchenWorld } from "./open.js";

export async function build(kit) {
  const world = await kit.world("kitchen", kitchenWorld);
  const pose = { pos: [-1.6, 2.5, 2.4], look: [-1.6, 2.6, -2.2], fov: 40 };
  const camera = kit.camera(pose);
  const coil = kit.beat("coil");
  const boil = kit.beat("boil");
  const soak = kit.beat("soak");
  const flow = kit.beads(world.box.path("evaporator"), { distance: 4.6, color: "#7FC4E8", glow: "#E6F6FF", start: coil, onTop: true });
  kit.group.add(flow.group);
  return {
    scene: world.scene,
    camera,
    hero: flow.group,
    update(t) {
      world.set(t, {
        open: 1,
        frost: kit.ease(kit.progress(t, boil, 1.2), "out"),
        warm: 1 - kit.ease(kit.progress(t, soak, 1), "inOut"),
      });
      kit.setPose(camera, pose);
      flow.update(t);
      kit.card({ title: "Dàn lạnh", body: "Ga bay hơi, hút nhiệt", at: coil, hold: 2.6, y: kit.H - 540, width: 600 });
    },
  };
}
