// Sentences 30 to 32: dusk. Lithium grows sharp dendrites from the anode; in a liquid cell they pierce the
// separator and short the circuit ("chập mạch"); a solid layer is expected to block them ("chặn").
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";
import { solidStateCellCutaway } from "./solid-state-cell-cutaway/solid-state-cell-cutaway.js";
import { externalCircuit } from "./external-circuit/external-circuit.js";
import { labWorld, station, pose, put, track, ramp, ION, ELECTRON, ELECTROLYTE, ENERGY, WARN } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const st = station("mech_dendrite");
  const dendrite = kit.beat("dendrite");
  const short = kit.beat("short");
  const block = kit.beat("block");

  const cell = put(kit, cellCutaway(kit, { ionColor: ION, energyColor: ENERGY, pureLithium: 1, dendrite: 1, openCutaway: 1 }), st, [-1.9, 0, 0]);
  const circuit = put(kit, externalCircuit(kit, { electronColor: ELECTRON, energyColor: ENERGY, mode: "short" }), st, [-1.9, 1.98, 0]);
  const ss = put(kit, solidStateCellCutaway(kit, { electrolyteColor: ELECTROLYTE, ionColor: ION, energyColor: ENERGY, liMetalAnode: 1, openCutaway: 1 }), st, [2.4, 0, 0]);

  const liquid = pose(st, [-1.6, 3.2, 11.0], [-1.9, 1.8, 0]);
  const tip = pose(st, [-1.85, 1.4, 4.2], [-1.75, 0.9, 0]);
  const solid = pose(st, [2.6, 2.4, 8.6], [2.4, 1.1, 0]);
  const keys = [
    { at: 0, pose: liquid },
    { at: 0.6, pose: pose(st, [-2.4, 2.8, 9.8], [-1.9, 1.6, 0]), dur: 2.6, ease: "drift" },
    { at: dendrite - 0.2, pose: tip, dur: 1.2, ease: "stop" },
    { at: short - 0.7, pose: pose(st, [-1.5, 3.0, 10.4], [-1.9, 1.7, 0]), dur: 1.0 },
    { at: block - 0.9, pose: solid, dur: 1.1, ease: "stop" },
  ];
  const camera = kit.camera(liquid);

  // Overlays register once at setup; the stage draws them each frame.
  kit.callout({ text: "NHÁNH DENDRITE", anchor: cell.anchors.dendriteTip, at: dendrite, hold: 3.4 });
  kit.mark({ kind: "x", anchor: cell.anchors.separator, at: short, hold: 2.2 });
  kit.label({ text: "CHẬP MẠCH", at: short, hold: 2.2, y: 560, color: WARN });
  kit.label({ text: "LỚP RẮN KỲ VỌNG CHẶN", at: block, hold: 1.4, y: 560 });
  return {
    scene: world.scene,
    camera,
    hero: [cell.group, ss.group],
    update(t) {
      track(kit, camera, t, keys);
      const grow = ramp(kit, t, dendrite - 0.6, 3.6);
      cell.update(t, { openCutaway: 1, mode: "idle", pureLithium: 1, dendrite: grow });
      circuit.update(t, { mode: t >= short ? "short" : "idle" });
      ss.update(t, { openCutaway: 1, mode: "idle", liMetalAnode: 1, dendriteExpectedBlocked: ramp(kit, t, block - 0.6, 0.8) });
    },
  };
}
