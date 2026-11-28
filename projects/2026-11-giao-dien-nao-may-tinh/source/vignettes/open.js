// open.js — Scene 1 (sentences 1-2): Opening crane onto lab station 0, neural signal to cursor, skull cutaway opens.
import { brainCutaway } from "./brain-cutaway/brain-cutaway.js";
import { screenCursor } from "./screen-cursor/screen-cursor.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { dataPacket } from "./data-packet/data-packet.js";

export const BENCH_Y = 0.90;

export const STATIONS = [
  [0, 0, 0],
  [8, 0, 0],
  [-8, 0, 0],
  [0, 0, -8],
  [8, 0, -8],
  [-8, 0, -8],
  [0, 0, 8],
  [8, 0, 8],
  [-8, 0, 8],
];

export function aimBeam(beam, fromVec, toVec) {
  beam.group.position.copy(fromVec);
  beam.group.lookAt(toVec);
}

export function bciLabWorld(kit) {
  const { THREE, PALETTE } = kit;
  const scene = kit.stage({ yard: 18, clear: 8, seed: 7 });
  const topTex = kit.paperTexture(2);
  const topMat = kit.toon(PALETTE.card || "#E6E6E1", { map: topTex });
  const trimMat = kit.toon("#4868C8");
  const legMat = kit.toon("#2B2D38");

  const benches = new THREE.Group();
  benches.name = "bci-lab-benches";
  for (const [sx, , sz] of STATIONS) {
    const b = new THREE.Group();
    b.position.set(sx, 0, sz);

    const top = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.14, 2.6), topMat);
    top.position.set(0, BENCH_Y - 0.07, 0);
    b.add(top);

    const trim = new THREE.Mesh(new THREE.BoxGeometry(4.64, 0.06, 2.64), trimMat);
    trim.position.set(0, BENCH_Y - 0.16, 0);
    b.add(trim);

    for (const lx of [-1.95, 1.95]) {
      for (const lz of [-1.0, 1.0]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, BENCH_Y - 0.18, 0.16), legMat);
        leg.position.set(lx, (BENCH_Y - 0.18) / 2, lz);
        b.add(leg);
      }
    }
    benches.add(b);
  }
  kit.ink(benches);
  scene.add(benches);
  return { scene, benches };
}

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[0];

  const brain = brainCutaway(kit, { mode: "idle" });
  brain.group.position.set(sx - 0.85, BENCH_Y, sz + 0.10);
  brain.group.scale.setScalar(0.88);
  brain.group.rotation.y = 0.28;

  const screen = screenCursor(kit, { screenMode: "cursorGrid" });
  screen.group.position.set(sx + 0.82, BENCH_Y, sz - 0.12);
  screen.group.scale.setScalar(0.84);
  screen.group.rotation.y = -0.22;

  const fromV = new THREE.Vector3(sx - 0.45, BENCH_Y + 1.35, sz + 0.10);
  const toV = new THREE.Vector3(sx + 0.65, BENCH_Y + 1.05, sz - 0.05);
  const beam = signalPulse(kit, { mode: "beam", length: fromV.distanceTo(toV), color: "#00B4D8" });
  aimBeam(beam, fromV, toV);

  const cmdPkt = dataPacket(kit, { color: "#E879F9" });
  cmdPkt.group.scale.setScalar(0.75);

  kit.group.add(brain.group, screen.group, beam.group, cmdPkt.group);

  const widePose = { pos: [sx + 0.25, 2.75, sz + 8.9], look: [sx, 2.25, sz], fov: 40 };
  const closePose = { pos: [sx - 0.55, 2.65, sz + 5.6], look: [sx - 0.55, 2.20, sz + 0.05], fov: 40 };
  const endPose = { pos: [sx - 0.35, 2.55, sz + 5.1], look: [sx - 0.55, 2.20, sz + 0.05], fov: 40 };
  const camera = kit.camera(widePose);

  const cursorBeat = kit.beat("cursor");
  const brainBeat = kit.beat("brain");

  kit.callout({ text: "CON TRỎ CHUỘT", anchor: screen.anchors.cursor, at: cursorBeat, hold: 2.2 });
  kit.callout({ text: "BÊN TRONG NÃO", anchor: brain.anchors.cortex, at: brainBeat, hold: 1.7 });
  return {
    scene: world.scene,
    camera,
    hero: [brain.group, screen.group],
    update(t) {
      const cutOpen = kit.lerp(0.15, 1.0, kit.ease(kit.progress(t, 3.2, 2.6), "inOut"));
      const lit = kit.lerp(0.35, 0.95, kit.ease(kit.progress(t, 0.6, 3.0), "out"));
      brain.update(t, { cutaway: cutOpen, cortexLit: lit });

      const clickPulse = t >= cursorBeat && t < cursorBeat + 0.8 ? 1 : 0;
      const cx = 0.44 * Math.sin(t * 2.1);
      const cy = 0.22 * Math.cos(t * 1.7);
      screen.update(t, { mode: "cursorGrid", cursorX: cx, cursorY: cy, click: clickPulse, hit: clickPulse });

      beam.update(t, { active: 1, progress: kit.clamp01(0.3 + t * 0.6) });
      const pktU = ((t * 0.55) % 1 + 1) % 1;
      cmdPkt.group.position.lerpVectors(fromV, toV, pktU);
      cmdPkt.group.position.y += 0.16 * Math.sin(pktU * Math.PI);
      cmdPkt.update(t, { pulse: 0.7 });

      if (t < 3.4) {
        kit.drift(camera, t, { from: widePose, to: { ...widePose, pos: [sx + 0.05, 2.68, sz + 8.3] }, start: 0, dur: 3.4 });
      } else if (t < 5.8) {
        const p0 = { ...widePose, pos: [sx + 0.05, 2.68, sz + 8.3] };
        kit.fly(camera, t, { from: p0, to: closePose, start: 3.4, dur: 2.4, ease: "inOut" });
      } else {
        kit.drift(camera, t, { from: closePose, to: endPose, start: 5.8, dur: 2.15 });
      }

    },
  };
}
