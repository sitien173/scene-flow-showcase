// m1c / token: Apple Pay sends a #2D7FF9 substitute number (token), keeping the real card locked inside.
import { cafeWorld } from "./tap.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const world = await kit.world("cafe", cafeWorld);
  const from = { pos: [-0.45, 2.32, 1.92], look: [0.35, 1.88, 0.05], fov: 34 };
  const to = { pos: [-0.28, 2.22, 1.78], look: [0.35, 1.86, 0.02], fov: 34 };
  const camera = kit.camera(from);
  const tokenBeat = kit.beat("token");

  const tokenPkt = dataPacket(kit, { kind: "token" });
  kit.group.add(tokenPkt.group);
  kit.callout({
    text: "SỐ THAY THẾ",
    anchor: tokenPkt.anchors.center,
    at: tokenBeat,
    hold: 1.6,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.phone.group, tokenPkt.group],
    update(t) {
      const fly = kit.ease(kit.progress(t, tokenBeat, 1.1), "inOut");
      world.set(t, {
        posCut: 0.75,
        posGlow: 0.85,
        phoneCut: 0.95,
        phoneGlow: 0.9,
        cardPulse: 1,
        phonePos: [0.35, 2.15, 0.08],
        phoneRot: [0.05, 0, 0],
        fieldIntensity: 0.85,
      });
      kit.popIn(tokenPkt.group, t, Math.max(0.2, tokenBeat - 0.3), { dur: 0.28 });
      tokenPkt.group.position.set(0.35, kit.lerp(2.14, 1.76, fly), kit.lerp(0.06, -0.1, fly));
      tokenPkt.update(t, { pulse: 1 });
      kit.drift(camera, t, { from, to, start: 0.2, dur: 3.0 });
    },
  };
}
