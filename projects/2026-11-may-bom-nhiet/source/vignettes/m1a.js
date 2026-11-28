// m1a: Mechanism step 1a — Cold refrigerant (#2D7FF9) enters the outdoor evaporator copper coil.
// Shows what moves (cold refrigerant), what interacts (coil exposed to outdoor air), and result (coil fills).
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("home", homeWorld);
  const startPose = { pos: [-1.58, 1.32, 3.35], look: [-1.58, 0.96, -0.10], fov: 36 };
  const camera = kit.camera(startPose);

  const evap = kit.beat("evap");
  const enterCoil = kit.beat("enter_coil");

  // Cold refrigerant (#2D7FF9) entering and filling the outdoor solenoid copper coil
  const coilPts = world.outCoil.path("coil");
  const coldIn = kit.beads(
    [[-2.20, 0.42, -0.10], [-1.95, 0.72, -0.10], ...coilPts.slice(0, Math.floor(coilPts.length * 0.75))],
    { distance: 3.4, color: "#2D7FF9", glow: "#A9D2FF", start: 0.4, onTop: true }
  );
  kit.group.add(coldIn.group);

  kit.callout({ text: "DÀN BAY HƠI", anchor: world.outCoil.anchors.center, at: evap, hold: 2.2 });

  return {
    scene: world.scene,
    camera,
    hero: [world.outCoil.group, world.hp.group],
    update(t) {
      const fill = kit.ease(kit.progress(t, enterCoil - 0.5, 2.2), "inOut");
      world.set(t, {
        hpCutaway: 1,
        hpActive: 0.55 + 0.45 * fill,
        hpHeatFlow: 0.05,
        roomCutaway: 1,
        roomWarmth: 0.4,
        fanSpeed: 1.15,
        outCoilMode: "induced",
        outCoilIntensity: 0.4 + 0.6 * fill,
        inCoilMode: "idle",
      });

      kit.push(camera, t, { ...startPose, amount: 0.45, start: enterCoil - 0.3, dur: 3.2 });
      coldIn.update(t);
    },
  };
}
