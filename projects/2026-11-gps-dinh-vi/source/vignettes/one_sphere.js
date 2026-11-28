// m3 / one_sphere: Ideal known distance creates one #F08A4B sphere around satellite 1,
// yielding infinitely many equidistant points on Earth (not enough to fix position).
import { orbitWorld } from "./sat_broadcast.js";
import { distanceSphere } from "./distance-sphere/distance-sphere.js";

export async function build(kit) {
  const world = await kit.world("orbit", orbitWorld);
  const { THREE } = kit;

  const camera = kit.camera({ pos: [0.0, 1.3, 6.4], look: [0.0, 0.25, 0.0], fov: 40 });

  const idealMode = kit.beat("ideal_mode");
  const sphere1 = kit.beat("sphere_1");
  const notEnough = kit.beat("not_enough");

  const s1 = distanceSphere(kit, { radius: 2.15 });
  s1.group.position.set(-0.9, 1.8, 0.25);

  const dots = Array.from({ length: 6 }, () => {
    const m = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.075, 1),
      kit.toon("#FCD53E", { emissive: "#FCD53E" })
    );
    m.visible = false;
    kit.group.add(m);
    return m;
  });
  kit.ink(kit.group);
  kit.group.add(s1.group);

  kit.label({
    text: "MÔ HÌNH LÝ TƯỞNG",
    at: idealMode,
    hold: sphere1 - idealMode - 0.25,
    y: 505,
    color: "#FCD53E",
  });
  kit.callout({
    text: "MẶT CẦU 1",
    anchor: s1.anchors.rim,
    at: sphere1,
    hold: notEnough - sphere1 - 0.35,
  });
  kit.mark({
    kind: "x",
    anchor: world.planet.anchors.surface,
    at: notEnough,
    hold: 1.3,
  });

  const satPos = [
    [-0.9, 1.8, 0.25],
    [1.6, 1.8, -0.5],
    [0.1, 2.25, -1.2],
  ];

  return {
    scene: world.scene,
    camera,
    hero: [s1.group, world.planet.group],
    update(t) {
      world.set(t, {
        planetPos: [0, -1.65, 0],
        atmosphere: 0,
        satPositions: satPos,
        satCount: 3,
        satScale: 0.65,
      });

      const grow = kit.ease(kit.progress(t, sphere1 - 0.2, 0.85), "out");
      s1.update(t, {
        opacity: t >= sphere1 - 0.2 ? 0.95 : 0,
        radiusScale: Math.max(0.04, grow),
        spin: 0.2,
      });

      dots.forEach((d, i) => {
        d.visible = t >= sphere1 + 0.6;
        if (!d.visible) return;
        const a = t * 0.65 + (i / dots.length) * Math.PI * 2;
        d.position.set(
          -0.9 + Math.cos(a) * 1.45,
          0.12 + Math.sin(a * 1.3) * 0.3,
          0.25 + Math.sin(a) * 1.45
        );
      });

      kit.orbit(camera, t, { center: [0.0, 0.25, 0.0], radius: 6.4, height: 1.05, angle: 0.0, speed: 0.1 });
    },
  };
}
