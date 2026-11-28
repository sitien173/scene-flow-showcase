// Vignette 7 (separator, sentences 16-18): close-up on separator micro-pores letting purple Li+
// pass through teal electrolyte while blocking yellow e- electrons from short-circuiting.
import { mainWorld } from "./hook.js";

export async function build(kit) {
  const world = await kit.world("main", mainWorld);
  const startPose = { pos: [0.18, 1.15, 4.6], look: [0.05, 0.92, 0], fov: 40 };
  const camera = kit.camera(startPose);
  const pores = kit.beat("pores");
  const blocked = kit.beat("blocked");
  kit.callout({ text: "LỖ SIÊU NHỎ", anchor: world.cell.anchors.separator, at: pores, hold: 4.0 });
  kit.mark({ kind: "x", anchor: world.electrolyte.anchors.blockPlane, at: blocked, hold: 2.2 });

  return {
    scene: world.scene,
    camera,
    hero: [world.cell.group, world.electrolyte.group],
    update(t) {
      const showBlock = kit.ease(kit.progress(t, blocked - 2.2, 1.8), "inOut");
      world.set(t, {
        deskCutaway: 1,
        cellState: { openCutaway: 1, mode: "discharge", soc: 0.5, showIons: true },
        electrolyteVisible: true,
        electrolyteState: { fill: 1, flowDir: 1, showBlock, showIons: true },
        circuitVisible: true,
        circuitState: { mode: "discharge", chipGlow: 0.85, loadGlow: 0.9, chargerPlug: 0 },
        topPhoneVisible: true,
        topPhoneState: { cardPulse: 1, coilGlow: 1 },
      });

      kit.push(camera, t, { ...startPose, amount: 0.95, start: 0.9, dur: 5.5, ease: "drift" });
    },
  };
}
