// pos-reader: toon3d contactless POS payment terminal with cutaway top shell,
// copper NFC antenna coil inside, keypad, and status screen (#2D884E / #DD3428 / #F08A4B).
// Origin at base centre (y = 0); customer faces +z.
export function posReader(kit, opts = {}) {
  const { THREE } = kit;
  const {
    bodyColor = "#3A3D4D",
    shellColor = "#FAFCFB",
    coilColor = "#D98245",
  } = opts;

  const group = new THREE.Group();
  group.name = "pos-reader";

  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // Lower chassis
  const bodyMat = kit.toon(bodyColor);
  const chassis = new THREE.Group();
  group.add(chassis);
  box(0.68, 0.22, 0.92, bodyMat, 0, 0.11, 0, chassis);
  // Angled upper wedge base
  const wedge = box(0.66, 0.18, 0.86, bodyMat, 0, 0.26, -0.02, chassis);
  wedge.rotation.x = 0.22;

  // Internal PCB & copper NFC antenna coil (revealed on cutaway)
  const internal = new THREE.Group();
  internal.position.set(0, 0.38, -0.14);
  internal.rotation.x = 0.22;
  group.add(internal);
  box(0.54, 0.03, 0.42, kit.toon("#2E6B4F"), 0, 0, 0, internal);
  const coilMat = kit.toon(coilColor, { emissive: "#000000" });
  const coilGroup = new THREE.Group();
  coilGroup.position.set(0, 0.03, 0);
  internal.add(coilGroup);
  for (let i = 0; i < 3; i++) {
    const r = 0.17 - i * 0.036;
    const loop = new THREE.Mesh(new THREE.TorusGeometry(r, 0.013, 6, 20), coilMat);
    loop.rotation.x = Math.PI / 2;
    coilGroup.add(loop);
  }

  // Removable top tap-pad shell (lifts on cutaway)
  const topShell = new THREE.Group();
  topShell.position.set(0, 0.42, -0.14);
  topShell.rotation.x = 0.22;
  group.add(topShell);
  box(0.64, 0.08, 0.46, kit.toon(shellColor), 0, 0.04, 0, topShell);
  // Contactless wave glyph on top pad
  const waveMat = kit.toon("#2D7FF9");
  for (let i = 0; i < 3; i++) {
    const arc = new THREE.Mesh(
      new THREE.TorusGeometry(0.05 + i * 0.035, 0.009, 5, 10, Math.PI * 0.6),
      waveMat
    );
    arc.rotation.x = -Math.PI / 2;
    arc.rotation.z = -Math.PI * 0.3;
    arc.position.set(-0.02, 0.085, 0);
    topShell.add(arc);
  }

  // Front angled display screen + keypad
  const frontPanel = new THREE.Group();
  frontPanel.position.set(0, 0.29, 0.24);
  frontPanel.rotation.x = 0.34;
  group.add(frontPanel);

  const screenMat = kit.toon("#4868C8", { emissive: "#000000" });
  const screenMesh = box(0.5, 0.04, 0.26, screenMat, 0, 0.04, -0.02, frontPanel);
  const btnMat = kit.toon("#D6D2C7");
  for (let r = 0; r < 2; r++) {
    for (let c = -1; c <= 1; c++) {
      box(0.11, 0.03, 0.06, btnMat, c * 0.15, 0.035, 0.15 + r * 0.08, frontPanel);
    }
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
    tapPad: anchor("tapPad", [0, 0.52, -0.14]),
    coil: anchor("coil", [0, 0.41, -0.14]),
    screen: anchor("screen", [0, 0.34, 0.22]),
    body: anchor("body", [0, 0.32, 0]),
    front: anchor("front", [0, 0.3, 0.5]),
  };

  const coilBase = new THREE.Color(coilColor);
  const coilHot = new THREE.Color("#FCD53E");
  const dark = new THREE.Color("#000000");
  const statusColors = {
    idle: new THREE.Color("#4868C8"),
    wait: new THREE.Color("#F08A4B"),
    good: new THREE.Color("#2D884E"),
    bad: new THREE.Color("#DD3428"),
  };

  function update(t, state = {}) {
    const cut = kit.clamp01(state.cutaway ?? 0);
    topShell.position.set(0, 0.42 + cut * 0.44, -0.14 - cut * 0.12);
    topShell.rotation.x = 0.22 - cut * 0.28;

    const glow = kit.clamp01(state.coilGlow ?? 0);
    coilMat.color.copy(coilBase).lerp(coilHot, glow * 0.8);
    coilMat.emissive.copy(dark).lerp(coilHot, glow * 0.45);

    const st = state.status || "idle";
    const sc = statusColors[st] || statusColors.idle;
    screenMesh.material.color.copy(sc);
    screenMesh.material.emissive.copy(dark).lerp(sc, st === "idle" ? 0.1 : 0.45);
  }

  update(0);
  return { group, hero: [chassis, topShell], anchors, update };
}
