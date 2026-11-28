// Scene 7: tof_formula — lab ruler showing c ~ 300,000 km/s, 1 ns ~ 30 cm, round-trip 2x distance, divide by 2.
import { labWorld } from "./inside_emitter.js";
import { lidarSensor } from "./lidar-sensor/lidar-sensor.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("lab", labWorld);
  const poseA = { pos: [-0.4, 2.35, 6.8], look: [0, 0.95, 0], fov: 38 };
  const poseB = { pos: [0.4, 2.25, 6.4], look: [0, 0.95, 0], fov: 38 };
  const camera = kit.camera(poseA);

  const bench = new THREE.Group();
  kit.group.add(bench);

  // Neutral linear ruler (#A5A6AA) from x = -2.0 to x = +2.0
  const rail = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.14, 0.42), kit.toon("#A5A6AA"));
  rail.position.set(0, 0.15, 0);
  bench.add(rail);
  for (let i = -4; i <= 4; i++) {
    const tick = new THREE.Mesh(new THREE.BoxGeometry(0.05, i % 2 === 0 ? 0.18 : 0.1, 0.46), kit.toon("#18191E"));
    tick.position.set(i * 0.5, 0.25, 0);
    bench.add(tick);
  }

  // Target block at right end
  const target = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.35, 0.8), kit.toon("#EFC7AD"));
  target.position.set(2.3, 0.76, 0);
  bench.add(target);

  // One-way green result bracket (#2D884E)
  const oneWayBar = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.1, 0.12), kit.toon("#2D884E", { emissive: "#2D884E" }));
  oneWayBar.position.set(0.1, 0.45, 0.35);
  oneWayBar.visible = false;
  bench.add(oneWayBar);

  kit.ink(bench);

  const sensor = lidarSensor(kit, { beamLength: 4.0 });
  sensor.group.scale.setScalar(1.25);
  sensor.group.position.set(-2.2, 0.22, 0);
  sensor.group.rotation.y = Math.PI / 2;
  kit.group.add(sensor.group);

  // Outgoing (#00B4D8) from sensor to target (+x)
  const pulseOut = signalPulse(kit, { mode: "beam", length: 4.0, color: "#00B4D8" });
  pulseOut.group.position.set(-1.95, 1.15, 0);
  pulseOut.group.rotation.y = Math.PI / 2;
  kit.group.add(pulseOut.group);

  // Returning (#F08A4B) from target back to sensor (-x)
  const pulseBack = signalPulse(kit, { mode: "beam", length: 4.0, color: "#F08A4B" });
  pulseBack.group.position.set(2.05, 0.85, 0);
  pulseBack.group.rotation.y = -Math.PI / 2;
  kit.group.add(pulseBack.group);

  const speed = kit.beat("speed");
  const ns30 = kit.beat("ns30");
  const doubleBeat = kit.beat("double");
  const half = kit.beat("half");

  kit.card({ title: "TỐC ĐỘ ÁNH SÁNG", body: "~300.000 KM/S", at: speed, hold: ns30 - speed - 0.9, y: 450, width: 620 });
  kit.label({ text: "1 NS ≈ 30 CM", at: ns30, hold: doubleBeat - ns30 - 0.4, y: 540, size: 68 });
  kit.card({ title: "CÔNG THỨC TOF", body: "KHOẢNG CÁCH =\n(c × Δt) / 2", at: half, hold: 1.6, y: 450, width: 660 });

  return {
    scene: world.scene,
    camera,
    hero: [sensor.group, bench],
    update(t) {
      const outProg = kit.ease(kit.progress(t, 0.2, 1.8), "out");
      const backProg = kit.ease(kit.progress(t, doubleBeat - 1.2, 1.8), "out");
      const oneWay = t >= half - 0.3;

      sensor.update(t, { emit: 1, receive: backProg > 0.5 ? 1 : 0, clock: oneWay ? 1 : 0 });
      pulseOut.update(t, { active: 1, progress: outProg });
      pulseBack.update(t, { active: backProg > 0.01 ? 1 : 0, progress: backProg });
      oneWayBar.visible = oneWay;
      if (oneWay) {
        const s = kit.ease(kit.progress(t, half - 0.3, 0.6), "out");
        oneWayBar.scale.x = Math.max(0.05, s);
      }

      kit.drift(camera, t, { from: poseA, to: poseB, start: 0, dur: 16 });
    },
  };
}
