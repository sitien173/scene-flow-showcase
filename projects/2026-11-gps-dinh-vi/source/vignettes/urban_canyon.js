// a2 / urban_canyon: Tall flanking towers block low-angle #00B4D8 signals (#DD3428 X),
// while a reflected, lengthened signal path bounces off the opposite wall in #00B4D8 (not #F08A4B).
import { streetWorld } from "./hook_dot.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { gpsSatellite } from "./gps-satellite/gps-satellite.js";

export async function build(kit) {
  const world = await kit.world("street", streetWorld);
  const { THREE } = kit;

  const p0 = { pos: [0.0, 2.5, 5.2], look: [0.0, 1.9, 0.0], fov: 40 };
  const p1 = { pos: [0.45, 2.35, 4.9], look: [0.0, 1.75, 0.0], fov: 39 };
  const camera = kit.camera(p0);

  const blocked = kit.beat("blocked");
  const bounce = kit.beat("bounce");
  const wrongDist = kit.beat("wrong_dist");

  const satL = gpsSatellite(kit, {});
  satL.group.position.set(-2.55, 4.65, -0.35);
  satL.group.scale.setScalar(0.5);
  satL.group.lookAt(0, 1.4, 0);

  const satR = gpsSatellite(kit, {});
  satR.group.position.set(-1.35, 5.1, -0.35);
  satR.group.scale.setScalar(0.5);
  satR.group.lookAt(1.2, 2.8, -0.1);

  // Blocked direct ray hitting left tower wall (#00B4D8 beam + #DD3428 X block)
  const blockedBeam = signalPulse(kit, { mode: "beam", length: 4.1, color: "#00B4D8", errorColor: "#DD3428" });
  blockedBeam.group.position.set(-2.55, 4.45, -0.35);
  blockedBeam.group.lookAt(0, 1.35, 0);

  // Reflected lengthened path drawn strictly in #00B4D8 (two legs bouncing off right wall down to phone)
  const wallHit = [1.18, 2.75, -0.15];
  const phoneHit = [0.0, 1.42, 0.0];
  const bounceIn = signalPulse(kit, {
    mode: "beam",
    length: Math.hypot(wallHit[0] - (-1.35), wallHit[1] - 4.85, wallHit[2] - (-0.35)),
    color: "#00B4D8",
  });
  bounceIn.group.position.set(-1.35, 4.85, -0.35);
  bounceIn.group.lookAt(...wallHit);

  const bounceOut = signalPulse(kit, {
    mode: "beam",
    length: Math.hypot(phoneHit[0] - wallHit[0], phoneHit[1] - wallHit[1], phoneHit[2] - wallHit[2]),
    color: "#00B4D8",
  });
  bounceOut.group.position.set(...wallHit);
  bounceOut.group.lookAt(...phoneHit);

  // False lengthened distance halo indicator at wrong_dist
  const errRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.68, 0.032, 8, 36),
    kit.toon("#DD3428", { emissive: "#DD3428" })
  );
  errRing.rotation.x = Math.PI / 2;
  errRing.position.set(0, 1.38, 0);
  errRing.visible = false;
  kit.ink(errRing);

  kit.group.add(satL.group, satR.group, blockedBeam.group, bounceIn.group, bounceOut.group, errRing);

  kit.callout({
    text: "CHẮN TÍN HIỆU",
    anchor: blockedBeam.anchors.mid,
    at: blocked,
    hold: bounce - blocked - 0.35,
  });
  kit.label({
    text: "DỘI TƯỜNG → ĐƯỜNG DÀI HƠN",
    at: bounce,
    hold: 4.5,
    y: 515,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.phone.group, world.canyonGroup],
    update(t) {
      world.set(t, {
        phonePos: [0, 1.35, 0],
        phoneRot: [0.95, 0, 0],
        dotPulse: 1,
        haloRadius: t >= wrongDist ? 0.78 : 0.35,
        canyon: 1,
      });

      satL.update(t, { hover: 1, txGlow: 0.7 });
      satR.update(t, { hover: 1, txGlow: 1.0 });

      blockedBeam.update(t, {
        active: t >= blocked - 0.3 ? 1 : 0,
        progress: 1,
        blocked: t >= blocked ? 1 : 0,
        blockAt: 0.38,
      });

      const b1 = kit.ease(kit.progress(t, bounce - 0.3, 0.7), "out");
      const b2 = kit.ease(kit.progress(t, bounce + 0.15, 0.7), "out");
      bounceIn.update(t, { active: t >= bounce - 0.3 ? 1 : 0, progress: b1, showTimeCode: 0.5 });
      bounceOut.update(t, { active: t >= bounce + 0.15 ? 1 : 0, progress: b2, showTimeCode: 0.5 });

      errRing.visible = t >= wrongDist;
      if (errRing.visible) {
        const pulse = 1 + 0.14 * Math.sin(t * 4);
        errRing.scale.setScalar(pulse);
      }

      kit.drift(camera, t, { from: p0, to: p1, start: 0.8, dur: 9.0 });
    },
  };
}
