// anc-chip: toon3d DSP processor IC on a light-teal PCB with gold pins, status LEDs,
// and an animated mini dual-wave display (red input -> green inverted output). Origin at PCB centre.
export function ancChip(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    pcbColor = "#3B7A6C",
    chipColor = "#242733",
    inColor = PALETTE.accent,
    outColor = PALETTE.good,
    pinColor = PALETTE.highlight,
    processing = 0,
    invert = 0,
  } = opts;

  const group = new THREE.Group();
  group.name = "anc-chip";
  const flat = m => { m.flatShading = true; return m; };

  const pcbMat = flat(kit.toon(pcbColor));
  const chipMat = flat(kit.toon(chipColor));
  const pinMat = flat(kit.toon(pinColor));
  const ledMat = flat(kit.toon(outColor, { emissive: "#000000" }));
  const inBarMat = flat(kit.toon(inColor));
  const outBarMat = flat(kit.toon(outColor));

  // PCB board
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.18, 2.2), pcbMat);
  pcb.position.y = 0.09;
  group.add(pcb);

  // Chip package
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.28, 1.25), chipMat);
  body.position.y = 0.32;
  group.add(body);

  // IC pins on left & right
  for (let i = -2; i <= 2; i++) {
    const z = i * 0.22;
    const pL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.07, 0.09), pinMat);
    pL.position.set(-0.74, 0.22, z);
    const pR = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.07, 0.09), pinMat);
    pR.position.set(0.74, 0.22, z);
    group.add(pL, pR);
  }

  // Mini screen frame on top of chip
  const screenBg = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.04, 0.72), flat(kit.toon("#171922")));
  screenBg.position.set(0, 0.47, 0);
  group.add(screenBg);

  // Mini waveform bars (7 red input, 7 green inverted output)
  const inBars = [];
  const outBars = [];
  for (let i = 0; i < 7; i++) {
    const x = -0.33 + i * 0.11;
    const bIn = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.16), inBarMat);
    bIn.position.set(x, 0.50, -0.15);
    const bOut = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.16), outBarMat);
    bOut.position.set(x, 0.50, 0.15);
    group.add(bIn, bOut);
    inBars.push(bIn);
    outBars.push(bOut);
  }

  // Status LED
  const led = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 10), ledMat);
  led.position.set(0.95, 0.22, 0.75);
  group.add(led);

  // Input & output trace paths
  const inPts = [[-2.0, 0.20, 0], [-1.3, 0.20, 0], [-0.85, 0.22, 0]];
  const outPts = [[0.85, 0.22, 0], [1.3, 0.20, 0], [2.0, 0.20, 0]];
  const trace = (pts, mat) => {
    const c = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
    const m = new THREE.Mesh(new THREE.TubeGeometry(c, 10, 0.04, 6, false), mat);
    group.add(m);
  };
  trace(inPts, pinMat);
  trace(outPts, outBarMat);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    chip: anchor("chip", [0, 0.52, 0]),
    inPin: anchor("inPin", [-0.95, 0.25, 0]),
    outPin: anchor("outPin", [0.95, 0.25, 0]),
    screen: anchor("screen", [0, 0.55, 0]),
  };

  function path(name = "in") {
    const list = name === "in" ? inPts : name === "out" ? outPts : null;
    if (!list) throw new Error("anc-chip: unknown path " + name);
    group.updateWorldMatrix(true, false);
    return list.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const dark = new THREE.Color("#000000");
  const ledGlow = new THREE.Color(outColor);

  function update(t, state = {}) {
    const proc = kit.clamp01(state.processing ?? processing);
    const inv = kit.clamp01(state.invert ?? invert);
    const pulse = 0.5 + 0.5 * Math.sin(t * 14);
    ledMat.emissive.copy(dark).lerp(ledGlow, proc * (0.4 + 0.6 * pulse));

    for (let i = 0; i < 7; i++) {
      const wave = Math.sin(i * 0.9 - t * 8);
      inBars[i].scale.z = 0.35 + 0.65 * Math.abs(wave);
      const outWave = Math.sin(i * 0.9 - t * 8 + inv * Math.PI);
      outBars[i].scale.z = 0.25 + 0.75 * Math.abs(outWave) * (0.3 + 0.7 * inv);
    }
  }

  update(0);
  return { group, hero: [body, pcb], anchors, path, update };
}
