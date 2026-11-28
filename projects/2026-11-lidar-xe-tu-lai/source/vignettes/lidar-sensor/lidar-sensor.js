// lidar-sensor: original toon3d rooftop LiDAR sensor module.
// Supports closed 360-degree spinning housing, 64-beam fan mode, and side-parting cutaway
// revealing Rangefinder (laser diode #00B4D8 + photodetector #F08A4B + timing chip #FCD53E)
// and Beam Scanner (copper motor + spinning 45-degree mirror).
// Origin at base center [0, 0, 0]; primary emitter/window faces +z.
export function lidarSensor(kit, opts = {}) {
  const { THREE } = kit;
  const {
    housingColor = "#2C303D",
    trimColor = "#A5A6AA",
    pulseColor = "#00B4D8",
    echoColor = "#F08A4B",
    clockColor = "#FCD53E",
    beamLength = 2.6,
  } = opts;

  const group = new THREE.Group();
  group.name = "lidar-sensor";

  const flat = (m) => {
    m.flatShading = true;
    return m;
  };
  const doubleFlat = (m) => {
    m.flatShading = true;
    m.side = THREE.DoubleSide;
    return m;
  };

  const housingMat = doubleFlat(kit.toon(housingColor));
  const capMat = doubleFlat(kit.toon("#3A3D4D"));
  const trimMat = flat(kit.toon(trimColor));
  const visorMat = doubleFlat(kit.toon("#182030"));
  const pcbMat = flat(kit.toon("#2E6B4F"));
  const copperMat = flat(kit.toon("#D98245"));
  const mirrorMat = flat(kit.toon("#A9C7DA"));
  const darkMat = flat(kit.toon("#1C1E26"));

  const diodeMat = flat(kit.toon(pulseColor, { emissive: "#000000" }));
  const detectorMat = flat(kit.toon(echoColor, { emissive: "#000000" }));
  const clockMat = flat(kit.toon(clockColor, { emissive: "#000000" }));

  // Mounting pedestal base (stays stationary)
  const baseGroup = new THREE.Group();
  group.add(baseGroup);

  const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.41, 0.44, 0.06, 16), capMat);
  flange.position.y = 0.03;
  baseGroup.add(flange);

  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.39, 0.08, 16), trimMat);
  collar.position.y = 0.1;
  baseGroup.add(collar);

  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const lug = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.08), darkMat);
    lug.position.set(Math.cos(a) * 0.39, 0.07, Math.sin(a) * 0.39);
    lug.rotation.y = -a;
    baseGroup.add(lug);
  }

  // Split outer housing shells: left (-x) and right (+x) slide apart on cutaway
  const buildHalfShell = (side) => {
    const shell = new THREE.Group();
    group.add(shell);

    const thetaStart = side > 0 ? 0 : Math.PI;
    // Lower skirt
    const skirt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.37, 0.37, 0.14, 16, 1, false, thetaStart, Math.PI),
      housingMat
    );
    skirt.position.y = 0.21;
    shell.add(skirt);

    // Optical visor band (recessed slightly so beam exits cleanly)
    const visor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.352, 0.352, 0.2, 16, 1, false, thetaStart, Math.PI),
      visorMat
    );
    visor.position.y = 0.38;
    shell.add(visor);

    // Upper rim & domed cap
    const upper = new THREE.Mesh(
      new THREE.CylinderGeometry(0.37, 0.37, 0.14, 16, 1, false, thetaStart, Math.PI),
      housingMat
    );
    upper.position.y = 0.55;
    shell.add(upper);

    const topCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.31, 0.37, 0.08, 16, 1, false, thetaStart, Math.PI),
      capMat
    );
    topCap.position.y = 0.66;
    shell.add(topCap);

    // Neutral trim ring segment
    const ring = new THREE.Mesh(
      new THREE.CylinderGeometry(0.382, 0.382, 0.028, 16, 1, true, thetaStart, Math.PI),
      trimMat
    );
    ring.position.y = 0.49;
    shell.add(ring);

    return shell;
  };

  const leftShell = buildHalfShell(-1);
  const rightShell = buildHalfShell(1);

  // Internal Block 1: Rangefinder (PCB + Laser Diode + Photodetector + Timing Counter)
  const rangefinderGroup = new THREE.Group();
  rangefinderGroup.position.set(0, 0.5, 0);
  group.add(rangefinderGroup);

  const pcb = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.032, 0.36), pcbMat);
  rangefinderGroup.add(pcb);

  // Laser diode (#00B4D8) on left-front of rangefinder bay
  const diodeGroup = new THREE.Group();
  diodeGroup.position.set(-0.13, 0.075, 0.06);
  rangefinderGroup.add(diodeGroup);

  const diodeBody = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.15, 10), copperMat);
  diodeBody.rotation.x = Math.PI / 2;
  diodeGroup.add(diodeBody);

  const diodeSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.055, 10), capMat);
  diodeSleeve.rotation.x = Math.PI / 2;
  diodeSleeve.position.z = 0.048;
  diodeGroup.add(diodeSleeve);

  const diodeLens = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.04, 12), diodeMat);
  diodeLens.rotation.x = Math.PI / 2;
  diodeLens.position.z = 0.092;
  diodeGroup.add(diodeLens);

  // Photodetector (#F08A4B) on right-front of rangefinder bay
  const detectorGroup = new THREE.Group();
  detectorGroup.position.set(0.13, 0.075, 0.06);
  rangefinderGroup.add(detectorGroup);

  const detectorHood = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.11, 0.13), capMat);
  detectorGroup.add(detectorHood);

  const detectorDome = new THREE.Mesh(new THREE.SphereGeometry(0.048, 10, 8), detectorMat);
  detectorDome.position.z = 0.072;
  detectorGroup.add(detectorDome);

  // Electronic timing / counter IC (#FCD53E) clearly visible center-top on rangefinder PCB
  const clockGroup = new THREE.Group();
  clockGroup.position.set(0, 0.05, -0.07);
  rangefinderGroup.add(clockGroup);

  const icBody = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.06, 0.11), darkMat);
  clockGroup.add(icBody);

  const icTick = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.032, 0.06), clockMat);
  icTick.position.y = 0.042;
  clockGroup.add(icTick);

  // Internal Block 2: Beam Scanner & Electric Motor
  const scannerGroup = new THREE.Group();
  group.add(scannerGroup);

  // Stationary copper stator & motor housing
  const motorHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.23, 0.11, 12), capMat);
  motorHousing.position.y = 0.19;
  scannerGroup.add(motorHousing);

  const copperCoil = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.09, 12), copperMat);
  copperCoil.position.y = 0.26;
  scannerGroup.add(copperCoil);

  // Rotating rotor shaft + 45-degree scanner mirror + beam emitter
  const rotorGroup = new THREE.Group();
  rotorGroup.position.y = 0.31;
  scannerGroup.add(rotorGroup);

  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.18, 10), trimMat);
  shaft.position.y = -0.04;
  rotorGroup.add(shaft);

  // Visible index ribs on motor hub so rotation reads clearly
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.06, 0.12), i === 0 ? diodeMat : trimMat);
    fin.position.set(Math.sin(a) * 0.1, -0.03, Math.cos(a) * 0.1);
    fin.rotation.y = a;
    rotorGroup.add(fin);
  }

  const mirrorMount = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 0.16), darkMat);
  mirrorMount.position.y = 0.04;
  rotorGroup.add(mirrorMount);

  const mirrorPlate = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.16, 0.024), mirrorMat);
  mirrorPlate.position.set(0, 0.05, 0.03);
  mirrorPlate.rotation.x = -Math.PI / 4;
  rotorGroup.add(mirrorPlate);

  // Translucent laser rays (exiting cleanly from visor slot at y = 0.37, well clear of PCB at y = 0.50)
  const beamMat = new THREE.MeshBasicMaterial({
    color: pulseColor,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
  });

  const singleBeamGroup = new THREE.Group();
  singleBeamGroup.position.set(0, 0.05, 0.38);
  singleBeamGroup.visible = false;
  rotorGroup.add(singleBeamGroup);

  const singleRayGroup = new THREE.Group();
  singleBeamGroup.add(singleRayGroup);

  const singleRay = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1, 8), beamMat);
  singleRay.rotation.x = Math.PI / 2;
  singleRay.position.z = 0.5;
  singleRay.userData.noInk = true;
  singleRayGroup.add(singleRay);

  const singleTip = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), beamMat);
  singleTip.position.z = beamLength;
  singleTip.userData.noInk = true;
  singleBeamGroup.add(singleTip);

  // 64-channel vertical beam fan via single InstancedMesh (unit-length beams)
  const FAN_COUNT = 64;
  const fanGeo = new THREE.CylinderGeometry(0.008, 0.008, 1, 5);
  fanGeo.rotateX(Math.PI / 2);
  fanGeo.translate(0, 0, 0.5);
  const fanMat = new THREE.MeshBasicMaterial({
    color: pulseColor,
    transparent: true,
    opacity: 0.56,
    depthWrite: false,
  });
  const fanMesh = new THREE.InstancedMesh(fanGeo, fanMat, FAN_COUNT);
  fanMesh.position.set(0, 0.05, 0.38);
  fanMesh.userData.noInk = true;
  fanMesh.visible = false;
  rotorGroup.add(fanMesh);

  const dummy = new THREE.Object3D();
  for (let i = 0; i < FAN_COUNT; i++) {
    const frac = i / (FAN_COUNT - 1) - 0.5;
    const pitch = frac * 0.48; // +/- ~14 deg vertical FOV
    const yaw = ((i % 4) - 1.5) * 0.02;
    dummy.position.set(0, 0, 0);
    dummy.rotation.set(-pitch, yaw, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    fanMesh.setMatrixAt(i, dummy.matrix);
  }
  fanMesh.instanceMatrix.needsUpdate = true;

  kit.ink(group);

  const anchor = (name, p, parent = group) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    parent.add(o);
    return o;
  };

  const anchors = {
    body: anchor("body", [0, 0.36, 0]),
    top: anchor("top", [0, 0.72, 0]),
    lens: anchor("lens", [0, 0.38, 0.38]),
    diode: anchor("diode", [0, 0, 0.1], diodeGroup),
    detector: anchor("detector", [0, 0, 0.08], detectorGroup),
    timer: anchor("timer", [0, 0.04, 0], clockGroup),
    motor: anchor("motor", [0, 0.24, 0]),
    scanner: anchor("scanner", [0, 0.36, 0.08], rotorGroup),
  };

  const pulseBase = new THREE.Color(pulseColor);
  const echoBase = new THREE.Color(echoColor);
  const clockBase = new THREE.Color(clockColor);
  const dark = new THREE.Color("#000000");

  function update(t, state = {}) {
    const cut = kit.clamp01(state.cutaway ?? 0);
    leftShell.position.set(-0.56 * cut, 0, 0.06 * cut);
    leftShell.rotation.y = -0.32 * cut;
    rightShell.position.set(0.56 * cut, 0, 0.06 * cut);
    rightShell.rotation.y = 0.32 * cut;

    const spinRate = state.spin ?? 0;
    const angle = state.angle ?? t * spinRate * Math.PI * 2;
    rotorGroup.rotation.y = angle;

    const emit = kit.clamp01(state.emit ?? 0);
    const receive = kit.clamp01(state.receive ?? 0);
    const clock = kit.clamp01(state.clock ?? 0);
    diodeMat.emissive.copy(dark).lerp(pulseBase, emit * 0.9);
    detectorMat.emissive.copy(dark).lerp(echoBase, receive * 0.9);
    clockMat.emissive.copy(dark).lerp(clockBase, clock * 0.9);

    const beamMode = state.beamMode ?? "none";
    const active = kit.clamp01(state.beamActive ?? 1);
    const len = Math.max(0.2, state.beamLength ?? beamLength);

    singleBeamGroup.visible = beamMode === "single" && active > 0.02;
    singleRayGroup.scale.set(1, 1, len);
    singleTip.position.z = len;
    if (singleBeamGroup.visible) {
      beamMat.opacity = 0.78 * active;
    }

    fanMesh.visible = beamMode === "fan64" && active > 0.02;
    fanMesh.scale.set(1, 1, len);
    if (fanMesh.visible) {
      fanMat.opacity = 0.56 * active;
    }
  }

  update(0);
  return { group, hero: [baseGroup, rangefinderGroup, scannerGroup], anchors, update };
}
