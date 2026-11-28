// Scene 12: filter_cluster — raw point cloud drops ground plane points, leaving clustered elevated objects.
import { streetWorld } from "./hook_night.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("street", streetWorld);
  const startPose = { pos: [4.8, 2.6, 6.2], look: [0.4, 1.1, 0.8], fov: 40 };
  const camera = kit.camera(startPose);

  const raw = kit.beat("raw");
  const ground = kit.beat("ground");
  const cluster = kit.beat("cluster");

  // Ground road points (#2D884E) that fade & drop away at `ground` beat
  const PTS = 220;
  const ptGeo = new THREE.IcosahedronGeometry(0.046, 0);
  const ptMat = kit.toon("#2D884E", { emissive: "#2D884E" });
  ptMat.emissiveIntensity = 0.28;
  ptMat.transparent = true;
  const groundCloud = new THREE.InstancedMesh(ptGeo, ptMat, PTS);
  groundCloud.userData.noInk = true;
  const next = kit.rand(515);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < PTS; i++) {
    dummy.position.set((next() - 0.5) * 5.2, 0.04, -5.0 + next() * 11.0);
    dummy.scale.setScalar(0.8 + next() * 0.5);
    dummy.updateMatrix();
    groundCloud.setMatrixAt(i, dummy.matrix);
  }
  groundCloud.instanceMatrix.needsUpdate = true;
  kit.group.add(groundCloud);

  // Subtle green cluster ring markers around pedestrian & roadside tree once clustered
  const clusterRingMat = kit.toon("#2D884E", { emissive: "#2D884E" });
  clusterRingMat.emissiveIntensity = 0.3;
  const pedRing = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.04, 6, 28), clusterRingMat);
  pedRing.rotation.x = Math.PI / 2;
  pedRing.position.set(0.45, 0.06, 2.8);
  kit.ink(pedRing);
  kit.group.add(pedRing);

  kit.callout({ text: "ĐIỂM THÔ", anchor: world.ped.anchors.head, at: raw, hold: ground - raw - 0.8 });
  kit.label({ text: "LỌC MẶT ĐƯỜNG", at: ground, hold: cluster - ground - 0.3, y: 520, size: 64 });
  kit.callout({ text: "GOM CỤM VẬT THỂ", anchor: world.ped.anchors.head, at: cluster, hold: 2.4 });

  return {
    scene: world.scene,
    camera,
    hero: [world.ped.group, world.bldgR.group],
    update(t) {
      const groundDrop = kit.ease(kit.progress(t, ground - 0.2, 0.9), "inOut");
      const clustered = kit.ease(kit.progress(t, cluster - 0.3, 0.7), "out");

      world.set(t, {
        carPos: [0, 0, -2.8],
        spin: 0.4,
        pedPos: [0.45, 0, 2.8],
        pedRotY: -Math.PI / 2,
        pedSolid: 0.35,
        pedCloud: 1,
        bldgSolid: 0.35,
        bldgCloud: 1,
      });

      groundCloud.visible = groundDrop < 0.98;
      ptMat.opacity = 1 - groundDrop;
      groundCloud.position.y = -0.35 * groundDrop;

      pedRing.visible = clustered > 0.05;
      pedRing.scale.setScalar(0.7 + 0.3 * clustered);

      kit.crane(camera, t, { ...startPose, height: 1.8, start: ground - 0.6, dur: 4.5 });
    },
  };
}
