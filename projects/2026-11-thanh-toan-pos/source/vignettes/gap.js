// w1 / gap: Macro side-view of the air gap between smartphone and POS bridged by #FCD53E field (<= 2 CM).
import { cafeWorld } from "./tap.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("cafe", cafeWorld);
  const from = { pos: [2.45, 1.92, 0.45], look: [0.35, 1.84, 0.0], fov: 32 };
  const to = { pos: [2.25, 1.9, 0.38], look: [0.35, 1.84, 0.0], fov: 31 };
  const camera = kit.camera(from);
  const twoCm = kit.beat("two_cm");

  // 3D measurement bracket beside the air gap
  const bracket = new THREE.Group();
  bracket.position.set(0.35, 1.86, 0.36);
  const barMat = kit.toon("#18191E");
  const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.24, 0.025), barMat);
  const topCap = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 0.12), barMat);
  topCap.position.set(0, 0.12, -0.05);
  const botCap = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 0.12), barMat);
  botCap.position.set(0, -0.12, -0.05);
  bracket.add(vBar, topCap, botCap);
  kit.ink(bracket);
  kit.group.add(bracket);
  kit.bigText({ text: "≤ 2 CM", at: twoCm, hold: 2.0, y: 560 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pos.group, world.phone.group, bracket],
    update(t) {
      world.set(t, {
        posCut: 0,
        posGlow: 0.9,
        phoneCut: 0,
        phoneGlow: 0.9,
        phonePos: [0.35, 2.02, -0.02],
        phoneRot: [0, 0, 0],
        fieldIntensity: 1,
        fieldScale: 1.0,
      });
      kit.popIn(bracket, t, Math.max(0.2, twoCm - 0.5), { dur: 0.3 });
      kit.drift(camera, t, { from, to, start: 0.2, dur: 2.8 });
    },
  };
}
