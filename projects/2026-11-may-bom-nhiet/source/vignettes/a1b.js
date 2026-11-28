// a1b: Application 2 — Geothermal ground/water source heat pump (higher winter efficiency, higher install cost)
// and connecting heat pump to a domestic sanitary hot-water tank.
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("home", homeWorld);
  const geoPose = { pos: [-1.45, 1.55, 8.20], look: [-0.85, 0.95, 0.25], fov: 40 };
  const tankPose = { pos: [1.55, 2.35, 6.45], look: [1.75, 1.65, -0.35], fov: 38 };
  const camera = kit.camera(geoPose);

  const geoBeat = kit.beat("geo");
  const higherCop = kit.beat("higher_cop");
  const hotWater = kit.beat("hot_water");

  // Heat beads flowing up from underground earth/groundwater strata into the house heat pump
  const geoHeatFlow = kit.beads(
    [[-2.35, 0.22, 1.22], [-1.75, 0.22, 1.22], [-1.15, 0.28, 1.22], [-0.95, 0.60, 1.15], [-0.72, 0.92, 0.85]],
    { distance: 7.8, color: "#F08A4B", glow: "#FCD53E", start: geoBeat - 0.4, onTop: true }
  );

  // Heat beads feeding the domestic sanitary hot-water tank inside the house (elevated +0.78 when geo = 1)
  const tankFlow = kit.beads(
    [[1.35, 2.55, -0.20], [1.78, 2.25, -0.45], [2.28, 1.85, -0.65]],
    { distance: 6.4, color: "#F08A4B", glow: "#FCD53E", start: higherCop + 2.0, onTop: true }
  );

  kit.group.add(geoHeatFlow.group, tankFlow.group);

  kit.callout({ text: "NGUỒN ĐẤT / NƯỚC", anchor: world.room.anchors.groundLoop, at: geoBeat, hold: 2.4 });
  kit.card({
    title: "ĐỊA NHIỆT",
    body: "HIỆU SUẤT CAO · LẮP TỐN HƠN",
    at: higherCop,
    hold: 2.6,
    y: 430,
    width: 660,
  });
  kit.callout({ text: "ĐUN NƯỚC NÓNG", anchor: world.room.anchors.tank, at: hotWater, hold: 1.3 });

  return {
    scene: world.scene,
    camera,
    hero: [world.room.group, world.hp.group],
    update(t) {
      const geoAmt = kit.ease(kit.progress(t, 0.4, 2.0), "out");
      const tankAmt = kit.ease(kit.progress(t, higherCop + 1.8, 1.2), "out");

      world.set(t, {
        hpCutaway: 1,
        hpActive: 1,
        hpHeatFlow: 0.9,
        roomCutaway: 1,
        roomWarmth: 0.8,
        roomSeason: "winter",
        geo: geoAmt,
        tank: tankAmt,
        outCoilMode: "induced",
        inCoilMode: "ac",
      });

      kit.fly(camera, t, { from: geoPose, to: tankPose, start: higherCop + 1.8, dur: 1.6, ease: "inOut" });
      geoHeatFlow.update(t);
      tankFlow.update(t);
    },
  };
}
