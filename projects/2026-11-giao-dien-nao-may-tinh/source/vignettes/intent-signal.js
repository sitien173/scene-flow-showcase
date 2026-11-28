// intent-signal.js — Scene 3 (sentences 6-7): Not reading single thoughts; decoding motor intent pattern in motor cortex.
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { brainCutaway } from "./brain-cutaway/brain-cutaway.js";
import { neuronCell } from "./neuron-cell/neuron-cell.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[2];

  const brain = brainCutaway(kit, { mode: "cortexLit" });
  brain.group.position.set(sx - 0.85, BENCH_Y, sz + 0.05);
  brain.group.scale.setScalar(0.82);
  brain.group.rotation.y = 0.35;

  const neuron = neuronCell(kit, { mode: "firing" });
  neuron.group.position.set(sx + 0.55, BENCH_Y + 0.15, sz - 0.05);
  neuron.group.scale.setScalar(0.56);

  // Small thought-cloud prop above-left of brain that gets crossed out at `thought` beat
  const thoughtProp = new THREE.Group();
  thoughtProp.position.set(sx - 1.05, BENCH_Y + 2.05, sz + 0.25);
  const cloudMat = kit.toon("#FAFCFB");
  const c1 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), cloudMat);
  const c2 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), cloudMat);
  c2.position.set(-0.16, -0.04, 0);
  const c3 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), cloudMat);
  c3.position.set(0.16, -0.03, 0);
  thoughtProp.add(c1, c2, c3);
  kit.ink(thoughtProp);

  const pFrom = new THREE.Vector3(sx - 0.55, BENCH_Y + 1.32, sz + 0.05);
  const pTo = new THREE.Vector3(sx + 0.15, BENCH_Y + 0.80, sz - 0.02);
  const beam = signalPulse(kit, { mode: "beam", length: pFrom.distanceTo(pTo), color: "#00B4D8" });
  aimBeam(beam, pFrom, pTo);

  const intentPkt = dataPacket(kit, { color: "#F59E0B" });
  intentPkt.group.position.set(sx + 1.45, BENCH_Y + 0.78, sz - 0.05);
  intentPkt.group.scale.setScalar(0.85);

  kit.group.add(brain.group, neuron.group, thoughtProp, beam.group, intentPkt.group);

  const startPose = { pos: [sx + 0.15, 2.75, sz + 8.6], look: [sx, 2.25, sz], fov: 40 };
  const endPose = { pos: [sx - 0.20, 2.55, sz + 5.9], look: [sx - 0.25, 2.20, sz], fov: 40 };
  const camera = kit.camera(startPose);

  const thought = kit.beat("thought");
  const intent = kit.beat("intent");
  const cortex = kit.beat("cortex");

  kit.card({ title: "KHÔNG ĐỌC Ý NGHĨ", body: "Tìm mẫu ý định cử động", at: thought, hold: 1.8, anchor: thoughtProp, y: 470, width: 580 });
  kit.mark({ kind: "x", anchor: thoughtProp, at: thought + 0.1, hold: 1.7 });
  kit.callout({ text: "Ý ĐỊNH CỬ ĐỘNG", anchor: intentPkt.anchors.center, at: intent, hold: 2.5 });
  kit.callout({ text: "VỎ NÃO VẬN ĐỘNG", anchor: brain.anchors.cortex, at: cortex - 0.5, hold: 2.0 });
  return {
    scene: world.scene,
    camera,
    hero: [brain.group, neuron.group, intentPkt.group],
    update(t) {
      const firing = kit.clamp01(0.35 + kit.progress(t, intent - 0.4, 0.8) * 0.65);
      brain.update(t, { mode: "cortexLit", cutaway: 1.0, cortexLit: firing });
      neuron.update(t, { mode: "firing", fireRate: firing });
      beam.update(t, { active: firing });
      intentPkt.group.position.y = BENCH_Y + 0.78 + 0.06 * Math.sin(t * 3.0);
      intentPkt.update(t, { pulse: firing });

      thoughtProp.visible = t < intent + 0.2;
      kit.fly(camera, t, { from: startPose, to: endPose, start: 0, dur: 8.2, ease: "drift" });

    },
  };
}
