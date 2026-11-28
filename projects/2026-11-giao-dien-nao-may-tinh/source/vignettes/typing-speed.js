// typing-speed.js — Scene 14 (sentences 38-40): 90 characters per minute (~94% raw), >99% after offline autocorrect, 115 on a phone.
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { screenCursor } from "./screen-cursor/screen-cursor.js";
import { dataPacket } from "./data-packet/data-packet.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

const [SX, , SZ] = STATIONS[4];
// The monitor sits here in this vignette and in no-motion-surprise, which starts from END_POSE under a light change.
export const SCREEN_AT = [SX + 0.45, BENCH_Y, SZ - 0.25];
export const END_POSE = { pos: [SX + 0.95, 2.35, SZ + 4.3], look: [SX + 0.65, 1.80, SZ - 0.2], fov: 40 };

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const sx = SX, sz = SZ;

  const screen = screenCursor(kit, { screenMode: "handwritingText" });
  screen.group.position.set(...SCREEN_AT);
  screen.group.scale.setScalar(1.0);
  screen.group.rotation.y = -0.08;

  const pSrc = new THREE.Vector3(sx - 1.9, BENCH_Y + 0.35, sz + 0.4);
  const pScr = new THREE.Vector3(sx + 0.25, BENCH_Y + 1.05, sz - 0.15);
  const flow = signalPulse(kit, { mode: "beam", length: pSrc.distanceTo(pScr), color: "#E879F9" });
  aimBeam(flow, pSrc, pScr);
  const pkts = [0, 1, 2].map(() => {
    const p = dataPacket(kit, { color: "#E879F9" });
    p.group.scale.setScalar(0.5);
    return p;
  });

  kit.group.add(screen.group, flow.group, ...pkts.map((p) => p.group));

  const startPose = { pos: [sx + 0.35, 2.45, sz + 4.9], look: [sx + 0.40, 1.90, sz - 0.2], fov: 40 };
  const pushPose = { pos: [sx + 0.40, 2.30, sz + 3.9], look: [sx + 0.45, 1.85, sz - 0.2], fov: 40 };
  const camera = kit.camera(startPose);

  const cpm90 = kit.beat("cpm90");
  const acc99 = kit.beat("acc99");
  const phone115 = kit.beat("phone115");
  const toRight = phone115 - 1.0;

  kit.bigText({ text: "90 KÝ TỰ/PHÚT", at: cpm90, hold: 3.0, y: 560 });
  kit.label({ text: "~94% KHI CHƯA SỬA LỖI", at: cpm90 + 0.5, hold: 2.5, y: 1180, size: 52 });
  kit.callout({ text: "TỰ SỬA LỖI >99%", anchor: screen.anchors.textLine, at: acc99, hold: 3.0 });
  kit.mark({ kind: "check", anchor: screen.anchors.textLine, at: acc99 + 0.3, hold: 2.4 });
  kit.label({ text: "PHÂN TÍCH LẠI SAU ĐÓ", at: acc99 + 0.4, hold: 2.6, y: 1180, size: 52 });
  kit.card({ title: "CÙNG ĐỘ TUỔI", body: "Gõ điện thoại: 115 ký tự/phút", at: phone115 - 0.4, hold: 3.0 });
  return {
    scene: world.scene,
    camera,
    hero: [screen.group],
    update(t) {
      const auto = kit.ease(kit.progress(t, acc99 - 0.2, 0.6), "out");
      const cmp = kit.ease(kit.progress(t, phone115 - 0.3, 0.5), "out");
      screen.update(t, { mode: "handwritingText", autocorrect: auto, showCompare: cmp, hit: auto > 0.5 ? 1 : 0 });
      flow.update(t, { active: 1 });
      pkts.forEach((p, i) => {
        const u = ((t * 0.5 + i / 3) % 1 + 1) % 1;
        p.group.position.lerpVectors(pSrc, pScr, u);
        p.group.position.y += 0.12 * Math.sin(u * Math.PI);
        p.update(t, { pulse: 0.8 });
      });

      if (t < toRight) {
        kit.drift(camera, t, { from: startPose, to: pushPose, start: 0, dur: toRight });
      } else {
        kit.fly(camera, t, { from: pushPose, to: END_POSE, start: toRight, dur: 1.4, ease: "inOut" });
      }

    },
  };
}
