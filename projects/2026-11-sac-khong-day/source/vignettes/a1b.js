// a1b: Phone centered on flat pad, then thick phone case inserts into the gap, showing distance lowers coupling.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const centerBeat = kit.beat("center");
  const caseBeat = kit.beat("case");
  const dist = kit.beat("dist");
  const pose = { pos: [0.96, DESK_Y + 0.46, 1.56], look: [0.04, DESK_Y + 0.34, 0.04], fov: 32 };
  const camera = kit.camera(pose);
  kit.callout({ text: "ĐẶT ĐÚNG VỊ TRÍ", anchor: world.pad.anchors.padTop, at: centerBeat, hold: 2.3 });
  kit.callout({ text: "ỐP DÀY", anchor: world.pad.anchors.caseSlot, at: caseBeat, hold: 2.4 });
  kit.label({ text: "KHOẢNG CÁCH ẢNH HƯỞNG", at: dist, hold: 2.0, y: 495 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pad.group, world.phone.group],
    update(t) {
      const centerIn = kit.ease(kit.progress(t, 0.2, 1.2), "out");
      const caseIn = kit.ease(kit.progress(t, caseBeat - 0.5, 1.0), "inOut");
      const caseOut = kit.ease(kit.progress(t, dist + 0.4, 1.4), "inOut");
      const tc = Math.max(0, caseIn * (1 - 0.75 * caseOut));
      const gapLift = tc * 0.14;
      const rxCoupling = 1 - 0.65 * tc;
      const pol = Math.cos(t * 2.8);

      world.set(t, {
        padState: { cutaway: 0, coilGlow: 0.75, thickCase: tc, led: "active" },
        phonePos: [0.04 + (1 - centerIn) * 0.28, DESK_Y + 0.18 + gapLift, 0.0 + (1 - centerIn) * 0.14],
        phoneRot: [0, 0, 0],
        phoneState: { cutaway: 0, coilGlow: rxCoupling, charging: 1 },
        fieldVisible: true,
        fieldState: { intensity: 0.75, polarity: pol, reach: 0.95, spread: 1.0 },
      });
      kit.push(camera, t, { ...pose, amount: 0.26, start: caseBeat, dur: 4.5 });
    },
  };
}
