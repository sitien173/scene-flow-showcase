// controller-chip: toon3d SSD controller ASIC with Command Dispatcher (#E879F9), Mapping Table / LUT
// (#2D7FF9 host address -> #F59E0B physical page), ECC parity block (#E879F9 / #DD3428 / #F59E0B),
// and GC / Wear-Leveling output router. Origin at base centre (y = 0); front edge faces +z.
export function controllerChip(kit, opts = {}) {
  const { THREE } = kit;
  const {
    pkgColor = "#262936",
    dieColor = "#383E52",
    mode = "dispatch_write",
  } = opts;

  const group = new THREE.Group();
  group.name = "controller-chip";

  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };
  const cyl = (rt, rb, h, segs, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, segs), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // 1. QFN processor package base & 4-sided perimeter leads
  const pkgMat = kit.toon(pkgColor);
  const pinMat = kit.toon("#C8CCD4");
  const dieMat = kit.toon(dieColor);

  const base = box(1.70, 0.14, 1.70, pkgMat, 0, 0.07, 0);
  for (let i = -3; i <= 3; i++) {
    const off = i * 0.20;
    box(0.10, 0.05, 0.12, pinMat, off, 0.03, 0.89);
    box(0.10, 0.05, 0.12, pinMat, off, 0.03, -0.89);
    box(0.12, 0.05, 0.10, pinMat, 0.89, 0.03, off);
    box(0.12, 0.05, 0.10, pinMat, -0.89, 0.03, off);
  }

  // Cutaway inner substrate deck
  const deck = box(1.44, 0.04, 1.44, dieMat, 0, 0.15, 0);

  // 2. Command Dispatcher Core (front-right: x=+0.26, z=+0.26) + #E879F9 Command Emitter
  const coreGroup = new THREE.Group();
  coreGroup.name = "command-core";
  coreGroup.position.set(0.28, 0.17, 0.26);
  group.add(coreGroup);
  cyl(0.32, 0.35, 0.07, 8, kit.toon("#4A5268"), 0, 0.035, 0, coreGroup);
  const cmdCoreMat = kit.toon("#E879F9", { emissive: "#000000" });
  const cmdBeacon = cyl(0.19, 0.21, 0.06, 8, cmdCoreMat, 0, 0.085, 0, coreGroup);

  // Outbound command bus tracks & animated #E879F9 pulse chevrons
  const busTrackMat = kit.toon("#4C4363", { emissive: "#000000" });
  const cmdPulses = [];
  for (let i = 0; i < 3; i++) {
    const pz = -0.14 + i * 0.14;
    box(0.46, 0.018, 0.045, busTrackMat, 0.34, 0.015, pz, coreGroup);
    const pMat = kit.toon("#E879F9", { emissive: "#E879F9" });
    pMat.emissiveIntensity = 0.4;
    const pMesh = box(0.10, 0.036, 0.06, pMat, 0.25, 0.032, pz, coreGroup);
    cmdPulses.push({ mesh: pMesh, mat: pMat, pz });
  }

  // 3. Mapping Table / LUT Module (front-left: x=-0.38, z=+0.16)
  const lutGroup = new THREE.Group();
  lutGroup.name = "lut-module";
  lutGroup.position.set(-0.38, 0.175, 0.18);
  group.add(lutGroup);
  box(0.58, 0.04, 0.72, kit.toon("#2B3142"), 0, 0.02, 0, lutGroup);

  const lutHostMats = [];
  const lutPhysMats = [];
  for (let r = 0; r < 4; r++) {
    const rz = -0.24 + r * 0.16;
    const hMat = kit.toon("#2D7FF9", { emissive: "#000000" });
    const pMat = kit.toon("#525B72", { emissive: "#000000" });
    box(0.14, 0.032, 0.09, hMat, -0.16, 0.048, rz, lutGroup);
    box(0.14, 0.032, 0.09, pMat, 0.16, 0.048, rz, lutGroup);
    lutHostMats.push(hMat);
    lutPhysMats.push(pMat);
  }
  const lutBridgeMat = kit.toon("#E879F9", { emissive: "#E879F9" });
  lutBridgeMat.emissiveIntensity = 0.45;
  const lutBridge = box(0.24, 0.036, 0.045, lutBridgeMat, 0, 0.056, -0.08, lutGroup);

  // 4. ECC Engine Block (back-right: x=+0.28, z=-0.36)
  const eccGroup = new THREE.Group();
  eccGroup.name = "ecc-engine";
  eccGroup.position.set(0.28, 0.175, -0.36);
  group.add(eccGroup);
  box(0.62, 0.04, 0.52, kit.toon("#2B3142"), 0, 0.02, 0, eccGroup);

  const eccBitMats = [];
  for (let i = 0; i < 4; i++) {
    const bm = kit.toon("#F59E0B", { emissive: "#000000" });
    box(0.10, 0.036, 0.14, bm, -0.20 + i * 0.135, 0.048, -0.09, eccGroup);
    eccBitMats.push(bm);
  }
  const eccParityMats = [];
  for (let i = 0; i < 2; i++) {
    const pm = kit.toon("#E879F9", { emissive: "#000000" });
    box(0.22, 0.036, 0.10, pm, -0.13 + i * 0.26, 0.048, 0.12, eccGroup);
    eccParityMats.push(pm);
  }
  const eccScanMat = kit.toon("#E879F9", { emissive: "#E879F9" });
  eccScanMat.emissiveIntensity = 0.45;
  const eccScanner = box(0.05, 0.055, 0.44, eccScanMat, 0, 0.06, 0, eccGroup);

  // 5. GC & Wear-Leveling Router (back-left: x=-0.38, z=-0.42)
  const gcGroup = new THREE.Group();
  gcGroup.name = "gc-router";
  gcGroup.position.set(-0.38, 0.175, -0.42);
  group.add(gcGroup);
  box(0.58, 0.04, 0.36, kit.toon("#2B3142"), 0, 0.02, 0, gcGroup);
  const gcMats = [];
  for (let i = 0; i < 4; i++) {
    const gm = kit.toon("#525B72", { emissive: "#000000" });
    box(0.09, 0.038, 0.24, gm, -0.195 + i * 0.13, 0.05, 0, gcGroup);
    gcMats.push(gm);
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
    body: anchor("body", [0, 0.12, 0]),
    cmdCore: anchor("cmdCore", [0.28, 0.28, 0.26]),
    outBus: anchor("outBus", [0.76, 0.22, 0.26]),
    lut: anchor("lut", [-0.38, 0.24, 0.18]),
    ecc: anchor("ecc", [0.28, 0.24, -0.36]),
    gcRouter: anchor("gcRouter", [-0.38, 0.24, -0.42]),
  };

  const colDark = new THREE.Color("#000000");
  const colCmd = new THREE.Color("#E879F9");
  const colCmdIdle = new THREE.Color("#734C82");
  const colBusIdle = new THREE.Color("#4C4363");
  const colHost = new THREE.Color("#2D7FF9");
  const colBit = new THREE.Color("#F59E0B");
  const colAlert = new THREE.Color("#DD3428");
  const colIdle = new THREE.Color("#525B72");

  function update(t, state = {}) {
    const m = state.mode ?? mode;
    const wave = 0.5 + 0.5 * Math.sin(t * 5.2);
    const dispatching = m === "dispatch_write" || m === "lut_read" || m === "gc_wear" || Boolean(state.sending);

    // Command Emitter Beacon (#E879F9) & bus pulses
    const cmdStrength = kit.clamp01(state.cmdStrength ?? (dispatching ? 1 : 0.45));
    cmdBeacon.material.color.copy(colCmdIdle).lerp(colCmd, cmdStrength);
    cmdBeacon.material.emissive.copy(colDark).lerp(colCmd, cmdStrength * (0.35 + 0.45 * wave));
    busTrackMat.color.copy(colBusIdle).lerp(colCmd, cmdStrength * 0.7);
    cmdPulses.forEach((cp, i) => {
      cp.mesh.visible = dispatching;
      if (dispatching) {
        const p = (t * 1.4 + i * 0.28) % 1;
        cp.mesh.position.x = kit.lerp(0.18, 0.56, p);
      }
    });

    // LUT Mapping Table (#2D7FF9 -> #F59E0B via #E879F9 pointer)
    const lutRows = [-0.24, -0.08, 0.08, 0.24];
    const isLutUpdate = m === "lut_update";
    const isLutRead = m === "lut_read";
    const activeHostRow = state.lutHostRow ?? 1;
    const activePhysRow = state.lutPhysRow ?? (isLutUpdate ? 2 : 1);

    lutHostMats.forEach((hm, r) => {
      const hi = r === activeHostRow && (isLutUpdate || isLutRead);
      hm.color.copy(colHost);
      hm.emissive.copy(colDark).lerp(colHost, hi ? 0.5 + 0.3 * wave : 0.15);
    });
    lutPhysMats.forEach((pm, r) => {
      const hi = r === activePhysRow;
      pm.color.copy(hi ? colBit : colIdle);
      pm.emissive.copy(colDark).lerp(colBit, hi ? 0.45 : 0);
    });

    const zFrom = lutRows[activeHostRow];
    const zTo = lutRows[activePhysRow];
    if (isLutUpdate) {
      const mix = kit.clamp01(state.lutMix ?? (0.5 + 0.5 * Math.sin(t * 2.5)));
      lutBridge.position.z = kit.lerp(zFrom, zTo, mix);
      lutBridge.rotation.y = (zFrom - zTo) * mix * 1.4;
      lutBridgeMat.emissiveIntensity = 0.65;
    } else {
      lutBridge.position.z = (zFrom + zTo) * 0.5;
      lutBridge.rotation.y = 0;
      lutBridgeMat.emissiveIntensity = isLutRead ? 0.55 + 0.3 * wave : 0.25;
    }

    // ECC Block (#F59E0B data bits, #E879F9 parity, #DD3428 error alert)
    const isEcc = m === "ecc_check";
    const errCount = state.errorCount ?? (isEcc ? 1 : 0);
    const overLimit = Boolean(state.eccOverLimit);
    eccScanner.visible = isEcc;
    if (isEcc) {
      eccScanner.position.x = -0.22 + 0.44 * (0.5 + 0.5 * Math.sin(t * 3.8));
    }
    eccBitMats.forEach((bm, i) => {
      const isErr = i < errCount;
      if (isErr && (!isEcc || overLimit || Math.sin(t * 3.8) < 0.2)) {
        bm.color.copy(colAlert);
        bm.emissive.copy(colDark).lerp(colAlert, 0.45);
      } else {
        bm.color.copy(colBit);
        bm.emissive.copy(colDark).lerp(colBit, isEcc ? 0.35 : 0.15);
      }
    });
    eccParityMats.forEach((pm) => {
      pm.color.copy(colCmd);
      pm.emissive.copy(colDark).lerp(colCmd, isEcc ? 0.5 : 0.15);
    });

    // GC & Wear Router channels
    const isGc = m === "gc_wear";
    gcMats.forEach((gm, i) => {
      if (isGc) {
        const chPhase = Math.floor(t * 3.5) % 4;
        const active = i === chPhase;
        gm.color.copy(active ? colCmd : colBit);
        gm.emissive.copy(colDark).lerp(active ? colCmd : colBit, active ? 0.55 : 0.18);
      } else {
        gm.color.copy(colIdle);
        gm.emissive.copy(colDark);
      }
    });

    void base;
    void deck;
  }

  update(0);
  return { group, hero: [base, cmdBeacon], anchors, update };
}
