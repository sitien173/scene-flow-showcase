// screen-cursor: toon3d lab desktop monitor with switchable screen modes:
// cursorGrid (2D target tracking), emailTv (simulated email + TV activation),
// and handwritingText (90 cpm trajectory, >99% offline autocorrect sweep, 115 cpm comparison).
// Origin at base centre (y = 0); screen faces +z.
export function screenCursor(kit, opts = {}) {
  const { THREE } = kit;
  const {
    frameColor = "#2B2D38",
    screenMode = "cursorGrid",
    mode,
  } = opts;

  const initialMode = mode ?? screenMode;
  const group = new THREE.Group();
  group.name = "screen-cursor";

  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // 1. Desk monitor base, articulated stand & bezel chassis
  const frameMat = kit.toon(frameColor);
  const trimMat = kit.toon("#4868C8");
  const standGroup = new THREE.Group();
  standGroup.name = "stand";
  group.add(standGroup);

  box(0.86, 0.06, 0.56, frameMat, 0, 0.03, 0, standGroup);
  box(0.76, 0.025, 0.46, trimMat, 0, 0.065, 0, standGroup);
  box(0.18, 0.54, 0.12, frameMat, 0, 0.34, -0.10, standGroup);

  const monitorBody = new THREE.Group();
  monitorBody.name = "monitor";
  monitorBody.position.set(0, 1.18, 0);
  group.add(monitorBody);

  box(2.04, 1.32, 0.11, frameMat, 0, 0, 0, monitorBody);
  box(1.88, 1.14, 0.02, kit.toon("#141923"), 0, 0.02, 0.055, monitorBody);
  // Bottom chin indicator LED
  const ledMat = kit.toon("#E879F9", { emissive: "#E879F9" });
  ledMat.emissiveIntensity = 0.45;
  box(0.10, 0.022, 0.02, ledMat, 0, -0.60, 0.056, monitorBody);

  // 2. Pre-built CanvasTextures for each screen mode
  const texGrid = kit.canvasTexture(384, 240, (g, w, h) => {
    g.fillStyle = "#172030";
    g.fillRect(0, 0, w, h);
    g.strokeStyle = "#263650";
    g.lineWidth = 2;
    for (let x = 32; x < w; x += 32) {
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke();
    }
    for (let y = 30; y < h; y += 30) {
      g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke();
    }
    // 4 target pads on the cursor task grid
    const pads = [[86, 66], [298, 66], [86, 174], [298, 174]];
    for (const [px, py] of pads) {
      g.beginPath(); g.arc(px, py, 24, 0, Math.PI * 2);
      g.fillStyle = "#24354F"; g.fill();
      g.lineWidth = 4; g.strokeStyle = "#00B4D8"; g.stroke();
    }
    // Ideal center benchmark line
    g.strokeStyle = "#476082";
    g.setLineDash([8, 6]);
    g.beginPath(); g.moveTo(86, 174); g.lineTo(298, 66); g.stroke();
    g.setLineDash([]);
  });

  const texEmail = kit.canvasTexture(384, 240, (g, w, h) => {
    g.fillStyle = "#1A2234";
    g.fillRect(0, 0, w, h);
    // Top window bar
    g.fillStyle = "#28334A";
    g.fillRect(0, 0, w, 30);
    g.fillStyle = "#E879F9";
    g.fillRect(14, 9, 14, 12);
    // Left Email card
    g.fillStyle = "#FAFCFB";
    g.fillRect(18, 46, 178, 172);
    g.fillStyle = "#4868C8";
    g.fillRect(18, 46, 178, 32);
    g.fillStyle = "#FAFCFB";
    g.font = "bold 16px sans-serif";
    g.fillText("EMAIL", 30, 68);
    g.fillStyle = "#CBD2DF";
    g.fillRect(30, 94, 142, 12);
    g.fillRect(30, 116, 120, 12);
    g.fillRect(30, 138, 152, 12);
    // Action button
    g.fillStyle = "#E879F9";
    g.fillRect(30, 168, 92, 32);
    // Right TV control tile
    g.fillStyle = "#253147";
    g.fillRect(212, 46, 154, 172);
    g.fillStyle = "#121824";
    g.fillRect(228, 64, 122, 84);
    g.fillStyle = "#00B4D8";
    g.fillRect(244, 82, 90, 48);
    g.fillStyle = "#FAFCFB";
    g.font = "bold 18px sans-serif";
    g.fillText("TV", 278, 113);
    g.fillStyle = "#F59E0B";
    g.fillRect(228, 164, 54, 34);
    g.fillStyle = "#2D884E";
    g.fillRect(296, 164, 54, 34);
  });

  const texWrite = kit.canvasTexture(384, 240, (g, w, h) => {
    g.fillStyle = "#161D2C";
    g.fillRect(0, 0, w, h);
    // Handwriting pad on left
    g.fillStyle = "#212B40";
    g.fillRect(16, 22, 160, 140);
    g.strokeStyle = "#E879F9";
    g.lineWidth = 6;
    g.beginPath();
    g.moveTo(38, 120);
    g.bezierCurveTo(60, 50, 96, 50, 108, 112);
    g.bezierCurveTo(120, 145, 145, 68, 158, 92);
    g.stroke();
    // Typed output box on right
    g.fillStyle = "#FAFCFB";
    g.fillRect(190, 22, 178, 140);
    g.fillStyle = "#18191E";
    g.font = "bold 26px sans-serif";
    g.fillText("BCI 90", 206, 86);
    g.fillStyle = "#E879F9";
    g.fillRect(206, 106, 134, 12);
    // Speed comparison footer
    g.fillStyle = "#243047";
    g.fillRect(16, 178, 352, 42);
    g.fillStyle = "#F59E0B";
    g.fillRect(28, 191, 180, 16);
    g.fillStyle = "#2D884E";
    g.fillRect(220, 191, 136, 16);
  });

  const makeScreenPlane = (tex) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(1.84, 1.10),
      new THREE.MeshBasicMaterial({ map: tex })
    );
    m.position.set(0, 0.02, 0.068);
    m.userData.noInk = true;
    monitorBody.add(m);
    return m;
  };
  const planeGrid = makeScreenPlane(texGrid);
  const planeEmail = makeScreenPlane(texEmail);
  const planeWrite = makeScreenPlane(texWrite);

  // 3. 3D interactive target highlight, hit/miss disc & autocorrect sweep bar
  const targetMat = new THREE.MeshBasicMaterial({ color: "#F59E0B", transparent: true, opacity: 0.9 });
  const targetDisc = new THREE.Mesh(new THREE.RingGeometry(0.09, 0.135, 20), targetMat);
  targetDisc.position.set(0.46, 0.24, 0.074);
  targetDisc.userData.noInk = true;
  monitorBody.add(targetDisc);

  const sweepMat = new THREE.MeshBasicMaterial({ color: "#2D884E", transparent: true, opacity: 0.72 });
  const sweepBar = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.62), sweepMat);
  sweepBar.position.set(0.35, 0.10, 0.075);
  sweepBar.userData.noInk = true;
  monitorBody.add(sweepBar);

  // Compare reference bar (115 cpm)
  const compareGroup = new THREE.Group();
  compareGroup.position.set(0, -0.36, 0.076);
  monitorBody.add(compareGroup);
  const cmpMat = new THREE.MeshBasicMaterial({ color: "#FCD53E" });
  const cmpBar = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.08), cmpMat);
  cmpBar.userData.noInk = true;
  compareGroup.add(cmpBar);

  // 4. Oversized 3D pointer cursor + #E879F9 command halo
  const cursorGroup = new THREE.Group();
  cursorGroup.name = "cursor";
  cursorGroup.position.set(0, 0.04, 0.092);
  monitorBody.add(cursorGroup);

  const arrowShape = new THREE.Shape();
  arrowShape.moveTo(0, 0);
  arrowShape.lineTo(0, -0.22);
  arrowShape.lineTo(0.06, -0.17);
  arrowShape.lineTo(0.11, -0.26);
  arrowShape.lineTo(0.145, -0.24);
  arrowShape.lineTo(0.095, -0.15);
  arrowShape.lineTo(0.17, -0.14);
  arrowShape.closePath();

  const arrowGeo = new THREE.ExtrudeGeometry(arrowShape, { depth: 0.025, bevelEnabled: false });
  const cursorArrow = new THREE.Mesh(arrowGeo, kit.toon("#FAFCFB"));
  cursorGroup.add(cursorArrow);

  const haloMat = new THREE.MeshBasicMaterial({
    color: "#E879F9",
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });
  const cursorHalo = new THREE.Mesh(new THREE.RingGeometry(0.045, 0.075, 18), haloMat);
  cursorHalo.position.set(0, 0, -0.005);
  cursorHalo.userData.noInk = true;
  cursorGroup.add(cursorHalo);

  kit.ink(group);

  const anchor = (name, p, parent = group) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    parent.add(o);
    return o;
  };
  const anchors = {
    body: anchor("body", [0, 1.05, 0]),
    screen: anchor("screen", [0, 1.20, 0.08]),
    cursor: anchor("cursor", [0, 0, 0.03], cursorGroup),
    target: anchor("target", [0.46, 0.24, 0.09], monitorBody),
    tvTile: anchor("tvTile", [0.42, 0.04, 0.09], monitorBody),
    textLine: anchor("textLine", [0.36, 0.14, 0.09], monitorBody),
  };

  const colTargetIdle = new THREE.Color("#F59E0B");
  const colGood = new THREE.Color("#2D884E");
  const colMiss = new THREE.Color("#DD3428");
  const colCmd = new THREE.Color("#E879F9");

  function update(t, state = {}) {
    const m = state.mode ?? state.screenMode ?? initialMode;
    planeGrid.visible = m === "cursorGrid";
    planeEmail.visible = m === "emailTv";
    planeWrite.visible = m === "handwritingText";

    // Deterministic pointer position unless caller provides cursorX / cursorY
    let cx = state.cursorX;
    let cy = state.cursorY;
    if (cx === undefined || cy === undefined) {
      if (m === "emailTv") {
        const phase = Math.sin(t * 1.8);
        cx = phase > 0 ? 0.42 : -0.34;
        cy = phase > 0 ? 0.05 : -0.18;
      } else if (m === "handwritingText") {
        cx = -0.45 + 0.28 * Math.sin(t * 2.8);
        cy = 0.08 + 0.18 * Math.cos(t * 5.6);
      } else {
        cx = 0.46 * Math.sin(t * 1.9);
        cy = 0.24 * Math.sin(t * 1.9 + 0.6);
      }
    }
    const click = kit.clamp01(state.click ?? (Math.sin(t * 3.8) > 0.85 ? 1 : 0));
    cursorGroup.position.set(cx, cy, 0.092 - click * 0.015);
    cursorGroup.scale.setScalar(1 - click * 0.14);
    haloMat.opacity = 0.45 + 0.45 * (0.5 + 0.5 * Math.sin(t * 5.0));
    cursorHalo.scale.setScalar(1 + click * 0.55);

    // Target hit (#2D884E) or miss (#DD3428) highlight
    const hit = kit.clamp01(state.hit ?? (m === "cursorGrid" && Math.sin(t * 1.9) > 0.72 ? 1 : 0));
    const miss = kit.clamp01(state.miss ?? 0);
    targetDisc.visible = m === "cursorGrid" || m === "emailTv";
    if (m === "emailTv") {
      targetDisc.position.set(0.42, 0.05, 0.074);
    } else {
      targetDisc.position.set(0.46, 0.24, 0.074);
    }
    targetMat.color.copy(colTargetIdle);
    if (hit > 0.05) targetMat.color.lerp(colGood, hit);
    if (miss > 0.05) targetMat.color.lerp(colMiss, miss);
    targetDisc.scale.setScalar(1 + 0.18 * Math.max(hit, miss));

    // Handwriting autocorrect sweep & 115 cpm compare bar
    const auto = kit.clamp01(state.autocorrect ?? (m === "handwritingText" ? 0.8 : 0));
    sweepBar.visible = m === "handwritingText" && auto > 0.05;
    if (sweepBar.visible) {
      const sx = -0.05 + 0.82 * (((t * 0.65) % 1 + 1) % 1);
      sweepBar.position.set(sx, 0.14, 0.075);
      sweepMat.opacity = 0.55 * auto;
    }
    const showCmp = kit.clamp01(state.showCompare ?? (m === "handwritingText" ? 1 : 0));
    compareGroup.visible = m === "handwritingText" && showCmp > 0.05;

    ledMat.emissive.copy(hit > 0.2 ? colGood : colCmd);
  }

  update(0);
  return { group, hero: [monitorBody, standGroup], anchors, update };
}
