// Scene 6: tof_roundtrip — outgoing #00B4D8 pulse hits pedestrian, #F08A4B echo returns to photodetector, timing Δt = ToF.
import { streetWorld } from "./hook_night.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const world = await kit.world("street", streetWorld);
  const poseWide = { pos: [3.4, 2.35, 6.8], look: [0.2, 1.05, 0.2], fov: 38 };
  const poseDetector = { pos: [1.5, 2.25, -0.7], look: [0, 1.85, -2.85], fov: 34 };
  const camera = kit.camera(poseWide);

  const hit = kit.beat("hit");
  const detector = kit.beat("detector");
  const clockBeat = kit.beat("clock");
  const tof = kit.beat("tof");

  const outPulse = signalPulse(kit, { mode: "beam", length: 5.5, color: "#00B4D8" });
  outPulse.group.position.set(0, 1.8, -2.55);
  kit.group.add(outPulse.group);

  const echoPulse = signalPulse(kit, { mode: "beam", length: 5.5, color: "#F08A4B" });
  echoPulse.group.position.set(0.35, 1.25, 3.0);
  echoPulse.group.lookAt(0, 1.8, -2.55);
  kit.group.add(echoPulse.group);

  kit.callout({ text: "PHOTODETECTOR", anchor: world.lidar.anchors.detector, at: detector, hold: 5.2 });
  kit.bigText({ text: "TIME OF FLIGHT", at: tof, hold: 2.8, y: 520, size: 96 });

  return {
    scene: world.scene,
    camera,
    hero: [world.car.group, world.ped.group],
    update(t) {
      const outProg = kit.ease(kit.progress(t, 0.1, Math.max(0.5, hit)), "out");
      const hitOn = kit.clamp01(kit.progress(t, hit - 0.1, 0.4));
      const echoProg = kit.ease(kit.progress(t, hit + 0.2, 2.2), "out");
      const rxOn = kit.clamp01(kit.progress(t, detector - 0.8, 0.6));
      const clkOn = kit.clamp01(kit.progress(t, clockBeat - 0.2, 0.5));

      world.set(t, {
        carPos: [0, 0, -2.8],
        spin: 0.25,
        emit: 0.9,
        receive: rxOn,
        clock: clkOn,
        cutaway: kit.ease(kit.progress(t, detector - 1.2, 0.9), "inOut") * 0.75,
        pedPos: [0.35, 0, 3.15],
        pedRotY: Math.PI,
        pedHit: hitOn,
        pedHitY: 1.22,
      });

      outPulse.update(t, { active: 1, progress: outProg });
      echoPulse.update(t, { active: echoProg > 0.01 ? 1 : 0, progress: echoProg });

      kit.fly(camera, t, { from: poseWide, to: poseDetector, start: detector - 1.4, dur: 2.2, ease: "inOut" });
    },
  };
}
