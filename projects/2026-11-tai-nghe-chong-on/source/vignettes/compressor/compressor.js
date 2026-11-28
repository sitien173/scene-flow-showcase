// compressor: a closeup-capable toon compressor. A sealed dome on feet; with cutaway the front half of the shell is
// open and shows the motor windings, the crank, the connecting rod and the piston pumping in its cylinder.
// Origin at the floor under the dome centre; the cut faces +z.
export function compressor(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const { cutaway = true, shellColor = "#3A3B4A", hotColor = "#F08A4B", rate = 1.5 } = opts;
  const group = new THREE.Group();
  group.name = "compressor";
  const flat = m => { m.flatShading = true; m.side = THREE.DoubleSide; return m; };
  const mesh = (geometry, material, x, y, z, parent = group) => {
    const m = new THREE.Mesh(geometry, material);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };
  const R = 1, Hc = 1.3;
  const arc = cutaway ? Math.PI : Math.PI * 2;
  const side = cutaway ? Math.PI / 2 : 0;
  const cap = cutaway ? Math.PI : 0;
  const shellMat = flat(kit.toon(shellColor));
  mesh(new THREE.CylinderGeometry(R, R * 1.05, Hc, 14, 1, true, side, arc), shellMat, 0, 0.35 + Hc / 2, 0);
  mesh(new THREE.SphereGeometry(R, 14, 5, cap, arc, 0, Math.PI / 2), shellMat, 0, 0.35 + Hc, 0);
  mesh(new THREE.CylinderGeometry(R * 1.05, R * 1.05, 0.08, 14, 1, false), shellMat, 0, 0.37, 0);
  const base = flat(kit.toon(PALETTE.stone));
  mesh(new THREE.BoxGeometry(2.6, 0.12, 1.6), base, 0, 0.06, 0);
  for (const x of [-0.9, 0.9]) mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.24, 6), flat(kit.toon("#2A2B36")), x, 0.22, 0);

  // pipes on top: suction in (left) and discharge out (right)
  const pipeMat = flat(kit.toon("#C88A5A"));
  const outMat = flat(kit.toon("#C88A5A"));
  const bend = (points, material) => {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), false, "catmullrom", 0.2);
    return mesh(new THREE.TubeGeometry(curve, 24, 0.08, 6, false), material, 0, 0, 0);
  };
  const inPts = [[-2.2, 2.3, 0], [-1.0, 2.3, 0], [-0.45, 2.15, 0], [-0.45, 1.75, 0]];
  const outPts = [[0.45, 1.75, 0], [0.45, 2.15, 0], [1.0, 2.3, 0], [2.2, 2.3, 0]];
  bend(inPts, pipeMat);
  bend(outPts, outMat);

  // inside: motor windings (copper), crank disc, rod, piston in a cylinder block
  const inside = new THREE.Group();
  group.add(inside);
  inside.visible = cutaway;
  mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.55, 12), flat(kit.toon("#D08850")), 0, 0.75, -0.1, inside);
  mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.6, 8), flat(kit.toon(PALETTE.stone)), 0, 0.75, -0.1, inside);
  const crank = new THREE.Group();
  crank.position.set(0, 1.3, 0.15);
  inside.add(crank);
  const disc = mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.1, 10), flat(kit.toon("#9A9AAA")), 0, 0, 0, crank);
  disc.rotation.x = Math.PI / 2;
  const pin = mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 6), flat(kit.toon("#2A2B36")), 0.18, 0, 0.08, crank);
  pin.rotation.x = Math.PI / 2;
  // horizontal bore to the right of the crank
  const bore = 0.26, crankR = 0.18, rodL = 0.5;
  const block = mesh(new THREE.CylinderGeometry(bore, bore, 0.56, 10, 1, true), flat(kit.toon("#B8B8C4")), 0, 1.3, 0.15, inside);
  block.rotation.z = Math.PI / 2;
  const piston = mesh(new THREE.CylinderGeometry(bore * 0.92, bore * 0.92, 0.22, 10), flat(kit.toon(PALETTE.white)), 0, 1.3, 0.15, inside);
  piston.rotation.z = Math.PI / 2;
  const rod = mesh(new THREE.BoxGeometry(rodL, 0.08, 0.06), flat(kit.toon("#6A6D80")), 0, 1.3, 0.24, inside);
  const blockX = 0.67;
  block.position.x = blockX;
  kit.ink(group);

  const anchor = (name, p) => { const o = new THREE.Object3D(); o.name = name; o.position.set(...p); group.add(o); return o; };
  const anchors = {
    inlet: anchor("inlet", [-1.0, 2.3, 0]),
    outlet: anchor("outlet", [1.0, 2.3, 0]),
    piston: anchor("piston", [blockX, 1.3, 0.15]),
    motor: anchor("motor", [0, 0.75, 0.5]),
    shell: anchor("shell", [0, 2.0, 0.6]),
  };
  function path(name = "in") {
    const list = name === "in" ? inPts : name === "out" ? outPts : null;
    if (!list) throw new Error("compressor: no path " + JSON.stringify(name) + "; use in or out");
    group.updateWorldMatrix(true, false);
    return list.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const cool = new THREE.Color("#C88A5A"), hot = new THREE.Color(hotColor), shell = new THREE.Color(shellColor), warm = new THREE.Color("#7A3E34");
  // state: rate in strokes per second (0 stops it), angle in radians overrides rate, heat 0..1 reddens the discharge
  // pipe and warms the shell. All set by the caller from t.
  function update(t, state = {}) {
    const a = state.angle ?? 2 * Math.PI * (state.rate ?? rate) * t;
    crank.rotation.z = a;
    const px = crankR * Math.cos(a), py = crankR * Math.sin(a);
    const slide = px + Math.sqrt(rodL * rodL - py * py);
    piston.position.x = slide + 0.11;
    rod.position.set((px + slide) / 2, 1.3 + py / 2, 0.24);
    rod.rotation.z = Math.atan2(-py, slide - px);
    const h = kit.clamp01(state.heat ?? 0);
    outMat.color.copy(cool).lerp(hot, h);
    shellMat.color.copy(shell).lerp(warm, h * 0.6);
  }
  update(0);
  return { group, hero: [piston], anchors, path, update };
}
