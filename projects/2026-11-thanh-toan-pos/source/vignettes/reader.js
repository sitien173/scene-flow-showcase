// r1a / reader: Close-up on the POS reader with cutaway top cover revealing the copper NFC coil.
import { cafeWorld } from "./tap.js";

export async function build(kit) {
  const world = await kit.world("cafe", cafeWorld);
  const from = { pos: [0.68, 2.28, 2.15], look: [0.35, 1.62, 0.12], fov: 34 };
  const to = { pos: [0.52, 2.12, 1.88], look: [0.35, 1.66, 0.08], fov: 33 };
  const camera = kit.camera(from);
  const posBeat = kit.beat("pos");
  kit.callout({
    text: "ĐẦU ĐỌC POS",
    anchor: world.pos.anchors.body,
    at: posBeat,
    hold: 1.3,
  });

  return {
    scene: world.scene,
    camera,
    hero: world.pos.group,
    update(t) {
      const cut = kit.ease(kit.progress(t, 0.6, 1.2), "out");
      world.set(t, {
        posCut: cut,
        posGlow: cut * 0.4,
        phoneVisible: false,
      });
      kit.drift(camera, t, { from, to, start: 0.4, dur: 2.8 });
    },
  };
}
