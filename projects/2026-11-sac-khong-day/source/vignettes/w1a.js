// w1a: Faraday 19th-century iron ring experiment (dusk): meter kicks only on switch close/open, vs continuous AC pad.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const ringBeat = kit.beat("ring");
  const kick = kit.beat("kick");
  const continuous = kit.beat("continuous");
  const poseRing = { pos: [-6.5, DESK_Y + 1.32, 2.75], look: [-6.5, DESK_Y + 0.34, -0.05], fov: 34 };
  const poseMeter = { pos: [-6.05, DESK_Y + 1.08, 1.98], look: [-6.24, DESK_Y + 0.32, -0.22], fov: 33 };
  const posePad = { pos: [-5.12, DESK_Y + 1.02, 2.02], look: [-5.38, DESK_Y + 0.32, 0.2], fov: 33 };
  const camera = kit.camera(poseRing);

  const secPath = [
    [-6.28, DESK_Y + 0.16, 0],
    [-6.16, DESK_Y + 0.08, -0.25],
    [-6.18, DESK_Y + 0.12, -0.5],
  ];
  const kickBeads = kit.beads(secPath, {
    distance: 1.7, fov: 34, color: "#2D7FF9", glow: "#A8CCFF", start: kick - 0.5, end: continuous, onTop: true,
  });
  kit.group.add(kickBeads.group);
  kit.card({ title: "FARADAY · THẾ KỶ 19", body: "HAI CUỘN DÂY TRÊN VÒNG SẮT", at: ringBeat, hold: 2.5, y: 430, width: 620 });
  kit.label({ text: "CHỈ LỆCH KHI ĐÓNG/NGẮT", at: kick, hold: 2.6, y: 495 });
  kit.callout({ text: "TỪ TRƯỜNG ĐỔI", anchor: world.farAnchors.modernPad, at: continuous, hold: 1.3 });

  return {
    scene: world.scene,
    camera,
    hero: [world.farAnchors.ring, world.farAnchors.meter, world.farAnchors.modernPad],
    update(t) {
      // Switch closes around kick - 0.3 (positive kick), holds steady (0), opens around kick + 2.5 (negative kick)
      const closeX = kit.ease(kit.progress(t, kick - 0.6, 0.45), "inOut");
      const openX = kit.ease(kit.progress(t, kick + 2.2, 0.45), "inOut");
      const switchAngle = 0.45 * (1 - closeX) + 0.45 * openX;
      const primOn = closeX * (1 - openX);
      const kickClose = Math.exp(-Math.pow((t - (kick - 0.15)) / 0.42, 2));
      const kickOpen = Math.exp(-Math.pow((t - (kick + 2.55)) / 0.42, 2));
      const transient = Math.max(kickClose, kickOpen);
      const needle = -kickClose * 0.68 + kickOpen * 0.68;
      const padGlow = kit.ease(kit.progress(t, continuous - 1.2, 0.8), "out");

      world.set(t, {
        phoneState: { charging: 1 },
        farState: {
          primMode: primOn > 0.1 ? "ac" : "idle",
          primIntensity: primOn * 0.7,
          secMode: transient > 0.12 ? "induced" : "idle",
          secIntensity: transient,
          switchAngle,
          needle,
          flux: transient * 0.75,
          padGlow,
        },
      });
      kickBeads.update(t);
      kickBeads.group.visible = transient > 0.15;

      if (t < continuous - 1.4) {
        kit.fly(camera, t, { from: poseRing, to: poseMeter, start: kick - 1.2, dur: 1.8 });
      } else {
        kit.fly(camera, t, { from: poseMeter, to: posePad, start: continuous - 1.4, dur: 1.4 });
      }
    },
  };
}
