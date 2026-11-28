// ev-car: original generic toon3d compact EV hatchback with underfloor cutaway battery bay,
// spinning electric motor under cutaway hood, time-synchronous rotating spoked wheels,
// external charging port, and energyColor/electronColor current flow indicators.
// Origin at ground centre (y = 0); car faces +x; cutaway bay & port face +z.
export function evCar(kit, opts = {}) {
  const { THREE } = kit;
  const {
    bodyColor = "#DCE7F0",
    trimColor = "#2E3446",
    glassColor = "#A9C7DA",
    energyColor = "#E4572E",
    electronColor = "#00B4D8",
    copperColor = "#D98245",
    mode = "drive",
    driveSpeed = 1.0,
    batteryGlow = 0.85,
    bayOpen = 1.0,
    chargerPlug = 0,
  } = opts;

  const group = new THREE.Group();
  group.name = "ev-car";

  const box = (w, h, d, mat, x, y, z, parent = group) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  const bodyMat = kit.toon(bodyColor);
  const trimMat = kit.toon(trimColor);
  const glassMat = kit.windowMaterial(glassColor);
  const headlightMat = kit.toon("#FAFCFB", { emissive: "#FAFCFB" });
  headlightMat.emissiveIntensity = 0.25;
  const taillightMat = kit.toon("#7C5A6A");
  const alloyMat = kit.toon("#C6CFDC");
  const spokeMat = kit.toon("#4B5569");
  const tireMat = kit.toon("#242834");
  const copperMat = kit.toon(copperColor);

  // Lower chassis floor & bumpers (sits cleanly above wheel clearance)
  const chassisGroup = new THREE.Group();
  group.add(chassisGroup);
  box(4.10, 0.22, 1.76, trimMat, 0, 0.35, 0, chassisGroup);
  box(0.24, 0.24, 1.80, trimMat, 2.02, 0.36, 0, chassisGroup);
  box(0.24, 0.24, 1.80, trimMat, -2.02, 0.36, 0, chassisGroup);

  // Main body shell (split around +z cutaway underfloor bay and +z front motor window)
  const bodyGroup = new THREE.Group();
  group.add(bodyGroup);
  // Lower body rear, middle back-half, front hood back-half
  box(1.18, 0.50, 1.82, bodyMat, -1.52, 0.68, 0, bodyGroup);
  box(2.05, 0.44, 1.10, bodyMat, -0.05, 0.72, -0.36, bodyGroup);
  box(2.05, 0.24, 0.72, bodyMat, -0.05, 0.82, 0.55, bodyGroup);
  box(1.06, 0.46, 1.02, bodyMat, 1.50, 0.66, -0.40, bodyGroup);
  // Front nose & LED light bar
  box(0.32, 0.44, 1.78, bodyMat, 1.98, 0.65, 0, bodyGroup);
  box(0.06, 0.08, 1.48, headlightMat, 2.13, 0.68, 0, bodyGroup);
  box(0.06, 0.10, 1.46, taillightMat, -2.11, 0.72, 0, bodyGroup);

  // Cabin greenhouse with clean sloped windshield & rear hatch
  box(1.56, 0.56, 1.54, bodyMat, -0.24, 1.21, 0, bodyGroup);
  const windshieldBack = box(0.44, 0.48, 1.48, bodyMat, 0.54, 1.18, 0, bodyGroup);
  windshieldBack.rotation.z = 0.55;
  const windshield = box(0.08, 0.52, 1.40, glassMat, 0.69, 1.21, 0, bodyGroup);
  windshield.rotation.z = 0.55;
  const rearBack = box(0.42, 0.46, 1.48, bodyMat, -1.00, 1.18, 0, bodyGroup);
  rearBack.rotation.z = -0.52;
  const rearHatch = box(0.08, 0.50, 1.40, glassMat, -1.14, 1.20, 0, bodyGroup);
  rearHatch.rotation.z = -0.52;
  // Side windows
  box(1.38, 0.36, 1.58, glassMat, -0.24, 1.22, 0, bodyGroup);
  // Roof cap & mirrors
  box(1.48, 0.08, 1.44, bodyMat, -0.24, 1.50, 0, bodyGroup);
  box(0.14, 0.10, 0.18, trimMat, 0.66, 1.02, 0.90, bodyGroup);
  box(0.14, 0.10, 0.18, trimMat, 0.66, 1.02, -0.90, bodyGroup);

  // 4 Spoked Wheels resting at y = 0 (radius 0.36)
  const wheels = [];
  const wheelCoords = [
    [1.35, 0.36, 0.88],
    [1.35, 0.36, -0.88],
    [-1.35, 0.36, 0.88],
    [-1.35, 0.36, -0.88],
  ];
  for (const [wx, wy, wz] of wheelCoords) {
    const wPivot = new THREE.Group();
    wPivot.position.set(wx, wy, wz);
    group.add(wPivot);
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.24, 16), tireMat);
    tire.rotation.x = Math.PI / 2;
    wPivot.add(tire);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.25, 14), alloyMat);
    rim.rotation.x = Math.PI / 2;
    wPivot.add(rim);
    const sign = wz > 0 ? 1 : -1;
    for (let s = 0; s < 5; s++) {
      const ang = (s / 5) * Math.PI * 2;
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.18, 0.03), spokeMat);
      sp.position.set(-Math.sin(ang) * 0.11, Math.cos(ang) * 0.11, sign * 0.125);
      sp.rotation.z = ang;
      wPivot.add(sp);
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.27, 10), bodyMat);
    hub.rotation.x = Math.PI / 2;
    wPivot.add(hub);
    wheels.push(wPivot);
  }

  // Underfloor Cutaway Battery Pack Bay (x: -0.90..+0.90, y: 0.24..0.58, z: +0.28..+0.90)
  const bayGroup = new THREE.Group();
  group.add(bayGroup);
  box(1.84, 0.36, 0.56, trimMat, 0, 0.42, 0.54, bayGroup);

  const energyCol = new THREE.Color(energyColor);
  const electronCol = new THREE.Color(electronColor);
  const dark = new THREE.Color("#000000");

  const cellBlockMat = kit.toon("#3F4B63");
  const packEnergyMat = kit.toon(energyColor, { emissive: energyColor });
  const packHaloMat = new THREE.MeshBasicMaterial({
    color: energyColor,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
  });
  const packHalo = new THREE.Mesh(new THREE.BoxGeometry(1.70, 0.28, 0.14), packHaloMat);
  packHalo.position.set(0, 0.42, 0.84);
  packHalo.userData.noInk = true;
  packHalo.renderOrder = 2;
  bayGroup.add(packHalo);

  for (let i = 0; i < 6; i++) {
    const cx = -0.68 + i * 0.272;
    box(0.22, 0.24, 0.38, cellBlockMat, cx, 0.42, 0.64, bayGroup);
    const core = box(0.14, 0.16, 0.06, packEnergyMat, cx, 0.42, 0.84, bayGroup);
    core.userData.noInk = true;
  }

  // Hinged bottom rocker cover over battery cutaway
  const bayCoverPivot = new THREE.Group();
  bayCoverPivot.position.set(0, 0.24, 0.90);
  bayGroup.add(bayCoverPivot);
  box(1.86, 0.36, 0.05, bodyMat, 0, 0.18, 0, bayCoverPivot);

  // Front Electric Motor Cutaway (x: +1.14..+1.78, y: 0.48..0.86, z: +0.22..+0.88)
  const motorGroup = new THREE.Group();
  motorGroup.position.set(1.46, 0.66, 0.54);
  group.add(motorGroup);
  const motorHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.44, 14), kit.toon("#4A5568"));
  motorHousing.rotation.x = Math.PI / 2;
  motorGroup.add(motorHousing);
  const statorCoil = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.04, 8, 16), copperMat);
  statorCoil.position.z = 0.22;
  motorGroup.add(statorCoil);

  const rotorPivot = new THREE.Group();
  rotorPivot.position.z = 0.25;
  motorGroup.add(rotorPivot);
  const rotorHub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 10), alloyMat);
  rotorHub.rotation.x = Math.PI / 2;
  rotorPivot.add(rotorHub);
  const vaneMat = kit.toon(energyColor, { emissive: "#000000" });
  for (let v = 0; v < 4; v++) {
    const vane = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.04), vaneMat);
    vane.rotation.z = (v / 4) * Math.PI;
    rotorPivot.add(vane);
  }

  // External Charging Port at rear-left (-1.68, 0.72, 0.88)
  const portGroup = new THREE.Group();
  portGroup.position.set(-1.68, 0.72, 0.88);
  group.add(portGroup);
  box(0.24, 0.22, 0.08, trimMat, 0, 0, 0, portGroup);
  const portRingMat = kit.toon(electronColor, { emissive: electronColor });
  const portRing = new THREE.Mesh(new THREE.TorusGeometry(0.068, 0.018, 6, 14), portRingMat);
  portRing.position.z = 0.045;
  portGroup.add(portRing);

  const flapPivot = new THREE.Group();
  flapPivot.position.set(-0.12, 0, 0.05);
  portGroup.add(flapPivot);
  box(0.24, 0.22, 0.03, bodyMat, 0.12, 0, 0, flapPivot);

  const plugGroup = new THREE.Group();
  plugGroup.position.set(0, 0, 0.20);
  portGroup.add(plugGroup);
  box(0.14, 0.14, 0.22, trimMat, 0, 0, 0, plugGroup);
  const cordCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0.11),
    new THREE.Vector3(-0.16, -0.14, 0.34),
    new THREE.Vector3(-0.34, -0.45, 0.42),
  ]);
  const cordMesh = new THREE.Mesh(new THREE.TubeGeometry(cordCurve, 14, 0.028, 6, false), trimMat);
  plugGroup.add(cordMesh);

  // Powertrain Flow Conduit + Electron (#00B4D8) & Energy (#E4572E) Beads
  const drivePts = [
    [-0.45, 0.42, 0.89],
    [0.25, 0.42, 0.89],
    [0.92, 0.46, 0.89],
    [1.42, 0.66, 0.86],
  ];
  const chargePts = [
    [-1.68, 0.72, 0.90],
    [-1.22, 0.56, 0.90],
    [-0.70, 0.42, 0.89],
    [0.40, 0.42, 0.89],
  ];
  const driveCurve = new THREE.CatmullRomCurve3(drivePts.map(p => new THREE.Vector3(...p)), false, "catmullrom", 0.2);
  const chargeCurve = new THREE.CatmullRomCurve3(chargePts.map(p => new THREE.Vector3(...p)), false, "catmullrom", 0.2);

  const flowGroup = new THREE.Group();
  group.add(flowGroup);
  const eBeadMat = kit.toon(electronColor, { emissive: electronColor });
  eBeadMat.emissiveIntensity = 0.30;
  const pBeadMat = kit.toon(energyColor, { emissive: energyColor });
  pBeadMat.emissiveIntensity = 0.35;

  const electronBeads = [];
  for (let i = 0; i < 6; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.052, 10, 8), eBeadMat);
    m.userData.noInk = true;
    flowGroup.add(m);
    electronBeads.push(m);
  }
  const energyBeads = [];
  for (let i = 0; i < 4; i++) {
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.036, 0.09, 4, 8), pBeadMat);
    m.rotation.z = Math.PI / 2;
    m.userData.noInk = true;
    flowGroup.add(m);
    energyBeads.push(m);
  }

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    body: anchor("body", [0, 0.88, 0]),
    batteryBay: anchor("batteryBay", [0, 0.42, 0.92]),
    motor: anchor("motor", [1.46, 0.66, 0.84]),
    chargePort: anchor("chargePort", [-1.68, 0.72, 0.94]),
    frontWheel: anchor("frontWheel", [1.35, 0.36, 0.96]),
    rearWheel: anchor("rearWheel", [-1.35, 0.36, 0.96]),
    roof: anchor("roof", [-0.20, 1.56, 0]),
  };

  function path(name = "driveFlow") {
    const pts = name === "driveFlow" ? drivePts : name === "chargeFlow" ? chargePts : null;
    if (!pts) throw new Error("evCar: no path " + JSON.stringify(name));
    group.updateWorldMatrix(true, false);
    return pts.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  // state:
  //   mode: "drive" | "discharge" | "charge" | "idle"
  //   driveSpeed: scalar (wheels & motor rotation speed when driving)
  //   batteryGlow: 0..1
  //   bayOpen: 0..1 (1 = underfloor battery bay cutaway open)
  //   chargerPlug: 0..1 (1 = plugged into rear charge port)
  function update(t, state = {}) {
    const m = state.mode ?? mode;
    const driving = m === "drive" || m === "discharge";
    const charging = m === "charge";
    const speed = driving ? (state.driveSpeed ?? driveSpeed) : 0;
    const glow = kit.clamp01(state.batteryGlow ?? batteryGlow);
    const open = kit.clamp01(state.bayOpen ?? bayOpen);
    const plug = kit.clamp01(state.chargerPlug ?? (charging ? 1 : chargerPlug));

    // Cutaway battery bay cover hinges down
    bayCoverPivot.rotation.x = open * 1.45;
    bayCoverPivot.visible = open < 0.96;

    // Battery pack energy glow (#E4572E)
    const pulse = 0.75 + 0.25 * Math.sin(t * 4.2);
    packHaloMat.opacity = glow * 0.28 * pulse;
    packEnergyMat.emissive.copy(dark).lerp(energyCol, glow * 0.85 * pulse);

    // Wheels & electric motor spin synchronously with t
    wheels.forEach(w => { w.rotation.z = -t * speed * 3.4; });
    rotorPivot.rotation.z = -t * speed * 9.0;
    vaneMat.emissive.copy(dark).lerp(energyCol, driving ? 0.55 * pulse : 0);

    // Charge port flap & plug
    const flapOpen = Math.max(plug, charging ? 1 : 0);
    flapPivot.rotation.y = -flapOpen * 1.85;
    plugGroup.visible = plug > 0.05;
    plugGroup.position.z = kit.lerp(0.45, 0.14, plug);
    portRingMat.emissive.copy(dark).lerp(electronCol, flapOpen * 0.85);

    // Current & energy beads along drive or charge path
    flowGroup.visible = driving || charging;
    if (flowGroup.visible) {
      const curve = charging ? chargeCurve : driveCurve;
      electronBeads.forEach((b, i) => {
        const u = (((i / electronBeads.length + t * 0.42) % 1) + 1) % 1;
        b.position.copy(curve.getPointAt(u));
      });
      energyBeads.forEach((b, i) => {
        const u = (((i / energyBeads.length + t * 0.36 + 0.12) % 1) + 1) % 1;
        b.position.copy(curve.getPointAt(u));
      });
    }
  }

  update(0);
  return { group, hero: [bodyGroup, bayGroup, motorGroup, portGroup], anchors, path, update };
}
