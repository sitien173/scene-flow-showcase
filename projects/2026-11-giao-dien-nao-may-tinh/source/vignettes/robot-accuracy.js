// robot-accuracy.js — Scene 12 (sentences 32-33): the arm touches targets (green hit, red miss); about 49% to 96%, slower than a natural hand.
import { bciLabWorld, BENCH_Y, STATIONS } from "./open.js";
import { robotArm } from "./robot-arm/robot-arm.js";
import { screenCursor } from "./screen-cursor/screen-cursor.js";
import { dataPacket } from "./data-packet/data-packet.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("bci-lab", bciLabWorld);
  const [sx, , sz] = STATIONS[2];

  const arm = robotArm(kit, { mode: "reach3d" });
  arm.group.position.set(sx - 0.70, BENCH_Y, sz + 0.10);
  arm.group.scale.setScalar(0.82);
  arm.group.rotation.y = 0.2;

  const screen = screenCursor(kit, { screenMode: "cursorGrid" });
  screen.group.position.set(sx + 1.05, BENCH_Y, sz - 0.40);
  screen.group.scale.setScalar(0.70);
  screen.group.rotation.y = -0.3;

  // Four target discs on the bench; each lights green on a hit or red on a miss, in a fixed order.
  const pattern = [1, 1, 0, 1, 1, 0, 1, 1];
  const targets = [];
  for (let i = 0; i < 4; i++) {
    const mat = kit.toon("#F59E0B", { emissive: "#000000" });
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.04, 20), mat);
    disc.position.set(sx - 1.55 + i * 0.42, BENCH_Y + 0.02, sz + 0.85);
    targets.push({ disc, mat });
  }
  const targetGroup = new THREE.Group();
  targets.forEach((tg) => targetGroup.add(tg.disc));
  kit.ink(targetGroup);

  const cmd = dataPacket(kit, { color: "#E879F9" });
  cmd.group.scale.setScalar(0.6);

  kit.group.add(arm.group, screen.group, targetGroup, cmd.group);

  const startPose = { pos: [sx - 0.85, 2.35, sz + 5.4], look: [sx - 0.75, 1.55, sz + 0.3], fov: 40 };
  const endPose = { pos: [sx + 0.55, 2.40, sz + 5.6], look: [sx + 0.35, 1.65, sz + 0.1], fov: 40 };
  const camera = kit.camera(startPose);

  const rate = kit.beat("rate");
  const slower = kit.beat("slower");
  const STEP = 1.1;
  const cGood = new THREE.Color("#2D884E");
  const cBad = new THREE.Color("#DD3428");
  const cIdle = new THREE.Color("#F59E0B");

  kit.card({ title: "CHẠM MỤC TIÊU", body: "Khoảng 49% đến 96%", at: rate, hold: 3.2 });
  kit.callout({ text: "KÉM TAY THẬT", anchor: arm.anchors.gripper, at: slower, hold: 2.4 });
  kit.mark({ kind: "x", anchor: arm.anchors.gripper, at: slower + 0.3, hold: 2.0 });
  return {
    scene: world.scene,
    camera,
    hero: [arm.group, screen.group],
    update(t) {
      const k = Math.floor(t / STEP);
      const within = t / STEP - k;
      const ti = ((k % 4) + 4) % 4;
      const good = pattern[((k % pattern.length) + pattern.length) % pattern.length] === 1;
      const reach = Math.sin(within * Math.PI);
      arm.update(t, {
        mode: "reach3d",
        baseYaw: 0.75 - ti * 0.42,
        shoulderPitch: -0.35 - 0.30 * reach,
        elbowPitch: -0.70 + 0.25 * reach,
        wristPitch: -0.40,
        targetHit: good && within > 0.45 ? 1 : 0,
      });
      targets.forEach((tg, i) => {
        tg.mat.color.copy(cIdle);
        tg.mat.emissive.set("#000000");
        if (i === ti && within > 0.45) {
          tg.mat.color.copy(good ? cGood : cBad);
          tg.mat.emissive.copy(good ? cGood : cBad).multiplyScalar(0.4);
        }
      });
      screen.update(t, { mode: "cursorGrid", hit: good && within > 0.45 ? 1 : 0, miss: !good && within > 0.45 ? 1 : 0 });

      const u = ((t * 0.8) % 1 + 1) % 1;
      cmd.group.position.set(sx + 0.85 - 1.4 * u, BENCH_Y + 0.6 + 0.15 * Math.sin(u * Math.PI), sz - 0.1);
      cmd.update(t, { pulse: 0.7 });

      kit.drift(camera, t, { from: startPose, to: endPose, start: 0, dur: 8.8 });

    },
  };
}
