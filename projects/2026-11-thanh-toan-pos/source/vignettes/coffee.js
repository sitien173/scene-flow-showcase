// a1a / coffee: Back at the cafe counter (coffee-cup + pos-reader); store sends #F08A4B request to payment-network.
import { cafeWorld } from "./tap.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const world = await kit.world("cafe", cafeWorld);
  const from = { pos: [0.3, 2.38, 3.65], look: [0.25, 1.55, 0.15], fov: 38 };
  const to = { pos: [1.55, 2.42, 4.35], look: [1.45, 1.5, 0.05], fov: 38 };
  const camera = kit.camera(from);
  const sendBeat = kit.beat("send");

  const reqPts = [
    [0.65, 1.65, 0.2],
    [2.8, 1.75, 0.0],
    [5.6, 1.65, -0.2],
    [8.2, 1.15, -0.35],
  ];
  const reqStream = kit.beads(reqPts, {
    distance: 4.0,
    fov: 38,
    color: "#F08A4B",
    glow: "#F08A4B",
    start: Math.max(0.2, sendBeat - 0.3),
    onTop: true,
  });
  const reqPkt = dataPacket(kit, { kind: "request" });
  kit.group.add(reqStream.group, reqPkt.group);
  kit.callout({
    text: "XIN DUYỆT",
    anchor: reqPkt.anchors.center,
    at: sendBeat,
    hold: 1.5,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.cup.group, world.pos.group, reqPkt.group],
    update(t) {
      const send = kit.ease(kit.progress(t, sendBeat, 1.4), "inOut");
      world.set(t, {
        posStatus: "wait",
        phoneVisible: false,
      });
      reqStream.update(t);
      kit.popIn(reqPkt.group, t, Math.max(0.2, sendBeat - 0.25), { dur: 0.25 });
      reqPkt.group.position.set(
        kit.lerp(0.65, 4.8, send),
        kit.lerp(1.7, 1.82, Math.sin(send * Math.PI)),
        kit.lerp(0.2, -0.1, send)
      );
      reqPkt.update(t, { pulse: 1 });
      kit.drift(camera, t, { from, to, start: 0.3, dur: 3.1 });
    },
  };
}
