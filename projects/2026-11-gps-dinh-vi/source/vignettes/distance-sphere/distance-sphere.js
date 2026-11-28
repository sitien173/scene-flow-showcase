// distance-sphere: toon3d distance sphere in fixed #F08A4B with meridian hoops,
// pseudorange bias delta shell, highlighted intersection circle, and intersection points.
// Origin at sphere centre [0, 0, 0] (centred on the satellite).
export function distanceSphere(kit, opts = {}) {
  const { THREE } = kit;
  const {
    radius = 2.2,
    color = "#F08A4B",
    errorColor = "#DD3428",
  } = opts;

  const group = new THREE.Group();
  group.name = "distance-sphere";

  const sphereGroup = new THREE.Group();
  group.add(sphereGroup);

  // Translucent distance shell
  const shellMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const shell = new THREE.Mesh(new THREE.SphereGeometry(radius, 28, 18), shellMat);
  shell.userData.noInk = true;
  sphereGroup.add(shell);

  // Crisp orthogonal meridian & equator hoops
  const hoopMat = kit.toon(color, { emissive: color });
  hoopMat.emissiveIntensity = 0.22;
  hoopMat.transparent = true;
  hoopMat.opacity = 0.9;

  const makeHoop = (rx, ry) => {
    const h = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.022, 6, 48), hoopMat);
    h.rotation.set(rx, ry, 0);
    sphereGroup.add(h);
    return h;
  };
  const h1 = makeHoop(Math.PI / 2, 0);
  const h2 = makeHoop(0, 0);
  const h3 = makeHoop(0, Math.PI / 2);

  // Pseudorange bias delta ring (visible when bias != 0)
  const biasMat = new THREE.MeshBasicMaterial({
    color: errorColor,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const biasRing = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.032, 6, 48), biasMat);
  biasRing.rotation.x = Math.PI / 2;
  biasRing.userData.noInk = true;
  biasRing.visible = false;
  group.add(biasRing);

  // Highlighted intersection circle & 2 candidate point markers
  const interGroup = new THREE.Group();
  interGroup.visible = false;
  group.add(interGroup);

  const interMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
  });
  const interRing = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.62, 0.036, 8, 40), interMat);
  interRing.userData.noInk = true;
  interGroup.add(interRing);

  const ptMat = kit.toon("#FCD53E", { emissive: "#FCD53E" });
  ptMat.emissiveIntensity = 0.35;
  const ptA = new THREE.Mesh(new THREE.IcosahedronGeometry(0.085, 1), ptMat);
  const ptB = new THREE.Mesh(new THREE.IcosahedronGeometry(0.085, 1), ptMat);
  ptA.position.set(radius * 0.62, 0, 0);
  ptB.position.set(-radius * 0.62, 0, 0);
  ptA.visible = false;
  ptB.visible = false;
  interGroup.add(ptA, ptB);

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
    rim: anchor("rim", [radius, 0, 0]),
    intersect: anchor("intersect", [0, 0, radius * 0.62]),
  };

  function update(t, state = {}) {
    const op = kit.clamp01(state.opacity ?? 1);
    group.visible = op > 0.01;
    if (!group.visible) return;

    const rScale = Math.max(0.02, state.radiusScale ?? 1);
    const bias = state.bias ?? 0;
    const totalScale = Math.max(0.02, rScale + bias);

    sphereGroup.scale.setScalar(totalScale);
    sphereGroup.rotation.y = (state.spin ?? 0) * t * 0.18;

    shellMat.opacity = 0.14 * op;
    hoopMat.opacity = 0.9 * op;

    const hasBias = Math.abs(bias) > 0.02;
    biasRing.visible = hasBias;
    if (hasBias) {
      biasRing.scale.setScalar(rScale);
      biasMat.opacity = 0.55 * op;
    }

    const inter = kit.clamp01(state.intersect ?? 0);
    interGroup.visible = inter > 0.02;
    if (interGroup.visible) {
      const iScale = state.intersectScale ?? 1;
      interGroup.scale.setScalar(iScale);
      interMat.opacity = 0.95 * inter * op;
      const pts = kit.clamp01(state.points ?? 0);
      ptA.visible = pts > 0.02;
      ptB.visible = pts > 0.02;
      if (ptA.visible) {
        const ps = 0.8 + 0.35 * pts;
        ptA.scale.setScalar(ps);
        ptB.scale.setScalar(ps);
      }
    }
  }

  update(0);
  return { group, hero: [h1, h2, h3], anchors, update };
}
