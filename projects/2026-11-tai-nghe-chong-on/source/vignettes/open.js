// Sentence 1: the opening crane onto the kitchen, then "không làm ra lạnh" (cross) and "đẩy hơi nóng đi".
// kitchenWorld builds the shared kitchen: the kitchen set, the fridge in its slot and four foods on its shelves.
// Every kitchen vignette calls world.set(t, state) first, so the shared props depend only on the time it is given.
import { kitchen } from "./kitchen/kitchen.js";
import { fridge } from "./fridge/fridge.js";
import { food } from "./food/food.js";

export function kitchenWorld(kit) {
  const scene = kit.stage({ yard: 11 });
  const room = kitchen(kit, {});
  scene.add(room.group);
  const box = fridge(kit, {});
  box.group.position.copy(room.anchors.slot.position);
  scene.add(box.group);
  const foods = [
    ["bowl", -0.3, 1.77, 1], ["apple", 0.32, 1.77, 0.9], ["milk", -0.33, 0.97, 0.8], ["cheese", 0.33, 0.97, 1],
  ].map(([kind, x, y, s]) => {
    const item = food(kit, { kind, wisps: true, warm: 0 });
    item.group.position.set(x, y, -0.05);
    item.group.scale.setScalar(s);
    box.group.add(item.group);
    return item;
  });
  // state: open, light, heat, frost (fridge), warm 0..1 (food wisps), shown (foods at full size)
  function set(t, { open = 0, light, heat = 0, frost = 0, warm = 0, shown = true } = {}) {
    box.update(t, { open, light, heat, frost });
    foods.forEach(f => {
      f.update(t, { warm });
      f.group.visible = shown;
      if (f.group.userData.baseScale) f.group.scale.copy(f.group.userData.baseScale);
    });
  }
  return { scene, room, box, foods, set };
}

export async function build(kit) {
  const world = await kit.world("kitchen", kitchenWorld);
  const pose = { pos: [0.8, 2.6, 10.5], look: [-1, 1.9, -1.6], fov: 40 };
  const camera = kit.camera(pose);
  const not = kit.beat("not");
  const push = kit.beat("push");
  return {
    scene: world.scene,
    camera,
    hero: world.box.group,
    update(t) {
      world.set(t, { shown: false });
      kit.crane(camera, t, { ...pose, height: -0.5, dur: 3 });
      kit.mark({ kind: "x", anchor: world.box.anchors.door, at: not, hold: 1.1 });
      kit.bigText({ text: "ĐẨY NÓNG ĐI", at: push, hold: 1.6, y: 560 });
    },
  };
}
