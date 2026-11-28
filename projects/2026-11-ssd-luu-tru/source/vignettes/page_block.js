// Vignette 11 (page_block): Film data spans many cells; NAND normally reads/writes by Page
// and groups multiple Pages into a Block. Exports nandArrayWorld(kit) shared with erase_dilemma.
import { nandChip } from "./nand-chip/nand-chip.js";
import { memoryCell } from "./memory-cell/memory-cell.js";

export function nandArrayWorld(kit) {
  const scene = kit.stage({ yard: 9, clear: 6, seed: 13 });
  const nand = nandChip(kit, { mode: "page_highlight" });
  nand.group.position.set(0, 0, 0);
  scene.add(nand.group);

  function set(t, opts = {}) {
    nand.update(t, { open: 1, hideLid: true, ...opts });
  }
  return { scene, nand, set };
}

export async function build(kit) {
  const world = await kit.world("nand_array", nandArrayWorld);
  const cell = memoryCell(kit, { mode: "trapped_charge" });
  cell.group.scale.setScalar(0.45);
  cell.group.position.set(-1.45, 0, 0.55);
  kit.group.add(cell.group);

  const fromPose = { pos: [-0.3, 3.2, 4.9], look: [-0.25, 0.25, 0.05], fov: 38 };
  const toPose = { pos: [0.25, 4.1, 4.8], look: [0.05, 0.2, -0.05], fov: 38 };
  const camera = kit.camera(fromPose);

  const pageRead = kit.beat("page_read");
  const blockGroup = kit.beat("block_group");

  kit.callout({
    text: "TRANG (PAGE)",
    anchor: world.nand.anchors.page0,
    at: pageRead,
    hold: 3.8,
    gap: 220,
  });
  kit.callout({
    text: "KHỐI (BLOCK)",
    anchor: world.nand.anchors.block1,
    at: blockGroup,
    hold: 1.4,
    gap: 220,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.nand.group, cell.group],
    update(t) {
      cell.update(t, { mode: "trapped_charge", charge: 0.72, showGauge: false });
      const showBlock = t >= blockGroup - 0.5;
      world.set(t, {
        mode: showBlock ? "block_erase" : "page_highlight",
        activeBlock: showBlock ? 1 : 0,
        activePage: 1,
        highlightPage: t >= pageRead - 0.4,
        erasePulse: showBlock ? 0.6 : 0,
      });

      kit.fly(camera, t, {
        from: fromPose,
        to: toPose,
        start: pageRead + 0.5,
        dur: Math.max(1.4, blockGroup - pageRead),
        ease: "inOut",
      });
    },
  };
}
