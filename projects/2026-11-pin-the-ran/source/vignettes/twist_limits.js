// Sentences 46 to 47: night. Close on the solid core; lithium can still creep along grain boundaries
// ("ranh giới hạt"), and swelling and shrinking each cycle can pull the layers apart ("tách lớp").
import { solidStateCellCutaway } from "./solid-state-cell-cutaway/solid-state-cell-cutaway.js";
import { labWorld, station, pose, put, ramp, ION, ELECTROLYTE, ENERGY } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("twist_limits");
  const grain = kit.beat("grain");
  const delam = kit.beat("delam");

  const ss = put(kit, solidStateCellCutaway(kit, { electrolyteColor: ELECTROLYTE, ionColor: ION, energyColor: ENERGY, openCutaway: 1 }), st);
  const center = [st[0] - 0.2, 0.9, st[2] + 0.25];
  const camera = kit.camera(pose(st, [0, 1.8, 5.6], [-0.2, 0.9, 0.25]));

  // Overlays register once at setup; the stage draws them each frame.
  kit.label({ text: "ĐỌNG DỌC RANH GIỚI HẠT", at: grain, hold: 3.4, y: 560 });
  kit.label({ text: "CO GIÃN → TÁCH LỚP", at: delam, hold: 2.3, y: 560 });
  return {
    scene: world.scene,
    camera,
    hero: ss.group,
    update(t) {
      const r = 5.6 - 1.4 * ramp(kit, t, grain - 0.8, 2.0);
      kit.orbit(camera, t, { center, radius: r, height: 0.8, angle: -0.12, speed: 0.035, look: center, fov: 38 });
      const swell = ramp(kit, t, delam - 0.6, 1.6);
      ss.update(t, { openCutaway: 1, mode: "discharge", grainDendrite: ramp(kit, t, grain - 0.4, 2.2),
        delamination: swell * (0.75 + 0.25 * Math.sin(t * 3.2)) });
    },
  };
}
