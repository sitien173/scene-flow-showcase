// Scene 10: scanner_360 — 1 beam = 1 point initially, then mechanical motor spins 360 deg sweeping road & buildings.
import { streetWorld } from "./hook_night.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("street", streetWorld);
  const startPose = { pos: [3.8, 4.3, 3.6], look: [0, 1.35, -1.6], fov: 40 };
  const camera = kit.camera(startPose);

  const one = kit.beat("one");
  const steer = kit.beat("steer");
  const spin = kit.beat("spin");

  // Single hit point ahead (#2D884E) + 360-degree ring of hit points that populate during rotation
  const ptGeo = new THREE.IcosahedronGeometry(0.08, 0);
  const ptMat = kit.toon("#2D884E", { emissive: "#2D884E" });
  ptMat.emissiveIntensity = 0.3;

  const singleDot = new THREE.Mesh(ptGeo, ptMat);
  singleDot.position.set(0, 1.4, 2.2);
  singleDot.userData.noInk = true;
  kit.group.add(singleDot);

  const RING_PTS = 36;
  const ringPts = [];
  for (let i = 0; i < RING_PTS; i++) {
    const a = (i / RING_PTS) * Math.PI * 2;
    const r = 3.8 + (kit.hash(i + 17) - 0.5) * 0.8;
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.065, 0), ptMat);
    m.position.set(Math.sin(a) * r, 0.25 + kit.hash(i + 50) * 1.1, -2.89 + Math.cos(a) * r);
    m.userData.noInk = true;
    kit.group.add(m);
    ringPts.push(m);
  }

  kit.label({ text: "1 TIA = 1 ĐIỂM", at: one, hold: steer - one - 0.3, y: 520, size: 64 });
  kit.callout({ text: "BỘ QUÉT CƠ HỌC", anchor: world.lidar.anchors.top, at: steer, hold: spin - steer - 0.4 });
  kit.bigText({ text: "360°", at: spin, hold: 1.2, y: 540, size: 120 });

  return {
    scene: world.scene,
    camera,
    hero: [world.car.group, world.lidar.group],
    update(t) {
      const scanning = t >= steer - 0.2;
      const spinRate = scanning ? 0.65 * kit.ease(kit.progress(t, steer - 0.2, 0.8), "out") : 0;

      world.set(t, {
        carPos: [0, 0, -2.8],
        spin: spinRate,
        lidarAngle: scanning ? (t - steer + 0.2) * 0.65 * Math.PI * 2 : 0,
        emit: 1,
        beamMode: "single",
        beamLength: 4.8,
        pedPos: [0.6, 0, 2.6],
        pedRotY: Math.PI,
      });

      singleDot.visible = t >= one - 0.3;
      const ringReveal = kit.progress(t, steer, 5.2);
      ringPts.forEach((m, i) => {
        m.visible = scanning && (i / RING_PTS) <= ringReveal;
      });

      if (t < steer) {
        kit.setPose(camera, startPose);
      } else {
        const dt = t - steer;
        kit.orbit(camera, dt, { center: [0, 1.25, -2.4], radius: 6.1, height: 3.1, angle: 0.62, speed: 0.26, fov: 40 });
      }
    },
  };
}
