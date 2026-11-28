// a3 / blue_circle: Close-up on smartphone GPS map; light-blue accuracy halo expands when uncertain
// and shrinks as estimate tightens, remaining an estimate rather than absolute certainty.
import { streetWorld } from "./hook_dot.js";

export async function build(kit) {
  const world = await kit.world("street", streetWorld);

  const p0 = { pos: [0.0, 1.56, 2.35], look: [0.0, 1.46, 0.02], fov: 36 };
  const p1 = { pos: [0.0, 1.50, 2.15], look: [0.0, 1.44, 0.02], fov: 35 };
  const camera = kit.camera(p0);

  const haloRing = kit.beat("halo_ring");
  const shrink = kit.beat("shrink");

  kit.callout({
    text: "VÒNG XANH NHẠT",
    anchor: world.phone.anchors.blueDot,
    at: haloRing,
    hold: shrink - haloRing - 0.35,
  });
  kit.label({
    text: "ƯỚC TÍNH VỊ TRÍ",
    at: shrink,
    hold: 3.2,
    y: 505,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.phone.group],
    update(t) {
      const expand = kit.ease(kit.progress(t, haloRing - 0.2, 0.7), "out");
      const tighten = kit.ease(kit.progress(t, shrink, 1.4), "inOut");
      const radius = kit.lerp(0.32, 0.98, expand) * kit.lerp(1.0, 0.32, tighten);

      world.set(t, {
        phonePos: [0, 1.35, 0],
        phoneRot: [0.95, 0, 0],
        dotPulse: 1,
        haloRadius: radius,
        canyon: 0,
      });

      kit.drift(camera, t, { from: p0, to: p1, start: 0.7, dur: 6.5 });
    },
  };
}
