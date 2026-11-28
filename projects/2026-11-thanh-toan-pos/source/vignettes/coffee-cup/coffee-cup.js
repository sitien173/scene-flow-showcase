// coffee-cup: toon3d takeaway coffee cup with sleeve, lid, straw, and rising steam puffs.
// Origin at base centre (y = 0).
export function coffeeCup(kit, opts = {}) {
  const { THREE } = kit;
  const {
    cupColor = "#FAFCFB",
    sleeveColor = "#C98E5B",
    strawColor = "#2D884E",
  } = opts;

  const group = new THREE.Group();
  group.name = "coffee-cup";

  const flat = m => { m.flatShading = true; return m; };

  const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.12, 0.48, 12),
    flat(kit.toon(cupColor))
  );
  cup.position.y = 0.24;
  group.add(cup);

  const sleeve = new THREE.Mesh(
    new THREE.CylinderGeometry(0.158, 0.142, 0.2, 12),
    flat(kit.toon(sleeveColor))
  );
  sleeve.position.y = 0.24;
  group.add(sleeve);

  const lid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.185, 0.185, 0.05, 12),
    flat(kit.toon(cupColor))
  );
  lid.position.y = 0.5;
  group.add(lid);

  const straw = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, 0.26, 8),
    flat(kit.toon(strawColor))
  );
  straw.position.set(0.04, 0.6, 0.02);
  straw.rotation.z = -0.18;
  group.add(straw);

  kit.ink(group);

  // Subtle low-poly steam puffs above lid
  const puffs = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: "#FAFCFB",
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(0.045, 0), mat);
    puff.userData.noInk = true;
    puff.position.set((i - 1) * 0.04, 0.62, -0.02);
    group.add(puff);
    puffs.push({ mesh: puff, mat, idx: i });
  }

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    top: anchor("top", [0, 0.58, 0]),
    body: anchor("body", [0, 0.28, 0]),
  };

  function update(t, state = {}) {
    const steam = kit.clamp01(state.steam ?? 1);
    for (const { mesh, mat, idx } of puffs) {
      mesh.visible = steam > 0.01;
      if (!mesh.visible) continue;
      const phase = ((t * 0.65 + idx * 0.33) % 1 + 1) % 1;
      mesh.position.y = 0.6 + phase * 0.32;
      mesh.position.x = Math.sin(phase * Math.PI * 2 + idx) * 0.035;
      mesh.scale.setScalar(0.6 + phase * 0.7);
      mat.opacity = steam * Math.sin(phase * Math.PI) * 0.55;
    }
  }

  update(0);
  return { group, hero: [cup, lid], anchors, update };
}
