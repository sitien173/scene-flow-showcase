// m1c: Mechanism step 2a — Compressor uses electric motor (#FCD53E) to squeeze gas into smaller volume,
// spiking both pressure (gauge rises) and temperature (#2D7FF9 -> #DD3428).
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("home", homeWorld);
  const startPose = { pos: [8.55, 3.20, 5.20], look: [8.55, 2.92, 1.54], fov: 36 };
  const camera = kit.camera(startPose);

  const enterComp = kit.beat("enter_comp");
  const squeeze = kit.beat("squeeze");
  const spike = kit.beat("spike");

  const gasIn = kit.beads(world.comp.path("in"), {
    distance: 4.2,
    color: "#2D7FF9",
    glow: "#A9D2FF",
    start: 0.2,
    onTop: true,
  });
  const gasOut = kit.beads(world.comp.path("out"), {
    distance: 4.2,
    color: "#DD3428",
    glow: "#FF9F8F",
    start: squeeze + 0.5,
    onTop: true,
  });

  kit.group.add(gasIn.group, gasOut.group);

  kit.callout({ text: "MÁY NÉN ĐIỆN", anchor: world.comp.anchors.motor, at: enterComp, hold: 1.8 });
  kit.label({ text: "ÉP CHẶT THỂ TÍCH", at: squeeze, hold: 2.2, y: 1120 });
  kit.bigText({ text: "ÁP & NHIỆT TĂNG VỌT", at: spike, hold: 1.3, y: 1080, size: 88 });

  return {
    scene: world.scene,
    camera,
    hero: [world.comp.group],
    update(t) {
      const sq = kit.ease(kit.progress(t, squeeze - 0.3, 1.6), "inOut");
      const heat = kit.ease(kit.progress(t, squeeze + 0.2, spike - squeeze), "inOut");
      world.set(t, {
        benchActive: 1,
        benchPhaseSplit: 0.4 + 0.6 * heat,
        benchEvapMode: "induced",
        benchCondMode: "ac",
        compElec: 0.2 + 0.8 * sq,
        compHeat: heat,
        compActive: 1,
        compRate: 0.85 + 1.15 * sq,
      });

      kit.push(camera, t, { ...startPose, amount: 0.65, start: squeeze, dur: 4.8 });
      gasIn.update(t);
      gasOut.update(t);
    },
  };
}
