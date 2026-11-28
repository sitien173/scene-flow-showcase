// m1b: Changing magnetic field (#FCD53E) builds, weakens, and flips direction around the TX coil.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const field = kit.beat("field");
  const flip = kit.beat("flip");
  const center = [0.04, DESK_Y + 0.56, 0];
  const camera = kit.camera({ pos: [1.08, DESK_Y + 0.86, 1.82], look: center, fov: 34 });

  const coilFwd = kit.beads(world.pad.path("coil"), {
    distance: 1.7, fov: 34, color: "#F08A4B", glow: "#FFD4B2", start: 0, reverse: false, onTop: true,
  });
  const coilRev = kit.beads(world.pad.path("coil"), {
    distance: 1.7, fov: 34, color: "#F08A4B", glow: "#FFD4B2", start: 0, reverse: true, onTop: true,
  });
  kit.group.add(coilFwd.group, coilRev.group);
  kit.callout({ text: "TỪ TRƯỜNG", anchor: world.txField.anchors.outer, at: field, hold: 2.6 });
  kit.label({ text: "MẠNH · YẾU · ĐỔI HƯỚNG", at: flip, hold: 0.85, y: 500 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pad.group, world.txField.group],
    update(t) {
      const fIn = kit.ease(kit.progress(t, field - 0.5, 0.8), "out");
      const pol = Math.cos(t * 2.8);
      world.set(t, {
        padState: { cutaway: 1, coilGlow: 1, txGlow: 1, led: "active" },
        phonePos: [0.04, DESK_Y + 0.96, 0.22],
        phoneRot: [-0.2, 0, 0],
        phoneState: { cutaway: 1, charging: 1 },
        fieldVisible: fIn > 0.02,
        fieldState: { intensity: fIn, polarity: pol, reach: 1.05, spread: 1.05 },
      });
      coilFwd.update(t);
      coilRev.update(t);
      coilFwd.group.visible = pol >= 0;
      coilRev.group.visible = pol < 0;
      kit.orbit(camera, t, { center, radius: 2.08, height: 0.3, angle: 0.54, speed: 0.035, look: center, fov: 34 });
    },
  };
}
