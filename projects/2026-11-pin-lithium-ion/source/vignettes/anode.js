// Vignette 5 (anode, sentences 11-12): occlude pass-through back to main cell-cutaway;
// close-up on layered graphite carbon sheets in the anode holding purple Li+ ions at 100% charge.
import { mainWorld } from "./hook.js";

export async function build(kit) {
  const world = await kit.world("main", mainWorld);
  const startPose = { pos: [-0.80, 1.10, 4.4], look: [-0.72, 0.90, 0], fov: 40 };
  const endPose = { pos: [-0.50, 1.18, 4.0], look: [-0.72, 0.90, 0], fov: 40 };
  const camera = kit.camera(startPose);
  const charged = kit.beat("charged");
  const graphite = kit.beat("graphite");
  const cardAt = Math.max(charged, 0.9);
  kit.card({ title: "PIN ĐẦY · 100%", body: "ION NẰM Ở CỰC ÂM", at: cardAt, hold: 4.5, y: 450, width: 580 });
  kit.callout({ text: "THAN CHÌ (CARBON)", anchor: world.cell.anchors.anode, at: graphite, hold: 1.1 });

  return {
    scene: world.scene,
    camera,
    hero: world.cell.group,
    update(t) {
      world.set(t, {
        deskCutaway: 1,
        cellState: { openCutaway: 1, mode: "idle", soc: 1.0, showIons: true },
        electrolyteVisible: true,
        electrolyteState: { fill: 1, flowDir: 0, showBlock: 0, showIons: false },
        circuitVisible: false,
        topPhoneVisible: false,
      });

      kit.drift(camera, t, { from: startPose, to: endPose, start: 0.9, dur: 6.2 });
    },
  };
}
