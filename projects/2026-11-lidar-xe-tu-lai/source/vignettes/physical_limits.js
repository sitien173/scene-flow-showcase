// Scene 16: physical_limits — weather scatter (#00B4D8 blocked), 1/r^2 echo decay (#F08A4B), eye-safety cap, interference (#DD3428).
import { streetWorld } from "./hook_night.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";
import { distanceSphere } from "./distance-sphere/distance-sphere.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("street", streetWorld);
  const startPose = { pos: [4.2, 2.25, 1.2], look: [0, 1.25, -1.6], fov: 40 };
  const camera = kit.camera(startPose);

  const weather = kit.beat("weather");
  const inverse = kit.beat("inverse");
  const eye = kit.beat("eye");
  const interfere = kit.beat("interfere");

  // Deterministic rain/fog scatter droplets
  const drops = new THREE.Group();
  const dropGeo = new THREE.BoxGeometry(0.04, 0.22, 0.04);
  const dropMat = kit.toon("#A5A6AA");
  const next = kit.rand(707);
  const dropData = [];
  for (let i = 0; i < 42; i++) {
    const m = new THREE.Mesh(dropGeo, dropMat);
    const x = (next() - 0.5) * 3.8;
    const z = -1.2 + next() * 3.8;
    const y0 = next() * 3.2;
    m.position.set(x, y0, z);
    drops.add(m);
    dropData.push({ m, x, y0, z, spd: 2.2 + next() * 1.2 });
  }
  kit.ink(drops);
  kit.group.add(drops);

  // Outgoing pulse blocked by fog/rain
  const pulseBlocked = signalPulse(kit, { mode: "beam", length: 4.5, color: "#00B4D8" });
  pulseBlocked.group.position.set(0, 1.82, -2.55);
  kit.group.add(pulseBlocked.group);

  // Returning echo inverse-square sphere (#F08A4B)
  const echoSphere = distanceSphere(kit, { radius: 2.4, color: "#F08A4B", errorColor: "#DD3428" });
  echoSphere.group.position.set(0, 1.4, -2.6);
  kit.group.add(echoSphere.group);

  // Interfering LiDAR / sun glare beam (#DD3428) coming from ahead
  const glarePulse = signalPulse(kit, { mode: "beam", length: 4.8, color: "#DD3428" });
  glarePulse.group.position.set(0.15, 1.82, 2.4);
  glarePulse.group.lookAt(0, 1.82, -2.55);
  kit.group.add(glarePulse.group);

  kit.callout({ text: "MƯA · SƯƠNG · BỤI", anchor: pulseBlocked.anchors.mid, at: weather, hold: inverse - weather - 0.6 });
  kit.label({ text: "SUY GIẢM 1/R²", at: inverse, hold: eye - inverse - 0.4, y: 520, size: 68 });
  kit.mark({ kind: "x", anchor: world.lidar.anchors.lens, at: eye, hold: 3.4 });
  kit.card({ title: "AN TOÀN MẮT · NHIỄU SÁNG", body: "GIỚI HẠN CÔNG SUẤT", at: eye, hold: 5.2, y: 450, width: 700 });

  return {
    scene: world.scene,
    camera,
    hero: [world.car.group, world.lidar.group],
    update(t) {
      const inWeather = t < inverse - 0.5;
      const inInverse = t >= inverse - 0.5 && t < eye - 0.5;
      const inInterfere = t >= interfere - 2.2;

      world.set(t, {
        carPos: [0, 0, -2.8],
        spin: 0.45,
        emit: 0.9,
        pedVisible: false,
      });

      drops.visible = inWeather;
      if (drops.visible) {
        for (const d of dropData) {
          d.m.position.y = 0.2 + ((d.y0 - t * d.spd) % 3.0 + 3.0) % 3.0;
        }
      }

      pulseBlocked.update(t, {
        active: inWeather ? 1 : 0.4,
        progress: 1,
        blocked: inWeather ? 1 : 0,
        blockAt: 0.55,
      });

      const invProg = kit.progress(t, inverse - 0.5, 4.2);
      echoSphere.update(t, {
        opacity: inInverse ? Math.max(0.15, 1 - invProg * 0.75) : 0,
        radiusScale: 0.45 + invProg * 0.85,
        spin: 0.35,
      });

      glarePulse.update(t, { active: inInterfere ? 1 : 0, progress: 1, speedFactor: 1.4 });

      kit.orbit(camera, t, { center: [0, 1.25, -2.4], radius: 5.4, height: 1.3, angle: 0.75, speed: 0.08, fov: 40 });
    },
  };
}
