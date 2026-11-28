// bloch-sphere: toon3d Bloch sphere representing a single qubit state.
// North pole = 0, South pole = 1, state vector in #9B5DE5 (superposition),
// #3DDC97 (measurement collapse result), and #F5B942 (entangled pair collar).
// Origin at floor centre (y = 0); front hemisphere faces +z.
export function blochSphere(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    radius = 0.95,
    mode = "superposition",
    superpositionColor = "#9B5DE5",
    resultColor = "#3DDC97",
    entangleColor = "#F5B942",
    baseColor = "#383E52",
  } = opts;

  const R = radius;
  const cy = 1.54;
  const group = new THREE.Group();
  group.name = "bloch-sphere";

  const flat = (m) => { m.flatShading = true; return m; };
  const addMesh = (geo, mat, x, y, z, parent = group) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  // 1. Pedestal base & rear C-cradle support
  const baseMat = flat(kit.toon(baseColor));
  const trimMat = flat(kit.toon("#C8CCD4"));
  const cradleMat = flat(kit.toon("#525B72"));

  addMesh(new THREE.CylinderGeometry(0.64, 0.72, 0.12, 18), baseMat, 0, 0.06, 0);
  addMesh(new THREE.CylinderGeometry(0.42, 0.48, 0.06, 16), trimMat, 0, 0.15, 0);

  // Rear C-bracket connecting pedestal (z = 0) behind the sphere (-z) to north/south bearings
  const cradleRadius = R + 0.14;
  const cradleArc = new THREE.Mesh(
    new THREE.TorusGeometry(cradleRadius, 0.038, 8, 28, Math.PI),
    cradleMat
  );
  cradleArc.position.set(0, cy, 0);
  cradleArc.rotation.set(0, Math.PI / 2, -Math.PI / 2);
  group.add(cradleArc);

  // Lower stem from base to south bearing
  addMesh(new THREE.CylinderGeometry(0.06, 0.08, cy - R - 0.12, 10), cradleMat, 0, 0.15 + (cy - R - 0.12) / 2, 0);

  // 2. Sphere assembly: translucent shell, equator, meridians, latitude rings & internal axes
  const sphereGroup = new THREE.Group();
  sphereGroup.name = "sphere-body";
  sphereGroup.position.set(0, cy, 0);
  group.add(sphereGroup);

  const shellMat = new THREE.MeshBasicMaterial({
    color: "#E8E6F2",
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const sphereShell = new THREE.Mesh(new THREE.SphereGeometry(R, 28, 18), shellMat);
  sphereShell.userData.noInk = true;
  sphereGroup.add(sphereShell);

  const equatorMat = kit.toon("#7A8299", { emissive: "#000000" });
  const equatorRing = new THREE.Mesh(new THREE.TorusGeometry(R, 0.036, 8, 44), equatorMat);
  equatorRing.rotation.x = Math.PI / 2;
  sphereGroup.add(equatorRing);

  const gridMat = kit.toon("#6E768E");
  const m1 = new THREE.Mesh(new THREE.TorusGeometry(R, 0.018, 6, 40), gridMat);
  const m2 = new THREE.Mesh(new THREE.TorusGeometry(R, 0.018, 6, 40), gridMat);
  m2.rotation.y = Math.PI / 2;
  sphereGroup.add(m1, m2);

  for (const lat of [-0.62, 0.62]) {
    const lr = R * Math.cos(lat);
    const ly = R * Math.sin(lat);
    const latRing = new THREE.Mesh(new THREE.TorusGeometry(lr, 0.014, 6, 36), gridMat);
    latRing.rotation.x = Math.PI / 2;
    latRing.position.y = ly;
    sphereGroup.add(latRing);
  }

  // Z-axis (South 1 <-> North 0) and X/Y equatorial crosshairs
  const axisMat = kit.toon("#4A5268");
  addMesh(new THREE.CylinderGeometry(0.020, 0.020, R * 2, 8), axisMat, 0, 0, 0, sphereGroup);
  const xAxis = addMesh(new THREE.CylinderGeometry(0.012, 0.012, R * 1.96, 6), gridMat, 0, 0, 0, sphereGroup);
  xAxis.rotation.z = Math.PI / 2;
  const yAxis = addMesh(new THREE.CylinderGeometry(0.012, 0.012, R * 1.96, 6), gridMat, 0, 0, 0, sphereGroup);
  yAxis.rotation.x = Math.PI / 2;
  addMesh(new THREE.SphereGeometry(0.075, 10, 8), trimMat, 0, 0, 0, sphereGroup);

  // 3. North Pole (0) & South Pole (1) caps and crisp numeral plaques
  const makePoleTexture = (digit, badgeColor) =>
    kit.canvasTexture(128, 128, (g, w, h) => {
      g.fillStyle = PALETTE.pill || "#FAFCFB";
      g.fillRect(0, 0, w, h);
      g.strokeStyle = badgeColor;
      g.lineWidth = 14;
      g.beginPath();
      g.arc(w / 2, h / 2, w * 0.42, 0, Math.PI * 2);
      g.stroke();
      g.fillStyle = PALETTE.ink || "#18191E";
      g.font = '800 76px "Be Vietnam Pro", sans-serif';
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(digit, w / 2, h / 2 + 4);
    });

  const northCapMat = kit.toon("#E6E6E1", { emissive: "#000000" });
  const southCapMat = kit.toon("#E6E6E1", { emissive: "#000000" });
  addMesh(new THREE.SphereGeometry(0.105, 12, 10), northCapMat, 0, R, 0, sphereGroup);
  addMesh(new THREE.SphereGeometry(0.105, 12, 10), southCapMat, 0, -R, 0, sphereGroup);

  const makeBadge = (digit, badgeColor, x, y, z) => {
    const badgeGroup = new THREE.Group();
    badgeGroup.position.set(x, y, z);
    group.add(badgeGroup);
    const rim = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.05, 18),
      flat(kit.toon(PALETTE.pill || "#FAFCFB"))
    );
    rim.rotation.x = Math.PI / 2;
    badgeGroup.add(rim);
    const face = new THREE.Mesh(
      new THREE.CircleGeometry(0.20, 18),
      kit.toon("#FFFFFF", { map: makePoleTexture(digit, badgeColor) })
    );
    face.position.z = 0.028;
    face.userData.noInk = true;
    badgeGroup.add(face);
    const backFace = new THREE.Mesh(
      new THREE.CircleGeometry(0.20, 18),
      kit.toon("#FFFFFF", { map: makePoleTexture(digit, badgeColor) })
    );
    backFace.rotation.y = Math.PI;
    backFace.position.z = -0.028;
    backFace.userData.noInk = true;
    badgeGroup.add(backFace);
    return badgeGroup;
  };

  const northBadge = makeBadge("0", superpositionColor, 0, cy + R + 0.30, 0);
  // South badge mounted on front bracket above base so it is clearly visible and never clipped
  addMesh(new THREE.BoxGeometry(0.06, 0.06, 0.34), cradleMat, 0, 0.34, 0.22);
  const southBadge = makeBadge("1", "#5B7DB1", 0, 0.37, 0.42);

  // 4. State Vector Arrow (rotates around sphere centre: phi around Y, theta from North +Y)
  const phiGroup = new THREE.Group();
  phiGroup.name = "state-phi";
  sphereGroup.add(phiGroup);

  const thetaGroup = new THREE.Group();
  thetaGroup.name = "state-theta";
  phiGroup.add(thetaGroup);

  const vecMat = kit.toon(superpositionColor, { emissive: superpositionColor });
  vecMat.emissiveIntensity = 0.35;

  const shaftLen = R - 0.24;
  addMesh(new THREE.CylinderGeometry(0.042, 0.042, shaftLen, 10), vecMat, 0, shaftLen / 2, 0, thetaGroup);
  const arrowTip = addMesh(new THREE.ConeGeometry(0.115, 0.24, 12), vecMat, 0, R - 0.12, 0, thetaGroup);
  addMesh(new THREE.SphereGeometry(0.095, 12, 10), vecMat, 0, R, 0, thetaGroup);

  const superHaloMat = new THREE.MeshBasicMaterial({
    color: superpositionColor,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
  });
  const superHalo = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.024, 6, 24), superHaloMat);
  superHalo.position.set(0, R, 0);
  superHalo.rotation.x = Math.PI / 2;
  superHalo.userData.noInk = true;
  thetaGroup.add(superHalo);

  // 5. Measurement probe ring (descends during collapse_result) & entanglement collar (#F5B942)
  const probeMat = kit.toon(resultColor, { emissive: resultColor });
  probeMat.emissiveIntensity = 0.45;
  const probeRing = new THREE.Mesh(new THREE.TorusGeometry(R * 1.14, 0.032, 8, 44), probeMat);
  probeRing.name = "probe-ring";
  probeRing.rotation.x = Math.PI / 2;
  probeRing.position.set(0, cy + R + 0.15, 0);
  probeRing.visible = false;
  group.add(probeRing);

  const entangleMat = kit.toon(entangleColor, { emissive: entangleColor });
  entangleMat.emissiveIntensity = 0.4;
  const entangleRing = new THREE.Mesh(new THREE.TorusGeometry(R * 1.07, 0.026, 8, 44), entangleMat);
  entangleRing.name = "entangle-ring";
  entangleRing.rotation.x = Math.PI / 2;
  entangleRing.visible = false;
  sphereGroup.add(entangleRing);

  kit.ink(group);

  const anchor = (name, p, parent = group) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    parent.add(o);
    return o;
  };
  const anchors = {
    center: anchor("center", [0, cy, 0]),
    northPole: anchor("northPole", [0, cy + R + 0.30, 0]),
    southPole: anchor("southPole", [0, cy - R, 0]),
    equator: anchor("equator", [R, cy, 0]),
    tip: anchor("tip", [0, R, 0], thetaGroup),
    base: anchor("base", [0, 0.08, 0]),
  };

  const colDark = new THREE.Color("#000000");
  const colSuper = new THREE.Color(superpositionColor);
  const colResult = new THREE.Color(resultColor);
  const colEntangle = new THREE.Color(entangleColor);
  const colGrid = new THREE.Color("#7A8299");
  const colCapIdle = new THREE.Color("#E6E6E1");
  const colShellIdle = new THREE.Color("#E8E6F2");
  const colCustom = new THREE.Color();

  function update(t, state = {}) {
    const m = state.mode ?? mode;
    const wave = 0.5 + 0.5 * Math.sin(t * 4.2);

    let theta = 0.92 + 0.30 * Math.sin(t * 1.3);
    let phi = 0.45 + t * 1.15;
    let vecColor = colSuper;
    let showHalo = true;
    let eqGlow = 0;
    let showProbe = false;
    let probeY = cy + R * 0.4;
    let showEntangle = false;
    let nGlow = 0;
    let sGlow = 0;

    if (m === "poles_compare") {
      theta = 0.5 * Math.PI * (1 - Math.cos(t * 1.35));
      phi = 0.35;
      showHalo = theta > 0.25 && theta < Math.PI - 0.25;
      nGlow = kit.clamp01(1 - theta / 0.55);
      sGlow = kit.clamp01((theta - (Math.PI - 0.55)) / 0.55);
      vecColor = showHalo ? colSuper : colResult;
    } else if (m === "collapse_result") {
      const c = state.collapsed === true ? 1 : kit.clamp01(state.collapse ?? kit.progress(t, 0.2, 1.1));
      const targetAngle = state.target === 1 ? Math.PI : 0;
      showProbe = c > 0.02 && c < 0.96;
      probeY = kit.lerp(cy + R + 0.18, cy - R * 0.65, c);
      if (c < 0.55) {
        theta = 0.96 + 0.12 * Math.sin(t * 3.0);
        phi = 0.5 + t * 1.2;
        vecColor = colSuper;
        showHalo = true;
      } else {
        const snap = kit.ease((c - 0.55) / 0.45, "out");
        theta = kit.lerp(0.96, targetAngle, snap);
        phi = 0.5;
        vecColor = colResult;
        showHalo = false;
        if (state.target === 1) sGlow = snap;
        else nGlow = snap;
      }
    } else if (m === "equator_50_50") {
      theta = Math.PI / 2;
      phi = 0.4 + t * 0.95;
      vecColor = colSuper;
      eqGlow = 0.8 + 0.2 * wave;
      showHalo = true;
    } else if (m === "entangled_pair") {
      const phase = state.phaseOffset ?? 0;
      theta = 0.88 + 0.28 * Math.sin(t * 1.4 + phase);
      phi = 0.4 + t * 1.0 + phase;
      vecColor = colSuper;
      showEntangle = true;
      eqGlow = 0.45;
    }

    if (state.theta !== undefined) theta = state.theta;
    if (state.phi !== undefined) phi = state.phi;
    if (state.color) { colCustom.set(state.color); vecColor = colCustom; }
    if (state.probe !== undefined) {
      showProbe = state.probe > 0.02;
      probeY = kit.lerp(cy + R + 0.18, cy - R * 0.65, kit.clamp01(state.probe));
    }
    if (state.entangled !== undefined) showEntangle = Boolean(state.entangled);
    if (state.equatorGlow !== undefined) eqGlow = kit.clamp01(state.equatorGlow);

    phiGroup.rotation.y = phi;
    thetaGroup.rotation.x = theta;

    vecMat.color.copy(vecColor);
    vecMat.emissive.copy(colDark).lerp(vecColor, 0.35 + 0.2 * wave);

    superHalo.visible = showHalo;
    if (showHalo) {
      superHalo.scale.setScalar(0.9 + 0.18 * wave);
      superHaloMat.color.copy(vecColor);
      superHaloMat.opacity = 0.35 + 0.2 * wave;
    }

    shellMat.color.copy(colShellIdle).lerp(vecColor, 0.25);
    shellMat.opacity = showHalo ? 0.18 : 0.13;

    const eqColor = showEntangle ? colEntangle : colSuper;
    equatorMat.color.copy(colGrid).lerp(eqColor, eqGlow);
    equatorMat.emissive.copy(colDark).lerp(eqColor, eqGlow * 0.45);

    northCapMat.color.copy(colCapIdle).lerp(colResult, nGlow);
    northCapMat.emissive.copy(colDark).lerp(colResult, nGlow * 0.55);
    southCapMat.color.copy(colCapIdle).lerp(colResult, sGlow);
    southCapMat.emissive.copy(colDark).lerp(colResult, sGlow * 0.55);

    probeRing.visible = showProbe;
    probeRing.position.y = probeY;

    entangleRing.visible = showEntangle;
    if (showEntangle) {
      entangleRing.rotation.z = t * 0.8;
      entangleMat.emissive.copy(colDark).lerp(colEntangle, 0.35 + 0.3 * wave);
    }
  }

  update(0);
  return { group, hero: [sphereShell, arrowTip, northBadge, southBadge], anchors, update };
}
