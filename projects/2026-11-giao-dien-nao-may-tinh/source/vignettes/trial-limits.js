// trial-limits.js — Scene 17 (sentences 45-47): two-way adaptation, 1 to 2 participants per study, BrainGate an investigational device (2012).
import { bciLabWorld, BENCH_Y, STATIONS } from "./open.js";
import { brainCutaway } from "./brain-cutaway/brain-cutaway.js";
import { controllerChip } from "./controller-chip/controller-chip.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[6];

  const brain = brainCutaway(kit, { mode: "implanted" });
  brain.group.position.set(sx - 1.40, BENCH_Y, sz - 0.15);
  brain.group.scale.setScalar(0.78);
  brain.group.rotation.y = 0.35;

  const chip = controllerChip(kit, { mode: "lut_update" });
  chip.group.position.set(sx + 0.95, BENCH_Y, sz + 0.25);
  chip.group.scale.setScalar(0.85);

  const pBrain = new THREE.Vector3(sx - 1.0, BENCH_Y + 1.15, sz - 0.05);
  const pChip = new THREE.Vector3(sx + 0.85, BENCH_Y + 0.35, sz + 0.25);
  const toChip = [0, 1].map(() => dataPacket(kit, { color: "#F59E0B" }));
  const toBrain = [0, 1].map(() => dataPacket(kit, { kind: "good" }));
  [...toChip, ...toBrain].forEach((p) => p.group.scale.setScalar(0.6));

  // Two plain tokens for "one or two participants per study" on a small plinth at the bench front.
  const tokens = new THREE.Group();
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.45), kit.toon("#4868C8"));
  plinth.position.set(0, 0.04, 0);
  tokens.add(plinth);
  const tokenMats = [];
  for (let i = 0; i < 2; i++) {
    const mat = kit.toon("#525B72", { emissive: "#000000" });
    const tok = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.36, 16), mat);
    tok.position.set(-0.2 + i * 0.4, 0.26, 0);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), mat);
    head.position.set(-0.2 + i * 0.4, 0.55, 0);
    tokens.add(tok, head);
    tokenMats.push(mat);
  }
  tokens.position.set(sx + 0.1, BENCH_Y, sz + 0.95);
  kit.ink(tokens);
  const tokenAnchor = new THREE.Object3D();
  tokenAnchor.position.set(0, 0.7, 0);
  tokens.add(tokenAnchor);

  kit.group.add(brain.group, chip.group, tokens, ...toChip.map((p) => p.group), ...toBrain.map((p) => p.group));

  const leftPose = { pos: [sx - 1.0, 2.55, sz + 4.6], look: [sx - 0.8, 1.85, sz], fov: 40 };
  const midPose = { pos: [sx + 0.1, 2.35, sz + 4.4], look: [sx + 0.1, 1.55, sz + 0.6], fov: 40 };
  const rightPose = { pos: [sx + 1.05, 2.40, sz + 4.6], look: [sx + 0.9, 1.55, sz + 0.2], fov: 40 };
  const camera = kit.camera(leftPose);

  const cond2 = kit.beat("cond2");
  const cond3 = kit.beat("cond3");
  const braingate = kit.beat("braingate");
  const cGlow = new THREE.Color("#2D884E");

  kit.card({ title: "ĐIỀU KIỆN 2", body: "Người và máy cùng thích nghi", at: cond2, hold: 3.6 });
  kit.card({ title: "ĐIỀU KIỆN 3", body: "1 đến 2 người mỗi nghiên cứu", at: cond3, hold: 3.4, anchor: tokenAnchor });
  kit.callout({ text: "BRAINGATE 2012", anchor: chip.anchors.body, at: braingate, hold: 2.6 });
  kit.label({ text: "THIẾT BỊ THÍ NGHIỆM", at: braingate + 0.3, hold: 2.3, y: 1180 });
  return {
    scene: world.scene,
    camera,
    hero: [brain.group, chip.group, tokens],
    update(t) {
      brain.update(t, { mode: "implanted", cutaway: 0.9, cortexLit: 0.85, feedback: 0.6 });
      chip.update(t, { mode: "lut_update" });
      const lanes = (list, a, b, offset, lift) => list.forEach((p, i) => {
        const u = ((t * 0.45 + i / 2 + offset) % 1 + 1) % 1;
        p.group.position.lerpVectors(a, b, u);
        p.group.position.y += lift * Math.sin(u * Math.PI);
        p.update(t, { pulse: 0.7 });
      });
      lanes(toChip, pBrain, pChip, 0, 0.15);
      lanes(toBrain, pChip, pBrain, 0.25, 0.55);

      const lit = kit.ease(kit.progress(t, cond3 + 0.2, 0.5), "out");
      tokenMats.forEach((m) => {
        m.color.set("#525B72").lerp(cGlow, lit);
        m.emissive.set("#000000").lerp(cGlow, 0.35 * lit);
      });

      if (t < cond3 - 1.0) {
        kit.drift(camera, t, { from: leftPose, to: { ...leftPose, pos: [sx - 0.7, 2.5, sz + 4.5] }, start: 0, dur: cond3 - 1.0 });
      } else if (t < braingate - 1.0) {
        kit.fly(camera, t, { from: { ...leftPose, pos: [sx - 0.7, 2.5, sz + 4.5] }, to: midPose, start: cond3 - 1.0, dur: 1.0, ease: "inOut" });
      } else {
        kit.fly(camera, t, { from: midPose, to: rightPose, start: braingate - 1.0, dur: 1.1, ease: "inOut" });
      }

    },
  };
}
