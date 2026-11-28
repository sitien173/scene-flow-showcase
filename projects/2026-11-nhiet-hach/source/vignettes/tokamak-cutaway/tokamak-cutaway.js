export function tokamakCutaway(kit, opts = {}) {
  const { THREE } = kit, group = new THREE.Group(); group.name = "tokamak-cutaway";
  const arc = Math.PI * 1.35;
  const vessel = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.46, 12, 56, arc), kit.toon("#9EA7B5")); vessel.geometry.rotateZ(Math.PI); vessel.rotation.x = Math.PI / 2; group.add(vessel);
  const plasma = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.21, 12, 56), kit.toon("#E63D32")); plasma.rotation.x = Math.PI / 2; plasma.name = "plasma"; group.add(plasma);
  const coils = new THREE.Group(); group.add(coils);
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI * 2 / 12, coil = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.055, 8, 24), kit.toon("#B87445"));
    coil.position.set(Math.cos(a) * 1.15, 0, Math.sin(a) * 1.15); coil.rotation.y = -a; coils.add(coil);
  }
  const field = new THREE.Mesh(new THREE.TorusGeometry(1.43, 0.025, 8, 56), kit.toon("#19C6D7")); field.rotation.x = Math.PI / 2; field.name = "magnetic-field"; group.add(field);
  kit.ink(group);
  function update(t, state = {}) { field.visible = state.field ?? opts.field ?? true; plasma.scale.setScalar(1 + 0.025 * Math.sin(t * 2)); }
  update(0); return { group, hero: [group], update };
}
