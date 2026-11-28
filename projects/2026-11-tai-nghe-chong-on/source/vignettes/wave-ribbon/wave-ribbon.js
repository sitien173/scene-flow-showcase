// wave-ribbon: toon3d segmented 3D sinusoidal wave ribbon with adjustable phase, amplitude,
// frequency, irregularity, travel speed, and role colour (noise #DD3428, antiphase #2D884E, residual #9F88A5).
// Origin at centre; wave spans along x from -length/2 to +length/2.
export function waveRibbon(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const {
    length = 4.0,
    amp = 0.45,
    freq = 2.0,
    phase = 0,
    speed = 4.0,
    irregular = 0,
    color = PALETTE.accent,
    count = 32,
    thickness = 0.08,
  } = opts;

  const group = new THREE.Group();
  group.name = "wave-ribbon";
  const flat = m => { m.flatShading = true; return m; };
  const mat = flat(kit.toon(color));

  const segW = (length / count) * 1.15;
  const segGeo = new THREE.BoxGeometry(segW, thickness * 1.6, thickness * 1.8);
  const segs = [];
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(segGeo, mat);
    group.add(m);
    segs.push(m);
  }

  // Subtle baseline axis
  const axisMat = flat(kit.toon(PALETTE.ink));
  const axis = new THREE.Mesh(new THREE.BoxGeometry(length, 0.02, 0.02), axisMat);
  group.add(axis);

  kit.ink(group);

  const anchor = (name, p) => {
    const o = new THREE.Object3D();
    o.name = name;
    o.position.set(...p);
    group.add(o);
    return o;
  };
  const anchors = {
    center: anchor("center", [0, 0.45, 0]),
    left: anchor("left", [-length * 0.4, 0.25, 0]),
    right: anchor("right", [length * 0.4, 0.25, 0]),
    crest: anchor("crest", [0, amp, 0]),
  };

  function update(t, state = {}) {
    const A = state.amp ?? amp;
    const F = state.freq ?? freq;
    const P = state.phase ?? phase;
    const S = state.speed ?? speed;
    const irr = kit.clamp01(state.irregular ?? irregular);
    const rev = kit.clamp01(state.reveal ?? 1);
    if (state.color) mat.color.set(state.color);

    const evalY = xNorm => {
      const base = Math.sin(xNorm * F * Math.PI * 2 - t * S + P);
      const jitter = irr * 0.55 * (
        Math.sin(xNorm * 5.7 * Math.PI * 2 - t * S * 1.6 + 1.1) +
        0.5 * Math.cos(xNorm * 9.3 * Math.PI * 2 + t * S * 0.8)
      );
      return A * (base + jitter);
    };

    for (let i = 0; i < count; i++) {
      const u = i / (count - 1);
      const visible = u <= rev;
      segs[i].visible = visible;
      if (!visible) continue;
      const x = (u - 0.5) * length;
      const y = evalY(u);
      const dy = evalY(u + 0.01) - evalY(u - 0.01);
      const dx = 0.02 * length;
      segs[i].position.set(x, y, 0);
      segs[i].rotation.z = Math.atan2(dy, dx);
    }
    axis.scale.x = Math.max(0.01, rev);
  }

  update(0);
  return { group, hero: segs, anchors, update };
}
