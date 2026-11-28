// c1b: Low angle showing no plug in the gap, then 3D cutaway of phone back and pad lid.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const noPlug = kit.beat("no_plug");
  const slice = kit.beat("slice");
  const fromPose = { pos: [1.08, DESK_Y + 0.44, 1.82], look: [0.02, DESK_Y + 0.42, 0.12], fov: 33 };
  const toPose = { pos: [1.32, DESK_Y + 0.96, 2.02], look: [0.04, DESK_Y + 0.54, 0.08], fov: 33 };
  const camera = kit.camera(fromPose);
  kit.mark({ kind: "x", anchor: [0.04, DESK_Y + 0.26, 0.1], at: noPlug, hold: 1.8 });
  kit.label({ text: "CẮT LỚP 3D", at: slice, hold: 2.0, y: 490 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pad.group, world.phone.group],
    update(t) {
      const lift = kit.ease(kit.progress(t, 0.4, 0.9), "out");
      const cut = kit.ease(kit.progress(t, slice - 0.15, 0.95), "inOut");
      const phoneY = DESK_Y + 0.175 + lift * 0.28 + cut * 0.24;
      world.set(t, {
        padState: { cutaway: cut, coilGlow: 0.2 * cut, led: "active" },
        phonePos: [0.04, phoneY, 0.22],
        phoneRot: [-cut * 0.42, 0, 0],
        phoneState: { cutaway: cut, coilGlow: 0.2 * cut, charging: 1 },
      });
      kit.drift(camera, t, { from: fromPose, to: toPose, start: slice - 0.2, dur: 2.2 });
    },
  };
}
