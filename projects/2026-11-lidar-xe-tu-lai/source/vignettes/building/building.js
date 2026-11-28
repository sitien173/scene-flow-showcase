// building: original low-poly toon3d streetfront building with sidewalk, framed windows
// (windowMaterial day/night glow), roadside static obstacle tree & optional unlit street pole,
// deterministic #2D884E point-cloud facade/canopy overlay, and #DD3428 bounding boxes.
// Origin at ground center [0, 0, 0]; storefront faces +z.
export function building(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    wallColor = PALETTE.wall,
    capColor = "#ECE5C8",
    doorColor = "#A27245",
    awningColor = "#4868C8",
    cloudColor = "#2D884E",
    alertColor = "#DD3428",
    showTree = true,
    showLamp = false,
  } = opts;

  const group = new THREE.Group();
  group.name = "building";

  const flat = (m) => {
    m.flatShading = true;
    return m;
  };
  const box = (w, h, d, material, x, y, z, parent) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  const wallMat = flat(kit.toon(wallColor));
  const capMat = flat(kit.toon(capColor));
  const sidewalkMat = flat(kit.toon("#B9B8B3"));
  const trimMat = flat(kit.toon(PALETTE.white));
  const doorMat = flat(kit.toon(doorColor));
  const awningMat = flat(kit.toon(awningColor));
  const roofBoxMat = flat(kit.toon("#888898"));
  const trunkMat = flat(kit.toon("#6C514C"));
  const leafMat = flat(kit.toon(PALETTE.tree));
  const leafDarkMat = flat(kit.toon(PALETTE.treeDark));
  const poleMat = flat(kit.toon("#A3A3AE"));
  const alertMat = flat(kit.toon(alertColor, { emissive: alertColor }));
  alertMat.emissiveIntensity = 0.2;

  const solidGroup = new THREE.Group();
  group.add(solidGroup);

  // Sidewalk plinth
  box(5.4, 0.1, 3.4, sidewalkMat, 0.65, 0.05, 0.35, solidGroup);

  // Main 2-storey building block (3.0 x 3.6 x 2.2)
  const bw = 3.0, bh = 3.6, bd = 2.2;
  const facadeGroup = new THREE.Group();
  solidGroup.add(facadeGroup);

  box(bw, bh, bd, wallMat, 0, 0.1 + bh / 2, -0.1, facadeGroup);
  box(bw + 0.22, 0.22, bd + 0.22, capMat, 0, 0.1 + bh + 0.11, -0.1, facadeGroup);
  box(0.75, 0.45, 0.65, roofBoxMat, -0.65, 0.1 + bh + 0.44, -0.25, facadeGroup);

  // Ground floor doorway + awning
  const zf = -0.1 + bd / 2;
  box(0.86, 1.38, 0.08, doorMat, -0.55, 0.1 + 0.69, zf + 0.02, facadeGroup);
  box(1.02, 0.08, 0.18, trimMat, -0.55, 0.14, zf + 0.09, facadeGroup);
  const awning = box(2.5, 0.16, 0.56, awningMat, 0, 1.72, zf + 0.26, facadeGroup);
  awning.rotation.x = 0.24;

  // Ground floor shop window + 2 upper floor framed windows
  const winSpecs = [
    { x: 0.65, y: 1.0, w: 0.96, h: 0.8 },
    { x: -0.68, y: 2.68, w: 0.88, h: 0.84 },
    { x: 0.68, y: 2.68, w: 0.88, h: 0.84 },
  ];
  const bar = 0.07;
  for (const w of winSpecs) {
    box(w.w + bar, bar, 0.09, trimMat, w.x, w.y + w.h / 2, zf + 0.03, facadeGroup);
    box(w.w + bar, bar, 0.09, trimMat, w.x, w.y - w.h / 2, zf + 0.03, facadeGroup);
    box(bar, w.h, 0.09, trimMat, w.x - w.w / 2, w.y, zf + 0.03, facadeGroup);
    box(bar, w.h, 0.09, trimMat, w.x + w.w / 2, w.y, zf + 0.03, facadeGroup);
    box(bar * 0.7, w.h, 0.09, trimMat, w.x, w.y, zf + 0.03, facadeGroup);
    box(w.w + 0.16, 0.07, 0.2, trimMat, w.x, w.y - w.h / 2 - 0.04, zf + 0.08, facadeGroup);
  }

  // Roadside static obstacle tree (x = +2.48, z = 1.05, cleanly clear of building bbox)
  const treeGroup = new THREE.Group();
  treeGroup.position.set(2.48, 0.1, 1.05);
  treeGroup.visible = showTree;
  solidGroup.add(treeGroup);

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.19, 1.45, 7), trunkMat);
  trunk.position.y = 0.72;
  treeGroup.add(trunk);

  const lobeA = new THREE.Mesh(new THREE.IcosahedronGeometry(0.68, 1), leafMat);
  lobeA.position.set(0, 1.85, 0);
  const lobeB = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), leafDarkMat);
  lobeB.position.set(-0.36, 1.56, 0.22);
  const lobeC = new THREE.Mesh(new THREE.IcosahedronGeometry(0.48, 1), leafMat);
  lobeC.position.set(0.36, 1.62, -0.18);
  treeGroup.add(lobeA, lobeB, lobeC);

  // Minimal roadside street pole (disabled by default for dark unlit hook street)
  const lampGroup = new THREE.Group();
  lampGroup.position.set(-1.72, 0.1, 1.25);
  lampGroup.visible = showLamp;
  solidGroup.add(lampGroup);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.075, 3.2, 8), poleMat);
  pole.position.y = 1.6;
  lampGroup.add(pole);
  box(0.55, 0.06, 0.07, poleMat, 0.24, 3.16, 0, lampGroup);
  const lampCap = box(0.26, 0.09, 0.18, poleMat, 0.48, 3.12, 0, lampGroup);

  // Deterministic #2D884E point-cloud overlay for building facade & tree
  const ptGeo = new THREE.IcosahedronGeometry(0.045, 0);
  const ptMat = kit.toon(cloudColor, { emissive: cloudColor });
  ptMat.emissiveIntensity = 0.28;
  const next = kit.rand(202);
  const dummy = new THREE.Object3D();

  const BLDG_PTS = 200;
  const bldgCloud = new THREE.InstancedMesh(ptGeo, ptMat, BLDG_PTS);
  bldgCloud.userData.noInk = true;
  bldgCloud.visible = false;
  group.add(bldgCloud);

  for (let i = 0; i < BLDG_PTS; i++) {
    const face = next();
    if (face < 0.72) {
      // Front facade +z
      dummy.position.set((next() - 0.5) * bw, 0.15 + next() * bh, zf + 0.04);
    } else if (face < 0.88) {
      // Left/right side edges
      const sx = next() < 0.5 ? -bw / 2 - 0.02 : bw / 2 + 0.02;
      dummy.position.set(sx, 0.15 + next() * bh, -0.1 + (next() - 0.5) * bd);
    } else {
      // Roof parapet rim
      dummy.position.set((next() - 0.5) * (bw + 0.1), 0.1 + bh + 0.22, -0.1 + (next() - 0.5) * bd);
    }
    dummy.scale.setScalar(0.8 + next() * 0.5);
    dummy.updateMatrix();
    bldgCloud.setMatrixAt(i, dummy.matrix);
  }
  bldgCloud.instanceMatrix.needsUpdate = true;

  const TREE_PTS = 80;
  const treeCloud = new THREE.InstancedMesh(ptGeo, ptMat, TREE_PTS);
  treeCloud.position.copy(treeGroup.position);
  treeCloud.userData.noInk = true;
  treeCloud.visible = false;
  group.add(treeCloud);

  for (let i = 0; i < TREE_PTS; i++) {
    const a = next() * Math.PI * 2;
    const elev = (next() - 0.3) * Math.PI * 0.6;
    const rad = i < 16 ? 0.14 : 0.45 + next() * 0.32;
    if (i < 16) {
      dummy.position.set(Math.cos(a) * rad, 0.15 + (i / 16) * 1.25, Math.sin(a) * rad);
    } else {
      dummy.position.set(
        Math.cos(a) * Math.cos(elev) * rad,
        1.78 + Math.sin(elev) * rad,
        Math.sin(a) * Math.cos(elev) * rad
      );
    }
    dummy.scale.setScalar(0.75 + next() * 0.45);
    dummy.updateMatrix();
    treeCloud.setMatrixAt(i, dummy.matrix);
  }
  treeCloud.instanceMatrix.needsUpdate = true;

  // Alert bounding boxes (#DD3428)
  const makeBbox = (w, h, d, cx, cy, cz) => {
    const g = new THREE.Group();
    g.position.set(cx, cy, cz);
    g.visible = false;
    group.add(g);
    const t = 0.05;
    for (const sx of [-w / 2, w / 2]) {
      for (const sy of [-h / 2, h / 2]) box(t, t, d, alertMat, sx, sy, 0, g);
      for (const sz of [-d / 2, d / 2]) box(t, h, t, alertMat, sx, 0, sz, g);
    }
    for (const sy of [-h / 2, h / 2]) {
      for (const sz of [-d / 2, d / 2]) box(w, t, t, alertMat, 0, sy, sz, g);
    }
    return g;
  };

  const bldgBbox = makeBbox(bw + 0.36, bh + 0.6, bd + 0.4, 0, 0.1 + (bh + 0.4) / 2, -0.05);
  const treeBbox = makeBbox(1.56, 2.55, 1.48, treeGroup.position.x, 1.38, treeGroup.position.z);

  kit.ink(group);

  // Window panes added after ink() with windowMaterial so night lighting glows naturally
  const winMat = kit.windowMaterial(PALETTE.glass, PALETTE.window);
  for (const w of winSpecs) {
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(w.w, w.h), winMat);
    pane.position.set(w.x, w.y, zf + 0.025);
    pane.userData.noInk = true;
    facadeGroup.add(pane);
  }

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };

  const anchors = {
    front: anchor("front", [0, 2.0, zf + 0.1]),
    roof: anchor("roof", [0, 0.1 + bh + 0.3, -0.1]),
    door: anchor("door", [-0.55, 0.85, zf + 0.12]),
    tree: anchor("tree", [treeGroup.position.x, 1.85, treeGroup.position.z]),
    bboxTop: anchor("bboxTop", [0, 0.1 + bh + 0.72, -0.05]),
  };

  function update(t, state = {}) {
    const solid = kit.clamp01(state.solid ?? 1);
    const treeOn = state.showTree ?? showTree;
    const lampOn = state.showLamp ?? showLamp;

    solidGroup.visible = solid > 0.05;
    treeGroup.visible = Boolean(treeOn) && solidGroup.visible;
    lampGroup.visible = Boolean(lampOn) && solidGroup.visible;

    const pc = kit.clamp01(state.pointCloud ?? 0);
    bldgCloud.visible = pc > 0.02;
    treeCloud.visible = pc > 0.02 && Boolean(treeOn);

    const bb = kit.clamp01(state.bbox ?? 0);
    bldgBbox.visible = bb > 0.02;

    const tbb = kit.clamp01(state.treeBbox ?? 0);
    treeBbox.visible = tbb > 0.02 && Boolean(treeOn);
  }

  update(0);
  return { group, hero: [facadeGroup, treeGroup, bldgCloud], anchors, update };
}
