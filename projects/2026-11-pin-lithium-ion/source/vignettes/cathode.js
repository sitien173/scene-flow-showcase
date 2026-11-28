// Vignette 9 (cathode, sentences 22-23): follow yellow e- descending the right branch
// of external-circuit down into the metal-oxide cathode to reunite with purple Li+ ions.
import { mainWorld } from "./hook.js";

export async function build(kit) {
  const world = await kit.world("main", mainWorld);
  const startPose = { pos: [0.95, 3.05, 5.2], look: [0.90, 2.65, 0], fov: 40 };
  const endPose = { pos: [0.95, 1.25, 5.0], look: [0.84, 0.96, 0], fov: 40 };
  const camera = kit.camera(startPose);
  const meet = kit.beat("meet");
  kit.callout({ text: "CỰC DƯƠNG OXIT", anchor: world.cell.anchors.cathode, at: meet, hold: 2.1 });

  return {
    scene: world.scene,
    camera,
    hero: [world.cell.group, world.circuit.group],
    update(t) {
      world.set(t, {
        deskCutaway: 1,
        cellState: { openCutaway: 1, mode: "discharge", soc: 0.3, showIons: true },
        electrolyteVisible: true,
        electrolyteState: { fill: 1, flowDir: 1, showBlock: 0, showIons: true },
        circuitVisible: true,
        circuitState: { mode: "discharge", chipGlow: 0.85, loadGlow: 0.9, chargerPlug: 0 },
        topPhoneVisible: true,
        topPhoneState: { cardPulse: 1, coilGlow: 1 },
      });

      kit.fly(camera, t, { from: startPose, to: endPose, start: 0.8, dur: 5.0, ease: "inOut" });
    },
  };
}
