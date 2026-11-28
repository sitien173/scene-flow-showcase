// electron-marker: toon3d standalone electron (e-) sphere with crisp white minus sign,
// orbital ring, optional Li-atom ionization split (Li -> Li+ + e-), and curved flow beads.
// Origin at base centre (y = 0); front emblem faces +z.
export function electronMarker(kit, opts = {}) {
  const { THREE } = kit;
  const {
    electronColor = "#00B4D8",
    ionColor = "#F2A541",
    radius = 0.34,
    mode = "marker",
    split = 0,
    chargePulse = 0.35,
    showRing = true,
    count = 3,
  } = opts;

  const group = new THREE.Group();
  group.name = "electron-marker";

  const eBaseCol = new THREE.Color(electronColor);
  const ringHex = "#" + eBaseCol.clone().lerp(new THREE.Color("#FFFFFF"), 0.45).getHexString();
  const dark = new THREE.Color("#000000");

  // Primary electron carrier assembly
  const mainPivot = new THREE.Group();
  mainPivot.position.set(0, 0.72, 0);
  group.add(mainPivot);

  const eMat = kit.toon(electronColor, { emissive: "#000000" });
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 18, 14), eMat);
  mainPivot.add(sphere);

  // Crisp white minus (-) bars on front (+z) and back (-z)
  const emblemMat = kit.toon("#FAFCFB");
  const makeMinus = (zPos, parent, r = radius) => {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(r * 1.06, r * 0.25, 0.03), emblemMat);
    bar.position.z = zPos;
    bar.userData.noInk = true;
    parent.add(bar);
    return bar;
  };
  const minusFront = makeMinus(radius * 0.96, mainPivot);
  makeMinus(-radius * 0.96, mainPivot);

  // Inclined orbital ring and two fast satellite pips
  const ringGroup = new THREE.Group();
  ringGroup.rotation.set(0.38, 0.0, -0.24);
  mainPivot.add(ringGroup);

  const ringMat = kit.toon(ringHex, { emissive: "#000000" });
  const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.62, 0.032, 8, 28), ringMat);
  ringGroup.add(ringMesh);

  const pipMat = kit.toon(electronColor, { emissive: electronColor });
  pipMat.emissiveIntensity = 0.25;
  const pips = [0, Math.PI].map(ang => {
    const pip = new THREE.Mesh(new THREE.SphereGeometry(0.056, 10, 8), pipMat);
    pip.position.set(Math.cos(ang) * radius * 1.62, Math.sin(ang) * radius * 1.62, 0);
    ringGroup.add(pip);
    return { mesh: pip, baseAng: ang };
  });

  // Optional Li+ partner sphere and tether for ionization split state (Li -> Li+ + e-)
  const splitGroup = new THREE.Group();
  splitGroup.position.set(0, 0.72, 0);
  group.add(splitGroup);

  const ionRadius = radius * 1.15;
  const ionMat = kit.toon(ionColor, { emissive: "#000000" });
  const ionPivot = new THREE.Group();
  splitGroup.add(ionPivot);
  const ionSphere = new THREE.Mesh(new THREE.SphereGeometry(ionRadius, 18, 14), ionMat);
  ionPivot.add(ionSphere);

  for (const zSign of [1, -1]) {
    const h = new THREE.Mesh(new THREE.BoxGeometry(ionRadius * 0.95, ionRadius * 0.22, 0.03), emblemMat);
    h.position.z = zSign * ionRadius * 0.96;
    h.userData.noInk = true;
    const v = new THREE.Mesh(new THREE.BoxGeometry(ionRadius * 0.22, ionRadius * 0.95, 0.03), emblemMat);
    v.position.z = zSign * ionRadius * 0.96;
    v.userData.noInk = true;
    ionPivot.add(h, v);
  }

  const tetherMat = kit.toon(ringHex);
  const tetherDots = [];
  for (let i = 0; i < 5; i++) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.034, 8, 6), tetherMat);
    dot.userData.noInk = true;
    splitGroup.add(dot);
    tetherDots.push(dot);
  }

  // Flow mode beads along a smooth local arc
  const flowPts = [
    [-1.25, 0.62, 0.0],
    [-0.62, 0.92, 0.12],
    [0.0, 1.04, 0.0],
    [0.62, 0.92, -0.12],
    [1.25, 0.62, 0.0],
  ];
  const flowCurve = new THREE.CatmullRomCurve3(
    flowPts.map(p => new THREE.Vector3(...p)),
    false,
    "catmullrom",
    0.25
  );
  const flowGroup = new THREE.Group();
  group.add(flowGroup);
  const maxBeads = 5;
  const flowBeads = [];
  for (let i = 0; i < maxBeads; i++) {
    const bGroup = new THREE.Group();
    const bSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.56, 12, 10), eMat);
    bGroup.add(bSphere);
    makeMinus(radius * 0.54, bGroup, radius * 0.56);
    flowGroup.add(bGroup);
    flowBeads.push(bGroup);
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
    electron: anchor("electron", [0, 0.72, 0]),
    minus: anchor("minus", [0, 0.72, radius + 0.06]),
    ion: anchor("ion", [-0.72, 0.72, 0]),
    ring: anchor("ring", [0, 0.72 + radius * 1.62, 0]),
    body: anchor("body", [0, 0.72, 0]),
  };

  function path(name = "arc") {
    if (name !== "arc") throw new Error("electronMarker: no path " + JSON.stringify(name));
    group.updateWorldMatrix(true, false);
    return flowPts.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  // state:
  //   mode: "marker" | "split" | "flow"
  //   split: 0..1 separation between Li+ and e-
  //   chargePulse: 0..1 subtle electronColor glow
  //   showRing: boolean
  //   flowSpeed: scalar (default 0.42)
  //   reverse: boolean
  //   count: 1..5 beads in flow mode
  function update(t, state = {}) {
    const m = state.mode ?? mode;
    const sp = kit.clamp01(state.split ?? (m === "split" ? 1 : split));
    const pulse = kit.clamp01(state.chargePulse ?? chargePulse);
    const ringOn = state.showRing ?? showRing;
    const speed = state.flowSpeed ?? 0.42;
    const dir = state.reverse ? -1 : 1;
    const nBeads = Math.max(1, Math.min(maxBeads, Math.round(state.count ?? count)));

    const glow = pulse * (0.65 + 0.35 * Math.sin(t * 4.5));
    eMat.emissive.copy(dark).lerp(eBaseCol, glow * 0.45);
    ringMat.emissive.copy(dark).lerp(eBaseCol, glow * 0.25);

    const bob = Math.sin(t * 2.4) * 0.055;
    mainPivot.visible = m !== "flow";
    flowGroup.visible = m === "flow";

    if (mainPivot.visible) {
      const sepX = sp * 0.72;
      mainPivot.position.set(sepX, 0.72 + bob, 0);
      mainPivot.rotation.y = Math.sin(t * 1.4) * 0.16;
      ringGroup.visible = Boolean(ringOn) && sp < 0.35;
      if (ringGroup.visible) {
        const rOrb = radius * 1.62;
        pips.forEach(p => {
          const a = p.baseAng + t * 2.8;
          p.mesh.position.set(Math.cos(a) * rOrb, Math.sin(a) * rOrb, 0);
        });
      }
      anchors.electron.position.copy(mainPivot.position);
      anchors.minus.position.set(sepX, 0.72 + bob, radius + 0.06);
    }

    splitGroup.visible = m !== "flow" && sp > 0.02;
    if (splitGroup.visible) {
      const ionX = -sp * 0.72;
      const eX = sp * 0.72;
      ionPivot.position.set(ionX, -bob * 0.5, 0);
      anchors.ion.position.set(ionX, 0.72 - bob * 0.5, 0);
      tetherDots.forEach((dot, idx) => {
        const frac = (idx + 1) / (tetherDots.length + 1);
        dot.position.set(kit.lerp(ionX, eX, frac), bob * (frac - 0.5), 0);
        dot.visible = sp > 0.22;
      });
    }

    if (flowGroup.visible) {
      flowBeads.forEach((b, idx) => {
        b.visible = idx < nBeads;
        if (!b.visible) return;
        const u = (((idx / nBeads + t * speed * dir) % 1) + 1) % 1;
        b.position.copy(flowCurve.getPointAt(u));
      });
    }
  }

  update(0);
  return { group, hero: [mainPivot, flowGroup], anchors, path, update };
}
