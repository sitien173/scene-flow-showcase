// fridge: a toon fridge with a door that opens, shelves, an inner light, the evaporator coil inside at the back,
// the condenser coil and compressor outside at the back, and one refrigerant loop that beads can follow.
// Origin at the floor under the cabinet centre; the door faces +z and hinges on the left (-x) edge.
export function fridge(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const { width = 1.6, height = 3.4, depth = 1.3, color = PALETTE.white, liner = "#EEF3F2", handle = PALETTE.stone,
    coldColor = "#7FC4E8", hotColor = "#F08A4B", pipe = "#5B5E70", open = 0 } = opts;
  const group = new THREE.Group();
  group.name = "fridge";
  const flat = m => { m.flatShading = true; return m; };
  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };
  const W = width, H = height, D = depth, s = 0.08, foot = 0.12;
  const zf = D / 2, zb = -D / 2;

  // cabinet: an open-front shell so the inside shows when the door opens
  const shell = kit.toon(color);
  box(W, H - foot, s, shell, 0, foot + (H - foot) / 2, zb + s / 2);
  box(s, H - foot, D, shell, -W / 2 + s / 2, foot + (H - foot) / 2, 0);
  box(s, H - foot, D, shell, W / 2 - s / 2, foot + (H - foot) / 2, 0);
  box(W, s, D, shell, 0, H - s / 2, 0);
  box(W, s, D, shell, 0, foot + s / 2, 0);
  box(W - 0.1, foot, D - 0.12, kit.toon("#3F4152"), 0, foot / 2, 0);
  // liner glows a little while the door is open
  const linerMat = kit.toon(liner, { emissive: "#000000" });
  box(W - 2 * s, H - foot - 2 * s, 0.02, linerMat, 0, foot + (H - foot) / 2, zb + s + 0.01);
  const shelfMat = kit.toon("#CFE6EA", { emissive: "#000000" });
  const shelves = [];
  for (const y of [0.95, 1.75, 2.45]) shelves.push(box(W - 2 * s - 0.02, 0.04, D - s - 0.4, shelfMat, 0, y, -0.1));
  box(W - 2 * s - 0.04, 0.42, D - s - 0.3, kit.toon("#D8ECEF"), 0, foot + s + 0.22, -0.04);
  const bulb = box(0.3, 0.08, 0.14, kit.toon("#FFF6C8", { emissive: "#000000" }), 0, H - s - 0.05, zb + 0.35);

  // door: pivot on the hinge edge
  const hinge = new THREE.Group();
  hinge.position.set(-W / 2, foot, zf);
  group.add(hinge);
  const doorH = H - foot - 0.02;
  box(W, doorH, 0.12, kit.toon(color), W / 2, doorH / 2, 0.06, hinge);
  box(0.08, 1.1, 0.1, kit.toon(handle), W - 0.16, doorH * 0.6, 0.17, hinge);
  for (const y of [0.7, 1.5, 2.3]) box(W - 0.3, 0.26, 0.2, kit.toon("#D8ECEF"), W / 2, y, -0.12, hinge);

  // refrigerant loop, local points. evaporator inside on the back liner, condenser outside on the back.
  const ze = zb + s + 0.1, zc = zb - 0.12, zs = zb - 0.26, zk = zb - 0.42;
  const serp = (x0, x1, ys, z) => ys.flatMap((y, i) => (i % 2 ? [[x1, y, z], [x0, y, z]] : [[x0, y, z], [x1, y, z]]));
  const cx = W / 2 - 0.24;
  const comp = [0.3, 0.32, zk];
  const segments = {
    discharge: [[comp[0], 0.62, zk], [0.62, 0.9, zc - 0.04], [0.66, 3.1, zc]],
    condenser: serp(0.6, -0.6, [3.1, 2.85, 2.6, 2.35, 2.1, 1.85, 1.6, 1.35, 1.1], zc),
    capillary: [[-0.66, 1.0, zc], [-0.66, 0.5, zc], [-0.66, 0.5, ze], [-0.62, 2.25, ze]],
    evaporator: serp(-0.55, 0.55, [2.4, 2.7, 3.0], ze),
    suction: [[0.62, 3.0, ze], [0.66, 3.15, zs], [0.66, 0.8, zs], [comp[0] + 0.2, 0.55, zk]],
  };
  const order = ["discharge", "condenser", "capillary", "evaporator", "suction"];
  const loopLocal = order.flatMap(k => segments[k]);
  const tube = (points, material, r = 0.035, closed = false) => {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), closed, "catmullrom", 0.2);
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, points.length * 8, r, 6, closed), material);
    group.add(mesh);
    return mesh;
  };
  const coldMat = kit.toon(coldColor);
  const hotMat = kit.toon(pipe);
  const pipeMat = kit.toon(pipe);
  const tubes = {
    discharge: tube(segments.discharge, hotMat),
    condenser: tube(segments.condenser, hotMat, 0.045),
    capillary: tube(segments.capillary, pipeMat, 0.022),
    evaporator: tube(segments.evaporator, coldMat, 0.05),
    suction: tube(segments.suction, pipeMat),
  };
  // condenser wires and compressor
  for (const x of [-0.45, -0.15, 0.15, 0.45]) box(0.025, 2.2, 0.025, kit.toon(pipe), x, 2.1, zc - 0.05);
  const compressor = new THREE.Group();
  compressor.position.set(comp[0], 0, zk);
  group.add(compressor);
  const domeMat = kit.toon("#3A3B4A");
  const can = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.34, 10), flat(domeMat));
  can.position.y = 0.3;
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 5, 0, Math.PI * 2, 0, Math.PI / 2), flat(domeMat));
  cap.position.y = 0.47;
  compressor.add(can, cap);
  box(0.6, 0.06, 0.4, kit.toon(PALETTE.stone), 0, 0.12, 0, compressor);
  kit.ink(group);

  const anchor = (name, p) => { const o = new THREE.Object3D(); o.name = name; o.position.set(...p); group.add(o); return o; };
  const anchors = {
    door: anchor("door", [W / 2 - 0.2, foot + doorH * 0.6, zf + 0.2]),
    inside: anchor("inside", [0, 1.75, 0]),
    shelf: anchor("shelf", [0, 1.8, 0.1]),
    light: anchor("light", [0, H - s - 0.1, zb + 0.35]),
    evaporator: anchor("evaporator", [0, 2.7, ze]),
    condenser: anchor("condenser", [0, 2.1, zc - 0.05]),
    compressor: anchor("compressor", [comp[0], 0.6, zk]),
    capillary: anchor("capillary", [-0.66, 1.2, ze]),
    suction: anchor("suction", [0.66, 1.9, zs]),
    back: anchor("back", [0, 1.7, zb - 0.05]),
  };

  // World points [x, y, z] of one segment or the whole closed loop, for kit.beads (pass closed: true for "loop").
  function path(name = "loop") {
    const list = name === "loop" ? loopLocal : segments[name];
    if (!list) throw new Error("fridge: no path " + JSON.stringify(name) + "; use loop, " + order.join(", "));
    group.updateWorldMatrix(true, false);
    return list.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const cold = new THREE.Color(coldColor), hot = new THREE.Color(hotColor), grey = new THREE.Color(pipe), mix = new THREE.Color();
  const white = new THREE.Color("#FFFFFF"), dark = new THREE.Color("#000000"), glow = new THREE.Color("#FFF6C8"), wash = new THREE.Color("#6A6A60");
  // state: open 0..1 door angle (0 shut, 1 about 110 degrees), light 0..1 inner light (defaults to the door),
  // heat 0..1 warms the condenser and discharge line, frost 0..1 whitens the evaporator. All set by the caller from t.
  function update(t, state = {}) {
    const o = kit.clamp01(state.open ?? open);
    hinge.rotation.y = -o * 1.92;
    const l = kit.clamp01(state.light ?? (o > 0.02 ? 1 : 0));
    bulb.material.emissive.copy(dark).lerp(glow, l);
    linerMat.emissive.copy(dark).lerp(wash, l);
    shelfMat.emissive.copy(dark).lerp(wash, l);
    hotMat.color.copy(mix.copy(grey).lerp(hot, kit.clamp01(state.heat ?? 0)));
    coldMat.color.copy(mix.copy(cold).lerp(white, 0.7 * kit.clamp01(state.frost ?? 0)));
  }
  update(0);
  return { group, hero: [hinge], anchors, path, segments: order, update };
}
