// cell-cutaway: toon3d cutaway lithium-ion prismatic cell with sliding front cover,
// layered graphite anode (or pure metallic lithium in old-cell mode), porous separator
// with open micrometre-scale channels, crystalline metal-oxide cathode with intercalation
// pockets, internal purple Li+ ions, optional dendrite whiskers, orange chemical-energy
// aura, and cycle degradation state. Origin at base centre (y = 0); cutaway faces +z.
export function cellCutaway(kit, opts = {}) {
  const { THREE } = kit;
  const {
    shellColor = "#33384A",
    trimColor = "#4C536B",
    anodeColor = "#464C60",
    cathodeColor = "#3B5C9E",
    separatorColor = "#F4F2EA",
    ionColor = "#F2A541",
    energyColor = "#E4572E",
    copperColor = "#D98245",
    aluColor = "#B4BCCB",
  } = opts;

  const group = new THREE.Group();
  group.name = "cell-cutaway";

  const box = (w, h, d, mat, x, y, z, parent = group) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  // Outer prismatic housing (open front window facing +z)
  const shellMat = kit.toon(shellColor);
  const trimMat = kit.toon(trimColor);
  const W = 3.0;
  const H = 1.8;
  const D = 1.16;
  const wall = 0.10;

  // Base, back, left, right, top rim walls
  box(W, wall, D, shellMat, 0, wall / 2, 0);
  box(W, H, wall, shellMat, 0, H / 2, -D / 2 + wall / 2);
  box(wall, H, D, shellMat, -W / 2 + wall / 2, H / 2, 0);
  box(wall, H, D, shellMat, W / 2 - wall / 2, H / 2, 0);
  box(W, wall, D, shellMat, 0, H - wall / 2, 0);
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

  // Removable front cutaway cover hinged on bottom-front edge
  const lidPivot = new THREE.Group();
  lidPivot.position.set(0, 0.08, D / 2 + 0.02);
  group.add(lidPivot);

  const lidTex = kit.canvasTexture(384, 224, (g, w, h) => {
    g.fillStyle = "#3E455B";
    g.fillRect(0, 0, w, h);
    g.strokeStyle = "#5B6482";
    g.lineWidth = 8;
    g.strokeRect(12, 12, w - 24, h - 24);
    g.fillStyle = "#FAFCFB";
    g.font = "bold 44px sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("Li-ion", w / 2, h / 2 - 14);
    g.fillStyle = "#8FA3B8";
    g.fillRect(w / 2 - 58, h / 2 + 24, 116, 10);
  });
  const lidFace = box(W - 0.16, H - 0.16, 0.05, kit.toon("#FFFFFF", { map: lidTex }), 0, (H - 0.16) / 2, 0.02, lidPivot);
  lidFace.name = "cutaway-lid";

  // Anode side (-x): copper collector + 5 layered graphite sheets + optional pure Li block
  const anodeGroup = new THREE.Group();
  group.add(anodeGroup);
  box(0.08, H - 0.26, 0.90, copperMat, -1.33, H / 2, -0.02, anodeGroup);

  const graphiteBaseCol = new THREE.Color(anodeColor);
  const graphiteWearCol = new THREE.Color("#5E5654");
  const graphiteLayers = [];
  const layerYs = [0.34, 0.60, 0.86, 1.12, 1.38];
  for (let i = 0; i < layerYs.length; i++) {
    const mat = kit.toon(anodeColor, { emissive: "#000000" });
    const slab = box(0.84, 0.085, 0.84, mat, -0.84, layerYs[i], -0.02, anodeGroup);
    graphiteLayers.push({ mesh: slab, mat, baseY: layerYs[i], baseX: -0.84 });
  }

  // Pure metallic lithium anode block (shown in dendrite / pre-1991 cell mode)
  const pureLiMat = kit.toon("#B8C2D1");
  const pureLiBlock = box(0.76, H - 0.34, 0.84, pureLiMat, -0.86, H / 2, -0.02, anodeGroup);
  pureLiBlock.visible = false;

  // Dendrite whiskers growing from anode toward cathode across separator
  const dendriteGroup = new THREE.Group();
  dendriteGroup.position.set(-0.46, 0, 0);
  group.add(dendriteGroup);
  const whiskerSpecs = [
    { y: 0.50, z: -0.18, len: 0.90, tilt: 0.08 },
    { y: 0.72, z: 0.12, len: 0.96, tilt: -0.06 },
    { y: 0.90, z: -0.04, len: 1.02, tilt: 0.03 },
    { y: 1.10, z: 0.20, len: 0.88, tilt: -0.09 },
    { y: 1.28, z: -0.14, len: 0.82, tilt: 0.05 },
  ];
  const whiskerMat = kit.toon("#CFD6E3");
  const sparkMat = kit.toon("#DD3428", { emissive: "#DD3428" });
  const whiskers = whiskerSpecs.map(spec => {
    const pivot = new THREE.Group();
    pivot.position.set(0, spec.y, spec.z);
    pivot.rotation.z = spec.tilt;
    dendriteGroup.add(pivot);
    const shaft = new THREE.Mesh(new THREE.ConeGeometry(0.038, spec.len, 6), whiskerMat);
    shaft.rotation.z = -Math.PI / 2;
    shaft.position.x = spec.len / 2;
    pivot.add(shaft);
    const barb = new THREE.Mesh(new THREE.ConeGeometry(0.022, spec.len * 0.42, 5), whiskerMat);
    barb.rotation.z = -Math.PI / 2 + 0.45;
    barb.position.set(spec.len * 0.45, 0.06, 0);
    pivot.add(barb);
    const spark = new THREE.Mesh(new THREE.OctahedronGeometry(0.088, 0), sparkMat);
    spark.position.set(spec.len, 0, 0.08);
    spark.userData.noInk = true;
    pivot.add(spark);
    return { pivot, spark, len: spec.len };
  });

  // Porous separator (x = 0): real open lattice pores so Li+ passes cleanly through gaps
  const sepGroup = new THREE.Group();
  group.add(sepGroup);
  const sepMat = kit.toon(separatorColor);
  const sepD = 0.86;
  const sepH = H - 0.24;
  // Vertical ribs creating 3 Z-columns of pores (z = -0.22, 0.0, +0.22)
  for (const rz of [-0.36, -0.11, 0.11, 0.36]) {
    box(0.09, sepH, 0.08, sepMat, 0, H / 2, rz, sepGroup);
  }
  // Horizontal ribs (slightly narrower in X to avoid coplanar overlap with vertical ribs)
  for (const ry of [0.22, 0.34, 0.60, 0.86, 1.12, 1.38, 1.58]) {
    box(0.078, 0.06, sepD, sepMat, 0, ry, 0, sepGroup);
  }

  // Cathode side (+x): aluminum collector + rigid metal-oxide crystal lattice shelves
  const cathodeGroup = new THREE.Group();
  group.add(cathodeGroup);
  box(0.08, H - 0.26, 0.90, aluMat, 1.33, H / 2, -0.02, cathodeGroup);

  const cathodeBaseCol = new THREE.Color(cathodeColor);
  const cathodeWearCol = new THREE.Color("#525B70");
  const cathodeShelves = [];
  for (let i = 0; i < layerYs.length; i++) {
    const mat = kit.toon(cathodeColor, { emissive: "#000000" });
    const shelf = box(0.84, 0.085, 0.84, mat, 0.84, layerYs[i], -0.02, cathodeGroup);
    cathodeShelves.push({ mesh: shelf, mat, baseY: layerYs[i], baseX: 0.84 });
  }
  // Vertical crystal lattice pillars framing the intercalation pockets
  const pillarMat = kit.toon("#557AC4");
  for (const px of [0.46, 0.84, 1.20]) {
    for (const pz of [-0.34, 0.30]) {
      box(0.07, H - 0.36, 0.07, pillarMat, px, H / 2, pz, cathodeGroup);
    }
  }

  // Stored chemical energy aura cores (orange #F97316) inside chamber for Payoff
  const energyGroup = new THREE.Group();
  group.add(energyGroup);
  const energyCol = new THREE.Color(energyColor);
  const energyMat = new THREE.MeshBasicMaterial({
    color: energyColor,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const energyCoreL = new THREE.Mesh(new THREE.BoxGeometry(0.88, 1.24, 0.72), energyMat);
  energyCoreL.position.set(-0.84, H / 2, -0.02);
  energyCoreL.userData.noInk = true;
  energyCoreL.renderOrder = 2;
  const energyCoreR = new THREE.Mesh(new THREE.BoxGeometry(0.88, 1.24, 0.72), energyMat);
  energyCoreR.position.set(0.84, H / 2, -0.02);
  energyCoreR.userData.noInk = true;
  energyCoreR.renderOrder = 2;
  energyGroup.add(energyCoreL, energyCoreR);
  // Crisp orange energy capsules tucked inside electrode gaps
  const energyCapsuleMat = kit.toon(energyColor, { emissive: energyColor });
  for (const ry of [0.47, 0.73, 0.99, 1.25]) {
    const barL = box(0.58, 0.055, 0.10, energyCapsuleMat, -0.84, ry, 0.34, energyGroup);
    const barR = box(0.58, 0.055, 0.10, energyCapsuleMat, 0.84, ry, 0.34, energyGroup);
    barL.userData.noInk = true;
    barR.userData.noInk = true;
  }

  // Internal purple Li+ ions navigating anode <-> separator pores <-> cathode pockets
  const ionMat = kit.toon(ionColor, { emissive: "#000000" });
  const ionCol = new THREE.Color(ionColor);
  const ionGroup = new THREE.Group();
  group.add(ionGroup);

  const poreYs = [0.47, 0.73, 0.99, 1.25];
  const poreZs = [-0.22, 0.0, 0.22];
  const ions = [];
  for (let r = 0; r < poreYs.length; r++) {
    for (let c = 0; c < poreZs.length; c++) {
      const idx = r * poreZs.length + c;
      const g = new THREE.Group();
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.068, 14, 10), ionMat);
      g.add(sphere);
      // Subtle + emblem on front of ion
      const plusMat = kit.toon("#FAFCFB");
      const hBar = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.016, 0.02), plusMat);
      hBar.position.z = 0.064;
      hBar.userData.noInk = true;
      const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.056, 0.02), plusMat);
      vBar.position.z = 0.064;
      vBar.userData.noInk = true;
      g.add(hBar, vBar);
      g.position.set(-0.84, poreYs[r], poreZs[c]);
      ionGroup.add(g);
      ions.push({
        group: g,
        y: poreYs[r],
        z: poreZs[c],
        phase: kit.hash(idx + 3),
        laneOffset: (c - 1) * 0.14,
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
    separator: anchor("separator", [0, 0.90, 0.25]),
    chamber: anchor("chamber", [0, 0.90, 0]),
    negTerminal: anchor("negTerminal", [-1.05, H + 0.18, 0]),
    posTerminal: anchor("posTerminal", [1.05, H + 0.18, 0]),
    crystalSlot: anchor("crystalSlot", [0.76, 0.99, 0.22]),
    dendriteTip: anchor("dendriteTip", [0.15, 0.90, 0]),
    lid: anchor("lid", [0, 0.90, D / 2 + 0.12]),
    body: anchor("body", [0, H / 2, 0]),
  };

  const dischargePts = [
    [-1.02, 0.99, 0.0],
    [-0.50, 0.99, 0.0],
    [0.0, 0.99, 0.0],
    [0.50, 0.99, 0.0],
    [1.02, 0.99, 0.0],
  ];
  const chargePts = [...dischargePts].reverse();

  function path(name = "ionDischarge") {
    const pts = name === "ionDischarge" ? dischargePts : name === "ionCharge" ? chargePts : null;
    if (!pts) throw new Error("cellCutaway: no path " + JSON.stringify(name) + "; use ionDischarge or ionCharge");
    group.updateWorldMatrix(true, false);
    return pts.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const dark = new THREE.Color("#000000");

  // state:
  //   openCutaway: 0..1 (0 closed casing, 1 front cover hinged flat open)
  //   mode: "idle" | "discharge" | "charge" | "rocking"
  //   soc: 0..1 (1 = ions in anode, 0 = ions in cathode; overrides auto drift if ionProgress unset)
  //   ionProgress: optional 0..1 explicit transit position (0 = anode, 0.5 = separator, 1 = cathode)
  //   pureLithium: 0..1 (replaces layered graphite with solid Li metal)
  //   dendrite: 0..1 (grows metallic whiskers across separator + short spark)
  //   chemGlow: 0..1 (illuminates orange stored chemical energy inside electrodes)
  //   degraded: 0..1 (shifts/warps electrode layers and dulls tone)
  //   showIons: boolean (default true)
  //   tilt: optional radians override for rocking
  function update(t, state = {}) {
    const open = kit.clamp01(state.openCutaway ?? opts.openCutaway ?? 0.9);
    lidPivot.rotation.x = open * 1.48;
    lidPivot.position.y = 0.08 - open * 0.02;
    lidPivot.position.z = D / 2 + 0.02 + open * 0.06;

    const pureLi = kit.clamp01(state.pureLithium ?? opts.pureLithium ?? 0);
    const showGraphite = pureLi < 0.5;
    pureLiBlock.visible = !showGraphite;

    const wear = kit.clamp01(state.degraded ?? opts.degraded ?? 0);
    graphiteLayers.forEach((layer, idx) => {
      layer.mesh.visible = showGraphite;
      const dx = wear * (kit.hash(idx + 11) - 0.5) * 0.14;
      const dy = wear * (kit.hash(idx + 23) - 0.5) * 0.06;
      const rz = wear * (kit.hash(idx + 37) - 0.5) * 0.08;
      layer.mesh.position.set(layer.baseX + dx, layer.baseY + dy, -0.02);
      layer.mesh.rotation.z = rz;
      layer.mat.color.copy(graphiteBaseCol).lerp(graphiteWearCol, wear);
    });
    cathodeShelves.forEach((shelf, idx) => {
      const dy = wear * (kit.hash(idx + 51) - 0.5) * 0.04;
      shelf.mesh.position.set(shelf.baseX, shelf.baseY + dy, -0.02);
      shelf.mat.color.copy(cathodeBaseCol).lerp(cathodeWearCol, wear * 0.85);
    });

    const dend = kit.clamp01(state.dendrite ?? opts.dendrite ?? 0);
    dendriteGroup.visible = dend > 0.02;
    if (dendriteGroup.visible) {
      const pulse = 0.65 + 0.35 * Math.sin(t * 14);
      whiskers.forEach((w, idx) => {
        const g = kit.clamp01((dend - idx * 0.08) / 0.68);
        w.pivot.visible = g > 0.01;
        w.pivot.scale.set(Math.max(0.02, g), 0.7 + 0.3 * g, 0.7 + 0.3 * g);
        w.spark.visible = g > 0.82;
        w.spark.scale.setScalar(0.75 + 0.45 * pulse);
      });
    }

    const chem = kit.clamp01(state.chemGlow ?? opts.chemGlow ?? 0);
    const chemPulse = 0.75 + 0.25 * Math.sin(t * 4.0);
    energyGroup.visible = chem > 0.01;
    energyMat.opacity = chem * 0.28 * chemPulse;
    energyCapsuleMat.emissive.copy(dark).lerp(energyCol, chem * 0.85 * chemPulse);
    ionMat.emissive.copy(dark).lerp(energyCol, chem * 0.35 * chemPulse).lerp(ionCol, (1 - chem) * 0.12);

    const mode = state.mode ?? opts.mode ?? "idle";
    const soc = kit.clamp01(state.soc ?? opts.soc ?? 0.6);
    const showIons = state.showIons ?? opts.showIons ?? true;
    ionGroup.visible = Boolean(showIons);

    if (mode === "rocking") {
      group.rotation.z = state.tilt ?? Math.sin(t * 1.9) * 0.13;
    } else {
      group.rotation.z = state.tilt ?? 0;
    }

    if (ionGroup.visible) {
      ions.forEach((ion, idx) => {
        let u;
        if (typeof state.ionProgress === "number") {
          u = kit.clamp01(state.ionProgress + (ion.phase - 0.5) * 0.14);
        } else if (mode === "discharge") {
          u = ((t * 0.32 + ion.phase + (1 - soc) * 0.35) % 1 + 1) % 1;
        } else if (mode === "charge") {
          u = 1 - (((t * 0.32 + ion.phase + soc * 0.35) % 1 + 1) % 1);
        } else if (mode === "rocking") {
          u = 0.5 - 0.44 * Math.sin(t * 1.9 + (ion.phase - 0.5) * 0.35);
        } else {
          u = 1 - soc;
        }
        // Smoothly map u in [0..1] from anode (-1.04..-0.54) -> separator pore (0) -> cathode (+0.54..+1.04)
        const targetX = kit.lerp(-0.98 + ion.laneOffset, 0.98 + ion.laneOffset, u);
        const bobY = Math.sin(t * 2.4 + idx * 1.3) * 0.018;
        ion.group.position.set(targetX, ion.y + bobY, ion.z);
      });
    }
  }

  update(0);
  return { group, hero: [anodeGroup, sepGroup, cathodeGroup, lidPivot], anchors, path, update };
}
