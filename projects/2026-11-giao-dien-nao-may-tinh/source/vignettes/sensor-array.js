// sensor-array.js — Scene 5 (sentences 11-12): Step 1 — 96-channel 4x4 mm array seated into motor cortex hand area.
import { bciLabWorld, BENCH_Y, STATIONS } from "./open.js";
import { brainCutaway } from "./brain-cutaway/brain-cutaway.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[4];

  const brain = brainCutaway(kit, { mode: "implanted", arrayCount: 1 });
  brain.group.position.set(sx, BENCH_Y, sz);
  brain.group.scale.setScalar(1.0);

  const beam = signalPulse(kit, { mode: "beam", length: 1.35, color: "#00B4D8" });
  beam.group.position.set(sx + 0.72, BENCH_Y + 1.46, sz - 0.28);
  beam.group.lookAt(new THREE.Vector3(sx + 1.35, BENCH_Y + 2.05, sz - 0.55));

  kit.group.add(brain.group, beam.group);

  const startAngle = -0.22;
  const endAngle = 0.16;
  const center = [sx + 0.10, 2.38, sz + 0.04];
  const pose0 = {
    pos: [center[0] + 6.2 * Math.sin(startAngle), 3.15, center[2] + 6.2 * Math.cos(startAngle)],
    look: center,
    fov: 38,
  };
  const camera = kit.camera(pose0);

  const step1 = kit.beat("step1");
  const handArea = kit.beat("hand_area");

  kit.card({ title: "BƯỚC 1: CẢM BIẾN", body: "96 kênh · 4 × 4 mm", at: step1 + 0.3, hold: 3.3, anchor: brain.anchors.array1, y: 470, width: 580 });
  kit.callout({ text: "VÙNG BÀN TAY", anchor: brain.anchors.handArea, at: handArea, hold: 2.8 });
  return {
    scene: world.scene,
    camera,
    hero: brain.group,
    update(t) {
      const drop = kit.ease(kit.progress(t, 0.8, 2.4), "out");
      const lit = kit.lerp(0.45, 1.0, kit.ease(kit.progress(t, handArea - 0.5, 1.0), "out"));
      brain.update(t, { mode: "implanted", cutaway: 1.0, implanted: 1.0, implantDrop: drop, cortexLit: lit });
      beam.update(t, { active: drop > 0.75 ? 1 : 0.25 });

      const prog = kit.ease(kit.progress(t, 0, 8.6), "inOut");
      const ang = kit.lerp(startAngle, endAngle, prog);
      const rad = kit.lerp(6.2, 4.9, prog);
      const h = kit.lerp(3.15, 2.85, prog);
      kit.setPose(camera, {
        pos: [center[0] + rad * Math.sin(ang), h, center[2] + rad * Math.cos(ang)],
        look: center,
        fov: 38,
      });

    },
  };
}
