// Sentences 16 to 19: a Li atom splits into Li+ and e- ("dấu cộng"); the two flows balance the charge;
// on charging Li+ slips between graphite layers; driving reverses both flows into the motor.
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";
import { externalCircuit } from "./external-circuit/external-circuit.js";
import { electronMarker } from "./electron-marker/electron-marker.js";
import { evCar } from "./ev-car/ev-car.js";
import { labWorld, station, pose, put, track, ramp, ION, ELECTRON, ENERGY } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("mech_discharge");
  const chargePlus = kit.beat("charge_plus");
  const balance = kit.beat("balance");
  const graphite = kit.beat("graphite");
  const reverse = kit.beat("reverse");

  const marker = put(kit, electronMarker(kit, { electronColor: ELECTRON }), st, [-3.2, 0.9, 2.6], 1);
  const cell = put(kit, cellCutaway(kit, { ionColor: ION, energyColor: ENERGY, mode: "discharge", chemGlow: 0.5 }), st);
  const circuit = put(kit, externalCircuit(kit, { electronColor: ELECTRON, energyColor: ENERGY, mode: "discharge", chargerPlug: 0 }), st, [0, 1.98, 0]);
  const car = put(kit, evCar(kit, { energyColor: ENERGY, electronColor: ELECTRON }), st, [4.6, 0, -1.2], 0.9);

  const atom = pose(st, [-3.0, 1.9, 6.4], [-3.2, 1.4, 2.6]);
  const mid = pose(st, [0.4, 3.4, 12.2], [0, 2.0, 0]);
  const anode = pose(st, [-0.9, 1.9, 5.6], [-0.85, 0.95, 0]);
  const carPose = pose(st, [3.6, 3.0, 9.6], [3.6, 1.0, -0.6]);
  const keys = [
    { at: 0, pose: atom },
    { at: 0.3, pose: pose(st, [-3.1, 1.7, 5.4], [-3.2, 1.4, 2.6]), dur: 3.4, ease: "drift" },
    { at: balance - 1.4, pose: mid, dur: 1.2, ease: "stop" },
    { at: balance + 0.6, pose: pose(st, [1.3, 3.8, 12.0], [0, 2.0, 0]), dur: 4.4, ease: "drift" },
    { at: graphite - 0.6, pose: anode, dur: 1.0, ease: "stop" },
    { at: reverse - 0.4, pose: carPose, dur: 1.2, ease: "inOut" },
    { at: reverse + 1.0, pose: pose(st, [2.4, 2.8, 10.2], [3.4, 1.0, -0.6]), dur: 2.6, ease: "drift" },
  ];
  const camera = kit.camera(atom);

  // Overlays register once at setup; the stage draws them each frame.
  kit.bigText({ text: "LI+ (+)", at: chargePlus, hold: 2.2, y: 600 });
  kit.callout({ text: "VÀO GRAPHITE", anchor: cell.anchors.anode, at: graphite, hold: 1.9 });
  kit.label({ text: "XẢ ĐIỆN → ĐỘNG CƠ", at: reverse, hold: 3.4, y: 560 });
  return {
    scene: world.scene,
    camera,
    hero: [marker.group, cell.group],
    update(t) {
      track(kit, camera, t, keys);
      marker.update(t, { mode: "split", split: ramp(kit, t, chargePlus - 1.2, 1.0), chargePulse: 0.35 });
      const charging = t >= graphite - 1.0 && t < reverse;
      cell.update(t, { mode: charging ? "charge" : "discharge", chemGlow: 0.5 });
      circuit.update(t, { mode: charging ? "charge" : "discharge", chargerPlug: 0 });
      car.update(t, { mode: t >= reverse ? "drive" : "idle", bayOpen: 1, batteryGlow: 0.8 });
    },
  };
}
