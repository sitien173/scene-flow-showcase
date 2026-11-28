// m1 / time_to_dist: Send & receive #FCD53E time marks yield Delta-t,
// multiplied by speed of light (~300,000 km/s) along #00B4D8 signal beam for distance estimate.
import { orbitWorld } from "./sat_broadcast.js";
import { atomicClock } from "./atomic-clock/atomic-clock.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const world = await kit.world("orbit", orbitWorld);
  const { THREE } = kit;

  const p0 = { pos: [0.0, 1.35, 5.7], look: [-0.05, 0.65, 0.3], fov: 40 };
  const p1 = { pos: [0.2, 1.05, 5.05], look: [0.05, 0.55, 0.4], fov: 39 };
  const camera = kit.camera(p0);

  const twoMarks = kit.beat("two_marks");
  const deltaT = kit.beat("delta_t");
  const lightSpd = kit.beat("light_spd");
  const distEst = kit.beat("dist_est");

  const txClock = atomicClock(kit, { variant: "atomic", radius: 0.48 });
  txClock.group.position.set(-1.65, 1.55, 0.55);

  const rxClock = atomicClock(kit, { variant: "receiver", radius: 0.48 });
  rxClock.group.position.set(1.25, 0.15, 0.85);

  const beam = signalPulse(kit, { mode: "beam", length: 2.35, color: "#00B4D8" });
  beam.group.position.set(-1.0, 1.6, 0.15);
  beam.group.lookAt(0.35, -0.25, 0.85);

  // Distance bracket rod along the beam path (#F08A4B)
  const distRod = new THREE.Group();
  distRod.position.set(-1.0, 1.6, 0.15);
  distRod.lookAt(0.35, -0.25, 0.85);
  const rodMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 2.35, 10),
    kit.toon("#F08A4B", { emissive: "#F08A4B" })
  );
  rodMesh.rotation.x = Math.PI / 2;
  rodMesh.position.set(0.14, 0, 1.175);
  distRod.add(rodMesh);
  kit.ink(distRod);
  distRod.visible = false;

  kit.group.add(txClock.group, rxClock.group, beam.group, distRod);

  kit.label({
    text: "MỐC PHÁT · MỐC NHẬN",
    at: twoMarks,
    hold: deltaT - twoMarks - 0.25,
    y: 500,
    color: "#FCD53E",
  });
  kit.card({
    title: "THỜI GIAN TRUYỀN",
    body: "ΔT × TỐC ĐỘ ÁNH SÁNG",
    at: deltaT,
    hold: Math.max(0.5, lightSpd - deltaT - 0.95),
    y: 460,
    width: 640,
  });
  kit.bigText({
    text: "~300.000 KM/S",
    at: lightSpd,
    hold: 4.6,
    y: 530,
    size: 92,
  });

  const satPos = [
    [-1.0, 1.95, 0.15],
    [1.65, 1.9, -0.8],
    [-1.75, 1.4, -0.9],
  ];

  return {
    scene: world.scene,
    camera,
    hero: [txClock.group, rxClock.group, world.planet.group],
    update(t) {
      world.set(t, {
        planetPos: [0.35, -1.65, 0],
        satPositions: satPos,
        satCount: 3,
        satScale: 0.68,
        satTxGlow: 0.9,
      });

      kit.popIn(txClock.group, t, twoMarks - 0.2, { dur: 0.3 });
      kit.popIn(rxClock.group, t, twoMarks + 0.1, { dur: 0.3 });
      txClock.update(t, { speed: 0.85, pulse: t >= deltaT ? 1 : 0.6 });
      rxClock.update(t, { speed: 0.85, pulse: t >= deltaT ? 1 : 0.6 });

      const spd = t >= lightSpd ? 2.4 : 1.0;
      beam.update(t, {
        active: 1,
        progress: 1,
        speedFactor: spd,
        showTimeCode: t >= twoMarks ? 1 : 0,
      });

      distRod.visible = t >= distEst;
      if (distRod.visible) {
        const s = kit.ease(kit.progress(t, distEst, 0.6), "out");
        rodMesh.scale.set(1, Math.max(0.05, s), 1);
      }

      kit.drift(camera, t, { from: p0, to: p1, start: 0.8, dur: 12.0 });
    },
  };
}
