import { smartphone } from "./smartphone/smartphone.js";

export async function build(kit) {
  const { THREE, PALETTE } = kit;
  const scene = kit.stage({ surroundings: false });
  const phone = smartphone(kit);
  phone.group.scale.setScalar(3);
  scene.add(phone.group);

  // Cover the reused payment screen with an unbranded call presentation.
  const callScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.46, 0.94),
    kit.toon(PALETTE.card, { map: kit.canvasTexture(192, 360, (g, w, h) => {
      g.fillStyle = PALETTE.card;
      g.fillRect(0, 0, w, h);
      g.fillStyle = PALETTE.good;
      g.beginPath(); g.arc(w / 2, 115, 42, 0, Math.PI * 2); g.fill();
      g.fillStyle = PALETTE.pill;
      g.beginPath(); g.arc(w / 2, 104, 13, 0, Math.PI * 2); g.fill();
      g.beginPath(); g.arc(w / 2, 139, 25, Math.PI, 0); g.fill();
      g.fillStyle = PALETTE.accent;
      g.beginPath(); g.arc(w / 2, 270, 24, 0, Math.PI * 2); g.fill();
    }) })
  );
  callScreen.rotation.x = -Math.PI / 2;
  callScreen.position.y = 0.048;
  phone.group.add(callScreen);

  const rings = [0, 1, 2].map(() => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.025, 8, 48), kit.toon(PALETTE.good));
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 0.05, 0);
    scene.add(ring);
    return ring;
  });
  const camera = kit.camera({ pos: [0, 6, 7], look: [0, 0, 0], fov: 35 });
  const call = kit.beat("call");
  const atlantic = kit.beat("atlantic");
  kit.label({ text: "ĐẠI TÂY DƯƠNG", at: atlantic, hold: 2, y: 1100 });
  return {
    scene, camera, hero: phone.group,
    update(t) {
      phone.update(t);
      rings.forEach((ring, i) => {
        const p = ((Math.max(0, t - call) * 0.45 + i / 3) % 1);
        ring.visible = t >= call;
        ring.scale.setScalar(0.7 + p * 1.5);
      });
    }
  };
}
