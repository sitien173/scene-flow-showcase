// m1a: Alternating current (#F08A4B) enters the transmitter PCB and reverses back-and-forth in the TX coil.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const circuit = kit.beat("circuit");
  const ac = kit.beat("ac");
  const poseA = { pos: [0.2, DESK_Y + 1.32, 1.72], look: [-0.04, DESK_Y + 0.48, 0.02], fov: 34 };
  const poseB = { pos: [0.36, DESK_Y + 1.24, 1.56], look: [0.04, DESK_Y + 0.44, 0.02], fov: 34 };
  const camera = kit.camera(poseA);

  const cordFeed = kit.beads(world.pad.path("cord"), {
    distance: 1.5, fov: 32, color: "#F08A4B", glow: "#FFD4B2", start: 0, onTop: true,
  });
  const coilFwd = kit.beads(world.pad.path("coil"), {
    distance: 1.4, fov: 32, color: "#F08A4B", glow: "#FFD4B2", start: circuit, reverse: false, onTop: true,
  });
  const coilRev = kit.beads(world.pad.path("coil"), {
    distance: 1.4, fov: 32, color: "#F08A4B", glow: "#FFD4B2", start: circuit, reverse: true, onTop: true,
  });
  kit.group.add(cordFeed.group, coilFwd.group, coilRev.group);
  kit.callout({ text: "MẠCH PHÁT", anchor: world.pad.anchors.circuit, at: circuit, hold: 2.5 });
  kit.bigText({ text: "DÒNG XOAY CHIỀU", at: ac, hold: 1.2, y: 560 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pad.group],
    update(t) {
      const acActive = t >= circuit - 0.15 ? 1 : 0.3;
      const phase = Math.cos(t * 4.2);
      world.set(t, {
        padState: { cutaway: 1, coilGlow: acActive, txGlow: 1, led: "active" },
        phonePos: [0.04, DESK_Y + 0.92, 0.22],
        phoneRot: [-0.25, 0, 0],
        phoneState: { cutaway: 1, charging: 1 },
      });
      cordFeed.update(t);
      coilFwd.update(t);
      coilRev.update(t);
      // Reverse charge-flow direction visibly every half-cycle
      if (t >= circuit) {
        coilFwd.group.visible = phase >= 0;
        coilRev.group.visible = phase < 0;
      }
      kit.drift(camera, t, { from: poseA, to: poseB, start: circuit, dur: 3.5 });
    },
  };
}
