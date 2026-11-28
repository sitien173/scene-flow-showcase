// e2 / payoff_calc: Dusk street finale; network sharing cloud link separates from one-way #00B4D8 GPS stream,
// and smartphone receiver chip lights up #2D884E fix to prove the phone calculates its own position.
import { streetWorld } from "./hook_dot.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { gpsSatellite } from "./gps-satellite/gps-satellite.js";

export async function build(kit) {
  const world = await kit.world("street", streetWorld);
  const { THREE } = kit;

  const p0 = { pos: [0.15, 1.85, 3.2], look: [0.15, 1.38, 0.0], fov: 38 };
  const pFinal = { pos: [-0.25, 1.72, 2.75], look: [-0.32, 1.32, 0.0], fov: 36 };
  const camera = kit.camera(p0);

  const netShare = kit.beat("net_share");
  const phoneSolves = kit.beat("phone_solves");

  // Overhead satellite feeding #00B4D8 one-way stream to phone on the left
  const sat = gpsSatellite(kit, {});
  sat.group.position.set(-0.45, 3.45, -0.35);
  sat.group.scale.setScalar(0.5);
  sat.group.lookAt(-0.35, 1.25, 0);

  const gpsBeam = signalPulse(kit, { mode: "beam", length: 2.0, color: "#00B4D8" });
  gpsBeam.group.position.set(-0.45, 3.25, -0.35);
  gpsBeam.group.lookAt(-0.35, 1.28, 0);

  // Separate stylized network sharing cloud + link on the right
  const netCloud = new THREE.Group();
  netCloud.position.set(1.15, 1.85, -0.15);
  const cloudMat = kit.toon("#A5A6AA");
  [
    [0, 0, 0, 0.24],
    [-0.22, -0.06, 0, 0.18],
    [0.22, -0.06, 0, 0.18],
    [0.08, 0.14, 0, 0.17],
  ].forEach(([x, y, z, r]) => {
    const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), cloudMat);
    puff.position.set(x, y, z);
    netCloud.add(puff);
  });
  kit.ink(netCloud);

  const netLink = kit.beads(
    [[-0.08, 1.3, 0.0], [0.55, 1.62, -0.08], [1.1, 1.8, -0.15]],
    { distance: 3.2, fov: 38, color: "#A5A6AA", glow: "#FAFCFB", start: netShare - 0.2, end: phoneSolves + 0.3, onTop: true }
  );

  kit.group.add(sat.group, gpsBeam.group, netCloud, netLink.group);

  kit.card({
    title: "CHIA SẺ QUA MẠNG ≠ THU GPS",
    body: "HAI ĐƯỜNG HOÀN TOÀN RIÊNG",
    at: netShare,
    hold: Math.max(0.5, phoneSolves - netShare - 0.95),
    y: 460,
    width: 720,
  });
  kit.bigText({
    text: "ĐIỆN THOẠI TỰ TÍNH",
    at: phoneSolves,
    hold: 2.4,
    y: 535,
    size: 88,
  });
  kit.mark({
    kind: "check",
    anchor: world.phone.anchors.blueDot,
    at: phoneSolves + 0.12,
    hold: 2.2,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.phone.group, netCloud],
    update(t) {
      const solve = kit.ease(kit.progress(t, phoneSolves - 0.15, 0.65), "out");

      world.set(t, {
        phonePos: [-0.35, 1.25, 0],
        phoneRot: [0.95, 0, 0],
        dotPulse: 1,
        haloRadius: kit.lerp(0.32, 0.18, solve),
        fix: solve,
        cardPulse: solve,
        canyon: 0,
      });

      sat.update(t, { hover: 1, txGlow: 1 });
      gpsBeam.update(t, { active: 1, progress: 1, showTimeCode: 0.7 });

      const showNet = t >= netShare - 0.25 && t < phoneSolves + 0.4;
      netCloud.visible = showNet;
      if (showNet) {
        kit.popIn(netCloud, t, netShare - 0.2, { dur: 0.3 });
      }
      netLink.update(t);

      if (t >= phoneSolves - 0.5) {
        kit.fly(camera, t, { from: p0, to: pFinal, start: phoneSolves - 0.5, dur: 1.0, ease: "inOut" });
      } else {
        kit.setPose(camera, p0);
      }
    },
  };
}
