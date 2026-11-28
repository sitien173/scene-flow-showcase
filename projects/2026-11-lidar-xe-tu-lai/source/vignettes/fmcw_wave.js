// Scene 9: fmcw_wave — continuous frequency-modulated wave (#00B4D8) & Doppler-shifted echo (#F08A4B) -> distance + velocity.
import { labWorld } from "./inside_emitter.js";
import { lidarSensor } from "./lidar-sensor/lidar-sensor.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("lab", labWorld);
  const poseA = { pos: [-0.3, 2.3, 6.6], look: [0, 0.95, 0], fov: 38 };
  const poseB = { pos: [0.3, 2.2, 6.2], look: [0, 0.95, 0], fov: 38 };
  const camera = kit.camera(poseA);

  const sensor = lidarSensor(kit, { beamLength: 3.6 });
  sensor.group.scale.setScalar(1.3);
  sensor.group.position.set(-2.2, 0.1, 0);
  sensor.group.rotation.y = Math.PI / 2;
  kit.group.add(sensor.group);

  // Sliding target block representing a moving vehicle/obstacle
  const target = new THREE.Group();
  const block = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.35, 0.85), kit.toon("#EFC7AD"));
  block.position.y = 0.72;
  const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.34, 6), kit.toon("#2D884E"));
  arrow.rotation.z = -Math.PI / 2;
  arrow.position.set(0.5, 0.72, 0);
  target.add(block, arrow);
  kit.ink(target);
  kit.group.add(target);

  // Continuous wave strips (modulated rings along +x and -x)
  const cwOut = signalPulse(kit, { mode: "prn", length: 3.8, color: "#00B4D8", prnIndex: 0 });
  cwOut.group.position.set(-1.75, 1.1, 0);
  cwOut.group.rotation.y = Math.PI / 2;
  kit.group.add(cwOut.group);

  const cwEcho = signalPulse(kit, { mode: "prn", length: 3.8, color: "#F08A4B", prnIndex: 1 });
  cwEcho.group.position.set(1.9, 0.72, 0);
  cwEcho.group.rotation.y = -Math.PI / 2;
  kit.group.add(cwEcho.group);

  const waveAnchor = new THREE.Object3D();
  waveAnchor.position.set(0, 1.15, 0);
  kit.group.add(waveAnchor);

  const cw = kit.beat("cw");
  const shift = kit.beat("shift");
  const fmcw = kit.beat("fmcw");

  kit.callout({ text: "SÓNG LIÊN TỤC", anchor: waveAnchor, at: cw, hold: fmcw - cw - 0.5 });
  kit.card({ title: "FMCW", body: "ĐO KHOẢNG CÁCH\n+ TỐC ĐỘ", at: fmcw, hold: 3.6, y: 450, width: 640 });

  return {
    scene: world.scene,
    camera,
    hero: [sensor.group, target],
    update(t) {
      const targetX = 2.0 + Math.sin(t * 1.4) * 0.45;
      target.position.set(targetX, 0.08, 0);
      const vShift = 1 + 0.35 * Math.cos(t * 1.4);

      sensor.update(t, { emit: 1, receive: t >= shift - 0.3 ? 1 : 0.4, clock: t >= fmcw ? 1 : 0.3 });
      cwOut.update(t, { active: 1, progress: 1, speedFactor: 1.0 });
      cwEcho.update(t, { active: 1, progress: 1, speedFactor: vShift });

      kit.drift(camera, t, { from: poseA, to: poseB, start: 0, dur: 9.5 });
    },
  };
}
