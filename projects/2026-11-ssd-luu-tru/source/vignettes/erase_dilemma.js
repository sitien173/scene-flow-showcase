// Vignette 12 (erase_dilemma): NAND erases by whole Block, not individual Page;
// raises the question of keeping neighboring valid data when editing part of a video.
import { nandArrayWorld } from "./page_block.js";

export async function build(kit) {
  const world = await kit.world("nand_array", nandArrayWorld);
  const pose = { pos: [-0.36, 2.75, 2.85], look: [-0.36, 0.2, -0.36], fov: 36 };
  const camera = kit.camera(pose);

  const eraseBlock = kit.beat("erase_block");
  const editQ = kit.beat("edit_q");

  kit.callout({
    text: "XÓA THEO KHỐI",
    anchor: world.nand.anchors.block0,
    at: eraseBlock,
    hold: 3.4,
    gap: 220,
  });
  kit.mark({
    kind: "x",
    anchor: world.nand.anchors.page0,
    at: eraseBlock + 0.45,
    hold: 2.3,
  });
  kit.label({
    text: "GIỮ TRANG BÊN CẠNH?",
    at: editQ,
    hold: 2.2,
    y: 490,
    size: 50,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.nand.group],
    update(t) {
      const pulse = kit.ease(kit.progress(t, eraseBlock - 0.3, 0.8), "out");
      world.set(t, {
        mode: "block_erase",
        activeBlock: 0,
        activePage: 0,
        highlightPage: false,
        erasePulse: 0.4 + 0.6 * pulse,
      });

      kit.push(camera, t, { ...pose, amount: 0.55, start: eraseBlock, dur: 4.5 });
    },
  };
}
