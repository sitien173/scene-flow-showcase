// gps-satellite: toon3d GPS satellite with dual solar wings, cutaway bay revealing internal
// #FCD53E atomic timekeeping unit, and downward (-y) L-band navigation antenna cluster.
// Origin at centre of satellite bus [0, 0, 0].
export function gpsSatellite(kit, opts = {}) {
  const { THREE } = kit;
  const {
    busColor = "#E5B43B",
    panelColor = "#34579A",
    frameColor = "#4C5266",
  } = opts;

  const group = new THREE.Group();
  group.name = "gps-satellite";

  const motionGroup = new THREE.Group();
  group.add(motionGroup);

  const box = (w, h, d, material, x, y, z, parent = motionGroup) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // Recessed main octagonal-like bus core with dark interior cavity on +z front face
  const busMat = kit.toon(busColor);
  const frameMat = kit.toon(frameColor);
  const cavityMat = kit.toon("#242733");

  // Rear & side structural bus blocks leaving front cavity open (zero coplanar overlap)
  box(0.56, 0.52, 0.24, busMat, 0, 0, -0.14);
  box(0.1, 0.32, 0.26, busMat, -0.23, 0, 0.11);
  box(0.1, 0.32, 0.26, busMat, 0.23, 0, 0.11);
  box(0.56, 0.1, 0.26, frameMat, 0, 0.21, 0.11);
  box(0.56, 0.1, 0.26, frameMat, 0, -0.21, 0.11);
  box(0.36, 0.32, 0.04, cavityMat, 0, 0, -0.005);

  // Top & bottom metallic collar rings
  const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.08, 8), frameMat);
  topCap.position.set(0, 0.3, 0);
  motionGroup.add(topCap);

  // Internal atomic frequency unit (#FCD53E) inside the cutaway bay
  const coreMat = kit.toon("#FCD53E", { emissive: "#000000" });
  const coreUnit = new THREE.Group();
  coreUnit.position.set(0, 0, 0.08);
  motionGroup.add(coreUnit);

  const coreCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.18, 12), coreMat);
  coreCyl.rotation.x = Math.PI / 2;
  coreUnit.add(coreCyl);

  const coreRing = new THREE.Mesh(new THREE.TorusGeometry(0.125, 0.018, 6, 16), coreMat);
  coreRing.position.z = 0.06;
  coreUnit.add(coreRing);

  // Articulated cutaway front hatch door
  const hatchGroup = new THREE.Group();
  hatchGroup.position.set(0, 0, 0.24);
  motionGroup.add(hatchGroup);
  box(0.4, 0.36, 0.045, kit.toon("#D6D2C7"), 0, 0, 0, hatchGroup);
  box(0.28, 0.06, 0.02, busMat, 0, 0, 0.028, hatchGroup);

  // Downward (-y) navigation antenna array + #00B4D8 emitter ring
  const antennaGroup = new THREE.Group();
  antennaGroup.position.set(0, -0.27, 0);
  motionGroup.add(antennaGroup);

  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.05, 12), kit.toon("#888898"));
  plate.position.y = -0.025;
  antennaGroup.add(plate);

  const hornMat = kit.toon("#FAFCFB");
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const horn = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.036, 0.14, 8), hornMat);
    horn.position.set(Math.cos(a) * 0.15, -0.11, Math.sin(a) * 0.15);
    antennaGroup.add(horn);
  }
  const feedDome = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.12, 10), frameMat);
  feedDome.position.y = -0.1;
  antennaGroup.add(feedDome);

  const txMat = kit.toon("#00B4D8", { emissive: "#000000" });
  const txRing = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.022, 6, 20), txMat);
  txRing.rotation.x = Math.PI / 2;
  txRing.position.y = -0.12;
  antennaGroup.add(txRing);

  // Articulated left and right solar array wings
  const buildWing = (side) => {
    const wingPivot = new THREE.Group();
    wingPivot.position.set(side * 0.28, 0, 0);
    motionGroup.add(wingPivot);

    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.22, 8), kit.toon("#A3A3AE"));
    strut.rotation.z = Math.PI / 2;
    strut.position.x = side * 0.11;
    wingPivot.add(strut);

    const panel = new THREE.Group();
    panel.position.x = side * 0.68;
    wingPivot.add(panel);

    box(0.92, 0.036, 0.44, frameMat, 0, 0, 0, panel);
    box(0.86, 0.044, 0.38, kit.toon(panelColor), 0, 0.004, 0, panel);
    // Clean solar cell dividers
    const ribMat = kit.toon("#8FB4F0");
    for (const dx of [-0.28, 0, 0.28]) {
      box(0.02, 0.048, 0.38, ribMat, dx, 0.005, 0, panel);
    }
    box(0.86, 0.048, 0.02, ribMat, 0, 0.005, 0, panel);

    return wingPivot;
  };
  const leftWing = buildWing(-1);
  const rightWing = buildWing(1);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    motionGroup.add(o);
    return o;
  };
  const anchors = {
    body: anchor("body", [0, 0, 0]),
    clockBay: anchor("clockBay", [0, 0, 0.14]),
    antenna: anchor("antenna", [0, -0.42, 0]),
    leftWing: anchor("leftWing", [-0.95, 0, 0]),
    rightWing: anchor("rightWing", [0.95, 0, 0]),
  };

  const coreBase = new THREE.Color("#FCD53E");
  const txBase = new THREE.Color("#00B4D8");
  const dark = new THREE.Color("#000000");

  function update(t, state = {}) {
    const cut = kit.clamp01(state.cutaway ?? 0);
    hatchGroup.position.set(0, cut * 0.42, 0.24 + cut * 0.22);
    hatchGroup.rotation.x = -cut * 0.85;

    const cp = kit.clamp01(state.clockPulse ?? 0);
    const pulseWave = cp * (0.55 + 0.45 * Math.sin(t * 5));
    coreMat.emissive.copy(dark).lerp(coreBase, pulseWave * 0.75);

    const tx = kit.clamp01(state.txGlow ?? 0);
    txMat.emissive.copy(dark).lerp(txBase, tx * 0.8);

    const wa = state.wingAngle ?? 0;
    leftWing.rotation.x = wa;
    rightWing.rotation.x = wa;

    const deploy = kit.clamp01(state.deploy ?? 1);
    leftWing.scale.x = Math.max(0.05, deploy);
    rightWing.scale.x = Math.max(0.05, deploy);

    const hover = state.hover ?? 0;
    motionGroup.position.y = hover ? Math.sin(t * 1.6) * 0.05 * hover : 0;
  }

  update(0);
  return { group, hero: [motionGroup], anchors, update };
}
