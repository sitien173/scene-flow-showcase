// m1d / crypto: One-time #2D7FF9 cryptogram packet (with dynamic key crest) joins token into POS.
import { cafeWorld } from "./tap.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const world = await kit.world("cafe", cafeWorld);
  const pose = { pos: [0.75, 2.25, 1.98], look: [0.35, 1.88, 0.02], fov: 34 };
  const camera = kit.camera(pose);
  const cryptoBeat = kit.beat("crypto");

  const cryptoPkt = dataPacket(kit, { kind: "crypto" });
  kit.group.add(cryptoPkt.group);
  kit.callout({
    text: "MÃ BẢO MẬT",
    anchor: cryptoPkt.anchors.center,
    at: cryptoBeat,
    hold: 1.8,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.pos.group, cryptoPkt.group],
    update(t) {
      const fly = kit.ease(kit.progress(t, cryptoBeat, 1.15), "inOut");
      world.set(t, {
        posCut: 0.75,
        posGlow: 0.9,
        phoneCut: 0.95,
        phoneGlow: 0.95,
        cardPulse: 1,
        phonePos: [0.35, 2.15, 0.08],
        phoneRot: [0.05, 0, 0],
        fieldIntensity: 0.85,
      });
      kit.popIn(cryptoPkt.group, t, Math.max(0.2, cryptoBeat - 0.35), { dur: 0.28 });
      cryptoPkt.group.position.set(0.35, kit.lerp(2.14, 1.74, fly), kit.lerp(0.05, -0.1, fly));
      cryptoPkt.update(t, { pulse: 1, spin: 1 });
      kit.push(camera, t, { ...pose, amount: 0.28, start: 0.5, dur: 2.8 });
    },
  };
}
