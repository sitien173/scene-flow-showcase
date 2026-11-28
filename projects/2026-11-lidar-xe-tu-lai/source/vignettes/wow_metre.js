// Scene 17: wow_metre — 1 m SI ruler defined by light in vacuum (1/299,792,458 s), linked directly to LiDAR speed constant.
import { labWorld } from "./inside_emitter.js";
import { lidarSensor } from "./lidar-sensor/lidar-sensor.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { distanceSphere } from "./distance-sphere/distance-sphere.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("lab", labWorld);
  const poseStart = { pos: [-1.4, 2.05, 5.4], look: [-0.8, 0.7, 0], fov: 38 };
  const poseEnd = { pos: [0.8, 2.25, 6.2], look: [0.2, 0.85, 0], fov: 38 };
  const camera = kit.camera(poseStart);

  // 1-metre ruler bar on lab bench
  const rulerGroup = new THREE.Group();
  kit.group.add(rulerGroup);

  const bar = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.22, 0.56), kit.toon("#FCD53E"));
  bar.position.set(-0.4, 0.2, 0);
  rulerGroup.add(bar);

  for (let i = 0; i <= 10; i++) {
    const tick = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, i === 0 || i === 10 ? 0.24 : 0.14, 0.6),
      kit.toon("#18191E")
    );
    tick.position.set(-2.4 + i * 0.4, 0.34, 0);
    rulerGroup.add(tick);
  }
  kit.ink(rulerGroup);

  // Pulse racing from 0 to 1 m
  const pulse = signalPulse(kit, { mode: "beam", length: 4.0, color: "#00B4D8" });
  pulse.group.position.set(-2.4, 0.92, 0);
  pulse.group.rotation.y = Math.PI / 2;
  kit.group.add(pulse.group);

  // LiDAR sensor at right end receiving the exact same constant c
  const sensor = lidarSensor(kit, { beamLength: 2.0 });
  sensor.group.scale.setScalar(1.3);
  sensor.group.position.set(2.35, 0.1, 0);
  sensor.group.rotation.y = -Math.PI / 2;
  kit.group.add(sensor.group);

  const linkSphere = distanceSphere(kit, { radius: 0.95, color: "#F08A4B", errorColor: "#DD3428" });
  linkSphere.group.position.set(2.35, 0.72, 0);
  kit.group.add(linkSphere.group);

  const metre = kit.beat("metre");
  const vacuum = kit.beat("vacuum");
  const sameC = kit.beat("same_c");

  kit.bigText({ text: "MÉT ĐƯỢC ĐỊNH NGHĨA\nBẰNG ÁNH SÁNG", at: metre, hold: vacuum - metre - 0.6, y: 690, size: 76 });
  kit.card({ title: "ĐỊNH NGHĨA SI", body: "1 / 299.792.458 S\n(≈ 1/300 TRIỆU S)", at: vacuum, hold: sameC - vacuum - 0.6, y: 620, width: 680 });
  kit.callout({ text: "CHÍNH TỐC ĐỘ ĐÓ", anchor: sensor.anchors.timer, at: sameC, hold: 1.5 });

  return {
    scene: world.scene,
    camera,
    hero: [rulerGroup, sensor.group],
    update(t) {
      const linkOn = kit.ease(kit.progress(t, sameC - 0.8, 0.9), "out");

      pulse.update(t, { active: 1, progress: 1, speedFactor: 1.3 });
      sensor.update(t, { emit: 1, clock: linkOn });
      linkSphere.update(t, { opacity: linkOn * 0.85, radiusScale: 0.6 + 0.4 * linkOn, spin: 0.7 });

      kit.fly(camera, t, { from: poseStart, to: poseEnd, start: vacuum - 0.5, dur: 4.2, ease: "inOut" });
    },
  };
}
