// heat-pump-cutaway: original toon3d split-system heat pump (outdoor unit + indoor wall unit)
// with synchronized front-shell cutaway, spinning fans, coil bays, and directional heat chevrons.
// Origin at ground level midway between the outdoor unit (-x) and indoor unit (+x); front faces +z.
export function heatPumpCutaway(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    cutaway = 1,
    mode = "heating",
    fanSpeed = 1,
    shellColor = "#E6E6E1",
    frameColor = "#5B5E70",
    coilColor = "#D98245",
  } = opts;

  const group = new THREE.Group();
  group.name = "heat-pump-cutaway";

  const flat = m => { m.flatShading = true; return m; };
  const mesh = (geo, mat, x = 0, y = 0, z = 0, parent = group, name = "") => {
    const m = new THREE.Mesh(geo, mat);
    if (name) m.name = name;
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  const shellMat = flat(kit.toon(shellColor));
  const trimMat = flat(kit.toon(frameColor));
  const darkMat = flat(kit.toon("#3A3B4A"));
  const metalMat = flat(kit.toon("#B8BCC8"));
  const copperMat = flat(kit.toon(coilColor));

  const COLD_HEX = "#2D7FF9";
  const HOT_HEX = "#DD3428";
  const HEAT_HEX = "#F08A4B";

  const outCoilMat = flat(kit.toon(coilColor, { emissive: "#000000" }));
  outCoilMat.userData.roleTarget = true;
  const inCoilMat = flat(kit.toon(coilColor, { emissive: "#000000" }));
  inCoilMat.userData.roleTarget = true;

  // ── 1. OUTDOOR UNIT (centered at x = -1.35, grounded at y = 0) ─────────────────────────
  const outdoor = new THREE.Group();
  outdoor.name = "outdoor-unit";
  outdoor.position.set(-1.35, 0, 0);
  group.add(outdoor);

  const outW = 1.65, outH = 1.45, outD = 0.85, wallT = 0.07;
  // Base feet & structural chassis
  for (const fx of [-0.56, 0.56]) {
    mesh(new THREE.BoxGeometry(0.22, 0.10, outD + 0.08), darkMat, fx, 0.05, 0, outdoor, "out-foot");
  }
  mesh(new THREE.BoxGeometry(outW, 0.09, outD), trimMat, 0, 0.145, 0, outdoor, "out-base");
  // Back, left, right, top cabinet walls (left open at front for cutaway)
  mesh(new THREE.BoxGeometry(outW, outH, wallT), shellMat, 0, 0.19 + outH / 2, -outD / 2 + wallT / 2, outdoor, "out-back");
  mesh(new THREE.BoxGeometry(wallT, outH, outD), shellMat, -outW / 2 + wallT / 2, 0.19 + outH / 2, 0, outdoor, "out-left");
  mesh(new THREE.BoxGeometry(wallT, outH, outD), shellMat, outW / 2 - wallT / 2, 0.19 + outH / 2, 0, outdoor, "out-right");
  mesh(new THREE.BoxGeometry(outW + 0.04, wallT, outD + 0.04), trimMat, 0, 0.19 + outH + wallT / 2, 0, outdoor, "out-top");

  // Internal divider separating fan bay (left) and compressor/valve bay (right)
  mesh(new THREE.BoxGeometry(0.05, outH - 0.12, outD - 0.14), trimMat, 0.24, 0.19 + outH / 2, 0, outdoor, "out-divider");

  // Finned heat exchanger coil bank along back/left inside outdoor unit
  const outCoilGroup = new THREE.Group();
  outCoilGroup.name = "outdoor-coil-bay";
  outdoor.add(outCoilGroup);
  for (let i = 0; i < 6; i++) {
    const y = 0.34 + i * 0.20;
    const pipe = mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.92, 8), outCoilMat, -0.26, y, -0.24, outCoilGroup, "out-coil-tube");
    pipe.rotation.z = Math.PI / 2;
    pipe.userData.rolePart = "refrigerant";
  }
  for (let i = 0; i < 5; i++) {
    const x = -0.64 + i * 0.19;
    const fin = mesh(new THREE.BoxGeometry(0.02, 1.15, 0.14), metalMat, x, 0.88, -0.24, outCoilGroup, "out-fin");
  }

  // Outdoor fan hub + 5 pitched blades
  const fanGroup = new THREE.Group();
  fanGroup.name = "outdoor-fan";
  fanGroup.position.set(-0.26, 0.90, 0.06);
  outdoor.add(fanGroup);
  const fanHub = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.12, 10), darkMat, 0, 0, 0, fanGroup, "fan-hub");
  fanHub.rotation.x = Math.PI / 2;
  for (let i = 0; i < 5; i++) {
    const arm = new THREE.Group();
    arm.rotation.z = (i * Math.PI * 2) / 5;
    const blade = mesh(new THREE.BoxGeometry(0.12, 0.34, 0.03), metalMat, 0, 0.23, 0, arm, "fan-blade");
    blade.rotation.y = 0.35;
    fanGroup.add(arm);
  }

  // Mini compressor cylinder inside right bay of outdoor unit
  mesh(new THREE.CylinderGeometry(0.18, 0.19, 0.48, 10), darkMat, 0.50, 0.48, -0.02, outdoor, "out-comp-body");
  mesh(new THREE.SphereGeometry(0.18, 10, 5, 0, Math.PI * 2, 0, Math.PI / 2), darkMat, 0.50, 0.72, -0.02, outdoor, "out-comp-cap");

  // Front removable/hinged panel for outdoor unit (covers front when cutaway = 0)
  const outFront = new THREE.Group();
  outFront.name = "outdoor-front-shell";
  outFront.position.set(-outW / 2, 0.19, outD / 2);
  outdoor.add(outFront);
  mesh(new THREE.BoxGeometry(outW, outH, 0.06), shellMat, outW / 2, outH / 2, 0, outFront, "out-front-plate");
  // Intake grille ring & louvers on front shell (non-branded circular slats)
  const ring = mesh(new THREE.TorusGeometry(0.42, 0.035, 6, 16), trimMat, outW * 0.34, outH * 0.5, 0.04, outFront, "out-grille-ring");
  for (let i = -2; i <= 2; i++) {
    mesh(new THREE.BoxGeometry(0.74, 0.035, 0.03), darkMat, outW * 0.34, outH * 0.5 + i * 0.14, 0.04, outFront, "out-grille-bar");
  }
  // Louver slot on right side of front panel
  for (let i = 0; i < 3; i++) {
    mesh(new THREE.BoxGeometry(0.28, 0.04, 0.03), trimMat, outW * 0.80, outH * 0.35 + i * 0.16, 0.04, outFront, "out-side-vent");
  }

  // ── 2. INDOOR WALL UNIT (centered at x = 1.35, mounted at y = 1.80) ──────────────────────
  const indoor = new THREE.Group();
  indoor.name = "indoor-unit";
  indoor.position.set(1.35, 1.80, 0);
  group.add(indoor);

  const inW = 1.75, inH = 0.72, inD = 0.62;
  // Wall mounting plate & rear chassis
  mesh(new THREE.BoxGeometry(inW + 0.06, inH + 0.06, 0.05), trimMat, 0, 0, -inD / 2 - 0.02, indoor, "in-bracket");
  mesh(new THREE.BoxGeometry(inW, inH, wallT), shellMat, 0, 0, -inD / 2 + wallT / 2, indoor, "in-back");
  mesh(new THREE.BoxGeometry(wallT, inH, inD), shellMat, -inW / 2 + wallT / 2, 0, 0, indoor, "in-left");
  mesh(new THREE.BoxGeometry(wallT, inH, inD), shellMat, inW / 2 - wallT / 2, 0, 0, indoor, "in-right");
  mesh(new THREE.BoxGeometry(inW, wallT, inD), shellMat, 0, inH / 2 - wallT / 2, 0, indoor, "in-top");
  mesh(new THREE.BoxGeometry(inW, wallT, inD * 0.72), trimMat, 0, -inH / 2 + wallT / 2, -inD * 0.14, indoor, "in-bottom");

  // Indoor coil array (diagonal fin bank + copper tubes)
  const inCoilGroup = new THREE.Group();
  inCoilGroup.name = "indoor-coil-bay";
  indoor.add(inCoilGroup);
  for (let i = 0; i < 5; i++) {
    const y = -0.10 + i * 0.095;
    const z = 0.14 - i * 0.045;
    const tTube = mesh(new THREE.CylinderGeometry(0.028, 0.028, 1.36, 8), inCoilMat, 0, y, z, inCoilGroup, "in-coil-tube");
    tTube.rotation.z = Math.PI / 2;
    tTube.userData.rolePart = "refrigerant";
  }

  // Tangential blower drum inside indoor unit (outer group aligns cylinder axis along world X; inner spins on local Y)
  const blowerMount = new THREE.Group();
  blowerMount.name = "indoor-blower-mount";
  blowerMount.position.set(0, -0.10, -0.10);
  blowerMount.rotation.z = Math.PI / 2;
  indoor.add(blowerMount);
  const blower = mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.28, 10), darkMat, 0, 0, 0, blowerMount, "indoor-blower");
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI * 2) / 6;
    mesh(new THREE.BoxGeometry(0.05, 1.24, 0.025), metalMat, Math.cos(a) * 0.11, 0, Math.sin(a) * 0.11, blower, "blower-vane");
  }

  // Hinged air-outlet louver at bottom front
  const louver = new THREE.Group();
  louver.name = "indoor-louver";
  louver.position.set(0, -inH / 2 + 0.05, inD / 2 - 0.06);
  indoor.add(louver);
  mesh(new THREE.BoxGeometry(inW - 0.18, 0.04, 0.16), flat(kit.toon("#FAFCFB")), 0, 0, 0.04, louver, "louver-flap");

  // Front cutaway cowl for indoor unit (pivots upward when cutaway = 1)
  const inFront = new THREE.Group();
  inFront.name = "indoor-front-shell";
  inFront.position.set(0, inH / 2, inD / 2);
  indoor.add(inFront);
  mesh(new THREE.BoxGeometry(inW, inH - 0.10, 0.06), flat(kit.toon("#FAFCFB")), 0, -(inH - 0.10) / 2, 0, inFront, "in-front-plate");
  mesh(new THREE.BoxGeometry(inW - 0.24, 0.04, 0.02), trimMat, 0, -0.14, 0.035, inFront, "in-front-groove");

  // ── 3. INSULATED CONDUIT BRIDGE + DIRECTIONAL HEAT CHEVRONS ────────────────────────────
  const bridgeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.78, 0.52, -0.12),
    new THREE.Vector3(-0.20, 0.52, -0.18),
    new THREE.Vector3(0.25, 1.35, -0.18),
    new THREE.Vector3(0.60, 1.72, -0.12),
  ], false, "catmullrom", 0.2);
  mesh(new THREE.TubeGeometry(bridgeCurve, 28, 0.065, 8, false), trimMat, 0, 0, 0, group, "conduit-bridge");

  const heatMat = flat(kit.toon(HEAT_HEX, { emissive: "#000000" }));
  const heatChevrons = [];
  for (let i = 0; i < 4; i++) {
    const c = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.22, 4), heatMat);
    c.name = `heat-chevron-${i}`;
    c.userData.rolePart = "heat";
    c.rotation.z = -Math.PI / 2;
    group.add(c);
    heatChevrons.push(c);
  }

  kit.ink(group);

  const anchor = (name, p, parent = group) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    parent.add(o);
    return o;
  };
  const anchors = {
    outdoor: anchor("outdoor", [-1.35, 0.95, 0.45]),
    indoor: anchor("indoor", [1.35, 1.80, 0.35]),
    outdoorCoil: anchor("outdoorCoil", [-1.60, 0.90, -0.20]),
    indoorCoil: anchor("indoorCoil", [1.35, 1.82, 0.08]),
    fan: anchor("fan", [-1.61, 0.90, 0.16]),
    shell: anchor("shell", [0, 1.30, 0.45]),
  };

  const outAirPts = [[-2.35, 0.90, -0.35], [-1.62, 0.90, -0.18], [-1.62, 0.90, 0.55], [-1.62, 0.90, 1.20]];
  const inAirPts = [[1.35, 1.95, -0.10], [1.35, 1.70, 0.25], [1.35, 1.45, 0.80], [1.35, 1.15, 1.35]];
  function path(name = "outdoorAir") {
    const list = name === "outdoorAir" ? outAirPts : name === "indoorAir" ? inAirPts : null;
    if (!list) throw new Error("heatPumpCutaway: unknown path " + JSON.stringify(name));
    group.updateWorldMatrix(true, false);
    return list.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const baseCopper = new THREE.Color(coilColor);
  const coldCol = new THREE.Color(COLD_HEX);
  const hotCol = new THREE.Color(HOT_HEX);
  const heatCol = new THREE.Color(HEAT_HEX);
  const darkCol = new THREE.Color("#000000");

  function update(t, state = {}) {
    const cut = kit.clamp01(state.cutaway ?? cutaway);
    const active = kit.clamp01(state.active ?? (cut > 0.05 ? 1 : 0));
    const currentMode = state.mode ?? mode;
    const cooling = currentMode === "cooling";
    const speed = state.fanSpeed ?? fanSpeed;
    const heatFlow = kit.clamp01(state.heatFlow ?? active);

    // Smooth cutaway hinge/slide so closed state (0) seals cleanly and open state (1) exposes internals
    const cutEase = kit.ease(cut, "inOut");
    outFront.rotation.y = -cutEase * 1.85;
    outFront.position.z = outD / 2 + cutEase * 0.08;
    outFront.visible = cutEase < 0.98;

    inFront.rotation.x = -cutEase * 1.45;
    inFront.position.y = inH / 2 + cutEase * 0.14;
    inFront.visible = cutEase < 0.98;

    // Spinning outdoor fan & indoor blower purely from t
    fanGroup.rotation.z = -t * speed * 4.5;
    blower.rotation.y = t * speed * 6.0;
    louver.rotation.x = 0.22 + 0.45 * active;

    // Coil role coloring: neutral copper when inactive, role colors when active
    const outTarget = cooling ? hotCol : coldCol;
    const inTarget = cooling ? coldCol : hotCol;
    outCoilMat.color.copy(baseCopper).lerp(outTarget, active * 0.9);
    outCoilMat.emissive.copy(darkCol).lerp(outTarget, active * 0.25);
    inCoilMat.color.copy(baseCopper).lerp(inTarget, active * 0.9);
    inCoilMat.emissive.copy(darkCol).lerp(inTarget, active * 0.25);

    // Directional heat-energy chevrons moving along the bridge
    heatMat.emissive.copy(darkCol).lerp(heatCol, 0.35 * heatFlow);
    for (let i = 0; i < heatChevrons.length; i++) {
      const c = heatChevrons[i];
      c.visible = heatFlow > 0.04;
      if (!c.visible) continue;
      let u = ((t * 0.45 + i / heatChevrons.length) % 1 + 1) % 1;
      if (cooling) u = 1 - u;
      const p = bridgeCurve.getPointAt(u);
      const tan = bridgeCurve.getTangentAt(u);
      c.position.set(p.x, p.y + 0.24, p.z + 0.14);
      const dir = cooling ? -1 : 1;
      c.rotation.z = -Math.PI / 2 + Math.atan2(tan.y * dir, tan.x * dir);
      const s = 0.65 + 0.35 * Math.sin(u * Math.PI);
      c.scale.setScalar(s * heatFlow);
    }
  }

  update(0);
  return { group, hero: [outdoor, indoor], anchors, path, update };
}
