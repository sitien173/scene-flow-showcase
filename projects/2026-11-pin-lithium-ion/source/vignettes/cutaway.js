// Vignette 2 (cutaway, sentences 3-5): hard-stop fly onto cell-cutaway, open front lid,
// fill chamber with teal electrolyte-medium, orbit gently to show layered electrodes and separator.
import { mainWorld } from "./hook.js";

export async function build(kit) {
  const world = await kit.world("main", mainWorld);
  const startPose = { pos: [0.3, 1.65, 9.6], look: [0.22, 1.25, 0], fov: 40 };
  const camera = kit.camera(startPose);
  const cut = kit.beat("cut");
  const electrodes = kit.beat("electrodes");
  const separator = kit.beat("separator");
  kit.callout({ text: "CỰC ÂM · DƯƠNG", anchor: world.cell.anchors.anode, at: electrodes, hold: 3.6, dx: 120 });
  kit.callout({ text: "MÀNG NGĂN", anchor: world.cell.anchors.separator, at: separator, hold: 1.5 });

  return {
    scene: world.scene,
    camera,
    hero: [world.cell.group, world.electrolyte.group],
    update(t) {
      const open = kit.ease(kit.progress(t, cut, 1.3), "out");
      const fill = kit.ease(kit.progress(t, separator - 2.2, 2.2), "inOut");

      world.set(t, {
        deskCutaway: 1,
        cellState: { openCutaway: open, mode: "idle", soc: 0.85, showIons: false },
        electrolyteVisible: fill > 0.01,
        electrolyteState: { fill, flowDir: 0, showBlock: 0, showIons: false },
        circuitVisible: false,
        topPhoneVisible: false,
      });

      // After the 0.9s entry move settles, gently orbit around the cutaway to reveal depth
      if (t >= 0.9) {
        kit.orbit(camera, t - 0.9, {
          center: [0.22, 1.25, 0],
          radius: 9.6,
          height: 0.40,
          angle: 0.03,
          speed: 0.045,
          look: [0.22, 1.25, 0],
          fov: 40,
        });
      } else {
        kit.setPose(camera, startPose);
      }
    },
  };
}
