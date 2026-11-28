// hook.js (c1): Opening crane onto anc-headphone; red noise wave hits cup, then speaker emits green anti-phase wave.
import { ancHeadphone } from "./anc-headphone/anc-headphone.js";
import { waveRibbon } from "./wave-ribbon/wave-ribbon.js";

export function headphoneWorld(kit) {
  const scene = kit.stage({ yard: 10 });
  const env = scene.getObjectByName("toon3d-surroundings");
  const hp = ancHeadphone(kit, {});
  scene.add(hp.group);
  function set(t, { explode = 0, cutaway = 0, ancOn = 0, pulse = 0, visible = true } = {}) {
    hp.group.visible = visible;
    if (env) env.visible = visible;
    hp.update(t, { explode, cutaway, ancOn, pulse });
  }
  return { scene, hp, set };
}

export async function build(kit) {
  const world = await kit.world("headphone", headphoneWorld);
  const { PALETTE } = kit;
  const pose = { pos: [2.4, 2.4, 9.2], look: [0.15, 1.75, 0], fov: 40 };
  const camera = kit.camera(pose);
  const noiseBeat = kit.beat("noise");
  const addBeat = kit.beat("add");

  const redWave = waveRibbon(kit, { length: 2.8, amp: 0.42, freq: 2.0, color: PALETTE.accent });
  redWave.group.position.set(2.8, 1.35, 0.1);
  const greenWave = waveRibbon(kit, { length: 2.2, amp: 0.36, freq: 2.0, phase: Math.PI, color: PALETTE.good });
  greenWave.group.position.set(2.3, 1.35, 0.3);
  kit.group.add(redWave.group, greenWave.group);

  kit.callout({ text: "PHÁT THÊM ÂM", anchor: world.hp.anchors.cup, at: addBeat, hold: 1.5 });

  return {
    scene: world.scene,
    camera,
    hero: world.hp.group,
    update(t) {
      const addP = kit.ease(kit.progress(t, addBeat, 0.5), "out");
      world.set(t, { ancOn: addP, pulse: addP });
      const nRev = kit.progress(t, Math.max(0, noiseBeat - 0.5), 0.7);
      redWave.update(t, { amp: 0.42 * (1 - 0.65 * addP), reveal: nRev });
      greenWave.group.visible = t >= addBeat - 0.1;
      greenWave.update(t, { amp: 0.36 * addP, reveal: addP });

      kit.push(camera, t, { ...pose, amount: 0.6, start: addBeat, dur: 1.3 });
    },
  };
}
