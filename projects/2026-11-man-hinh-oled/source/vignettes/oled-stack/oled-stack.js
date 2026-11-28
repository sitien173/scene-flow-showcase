// Schematic OLED cross-section. Dimensions are illustrative, not to scale.
export function oledStack(kit, opts = {}) {
  const { THREE } = kit;
  const group = new THREE.Group(); group.name = 'oled-stack';
  const box = (name, size, color, y) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(...size), kit.toon(color));
    m.name = name; m.position.y = y; group.add(m); return m;
  };
  const layers = [
    box('bottom-electrode', [2.4,.12,1.5], '#8A95A3', -.65),
    box('electron-transport', [2.3,.15,1.4], '#00B4D8', -.49),
    box('emissive-layer', [2.3,.17,1.4], '#DD3428', -.31),
    box('hole-transport', [2.3,.15,1.4], '#F08A4B', -.13),
    box('top-electrode', [2.4,.10,1.5], '#AABEC9', .02),
    box('glass', [2.55,.13,1.65], '#B8DFE7', .17),
  ];
  const valve = box('tft-valve', [.5,.3,.5], '#FCD53E', -.9); valve.position.x = 1.55;
  const wire = box('circuit', [1.15,.065,.1], '#FCD53E', -.7); wire.position.x = 1.03;
  const indicator = box('valve-opening', [.12,.12,.55], '#2D7FF9', -.72); indicator.position.x = 1.55;
  const colors = { red: '#DD3428', green: '#2D884E', blue: '#2D7FF9' };
  kit.ink(group);
  function update(t, state = {}) {
    const explode = kit.clamp01(state.exploded ?? opts.exploded ?? 0);
    layers.forEach((layer, i) => { layer.position.y = [-.65,-.49,-.31,-.13,.02,.17][i] + (i - 2.5) * explode * .33; });
    layers[2].material.color.set(colors[state.color ?? opts.color] || colors.red);
    const opening = kit.clamp01(state.valve ?? opts.valve ?? .5);
    indicator.scale.x = .2 + opening * 2; indicator.position.y = -.72 + opening * .06;
  }
  update(0); return { group, hero: layers, update };
}
