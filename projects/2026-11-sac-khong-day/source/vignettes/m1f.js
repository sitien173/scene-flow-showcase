// m1f: Magnet still -> needle 0; magnet pulled away -> needle deflects opposite; stationary pad uses AC.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const zero = kit.beat("zero");
  const reverse = kit.beat("reverse");
  const padAc = kit.beat("pad_ac");
  const poseLab = { pos: [6.78, DESK_Y + 1.18, 2.48], look: [6.36, DESK_Y + 0.48, -0.14], fov: 34 };
  const posePad = { pos: [8.05, DESK_Y + 1.08, 2.05], look: [7.68, DESK_Y + 0.42, 0.22], fov: 34 };
  const camera = kit.camera(poseLab);

  const revPath = [
    [6.64, DESK_Y + 0.08, -0.42],
    [6.28, DESK_Y + 0.08, -0.22],
    [6.4, DESK_Y + 0.25, 0],
  ];
  const revBeads = kit.beads(revPath, {
    distance: 2.1, fov: 33, color: "#2D7FF9", glow: "#A8CCFF", start: 4.4, end: padAc + 0.2, onTop: true,
  });
  kit.group.add(revBeads.group);
  kit.label({ text: "ĐỨNG YÊN → KIM = 0", at: zero, hold: 2.0, y: 495 });
  kit.label({ text: "KÉO RA → LỆCH NGƯỢC", at: reverse, hold: 1.6, y: 495 });
  kit.callout({ text: "TỪ TRƯỜNG ĐỔI", anchor: world.labAnchors.compPad, at: padAc, hold: 2.2 });

  return {
    scene: world.scene,
    camera,
    hero: [world.labAnchors.meter, world.labAnchors.compPad],
    update(t) {
      // Phase 1 (0..4.3 s): magnet held still -> needle settles back to 0
      // Phase 2 (4.3..8.2 s): magnet pulled back -> needle deflects opposite (+0.65 rad)
      // Phase 3 (padAc..end): camera flies to stationary pad with AC coil + oscillating field
      const settle = 1 - kit.ease(kit.progress(t, 0.2, 1.0), "out");
      const pull = kit.ease(kit.progress(t, 4.3, 3.2), "inOut");
      const magX = -0.49 - pull * 0.62;
      const pullPulse = t > 4.3 && t < 8.4 ? Math.sin(kit.progress(t, 4.3, 3.5) * Math.PI) : 0;
      const needle = -settle * 0.55 + pullPulse * 0.68;
      const padOn = kit.ease(kit.progress(t, padAc - 1.0, 0.8), "out");

      world.set(t, {
        phoneState: { charging: 1 },
        labState: {
          magX,
          fieldIntensity: 1,
          coilMode: pullPulse > 0.08 ? "induced" : "idle",
          coilIntensity: pullPulse,
          needle,
          compGlow: padOn,
        },
      });
      revBeads.update(t);
      kit.fly(camera, t, { from: poseLab, to: posePad, start: padAc - 0.8, dur: 1.6 });
    },
  };
}
