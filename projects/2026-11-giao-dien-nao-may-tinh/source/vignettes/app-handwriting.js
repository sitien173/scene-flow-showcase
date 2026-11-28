// app-handwriting.js — Scene 13 (sentences 34-37): an attempted pen stroke, two electrode arrays, a recurrent network turns spikes into text.
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { brainCutaway } from "./brain-cutaway/brain-cutaway.js";
import { controllerChip } from "./controller-chip/controller-chip.js";
import { screenCursor } from "./screen-cursor/screen-cursor.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[3];

  const brain = brainCutaway(kit, { mode: "implanted", arrayCount: 2 });
  brain.group.position.set(sx - 1.25, BENCH_Y, sz - 0.10);
  brain.group.scale.setScalar(0.78);
  brain.group.rotation.y = 0.3;

  const chip = controllerChip(kit, { mode: "dispatch_write" });
  chip.group.position.set(sx + 0.05, BENCH_Y, sz + 0.45);
  chip.group.scale.setScalar(0.72);

  const screen = screenCursor(kit, { screenMode: "handwritingText" });
  screen.group.position.set(sx + 1.15, BENCH_Y, sz - 0.35);
  screen.group.scale.setScalar(0.72);
  screen.group.rotation.y = -0.3;

  // The attempted pen stroke: a looping cursive trail drawn in the air in front of the head.
  const strokePts = [];
  for (let i = 0; i <= 40; i++) {
    const u = i / 40;
    strokePts.push(new THREE.Vector3(-0.55 + 1.1 * u + 0.12 * Math.sin(u * Math.PI * 6), 0.22 * Math.sin(u * Math.PI * 6 + 0.8) + 0.05 * u, 0));
  }
  const strokeGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(strokePts), 160, 0.035, 6, false);
  const stroke = new THREE.Mesh(strokeGeo, kit.toon("#00B4D8", { emissive: "#00B4D8" }));
  const strokeTotal = strokeGeo.index.count;
  stroke.position.set(sx - 1.25, BENCH_Y + 2.05, sz + 0.35);
  stroke.scale.setScalar(0.75);
  const strokeAnchor = new THREE.Object3D();
  stroke.add(strokeAnchor);

  const pBrain = new THREE.Vector3(sx - 0.95, BENCH_Y + 1.40, sz - 0.10);
  const pChip = new THREE.Vector3(sx + 0.05, BENCH_Y + 0.25, sz + 0.45);
  const pScr = new THREE.Vector3(sx + 1.0, BENCH_Y + 0.85, sz - 0.25);
  const neural = signalPulse(kit, { mode: "beam", length: pBrain.distanceTo(pChip), color: "#00B4D8" });
  aimBeam(neural, pBrain, pChip);
  const chars = signalPulse(kit, { mode: "beam", length: pChip.distanceTo(pScr), color: "#E879F9" });
  aimBeam(chars, pChip, pScr);

  const inPkt = dataPacket(kit, { color: "#F59E0B" });
  inPkt.group.scale.setScalar(0.6);
  const outPkt = dataPacket(kit, { color: "#E879F9" });
  outPkt.group.scale.setScalar(0.6);

  kit.group.add(brain.group, chip.group, screen.group, stroke, neural.group, chars.group, inPkt.group, outPkt.group);

  const strokePose = { pos: [sx - 1.05, 2.85, sz + 4.6], look: [sx - 1.2, 2.55, sz + 0.2], fov: 40 };
  const strokeIn = { pos: [sx - 1.15, 2.80, sz + 3.9], look: [sx - 1.25, 2.55, sz + 0.2], fov: 40 };
  const brainPose = { pos: [sx - 0.75, 2.75, sz + 4.3], look: [sx - 1.15, 2.05, sz - 0.1], fov: 40 };
  const widePose = { pos: [sx + 0.1, 2.85, sz + 7.6], look: [sx, 1.95, sz], fov: 40 };
  const camera = kit.camera(strokePose);

  const year2021 = kit.beat("year2021");
  const twoArrays = kit.beat("two_arrays");
  const rnn = kit.beat("rnn");
  const toBrain = twoArrays - 1.2;
  const toWide = rnn - 1.0;

  kit.card({ title: "NGHIÊN CỨU 2021", body: "Chấn thương tủy sống", at: year2021, hold: 3.4 });
  kit.callout({ text: "2 MẢNG ĐIỆN CỰC", anchor: brain.anchors.array1, at: twoArrays, hold: 2.6 });
  kit.callout({ text: "MẠNG HỒI QUY", anchor: chip.anchors.cmdCore, at: rnn, hold: 3.0 });
  return {
    scene: world.scene,
    camera,
    hero: [brain.group, chip.group, screen.group, stroke],
    update(t) {
      const draw = ((t / 3.2) % 1 + 1) % 1;
      strokeGeo.setDrawRange(0, Math.max(6, Math.floor(draw * strokeTotal / 6) * 6));
      brain.update(t, { mode: "implanted", arrayCount: 2, cutaway: 0.95, cortexLit: 0.9 });
      const decoding = kit.clamp01(kit.progress(t, toWide, 0.8));
      chip.update(t, { mode: "dispatch_write", sending: decoding > 0.1, cmdStrength: 0.4 + 0.6 * decoding });
      screen.update(t, { mode: "handwritingText", autocorrect: 0, showCompare: 0 });
      neural.update(t, { active: 0.5 + 0.5 * kit.clamp01(kit.progress(t, toBrain, 0.8)) });
      chars.update(t, { active: decoding });

      const u = ((t * 0.65) % 1 + 1) % 1;
      inPkt.group.position.lerpVectors(pBrain, pChip, u);
      inPkt.group.position.y += 0.15 * Math.sin(u * Math.PI);
      inPkt.update(t, { pulse: 0.7 });
      outPkt.group.visible = decoding > 0.1;
      outPkt.group.position.lerpVectors(pChip, pScr, u);
      outPkt.group.position.y += 0.15 * Math.sin(u * Math.PI);
      outPkt.update(t, { pulse: 0.9 });

      if (t < toBrain) {
        kit.drift(camera, t, { from: strokePose, to: strokeIn, start: 0, dur: toBrain });
      } else if (t < toWide) {
        kit.fly(camera, t, { from: strokeIn, to: brainPose, start: toBrain, dur: 1.1, ease: "inOut" });
      } else {
        kit.fly(camera, t, { from: brainPose, to: widePose, start: toWide, dur: 1.3, ease: "inOut" });
      }

    },
  };
}
