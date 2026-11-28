// expansion-valve: original toon3d cutaway pressure-reducing expansion valve.
// Shows warm high-pressure liquid (#DD3428) entering from -x, passing through a metered orifice,
// and expanding/cooling into low-pressure cold refrigerant (#2D7FF9) exiting toward +x.
// Origin at valve center; cutaway faces +z.
export function expansionValve(kit, opts = {}) {
  const { THREE } = kit;
  const {
    cutaway = 1,
    bodyColor = "#D98245",
    flangeColor = "#5B5E70",
  } = opts;

  const group = new THREE.Group();
  group.name = "expansion-valve";

  const flat = m => { m.flatShading = true; m.side = THREE.DoubleSide; return m; };
  const mesh = (geo, mat, x = 0, y = 0, z = 0, parent = group, name = "") => {
    const m = new THREE.Mesh(geo, mat);
    if (name) m.name = name;
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  const COLD_HEX = "#2D7FF9";
  const HOT_HEX = "#DD3428";
  const PIPE_NEUTRAL = "#8D92A6";

  const bodyMat = flat(kit.toon(bodyColor));
  const flangeMat = flat(kit.toon(flangeColor));
  const steelMat = flat(kit.toon("#B8BCC8"));
  const darkMat = flat(kit.toon("#3A3B4A"));
  const capMat = flat(kit.toon("#E6E6E1"));

  // Supporting cradle plinth at y = 0
  mesh(new THREE.BoxGeometry(1.4, 0.12, 0.9), flat(kit.toon("#888898")), 0, 0.06, 0, group, "valve-base");
  mesh(new THREE.BoxGeometry(0.42, 0.48, 0.42), flangeMat, 0, 0.36, -0.04, group, "valve-pedestal");

  const cy = 1.05;
  // Valve main body block (back half in cutaway, or closed full block)
  mesh(new THREE.BoxGeometry(0.95, 0.88, cutaway ? 0.36 : 0.86), bodyMat, 0, cy, cutaway ? -0.24 : 0, group, "valve-body");

  // High-pressure inlet pipe (-x) and low-pressure outlet pipe (+x) with flanges
  const inPipeMat = flat(kit.toon(PIPE_NEUTRAL, { emissive: "#000000" }));
  const outPipeMat = flat(kit.toon(PIPE_NEUTRAL, { emissive: "#000000" }));
  const inPipe = mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.90, 10), inPipeMat, -0.92, cy, 0, group, "inlet-pipe");
  inPipe.rotation.z = Math.PI / 2;
  inPipe.userData.rolePart = "hot";

  const outPipe = mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.90, 10), outPipeMat, 0.92, cy, 0, group, "outlet-pipe");
  outPipe.rotation.z = Math.PI / 2;
  outPipe.userData.rolePart = "cold";

  for (const fx of [-0.52, 0.52]) {
    const fl = mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.10, 10), flangeMat, fx, cy, 0, group, "valve-flange");
    fl.rotation.z = Math.PI / 2;
  }

  // Diaphragm actuator bonnet on top
  mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.28, 10), bodyMat, 0, cy + 0.56, 0, group, "bonnet-neck");
  mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.16, 12), capMat, 0, cy + 0.76, 0, group, "diaphragm-cap");
  mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.14, 8), flangeMat, 0, cy + 0.90, 0, group, "adjuster-nut");

  // Cutaway internals: pressure-divider seat + needle + high-P fluid + expanding low-P droplets
  const internals = new THREE.Group();
  internals.name = "valve-internals";
  internals.visible = Boolean(cutaway);
  group.add(internals);

  // Seat dividing left (high-P) and right (low-P) chambers
  mesh(new THREE.BoxGeometry(0.12, 0.72, 0.34), darkMat, -0.02, cy, 0.06, internals, "orifice-seat");

  // Metered valve needle & stem
  const needle = new THREE.Group();
  needle.name = "metering-needle";
  needle.position.set(-0.02, cy + 0.10, 0.12);
  internals.add(needle);
  mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.52, 8), steelMat, 0, 0.32, 0, needle, "needle-stem");
  const tip = mesh(new THREE.ConeGeometry(0.085, 0.22, 8), steelMat, 0, 0.0, 0, needle, "needle-cone");
  tip.rotation.x = Math.PI;

  // High-pressure fluid slug (left of orifice)
  const highFluidMat = flat(kit.toon(PIPE_NEUTRAL, { emissive: "#000000" }));
  const highFluid = mesh(new THREE.BoxGeometry(0.42, 0.26, 0.22), highFluidMat, -0.28, cy, 0.10, internals, "high-p-fluid");
  highFluid.userData.rolePart = "hot";

  // Low-pressure expanding spray droplets (right of orifice, expanding as they travel +x)
  const lowFluidMat = flat(kit.toon(PIPE_NEUTRAL, { emissive: "#000000" }));
  const droplets = [];
  for (let i = 0; i < 6; i++) {
    const d = mesh(new THREE.IcosahedronGeometry(0.07, 0), lowFluidMat, 0.12, cy, 0.12, internals, `expand-drop-${i}`);
    d.userData.rolePart = "cold";
    droplets.push(d);
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
    inlet: anchor("inlet", [-1.15, cy, 0.12]),
    outlet: anchor("outlet", [1.15, cy, 0.12]),
    orifice: anchor("orifice", [-0.02, cy, 0.22]),
    body: anchor("body", [0, cy + 0.55, 0.25]),
  };

  const inPts = [[-1.65, cy, 0], [-0.55, cy, 0], [-0.05, cy, 0]];
  const outPts = [[0.05, cy, 0], [0.55, cy, 0], [1.65, cy, 0]];
  const throughPts = [[-1.65, cy, 0], [-0.55, cy, 0], [0.0, cy, 0], [0.55, cy, 0], [1.65, cy, 0]];
  function path(name = "through") {
    const list = name === "in" ? inPts : name === "out" ? outPts : name === "through" ? throughPts : null;
    if (!list) throw new Error("expansionValve: unknown path " + JSON.stringify(name));
    group.updateWorldMatrix(true, false);
    return list.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const neutralCol = new THREE.Color(PIPE_NEUTRAL);
  const hotCol = new THREE.Color(HOT_HEX);
  const coldCol = new THREE.Color(COLD_HEX);
  const darkCol = new THREE.Color("#000000");

  function update(t, state = {}) {
    const flow = kit.clamp01(state.flow ?? 1);
    const drop = kit.clamp01(state.drop ?? flow);
    const rev = Boolean(state.reverse);

    // Needle lifts gently when flow is open
    needle.position.y = cy + 0.04 + 0.10 * flow + 0.015 * Math.sin(t * 4.5) * flow;

    const inTarget = rev ? coldCol : hotCol;
    const outTarget = rev ? hotCol : coldCol;

    inPipeMat.color.copy(neutralCol).lerp(inTarget, flow);
    highFluidMat.color.copy(neutralCol).lerp(inTarget, flow);
    highFluidMat.emissive.copy(darkCol).lerp(inTarget, flow * 0.25);

    const outMix = kit.clamp01(flow * drop);
    outPipeMat.color.copy(neutralCol).lerp(outTarget, outMix);
    lowFluidMat.color.copy(inTarget).lerp(outTarget, drop);
    lowFluidMat.emissive.copy(darkCol).lerp(outTarget, outMix * 0.35);

    for (let i = 0; i < droplets.length; i++) {
      const d = droplets[i];
      d.visible = flow > 0.04;
      if (!d.visible) continue;
      const u = ((t * (0.65 + 0.35 * flow) + i / droplets.length) % 1 + 1) % 1;
      const spreadY = Math.sin(i * 2.1) * 0.12 * u;
      d.position.set(0.08 + u * 0.48, cy + spreadY, 0.14);
      const s = (0.45 + 1.05 * u * (0.4 + 0.6 * drop)) * (0.6 + 0.4 * flow);
      d.scale.setScalar(s);
    }
  }

  update(0);
  return { group, hero: [needle, highFluid, ...droplets], anchors, path, update };
}
