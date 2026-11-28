// m1d: Changing magnetic flux induces voltage (+/-) across RX coil ends, driving #2D7FF9 current in a closed loop.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const voltage = kit.beat("voltage");
  const pushBeat = kit.beat("push");
  const current = kit.beat("current");
  const term = kit.beat("term");
  const poseA = { pos: [0.96, DESK_Y + 1.08, 1.88], look: [0.04, DESK_Y + 0.7, 0.04], fov: 34 };
  const poseB = { pos: [0.58, DESK_Y + 1.12, 1.72], look: [0.04, DESK_Y + 0.68, 0.1], fov: 34 };
  const camera = kit.camera(poseA);

  world.rxCoil.group.position.set(0.04, DESK_Y + 0.56, 0.025);
  world.rxCoil.group.rotation.set(Math.PI - 0.42, 0, 0);
  const rxFwd = kit.beads(world.rxCoil.path("coil"), {
    distance: 1.8, fov: 34, color: "#2D7FF9", glow: "#A8CCFF", start: pushBeat, reverse: false, onTop: true,
  });
  const rxRev = kit.beads(world.rxCoil.path("coil"), {
    distance: 1.8, fov: 34, color: "#2D7FF9", glow: "#A8CCFF", start: pushBeat, reverse: true, onTop: true,
  });
  kit.group.add(rxFwd.group, rxRev.group);
  kit.callout({ text: "ĐIỆN ÁP", anchor: world.rxCoil.anchors.plus, at: voltage, hold: 2.6 });
  kit.callout({ text: "MẠCH KÍN", anchor: world.rxCoil.anchors.center, at: current, hold: 1.2 });
  kit.card({ title: "CẢM ỨNG ĐIỆN TỪ", body: "TỪ TRƯỜNG BIẾN THIÊN → ĐIỆN ÁP", at: term, hold: 2.7, y: 435, width: 640 });

  return {
    scene: world.scene,
    camera,
    hero: [world.rxCoil.group, world.phone.group],
    update(t) {
      const vOn = kit.ease(kit.progress(t, voltage - 0.3, 0.5), "out");
      const iOn = kit.ease(kit.progress(t, pushBeat - 0.2, 0.6), "out");
      const pol = Math.cos(t * 2.8);
      world.set(t, {
        padState: { cutaway: 1, coilGlow: 1, txGlow: 1, led: "active" },
        phonePos: [0.04, DESK_Y + 0.68, 0.22],
        phoneRot: [-0.42, 0, 0],
        phoneState: { cutaway: 1, coilGlow: iOn, cardPulse: iOn, charging: 1 },
        rxCoilVisible: true,
        rxCoilPos: [0.04, DESK_Y + 0.56, 0.025],
        rxCoilRot: [Math.PI - 0.42, 0, 0],
        rxCoilState: { mode: iOn > 0.05 ? "induced" : "idle", intensity: iOn, voltage: vOn, phase: pol },
        fieldVisible: true,
        fieldState: { intensity: 0.9, polarity: pol, reach: 1.22, spread: 1.05 },
      });
      rxFwd.update(t);
      rxRev.update(t);
      if (t >= pushBeat) {
        rxFwd.group.visible = pol >= 0;
        rxRev.group.visible = pol < 0;
      }
      kit.fly(camera, t, { from: poseA, to: poseB, start: pushBeat, dur: 4.5 });
    },
  };
}
