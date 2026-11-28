// Vignette 16 (garbage_collect): Stale pages wait until garbage collection copies valid pages (#F59E0B)
// to another block, then erases the entire old block (#E879F9) for reuse.
// Exports nandMgmtWorld(kit) shared with wear_leveling.
import { controllerChip } from "./controller-chip/controller-chip.js";
import { nandChip } from "./nand-chip/nand-chip.js";

export function nandMgmtWorld(kit) {
  const scene = kit.stage({ yard: 10, clear: 6, seed: 21 });
  const ctrl = controllerChip(kit, { mode: "gc_wear" });
  ctrl.group.position.set(-1.35, 0, 0.05);
  scene.add(ctrl.group);

  const nand = nandChip(kit, { mode: "block_erase" });
  nand.group.position.set(1.05, 0, -0.05);
  scene.add(nand.group);

  return { scene, ctrl, nand };
}

export async function build(kit) {
  const world = await kit.world("nand_mgmt", nandMgmtWorld);
  const stale = kit.beat("stale");
  const copyValid = kit.beat("copy_valid");
  const eraseReclaim = kit.beat("erase_reclaim");

  // Flow beads copying valid pages from Block 0 to Block 1
  const copyFlow = kit.beads(
    [[0.69, 0.25, -0.41], [1.05, 0.42, -0.41], [1.41, 0.25, -0.41]],
    { distance: 4.5, fov: 38, color: "#F59E0B", glow: "#FFE099", start: copyValid - 0.3, end: eraseReclaim, onTop: true }
  );
  kit.group.add(copyFlow.group);

  const pose = { pos: [0.65, 3.65, 4.55], look: [0.85, 0.22, -0.1], fov: 38 };
  const camera = kit.camera(pose);

  kit.callout({
    text: "TRANG CŨ CHỜ DỌN",
    anchor: world.nand.anchors.block0,
    at: stale,
    hold: 3.8,
    gap: 220,
  });
  kit.callout({
    text: "CHÉP TRANG DÙNG",
    anchor: world.nand.anchors.block1,
    at: copyValid,
    hold: 4.2,
    gap: 220,
  });
  kit.callout({
    text: "XÓA KHỐI CŨ",
    anchor: world.nand.anchors.block0,
    at: eraseReclaim,
    hold: 1.8,
    gap: 220,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.nand.group, world.ctrl.group],
    update(t) {
      const reclaimed = t >= eraseReclaim + 0.5;
      world.ctrl.update(t, { mode: "gc_wear", sending: t >= copyValid - 0.3 });
      world.nand.update(t, {
        open: 1,
        hideLid: true,
        mode: t >= copyValid && !reclaimed ? "page_highlight" : "block_erase",
        activeBlock: t >= copyValid && t < eraseReclaim ? 1 : 0,
        activePage: 1,
        highlightPage: t >= copyValid && t < eraseReclaim,
        erasePulse: t >= eraseReclaim ? 1.0 : 0.2,
        litFraction: reclaimed ? 0.35 : 0.72,
      });

      copyFlow.update(t);
      kit.drift(camera, t, {
        from: pose,
        to: { pos: [0.95, 3.55, 4.35], look: [0.95, 0.22, -0.15], fov: 38 },
        start: copyValid - 0.4,
        dur: 4.5,
      });
    },
  };
}
