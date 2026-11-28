// kitchen: a toon kitchen shell (floor, back and left wall, window, tiled splash, counter, upper cabinets)
// with an empty slot for the fridge. Origin at floor level in the room centre; the open side faces +z.
export function kitchen(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const { width = 9, depth = 5, apron = 8, height = 4.2, slot = -1.6, slotWidth = 1.8, wallColor = PALETTE.wall,
    sideColor = PALETTE.pink, cabinet = PALETTE.white, top = "#B8B8C4" } = opts;
  const group = new THREE.Group();
  group.name = "kitchen";
  const flat = m => { m.flatShading = true; return m; };
  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };
  const back = -depth / 2;
  const left = -width / 2;

  // floor tiles and splash tiles: flat painted grids
  const floorMap = kit.canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = "#F2EEE4"; g.fillRect(0, 0, w, h);
    g.fillStyle = "#D9D3C6"; g.fillRect(0, 0, w / 2, h / 2); g.fillRect(w / 2, h / 2, w / 2, h / 2);
  });
  floorMap.wrapS = floorMap.wrapT = THREE.RepeatWrapping;
  // the floor runs apron units past the open side so a low camera in front never sees its edge or the stage beyond
  floorMap.repeat.set(width / 1.6, (depth + apron) / 1.6);
  box(width, 0.08, depth + apron, kit.toon("#FFFFFF", { map: floorMap }), 0, 0.04, apron / 2);

  const tileMap = kit.canvasTexture(128, 128, (g, w, h) => {
    g.fillStyle = "#B9D6DE"; g.fillRect(0, 0, w, h);
    g.fillStyle = "#E4F0F0"; g.fillRect(4, 4, w - 8, h - 8);
  });
  tileMap.wrapS = tileMap.wrapT = THREE.RepeatWrapping;

  // walls
  box(width, height, 0.2, kit.toon(wallColor), 0, height / 2, back - 0.1);
  box(0.2, height, depth, kit.toon(sideColor), left - 0.1, height / 2, 0);
  box(width + 0.2, 0.16, 0.06, kit.toon(PALETTE.white), -0.1, 0.16, back + 0.03);

  // counter right of the slot: base cabinets, top, splash, upper cabinets, sink
  const c0 = slot + slotWidth / 2 + 0.05;
  const c1 = width / 2 - 0.2;
  const cw = c1 - c0;
  const cx = (c0 + c1) / 2;
  const cd = 1.2;
  const doors = Math.max(1, Math.round(cw / 1.1));
  for (let i = 0; i < doors; i++) {
    const dw = cw / doors;
    const x = c0 + dw * (i + 0.5);
    box(dw - 0.06, 1.25, cd - 0.05, kit.toon(cabinet), x, 0.78, back + cd / 2);
    box(0.08, 0.36, 0.08, kit.toon(PALETTE.stone), x + dw / 2 - 0.22, 1.1, back + cd + 0.01);
  }
  box(cw, 0.14, cd, kit.toon("#3F4152"), cx, 0.08, back + cd / 2 - 0.06);
  const counterTop = box(cw + 0.1, 0.14, cd + 0.08, kit.toon(top), cx, 1.47, back + cd / 2 + 0.02);
  const splashMap = tileMap.clone();
  splashMap.needsUpdate = true;
  splashMap.repeat.set(cw / 0.42, 1.2 / 0.42);
  box(cw, 1.2, 0.04, kit.toon("#FFFFFF", { map: splashMap }), cx, 2.14, back + 0.02);
  box(cw, 0.9, 0.7, kit.toon(cabinet), cx, height - 0.75, back + 0.35);
  const sinkX = cx + cw * 0.22;
  box(0.9, 0.04, 0.6, kit.toon("#8C93A6"), sinkX, 1.55, back + cd / 2);
  const tap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 6), flat(kit.toon(PALETTE.stone)));
  tap.position.set(sinkX, 1.8, back + 0.25);
  group.add(tap);
  box(0.06, 0.06, 0.3, kit.toon(PALETTE.stone), sinkX, 2.03, back + 0.38);

  // window above the counter: white frame, four panes, sill with a plant
  const win = new THREE.Group();
  win.position.set(cx - cw * 0.18, 2.6, back + 0.02);
  group.add(win);
  const ww = 1.6, wh = 1.1, bar = 0.08;
  const frame = kit.toon(PALETTE.white);
  box(ww + bar, bar, 0.1, frame, 0, wh / 2, 0, win);
  box(ww + bar, bar, 0.1, frame, 0, -wh / 2, 0, win);
  box(bar, wh, 0.1, frame, -ww / 2, 0, 0, win);
  box(bar, wh, 0.1, frame, ww / 2, 0, 0, win);
  box(bar * 0.7, wh, 0.1, frame, 0, 0, 0, win);
  box(ww, bar * 0.7, 0.1, frame, 0, 0, 0, win);
  box(ww + 0.3, 0.07, 0.24, frame, 0, -wh / 2 - 0.06, 0.08, win);
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.1, 0.22, 7), flat(kit.toon("#D9805A")));
  pot.position.set(0.5, -wh / 2 + 0.08, 0.1);
  const leaves = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 0), flat(kit.toon(PALETTE.tree)));
  leaves.position.set(0, 0.24, 0);
  pot.add(leaves);
  win.add(pot);
  kit.ink(group);
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(ww, wh), kit.windowMaterial(PALETTE.glass, PALETTE.window));
  glass.position.z = -0.01;
  glass.userData.noInk = true;
  win.add(glass);

  // anchors (Object3D, so callouts follow the group)
  const anchor = (name, x, y, z) => { const o = new THREE.Object3D(); o.name = name; o.position.set(x, y, z); group.add(o); return o; };
  const anchors = {
    slot: anchor("slot", slot, 0.08, back + 0.75),
    window: anchor("window", win.position.x, win.position.y, back + 0.1),
    counter: anchor("counter", cx - cw * 0.25, 1.55, back + cd / 2),
    sink: anchor("sink", sinkX, 1.6, back + cd / 2),
  };
  return { group, hero: [counterTop], anchors, update() {} };
}
