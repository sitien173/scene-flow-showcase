// solid-state-cell-cutaway: toon3d cutaway all-solid-state battery cell with monolithic
// solid electrolyte core (dual electrolyte + separator role), vibrating 3D crystal lattice
// with vacancy-hopping Li+ ions, optional Li-metal anode, interface gap & mechanical stack
// pressure plates, expected dendrite blocking, grain-boundary dendrite creep, and cyclic
// delamination. Origin at base centre (y = 0); cutaway faces +z.
export function solidStateCellCutaway(kit, opts = {}) {
  const { THREE } = kit;
  const {
    shellColor = "#2B3648",
    trimColor = "#4B5D78",
    electrolyteColor = "#8FA3B8",
    ionColor = "#F2A541",
    energyColor = "#E4572E",
    anodeColor = "#464C60",
    cathodeColor = "#3B5C9E",
    copperColor = "#D98245",
    aluColor = "#B4BCCB",
    liMetalColor = "#CFD8E6",
    alertColor = "#DD3428",
    goodColor = "#2D884E",
  } = opts;

  const group = new THREE.Group();
  group.name = "solid-state-cell-cutaway";

  const box = (w, h, d, mat, x, y, z, parent = group) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  const W = 3.0;
  const H = 1.8;
  const D = 1.16;
  const wall = 0.10;

  // Outer housing (matching footprint with distinct solid-state cooling ribs)
  const shellMat = kit.toon(shellColor);
  const trimMat = kit.toon(trimColor);
  box(W, wall, D, shellMat, 0, wall / 2, 0);
  box(W, H, wall, shellMat, 0, H / 2, -D / 2 + wall / 2);
  box(wall, H, D, shellMat, -W / 2 + wall / 2, H / 2, 0);
  box(wall, H, D, shellMat, W / 2 - wall / 2, H / 2, 0);
  box(W, wall, D, shellMat, 0, H - wall / 2, 0);
  // Top structural fins distinguishing solid-state pack silhouette
  for (const fx of [-0.55, -0.28, 0.0, 0.28, 0.55]) {
    box(0.08, 0.07, D * 0.72, trimMat, fx, H + 0.035, -0.04);
  }
  // Front cutaway bezel frame
  box(W, 0.06, 0.06, trimMat, 0, wall + 0.02, D / 2 - 0.03);
  box(W, 0.06, 0.06, trimMat, 0, H - wall - 0.02, D / 2 - 0.03);
  box(0.06, H - 2 * wall, 0.06, trimMat, -W / 2 + wall + 0.02, H / 2, D / 2 - 0.03);
  box(0.06, H - 2 * wall, 0.06, trimMat, W / 2 - wall - 0.02, H / 2, D / 2 - 0.03);

  // Top terminals (- on left, + on right)
  const negMat = kit.toon("#2B2D38");
  const posCollarMat = kit.toon("#B8C0CE");
  const aluMat = kit.toon(aluColor);
  const copperMat = kit.toon(copperColor);

  box(0.32, 0.08, 0.32, copperMat, -1.05, H + 0.03, 0);
  const negPost = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.18, 12), negMat);
  negPost.position.set(-1.05, H + 0.14, 0);
  group.add(negPost);
  box(0.12, 0.025, 0.03, kit.toon("#FAFCFB"), -1.05, H + 0.235, 0);

  box(0.32, 0.08, 0.32, posCollarMat, 1.05, H + 0.03, 0);
  const posPost = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.18, 12), aluMat);
  posPost.position.set(1.05, H + 0.14, 0);
  group.add(posPost);
  box(0.12, 0.025, 0.03, kit.toon("#FAFCFB"), 1.05, H + 0.235, 0);
  box(0.03, 0.025, 0.12, kit.toon("#FAFCFB"), 1.05, H + 0.235, 0);

  // Hinged front cover (SOLID-STATE badge with electrolyteColor accent bar, zero #FCD53E)
  const lidPivot = new THREE.Group();
  lidPivot.position.set(0, 0.08, D / 2 + 0.02);
  group.add(lidPivot);

  const lidTex = kit.canvasTexture(384, 224, (g, w, h) => {
    g.fillStyle = "#2E3B4E";
    g.fillRect(0, 0, w, h);
    g.strokeStyle = "#566D8A";
    g.lineWidth = 8;
    g.strokeRect(12, 12, w - 24, h - 24);
    g.fillStyle = "#FAFCFB";
    g.font = "bold 40px sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("SOLID", w / 2, h / 2 - 14);
    g.fillStyle = electrolyteColor;
    g.fillRect(w / 2 - 64, h / 2 + 24, 128, 10);
  });
  const lidFace = box(W - 0.16, H - 0.16, 0.05, kit.toon("#FFFFFF", { map: lidTex }), 0, (H - 0.16) / 2, 0.02, lidPivot);
  lidFace.name = "solid-cutaway-lid";

  // Anode shift group (-x): shifts outward when interface gap or delamination opens
  const anodeGroup = new THREE.Group();
  group.add(anodeGroup);
  box(0.08, H - 0.26, 0.90, copperMat, -1.32, H / 2, -0.02, anodeGroup);

  const graphiteMat = kit.toon(anodeColor);
  const graphiteLayers = [];
  const layerYs = [0.34, 0.60, 0.86, 1.12, 1.38];
  for (const ly of layerYs) {
    graphiteLayers.push(box(0.74, 0.085, 0.84, graphiteMat, -0.84, ly, -0.02, anodeGroup));
  }

  const liMetalMat = kit.toon(liMetalColor);
  const liMetalBlock = box(0.62, H - 0.34, 0.84, liMetalMat, -0.78, H / 2, -0.02, anodeGroup);
  liMetalBlock.visible = false;

  // Cathode shift group (+x)
  const cathodeGroup = new THREE.Group();
  group.add(cathodeGroup);
  box(0.08, H - 0.26, 0.90, aluMat, 1.32, H / 2, -0.02, cathodeGroup);
  const cathodeMat = kit.toon(cathodeColor);
  for (const ly of layerYs) {
    box(0.74, 0.085, 0.84, cathodeMat, 0.84, ly, -0.02, cathodeGroup);
  }
  const pillarMat = kit.toon("#557AC4");
  for (const px of [0.54, 0.86, 1.18]) {
    for (const pz of [-0.32, 0.28]) {
      box(0.065, H - 0.36, 0.065, pillarMat, px, H / 2, pz, cathodeGroup);
    }
  }

  // Monolithic Solid Electrolyte Core (x in [-0.42, +0.42]): performs dual role (no separate separator)
  const elecGroup = new THREE.Group();
  group.add(elecGroup);

  const elecBaseCol = new THREE.Color(electrolyteColor);
  const elecLightHex = "#" + elecBaseCol.clone().lerp(new THREE.Color("#FFFFFF"), 0.32).getHexString();
  const elecDarkHex = "#" + elecBaseCol.clone().lerp(new THREE.Color("#1E293B"), 0.30).getHexString();

  // Solid base/top/back structural casing of electrolyte slab
  const solidSlabMat = kit.toon(electrolyteColor);
  box(0.84, 0.14, 0.86, solidSlabMat, 0, 0.21, -0.02, elecGroup);
  box(0.84, 0.14, 0.86, solidSlabMat, 0, H - 0.21, -0.02, elecGroup);
  box(0.84, H - 0.56, 0.12, solidSlabMat, 0, H / 2, -0.39, elecGroup);

  // Translucent front ceramic core volume so crystal lattice & vacancy hops read clearly inside
  const coreGlassMat = new THREE.MeshToonMaterial({
    color: electrolyteColor,
    transparent: true,
    opacity: 0.36,
    depthWrite: false,
  });
  const coreGlass = new THREE.Mesh(new THREE.BoxGeometry(0.84, H - 0.56, 0.72), coreGlassMat);
  coreGlass.position.set(0, H / 2, 0.03);
  coreGlass.userData.noInk = true;
  coreGlass.renderOrder = 3;
  elecGroup.add(coreGlass);

  // 3D Crystal Lattice Framework with vibrating nodes & visible vacancy pockets
  const latticeGroup = new THREE.Group();
  elecGroup.add(latticeGroup);
  const nodeMat = kit.toon(elecLightHex);
  const strutMat = kit.toon(elecDarkHex);

  const nodeXs = [-0.28, 0.0, 0.28];
  const nodeYs = [0.46, 0.74, 1.02, 1.30];
  const nodeZs = [-0.14, 0.18];
  const latticeNodes = [];
  for (let ix = 0; ix < nodeXs.length; ix++) {
    for (let iy = 0; iy < nodeYs.length; iy++) {
      for (let iz = 0; iz < nodeZs.length; iz++) {
        // Leave central vacancy pockets open on alternating sites
        if (ix === 1 && (iy === 1 || iy === 2) && iz === 1) continue;
        const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.055, 0), nodeMat);
        m.position.set(nodeXs[ix], nodeYs[iy], nodeZs[iz]);
        latticeGroup.add(m);
        latticeNodes.push({
          mesh: m,
          bx: nodeXs[ix],
          by: nodeYs[iy],
          bz: nodeZs[iz],
          phase: kit.hash(ix * 7 + iy * 13 + iz * 29) * Math.PI * 2,
        });
      }
    }
  }
  // Thin crystal struts linking columns/rows
  for (const iy of nodeYs) {
    box(0.56, 0.022, 0.022, strutMat, 0, iy, -0.14, latticeGroup);
  }
  for (const ix of nodeXs) {
    box(0.022, 0.84, 0.022, strutMat, ix, 0.88, -0.14, latticeGroup);
  }

  // Contact / Interface roughness & warning X bars when interfaceGap > 0
  const gapIndicatorGroup = new THREE.Group();
  group.add(gapIndicatorGroup);
  const gapWarnMat = kit.toon(alertColor, { emissive: alertColor });
  const gapMarkers = [];
  for (const side of [-1, 1]) {
    for (const gy of [0.54, 0.90, 1.26]) {
      const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.052, 0), gapWarnMat);
      m.position.set(side * 0.46, gy, 0.32);
      m.userData.noInk = true;
      gapIndicatorGroup.add(m);
      gapMarkers.push(m);
    }
  }

  // Mechanical Stack Pressure Clamps (shown when stackPressure > 0)
  const pressureGroup = new THREE.Group();
  group.add(pressureGroup);
  const steelMat = kit.toon("#5A657A");
  const boltMat = kit.toon("#A8B4C6");
  const topPlate = box(W + 0.36, 0.12, D + 0.16, steelMat, 0, H + 0.36, 0, pressureGroup);
  const botPlate = box(W + 0.36, 0.10, D + 0.16, steelMat, 0, -0.05, 0, pressureGroup);
  for (const sx of [-1.62, 1.62]) {
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, H + 0.56, 10), boltMat);
    rod.position.set(sx, H / 2 + 0.16, 0);
    pressureGroup.add(rod);
  }

  // Expected Dendrite Blocking (metallic whiskers from anode blunt against x = -0.43 solid wall)
  const blockDendriteGroup = new THREE.Group();
  group.add(blockDendriteGroup);
  const whiskerMat = kit.toon("#D6DEE9");
  const goodMat = kit.toon(goodColor, { emissive: goodColor });
  const blockedWhiskers = [0.52, 0.78, 1.04, 1.26].map((wy, idx) => {
    const pivot = new THREE.Group();
    pivot.position.set(-0.56, wy, (idx % 2 === 0 ? 0.10 : -0.10));
    blockDendriteGroup.add(pivot);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.038, 0.12, 6), whiskerMat);
    stem.rotation.z = -Math.PI / 2;
    stem.position.x = 0.06;
    const bluntCap = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.095, 0.085), whiskerMat);
    bluntCap.position.x = 0.12;
    pivot.add(stem, bluntCap);
    return pivot;
  });
  const shieldSlab = new THREE.Mesh(new THREE.BoxGeometry(0.035, 1.24, 0.72), goodMat);
  shieldSlab.position.set(-0.425, H / 2, 0.02);
  shieldSlab.userData.noInk = true;
  blockDendriteGroup.add(shieldSlab);

  // Grain-boundary dendrite filaments inside solid electrolyte (twist_limits)
  const grainGroup = new THREE.Group();
  group.add(grainGroup);
  const grainLineMat = kit.toon(elecDarkHex);
  const grainFilMat = kit.toon("#DCE4F0", { emissive: "#000000" });
  const grainTipMat = kit.toon(alertColor, { emissive: alertColor });
  // Faceted diagonal grain seams
  const seam1 = box(0.76, 0.024, 0.74, grainLineMat, 0, 0.78, 0.02, grainGroup);
  seam1.rotation.z = 0.24;
  const seam2 = box(0.76, 0.024, 0.74, grainLineMat, 0, 1.08, 0.02, grainGroup);
  seam2.rotation.z = -0.20;
  // Lithium filament creeping along grain boundary seam
  const grainFilament = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.032, 0.62, 6), grainFilMat);
  grainFilament.rotation.z = -Math.PI / 2 + 0.24;
  grainFilament.position.set(-0.08, 0.76, 0.22);
  const grainTip = new THREE.Mesh(new THREE.OctahedronGeometry(0.062, 0), grainTipMat);
  grainTip.position.set(0.22, 0.83, 0.26);
  grainTip.userData.noInk = true;
  grainGroup.add(grainFilament, grainTip);

  // Stored chemical energy aura & capsules in energyColor (#E4572E)
  const energyGroup = new THREE.Group();
  group.add(energyGroup);
  const energyCol = new THREE.Color(energyColor);
  const dark = new THREE.Color("#000000");
  const energyMat = new THREE.MeshBasicMaterial({
    color: energyColor,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const eCoreL = new THREE.Mesh(new THREE.BoxGeometry(0.76, 1.24, 0.72), energyMat);
  eCoreL.position.set(-0.84, H / 2, -0.02);
  eCoreL.userData.noInk = true;
  eCoreL.renderOrder = 2;
  const eCoreR = new THREE.Mesh(new THREE.BoxGeometry(0.76, 1.24, 0.72), energyMat);
  eCoreR.position.set(0.84, H / 2, -0.02);
  eCoreR.userData.noInk = true;
  eCoreR.renderOrder = 2;
  energyGroup.add(eCoreL, eCoreR);
  const energyCapsuleMat = kit.toon(energyColor, { emissive: energyColor });
  for (const ry of [0.47, 0.73, 0.99, 1.25]) {
    const bL = box(0.50, 0.055, 0.10, energyCapsuleMat, -0.84, ry, 0.34, energyGroup);
    const bR = box(0.50, 0.055, 0.10, energyCapsuleMat, 0.84, ry, 0.34, energyGroup);
    bL.userData.noInk = true;
    bR.userData.noInk = true;
  }

  // Li+ ions (#F2A541) with white + emblem
  const ionMat = kit.toon(ionColor, { emissive: "#000000" });
  const ionCol = new THREE.Color(ionColor);
  const ionGroup = new THREE.Group();
  group.add(ionGroup);
  const plusMat = kit.toon("#FAFCFB");

  const poreYs = [0.47, 0.73, 0.99, 1.25];
  const poreZs = [-0.14, 0.06, 0.24];
  const ions = [];
  for (let r = 0; r < poreYs.length; r++) {
    for (let c = 0; c < poreZs.length; c++) {
      const idx = r * poreZs.length + c;
      const g = new THREE.Group();
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.066, 14, 10), ionMat);
      g.add(sphere);
      const hBar = new THREE.Mesh(new THREE.BoxGeometry(0.054, 0.016, 0.02), plusMat);
      hBar.position.z = 0.062;
      hBar.userData.noInk = true;
      const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.054, 0.02), plusMat);
      vBar.position.z = 0.062;
      vBar.userData.noInk = true;
      g.add(hBar, vBar);
      g.position.set(-0.84, poreYs[r], poreZs[c]);
      ionGroup.add(g);
      ions.push({
        group: g,
        y: poreYs[r],
        z: poreZs[c],
        phase: kit.hash(idx + 7),
        laneOffset: (c - 1) * 0.10,
      });
    }
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
    anode: anchor("anode", [-0.84, 0.90, 0.15]),
    cathode: anchor("cathode", [0.84, 0.90, 0.15]),
    electrolyte: anchor("electrolyte", [0, 0.90, 0.25]),
    lattice: anchor("lattice", [0, 0.88, 0.18]),
    interfaceLeft: anchor("interfaceLeft", [-0.44, 0.90, 0.28]),
    interfaceRight: anchor("interfaceRight", [0.44, 0.90, 0.28]),
    pressurePlate: anchor("pressurePlate", [0, H + 0.36, 0.25]),
    grainBoundary: anchor("grainBoundary", [0.05, 0.80, 0.26]),
    delamGap: anchor("delamGap", [-0.48, 0.90, 0.28]),
    negTerminal: anchor("negTerminal", [-1.05, H + 0.18, 0]),
    posTerminal: anchor("posTerminal", [1.05, H + 0.18, 0]),
    lid: anchor("lid", [0, 0.90, D / 2 + 0.12]),
    body: anchor("body", [0, H / 2, 0]),
  };

  const dischargePts = [
    [-0.96, 0.99, 0.06],
    [-0.36, 0.99, 0.06],
    [0.0, 0.99, 0.06],
    [0.36, 0.99, 0.06],
    [0.96, 0.99, 0.06],
  ];
  const chargePts = [...dischargePts].reverse();

  function path(name = "ionDischarge") {
    const pts = name === "ionDischarge" || name === "vacancyPath"
      ? dischargePts
      : name === "ionCharge"
        ? chargePts
        : null;
    if (!pts) throw new Error("solidStateCellCutaway: no path " + JSON.stringify(name));
    group.updateWorldMatrix(true, false);
    return pts.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  // state:
  //   openCutaway: 0..1
  //   mode: "idle" | "vacancyHop" | "discharge" | "charge"
  //   soc: 0..1
  //   liMetalAnode: 0..1
  //   interfaceGap: 0..1
  //   stackPressure: 0..1
  //   dendriteExpectedBlocked: 0..1
  //   grainDendrite: 0..1
  //   delamination: 0..1
  //   chemGlow: 0..1
  //   showIons: boolean
  function update(t, state = {}) {
    const open = kit.clamp01(state.openCutaway ?? opts.openCutaway ?? 0.9);
    lidPivot.rotation.x = open * 1.48;
    lidPivot.position.y = 0.08 - open * 0.02;
    lidPivot.position.z = D / 2 + 0.02 + open * 0.06;

    const liMetal = kit.clamp01(state.liMetalAnode ?? opts.liMetalAnode ?? 0);
    const showLiMetal = liMetal >= 0.5;
    liMetalBlock.visible = showLiMetal;
    graphiteLayers.forEach(m => { m.visible = !showLiMetal; });

    const gap = kit.clamp01(state.interfaceGap ?? opts.interfaceGap ?? 0);
    const press = kit.clamp01(state.stackPressure ?? opts.stackPressure ?? 0);
    const delam = kit.clamp01(state.delamination ?? opts.delamination ?? 0);
    const mode = state.mode ?? opts.mode ?? "idle";

    // Cyclic breathing delamination separation vs stack pressure clamping
    const delamBreath = delam * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 2.2)));
    const effectiveGap = kit.clamp01(gap * (1 - 0.80 * press) + delamBreath);
    const shiftX = effectiveGap * 0.16;
    anodeGroup.position.x = -shiftX;
    cathodeGroup.position.x = shiftX;

    gapIndicatorGroup.visible = effectiveGap > 0.18;
    if (gapIndicatorGroup.visible) {
      const pulse = 0.72 + 0.28 * Math.sin(t * 8.0);
      gapMarkers.forEach(m => { m.scale.setScalar(effectiveGap * pulse); });
    }

    pressureGroup.visible = press > 0.02;
    if (pressureGroup.visible) {
      topPlate.position.y = kit.lerp(H + 0.52, H + 0.24, press);
      botPlate.position.y = kit.lerp(-0.14, -0.04, press);
    }

    // Lattice vibration (strongest in vacancyHop mode)
    const vibAmp = mode === "vacancyHop" ? 0.024 : 0.008;
    const vibFreq = mode === "vacancyHop" ? 7.2 : 2.8;
    latticeNodes.forEach(n => {
      n.mesh.position.set(
        n.bx + Math.sin(t * vibFreq + n.phase) * vibAmp,
        n.by + Math.cos(t * vibFreq * 1.15 + n.phase) * vibAmp,
        n.bz
      );
    });

    // Expected dendrite blocking
    const blocked = kit.clamp01(state.dendriteExpectedBlocked ?? opts.dendriteExpectedBlocked ?? 0);
    blockDendriteGroup.visible = blocked > 0.02;
    if (blockDendriteGroup.visible) {
      blockedWhiskers.forEach((w, idx) => {
        const grow = kit.clamp01((blocked - idx * 0.05) / 0.7);
        w.scale.set(Math.max(0.05, grow), 1, 1);
      });
      goodMat.emissiveIntensity = 0.28 + 0.18 * Math.sin(t * 3.5);
    }

    // Grain-boundary dendrite creep inside solid core
    const grain = kit.clamp01(state.grainDendrite ?? opts.grainDendrite ?? 0);
    grainGroup.visible = grain > 0.02;
    if (grainGroup.visible) {
      const creep = grain * (0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.8)));
      grainFilament.scale.y = Math.max(0.08, creep);
      grainTip.scale.setScalar(0.75 + 0.30 * Math.sin(t * 9.0));
    }

    // Stored chemical energy glow (#E4572E)
    const chem = kit.clamp01(state.chemGlow ?? opts.chemGlow ?? 0);
    const chemPulse = 0.75 + 0.25 * Math.sin(t * 4.0);
    energyGroup.visible = chem > 0.01;
    energyMat.opacity = chem * 0.26 * chemPulse;
    energyCapsuleMat.emissive.copy(dark).lerp(energyCol, chem * 0.85 * chemPulse);
    ionMat.emissive.copy(dark).lerp(energyCol, chem * 0.30 * chemPulse).lerp(ionCol, (1 - chem) * 0.10);

    // Li+ ion motion (vacancyHop uses stepped hopping between crystal lattice sites)
    const soc = kit.clamp01(state.soc ?? opts.soc ?? 0.6);
    const showIons = state.showIons ?? opts.showIons ?? true;
    ionGroup.visible = Boolean(showIons);
    if (ionGroup.visible) {
      const hops = 4;
      ions.forEach((ion, idx) => {
        let u;
        let hopLift = 0;
        if (mode === "vacancyHop") {
          const raw = (((t * 0.36 + ion.phase) % 1) + 1) % 1;
          const seg = raw * hops;
          const k = Math.floor(seg);
          const f = seg - k;
          // Dwell 35% at vacancy site, hop briskly across remaining 65%
          const stepF = f < 0.35 ? 0 : kit.ease((f - 0.35) / 0.65, "inOut");
          u = (k + stepF) / hops;
          hopLift = Math.sin(stepF * Math.PI) * 0.055;
        } else if (mode === "discharge") {
          u = (((t * 0.30 + ion.phase + (1 - soc) * 0.3) % 1) + 1) % 1;
        } else if (mode === "charge") {
          u = 1 - (((t * 0.30 + ion.phase + soc * 0.3) % 1) + 1) % 1;
        } else {
          u = 1 - soc;
        }
        const targetX = kit.lerp(-0.92 + ion.laneOffset, 0.92 + ion.laneOffset, u);
        const bobY = Math.sin(t * 2.2 + idx * 1.1) * 0.015;
        ion.group.position.set(targetX, ion.y + hopLift + bobY, ion.z);
      });
    }
  }

  update(0);
  return { group, hero: [anodeGroup, elecGroup, cathodeGroup, lidPivot], anchors, path, update };
}
