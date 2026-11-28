// paradox.js (w1 payoff): Returns to exact hook 3/4 pose; X on silent speaker, then green+purple waves bloom on "phát".
import { headphoneWorld } from "./hook.js";
import { waveRibbon } from "./wave-ribbon/wave-ribbon.js";

export async function build(kit) {
  const world = await kit.world("headphone", headphoneWorld);
  const { PALETTE } = kit;
  const pose = { pos: [2.4, 2.4, 9.2], look: [0.15, 1.75, 0], fov: 40 };
  const camera = kit.camera(pose);

  const silentBeat = kit.beat("silent");
  const moreBeat = kit.beat("more");

  const greenWave = waveRibbon(kit, { length: 2.4, amp: 0.34, freq: 2.0, phase: Math.PI, color: PALETTE.good });
  greenWave.group.position.set(2.3, 1.35, 0.25);
  const quietWave = waveRibbon(kit, { length: 2.4, amp: 0.10, freq: 2.0, color: PALETTE.shade });
  quietWave.group.position.set(2.3, 1.35, 0.45);
  kit.group.add(greenWave.group, quietWave.group);

  kit.mark({ kind: "x", anchor: world.hp.anchors.speaker, at: silentBeat, hold: 1.0 });
  kit.bigText({ text: "PHÁT THÊM ÂM", at: moreBeat, hold: 1.4, y: 1120 });

  return {
    scene: world.scene,
    camera,
    hero: world.hp.group,
    update(t) {
      const bloom = kit.ease(kit.progress(t, moreBeat - 0.1, 0.5), "out");
      world.set(t, { ancOn: bloom, pulse: bloom });
      greenWave.group.visible = t >= moreBeat - 0.1;
      quietWave.group.visible = t >= moreBeat - 0.1;
      greenWave.update(t, { amp: 0.34 * bloom, reveal: bloom });
      quietWave.update(t, { amp: 0.10 * bloom, reveal: bloom });

      kit.crane(camera, t, { ...pose, height: 0.4, start: moreBeat, dur: 1.0 });
    },
  };
}
