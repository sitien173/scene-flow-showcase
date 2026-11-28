// Scene 5: inside_emitter — cutaway lidar-sensor in lab world showing Rangefinder + Beam Scanner + NIR pulses.
import { lidarSensor } from "./lidar-sensor/lidar-sensor.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export function labWorld(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ surroundings: false, size: 60, color: kit.PALETTE.paper, shadow: 8 });

  const pad = new THREE.Mesh(
    new THREE.CylinderGeometry(3.8, 3.9, 0.08, 32),
    kit.toon("#D6D2C7", { map: kit.paperTexture(3) })
  );
  pad.position.y = 0.04;
  pad.receiveShadow = true;
  scene.add(pad);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.82, 0.035, 6, 48),
    kit.toon("#A5A6AA")
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.085;
  scene.add(ring);

  kit.ink(scene, { shadows: false });
  return { scene };
}

export async function build(kit) {
  const world = await kit.world("lab", labWorld);
  const startPose = { pos: [2.4, 2.2, 4.4], look: [0, 1.0, 0.1], fov: 36 };
  const camera = kit.camera(startPose);

  const sensor = lidarSensor(kit, { beamLength: 2.8 });
  sensor.group.scale.setScalar(2.35);
  sensor.group.position.set(0, 0.08, 0);
  kit.group.add(sensor.group);

  const pulses = signalPulse(kit, { mode: "beam", length: 2.8, color: "#00B4D8" });
  pulses.group.position.set(0, 0.96, 0.92);
  kit.group.add(pulses.group);

  const parts = kit.beat("parts");
  const diode = kit.beat("diode");
  const pulse = kit.beat("pulse");

  kit.callout({ text: "2 PHẦN CHÍNH", anchor: sensor.anchors.body, at: parts, hold: diode - parts - 0.4 });
  kit.callout({ text: "ĐI-ỐT LASER", anchor: sensor.anchors.diode, at: diode, hold: 3.2 });

  return {
    scene: world.scene,
    camera,
    hero: [sensor.group],
    update(t) {
      const cutProg = kit.ease(kit.progress(t, 0.2, 1.4), "inOut");
      const emitProg = kit.ease(kit.progress(t, diode - 0.2, 0.6), "out");
      const beamProg = kit.ease(kit.progress(t, pulse - 0.2, 0.9), "out");

      sensor.update(t, {
        cutaway: 0.2 + 0.78 * cutProg,
        spin: 0.65,
        emit: emitProg,
        beamMode: "none",
      });
      pulses.update(t, { active: beamProg, progress: beamProg, speedFactor: 1.25 });

      kit.push(camera, t, { ...startPose, amount: 0.85, start: diode - 0.3, dur: 3.4 });
    },
  };
}
