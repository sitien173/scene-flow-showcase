// Sentences 37 to 38: the EV at a charger; ions hop fast through the solid lattice ("sạc nhanh"),
// named as a potential advantage, with the US DOE as the source.
import { evCar } from "./ev-car/ev-car.js";
import { externalCircuit } from "./external-circuit/external-circuit.js";
import { solidStateCellCutaway } from "./solid-state-cell-cutaway/solid-state-cell-cutaway.js";
import { labWorld, station, pose, put, track, ION, ELECTRON, ELECTROLYTE, ENERGY } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("real_fast");
  const advantage = kit.beat("advantage");
  const doe = kit.beat("doe");

  const car = put(kit, evCar(kit, { energyColor: ENERGY, electronColor: ELECTRON }), st, [0.6, 0, -1.6]);
  const charger = put(kit, externalCircuit(kit, { electronColor: ELECTRON, energyColor: ENERGY, mode: "charge", chargerPlug: 1 }), st, [-2.9, 0, -1.0], 0.9, Math.PI / 2);
  const ss = put(kit, solidStateCellCutaway(kit, { electrolyteColor: ELECTROLYTE, ionColor: ION, energyColor: ENERGY, mode: "vacancyHop", openCutaway: 1 }), st, [0.2, 0, 2.4], 0.65);

  const station0 = pose(st, [-1.2, 3.0, 10.4], [-1.0, 1.2, -1.2]);
  const lattice = pose(st, [0.3, 1.3, 4.6], [0.2, 0.6, 2.5]);
  const keys = [
    { at: 0, pose: station0 },
    { at: 0.3, pose: pose(st, [0.4, 3.2, 10.8], [-0.4, 1.2, -1.0]), dur: 2.0, ease: "drift" },
    { at: advantage - 1.0, pose: lattice, dur: 1.2, ease: "stop" },
    { at: advantage + 0.6, pose: pose(st, [-0.3, 1.1, 3.8], [0.2, 0.58, 2.5]), dur: 3.6, ease: "drift" },
    { at: doe + 2.0, pose: pose(st, [0.6, 1.5, 5.0], [0.2, 0.6, 2.5]), dur: 2.4, ease: "drift" },
  ];
  const camera = kit.camera(station0);

  // Overlays register once at setup; the stage draws them each frame.
  kit.label({ text: "TIỀM NĂNG SẠC NHANH", at: advantage, hold: 1.0, y: 560 });
  kit.label({ text: "BỘ NĂNG LƯỢNG MỸ (DOE)", at: doe, hold: 4.4, y: 560 });
  return {
    scene: world.scene,
    camera,
    hero: [car.group, ss.group],
    update(t) {
      track(kit, camera, t, keys);
      car.update(t, { mode: "charge", bayOpen: 1, batteryGlow: 0.9, chargerPlug: 1 });
      charger.update(t, { mode: "charge", chargerPlug: 1 });
      ss.update(t, { openCutaway: 1, mode: "vacancyHop" });
    },
  };
}
