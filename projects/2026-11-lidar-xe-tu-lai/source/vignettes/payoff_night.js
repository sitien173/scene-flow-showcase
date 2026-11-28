// Scene 18: payoff_night — return to dark street: FIRST count pulse round-trip time, THEN point cloud & bbox appear.
import { streetWorld } from "./hook_night.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const world = await kit.world("street", streetWorld);
  const startPose = { pos: [3.4, 2.35, 6.8], look: [0.2, 1.05, 0.2], fov: 38 };
  const camera = kit.camera(startPose);

  const outPulse = signalPulse(kit, { mode: "beam", length: 5.5, color: "#00B4D8" });
  outPulse.group.position.set(0, 1.8, -2.55);
  kit.group.add(outPulse.group);

  const echoPulse = signalPulse(kit, { mode: "beam", length: 5.5, color: "#F08A4B" });
  echoPulse.group.position.set(0.55, 1.2, 3.05);
  echoPulse.group.lookAt(0, 1.8, -2.55);
  kit.group.add(echoPulse.group);

  const count = kit.beat("count");

  kit.callout({ text: "ĐẾM THỜI GIAN", anchor: world.lidar.anchors.timer, at: count, hold: 2.3 });

  return {
    scene: world.scene,
    camera,
    hero: [world.car.group, world.ped.group],
    update(t) {
      // Strictly gate point cloud & bbox AFTER the timing count beat (`count`), per FACTCHECK.md & STORYBOARD.md
      const afterCount = t >= count + 0.35;
      const reveal = afterCount ? kit.ease(kit.progress(t, count + 0.35, 0.7), "out") : 0;

      world.set(t, {
        carPos: [0, 0, -2.8],
        headlights: 0.75,
        spin: 0.55,
        emit: 1,
        receive: kit.clamp01(kit.progress(t, 1.2, 0.6)),
        clock: kit.clamp01(kit.progress(t, count - 0.5, 0.5)),
        pedPos: [0.55, 0, 3.2],
        pedRotY: -Math.PI / 2,
        pedHit: kit.clamp01(kit.progress(t, 0.9, 0.4)),
        pedCloud: reveal,
        pedBbox: reveal,
      });

      outPulse.update(t, { active: 1, progress: kit.ease(kit.progress(t, 0.2, 0.9), "out") });
      echoPulse.update(t, { active: t >= 0.8 ? 1 : 0, progress: kit.ease(kit.progress(t, 0.8, 1.2), "out") });

      kit.push(camera, t, { ...startPose, amount: 1.0, start: 1.0, dur: 6.0 });
    },
  };
}
