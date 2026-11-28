// Sentences 27 to 29: the solid layer opens the way to a lithium-metal anode ("lithium kim loại"),
// with over 10x the theoretical capacity of graphite, so a car could go farther ("đi xa hơn").
import { solidStateCellCutaway } from "./solid-state-cell-cutaway/solid-state-cell-cutaway.js";
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";
import { evCar } from "./ev-car/ev-car.js";
import { labWorld, station, pose, put, track, ION, ELECTRON, ELECTROLYTE, ENERGY } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("mech_limetal");
  const liMetal = kit.beat("li_metal");
  const tenX = kit.beat("ten_x");
  const range = kit.beat("range");

  const cell = put(kit, cellCutaway(kit, { ionColor: ION, energyColor: ENERGY, pureLithium: 0, chemGlow: 0.4 }), st, [-3.0, 0, -0.6], 0.7);
  const ss = put(kit, solidStateCellCutaway(kit, { electrolyteColor: ELECTROLYTE, ionColor: ION, energyColor: ENERGY, liMetalAnode: 1, chemGlow: 0.95, openCutaway: 1 }), st);
  const car = put(kit, evCar(kit, { energyColor: ENERGY, electronColor: ELECTRON }), st, [4.4, 0, -1.6], 1);

  const both = pose(st, [-1.0, 2.8, 10.4], [-1.2, 1.1, 0]);
  const anode = pose(st, [-1.2, 1.7, 5.0], [-0.8, 0.95, 0.15]);
  const carPose = pose(st, [3.2, 3.2, 10.4], [4.0, 1.0, -1.6]);
  const keys = [
    { at: 0, pose: both },
    { at: 0.4, pose: pose(st, [0.2, 2.6, 9.6], [-0.6, 1.1, 0]), dur: 2.4, ease: "drift" },
    { at: liMetal - 0.5, pose: anode, dur: 1.1, ease: "stop" },
    { at: liMetal + 1.2, pose: pose(st, [-0.2, 1.8, 5.2], [-0.7, 0.95, 0.15]), dur: 2.8, ease: "drift" },
    { at: tenX - 0.4, pose: pose(st, [0.4, 2.4, 8.4], [0, 1.0, 0]), dur: 1.0 },
    { at: tenX + 1.0, pose: pose(st, [1.2, 2.6, 8.6], [0, 1.0, 0]), dur: 2.8, ease: "drift" },
    { at: range - 0.8, pose: carPose, dur: 1.1, ease: "stop" },
  ];
  const camera = kit.camera(both);

  // Overlays register once at setup; the stage draws them each frame.
  kit.label({ text: "CỰC ÂM LITHIUM KIM LOẠI", at: liMetal, hold: 3.6, y: 560 });
  kit.bigText({ text: "> 10X LÝ THUYẾT", at: tenX, hold: 2.6, y: 600 });
  kit.callout({ text: "CÓ THỂ ĐI XA HƠN", anchor: car.anchors.roof, at: range, hold: 1.7 });
  return {
    scene: world.scene,
    camera,
    hero: [ss.group, car.group],
    update(t) {
      track(kit, camera, t, keys);
      cell.update(t, { openCutaway: 1, mode: "idle", pureLithium: 0, chemGlow: 0.4 });
      ss.update(t, { openCutaway: 1, mode: t >= liMetal - 0.5 ? "charge" : "idle", liMetalAnode: 1, chemGlow: 0.95 });
      car.update(t, { mode: t >= range - 0.8 ? "drive" : "idle", bayOpen: 1, batteryGlow: 0.95 });
    },
  };
}
