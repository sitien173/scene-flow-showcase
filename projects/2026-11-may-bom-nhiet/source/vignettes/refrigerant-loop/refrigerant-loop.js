// refrigerant-loop: original toon3d closed refrigerant circuit connecting outdoor coil (-x),
// compressor (+y), indoor coil (+x), and expansion valve (-y) with phase-change bubbles/droplets,
// fixed color role transitions (#2D7FF9 cold / #DD3428 hot), and reversible summer mode.
// Origin at ground center below loop center.
export function refrigerantLoop(kit, opts = {}) {
  const { THREE } = kit;
  const {
    width = 3.2,
    height = 2.0,
    baseY = 0.45,
    pipeRadius = 0.065,
  } = opts;

  const group = new THREE.Group();
  group.name = "refrigerant-loop";

  const flat = m => { m.flatShading = true; return m; };
  const mesh = (geo, mat, x = 0, y = 0, z = 0, parent = group, name = "") => {
    const m = new THREE.Mesh(geo, mat);
    if (name) m.name = name;
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  const COLD_HEX = "#2D7FF9";
  const HOT_HEX = "#DD3428";
  const NEUTRAL_HEX = "#8D92A6";

  const halfW = width / 2;
  const topY = baseY + height;
  const midY = baseY + height / 2;

  // Four connected loop segments: evapToComp (top-left), compToCond (top-right), condToValve (bottom-right), valveToEvap (bottom-left)
  const segments = {
    evapToComp: [[-halfW, midY + 0.15, 0], [-halfW, topY - 0.15, 0], [-0.45, topY, 0], [-0.15, topY, 0]],
    compToCond: [[0.15, topY, 0], [0.45, topY, 0], [halfW, topY - 0.15, 0], [halfW, midY + 0.15, 0]],
    condToValve: [[halfW, midY - 0.15, 0], [halfW, baseY + 0.15, 0], [0.45, baseY, 0], [0.15, baseY, 0]],
    valveToEvap: [[-0.15, baseY, 0], [-0.45, baseY, 0], [-halfW, baseY + 0.15, 0], [-halfW, midY - 0.15, 0]],
  };
  const order = ["evapToComp", "compToCond", "condToValve", "valveToEvap"];
  const loopPts = order.flatMap(k => segments[k]);

  const mats = {};
  const tubes = {};
  for (const key of order) {
    const mat = flat(kit.toon(NEUTRAL_HEX, { emissive: "#000000" }));
    mats[key] = mat;
    const curve = new THREE.CatmullRomCurve3(segments[key].map(p => new THREE.Vector3(...p)), false, "catmullrom", 0.25);
    const tube = mesh(new THREE.TubeGeometry(curve, 24, pipeRadius, 8, false), mat, 0, 0, 0, group, `pipe-${key}`);
    tube.userData.rolePart = "refrigerant";
    tubes[key] = tube;
  }

  // Station couplings at Evaporator (-x), Compressor (top), Condenser (+x), Expansion Valve (bottom)
  const collarMat = flat(kit.toon("#5B5E70"));
  const evapCollar = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.36, 10), collarMat, -halfW, midY, 0, group, "station-evaporator");
  const condCollar = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.36, 10), collarMat, halfW, midY, 0, group, "station-condenser");
  const compCollar = mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.34, 10), collarMat, 0, topY, 0, group, "station-compressor");
  compCollar.rotation.z = Math.PI / 2;
  const valveCollar = mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.34, 10), collarMat, 0, baseY, 0, group, "station-valve");
  valveCollar.rotation.z = Math.PI / 2;

  // Support stands under bottom line
  const standMat = flat(kit.toon("#3A3B4A"));
  for (const sx of [-halfW * 0.55, halfW * 0.55]) {
    mesh(new THREE.CylinderGeometry(0.045, 0.065, baseY, 6), standMat, sx, baseY / 2, 0, group, "pipe-stand");
  }

  // Boiling vapor bubbles (left coil side) & condensing liquid beads (right coil side)
  const bubbleMat = flat(kit.toon(COLD_HEX, { emissive: "#000000" }));
  const dropMat = flat(kit.toon(HOT_HEX, { emissive: "#000000" }));
  const bubbles = [];
  const drops = [];
  for (let i = 0; i < 4; i++) {
    const b = mesh(new THREE.SphereGeometry(0.085, 8, 6), bubbleMat, -halfW, midY, 0.12, group, `boil-bubble-${i}`);
    b.userData.rolePart = "cold";
    bubbles.push(b);
    const d = mesh(new THREE.SphereGeometry(0.085, 8, 6), dropMat, halfW, midY, 0.12, group, `condense-drop-${i}`);
    d.userData.rolePart = "hot";
    drops.push(d);
  }

  // Directional flow markers along the loop
  const arrowCurve = new THREE.CatmullRomCurve3(loopPts.map(p => new THREE.Vector3(...p)), true, "catmullrom", 0.25);
  const arrowMat = flat(kit.toon("#FAFCFB"));
  const arrows = [];
  for (let i = 0; i < 4; i++) {
    const a = mesh(new THREE.ConeGeometry(0.09, 0.18, 4), arrowMat, 0, 0, 0, group, `flow-marker-${i}`);
    arrows.push(a);
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
    evaporator: anchor("evaporator", [-halfW, midY, 0.15]),
    compressor: anchor("compressor", [0, topY, 0.15]),
    condenser: anchor("condenser", [halfW, midY, 0.15]),
    valve: anchor("valve", [0, baseY, 0.15]),
  };

  function path(name = "loop") {
    const list = name === "loop" ? loopPts : segments[name];
    if (!list) throw new Error("refrigerantLoop: no path " + JSON.stringify(name));
    group.updateWorldMatrix(true, false);
    return list.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const neutralCol = new THREE.Color(NEUTRAL_HEX);
  const coldCol = new THREE.Color(COLD_HEX);
  const hotCol = new THREE.Color(HOT_HEX);
  const darkCol = new THREE.Color("#000000");
  const tmpColdSide = new THREE.Color();
  const tmpHotSide = new THREE.Color();
  const upVec = new THREE.Vector3(0, 1, 0);
  const tangentVec = new THREE.Vector3();

  function update(t, state = {}) {
    const active = kit.clamp01(state.active ?? 1);
    const rev = Boolean(state.reverse);
    const phaseSplit = kit.clamp01(state.phaseSplit ?? 1);
    const boil = kit.clamp01(state.boil ?? 0);
    const condense = kit.clamp01(state.condense ?? 0);

    // Cold vs hot assignment: in winter heating, left/bottom-left is cold (#2D7FF9) and top-right/right is hot (#DD3428).
    // When phaseSplit = 0 (e.g. r1b neutral coolant overview), whole loop reads cold refrigerant #2D7FF9.
    const hotMix = tmpHotSide.copy(coldCol).lerp(hotCol, phaseSplit);
    const coldSideTarget = rev ? hotMix : coldCol;
    const hotSideTarget = rev ? coldCol : hotMix;

    for (const key of ["evapToComp", "valveToEvap"]) {
      mats[key].color.copy(neutralCol).lerp(coldSideTarget, active);
      mats[key].emissive.copy(darkCol).lerp(coldSideTarget, active * 0.22);
    }
    for (const key of ["compToCond", "condToValve"]) {
      mats[key].color.copy(neutralCol).lerp(hotSideTarget, active);
      mats[key].emissive.copy(darkCol).lerp(hotSideTarget, active * 0.22);
    }

    // Boiling bubbles rise on evaporator side, condensing drops descend on condenser side
    const evapX = rev ? halfW : -halfW;
    const condX = rev ? -halfW : halfW;
    for (let i = 0; i < 4; i++) {
      const b = bubbles[i];
      b.visible = boil > 0.04;
      if (b.visible) {
        const u = ((t * 0.7 + i / 4) % 1 + 1) % 1;
        b.position.set(evapX + Math.sin(i * 1.7) * 0.06, baseY + 0.3 + u * (height - 0.6), 0.14);
        b.scale.setScalar((0.55 + 0.55 * u) * boil);
      }
      const d = drops[i];
      d.visible = condense > 0.04;
      if (d.visible) {
        const u = ((t * 0.6 + i / 4) % 1 + 1) % 1;
        d.position.set(condX + Math.cos(i * 1.9) * 0.06, topY - 0.3 - u * (height - 0.6), 0.14);
        d.scale.setScalar((0.5 + 0.5 * Math.sin(u * Math.PI)) * condense);
      }
    }

    // Flow markers circulate clockwise (heating) or counter-clockwise (cooling)
    for (let i = 0; i < arrows.length; i++) {
      const a = arrows[i];
      a.visible = active > 0.05;
      if (!a.visible) continue;
      let u = ((t * 0.28 + i / arrows.length) % 1 + 1) % 1;
      if (rev) u = 1 - u;
      const p = arrowCurve.getPointAt(u);
      arrowCurve.getTangentAt(u, tangentVec);
      if (rev) tangentVec.negate();
      a.position.set(p.x, p.y, p.z + 0.11);
      a.quaternion.setFromUnitVectors(upVec, tangentVec.normalize());
    }
  }

  update(0);
  return { group, hero: Object.values(tubes), anchors, path, update };
}
