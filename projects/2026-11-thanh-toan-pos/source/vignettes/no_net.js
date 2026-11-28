// m1b / no_net: Direct #2D7FF9 NFC link between phone and POS with crossed-out grey Internet globe (#A5A6AA).
import { cafeWorld } from "./tap.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("cafe", cafeWorld);
  const from = { pos: [0.85, 2.38, 2.35], look: [0.35, 2.02, 0.0], fov: 36 };
  const to = { pos: [0.65, 2.32, 2.15], look: [0.35, 2.04, 0.0], fov: 36 };
  const camera = kit.camera(from);
  const noNetBeat = kit.beat("no_net");

  const directFlow = kit.beads(
    [[0.35, 2.1, -0.14], [0.35, 1.88, -0.14], [0.35, 1.68, -0.14]],
    { distance: 2.3, fov: 36, color: "#2D7FF9", glow: "#2D7FF9", start: 0, onTop: true }
  );
  kit.group.add(directFlow.group);

  // Grey Internet globe (#A5A6AA) with diagonal slash
  const globeGroup = new THREE.Group();
  globeGroup.position.set(0.35, 2.68, 0.0);
  const greyMat = kit.toon("#A5A6AA");
  const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(0.18, 1), greyMat);
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.185, 0.014, 6, 20), kit.toon("#FAFCFB"));
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.185, 0.014, 6, 20), kit.toon("#FAFCFB"));
  ring2.rotation.y = Math.PI / 2;
  globeGroup.add(sphere, ring1, ring2);

  const slash = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.045, 0.045), greyMat);
  slash.rotation.z = Math.PI / 4;
  slash.position.z = 0.2;
  globeGroup.add(slash);

  kit.ink(globeGroup);
  kit.group.add(globeGroup);
  kit.callout({
    text: "KHÔNG CẦN MẠNG",
    anchor: [0.35, 2.68, 0.0],
    at: noNetBeat,
    hold: 1.6,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.pos.group, world.phone.group, globeGroup],
    update(t) {
      world.set(t, {
        posCut: 0.7,
        posGlow: 0.9,
        phoneCut: 0.85,
        phoneGlow: 0.9,
        phonePos: [0.35, 2.12, 0.08],
        phoneRot: [0.05, 0, 0],
        fieldIntensity: 0.95,
      });
      directFlow.update(t);
      kit.popIn(slash, t, noNetBeat, { dur: 0.25 });
      kit.drift(camera, t, { from, to, start: 0.2, dur: 2.8 });
    },
  };
}
