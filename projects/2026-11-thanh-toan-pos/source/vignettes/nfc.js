// m1a / nfc: Smartphone enters the #FCD53E field; two coils couple and exchange #2D7FF9 / #F08A4B beads.
import { cafeWorld } from "./tap.js";

export async function build(kit) {
  const world = await kit.world("cafe", cafeWorld);
  const camera = kit.camera({ pos: [0.95, 2.15, 1.75], look: [0.35, 1.85, -0.05], fov: 34 });
  const nfcBeat = kit.beat("nfc");

  const phonePts = [
    [0.35, 2.1, -0.14],
    [0.24, 1.9, -0.14],
    [0.35, 1.68, -0.14],
  ];
  const posPts = [
    [0.35, 1.68, -0.14],
    [0.46, 1.9, -0.14],
    [0.35, 2.1, -0.14],
  ];
  const phoneFlow = kit.beads(phonePts, {
    distance: 2.0,
    fov: 34,
    color: "#2D7FF9",
    glow: "#2D7FF9",
    start: Math.max(0.2, nfcBeat - 0.5),
    onTop: true,
  });
  const posFlow = kit.beads(posPts, {
    distance: 2.0,
    fov: 34,
    color: "#F08A4B",
    glow: "#F08A4B",
    start: Math.max(0.2, nfcBeat - 0.3),
    onTop: true,
  });
  kit.group.add(phoneFlow.group, posFlow.group);
  kit.bigText({ text: "NFC", at: nfcBeat, hold: 1.5, y: 580 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pos.group, world.phone.group],
    update(t) {
      const enter = kit.ease(kit.progress(t, 0.1, 0.9), "out");
      world.set(t, {
        posCut: 0.7,
        posGlow: 1,
        phoneCut: 0.85,
        phoneGlow: 1,
        phonePos: [0.35, kit.lerp(2.42, 2.12, enter), 0.08],
        phoneRot: [0.05, 0, 0],
        fieldIntensity: 1,
        fieldScale: 1.05,
      });
      phoneFlow.update(t);
      posFlow.update(t);
      kit.orbit(camera, t, {
        center: [0.35, 1.85, -0.05],
        radius: 1.85,
        height: 0.3,
        angle: 0.35,
        speed: 0.18,
        fov: 34,
      });
    },
  };
}
