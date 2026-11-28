// earth: low-poly toon3d Earth with raised continent masses, polar caps, atmosphere shell,
// surface receiver beacon, optional DOP error zone, and 3D coordinate axes.
// Origin at planet centre [0, 0, 0].
export function earth(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    radius = 1.6,
    tilt = 0.22,
    oceanColor = "#4D8FD6",
    landColor = PALETTE.grass,
    desertColor = PALETTE.peach,
  } = opts;

  const group = new THREE.Group();
  group.name = "earth";

  const tiltGroup = new THREE.Group();
  tiltGroup.rotation.z = tilt;
  group.add(tiltGroup);

  const spinGroup = new THREE.Group();
  tiltGroup.add(spinGroup);

  // Low-poly ocean globe
  const globe = new THREE.Mesh(
    new THREE.IcosahedronGeometry(radius, 3),
    kit.toon(oceanColor)
  );
  spinGroup.add(globe);

  // Stylized raised landmass clusters placed around the globe
  const landMat = kit.toon(landColor);
  const desertMat = kit.toon(desertColor);
  const capMat = kit.toon("#FAFCFB");

  const patch = (latDeg, lonDeg, rPatch, height, mat = landMat) => {
    const phi = THREE.MathUtils.degToRad(90 - latDeg);
    const theta = THREE.MathUtils.degToRad(lonDeg);
    const dir = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta)
    );
    const m = new THREE.Mesh(
      new THREE.CylinderGeometry(rPatch * 0.88, rPatch, height, 7),
      mat
    );
    m.position.copy(dir).multiplyScalar(radius - height * 0.35);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    spinGroup.add(m);
    return m;
  };

  // Stylized multi-lobe continental shapes (Eurasia, SE Asia, Africa, Americas, Australia)
  patch(26, 75, 0.42, 0.08, landMat);
  patch(34, 86, 0.32, 0.088, landMat);
  patch(44, 52, 0.36, 0.075, landMat);
  patch(18, 102, 0.28, 0.084, landMat);
  patch(12, 108, 0.2, 0.076, landMat);
  patch(48, 18, 0.32, 0.072, landMat);
  patch(16, 14, 0.34, 0.082, desertMat);
  patch(2, 22, 0.28, 0.074, landMat);
  patch(-8, 24, 0.32, 0.078, landMat);
  patch(-25, 134, 0.26, 0.072, desertMat);
  patch(42, -102, 0.38, 0.082, landMat);
  patch(32, -88, 0.26, 0.074, landMat);
  patch(20, -96, 0.24, 0.076, desertMat);
  patch(-16, -60, 0.32, 0.08, landMat);
  patch(-26, -64, 0.22, 0.072, desertMat);

  // Polar ice caps
  patch(88, 0, 0.46, 0.07, capMat);
  patch(-88, 0, 0.42, 0.07, capMat);

  // Surface receiver marker at top-front landmark (fixed to group so orbital rays hit reliably)
  const pinPos = new THREE.Vector3(0, radius * 0.86, radius * 0.51).normalize().multiplyScalar(radius + 0.03);
  const pinNormal = pinPos.clone().normalize();
  const pinGroup = new THREE.Group();
  pinGroup.position.copy(pinPos);
  pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pinNormal);
  group.add(pinGroup);

  const baseDiscMat = kit.toon("#2D7FF9", { emissive: "#000000" });
  const pinDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.04, 14), baseDiscMat);
  pinGroup.add(pinDisc);

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.16, 8), kit.toon("#FAFCFB"));
  stem.position.y = 0.09;
  pinGroup.add(stem);

  const headMat = kit.toon("#2D7FF9", { emissive: "#000000" });
  const pinHead = new THREE.Mesh(new THREE.IcosahedronGeometry(0.085, 1), headMat);
  pinHead.position.y = 0.2;
  pinGroup.add(pinHead);

  // 3D coordinate axes (X, Y, Z) at the surface marker for four_unknowns
  const axesGroup = new THREE.Group();
  axesGroup.visible = false;
  pinGroup.add(axesGroup);
  const axisBar = (dir, col) => {
    const g = new THREE.Group();
    const mat = kit.toon(col);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.52, 8), mat);
    shaft.position.y = 0.26;
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.058, 0.14, 8), mat);
    tip.position.y = 0.56;
    g.add(shaft, tip);
    g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    axesGroup.add(g);
  };
  axisBar(new THREE.Vector3(1, 0, 0), "#FAFCFB");
  axisBar(new THREE.Vector3(0, 1, 0), "#00B4D8");
  axisBar(new THREE.Vector3(0, 0, 1), "#FCD53E");

  kit.ink(group);

  // Atmosphere translucent shell + DOP error disc (noInk so they render clean & crisp)
  const atmoGroup = new THREE.Group();
  group.add(atmoGroup);
  const atmoMat = new THREE.MeshBasicMaterial({
    color: "#7AD7F0",
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  });
  const atmoSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.15, 28, 18), atmoMat);
  atmoSphere.userData.noInk = true;
  atmoGroup.add(atmoSphere);

  const errMat = new THREE.MeshBasicMaterial({
    color: "#DD3428",
    transparent: true,
    opacity: 0.36,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const errDisc = new THREE.Mesh(new THREE.CircleGeometry(0.45, 24), errMat);
  errDisc.rotation.x = -Math.PI / 2;
  errDisc.position.y = 0.03;
  errDisc.userData.noInk = true;
  errDisc.visible = false;
  pinGroup.add(errDisc);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.copy(p);
    group.add(o);
    return o;
  };
  const anchors = {
    center: anchor("center", new THREE.Vector3(0, 0, 0)),
    surface: anchor("surface", pinPos.clone().addScaledVector(pinNormal, 0.2)),
    northPole: anchor("northPole", new THREE.Vector3(0, radius + 0.15, 0)),
    atmosphere: anchor("atmosphere", new THREE.Vector3(0, radius * 1.15, 0)),
  };

  const dotCol = new THREE.Color("#2D7FF9");
  const fixCol = new THREE.Color("#2D884E");
  const atmoBaseCol = new THREE.Color("#7AD7F0");
  const atmoPulseCol = new THREE.Color("#00B4D8");
  const dark = new THREE.Color("#000000");

  function update(t, state = {}) {
    const spin = state.spin ?? 0;
    spinGroup.rotation.y = spin * t * 0.22;

    const atmoOn = (state.atmosphere ?? 1) > 0.01;
    const atmoGlow = kit.clamp01(state.atmoGlow ?? 0);
    atmoGroup.visible = atmoOn;
    atmoMat.color.copy(atmoBaseCol).lerp(atmoPulseCol, atmoGlow);
    atmoMat.opacity = 0.14 + 0.32 * atmoGlow;

    const fix = kit.clamp01(state.fix ?? 0);
    baseDiscMat.color.copy(dotCol).lerp(fixCol, fix);
    headMat.color.copy(dotCol).lerp(fixCol, fix);
    headMat.emissive.copy(dark).lerp(fixCol, fix * 0.55);
    pinGroup.scale.setScalar(1 + 0.25 * fix);

    const err = kit.clamp01(state.errorRing ?? 0);
    errDisc.visible = err > 0.02;
    if (errDisc.visible) {
      const stretch = state.errorStretch ?? 1;
      errDisc.scale.set(0.35 + err * 1.15 * stretch, 0.35 + err * 0.9, 1);
      errMat.opacity = 0.18 + 0.32 * err;
    }

    const ax = kit.clamp01(state.axes ?? 0);
    axesGroup.visible = ax > 0.02;
    if (axesGroup.visible) axesGroup.scale.setScalar(Math.max(0.01, ax));
  }

  update(0);
  return { group, hero: [globe], anchors, update };
}
