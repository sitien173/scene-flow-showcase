// Sentence 2: fly to the fridge front; the door opens on "cất" and the foods pop in one after another, still warm.
import { kitchenWorld } from "./open.js";

export async function build(kit) {
  const world = await kit.world("kitchen", kitchenWorld);
  const pose = { pos: [-1, 2, 5.2], look: [-1.6, 1.55, -1.8], fov: 40 };
  const camera = kit.camera(pose);
  const store = kit.beat("store");
  const warm = kit.beat("warm");
  const bowl = world.foods[0];
  return {
    scene: world.scene,
    camera,
    hero: world.box.group,
    update(t) {
      const open = kit.ease(kit.progress(t, store - 0.5, 0.6), "inOut");
      world.set(t, { open, warm: kit.ease(kit.progress(t, warm - 0.3, 0.6), "out") });
      kit.popSeq(world.foods.map(f => f.group), t, store);
      kit.push(camera, t, { ...pose, amount: 0.8, dur: 3.5 });
      kit.callout({ text: "Còn ấm", anchor: bowl.anchors.top, at: warm, hold: 0.5 });
    },
  };
}
