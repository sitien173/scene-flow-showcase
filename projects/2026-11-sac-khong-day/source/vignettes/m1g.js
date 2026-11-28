// m1g: Phone cutaway circuitry: oscillating #2D7FF9 AC enters rectifier, becomes one-way #2D884E DC output.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const rxAc = kit.beat("rx_ac");
  const rect = kit.beat("rect");
  const oneWay = kit.beat("one_way");
  const poseA = { pos: [-0.26, DESK_Y + 1.38, 1.56], look: [-0.14, DESK_Y + 0.36, 0.02], fov: 33 };
  const poseB = { pos: [0.04, DESK_Y + 1.34, 1.52], look: [0.02, DESK_Y + 0.36, 0.02], fov: 33 };
  const camera = kit.camera(poseA);

  world.batt.group.position.set(0.06, DESK_Y + 0.36, 0.02);
  world.batt.group.scale.setScalar(0.88);
  const acFwd = kit.beads(world.batt.path("ac"), {
    distance: 1.3, fov: 32, color: "#2D7FF9", glow: "#A8CCFF", start: 0.4, reverse: false, onTop: true,
  });
  const acRev = kit.beads(world.batt.path("ac"), {
    distance: 1.3, fov: 32, color: "#2D7FF9", glow: "#A8CCFF", start: 0.4, reverse: true, onTop: true,
  });
  const dcFlow = kit.beads(world.batt.path("dc"), {
    distance: 1.3, fov: 32, color: "#2D884E", glow: "#9CE8B8", start: rect, reverse: false, onTop: true,
  });
  kit.group.add(acFwd.group, acRev.group, dcFlow.group);
  kit.callout({ text: "DÒNG XOAY CHIỀU", anchor: world.batt.anchors.input, at: rxAc, hold: 2.5 });
  kit.callout({ text: "BỘ CHỈNH LƯU", anchor: world.batt.anchors.rectifier, at: rect, hold: 2.6 });
  kit.card({ title: "CHỈNH LƯU", body: "ĐỔI CHIỀU → MỘT CHIỀU", at: oneWay, hold: 0.85, y: 435, width: 600 });

  return {
    scene: world.scene,
    camera,
    hero: [world.batt.group],
    update(t) {
      const pol = Math.cos(t * 4.4);
      const rectOn = kit.ease(kit.progress(t, rect - 0.3, 0.6), "out");
      const dcOn = kit.ease(kit.progress(t, rect + 0.2, 0.8), "out");
      world.set(t, {
        padState: { cutaway: 1, coilGlow: 0.7, led: "active" },
        phonePos: [0.04, DESK_Y + 0.175, 0.22],
        phoneVisible: false,
        phoneState: { charging: 1 },
        battVisible: true,
        battState: { charge: 0.28, acIn: 1, dcOut: dcOn, rectGlow: rectOn, regGlow: 0, chargerGlow: 0 },
      });
      acFwd.update(t);
      acRev.update(t);
      dcFlow.update(t);
      if (t >= 0.4) {
        acFwd.group.visible = pol >= 0;
        acRev.group.visible = pol < 0;
      }
      kit.drift(camera, t, { from: poseA, to: poseB, start: rect - 0.5, dur: 4.5 });
    },
  };
}
