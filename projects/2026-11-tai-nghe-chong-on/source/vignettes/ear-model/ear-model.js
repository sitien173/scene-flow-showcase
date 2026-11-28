// ear-model: minimalist toon3d human ear (pinna arch, concha bowl, ear canal entrance)
// for macro wave cancellation scenes. Origin at centre; canal opens toward -x.
export function earModel(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    skinColor = PALETTE.wall,
    innerColor = "#D49B7E",
    glowColor = PALETTE.shade,
    quietGlow = 0,
  } = opts;

  const group = new THREE.Group();
  group.name = "ear-model";
  const flat = m => { m.flatShading = true; return m; };

  const skinMat = flat(kit.toon(skinColor));
  const innerMat = flat(kit.toon(innerColor));
  const canalMat = flat(kit.toon("#5C4048", { emissive: "#000000" }));
  const haloMat = flat(kit.toon(glowColor, { emissive: "#000000" }));

  // Outer pinna C-shape
  const outer = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.22, 10, 18, Math.PI * 1.45), skinMat);
  outer.rotation.z = -Math.PI * 0.22;
  outer.scale.set(0.78, 1.15, 0.75);
  group.add(outer);

  // Inner backing bowl
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.56, 0.22, 16), innerMat);
  bowl.rotation.x = Math.PI / 2;
  bowl.scale.set(0.76, 1.05, 1.0);
  bowl.position.set(0.08, 0, -0.06);
  group.add(bowl);

  // Earlobe
  const lobe = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 8), skinMat);
  lobe.position.set(-0.08, -0.78, 0.02);
  lobe.scale.set(0.95, 0.85, 0.75);
  group.add(lobe);

  // Ear canal entrance (-x / +z facing incoming waves)
  const canal = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.16, 0.28, 12), canalMat);
  canal.rotation.z = Math.PI / 2;
  canal.position.set(-0.22, -0.08, 0.08);
  group.add(canal);

  // Quiet zone ring around canal
  const quietRing = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.05, 8, 16), haloMat);
  quietRing.rotation.y = Math.PI / 2;
  quietRing.position.set(-0.38, -0.08, 0.08);
  group.add(quietRing);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    canal: anchor("canal", [-0.42, -0.08, 0.08]),
    pinna: anchor("pinna", [0.1, 0.9, 0]),
    center: anchor("center", [0, 0.2, 0.15]),
  };

  const dark = new THREE.Color("#000000");
  const glow = new THREE.Color(glowColor);

  function update(t, state = {}) {
    const q = kit.clamp01(state.quietGlow ?? quietGlow);
    quietRing.visible = q > 0.02;
    quietRing.scale.setScalar(0.9 + 0.12 * Math.sin(t * 3));
    haloMat.emissive.copy(dark).lerp(glow, q * 0.6);
  }

  update(0);
  return { group, hero: [outer, bowl], anchors, update };
}
