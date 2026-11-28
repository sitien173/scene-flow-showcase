// a1c: Alignment magnet ring in the pad only (NOT in the phone) snaps phone to center; AC coil creates charging field.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const snap = kit.beat("snap");
  const acOnly = kit.beat("ac_only");
  const center = [0.04, DESK_Y + 0.52, 0.04];
  const camera = kit.camera({ pos: [0.96, DESK_Y + 1.18, 1.86], look: center, fov: 34 });

  const acFwd = kit.beads(world.pad.path("coil"), {
    distance: 1.6, fov: 33, color: "#F08A4B", glow: "#FFD4B2", start: acOnly - 0.5, reverse: false, onTop: true,
  });
  const acRev = kit.beads(world.pad.path("coil"), {
    distance: 1.6, fov: 33, color: "#F08A4B", glow: "#FFD4B2", start: acOnly - 0.5, reverse: true, onTop: true,
  });
  kit.group.add(acFwd.group, acRev.group);
  kit.callout({ text: "NAM CHÂM ĐỊNH VỊ", anchor: world.pad.anchors.magnet, at: snap, hold: 2.3 });
  kit.card({ title: "ĐỊNH VỊ & TRUYỀN ĐIỆN", body: "NAM CHÂM GIỮ TÂM · AC TẠO TỪ TRƯỜNG", at: acOnly, hold: 1.65, y: 430, width: 650 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pad.group, world.phone.group],
    update(t) {
      const snapEase = kit.ease(kit.progress(t, snap - 0.6, 0.85), "inOut");
      const acOn = kit.ease(kit.progress(t, acOnly - 0.5, 0.7), "out");
      const pol = Math.cos(t * 3.0);
      const px = 0.04 + (1 - snapEase) * 0.28;
      const pz = 0.22 + (1 - snapEase) * 0.16;

      world.set(t, {
        padState: { cutaway: 0.88, coilGlow: acOn, txGlow: acOn, magnetRing: 1, led: "active" },
        phonePos: [px, DESK_Y + 0.44 + (1 - snapEase) * 0.12, pz],
        phoneRot: [-0.28, 0, 0],
        phoneState: { cutaway: 0, coilGlow: acOn * 0.7, charging: 1 },
        fieldVisible: acOn > 0.04,
        fieldState: { intensity: acOn, polarity: pol, reach: 1.05, spread: 1.0 },
      });
      acFwd.update(t);
      acRev.update(t);
      if (t >= acOnly - 0.5) {
        acFwd.group.visible = pol >= 0;
        acRev.group.visible = pol < 0;
      }
      kit.orbit(camera, t, { center, radius: 1.62, height: 0.72, angle: 0.49, speed: 0.03, look: center, fov: 33 });
    },
  };
}
