// e1 / one_way_radio: Orbital panorama; satellites broadcast one-way #00B4D8 waves like radio
// to multiple smartphones on Earth; hypothetical upward query arrow is crossed out (#DD3428 X).
import { orbitWorld } from "./sat_broadcast.js";
import { smartphone } from "./smartphone/smartphone.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const world = await kit.world("orbit", orbitWorld);
  const { THREE } = kit;

  const p0 = { pos: [0.0, 1.65, 6.2], look: [0.0, 0.35, 0.0], fov: 40 };
  const p1 = { pos: [0.35, 1.85, 6.0], look: [0.0, 0.45, 0.0], fov: 40 };
  const camera = kit.camera(p0);

  const noWho = kit.beat("no_who");
  const oneWay = kit.beat("one_way");
  const noQuery = kit.beat("no_query");

  const satPos = [
    [-0.95, 2.05, 0.1],
    [0.95, 2.05, 0.1],
  ];

  // Three receiver phones on Earth's surface
  const phoneSpots = [
    [-0.95, -0.35, 0.72, [0.45, -0.3, 0.35]],
    [0.0, -0.05, 0.92, [0.55, 0.0, 0.0]],
    [0.95, -0.35, 0.72, [0.45, 0.3, -0.35]],
  ];
  phoneSpots.forEach(([x, y, z, rot]) => {
    const p = smartphone(kit, { screenMode: "gps" });
    p.group.position.set(x, y, z);
    p.group.rotation.set(...rot);
    p.group.scale.setScalar(0.68);
    kit.group.add(p.group);
  });

  // Wide one-way radio rings & downward beams
  const rings = signalPulse(kit, { mode: "rings", length: 2.35, color: "#00B4D8" });
  rings.group.position.set(0, 1.8, 0.1);
  rings.group.lookAt(0, -0.1, 0.85);
  kit.group.add(rings.group);

  const downBeams = [
    [satPos[0], phoneSpots[0]],
    [satPos[0], phoneSpots[1]],
    [satPos[1], phoneSpots[2]],
  ].map(([src, dst]) => {
    const len = Math.hypot(dst[0] - src[0], dst[1] - src[1], dst[2] - src[2]);
    const b = signalPulse(kit, { mode: "beam", length: len, color: "#00B4D8" });
    b.group.position.set(...src);
    b.group.lookAt(dst[0], dst[1], dst[2]);
    kit.group.add(b.group);
    return b;
  });

  // Hypothetical upward arrow (phone -> satellite) to be crossed out at no_query
  const upArrow = new THREE.Group();
  const arrowMat = kit.toon("#DD3428", { emissive: "#DD3428" });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.55, 8), arrowMat);
  shaft.position.y = 0.78;
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.32, 10), arrowMat);
  head.position.y = 1.65;
  upArrow.add(shaft, head);
  upArrow.position.set(0.18, 0.12, 0.9);
  upArrow.rotation.z = 0.38;
  kit.ink(upArrow);
  upArrow.visible = false;

  const arrowMid = new THREE.Object3D();
  arrowMid.position.set(-0.18, 0.92, 0.9);
  kit.group.add(upArrow, arrowMid);

  kit.bigText({
    text: "PHÁT MỘT CHIỀU",
    at: oneWay,
    hold: noQuery - oneWay - 0.25,
    y: 530,
    size: 96,
  });
  kit.mark({
    kind: "x",
    anchor: arrowMid,
    at: noQuery,
    hold: 3.4,
    size: 170,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.planet.group],
    update(t) {
      world.set(t, {
        planetPos: [0, -1.65, 0],
        atmosphere: 0,
        fix: 1,
        satPositions: satPos,
        satCount: 2,
        satScale: 0.68,
        satTxGlow: 1,
      });

      const broadcastOn = t >= noWho - 0.4 ? 1 : 0.6;
      rings.update(t, { active: broadcastOn, progress: 1 });
      downBeams.forEach((b) => b.update(t, { active: broadcastOn, progress: 1, showTimeCode: 0.5 }));

      const showUp = t >= noQuery - 0.55 && t < noQuery + 2.4;
      upArrow.visible = showUp;
      if (showUp) {
        const fadeScale = t >= noQuery + 0.6 ? Math.max(0.05, 1 - kit.progress(t, noQuery + 0.6, 1.2)) : 1;
        upArrow.scale.setScalar(fadeScale);
      }

      kit.drift(camera, t, { from: p0, to: p1, start: 0.9, dur: 9.0 });
    },
  };
}
