// m1g: Mechanism step 4b — Expansion valve reduces pressure and cools refrigerant (#DD3428 -> #2D7FF9),
// then pulls back to show the full 4-step closed cycle (evaporation -> compression -> condensation -> expansion).
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("home", homeWorld);
  const valvePose = { pos: [4.85, 1.48, 8.65], look: [4.80, 1.15, 5.40], fov: 36 };
  const cyclePose = { pos: [8.50, 2.45, 9.45], look: [8.50, 2.15, 1.54], fov: 40 };
  const camera = kit.camera(valvePose);

  const dropBeat = kit.beat("drop");
  const expandBeat = kit.beat("expand");
  const returnEvap = kit.beat("return_evap");
  const cycleBeat = kit.beat("cycle");

  // Warm high-pressure liquid (#DD3428) entering left side of valve, cold expanded refrigerant (#2D7FF9) exiting right
  const valveIn = kit.beads(world.valve.path("in"), {
    distance: 3.6,
    color: "#DD3428",
    glow: "#FF9F8F",
    start: 0.2,
    end: returnEvap + 0.5,
    onTop: true,
  });
  const valveOut = kit.beads(world.valve.path("out"), {
    distance: 3.6,
    color: "#2D7FF9",
    glow: "#A9D2FF",
    start: expandBeat - 0.5,
    end: returnEvap + 0.8,
    onTop: true,
  });

  // Full 4-step closed loop beads shown during pullback
  const coldHalf = kit.beads(
    [...world.loop.path("valveToEvap"), ...world.loop.path("evapToComp")],
    { distance: 8.8, color: "#2D7FF9", glow: "#A9D2FF", start: returnEvap - 1.0, onTop: true }
  );
  const hotHalf = kit.beads(
    [...world.loop.path("compToCond"), ...world.loop.path("condToValve")],
    { distance: 8.8, color: "#DD3428", glow: "#FF9F8F", start: returnEvap - 1.0, onTop: true }
  );

  kit.group.add(valveIn.group, valveOut.group, coldHalf.group, hotHalf.group);

  kit.label({ text: "VAN GIẢM ÁP", at: dropBeat, hold: 1.8, y: 470 });
  kit.callout({ text: "GIÃN NỞ LÀM LẠNH", anchor: world.valve.anchors.outlet, at: expandBeat, hold: 2.4 });
  kit.card({
    title: "VÒNG TUẦN HOÀN 4 BƯỚC",
    body: "BAY HƠI → NÉN → NGƯNG TỤ → TIẾT LƯU",
    at: cycleBeat,
    hold: 1.1,
    y: 430,
    width: 720,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.valve.group, world.loop.group],
    update(t) {
      const dropAmt = kit.ease(kit.progress(t, dropBeat - 0.6, 2.2), "inOut");
      world.set(t, {
        benchActive: 1,
        benchPhaseSplit: 1,
        benchBoil: 0.85,
        benchCondense: 0.85,
        benchEvapMode: "induced",
        benchCondMode: "ac",
        compElec: 0.9,
        compHeat: 1.0,
        compActive: 1,
        compRate: 1.5,
        valveFlow: 1,
        valveDrop: 0.2 + 0.8 * dropAmt,
      });

      kit.fly(camera, t, { from: valvePose, to: cyclePose, start: returnEvap - 0.8, dur: 1.8, ease: "inOut" });
      valveIn.update(t);
      valveOut.update(t);
      coldHalf.update(t);
      hotHalf.update(t);
    },
  };
}
