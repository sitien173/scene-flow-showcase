// Sentences 1 to 2: the opening crane onto an EV on the street; "sạc nhanh" names the question,
// "chất lỏng" pushes into the battery bay and pops a Li-ion cell with its liquid electrolyte.
// This module also exports the shared lab world and the small helpers every EP11 vignette uses.
// Each vignette owns one station on a 4 x 4 grid, so a move flies between stations in one world.
import { evCar } from "./ev-car/ev-car.js";
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";
import { electrolyteMedium } from "./electrolyte-medium/electrolyte-medium.js";

// Fixed colour roles of EP11.
export const ION = "#F2A541";
export const ELECTRON = "#00B4D8";
export const ELECTROLYTE = "#8FA3B8";
export const ENERGY = "#E4572E";
export const WARN = "#DD3428";
export const EM_OPTS = { tealColor: ELECTROLYTE, deepTeal: "#64798F", foamTeal: "#B4C4D4", ionColor: ION, electronColor: ELECTRON };

const ORDER = ["hook_ev", "hook_cut", "reveal_liion", "reveal_solid", "mech_charge", "mech_discharge", "mech_hop", "mech_contact",
  "mech_limetal", "mech_dendrite", "real_safety", "real_fast", "real_roadmap", "twist_scale", "twist_limits", "payoff_promise"];

// Station origin of a vignette: rows run left to right, then right to left, 10 units apart.
export function station(id) {
  const i = ORDER.indexOf(id);
  const row = Math.floor(i / 4);
  const col = row % 2 === 0 ? i % 4 : 3 - (i % 4);
  return [(col - 1.5) * 10, 0, (row - 1.5) * 10];
}

export function labWorld(kit) {
  return { scene: kit.stage({ yard: 24, clear: 6, seed: 11 }) };
}

// Pose relative to a station origin.
export function pose(st, pos, look, fov = 38) {
  return { pos: [st[0] + pos[0], st[1] + pos[1], st[2] + pos[2]], look: [st[0] + look[0], st[1] + look[1], st[2] + look[2]], fov };
}

// Add a model to this vignette's group at a station offset, with a uniform scale.
export function put(kit, model, st, at = [0, 0, 0], scale = 1, rotY = 0) {
  model.group.position.set(st[0] + at[0], st[1] + at[1], st[2] + at[2]);
  model.group.scale.setScalar(scale);
  model.group.rotation.y = rotY;
  kit.group.add(model.group);
  return model;
}

// Camera track: keys [{ at, pose, dur, ease }]. The camera holds keys[0].pose until keys[1].at,
// then flies from each pose to the next over dur seconds. Pure function of t.
export function track(kit, camera, t, keys) {
  let k = 0;
  for (let i = 1; i < keys.length; i++) if (t >= keys[i].at) k = i;
  if (k === 0) { kit.setPose(camera, keys[0].pose); return; }
  const key = keys[k];
  kit.fly(camera, t, { from: keys[k - 1].pose, to: key.pose, start: key.at, dur: key.dur ?? 1.0, ease: key.ease ?? "inOut", arc: key.arc ?? 0 });
}

// Smooth 0..1 ramp from start over dur seconds.
export const ramp = (kit, t, start, dur = 0.6) => kit.ease(kit.progress(t, start, dur), "inOut");

// Popped scale: 0 before start, then the kit's overshoot pop to base.
export function popScale(kit, obj, t, start, base = 1) {
  const s = kit.pop(t, start, 0.35) * base;
  obj.scale.setScalar(Math.max(0.0001, s));
  obj.visible = s > 0.001;
}

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("hook_ev");
  const fast = kit.beat("fast");
  const liquid = kit.beat("liquid");

  const car = put(kit, evCar(kit, { energyColor: ENERGY, electronColor: ELECTRON }), st, [0, 0, 0], 1);
  const cell = put(kit, cellCutaway(kit, { ionColor: ION, energyColor: ENERGY, openCutaway: 0.6, mode: "idle" }), st, [0.2, 0.15, 3.0], 0.5);
  const em = electrolyteMedium(kit, { ...EM_OPTS, showBlock: 0 });
  em.group.position.y = 0.05;
  cell.group.add(em.group);

  const wide = pose(st, [4.2, 3.4, 13.5], [0.2, 1.7, 0], 38);
  const low = pose(st, [2.6, 2.0, 10.5], [0, 1.3, 0.4], 38);
  const bay = pose(st, [0.9, 1.6, 7.6], [0.2, 0.75, 2.6], 38);
  const keys = [
    { at: 0, pose: wide },
    { at: 3.4, pose: low, dur: 3.2, ease: "drift" },
    { at: liquid - 1.6, pose: bay, dur: 1.4, ease: "stop" },
  ];

  const camera = kit.camera(wide);
  // Overlays register once at setup; the stage draws them each frame.
  kit.label({ text: "BÊN TRONG CÔNG NGHỆ", at: 0.4, hold: 1.7, y: 500, size: 62 });
  kit.callout({ text: "NHANH? AN TOÀN?", anchor: car.anchors.roof, at: fast, hold: 3.4 });
  kit.callout({ text: "PIN LITHIUM-ION", anchor: cell.anchors.body, at: liquid, hold: 0.7 });
  return {
    scene: world.scene,
    camera,
    hero: [car.group, cell.group],
    update(t) {
      track(kit, camera, t, keys);
      car.update(t, { mode: "drive", bayOpen: 1, batteryGlow: 0.5 + 0.4 * ramp(kit, t, fast, 0.8) });
      popScale(kit, cell.group, t, liquid - 1.0, 0.5);
      cell.update(t, { openCutaway: 0.6, mode: "idle" });
      em.update(t, { showBlock: 0, flowDir: 0 });
    },
  };
}
