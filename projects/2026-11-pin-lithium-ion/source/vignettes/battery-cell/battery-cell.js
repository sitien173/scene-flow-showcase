// battery-cell: toon3d cutaway smartphone power-management PCB + lithium-ion cell
// showing rectifier block (AC #2D7FF9 -> DC #2D884E), voltage regulator, charge
// controller, exposed internal electrode layers, and animated charge level bar.
// Origin at base centre (y = 0); PCB on -x, battery cell on +x, facing +y.
export function batteryCell(kit, opts = {}) {
  const { THREE } = kit;
  const {
    pcbColor = "#285943",
    cellColor = "#3D4252",
    dcColor = "#2D884E",
    acColor = "#2D7FF9",
  } = opts;

  const group = new THREE.Group();
  group.name = "battery-cell";

  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // Power-management PCB board (-x half)
  const pcbMat = kit.toon(pcbColor);
  const pcb = box(0.62, 0.032, 0.56, pcbMat, -0.28, 0.025, 0);

  // Input pads from receiver coil on left edge (-x)
  const acTraceMat = kit.toon(acColor, { emissive: "#000000" });
  const padMat = kit.toon("#F0C265");
  box(0.05, 0.018, 0.07, padMat, -0.56, 0.045, -0.1, group);
  box(0.05, 0.018, 0.07, padMat, -0.56, 0.045, 0.1, group);
  box(0.11, 0.01, 0.024, acTraceMat, -0.49, 0.045, -0.1, group);
  box(0.11, 0.01, 0.024, acTraceMat, -0.49, 0.045, 0.1, group);

  // Stage 1: Bridge Rectifier block (x = -0.39)
  const rectMat = kit.toon("#242733", { emissive: "#000000" });
  const rectChip = box(0.11, 0.045, 0.24, rectMat, -0.39, 0.062, 0, group);
  // 4 diode stripes on top of rectifier
  const diodeBandMat = kit.toon("#D6D8E0");
  for (let i = 0; i < 4; i++) {
    box(0.07, 0.008, 0.022, diodeBandMat, -0.39, 0.088, -0.08 + i * 0.053, group);
  }

  // DC output traces from Rectifier -> Regulator -> Charger -> Battery
  const dcTraceMat = kit.toon(dcColor, { emissive: "#000000" });
  box(0.46, 0.01, 0.024, dcTraceMat, -0.12, 0.045, -0.07, group);
  box(0.46, 0.01, 0.024, dcTraceMat, -0.12, 0.045, 0.07, group);

  // Stage 2: Voltage Regulator + inductor coil (x = -0.22)
  const regMat = kit.toon("#242733", { emissive: "#000000" });
  const regChip = box(0.1, 0.042, 0.14, regMat, -0.22, 0.06, -0.05, group);
  box(0.09, 0.055, 0.1, kit.toon("#6E7385"), -0.22, 0.068, 0.12, group);
  box(0.045, 0.032, 0.035, kit.toon("#D98245"), -0.22, 0.055, -0.18, group);

  // Stage 3: Battery Charge Controller IC (x = -0.05)
  const chargerMat = kit.toon("#242733", { emissive: "#000000" });
  const chargerChip = box(0.1, 0.045, 0.18, chargerMat, -0.05, 0.062, 0, group);
  box(0.04, 0.025, 0.06, kit.toon("#B8BCC8"), -0.05, 0.052, 0.16, group);

  // Positive / negative battery tabs bridging PCB to cell
  box(0.08, 0.018, 0.055, kit.toon("#DD3428"), 0.08, 0.055, -0.11, group);
  box(0.08, 0.018, 0.055, kit.toon("#22242E"), 0.08, 0.055, 0.11, group);

  // Cutaway Lithium-Ion Battery Cell (+x half)
  const cellGroup = new THREE.Group();
  cellGroup.position.set(0.36, 0, 0);
  group.add(cellGroup);

  const shellMat = kit.toon(cellColor);
  // Outer pouch frame (bottom + lower front lip + 3 full walls, open top cutaway window)
  box(0.54, 0.03, 0.58, shellMat, 0, 0.015, 0, cellGroup);
  box(0.54, 0.065, 0.04, shellMat, 0, 0.0475, 0.27, cellGroup);
  box(0.54, 0.13, 0.04, shellMat, 0, 0.095, -0.27, cellGroup);
  box(0.04, 0.13, 0.58, shellMat, 0.25, 0.095, 0, cellGroup);
  box(0.04, 0.13, 0.58, shellMat, -0.25, 0.095, 0, cellGroup);
  // Top rim bezel around cutaway window
  box(0.54, 0.025, 0.06, kit.toon("#262936"), 0, 0.155, 0.26, cellGroup);
  box(0.54, 0.025, 0.06, kit.toon("#262936"), 0, 0.155, -0.26, cellGroup);

  // Stacked internal electrode plates exposed inside cutaway
  const anodeMat = kit.toon("#5A6075");
  const cathodeMat = kit.toon("#C97B48");
  for (let i = 0; i < 4; i++) {
    const zPos = -0.17 + i * 0.095;
    box(0.42, 0.048, 0.024, anodeMat, 0, 0.055, zPos, cellGroup);
    box(0.42, 0.048, 0.024, cathodeMat, 0, 0.055, zPos + 0.042, cellGroup);
  }

  // Dynamic charge-level energy bar inside the cutaway top window (scales along +x from left)
  const barTrack = box(0.42, 0.032, 0.42, kit.toon("#1C1E26"), 0, 0.105, 0, cellGroup);
  barTrack.userData.noInk = false;
  const fillMat = kit.toon(dcColor, { emissive: "#000000" });
  const fillPivot = new THREE.Group();
  fillPivot.position.set(-0.20, 0.128, 0);
  cellGroup.add(fillPivot);
  const fillBar = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.024, 0.36), fillMat);
  fillBar.position.set(0.20, 0, 0);
  fillPivot.add(fillBar);

  // 5-segment charge level bezel strip on top right edge
  const segMats = [];
  for (let i = 0; i < 5; i++) {
    const sm = kit.toon("#2D303C", { emissive: "#000000" });
    const seg = box(0.058, 0.014, 0.045, sm, -0.15 + i * 0.075, 0.17, 0.255, cellGroup);
    seg.userData.noInk = true;
    segMats.push(sm);
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
    input: anchor("input", [-0.56, 0.06, 0]),
    rectifier: anchor("rectifier", [-0.39, 0.11, 0]),
    regulator: anchor("regulator", [-0.22, 0.11, 0]),
    charger: anchor("charger", [-0.05, 0.11, 0]),
    terminals: anchor("terminals", [0.08, 0.08, 0]),
    battery: anchor("battery", [0.36, 0.16, 0]),
    levelBar: anchor("levelBar", [0.36, 0.15, 0]),
  };

  const acPts = [[-0.58, 0.06, -0.1], [-0.46, 0.06, -0.1], [-0.39, 0.08, -0.03]];
  const dcPts = [[-0.36, 0.06, -0.07], [-0.22, 0.06, -0.07], [-0.05, 0.06, -0.07], [0.12, 0.07, -0.07], [0.36, 0.13, -0.07]];

  function path(name = "dc") {
    const pts = name === "ac" ? acPts : name === "dc" ? dcPts : null;
    if (!pts) throw new Error("batteryCell: no path " + JSON.stringify(name) + "; use ac or dc");
    group.updateWorldMatrix(true, false);
    return pts.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const chipBase = new THREE.Color("#242733");
  const acCol = new THREE.Color(acColor);
  const dcCol = new THREE.Color(dcColor);
  const fullCol = new THREE.Color("#FCD53E");
  const segOff = new THREE.Color("#2D303C");
  const dark = new THREE.Color("#000000");

  function update(t, state = {}) {
    const charge = kit.clamp01(state.charge ?? 0.65);
    const acIn = kit.clamp01(state.acIn ?? 0);
    const dcOut = kit.clamp01(state.dcOut ?? (charge > 0.05 ? 0.7 : 0));
    const rectGlow = kit.clamp01(state.rectGlow ?? 0);
    const regGlow = kit.clamp01(state.regGlow ?? 0);
    const chargerGlow = kit.clamp01(state.chargerGlow ?? 0);
    const full = kit.clamp01(state.full ?? (charge >= 0.99 ? 1 : 0));

    const acPulse = 0.55 + 0.45 * Math.abs(Math.cos(t * 5.2));
    acTraceMat.emissive.copy(dark).lerp(acCol, acIn * acPulse * 0.7);
    dcTraceMat.emissive.copy(dark).lerp(dcCol, dcOut * 0.65);

    rectChip.material.color.copy(chipBase).lerp(acCol, rectGlow * 0.45);
    rectChip.material.emissive.copy(dark).lerp(acCol, rectGlow * 0.35);

    regChip.material.color.copy(chipBase).lerp(dcCol, regGlow * 0.45);
    regChip.material.emissive.copy(dark).lerp(dcCol, regGlow * 0.35);

    chargerChip.material.color.copy(chipBase).lerp(dcCol, chargerGlow * 0.45);
    chargerChip.material.emissive.copy(dark).lerp(dcCol, chargerGlow * 0.35);

    fillPivot.visible = charge > 0.01;
    fillPivot.scale.x = Math.max(0.02, charge);
    fillMat.color.copy(dcCol).lerp(fullCol, full * 0.25);
    fillMat.emissive.copy(dark).lerp(dcCol, (dcOut * 0.35) + full * 0.35);

    segMats.forEach((sm, idx) => {
      const lit = charge >= (idx + 0.6) / 5;
      sm.color.copy(lit ? dcCol : segOff);
      sm.emissive.copy(dark).lerp(lit ? dcCol : dark, lit ? 0.55 : 0);
    });
  }

  update(0);
  return { group, hero: [pcb, cellGroup], anchors, path, update };
}
