// m2 / timing_delay: 1 microsecond equals ~300 m range measurement error (not blue dot jump),
// plus atmospheric slowdown on #00B4D8 wave that receiver corrects.
import { orbitWorld } from "./sat_broadcast.js";
import { atomicClock } from "./atomic-clock/atomic-clock.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { smartphone } from "./smartphone/smartphone.js";

export async function build(kit) {
  const world = await kit.world("orbit", orbitWorld);
  const { THREE } = kit;

  const p0 = { pos: [0.0, 1.35, 5.5], look: [-0.05, 0.45, 0.35], fov: 40 };
  const pAtmo = { pos: [0.35, 0.65, 3.85], look: [0.25, 0.05, 0.75], fov: 38 };
  const camera = kit.camera(p0);

  const oneUs = kit.beat("one_us");
  const rangeErr = kit.beat("range_err");
  const atmoDelay = kit.beat("atmo_delay");
  const correctDelay = kit.beat("correct_delay");

  const rxClock = atomicClock(kit, { variant: "receiver", radius: 0.46 });
  rxClock.group.position.set(1.4, 0.35, 0.85);

  const beam = signalPulse(kit, { mode: "beam", length: 2.3, color: "#00B4D8" });
  beam.group.position.set(-1.05, 1.6, 0.1);
  beam.group.lookAt(0.35, -0.25, 0.85);

  const errSeg = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, 0.72, 10),
    kit.toon("#DD3428", { emissive: "#DD3428" })
  );
  errSeg.position.set(0.35, 0.15, 0.85);
  errSeg.rotation.z = 0.55;
  kit.ink(errSeg);

  const refPhone = smartphone(kit, { screenMode: "gps" });
  refPhone.group.position.set(-1.25, -0.3, 1.05);
  refPhone.group.rotation.set(0.95, 0.25, 0);
  refPhone.group.scale.setScalar(0.95);

  kit.group.add(rxClock.group, beam.group, errSeg, refPhone.group);

  kit.bigText({
    text: "1 PHẦN TRIỆU GIÂY ≈ 300 M",
    at: Math.max(oneUs, 0.8),
    hold: rangeErr - Math.max(oneUs, 0.8) - 0.2,
    y: 520,
    size: 60,
  });
  kit.card({
    title: "SAI SỐ ĐO KHOẢNG CÁCH",
    body: "CHƯA PHẢI CHẤM XANH LỆCH 300 M",
    at: rangeErr,
    hold: Math.max(0.5, atmoDelay - rangeErr - 0.95),
    y: 460,
    width: 700,
  });
  kit.callout({
    text: "TRỄ KHÍ QUYỂN",
    anchor: world.planet.anchors.atmosphere,
    at: atmoDelay,
    hold: 3.4,
  });

  const satPos = [
    [-1.05, 1.95, 0.1],
    [1.65, 1.85, -0.8],
    [-1.7, 1.35, -0.9],
  ];

  return {
    scene: world.scene,
    camera,
    hero: [world.planet.group, rxClock.group, refPhone.group],
    update(t) {
      const atmoPhase = t >= atmoDelay && t < correctDelay;
      const fixPhase = kit.ease(kit.progress(t, correctDelay, 0.7), "out");

      world.set(t, {
        planetPos: [0.35, -1.65, 0],
        atmosphere: 1,
        atmoGlow: atmoPhase ? 1 : (t >= correctDelay ? 0.35 : 0.15),
        fix: fixPhase,
        satPositions: satPos,
        satCount: 3,
        satScale: 0.68,
      });

      rxClock.update(t, { bias: t < correctDelay ? 0.45 : 0.0, pulse: 0.7 });
      refPhone.group.visible = t >= rangeErr - 0.2 && t < atmoDelay + 0.4;
      refPhone.update(t, { dotPulse: 1, haloRadius: 0.3 });

      const errScale = t < atmoDelay ? 1 : (1 - fixPhase);
      errSeg.visible = errScale > 0.04;
      errSeg.scale.set(1, Math.max(0.02, errScale), 1);

      beam.update(t, {
        active: 1,
        progress: 1,
        speedFactor: atmoPhase ? 0.36 : 1.0,
        showTimeCode: 0.7,
      });

      if (t >= atmoDelay - 0.3) {
        kit.fly(camera, t, { from: p0, to: pAtmo, start: atmoDelay - 0.3, dur: 1.1, ease: "inOut" });
      } else {
        kit.setPose(camera, p0);
      }
    },
  };
}
