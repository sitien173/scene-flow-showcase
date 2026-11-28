// copper-coil: toon3d multi-turn continuous copper coil (flat Qi spiral or helical solenoid)
// with lead tails, terminal pads (+/-), and pure-time AC / induced / DC color states.
// Origin at coil centre (y = 0); flat variant lies in the XZ plane.
export function copperCoil(kit, opts = {}) {
  const { THREE } = kit;
  const {
    variant = "flat",
    turns = variant === "flat" ? 4 : 5.5,
    innerRadius = variant === "flat" ? 0.09 : 0.18,
    outerRadius = 0.24,
    wireRadius = 0.011,
    length = 0.42,
    coilColor = "#D98245",
    withBobbin = variant === "flat",
  } = opts;

  const group = new THREE.Group();
  group.name = "copper-coil";

  const coilPts = [];
  const steps = Math.max(64, Math.round(turns * 32));
  let plusPos = [0.055, 0, outerRadius + 0.14];
  let minusPos = [-0.055, 0, outerRadius + 0.14];

  if (variant === "solenoid") {
    const startZ = -length / 2;
    coilPts.push(new THREE.Vector3(-0.08, -outerRadius - 0.05, startZ));
    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const ang = u * turns * Math.PI * 2 + Math.PI;
      const z = startZ + u * length;
      coilPts.push(new THREE.Vector3(Math.cos(ang) * outerRadius, Math.sin(ang) * outerRadius, z));
    }
    coilPts.push(new THREE.Vector3(0.08, -outerRadius - 0.05, length / 2));
    plusPos = [-0.08, -outerRadius - 0.05, startZ];
    minusPos = [0.08, -outerRadius - 0.05, length / 2];
  } else {
    // Inner lead drops cleanly below the bobbin (y=-0.044) and rises to terminal pad outside bobbin
    coilPts.push(new THREE.Vector3(-0.055, 0, outerRadius + 0.14));
    coilPts.push(new THREE.Vector3(-0.055, -0.044, outerRadius + 0.06));
    coilPts.push(new THREE.Vector3(-0.03, -0.044, innerRadius + 0.02));
    coilPts.push(new THREE.Vector3(0, -0.022, innerRadius));
    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const ang = Math.PI / 2 + u * turns * Math.PI * 2;
      const r = innerRadius + (outerRadius - innerRadius) * u;
      coilPts.push(new THREE.Vector3(Math.cos(ang) * r, 0, Math.sin(ang) * r));
    }
    coilPts.push(new THREE.Vector3(0.055, 0, outerRadius + 0.14));
    minusPos = [-0.055, 0, outerRadius + 0.14];
    plusPos = [0.055, 0, outerRadius + 0.14];
  }

  const curve = new THREE.CatmullRomCurve3(coilPts, false, "catmullrom", 0.25);
  const coilMat = kit.toon(coilColor, { emissive: "#000000" });
  const wireMesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, steps + 24, wireRadius, 7, false),
    coilMat
  );
  group.add(wireMesh);

  // Optional dark ferrite/bobbin ring under flat coil
  if (withBobbin) {
    const bobbin = new THREE.Mesh(
      new THREE.CylinderGeometry(outerRadius + 0.02, outerRadius + 0.02, 0.012, 24),
      kit.toon("#46495A")
    );
    bobbin.position.set(0, -wireRadius - 0.014, 0);
    group.add(bobbin);
  }

  // Terminal pads at lead ends (+ / -)
  const plusMat = kit.toon("#B8BCC8", { emissive: "#000000" });
  const minusMat = kit.toon("#B8BCC8", { emissive: "#000000" });
  const termGeo = new THREE.CylinderGeometry(0.026, 0.026, 0.024, 10);
  const plusPad = new THREE.Mesh(termGeo, plusMat);
  plusPad.position.set(...plusPos);
  const minusPad = new THREE.Mesh(termGeo, minusMat);
  minusPad.position.set(...minusPos);
  group.add(plusPad, minusPad);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    center: anchor("center", [0, 0, 0]),
    plus: anchor("plus", plusPos),
    minus: anchor("minus", minusPos),
    rim: anchor("rim", [outerRadius, 0, 0]),
  };

  function path(name = "coil") {
    if (name !== "coil") throw new Error("copperCoil: only 'coil' path is available");
    group.updateWorldMatrix(true, false);
    return coilPts.map(p => p.clone().applyMatrix4(group.matrixWorld).toArray());
  }

  const baseColor = new THREE.Color(coilColor);
  const modeColors = {
    idle: baseColor,
    ac: new THREE.Color("#F08A4B"),
    induced: new THREE.Color("#2D7FF9"),
    dc: new THREE.Color("#2D884E"),
  };
  const plusColor = new THREE.Color("#DD3428");
  const minusColor = new THREE.Color("#2D7FF9");
  const padNeutral = new THREE.Color("#B8BCC8");
  const dark = new THREE.Color("#000000");

  function update(t, state = {}) {
    const mode = state.mode || "idle";
    const intensity = kit.clamp01(state.intensity ?? (mode === "idle" ? 0 : 1));
    const freq = state.freq ?? 5.2;
    const phase = state.phase ?? Math.cos(t * freq);
    const target = modeColors[mode] || baseColor;

    if (mode === "idle" || intensity <= 0.01) {
      coilMat.color.copy(baseColor);
      coilMat.emissive.copy(dark);
    } else {
      const wave = (mode === "ac" || mode === "induced") ? 0.35 + 0.65 * Math.abs(phase) : 1.0;
      coilMat.color.copy(baseColor).lerp(target, intensity * 0.85);
      coilMat.emissive.copy(dark).lerp(target, intensity * wave * 0.55);
    }

    const v = kit.clamp01(state.voltage ?? 0);
    if (v > 0.02) {
      const posSide = phase >= 0 ? plusMat : minusMat;
      const negSide = phase >= 0 ? minusMat : plusMat;
      posSide.color.copy(padNeutral).lerp(plusColor, v);
      posSide.emissive.copy(dark).lerp(plusColor, v * 0.5);
      negSide.color.copy(padNeutral).lerp(minusColor, v);
      negSide.emissive.copy(dark).lerp(minusColor, v * 0.5);
    } else {
      plusMat.color.copy(padNeutral);
      plusMat.emissive.copy(dark);
      minusMat.color.copy(padNeutral);
      minusMat.emissive.copy(dark);
    }
  }

  update(0);
  return { group, hero: [wireMesh], anchors, path, update };
}
