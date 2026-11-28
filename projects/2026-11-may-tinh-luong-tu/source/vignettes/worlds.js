// Shared worlds and small procedural props for EP13. Not a vignette: no id in vignettes.json names it.
// lab: the classical-vs-quantum desk (hook, classical_bit, not_always_faster, payoff_conclusion).
// quantum: the qubit bench (qubit_intro to interference).
// apps: the applications yard (grover_search to nisq_limits).
// Consecutive vignettes stand on alternate spots A and B, so the outgoing and incoming sets never overlap in a flight.
// Fixed colour roles (STORYBOARD.md): classical bit, superposition, entanglement link, measurement result.
export const C = { bit: "#5B7DB1", sup: "#9B5DE5", ent: "#F5B942", res: "#3DDC97", noise: "#DD3428", ink: "#1C1C20" };
export const A = [-3.2, 0, 0];
export const B = [3.2, 0, 0];

export const labWorld = kit => ({ scene: kit.stage({ yard: 10, clear: 6, seed: 11 }) });
export const quantumWorld = kit => ({ scene: kit.stage({ yard: 10, clear: 6, seed: 23 }) });
export const appsWorld = kit => ({ scene: kit.stage({ yard: 10, clear: 6, seed: 37 }) });

// A camera pose relative to a set centre c.
export const at = (c, pos, look, fov = 40) => ({ pos: pos.map((v, i) => v + c[i]), look: look.map((v, i) => v + c[i]), fov });

// A box mesh added to parent.
export function box(kit, parent, [w, h, d], color, [x = 0, y = 0, z = 0] = []) {
  const m = new kit.THREE.Mesh(new kit.THREE.BoxGeometry(w, h, d), kit.toon(color));
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

// A bar of height 1 that grows up from its base: set scale.y to its height.
export function bar(kit, parent, [w, d], color, [x = 0, y = 0, z = 0] = []) {
  const geo = new kit.THREE.BoxGeometry(w, 1, d);
  geo.translate(0, 0.5, 0);
  const m = new kit.THREE.Mesh(geo, kit.toon(color));
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

// A block with text printed flat on its front face. Returns a Group; call kit.ink on the set afterwards.
export function tile(kit, text, { w = 0.5, h = 0.5, d = 0.12, color = C.bit, fg = "#FFFFFF", px = 0.62 } = {}) {
  const { THREE } = kit;
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), kit.toon(color));
  g.add(body);
  const cw = 256, ch = Math.max(64, Math.round(256 * h / w));
  const tex = kit.canvasTexture(cw, ch, (ctx, cw2, ch2) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, cw2, ch2);
    ctx.fillStyle = fg;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const lines = String(text).split("\n");
    const size = Math.min(ch2 * px / lines.length, cw2 * 1.6 / Math.max(...lines.map(l => l.length + 1)));
    ctx.font = "800 " + Math.round(size) + 'px "Be Vietnam Pro", sans-serif';
    lines.forEach((l, i) => ctx.fillText(l, cw2 / 2, ch2 / 2 + (i - (lines.length - 1) / 2) * size * 1.1));
  });
  const face = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.96, h * 0.96), new THREE.MeshBasicMaterial({ map: tex }));
  face.position.z = d / 2 + 0.004;
  face.userData.noInk = true;
  g.add(face);
  g.userData.body = body;
  return g;
}

// An arrow along +x of length len, base at the origin.
export function arrow(kit, parent, len, color, thick = 0.06) {
  const { THREE } = kit;
  const g = new THREE.Group();
  const mat = kit.toon(color);
  const shaft = new THREE.Mesh(new THREE.BoxGeometry(len - 0.22, thick, thick), mat);
  shaft.position.x = (len - 0.22) / 2;
  const head = new THREE.Mesh(new THREE.ConeGeometry(thick * 2.4, 0.24, 10), mat);
  head.rotation.z = -Math.PI / 2;
  head.position.x = len - 0.12;
  g.add(shaft, head);
  parent.add(g);
  return g;
}

// A classical laptop in the bit colour; its screen shows a text page and a small game grid.
export function laptop(kit) {
  const { THREE } = kit;
  const g = new THREE.Group();
  box(kit, g, [1.7, 0.12, 1.15], C.bit, [0, 0.06, 0]);
  box(kit, g, [1.42, 0.03, 0.65], "#D8DCE6", [0, 0.13, 0.08]);
  const lid = new THREE.Group();
  lid.position.set(0, 0.1, -0.56);
  lid.rotation.x = -0.14;
  box(kit, lid, [1.7, 1.1, 0.09], C.bit, [0, 0.55, 0]);
  const tex = kit.canvasTexture(256, 160, (ctx, w, h) => {
    ctx.fillStyle = "#1E2638";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#E6E6E1";
    [44, 64, 84, 104].forEach((y, i) => ctx.fillRect(16, y, 150 - i * 12, 10));
    ctx.fillStyle = C.bit;
    ctx.fillRect(16, 18, 96, 14);
    [[184, 42, C.res], [212, 70, "#FCD53E"], [184, 98, C.noise]].forEach(([x, y, c]) => { ctx.fillStyle = c; ctx.fillRect(x, y, 22, 22); });
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.9), new THREE.MeshBasicMaterial({ map: tex }));
  screen.position.set(0, 0.55, 0.05);
  screen.userData.noInk = true;
  lid.add(screen);
  g.add(lid);
  return g;
}

// sycamore_molecule ends on this pose and nisq_limits starts on it with the same chip (light transition, no camera move).
export const SYC_END = at(A, [0.1, 2.6, 9.0], [0.1, 1.0, 0]);
export const syc = { chipPos: [0.9, 0, 0.5], chipScale: 0.7 };
