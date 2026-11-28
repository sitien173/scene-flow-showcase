// external-circuit: toon3d copper conductor arch connecting negative and positive
// terminals through a processor chip IC, an illuminated display load screen, a
// dockable top charger plug module, and animated yellow electron (e-) beads
// supporting discharge (forward), charge (reverse), idle, and short-circuit modes.
// Origin at terminal baseline (y = 0); leads sit at x = -1.05 and x = +1.05.
export function externalCircuit(kit, opts = {}) {
  const { THREE } = kit;
  const {
    wireColor = "#D98245",
    electronColor = "#FCD53E",
    chipColor = "#2B2D38",
    alertColor = "#DD3428",
    goodColor = "#2D884E",
  } = opts;

  const group = new THREE.Group();
  group.name = "external-circuit";

  const box = (w, h, d, mat, x, y, z, parent = group) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  // Terminal clamps at base (y = 0, x = +/-1.05) matching cell-cutaway terminals
  const clampMat = kit.toon("#3B4052");
  const copperMat = kit.toon(wireColor);
  const redCollarMat = kit.toon(alertColor);
  box(0.28, 0.12, 0.28, clampMat, -1.05, 0.06, 0);
  box(0.28, 0.12, 0.28, redCollarMat, 1.05, 0.06, 0);

  // Main copper conductor arch
  const wirePts = [
    [-1.05, 0.10, 0],
    [-1.05, 1.18, 0],
    [-0.88, 1.36, 0],
    [-0.38, 1.36, 0],
    [0.0, 1.36, 0],
    [0.42, 1.36, 0],
    [0.88, 1.36, 0],
    [1.05, 1.18, 0],
    [1.05, 0.10, 0],
  ];
  const wireCurve = new THREE.CatmullRomCurve3(
    wirePts.map(p => new THREE.Vector3(...p)),
    false,
    "catmullrom",
    0.15
  );
  const wireMesh = new THREE.Mesh(new THREE.TubeGeometry(wireCurve, 56, 0.052, 8, false), copperMat);
  group.add(wireMesh);

  // Processor chip IC on left-top branch (x = -0.38, y = 1.36)
  const chipGroup = new THREE.Group();
  chipGroup.position.set(-0.38, 1.36, 0);
  group.add(chipGroup);

  const chipBodyMat = kit.toon(chipColor, { emissive: "#000000" });
  const chipBody = box(0.38, 0.26, 0.20, chipBodyMat, 0, 0, 0, chipGroup);
  const pinMat = kit.toon("#B8C0CE");
  for (let i = 0; i < 4; i++) {
    const px = -0.12 + i * 0.08;
    box(0.03, 0.06, 0.05, pinMat, px, 0.15, 0.03, chipGroup);
    box(0.03, 0.06, 0.05, pinMat, px, -0.15, 0.03, chipGroup);
  }
  const chipCoreMat = kit.toon(electronColor, { emissive: "#000000" });
  const chipCore = box(0.18, 0.10, 0.04, chipCoreMat, 0, 0, 0.10, chipGroup);

  // Display load module on right-top branch (x = +0.44, y = 1.36)
  const loadGroup = new THREE.Group();
  loadGroup.position.set(0.44, 1.36, 0);
  group.add(loadGroup);

  box(0.44, 0.30, 0.18, kit.toon("#2B2D38"), 0, 0, 0, loadGroup);
  const screenTex = kit.canvasTexture(192, 128, (g, w, h) => {
    g.fillStyle = "#1E2433";
    g.fillRect(0, 0, w, h);
    g.fillStyle = "#FCD53E";
    g.fillRect(18, 72, 24, 34);
    g.fillRect(50, 54, 24, 52);
    g.fillRect(82, 36, 24, 70);
    g.fillStyle = "#FCD53E";
    g.fillRect(114, 24, 24, 82);
    g.fillRect(146, 24, 26, 82);
  });
  const screenMat = kit.toon("#FFFFFF", { map: screenTex, emissive: "#000000" });
  const screenMesh = box(0.36, 0.22, 0.03, screenMat, 0, 0, 0.09, loadGroup);

  // Top charger port & dockable charger plug module (x = 0.0, y = 1.36..1.98)
  const portMat = kit.toon("#4C536B");
  box(0.20, 0.12, 0.18, portMat, 0, 1.42, 0);

  const plugGroup = new THREE.Group();
  plugGroup.position.set(0, 1.66, 0);
  group.add(plugGroup);
  const plugBody = box(0.24, 0.28, 0.22, kit.toon("#FAFCFB"), 0, 0.14, 0, plugGroup);
  box(0.26, 0.08, 0.24, kit.toon("#3B4052"), 0, 0.02, 0, plugGroup);
  // Two prongs sliding into port
  box(0.035, 0.11, 0.035, pinMat, -0.055, -0.06, 0, plugGroup);
  box(0.035, 0.11, 0.035, pinMat, 0.055, -0.06, 0, plugGroup);
  const plugLedMat = kit.toon(goodColor, { emissive: "#000000" });
  box(0.08, 0.04, 0.03, plugLedMat, 0, 0.16, 0.11, plugGroup);
  const cordCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.28, 0),
    new THREE.Vector3(0, 0.56, -0.06),
    new THREE.Vector3(-0.22, 0.72, -0.18),
  ]);
  const cordMesh = new THREE.Mesh(new THREE.TubeGeometry(cordCurve, 16, 0.028, 6, false), kit.toon("#2B2D38"));
  plugGroup.add(cordMesh);

  // Short-circuit warning bridge + pulse ring at base (visible only when mode === "short")
  const shortGroup = new THREE.Group();
  shortGroup.visible = false;
  group.add(shortGroup);
  const shortMat = kit.toon(alertColor, { emissive: alertColor });
  const shortRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.032, 6, 16), shortMat);
  shortRing.position.set(0, 0.30, 0.06);
  const shortBridge = new THREE.Mesh(new THREE.BoxGeometry(1.86, 0.055, 0.06), shortMat);
  shortBridge.position.set(0, 0.12, 0);
  shortGroup.add(shortRing, shortBridge);

  // Yellow e- electron beads riding along wireCurve
  const electronMat = kit.toon(electronColor, { emissive: "#000000" });
  const electronGroup = new THREE.Group();
  group.add(electronGroup);
  const beadCount = 10;
  const beads = [];
  for (let i = 0; i < beadCount; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.072, 12, 10), electronMat);
    m.position.set(0, 1.36, 0);
    electronGroup.add(m);
    beads.push(m);
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
    negLead: anchor("negLead", [-1.05, 0.12, 0]),
    posLead: anchor("posLead", [1.05, 0.12, 0]),
    chip: anchor("chip", [-0.38, 1.36, 0.14]),
    load: anchor("load", [0.44, 1.36, 0.14]),
    chargerPort: anchor("chargerPort", [0, 1.48, 0]),
    plug: anchor("plug", [0, 1.76, 0]),
    topArch: anchor("topArch", [0, 1.36, 0]),
    body: anchor("body", [0, 0.90, 0]),
  };

  function path(name = "wire") {
    const pts = name === "wire" ? wirePts : name === "reverseWire" ? [...wirePts].reverse() : null;
    if (!pts) throw new Error("externalCircuit: no path " + JSON.stringify(name) + "; use wire or reverseWire");
    group.updateWorldMatrix(true, false);
    return pts.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const yellowCol = new THREE.Color(electronColor);
  const chipIdle = new THREE.Color(chipColor);
  const chipHot = new THREE.Color("#FCD53E");
  const chargeCol = new THREE.Color("#FCD53E");
  const goodCol = new THREE.Color(goodColor);
  const alertCol = new THREE.Color(alertColor);
  const dimCol = new THREE.Color("#5B5E70");
  const dark = new THREE.Color("#000000");

  // state:
  //   mode: "discharge" | "charge" | "idle" | "short"
  //   chipGlow: 0..1 (processor activity glow)
  //   loadGlow: 0..1 (display load brightness)
  //   chargerPlug: 0..1 (0 = hovering detached, 1 = plugged into top port)
  function update(t, state = {}) {
    const mode = state.mode ?? opts.mode ?? "discharge";
    const chip = kit.clamp01(state.chipGlow ?? opts.chipGlow ?? (mode === "discharge" ? 0.85 : mode === "charge" ? 0.4 : 0));
    const load = kit.clamp01(state.loadGlow ?? opts.loadGlow ?? (mode === "discharge" ? 0.9 : mode === "charge" ? 0.35 : 0));
    const plug = kit.clamp01(state.chargerPlug ?? opts.chargerPlug ?? (mode === "charge" ? 1 : 0));

    // Dock charger plug smoothly
    plugGroup.visible = plug > 0.02;
    plugGroup.position.y = kit.lerp(2.05, 1.50, plug);
    plugLedMat.color.copy(mode === "charge" ? goodCol : plug > 0.8 ? chipHot : dimCol);
    plugLedMat.emissive.copy(dark).lerp(goodCol, mode === "charge" ? 0.65 * plug : 0);

    // Chip & load indicators
    const pulse = 0.72 + 0.28 * Math.sin(t * 7.5);
    chipBodyMat.color.copy(chipIdle).lerp(mode === "charge" ? chargeCol : chipHot, chip * 0.22);
    chipCoreMat.color.copy(mode === "short" ? alertCol : mode === "charge" ? chargeCol : yellowCol);
    chipCoreMat.emissive.copy(dark).lerp(mode === "charge" ? chargeCol : chipHot, chip * 0.65 * pulse);

    screenMat.emissive.copy(dark).lerp(mode === "charge" ? chargeCol : yellowCol, load * 0.45);
    screenMesh.scale.setScalar(0.98 + 0.02 * load);

    // Short circuit indicator
    shortGroup.visible = mode === "short";
    if (shortGroup.visible) {
      shortRing.scale.setScalar(0.88 + 0.22 * Math.abs(Math.sin(t * 8)));
    }

    // Electron beads along copper wire
    const dir = mode === "discharge" ? 1 : mode === "charge" ? -1 : 0;
    const speed = 0.26;
    electronMat.color.copy(mode === "idle" || mode === "short" ? dimCol : yellowCol);
    electronMat.emissive.copy(dark).lerp(yellowCol, dir !== 0 ? 0.35 : 0);

    beads.forEach((bead, i) => {
      const base = i / beadCount;
      const u = dir === 0 ? base : (((base + t * speed * dir) % 1) + 1) % 1;
      const pt = wireCurve.getPointAt(u);
      bead.position.copy(pt);
      // Smoothly lift Z over chip and load housings so beads glide continuously across front face
      const overChip = kit.clamp01(1 - Math.abs(pt.x + 0.38) / 0.25);
      const overLoad = kit.clamp01(1 - Math.abs(pt.x - 0.44) / 0.28);
      const overPort = kit.clamp01(1 - Math.abs(pt.x) / 0.15);
      const nearTop = kit.clamp01(1 - Math.abs(pt.y - 1.36) / 0.18);
      bead.position.z = Math.max(overChip * 0.14, overLoad * 0.14, overPort * 0.13) * nearTop;
      bead.visible = mode !== "idle";
    });
  }

  update(0);
  return { group, hero: [wireMesh, chipBody, screenMesh, plugBody], anchors, path, update };
}
