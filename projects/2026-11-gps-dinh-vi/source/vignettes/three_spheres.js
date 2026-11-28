// m4 / three_spheres: Second #F08A4B sphere cuts first in a glowing circle;
// third sphere cuts that circle in at most two candidate points.
import { orbitWorld } from "./sat_broadcast.js";
import { distanceSphere } from "./distance-sphere/distance-sphere.js";

export async function build(kit) {
  const world = await kit.world("orbit", orbitWorld);
  const { THREE } = kit;

  const p0 = { pos: [0.0, 1.3, 6.7], look: [0.0, 0.35, 0.0], fov: 40 };
  const p1 = { pos: [0.55, 1.7, 6.1], look: [0.0, 0.45, 0.15], fov: 39 };
  const camera = kit.camera(p0);

  const sphere2 = kit.beat("sphere_2");
  const circleCut = kit.beat("circle_cut");
  const twoPts = kit.beat("two_pts");

  const s1 = distanceSphere(kit, { radius: 2.1 });
  s1.group.position.set(-1.15, 1.75, 0.25);

  const s2 = distanceSphere(kit, { radius: 2.1 });
  s2.group.position.set(1.15, 1.75, 0.25);

  const s3 = distanceSphere(kit, { radius: 2.1 });
  s3.group.position.set(0.0, 2.15, -1.05);

  // Intersection circle on x = 0 plane between s1 and s2
  const interRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.75, 0.032, 8, 48),
    kit.toon("#F08A4B", { emissive: "#F08A4B" })
  );
  interRing.position.set(0, 1.75, 0.25);
  interRing.rotation.y = Math.PI / 2;
  interRing.visible = false;

  const ptMat = kit.toon("#FCD53E", { emissive: "#FCD53E" });
  const ptTop = new THREE.Mesh(new THREE.IcosahedronGeometry(0.11, 1), ptMat);
  ptTop.position.set(0, 0.15, 0.96);
  ptTop.visible = false;
  const ptAlt = new THREE.Mesh(new THREE.IcosahedronGeometry(0.11, 1), ptMat);
  ptAlt.position.set(0, 2.75, -1.2);
  ptAlt.visible = false;

  const interAnchor = new THREE.Object3D();
  interAnchor.position.set(0, 0.35, 1.25);

  kit.ink(kit.group);
  kit.group.add(s1.group, s2.group, s3.group, interRing, ptTop, ptAlt, interAnchor);

  kit.callout({
    text: "VÒNG GIAO NHAU",
    anchor: interAnchor,
    at: circleCut,
    hold: twoPts - circleCut - 0.35,
  });
  kit.label({
    text: "TỐI ĐA 2 ĐIỂM",
    at: twoPts,
    hold: 0.7,
    y: 505,
    color: "#FCD53E",
  });

  const satPos = [
    [-1.15, 1.75, 0.25],
    [1.15, 1.75, 0.25],
    [0.0, 2.15, -1.05],
  ];

  return {
    scene: world.scene,
    camera,
    hero: [s1.group, s2.group, s3.group, world.planet.group],
    update(t) {
      world.set(t, {
        planetPos: [0, -1.65, 0],
        atmosphere: 0,
        satPositions: satPos,
        satCount: 3,
        satScale: 0.65,
      });

      s1.update(t, { opacity: 0.85, radiusScale: 1.0 });
      const g2 = kit.ease(kit.progress(t, sphere2 - 0.2, 0.8), "out");
      s2.update(t, { opacity: t >= sphere2 - 0.2 ? 0.85 : 0, radiusScale: Math.max(0.04, g2) });

      const g3 = kit.ease(kit.progress(t, twoPts - 0.45, 0.7), "out");
      s3.update(t, { opacity: t >= twoPts - 0.45 ? 0.8 : 0, radiusScale: Math.max(0.04, g3) });

      interRing.visible = t >= circleCut - 0.2;
      ptTop.visible = t >= twoPts;
      ptAlt.visible = t >= twoPts;

      kit.fly(camera, t, { from: p0, to: p1, start: circleCut - 0.3, dur: 2.2, ease: "inOut" });
    },
  };
}
