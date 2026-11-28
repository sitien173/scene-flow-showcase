// self-driving-car: original generic low-poly toon3d autonomous vehicle (no brand design).
// Supports hero car with rooftop LiDAR + passive windshield camera, neutral traffic object state,
// multi-LiDAR rack state (DARPA 2007), minimal sensor indicator state, and #DD3428 bounding box.
// Origin at road surface [0, 0, 0] under center of car; front faces +z.
export function selfDrivingCar(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    bodyColor = "#ECEEF2",
    neutralColor = "#8C94A6",
    trimColor = "#3A3D4D",
    pulseColor = "#00B4D8",
    alertColor = "#DD3428",
  } = opts;

  const group = new THREE.Group();
  group.name = "self-driving-car";

  const flat = (m) => {
    m.flatShading = true;
    return m;
  };
  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  const bodyMat = flat(kit.toon(bodyColor));
  const trimMat = flat(kit.toon(trimColor));
  const tireMat = flat(kit.toon("#24262E"));
  const rimMat = flat(kit.toon("#A5A6AA"));
  const spokeMat = flat(kit.toon("#4C5266"));
  const roofPodMat = flat(kit.toon("#2C303D"));
  const visorMat = flat(kit.toon("#182030"));
  const accentStripeMat = flat(kit.toon(pulseColor, { emissive: "#000000" }));
  const headMat = flat(kit.toon("#FAFCFB", { emissive: "#000000" }));
  const tailMat = flat(kit.toon("#DD3428", { emissive: "#000000" }));
  const camBodyMat = flat(kit.toon("#2C303D"));
  const camLensMat = flat(kit.toon("#4868C8"));
  const alertMat = flat(kit.toon(alertColor, { emissive: alertColor }));
  alertMat.emissiveIntensity = 0.2;

  const chassis = new THREE.Group();
  group.add(chassis);

  // Lower rocker skirt and front/rear bumpers
  box(1.74, 0.22, 3.74, trimMat, 0, 0.27, 0, chassis);
  box(1.72, 0.14, 0.14, trimMat, 0, 0.24, 1.88, chassis);
  box(1.72, 0.14, 0.14, trimMat, 0, 0.24, -1.88, chassis);

  // Main body blocks (clean generic hatchback/crossover silhouette)
  const hood = box(1.68, 0.34, 1.12, bodyMat, 0, 0.54, 1.26, chassis);
  hood.rotation.x = 0.05;
  box(1.72, 0.42, 1.92, bodyMat, 0, 0.58, -0.06, chassis);
  box(1.68, 0.46, 0.94, bodyMat, 0, 0.62, -1.38, chassis);

  // Cabin pillars & roof
  box(1.44, 0.09, 1.56, bodyMat, 0, 1.44, -0.2, chassis);
  for (const sx of [-0.72, 0.72]) {
    // Front A-pillar angled
    const aPillar = box(0.08, 0.72, 0.1, trimMat, sx, 1.12, 0.68, chassis);
    aPillar.rotation.x = -0.42;
    // B-pillar (outer face at +/-0.76, clear of inset side glass at +/-0.70)
    box(0.08, 0.66, 0.12, trimMat, sx, 1.11, -0.1, chassis);
    // C-pillar
    const cPillar = box(0.08, 0.68, 0.16, trimMat, sx, 1.12, -1.04, chassis);
    cPillar.rotation.x = 0.32;
  }

  // Generic headlights & taillights
  const hlLeft = box(0.28, 0.12, 0.06, headMat, -0.58, 0.56, 1.86, chassis);
  const hlRight = box(0.28, 0.12, 0.06, headMat, 0.58, 0.56, 1.86, chassis);
  box(0.32, 0.11, 0.06, tailMat, -0.56, 0.68, -1.86, chassis);
  box(0.32, 0.11, 0.06, tailMat, 0.56, 0.68, -1.86, chassis);

  // Optional night headlight beams (noInk)
  const beamMat = new THREE.MeshBasicMaterial({
    color: "#FBFCB6",
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const headBeams = new THREE.Group();
  headBeams.visible = false;
  chassis.add(headBeams);
  for (const sx of [-0.58, 0.58]) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.8, 12, 1, true), beamMat);
    cone.rotation.x = -Math.PI / 2;
    cone.position.set(sx, 0.44, 3.25);
    cone.userData.noInk = true;
    headBeams.add(cone);
  }

  // Passive windshield camera housing & cone
  const cameraUnit = new THREE.Group();
  cameraUnit.position.set(0, 1.32, 0.58);
  chassis.add(cameraUnit);
  box(0.28, 0.1, 0.16, camBodyMat, 0, 0, 0, cameraUnit);
  for (const dx of [-0.07, 0.07]) {
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.04, 10), camLensMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(dx, 0, 0.085);
    cameraUnit.add(lens);
  }

  const camConeMat = new THREE.MeshBasicMaterial({
    color: "#FAEDB1",
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const cameraCone = new THREE.Mesh(new THREE.ConeGeometry(0.62, 2.2, 12, 1, true), camConeMat);
  cameraCone.rotation.x = -Math.PI / 2;
  cameraCone.position.set(0, -0.08, 1.18);
  cameraCone.userData.noInk = true;
  cameraCone.visible = false;
  cameraUnit.add(cameraCone);

  // Roof rack + modular LiDAR pods
  const roofRack = new THREE.Group();
  roofRack.position.set(0, 1.5, -0.15);
  chassis.add(roofRack);
  box(1.24, 0.04, 0.88, trimMat, 0, 0.02, 0, roofRack);

  const buildPod = (r, h, x, y, z, parent) => {
    const pod = new THREE.Group();
    pod.position.set(x, y, z);
    parent.add(pod);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.05, h, 14), roofPodMat);
    body.position.y = h / 2;
    pod.add(body);
    const visor = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.98, r * 0.98, h * 0.42, 14), visorMat);
    visor.position.y = h * 0.52;
    pod.add(visor);
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.03, r * 1.03, h * 0.12, 14), accentStripeMat);
    stripe.position.y = h * 0.78;
    pod.add(stripe);
    return pod;
  };

  // Hero single roof LiDAR turret
  const heroPod = buildPod(0.24, 0.28, 0, 0.04, 0.06, roofRack);

  // DARPA multi-LiDAR array (4 pods across roof rack)
  const darpaPods = new THREE.Group();
  darpaPods.visible = false;
  roofRack.add(darpaPods);
  buildPod(0.18, 0.24, -0.42, 0.04, 0.22, darpaPods);
  buildPod(0.18, 0.24, 0.42, 0.04, 0.22, darpaPods);
  buildPod(0.22, 0.26, 0, 0.04, 0.28, darpaPods);
  buildPod(0.18, 0.24, 0, 0.04, -0.26, darpaPods);

  // Minimal sensor indicator pod with no fixed mounting claim.
  const minimalPod = new THREE.Group();
  minimalPod.position.set(0, 0.92, 1.94);
  minimalPod.visible = false;
  chassis.add(minimalPod);
  box(0.32, 0.12, 0.1, roofPodMat, 0, 0, 0, minimalPod);
  box(0.22, 0.05, 0.11, accentStripeMat, 0, 0, 0.01, minimalPod);

  // Four articulated wheels grounded at y = 0 (radius = 0.34)
  const wheelR = 0.34;
  const wheelCoords = [
    [-0.82, wheelR, 1.18],
    [0.82, wheelR, 1.18],
    [-0.82, wheelR, -1.18],
    [0.82, wheelR, -1.18],
  ];
  const wheels = wheelCoords.map(([wx, wy, wz]) => {
    const w = new THREE.Group();
    w.position.set(wx, wy, wz);
    group.add(w);

    const tire = new THREE.Mesh(new THREE.CylinderGeometry(wheelR, wheelR, 0.24, 14), tireMat);
    tire.rotation.z = Math.PI / 2;
    w.add(tire);

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(wheelR * 0.56, wheelR * 0.56, 0.255, 10), rimMat);
    hub.rotation.z = Math.PI / 2;
    w.add(hub);

    const spokeA = new THREE.Mesh(new THREE.BoxGeometry(0.27, wheelR * 0.92, 0.055), spokeMat);
    const spokeB = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.055, wheelR * 0.92), spokeMat);
    w.add(spokeA, spokeB);
    return w;
  });

  // Alert bounding box (#DD3428) for classify_track
  const bboxGroup = new THREE.Group();
  bboxGroup.visible = false;
  group.add(bboxGroup);
  const bw = 1.94, bh = 1.72, bd = 4.02, bt = 0.045;
  const bar = (w, h, d, x, y, z) => box(w, h, d, alertMat, x, y, z, bboxGroup);
  for (const sx of [-bw / 2, bw / 2]) {
    for (const sy of [0.02, bh]) {
      bar(bt, bt, bd, sx, sy, 0);
    }
    for (const sz of [-bd / 2, bd / 2]) {
      bar(bt, bh, bt, sx, bh / 2, sz);
    }
  }
  for (const sy of [0.02, bh]) {
    for (const sz of [-bd / 2, bd / 2]) {
      bar(bw, bt, bt, 0, sy, sz);
    }
  }

  kit.ink(group);

  // Window glass added after ink() using windowMaterial so night/day transitions apply
  const winMat = kit.windowMaterial(PALETTE.glass, PALETTE.window);
  const addGlass = (w, h, x, y, z, rx, ry) => {
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), winMat);
    pane.position.set(x, y, z);
    pane.rotation.set(rx, ry, 0);
    pane.userData.noInk = true;
    chassis.add(pane);
    return pane;
  };
  addGlass(1.32, 0.66, 0, 1.12, 0.72, -0.44, 0); // windshield
  addGlass(1.32, 0.64, 0, 1.12, -1.04, 0.34, Math.PI); // rear glass
  addGlass(1.36, 0.56, -0.70, 1.12, -0.18, 0, -Math.PI / 2); // left side glass
  addGlass(1.36, 0.56, 0.70, 1.12, -0.18, 0, Math.PI / 2); // right side glass

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };

  const anchors = {
    body: anchor("body", [0, 0.82, 0]),
    roofMount: anchor("roofMount", [0, 1.54, -0.09]),
    windshieldCam: anchor("windshieldCam", [0, 1.32, 0.68]),
    frontBumper: anchor("frontBumper", [0, 0.45, 1.92]),
    hood: anchor("hood", [0, 0.78, 1.3]),
    rear: anchor("rear", [0, 0.72, -1.92]),
    bboxTop: anchor("bboxTop", [0, bh + 0.08, 0]),
  };

  const heroColor = new THREE.Color(bodyColor);
  const neutColor = new THREE.Color(neutralColor);
  const pulseCol = new THREE.Color(pulseColor);
  const warmLamp = new THREE.Color("#FBFCB6");
  const dark = new THREE.Color("#000000");

  function update(t, state = {}) {
    const variant = state.variant ?? "hero"; // "hero" | "neutral" | "darpa" | "minimal"
    const speed = state.speed ?? 0;
    const wheelAngle = state.wheelAngle ?? (t * speed) / wheelR;
    for (const w of wheels) w.rotation.x = wheelAngle;

    const isNeutral = variant === "neutral";
    bodyMat.color.copy(isNeutral ? neutColor : heroColor);

    const hideRoof = Boolean(state.hideRoofLidar);
    roofRack.visible = !isNeutral && variant !== "minimal";
    heroPod.visible = !hideRoof && variant === "hero";
    darpaPods.visible = !hideRoof && variant === "darpa";
    minimalPod.visible = variant === "minimal";
    cameraUnit.visible = !isNeutral;

    const coneAlpha = kit.clamp01(state.showCameraCone ?? 0);
    cameraCone.visible = coneAlpha > 0.02 && cameraUnit.visible;
    if (cameraCone.visible) camConeMat.opacity = 0.28 * coneAlpha;

    const hl = kit.clamp01(state.headlights ?? 0);
    headMat.emissive.copy(dark).lerp(warmLamp, hl * 0.85);
    headBeams.visible = hl > 0.1;
    if (headBeams.visible) beamMat.opacity = 0.2 * hl;

    const pulseGlow = kit.clamp01(state.lidarGlow ?? 0.6);
    accentStripeMat.emissive.copy(dark).lerp(pulseCol, pulseGlow * 0.75);

    const bb = kit.clamp01(state.bbox ?? 0);
    bboxGroup.visible = bb > 0.02;
    if (bboxGroup.visible) bboxGroup.scale.setScalar(0.96 + 0.04 * bb);

    // Subtle suspension bounce when moving
    chassis.position.y = speed ? Math.sin(t * 9) * 0.012 : 0;
  }

  update(0);
  return { group, hero: [chassis, ...wheels], anchors, update };
}
