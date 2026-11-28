// Vignette 4 (cell_trap): Zoom into NAND chip array of memory cells, then close-up vertical cutaway
// of an illustrative memory cell trapping #22D3EE electrons between insulating layers.
import { nandChip } from "./nand-chip/nand-chip.js";
import { memoryCell } from "./memory-cell/memory-cell.js";

export async function build(kit) {
  const world = await kit.world("cell_trap", k => {
    const scene = k.stage({ yard: 9, clear: 6, seed: 19 });
    const nand = nandChip(k, { mode: "page_highlight" });
    nand.group.position.set(-1.7, 0.0, -1.6);
    scene.add(nand.group);

    const cell = memoryCell(k, { mode: "trapped_charge" });
    cell.group.position.set(1.5, 0.0, 0.4);
    scene.add(cell.group);

    return { scene, nand, cell };
  });

  const fromPose = { pos: [-1.7, 3.2, 2.2], look: [-1.7, 0.25, -1.6], fov: 38 };
  const toPose = { pos: [1.62, 1.48, 5.55], look: [1.62, 0.78, 0.4], fov: 37 };
  const camera = kit.camera(fromPose);

  const cells = kit.beat("cells");
  const trap = kit.beat("trap");
  const keep = kit.beat("keep");

  kit.callout({
    text: "MẢNG Ô NHỚ",
    anchor: world.nand.anchors.die,
    at: 1.0,
    hold: 2.6,
    gap: 220,
  });
  kit.label({
    text: "MÔ HÌNH Ô MINH HỌA",
    at: trap - 0.6,
    hold: 6.8,
    y: 485,
    size: 46,
  });
  kit.callout({
    text: "LỚP GIỮ ELECTRON",
    anchor: world.cell.anchors.chargeTrap,
    at: trap,
    hold: 3.1,
    gap: 230,
  });
  kit.callout({
    text: "LỚP CÁCH ĐIỆN",
    anchor: world.cell.anchors.lowerInsulator,
    at: keep,
    hold: 2.5,
    gap: 260,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.nand.group, world.cell.group],
    update(t) {
      const lidLift = kit.ease(kit.progress(t, 0.4, 1.4), "inOut");
      world.nand.update(t, { open: lidLift, activeBlock: 1, activePage: 2, highlightPage: t >= cells });
      world.cell.update(t, {
        mode: "trapped_charge",
        charge: 0.75,
        gateGlow: t >= trap ? 0.35 : 0.0,
        showGauge: false,
      });

      const zoomStart = cells + 0.4;
      if (t < zoomStart) {
        kit.drift(camera, t, {
          from: fromPose,
          to: { pos: [-1.6, 2.8, 1.8], look: [-1.7, 0.25, -1.6], fov: 37 },
          start: 0.9,
          dur: Math.max(1.2, zoomStart - 0.9),
        });
      } else if (t < trap + 0.4) {
        kit.fly(camera, t, {
          from: { pos: [-1.6, 2.8, 1.8], look: [-1.7, 0.25, -1.6], fov: 37 },
          to: toPose,
          start: zoomStart,
          dur: Math.max(1.2, trap + 0.2 - zoomStart),
          ease: "stop",
          arc: 0.4,
        });
      } else {
        kit.push(camera, t, { ...toPose, amount: 0.55, start: trap + 0.4, dur: 4.8 });
      }
    },
  };
}
