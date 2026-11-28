// smartphone: toon3d smartphone with OLED screen states and cutaway back shell
// exposing the internal components beneath the back shell.
// Origin at centre of the phone body; screen faces +y when lying flat.
export function smartphone(kit, opts = {}) {
  const { THREE } = kit;
  const {
    frameColor = "#2B2D38",
    backColor = "#4C5266",
  } = opts;

  const group = new THREE.Group();
  group.name = "smartphone";

  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // Main phone frame
  const body = box(0.52, 0.06, 1.02, kit.toon(frameColor), 0, 0, 0);

  // OLED screen states for the moon, interface comparison, and reflected room light.
  const textures = {};
  for (const mode of ["moon", "light", "dark", "gray", "reflection"]) {
    textures[mode] = kit.canvasTexture(192, 360, (g, w, h) => {
      g.fillStyle = mode === "light" ? "#FAFCFB" : "#18191E";
      g.fillRect(0, 0, w, h);
      if (mode === "moon" || mode === "reflection") {
        g.fillStyle = "#FAFCFB";
        g.beginPath(); g.arc(w / 2, h * .38, 47, 0, Math.PI * 2); g.fill();
        if (mode === "reflection") {
          g.fillStyle = "rgba(250,252,251,0.28)";
          g.beginPath(); g.moveTo(5, 0); g.lineTo(42, 0); g.lineTo(180, h); g.lineTo(143, h); g.fill();
        }
      } else {
        g.fillStyle = mode === "light" ? "#D8DDE0" : "#383C43";
        g.fillRect(18, 65, w - 36, 126);
        g.fillStyle = "#2D7FF9"; g.fillRect(110, 235, 55, 25);
        g.fillStyle = "#FAFCFB"; g.beginPath(); g.arc(mode === "light" ? 122 : 153, 247, 10, 0, Math.PI * 2); g.fill();
      }
    });
  }
  const screen = box(0.46, 0.02, 0.94, kit.toon("#FFFFFF", { map: textures.moon }), 0, 0.036, 0);

  // Internal NFC coil + Secure Element chip + locked real card (under back cover)
  const internal = new THREE.Group();
  internal.position.set(0, -0.02, 0);
  group.add(internal);

  const coilMat = kit.toon("#D98245", { emissive: "#000000" });
  for (let i = 0; i < 2; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.15 - i * 0.035, 0.011, 6, 18), coilMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, -0.015, -0.22);
    internal.add(ring);
  }
  const chipMat = kit.toon("#2D7FF9", { emissive: "#000000" });
  box(0.14, 0.025, 0.14, chipMat, 0, -0.015, 0.04, internal);

  // Removable back cover (lifts toward -y / +y depending on cutaway)
  const backCover = new THREE.Group();
  backCover.position.set(0, -0.035, 0);
  group.add(backCover);
  box(0.5, 0.025, 0.98, kit.toon(backColor), 0, 0, 0, backCover);
  // Camera bump
  box(0.16, 0.03, 0.18, kit.toon("#2B2D38"), -0.14, -0.015, -0.34, backCover);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    coil: anchor("coil", [0, 0, -0.22]),
    chip: anchor("chip", [0, 0, 0.04]),
    realCard: anchor("realCard", [0, 0, 0.27]),
    screen: anchor("screen", [0, 0.06, 0]),
    body: anchor("body", [0, 0, 0]),
  };

  const coilBase = new THREE.Color("#D98245");
  const coilHot = new THREE.Color("#FCD53E");
  const chipBase = new THREE.Color("#2D7FF9");
  const dark = new THREE.Color("#000000");

  function update(t, state = {}) {
    screen.material.map = textures[state.screen ?? opts.screen ?? "moon"] || textures.moon;
    const cut = kit.clamp01(state.cutaway ?? 0);
    backCover.position.set(0, -0.035 - cut * 0.38, -cut * 0.1);
    backCover.rotation.x = cut * 0.22;

    const glow = kit.clamp01(state.coilGlow ?? 0);
    coilMat.color.copy(coilBase).lerp(coilHot, glow * 0.8);
    coilMat.emissive.copy(dark).lerp(coilHot, glow * 0.45);

    const pulse = kit.clamp01(state.cardPulse ?? 0);
    chipMat.emissive.copy(dark).lerp(chipBase, pulse * 0.6);
  }

  update(0);
  return { group, hero: [body], anchors, update };
}
