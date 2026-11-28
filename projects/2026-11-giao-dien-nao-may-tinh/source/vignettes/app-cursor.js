// app-cursor.js — Scene 10 (sentences 25-28): cursor command opens a mock email, switches on a TV, then drives a prosthetic hand.
import { bciLabWorld, BENCH_Y, STATIONS, aimBeam } from "./open.js";
import { screenCursor } from "./screen-cursor/screen-cursor.js";
import { robotArm } from "./robot-arm/robot-arm.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[0];

  const screen = screenCursor(kit, { screenMode: "cursorGrid" });
  screen.group.position.set(sx - 0.55, BENCH_Y, sz - 0.30);
  screen.group.scale.setScalar(0.80);
  screen.group.rotation.y = 0.12;

  // A small TV set beside the monitor; its panel lights green once the cursor switches it on.
  const tv = new THREE.Group();
  tv.position.set(sx + 0.62, BENCH_Y, sz - 0.55);
  const tvBody = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.50, 0.08), kit.toon("#2B2D38"));
  tvBody.position.set(0, 0.62, 0);
  const tvLeg = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.36, 0.06), kit.toon("#2B2D38"));
  tvLeg.position.set(0, 0.18, 0);
  const tvPanelMat = kit.toon("#3A3F52", { emissive: "#000000" });
  const tvPanel = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.40, 0.02), tvPanelMat);
  tvPanel.position.set(0, 0.62, 0.05);
  tv.add(tvBody, tvLeg, tvPanel);
  kit.ink(tv);
  const tvAnchor = new THREE.Object3D();
  tvAnchor.position.set(0, 0.62, 0.06);
  tv.add(tvAnchor);

  const arm = robotArm(kit, { mode: "prostheticHand" });
  arm.group.position.set(sx + 1.25, BENCH_Y, sz + 0.55);
  arm.group.scale.setScalar(0.74);
  arm.group.rotation.y = -0.45;

  const pSrc = new THREE.Vector3(sx - 1.85, BENCH_Y + 0.35, sz + 0.55);
  const pScr = new THREE.Vector3(sx - 0.55, BENCH_Y + 0.85, sz - 0.20);
  const pArm = new THREE.Vector3(sx + 1.15, BENCH_Y + 0.75, sz + 0.55);
  const cmdBeam = signalPulse(kit, { mode: "beam", length: pSrc.distanceTo(pScr), color: "#E879F9" });
  aimBeam(cmdBeam, pSrc, pScr);
  const nerveBeam = signalPulse(kit, { mode: "beam", length: pScr.distanceTo(pArm), color: "#00B4D8" });
  aimBeam(nerveBeam, pScr, pArm);

  const pkt = dataPacket(kit, { color: "#E879F9" });
  pkt.group.scale.setScalar(0.62);

  kit.group.add(screen.group, tv, arm.group, cmdBeam.group, nerveBeam.group, pkt.group);

  const screenPose = { pos: [sx - 0.25, 2.45, sz + 5.2], look: [sx - 0.15, 1.85, sz - 0.3], fov: 40 };
  const screenDrift = { pos: [sx + 0.05, 2.40, sz + 4.9], look: [sx - 0.05, 1.85, sz - 0.3], fov: 40 };
  const armPose = { pos: [sx + 1.55, 2.30, sz + 5.0], look: [sx + 1.05, 1.65, sz + 0.4], fov: 40 };
  const camera = kit.camera(screenPose);

  const cursorApp = kit.beat("cursor_app");
  const email = kit.beat("email");
  const hand = kit.beat("hand");
  const toArm = hand - 1.4;

  kit.card({ title: "ỨNG DỤNG 1", body: "Điều khiển con trỏ", at: cursorApp, hold: 3.0 });
  kit.callout({ text: "MỞ EMAIL · TI VI", anchor: tvAnchor, at: email, hold: 3.2 });
  kit.callout({ text: "BÀN TAY GIẢ", anchor: arm.anchors.hand, at: hand, hold: 1.3 });
  return {
    scene: world.scene,
    camera,
    hero: [screen.group, tv, arm.group],
    update(t) {
      const emailOn = t >= email - 0.4;
      const tvOn = kit.ease(kit.progress(t, email + 0.8, 0.5), "out");
      let cx = 0.44 * Math.sin(t * 1.9);
      let cy = 0.22 * Math.sin(t * 1.9 + 0.6);
      if (emailOn) {
        const k = kit.ease(kit.progress(t, email + 0.2, 0.6), "inOut");
        cx = kit.lerp(-0.34, 0.42, k);
        cy = kit.lerp(-0.18, 0.05, k);
      }
      const click = (t >= email - 0.1 && t < email + 0.15) || (t >= email + 0.8 && t < email + 1.05) ? 1 : 0;
      screen.update(t, { mode: emailOn ? "emailTv" : "cursorGrid", cursorX: cx, cursorY: cy, click, hit: emailOn ? tvOn : 0 });

      tvPanelMat.color.set(tvOn > 0.5 ? "#2D884E" : "#3A3F52");
      tvPanelMat.emissive.set("#000000").lerp(new THREE.Color("#2D884E"), 0.45 * tvOn);

      const handOn = kit.clamp01(kit.progress(t, hand - 0.6, 0.6));
      arm.update(t, { mode: "prostheticHand", handOpen: handOn > 0 ? 0.5 + 0.5 * Math.sin(t * 2.8) : 1 });
      cmdBeam.update(t, { active: 1 - 0.6 * handOn });
      nerveBeam.update(t, { active: handOn });

      const u = ((t * 0.6) % 1 + 1) % 1;
      if (handOn > 0.5) pkt.group.position.lerpVectors(pScr, pArm, u);
      else pkt.group.position.lerpVectors(pSrc, pScr, u);
      pkt.group.position.y += 0.15 * Math.sin(u * Math.PI);
      pkt.update(t, { pulse: 0.8 });

      if (t < toArm) {
        kit.drift(camera, t, { from: screenPose, to: screenDrift, start: 0, dur: toArm });
      } else {
        kit.fly(camera, t, { from: screenDrift, to: armPose, start: toArm, dur: 1.2, ease: "inOut" });
      }

    },
  };
}
