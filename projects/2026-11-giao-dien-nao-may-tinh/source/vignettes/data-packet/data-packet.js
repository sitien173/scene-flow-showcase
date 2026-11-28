// data-packet: toon3d 3D data packet block with fixed role colours:
// phone token / cryptogram #2D7FF9, store request #F08A4B, approval #2D884E, rejection #DD3428.
// Origin at centre of packet.
export function dataPacket(kit, opts = {}) {
  const { THREE } = kit;
  const {
    kind = "token",
    color,
  } = opts;

  const defaultColors = {
    token: "#2D7FF9",
    crypto: "#2D7FF9",
    request: "#F08A4B",
    good: "#2D884E",
    bad: "#DD3428",
  };
  const bodyColor = color || defaultColors[kind] || "#2D7FF9";

  const group = new THREE.Group();
  group.name = "data-packet-" + kind;

  const box = (w, h, d, material, x, y, z, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  const bodyMat = kit.toon(bodyColor, { emissive: "#000000" });
  const core = box(0.28, 0.18, 0.22, bodyMat, 0, 0, 0);

  // Subtle white band / badge to distinguish packet type
  const badgeMat = kit.toon("#FAFCFB");
  box(0.22, 0.03, 0.23, badgeMat, 0, 0.02, 0);

  let badge = null;
  if (kind === "crypto") {
    // Stylized dynamic key / lock crest on top
    badge = new THREE.Group();
    badge.position.set(0, 0.14, 0);
    group.add(badge);
    const keyMat = kit.toon("#FCD53E");
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.014, 5, 12), keyMat);
    badge.add(ring);
    box(0.12, 0.024, 0.024, keyMat, 0.08, 0, 0, badge);
  } else if (kind === "request") {
    // Store chevron / arrow bar
    badge = box(0.14, 0.05, 0.05, kit.toon("#FAFCFB"), 0, 0.11, 0);
  }

  kit.ink(group);

  const anchor = new THREE.Object3D();
  anchor.name = "center";
  group.add(anchor);

  const baseCol = new THREE.Color(bodyColor);
  const dark = new THREE.Color("#000000");

  function update(t, state = {}) {
    const pulse = kit.clamp01(state.pulse ?? 0);
    bodyMat.emissive.copy(dark).lerp(baseCol, 0.2 + 0.4 * pulse);
    if (badge) {
      badge.rotation.y = (state.spin ?? 0) * t * 2.2;
    }
  }

  update(0);
  return { group, hero: [core], anchors: { center: anchor }, update };
}
