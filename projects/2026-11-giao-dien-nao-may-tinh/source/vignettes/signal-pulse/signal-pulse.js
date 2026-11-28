// signal-pulse: toon3d GPS radio signal stream in fixed #00B4D8 with #FCD53E time-code tag,
// PRN code pattern mode, atmospheric slowdown, and #DD3428 wall-block state.
// Propagates along +z from origin [0, 0, 0] to z = length (easy to aim with lookAt).
export function signalPulse(kit, opts = {}) {
  const { THREE } = kit;
  const {
    mode = "beam",
    length = 3.6,
    color = "#00B4D8",
    codeColor = "#FCD53E",
    errorColor = "#DD3428",
    prnIndex = 0,
  } = opts;

  const group = new THREE.Group();
  group.name = "signal-pulse-" + mode;

  const waveItems = [];
  let guideMat = null;

  if (mode === "rings") {
    for (let i = 0; i < 4; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.028, 8, 28), mat);
      ring.userData.noInk = true;
      group.add(ring);
      waveItems.push({ mesh: ring, mat, idx: i });
    }
  } else {
    guideMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    });
    const guide = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, length, 8), guideMat);
    guide.rotation.x = Math.PI / 2;
    guide.position.z = length / 2;
    guide.userData.noInk = true;
    group.add(guide);

    const count = 6;
    const prnPatterns = [
      [1, 0.65, 1],
      [0.65, 1, 0.65],
      [1, 1, 0.6],
    ];
    const pat = prnPatterns[Math.abs(prnIndex) % prnPatterns.length];

    for (let i = 0; i < count; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      });
      const pulse = new THREE.Group();
      if (mode === "prn") {
        // Distinct 3-bar code chip along the stream
        for (let b = 0; b < 3; b++) {
          const h = 0.065 * pat[b];
          const bar = new THREE.Mesh(new THREE.BoxGeometry(0.08, h, 0.04), mat);
          bar.position.set((b - 1) * 0.095, 0, 0);
          bar.userData.noInk = true;
          pulse.add(bar);
        }
      } else {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.022, 6, 18), mat);
        ring.userData.noInk = true;
        pulse.add(ring);
      }
      group.add(pulse);
      waveItems.push({ mesh: pulse, mat, idx: i });
    }
  }

  // Inked solid #FCD53E time-code packet + orbit-data tag riding the stream
  const packetGroup = new THREE.Group();
  packetGroup.position.set(0, 0, length * 0.5);
  group.add(packetGroup);

  const timeTag = new THREE.Group();
  packetGroup.add(timeTag);
  const tagMat = kit.toon(codeColor, { emissive: codeColor });
  tagMat.emissiveIntensity = 0.25;
  const tagBox = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.16), tagMat);
  timeTag.add(tagBox);
  const tagFace = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.17, 12), kit.toon("#FAFCFB"));
  tagFace.rotation.x = Math.PI / 2;
  timeTag.add(tagFace);

  const orbitTag = new THREE.Group();
  orbitTag.position.set(0, 0.22, 0);
  orbitTag.visible = false;
  packetGroup.add(orbitTag);
  const orbPlate = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.08), kit.toon("#FAFCFB"));
  const orbArc = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.014, 6, 14, Math.PI * 1.4), kit.toon(color));
  orbArc.position.z = 0.06;
  orbitTag.add(orbPlate, orbArc);

  // Blocked error X-ring (#DD3428)
  const blockGroup = new THREE.Group();
  blockGroup.visible = false;
  group.add(blockGroup);
  const errMat = kit.toon(errorColor, { emissive: errorColor });
  errMat.emissiveIntensity = 0.3;
  const blockRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.028, 6, 18), errMat);
  const barA = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.045, 0.045), errMat);
  barA.rotation.z = Math.PI / 4;
  const barB = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.045, 0.045), errMat);
  barB.rotation.z = -Math.PI / 4;
  blockGroup.add(blockRing, barA, barB);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    start: anchor("start", [0, 0, 0]),
    mid: anchor("mid", [0, 0, length * 0.5]),
    end: anchor("end", [0, 0, length]),
    packet: packetGroup,
  };

  function update(t, state = {}) {
    const active = kit.clamp01(state.active ?? 1);
    const prog = kit.clamp01(state.progress ?? 1);
    const blocked = kit.clamp01(state.blocked ?? 0);
    const blockAt = kit.clamp01(state.blockAt ?? 0.62);
    const speedFactor = state.speedFactor ?? 1;
    const flow = state.flow ?? 1;

    group.visible = active > 0.01 && prog > 0.01;
    if (!group.visible) return;

    const maxFrac = blocked > 0.05 ? Math.min(prog, blockAt) : prog;

    if (guideMat) {
      guideMat.opacity = 0.32 * active * (blocked > 0.05 ? 0.65 : 1);
    }

    for (const { mesh, mat, idx } of waveItems) {
      const n = waveItems.length;
      const u = (((t * 0.55 * speedFactor * flow + idx / n) % 1) + 1) % 1;
      if (mode === "rings") {
        const s = 0.35 + u * 1.45;
        mesh.scale.setScalar(s);
        mesh.position.z = u * length * prog;
        mat.opacity = active * Math.sin(u * Math.PI) * 0.9;
      } else {
        const zFrac = u * maxFrac;
        mesh.position.z = zFrac * length;
        const fade = Math.sin(u * Math.PI);
        mat.opacity = active * fade * 0.92;
        mesh.scale.setScalar(0.8 + 0.3 * fade);
      }
    }

    const tc = kit.clamp01(state.showTimeCode ?? 0);
    const oc = kit.clamp01(state.showOrbitTag ?? 0);
    timeTag.visible = tc > 0.02;
    orbitTag.visible = oc > 0.02;
    if (timeTag.visible || orbitTag.visible) {
      const pu = (((t * 0.32 * speedFactor * flow + 0.35) % 1) + 1) % 1;
      packetGroup.position.z = pu * maxFrac * length;
      timeTag.scale.setScalar(Math.max(0.01, tc));
      orbitTag.scale.setScalar(Math.max(0.01, oc));
    }

    blockGroup.visible = blocked > 0.05;
    if (blockGroup.visible) {
      blockGroup.position.z = blockAt * length;
      blockGroup.scale.setScalar(0.75 + 0.35 * blocked);
    }
  }

  update(0);
  return { group, hero: [packetGroup], anchors, update };
}
