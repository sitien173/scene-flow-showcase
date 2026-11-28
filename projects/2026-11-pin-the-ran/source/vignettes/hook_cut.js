// Sentences 3 to 5: the Li-ion cell with its flammable liquid ("bắt lửa"), the solid-state cell slides in
// beside it ("pin thể rắn"), and both front covers open fully for the cut ("cắt đôi").
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";
import { electrolyteMedium } from "./electrolyte-medium/electrolyte-medium.js";
import { solidStateCellCutaway } from "./solid-state-cell-cutaway/solid-state-cell-cutaway.js";
import { labWorld, station, pose, put, track, ramp, ION, ELECTROLYTE, ENERGY, WARN, EM_OPTS } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("hook_cut");
  const flame = kit.beat("flame");
  const solid = kit.beat("solid");
  const slice = kit.beat("slice");

  const cell = put(kit, cellCutaway(kit, { ionColor: ION, energyColor: ENERGY, openCutaway: 0.5, mode: "idle" }), st, [-1.7, 0, 0]);
  const em = electrolyteMedium(kit, { ...EM_OPTS, showBlock: 0 });
  em.group.position.y = 0.05;
  cell.group.add(em.group);
  const ss = put(kit, solidStateCellCutaway(kit, { electrolyteColor: ELECTROLYTE, ionColor: ION, energyColor: ENERGY, openCutaway: 0.5 }), st, [1.7, 0, 0]);

  const closeCell = pose(st, [-1.2, 2.4, 8.6], [-1.7, 1.25, 0]);
  const both = pose(st, [0.4, 3.6, 15.5], [0, 1.6, 0]);
  const keys = [
    { at: 0, pose: closeCell },
    { at: flame + 0.6, pose: pose(st, [-1.9, 2.2, 7.8], [-1.6, 1.15, 0]), dur: 2.6, ease: "drift" },
    { at: solid - 0.9, pose: both, dur: 1.2, ease: "stop" },
    { at: slice, pose: pose(st, [-1.6, 3.4, 15.3], [0, 1.5, 0]), dur: 3.6, ease: "drift" },
  ];
  const camera = kit.camera(closeCell);

  // Overlays register once at setup; the stage draws them each frame.
  kit.label({ text: "DUNG MÔI DỄ CHÁY", at: flame, hold: 3.2, y: 560, color: WARN });
  kit.callout({ text: "PIN THỂ RẮN", anchor: ss.anchors.body, at: solid + 0.2, hold: 2.6 });
  return {
    scene: world.scene,
    camera,
    hero: [cell.group, ss.group],
    update(t) {
      track(kit, camera, t, keys);
      const slide = ramp(kit, t, solid - 0.9, 1.1);
      ss.group.position.x = st[0] + 1.7 + (1 - slide) * 6;
      ss.group.visible = slide > 0.001;
      const open = 0.5 + 0.5 * ramp(kit, t, slice + 0.2, 1.0);
      cell.update(t, { openCutaway: open, mode: "idle" });
      em.update(t, { showBlock: 0, flowDir: 0 });
      ss.update(t, { openCutaway: open, mode: "idle" });
    },
  };
}
