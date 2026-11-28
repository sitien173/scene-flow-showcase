// c1 / hook_dot: Opening crane onto daytime street smartphone showing GPS blue dot,
// then cranes up to sky satellites and traces #00B4D8 signal stream downward.
// Exports streetWorld(kit) shared by street vignettes.
import { smartphone } from "./smartphone/smartphone.js";
import { gpsSatellite } from "./gps-satellite/gps-satellite.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export function streetWorld(kit) {
  const { THREE, PALETTE } = kit;
  const scene = kit.stage({ yard: 10, clear: 7, seed: 11 });

  const phone = smartphone(kit, { screenMode: "gps" });
  phone.group.position.set(0, 1.35, 0);
  phone.group.rotation.set(0.95, 0, 0);
  scene.add(phone.group);

  // Two high-rise flanking towers for urban_canyon (built directly with kit.toon + kit.ink)
  const canyonGroup = new THREE.Group();
  canyonGroup.name = "urban-canyon-towers";
  canyonGroup.visible = false;
  scene.add(canyonGroup);

  const buildTower = (x, h, wallColor) => {
    const g = new THREE.Group();
    const w = 1.9, d = 2.8;
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), kit.toon(wallColor, { map: kit.paperTexture(2) }));
    body.position.set(x, h / 2, -0.35);
    g.add(body);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.18, 0.22, d + 0.18), kit.toon("#ECE5C8"));
    roof.position.set(x, h + 0.11, -0.35);
    g.add(roof);

    const glassMat = kit.windowMaterial(PALETTE.glass, PALETTE.window);
    const sideSign = x < 0 ? 1 : -1;
    const faceX = x + sideSign * (w / 2 + 0.02);
    const floors = Math.floor((h - 0.8) / 0.85);
    for (let fl = 0; fl < floors; fl++) {
      for (let col = -1; col <= 1; col++) {
        const pane = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.45), glassMat);
        pane.rotation.y = sideSign > 0 ? Math.PI / 2 : -Math.PI / 2;
        pane.position.set(faceX, 0.85 + fl * 0.85, -0.35 + col * 0.78);
        pane.userData.noInk = true;
        g.add(pane);
      }
    }
    kit.ink(g);
    canyonGroup.add(g);
    return g;
  };

  buildTower(-2.15, 6.2, PALETTE.wall);
  buildTower(2.15, 6.6, "#E8C8A8");

  function set(t, {
    phonePos = [0, 1.35, 0],
    phoneRot = [0.95, 0, 0],
    phoneScale = 1,
    phoneVisible = true,
    cutaway = 0,
    coilGlow = 0,
    cardPulse = 0,
    fix = 0,
    haloRadius = 0.35,
    dotPulse = 1,
    route = 0,
    offline = 0,
    canyon = 0,
  } = {}) {
    phone.group.visible = phoneVisible;
    phone.group.position.set(...phonePos);
    phone.group.rotation.set(...phoneRot);
    phone.group.scale.setScalar(phoneScale);
    phone.update(t, { cutaway, coilGlow, cardPulse, fix, haloRadius, dotPulse, route, offline });
    canyonGroup.visible = canyon > 0.01;
  }

  return { scene, phone, canyonGroup, set };
}

export async function build(kit) {
  const world = await kit.world("street", streetWorld);
  const { THREE } = kit;

  const pPhone = { pos: [0.0, 1.72, 2.25], look: [0.0, 1.35, 0.0], fov: 36 };
  const pSky = { pos: [0.0, 1.85, 2.9], look: [0.0, 5.2, -4.5], fov: 38 };
  const pTrace = { pos: [0.15, 2.15, 3.65], look: [0.0, 3.9, -2.8], fov: 40 };
  const camera = kit.camera(pPhone);

  const question = kit.beat("question");
  const lookUp = kit.beat("look_up");
  const trace = kit.beat("trace");

  const skyGroup = new THREE.Group();
  kit.group.add(skyGroup);

  const satSpecs = [
    [-1.45, 5.15, -4.4, 0.56],
    [0.0, 5.45, -4.7, 0.62],
    [1.45, 5.1, -4.3, 0.56],
  ];
  const skySats = satSpecs.map(([x, y, z, s]) => {
    const sat = gpsSatellite(kit, {});
    sat.group.position.set(x, y, z);
    sat.group.scale.setScalar(s);
    sat.group.rotation.set(0.28, 0.25, 0);
    skyGroup.add(sat.group);
    return sat;
  });

  const beam = signalPulse(kit, { mode: "beam", length: 5.8, color: "#00B4D8" });
  beam.group.position.set(0.0, 5.15, -4.7);
  beam.group.lookAt(0, 1.45, 0);
  kit.group.add(beam.group);

  kit.callout({
    text: "TỰ TÍNH?",
    anchor: world.phone.anchors.blueDot,
    at: question,
    hold: lookUp - question - 0.35,
  });
  kit.label({
    text: "LẦN THEO TÍN HIỆU",
    at: trace,
    hold: 3.5,
    y: 510,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.phone.group, skyGroup],
    update(t) {
      world.set(t, {
        phonePos: [0, 1.35, 0],
        phoneRot: [0.95, 0, 0],
        dotPulse: 1,
        haloRadius: 0.32,
        canyon: 0,
      });
      skyGroup.visible = t >= lookUp - 0.5;
      skySats.forEach((sat, idx) => {
        kit.popIn(sat.group, t, lookUp - 0.5 + idx * 0.08, { dur: 0.35 });
        sat.update(t, { hover: 1, txGlow: t >= trace ? 1 : 0.4, wingAngle: 0.25 + idx * 0.05 });
      });

      const traceProg = kit.ease(kit.progress(t, trace, 1.2), "out");
      beam.update(t, { active: t >= trace ? 1 : 0, progress: traceProg, showTimeCode: 0.6 });

      if (t < lookUp) {
        kit.setPose(camera, pPhone);
      } else if (t < trace) {
        kit.fly(camera, t, { from: pPhone, to: pSky, start: lookUp, dur: 1.8, ease: "inOut" });
      } else {
        kit.fly(camera, t, { from: pSky, to: pTrace, start: trace, dur: 2.2, ease: "drift" });
      }
    },
  };
}
