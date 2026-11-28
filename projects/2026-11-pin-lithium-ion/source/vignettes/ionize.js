// Vignette 4 (ionize, sentences 8-10): yellow outer electron detaches from the neutral lithium atom,
// leaving behind a positively charged purple Li+ ion; camera orbits 45 deg then pulls out slightly.
import { microWorld } from "./lithium.js";

export async function build(kit) {
  const world = await kit.world("micro", microWorld);
  const basePose = { pos: [0.25, 1.85, 7.6], look: [0.15, 1.40, 0], fov: 40 };
  const sidePose = { pos: [2.10, 1.95, 7.2], look: [0.20, 1.40, 0], fov: 40 };
  const endPose = { pos: [1.40, 2.05, 8.0], look: [0.25, 1.40, 0], fov: 40 };
  const camera = kit.camera(basePose);
  const electron = kit.beat("electron");
  const ion = kit.beat("ion");
  const turnon = kit.beat("turnon");
  kit.callout({ text: "ELECTRON (-)", anchor: world.electronAnchor, at: electron, hold: 3.6 });
  kit.callout({ text: "ION LITHIUM (+)", anchor: world.coreAnchor, at: ion, hold: 4.2 });

  return {
    scene: world.scene,
    camera,
    hero: world.atomGroup,
    update(t) {
      const detach = kit.ease(kit.progress(t, electron, 1.8), "inOut");
      world.atomGroup.position.x = 0.0;
      world.setAtom(t, {
        orbitSpeed: 2.3,
        detach,
        atomY: 1.45 + Math.sin(t * 2.0) * 0.07,
      });

      if (t < ion + 1.5) {
        kit.fly(camera, t, { from: basePose, to: sidePose, start: electron, dur: 4.0, ease: "drift" });
      } else {
        kit.fly(camera, t, { from: sidePose, to: endPose, start: turnon - 2.5, dur: 2.5, ease: "inOut" });
      }
    },
  };
}
