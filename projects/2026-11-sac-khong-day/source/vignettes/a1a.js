// a1a: Phone shifts sideways off center; coils misalign, less field crosses RX coil, coupling weakens.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const shift = kit.beat("shift");
  const weaker = kit.beat("weaker");
  const poseA = { pos: [0.96, DESK_Y + 1.48, 2.25], look: [0.16, DESK_Y + 0.4, 0.08], fov: 34 };
  const poseB = { pos: [1.14, DESK_Y + 1.44, 2.26], look: [0.22, DESK_Y + 0.4, 0.08], fov: 34 };
  const camera = kit.camera(poseA);
  kit.callout({ text: "LỆCH TÂM", anchor: world.rxCoil.anchors.center, at: shift, hold: 2.6 });
  kit.card({ title: "LỆCH TÂM", body: "GHÉP YẾU → KÉM HIỆU QUẢ", at: weaker, hold: 2.3, y: 435, width: 620 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pad.group, world.phone.group, world.txField.group],
    update(t) {
      const slide = kit.ease(kit.progress(t, shift - 0.1, 1.6), "inOut");
      const rxCoupling = 1 - 0.72 * slide;
      const pol = Math.cos(t * 2.8);
      world.set(t, {
        padState: { cutaway: 1, coilGlow: 0.9, txGlow: 0.9, led: "active" },
        phonePos: [0.04 + slide * 0.44, DESK_Y + 0.56, 0.22],
        phoneRot: [-0.25, 0, 0],
        phoneState: { cutaway: 1, coilGlow: rxCoupling, charging: 0.25 + 0.75 * (1 - slide) },
        rxCoilVisible: true,
        rxCoilPos: [0.04 + slide * 0.44, DESK_Y + 0.44, 0],
        rxCoilRot: [Math.PI, 0, 0],
        rxCoilState: { mode: "induced", intensity: rxCoupling * 0.7 },
        fieldVisible: true,
        fieldState: { intensity: 0.95, polarity: pol, reach: 1.05, spread: 1.15 },
      });
      kit.drift(camera, t, { from: poseA, to: poseB, start: shift, dur: 4.5 });
    },
  };
}
