// Vignette 17 (wear_leveling): Each block tolerates finite program/erase cycles;
// controller spreads writes/erases across blocks to prevent early localized wear (no cycle count stated).
import { nandMgmtWorld } from "./garbage_collect.js";

export async function build(kit) {
  const world = await kit.world("nand_mgmt", nandMgmtWorld);
  const pose = { pos: [-0.15, 5.1, 6.0], look: [-0.15, 0.25, 0.0], fov: 39 };
  const camera = kit.camera(pose);

  const limitPe = kit.beat("limit_pe");
  const spread = kit.beat("spread");

  const spreadFlow = kit.beads(
    [[-1.35, 0.30, 0.05], [-0.1, 0.35, 0.0], [1.05, 0.28, -0.05]],
    { distance: 5.5, fov: 38, color: "#E879F9", glow: "#F5C2FF", start: spread - 0.3, end: 8.8, onTop: true }
  );
  kit.group.add(spreadFlow.group);

  kit.callout({
    text: "HẠN MỨC GHI-XÓA",
    anchor: world.nand.anchors.wearMeter,
    at: limitPe - 0.5,
    hold: 1.8,
    gap: 220,
  });
  kit.callout({
    text: "PHÂN TÁN ĐỀU",
    anchor: world.ctrl.anchors.gcRouter,
    at: spread,
    hold: 3.4,
    gap: 220,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.nand.group, world.ctrl.group],
    update(t) {
      const wSpread = kit.ease(kit.progress(t, spread, 2.2), "inOut");
      world.ctrl.update(t, { mode: "gc_wear", sending: t >= spread - 0.3 });
      world.nand.update(t, {
        open: 1,
        hideLid: true,
        mode: "multi_block_wear",
        wearMode: true,
        wearSpread: wSpread,
      });

      spreadFlow.update(t);
      kit.push(camera, t, { ...pose, amount: 0.5, start: 1.2, dur: 5.0 });
    },
  };
}
