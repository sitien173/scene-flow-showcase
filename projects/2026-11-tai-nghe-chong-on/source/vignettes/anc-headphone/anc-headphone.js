// anc-headphone: toon3d over-ear ANC headphone with cutaway outer shell, exploded ear pad,
// internal PCB/mic/speaker mounts, and glowing ANC switch. Origin at the floor under centre; faces +z.
export function ancHeadphone(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    shellColor = "#3A3D4D",
    padColor = "#252732",
    innerColor = "#586075",
    accentColor = PALETTE.good,
    wireColor = PALETTE.highlight,
    explode = 0,
    cutaway = 0,
    ancOn = 0,
  } = opts;

  const group = new THREE.Group();
  group.name = "anc-headphone";
  const flat = m => { m.flatShading = true; return m; };

  const shellMat = flat(kit.toon(shellColor));
  const trimMat = flat(kit.toon("#6B7285"));
  const padMat = flat(kit.toon(padColor));
  const foamMat = flat(kit.toon("#C8C2B8"));
  const innerMat = flat(kit.toon(innerColor));
  const switchMat = flat(kit.toon("#55596A", { emissive: "#000000" }));
  const pcbMat = flat(kit.toon("#2C6E58"));
  const chipMat = flat(kit.toon("#222530"));
  const copperMat = flat(kit.toon("#D69E3E"));

  // Headband arch
  const bandPts = [];
  for (let i = 0; i <= 16; i++) {
    const a = Math.PI * (0.1 + 0.8 * (i / 16));
    bandPts.push(new THREE.Vector3(Math.cos(a) * 1.18, 2.05 + Math.sin(a) * 1.15, 0));
  }
  const bandCurve = new THREE.CatmullRomCurve3(bandPts);
  const band = new THREE.Mesh(new THREE.TubeGeometry(bandCurve, 24, 0.14, 8, false), shellMat);
  group.add(band);

  // Top headband cushion
  const topPadPts = bandPts.slice(4, 13);
  const topPadCurve = new THREE.CatmullRomCurve3(topPadPts);
  const topPad = new THREE.Mesh(new THREE.TubeGeometry(topPadCurve, 14, 0.18, 8, false), padMat);
  group.add(topPad);

  // Yoke arms
  for (const side of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.72, 8), trimMat);
    arm.position.set(side * 1.14, 1.92, 0);
    arm.rotation.z = side * 0.08;
    group.add(arm);
  }

  // Left earcup (solid closed)
  const leftCup = new THREE.Group();
  leftCup.position.set(-1.12, 1.25, 0);
  group.add(leftCup);
  const lShell = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.66, 0.42, 16), shellMat);
  lShell.rotation.z = Math.PI / 2;
  lShell.position.x = -0.14;
  const lCap = new THREE.Mesh(new THREE.SphereGeometry(0.62, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), shellMat);
  lCap.rotation.z = Math.PI / 2;
  lCap.position.x = -0.35;
  const lPad = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.19, 10, 18), padMat);
  lPad.rotation.y = Math.PI / 2;
  lPad.position.x = 0.14;
  leftCup.add(lShell, lCap, lPad);

  // Right earcup (cutaway + exploded pad capable)
  const rightCup = new THREE.Group();
  rightCup.position.set(1.12, 1.25, 0);
  group.add(rightCup);

  // Inner chamber (always visible when cutaway or pad explodes)
  const chamber = new THREE.Mesh(new THREE.CylinderGeometry(0.60, 0.60, 0.24, 16), innerMat);
  chamber.rotation.z = Math.PI / 2;
  chamber.position.x = 0.02;
  rightCup.add(chamber);

  // Internal speaker driver disc facing inward (-x)
  const driverCone = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.40, 0.12, 14), flat(kit.toon("#474B5E")));
  driverCone.rotation.z = Math.PI / 2;
  driverCone.position.x = -0.08;
  const driverCap = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 8), flat(kit.toon(accentColor)));
  driverCap.position.x = -0.14;
  rightCup.add(driverCone, driverCap);

  // Internal PCB + chip
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.62, 0.46), pcbMat);
  pcb.position.set(0.14, 0.02, 0);
  const chip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.22), chipMat);
  chip.position.set(0.18, 0.04, 0);
  rightCup.add(pcb, chip);

  // Outer mic port on rim
  const micPort = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.08, 10), copperMat);
  micPort.rotation.z = Math.PI / 2;
  micPort.position.set(0.32, 0.28, 0.34);
  rightCup.add(micPort);

  // Internal wire path (mic -> chip -> speaker)
  const wirePts = [
    [1.44, 1.53, 0.34],
    [1.36, 1.42, 0.18],
    [1.30, 1.29, 0.0],
    [1.18, 1.25, -0.05],
    [1.04, 1.25, 0.0],
  ];
  const wireCurve = new THREE.CatmullRomCurve3(wirePts.map(p => new THREE.Vector3(...p)));
  const wireMesh = new THREE.Mesh(new THREE.TubeGeometry(wireCurve, 16, 0.02, 6, false), flat(kit.toon(wireColor)));
  group.add(wireMesh);

  // Sliding cutaway outer shell (+x)
  const outerShell = new THREE.Group();
  rightCup.add(outerShell);
  const rShell = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.62, 0.32, 16), shellMat);
  rShell.rotation.z = Math.PI / 2;
  rShell.position.x = 0.26;
  const rCap = new THREE.Mesh(new THREE.SphereGeometry(0.62, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), shellMat);
  rCap.rotation.z = -Math.PI / 2;
  rCap.position.x = 0.41;
  const ancSwitch = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 0.10), switchMat);
  ancSwitch.position.set(0.38, -0.34, 0.36);
  outerShell.add(rShell, rCap, ancSwitch);

  // Exploding ear pad + inner foam ring (-x toward ear)
  const padGroup = new THREE.Group();
  rightCup.add(padGroup);
  const rFoam = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.14, 10, 18), foamMat);
  rFoam.rotation.y = Math.PI / 2;
  rFoam.position.x = -0.10;
  const rPad = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.19, 10, 18), padMat);
  rPad.rotation.y = Math.PI / 2;
  rPad.position.x = -0.16;
  padGroup.add(rFoam, rPad);

  kit.ink(group);

  const anchor = (name, p, parent = group) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    parent.add(o);
    return o;
  };
  const anchors = {
    cup: anchor("cup", [1.12, 1.25, 0]),
    pad: anchor("pad", [-0.16, 0.2, 0.35], padGroup),
    mic: anchor("mic", [1.48, 1.53, 0.34]),
    chip: anchor("chip", [1.32, 1.29, 0]),
    speaker: anchor("speaker", [1.0, 1.25, 0]),
    switch: anchor("switch", [0.42, -0.34, 0.36], outerShell),
    top: anchor("top", [0, 3.25, 0]),
  };

  function path(name = "wire") {
    if (name !== "wire") throw new Error("anc-headphone: unknown path " + name);
    group.updateWorldMatrix(true, false);
    return wirePts.map(p => new THREE.Vector3(...p).applyMatrix4(group.matrixWorld).toArray());
  }

  const offCol = new THREE.Color("#55596A");
  const onCol = new THREE.Color(accentColor);
  const dark = new THREE.Color("#000000");

  function update(t, state = {}) {
    const ex = kit.clamp01(state.explode ?? explode);
    const cw = kit.clamp01(state.cutaway ?? cutaway);
    const on = kit.clamp01(state.ancOn ?? ancOn);
    const pulse = state.pulse ?? 0;

    padGroup.position.x = -ex * 0.72;
    rFoam.position.x = -0.10 + ex * 0.22;
    outerShell.position.x = cw * 0.95;
    outerShell.position.y = cw * 0.25;
    outerShell.rotation.z = -cw * 0.22;

    switchMat.color.copy(offCol).lerp(onCol, on);
    switchMat.emissive.copy(dark).lerp(onCol, on * 0.7);
    driverCap.scale.setScalar(1 + pulse * 0.14 * Math.sin(t * 22));
  }

  update(0);
  return { group, hero: [rightCup, band], anchors, path, update };
}
