// em-field: concentric electromagnetic field waves and soft dome in fixed #FCD53E.
// Origin at base centre (y = 0) of the POS tap pad.
export function emField(kit, opts = {}) {
  const { THREE } = kit;
  const { color = "#FCD53E", baseRadius = 0.45 } = opts;

  const group = new THREE.Group();
  group.name = "em-field";

  const rings = [];
  for (let i = 0; i < 4; i++) {
    const r = baseRadius * (0.45 + i * 0.24);
    const mat = kit.toon(color, { emissive: color });
    mat.emissiveIntensity = 0.35;
    mat.transparent = true;
    mat.opacity = 0.88;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.018, 6, 28), mat);
    ring.rotation.x = Math.PI / 2;
    ring.userData.noInk = true;
    group.add(ring);
    rings.push({ mesh: ring, mat, idx: i });
  }

  // Soft translucent dome showing the short-range contact zone
  const domeMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(baseRadius * 1.15, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    domeMat
  );
  dome.userData.noInk = true;
  group.add(dome);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    center: anchor("center", [0, 0.14, 0]),
    top: anchor("top", [0, 0.42, 0]),
  };

  function update(t, state = {}) {
    const intensity = kit.clamp01(state.intensity ?? 1);
    const rScale = state.radiusScale ?? 1;
    group.visible = intensity > 0.01;
    if (!group.visible) return;
    group.scale.setScalar(rScale);
    domeMat.opacity = 0.18 * intensity;
    for (const { mesh, mat, idx } of rings) {
      const phase = ((t * 0.9 + idx * 0.25) % 1 + 1) % 1;
      const s = 0.65 + phase * 0.55;
      mesh.scale.set(s, s, 1);
      mesh.position.y = 0.03 + phase * 0.34;
      mat.opacity = intensity * Math.sin(phase * Math.PI) * 0.92;
    }
  }

  update(0);
  return { group, hero: [dome], anchors, update };
}
