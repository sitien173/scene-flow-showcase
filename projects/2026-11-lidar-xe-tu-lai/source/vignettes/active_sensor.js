// Scene 4: active_sensor — passive windshield camera vs active laser-emitting LiDAR without streetlamps.
import { streetWorld } from "./hook_night.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const world = await kit.world("street", streetWorld);
  const poseCam = { pos: [1.8, 1.75, -0.1], look: [0, 1.32, -2.15], fov: 35 };
  const poseLidar = { pos: [3.4, 2.8, 2.2], look: [0, 1.25, -2.2], fov: 38 };
  const camera = kit.camera(poseCam);

  const passive = kit.beat("passive");
  const active = kit.beat("active");
  const noLamp = kit.beat("no_lamp");

  const rings = signalPulse(kit, { mode: "rings", length: 4.5, color: "#00B4D8" });
  rings.group.position.set(0, 1.82, -2.55);
  kit.group.add(rings.group);

  const beam = signalPulse(kit, { mode: "beam", length: 5.2, color: "#00B4D8" });
  beam.group.position.set(0, 1.82, -2.55);
  kit.group.add(beam.group);

  kit.callout({ text: "THỤ ĐỘNG", anchor: world.car.anchors.windshieldCam, at: passive, hold: active - passive - 0.6 });
  kit.callout({ text: "LIDAR · CHỦ ĐỘNG", anchor: world.lidar.anchors.top, at: active, hold: noLamp - active - 0.5 });
  kit.label({ text: "KHÔNG CẦN ĐÈN ĐƯỜNG", at: noLamp, hold: 1.0, y: 520, size: 58 });

  return {
    scene: world.scene,
    camera,
    hero: [world.car.group],
    update(t) {
      const isLidar = t >= active - 0.5;
      const lidarProg = kit.ease(kit.progress(t, active - 0.3, 1.0), "out");

      world.set(t, {
        carPos: [0, 0, -2.8],
        cameraCone: isLidar ? 0.35 : 0.95,
        spin: isLidar ? 0.8 : 0.2,
        emit: lidarProg,
        lidarGlow: isLidar ? 1 : 0.4,
        pedVisible: false,
        showLamp: false,
      });

      rings.update(t, { active: lidarProg, progress: lidarProg });
      beam.update(t, { active: lidarProg, progress: lidarProg });

      kit.fly(camera, t, { from: poseCam, to: poseLidar, start: active - 0.6, dur: 1.8, ease: "inOut" });
    },
  };
}
