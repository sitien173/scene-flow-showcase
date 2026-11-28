// cafe-counter: toon3d cafe checkout counter set (tiled floor, back wall with menu board,
// counter with espresso machine, and an adjacent processor platform for payment-network).
// Origin at floor level (y = 0) at counter centre; customer side faces +z.
export function cafeCounter(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    width = 9.5,
    depth = 5.4,
    apron = 8,
    height = 4.2,
    wallColor = PALETTE.wall,
    counterColor = "#8B5E3C",
    topColor = "#F4EFE6",
  } = opts;

  const group = new THREE.Group();
  group.name = "cafe-counter";

  const flat = m => { m.flatShading = true; return m; };
  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  const back = -depth / 2;

  // Tiled cafe floor extending past +z so low cameras never see the floor edge
  const floorMap = kit.canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = "#F2EEE4";
    g.fillRect(0, 0, w, h);
    g.fillStyle = "#DFD8CA";
    g.fillRect(0, 0, w / 2, h / 2);
    g.fillRect(w / 2, h / 2, w / 2, h / 2);
  });
  floorMap.wrapS = floorMap.wrapT = THREE.RepeatWrapping;
  floorMap.repeat.set(width / 1.5, (depth + apron) / 1.5);
  box(width, 0.08, depth + apron, kit.toon("#FFFFFF", { map: floorMap }), 0, 0.04, apron / 2);

  // Back wall and left return wall
  box(width, height, 0.22, kit.toon(wallColor), 0, height / 2, back - 0.11);
  box(0.22, height, depth, kit.toon(PALETTE.pink), -width / 2 - 0.11, height / 2, 0);
  box(width + 0.2, 0.16, 0.06, kit.toon(PALETTE.white), 0, 0.16, back + 0.03);

  // Menu board on the back wall
  const menuTex = kit.canvasTexture(256, 160, (g, w, h) => {
    g.fillStyle = "#2E323D";
    g.fillRect(0, 0, w, h);
    g.fillStyle = "#FCD53E";
    g.fillRect(24, 24, 96, 18);
    g.fillStyle = "#FAFCFB";
    for (let i = 0; i < 4; i++) {
      g.fillRect(24, 58 + i * 22, 130 - i * 12, 10);
      g.fillRect(184, 58 + i * 22, 46, 10);
    }
  });
  box(2.6, 1.5, 0.08, kit.toon("#5B4332"), -0.8, 2.75, back + 0.05);
  box(2.38, 1.28, 0.04, kit.toon("#FFFFFF", { map: menuTex }), -0.8, 2.75, back + 0.09);

  // Warm window on the right side of the back wall
  const win = new THREE.Group();
  win.position.set(2.2, 2.65, back + 0.04);
  group.add(win);
  const frameMat = kit.toon(PALETTE.white);
  box(1.6, 0.08, 0.1, frameMat, 0, 0.55, 0, win);
  box(1.6, 0.08, 0.1, frameMat, 0, -0.55, 0, win);
  box(0.08, 1.1, 0.1, frameMat, -0.76, 0, 0, win);
  box(0.08, 1.1, 0.1, frameMat, 0.76, 0, 0, win);
  box(0.06, 1.1, 0.1, frameMat, 0, 0, 0, win);

  // Main checkout counter (top surface at y = 1.26)
  const cw = 4.6, ch = 1.12, cd = 1.5;
  box(cw - 0.16, 0.12, cd - 0.16, kit.toon("#3A3D4D"), 0, 0.14, 0.1);
  box(cw, ch - 0.12, cd, kit.toon(counterColor), 0, 0.2 + (ch - 0.12) / 2, 0.1);
  // Front vertical slats for tactile cafe detail
  for (let i = -3; i <= 3; i++) {
    box(0.12, ch - 0.24, 0.05, kit.toon("#A87752"), i * 0.58, 0.68, 0.1 + cd / 2 + 0.02);
  }
  const counterTop = box(cw + 0.24, 0.14, cd + 0.24, kit.toon(topColor), 0, 1.19, 0.1);

  // Stylized espresso machine on the left of the counter (supporting prop)
  const esp = new THREE.Group();
  esp.position.set(-1.55, 1.26, -0.08);
  group.add(esp);
  box(0.85, 0.78, 0.65, kit.toon("#D64B3A"), 0, 0.39, 0, esp);
  box(0.76, 0.12, 0.55, kit.toon("#8C93A6"), 0, 0.84, 0, esp);
  box(0.7, 0.24, 0.22, kit.toon("#3A3D4D"), 0, 0.44, 0.32, esp);
  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.12, 8), flat(kit.toon("#8C93A6")));
  nozzle.position.set(0, 0.28, 0.34);
  esp.add(nozzle);

  // Divider wall + processor pad off to the right for payment-network
  box(0.24, height, depth, kit.toon(PALETTE.wall), 4.85, height / 2, 0);

  kit.ink(group);

  // Window glass added after ink() with noInk
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.44, 1.02), kit.windowMaterial(PALETTE.glass, PALETTE.window));
  glass.position.z = -0.01;
  glass.userData.noInk = true;
  win.add(glass);

  const anchor = (name, x, y, z) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(x, y, z);
    group.add(o);
    return o;
  };
  const anchors = {
    counter: anchor("counter", 0, 1.26, 0.15),
    posSlot: anchor("posSlot", 0.35, 1.26, 0.22),
    coffeeSlot: anchor("coffeeSlot", -0.62, 1.26, 0.32),
    networkSlot: anchor("networkSlot", 8.8, 0.08, -0.6),
  };

  return { group, hero: [counterTop], anchors, update() {} };
}
