// m1e / verify: Payment processor scans the #2D7FF9 cryptogram and marks it valid (#2D7FF9, not green yet).
import { cafeWorld } from "./tap.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const world = await kit.world("cafe", cafeWorld);
  const from = { pos: [8.8, 1.82, 3.85], look: [8.8, 1.28, -0.35], fov: 38 };
  const to = { pos: [8.8, 1.65, 3.45], look: [8.8, 1.3, -0.35], fov: 38 };
  const camera = kit.camera(from);
  const checkBeat = kit.beat("check");

  const copyPkt = dataPacket(kit, { kind: "crypto" });
  copyPkt.group.position.set(8.8, 1.05, -0.36);
  copyPkt.group.scale.setScalar(1.35);
  kit.group.add(copyPkt.group);
  kit.callout({
    text: "BÊN XỬ LÝ",
    anchor: world.network.anchors.sign,
    at: 0.0,
    hold: 0.35,
  });
  kit.label({
    text: "MÃ HỢP LỆ",
    at: checkBeat + 0.1,
    hold: 1.8,
    x: kit.W / 2,
    y: 920,
    color: "#2D7FF9",
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.network.group, copyPkt.group],
    update(t) {
      const ver = kit.ease(kit.progress(t, checkBeat, 0.35), "out");
      world.set(t, {
        netScan: 1,
        netVerified: ver,
        netApproved: 0,
      });
      copyPkt.update(t, { pulse: ver, spin: 0.7 });
      kit.drift(camera, t, { from, to, start: 0.2, dur: 2.6 });
    },
  };
}
