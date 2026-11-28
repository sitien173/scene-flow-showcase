// field-lines: 3D illustrative magnetic field loops in fixed #FCD53E with inner
// coupling loops, outer fringe loops, and directional cones that flip with AC polarity.
// No ink outlines (noInk: true) so lines clearly read as diagram curves, not solid wires.
// Origin at coil centre (y = 0); dipole axis points along +y.
export function fieldLines(kit, opts = {}) {
  const { THREE } = kit;
  const {
    color = "#FCD53E",
    baseRadius = 0.22,
    planes = 4,
  } = opts;

  const group = new THREE.Group();
  group.name = "field-lines";

  const fieldRoot = new THREE.Group();
  group.add(fieldRoot);

  const lineMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  const arrowMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
  });

  // Dipole-shaped field loop curve in XY plane (center passes vertically along +y, arcs outward)
  const buildLoopCurve = (rCore, rOut, hTop, hBot) => {
    const pts = [
      new THREE.Vector3(rCore, hBot, 0),
      new THREE.Vector3(rCore * 0.85, 0, 0),
      new THREE.Vector3(rCore * 1.15, hTop * 0.58, 0),
      new THREE.Vector3(rCore + (rOut - rCore) * 0.45, hTop, 0),
      new THREE.Vector3(rOut, hTop * 0.35, 0),
      new THREE.Vector3(rOut * 0.96, hBot * 0.45, 0),
      new THREE.Vector3(rCore + (rOut - rCore) * 0.4, hBot * 1.05, 0),
    ];
    return new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.5);
  };

  const innerCurve = buildLoopCurve(baseRadius * 0.28, baseRadius * 1.48, baseRadius * 2.2, -baseRadius * 0.85);
  const outerCurve = buildLoopCurve(baseRadius * 0.56, baseRadius * 2.35, baseRadius * 1.65, -baseRadius * 1.05);

  // Build segmented dashed arcs along a curve so field lines read as illustrative curves
  const dashGeo = new THREE.CapsuleGeometry(0.006, 0.032, 4, 6);
  const arrowGeo = new THREE.ConeGeometry(0.021, 0.056, 8);
  const up = new THREE.Vector3(0, 1, 0);

  const dashes = [];
  const arrows = [];

  for (let p = 0; p < planes; p++) {
    const planeGroup = new THREE.Group();
    planeGroup.rotation.y = (p * Math.PI * 2) / planes + Math.PI / 4;
    fieldRoot.add(planeGroup);

    const configs = [
      { curve: innerCurve, count: 16, arrowS: [0.44], tier: "inner" },
      { curve: outerCurve, count: 18, arrowS: [0.52], tier: "outer" },
    ];

    for (const cfg of configs) {
      for (let i = 0; i < cfg.count; i++) {
        const s = i / cfg.count;
        const pos = cfg.curve.getPointAt(s);
        const tan = cfg.curve.getTangentAt(s).normalize();
        const dash = new THREE.Mesh(dashGeo, lineMat);
        dash.userData.noInk = true;
        dash.position.copy(pos);
        dash.quaternion.setFromUnitVectors(up, tan);
        planeGroup.add(dash);
        dashes.push({ mesh: dash, curve: cfg.curve, baseS: s, tier: cfg.tier });
      }
      for (const sA of cfg.arrowS) {
        const pos = cfg.curve.getPointAt(sA);
        const tan = cfg.curve.getTangentAt(sA).normalize();
        const cone = new THREE.Mesh(arrowGeo, arrowMat);
        cone.userData.noInk = true;
        cone.position.copy(pos);
        cone.quaternion.setFromUnitVectors(up, tan);
        planeGroup.add(cone);
        arrows.push({ mesh: cone, tangent: tan.clone() });
      }
    }
  }

  // Central axis flux arrow
  const axisShaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.011, 0.011, baseRadius * 2.1, 8),
    lineMat
  );
  axisShaft.position.set(0, baseRadius * 0.65, 0);
  axisShaft.userData.noInk = true;
  const axisHead = new THREE.Mesh(new THREE.ConeGeometry(0.038, 0.095, 8), arrowMat);
  axisHead.position.set(0, baseRadius * 1.75, 0);
  axisHead.userData.noInk = true;
  fieldRoot.add(axisShaft, axisHead);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    center: anchor("center", [0, baseRadius * 0.6, 0]),
    top: anchor("top", [0, baseRadius * 2.1, 0]),
    outer: anchor("outer", [baseRadius * 2.1, baseRadius * 0.5, 0]),
    gap: anchor("gap", [0, baseRadius * 1.1, 0]),
  };

  const down = new THREE.Vector3(0, -1, 0);
  const tmpTan = new THREE.Vector3();

  function update(t, state = {}) {
    const intensity = kit.clamp01(state.intensity ?? 1);
    group.visible = intensity > 0.01;
    if (!group.visible) return;

    const oscillate = state.oscillate !== false;
    const freq = state.freq ?? 2.6;
    const pol = state.polarity !== undefined
      ? Math.max(-1, Math.min(1, state.polarity))
      : (oscillate ? Math.cos(t * freq) : 1);

    const mag = Math.abs(pol);
    const dir = pol >= 0 ? 1 : -1;
    const reach = state.reach ?? 1;
    const spread = state.spread ?? 1;

    // Scale softly with field magnitude while keeping a minimum readable breath
    const ampScale = 0.72 + 0.28 * mag;
    fieldRoot.scale.set(spread * ampScale, reach * ampScale, spread * ampScale);

    const vis = intensity * (0.25 + 0.75 * mag);
    lineMat.opacity = 0.82 * vis;
    arrowMat.opacity = 0.96 * vis;

    // Advance dash positions smoothly along loop tangent in polarity direction
    const flowShift = ((t * 0.35 * dir) % 1 + 1) % 1;
    for (const d of dashes) {
      const s = ((d.baseS + flowShift) % 1 + 1) % 1;
      d.mesh.position.copy(d.curve.getPointAt(s));
      d.curve.getTangentAt(s, tmpTan).normalize();
      d.mesh.quaternion.setFromUnitVectors(up, tmpTan);
    }

    // Flip arrowheads when AC polarity reverses
    for (const a of arrows) {
      tmpTan.copy(a.tangent).multiplyScalar(dir);
      a.mesh.quaternion.setFromUnitVectors(up, tmpTan);
    }

    axisHead.position.y = dir > 0 ? baseRadius * 1.75 : -baseRadius * 0.45;
    axisHead.quaternion.setFromUnitVectors(up, dir > 0 ? up : down);
  }

  update(0);
  return { group, hero: [fieldRoot], anchors, update };
}
