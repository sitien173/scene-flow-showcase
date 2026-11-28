// food: one toon food item. kind: "milk" (carton), "apple", "bowl" (soup), "cheese" (wedge).
// Optional heat wisps rise above it while it is still warm. Origin at the bottom centre of the item.
export function food(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const { kind = "apple", wisps = true, warm = 0, wispColor = "#F08A4B" } = opts;
  const group = new THREE.Group();
  group.name = "food-" + kind;
  const flat = m => { m.flatShading = true; return m; };
  const mesh = (geometry, material, x, y, z, parent = group) => {
    const m = new THREE.Mesh(geometry, material);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };
  let top = 0.5;
  if (kind === "milk") {
    const label = kit.canvasTexture(64, 128, (g, w, h) => {
      g.fillStyle = "#FFFFFF"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#4868C8"; g.fillRect(0, h * 0.45, w, h * 0.3);
    });
    mesh(new THREE.BoxGeometry(0.34, 0.62, 0.34), kit.toon("#FFFFFF", { map: label }), 0, 0.31, 0);
    const gable = new THREE.Shape([new THREE.Vector2(-0.17, 0), new THREE.Vector2(0.17, 0), new THREE.Vector2(0, 0.2)]);
    const roof = new THREE.ExtrudeGeometry(gable, { depth: 0.34, bevelEnabled: false });
    roof.translate(0, 0, -0.17);
    roof.rotateY(Math.PI / 2);
    mesh(roof, flat(kit.toon("#FFFFFF")), 0, 0.62, 0);
    mesh(new THREE.BoxGeometry(0.04, 0.1, 0.34), kit.toon("#FFFFFF"), 0, 0.84, 0);
    top = 0.9;
  } else if (kind === "apple") {
    const body = mesh(new THREE.IcosahedronGeometry(0.24, 1), flat(kit.toon("#D84A3A")), 0, 0.23, 0);
    body.scale.set(1, 0.9, 1);
    mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.14, 5), flat(kit.toon("#6A4A30")), 0, 0.48, 0);
    const leaf = mesh(new THREE.IcosahedronGeometry(0.07, 0), flat(kit.toon(PALETTE.treeDark)), 0.07, 0.5, 0);
    leaf.scale.set(1.4, 0.4, 0.8);
    top = 0.55;
  } else if (kind === "bowl") {
    const shell = new THREE.SphereGeometry(0.34, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const bowl = flat(kit.toon("#F2EEE4"));
    bowl.side = THREE.DoubleSide;
    mesh(shell, bowl, 0, 0.34, 0);
    mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.02, 12), flat(kit.toon("#E8A048")), 0, 0.3, 0);
    mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.05, 10), flat(kit.toon("#F2EEE4")), 0, 0.02, 0);
    top = 0.42;
  } else if (kind === "cheese") {
    mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.26, 3, 1, false, 0, Math.PI / 3), flat(kit.toon(PALETTE.highlight)), 0, 0.13, 0);
    const holes = flat(kit.toon("#E2B830"));
    mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.02, 6), holes, 0.1, 0.27, 0.16);
    top = 0.32;
  } else {
    throw new Error("food: unknown kind " + JSON.stringify(kind) + "; use milk, apple, bowl, cheese");
  }
  kit.ink(group);

  // heat wisps: three S-shaped strokes, no ink, scaled by warm
  const wispGroup = new THREE.Group();
  wispGroup.position.y = top + 0.05;
  group.add(wispGroup);
  const wispMat = kit.toon(wispColor);
  const wispList = [-0.12, 0, 0.12].map((x, i) => {
    const curve = new THREE.CatmullRomCurve3([0, 1, 2, 3, 4].map(k => new THREE.Vector3(0.05 * Math.sin(k * 1.6 + i), k * 0.08, 0)));
    const m = mesh(new THREE.TubeGeometry(curve, 16, 0.022, 5, false), wispMat, x, 0, 0, wispGroup);
    m.userData.noInk = true;
    return m;
  });
  wispGroup.visible = wisps;

  const anchor = new THREE.Object3D();
  anchor.name = "top";
  anchor.position.y = top;
  group.add(anchor);

  // state: warm 0..1 grows the wisps (0 hides them). The wisps rise and sway as a function of t only.
  function update(t, state = {}) {
    const w = kit.clamp01(state.warm ?? warm);
    wispGroup.visible = wisps && w > 0.01;
    wispList.forEach((m, i) => {
      const phase = (t * 0.8 + i / 3) % 1;
      m.position.y = phase * 0.12;
      m.scale.set(w, w * (0.6 + 0.4 * Math.sin(Math.PI * phase)), w);
    });
  }
  update(0);
  return { group, hero: [group], anchors: { top: anchor }, update };
}
