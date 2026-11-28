// A generic terminal, not an optical repeater. X axis connects electrical and optical sides.
export function transceiver(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const group = new THREE.Group();
  group.name = 'transceiver';
  const box = (name, size, pos, color) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), kit.toon(color));
    mesh.name = name;
    mesh.position.set(...pos);
    group.add(mesh);
    return mesh;
  };
  box('housing', [2.6, 1.1, 1.3], [0, 0, 0], PALETTE.card);
  box('electrical-port', [0.55, 0.45, 0.12], [-0.75, 0, 0.68], PALETTE.good);
  box('optical-port', [0.55, 0.45, 0.12], [0.75, 0, 0.68], PALETTE.highlight);
  const flow = new THREE.Group();
  flow.name = 'flow-direction';
  group.add(flow);
  const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.20, 0.42, 3), kit.toon(PALETTE.ink));
  arrow.rotation.z = -Math.PI / 2;
  flow.add(arrow);
  flow.position.set(0, 0.32, 0.72);
  kit.ink(group);
  function update(t, state = {}) {
    const receive = (state.direction ?? opts.direction ?? 'transmit') === 'receive';
    flow.rotation.z = receive ? Math.PI : 0;
  }
  update(0);
  return { group, hero: group, update };
}
