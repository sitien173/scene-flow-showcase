// Vignette 8 (circuit, sentences 19-21): crane up to external-circuit, follow yellow e-
// through copper wire, processor chip, and display load powering the smartphone ("DÒNG ĐIỆN").
import { mainWorld } from "./hook.js";

export async function build(kit) {
  const world = await kit.world("main", mainWorld);
  const startPose = { pos: [0.15, 1.55, 5.4], look: [0.05, 1.45, 0], fov: 42 };
  const topLeftPose = { pos: [-0.45, 3.25, 5.2], look: [-0.30, 3.25, 0], fov: 42 };
  const topRightPose = { pos: [0.45, 3.35, 5.4], look: [0.25, 3.30, 0], fov: 42 };
  const camera = kit.camera(startPose);
  const detour = kit.beat("detour");
  const chip = kit.beat("chip");
  const current = kit.beat("current");
  kit.callout({ text: "MẠCH NGOÀI", anchor: world.circuit.anchors.topArch, at: detour, hold: 5.5 });
  kit.bigText({ text: "DÒNG ĐIỆN", at: current, hold: 1.45, y: 540 });

  return {
    scene: world.scene,
    camera,
    hero: [world.circuit.group, world.topPhone.group],
    update(t) {
      const chipPulse = t >= chip ? 1.0 : 0.75;
      world.set(t, {
        deskCutaway: 1,
        cellState: { openCutaway: 1, mode: "discharge", soc: 0.4, showIons: true },
        electrolyteVisible: true,
        electrolyteState: { fill: 1, flowDir: 1, showBlock: 0, showIons: true },
        circuitVisible: true,
        circuitState: { mode: "discharge", chipGlow: chipPulse, loadGlow: 1.0, chargerPlug: 0 },
        topPhoneVisible: true,
        topPhoneState: { cardPulse: 1, coilGlow: 1 },
      });

      if (t < chip - 0.5) {
        kit.fly(camera, t, { from: startPose, to: topLeftPose, start: 0.4, dur: 4.0, ease: "inOut" });
      } else {
        kit.drift(camera, t, { from: topLeftPose, to: topRightPose, start: chip - 0.5, dur: 6.2 });
      }
    },
  };
}
