// m6 / clock_knob: Shared receiver offset adds the same error to all three #F08A4B spheres;
// turning the illustrative #FCD53E adjustment knob shrinks all three radii together onto the fix.
import { orbitWorld } from "./sat_broadcast.js";
import { distanceSphere } from "./distance-sphere/distance-sphere.js";
import { atomicClock } from "./atomic-clock/atomic-clock.js";

export async function build(kit) {
  const world = await kit.world("orbit", orbitWorld);

  const p0 = { pos: [0.0, 1.35, 6.4], look: [0.0, 0.45, 0.25], fov: 40 };
  const p1 = { pos: [0.25, 1.25, 5.95], look: [0.0, 0.4, 0.35], fov: 39 };
  const camera = kit.camera(p0);

  const sameErr = kit.beat("same_err");
  const knobTurn = kit.beat("knob_turn");

  const satPos = [
    [-1.15, 1.75, 0.25],
    [1.15, 1.75, 0.25],
    [0.0, 2.15, -1.05],
  ];
  const spheres = satPos.map((pos) => {
    const s = distanceSphere(kit, { radius: 2.0 });
    s.group.position.set(...pos);
    kit.group.add(s.group);
    return s;
  });

  const knob = atomicClock(kit, { variant: "receiver", radius: 0.56 });
  knob.group.position.set(0, -0.35, 2.25);
  kit.group.add(knob.group);

  kit.label({
    text: "CÙNG MỘT SAI SỐ",
    at: sameErr,
    hold: knobTurn - sameErr - 0.2,
    y: 505,
    color: "#FCD53E",
  });
  kit.callout({
    text: "CHỈNH LỆCH ΔT",
    anchor: knob.anchors.core,
    at: knobTurn,
    hold: 2.9,
  });

  return {
    scene: world.scene,
    camera,
    hero: [...spheres.map((s) => s.group), knob.group],
    update(t) {
      const turn = kit.ease(kit.progress(t, knobTurn, 1.8), "inOut");
      const bias = kit.lerp(0.38, 0.0, turn);

      world.set(t, {
        planetPos: [0, -1.65, 0],
        atmosphere: 0,
        fix: turn,
        satPositions: satPos,
        satCount: 3,
        satScale: 0.65,
      });

      spheres.forEach((s) => {
        s.update(t, { opacity: 0.78, radiusScale: 1.0, bias });
      });

      knob.update(t, {
        speed: 0.6,
        bias: kit.lerp(0.75, 0.0, turn),
        knob: turn * 2.4,
        pulse: 0.5 + 0.5 * turn,
      });

      kit.drift(camera, t, { from: p0, to: p1, start: 0.6, dur: 6.5 });
    },
  };
}
