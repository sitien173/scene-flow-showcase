// m1e: Magnet moves toward stationary test coil connected to analog meter; needle deflects (#2D7FF9 pulse).
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const setup = kit.beat("setup");
  const deflect = kit.beat("deflect");
  const pose = { pos: [6.78, DESK_Y + 1.18, 2.48], look: [6.36, DESK_Y + 0.48, -0.14], fov: 34 };
  const camera = kit.camera(pose);

  const wirePath = [
    [6.4, DESK_Y + 0.25, 0],
    [6.28, DESK_Y + 0.08, -0.22],
    [6.64, DESK_Y + 0.08, -0.42],
  ];
  const pulse = kit.beads(wirePath, {
    distance: 2.0, fov: 32, color: "#2D7FF9", glow: "#A8CCFF", start: 4.0, end: 8.1, onTop: true,
  });
  kit.group.add(pulse.group);
  kit.callout({ text: "ĐỒNG HỒ KIM", anchor: world.labAnchors.meter, at: setup, hold: 2.6 });
  kit.label({ text: "KIM LỆCH", at: deflect, hold: 0.9, y: 500 });

  return {
    scene: world.scene,
    camera,
    hero: [world.labAnchors.meter, world.labAnchors.coil, world.labAnchors.magnet],
    update(t) {
      // Magnet slides toward the coil between t = 3.6 and t = 7.4
      const move = kit.ease(kit.progress(t, 3.6, 3.6), "inOut");
      const magX = -1.05 + move * 0.56;
      const speed = t > 3.6 && t < 7.4 ? Math.sin(kit.progress(t, 3.6, 3.6) * Math.PI) : 0;
      const holdDeflect = kit.ease(kit.progress(t, deflect - 0.5, 0.5), "out") * 0.65;
      const active = Math.max(speed, holdDeflect);
      world.set(t, {
        phoneState: { charging: 1 },
        labState: {
          magX,
          fieldIntensity: 1,
          coilMode: active > 0.08 ? "induced" : "idle",
          coilIntensity: active,
          needle: -active * 0.68,
        },
      });
      pulse.update(t);
      kit.push(camera, t, { ...pose, amount: 0.42, start: 4.4, dur: 3.4 });
    },
  };
}
