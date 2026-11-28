// m7 / four_unknowns: Four unknowns (X, Y, Z position plus receiver time bias Delta-t);
// 3D coordinate axes glow on Earth and a 4th satellite joins wide constellation with #00B4D8 ray.
import { orbitWorld } from "./sat_broadcast.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { atomicClock } from "./atomic-clock/atomic-clock.js";

export async function build(kit) {
  const world = await kit.world("orbit", orbitWorld);

  const p0 = { pos: [0.0, 1.5, 5.8], look: [0.0, 0.5, 0.2], fov: 40 };
  const p1 = { pos: [0.15, 1.9, 6.2], look: [0.0, 0.65, 0.15], fov: 40 };
  const camera = kit.camera(p0);

  const fourVars = kit.beat("four_vars");
  const space3d = kit.beat("space_3d");
  const fourSats = kit.beat("four_sats");

  const rxClock = atomicClock(kit, { variant: "receiver", radius: 0.44 });
  rxClock.group.position.set(1.45, 0.25, 0.95);
  kit.group.add(rxClock.group);

  const satPos = [
    [-1.45, 1.85, 0.3],
    [1.45, 1.85, 0.3],
    [-0.1, 2.3, -1.1],
    [0.05, 1.6, 1.35],
  ];
  const target = [0.0, -0.22, 0.8];

  const beams = satPos.map((src) => {
    const dx = target[0] - src[0];
    const dy = target[1] - src[1];
    const dz = target[2] - src[2];
    const len = Math.hypot(dx, dy, dz);
    const b = signalPulse(kit, { mode: "beam", length: len, color: "#00B4D8" });
    b.group.position.set(...src);
    b.group.lookAt(...target);
    kit.group.add(b.group);
    return b;
  });

  kit.card({
    title: "4 ẨN SỐ",
    body: "X · Y · Z · ΔT",
    at: Math.max(fourVars, 0.75),
    hold: space3d - Math.max(fourVars, 0.75) - 0.3,
    y: 460,
    width: 560,
  });
  kit.bigText({
    text: "≥ 4 VỆ TINH",
    at: fourSats,
    hold: 3.1,
    y: 520,
    size: 96,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.planet.group, rxClock.group],
    update(t) {
      const ax = kit.ease(kit.progress(t, space3d - 0.3, 0.8), "out");
      const s4 = t >= fourSats - 0.25;

      world.set(t, {
        planetPos: [0, -1.65, 0],
        atmosphere: 0,
        axes: ax,
        fix: s4 ? 0.5 : 0,
        satPositions: satPos,
        satCount: s4 ? 4 : 3,
        satScale: 0.65,
      });

      rxClock.update(t, { bias: 0.45, pulse: 0.75 });

      beams.forEach((b, idx) => {
        const on = idx < 3 || s4;
        const prog = idx === 3 ? kit.ease(kit.progress(t, fourSats - 0.2, 0.8), "out") : 1;
        b.update(t, { active: on ? 1 : 0, progress: prog, showTimeCode: 0.5 });
      });

      kit.fly(camera, t, { from: p0, to: p1, start: space3d - 0.4, dur: 2.6, ease: "inOut" });
    },
  };
}
