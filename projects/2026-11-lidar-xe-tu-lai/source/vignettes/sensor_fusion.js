// Scene 15: sensor_fusion — LiDAR range accuracy + Camera visual recognition merged into #DD3428 bounding box.
import { streetWorld } from "./hook_night.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const world = await kit.world("street", streetWorld);
  const startPose = { pos: [2.4, 2.0, -0.3], look: [0.3, 1.15, 2.2], fov: 38 };
  const camera = kit.camera(startPose);

  const pulse = signalPulse(kit, { mode: "beam", length: 5.5, color: "#00B4D8" });
  pulse.group.position.set(0, 1.8, -2.55);
  kit.group.add(pulse.group);

  const weak = kit.beat("weak");
  const pair = kit.beat("pair");

  kit.callout({ text: "ĐO CỰ LY", anchor: world.lidar.anchors.top, at: weak, hold: pair - weak - 0.5 });
  kit.callout({ text: "CAMERA + LIDAR", anchor: world.ped.anchors.bboxTop, at: pair, hold: 0.9 });

  return {
    scene: world.scene,
    camera,
    hero: [world.car.group, world.ped.group],
    update(t) {
      const camOn = kit.ease(kit.progress(t, weak + 1.4, 1.2), "out");
      const fused = kit.ease(kit.progress(t, pair - 0.6, 0.6), "out");

      world.set(t, {
        carPos: [0, 0, -2.8],
        emit: 0.9,
        spin: 0.5,
        cameraCone: camOn,
        pedPos: [0.45, 0, 3.0],
        pedRotY: Math.PI,
        pedCloud: 0.9,
        pedBbox: fused,
      });

      pulse.update(t, { active: 1, progress: 1 });

      kit.push(camera, t, { ...startPose, amount: 0.9, start: weak, dur: 5.5 });
    },
  };
}
