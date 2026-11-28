// airplane-cabin: simplified toon3d airplane cabin cutaway with curved fuselage wall,
// oval window, passenger seat, wing and spinning turbine engine outside. Origin at floor centre.
export function airplaneCabin(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    wallColor = "#EDEAE0",
    seatColor = "#3B5998",
    wingColor = "#C9CDD6",
    engineSpeed = 1,
    hum = 1,
  } = opts;

  const group = new THREE.Group();
  group.name = "airplane-cabin";
  const flat = m => { m.flatShading = true; return m; };

  const wallMat = flat(kit.toon(wallColor));
  const trimMat = flat(kit.toon("#8A90A2"));
  const seatMat = flat(kit.toon(seatColor));
  const wingMat = flat(kit.toon(wingColor));
  const engMat = flat(kit.toon("#474B5E"));
  const winMat = kit.windowMaterial("#A9D0E6", PALETTE.window);
  const humMat = flat(kit.toon(PALETTE.accent));

  // Cabin floor (light ground so dark corner watermark stays high-contrast)
  const floor = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.2, 5.0), flat(kit.toon(PALETTE.ground)));
  floor.position.set(0, 0.1, 0);
  group.add(floor);

  // Back fuselage wall with oval window frames (left and right of window)
  const backWallL = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.6, 0.24), wallMat);
  backWallL.position.set(-2.1, 1.9, -2.0);
  const backWallR = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.6, 0.24), wallMat);
  backWallR.position.set(2.1, 1.9, -2.0);
  const backWallB = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.35, 0.24), wallMat);
  backWallB.position.set(0, 0.78, -2.0);
  const backWallT = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.0, 0.24), wallMat);
  backWallT.position.set(0, 3.2, -2.0);
  group.add(backWallL, backWallR, backWallB, backWallT);

  // Oval window frame + glass pane
  const winFrame = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.11, 8, 18), trimMat);
  winFrame.scale.set(0.85, 1.15, 1.0);
  winFrame.position.set(0, 2.08, -1.94);
  const winGlass = new THREE.Mesh(new THREE.CircleGeometry(0.68, 16), winMat);
  winGlass.scale.set(0.85, 1.15, 1.0);
  winGlass.position.set(0, 2.08, -2.02);
  group.add(winFrame, winGlass);

  // Overhead bin
  const bin = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.75, 1.1), wallMat);
  bin.position.set(0, 3.55, -1.55);
  group.add(bin);

  // Passenger seat in foreground-left
  const seatGroup = new THREE.Group();
  seatGroup.position.set(-1.35, 0.2, 0.35);
  group.add(seatGroup);
  const cushion = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.34, 1.35), seatMat);
  cushion.position.set(0, 0.75, 0);
  const backrest = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.75, 0.32), seatMat);
  backrest.position.set(0, 1.65, -0.52);
  backrest.rotation.x = -0.1;
  const headrest = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.42, 0.36), flat(kit.toon("#E2E4EC")));
  headrest.position.set(0, 2.38, -0.56);
  const leg = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.6, 0.9), trimMat);
  leg.position.set(0, 0.3, 0);
  seatGroup.add(cushion, backrest, headrest, leg);

  // Outside wing + turbine engine visible through window (-z)
  const wing = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.14, 1.8), wingMat);
  wing.position.set(0.6, 1.55, -3.5);
  wing.rotation.y = -0.18;
  group.add(wing);

  const nacelle = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.38, 1.1, 14), engMat);
  nacelle.rotation.z = Math.PI / 2;
  nacelle.position.set(-0.2, 1.85, -3.1);
  group.add(nacelle);

  const fan = new THREE.Group();
  fan.position.set(0.36, 1.85, -3.1);
  group.add(fan);
  for (let i = 0; i < 6; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.56, 0.12), trimMat);
    blade.rotation.x = (i / 6) * Math.PI * 2;
    fan.add(blade);
  }

  // Engine hum rings pulsing outside window
  const rings = [];
  for (let i = 0; i < 3; i++) {
    const r = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.04, 6, 18), humMat);
    r.position.set(0, 1.95, -2.5);
    group.add(r);
    rings.push(r);
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
    window: anchor("window", [0, 2.08, -1.9]),
    engine: anchor("engine", [-0.2, 1.85, -3.1]),
    seat: anchor("seat", [-1.35, 1.8, 0.35]),
    headphoneSpot: anchor("headphoneSpot", [1.05, 0.92, 0.4]),
  };

  function update(t, state = {}) {
    const spd = state.engineSpeed ?? engineSpeed;
    const h = kit.clamp01(state.hum ?? hum);
    fan.rotation.x = t * spd * 10;
    rings.forEach((r, i) => {
      r.visible = h > 0.02;
      if (!r.visible) return;
      const phase = (t * 1.4 + i / 3) % 1;
      r.scale.setScalar(0.7 + phase * 0.9);
      r.position.z = -2.7 + phase * 1.2;
    });
  }

  update(0);
  return { group, hero: [seatGroup, winFrame, nacelle], anchors, update };
}
