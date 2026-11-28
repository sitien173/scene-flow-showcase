// c1a: Hook vignette + shared deskWorld for EP05 (Sạc không dây).
// Every vignette in EP05 calls world.set(t, state) first so shared props depend only on t.
import { chargingPadCutaway } from "./charging-pad-cutaway/charging-pad-cutaway.js";
import { smartphone } from "./smartphone/smartphone.js";
import { copperCoil } from "./copper-coil/copper-coil.js";
import { fieldLines } from "./field-lines/field-lines.js";
import { batteryCell } from "./battery-cell/battery-cell.js";

export const DESK_Y = 0.85;

function makeMeter(kit, THREE, { brass = false } = {}) {
  const meter = new THREE.Group();
  const caseCol = brass ? "#5E432C" : "#343746";
  const rimCol = brass ? "#C89B48" : "#4A4E62";
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.34, 0.22), kit.toon(caseCol));
  body.position.set(0, 0.17, 0);
  meter.add(body);

  const bezel = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.145, 0.03, 18), kit.toon(rimCol));
  bezel.rotation.x = Math.PI / 2;
  bezel.position.set(0, 0.2, 0.11);
  meter.add(bezel);

  const dialTex = kit.canvasTexture(192, 192, (g, w, h) => {
    g.fillStyle = "#FAFCFB";
    g.fillRect(0, 0, w, h);
    g.strokeStyle = "#1C1C20";
    g.lineWidth = 4;
    g.beginPath();
    g.arc(w / 2, h * 0.72, 66, Math.PI * 1.18, Math.PI * 1.82);
    g.stroke();
    for (let i = -3; i <= 3; i++) {
      const a = -Math.PI / 2 + i * 0.28;
      const r1 = i === 0 ? 52 : 58;
      g.beginPath();
      g.moveTo(w / 2 + Math.cos(a) * r1, h * 0.72 + Math.sin(a) * r1);
      g.lineTo(w / 2 + Math.cos(a) * 68, h * 0.72 + Math.sin(a) * 68);
      g.stroke();
    }
    g.fillStyle = "#18191E";
    g.font = "bold 24px sans-serif";
    g.textAlign = "center";
    g.fillText("0", w / 2, 34);
    g.fillStyle = "#2D7FF9";
    g.fillText("-", 38, 66);
    g.fillStyle = "#DD3428";
    g.fillText("+", w - 38, 66);
  });
  const face = new THREE.Mesh(new THREE.CircleGeometry(0.125, 20), kit.toon("#FFFFFF", { map: dialTex }));
  face.position.set(0, 0.2, 0.128);
  face.userData.noInk = true;
  meter.add(face);

  const needlePivot = new THREE.Group();
  needlePivot.position.set(0, 0.155, 0.132);
  meter.add(needlePivot);
  const needle = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.105, 0.012), kit.toon("#DD3428"));
  needle.position.set(0, 0.052, 0);
  needle.userData.noInk = true;
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.016, 10), kit.toon("#1C1C20"));
  cap.rotation.x = Math.PI / 2;
  cap.userData.noInk = true;
  needlePivot.add(needle, cap);

  kit.ink(meter);
  return { group: meter, needlePivot };
}

function makeDeskTable(kit, THREE, x, z, w, d, topCol, legCol) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  const top = new THREE.Mesh(new THREE.BoxGeometry(w, 0.09, d), kit.toon(topCol));
  top.position.set(0, DESK_Y - 0.045, 0);
  g.add(top);
  const legGeo = new THREE.BoxGeometry(0.11, DESK_Y - 0.09, 0.11);
  const legMat = kit.toon(legCol);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(sx * (w / 2 - 0.18), (DESK_Y - 0.09) / 2, sz * (d / 2 - 0.18));
      g.add(leg);
    }
  }
  kit.ink(g);
  return g;
}

export function deskWorld(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ yard: 13, clear: 6, shadow: 16, seed: 7 });

  // Main desk (x = 0)
  scene.add(makeDeskTable(kit, THREE, 0, 0, 3.8, 2.3, "#C99F74", "#6B4E3E"));
  const mat = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.012, 1.45), kit.toon("#D6D2C7"));
  mat.position.set(-0.15, DESK_Y + 0.006, 0.04);
  kit.ink(mat);
  scene.add(mat);

  // Subtle background desk props at rear corners
  const mug = new THREE.Group();
  mug.position.set(-1.45, DESK_Y, -0.78);
  const cupBody = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.095, 0.22, 14), kit.toon("#EFC7AD"));
  cupBody.position.y = 0.11;
  const coffee = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.01, 14), kit.toon("#4E3629"));
  coffee.position.y = 0.215;
  mug.add(cupBody, coffee);
  kit.ink(mug);
  scene.add(mug);

  const book = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.05, 0.72), kit.toon("#4868C8"));
  book.position.set(1.38, DESK_Y + 0.025, -0.74);
  book.rotation.y = -0.18;
  kit.ink(book);
  scene.add(book);

  // Hero pad & phone
  const pad = chargingPadCutaway(kit, { withCord: true });
  pad.group.position.set(0, DESK_Y, 0);
  scene.add(pad.group);

  const phone = smartphone(kit, {});
  phone.group.position.set(0.04, DESK_Y + 0.175, 0.22);
  scene.add(phone.group);

  // Receiver flat copper-coil & field-lines & battery-cell shared at main desk
  const rxCoil = copperCoil(kit, { variant: "flat", turns: 4, innerRadius: 0.08, outerRadius: 0.21, withBobbin: false });
  rxCoil.group.position.set(0.04, DESK_Y + 0.56, 0);
  rxCoil.group.rotation.x = Math.PI;
  rxCoil.group.visible = false;
  scene.add(rxCoil.group);

  const txField = fieldLines(kit, { color: "#FCD53E", baseRadius: 0.22, planes: 4 });
  txField.group.position.set(0.04, DESK_Y + 0.125, 0);
  txField.group.visible = false;
  scene.add(txField.group);

  const batt = batteryCell(kit, {});
  batt.group.position.set(0.06, DESK_Y + 0.36, 0.02);
  batt.group.scale.setScalar(0.88);
  batt.group.visible = false;
  scene.add(batt.group);

  // Lab bench (x = 6.5) for m1e & m1f
  scene.add(makeDeskTable(kit, THREE, 6.5, 0, 3.6, 2.2, "#B89A78", "#5C473B"));
  const labGroup = new THREE.Group();
  labGroup.position.set(6.5, DESK_Y, 0);
  scene.add(labGroup);

  const labRail = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.03, 0.26), kit.toon("#8A7460"));
  labRail.position.set(-0.55, 0.015, 0);
  kit.ink(labRail);
  labGroup.add(labRail);

  const labCoil = copperCoil(kit, { variant: "solenoid", turns: 5.5, outerRadius: 0.19, length: 0.44, withBobbin: false });
  labCoil.group.position.set(-0.1, 0.25, 0);
  labCoil.group.rotation.y = Math.PI / 2;
  labGroup.add(labCoil.group);

  const magnetGroup = new THREE.Group();
  magnetGroup.position.set(-0.95, 0.25, 0);
  const magS = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.14, 0.16), kit.toon("#2D7FF9"));
  magS.position.x = -0.14;
  const magN = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.14, 0.16), kit.toon("#DD3428"));
  magN.position.x = 0.14;
  magnetGroup.add(magS, magN);
  kit.ink(magnetGroup);
  const magField = fieldLines(kit, { color: "#FCD53E", baseRadius: 0.19, planes: 4 });
  magField.group.rotation.z = -Math.PI / 2;
  magField.group.position.set(0.2, 0, 0);
  magnetGroup.add(magField.group);
  labGroup.add(magnetGroup);

  const labMeter = makeMeter(kit, THREE, { brass: false });
  labMeter.group.position.set(0.28, 0, -0.45);
  labMeter.group.rotation.y = -0.22;
  labGroup.add(labMeter.group);

  // Connecting wires from labCoil terminals to labMeter
  const wireMat = kit.toon("#2D7FF9", { emissive: "#000000" });
  const wireA = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.32, 0.04, 0.08),
      new THREE.Vector3(-0.32, 0.02, -0.25),
      new THREE.Vector3(0.14, 0.04, -0.42),
    ]), 16, 0.012, 6, false),
    wireMat
  );
  const wireB = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.12, 0.04, -0.08),
      new THREE.Vector3(0.18, 0.02, -0.26),
      new THREE.Vector3(0.38, 0.04, -0.42),
    ]), 16, 0.012, 6, false),
    wireMat
  );
  kit.ink(wireA);
  kit.ink(wireB);
  labGroup.add(wireA, wireB);

  // Comparison stationary pad on right side of lab bench (for m1f pad_ac)
  const compPad = chargingPadCutaway(kit, { withCord: false });
  compPad.group.position.set(1.15, 0, 0.25);
  labGroup.add(compPad.group);
  const compField = fieldLines(kit, { color: "#FCD53E", baseRadius: 0.2, planes: 4 });
  compField.group.position.set(1.19, 0.125, 0.25);
  labGroup.add(compField.group);

  // Faraday 19th-century table (x = -6.5) for w1a
  scene.add(makeDeskTable(kit, THREE, -6.5, 0, 3.4, 2.2, "#7A543E", "#4A3224"));
  const farGroup = new THREE.Group();
  farGroup.position.set(-6.5, DESK_Y, 0);
  scene.add(farGroup);

  const ironRing = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.082, 10, 28), kit.toon("#2C303D"));
  ironRing.rotation.x = Math.PI / 2;
  ironRing.position.set(-0.2, 0.16, 0);
  kit.ink(ironRing);
  farGroup.add(ironRing);

  const ringFluxMat = new THREE.MeshBasicMaterial({ color: "#FCD53E", transparent: true, opacity: 0 });
  const ringFlux = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.095, 8, 28), ringFluxMat);
  ringFlux.rotation.x = Math.PI / 2;
  ringFlux.position.set(-0.2, 0.16, 0);
  ringFlux.userData.noInk = true;
  farGroup.add(ringFlux);

  const farPrim = copperCoil(kit, { variant: "solenoid", turns: 5, outerRadius: 0.13, length: 0.34, withBobbin: false });
  farPrim.group.position.set(-0.62, 0.16, 0);
  farGroup.add(farPrim.group);

  const farSec = copperCoil(kit, { variant: "solenoid", turns: 5, outerRadius: 0.13, length: 0.34, withBobbin: false });
  farSec.group.position.set(0.22, 0.16, 0);
  farGroup.add(farSec.group);

  // Knife switch & battery cell on left of iron ring
  const cellCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.28, 12), kit.toon("#5A6075"));
  cellCyl.position.set(-1.12, 0.14, 0.38);
  const cellCap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.05, 10), kit.toon("#C89B48"));
  cellCap.position.set(-1.12, 0.295, 0.38);
  kit.ink(cellCyl);
  kit.ink(cellCap);
  farGroup.add(cellCyl, cellCap);

  const swBase = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.12), kit.toon("#5C402B"));
  swBase.position.set(-1.02, 0.02, -0.25);
  const swPivot = new THREE.Group();
  swPivot.position.set(-1.1, 0.05, -0.25);
  const swBlade = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.018, 0.03), kit.toon("#D99B45"));
  swBlade.position.set(0.09, 0, 0);
  swPivot.add(swBlade);
  kit.ink(swBase);
  kit.ink(swPivot);
  farGroup.add(swBase, swPivot);

  const farMeter = makeMeter(kit, THREE, { brass: true });
  farMeter.group.position.set(0.32, 0, -0.52);
  farMeter.group.rotation.y = -0.3;
  farGroup.add(farMeter.group);

  const farPad = chargingPadCutaway(kit, { withCord: false });
  farPad.group.position.set(1.12, 0, 0.22);
  farGroup.add(farPad.group);
  const farPadField = fieldLines(kit, { color: "#FCD53E", baseRadius: 0.19, planes: 4 });
  farPadField.group.position.set(1.16, 0.125, 0.22);
  farGroup.add(farPadField.group);

  // Additional anchors on world props
  const aObj = (parent, name, pos) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...pos);
    parent.add(o);
    return o;
  };
  const labAnchors = {
    magnet: aObj(magnetGroup, "labMagnet", [0, 0.1, 0]),
    coil: aObj(labGroup, "labCoil", [-0.1, 0.28, 0]),
    meter: aObj(labMeter.group, "labMeter", [0, 0.28, 0]),
    compPad: aObj(compPad.group, "compPad", [0.04, 0.16, 0]),
  };
  const farAnchors = {
    ring: aObj(farGroup, "farRing", [-0.2, 0.26, 0]),
    meter: aObj(farMeter.group, "farMeter", [0, 0.28, 0]),
    switch: aObj(swBase, "farSwitch", [0, 0.08, 0]),
    modernPad: aObj(farPad.group, "farModernPad", [0.04, 0.16, 0]),
  };

  function set(t, opts = {}) {
    const {
      padPos = [0, DESK_Y, 0],
      padState = {},
      phonePos = [0.04, DESK_Y + 0.175, 0.22],
      phoneRot = [0, 0, 0],
      phoneVisible = true,
      phoneState = {},
      rxCoilVisible = false,
      rxCoilPos = [0.04, DESK_Y + 0.56, 0],
      rxCoilRot = [Math.PI, 0, 0],
      rxCoilState = {},
      fieldVisible = false,
      fieldPos = [0.04, DESK_Y + 0.125, 0],
      fieldState = {},
      battVisible = false,
      battPos = [0.06, DESK_Y + 0.36, 0.02],
      battState = {},
      labState = {},
      farState = {},
    } = opts;

    pad.group.position.set(...padPos);
    pad.update(t, padState);

    phone.group.visible = phoneVisible;
    phone.group.position.set(...phonePos);
    phone.group.rotation.set(...phoneRot);
    phone.update(t, { charging: 0, ...phoneState });

    rxCoil.group.visible = rxCoilVisible;
    rxCoil.group.position.set(...rxCoilPos);
    rxCoil.group.rotation.set(...rxCoilRot);
    rxCoil.update(t, rxCoilState);

    txField.group.position.set(...fieldPos);
    txField.update(t, fieldVisible ? fieldState : { intensity: 0 });
    txField.group.visible = fieldVisible;

    batt.group.visible = battVisible;
    batt.group.position.set(...battPos);
    batt.update(t, battState);

    // Lab state
    const magX = labState.magX ?? -0.95;
    magnetGroup.position.set(magX, 0.25, 0);
    magField.update(t, { intensity: labState.fieldIntensity ?? 1, oscillate: false, polarity: 1, reach: 1.05 });
    labCoil.update(t, { mode: labState.coilMode ?? "idle", intensity: labState.coilIntensity ?? 0 });
    labMeter.needlePivot.rotation.z = labState.needle ?? 0;
    const wireGlow = labState.coilIntensity ?? 0;
    wireMat.emissive.set("#2D7FF9").multiplyScalar(wireGlow * 0.45);
    compPad.update(t, { cutaway: 1, coilGlow: labState.compGlow ?? 0, txGlow: labState.compGlow ?? 0 });
    compField.update(t, { intensity: labState.compGlow ?? 0, oscillate: true, freq: 3.2 });

    // Faraday state
    farPrim.update(t, { mode: farState.primMode ?? "idle", intensity: farState.primIntensity ?? 0 });
    farSec.update(t, { mode: farState.secMode ?? "idle", intensity: farState.secIntensity ?? 0 });
    swPivot.rotation.z = farState.switchAngle ?? 0.45;
    farMeter.needlePivot.rotation.z = farState.needle ?? 0;
    ringFluxMat.opacity = farState.flux ?? 0;
    farPad.update(t, { cutaway: 1, coilGlow: farState.padGlow ?? 0, txGlow: farState.padGlow ?? 0 });
    farPadField.update(t, { intensity: farState.padGlow ?? 0, oscillate: true, freq: 3.2 });
  }

  return {
    scene, pad, phone, rxCoil, txField, batt,
    labAnchors, farAnchors, compPad,
    set,
  };
}

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const question = kit.beat("question");
  const icon = kit.beat("icon");
  const pose = { pos: [1.05, DESK_Y + 1.08, 2.05], look: [0.02, DESK_Y + 0.34, 0.14], fov: 33 };
  const camera = kit.camera(pose);
  kit.callout({ text: "ĐIỆN ĐI ĐÂU?", anchor: world.pad.anchors.padTop, at: question, hold: 2.2 });
  kit.callout({ text: "BIỂU TƯỢNG SẠC", anchor: world.phone.anchors.screen, at: icon, hold: 1.5 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pad.group, world.phone.group],
    update(t) {
      // Phone lowers smoothly onto closed pad between t = 0.5 and t = 2.6
      const drop = kit.ease(kit.progress(t, 0.6, 2.0), "out");
      const phoneY = DESK_Y + 0.175 + (1 - drop) * 0.52;
      const chargeOn = t >= icon - 0.1 ? 1 : 0;
      const ledState = t >= icon - 0.1 ? "active" : "idle";
      world.set(t, {
        padState: { cutaway: 0, coilGlow: 0, led: ledState },
        phonePos: [0.04, phoneY, 0.22],
        phoneState: { cutaway: 0, charging: chargeOn },
      });
      kit.push(camera, t, { ...pose, amount: 0.48, start: 4.0, dur: 3.8 });
    },
  };
}
