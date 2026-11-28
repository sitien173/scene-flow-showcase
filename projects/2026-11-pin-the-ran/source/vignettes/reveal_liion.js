// Sentences 6 to 8: the Li-ion cell cut open; the two electrodes, the liquid electrolyte between them,
// and the thin porous separator in the middle, each named on its beat.
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";
import { electrolyteMedium } from "./electrolyte-medium/electrolyte-medium.js";
import { labWorld, station, pose, put, track, ION, ENERGY, EM_OPTS } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("reveal_liion");
  const electrodes = kit.beat("electrodes");
  const electrolyte = kit.beat("electrolyte");
  const separator = kit.beat("separator");

  const cell = put(kit, cellCutaway(kit, { ionColor: ION, energyColor: ENERGY, openCutaway: 1.0, mode: "idle" }), st);
  const em = electrolyteMedium(kit, { ...EM_OPTS, showBlock: 0 });
  em.group.position.y = 0.05;
  cell.group.add(em.group);

  const full = pose(st, [0.3, 2.5, 9.2], [0, 1.2, 0]);
  const anode = pose(st, [-0.9, 1.9, 5.6], [-0.85, 0.95, 0]);
  const cathode = pose(st, [0.9, 1.9, 5.6], [0.85, 0.95, 0]);
  const mid = pose(st, [0.0, 2.2, 7.0], [0, 1.0, 0]);
  const sep = pose(st, [0.15, 1.6, 4.6], [0, 0.95, 0.2]);
  const keys = [
    { at: 0, pose: full },
    { at: electrodes - 0.4, pose: anode, dur: 1.0, ease: "stop" },
    { at: electrodes + 1.9, pose: cathode, dur: 1.0 },
    { at: electrolyte - 0.5, pose: mid, dur: 1.0, ease: "stop" },
    { at: electrolyte + 1.6, pose: pose(st, [-0.6, 2.0, 6.6], [0, 1.0, 0]), dur: 2.2, ease: "drift" },
    { at: separator - 0.6, pose: sep, dur: 1.0, ease: "stop" },
    { at: separator + 1.0, pose: pose(st, [0.6, 1.8, 5.2], [0, 0.95, 0.2]), dur: 2.4, ease: "drift" },
  ];
  const camera = kit.camera(full);

  // Overlays register once at setup; the stage draws them each frame.
  kit.callout({ text: "CỰC ÂM (-)", anchor: cell.anchors.anode, at: electrodes, hold: 1.8 });
  kit.callout({ text: "CỰC DƯƠNG (+)", anchor: cell.anchors.cathode, at: electrodes + 2.0, hold: 1.5 });
  kit.callout({ text: "ĐIỆN PHÂN LỎNG", anchor: em.anchors.center, at: electrolyte, hold: 3.0 });
  kit.callout({ text: "MÀNG NGĂN MỎNG", anchor: cell.anchors.separator, at: separator, hold: 3.0 });
  return {
    scene: world.scene,
    camera,
    hero: cell.group,
    update(t) {
      track(kit, camera, t, keys);
      cell.update(t, { openCutaway: 1, mode: "idle" });
      em.update(t, { showBlock: 0, flowDir: 0 });
    },
  };
}
