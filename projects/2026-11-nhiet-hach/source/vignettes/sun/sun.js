export function sun(kit, opts = {}) {
  const { THREE } = kit, group = new THREE.Group();
  group.name = "sun";
  const shell = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 20, Math.PI * 0.25, Math.PI * 1.5), kit.toon("#F28B29", { side: THREE.DoubleSide }));
  shell.rotation.y = Math.PI * 0.75; shell.userData.noInk = true; group.add(shell);
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.68, 24, 16), kit.toon("#F6D64A"));
  core.name = "core"; group.add(core);
  const rays = new THREE.Group(); group.add(rays);
  for (let i = 0; i < 12; i++) {
    const ray = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.42, 6), kit.toon("#F28B29"));
    const a = i * Math.PI / 6; ray.position.set(Math.cos(a) * 1.68, Math.sin(a) * 1.68, 0); ray.rotation.z = a - Math.PI / 2; rays.add(ray);
  }
  kit.ink(group);
  function update(t, state = {}) { shell.visible = !(state.coreOnly ?? opts.coreOnly ?? false); rays.visible = shell.visible; core.rotation.y = t * 0.12; }
  update(0); return { group, hero: [group], update };
}
