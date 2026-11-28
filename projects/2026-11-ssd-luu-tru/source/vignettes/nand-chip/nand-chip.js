// nand-chip: toon3d 3D NAND flash memory package with cutaway lid exposing a silicon die
// organized into 4 Blocks, each with 4 Pages of 4 Memory Cells (#F59E0B stored bit state),
// block-level erase frames (#E879F9), and per-block wear meters (#DD3428 / #2D884E).
// Origin at base centre (y = 0); front edge faces +z.
export function nandChip(kit, opts = {}) {
  const { THREE } = kit;
  const {
    pkgColor = "#262936",
    dieColor = "#3C4459",
    mode = "page_highlight",
  } = opts;

  const group = new THREE.Group();
  group.name = "nand-chip";

  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  const pkgMat = kit.toon(pkgColor);
  const pinMat = kit.toon("#C8CCD4");
  const dieMat = kit.toon(dieColor);
  const padMat = kit.toon("#D6A85A");

  // Lower IC substrate & gull-wing side pins
  const base = new THREE.Group();
  base.name = "package-base";
  group.add(base);
  box(1.80, 0.10, 1.80, pkgMat, 0, 0.05, 0, base);
  for (let i = 0; i < 6; i++) {
    const pz = -0.625 + i * 0.25;
    for (const sx of [-1, 1]) {
      box(0.18, 0.04, 0.10, pinMat, sx * 0.96, 0.04, pz, base);
      box(0.06, 0.06, 0.10, pinMat, sx * 1.03, 0.02, pz, base);
    }
  }

  // Exposed silicon die with perimeter bond pads
  const die = new THREE.Group();
  die.name = "silicon-die";
  die.position.set(0, 0.115, 0);
  group.add(die);
  box(1.52, 0.03, 1.52, dieMat, 0, 0, 0, die);
  for (let i = -3; i <= 3; i++) {
    box(0.07, 0.015, 0.05, padMat, i * 0.19, 0.018, -0.71, die);
    box(0.07, 0.015, 0.05, padMat, i * 0.19, 0.018, 0.71, die);
  }

  // 2x2 grid of Blocks, each containing 4 Pages x 4 Cells = 64 individual cells
  const cellGeo = new THREE.BoxGeometry(0.105, 0.045, 0.095);
  const cells = [];
  const blockGroups = [];
  const blockFrameMats = [];
  const pageBars = [];
  const wearBars = [];

  const blockOffsets = [
    [-0.36, -0.36],
    [0.36, -0.36],
    [-0.36, 0.36],
    [0.36, 0.36],
  ];

  blockOffsets.forEach(([bx, bz], bIdx) => {
    const bg = new THREE.Group();
    bg.name = "block-" + bIdx;
    bg.position.set(bx, 0.025, bz);
    die.add(bg);
    blockGroups.push(bg);

    // Block border frame (lights #E879F9 on block_erase)
    const fMat = kit.toon("#525B72", { emissive: "#000000" });
    blockFrameMats.push(fMat);
    box(0.62, 0.025, 0.03, fMat, 0, 0, -0.295, bg);
    box(0.62, 0.025, 0.03, fMat, 0, 0, 0.295, bg);
    box(0.03, 0.025, 0.62, fMat, -0.295, 0, 0, bg);
    box(0.03, 0.025, 0.62, fMat, 0.295, 0, 0, bg);

    const bPages = [];
    for (let p = 0; p < 4; p++) {
      const pz = -0.18 + p * 0.12;
      // Page selector bar on left edge of row
      const pBarMat = kit.toon("#465066", { emissive: "#000000" });
      const pBar = box(0.025, 0.035, 0.085, pBarMat, -0.255, 0.015, pz, bg);
      bPages.push(pBar);

      for (let c = 0; c < 4; c++) {
        const cx = -0.165 + c * 0.115;
        const cMat = kit.toon("#4A5268", { emissive: "#000000" });
        const mesh = new THREE.Mesh(cellGeo, cMat);
        mesh.position.set(cx, 0.02, pz);
        bg.add(mesh);
        cells.push({ mesh, mat: cMat, block: bIdx, page: p, col: c });
      }
    }
    pageBars.push(bPages);

    // Per-block vertical wear meter bar (shown in multi_block_wear)
    const wMat = kit.toon("#F59E0B", { emissive: "#000000" });
    const wGeo = new THREE.BoxGeometry(0.08, 0.5, 0.08);
    wGeo.translate(0, 0.25, 0);
    const wBar = new THREE.Mesh(wGeo, wMat);
    wBar.position.set(0.25, 0.02, -0.25);
    bg.add(wBar);
    wearBars.push({ mesh: wBar, mat: wMat });
  });

  // Cutaway upper epoxy lid
  const lid = new THREE.Group();
  lid.name = "chip-lid";
  lid.position.set(0, 0.135, 0);
  group.add(lid);
  box(1.76, 0.07, 1.76, kit.toon("#2E3240"), 0, 0.035, 0, lid);
  // Subtle wafer mark and pin-1 orientation dot
  box(0.55, 0.015, 0.55, kit.toon("#3F4558"), 0, 0.074, 0, lid);
  const dotMat = kit.toon("#F59E0B", { emissive: "#000000" });
  const pinDot = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.016, 12), dotMat);
  pinDot.position.set(-0.62, 0.074, 0.62);
  lid.add(pinDot);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    body: anchor("body", [0, 0.12, 0]),
    die: anchor("die", [0, 0.16, 0]),
    block0: anchor("block0", [-0.36, 0.18, -0.36]),
    block1: anchor("block1", [0.36, 0.18, -0.36]),
    block2: anchor("block2", [-0.36, 0.18, 0.36]),
    block3: anchor("block3", [0.36, 0.18, 0.36]),
    page0: anchor("page0", [-0.36, 0.18, -0.54]),
    wearMeter: anchor("wearMeter", [-0.11, 0.45, -0.61]),
  };

  const colDark = new THREE.Color("#000000");
  const colBit = new THREE.Color("#F59E0B");
  const colCmd = new THREE.Color("#E879F9");
  const colAlert = new THREE.Color("#DD3428");
  const colGood = new THREE.Color("#2D884E");
  const colEmpty = new THREE.Color("#4A5268");
  const colStale = new THREE.Color("#6B6D78");
  const colFrameIdle = new THREE.Color("#525B72");

  function update(t, state = {}) {
    const m = state.mode ?? mode;
    const isExt = m === "chip_exterior";
    const open = kit.clamp01(state.open ?? (isExt ? 0 : 1));
    const hideLid = state.hideLid ?? false;
    lid.visible = !hideLid;
    lid.position.set(0, 0.135 + open * 1.15, -open * 0.55);
    lid.rotation.x = -open * 0.28;
    dotMat.emissive.copy(colDark).lerp(colBit, 0.35);

    const activeBlock = state.activeBlock ?? (m === "block_erase" ? 0 : 1);
    const activePage = state.activePage ?? 1;
    const eraseMode = m === "block_erase" || (state.erasePulse ?? 0) > 0.05;
    const erasePulse = kit.clamp01(state.erasePulse ?? (m === "block_erase" ? 1 : 0));
    const wearMode = m === "multi_block_wear" || Boolean(state.wearMode);
    const wearSpread = kit.clamp01(state.wearSpread ?? 0);
    const wave = 0.5 + 0.5 * Math.sin(t * 5.0);

    // Block frames
    blockFrameMats.forEach((fm, bIdx) => {
      if (eraseMode && bIdx === activeBlock) {
        fm.color.copy(colCmd);
        fm.emissive.copy(colDark).lerp(colCmd, 0.35 + 0.4 * erasePulse * wave);
      } else if (m === "page_highlight" && bIdx === activeBlock) {
        fm.color.copy(colBit);
        fm.emissive.copy(colDark).lerp(colBit, 0.25);
      } else {
        fm.color.copy(colFrameIdle);
        fm.emissive.copy(colDark);
      }
    });

    // Page selector bars
    pageBars.forEach((bPages, bIdx) => {
      bPages.forEach((pBar, pIdx) => {
        const isHit = (m === "page_highlight" || state.highlightPage) && bIdx === activeBlock && pIdx === activePage;
        if (isHit) {
          pBar.material.color.copy(colCmd);
          pBar.material.emissive.copy(colDark).lerp(colCmd, 0.45 + 0.3 * wave);
        } else {
          pBar.material.color.copy(colFrameIdle);
          pBar.material.emissive.copy(colDark);
        }
      });
    });

    // Memory cells grid
    const litFrac = kit.clamp01(state.litFraction ?? 0.68);
    cells.forEach((cell, idx) => {
      const h = kit.hash(idx + 17);
      const isHighlightedPage = (m === "page_highlight" || state.highlightPage) && cell.block === activeBlock && cell.page === activePage;
      const isEraseBlock = eraseMode && cell.block === activeBlock;
      const isStaleCell = isEraseBlock && cell.page === 0;
      const isFilled = h < litFrac;

      if (isHighlightedPage) {
        cell.mat.color.copy(colBit);
        cell.mat.emissive.copy(colDark).lerp(colBit, 0.55 + 0.35 * wave);
        cell.mesh.scale.y = 1.35 + 0.2 * wave;
      } else if (isStaleCell) {
        cell.mat.color.copy(colStale);
        cell.mat.emissive.copy(colDark);
        cell.mesh.scale.y = 0.7;
      } else if (isEraseBlock || isFilled) {
        cell.mat.color.copy(colBit);
        cell.mat.emissive.copy(colDark).lerp(colBit, isEraseBlock ? 0.35 : 0.25);
        cell.mesh.scale.y = 1.05;
      } else {
        cell.mat.color.copy(colEmpty);
        cell.mat.emissive.copy(colDark);
        cell.mesh.scale.y = 0.85;
      }
    });

    // Per-block wear meters (localized #DD3428 vs balanced #2D884E / #F59E0B)
    const rawWear = [0.95, 0.22, 0.18, 0.25];
    const balancedWear = [0.58, 0.54, 0.52, 0.56];
    wearBars.forEach((wb, bIdx) => {
      wb.mesh.visible = wearMode;
      if (!wearMode) return;
      const lvl = kit.lerp(rawWear[bIdx], balancedWear[bIdx], wearSpread);
      wb.mesh.scale.y = Math.max(0.15, lvl);
      if (wearSpread < 0.5 && bIdx === 0) {
        wb.mat.color.copy(colAlert);
        wb.mat.emissive.copy(colDark).lerp(colAlert, 0.35 + 0.4 * wave);
      } else if (wearSpread >= 0.5) {
        wb.mat.color.copy(colGood);
        wb.mat.emissive.copy(colDark).lerp(colGood, 0.25);
      } else {
        wb.mat.color.copy(colBit);
        wb.mat.emissive.copy(colDark).lerp(colBit, 0.2);
      }
    });
  }

  update(0);
  return { group, hero: [base, lid], cells, anchors, update };
}
