// m1i: Control-signal pulses (#FFFFFF with dark outline #1C1C20, NOT #2D7FF9) flow from phone back to pad;
// when battery reaches full, TX coil current (#F08A4B) and field (#FCD53E) shut off.
import { deskWorld, DESK_Y } from "./c1a.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("desk", deskWorld);
  const signal = kit.beat("signal");
  const adjust = kit.beat("adjust");
  const full = kit.beat("full");
  const center = [0.04, DESK_Y + 0.56, 0.04];
  const camera = kit.camera({ pos: [1.18, DESK_Y + 0.88, 2.15], look: center, fov: 34 });

  // White control-signal pulses with dark ink outline (#FFFFFF + #1C1C20)
  const pulseGroup = new THREE.Group();
  const pulses = [];
  const pillGeo = new THREE.CapsuleGeometry(0.022, 0.05, 4, 8);
  const ringGeo = new THREE.TorusGeometry(0.055, 0.011, 6, 16);
  for (let i = 0; i < 4; i++) {
    const item = new THREE.Group();
    const core = new THREE.Mesh(pillGeo, kit.toon("#FFFFFF", { emissive: "#222222" }));
    const halo = new THREE.Mesh(ringGeo, kit.toon("#FFFFFF"));
    halo.rotation.x = Math.PI / 2;
    item.add(core, halo);
    kit.ink(item, { color: "#1C1C20", shadows: false });
    pulseGroup.add(item);
    pulses.push(item);
  }
  kit.group.add(pulseGroup);

  const txFwd = kit.beads(world.pad.path("coil"), {
    distance: 1.9, fov: 34, color: "#F08A4B", glow: "#FFD4B2", start: 0, end: full + 0.2, reverse: false, onTop: true,
  });
  const txRev = kit.beads(world.pad.path("coil"), {
    distance: 1.9, fov: 34, color: "#F08A4B", glow: "#FFD4B2", start: 0, end: full + 0.2, reverse: true, onTop: true,
  });
  kit.group.add(txFwd.group, txRev.group);
  kit.callout({ text: "TÍN HIỆU VỀ ĐẾ", anchor: [0.0, DESK_Y + 0.42, 0.08], at: signal, hold: 2.2 });
  kit.label({ text: "ĐIỀU CHỈNH MỨC ĐIỆN", at: adjust, hold: 2.2, y: 500 });
  kit.label({ text: "PIN ĐẦY → NGỪNG TRUYỀN", at: full, hold: 1.8, y: 500 });

  return {
    scene: world.scene,
    camera,
    hero: [world.pad.group, world.phone.group, pulseGroup],
    update(t) {
      const sigOn = kit.ease(kit.progress(t, signal - 0.3, 0.4), "out");
      const shut = kit.ease(kit.progress(t, full, 0.9), "out");
      const adjWave = t >= adjust ? 0.55 + 0.45 * Math.cos((t - adjust) * 1.4) : 1.0;
      const txLevel = Math.max(0, (1 - shut) * adjWave);
      const pol = Math.cos(t * 2.8);

      world.set(t, {
        padState: { cutaway: 1, coilGlow: txLevel, txGlow: txLevel, led: shut > 0.5 ? "full" : "active" },
        phonePos: [0.04, DESK_Y + 0.68, 0.22],
        phoneRot: [-0.36, 0, 0],
        phoneState: { cutaway: 1, coilGlow: txLevel * 0.8, cardPulse: sigOn * (1 - shut * 0.5), charging: 1 },
        fieldVisible: txLevel > 0.03,
        fieldState: { intensity: txLevel, polarity: pol, reach: 1.05, spread: 1.0 },
      });

      // Animate white inked pulses descending from phone control chip down to pad circuit
      pulseGroup.visible = sigOn > 0.05 && shut < 0.95;
      if (pulseGroup.visible) {
        const rate = 0.72;
        pulses.forEach((p, idx) => {
          const u = ((t - signal) * rate + idx / pulses.length) % 1;
          const s = u < 0 ? u + 1 : u;
          p.position.set(kit.lerp(0.04, -0.18, s), kit.lerp(DESK_Y + 0.62, DESK_Y + 0.14, s), kit.lerp(0.14, 0.0, s));
          const fade = Math.sin(s * Math.PI);
          p.scale.setScalar(0.55 + 0.45 * fade);
        });
      }

      txFwd.update(t);
      txRev.update(t);
      if (t < full + 0.2) {
        txFwd.group.visible = pol >= 0;
        txRev.group.visible = pol < 0;
      }

      kit.orbit(camera, t, { center, radius: 1.98, height: 0.34, angle: 0.52, speed: 0.028, look: center, fov: 34 });
    },
  };
}
