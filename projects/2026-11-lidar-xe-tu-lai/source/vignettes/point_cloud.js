// Scene 11: point_cloud — KITTI 2012 64-beam Velodyne at 10 Hz, 100 m range, >1M pts/s forming [x, y, z] + intensity point cloud.
import { streetWorld } from "./hook_night.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("street", streetWorld);
  const poseWide = { pos: [5.6, 3.6, 5.2], look: [0, 1.25, -0.3], fov: 42 };
  const poseCloud = { pos: [2.8, 2.1, 6.2], look: [0.2, 1.1, 0.8], fov: 38 };
  const camera = kit.camera(poseWide);

  const kitti = kit.beat("kitti");
  const rate = kit.beat("rate");
  const coord = kit.beat("coord");
  const cloud = kit.beat("cloud");

  // Deterministic #2D884E road + intensity-graded point cloud
  const PTS = 260;
  const ptGeo = new THREE.IcosahedronGeometry(0.044, 0);
  const ptMat = kit.toon("#2D884E", { emissive: "#2D884E" });
  ptMat.emissiveIntensity = 0.28;
  const roadCloud = new THREE.InstancedMesh(ptGeo, ptMat, PTS);
  roadCloud.userData.noInk = true;
  const next = kit.rand(412);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < PTS; i++) {
    dummy.position.set((next() - 0.5) * 5.2, 0.04, -5.5 + next() * 11.5);
    dummy.scale.setScalar(0.7 + next() * 0.65);
    dummy.updateMatrix();
    roadCloud.setMatrixAt(i, dummy.matrix);
  }
  roadCloud.instanceMatrix.needsUpdate = true;
  kit.group.add(roadCloud);

  kit.card({ title: "KITTI 2012 · 64 TIA", body: "10 HZ · TẦM 100 M", at: kitti, hold: rate - kitti - 0.7, y: 620, width: 660 });
  kit.bigText({ text: "> 1 TRIỆU ĐIỂM/S", at: rate, hold: cloud - rate - 0.6, y: 540, size: 92 });
  kit.callout({ text: "POINT CLOUD", anchor: world.ped.anchors.head, at: cloud, hold: 1.0 });

  return {
    scene: world.scene,
    camera,
    hero: [world.car.group, world.ped.group],
    update(t) {
      const fanOn = kit.ease(kit.progress(t, 0.2, 1.2), "out");
      const cloudOn = kit.ease(kit.progress(t, kitti - 1.5, 4.5), "out");

      world.set(t, {
        carPos: [0, 0, -2.8],
        spin: 0.9,
        emit: 1,
        beamMode: "fan64",
        beamLength: 6.4,
        beamActive: fanOn,
        pedPos: [0.45, 0, 2.8],
        pedRotY: -Math.PI / 2,
        pedCloud: cloudOn,
        bldgCloud: cloudOn,
      });

      roadCloud.visible = cloudOn > 0.02;
      roadCloud.scale.setScalar(0.9 + 0.1 * cloudOn);

      kit.fly(camera, t, { from: poseWide, to: poseCloud, start: coord - 0.5, dur: 3.4, ease: "inOut" });
    },
  };
}
