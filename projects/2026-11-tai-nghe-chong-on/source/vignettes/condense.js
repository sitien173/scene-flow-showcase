// Sentence 6: through the compressor world back to the bench, behind the fridge. The condenser glows hot and beads
// run down its coil as the gas gives its heat to the room and turns back to liquid.
import { benchWorld } from "./pipe.js";

export async function build(kit) {
  const world = await kit.world("bench", benchWorld);
  const pose = { pos: [0.4, 3.1, -9.4], look: [0, 2.9, -0.8], fov: 40 };
  const camera = kit.camera(pose);
  const give = kit.beat("give");
  const liquid = kit.beat("liquid");
  const flow = kit.beads(world.box.path("condenser"), { distance: 8.6, color: "#F08A4B", glow: "#FFD2B0", start: 0, onTop: true });
  kit.group.add(flow.group);
  return {
    scene: world.scene,
    camera,
    hero: world.box.group,
    update(t) {
      world.box.update(t, { heat: 1 - 0.6 * kit.ease(kit.progress(t, liquid, 1), "inOut"), frost: 0.6 });
      kit.push(camera, t, { ...pose, amount: 1.2, dur: 4 });
      flow.update(t);
      kit.card({ title: "Dàn nóng", body: "Tỏa nhiệt ra phòng", at: give, hold: liquid - give - kit.frames(18) - 0.1, y: 440, width: 600 });
      kit.label({ text: "Ga hóa lỏng", at: liquid, hold: 1.4, y: 520 });
    },
  };
}
