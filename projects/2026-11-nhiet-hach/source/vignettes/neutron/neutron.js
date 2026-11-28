export function neutron(kit, opts = {}) {
  const { THREE } = kit, group = new THREE.Group(); group.name = "neutron";
  const particle = new THREE.Mesh(new THREE.SphereGeometry(0.48, 20, 14), kit.toon("#7764B5")); particle.name = "neutron"; group.add(particle);
  kit.ink(group);
  function update(t) { particle.rotation.y = t * 0.25; }
  update(0); return { group, hero: [particle], update };
}
