// Sentences 12 to 15: charging. The charger plugs in ("cắm sạc"), electrons run the outer wire to the anode,
// the electrolyte barrier blocks them ("chặn"), and Li+ ions cross the electrolyte ("xuyên").
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";
import { electrolyteMedium } from "./electrolyte-medium/electrolyte-medium.js";
import { externalCircuit } from "./external-circuit/external-circuit.js";
import { electronMarker } from "./electron-marker/electron-marker.js";
import { labWorld, station, pose, put, track, ramp, popScale, ION, ELECTRON, ENERGY, EM_OPTS } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("mech_charge");
  const chem = kit.beat("chem");
  const plug = kit.beat("plug");
  const blocked = kit.beat("blocked");
  const ionCross = kit.beat("ion_cross");

  const cell = put(kit, cellCutaway(kit, { ionColor: ION, energyColor: ENERGY, mode: "charge", chemGlow: 0.7 }), st);
  const em = electrolyteMedium(kit, { ...EM_OPTS, flowDir: -1, showBlock: 1 });
  em.group.position.y = 0.05;
  cell.group.add(em.group);
  const circuit = put(kit, externalCircuit(kit, { electronColor: ELECTRON, energyColor: ENERGY, mode: "charge", chargerPlug: 1 }), st, [0, 1.98, 0]);
  const marker = put(kit, electronMarker(kit, { electronColor: ELECTRON }), st, [-1.75, 2.2, 0.3], 0.45);

  const wide = pose(st, [0.4, 3.4, 12.2], [0, 2.0, 0]);
  const block = pose(st, [-0.3, 1.7, 5.4], [-0.15, 0.9, 0.2]);
  const keys = [
    { at: 0, pose: wide },
    { at: 0.2, pose: pose(st, [0.4, 4.4, 12.0], [0, 2.1, 0]), dur: 3.0, ease: "drift" },
    { at: plug + 1.5, pose: pose(st, [-1.4, 3.6, 10.6], [-0.4, 2.2, 0]), dur: 3.0, ease: "drift" },
    { at: blocked - 0.6, pose: block, dur: 1.1, ease: "stop" },
    { at: ionCross - 0.6, pose: pose(st, [0.2, 2.0, 7.2], [0, 1.0, 0]), dur: 1.0 },
    { at: ionCross + 1.0, pose: pose(st, [0.9, 2.4, 8.4], [0, 1.1, 0]), dur: 3.0, ease: "drift" },
  ];
  const camera = kit.camera(wide);

  // Overlays register once at setup; the stage draws them each frame.
  kit.card({ title: "SẠC PIN", body: "ĐIỆN NĂNG → HÓA NĂNG", at: chem, hold: 1.4, y: 470 });
  kit.callout({ text: "E- ĐI MẠCH NGOÀI", anchor: marker.anchors.electron, at: plug + 1.0, hold: 3.6 });
  kit.mark({ kind: "x", anchor: em.anchors.blockPlane, at: blocked, hold: 1.4 });
  kit.label({ text: "LI+ ĐI XUYÊN ĐIỆN PHÂN", at: ionCross, hold: 3.0, y: 560 });
  return {
    scene: world.scene,
    camera,
    hero: [cell.group, circuit.group],
    update(t) {
      track(kit, camera, t, keys);
      const plugged = ramp(kit, t, plug - 0.3, 0.6);
      circuit.update(t, { mode: plugged > 0.5 ? "charge" : "idle", chargerPlug: plugged });
      cell.update(t, { mode: plugged > 0.5 ? "charge" : "idle", chemGlow: 0.25 + 0.45 * ramp(kit, t, chem, 1.0) });
      em.update(t, { flowDir: plugged > 0.5 ? -1 : 0, showBlock: ramp(kit, t, blocked - 0.4, 0.5) });
      popScale(kit, marker.group, t, plug + 0.6, 0.45);
      marker.update(t, { mode: "marker", chargePulse: 0.35 });
    },
  };
}
