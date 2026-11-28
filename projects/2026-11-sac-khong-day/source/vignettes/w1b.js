// w1b: Payoff back at the gap: no current bridges the air gap; changing magnetic field couples two separate circuits.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const noBridge = kit.beat("no_bridge");
  const induction = kit.beat("induction");
  const poseA = { pos: [1.22, DESK_Y + 0.84, 2.02], look: [0.04, DESK_Y + 0.56, 0.04], fov: 34 };
  const camera = kit.camera(poseA);

  const txFwd = kit.beads(world.pad.path("coil"), {
    distance: 2.0, fov: 34, color: "#F08A4B", glow: "#FFD4B2", start: 0, reverse: false, onTop: true,
  });
  const txRev = kit.beads(world.pad.path("coil"), {
    distance: 2.0, fov: 34, color: "#F08A4B", glow: "#FFD4B2", start: 0, reverse: true, onTop: true,
  });
  world.rxCoil.group.position.set(0.04, DESK_Y + 0.56, 0.025);
  world.rxCoil.group.rotation.set(Math.PI - 0.42, 0, 0);
  const rxFwd = kit.beads(world.rxCoil.path("coil"), {
    distance: 2.0, fov: 34, color: "#2D7FF9", glow: "#A8CCFF", start: 0, reverse: false, onTop: true,
  });
  const rxRev = kit.beads(world.rxCoil.path("coil"), {
    distance: 2.0, fov: 34, color: "#2D7FF9", glow: "#A8CCFF", start: 0, reverse: true, onTop: true,
  });
  kit.group.add(txFwd.group, txRev.group, rxFwd.group, rxRev.group);
  kit.mark({ kind: "x", anchor: [0.04, DESK_Y + 0.31, 0], at: noBridge, hold: 2.8 });
  kit.label({ text: "KHÔNG DÒNG ĐIỆN BẮC CẦU", at: noBridge + 0.15, hold: 2.6, y: 495 });
  kit.bigText({ text: "CẢM ỨNG ĐIỆN TỪ", at: induction, hold: 0.85, y: 550 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pad.group, world.phone.group, world.rxCoil.group, world.txField.group],
    update(t) {
      const pol = Math.cos(t * 2.8);
      world.set(t, {
        padState: { cutaway: 1, coilGlow: 1, txGlow: 1, led: "active" },
        phonePos: [0.04, DESK_Y + 0.68, 0.22],
        phoneRot: [-0.42, 0, 0],
        phoneState: { cutaway: 1, coilGlow: 1, cardPulse: 0.7, charging: 1 },
        rxCoilVisible: true,
        rxCoilPos: [0.04, DESK_Y + 0.56, 0.025],
        rxCoilRot: [Math.PI - 0.42, 0, 0],
        rxCoilState: { mode: "induced", intensity: 0.9, phase: pol },
        fieldVisible: true,
        fieldState: { intensity: 1, polarity: pol, reach: 1.15, spread: 1.05 },
      });
      txFwd.update(t);
      txRev.update(t);
      rxFwd.update(t);
      rxRev.update(t);
      txFwd.group.visible = pol >= 0;
      txRev.group.visible = pol < 0;
      rxFwd.group.visible = pol >= 0;
      rxRev.group.visible = pol < 0;

      kit.push(camera, t, { ...poseA, amount: -0.45, start: 4.5, dur: 6.5 });
    },
  };
}
