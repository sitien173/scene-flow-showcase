// memory-cell: illustrative vertical cutaway of a toon3d flash memory cell showing control gate (#E879F9),
// upper & lower insulating oxide layers, charge-trapping chamber holding #22D3EE electrons, neutral-ink
// conduction channel (#18191E), and stored bit state / threshold voltage gauge (#F59E0B).
// Origin at base centre (y = 0); cross-section cutaway faces +z.
export function memoryCell(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    substrateColor = "#444B5E",
    insulatorColor = "#E6E6E1",
    gateColor = "#565D75",
    mode = "trapped_charge",
  } = opts;

  const group = new THREE.Group();
  group.name = "memory-cell";

  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // 1. Silicon substrate base + Source / Drain terminals + recessed conduction channel
  const subMat = kit.toon(substrateColor);
  const termMat = kit.toon("#C8CCD4");
  const chanMat = kit.toon("#282D3B");
  const substrate = box(1.90, 0.34, 0.86, subMat, 0, 0.17, 0);
  // Source (-x) and Drain (+x) raised pads
  box(0.28, 0.10, 0.62, termMat, -0.78, 0.39, 0);
  box(0.28, 0.10, 0.62, termMat, 0.78, 0.39, 0);
  // Conduction channel groove across top of substrate
  box(1.24, 0.05, 0.44, chanMat, 0, 0.345, 0.10);

  // Neutral-ink (#18191E) current flow beads inside conduction channel
  const flowBeadGeo = new THREE.BoxGeometry(0.11, 0.045, 0.08);
  const flowMat = kit.toon(PALETTE.ink || "#18191E");
  const flowBeads = [];
  for (let i = 0; i < 6; i++) {
    const b = new THREE.Mesh(flowBeadGeo, flowMat);
    b.position.set(-0.45 + i * 0.18, 0.375, 0.34);
    group.add(b);
    flowBeads.push(b);
  }
  // Channel pinch/barrier marker shown when threshold_read_block prevents conduction
  const barrierMat = kit.toon("#18191E");
  const blockBarrier = box(0.08, 0.12, 0.36, barrierMat, 0, 0.37, 0.22);

  // 2. Lower insulating oxide layer (tunnel oxide)
  const insMat = kit.toon(insulatorColor);
  const insCutMat = kit.toon("#D6D2C7");
  box(1.44, 0.13, 0.66, insMat, 0, 0.47, -0.04);
  box(1.44, 0.03, 0.14, insCutMat, 0, 0.42, 0.30);

  // 3. Charge-trapping / storage chamber (open front cutaway facing +z)
  const trapGroup = new THREE.Group();
  trapGroup.name = "charge-trap";
  trapGroup.position.set(0, 0.74, 0);
  group.add(trapGroup);
  const trapBackMat = kit.toon("#272E40");
  const trapSideMat = kit.toon("#5A627A");
  box(1.42, 0.38, 0.24, trapBackMat, 0, 0, -0.22, trapGroup);
  box(0.10, 0.38, 0.64, trapSideMat, -0.66, 0, -0.02, trapGroup);
  box(0.10, 0.38, 0.64, trapSideMat, 0.66, 0, -0.02, trapGroup);

  // 12 trapped electron spheres (#22D3EE)
  const eGeo = new THREE.SphereGeometry(0.056, 10, 8);
  const electronMat = kit.toon("#22D3EE", { emissive: "#22D3EE" });
  electronMat.emissiveIntensity = 0.45;
  const electrons = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 6; col++) {
      const m = new THREE.Mesh(eGeo, electronMat);
      const bx = -0.45 + col * 0.18;
      const by = -0.08 + row * 0.16;
      const bz = 0.06 + ((row + col) % 2) * 0.06;
      m.position.set(bx, by, bz);
      trapGroup.add(m);
      electrons.push({ mesh: m, bx, by, bz });
    }
  }

  // Tunneling electron stream (#22D3EE) passing upward through lower oxide during tunnel_write
  const tunnelElectrons = [];
  for (let i = 0; i < 4; i++) {
    const m = new THREE.Mesh(eGeo, electronMat);
    m.position.set(-0.27 + i * 0.18, 0.42, 0.32);
    group.add(m);
    tunnelElectrons.push(m);
  }

  // 4. Upper blocking insulating oxide layer
  box(1.44, 0.13, 0.72, insMat, 0, 1.00, 0);

  // 5. Control gate electrode + #E879F9 command voltage collar
  const gateGroup = new THREE.Group();
  gateGroup.name = "control-gate";
  gateGroup.position.set(0, 1.18, 0);
  group.add(gateGroup);
  const gateBody = box(1.36, 0.22, 0.74, kit.toon(gateColor), 0, 0, 0, gateGroup);
  box(0.48, 0.10, 0.42, termMat, 0, 0.16, 0, gateGroup);
  const gateCmdMat = kit.toon("#E879F9", { emissive: "#000000" });
  const gateRing = box(1.42, 0.06, 0.78, gateCmdMat, 0, -0.06, 0, gateGroup);

  // 6. Side threshold voltage / stored bit state gauge (#F59E0B) + probe voltage marker (#E879F9)
  const gaugeGroup = new THREE.Group();
  gaugeGroup.name = "threshold-gauge";
  gaugeGroup.position.set(1.18, 0.20, 0.05);
  group.add(gaugeGroup);
  box(0.24, 1.08, 0.24, kit.toon("#2B3040"), 0, 0.54, 0, gaugeGroup);
  const threshGeo = new THREE.BoxGeometry(0.16, 0.92, 0.16);
  threshGeo.translate(0, 0.46, 0);
  const threshMat = kit.toon("#F59E0B", { emissive: "#000000" });
  const threshBar = new THREE.Mesh(threshGeo, threshMat);
  threshBar.position.set(0, 0.08, 0.07);
  gaugeGroup.add(threshBar);

  // 3 divider notches for 4-level (multi_level) mode
  const levelDivs = [];
  const divMat = kit.toon("#18191E");
  for (let i = 1; i <= 3; i++) {
    const d = box(0.26, 0.024, 0.28, divMat, 0, 0.08 + i * 0.23, 0.01, gaugeGroup);
    levelDivs.push(d);
  }

  // Sliding probe voltage marker (#E879F9)
  const probeMat = kit.toon("#E879F9", { emissive: "#E879F9" });
  probeMat.emissiveIntensity = 0.35;
  const probeMarker = box(0.34, 0.05, 0.32, probeMat, 0, 0.56, 0.04, gaugeGroup);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    center: anchor("center", [0, 0.68, 0]),
    gate: anchor("gate", [0, 1.24, 0]),
    upperInsulator: anchor("upperInsulator", [0, 1.00, 0.22]),
    chargeTrap: anchor("chargeTrap", [0, 0.74, 0.22]),
    lowerInsulator: anchor("lowerInsulator", [0, 0.47, 0.25]),
    channel: anchor("channel", [0, 0.37, 0.34]),
    source: anchor("source", [-0.78, 0.42, 0]),
    drain: anchor("drain", [0.78, 0.42, 0]),
    thresholdGauge: anchor("thresholdGauge", [1.18, 0.76, 0.18]),
  };

  const colDark = new THREE.Color("#000000");
  const colCmd = new THREE.Color("#E879F9");
  const colBit = new THREE.Color("#F59E0B");
  const colGateIdle = new THREE.Color("#6B728A");

  function update(t, state = {}) {
    const m = state.mode ?? mode;
    const defaults = {
      trapped_charge: { charge: 0.75, tunnel: 0, probe: null, conducting: false, gateGlow: 0, levels: 2 },
      tunnel_write: { charge: 0.5 + 0.45 * kit.clamp01((t % 2) / 2), tunnel: 1, probe: null, conducting: false, gateGlow: 1, levels: 2 },
      threshold_read_pass: { charge: 0.25, tunnel: 0, probe: 0.62, conducting: true, gateGlow: 0.7, levels: 2 },
      threshold_read_block: { charge: 0.85, tunnel: 0, probe: 0.52, conducting: false, gateGlow: 0.7, levels: 2 },
      multi_level: { charge: (1 + ((state.level ?? 2) % 4)) * 0.23, tunnel: 0, probe: 0.58, conducting: false, gateGlow: 0.4, levels: 4 },
    }[m] || { charge: 0.75, tunnel: 0, probe: null, conducting: false, gateGlow: 0, levels: 2 };

    const charge = kit.clamp01(state.charge ?? defaults.charge);
    const tunnel = kit.clamp01(state.tunnel ?? defaults.tunnel);
    const conducting = state.conducting ?? defaults.conducting;
    const gateGlow = kit.clamp01(state.gateGlow ?? defaults.gateGlow);
    const levels = state.levels ?? defaults.levels;
    const probeVal = state.probe !== undefined ? state.probe : defaults.probe;

    // Trapped electrons inside storage chamber (#22D3EE)
    const activeCount = Math.round(charge * electrons.length);
    electrons.forEach((e, i) => {
      e.mesh.visible = i < activeCount;
      if (e.mesh.visible) {
        e.mesh.position.set(
          e.bx + 0.015 * Math.sin(t * 2.8 + i * 0.9),
          e.by + 0.018 * Math.cos(t * 3.1 + i * 1.1),
          e.bz
        );
      }
    });

    // Tunneling electrons rising through lower oxide (#22D3EE)
    tunnelElectrons.forEach((te, i) => {
      te.visible = tunnel > 0.05;
      if (te.visible) {
        const phase = (t * 1.15 + i * 0.25) % 1;
        te.position.set(-0.27 + i * 0.18, kit.lerp(0.36, 0.72, phase), 0.39);
        const s = 0.7 + 0.3 * Math.sin(phase * Math.PI);
        te.scale.setScalar(s);
      }
    });

    // Control gate command pulse (#E879F9)
    const wave = 0.5 + 0.5 * Math.sin(t * 5.0);
    if (gateGlow > 0.05) {
      gateRing.material.color.copy(colCmd);
      gateRing.material.emissive.copy(colDark).lerp(colCmd, gateGlow * (0.45 + 0.3 * wave));
    } else {
      gateRing.material.color.copy(colGateIdle);
      gateRing.material.emissive.copy(colDark);
    }

    // Channel current beads (#18191E)
    blockBarrier.visible = !conducting && (m === "threshold_read_block" || probeVal !== null);
    flowBeads.forEach((fb, i) => {
      if (conducting) {
        const p = (t * 0.75 + i / flowBeads.length) % 1;
        fb.position.x = kit.lerp(-0.56, 0.56, p);
        fb.visible = true;
      } else {
        // Parked before center barrier when blocked, or hidden at rest
        fb.position.x = -0.52 + (i % 3) * 0.16;
        fb.visible = m === "threshold_read_block" ? i < 3 : false;
      }
    });

    // Threshold / stored bit gauge (#F59E0B)
    gaugeGroup.visible = state.showGauge ?? true;
    threshBar.scale.y = Math.max(0.12, charge);
    threshMat.emissive.copy(colDark).lerp(colBit, 0.25 + 0.35 * charge);

    levelDivs.forEach((d) => {
      d.visible = levels >= 4;
    });

    if (probeVal !== null && probeVal !== undefined) {
      probeMarker.visible = true;
      probeMarker.position.y = 0.08 + kit.clamp01(probeVal) * 0.92;
    } else {
      probeMarker.visible = false;
    }
  }

  update(0);
  return { group, hero: [substrate, gateBody], anchors, update };
}
