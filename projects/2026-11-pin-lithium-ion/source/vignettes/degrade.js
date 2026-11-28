// Vignette 19 (degrade, sentences 47-49): dusk lighting; electrode layers warp and dull over
// repeated cycles ("PIN BỊ CHAI"), then camera flies smoothly back to the charging smartphone
// (symmetrical bookend with hook) surrounded by the rhythmic "VŨ ĐIỆU ION" before end card.
import { mainWorld } from "./hook.js";

export async function build(kit) {
  const world = await kit.world("main", mainWorld);
  const startPose = { pos: [0.22, 1.45, 7.6], look: [0.15, 1.10, 0], fov: 40 };
  const wearPose = { pos: [-0.25, 1.25, 5.6], look: [-0.30, 0.95, 0], fov: 40 };
  const phonePose = { pos: [-5.40, 1.25, 4.4], look: [-5.45, 0.95, 0], fov: 40 };
  const camera = kit.camera(startPose);
  const not100 = kit.beat("not100");
  const wear = kit.beat("wear");
  const dance = kit.beat("dance");

  // Rhythmic purple Li+ and yellow e- dance beads around the charging desk phone
  const ionDance = kit.beads(
    [
      [-6.05, 0.45, 0.45],
      [-5.50, 1.55, 0.55],
      [-4.95, 0.85, 0.45],
      [-5.50, 0.25, 0.45],
    ],
    { distance: 4.4, fov: 40, color: "#8B5CF6", glow: "#C4B5FD", closed: true, start: wear + 0.6, onTop: true }
  );
  const eDance = kit.beads(
    [
      [-4.95, 0.45, 0.55],
      [-5.50, 1.45, 0.65],
      [-6.05, 0.85, 0.55],
      [-5.50, 0.35, 0.55],
    ],
    { distance: 4.4, fov: 40, color: "#FCD53E", glow: "#FFF6C8", closed: true, reverse: true, start: wear + 0.6, onTop: true }
  );
  kit.group.add(ionDance.group, eDance.group);
  kit.card({ title: "KHÔNG HOÀN HẢO 100%", body: "ĐẢO CHIỀU MẤT DẦN HIỆU SUẤT", at: not100, hold: 3.7, y: 440, width: 650 });
  kit.callout({ text: "PIN BỊ CHAI", anchor: world.cell.anchors.anode, at: wear, hold: 1.9 });
  kit.bigText({ text: "VŨ ĐIỆU ION", at: dance, hold: 1.55, y: 550 });

  return {
    scene: world.scene,
    camera,
    hero: [world.cell.group, world.deskPhone.group],
    update(t) {
      const wearLevel = kit.ease(kit.progress(t, not100 - 0.5, 5.2), "inOut");
      const phoneCharge = 0.45 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.8));
      world.set(t, {
        deskRotY: 0.22,
        deskCutaway: 0.35,
        deskCharge: phoneCharge,
        deskPulse: 0.85,
        deskCableOn: true,
        miniCellOn: true,
        cellState: {
          openCutaway: 1,
          mode: "charge",
          soc: 0.55,
          degraded: wearLevel,
          showIons: true,
        },
        electrolyteVisible: true,
        electrolyteState: {
          fill: 1,
          flowDir: -1,
          showBlock: 0,
          showIons: true,
          stress: wearLevel * 0.65,
        },
        circuitVisible: false,
        topPhoneVisible: false,
      });

      ionDance.update(t);
      eDance.update(t);

      if (t < wear + 0.6) {
        kit.fly(camera, t, { from: startPose, to: wearPose, start: 0.9, dur: 5.0, ease: "drift" });
      } else {
        kit.fly(camera, t, { from: wearPose, to: phonePose, start: wear + 0.6, dur: 2.8, ease: "inOut", arc: 0.8 });
      }
    },
  };
}
