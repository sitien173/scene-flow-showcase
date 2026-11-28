// r1 / sat_broadcast: Orbital night view around Earth; satellites broadcast #00B4D8 radio waves,
// cutaway exposes #FCD53E atomic clock, and signals carry timestamp + orbital path data.
// Exports orbitWorld(kit) shared by all orbital vignettes.
import { earth } from "./earth/earth.js";
import { gpsSatellite } from "./gps-satellite/gps-satellite.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export function orbitWorld(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ ground: false, surroundings: false });

  // Deterministic starfield far behind the orbital plane
  const stars = new THREE.Group();
  const next = kit.rand(42);
  const starGeo = new THREE.OctahedronGeometry(0.11, 0);
  const starWhite = new THREE.MeshBasicMaterial({ color: "#FAFCFB" });
  const starGold = new THREE.MeshBasicMaterial({ color: "#FCD53E" });
  for (let i = 0; i < 84; i++) {
    const theta = next() * Math.PI * 2;
    const phi = Math.acos(2 * next() - 1);
    const r = 46 + next() * 20;
    const m = new THREE.Mesh(starGeo, i % 6 === 0 ? starGold : starWhite);
    m.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
    m.scale.setScalar(0.7 + next() * 0.9);
    m.userData.noInk = true;
    stars.add(m);
  }
  scene.add(stars);

  const planet = earth(kit, { radius: 1.6 });
  planet.group.position.set(0, -1.65, 0);
  scene.add(planet.group);

  const sats = Array.from({ length: 5 }, () => {
    const s = gpsSatellite(kit, {});
    scene.add(s.group);
    return s;
  });

  const defaultSatPos = [
    [-1.15, 1.95, 0.2],
    [1.15, 1.9, 0.2],
    [0.05, 2.25, -1.1],
    [-1.75, 1.5, -0.65],
    [1.75, 1.5, -0.65],
  ];

  function set(t, {
    planetPos = [0, -1.65, 0],
    planetScale = 1,
    atmosphere = 1,
    atmoGlow = 0,
    fix = 0,
    spin = 0.25,
    errorRing = 0,
    errorStretch = 1,
    axes = 0,
    satPositions = defaultSatPos,
    satCount = 4,
    satScale = 0.72,
    satCutaway = 0,
    satClockPulse = 0.5,
    satTxGlow = 0.7,
    satHover = 1,
  } = {}) {
    planet.group.position.set(...planetPos);
    planet.group.scale.setScalar(planetScale);
    planet.update(t, { atmosphere, atmoGlow, fix, spin, errorRing, errorStretch, axes });

    for (let i = 0; i < sats.length; i++) {
      const sat = sats[i];
      const vis = i < satCount;
      sat.group.visible = vis;
      if (!vis) continue;
      const p = satPositions[i] || defaultSatPos[i];
      sat.group.position.set(...p);
      sat.group.scale.setScalar(satScale);
      sat.group.lookAt(planetPos[0], planetPos[1] + 1.1, planetPos[2] + 0.6);
      const cut = Array.isArray(satCutaway) ? (satCutaway[i] ?? 0) : (i === 0 ? satCutaway : 0);
      sat.update(t, {
        cutaway: cut,
        clockPulse: satClockPulse,
        txGlow: satTxGlow,
        hover: satHover,
        wingAngle: 0.18,
      });
    }
  }

  return { scene, planet, sats, set };
}

export async function build(kit) {
  const world = await kit.world("orbit", orbitWorld);
  const { THREE } = kit;

  const pWide = { pos: [0.0, 2.25, 6.2], look: [0.0, 0.45, 0.0], fov: 40 };
  const pClose = { pos: [0.28, 2.08, 2.85], look: [0.0, 1.85, 0.1], fov: 36 };
  const pSignal = { pos: [0.45, 1.55, 4.35], look: [0.0, 0.75, 0.4], fov: 38 };
  const camera = kit.camera(pWide);

  const broadcast = kit.beat("broadcast");
  const atomic = kit.beat("atomic");
  const tSend = kit.beat("t_send");
  const orbitData = kit.beat("orbit_data");

  const rings = signalPulse(kit, { mode: "rings", length: 2.3, color: "#00B4D8" });
  rings.group.position.set(0.0, 1.55, 0.15);
  rings.group.lookAt(0, -0.25, 0.8);

  const beam = signalPulse(kit, { mode: "beam", length: 2.05, color: "#00B4D8" });
  beam.group.position.set(0.0, 1.55, 0.15);
  beam.group.lookAt(0, -0.25, 0.8);

  const orbitArc = new THREE.Mesh(
    new THREE.TorusGeometry(3.55, 0.032, 8, 56, Math.PI * 0.55),
    kit.toon("#00B4D8", { emissive: "#00B4D8" })
  );
  orbitArc.position.set(0, -1.65, 0);
  orbitArc.rotation.set(0.18, 0.1, Math.PI * 0.22);
  orbitArc.visible = false;
  kit.ink(orbitArc);

  kit.group.add(rings.group, beam.group, orbitArc);

  kit.callout({
    text: "ĐỒNG HỒ N.TỬ",
    anchor: world.sats[0].anchors.clockBay,
    at: atomic,
    hold: tSend - atomic - 0.35,
  });
  kit.label({
    text: "MỐC PHÁT",
    at: tSend,
    hold: orbitData - tSend - 0.2,
    y: 500,
    color: "#FCD53E",
  });
  kit.callout({
    text: "QUỸ ĐẠO VỆ TINH",
    anchor: beam.anchors.packet,
    at: orbitData,
    hold: 2.5,
  });

  const satPosWide = [
    [0.0, 1.9, 0.15],
    [-1.55, 1.75, -0.35],
    [1.55, 1.75, -0.35],
    [0.0, 2.35, -1.3],
  ];

  return {
    scene: world.scene,
    camera,
    hero: [world.sats[0].group, world.planet.group],
    update(t) {
      const cutOpen = kit.ease(kit.progress(t, atomic - 0.3, 0.7), "out");
      const cutClose = kit.ease(kit.progress(t, tSend + 0.2, 0.6), "inOut");
      const cutaway = cutOpen * (1 - cutClose);

      world.set(t, {
        satPositions: satPosWide,
        satCount: 4,
        satScale: 0.72,
        satCutaway: cutaway,
        satClockPulse: t >= atomic ? 1 : 0.4,
        satTxGlow: t >= broadcast ? 1 : 0.5,
      });

      rings.update(t, { active: t >= broadcast && t < tSend + 0.5 ? 1 : 0, progress: 1 });
      const showBeam = t >= tSend;
      beam.update(t, {
        active: showBeam ? 1 : 0,
        progress: kit.ease(kit.progress(t, tSend, 0.8), "out"),
        showTimeCode: showBeam ? 1 : 0,
        showOrbitTag: t >= orbitData ? 1 : 0,
      });
      orbitArc.visible = t >= orbitData;

      if (t < atomic - 0.4) {
        kit.drift(camera, t, { from: pWide, to: { ...pWide, pos: [0.3, 2.25, 5.9] }, start: 0, dur: atomic - 0.4 });
      } else if (t < tSend - 0.2) {
        kit.fly(camera, t, { from: pWide, to: pClose, start: atomic - 0.4, dur: 1.1, ease: "inOut" });
      } else {
        kit.fly(camera, t, { from: pClose, to: pSignal, start: tSend - 0.2, dur: 1.2, ease: "inOut" });
      }
    },
  };
}
