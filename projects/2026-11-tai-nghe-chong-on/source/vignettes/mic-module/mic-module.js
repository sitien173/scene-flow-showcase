// mic-module: closeup-capable toon3d MEMS/electret microphone module with perforated grille,
// vibrating diaphragm, PCB base, and yellow electrical signal port. Origin at centre; grille faces +z.
export function micModule(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    housingColor = "#4A5062",
    pcbColor = "#2E6F5E",
    signalColor = PALETTE.highlight,
    vibrate = 0,
    active = 0,
  } = opts;

  const group = new THREE.Group();
  group.name = "mic-module";
  const flat = m => { m.flatShading = true; return m; };

  const housingMat = flat(kit.toon(housingColor));
  const grilleMat = flat(kit.toon("#272A35"));
  const membraneMat = flat(kit.toon("#D9DFE8", { emissive: "#000000" }));
  const pcbMat = flat(kit.toon(pcbColor));
  const pinMat = flat(kit.toon(signalColor, { emissive: "#000000" }));

  // Outer cylindrical housing
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.72, 0.55, 16), housingMat);
  body.rotation.x = Math.PI / 2;
  group.add(body);

  // Bezel ring
  const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.64, 0.07, 8, 18), flat(kit.toon("#7C8499")));
  bezel.position.z = 0.27;
  group.add(bezel);

  // Vibrating diaphragm behind grille
  const membrane = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.05, 16), membraneMat);
  membrane.rotation.x = Math.PI / 2;
  membrane.position.z = 0.20;
  group.add(membrane);

  // Grille bars
  for (const y of [-0.30, -0.10, 0.10, 0.30]) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.05, 0.04), grilleMat);
    bar.position.set(0, y, 0.28);
    group.add(bar);
  }

  // PCB base & signal port
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.5, 0.14), pcbMat);
  pcb.position.set(0, -0.1, -0.34);
  group.add(pcb);

  const port = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.45, 10), pinMat);
  port.rotation.z = Math.PI / 2;
  port.position.set(0.85, -0.4, -0.28);
  group.add(port);

  // Wire leading right
  const wirePts = [
    [0.0, -0.05, 0.18],
    [0.4, -0.25, -0.22],
    [0.95, -0.4, -0.28],
    [2.1, -0.4, -0.28],
  ];
  const wireCurve = new THREE.CatmullRomCurve3(wirePts.map(p => new THREE.Vector3(...p)));
  const wire = new THREE.Mesh(new THREE.TubeGeometry(wireCurve, 14, 0.045, 6, false), pinMat);
  group.add(wire);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    grille: anchor("grille", [0, 0.15, 0.34]),
    membrane: anchor("membrane", [0, 0, 0.22]),
    port: anchor("port", [0.95, -0.4, -0.28]),
  };

  function path(name = "signal") {
    if (name !== "signal") throw new Error("mic-module: unknown path " + name);
    group.updateWorldMatrix(true, false);
    return wirePts.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const dark = new THREE.Color("#000000");
  const glow = new THREE.Color(signalColor);

  function update(t, state = {}) {
    const vib = kit.clamp01(state.vibrate ?? vibrate);
    const act = kit.clamp01(state.active ?? active);
    membrane.position.z = 0.20 + vib * 0.06 * Math.sin(t * 26);
    membrane.scale.setScalar(1 + vib * 0.05 * Math.sin(t * 26));
    pinMat.emissive.copy(dark).lerp(glow, act * 0.55);
  }

  update(0);
  return { group, hero: [body, membrane], anchors, path, update };
}
