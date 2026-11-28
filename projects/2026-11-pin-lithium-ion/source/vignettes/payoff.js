// Vignette 18 (payoff, sentences 43-46): hard cut back to main cell-cutaway + external-circuit;
// debunks myth ("KHÔNG TỰ SINH RA"), charges glowing orange chemical energy (#F97316),
// then releases yellow electric current (#FCD53E) out to the external circuit with sun sweep.
import { mainWorld } from "./hook.js";

export async function build(kit) {
  const world = await kit.world("main", mainWorld);
  const widePose = { pos: [0.32, 2.05, 10.2], look: [0.25, 1.68, 0], fov: 42 };
  const chemPose = { pos: [0.22, 1.45, 7.2], look: [0.15, 1.15, 0], fov: 42 };
  const releasePose = { pos: [0.30, 2.10, 9.6], look: [0.22, 1.72, 0], fov: 42 };
  const camera = kit.camera(widePose);
  const myth = kit.beat("myth");
  const chem = kit.beat("chem");
  const release = kit.beat("release");
  kit.bigText({ text: "KHÔNG TỰ SINH RA", at: myth, hold: 4.5, y: 540 });
  kit.mark({ kind: "x", anchor: world.cell.anchors.chamber, at: myth, hold: 4.5 });
  kit.callout({ text: "HÓA NĂNG", anchor: world.cell.anchors.chamber, at: chem, hold: 2.8 });
  kit.callout({ text: "GIẢI PHÓNG ĐIỆN", anchor: world.circuit.anchors.topArch, at: release, hold: 2.2 });
  kit.sweep({ at: release });

  return {
    scene: world.scene,
    camera,
    hero: [world.cell.group, world.circuit.group],
    update(t) {
      // Charge up orange chemical energy before release, then discharge yellow current at release
      const chargeUp = kit.ease(kit.progress(t, chem - 3.2, 3.2), "inOut");
      const releasing = t >= release;
      const chemLevel = releasing
        ? kit.lerp(1.0, 0.35, kit.ease(kit.progress(t, release, 2.2), "out"))
        : chargeUp;

      world.set(t, {
        deskCutaway: 1,
        cellState: {
          openCutaway: 1,
          mode: releasing ? "discharge" : "charge",
          soc: 0.7,
          chemGlow: chemLevel,
          showIons: true,
        },
        electrolyteVisible: true,
        electrolyteState: {
          fill: 1,
          flowDir: releasing ? 1 : -1,
          showBlock: 0,
          showIons: true,
        },
        circuitVisible: true,
        circuitState: {
          mode: releasing ? "discharge" : "charge",
          chipGlow: releasing ? 1.0 : 0.45,
          loadGlow: releasing ? 1.0 : 0.45,
          chargerPlug: releasing ? 0 : 1,
        },
        topPhoneVisible: false,
      });

      if (t < release - 0.5) {
        kit.fly(camera, t, { from: widePose, to: chemPose, start: chem - 3.5, dur: 4.0, ease: "inOut" });
      } else {
        kit.fly(camera, t, { from: chemPose, to: releasePose, start: release - 0.5, dur: 2.2, ease: "inOut" });
      }
    },
  };
}
