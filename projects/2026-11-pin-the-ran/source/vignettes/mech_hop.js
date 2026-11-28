// Sentences 20 to 23: in the liquid, Li+ glides between solvent molecules; in the solid, Li+ hops from
// vacancy to vacancy in the crystal; the lattice vibrates; some solids conduct ions faster.
import { electrolyteMedium } from "./electrolyte-medium/electrolyte-medium.js";
import { solidStateCellCutaway } from "./solid-state-cell-cutaway/solid-state-cell-cutaway.js";
import { labWorld, station, pose, put, track, ION, ELECTROLYTE, ENERGY, EM_OPTS } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("mech_hop");
  const liquidGlide = kit.beat("liquid_glide");
  const crystalHop = kit.beat("crystal_hop");
  const vibrate = kit.beat("vibrate");
  const fasterSolid = kit.beat("faster_solid");

  const em = put(kit, electrolyteMedium(kit, { ...EM_OPTS, flowDir: 1, showBlock: 0 }), st, [-3.0, 0, 0]);
  const ss = put(kit, solidStateCellCutaway(kit, { electrolyteColor: ELECTROLYTE, ionColor: ION, energyColor: ENERGY, mode: "vacancyHop", openCutaway: 1 }), st, [1.8, 0, 0]);

  const liquid = pose(st, [-2.8, 1.8, 6.4], [-3.0, 0.85, 0]);
  const lattice = pose(st, [1.9, 1.5, 4.4], [1.8, 0.9, 0.2]);
  const close = pose(st, [1.85, 1.15, 2.9], [1.8, 0.88, 0.18]);
  const keys = [
    { at: 0, pose: liquid },
    { at: liquidGlide, pose: pose(st, [-3.4, 1.4, 5.0], [-3.0, 0.75, 0.1]), dur: 3.5, ease: "drift" },
    { at: liquidGlide + 3.8, pose: pose(st, [-2.6, 1.6, 5.4], [-3.0, 0.75, 0.1]), dur: 2.0, ease: "drift" },
    { at: crystalHop - 1.2, pose: lattice, dur: 1.2, ease: "stop" },
    { at: vibrate - 0.2, pose: close, dur: 1.4, ease: "drift" },
    { at: vibrate + 2.4, pose: pose(st, [1.4, 1.3, 3.4], [1.8, 0.88, 0.18]), dur: 3.0, ease: "drift" },
    { at: fasterSolid - 0.6, pose: pose(st, [2.2, 2.3, 8.0], [1.8, 1.1, 0]), dur: 1.2 },
  ];
  const camera = kit.camera(liquid);

  // Overlays register once at setup; the stage draws them each frame.
  kit.label({ text: "LỎNG: LEN QUA DUNG MÔI", at: liquidGlide, hold: 4.4, y: 560 });
  kit.label({ text: "RẮN: NHẢY CHỖ TRỐNG", at: crystalHop, hold: 4.0, y: 560 });
  kit.bigText({ text: "DẪN ION NHANH HƠN", at: fasterSolid, hold: 1.2, y: 600 });
  return {
    scene: world.scene,
    camera,
    hero: [em.group, ss.group],
    update(t) {
      track(kit, camera, t, keys);
      em.update(t, { flowDir: 1, showBlock: 0 });
      ss.update(t, { mode: "vacancyHop", openCutaway: 1, chemGlow: 0.35 });
    },
  };
}
