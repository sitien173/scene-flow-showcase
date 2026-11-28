// m1d: Mechanism step 2b — Hot compressed gas (#DD3428) exits compressor,
// compared to a cutaway bicycle pump heating up as piston compresses air inside (neutral paper palette).
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const { THREE, PALETTE } = kit;
  const world = await kit.world("home", homeWorld);
  const fromPose = { pos: [9.05, 3.15, 6.05], look: [9.15, 2.80, 1.60], fov: 40 };
  const toPose = { pos: [9.55, 3.05, 6.20], look: [9.50, 2.75, 1.70], fov: 40 };
  const camera = kit.camera(fromPose);

  const hotGas = kit.beat("hot_gas");
  const pumpBeat = kit.beat("pump");

  // Hot gas beads (#DD3428) leaving compressor outlet
  const hotOut = kit.beads(world.comp.path("out"), {
    distance: 4.6,
    color: "#DD3428",
    glow: "#FF9F8F",
    start: 0.2,
    onTop: true,
  });

  // Neutral cutaway bicycle pump prop beside compressor (strictly paper #D8D8C8 + slate grey, NO role colors)
  const pumpGroup = new THREE.Group();
  pumpGroup.position.set(9.95, 1.90, 1.78);
  const paperMat = kit.toon(PALETTE.paper);
  const slateMat = kit.toon("#5B5E70");
  const lightMetalMat = kit.toon("#B8BCC8");
  const darkMat = kit.toon("#3A3B4A");

  const footPlate = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.10, 0.44), slateMat);
  footPlate.position.y = 0.05;
  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 1.25, 12, 1, true, Math.PI * 0.75, Math.PI * 1.4),
    paperMat
  );
  barrel.position.y = 0.72;
  const barrelBase = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.08, 12), slateMat);
  barrelBase.position.y = 0.12;
  const compressedAir = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.0, 10), lightMetalMat);
  compressedAir.position.y = 0.40;
  compressedAir.userData.noInk = true;

  const plunger = new THREE.Group();
  plunger.position.set(0, 1.15, 0);
  const head = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 10), darkMat);
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.72, 8), lightMetalMat);
  rod.position.y = 0.36;
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.10, 0.12), slateMat);
  handle.position.y = 0.74;
  plunger.add(head, rod, handle);

  const hoseCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.18, 0.15, 0),
    new THREE.Vector3(-0.48, 0.10, 0.18),
    new THREE.Vector3(-0.68, 0.08, 0.25),
  ]);
  const hose = new THREE.Mesh(new THREE.TubeGeometry(hoseCurve, 12, 0.035, 6, false), darkMat);

  pumpGroup.add(footPlate, barrel, barrelBase, compressedAir, plunger, hose);
  kit.ink(pumpGroup);

  const pumpAnchor = new THREE.Object3D();
  pumpAnchor.position.set(9.95, 2.90, 1.85);
  kit.group.add(hotOut.group, pumpGroup, pumpAnchor);

  kit.callout({ text: "KHÍ NÓNG > PHÒNG", anchor: world.comp.anchors.outlet, at: hotGas, hold: 2.2 });
  kit.callout({ text: "NHƯ BƠM XE ĐẠP", anchor: pumpAnchor, at: pumpBeat, hold: 2.4 });

  return {
    scene: world.scene,
    camera,
    hero: [world.comp.group, pumpGroup],
    update(t) {
      world.set(t, {
        benchActive: 1,
        benchPhaseSplit: 1,
        benchEvapMode: "induced",
        benchCondMode: "ac",
        compElec: 0.9,
        compHeat: 1.0,
        compActive: 1,
        compRate: 1.6,
      });

      kit.drift(camera, t, { from: fromPose, to: toPose, start: pumpBeat - 0.8, dur: 3.4 });
      hotOut.update(t);
      kit.popIn(pumpGroup, t, pumpBeat - 1.2, { dur: 0.35 });

      // Periodic downward compression stroke synced cleanly to t
      const stroke = 0.5 - 0.5 * Math.cos((t - pumpBeat) * 3.4);
      const plungerY = kit.lerp(1.25, 0.42, stroke);
      plunger.position.y = plungerY;
      const airH = Math.max(0.12, plungerY - 0.18);
      compressedAir.scale.y = airH;
      compressedAir.position.y = 0.16 + airH / 2;
    },
  };
}
