// brain-cutaway: toon3d stylized head & cerebral cortex cutaway on a lab pedestal,
// featuring a hinged skull cap, folded motor cortex with #00B4D8 hand-area glow,
// #2D884E feedback halo, and 1 or 2 implantable 96-channel (4x4 mm) microelectrode arrays.
// Origin at base centre (y = 0); face looks toward +z.
export function brainCutaway(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    skinColor = PALETTE.wall || "#EFC7AD",
    brainColor = "#F2B8B5",
    mode = "cutawayOpen",
    arrayCount = 1,
  } = opts;

  const group = new THREE.Group();
  group.name = "brain-cutaway";

  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };
  const cyl = (rt, rb, h, segs, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, segs), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // 1. Lab pedestal & neck column
  const standGroup = new THREE.Group();
  standGroup.name = "pedestal";
  group.add(standGroup);
  cyl(0.56, 0.62, 0.08, 16, kit.toon("#2B2D38"), 0, 0.04, 0, standGroup);
  cyl(0.42, 0.46, 0.05, 16, kit.toon("#4868C8"), 0, 0.105, 0, standGroup);
  const skinMat = kit.toon(skinColor);
  cyl(0.24, 0.30, 0.42, 14, skinMat, 0, 0.33, -0.04, standGroup);

  // 2. Head & lower skull bowl (cutaway at y = 1.24 in head-local coords)
  const headGroup = new THREE.Group();
  headGroup.name = "head";
  headGroup.position.set(0, 0.52, 0);
  group.add(headGroup);

  // Lower cranial bowl
  const lowerGeo = new THREE.SphereGeometry(0.64, 18, 12, 0, Math.PI * 2, Math.PI * 0.46, Math.PI * 0.54);
  const lowerSkull = new THREE.Mesh(lowerGeo, skinMat);
  lowerSkull.scale.set(0.92, 1.06, 1.08);
  lowerSkull.position.set(0, 0.66, 0);
  headGroup.add(lowerSkull);

  // Facial landmarks on +z so front direction reads unmistakably
  const chin = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.24, 0.32), skinMat);
  chin.position.set(0, 0.24, 0.40);
  headGroup.add(chin);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.22, 4), skinMat);
  nose.rotation.y = Math.PI / 4;
  nose.rotation.x = 0.28;
  nose.position.set(0, 0.47, 0.68);
  headGroup.add(nose);

  const browMat = kit.toon("#3A3F52");
  box(0.16, 0.038, 0.05, browMat, -0.19, 0.58, 0.62, headGroup);
  box(0.16, 0.038, 0.05, browMat, 0.19, 0.58, 0.62, headGroup);

  const eyeMat = kit.toon("#1C1C20");
  box(0.11, 0.035, 0.04, eyeMat, -0.19, 0.49, 0.635, headGroup);
  box(0.11, 0.035, 0.04, eyeMat, 0.19, 0.49, 0.635, headGroup);

  for (const sx of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.12, 0.07, 10), skinMat);
    ear.rotation.z = Math.PI / 2;
    ear.position.set(sx * 0.61, 0.50, -0.02);
    headGroup.add(ear);
  }

  // Thick cutaway bone collar at the horizontal skull section plane
  const boneMat = kit.toon("#FAFCFB");
  const rimRing = new THREE.Mesh(new THREE.TorusGeometry(0.57, 0.048, 8, 24), boneMat);
  rimRing.rotation.x = Math.PI / 2;
  rimRing.scale.set(0.92, 1.08, 1);
  rimRing.position.set(0, 0.72, 0);
  headGroup.add(rimRing);

  const innerFloor = new THREE.Mesh(new THREE.CylinderGeometry(0.54, 0.54, 0.04, 20), kit.toon("#D9C5B8"));
  innerFloor.scale.set(0.92, 1, 1.08);
  innerFloor.position.set(0, 0.70, 0);
  headGroup.add(innerFloor);

  // 3. Exposed cerebral hemispheres with sculpted gyri folds & motor cortex strip
  const brainGroup = new THREE.Group();
  brainGroup.name = "brain-cortex";
  brainGroup.position.set(0, 0.74, 0);
  headGroup.add(brainGroup);

  const makeHemisphere = (side) => {
    const geo = new THREE.SphereGeometry(0.46, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.64);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);
      const fold = 1 + 0.065 * Math.sin(x * 16 + z * 10) * Math.cos(z * 14 - y * 8);
      x *= 0.56 * fold;
      y *= 0.98 * fold;
      z *= 1.18 * fold;
      pos.setXYZ(i, x, y, z);
    }
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, kit.toon(brainColor));
    mesh.position.set(side * 0.24, 0.02, 0);
    return mesh;
  };
  const leftHemi = makeHemisphere(-1);
  const rightHemi = makeHemisphere(1);
  brainGroup.add(leftHemi, rightHemi);

  // Motor cortex coronal arch & hand-knob patches (#00B4D8 neural signal)
  const cortexMat = kit.toon("#E28B92", { emissive: "#000000" });
  const motorStrip = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.055, 8, 18, Math.PI * 0.85), cortexMat);
  motorStrip.rotation.z = Math.PI * 0.075;
  motorStrip.position.set(0, 0.16, 0.04);
  brainGroup.add(motorStrip);

  const handPatchMat1 = kit.toon(brainColor, { emissive: "#000000" });
  const handPatch1 = new THREE.Mesh(new THREE.SphereGeometry(0.145, 12, 10), handPatchMat1);
  handPatch1.scale.set(1.05, 0.55, 1.15);
  handPatch1.position.set(0.24, 0.42, 0.04);
  brainGroup.add(handPatch1);

  const handPatchMat2 = kit.toon(brainColor, { emissive: "#000000" });
  const handPatch2 = new THREE.Mesh(new THREE.SphereGeometry(0.145, 12, 10), handPatchMat2);
  handPatch2.scale.set(1.05, 0.55, 1.15);
  handPatch2.position.set(-0.24, 0.42, 0.04);
  brainGroup.add(handPatch2);

  // Feedback visual halo (#2D884E) around cortex rim
  const fbRingMat = new THREE.MeshBasicMaterial({
    color: "#2D884E",
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const fbRing = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.028, 8, 28), fbRingMat);
  fbRing.rotation.x = Math.PI / 2;
  fbRing.scale.set(0.92, 1.06, 1);
  fbRing.position.set(0, 0.05, 0);
  fbRing.userData.noInk = true;
  brainGroup.add(fbRing);

  // 4. Removable upper skull cutaway lid
  const lidGroup = new THREE.Group();
  lidGroup.name = "skull-lid";
  lidGroup.position.set(0, 0.72, 0);
  headGroup.add(lidGroup);

  const lidDomeGeo = new THREE.SphereGeometry(0.65, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.46);
  const lidDome = new THREE.Mesh(lidDomeGeo, skinMat);
  lidDome.scale.set(0.92, 1.06, 1.08);
  lidDome.position.set(0, -0.06, 0);
  lidGroup.add(lidDome);

  const lidUnderside = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 0.03, 20), boneMat);
  lidUnderside.scale.set(0.92, 1, 1.08);
  lidUnderside.position.set(0, 0.02, 0);
  lidGroup.add(lidUnderside);

  // Stylized hair tuft on top of lid for silhouette charm (offset outward to avoid z-fighting)
  const hairMat = kit.toon("#2B2D38");
  const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.68, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.28), hairMat);
  hairCap.scale.set(0.95, 1.09, 1.11);
  hairCap.position.set(0, -0.04, -0.02);
  lidGroup.add(hairCap);

  // 5. Implantable 96-channel (4x4 mm) microelectrode arrays (1 or 2)
  const buildArray = (name, sideX) => {
    const arr = new THREE.Group();
    arr.name = name;
    arr.position.set(sideX, 0.52, 0.04);
    brainGroup.add(arr);

    // Ceramic & silicon substrate pad
    box(0.20, 0.036, 0.20, kit.toon("#383E52"), 0, 0.03, 0, arr);
    box(0.15, 0.024, 0.15, kit.toon("#F59E0B"), 0, 0.054, 0, arr);

    // 4x4 grid of visible microelectrode pins penetrating cortex
    const pinMat = kit.toon("#FCD53E");
    for (let ix = -1.5; ix <= 1.5; ix += 1) {
      for (let iz = -1.5; iz <= 1.5; iz += 1) {
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.003, 0.09, 6), pinMat);
        pin.position.set(ix * 0.042, -0.028, iz * 0.042);
        arr.add(pin);
      }
    }

    // Lead wire & cyan neural signal chevron beads along cable
    const cablePts = [
      new THREE.Vector3(0, 0.065, 0),
      new THREE.Vector3(sideX * 0.12, 0.20, -0.08),
      new THREE.Vector3(sideX * 0.34, 0.28, -0.20),
      new THREE.Vector3(sideX * 0.52, 0.22, -0.34),
    ];
    const cableCurve = new THREE.CatmullRomCurve3(cablePts, false, "catmullrom", 0.3);
    const cableMat = kit.toon("#2B2D38");
    const cable = new THREE.Mesh(new THREE.TubeGeometry(cableCurve, 18, 0.022, 6, false), cableMat);
    arr.add(cable);
    const endPlug = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.06, 8), kit.toon("#4868C8"));
    endPlug.position.copy(cablePts[3]);
    endPlug.rotation.z = Math.PI / 2;
    arr.add(endPlug);

    const pulseNodes = [];
    for (let i = 0; i < 3; i++) {
      const pMat = new THREE.MeshBasicMaterial({ color: "#00B4D8", transparent: true, opacity: 0.9 });
      const pMesh = new THREE.Mesh(new THREE.SphereGeometry(0.034, 8, 6), pMat);
      pMesh.userData.noInk = true;
      arr.add(pMesh);
      pulseNodes.push({ mesh: pMesh, mat: pMat, idx: i });
    }

    return { group: arr, cableCurve, pulseNodes, sideX };
  };

  const array1 = buildArray("micro-array-1", 0.24);
  const array2 = buildArray("micro-array-2", -0.24);

  kit.ink(group);

  const anchor = (name, p, parent = group) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    parent.add(o);
    return o;
  };
  const anchors = {
    body: anchor("body", [0, 1.05, 0]),
    head: anchor("head", [0, 1.12, 0]),
    cortex: anchor("cortex", [0, 1.58, 0.04]),
    handArea: anchor("handArea", [0.24, 1.69, 0.04]),
    array1: anchor("array1", [0.24, 1.76, 0.04]),
    array2: anchor("array2", [-0.24, 1.76, 0.04]),
    cableOut: anchor("cableOut", [0.76, 1.48, -0.30]),
    lid: anchor("lid", [0, 0.35, 0], lidGroup),
  };

  const colDark = new THREE.Color("#000000");
  const colBrain = new THREE.Color(brainColor);
  const colStripBase = new THREE.Color("#E28B92");
  const colNeural = new THREE.Color("#00B4D8");

  function update(t, state = {}) {
    const m = state.mode ?? mode;
    const isIdle = m === "idle";
    const isLit = m === "cortexLit" || m === "implanted" || m === "cutawayOpen";
    const isImplanted = m === "implanted";

    const cut = kit.clamp01(
      state.cutaway ?? (isIdle ? 0.12 : m === "cutawayOpen" ? 1.0 : 0.92)
    );
    const lit = kit.clamp01(
      state.cortexLit ?? (isIdle ? 0.1 : m === "cortexLit" ? 1.0 : isImplanted ? 0.9 : 0.65)
    );
    const imp = kit.clamp01(
      state.implanted ?? (isImplanted ? 1.0 : m === "cutawayOpen" ? 0.35 : 0.0)
    );
    const nArr = state.arrayCount ?? arrayCount;
    const fb = kit.clamp01(state.feedback ?? 0);

    // Skull cutaway lid lifts cleanly back and up
    lidGroup.position.set(0, 0.72 + cut * 0.66, -cut * 0.58);
    lidGroup.rotation.x = -cut * 0.54;

    // Motor cortex & hand area #00B4D8 neural glow
    const pulse = 0.5 + 0.5 * Math.sin(t * 5.0);
    const stripGlow = lit * (0.45 + 0.35 * pulse);
    cortexMat.color.copy(colStripBase).lerp(colNeural, lit * 0.72);
    cortexMat.emissive.copy(colDark).lerp(colNeural, stripGlow * 0.6);

    handPatchMat1.color.copy(colBrain).lerp(colNeural, lit * 0.85);
    handPatchMat1.emissive.copy(colDark).lerp(colNeural, lit * (0.38 + 0.42 * pulse));

    const secondActive = nArr >= 2 ? lit : lit * 0.35;
    handPatchMat2.color.copy(colBrain).lerp(colNeural, secondActive * 0.85);
    handPatchMat2.emissive.copy(colDark).lerp(colNeural, secondActive * (0.35 + 0.4 * pulse));

    // Feedback #2D884E ring
    fbRing.visible = fb > 0.02;
    fbRingMat.opacity = fb * (0.55 + 0.3 * Math.sin(t * 4.0));
    fbRing.scale.set(0.92 * (0.95 + 0.08 * fb), 1.06 * (0.95 + 0.08 * fb), 1);

    // Update 1 or 2 microelectrode arrays
    const updateArr = (arr, show) => {
      arr.group.visible = show && imp > 0.02;
      if (!arr.group.visible) return;
      const drop = kit.clamp01(state.implantDrop ?? imp);
      const ySeat = kit.lerp(0.92, 0.47, kit.ease(drop, "out"));
      arr.group.position.set(arr.sideX, ySeat, 0.04);
      arr.group.scale.setScalar(kit.lerp(0.65, 1.0, kit.clamp01(imp * 1.4)));
      const showPulses = lit > 0.15 && drop > 0.75;
      for (const pn of arr.pulseNodes) {
        pn.mesh.visible = showPulses;
        if (showPulses) {
          const u = ((t * 0.85 + pn.idx / 3) % 1 + 1) % 1;
          pn.mesh.position.copy(arr.cableCurve.getPointAt(u));
          const s = 0.75 + 0.45 * Math.sin(u * Math.PI);
          pn.mesh.scale.setScalar(s);
          pn.mat.opacity = lit * Math.sin(u * Math.PI);
        }
      }
    };
    updateArr(array1, true);
    updateArr(array2, nArr >= 2);
  }

  update(0);
  return { group, hero: [headGroup, brainGroup, lidGroup], anchors, update };
}
