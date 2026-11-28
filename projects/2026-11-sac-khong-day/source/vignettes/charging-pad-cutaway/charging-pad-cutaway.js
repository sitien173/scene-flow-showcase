// charging-pad-cutaway: toon3d flat wireless charging pad with cutaway top shell,
// internal transmitter PCB + spiral copper coil, side power cord + adapter, optional
// alignment magnet ring in pad, and optional thick phone case spacer.
// Origin at floor under pad centre (y = 0); top surface at y = 0.14 when closed.
export function chargingPadCutaway(kit, opts = {}) {
  const { THREE } = kit;
  const {
    baseColor = "#343746",
    topColor = "#F2F0EA",
    coilColor = "#D98245",
    pcbColor = "#2E6B4F",
    withCord = true,
  } = opts;

  const group = new THREE.Group();
  group.name = "charging-pad-cutaway";

  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // Lower beveled chassis (octagon-like slab for an original non-branded silhouette)
  const chassis = new THREE.Group();
  group.add(chassis);
  const baseMat = kit.toon(baseColor);
  const rimMat = kit.toon("#242632");

  // Anti-slip base ring
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.39, 0.41, 0.025, 8), rimMat);
  foot.position.set(0, 0.0125, 0);
  foot.rotation.y = Math.PI / 8;
  chassis.add(foot);

  // Main pad lower body
  const lowerBody = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.44, 0.085, 8), baseMat);
  lowerBody.position.set(0, 0.0675, 0);
  lowerBody.rotation.y = Math.PI / 8;
  chassis.add(lowerBody);

  // Front status LED bar
  const ledMat = kit.toon("#4868C8", { emissive: "#000000" });
  const ledMesh = box(0.14, 0.018, 0.024, ledMat, 0, 0.065, 0.405, chassis);

  // Side USB-C port collar on -x edge
  box(0.06, 0.042, 0.11, rimMat, -0.41, 0.062, 0, chassis);

  // Power cord & desk adapter brick on -x side
  const cordPts = [
    [-1.12, 0.045, -0.22],
    [-0.86, 0.024, -0.18],
    [-0.64, 0.024, -0.06],
    [-0.48, 0.052, 0.0],
    [-0.41, 0.062, 0.0],
  ];
  const cordGroup = new THREE.Group();
  cordGroup.visible = withCord;
  group.add(cordGroup);

  const cordCurve = new THREE.CatmullRomCurve3(
    cordPts.map(p => new THREE.Vector3(...p)),
    false,
    "catmullrom",
    0.25
  );
  const cordMat = kit.toon("#262834");
  const cordMesh = new THREE.Mesh(new THREE.TubeGeometry(cordCurve, 28, 0.018, 6, false), cordMat);
  cordGroup.add(cordMesh);

  // Strain relief boot at pad entry
  const boot = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.028, 0.055, 8), rimMat);
  boot.rotation.z = Math.PI / 2;
  boot.position.set(-0.445, 0.062, 0);
  cordGroup.add(boot);

  // Compact power adapter brick
  const adapter = new THREE.Group();
  adapter.position.set(-1.24, 0, -0.22);
  cordGroup.add(adapter);
  box(0.28, 0.13, 0.22, kit.toon("#2D303E"), 0, 0.065, 0, adapter);
  box(0.24, 0.02, 0.18, kit.toon("#424659"), 0, 0.135, 0, adapter);
  const adapterLed = box(0.032, 0.012, 0.032, kit.toon("#F08A4B", { emissive: "#F08A4B" }), 0.08, 0.142, 0.05, adapter);
  adapterLed.material.emissiveIntensity = 0.4;
  // Wall plug pins on left side of adapter
  box(0.06, 0.018, 0.018, kit.toon("#B8BCC8"), -0.17, 0.075, -0.04, adapter);
  box(0.06, 0.018, 0.018, kit.toon("#B8BCC8"), -0.17, 0.075, 0.04, adapter);

  // Internal PCB, transmitter driver IC, ferrite shield, and flat spiral coil
  const internal = new THREE.Group();
  internal.position.set(0, 0.088, 0);
  group.add(internal);

  const pcb = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.018, 8), kit.toon(pcbColor));
  pcb.rotation.y = Math.PI / 8;
  internal.add(pcb);

  // Transmitter driver IC + capacitors on the -x side of PCB
  const txMat = kit.toon("#222530", { emissive: "#000000" });
  const txChip = box(0.11, 0.026, 0.11, txMat, -0.22, 0.02, 0.0, internal);
  const capMat = kit.toon("#4868C8");
  for (const zOff of [-0.09, 0.09]) {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.032, 8), capMat);
    cap.position.set(-0.22, 0.022, zOff);
    internal.add(cap);
  }
  // Copper trace from port to TX chip to coil
  const traceMat = kit.toon("#F08A4B", { emissive: "#000000" });
  box(0.14, 0.008, 0.022, traceMat, -0.31, 0.012, 0, internal);
  box(0.12, 0.008, 0.02, traceMat, -0.12, 0.012, 0.02, internal);

  // Dark ferrite shield tray under TX coil
  const ferrite = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.245, 0.012, 20), kit.toon("#46495A"));
  ferrite.position.set(0.04, 0.014, 0);
  internal.add(ferrite);

  // Flat multi-turn copper spiral coil inside pad
  const coilMat = kit.toon(coilColor, { emissive: "#000000" });
  const coilGroup = new THREE.Group();
  coilGroup.position.set(0.04, 0.028, 0);
  internal.add(coilGroup);

  const spiralPts = [];
  const turns = 4;
  const steps = 96;
  const rInner = 0.075;
  const rOuter = 0.215;
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const ang = u * turns * Math.PI * 2;
    const r = rInner + (rOuter - rInner) * u;
    spiralPts.push(new THREE.Vector3(Math.cos(ang) * r, 0, Math.sin(ang) * r));
  }
  const coilCurve = new THREE.CatmullRomCurve3(spiralPts, false, "catmullrom", 0.3);
  const coilMesh = new THREE.Mesh(new THREE.TubeGeometry(coilCurve, 84, 0.012, 6, false), coilMat);
  coilGroup.add(coilMesh);
  // End caps so open tube ends never look hollow
  const capGeo = new THREE.SphereGeometry(0.012, 6, 5);
  for (const pt of [spiralPts[0], spiralPts[spiralPts.length - 1]]) {
    const capMesh = new THREE.Mesh(capGeo, coilMat);
    capMesh.position.copy(pt);
    coilGroup.add(capMesh);
  }

  // Removable top cover lid (lifts back toward -z on cutaway so front gap stays clear)
  const topCover = new THREE.Group();
  topCover.position.set(0, 0.122, 0);
  group.add(topCover);

  const lidMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.405, 0.42, 0.034, 8), kit.toon(topColor));
  lidMesh.rotation.y = Math.PI / 8;
  topCover.add(lidMesh);

  // Subtle target ring etched on top surface
  const targetRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.008, 6, 24), kit.toon("#C5C6CE"));
  targetRing.rotation.x = Math.PI / 2;
  targetRing.position.set(0.04, 0.018, 0);
  topCover.add(targetRing);

  // Alignment magnet ring seated on outer perimeter rim around coil & PCB (a1c: pad only)
  const magnetGroup = new THREE.Group();
  magnetGroup.position.set(0, 0.114, 0);
  magnetGroup.visible = false;
  group.add(magnetGroup);
  const magMat = kit.toon("#7C8396", { emissive: "#000000" });
  const magArcGeo = new THREE.BoxGeometry(0.11, 0.022, 0.038);
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4 + Math.PI / 8;
    const seg = new THREE.Mesh(magArcGeo, magMat);
    seg.position.set(Math.cos(a) * 0.34, 0, Math.sin(a) * 0.34);
    seg.rotation.y = -a + Math.PI / 2;
    magnetGroup.add(seg);
  }

  // Optional thick phone case spacer (used in a1b to show increased distance)
  const caseGroup = new THREE.Group();
  caseGroup.position.set(0.04, 0.142, 0);
  caseGroup.visible = false;
  group.add(caseGroup);
  const caseMat = kit.toon("#6B728E");
  box(0.56, 0.055, 1.06, caseMat, 0, 0.0275, 0, caseGroup);
  box(0.04, 0.04, 1.06, kit.toon("#535972"), -0.26, 0.065, 0, caseGroup);
  box(0.04, 0.04, 1.06, kit.toon("#535972"), 0.26, 0.065, 0, caseGroup);
  box(0.56, 0.04, 0.04, kit.toon("#535972"), 0, 0.065, -0.51, caseGroup);
  box(0.56, 0.04, 0.04, kit.toon("#535972"), 0, 0.065, 0.51, caseGroup);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    padTop: anchor("padTop", [0.04, 0.145, 0]),
    coil: anchor("coil", [0.04, 0.116, 0]),
    circuit: anchor("circuit", [-0.22, 0.115, 0]),
    port: anchor("port", [-0.42, 0.065, 0]),
    cord: anchor("cord", [-0.72, 0.03, -0.1]),
    adapter: anchor("adapter", [-1.24, 0.14, -0.22]),
    magnet: anchor("magnet", [0.04, 0.16, 0.25]),
    caseSlot: anchor("caseSlot", [0.04, 0.19, 0]),
    led: anchor("led", [0, 0.07, 0.42]),
    body: anchor("body", [0, 0.08, 0]),
  };

  function path(name = "cord") {
    const localPts = name === "cord"
      ? [...cordPts, [-0.22, 0.098, 0], [-0.08, 0.116, 0]]
      : name === "coil"
        ? spiralPts.map(v => [v.x + 0.04, 0.116, v.z])
        : null;
    if (!localPts) throw new Error("chargingPadCutaway: no path " + JSON.stringify(name) + "; use cord or coil");
    group.updateWorldMatrix(true, false);
    return localPts.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const coilBase = new THREE.Color(coilColor);
  const coilHot = new THREE.Color("#F08A4B");
  const txBase = new THREE.Color("#222530");
  const txHot = new THREE.Color("#F08A4B");
  const magBase = new THREE.Color("#7C8396");
  const magHot = new THREE.Color("#2D7FF9");
  const dark = new THREE.Color("#000000");
  const ledColors = {
    idle: new THREE.Color("#4868C8"),
    active: new THREE.Color("#F08A4B"),
    full: new THREE.Color("#2D884E"),
  };

  function update(t, state = {}) {
    const cut = kit.clamp01(state.cutaway ?? 0);
    topCover.position.set(0, 0.122 + cut * 0.22, -cut * 0.54);
    topCover.rotation.x = -cut * 0.48;

    const glow = kit.clamp01(state.coilGlow ?? 0);
    const pulse = 0.5 + 0.5 * Math.cos(t * 5.2);
    const glowMix = glow * (0.55 + 0.45 * pulse);
    coilMat.color.copy(coilBase).lerp(coilHot, glow * 0.85);
    coilMat.emissive.copy(dark).lerp(coilHot, glowMix * 0.55);

    const tx = kit.clamp01(state.txGlow ?? glow);
    txChip.material.color.copy(txBase).lerp(txHot, tx * 0.45);
    txChip.material.emissive.copy(dark).lerp(txHot, tx * 0.4);
    traceMat.emissive.copy(dark).lerp(txHot, tx * 0.5);

    const mag = kit.clamp01(state.magnetRing ?? 0);
    magnetGroup.visible = mag > 0.01;
    if (magnetGroup.visible) {
      magnetGroup.scale.setScalar(0.85 + 0.15 * mag);
      magMat.color.copy(magBase).lerp(magHot, mag * 0.25);
      magMat.emissive.copy(dark).lerp(magHot, mag * 0.2);
    }

    const tc = kit.clamp01(state.thickCase ?? 0);
    caseGroup.visible = tc > 0.01;
    if (caseGroup.visible) {
      caseGroup.position.set(0.04 + (1 - tc) * 0.72, 0.142 + (1 - tc) * 0.12, 0);
    }

    const st = state.led || (glow > 0.05 ? "active" : "idle");
    const lc = ledColors[st] || ledColors.idle;
    ledMat.color.copy(lc);
    ledMat.emissive.copy(dark).lerp(lc, st === "idle" ? 0.15 : 0.65);
  }

  update(0);
  return { group, hero: [chassis, topCover], anchors, path, update };
}
