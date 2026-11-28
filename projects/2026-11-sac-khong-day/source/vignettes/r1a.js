// r1a: Close-up on the transmitter coil (pad) and receiver coil (phone), clearly separated.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const tx = kit.beat("tx");
  const rx = kit.beat("rx");
  const separate = kit.beat("separate");
  const center = [0.04, DESK_Y + 0.62, 0.05];
  const camera = kit.camera({ pos: [1.32, DESK_Y + 0.86, 2.04], look: center, fov: 34 });
  kit.callout({ text: "CUỘN PHÁT", anchor: world.pad.anchors.coil, at: tx, hold: 2.2 });
  kit.callout({ text: "CUỘN THU", anchor: world.rxCoil.anchors.center, at: rx, hold: 2.5 });
  kit.callout({ text: "KHÔNG NỐI DÂY", anchor: [0.04, DESK_Y + 0.34, 0], at: separate, hold: 1.3 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pad.group, world.phone.group, world.rxCoil.group],
    update(t) {
      const txGlow = kit.ease(kit.progress(t, tx - 0.2, 0.6), "out");
      const rxGlow = kit.ease(kit.progress(t, rx - 0.2, 0.6), "out");
      world.set(t, {
        padState: { cutaway: 1, coilGlow: txGlow, led: "active" },
        phonePos: [0.04, DESK_Y + 0.68, 0.22],
        phoneRot: [-0.42, 0, 0],
        phoneState: { cutaway: 1, coilGlow: rxGlow, charging: 1 },
        rxCoilVisible: true,
        rxCoilPos: [0.04, DESK_Y + 0.56, 0.025],
        rxCoilRot: [Math.PI - 0.42, 0, 0],
        rxCoilState: { mode: rxGlow > 0.1 ? "induced" : "idle", intensity: rxGlow * 0.55 },
      });
      kit.orbit(camera, t, { center, radius: 2.4, height: 0.24, angle: 0.58, speed: 0.032, look: center, fov: 34 });
    },
  };
}
