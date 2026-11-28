export function deuteriumNucleus(kit, opts = {}) {
  const { THREE } = kit, group = new THREE.Group(); group.name = "deuterium-nucleus";
  const geo = new THREE.SphereGeometry(0.48, 20, 14);
  for (const [name, color, x] of [["proton", "#F28B29", -0.39], ["neutron", "#7764B5", 0.39]]) {
    const part = new THREE.Mesh(geo, kit.toon(color)); part.name = name; part.position.x = x; group.add(part);
  }
  kit.ink(group);
  function update(t) { group.rotation.y = t * 0.25; }
  update(0); return { group, hero: [group], update };
}
