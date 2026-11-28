// payoff-answer.js — Scene 16 (sentences 43-44): the cursor lands on its target (yes, in pilot trials); condition 1 is an implanted sensor, so surgery.
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { screenCursor } from "./screen-cursor/screen-cursor.js";
import { brainCutaway } from "./brain-cutaway/brain-cutaway.js";
import { dataPacket } from "./data-packet/data-packet.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[5];

  const screen = screenCursor(kit, { screenMode: "cursorGrid" });
  screen.group.position.set(sx + 0.75, BENCH_Y, sz - 0.20);
  screen.group.scale.setScalar(0.85);
  screen.group.rotation.y = -0.15;

  const brain = brainCutaway(kit, { mode: "implanted", arrayCount: 1 });
  brain.group.position.set(sx - 1.10, BENCH_Y, sz - 0.10);
  brain.group.scale.setScalar(0.85);
  brain.group.rotation.y = 0.3;

  const pBrain = new THREE.Vector3(sx - 0.85, BENCH_Y + 1.45, sz - 0.05);
  const pScr = new THREE.Vector3(sx + 0.55, BENCH_Y + 1.0, sz - 0.1);
  const beam = signalPulse(kit, { mode: "beam", length: pBrain.distanceTo(pScr), color: "#E879F9" });
  aimBeam(beam, pBrain, pScr);
  const pkt = dataPacket(kit, { color: "#E879F9" });
  pkt.group.scale.setScalar(0.55);

  kit.group.add(screen.group, brain.group, beam.group, pkt.group);

  const screenStart = { pos: [sx + 0.80, 2.45, sz + 5.0], look: [sx + 0.75, 1.95, sz - 0.2], fov: 40 };
  const screenIn = { pos: [sx + 0.80, 2.30, sz + 3.6], look: [sx + 0.75, 1.95, sz - 0.2], fov: 40 };
  const brainPose = { pos: [sx - 0.70, 2.85, sz + 3.9], look: [sx - 1.05, 2.15, sz - 0.1], fov: 40 };
  const camera = kit.camera(screenStart);

  const yes = kit.beat("yes");
  const surgery = kit.beat("surgery");
  const toBrain = surgery - 1.7;

  kit.bigText({ text: "CÓ (THÍ ĐIỂM)", at: yes, hold: 2.6, y: 560 });
  kit.mark({ kind: "check", anchor: screen.anchors.target, at: yes + 0.15, hold: 2.4 });
  kit.card({ title: "ĐIỀU KIỆN 1", body: "Cấy vào não · Cần phẫu thuật", at: surgery - 1.3, hold: 2.4 });
  return {
    scene: world.scene,
    camera,
    hero: [screen.group, brain.group],
    update(t) {
      const land = kit.ease(kit.progress(t, 0, Math.max(0.4, yes)), "inOut");
      const hit = t >= yes ? 1 : 0;
      screen.update(t, { mode: "cursorGrid", cursorX: kit.lerp(-0.40, 0.46, land), cursorY: kit.lerp(-0.20, 0.24, land), click: t >= yes && t < yes + 0.25 ? 1 : 0, hit });
      const reveal = kit.ease(kit.progress(t, toBrain, 1.2), "inOut");
      brain.update(t, { mode: "implanted", cutaway: kit.lerp(0.35, 1.0, reveal), cortexLit: 0.9, implanted: 1, feedback: hit * 0.6 });
      beam.update(t, { active: 1 - 0.5 * hit });
      const u = ((t * 0.9) % 1 + 1) % 1;
      pkt.group.position.lerpVectors(pBrain, pScr, u);
      pkt.group.position.y += 0.12 * Math.sin(u * Math.PI);
      pkt.update(t, { pulse: 0.8 });

      if (t < toBrain) {
        kit.push(camera, t, { pos: screenStart.pos, look: screenStart.look, amount: 1.4, start: 0, dur: Math.max(0.5, yes + 0.6), ease: "stop" });
      } else {
        kit.fly(camera, t, { from: screenIn, to: brainPose, start: toBrain, dur: 1.3, ease: "inOut" });
      }

    },
  };
}
