// Scene 2: hook_promise — laser pulse shoots from rooftop LiDAR, camera flies to sensor lens, street lights up as point cloud.
import { streetWorld } from "./hook_night.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("street", streetWorld);
  const poseA = { pos: [2.6, 2.5, 1.8], look: [0, 1.5, -2.3], fov: 38 };
  const poseB = { pos: [1.1, 2.1, -1.1], look: [0, 1.8, -2.8], fov: 34 };
  const camera = kit.camera(poseA);

  const ray = kit.beat("ray");
  const lidarBeat = kit.beat("lidar");
  const million = kit.beat("million");

  const pulse = signalPulse(kit, { mode: "beam", length: 5.5, color: "#00B4D8" });
  pulse.group.position.set(0, 1.82, -2.55);
  kit.group.add(pulse.group);

  // Deterministic #2D884E road point cloud ahead of the car
  const ROAD_PTS = 160;
  const ptGeo = new THREE.IcosahedronGeometry(0.04, 0);
  const ptMat = kit.toon("#2D884E", { emissive: "#2D884E" });
  ptMat.emissiveIntensity = 0.28;
  const roadCloud = new THREE.InstancedMesh(ptGeo, ptMat, ROAD_PTS);
  roadCloud.userData.noInk = true;
  const next = kit.rand(301);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < ROAD_PTS; i++) {
    dummy.position.set((next() - 0.5) * 4.8, 0.04, -1.2 + next() * 6.8);
    dummy.scale.setScalar(0.8 + next() * 0.5);
    dummy.updateMatrix();
    roadCloud.setMatrixAt(i, dummy.matrix);
  }
  roadCloud.instanceMatrix.needsUpdate = true;
  kit.group.add(roadCloud);

  kit.callout({ text: "CẢM BIẾN LIDAR", anchor: world.lidar.anchors.top, at: lidarBeat, hold: 3.4 });
  kit.bigText({ text: "~1 TRIỆU ĐIỂM/S", at: million, hold: 1.8, y: 540, size: 92 });

  return {
    scene: world.scene,
    camera,
    hero: [world.lidar.group],
    update(t) {
      const cloudOn = kit.ease(kit.progress(t, million - 2.2, 2.5), "out");
      world.set(t, {
        carPos: [0, 0, -2.8],
        headlights: 0.75,
        spin: 0.85,
        emit: kit.clamp01(kit.progress(t, ray - 0.1, 0.4)),
        pedPos: [0.55, 0, 3.2],
        pedRotY: -Math.PI / 2,
        pedCloud: cloudOn,
        bldgCloud: cloudOn,
      });

      const rayProg = kit.ease(kit.progress(t, ray, 1.2), "out");
      pulse.update(t, { active: rayProg > 0.01 ? 1 : 0, progress: rayProg });
      roadCloud.visible = cloudOn > 0.02;
      roadCloud.scale.setScalar(0.92 + 0.08 * cloudOn);

      kit.fly(camera, t, { from: poseA, to: poseB, start: lidarBeat - 0.5, dur: 2.2, ease: "inOut" });
    },
  };
}
