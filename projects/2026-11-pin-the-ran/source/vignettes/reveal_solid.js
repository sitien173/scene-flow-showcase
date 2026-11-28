// Sentences 9 to 11: fly from the Li-ion cell to the solid-state cell beside it; the solid electrolyte fills
// the gap between the electrodes and is also the separator; then push into the core.
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";
import { solidStateCellCutaway } from "./solid-state-cell-cutaway/solid-state-cell-cutaway.js";
import { labWorld, station, pose, put, track, ION, ELECTROLYTE, ENERGY } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("reveal_solid");
  const solidLayer = kit.beat("solid_layer");
  const dualRole = kit.beat("dual_role");
  const zoomIn = kit.beat("zoom_in");

  const cell = put(kit, cellCutaway(kit, { ionColor: ION, energyColor: ENERGY, openCutaway: 1.0, mode: "idle" }), st, [-3.4, 0, 0]);
  const ss = put(kit, solidStateCellCutaway(kit, { electrolyteColor: ELECTROLYTE, ionColor: ION, energyColor: ENERGY, openCutaway: 1.0 }), st);

  const onCell = pose(st, [-3.1, 2.5, 9.2], [-3.4, 1.2, 0]);
  const onSolid = pose(st, [0.3, 2.5, 9.2], [0, 1.2, 0]);
  const core = pose(st, [0.1, 1.6, 4.6], [0, 0.95, 0.2]);
  const keys = [
    { at: 0, pose: onCell },
    { at: 0.9, pose: onSolid, dur: 1.2, ease: "stop" },
    { at: dualRole + 0.4, pose: pose(st, [-0.5, 2.2, 8.0], [0, 1.1, 0]), dur: 3.0, ease: "drift" },
    { at: zoomIn - 0.3, pose: core, dur: 1.2, ease: "drift" },
  ];
  const camera = kit.camera(onCell);

  // Overlays register once at setup; the stage draws them each frame.
  kit.callout({ text: "ĐIỆN PHÂN RẮN", anchor: ss.anchors.electrolyte, at: solidLayer, hold: 1.7 });
  kit.label({ text: "KHÔNG CẦN MÀNG NGĂN RIÊNG", at: dualRole, hold: 3.6, y: 560 });
  return {
    scene: world.scene,
    camera,
    hero: ss.group,
    update(t) {
      track(kit, camera, t, keys);
      cell.update(t, { openCutaway: 1, mode: "idle" });
      ss.update(t, { openCutaway: 1, mode: "idle" });
    },
  };
}
