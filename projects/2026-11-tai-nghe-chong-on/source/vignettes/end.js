// Sentence 9: on the bench at night. The camera holds behind the fridge while its back glows warm, then swings
// round to the front as the door opens: the back is warm, the food stays cool (check mark).
import { benchWorld } from "./pipe.js";
import { food } from "./food/food.js";

const IN = 0.9;   // the in move's dur in vignettes.json; the back label waits until the camera has landed

export async function build(kit) {
  const world = await kit.world("bench", benchWorld);
  // the orbit around the fridge: angle 0 faces the door (+z), PI faces the back
  const swing = (a, r, y, look) => ({ pos: [r * Math.sin(a), y, -0.4 + r * Math.cos(a)], look, fov: 40 });
  const camera = kit.camera(swing(Math.PI - 0.55, 7.5, 2.7, [0, 1.9, -0.6]));
  const back = kit.beat("back");
  const cool = kit.beat("cool");
  const turn = cool - 1.2;   // the swing to the front, 30 frames, lands just before "mát"
  const foods = [["bowl", -0.3, 1.77, 1], ["apple", 0.32, 1.77, 0.9], ["milk", -0.33, 0.97, 0.8], ["cheese", 0.33, 0.97, 1]]
    .map(([kind, x, y, s]) => {
      const item = food(kit, { kind, wisps: false });
      item.group.position.set(x, y, -0.05);
      item.group.scale.setScalar(s);
      kit.group.add(item.group);
      return item;
    });
  return {
    scene: world.scene,
    camera,
    hero: world.box.group,
    update(t) {
      const x = kit.ease(kit.progress(t, turn, 1), "inOut");
      world.box.update(t, { open: kit.ease(kit.progress(t, cool - 0.3, 0.6), "inOut"), heat: 1 - 0.4 * x, frost: 0.8 });
      foods.forEach(f => f.update(t, { warm: 0 }));
      kit.setPose(camera, swing(kit.lerp(Math.PI - 0.55, 0.08, x), kit.lerp(7.5, 6.6, x), kit.lerp(2.7, 2.4, x),
        [0, kit.lerp(1.9, 1.7, x), kit.lerp(-0.6, 0, x)]));
      const shown = Math.max(back, IN);
      kit.label({ text: "Lưng tủ ấm", at: shown, hold: turn - shown, y: 430, color: "#DD3428" });
      kit.label({ text: "Đồ ăn vẫn mát", at: cool, hold: 2, y: 430, color: "#2D884E" });
      kit.mark({ kind: "check", anchor: foods[0].anchors.top, at: cool + 0.3, hold: 1.5 });
    },
  };
}
