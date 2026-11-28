// indoor-room: original toon3d architectural house cutaway with outdoor winter/summer yard,
// removable front wall, thermal comfort air circulation (#F08A4B), geothermal ground/water
// section (a1b), and domestic sanitary hot-water tank.
// Origin at floor center; outdoor yard is to the left (-x), indoor room to the right (+x).
export function indoorRoom(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    cutaway = 1,
    wallColor = PALETTE.wall,
    roofColor = "#C97A60",
    floorColor = "#E8DEC8",
  } = opts;
  const col = c => PALETTE[c] || c;

  const group = new THREE.Group();
  group.name = "indoor-room";

  const flat = m => { m.flatShading = true; return m; };
  const mesh = (geo, mat, x = 0, y = 0, z = 0, parent = group, name = "") => {
    const m = new THREE.Mesh(geo, mat);
    if (name) m.name = name;
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  const HEAT_HEX = "#F08A4B";
  const COOL_HEX = "#7FC4E8";

  // ── 1. HOUSE STRUCTURE + YARD SURFACE (elevates cleanly when geothermal cutaway geo > 0)
  const surfaceGroup = new THREE.Group();
  surfaceGroup.name = "surface-level";
  group.add(surfaceGroup);

  const rx = 1.1, rw = 3.4, rd = 2.8, rh = 2.45, wt = 0.14;
  const wallMat = flat(kit.toon(col(wallColor)));
  const roofMat = flat(kit.toon(col(roofColor)));
  const plinthMat = flat(kit.toon("#5B5E70"));
  const floorMat = flat(kit.toon(col(floorColor)));
  const whiteMat = flat(kit.toon("#FAFCFB"));

  // Foundation plinth & floor
  mesh(new THREE.BoxGeometry(rw + 0.16, 0.16, rd + 0.16), plinthMat, rx, 0.08, 0, surfaceGroup, "house-plinth");
  const floorSlab = mesh(new THREE.BoxGeometry(rw - 0.1, 0.06, rd - 0.1), floorMat, rx, 0.19, 0, surfaceGroup, "room-floor");

  // Back, left (exterior facing outdoor unit), right walls, and back gable triangle
  mesh(new THREE.BoxGeometry(rw, rh, wt), wallMat, rx, 0.16 + rh / 2, -rd / 2 + wt / 2, surfaceGroup, "back-wall");
  const gableShape = new THREE.Shape();
  gableShape.moveTo(-rw / 2, 0);
  gableShape.lineTo(rw / 2, 0);
  gableShape.lineTo(0, 0.80);
  gableShape.closePath();
  const gableGeo = new THREE.ExtrudeGeometry(gableShape, { depth: wt, bevelEnabled: false });
  const backGable = mesh(gableGeo, wallMat, rx, 0.16 + rh, -rd / 2, surfaceGroup, "back-gable");
  mesh(new THREE.BoxGeometry(wt, rh, rd), wallMat, rx - rw / 2 + wt / 2, 0.16 + rh / 2, 0, surfaceGroup, "left-wall");
  mesh(new THREE.BoxGeometry(wt, rh, rd), wallMat, rx + rw / 2 - wt / 2, 0.16 + rh / 2, 0, surfaceGroup, "right-wall");

  // Pitched cutaway roof (two slopes meeting at ridge)
  const roofGroup = new THREE.Group();
  roofGroup.name = "house-roof";
  roofGroup.position.set(rx, 0.16 + rh, 0);
  surfaceGroup.add(roofGroup);
  const leftSlope = mesh(new THREE.BoxGeometry(rw * 0.56, 0.12, rd + 0.24), roofMat, -rw * 0.25, 0.42, 0, roofGroup, "roof-left");
  leftSlope.rotation.z = 0.46;
  const rightSlope = mesh(new THREE.BoxGeometry(rw * 0.56, 0.12, rd + 0.24), roofMat, rw * 0.25, 0.42, 0, roofGroup, "roof-right");
  rightSlope.rotation.z = -0.46;
  mesh(new THREE.BoxGeometry(0.14, 0.14, rd + 0.26), plinthMat, 0, 0.80, 0, roofGroup, "roof-ridge");

  // Back window (glows gently via windowMaterial at dusk/night)
  const winGroup = new THREE.Group();
  winGroup.name = "room-window";
  winGroup.position.set(rx - 0.35, 1.50, -rd / 2 + wt + 0.02);
  surfaceGroup.add(winGroup);
  mesh(new THREE.BoxGeometry(1.12, 0.08, 0.08), whiteMat, 0, 0.44, 0, winGroup, "win-top");
  mesh(new THREE.BoxGeometry(1.12, 0.08, 0.08), whiteMat, 0, -0.44, 0, winGroup, "win-bot");
  mesh(new THREE.BoxGeometry(0.08, 0.88, 0.08), whiteMat, -0.52, 0, 0, winGroup, "win-left");
  mesh(new THREE.BoxGeometry(0.08, 0.88, 0.08), whiteMat, 0.52, 0, 0, winGroup, "win-right");
  mesh(new THREE.BoxGeometry(0.05, 0.88, 0.06), whiteMat, 0, 0, 0, winGroup, "win-mullion");
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.82), kit.windowMaterial(PALETTE.glass, PALETTE.window));
  glass.position.z = -0.01;
  glass.userData.noInk = true;
  winGroup.add(glass);

  // Interior furniture (sofa, coffee table, rug — neutral/cool cozy tones, zero #DD3428 / #FCD53E)
  const rugMat = flat(kit.toon("#C6D4C2"));
  mesh(new THREE.BoxGeometry(1.6, 0.02, 1.15), rugMat, rx - 0.1, 0.23, 0.2, surfaceGroup, "room-rug");
  const sofaMat = flat(kit.toon("#6E8E92"));
  mesh(new THREE.BoxGeometry(1.25, 0.28, 0.55), sofaMat, rx - 0.15, 0.38, -0.55, surfaceGroup, "sofa-seat");
  mesh(new THREE.BoxGeometry(1.25, 0.42, 0.14), sofaMat, rx - 0.15, 0.58, -0.76, surfaceGroup, "sofa-back");
  mesh(new THREE.BoxGeometry(0.14, 0.34, 0.55), sofaMat, rx - 0.70, 0.48, -0.55, surfaceGroup, "sofa-arm-l");
  mesh(new THREE.BoxGeometry(0.14, 0.34, 0.55), sofaMat, rx + 0.40, 0.48, -0.55, surfaceGroup, "sofa-arm-r");
  const woodMat = flat(kit.toon("#B8895E"));
  mesh(new THREE.BoxGeometry(0.75, 0.06, 0.45), woodMat, rx - 0.15, 0.44, 0.18, surfaceGroup, "coffee-table-top");
  for (const lx of [-0.30, 0.30]) {
    mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.20, 6), woodMat, rx - 0.15 + lx, 0.32, 0.18, surfaceGroup, "table-leg");
  }

  // Front cutaway wall with front window (slides/opens when cutaway = 1)
  const frontWall = new THREE.Group();
  frontWall.name = "front-cutaway-wall";
  frontWall.position.set(rx, 0.16, rd / 2 - wt / 2);
  surfaceGroup.add(frontWall);
  mesh(new THREE.BoxGeometry(rw, rh, wt), wallMat, 0, rh / 2, 0, frontWall, "front-wall-panel");
  const frontWin = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.76), kit.windowMaterial(PALETTE.glass, PALETTE.window));
  frontWin.position.set(-0.35, 1.32, wt / 2 + 0.01);
  frontWin.userData.noInk = true;
  frontWall.add(frontWin);
  mesh(new THREE.BoxGeometry(1.02, 0.84, 0.04), whiteMat, -0.35, 1.32, wt / 2 + 0.005, frontWall, "front-win-frame");

  // ── 2. THERMAL CIRCULATION RIBBONS INSIDE ROOM (#F08A4B heat or cool #7FC4E8) ──────────
  const airRibbonMat = flat(kit.toon(HEAT_HEX, { emissive: "#000000" }));
  const airRibbons = [];
  const airLoopCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(rx - 0.95, 2.05, 0.1),
    new THREE.Vector3(rx + 0.35, 1.85, 0.2),
    new THREE.Vector3(rx + 0.55, 0.85, 0.25),
    new THREE.Vector3(rx - 0.65, 0.70, 0.1),
  ], true, "catmullrom", 0.35);
  for (let i = 0; i < 4; i++) {
    const orb = mesh(new THREE.SphereGeometry(0.11, 8, 6), airRibbonMat, rx, 1.2, 0.2, surfaceGroup, `thermal-wave-${i}`);
    orb.userData.rolePart = "heat";
    airRibbons.push(orb);
  }

  // ── 3. DOMESTIC SANITARY HOT WATER TANK (utility alcove inside right wall, a1b) ─────────
  const tankGroup = new THREE.Group();
  tankGroup.name = "hot-water-tank";
  tankGroup.position.set(rx + 1.18, 0.22, -0.65);
  surfaceGroup.add(tankGroup);
  mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.18, 12), whiteMat, 0, 0.59, 0, tankGroup, "tank-cylinder");
  mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.09, 12), plinthMat, 0, 1.19, 0, tankGroup, "tank-top-cap");
  mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.09, 12), plinthMat, 0, 0.045, 0, tankGroup, "tank-bot-cap");
  const tankHeatMat = flat(kit.toon(HEAT_HEX, { emissive: "#000000" }));
  const tankBand = mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.36, 12), tankHeatMat, 0, 0.55, 0, tankGroup, "tank-heat-band");
  tankBand.userData.rolePart = "heat";

  // ── 4. OUTDOOR YARD & GEOTHERMAL GROUND / WATER SECTION (left side, x = -1.65) ──────────
  const yardGroup = new THREE.Group();
  yardGroup.name = "outdoor-yard";
  yardGroup.position.set(-1.65, 0, 0);
  surfaceGroup.add(yardGroup);
  // Outdoor pad for heat pump placement
  mesh(new THREE.BoxGeometry(2.1, 0.06, 2.4), flat(kit.toon(PALETTE.ground)), 0, 0.03, 0, yardGroup, "outdoor-pad");

  // Underground earth/water cutaway strata (sits cleanly at y = 0..0.78 when geo = 1, beneath elevated surfaceGroup)
  const geoGroup = new THREE.Group();
  geoGroup.name = "geothermal-strata";
  geoGroup.position.set(0, 0, 0);
  group.add(geoGroup);
  mesh(new THREE.BoxGeometry(5.6, 0.26, 2.55), flat(kit.toon("#8B6D52")), 0.05, 0.65, -0.12, geoGroup, "topsoil-layer");
  mesh(new THREE.BoxGeometry(5.6, 0.52, 2.55), flat(kit.toon("#6B5240")), 0.05, 0.26, -0.12, geoGroup, "subsoil-layer");
  mesh(new THREE.BoxGeometry(1.55, 0.28, 1.35), flat(kit.toon("#6BAED6")), -1.75, 0.22, 0.52, geoGroup, "groundwater-pocket");

  const geoPipePts = [
    [-0.75, 0.85, 0.85],
    [-1.05, 0.56, 1.20],
    [-2.20, 0.42, 1.22],
    [-2.35, 0.20, 1.22],
    [-1.15, 0.20, 1.22],
    [-0.65, 0.85, 0.55],
  ];
  const geoCurve = new THREE.CatmullRomCurve3(geoPipePts.map(p => new THREE.Vector3(...p)), false, "catmullrom", 0.2);
  const geoPipeMat = flat(kit.toon(HEAT_HEX, { emissive: "#000000" }));
  const geoPipe = mesh(new THREE.TubeGeometry(geoCurve, 28, 0.06, 7, false), geoPipeMat, 0, 0, 0, geoGroup, "geo-loop-pipe");
  geoPipe.userData.rolePart = "heat";

  kit.ink(group);

  const anchor = (name, p, parent = group) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    parent.add(o);
    return o;
  };
  const anchors = {
    outdoor: anchor("outdoor", [-1.65, 0.90, 0.20], surfaceGroup),
    room: anchor("room", [rx - 0.1, 1.35, 0.20], surfaceGroup),
    unitSlot: anchor("unitSlot", [rx - 1.25, 1.95, 0.0], surfaceGroup),
    tank: anchor("tank", [rx + 1.18, 0.95, -0.65], surfaceGroup),
    groundLoop: anchor("groundLoop", [-1.75, 0.30, 0.90], geoGroup),
  };

  const warmAirPts = [[rx - 0.95, 2.05, 0.1], [rx + 0.35, 1.85, 0.2], [rx + 0.55, 0.85, 0.25], [rx - 0.65, 0.70, 0.1]];
  function path(name = "warmAir") {
    const list = name === "warmAir" ? warmAirPts : name === "geoLoop" ? geoPipePts : null;
    if (!list) throw new Error("indoorRoom: unknown path " + JSON.stringify(name));
    group.updateWorldMatrix(true, false);
    const base = name === "warmAir" ? surfaceGroup : geoGroup;
    base.updateWorldMatrix(true, false);
    return list.map(p => new THREE.Vector3(...p).applyMatrix4(base.matrixWorld).toArray());
  }

  const heatCol = new THREE.Color(HEAT_HEX);
  const coolCol = new THREE.Color(COOL_HEX);
  const neutralFloor = new THREE.Color(col(floorColor));
  const warmFloor = new THREE.Color("#F2D2B6");
  const coolFloor = new THREE.Color("#D5E7F0");
  const darkCol = new THREE.Color("#000000");

  function update(t, state = {}) {
    const cut = kit.clamp01(state.cutaway ?? cutaway);
    const warmth = kit.clamp01(state.warmth ?? 0.6);
    const season = state.season ?? "winter";
    const geo = kit.clamp01(state.geo ?? 0);
    const tank = kit.clamp01(state.tank ?? 0);

    // Front cutaway wall slides down & fades away cleanly when cutaway = 1
    const cutEase = kit.ease(cut, "inOut");
    frontWall.position.y = 0.16 - cutEase * 2.55;
    frontWall.scale.y = Math.max(0.01, 1 - cutEase * 0.95);
    frontWall.visible = cutEase < 0.95;

    // Room floor & thermal air waves respond to winter warmth vs summer cooling
    const isSummer = season === "summer";
    const waveCol = isSummer ? coolCol : heatCol;
    floorMat.color.copy(neutralFloor).lerp(isSummer ? coolFloor : warmFloor, warmth * 0.75);
    airRibbonMat.color.copy(waveCol);
    airRibbonMat.emissive.copy(darkCol).lerp(waveCol, warmth * 0.45);
    for (let i = 0; i < airRibbons.length; i++) {
      const orb = airRibbons[i];
      orb.visible = warmth > 0.04;
      if (!orb.visible) continue;
      let u = ((t * 0.35 + i / airRibbons.length) % 1 + 1) % 1;
      if (isSummer) u = 1 - u;
      const p = airLoopCurve.getPointAt(u);
      orb.position.copy(p);
      orb.scale.setScalar((0.55 + 0.55 * Math.sin(u * Math.PI)) * warmth);
    }

    // Sanitary hot-water tank reveal
    tankGroup.visible = tank > 0.02;
    tankGroup.scale.setScalar(Math.max(0.01, kit.ease(tank, "out")));
    tankHeatMat.emissive.copy(darkCol).lerp(heatCol, tank * 0.45);

    // Geothermal ground/water strata section elevates surface above ground y = 0 cleanly
    const geoEase = kit.ease(geo, "out");
    surfaceGroup.position.y = geoEase * 0.78;
    geoGroup.visible = geo > 0.02;
    geoGroup.scale.y = Math.max(0.01, geoEase);
    geoPipeMat.emissive.copy(darkCol).lerp(heatCol, geo * 0.35);
  }

  update(0);
  return { group, hero: [floorSlab, roofGroup], anchors, path, update };
}
