// qubit-chip: original toon3d cutaway superconducting quantum processor with 53-qubit matrix,
// #F5B942 entanglement link wiring, #5B7DB1 classical control electronics, #9B5DE5/#3DDC97
// interference rails, and a multi-tier cutaway cooling shell (cryo_shield) blocking #DD3428 noise.
// Origin at floor centre (y = 0); front cutaway & classical control face +z.
export function qubitChip(kit, opts = {}) {
  const { THREE } = kit;
  const {
    mode = "overview",
    qubitColor = "#9B5DE5",
    entangleColor = "#F5B942",
    controlColor = "#5B7DB1",
    resultColor = "#3DDC97",
    noiseColor = "#DD3428",
  } = opts;

  const group = new THREE.Group();
  group.name = "qubit-chip";

  const flat = (m) => { m.flatShading = true; return m; };
  const box = (w, h, d, mat, x, y, z, parent = group) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };
  const cyl = (rt, rb, h, segs, mat, x, y, z, parent = group) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, segs), mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  // 1. Carrier PCB base & gold perimeter pins
  const pcbMat = flat(kit.toon("#282E3F"));
  const pinMat = flat(kit.toon("#D6B25E"));
  const basePlate = box(2.40, 0.14, 1.94, pcbMat, 0, 0.07, 0);

  for (let i = -4; i <= 4; i++) {
    const off = i * 0.21;
    box(0.08, 0.05, 0.12, pinMat, off, 0.03, -1.01);
    box(0.12, 0.05, 0.08, pinMat, -1.24, 0.03, off * 0.8);
    box(0.12, 0.05, 0.08, pinMat, 1.24, 0.03, off * 0.8);
  }

  // 2. Classical Control Electronics Unit (#5B7DB1) along +z edge
  const ctrlGroup = new THREE.Group();
  ctrlGroup.name = "control-unit";
  ctrlGroup.position.set(0, 0.14, 0.72);
  group.add(ctrlGroup);

  const ctrlMat = flat(kit.toon(controlColor, { emissive: "#000000" }));
  const ctrlDarkMat = flat(kit.toon("#3C5682"));
  const ctrlBody = box(1.74, 0.20, 0.34, ctrlMat, 0, 0.10, 0, ctrlGroup);
  for (let i = -3; i <= 3; i++) {
    box(0.14, 0.06, 0.26, ctrlDarkMat, i * 0.23, 0.23, 0, ctrlGroup);
  }
  // Feed lines bridging classical controller (+z) to quantum interposer (-z)
  for (const fx of [-0.52, -0.18, 0.18, 0.52]) {
    box(0.06, 0.04, 0.28, ctrlMat, fx, 0.08, -0.26, ctrlGroup);
  }

  // 3. Superconducting Interposer Die & 53-Qubit Array
  const dieCenterZ = -0.16;
  const dieMat = flat(kit.toon("#2E3548"));
  const bezelMat = flat(kit.toon("#D8DCE6"));
  box(1.80, 0.06, 1.38, bezelMat, 0, 0.17, dieCenterZ);
  const dieDeck = box(1.66, 0.08, 1.24, dieMat, 0, 0.22, dieCenterZ);

  // 53 original hexagonal qubit pads: 7x7 core (49) + 4 cardinal outer pads = 53
  const gridGroup = new THREE.Group();
  gridGroup.name = "qubit-grid-53";
  gridGroup.position.set(0, 0.27, dieCenterZ);
  group.add(gridGroup);

  const padGeo = new THREE.CylinderGeometry(0.048, 0.052, 0.04, 6);
  const qubitPads = [];
  for (let r = -3; r <= 3; r++) {
    for (let c = -3; c <= 3; c++) {
      const mat = flat(kit.toon(qubitColor, { emissive: "#000000" }));
      const m = new THREE.Mesh(padGeo, mat);
      m.position.set(c * 0.19, 0.02, r * 0.155);
      gridGroup.add(m);
      qubitPads.push({ mesh: m, mat, dist: Math.hypot(c, r), idx: qubitPads.length });
    }
  }
  for (const [cx, cz] of [[0, -0.58], [0, 0.58], [-0.74, 0], [0.74, 0]]) {
    const mat = flat(kit.toon(qubitColor, { emissive: "#000000" }));
    const m = new THREE.Mesh(padGeo, mat);
    m.position.set(cx, 0.02, cz);
    gridGroup.add(m);
    qubitPads.push({ mesh: m, mat, dist: 4, idx: qubitPads.length });
  }

  // 4 raised readout resonator towers flanking the central qubits
  const resMat = flat(kit.toon("#C8CCD4"));
  for (const [rx, rz] of [[-0.56, -0.32], [0.56, -0.32], [-0.56, 0.32], [0.56, 0.32]]) {
    cyl(0.075, 0.085, 0.16, 8, resMat, rx, 0.34, dieCenterZ + rz);
  }

  // 4. Entanglement Link Wiring (#F5B942): planar bus traces + arched 3D couplers + pulses
  const busGroup = new THREE.Group();
  busGroup.name = "entangle-bus";
  busGroup.position.set(0, 0.29, dieCenterZ);
  group.add(busGroup);

  const entMat = flat(kit.toon(entangleColor, { emissive: entangleColor }));
  entMat.emissiveIntensity = 0.25;

  // Cross-die amber coupling tracks
  box(1.36, 0.025, 0.042, entMat, 0, 0.01, 0, busGroup);
  box(0.042, 0.025, 0.98, entMat, 0, 0.01, 0, busGroup);
  box(0.76, 0.025, 0.036, entMat, 0, 0.01, -0.31, busGroup);
  box(0.76, 0.025, 0.036, entMat, 0, 0.01, 0.31, busGroup);

  // Two arched entanglement coupler bridges over the center qubits
  const archCurves = [
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.38, 0.02, -0.155),
      new THREE.Vector3(-0.18, 0.22, -0.05),
      new THREE.Vector3(0.18, 0.22, 0.05),
      new THREE.Vector3(0.38, 0.02, 0.155),
    ]),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.38, 0.02, 0.155),
      new THREE.Vector3(-0.18, 0.22, 0.05),
      new THREE.Vector3(0.18, 0.22, -0.05),
      new THREE.Vector3(0.38, 0.02, -0.155),
    ]),
  ];
  for (const curve of archCurves) {
    const arch = new THREE.Mesh(new THREE.TubeGeometry(curve, 18, 0.026, 6, false), entMat);
    busGroup.add(arch);
  }

  // Animated entanglement link pulses along the arch bridges
  const pulseGeo = new THREE.SphereGeometry(0.048, 8, 6);
  const pulseMat = kit.toon(entangleColor, { emissive: entangleColor });
  pulseMat.emissiveIntensity = 0.6;
  const pulses = [];
  for (let i = 0; i < 4; i++) {
    const pm = new THREE.Mesh(pulseGeo, pulseMat);
    busGroup.add(pm);
    pulses.push({ mesh: pm, curve: archCurves[i % 2], offset: (i * 0.25) });
  }

  // 5. Interference Wave Columns (#9B5DE5 & #3DDC97) for quantum_circuit / interference
  const waveGroup = new THREE.Group();
  waveGroup.name = "interference-rails";
  waveGroup.position.set(0, 0.34, dieCenterZ);
  waveGroup.visible = false;
  group.add(waveGroup);

  const waveCols = [];
  const waveBarGeo = new THREE.BoxGeometry(0.14, 1.0, 0.14);
  waveBarGeo.translate(0, 0.5, 0);
  for (let i = -2; i <= 2; i++) {
    const isTarget = i === 0;
    const mat = flat(kit.toon(isTarget ? resultColor : qubitColor, { emissive: isTarget ? resultColor : "#000000" }));
    const bar = new THREE.Mesh(waveBarGeo, mat);
    bar.position.set(i * 0.30, 0, 0);
    waveGroup.add(bar);
    waveCols.push({ bar, mat, isTarget, idx: i + 2 });
  }

  // 6. Cryogenic Cooling Shell (cryo_shield): multi-tier cutaway dome + blocked #DD3428 noise spikes
  const cryoGroup = new THREE.Group();
  cryoGroup.name = "cryo-shield";
  cryoGroup.position.set(0, 0, dieCenterZ);
  cryoGroup.visible = false;
  group.add(cryoGroup);

  const outerShieldMat = flat(kit.toon("#A9B8CC"));
  outerShieldMat.side = THREE.DoubleSide;
  const innerShieldMat = flat(kit.toon("#D49A6A"));
  innerShieldMat.side = THREE.DoubleSide;
  const plateMat = flat(kit.toon("#D8DCE6"));

  // Cutaway open on +z (arc = 1.25 * PI centered on -z) so the inner qubits remain visible
  const arcLen = Math.PI * 1.25;
  const arcStart = Math.PI * 0.375;

  const outerShell = new THREE.Mesh(
    new THREE.CylinderGeometry(1.16, 1.18, 1.06, 18, 1, true, arcStart, arcLen),
    outerShieldMat
  );
  outerShell.position.y = 0.72;
  cryoGroup.add(outerShell);

  const innerShell = new THREE.Mesh(
    new THREE.CylinderGeometry(0.96, 0.98, 0.86, 16, 1, true, arcStart, arcLen),
    innerShieldMat
  );
  innerShell.position.y = 0.62;
  cryoGroup.add(innerShell);

  // Top cooling flange plates & suspension rods
  cyl(1.22, 1.22, 0.08, 18, plateMat, 0, 1.28, 0, cryoGroup);
  cyl(1.00, 1.00, 0.07, 16, innerShieldMat, 0, 1.08, 0, cryoGroup);
  cyl(0.46, 0.52, 0.14, 12, plateMat, 0, 1.38, 0, cryoGroup);
  for (const [sx, sz] of [[-0.82, -0.58], [0.82, -0.58], [-0.82, 0.32], [0.82, 0.32]]) {
    cyl(0.032, 0.032, 0.98, 6, plateMat, sx, 0.78, sz, cryoGroup);
  }

  // Thermal noise particles (#DD3428) bouncing off outside of the cooling shell
  const noiseMat = flat(kit.toon(noiseColor, { emissive: noiseColor }));
  noiseMat.emissiveIntensity = 0.45;
  const noiseGeo = new THREE.OctahedronGeometry(0.095, 0);
  const noiseSpikes = [];
  const noiseAngles = [-2.25, -1.75, -1.25, 1.25, 1.75, 2.25];
  for (let i = 0; i < noiseAngles.length; i++) {
    const m = new THREE.Mesh(noiseGeo, noiseMat);
    cryoGroup.add(m);
    noiseSpikes.push({ mesh: m, angle: noiseAngles[i], phase: i * 0.17 });
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
    center: anchor("center", [0, 0.36, dieCenterZ]),
    die: anchor("die", [0, 0.30, dieCenterZ]),
    cryoShell: anchor("cryoShell", [0, 1.38, dieCenterZ]),
    entangleBus: anchor("entangleBus", [0, 0.50, dieCenterZ]),
    controlUnit: anchor("controlUnit", [0, 0.36, 0.72]),
  };

  const colDark = new THREE.Color("#000000");
  const colQubit = new THREE.Color(qubitColor);
  const colPadIdle = new THREE.Color("#4B536D");
  const colEntangle = new THREE.Color(entangleColor);
  const colCtrl = new THREE.Color(controlColor);
  const colResult = new THREE.Color(resultColor);
  const colNoise = new THREE.Color(noiseColor);

  function update(t, state = {}) {
    const m = state.mode ?? mode;
    const wave = 0.5 + 0.5 * Math.sin(t * 4.5);

    const isCryo = m === "cryo_shield" || (state.shield ?? 0) > 0.02;
    const isGrid53 = m === "grid_53";
    const isEntangle = m === "entangle_circuit";
    const isInterf = m === "interference";
    const isHybrid = m === "control_hybrid";
    const noiseLevel = kit.clamp01(state.noise ?? (isCryo ? 1 : 0));

    // 1. Qubit pads (53 pads)
    qubitPads.forEach((p) => {
      let active = false;
      let padCol = colPadIdle;
      let glow = 0.08;

      if (isGrid53) {
        const ripple = 0.5 + 0.5 * Math.sin(t * 4.0 - p.dist * 0.9);
        active = true;
        padCol = colQubit;
        glow = 0.25 + 0.45 * ripple;
      } else if (isInterf) {
        active = p.dist < 1.5;
        padCol = active ? colResult : colQubit;
        glow = active ? 0.55 : 0.18;
      } else if (noiseLevel > 0.1 && !isCryo && p.dist >= 2.8) {
        padCol = colNoise;
        glow = 0.35 + 0.25 * wave;
      } else {
        active = p.dist < 1.6;
        padCol = active ? colQubit : colPadIdle;
        glow = active ? 0.30 + 0.25 * Math.sin(t * 3.0 + p.idx * 0.4) : 0.06;
      }

      p.mat.color.copy(padCol);
      p.mat.emissive.copy(colDark).lerp(padCol, glow);
    });

    // 2. Entanglement bus & pulse spheres (#F5B942)
    const entStrength = isEntangle ? 1.0 : 0.45;
    entMat.emissive.copy(colDark).lerp(colEntangle, entStrength * (0.25 + 0.35 * wave));
    pulses.forEach((pl) => {
      pl.mesh.visible = isEntangle || m === "overview" || m === "grid_53";
      if (pl.mesh.visible) {
        const speed = isEntangle ? 1.05 : 0.45;
        const u = (t * speed + pl.offset) % 1;
        pl.curve.getPointAt(u, pl.mesh.position);
      } else {
        pl.mesh.position.set(0, 0, 0);
      }
    });

    // 3. Classical control unit (#5B7DB1)
    const ctrlGlow = isHybrid ? 0.45 + 0.3 * wave : 0.12;
    ctrlMat.color.copy(colCtrl);
    ctrlMat.emissive.copy(colDark).lerp(colCtrl, ctrlGlow);

    // 4. Interference amplitude bars (#9B5DE5 + amplified #3DDC97)
    waveGroup.visible = isInterf || Boolean(state.showWaves);
    waveCols.forEach((wc) => {
      if (waveGroup.visible) {
        const amp = wc.isTarget
          ? 0.55 + 0.30 * (0.5 + 0.5 * Math.sin(t * 3.5))
          : 0.12 + 0.10 * Math.abs(Math.sin(t * 4.0 + wc.idx * 1.4));
        wc.bar.scale.y = amp;
        const c = wc.isTarget ? colResult : colQubit;
        wc.mat.color.copy(c);
        wc.mat.emissive.copy(colDark).lerp(c, wc.isTarget ? 0.5 + 0.25 * wave : 0.2);
      } else {
        wc.bar.scale.y = 1;
      }
    });

    // 5. Cryogenic cooling shell (cryo_shield) & blocked #DD3428 noise particles
    cryoGroup.visible = isCryo;
    if (isCryo) {
      const sh = kit.clamp01(state.shield ?? (0.35 + 0.65 * kit.ease(kit.progress(t, 0, 0.8), "out")));
      cryoGroup.position.y = kit.lerp(1.15, 0, sh);
      noiseSpikes.forEach((ns) => {
        ns.mesh.visible = noiseLevel > 0.05;
        if (ns.mesh.visible) {
          const bounce = Math.abs(Math.sin(t * 3.2 + ns.phase * Math.PI * 2));
          const rad = 1.32 + 0.28 * bounce;
          ns.mesh.position.set(
            Math.sin(ns.angle) * rad,
            0.55 + 0.28 * Math.cos(t * 2.5 + ns.phase * 6),
            -Math.cos(ns.angle) * rad
          );
          ns.mesh.rotation.y = t * 2.0 + ns.phase * 4;
        } else {
          ns.mesh.position.set(0, 0, 0);
          ns.mesh.rotation.y = 0;
        }
      });
    } else {
      cryoGroup.position.y = 0;
      noiseSpikes.forEach((ns) => {
        ns.mesh.visible = false;
        ns.mesh.position.set(0, 0, 0);
        ns.mesh.rotation.y = 0;
      });
    }
  }

  update(0);
  return { group, hero: [basePlate, dieDeck, ctrlBody], anchors, update };
}
