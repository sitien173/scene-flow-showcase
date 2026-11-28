// Sentences 42 to 45: hard cut. One solid-state cell on a small test tray, the EV far behind; still unproven
// at scale ("chưa"), made in small amounts, complex and costly, and in 2024 not yet tested in mass production.
import { solidStateCellCutaway } from "./solid-state-cell-cutaway/solid-state-cell-cutaway.js";
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";
import { evCar } from "./ev-car/ev-car.js";
import { labWorld, station, pose, put, track, ION, ELECTRON, ELECTROLYTE, ENERGY, WARN } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const THREE = kit.THREE;
  const st = station("twist_scale");
  const unproven = kit.beat("unproven");
  const smallScale = kit.beat("small_scale");
  const cost = kit.beat("cost");
  const untested = kit.beat("untested");

  const tray = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.24, 1.6), kit.toon("#B4BCCB"));
  tray.position.set(st[0] + 0.6, 0.12, st[2] + 0.6);
  kit.ink(tray);
  kit.group.add(tray);
  const ss = put(kit, solidStateCellCutaway(kit, { electrolyteColor: ELECTROLYTE, ionColor: ION, energyColor: ENERGY, openCutaway: 1 }), st, [0.6, 0.24, 0.6], 0.7);
  const cell = put(kit, cellCutaway(kit, { ionColor: ION, energyColor: ENERGY, mode: "idle", openCutaway: 1 }), st, [-2.6, 0, -0.4], 0.6);
  const car = put(kit, evCar(kit, { energyColor: ENERGY, electronColor: ELECTRON }), st, [1.5, 0, -9.0], 1);

  const start = pose(st, [0.9, 2.4, 7.6], [0.6, 1.0, 0.6]);
  const keys = [
    { at: 0, pose: start },
    { at: 0.2, pose: pose(st, [0.5, 2.0, 6.4], [0.6, 0.9, 0.6]), dur: 3.6, ease: "drift" },
    { at: smallScale - 0.5, pose: pose(st, [1.6, 3.4, 9.0], [0.4, 0.8, 0.2]), dur: 1.1, ease: "stop" },
    { at: cost - 0.5, pose: pose(st, [-1.2, 2.6, 8.4], [-1.0, 0.9, 0.2]), dur: 1.2 },
    { at: cost + 1.4, pose: pose(st, [-0.4, 2.2, 7.4], [-1.0, 0.9, 0.2]), dur: 3.2, ease: "drift" },
    { at: untested - 1.4, pose: pose(st, [0.8, 1.8, 5.6], [0.6, 0.9, 0.6]), dur: 1.4, ease: "drift" },
  ];
  const camera = kit.camera(start);

  // Overlays register once at setup; the stage draws them each frame.
  kit.label({ text: "CHƯA CHỨNG MINH THỰC TẾ", at: unproven, hold: 3.8, y: 560, color: WARN });
  kit.callout({ text: "QUY MÔ NHỎ (IEA)", anchor: ss.anchors.body, at: smallScale, hold: 2.6 });
  kit.label({ text: "PHỨC TẠP & TỐN KÉM", at: cost, hold: 3.6, y: 560 });
  kit.label({ text: "2024: CHƯA THỬ HÀNG LOẠT", at: untested, hold: 1.0, y: 560 });
  return {
    scene: world.scene,
    camera,
    hero: ss.group,
    update(t) {
      track(kit, camera, t, keys);
      ss.update(t, { openCutaway: 1, mode: "idle" });
      cell.update(t, { openCutaway: 1, mode: "idle" });
      car.update(t, { mode: "idle", bayOpen: 0.4, batteryGlow: 0.3 });
    },
  };
}
