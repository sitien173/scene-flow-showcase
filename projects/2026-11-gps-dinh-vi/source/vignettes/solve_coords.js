// m8 / solve_coords: Constrain position and Delta-t together; extra measurement ("phép đo thêm")
// tightens best-fit solution to #2D884E fix (latitude, longitude, altitude), while phone display clock stays fixed.
import { orbitWorld } from "./sat_broadcast.js";
import { distanceSphere } from "./distance-sphere/distance-sphere.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { atomicClock } from "./atomic-clock/atomic-clock.js";
import { smartphone } from "./smartphone/smartphone.js";

export async function build(kit) {
  const world = await kit.world("orbit", orbitWorld);

  const p0 = { pos: [0.0, 1.65, 6.1], look: [0.0, 0.45, 0.2], fov: 40 };
  const pPhone = { pos: [0.65, 0.95, 3.9], look: [0.4, 0.25, 0.9], fov: 36 };
  const camera = kit.camera(p0);

  const constrain = kit.beat("constrain");
  const bestFit = kit.beat("best_fit");
  const calcOnly = kit.beat("calc_only");
  const latLon = kit.beat("lat_lon");

  const satPos = [
    [-1.45, 1.85, 0.3],
    [1.45, 1.85, 0.3],
    [-0.1, 2.3, -1.1],
    [0.05, 1.6, 1.35],
    [-1.7, 1.3, -0.75],
  ];
  const target = [0.0, -0.22, 0.8];

  const spheres = satPos.slice(0, 4).map((pos) => {
    const s = distanceSphere(kit, { radius: 2.0 });
    s.group.position.set(...pos);
    kit.group.add(s.group);
    return s;
  });

  const extraRay = signalPulse(kit, {
    mode: "beam",
    length: Math.hypot(target[0] - satPos[4][0], target[1] - satPos[4][1], target[2] - satPos[4][2]),
    color: "#00B4D8",
  });
  extraRay.group.position.set(...satPos[4]);
  extraRay.group.lookAt(...target);
  kit.group.add(extraRay.group);

  const solverDial = atomicClock(kit, { variant: "receiver", radius: 0.44 });
  solverDial.group.position.set(1.35, 0.35, 0.95);

  const phone = smartphone(kit, { screenMode: "gps" });
  phone.group.position.set(-0.25, 0.12, 1.35);
  phone.group.rotation.set(0.95, 0.2, 0);
  phone.group.scale.setScalar(1.05);

  kit.group.add(solverDial.group, phone.group);

  kit.callout({
    text: "PHÉP ĐO THÊM",
    anchor: extraRay.anchors.mid,
    at: bestFit - 1.4,
    hold: 0.9,
  });
  kit.label({
    text: "KHỚP DỮ LIỆU NHẤT",
    at: bestFit,
    hold: calcOnly - bestFit - 0.2,
    y: 505,
    color: "#2D884E",
  });
  kit.callout({
    text: "CHỈNH PHÉP TÍNH",
    anchor: solverDial.anchors.core,
    at: calcOnly,
    hold: latLon - calcOnly - 0.35,
  });
  kit.card({
    title: "TỌA ĐỘ CHỐT",
    body: "VĨ ĐỘ · KINH ĐỘ · ĐỘ CAO",
    at: latLon,
    hold: 2.4,
    y: 460,
    width: 680,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.planet.group, phone.group, solverDial.group],
    update(t) {
      const fit = kit.ease(kit.progress(t, constrain, bestFit - constrain), "inOut");
      const locked = kit.ease(kit.progress(t, bestFit, 0.7), "out");
      const showExtra = t >= bestFit - 1.5;

      world.set(t, {
        planetPos: [0, -1.65, 0],
        atmosphere: 0,
        fix: locked,
        satPositions: satPos,
        satCount: showExtra ? 5 : 4,
        satScale: 0.62,
      });

      spheres.forEach((s) => {
        s.update(t, {
          opacity: t < calcOnly ? 0.55 * (1 - 0.35 * locked) : 0.18,
          radiusScale: 1.0,
          bias: kit.lerp(0.28, 0.0, fit),
        });
      });

      extraRay.update(t, {
        active: showExtra ? 1 : 0,
        progress: kit.ease(kit.progress(t, bestFit - 1.5, 0.7), "out"),
        showTimeCode: 0.7,
      });

      solverDial.update(t, {
        bias: kit.lerp(0.65, 0.0, fit),
        knob: fit * 2.1,
        pulse: 0.4 + 0.6 * locked,
      });

      phone.group.visible = t >= calcOnly - 0.5;
      phone.update(t, { fix: locked, dotPulse: 1, haloRadius: 0.25 });

      if (t >= calcOnly - 0.4) {
        kit.fly(camera, t, { from: p0, to: pPhone, start: calcOnly - 0.4, dur: 1.2, ease: "inOut" });
      } else {
        kit.setPose(camera, p0);
      }
    },
  };
}
