// airplane.js (a1): Back in airplane cabin; toggling ANC switch turns red engine wave into gentle purple residual inside cup.
import { cabinWorld } from "./cabin_intro.js";
import { waveRibbon } from "./wave-ribbon/wave-ribbon.js";

export async function build(kit) {
  const world = await kit.world("cabin", cabinWorld);
  const { PALETTE } = kit;
  const camera = kit.camera({ pos: [0.6, 2.0, 6.0], look: [0.3, 1.5, -0.5], fov: 38 });

  const toggleBeat = kit.beat("toggle");
  const engineBeat = kit.beat("engine");

  const cupWave = waveRibbon(kit, { length: 1.6, amp: 0.28, freq: 1.6, color: PALETTE.accent });
  cupWave.group.position.set(0.25, 1.65, 0.45);
  kit.group.add(cupWave.group);

  kit.callout({ text: "BẬT CHỐNG ỒN", anchor: world.hp.anchors.switch, at: toggleBeat, hold: 1.5 });
  kit.label({ text: "TIẾNG Ù NHỎ ĐI", at: engineBeat, hold: 1.2, y: 820, size: 62 });

  return {
    scene: world.scene,
    camera,
    hero: [world.hp.group, world.cabin.group],
    update(t) {
      const on = kit.ease(kit.progress(t, toggleBeat - 0.1, 0.45), "out");
      world.set(t, { engineSpeed: 1, hum: 1 - 0.65 * on, cutaway: 0, ancOn: on, pulse: on });
      cupWave.update(t, {
        amp: 0.28 * (1 - 0.72 * on),
        color: on > 0.5 ? PALETTE.shade : PALETTE.accent,
      });

      kit.orbit(camera, t, { center: [0.3, 1.5, -0.5], radius: 6.5, height: 0.5, angle: 0.1, speed: 0.08 });
    },
  };
}
