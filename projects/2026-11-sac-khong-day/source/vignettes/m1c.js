// m1c: Illustrative magnetic field curves (#FCD53E) span the air gap; only part threads the RX coil.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const lines = kit.beat("lines");
  const notWire = kit.beat("not_wire");
  const cross = kit.beat("cross");
  const pose = { pos: [1.36, DESK_Y + 0.78, 2.34], look: [0.04, DESK_Y + 0.44, 0.04], fov: 34 };
  const camera = kit.camera(pose);
  kit.label({ text: "MINH HỌA VÙNG TỪ TRƯỜNG", at: lines, hold: 2.4, y: 490 });
  kit.callout({ text: "KHÔNG LÀ DÂY", anchor: world.txField.anchors.outer, at: notWire, hold: 2.5 });
  kit.callout({ text: "QUA CUỘN THU", anchor: world.rxCoil.anchors.center, at: cross, hold: 1.4 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pad.group, world.rxCoil.group, world.txField.group],
    update(t) {
      const reachIn = kit.ease(kit.progress(t, cross - 0.8, 1.0), "out");
      const rxGlow = kit.ease(kit.progress(t, cross - 0.2, 0.7), "out");
      const pol = Math.cos(t * 2.6);
      world.set(t, {
        padState: { cutaway: 1, coilGlow: 1, txGlow: 1, led: "active" },
        phonePos: [0.04, DESK_Y + 0.68, 0.22],
        phoneRot: [-0.42, 0, 0],
        phoneState: { cutaway: 1, coilGlow: rxGlow * 0.6, charging: 1 },
        rxCoilVisible: true,
        rxCoilPos: [0.04, DESK_Y + 0.56, 0.025],
        rxCoilRot: [Math.PI - 0.42, 0, 0],
        rxCoilState: { mode: rxGlow > 0.05 ? "induced" : "idle", intensity: rxGlow * 0.55 },
        fieldVisible: true,
        fieldState: { intensity: 1, polarity: pol, reach: 0.9 + 0.32 * reachIn, spread: 1.08 },
      });
      kit.push(camera, t, { ...pose, amount: 0.24, start: cross - 1.5, dur: 2.8 });
    },
  };
}
