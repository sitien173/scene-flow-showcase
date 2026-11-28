// mic.js (m1 step 1): Closeup mic-module picks up red noise wave and outputs yellow electrical signal beads.
import { headphoneWorld } from "./hook.js";
import { micModule } from "./mic-module/mic-module.js";
import { waveRibbon } from "./wave-ribbon/wave-ribbon.js";

export async function build(kit) {
  const world = await kit.world("headphone", headphoneWorld);
  const { PALETTE } = kit;
  const pose = { pos: [-0.25, 1.65, 9.8], look: [-0.25, 1.45, 2.2], fov: 38 };
  const camera = kit.camera(pose);

  const pickupBeat = kit.beat("pickup");
  const signalBeat = kit.beat("signal");

  const mic = micModule(kit, {});
  mic.group.position.set(-0.2, 1.45, 2.2);
  mic.group.rotation.y = 0.35;

  const redWave = waveRibbon(kit, { length: 2.2, amp: 0.36, freq: 2.2, color: PALETTE.accent });
  redWave.group.position.set(-1.9, 1.45, 2.5);
  redWave.group.rotation.y = 0.2;

  kit.group.add(mic.group, redWave.group);
  const sigBeads = kit.beads(mic.path("signal"), {
    distance: 5.0,
    fov: 34,
    color: PALETTE.highlight,
    glow: "#FFF6C8",
    start: signalBeat - 0.2,
    onTop: true,
  });
  kit.group.add(sigBeads.group);

  kit.callout({ text: "TÍN HIỆU ĐIỆN", anchor: mic.anchors.port, at: signalBeat, hold: 1.4 });

  return {
    scene: world.scene,
    camera,
    hero: mic.group,
    update(t) {
      world.set(t, { visible: false });
      const vib = kit.ease(kit.progress(t, pickupBeat - 0.2, 0.5), "out");
      const act = kit.ease(kit.progress(t, signalBeat - 0.2, 0.4), "out");
      mic.update(t, { vibrate: vib, active: act });
      redWave.update(t, { reveal: kit.progress(t, 0, 0.6) });
      sigBeads.update(t);

      kit.push(camera, t, { ...pose, amount: 0.4, start: pickupBeat, dur: 1.5 });
    },
  };
}
