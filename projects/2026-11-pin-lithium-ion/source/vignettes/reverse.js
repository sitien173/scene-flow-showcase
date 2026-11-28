// Vignette 12 (reverse, sentences 29-31): both yellow e- (via external circuit) and purple Li+
// (via teal electrolyte) reverse back to the layered graphite anode and settle to rest.
import { mainWorld } from "./hook.js";

export async function build(kit) {
  const world = await kit.world("main", mainWorld);
  const startPose = { pos: [0.35, 2.25, 9.2], look: [0.25, 1.85, 0], fov: 42 };
  const topPose = { pos: [0.05, 3.05, 6.8], look: [0.0, 2.85, 0], fov: 42 };
  const chamberPose = { pos: [0.15, 1.45, 7.2], look: [0.0, 1.05, 0], fov: 42 };
  const anodePose = { pos: [-0.70, 1.15, 5.2], look: [-0.78, 0.92, 0], fov: 40 };
  const camera = kit.camera(startPose);
  const eback = kit.beat("eback");
  const ionback = kit.beat("ionback");
  const rest = kit.beat("rest");
  kit.callout({ text: "ELECTRON VỀ CỰC ÂM", anchor: world.circuit.anchors.topArch, at: Math.max(eback, 0.85), hold: 3.4 });
  kit.callout({ text: "ION VỀ THAN CHÌ", anchor: world.cell.anchors.chamber, at: ionback, hold: 6.2 });

  return {
    scene: world.scene,
    camera,
    hero: [world.cell.group, world.circuit.group],
    update(t) {
      const resting = t >= rest;
      const settleProgress = resting ? 0.08 * (1 - kit.ease(kit.progress(t, rest, 1.4), "out")) : undefined;
      world.set(t, {
        deskCutaway: 1,
        cellState: {
          openCutaway: 1,
          mode: resting ? "idle" : "charge",
          soc: 0.92,
          ionProgress: settleProgress,
          showIons: true,
        },
        electrolyteVisible: true,
        electrolyteState: {
          fill: 1,
          flowDir: resting ? 0 : -1,
          showBlock: 0,
          showIons: !resting,
        },
        circuitVisible: true,
        circuitState: {
          mode: resting ? "idle" : "charge",
          chipGlow: resting ? 0.2 : 0.6,
          loadGlow: resting ? 0.2 : 0.5,
          chargerPlug: 1,
        },
        topPhoneVisible: false,
      });

      if (t < ionback - 0.5) {
        kit.fly(camera, t, { from: startPose, to: topPose, start: 0.2, dur: 3.8, ease: "inOut" });
      } else if (t < rest - 1.5) {
        kit.fly(camera, t, { from: topPose, to: chamberPose, start: ionback - 0.5, dur: 4.5, ease: "inOut" });
      } else {
        kit.fly(camera, t, { from: chamberPose, to: anodePose, start: rest - 1.5, dur: 3.0, ease: "inOut" });
      }
    },
  };
}
