// m1h: DC power passes through regulator and charge controller into the battery cell (#2D884E), raising level.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const reg = kit.beat("reg");
  const charger = kit.beat("charger");
  const dcBat = kit.beat("dc_bat");
  const poseA = { pos: [0.06, DESK_Y + 1.34, 1.52], look: [0.04, DESK_Y + 0.36, 0.02], fov: 33 };
  const poseB = { pos: [0.36, DESK_Y + 1.28, 1.44], look: [0.22, DESK_Y + 0.38, 0.02], fov: 33 };
  const camera = kit.camera(poseA);

  world.batt.group.position.set(0.06, DESK_Y + 0.36, 0.02);
  world.batt.group.scale.setScalar(0.88);
  const dcFlow = kit.beads(world.batt.path("dc"), {
    distance: 1.25, fov: 32, color: "#2D884E", glow: "#9CE8B8", start: 0, end: 12.2, reverse: false, onTop: true,
  });
  kit.group.add(dcFlow.group);
  kit.callout({ text: "ỔN ÁP NGUỒN", anchor: world.batt.anchors.regulator, at: reg, hold: 1.5 });
  kit.callout({ text: "MẠCH SẠC PIN", anchor: world.batt.anchors.charger, at: charger, hold: 2.8 });
  kit.bigText({ text: "NẠP PIN (DC)", at: dcBat, hold: 1.8, y: 550 });

  return {
    scene: world.scene,
    camera,
    hero: [world.batt.group],
    update(t) {
      const regOn = kit.ease(kit.progress(t, reg - 0.3, 0.6), "out");
      const chgOn = kit.ease(kit.progress(t, charger - 0.3, 0.6), "out");
      const charge = 0.28 + 0.64 * kit.ease(kit.progress(t, charger, dcBat - charger + 1.8), "inOut");
      world.set(t, {
        padState: { cutaway: 1, coilGlow: 0.7, led: "active" },
        phonePos: [0.04, DESK_Y + 0.175, 0.22],
        phoneVisible: false,
        phoneState: { charging: 1 },
        battVisible: true,
        battState: { charge, acIn: 0.7, dcOut: 1, rectGlow: 0.4, regGlow: regOn, chargerGlow: chgOn },
      });
      dcFlow.update(t);
      kit.fly(camera, t, { from: poseA, to: poseB, start: reg, dur: 5.5 });
    },
  };
}
