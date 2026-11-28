// atomic-clock: toon3d precision timepiece in fixed #FCD53E time-code palette.
// Supports "atomic" (satellite reference) and "receiver" (phone dial with phase bias & calibration knob).
// Origin at dial centre [0, 0, 0]; dial faces +z.
export function atomicClock(kit, opts = {}) {
  const { THREE } = kit;
  const {
    variant = "atomic",
    color = "#FCD53E",
    radius = 0.65,
  } = opts;

  const group = new THREE.Group();
  group.name = "atomic-clock-" + variant;

  const bodyColor = variant === "atomic" ? "#2B2D38" : "#4C5266";
  const bodyMat = kit.toon(bodyColor);
  const bezelMat = kit.toon(color, { emissive: "#000000" });

  // Main cylindrical housing
  const casing = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius * 1.04, 0.24, variant === "atomic" ? 8 : 16),
    bodyMat
  );
  casing.rotation.x = Math.PI / 2;
  group.add(casing);

  // Outer bezel / rotatable adjustment knob ring
  const bezelGroup = new THREE.Group();
  bezelGroup.position.z = 0.11;
  group.add(bezelGroup);
  const bezel = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.9, 0.065, 8, 24), bezelMat);
  bezelGroup.add(bezel);

  // Knurled tabs on outer bezel (especially clear when turned as a calibration knob)
  const knobTabs = variant === "receiver" ? 12 : 4;
  for (let i = 0; i < knobTabs; i++) {
    const a = (i / knobTabs) * Math.PI * 2;
    const tab = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.09), bezelMat);
    tab.position.set(Math.cos(a) * radius * 0.96, Math.sin(a) * radius * 0.96, 0);
    tab.rotation.z = a;
    bezelGroup.add(tab);
  }

  // Top resonance crown on atomic unit
  if (variant === "atomic") {
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.14, 10), bezelMat);
    crown.position.set(0, radius + 0.06, 0);
    group.add(crown);
  }

  // Dial face drawn once on canvasTexture
  const faceTex = kit.canvasTexture(256, 256, (g, w, h) => {
    const cx = w / 2, cy = h / 2, r = w * 0.46;
    g.fillStyle = "#FAFCFB";
    g.fillRect(0, 0, w, h);

    g.beginPath();
    g.arc(cx, cy, r * 0.88, 0, Math.PI * 2);
    g.strokeStyle = "#FCD53E";
    g.lineWidth = 10;
    g.stroke();

    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const r0 = i % 3 === 0 ? r * 0.64 : r * 0.74;
      const r1 = r * 0.86;
      g.beginPath();
      g.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
      g.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      g.strokeStyle = i === 0 ? "#DD3428" : "#18191E";
      g.lineWidth = i % 3 === 0 ? 7 : 4;
      g.stroke();
    }
  });
  const face = new THREE.Mesh(
    new THREE.CircleGeometry(radius * 0.84, 24),
    kit.toon("#FFFFFF", { map: faceTex })
  );
  face.position.z = 0.125;
  group.add(face);

  // Glowing resonance core ring at center
  const coreMat = kit.toon(color, { emissive: "#000000" });
  const corePin = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.05, 12), coreMat);
  corePin.rotation.x = Math.PI / 2;
  corePin.position.z = 0.145;
  group.add(corePin);

  // Primary time hand
  const handPivot = new THREE.Group();
  handPivot.position.z = 0.15;
  group.add(handPivot);
  const handMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.055, radius * 0.64, 0.03),
    kit.toon("#18191E")
  );
  handMesh.position.y = radius * 0.24;
  handPivot.add(handMesh);

  // Bias comparison ghost hand (#DD3428) showing offset when receiver runs ahead/behind
  const biasPivot = new THREE.Group();
  biasPivot.position.z = 0.165;
  biasPivot.visible = false;
  group.add(biasPivot);
  const biasMat = kit.toon("#DD3428", { emissive: "#DD3428" });
  biasMat.emissiveIntensity = 0.25;
  const biasMesh = new THREE.Mesh(new THREE.BoxGeometry(0.04, radius * 0.58, 0.025), biasMat);
  biasMesh.position.y = radius * 0.22;
  biasPivot.add(biasMesh);

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
    face: anchor("face", [0, 0, 0.16]),
    handTip: anchor("handTip", [0, radius * 0.55, 0.16]),
    core: anchor("core", [0, 0, 0.15]),
  };

  const baseCol = new THREE.Color(color);
  const dark = new THREE.Color("#000000");

  function update(t, state = {}) {
    const speed = state.speed ?? 0.7;
    const angle = (state.time ?? t) * speed;
    handPivot.rotation.z = -angle;

    const bias = state.bias ?? 0;
    const showBias = Math.abs(bias) > 0.02;
    biasPivot.visible = showBias;
    if (showBias) {
      biasPivot.rotation.z = -(angle + bias);
    }

    bezelGroup.rotation.z = -(state.knob ?? 0);

    const pulse = kit.clamp01(state.pulse ?? 0);
    bezelMat.emissive.copy(dark).lerp(baseCol, pulse * 0.4);
    coreMat.emissive.copy(dark).lerp(baseCol, pulse * 0.65);
  }

  update(0);
  return { group, hero: [casing], anchors, update };
}
