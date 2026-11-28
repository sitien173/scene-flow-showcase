// Sentences 39 to 41: a high crane over the EV and a solid-state cell on show; planned dates only, from the IEA:
// Toyota targets 2028 at the latest; BYD plans first sales in 2027 and mass production around 2030.
import { evCar } from "./ev-car/ev-car.js";
import { solidStateCellCutaway } from "./solid-state-cell-cutaway/solid-state-cell-cutaway.js";
import { labWorld, station, pose, put, track, ION, ELECTRON, ELECTROLYTE, ENERGY } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("real_roadmap");
  const toyota = kit.beat("toyota");
  const bydFirst = kit.beat("byd_first");
  const bydMass = kit.beat("byd_mass");

  const car = put(kit, evCar(kit, { energyColor: ENERGY, electronColor: ELECTRON }), st, [0, 0, -1.2]);
  const ss = put(kit, solidStateCellCutaway(kit, { electrolyteColor: ELECTROLYTE, ionColor: ION, energyColor: ENERGY, openCutaway: 1 }), st, [0, 0, 2.4], 0.7);

  const low = pose(st, [1.6, 2.8, 11.6], [0, 0.8, 0.4]);
  const keys = [
    { at: 0, pose: low },
    { at: 0.3, pose: pose(st, [1.6, 6.2, 11.0], [0, 0.6, 0.4]), dur: 4.2, ease: "drift" },
    { at: bydFirst - 0.2, pose: pose(st, [-1.8, 6.0, 10.8], [0, 0.6, 0.4]), dur: 4.6, ease: "drift" },
    { at: bydMass - 0.6, pose: pose(st, [-0.6, 4.6, 9.4], [0, 0.6, 0.8]), dur: 2.4, ease: "drift" },
  ];
  const camera = kit.camera(low);

  // Overlays register once at setup; the stage draws them each frame.
  kit.card({ title: "TOYOTA (IEA)", body: "MỤC TIÊU MUỘN NHẤT 2028", at: toyota + 0.4, hold: 3.4, width: 700, y: 470 });
  kit.card({ title: "BYD (IEA)", body: "BÁN ĐẦU TIÊN 2027", at: bydFirst, hold: 2.6, width: 700, y: 470 });
  kit.card({ title: "BYD (IEA)", body: "HÀNG LOẠT DỰ KIẾN 2030", at: bydMass, hold: 2.0, width: 700, y: 470 });
  return {
    scene: world.scene,
    camera,
    hero: [car.group, ss.group],
    update(t) {
      track(kit, camera, t, keys);
      car.update(t, { mode: "idle", bayOpen: 1, batteryGlow: 0.7 });
      ss.update(t, { openCutaway: 1, mode: "idle" });
    },
  };
}
