// m1f: Mechanism step 4a — Warm high-pressure liquid (#DD3428) travels along the return line
// from condenser into the expansion valve before returning outdoors.
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("home", homeWorld);
  const startPose = { pos: [9.85, 1.85, 5.25], look: [9.65, 1.45, 1.54], fov: 38 };
  const endPose = { pos: [8.65, 1.48, 4.45], look: [8.55, 1.18, 1.54], fov: 36 };
  const camera = kit.camera(startPose);

  const stillWarm = kit.beat("still_warm");
  const valveBeat = kit.beat("valve");

  // Warm high-pressure liquid (#DD3428) flowing down condToValve and into expansion valve inlet
  const returnPts = world.loop.path("condToValve");
  const valveInPts = world.valve.path("in");
  const returnFlow = kit.beads([...returnPts, ...valveInPts.slice(1)], {
    distance: 4.5,
    color: "#DD3428",
    glow: "#FF9F8F",
    start: 0.2,
    onTop: true,
  });

  const returnAnchor = new THREE.Object3D();
  returnAnchor.position.set(10.05, 1.38, 1.68);
  kit.group.add(returnFlow.group, returnAnchor);

  kit.callout({ text: "LỎNG ẤM · ÁP CAO", anchor: returnAnchor, at: stillWarm, hold: 2.2 });
  kit.callout({ text: "VAN TIẾT LƯU", anchor: world.valve.anchors.body, at: valveBeat, hold: 1.1 });

  return {
    scene: world.scene,
    camera,
    hero: [world.loop.group, world.valve.group],
    update(t) {
      world.set(t, {
        benchActive: 1,
        benchPhaseSplit: 1,
        benchEvapMode: "induced",
        benchCondMode: "ac",
        compElec: 0.7,
        compHeat: 1.0,
        compActive: 1,
        valveFlow: 1,
        valveDrop: 0.25,
      });

      kit.fly(camera, t, { from: startPose, to: endPose, start: valveBeat - 2.6, dur: 2.8, ease: "inOut" });
      returnFlow.update(t);
    },
  };
}
