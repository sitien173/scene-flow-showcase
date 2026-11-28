// Vignette 14 (dendrite, sentences 34-35): dusk mood on an older pure-lithium metal cell;
// metallic dendrite whiskers grow across the separator causing a red short-circuit spark,
// leading into the 2019 Chemistry Nobel Prize card.
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";
import { electrolyteMedium } from "./electrolyte-medium/electrolyte-medium.js";

export async function build(kit) {
  const world = await kit.world("dendrite", k => {
    const scene = k.stage({ yard: 8, clear: 6, seed: 23 });
    const cell = cellCutaway(k, { openCutaway: 1, pureLithium: 1, showIons: false });
    scene.add(cell.group);
    const electrolyte = electrolyteMedium(k, { fill: 1, showBlock: 0, showIons: false, stress: 0.75 });
    electrolyte.group.position.set(0, 0.11, -0.02);
    scene.add(electrolyte.group);
    return { scene, cell, electrolyte };
  });

  const startPose = { pos: [0.15, 1.35, 6.8], look: [0.10, 1.05, 0], fov: 40 };
  const closePose = { pos: [0.15, 1.15, 4.8], look: [0.10, 0.95, 0], fov: 40 };
  const pullPose = { pos: [0.22, 1.55, 8.2], look: [0.15, 1.25, 0], fov: 40 };
  const camera = kit.camera(startPose);
  const whiskers = kit.beat("whiskers");
  const nobel = kit.beat("nobel");
  kit.callout({ text: "GAI LITHIUM", anchor: world.cell.anchors.dendriteTip, at: whiskers, hold: 2.3 });
  kit.mark({ kind: "x", anchor: world.cell.anchors.dendriteTip, at: whiskers, hold: 2.3 });
  kit.card({ title: "NOBEL HÓA HỌC 2019", body: "GIẢI QUYẾT ĐOẢN MẠCH", at: nobel, hold: 2.7, y: 450, width: 640 });

  return {
    scene: world.scene,
    camera,
    hero: world.cell.group,
    update(t) {
      const growth = kit.ease(kit.progress(t, 0.9, 2.3), "inOut");
      world.cell.update(t, { openCutaway: 1, pureLithium: 1, dendrite: growth, showIons: false });
      world.electrolyte.update(t, { fill: 1, flowDir: 0, showBlock: 0, showIons: false, stress: 0.75 });

      if (t < nobel - 0.6) {
        kit.fly(camera, t, { from: startPose, to: closePose, start: 0.9, dur: 2.5, ease: "inOut" });
      } else {
        kit.fly(camera, t, { from: closePose, to: pullPose, start: nobel - 0.6, dur: 1.8, ease: "inOut" });
      }
    },
  };
}
