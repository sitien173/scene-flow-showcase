// payment-network: toon3d payment processor server cluster with #2D7FF9 verification scanner arch.
// Origin at floor level (y = 0) at platform centre.
export function paymentNetwork(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const { rackColor = "#3A3D4D" } = opts;

  const group = new THREE.Group();
  group.name = "payment-network";

  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // Raised base plinth
  box(2.8, 0.16, 1.8, kit.toon(PALETTE.stone), 0, 0.08, 0);

  // Two server racks flanking a central verification bay
  const rackMat = kit.toon(rackColor);
  const trimMat = kit.toon("#D6D2C7");
  const ledMats = [];
  for (const sx of [-0.92, 0.92]) {
    box(0.76, 2.2, 0.96, rackMat, sx, 1.26, -0.1);
    box(0.8, 0.1, 1.0, trimMat, sx, 2.38, -0.1);
    for (let row = 0; row < 4; row++) {
      const y = 0.65 + row * 0.42;
      box(0.62, 0.24, 0.04, kit.toon("#252834"), sx, y, 0.39);
      const ledMat = kit.toon("#2D7FF9", { emissive: "#2D7FF9" });
      ledMat.emissiveIntensity = 0.4;
      box(0.12, 0.06, 0.03, ledMat, sx - 0.18, y, 0.42);
      ledMats.push(ledMat);
    }
  }

  // Central verification scanner arch
  const archMat = kit.toon("#FAFCFB");
  box(0.1, 1.45, 0.28, archMat, -0.44, 0.88, 0.18);
  box(0.1, 1.45, 0.28, archMat, 0.44, 0.88, 0.18);
  const topBar = box(0.98, 0.14, 0.32, archMat, 0, 1.62, 0.18);

  // Moving #2D7FF9 verification scan beam
  const scanMat = new THREE.MeshBasicMaterial({
    color: "#2D7FF9",
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });
  const scanBeam = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.06, 0.22), scanMat);
  scanBeam.position.set(0, 0.9, 0.18);
  scanBeam.userData.noInk = true;
  group.add(scanBeam);

  // Status beacon on top of arch (#2D7FF9 for valid code check, #2D884E when approved)
  const beaconMat = kit.toon("#2D7FF9", { emissive: "#000000" });
  const beacon = box(0.36, 0.16, 0.22, beaconMat, 0, 1.82, 0.18);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    scanner: anchor("scanner", [0, 1.0, 0.24]),
    sign: anchor("sign", [0, 1.92, 0.24]),
    inPort: anchor("inPort", [-0.6, 0.9, 0.45]),
  };

  const blue = new THREE.Color("#2D7FF9");
  const green = new THREE.Color("#2D884E");
  const dark = new THREE.Color("#000000");

  function update(t, state = {}) {
    const scanning = kit.clamp01(state.scanning ?? 0);
    scanBeam.visible = scanning > 0.02;
    if (scanBeam.visible) {
      scanBeam.position.y = 0.85 + 0.45 * Math.sin(t * 5.2);
      scanMat.opacity = 0.75 * scanning;
    }

    const verified = kit.clamp01(state.verified ?? 0);
    const approved = kit.clamp01(state.approved ?? 0);
    const targetCol = approved > 0.5 ? green : blue;
    beacon.material.color.copy(targetCol);
    beacon.material.emissive.copy(dark).lerp(targetCol, Math.max(verified, approved) * 0.65);

    ledMats.forEach((m, i) => {
      const blink = 0.35 + 0.45 * Math.max(0, Math.sin(t * 4.0 + i * 1.1));
      m.emissiveIntensity = blink;
    });
  }

  update(0);
  return { group, hero: [topBar, beacon], anchors, update };
}
