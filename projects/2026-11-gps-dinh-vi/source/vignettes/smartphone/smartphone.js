// smartphone: toon3d smartphone supporting both Apple Pay mode (default) and GPS map mode,
// with cutaway back shell exposing internal antenna coil / receiver chip, blue dot, accuracy halo,
// navigation route, offline map box, and position-fix state.
// Origin at centre of the phone body; screen faces +y when lying flat.
export function smartphone(kit, opts = {}) {
  const { THREE } = kit;
  const {
    frameColor = "#2B2D38",
    backColor = "#4C5266",
    screenMode = "applePay",
  } = opts;

  const group = new THREE.Group();
  group.name = "smartphone";

  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // Main phone frame
  const body = box(0.52, 0.06, 1.02, kit.toon(frameColor), 0, 0, 0);

  // Front screen texture: either Apple Pay card UI (library default) or stylized GPS street map
  const screenTex = kit.canvasTexture(192, 360, (g, w, h) => {
    if (screenMode === "gps") {
      g.fillStyle = "#F4F2EA";
      g.fillRect(0, 0, w, h);

      // Stylized park blocks
      g.fillStyle = "#9BD06B";
      g.fillRect(16, 54, 58, 70);
      g.fillRect(114, 178, 62, 76);

      // Stylized building blocks
      g.fillStyle = "#E6E6E1";
      g.fillRect(16, 146, 58, 86);
      g.fillRect(114, 54, 62, 92);
      g.fillRect(16, 252, 72, 64);

      // Clean road grid
      g.fillStyle = "#FFFFFF";
      g.fillRect(0, 128, w, 14);
      g.fillRect(0, 236, w, 14);
      g.fillRect(84, 34, 16, h - 74);
      g.fillRect(142, 34, 10, h - 74);

      // Top status bar with fixed phone time readout
      g.fillStyle = "#18191E";
      g.fillRect(0, 0, w, 34);
      g.fillStyle = "#FAFCFB";
      g.font = "bold 16px sans-serif";
      g.textAlign = "left";
      g.fillText("08:30", 14, 23);

      // Bottom map search/action bar
      g.fillStyle = "#FAFCFB";
      g.fillRect(12, h - 42, w - 24, 30);
      g.fillStyle = "#2D7FF9";
      g.fillRect(22, h - 33, 56, 12);
    } else {
      g.fillStyle = "#18191E";
      g.fillRect(0, 0, w, h);
      g.fillStyle = "#2D7FF9";
      g.fillRect(16, 36, w - 32, 136);
      g.fillStyle = "#FCD53E";
      g.fillRect(28, 56, 34, 24);
      g.fillStyle = "#FAFCFB";
      g.fillRect(28, 134, 96, 12);
      g.beginPath();
      g.arc(w / 2, 260, 28, 0, Math.PI * 2);
      g.strokeStyle = "#2D7FF9";
      g.lineWidth = 6;
      g.stroke();
    }
  });
  box(0.46, 0.02, 0.94, kit.toon("#FFFFFF", { map: screenTex }), 0, 0.036, 0);

  // GPS dynamic screen overlays (only active when screenMode === "gps")
  const gpsOverlay = new THREE.Group();
  gpsOverlay.position.set(0, 0.048, 0);
  gpsOverlay.visible = screenMode === "gps";
  group.add(gpsOverlay);

  const haloMat = new THREE.MeshBasicMaterial({
    color: "#2D7FF9",
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
  });
  const haloDisc = new THREE.Mesh(new THREE.CircleGeometry(0.16, 28), haloMat);
  haloDisc.rotation.x = -Math.PI / 2;
  haloDisc.userData.noInk = true;
  gpsOverlay.add(haloDisc);

  const haloRingMat = new THREE.MeshBasicMaterial({
    color: "#2D7FF9",
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
  });
  const haloRing = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.165, 28), haloRingMat);
  haloRing.rotation.x = -Math.PI / 2;
  haloRing.position.y = 0.001;
  haloRing.userData.noInk = true;
  gpsOverlay.add(haloRing);

  const dotGroup = new THREE.Group();
  dotGroup.position.set(0, 0.003, 0);
  gpsOverlay.add(dotGroup);
  const dotRim = new THREE.Mesh(
    new THREE.CircleGeometry(0.036, 20),
    new THREE.MeshBasicMaterial({ color: "#FAFCFB" })
  );
  dotRim.rotation.x = -Math.PI / 2;
  dotRim.userData.noInk = true;
  const dotCoreMat = new THREE.MeshBasicMaterial({ color: "#2D7FF9" });
  const dotCore = new THREE.Mesh(new THREE.CircleGeometry(0.025, 20), dotCoreMat);
  dotCore.rotation.x = -Math.PI / 2;
  dotCore.position.y = 0.001;
  dotCore.userData.noInk = true;
  dotGroup.add(dotRim, dotCore);

  // Navigation route overlay line
  const routeGroup = new THREE.Group();
  routeGroup.position.set(0, 0.002, 0);
  routeGroup.visible = false;
  gpsOverlay.add(routeGroup);
  const routeMat = new THREE.MeshBasicMaterial({ color: "#2D7FF9", transparent: true, opacity: 0.9 });
  const routeSeg1 = new THREE.Mesh(new THREE.PlaneGeometry(0.024, 0.22), routeMat);
  routeSeg1.rotation.x = -Math.PI / 2;
  routeSeg1.position.set(0.01, 0, -0.1);
  routeSeg1.userData.noInk = true;
  const routeSeg2 = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.024), routeMat);
  routeSeg2.rotation.x = -Math.PI / 2;
  routeSeg2.position.set(0.07, 0, -0.2);
  routeSeg2.userData.noInk = true;
  routeGroup.add(routeSeg1, routeSeg2);

  // Offline download bounding box frame
  const offlineGroup = new THREE.Group();
  offlineGroup.position.set(0, 0.0025, -0.05);
  offlineGroup.visible = false;
  gpsOverlay.add(offlineGroup);
  const offMat = new THREE.MeshBasicMaterial({ color: "#2D884E", transparent: true, opacity: 0.85 });
  const offBar = (w, d, x, z) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), offMat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0, z);
    m.userData.noInk = true;
    offlineGroup.add(m);
  };
  offBar(0.32, 0.015, 0, -0.24);
  offBar(0.32, 0.015, 0, 0.24);
  offBar(0.015, 0.48, -0.155, 0);
  offBar(0.015, 0.48, 0.155, 0);

  // Internal antenna coil + receiver chip + secure module (under back cover)
  const internal = new THREE.Group();
  internal.position.set(0, -0.02, 0);
  group.add(internal);

  const coilMat = kit.toon("#D98245", { emissive: "#000000" });
  for (let i = 0; i < 2; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.15 - i * 0.035, 0.011, 6, 18), coilMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, -0.015, -0.22);
    internal.add(ring);
  }
  const chipMat = kit.toon("#2D7FF9", { emissive: "#000000" });
  box(0.14, 0.025, 0.14, chipMat, 0, -0.015, 0.04, internal);
  box(0.24, 0.022, 0.15, kit.toon("#FCD53E"), 0, -0.015, 0.27, internal);

  // Removable back cover
  const backCover = new THREE.Group();
  backCover.position.set(0, -0.035, 0);
  group.add(backCover);
  box(0.5, 0.025, 0.98, kit.toon(backColor), 0, 0, 0, backCover);
  box(0.16, 0.03, 0.18, kit.toon("#2B2D38"), -0.14, -0.015, -0.34, backCover);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    coil: anchor("coil", [0, 0, -0.22]),
    chip: anchor("chip", [0, 0, 0.04]),
    realCard: anchor("realCard", [0, 0, 0.27]),
    screen: anchor("screen", [0, 0.06, 0]),
    blueDot: anchor("blueDot", [0, 0.06, 0]),
    body: anchor("body", [0, 0, 0]),
  };

  const coilBase = new THREE.Color("#D98245");
  const coilHot = new THREE.Color("#FCD53E");
  const chipBase = new THREE.Color("#2D7FF9");
  const fixCol = new THREE.Color("#2D884E");
  const dotBase = new THREE.Color("#2D7FF9");
  const dark = new THREE.Color("#000000");

  function update(t, state = {}) {
    const cut = kit.clamp01(state.cutaway ?? 0);
    backCover.position.set(0, -0.035 - cut * 0.38, -cut * 0.1);
    backCover.rotation.x = cut * 0.22;

    const glow = kit.clamp01(state.coilGlow ?? 0);
    coilMat.color.copy(coilBase).lerp(coilHot, glow * 0.8);
    coilMat.emissive.copy(dark).lerp(coilHot, glow * 0.45);

    const pulse = kit.clamp01(state.cardPulse ?? 0);
    const fix = kit.clamp01(state.fix ?? 0);
    chipMat.color.copy(chipBase).lerp(fixCol, fix);
    chipMat.emissive.copy(dark).lerp(fix > 0.1 ? fixCol : chipBase, Math.max(pulse, fix) * 0.6);

    if (screenMode === "gps") {
      const halo = kit.clamp01(state.haloRadius ?? 0.35);
      const haloVis = halo > 0.02;
      haloDisc.visible = haloVis;
      haloRing.visible = haloVis;
      const hs = 0.25 + halo * 0.95;
      haloDisc.scale.setScalar(hs);
      haloRing.scale.setScalar(hs);
      haloMat.opacity = 0.2 + 0.12 * halo;

      const dp = kit.clamp01(state.dotPulse ?? 0);
      dotGroup.scale.setScalar(1 + 0.15 * dp * Math.sin(t * 5));
      dotCoreMat.color.copy(dotBase).lerp(fixCol, fix * 0.85);

      const r = kit.clamp01(state.route ?? 0);
      routeGroup.visible = r > 0.02;
      routeMat.opacity = 0.9 * r;

      const off = kit.clamp01(state.offline ?? 0);
      offlineGroup.visible = off > 0.02;
      offMat.opacity = 0.85 * off;
    }
  }

  update(0);
  return { group, hero: [body], anchors, update };
}
