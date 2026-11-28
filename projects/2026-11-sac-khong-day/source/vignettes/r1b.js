// r1b: Pull back to the side power cord entering the pad, contrasting with the wireless gap.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const cord = kit.beat("cord");
  const gap = kit.beat("gap");
  const poseA = { pos: [-1.05, DESK_Y + 1.12, 2.55], look: [-0.42, DESK_Y + 0.52, 0.0], fov: 35 };
  const poseB = { pos: [-0.18, DESK_Y + 1.08, 2.45], look: [-0.12, DESK_Y + 0.56, 0.06], fov: 35 };
  const camera = kit.camera(poseA);

  const cordBeads = kit.beads(world.pad.path("cord"), {
    distance: 2.4, fov: 34, color: "#F08A4B", glow: "#FFD4B2", start: 0.3, onTop: true,
  });
  kit.group.add(cordBeads.group);
  kit.callout({ text: "DÂY CẤP ĐIỆN", anchor: world.pad.anchors.port, at: cord, hold: 2.4 });
  kit.card({ title: "SẠC KHÔNG DÂY", body: "KHÔNG DÂY = ĐOẠN GIỮA ĐẾ & MÁY", at: gap, hold: 2.0, y: 435, width: 640 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pad.group, world.phone.group],
    update(t) {
      world.set(t, {
        padState: { cutaway: 1, coilGlow: 0.4, txGlow: 0.6, led: "active" },
        phonePos: [0.04, DESK_Y + 0.66, 0.22],
        phoneRot: [-0.38, 0, 0],
        phoneState: { cutaway: 1, charging: 1 },
      });
      cordBeads.update(t);
      kit.fly(camera, t, { from: poseA, to: poseB, start: gap - 0.8, dur: 1.6 });
    },
  };
}
