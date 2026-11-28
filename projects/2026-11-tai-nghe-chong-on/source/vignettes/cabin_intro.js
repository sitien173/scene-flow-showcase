// cabin_intro.js (r1): Airplane cabin with engine hum outside window, then fly close to cutaway headphone.
import { airplaneCabin } from "./airplane-cabin/airplane-cabin.js";
import { ancHeadphone } from "./anc-headphone/anc-headphone.js";

export function cabinWorld(kit) {
  const scene = kit.stage({ yard: 10 });
  const cabin = airplaneCabin(kit, {});
  scene.add(cabin.group);
  const hp = ancHeadphone(kit, {});
  hp.group.scale.setScalar(0.45);
  hp.group.position.copy(cabin.anchors.headphoneSpot.position);
  hp.group.rotation.y = -0.35;
  scene.add(hp.group);

  function set(t, { engineSpeed = 1, hum = 1, cutaway = 0, ancOn = 0, pulse = 0 } = {}) {
    cabin.update(t, { engineSpeed, hum });
    hp.update(t, { cutaway, ancOn, pulse });
  }
  return { scene, cabin, hp, set };
}

export async function build(kit) {
  const world = await kit.world("cabin", cabinWorld);
  const poseA = { pos: [0.3, 2.2, 5.8], look: [0.1, 1.7, -1.2], fov: 40 };
  const poseB = { pos: [2.6, 1.75, 4.3], look: [0.85, 1.55, 0.2], fov: 40 };
  const camera = kit.camera(poseA);

  const insideBeat = kit.beat("inside");

  kit.callout({ text: "TRONG TAI NGHE", anchor: world.hp.anchors.cup, at: insideBeat, hold: 1.4 });

  return {
    scene: world.scene,
    camera,
    hero: [world.cabin.group, world.hp.group],
    update(t) {
      const cw = kit.ease(kit.progress(t, insideBeat - 0.3, 0.6), "out");
      world.set(t, { engineSpeed: 1, hum: 1, cutaway: cw });
      kit.fly(camera, t, { from: poseA, to: poseB, start: insideBeat - 0.5, dur: 1.1, ease: "inOut" });
    },
  };
}
