// pedestrian: original minimalist geometric toon3d pedestrian in dark clothing.
// Pure-of-time walk gait, laser hit highlight, deterministic #2D884E point-cloud cluster,
// and #DD3428 bounding box + velocity track arrow.
// Origin at floor level [0, 0, 0] between feet; faces +z.
export function pedestrian(kit, opts = {}) {
  const { THREE } = kit;
  const {
    jacketColor = "#252936",
    trouserColor = "#34394A",
    skinColor = "#E8C8A8",
    shoeColor = "#D6D2C7",
    cloudColor = "#2D884E",
    alertColor = "#DD3428",
    hitColor = "#F08A4B",
    walkSpeed = 1.2,
    phaseOffset = 0,
  } = opts;

  const group = new THREE.Group();
  group.name = "pedestrian";

  const flat = (m) => {
    m.flatShading = true;
    return m;
  };
  const box = (w, h, d, material, x, y, z, parent) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  const jacketMat = flat(kit.toon(jacketColor));
  const collarMat = flat(kit.toon("#4C5266"));
  const trouserMat = flat(kit.toon(trouserColor));
  const skinMat = flat(kit.toon(skinColor));
  const hairMat = flat(kit.toon("#20222B"));
  const eyeMat = flat(kit.toon("#18191E"));
  const shoeMat = flat(kit.toon(shoeColor));
  const alertMat = flat(kit.toon(alertColor, { emissive: alertColor }));
  alertMat.emissiveIntensity = 0.2;

  const solidGroup = new THREE.Group();
  group.add(solidGroup);

  const hipsGroup = new THREE.Group();
  hipsGroup.position.set(0, 0.88, 0);
  solidGroup.add(hipsGroup);

  // Pelvis & Torso
  box(0.38, 0.14, 0.24, trouserMat, 0, 0, 0, hipsGroup);
  const torsoGroup = new THREE.Group();
  torsoGroup.position.set(0, 0.06, 0);
  hipsGroup.add(torsoGroup);

  box(0.42, 0.52, 0.26, jacketMat, 0, 0.26, 0, torsoGroup);
  box(0.24, 0.07, 0.28, collarMat, 0, 0.49, 0.01, torsoGroup);

  // Head & hair (seated solidly into torso with no floating neck gap or forehead z-fighting)
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.55, 0);
  torsoGroup.add(headGroup);

  box(0.12, 0.14, 0.12, skinMat, 0, 0.01, 0, headGroup);
  box(0.27, 0.27, 0.27, skinMat, 0, 0.19, 0, headGroup);
  box(0.3, 0.11, 0.31, hairMat, 0, 0.31, -0.01, headGroup);
  box(0.3, 0.18, 0.09, hairMat, 0, 0.2, -0.115, headGroup);
  box(0.036, 0.042, 0.025, eyeMat, -0.06, 0.19, 0.142, headGroup);
  box(0.036, 0.042, 0.025, eyeMat, 0.06, 0.19, 0.142, headGroup);

  // Articulated arms
  const makeArm = (side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.28, 0.46, 0);
    torsoGroup.add(pivot);
    box(0.12, 0.42, 0.13, jacketMat, 0, -0.2, 0, pivot);
    box(0.1, 0.1, 0.1, skinMat, 0, -0.45, 0, pivot);
    return pivot;
  };
  const leftArm = makeArm(-1);
  const rightArm = makeArm(1);

  // Articulated legs (pivoted at hip y = 0.84)
  const makeLeg = (side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.11, 0, 0);
    hipsGroup.add(pivot);
    box(0.15, 0.72, 0.16, trouserMat, 0, -0.38, 0, pivot);
    box(0.16, 0.11, 0.24, shoeMat, 0, -0.78, 0.04, pivot);
    return pivot;
  };
  const leftLeg = makeLeg(-1);
  const rightLeg = makeLeg(1);

  // Laser hit highlight disc (noInk so it glows cleanly)
  const hitMat = new THREE.MeshBasicMaterial({
    color: hitColor,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const hitRing = new THREE.Mesh(new THREE.RingGeometry(0.08, 0.15, 16), hitMat);
  hitRing.position.set(0, 1.16, 0.16);
  hitRing.userData.noInk = true;
  hitRing.visible = false;
  group.add(hitRing);

  const hitCore = new THREE.Mesh(new THREE.CircleGeometry(0.07, 14), hitMat);
  hitCore.position.z = 0.005;
  hitCore.userData.noInk = true;
  hitRing.add(hitCore);

  // Deterministic #2D884E point-cloud cluster across pedestrian silhouette
  const CLOUD_COUNT = 136;
  const ptGeo = new THREE.IcosahedronGeometry(0.032, 0);
  const ptMat = kit.toon(cloudColor, { emissive: cloudColor });
  ptMat.emissiveIntensity = 0.28;
  const cloudMesh = new THREE.InstancedMesh(ptGeo, ptMat, CLOUD_COUNT);
  cloudMesh.userData.noInk = true;
  cloudMesh.visible = false;
  group.add(cloudMesh);

  const next = kit.rand(101);
  const dummy = new THREE.Object3D();
  const sampleRegions = [
    { count: 24, cx: 0, cy: 1.62, cz: 0, rx: 0.15, ry: 0.15, rz: 0.15 }, // head
    { count: 48, cx: 0, cy: 1.18, cz: 0, rx: 0.22, ry: 0.26, rz: 0.14 }, // torso
    { count: 16, cx: -0.28, cy: 1.14, cz: 0, rx: 0.07, ry: 0.24, rz: 0.07 }, // left arm
    { count: 16, cx: 0.28, cy: 1.14, cz: 0, rx: 0.07, ry: 0.24, rz: 0.07 }, // right arm
    { count: 16, cx: -0.11, cy: 0.45, cz: 0, rx: 0.08, ry: 0.4, rz: 0.09 }, // left leg
    { count: 16, cx: 0.11, cy: 0.45, cz: 0, rx: 0.08, ry: 0.4, rz: 0.09 }, // right leg
  ];
  let idx = 0;
  for (const reg of sampleRegions) {
    for (let k = 0; k < reg.count; k++) {
      const px = reg.cx + (next() * 2 - 1) * reg.rx;
      const py = reg.cy + (next() * 2 - 1) * reg.ry;
      const pz = reg.cz + (next() * 2 - 1) * reg.rz;
      dummy.position.set(px, py, pz);
      dummy.scale.setScalar(0.8 + next() * 0.45);
      dummy.updateMatrix();
      cloudMesh.setMatrixAt(idx++, dummy.matrix);
    }
  }
  cloudMesh.instanceMatrix.needsUpdate = true;

  // Obstacle & alert bounding box (#DD3428)
  const bboxGroup = new THREE.Group();
  bboxGroup.visible = false;
  group.add(bboxGroup);
  const bw = 0.76, bh = 1.84, bd = 0.64, bt = 0.036;
  const bar = (w, h, d, x, y, z) => box(w, h, d, alertMat, x, y, z, bboxGroup);
  for (const sx of [-bw / 2, bw / 2]) {
    for (const sy of [0.02, bh]) bar(bt, bt, bd, sx, sy, 0);
    for (const sz of [-bd / 2, bd / 2]) bar(bt, bh, bt, sx, bh / 2, sz);
  }
  for (const sy of [0.02, bh]) {
    for (const sz of [-bd / 2, bd / 2]) bar(bw, bt, bt, 0, sy, sz);
  }

  // Forward velocity / direction arrow (#DD3428) for classify_track
  const trackArrowGroup = new THREE.Group();
  trackArrowGroup.position.set(0, 1.05, 0.48);
  trackArrowGroup.visible = false;
  group.add(trackArrowGroup);
  box(0.06, 0.06, 0.56, alertMat, 0, 0, 0.28, trackArrowGroup);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.22, 6), alertMat);
  tip.rotation.x = Math.PI / 2;
  tip.position.z = 0.64;
  trackArrowGroup.add(tip);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };

  const anchors = {
    head: anchor("head", [0, 1.72, 0]),
    torso: anchor("torso", [0, 1.18, 0.14]),
    feet: anchor("feet", [0, 0.08, 0]),
    bboxTop: anchor("bboxTop", [0, bh + 0.08, 0]),
  };

  function update(t, state = {}) {
    const speed = state.walkSpeed ?? walkSpeed;
    const phase = t * speed * Math.PI * 2 + phaseOffset;
    const swing = speed > 0 ? Math.sin(phase) : 0;
    const bob = speed > 0 ? Math.abs(Math.sin(phase)) * 0.032 : 0;

    hipsGroup.position.y = 0.88 + bob;
    torsoGroup.rotation.y = swing * 0.08;
    leftLeg.rotation.x = swing * 0.46;
    rightLeg.rotation.x = -swing * 0.46;
    leftArm.rotation.x = -swing * 0.36;
    rightArm.rotation.x = swing * 0.36;

    const solid = kit.clamp01(state.solid ?? 1);
    solidGroup.visible = solid > 0.05;
    if (solidGroup.visible) solidGroup.scale.setScalar(0.85 + 0.15 * solid);

    const hit = kit.clamp01(state.hit ?? 0);
    hitRing.visible = hit > 0.02;
    if (hitRing.visible) {
      hitRing.position.y = state.hitY ?? 1.16;
      hitRing.scale.setScalar(0.6 + 0.65 * hit);
      hitMat.opacity = 0.88 * hit;
    }

    const pc = kit.clamp01(state.pointCloud ?? 0);
    cloudMesh.visible = pc > 0.02;
    if (cloudMesh.visible) {
      cloudMesh.scale.setScalar(0.92 + 0.08 * pc);
    }

    const bb = kit.clamp01(state.bbox ?? 0);
    bboxGroup.visible = bb > 0.02;
    if (bboxGroup.visible) bboxGroup.scale.setScalar(0.96 + 0.04 * bb);

    const ta = kit.clamp01(state.trackArrow ?? 0);
    trackArrowGroup.visible = ta > 0.02;
    if (trackArrowGroup.visible) trackArrowGroup.scale.setScalar(ta);
  }

  update(0);
  return { group, hero: [solidGroup, cloudMesh], anchors, update };
}
