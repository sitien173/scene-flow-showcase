// electrolyte-medium: toon3d slate-blue (#8FA3B8) liquid electrolyte chamber volume with
// animated ionic conduction waves, pore-bridge channels, optional purple Li+ carriers,
// and an explicit electron-blocking repulsion barrier (cyan e- rebounding off the red #DD3428 barrier).
// Origin at base centre (y = 0); aligns cleanly inside cell-cutaway or standalone on stage.
export function electrolyteMedium(kit, opts = {}) {
  const { THREE } = kit;
  const {
    tealColor = "#8FA3B8",
    deepTeal = "#64798F",
    foamTeal = "#B4C4D4",
    ionColor = "#F2A541",
    electronColor = "#00B4D8",
    alertColor = "#DD3428",
  } = opts;

  const group = new THREE.Group();
  group.name = "electrolyte-medium";

  const W = 2.44;
  const H = 1.36;
  const D = 0.86;

  // Low-profile inked containment tray base so medium sits grounded on stage
  const trayMat = kit.toon(deepTeal);
  const tray = new THREE.Mesh(new THREE.BoxGeometry(W + 0.08, 0.06, D + 0.08), trayMat);
  tray.position.set(0, 0.03, 0);
  group.add(tray);

  // Translucent slate-blue electrolyte fluid body (scales vertically from bottom by fill 0..1)
  const fillPivot = new THREE.Group();
  fillPivot.position.set(0, 0.05, 0);
  group.add(fillPivot);

  const fluidMat = new THREE.MeshToonMaterial({
    color: tealColor,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
  });
  const fluidBody = new THREE.Mesh(new THREE.BoxGeometry(W, H - 0.08, D), fluidMat);
  fluidBody.position.set(0, (H - 0.08) / 2, 0);
  fluidBody.userData.noInk = true;
  fluidBody.castShadow = false;
  fluidBody.renderOrder = 3;
  fillPivot.add(fluidBody);

  // Inked slate-blue meniscus frame strips & wave crest tiles on top of fluid level
  const meniscusGroup = new THREE.Group();
  meniscusGroup.position.set(0, H - 0.06, 0);
  group.add(meniscusGroup);
  const crestMat = kit.toon(foamTeal);
  const crestTiles = [];
  for (let i = 0; i < 6; i++) {
    const x = -0.95 + i * 0.38;
    const tile = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.045, D * 0.96), crestMat);
    tile.position.set(x, -0.015, 0);
    meniscusGroup.add(tile);
    crestTiles.push({ mesh: tile, baseX: x, idx: i });
  }

  // Animated ionic conduction wave bars inside the slate-blue medium
  const waveGroup = new THREE.Group();
  group.add(waveGroup);
  const waveMat = kit.toon(foamTeal, { emissive: deepTeal });
  const waveRings = [];
  for (let i = 0; i < 6; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.022, 6, 14), waveMat);
    ring.rotation.y = Math.PI / 2;
    ring.position.set(-0.9 + i * 0.36, 0.70, 0);
    waveGroup.add(ring);
    waveRings.push({ mesh: ring, idx: i });
  }

  // Pore-bridge channels at x = 0 showing electrolyte permeating separator openings
  const bridgeMat = kit.toon(tealColor);
  const bridges = [0.42, 0.68, 0.94].map(by => {
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.050, 0.050, 0.36, 10), bridgeMat);
    tube.rotation.z = Math.PI / 2;
    tube.position.set(0, by, 0.02);
    group.add(tube);
    return { mesh: tube, y: by };
  });

  // Purple Li+ tracer ions gliding through electrolyte
  const ionGroup = new THREE.Group();
  group.add(ionGroup);
  const ionMat = kit.toon(ionColor, { emissive: "#000000" });
  const ionTrackYs = [0.42, 0.68, 0.94];
  const ionTrackZs = [0.20, 0.24, 0.20];
  const tracerIons = ionTrackYs.map((y, idx) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.068, 12, 10), ionMat);
    m.position.set(-0.8 + idx * 0.6, y, ionTrackZs[idx]);
    ionGroup.add(m);
    return { mesh: m, y, z: ionTrackZs[idx], offset: idx / 3 };
  });

  // Electron-blocking barrier visual (x = -0.18): cyan e- rebounds off the red barrier
  const blockGroup = new THREE.Group();
  group.add(blockGroup);

  const shieldMat = new THREE.MeshBasicMaterial({
    color: alertColor,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const shieldPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.76, 1.05), shieldMat);
  shieldPlane.rotation.y = Math.PI / 2;
  shieldPlane.position.set(-0.14, 0.68, 0);
  shieldPlane.userData.noInk = true;
  shieldPlane.renderOrder = 2;
  blockGroup.add(shieldPlane);

  const shieldRimMat = kit.toon(alertColor, { emissive: "#000000" });
  const shieldRim = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.026, 6, 20), shieldRimMat);
  shieldRim.rotation.y = Math.PI / 2;
  shieldRim.position.set(-0.14, 0.68, 0);
  blockGroup.add(shieldRim);

  const eMat = kit.toon(electronColor, { emissive: electronColor });
  eMat.emissiveIntensity = 0.22;
  const blockedElectrons = [0.46, 0.70, 0.94].map((y, idx) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.066, 12, 10), eMat);
    m.position.set(-0.85, y, 0.22 + (idx - 1) * 0.10);
    blockGroup.add(m);
    return { mesh: m, y, z: 0.22 + (idx - 1) * 0.10, phase: idx * 0.33 };
  });

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    center: anchor("center", [0, 0.70, 0]),
    pores: anchor("pores", [0, 0.70, 0.25]),
    blockPlane: anchor("blockPlane", [-0.14, 0.70, 0.25]),
    surface: anchor("surface", [0, H - 0.05, 0]),
    anodeSide: anchor("anodeSide", [-0.80, 0.70, 0]),
    cathodeSide: anchor("cathodeSide", [0.80, 0.70, 0]),
  };

  const channelPts = [
    [-1.08, 0.68, 0.16],
    [-0.50, 0.68, 0.16],
    [0.0, 0.68, 0.16],
    [0.50, 0.68, 0.16],
    [1.08, 0.68, 0.16],
  ];
  function path(name = "ionChannel") {
    if (name !== "ionChannel") throw new Error("electrolyteMedium: no path " + JSON.stringify(name));
    group.updateWorldMatrix(true, false);
    return channelPts.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const tealCol = new THREE.Color(tealColor);
  const stressCol = new THREE.Color("#2D7068");
  const alertCol = new THREE.Color(alertColor);
  const dark = new THREE.Color("#000000");

  // state:
  //   fill: 0..1 liquid level (default 1)
  //   flowDir: +1 (discharge left->right), -1 (charge right->left), 0 (gentle hover)
  //   showBlock: 0..1 (electron-blocking shield + bouncing yellow electrons)
  //   showIons: boolean (default true)
  //   stress: 0..1 (disturbs/darkens medium during dendrite / wear)
  function update(t, state = {}) {
    const fill = kit.clamp01(state.fill ?? opts.fill ?? 1);
    const dir = state.flowDir ?? opts.flowDir ?? 1;
    const block = kit.clamp01(state.showBlock ?? opts.showBlock ?? 1);
    const stress = kit.clamp01(state.stress ?? opts.stress ?? 0);
    const showIons = state.showIons ?? opts.showIons ?? true;

    fillPivot.visible = fill > 0.01;
    fillPivot.scale.y = Math.max(0.02, fill);
    const topY = 0.05 + fill * (H - 0.11);
    meniscusGroup.position.y = topY;
    meniscusGroup.visible = fill > 0.05;

    fluidMat.color.copy(tealCol).lerp(stressCol, stress * 0.65);

    crestTiles.forEach(tile => {
      tile.mesh.position.y = Math.sin(t * 3.0 + tile.idx * 0.9) * 0.022;
    });

    bridges.forEach(b => {
      b.mesh.visible = topY >= b.y + 0.04;
    });

    waveGroup.visible = fill > 0.35;
    waveRings.forEach(ring => {
      const shift = dir === 0 ? 0.5 : (((t * 0.45 * dir + ring.idx / waveRings.length) % 1) + 1) % 1;
      const x = kit.lerp(-1.02, 1.02, shift);
      ring.mesh.position.x = x;
      const edgeFade = Math.sin(shift * Math.PI);
      ring.mesh.scale.setScalar(0.55 + 0.55 * edgeFade);
    });

    ionGroup.visible = Boolean(showIons) && fill > 0.35;
    if (ionGroup.visible) {
      tracerIons.forEach((ion, idx) => {
        const u = dir === 0
          ? 0.5 + 0.25 * Math.sin(t * 1.4 + idx)
          : (((t * 0.38 * dir + ion.offset) % 1) + 1) % 1;
        ion.mesh.position.set(kit.lerp(-1.02, 1.02, u), ion.y * Math.min(1, fill + 0.2), ion.z);
      });
    }

    blockGroup.visible = block > 0.02 && fill > 0.35;
    if (blockGroup.visible) {
      let maxHit = 0;
      blockedElectrons.forEach(e => {
        // Periodic approach from -0.96 to -0.24 then sharp rebound back
        const cyc = (((t * 0.85 + e.phase) % 1) + 1) % 1;
        const tri = cyc < 0.5 ? kit.ease(cyc / 0.5, "in") : 1 - kit.ease((cyc - 0.5) / 0.5, "out");
        const x = kit.lerp(-0.98, -0.23, tri);
        e.mesh.position.set(x, e.y, e.z);
        if (tri > maxHit) maxHit = tri;
      });
      const impact = Math.pow(maxHit, 4);
      shieldMat.opacity = (0.16 + 0.32 * impact) * block;
      shieldRim.scale.setScalar(0.92 + 0.16 * impact);
      shieldRimMat.emissive.copy(dark).lerp(alertCol, impact * 0.75 * block);
    }
  }

  update(0);
  return { group, hero: [tray, meniscusGroup, waveGroup, shieldRim], anchors, path, update };
}
