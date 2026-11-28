// One pulse or a train. level controls brightness without changing the yellow hue.
export function lightPulse(kit, opts = {}) {
  const { THREE, PALETTE } = kit;
  const group = new THREE.Group();
  group.name = 'light-pulse';
  const count = Math.max(1, Math.floor(opts.count ?? 1));
  const pulses = [];
  for (let i = 0; i < count; i++) {
    const material = kit.toon(PALETTE.highlight, { emissive: PALETTE.highlight });
    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.19, 12, 8), material);
    pulse.scale.set(1.8, 0.75, 0.75);
    pulse.name = 'pulse-' + i;
    group.add(pulse);
    pulses.push(pulse);
  }
  kit.ink(group);
  function update(t, state = {}) {
    const level = Math.max(0, Math.min(1, state.level ?? opts.level ?? 1));
    const length = opts.length ?? 4;
    const speed = state.speed ?? opts.speed ?? 1;
    for (let i = 0; i < count; i++) {
      const p = ((t * speed - i * (opts.spacing ?? 0.7)) % length + length) % length;
      pulses[i].position.x = p - length / 2;
      pulses[i].scale.set(1.8 * (0.65 + 0.35 * level), 0.75 * (0.45 + 0.55 * level), 0.75 * (0.45 + 0.55 * level));
      pulses[i].material.emissiveIntensity = level * 1.6;
      pulses[i].material.color.set(PALETTE.highlight);
    }
  }
  update(0);
  return { group, hero: pulses, update };
}
