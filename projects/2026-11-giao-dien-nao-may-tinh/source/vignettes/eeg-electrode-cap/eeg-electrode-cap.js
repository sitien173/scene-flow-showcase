// eeg-electrode-cap: toon3d mannequin head wearing a non-invasive 10-20 EEG electrode cap
// with webbing straps, surface sensor discs, rear lead bundle, and #00B4D8 scalp wave rings.
// Origin at base centre (y = 0); face looks toward +z.
export function eegElectrodeCap(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    headColor = PALETTE.paper || "#D8D8C8",
    capColor = "#4868C8",
    mode = "sensing",
  } = opts;

  const group = new THREE.Group();
  group.name = "eeg-electrode-cap";

  const cyl = (rt, rb, h, segs, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, segs), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };
  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // 1. Pedestal & mannequin head
  const headMat = kit.toon(headColor);
  cyl(0.54, 0.60, 0.08, 16, kit.toon("#2B2D38"), 0, 0.04, 0);
  cyl(0.24, 0.30, 0.42, 14, headMat, 0, 0.29, -0.04);

  const headGroup = new THREE.Group();
  headGroup.name = "head";
  headGroup.position.set(0, 0.48, 0);
  group.add(headGroup);

  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.63, 18, 14), headMat);
  skull.scale.set(0.92, 1.06, 1.08);
  skull.position.set(0, 0.66, 0);
  headGroup.add(skull);

  const chin = box(0.35, 0.22, 0.30, headMat, 0, 0.25, 0.39, headGroup);
  void chin;
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.20, 4), headMat);
  nose.rotation.y = Math.PI / 4;
  nose.rotation.x = 0.26;
  nose.position.set(0, 0.47, 0.67);
  headGroup.add(nose);

  const featMat = kit.toon("#5A6070");
  box(0.14, 0.032, 0.04, featMat, -0.18, 0.52, 0.62, headGroup);
  box(0.14, 0.032, 0.04, featMat, 0.18, 0.52, 0.62, headGroup);

  for (const sx of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.115, 0.07, 10), headMat);
    ear.rotation.z = Math.PI / 2;
    ear.position.set(sx * 0.60, 0.50, -0.02);
    headGroup.add(ear);
  }

  // 2. Wearable EEG mesh cap & chin strap
  const capGroup = new THREE.Group();
  capGroup.name = "eeg-cap";
  capGroup.position.set(0, 0.67, 0);
  headGroup.add(capGroup);

  const capMat = kit.toon(capColor);
  const capDome = new THREE.Mesh(new THREE.SphereGeometry(0.655, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.50), capMat);
  capDome.scale.set(0.93, 1.07, 1.09);
  capGroup.add(capDome);

  const rimBandMat = kit.toon("#262936");
  const rimBand = new THREE.Mesh(new THREE.TorusGeometry(0.655, 0.026, 8, 24), rimBandMat);
  rimBand.rotation.x = Math.PI / 2;
  rimBand.scale.set(0.93, 1.09, 1);
  rimBand.position.set(0, 0.0, 0);
  capGroup.add(rimBand);

  // Chin strap loop under jaw
  const strapPts = [
    new THREE.Vector3(-0.56, -0.14, 0.05),
    new THREE.Vector3(-0.36, -0.48, 0.25),
    new THREE.Vector3(0, -0.58, 0.32),
    new THREE.Vector3(0.36, -0.48, 0.25),
    new THREE.Vector3(0.56, -0.14, 0.05),
  ];
  const chinStrap = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(strapPts), 18, 0.02, 6, false),
    rimBandMat
  );
  capGroup.add(chinStrap);

  // Webbing grid ribbons
  const webMat = kit.toon("#FAFCFB");
  for (const ang of [-0.45, 0, 0.45]) {
    const arc = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.015, 6, 20, Math.PI), webMat);
    arc.scale.set(0.94, 1.08, 1.09);
    arc.rotation.y = ang;
    capGroup.add(arc);
  }

  // 3. Surface 10-20 electrode cups + wire bundle
  const elecGroup = new THREE.Group();
  elecGroup.name = "electrodes";
  capGroup.add(elecGroup);

  const cupMat = kit.toon("#FAFCFB");
  const electrodes = [];
  const sites = [
    [0, 0.70, 0],
    [0, 0.56, 0.44],
    [0, 0.52, -0.46],
    [-0.38, 0.48, 0.26],
    [0.38, 0.48, 0.26],
    [-0.44, 0.42, -0.14],
    [0.44, 0.42, -0.14],
    [-0.24, 0.62, 0.14],
    [0.24, 0.62, 0.14],
    [-0.26, 0.58, -0.26],
    [0.26, 0.58, -0.26],
    [-0.50, 0.22, 0.05],
    [0.50, 0.22, 0.05],
  ];

  const up = new THREE.Vector3(0, 1, 0);
  sites.forEach((p, idx) => {
    const dir = new THREE.Vector3(p[0], p[1], p[2]).normalize();
    const pos = new THREE.Vector3(dir.x * 0.615, dir.y * 0.70, dir.z * 0.715);
    const holder = new THREE.Group();
    holder.position.copy(pos);
    holder.quaternion.setFromUnitVectors(up, dir);
    elecGroup.add(holder);

    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.075, 0.04, 10), cupMat);
    cup.position.y = 0.015;
    holder.add(cup);

    const dotMat = kit.toon("#00B4D8", { emissive: "#000000" });
    const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.025, 10), dotMat);
    dot.position.y = 0.038;
    holder.add(dot);
    electrodes.push({ mat: dotMat, phase: kit.hash(idx + 3) * Math.PI * 2 });
  });

  // Rear bundled EEG ribbon cable
  const leadPts = [
    new THREE.Vector3(0, 0.16, -0.68),
    new THREE.Vector3(0.06, -0.15, -0.82),
    new THREE.Vector3(0.18, -0.65, -0.84),
    new THREE.Vector3(0.32, -1.06, -0.78),
  ];
  const leadMat = kit.toon("#2B2D38");
  const leadCable = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(leadPts), 16, 0.032, 8, false),
    leadMat
  );
  capGroup.add(leadCable);
  const leadEnd = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.06, 8), kit.toon("#00B4D8"));
  leadEnd.position.copy(leadPts[3]);
  capGroup.add(leadEnd);

  // 4. Expanding #00B4D8 surface wave rings (non-invasive scalp signals)
  const waveGroup = new THREE.Group();
  waveGroup.position.set(0, 0.62, 0);
  capGroup.add(waveGroup);
  const waves = [];
  for (let i = 0; i < 3; i++) {
    const wMat = new THREE.MeshBasicMaterial({
      color: "#00B4D8",
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const wRing = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.024, 8, 28), wMat);
    wRing.rotation.x = Math.PI / 2;
    wRing.userData.noInk = true;
    waveGroup.add(wRing);
    waves.push({ mesh: wRing, mat: wMat, idx: i });
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
    body: anchor("body", [0, 1.10, 0]),
    cap: anchor("cap", [0, 1.62, 0]),
    electrodes: anchor("electrodes", [0, 1.82, 0.05]),
    leadOut: anchor("leadOut", [0.32, 0.09, -0.78]),
  };

  const colDark = new THREE.Color("#000000");
  const colCyan = new THREE.Color("#00B4D8");
  const colMuted = new THREE.Color("#737B8C");
  const colCap = new THREE.Color(capColor);
  const colCapDim = new THREE.Color("#6D7485");

  function update(t, state = {}) {
    const m = state.mode ?? mode;
    const isInactive = m === "inactive";
    const isSensing = m === "sensing";
    const sense = kit.clamp01(state.sensing ?? (isSensing ? 1 : isInactive ? 0 : 0.25));
    const active = kit.clamp01(state.active ?? (isInactive ? 0.35 : 1.0));

    capMat.color.copy(colCapDim).lerp(colCap, active);

    for (const el of electrodes) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 4.5 + el.phase);
      const strength = sense * (0.4 + 0.6 * pulse);
      el.mat.color.copy(colMuted).lerp(colCyan, kit.clamp01(0.15 + strength * 0.85));
      el.mat.emissive.copy(colDark).lerp(colCyan, strength * 0.65);
    }

    waveGroup.visible = sense > 0.12 && active > 0.4;
    if (waveGroup.visible) {
      for (const w of waves) {
        const u = ((t * 0.65 + w.idx / 3) % 1 + 1) % 1;
        w.mesh.position.y = u * 0.45;
        w.mesh.scale.setScalar(0.55 + u * 1.15);
        w.mat.opacity = sense * Math.sin(u * Math.PI) * 0.85;
      }
    }
  }

  update(0);
  return { group, hero: [headGroup, capGroup], anchors, update };
}
