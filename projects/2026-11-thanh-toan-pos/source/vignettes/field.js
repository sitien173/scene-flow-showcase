// r1b / field: POS coil emits the #FCD53E electromagnetic field zone around the tap pad.
import { cafeWorld } from "./tap.js";

export async function build(kit) {
  const world = await kit.world("cafe", cafeWorld);
  const from = { pos: [0.55, 1.98, 2.02], look: [0.35, 1.72, 0.08], fov: 34 };
  const to = { pos: [0.42, 1.92, 1.86], look: [0.35, 1.74, 0.08], fov: 34 };
  const camera = kit.camera(from);
  const emBeat = kit.beat("em_field");
  kit.callout({
    text: "TRƯỜNG ĐIỆN TỪ",
    anchor: world.field.anchors.top,
    at: emBeat,
    hold: 1.8,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.pos.group, world.field.group],
    update(t) {
      const em = kit.ease(kit.progress(t, Math.max(0, emBeat - 0.25), 0.7), "out");
      world.set(t, {
        posCut: 0.9,
        posGlow: 0.5 + 0.5 * em,
        phoneVisible: false,
        fieldIntensity: em,
        fieldScale: 0.8 + 0.25 * em,
      });
      kit.drift(camera, t, { from, to, start: 0.3, dur: 3.0 });
    },
  };
}
