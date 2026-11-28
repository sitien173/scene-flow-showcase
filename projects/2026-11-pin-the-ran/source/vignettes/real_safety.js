// Sentences 33 to 36: back on the street with the EV; semi-solid cells still hold some liquid, all-solid
// cells hold none ("không rò rỉ"); many solid electrolytes do not burn ("an toàn").
import { evCar } from "./ev-car/ev-car.js";
import { solidStateCellCutaway } from "./solid-state-cell-cutaway/solid-state-cell-cutaway.js";
import { electrolyteMedium } from "./electrolyte-medium/electrolyte-medium.js";
import { labWorld, station, pose, put, track, ION, ELECTRON, ELECTROLYTE, ENERGY, EM_OPTS } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("real_safety");
  const semiVsAll = kit.beat("semi_vs_all");
  const noLeak = kit.beat("no_leak");
  const safe = kit.beat("safe");

  const car = put(kit, evCar(kit, { energyColor: ENERGY, electronColor: ELECTRON }), st, [0, 0, -1.5]);
  const em = put(kit, electrolyteMedium(kit, { ...EM_OPTS, fill: 0.45, showBlock: 0 }), st, [-1.15, 0, 2.6], 0.75);
  const ss = put(kit, solidStateCellCutaway(kit, { electrolyteColor: ELECTROLYTE, ionColor: ION, energyColor: ENERGY, openCutaway: 1 }), st, [1.25, 0, 2.6], 0.6);

  const street = pose(st, [4.4, 3.2, 10.6], [0, 1.1, -1.5]);
  const pair = pose(st, [0.1, 2.2, 9.0], [0.05, 0.9, 2.6]);
  const solid = pose(st, [1.4, 1.6, 6.0], [1.25, 0.65, 2.6]);
  const keys = [
    { at: 0, pose: street },
    { at: 0.3, pose: pose(st, [1.2, 3.6, 11.4], [0, 1.1, -1.5]), dur: 3.0, ease: "drift" },
    { at: 3.4, pose: pose(st, [-2.6, 3.2, 10.6], [0, 1.1, -1.5]), dur: 2.4, ease: "drift" },
    { at: semiVsAll - 0.7, pose: pair, dur: 1.1, ease: "stop" },
    { at: semiVsAll + 1.4, pose: pose(st, [-0.6, 2.0, 8.4], [0.05, 0.9, 2.6]), dur: 3.2, ease: "drift" },
    { at: noLeak - 0.6, pose: solid, dur: 1.1, ease: "stop" },
    { at: noLeak + 1.2, pose: pose(st, [0.9, 1.5, 5.2], [1.25, 0.65, 2.6]), dur: 3.0, ease: "drift" },
  ];
  const camera = kit.camera(street);

  // Overlays register once at setup; the stage draws them each frame.
  kit.card({ title: "SO SÁNH", body: "BÁN THỂ RẮN vs TOÀN PHẦN", at: semiVsAll, hold: 3.6, width: 700, y: 470 });
  kit.callout({ text: "KHÔNG RÒ RỈ LỎNG", anchor: ss.anchors.body, at: noLeak, hold: 3.2 });
  kit.label({ text: "NHIỀU CHẤT RẮN KHÔNG BẮT LỬA", at: safe, hold: 1.0, y: 560 });
  return {
    scene: world.scene,
    camera,
    hero: [car.group, ss.group],
    update(t) {
      track(kit, camera, t, keys);
      car.update(t, { mode: "idle", bayOpen: 1, batteryGlow: 0.9 });
      em.update(t, { fill: 0.45, showBlock: 0, flowDir: 0 });
      ss.update(t, { openCutaway: 1, mode: "idle" });
    },
  };
}
