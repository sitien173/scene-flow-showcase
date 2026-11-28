// m9 / sat_geometry: Bunched satellites produce elongated #DD3428 position error zone;
// spreading satellites across wide directions shrinks the error around the #2D884E fix.
import { orbitWorld } from "./sat_broadcast.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const world = await kit.world("orbit", orbitWorld);

  const p0 = { pos: [0.0, 3.65, 5.1], look: [0.0, 0.35, 0.25], fov: 40 };
  const p1 = { pos: [0.25, 3.45, 5.25], look: [0.0, 0.35, 0.25], fov: 40 };
  const camera = kit.camera(p0);

  const bunched = kit.beat("bunched");
  const spread = kit.beat("spread");

  const bunchedPos = [
    [-1.65, 1.9, -0.55],
    [-1.2, 2.15, -0.85],
    [-0.9, 1.75, -0.35],
    [-1.4, 2.25, -0.15],
  ];
  const spreadPos = [
    [-1.65, 1.9, 0.55],
    [1.65, 1.9, 0.55],
    [-1.1, 2.2, -1.1],
    [1.1, 2.2, -1.1],
  ];
  const target = [0.0, -0.22, 0.8];

  const beams = Array.from({ length: 4 }, () => {
    const b = signalPulse(kit, { mode: "beam", length: 2.35, color: "#00B4D8" });
    kit.group.add(b.group);
    return b;
  });

  kit.label({
    text: "TỤ MỘT PHÍA → LỆCH NHIỀU",
    at: bunched,
    hold: spread - bunched - 0.3,
    y: 510,
    color: "#DD3428",
  });
  kit.callout({
    text: "TRẢI ĐỀU HƯỚNG",
    anchor: world.planet.anchors.surface,
    at: spread,
    hold: 3.3,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.planet.group],
    update(t) {
      const x = kit.ease(kit.progress(t, spread - 0.35, 1.2), "inOut");
      const satPos = bunchedPos.map((a, i) => [
        kit.lerp(a[0], spreadPos[i][0], x),
        kit.lerp(a[1], spreadPos[i][1], x),
        kit.lerp(a[2], spreadPos[i][2], x),
      ]);

      world.set(t, {
        planetPos: [0, -1.65, 0],
        atmosphere: 0,
        fix: x,
        errorRing: kit.lerp(1.0, 0.22, x),
        errorStretch: kit.lerp(2.7, 1.0, x),
        satPositions: satPos,
        satCount: 4,
        satScale: 0.62,
      });

      beams.forEach((b, i) => {
        b.group.position.set(...satPos[i]);
        b.group.lookAt(...target);
        b.update(t, { active: 1, progress: 1, showTimeCode: 0.4 });
      });

      kit.drift(camera, t, { from: p0, to: p1, start: 0.5, dur: 7.0 });
    },
  };
}
