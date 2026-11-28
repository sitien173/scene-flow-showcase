// spike-filter.js — Scene 6 (sentences 13-15): Step 2 — filter action potentials along neuron axon & bin 20/100 ms counts into #F59E0B packets.
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { neuronCell } from "./neuron-cell/neuron-cell.js";
import { controllerChip } from "./controller-chip/controller-chip.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[5];

  const neuron = neuronCell(kit, { mode: "binned" });
  neuron.group.position.set(sx - 0.82, BENCH_Y + 0.15, sz);
  neuron.group.scale.setScalar(0.58);

  const chip = controllerChip(kit, { mode: "lut_read" });
  chip.group.position.set(sx + 0.92, BENCH_Y, sz + 0.05);
  chip.group.scale.setScalar(0.76);
  chip.group.rotation.y = -0.22;

  const pFrom = new THREE.Vector3(sx + 0.35, BENCH_Y + 0.78, sz);
  const pTo = new THREE.Vector3(sx + 0.70, BENCH_Y + 0.35, sz + 0.05);
  const beam = signalPulse(kit, { mode: "beam", length: pFrom.distanceTo(pTo), color: "#00B4D8" });
  aimBeam(beam, pFrom, pTo);

  const pkts = [0, 1, 2].map(i => {
    const p = dataPacket(kit, { color: "#F59E0B" });
    p.group.scale.setScalar(0.68);
    p.group.position.set(sx + 0.75 + i * 0.32, BENCH_Y + 0.75, sz + 0.12);
    return p;
  });

  kit.group.add(neuron.group, chip.group, beam.group, ...pkts.map(p => p.group));

  const poseAxon = { pos: [sx - 0.85, 2.65, sz + 5.8], look: [sx - 0.55, 2.05, sz], fov: 40 };
  const poseMid = { pos: [sx + 0.05, 2.75, sz + 7.4], look: [sx + 0.10, 2.15, sz], fov: 40 };
  const poseChip = { pos: [sx + 0.72, 2.75, sz + 5.8], look: [sx + 0.65, 1.95, sz + 0.05], fov: 40 };
  const camera = kit.camera(poseAxon);

  const step2 = kit.beat("step2");
  const win = kit.beat("window");
  const decoderIn = kit.beat("decoder_in");

  kit.callout({ text: "BƯỚC 2: LỌC", anchor: neuron.anchors.axonMid, at: step2 + 0.3, hold: 3.4 });
  kit.card({ title: "ĐẾM XUNG MỖI KÊNH", body: "Ô 20 ms hoặc 100 ms", at: win, hold: 2.6, anchor: neuron.anchors.binGate, y: 470, width: 580 });
  kit.callout({ text: "DÃY SỐ ĐẦU VÀO", anchor: pkts[1].anchors.center, at: decoderIn, hold: 2.2 });
  return {
    scene: world.scene,
    camera,
    hero: [neuron.group, chip.group, ...pkts.map(p => p.group)],
    update(t) {
      const binned = t >= win - 1.2;
      neuron.update(t, { mode: binned ? "binned" : "firing", binned, fireRate: 1.0 });
      chip.update(t, { mode: t >= decoderIn - 0.6 ? "lut_read" : "lut_update", sending: t >= decoderIn });
      beam.update(t, { active: 1 });

      pkts.forEach((p, i) => {
        const showP = kit.progress(t, win - 0.4 + i * 0.25, 0.4);
        p.group.visible = showP > 0;
        p.group.position.y = BENCH_Y + 0.74 + 0.06 * Math.sin(t * 4.0 + i);
        p.group.scale.setScalar(0.68 * Math.max(0.01, kit.ease(showP, "out")));
        p.update(t, { pulse: 0.7 });
      });

      if (t < win) {
        kit.fly(camera, t, { from: poseAxon, to: poseMid, start: 0.4, dur: win - 0.4, ease: "inOut" });
      } else {
        kit.fly(camera, t, { from: poseMid, to: poseChip, start: win, dur: 4.5, ease: "drift" });
      }

    },
  };
}
