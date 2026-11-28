// Sentences 24 to 26: a liquid wets every pore, but a solid leaves tiny contact gaps at the electrode
// ("khe hở"), which resist the ions; packs need high stack pressure ("áp lực") to close them.
import { solidStateCellCutaway } from "./solid-state-cell-cutaway/solid-state-cell-cutaway.js";
import { electrolyteMedium } from "./electrolyte-medium/electrolyte-medium.js";
import { evCar } from "./ev-car/ev-car.js";
import { labWorld, station, pose, put, track, ramp, ION, ELECTRON, ELECTROLYTE, ENERGY, EM_OPTS } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("mech_contact");
  const gap = kit.beat("gap");
  const resist = kit.beat("resist");
  const pressure = kit.beat("pressure");

  const ss = put(kit, solidStateCellCutaway(kit, { electrolyteColor: ELECTROLYTE, ionColor: ION, energyColor: ENERGY, openCutaway: 1 }), st);
  const em = put(kit, electrolyteMedium(kit, { ...EM_OPTS, showBlock: 0 }), st, [-2.6, 0, 1.0], 0.55);
  const car = put(kit, evCar(kit, { energyColor: ENERGY, electronColor: ELECTRON }), st, [0.4, 0, -5.0], 1);

  const start = pose(st, [-0.8, 2.3, 8.6], [-0.8, 1.0, 0]);
  const iface = pose(st, [-0.45, 1.3, 3.6], [-0.44, 0.9, 0.28]);
  const wide = pose(st, [0.5, 4.2, 12.5], [0.2, 1.6, -1.5]);
  const keys = [
    { at: 0, pose: start },
    { at: 0.2, pose: pose(st, [-1.2, 2.0, 7.6], [-0.9, 0.9, 0.3]), dur: 2.6, ease: "drift" },
    { at: gap - 0.5, pose: iface, dur: 1.1, ease: "stop" },
    { at: gap + 1.4, pose: pose(st, [-0.2, 1.2, 3.2], [-0.44, 0.9, 0.28]), dur: 3.0, ease: "drift" },
    { at: resist + 1.2, pose: pose(st, [0.2, 2.0, 6.4], [0, 1.2, 0]), dur: 2.4, ease: "drift" },
    { at: pressure - 0.9, pose: wide, dur: 1.0, ease: "stop" },
  ];
  const camera = kit.camera(start);

  // Overlays register once at setup; the stage draws them each frame.
  kit.callout({ text: "KHE HỞ TIẾP XÚC", anchor: ss.anchors.interfaceLeft, at: gap, hold: 3.4 });
  kit.mark({ kind: "x", anchor: ss.anchors.interfaceLeft, at: resist, hold: 1.6 });
  kit.callout({ text: "ÉP ÁP LỰC CAO", anchor: ss.anchors.pressurePlate, at: pressure, hold: 1.1 });
  return {
    scene: world.scene,
    camera,
    hero: ss.group,
    update(t) {
      track(kit, camera, t, keys);
      const press = ramp(kit, t, pressure - 0.6, 0.7);
      ss.update(t, { openCutaway: 1, mode: "discharge", interfaceGap: 1 - 0.85 * press, stackPressure: press });
      em.update(t, { showBlock: 0, flowDir: 1 });
      car.update(t, { mode: "idle", bayOpen: 1, batteryGlow: 0.6 });
    },
  };
}
