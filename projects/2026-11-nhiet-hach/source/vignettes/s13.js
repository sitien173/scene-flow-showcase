export async function build(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ ground: false, surroundings: false });
  const bars = new THREE.Group();
  const make = (x, height, color) => {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.7, height, 0.12), kit.toon(color));
    bar.position.set(x, height / 2 - 1, 0);
    bars.add(bar);
    return bar;
  };
  make(-1, 2, "#F28B29");
  make(1, 1.65, "#F28B29");
  const difference = make(1, 0.35, "#FCD53E");
  difference.position.y = 0.825;
  kit.group.add(bars);
  const reveal = kit.beat("sentence34");
  const pose = { pos: [0, 0, 10], look: [0, 0, 0], fov: 40 };
  const camera = kit.camera(pose);
  kit.label({ text: "Trước", at: kit.beat("sentence33"), hold: 6, x: 275, y: 640, size: 44 });
  kit.label({ text: "Sau", at: kit.beat("sentence33"), hold: 6, x: 780, y: 640, size: 44 });
  kit.label({ text: "E = mc²", at: reveal, hold: 4, y: 420, size: 72 });
  return { scene, camera, hero: bars, update(t) {
    difference.visible = t >= reveal;
    kit.push(camera, t, { ...pose, amount: 1, dur: 7 });
  } };
}
