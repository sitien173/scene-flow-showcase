// Vignette 6 (split, sentences 13-15): screen turns on, chemical reaction at anode releases
// yellow e- into the external circuit and purple Li+ into the teal electrolyte along two separate paths.
import { mainWorld } from "./hook.js";

export async function build(kit) {
  const world = await kit.world("main", mainWorld);
  const startPose = { pos: [-0.45, 1.45, 5.8], look: [-0.25, 1.35, 0], fov: 42 };
  const widePose = { pos: [0.35, 2.35, 11.2], look: [0.30, 2.10, 0], fov: 42 };
  const camera = kit.camera(startPose);
  const screen = kit.beat("screen");
  const release = kit.beat("release");
  const twopaths = kit.beat("twopaths");

  // Extra yellow electron beads rising from anode up the left external wire when reaction starts
  const eStream = kit.beads(
    [[-0.84, 0.95, 0.25], [-1.05, 1.85, 0.12], [-1.05, 3.15, 0.12], [-0.45, 3.32, 0.12]],
    { distance: 10, fov: 42, color: "#FCD53E", glow: "#FFF6C8", start: release, onTop: true }
  );
  kit.group.add(eStream.group);
  kit.callout({ text: "PHẢN ỨNG CỰC ÂM", anchor: world.cell.anchors.anode, at: release, hold: 4.5 });
  kit.label({ text: "2 CON ĐƯỜNG", at: twopaths, hold: 1.4, y: 520 });

  return {
    scene: world.scene,
    camera,
    hero: [world.cell.group, world.circuit.group, world.topPhone.group],
    update(t) {
      const active = t >= screen ? 1 : 0;
      const releasing = t >= release;
      world.set(t, {
        deskCutaway: 1,
        cellState: {
          openCutaway: 1,
          mode: releasing ? "discharge" : "idle",
          soc: releasing ? 0.6 : 1.0,
          showIons: true,
        },
        electrolyteVisible: true,
        electrolyteState: {
          fill: 1,
          flowDir: releasing ? 1 : 0,
          showBlock: 0,
          showIons: releasing,
        },
        circuitVisible: true,
        circuitState: {
          mode: releasing ? "discharge" : "idle",
          chipGlow: active * 0.85,
          loadGlow: active * 0.95,
          chargerPlug: 0,
        },
        topPhoneVisible: true,
        topPhoneState: {
          cardPulse: active,
          coilGlow: active,
        },
      });

      eStream.update(t);
      kit.fly(camera, t, { from: startPose, to: widePose, start: screen, dur: 4.5, ease: "inOut" });
    },
  };
}
