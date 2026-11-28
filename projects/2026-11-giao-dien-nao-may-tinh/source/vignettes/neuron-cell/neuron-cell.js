// neuron-cell: toon3d magnified biological neuron with soma + nucleus, 6 dendrites,
// myelinated axon with Nodes of Ranvier, synaptic terminals, #00B4D8 action-potential pulses,
// and #F59E0B 20/100 ms spike-binning gate for step 2 filtering & counting.
// Origin below soma-axon midpoint (y = 0); axon runs along +x.
export function neuronCell(kit, opts = {}) {
  const { THREE } = kit;
  const {
    somaColor = "#B89AC9",
    myelinColor = "#F4F1E8",
    mode = "firing",
  } = opts;

  const group = new THREE.Group();
  group.name = "neuron-cell";

  // 1. Soma (cell body) & nucleus at x = -0.85, y = 1.05
  const somaCenter = new THREE.Vector3(-0.85, 1.05, 0);
  const somaGroup = new THREE.Group();
  somaGroup.name = "soma";
  somaGroup.position.copy(somaCenter);
  group.add(somaGroup);

  const somaMat = kit.toon(somaColor, { emissive: "#000000" });
  const somaGeo = new THREE.IcosahedronGeometry(0.42, 1);
  const somaMesh = new THREE.Mesh(somaGeo, somaMat);
  somaMesh.scale.set(1.12, 0.92, 0.96);
  somaGroup.add(somaMesh);

  // Nucleus raised inside soma membrane window
  const nucMat = kit.toon("#5D4482", { emissive: "#000000" });
  const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), nucMat);
  nucleus.position.set(-0.04, 0.14, 0.18);
  somaGroup.add(nucleus);

  const nucRing = new THREE.Mesh(new THREE.TorusGeometry(0.20, 0.025, 6, 16), kit.toon("#FAFCFB"));
  nucRing.position.copy(nucleus.position);
  nucRing.lookAt(new THREE.Vector3(-0.1, 0.6, 1.0));
  somaGroup.add(nucRing);

  // 2. Branching dendrites radiating from soma (-x side) with sphere end caps
  const dendriteMat = kit.toon("#9D7FB3");
  const tipMat = kit.toon("#00B4D8", { emissive: "#000000" });
  const dendriteDefs = [
    [[0, 0.1, 0], [-0.48, 0.42, 0.22], [-0.82, 0.68, 0.36]],
    [[0, -0.05, 0], [-0.52, -0.28, 0.24], [-0.86, -0.46, 0.34]],
    [[0, 0.15, -0.1], [-0.46, 0.48, -0.26], [-0.78, 0.72, -0.42]],
    [[0, -0.12, -0.1], [-0.48, -0.34, -0.28], [-0.80, -0.52, -0.40]],
    [[0, 0.02, 0.1], [-0.56, 0.08, 0.36], [-0.94, 0.14, 0.50]],
    [[0, -0.02, -0.1], [-0.56, -0.04, -0.36], [-0.92, -0.06, -0.52]],
  ];
  const dendriteTips = [];
  for (const pts of dendriteDefs) {
    const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
    const branch = new THREE.Mesh(new THREE.TubeGeometry(curve, 12, 0.042, 7, false), dendriteMat);
    somaGroup.add(branch);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.058, 8, 6), tipMat);
    tip.position.set(...pts[2]);
    somaGroup.add(tip);
    dendriteTips.push(tip);
  }

  // 3. Axon curve, core tube, 4 myelin sheaths, and forked axon terminals
  const axonGroup = new THREE.Group();
  axonGroup.name = "axon";
  group.add(axonGroup);

  const axonLocalPts = [
    [-0.48, 1.05, 0.0],
    [0.02, 1.11, 0.08],
    [0.54, 1.01, -0.07],
    [1.08, 1.09, 0.05],
    [1.62, 1.05, 0.0],
  ];
  const axonCurve = new THREE.CatmullRomCurve3(
    axonLocalPts.map(p => new THREE.Vector3(...p)),
    false,
    "catmullrom",
    0.25
  );
  const axonCoreMat = kit.toon("#5C87B5", { emissive: "#000000" });
  const axonCore = new THREE.Mesh(new THREE.TubeGeometry(axonCurve, 32, 0.055, 8, false), axonCoreMat);
  axonGroup.add(axonCore);

  // Myelin sheath capsules with Nodes of Ranvier gaps
  const myelinMat = kit.toon(myelinColor);
  const up = new THREE.Vector3(0, 1, 0);
  for (const u of [0.20, 0.42, 0.64, 0.86]) {
    const pos = axonCurve.getPointAt(u);
    const tan = axonCurve.getTangentAt(u).normalize();
    const seg = new THREE.Group();
    seg.position.copy(pos);
    seg.quaternion.setFromUnitVectors(up, tan);
    axonGroup.add(seg);

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.24, 10), myelinMat);
    const capA = new THREE.Mesh(new THREE.SphereGeometry(0.135, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), myelinMat);
    capA.position.y = 0.12;
    const capB = new THREE.Mesh(new THREE.SphereGeometry(0.135, 10, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), myelinMat);
    capB.position.y = -0.12;
    seg.add(body, capA, capB);
  }

  // Forked axon terminals + synaptic boutons
  const termMat = kit.toon("#6B8EC2");
  const boutonMat = kit.toon("#00B4D8", { emissive: "#000000" });
  const termForks = [
    [[1.60, 1.05, 0], [1.85, 1.24, 0.16], [2.06, 1.34, 0.24]],
    [[1.60, 1.05, 0], [1.86, 0.86, 0.14], [2.06, 0.78, 0.20]],
    [[1.60, 1.05, 0], [1.86, 1.08, -0.22], [2.06, 1.12, -0.32]],
  ];
  for (const pts of termForks) {
    const c = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
    const b = new THREE.Mesh(new THREE.TubeGeometry(c, 10, 0.036, 7, false), termMat);
    axonGroup.add(b);
    const bouton = new THREE.Mesh(new THREE.SphereGeometry(0.088, 10, 8), boutonMat);
    bouton.position.set(...pts[2]);
    axonGroup.add(bouton);
  }

  // 4. Action potential cyan rings gliding along axon
  const pulses = [];
  for (let i = 0; i < 3; i++) {
    const pMat = new THREE.MeshBasicMaterial({ color: "#00B4D8", transparent: true, opacity: 0.9 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.175, 0.030, 6, 18), pMat);
    ring.userData.noInk = true;
    axonGroup.add(ring);
    pulses.push({ mesh: ring, mat: pMat, idx: i });
  }

  // 5. Time-binning gate & spike-count amber bars (#F59E0B) for `binned` mode
  const binGroup = new THREE.Group();
  binGroup.name = "bin-gate";
  binGroup.position.set(1.50, 1.05, 0);
  group.add(binGroup);

  const gateMat = kit.toon("#F59E0B", { emissive: "#000000" });
  const gate1 = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.024, 6, 18), gateMat);
  gate1.rotation.y = Math.PI / 2;
  gate1.position.x = -0.14;
  const gate2 = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.024, 6, 18), gateMat);
  gate2.rotation.y = Math.PI / 2;
  gate2.position.x = 0.14;
  binGroup.add(gate1, gate2);

  const binBars = [];
  const barMat = kit.toon("#F59E0B", { emissive: "#F59E0B" });
  barMat.emissiveIntensity = 0.3;
  for (let i = 0; i < 4; i++) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.22, 0.05), barMat);
    bar.position.set(-0.09 + i * 0.06, 0.36, 0);
    binGroup.add(bar);
    binBars.push(bar);
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
    body: anchor("body", [0.3, 1.05, 0]),
    soma: anchor("soma", [-0.85, 1.05, 0]),
    axonMid: anchor("axonMid", [0.54, 1.05, 0]),
    terminal: anchor("terminal", [2.06, 1.05, 0]),
    binGate: anchor("binGate", [1.50, 1.38, 0]),
  };

  function path(name = "axon") {
    if (name !== "axon") throw new Error("neuronCell: no path " + JSON.stringify(name) + "; use axon");
    group.updateWorldMatrix(true, false);
    return axonLocalPts.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const colDark = new THREE.Color("#000000");
  const colSoma = new THREE.Color(somaColor);
  const colAxon = new THREE.Color("#5C87B5");
  const colCyan = new THREE.Color("#00B4D8");
  const colAmber = new THREE.Color("#F59E0B");
  const zAxis = new THREE.Vector3(0, 0, 1);

  function update(t, state = {}) {
    const m = state.mode ?? mode;
    const isRest = m === "rest";
    const isBinned = m === "binned" || Boolean(state.binned);
    const fire = kit.clamp01(state.fireRate ?? (isRest ? 0.0 : 1.0));

    const somaWave = 0.5 + 0.5 * Math.sin(t * 4.5);
    somaMat.color.copy(colSoma).lerp(colCyan, fire * 0.25);
    somaMat.emissive.copy(colDark).lerp(colCyan, fire * (0.2 + 0.35 * somaWave));
    nucMat.emissive.copy(colDark).lerp(colCyan, fire * (0.3 + 0.35 * somaWave));

    axonCoreMat.color.copy(colAxon).lerp(colCyan, fire * 0.65);
    axonCoreMat.emissive.copy(colDark).lerp(colCyan, fire * 0.35);

    tipMat.emissive.copy(colDark).lerp(colCyan, fire * (0.3 + 0.4 * somaWave));
    boutonMat.emissive.copy(colDark).lerp(colCyan, fire * (0.35 + 0.45 * (0.5 + 0.5 * Math.cos(t * 4.5))));

    for (const p of pulses) {
      p.mesh.visible = fire > 0.05;
      if (p.mesh.visible) {
        const u = ((t * 0.72 + p.idx / 3) % 1 + 1) % 1;
        p.mesh.position.copy(axonCurve.getPointAt(u));
        const tan = axonCurve.getTangentAt(u).normalize();
        p.mesh.quaternion.setFromUnitVectors(zAxis, tan);
        const fade = Math.sin(u * Math.PI);
        p.mat.opacity = fire * fade * 0.95;
        p.mesh.scale.setScalar(0.85 + 0.35 * fade);
      }
    }

    binGroup.visible = isBinned;
    if (isBinned) {
      gateMat.emissive.copy(colDark).lerp(colAmber, 0.35 + 0.25 * Math.sin(t * 6.0));
      binBars.forEach((bar, i) => {
        const lvl = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * 4.8 + i * 1.1));
        bar.scale.y = lvl;
        bar.position.y = 0.25 + lvl * 0.11;
      });
    }
  }

  update(0);
  return { group, hero: [somaGroup, axonGroup], anchors, path, update };
}
