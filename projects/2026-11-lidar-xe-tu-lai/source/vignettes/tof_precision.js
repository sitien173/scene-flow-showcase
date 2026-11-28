// Scene 8: tof_precision — 15 m separation -> ~100 ns round-trip; 1 ns clock error -> ~15 cm distance error (#DD3428).
import { streetWorld } from "./hook_night.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { distanceSphere } from "./distance-sphere/distance-sphere.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("street", streetWorld);
  const pose = { pos: [5.4, 2.0, 0.4], look: [0.15, 1.05, 0.3], fov: 38 };
  const camera = kit.camera(pose);

  // Neutral 15 m baseline marker (#A5A6AA) on the street
  const tape = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 5.4), kit.toon("#A5A6AA"));
  tape.position.set(0.25, 0.025, 0.3);
  kit.ink(tape);
  kit.group.add(tape);

  const outPulse = signalPulse(kit, { mode: "beam", length: 5.5, color: "#00B4D8" });
  outPulse.group.position.set(0, 1.8, -2.55);
  kit.group.add(outPulse.group);

  const echoPulse = signalPulse(kit, { mode: "beam", length: 5.5, color: "#F08A4B" });
  echoPulse.group.position.set(0.35, 1.25, 3.0);
  echoPulse.group.lookAt(0, 1.8, -2.55);
  kit.group.add(echoPulse.group);

  const errSphere = distanceSphere(kit, { radius: 0.72, color: "#A5A6AA", errorColor: "#DD3428" });
  errSphere.group.position.set(0.35, 1.05, 3.15);
  kit.group.add(errSphere.group);

  const d15 = kit.beat("d15");
  const t100 = kit.beat("t100");
  const err15 = kit.beat("err15");

  kit.label({ text: "15 M → ~100 NS", at: t100, hold: err15 - t100 - 0.4, y: 520, size: 64 });
  kit.card({ title: "SAI SỐ 1 NS", body: "LỆCH ~15 CM", at: err15, hold: 1.5, y: 450, width: 580 });

  return {
    scene: world.scene,
    camera,
    hero: [world.car.group, world.ped.group],
    update(t) {
      const hasErr = t >= err15 - 0.3;
      const errOsc = hasErr ? Math.sin((t - err15) * 6) * 0.24 : 0;

      world.set(t, {
        carPos: [0, 0, -2.8],
        emit: 0.85,
        receive: t >= t100 - 0.5 ? 0.9 : 0,
        clock: hasErr ? 1 : 0.4,
        pedPos: [0.35, 0, 3.15],
        pedRotY: Math.PI,
        pedHit: kit.clamp01(kit.progress(t, d15, 0.4)),
      });

      outPulse.update(t, { active: 1, progress: 1 });
      echoPulse.update(t, { active: 1, progress: kit.ease(kit.progress(t, d15, 1.2), "out") });
      errSphere.update(t, {
        opacity: hasErr ? 0.95 : 0.45,
        radiusScale: 1,
        bias: errOsc,
        spin: 0.5,
      });

      kit.push(camera, t, { ...pose, amount: 1.1, start: err15 - 1.2, dur: 2.8 });
    },
  };
}
