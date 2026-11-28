export function tritiumNucleus(kit, opts = {}) {
  const { THREE } = kit, group = new THREE.Group(); group.name = "tritium-nucleus";
  const geo = new THREE.SphereGeometry(0.48, 20, 14);
  for (const [name, color, x, y] of [["proton", "#F28B29", 0, 0.43], ["neutron-1", "#7764B5", -0.43, -0.29], ["neutron-2", "#7764B5", 0.43, -0.29]]) {
    const part = new THREE.Mesh(geo, kit.toon(color)); part.name = name; part.position.set(x, y, 0); group.add(part);
  }
  kit.ink(group);
  function update(t) { group.rotation.y = t * 0.25; }
  update(0); return { group, hero: [group], update };
}
