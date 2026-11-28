// compressor: original toon3d electric-motor cutaway compressor for EP09.
// Shows electrical work input (#FCD53E) driving a piston that shrinks the gas chamber volume,
// raising pressure and temperature from cold refrigerant (#2D7FF9) to hot refrigerant (#DD3428).
// Origin at floor center beneath base plinth; cutaway faces +z.
export function compressor(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    cutaway = 1,
    shellColor = "#4B4E62",
    rate = 1.4,
  } = opts;

  const group = new THREE.Group();
  group.name = "compressor";

  const flat = m => { m.flatShading = true; m.side = THREE.DoubleSide; return m; };
  const mesh = (geo, mat, x = 0, y = 0, z = 0, parent = group, name = "") => {
    const m = new THREE.Mesh(geo, mat);
    if (name) m.name = name;
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  const COLD_HEX = "#2D7FF9";
  const HOT_HEX = "#DD3428";
  const ELEC_HEX = "#FCD53E";
  const PIPE_NEUTRAL = "#8D92A6";
  const ELEC_NEUTRAL = "#7C8196";

  // Heavy plinth and anti-vibration mounts
  const baseMat = flat(kit.toon(PALETTE.stone));
  const footMat = flat(kit.toon("#2E303D"));
  mesh(new THREE.BoxGeometry(2.6, 0.14, 1.7), baseMat, 0, 0.07, 0, group, "plinth");
  for (const fx of [-0.95, 0.95]) {
    for (const fz of [-0.52, 0.52]) {
      mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.18, 6), footMat, fx, 0.23, fz, group, "mount-foot");
    }
  }

  // Cutaway housing cylinder + domed cap
  const R = 1.02, Hc = 1.42, baseY = 0.32;
  const arc = cutaway ? Math.PI : Math.PI * 2;
  const side = cutaway ? Math.PI / 2 : 0;
  const cap = cutaway ? Math.PI : 0;
  const shellMat = flat(kit.toon(shellColor));
  mesh(new THREE.CylinderGeometry(R, R * 1.04, Hc, 14, 1, true, side, arc), shellMat, 0, baseY + Hc / 2, 0, group, "shell-wall");
  mesh(new THREE.SphereGeometry(R, 14, 5, cap, arc, 0, Math.PI / 2), shellMat, 0, baseY + Hc, 0, group, "shell-dome");
  mesh(new THREE.CylinderGeometry(R * 1.04, R * 1.04, 0.08, 14), shellMat, 0, baseY + 0.04, 0, group, "shell-floor");

  // Suction (left, cold) and discharge (right, hot) pipes
  const inMat = flat(kit.toon(PIPE_NEUTRAL, { emissive: "#000000" }));
  const outMat = flat(kit.toon(PIPE_NEUTRAL, { emissive: "#000000" }));
  const bend = (pts, mat, name, role) => {
    const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)), false, "catmullrom", 0.2);
    const m = mesh(new THREE.TubeGeometry(curve, 24, 0.085, 7, false), mat, 0, 0, 0, group, name);
    m.userData.rolePart = role;
    return m;
  };
  const inPts = [[-2.05, 2.15, 0], [-1.05, 2.15, 0], [-0.45, 2.02, 0], [-0.45, 1.56, 0.16], [0.28, 1.56, 0.16]];
  const outPts = [[0.72, 1.56, 0.16], [0.72, 2.02, 0], [1.10, 2.15, 0], [2.05, 2.15, 0]];
  bend(inPts, inMat, "suction-pipe", "cold");
  bend(outPts, outMat, "discharge-pipe", "hot");

  // Interior assembly
  const inside = new THREE.Group();
  inside.name = "compressor-internals";
  inside.visible = Boolean(cutaway);
  group.add(inside);

  // Electric motor bay (bottom): copper windings + electrical work input ring + pulse bars
  const motorStator = mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.46, 12), flat(kit.toon("#D98245")), 0, 0.66, -0.06, inside, "motor-stator");
  const shaft = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.78, 8), flat(kit.toon("#9A9AAA")), 0, 0.92, -0.06, inside, "motor-shaft");

  // Electrical work input bus & energized rings (#FCD53E when electric > 0)
  const elecMat = flat(kit.toon(ELEC_NEUTRAL, { emissive: "#000000" }));
  const elecCablePts = [[-1.65, 0.48, 0.35], [-0.88, 0.48, 0.35], [-0.52, 0.58, 0.12]];
  const elecCurve = new THREE.CatmullRomCurve3(elecCablePts.map(p => new THREE.Vector3(...p)));
  const elecLead = mesh(new THREE.TubeGeometry(elecCurve, 16, 0.055, 6, false), elecMat, 0, 0, 0, inside, "electric-lead");
  elecLead.userData.rolePart = "electric";

  const elecRing = mesh(new THREE.TorusGeometry(0.61, 0.045, 6, 16), elecMat, 0, 0.66, -0.06, inside, "electric-ring");
  elecRing.rotation.x = Math.PI / 2;
  elecRing.userData.rolePart = "electric";

  const elecPulses = [];
  for (let i = 0; i < 3; i++) {
    const p = mesh(new THREE.SphereGeometry(0.075, 8, 6), elecMat, 0, 0, 0, inside, `electric-pulse-${i}`);
    p.userData.rolePart = "electric";
    elecPulses.push(p);
  }

  // Crank & connecting rod driving horizontal compression piston
  const crank = new THREE.Group();
  crank.name = "crank-rotor";
  crank.position.set(-0.22, 1.36, 0.16);
  inside.add(crank);
  const disc = mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.09, 10), flat(kit.toon("#9A9AAA")), 0, 0, 0, crank, "crank-disc");
  disc.rotation.x = Math.PI / 2;
  const pin = mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.18, 6), footMat, 0.16, 0, 0.07, crank, "crank-pin");
  pin.rotation.x = Math.PI / 2;

  const bore = 0.28, crankR = 0.16, rodL = 0.48;
  // Cutaway compression cylinder sleeve (open front via half-arc or clear glass look)
  const sleeve = mesh(new THREE.CylinderGeometry(bore, bore, 0.72, 12, 1, true, Math.PI * 0.85, Math.PI * 1.3),
    flat(kit.toon("#B8BCC8")), 0.50, 1.36, 0.16, inside, "chamber-sleeve");
  sleeve.rotation.z = Math.PI / 2;
  // Cylinder head wall at right end
  const headCap = mesh(new THREE.CylinderGeometry(bore, bore, 0.06, 12), flat(kit.toon("#5B5E70")), 0.86, 1.36, 0.16, inside, "chamber-head");
  headCap.rotation.z = Math.PI / 2;

  // Compressible gas volume inside the chamber (shrinks as piston pushes right, shifts #2D7FF9 -> #DD3428)
  const gasMat = flat(kit.toon(COLD_HEX, { emissive: "#000000" }));
  const gasCore = new THREE.Mesh(new THREE.CylinderGeometry(bore * 0.84, bore * 0.84, 1, 10), gasMat);
  gasCore.name = "compressed-gas-volume";
  gasCore.userData.rolePart = "gas";
  gasCore.userData.noInk = true;
  gasCore.rotation.z = Math.PI / 2;
  gasCore.position.set(0.83, 1.36, 0.16);
  inside.add(gasCore);

  const piston = mesh(new THREE.CylinderGeometry(bore * 0.90, bore * 0.90, 0.18, 10), flat(kit.toon("#FAFCFB")), 0.25, 1.36, 0.16, inside, "piston-head");
  piston.rotation.z = Math.PI / 2;
  const rod = mesh(new THREE.BoxGeometry(rodL, 0.07, 0.055), flat(kit.toon("#6A6D80")), 0, 1.36, 0.23, inside, "connecting-rod");

  // Top pressure gauge dial (neutral white/dark slate, needle responds to compression/heat)
  const gaugeGroup = new THREE.Group();
  gaugeGroup.name = "pressure-gauge";
  gaugeGroup.position.set(0.55, 2.38, 0.18);
  group.add(gaugeGroup);
  const dialFace = mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.07, 12), flat(kit.toon("#FAFCFB")), 0, 0, 0, gaugeGroup, "gauge-face");
  dialFace.rotation.x = Math.PI / 2;
  const dialRim = mesh(new THREE.TorusGeometry(0.24, 0.03, 6, 14), flat(kit.toon("#5B5E70")), 0, 0, 0, gaugeGroup, "gauge-rim");
  const needlePivot = new THREE.Group();
  needlePivot.position.set(0, 0, 0.045);
  gaugeGroup.add(needlePivot);
  mesh(new THREE.BoxGeometry(0.03, 0.16, 0.02), flat(kit.toon("#1C1C20")), 0, 0.06, 0, needlePivot, "gauge-needle");

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    inlet: anchor("inlet", [-1.15, 2.15, 0]),
    outlet: anchor("outlet", [1.15, 2.15, 0]),
    chamber: anchor("chamber", [0.55, 1.36, 0.25]),
    motor: anchor("motor", [0, 0.66, 0.45]),
    shell: anchor("shell", [0, 1.95, 0.55]),
  };

  function path(name = "in") {
    const list = name === "in" ? inPts : name === "out" ? outPts : null;
    if (!list) throw new Error("compressor: no path " + JSON.stringify(name));
    group.updateWorldMatrix(true, false);
    return list.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const coldCol = new THREE.Color(COLD_HEX);
  const hotCol = new THREE.Color(HOT_HEX);
  const elecNeutral = new THREE.Color(ELEC_NEUTRAL);
  const elecCol = new THREE.Color(ELEC_HEX);
  const pipeNeutral = new THREE.Color(PIPE_NEUTRAL);
  const darkCol = new THREE.Color("#000000");

  function update(t, state = {}) {
    const elec = kit.clamp01(state.electric ?? (state.rate === 0 ? 0 : 0.8));
    const heat = kit.clamp01(state.heat ?? 0);
    const active = kit.clamp01(state.active ?? Math.max(elec, heat));
    const strokeRate = state.rate ?? rate;

    // Piston & crank kinematics (pure function of t)
    const a = state.angle ?? (2 * Math.PI * strokeRate * t);
    crank.rotation.z = a;
    const px = -0.22 + crankR * Math.cos(a);
    const py = crankR * Math.sin(a);
    const slide = px + Math.sqrt(Math.max(0.01, rodL * rodL - py * py));
    piston.position.x = slide + 0.08;
    rod.position.set((px + slide) / 2, 1.36 + py / 2, 0.23);
    rod.rotation.z = Math.atan2(-py, slide - px);

    // Compressible gas volume shrinks between piston face and cylinder head at x = 0.83
    const pistonFaceX = piston.position.x + 0.09;
    const chamberLen = Math.max(0.10, 0.83 - pistonFaceX);
    const squeezeFactor = kit.clamp01(state.squeeze ?? ((0.60 - chamberLen) / 0.45));
    gasCore.scale.y = chamberLen;
    gasCore.position.x = pistonFaceX + chamberLen / 2;

    const gasHeat = kit.clamp01(Math.max(heat, squeezeFactor * heat));
    gasMat.color.copy(coldCol).lerp(hotCol, gasHeat);
    gasMat.emissive.copy(darkCol).lerp(gasMat.color, 0.25 + 0.35 * gasHeat);

    // Inlet stays cold refrigerant (#2D7FF9 when active); outlet shifts to hot (#DD3428)
    inMat.color.copy(pipeNeutral).lerp(coldCol, active);
    outMat.color.copy(pipeNeutral).lerp(hotCol, heat);
    outMat.emissive.copy(darkCol).lerp(hotCol, heat * 0.28);

    // Electrical work input (#FCD53E) pulses into motor
    const pulseWave = 0.55 + 0.45 * Math.sin(t * 9.0);
    elecMat.color.copy(elecNeutral).lerp(elecCol, elec);
    elecMat.emissive.copy(darkCol).lerp(elecCol, elec * 0.55 * pulseWave);
    for (let i = 0; i < elecPulses.length; i++) {
      const p = elecPulses[i];
      p.visible = elec > 0.05;
      if (!p.visible) continue;
      const u = ((t * 1.1 + i / elecPulses.length) % 1 + 1) % 1;
      const pt = elecCurve.getPointAt(u);
      p.position.copy(pt);
      p.scale.setScalar(0.75 + 0.35 * Math.sin(u * Math.PI));
    }

    // Pressure gauge needle sweeps left (low P) -> right (high P)
    const pressure = kit.clamp01(0.15 + 0.45 * heat + 0.40 * squeezeFactor * Math.max(0.3, active));
    needlePivot.rotation.z = kit.lerp(1.1, -1.1, pressure);
  }

  update(0);
  return { group, hero: [piston, gasCore, motorStator], anchors, path, update };
}
