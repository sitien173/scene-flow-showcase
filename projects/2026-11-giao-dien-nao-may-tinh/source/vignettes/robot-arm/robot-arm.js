// robot-arm: toon3d 3-DOF robotic manipulator with clevis-seated servo joints,
// switchable 2-jaw gripper or 5-finger prosthetic hand, and coffee bottle + bent straw prop.
// Origin at base centre (y = 0); arm extends cleanly in 3D space.
export function robotArm(kit, opts = {}) {
  const { THREE } = kit;
  const {
    bodyColor = "#E6E6E1",
    trimColor = "#4868C8",
    mode = "idle",
  } = opts;

  const group = new THREE.Group();
  group.name = "robot-arm";

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

  const darkMat = kit.toon("#2B2D38");
  const servoMat = kit.toon("#3A3F52");
  const bodyMat = kit.toon(bodyColor);
  const trimMat = kit.toon(trimColor);
  const ringMat = kit.toon("#E879F9", { emissive: "#000000" });

  // 1. Heavy pedestal base
  const baseGroup = new THREE.Group();
  baseGroup.name = "base";
  group.add(baseGroup);
  cyl(0.46, 0.52, 0.10, 12, darkMat, 0, 0.05, 0, baseGroup);
  cyl(0.36, 0.40, 0.08, 12, servoMat, 0, 0.14, 0, baseGroup);

  // 2. Rotating shoulder turret
  const turret = new THREE.Group();
  turret.name = "turret";
  turret.position.set(0, 0.18, 0);
  group.add(turret);
  cyl(0.28, 0.30, 0.14, 12, bodyMat, 0, 0.07, 0, turret);
  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.022, 6, 20), ringMat);
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.y = 0.08;
  turret.add(baseRing);

  // Clevis ears holding shoulder servo
  box(0.18, 0.24, 0.06, servoMat, 0, 0.22, -0.13, turret);
  box(0.18, 0.24, 0.06, servoMat, 0, 0.22, 0.13, turret);

  // 3. Shoulder pivot & upper arm
  const shoulderPivot = new THREE.Group();
  shoulderPivot.name = "shoulder";
  shoulderPivot.position.set(0, 0.28, 0);
  turret.add(shoulderPivot);

  const shDrum = cyl(0.14, 0.14, 0.24, 12, servoMat, 0, 0, 0, shoulderPivot);
  shDrum.rotation.x = Math.PI / 2;
  const upperArm = new THREE.Group();
  upperArm.name = "upper-arm";
  shoulderPivot.add(upperArm);
  box(0.20, 0.78, 0.18, bodyMat, 0, 0.39, 0, upperArm);
  box(0.21, 0.42, 0.06, trimMat, 0, 0.40, 0.08, upperArm);

  // 4. Elbow pivot & forearm
  const elbowPivot = new THREE.Group();
  elbowPivot.name = "elbow";
  elbowPivot.position.set(0, 0.78, 0);
  shoulderPivot.add(elbowPivot);

  const elDrum = cyl(0.125, 0.125, 0.22, 12, servoMat, 0, 0, 0, elbowPivot);
  elDrum.rotation.x = Math.PI / 2;
  const forearm = new THREE.Group();
  forearm.name = "forearm";
  elbowPivot.add(forearm);
  box(0.16, 0.66, 0.15, bodyMat, 0, 0.33, 0, forearm);
  box(0.06, 0.46, 0.17, trimMat, 0, 0.32, 0, forearm);

  // 5. Wrist pivot & command ring
  const wristPivot = new THREE.Group();
  wristPivot.name = "wrist";
  wristPivot.position.set(0, 0.66, 0);
  elbowPivot.add(wristPivot);

  const wrDrum = cyl(0.10, 0.10, 0.16, 10, servoMat, 0, 0, 0, wristPivot);
  wrDrum.rotation.x = Math.PI / 2;
  const wristRing = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.018, 6, 16), ringMat);
  wristRing.rotation.x = Math.PI / 2;
  wristRing.position.y = 0.09;
  wristPivot.add(wristRing);

  // 6A. Twin mechanical gripper jaws (default end-effector)
  const gripperGroup = new THREE.Group();
  gripperGroup.name = "gripper";
  gripperGroup.position.set(0, 0.10, 0);
  wristPivot.add(gripperGroup);

  box(0.22, 0.07, 0.14, darkMat, 0, 0.035, 0, gripperGroup);
  const jawLeft = new THREE.Group();
  jawLeft.position.set(-0.08, 0.07, 0);
  gripperGroup.add(jawLeft);
  box(0.04, 0.18, 0.08, bodyMat, 0, 0.09, 0, jawLeft);
  box(0.05, 0.09, 0.09, darkMat, 0.02, 0.15, 0, jawLeft);

  const jawRight = new THREE.Group();
  jawRight.position.set(0.08, 0.07, 0);
  gripperGroup.add(jawRight);
  box(0.04, 0.18, 0.08, bodyMat, 0, 0.09, 0, jawRight);
  box(0.05, 0.09, 0.09, darkMat, -0.02, 0.15, 0, jawRight);

  // 6B. 5-finger prosthetic hand end-effector (for prostheticHand mode)
  const handGroup = new THREE.Group();
  handGroup.name = "prosthetic-hand";
  handGroup.position.set(0, 0.10, 0);
  handGroup.visible = false;
  wristPivot.add(handGroup);

  box(0.26, 0.22, 0.09, bodyMat, 0, 0.11, 0, handGroup);
  box(0.22, 0.12, 0.10, trimMat, 0, 0.10, 0, handGroup);
  const fingers = [];
  for (let i = 0; i < 4; i++) {
    const base = new THREE.Group();
    base.position.set(-0.09 + i * 0.06, 0.22, 0);
    handGroup.add(base);
    box(0.042, 0.11, 0.045, bodyMat, 0, 0.055, 0, base);
    const tip = new THREE.Group();
    tip.position.set(0, 0.11, 0);
    base.add(tip);
    box(0.036, 0.095, 0.04, darkMat, 0, 0.047, 0, tip);
    fingers.push({ base, tip });
  }
  const thumb = new THREE.Group();
  thumb.position.set(0.14, 0.09, 0.03);
  thumb.rotation.z = -0.55;
  handGroup.add(thumb);
  box(0.045, 0.13, 0.045, darkMat, 0, 0.065, 0, thumb);

  // 7. Coffee bottle + bent straw prop (co-located inside gripper grasp during graspBottle)
  const makeBottle = () => {
    const b = new THREE.Group();
    const coffeeMat = kit.toon("#5C3A21");
    const labelMat = kit.toon("#FAFCFB");
    const capMat = kit.toon("#2B2D38");
    const strawMat = kit.toon("#F59E0B");
    cyl(0.085, 0.085, 0.28, 12, coffeeMat, 0, 0, 0, b);
    cyl(0.088, 0.088, 0.11, 12, labelMat, 0, 0.01, 0, b);
    cyl(0.05, 0.075, 0.06, 10, capMat, 0, 0.16, 0, b);
    const strawPts = [
      new THREE.Vector3(0, 0.17, 0),
      new THREE.Vector3(0, 0.30, 0),
      new THREE.Vector3(0.08, 0.35, 0.04),
    ];
    const sMesh = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(strawPts), 12, 0.014, 6, false),
      strawMat
    );
    b.add(sMesh);
    const sCap = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 5), strawMat);
    sCap.position.copy(strawPts[2]);
    b.add(sCap);
    return b;
  };
  const heldBottle = makeBottle();
  heldBottle.name = "coffee-bottle";
  heldBottle.position.set(0, 0.22, 0);
  heldBottle.rotation.x = Math.PI / 2;
  heldBottle.visible = false;
  gripperGroup.add(heldBottle);

  kit.ink(group);

  const anchor = (name, p, parent = group) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    parent.add(o);
    return o;
  };
  const anchors = {
    body: anchor("body", [0, 0.95, 0]),
    base: anchor("base", [0, 0.12, 0]),
    shoulder: anchor("shoulder", [0, 0.46, 0]),
    elbow: anchor("elbow", [0, 0, 0], elbowPivot),
    wrist: anchor("wrist", [0, 0, 0], wristPivot),
    gripper: anchor("gripper", [0, 0.16, 0], gripperGroup),
    bottle: anchor("bottle", [0, 0, 0], heldBottle),
    hand: anchor("hand", [0, 0.18, 0], handGroup),
  };

  const colDark = new THREE.Color("#000000");
  const colCmd = new THREE.Color("#E879F9");
  const colCalib = new THREE.Color("#F59E0B");
  const colGood = new THREE.Color("#2D884E");
  const colIdle = new THREE.Color("#525B72");

  function update(t, state = {}) {
    const m = state.mode ?? mode;
    const isHand = m === "prostheticHand";
    const isBottle = m === "graspBottle" || Boolean(state.showBottle);
    const isCalib = m === "calibrateMotion";
    const isReach = m === "reach3d";

    gripperGroup.visible = !isHand;
    handGroup.visible = isHand;
    heldBottle.visible = !isHand && isBottle;

    let yaw = 0;
    let shP = -0.35;
    let elP = -0.75;
    let wrP = -0.35;
    let grip = 0.25;
    let handOpen = 1.0;

    if (isCalib) {
      yaw = 0.55 * Math.sin(t * 1.6);
      shP = -0.35 + 0.25 * Math.sin(t * 2.1);
      elP = -0.78 + 0.30 * Math.cos(t * 2.1);
      wrP = -0.25 + 0.2 * Math.sin(t * 2.1);
    } else if (isReach) {
      yaw = 0.65 * Math.sin(t * 1.4);
      shP = -0.45 + 0.28 * Math.sin(t * 2.2);
      elP = -0.70 + 0.35 * Math.sin(t * 1.7 + 0.7);
      wrP = -0.20;
      grip = 0.5 + 0.5 * Math.sin(t * 3.0);
    } else if (isBottle) {
      // Smooth 3D lift & straw-tilt cycle toward drink target
      const lift = 0.5 + 0.5 * Math.sin(t * 1.5 - Math.PI / 2);
      yaw = kit.lerp(-0.45, 0.15, lift);
      shP = kit.lerp(-0.62, -0.18, lift);
      elP = kit.lerp(-0.85, -0.55, lift);
      wrP = kit.lerp(-0.10, -0.58, lift);
      grip = 0.85;
    } else if (isHand) {
      yaw = 0.15 * Math.sin(t * 0.9);
      shP = -0.22;
      elP = -0.42;
      wrP = -0.12;
      handOpen = 0.5 + 0.5 * Math.sin(t * 2.8);
    } else {
      // idle
      yaw = 0.08 * Math.sin(t * 0.8);
      shP = -0.30;
      elP = -0.68;
      wrP = -0.30;
      grip = 0.25;
    }

    turret.rotation.y = state.baseYaw ?? yaw;
    shoulderPivot.rotation.z = state.shoulderPitch ?? shP;
    elbowPivot.rotation.z = state.elbowPitch ?? elP;
    wristPivot.rotation.z = state.wristPitch ?? wrP;

    const gVal = kit.clamp01(state.grip ?? grip);
    const jawOffset = kit.lerp(0.11, 0.068, gVal);
    jawLeft.position.x = -jawOffset;
    jawRight.position.x = jawOffset;

    if (isHand) {
      const hOpen = kit.clamp01(state.handOpen ?? handOpen);
      const curl = (1 - hOpen) * 1.15;
      fingers.forEach((f, i) => {
        f.base.rotation.x = curl * (0.85 + i * 0.05);
        f.tip.rotation.x = curl * 0.95;
      });
      thumb.rotation.x = curl * 0.75;
    }

    const hit = kit.clamp01(state.targetHit ?? 0);
    const activeCol = hit > 0.3 ? colGood : isCalib ? colCalib : (m === "idle" ? colIdle : colCmd);
    const em = m === "idle" ? 0.1 : 0.45 + 0.25 * (0.5 + 0.5 * Math.sin(t * 4.2));
    ringMat.color.copy(activeCol);
    ringMat.emissive.copy(colDark).lerp(activeCol, em);
  }

  update(0);
  return { group, hero: [baseGroup, turret, upperArm, forearm, gripperGroup, handGroup], anchors, update };
}
