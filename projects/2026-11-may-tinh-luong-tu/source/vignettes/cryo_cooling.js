// cryo_cooling (sentences 10-12). Moves: the multi-tier cooling shell of the qubit chip lowers over the die at
// night (cold). Interacts: red thermal noise flies in from outside and bounces off the shell (noise). Result: the
// purple qubit core stays steady inside; the camera pushes in to the protected core.
import { qubitChip } from "./qubit-chip/qubit-chip.js";
import { B, at, quantumWorld } from "./worlds.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("quantum", quantumWorld);
  const set = new THREE.Group();
  set.position.set(...B);
  kit.group.add(set);
  const chip = qubitChip(kit, { mode: "cryo_shield" });
  set.add(chip.group);

  const cold = kit.beat("cold");
  const absZero = kit.beat("abs_zero");
  const noise = kit.beat("noise");

  const pose = at(B, [0, 3.2, 6.6], [0, 1.0, 0]);
  const near = at(B, [0, 2.4, 4.6], [0, 0.7, 0]);
  const camera = kit.camera(pose);

  kit.card({ title: "Chip siêu dẫn Google", body: "< 20 mK", at: cold, hold: 2.2, anchor: chip.anchors.cryoShell, y: 440, width: 680 });
  kit.label({ text: "Gần độ không tuyệt đối", at: absZero, hold: 3.0, y: 620 });
  kit.callout({ text: "Giảm nhiễu", anchor: chip.anchors.cryoShell, at: noise, hold: 2.4, gap: 300 });

  return {
    scene: world.scene,
    camera,
    hero: chip.group,
    update(t) {
      // shell lowers over the die on "cold"; noise particles appear on "noise" and bounce off the shell
      const shield = kit.ease(kit.progress(t, cold - 0.6, 1.4), "out");
      chip.update(t, { mode: "cryo_shield", shield: Math.max(0.03, shield), noise: kit.progress(t, noise - 0.4, 0.4) });
      // hold the wide pose, then push in to the protected core as the noise arrives
      kit.drift(camera, t, { from: pose, to: near, start: noise - 0.5, dur: 2.5 });
    },
  };
}
