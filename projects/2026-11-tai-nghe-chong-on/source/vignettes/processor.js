// processor.js (m1 step 2): Closeup anc-chip receives yellow signal beads, inverts phase, outputs green beads.
import { headphoneWorld } from "./hook.js";
import { ancChip } from "./anc-chip/anc-chip.js";

export async function build(kit) {
  const world = await kit.world("headphone", headphoneWorld);
  const { PALETTE } = kit;
  const poseA = { pos: [0, 4.2, 7.6], look: [0, 1.25, 2.2], fov: 38 };
  const poseB = { pos: [0.35, 4.0, 7.3], look: [0.1, 1.25, 2.2], fov: 38 };
  const camera = kit.camera(poseA);

  const chipBeat = kit.beat("chip");
  const calcBeat = kit.beat("calc");

  const chip = ancChip(kit, {});
  chip.group.position.set(0, 1.25, 2.2);
  chip.group.rotation.x = 0.22;
  kit.group.add(chip.group);

  const inBeads = kit.beads(chip.path("in"), {
    distance: 4.0,
    fov: 35,
    color: PALETTE.highlight,
    glow: "#FFF6C8",
    start: 0,
    onTop: true,
  });
  const outBeads = kit.beads(chip.path("out"), {
    distance: 4.0,
    fov: 35,
    color: PALETTE.good,
    glow: "#A8F0C6",
    start: calcBeat,
    onTop: true,
  });
  kit.group.add(inBeads.group, outBeads.group);

  kit.callout({ text: "BỘ XỬ LÝ", anchor: chip.anchors.chip, at: chipBeat, hold: 1.5 });

  return {
    scene: world.scene,
    camera,
    hero: chip.group,
    update(t) {
      world.set(t, { visible: false });
      const proc = kit.ease(kit.progress(t, chipBeat - 0.2, 0.4), "out");
      const inv = kit.ease(kit.progress(t, calcBeat - 0.1, 0.6), "out");
      chip.update(t, { processing: proc, invert: inv });
      inBeads.update(t);
      outBeads.update(t);

      kit.drift(camera, t, { from: poseA, to: poseB, start: 0, dur: 3.8 });
    },
  };
}
