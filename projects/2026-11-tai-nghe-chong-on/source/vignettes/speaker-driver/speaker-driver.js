// speaker-driver: toon3d dynamic speaker cone with dark basket, magnet back,
// oscillating diaphragm, dust cap, and green-glowing voice coil. Origin at centre; cone faces +x.
export function speakerDriver(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    basketColor = "#333645",
    coneColor = "#5B6278",
    emitColor = PALETTE.good,
    oscillate = 0,
    emit = 0,
  } = opts;

  const group = new THREE.Group();
  group.name = "speaker-driver";
  const flat = m => { m.flatShading = true; return m; };

  const basketMat = flat(kit.toon(basketColor));
  const coneMat = flat(kit.toon(coneColor));
  const coilMat = flat(kit.toon(emitColor, { emissive: "#000000" }));

  // Magnet & rear housing
  const magnet = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.36, 14), basketMat);
  magnet.rotation.z = Math.PI / 2;
  magnet.position.x = -0.35;
  group.add(magnet);

  // Outer rim basket
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.86, 0.09, 8, 20), basketMat);
  rim.rotation.y = Math.PI / 2;
  rim.position.x = 0.22;
  group.add(rim);

  // Moving diaphragm assembly (cone + dust cap + voice coil)
  const diaphragm = new THREE.Group();
  group.add(diaphragm);

  const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.30, 0.34, 16, 1, true), flat(kit.toon(coneColor)));
  cone.material.side = THREE.DoubleSide;
  cone.rotation.z = -Math.PI / 2;
  cone.position.x = 0.08;

  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), coilMat);
  cap.rotation.z = -Math.PI / 2;
  cap.position.x = 0.02;

  const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.18, 12), coilMat);
  coil.rotation.z = Math.PI / 2;
  coil.position.x = -0.14;

  diaphragm.add(cone, cap, coil);
  kit.ink(group);

  const anchor = (name, p, parent = group) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    parent.add(o);
    return o;
  };
  const anchors = {
    cone: anchor("cone", [0.22, 0.5, 0]),
    cap: anchor("cap", [0.18, 0, 0], diaphragm),
    coil: anchor("coil", [-0.14, 0.35, 0]),
  };

  const dark = new THREE.Color("#000000");
  const glow = new THREE.Color(emitColor);

  function update(t, state = {}) {
    const osc = kit.clamp01(state.oscillate ?? oscillate);
    const em = kit.clamp01(state.emit ?? emit);
    diaphragm.position.x = osc * 0.14 * Math.sin(t * 18);
    coilMat.emissive.copy(dark).lerp(glow, em * 0.65);
  }

  update(0);
  return { group, hero: [rim, diaphragm], anchors, update };
}
