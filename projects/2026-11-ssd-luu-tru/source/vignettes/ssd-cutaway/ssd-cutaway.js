// ssd-cutaway: original toon3d cutaway SSD housing showing an empty interior bay (no spinning disk)
// alongside a solid-state PCB with controller chip, NAND flash packages, and host connector.
// Origin at base centre (y = 0); front edge faces +z.
export function ssdCutaway(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    chassisColor = "#353846",
    lidColor = "#E6E6E1",
    pcbColor = "#295C4B",
    mode = "cutaway",
  } = opts;

  const group = new THREE.Group();
  group.name = "ssd-cutaway";

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

  const W = 2.30, H = 0.24, D = 1.62;
  const chassisMat = kit.toon(chassisColor);
  const darkInnerMat = kit.toon("#232630");
  const railMat = kit.toon("#555A6C");
  const pinMetalMat = kit.toon("#C8CCD4");

  // Lower chassis floor and raised perimeter walls (cutaway cavity)
  const chassis = new THREE.Group();
  chassis.name = "chassis";
  group.add(chassis);
  box(W, 0.06, D, chassisMat, 0, 0.03, 0, chassis);
  // Left, right, back walls and front lower lip
  box(0.08, H - 0.06, D, chassisMat, -W / 2 + 0.04, 0.06 + (H - 0.06) / 2, 0, chassis);
  box(0.08, H - 0.06, D, chassisMat, W / 2 - 0.04, 0.06 + (H - 0.06) / 2, 0, chassis);
  box(W - 0.16, H - 0.06, 0.08, chassisMat, 0, 0.06 + (H - 0.06) / 2, -D / 2 + 0.04, chassis);
  box(W - 0.16, 0.08, 0.08, chassisMat, 0, 0.10, D / 2 - 0.04, chassis);
  // Inner cavity floor
  box(W - 0.18, 0.02, D - 0.18, darkInnerMat, 0, 0.07, 0, chassis);
  // Corner mounting bosses
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      cyl(0.045, 0.045, 0.16, 8, railMat, sx * (W / 2 - 0.12), 0.14, sz * (D / 2 - 0.12), chassis);
    }
  }

  // Left half: empty bay space inside the housing (no spinning platter, ticks, or spindle hub)
  const emptyBay = new THREE.Group();
  emptyBay.name = "empty-disk-bay";
  emptyBay.position.set(-0.46, 0.085, -0.02);
  group.add(emptyBay);

  // Right half: solid-state PCB with host connector, controller chip, 4 NAND chips, and circuit traces
  const pcbGroup = new THREE.Group();
  pcbGroup.name = "pcb";
  pcbGroup.position.set(0.55, 0.12, 0.02);
  group.add(pcbGroup);
  box(0.98, 0.035, 1.32, kit.toon(pcbColor), 0, 0, 0, pcbGroup);

  // Host interface connector at front (+z) edge of PCB (#2D7FF9 host role)
  const hostMat = kit.toon("#2D7FF9", { emissive: "#000000" });
  box(0.62, 0.055, 0.14, kit.toon("#222530"), 0, 0.025, 0.68, pcbGroup);
  const hostBar = box(0.54, 0.03, 0.08, hostMat, 0, 0.045, 0.72, pcbGroup);
  for (let i = -3; i <= 3; i++) {
    box(0.035, 0.016, 0.07, pinMetalMat, i * 0.07, 0.062, 0.72, pcbGroup);
  }

  // Controller chip on PCB (front-left of PCB, #E879F9 command role)
  const ctrlMat = kit.toon("#262936");
  const ctrlGlowMat = kit.toon("#E879F9", { emissive: "#000000" });
  const ctrlBody = box(0.30, 0.055, 0.30, ctrlMat, -0.22, 0.045, 0.34, pcbGroup);
  box(0.16, 0.018, 0.16, ctrlGlowMat, -0.22, 0.078, 0.34, pcbGroup);

  // 4 NAND Flash chips on PCB (2x2 grid, #F59E0B stored bit state role)
  const nandBodyMat = kit.toon("#1F222C");
  const nandGlowMats = [];
  const nandCoords = [
    [-0.22, -0.14],
    [0.24, -0.14],
    [-0.22, -0.48],
    [0.24, -0.48],
  ];
  for (const [nx, nz] of nandCoords) {
    box(0.32, 0.052, 0.26, nandBodyMat, nx, 0.042, nz, pcbGroup);
    const gm = kit.toon("#F59E0B", { emissive: "#000000" });
    box(0.20, 0.016, 0.10, gm, nx, 0.072, nz, pcbGroup);
    nandGlowMats.push(gm);
  }

  // PCB signal traces connecting host -> controller -> NAND chips
  const traceHostMat = kit.toon("#3F5278", { emissive: "#000000" });
  const traceCmdMat = kit.toon("#4A3B5C", { emissive: "#000000" });
  box(0.04, 0.012, 0.24, traceHostMat, -0.12, 0.022, 0.54, pcbGroup);
  box(0.04, 0.012, 0.24, traceHostMat, 0.02, 0.022, 0.54, pcbGroup);
  box(0.035, 0.012, 0.72, traceCmdMat, -0.22, 0.022, -0.12, pcbGroup);
  box(0.46, 0.012, 0.035, traceCmdMat, 0.01, 0.022, 0.05, pcbGroup);
  box(0.035, 0.012, 0.56, traceCmdMat, 0.24, 0.022, -0.22, pcbGroup);

  // Removable / lifting top cutaway housing lid
  const topShell = new THREE.Group();
  topShell.name = "top-shell";
  topShell.position.set(0, H, 0);
  group.add(topShell);
  const lidMat = kit.toon(lidColor);
  const stripeMat = kit.toon("#4C5266");
  const accentTrimMat = kit.toon("#2D7FF9");
  box(W, 0.06, D, lidMat, 0, 0.03, 0, topShell);
  box(W - 0.22, 0.025, D - 0.22, kit.toon("#D6D2C7"), 0, 0.068, 0, topShell);
  // Clean geometric top rib + host-color accent strip (no brand text/logo, non-overlapping)
  box(1.30, 0.022, 0.18, stripeMat, 0.24, 0.088, -0.26, topShell);
  box(0.42, 0.022, 0.18, accentTrimMat, -0.66, 0.088, -0.26, topShell);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    body: anchor("body", [0, 0.18, 0]),
    topShell: anchor("topShell", [0, 0.34, 0]),
    emptyBay: anchor("emptyBay", [-0.46, 0.14, -0.02]),
    pcb: anchor("pcb", [0.55, 0.18, 0.02]),
    controller: anchor("controller", [0.33, 0.22, 0.36]),
    nandCluster: anchor("nandCluster", [0.56, 0.22, -0.28]),
    connector: anchor("connector", [0.55, 0.18, 0.78]),
  };

  const colDark = new THREE.Color("#000000");
  const colCyan = new THREE.Color("#22D3EE");
  const colBit = new THREE.Color("#F59E0B");
  const colCmd = new THREE.Color("#E879F9");
  const colHost = new THREE.Color("#2D7FF9");
  const colHostTraceOff = new THREE.Color("#3F5278");
  const colCmdTraceOff = new THREE.Color("#4A3B5C");
  const colNandIdle = new THREE.Color("#52586B");

  function update(t, state = {}) {
    const m = state.mode ?? mode;
    const defaults = {
      closed: { cut: 0, power: 1, circuit: 0, nand: 0.25, ctrl: 0.15, host: 0.2 },
      cutaway: { cut: 1, power: 1, circuit: 0.2, nand: 0.7, ctrl: 0.5, host: 0.5 },
      powered_off: { cut: 0.85, power: 0, circuit: 0, nand: 0.55, ctrl: 0, host: 0 },
      active_circuit: { cut: 1, power: 1, circuit: 1, nand: 1, ctrl: 1, host: 1 },
    }[m] || { cut: 1, power: 1, circuit: 0, nand: 0.7, ctrl: 0.5, host: 0.5 };

    const cut = kit.clamp01(state.cutaway ?? defaults.cut);
    topShell.position.set(0, H + cut * 0.92, -cut * 0.28);
    topShell.rotation.x = -cut * 0.20;

    const power = kit.clamp01(state.power ?? defaults.power);
    const circuit = kit.clamp01(state.circuit ?? defaults.circuit);
    const pulseWave = 0.5 + 0.5 * Math.sin(t * 4.5);

    const hostLvl = kit.clamp01(state.hostGlow ?? defaults.host) * power;
    hostBar.material.emissive.copy(colDark).lerp(colHost, hostLvl * (0.4 + 0.35 * circuit * pulseWave));
    traceHostMat.color.copy(colHostTraceOff).lerp(colHost, hostLvl * (0.5 + 0.5 * circuit));
    traceHostMat.emissive.copy(colDark).lerp(colHost, hostLvl * circuit * (0.35 + 0.35 * pulseWave));

    const ctrlLvl = kit.clamp01(state.ctrlGlow ?? defaults.ctrl) * power;
    ctrlGlowMat.emissive.copy(colDark).lerp(colCmd, ctrlLvl * (0.35 + 0.45 * circuit * pulseWave));
    traceCmdMat.color.copy(colCmdTraceOff).lerp(colCmd, ctrlLvl * (0.55 + 0.45 * circuit));
    traceCmdMat.emissive.copy(colDark).lerp(colCmd, ctrlLvl * circuit * (0.35 + 0.4 * pulseWave));

    // Stored bit state (#F59E0B) persists even in powered_off state (non-volatile retention)
    const nandLvl = kit.clamp01(state.nandGlow ?? defaults.nand);
    nandGlowMats.forEach((gm, i) => {
      const shimmer = 0.8 + 0.2 * Math.sin(t * 3.4 + i * 1.3);
      const active = nandLvl * (circuit > 0.1 ? shimmer : 1.0);
      if (active > 0.05) {
        gm.color.copy(colBit);
        gm.emissive.copy(colDark).lerp(colBit, active * (power > 0.1 ? 0.55 : 0.40));
      } else {
        gm.color.copy(colNandIdle);
        gm.emissive.copy(colDark);
      }
    });

    // Keep fixed electron charge color reference and controller body handle
    void colCyan;
    void ctrlBody;
  }

  update(0);
  return { group, hero: [chassis, topShell], anchors, update };
}
