// Vignette 2 (power_off): Data packet enters SSD, external power turns off to night,
// while stored #F59E0B bit states persist inside NAND chips.
import { deskWorld } from "./hook.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const camera = kit.camera({ pos: [0.22, 3.85, 7.36], look: [0.0, 0.72, 0.0], fov: 38 });
  const save = kit.beat("save");
  const hold = kit.beat("hold");

  kit.callout({
    text: "TẮT NGUỒN",
    anchor: world.ssd.anchors.body,
    at: save,
    hold: 3.0,
    gap: 240,
  });
  kit.callout({
    text: "GIỮ DỮ LIỆU?",
    anchor: world.ssd.anchors.nandCluster,
    at: hold,
    hold: 1.7,
    gap: 240,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.ssd.group],
    update(t) {
      const enter = kit.ease(kit.progress(t, 0.0, save), "inOut");
      const off = kit.ease(kit.progress(t, save, 1.0), "inOut");
      const wake = kit.ease(kit.progress(t, hold, 1.4), "inOut");

      const pktVis = enter < 0.96;
      world.set(t, {
        ssdMode: "powered_off",
        cutaway: 0.85,
        power: kit.clamp01(1 - off + 0.65 * wake),
        circuit: 0.15 * wake,
        nandGlow: 0.65 + 0.25 * wake,
        ctrlGlow: 0.4 * (1 - off) + 0.35 * wake,
        hostGlow: 0.8 * (1 - off) + 0.4 * wake,
        pktVisible: pktVis,
        pktPos: [
          kit.lerp(-0.55, 0.55, enter),
          kit.lerp(0.26, 0.20, enter),
          kit.lerp(0.92, 0.68, enter),
        ],
        pktPulse: 0.85,
      });

      kit.orbit(camera, t, { center: [0.0, 0.65, 0.0], radius: 7.36, height: 3.2, angle: 0.03, speed: 0.14, fov: 38 });
    },
  };
}
