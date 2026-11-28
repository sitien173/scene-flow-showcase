// Scene 14: real_world — DARPA 2007 multi-LiDAR, Audi A8 2017 Valeo Scala (minimal indicator), Waymo 300 m range (#A5A6AA).
import { selfDrivingCar } from "./self-driving-car/self-driving-car.js";
import { distanceSphere } from "./distance-sphere/distance-sphere.js";
import { pedestrian } from "./pedestrian/pedestrian.js";
import { building } from "./building/building.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("realworld", k => {
    const scene = k.stage({ surroundings: false, size: 60, color: k.PALETTE.paper, shadow: 10 });
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 5.7, 0.08, 40), k.toon("#D6D2C7", { map: k.paperTexture(4) }));
    pad.position.y = 0.04;
    pad.receiveShadow = true;
    scene.add(pad);
    k.ink(scene, { shadows: false });
    return { scene };
  });

  const pose1 = { pos: [3.6, 2.2, 4.4], look: [0, 1.0, 0], fov: 38 };
  const pose2 = { pos: [-3.4, 2.1, 4.2], look: [0, 0.95, 0], fov: 38 };
  const pose3 = { pos: [4.8, 3.6, 6.2], look: [0, 1.0, 0], fov: 42 };
  const camera = kit.camera(pose1);

  const car = selfDrivingCar(kit, { variant: "darpa" });
  car.group.position.set(0, 0.08, 0);
  kit.group.add(car.group);

  // Neutral #A5A6AA measurement sphere for Waymo 360° / up to 300 m
  const rangeSphere = distanceSphere(kit, { radius: 4.4, color: "#A5A6AA", errorColor: "#A5A6AA" });
  rangeSphere.group.position.set(0, 1.4, 0);
  kit.group.add(rangeSphere.group);

  const ped = pedestrian(kit, { walkSpeed: 0 });
  ped.group.position.set(2.5, 0.08, 2.4);
  ped.group.rotation.y = -0.6;
  kit.group.add(ped.group);

  const bldg = building(kit, { showTree: true, showLamp: false });
  bldg.group.position.set(-3.8, 0.08, -2.6);
  bldg.group.scale.setScalar(0.75);
  kit.group.add(bldg.group);

  const darpa = kit.beat("darpa");
  const audi = kit.beat("audi");
  const waymo = kit.beat("waymo");

  kit.card({ title: "DARPA 2007", body: "TOP 3 GẮN NHIỀU LIDAR", at: darpa, hold: audi - darpa - 0.8, y: 450, width: 660 });
  kit.callout({ text: "AUDI A8 · SCALA", anchor: car.anchors.roofMount, at: audi, hold: Math.min(4, waymo - audi - 0.8) });
  kit.bigText({ text: "WAYMO · TỚI 300 M", at: waymo, hold: 1.0, y: 540, size: 90 });

  return {
    scene: world.scene,
    camera,
    hero: [car.group],
    update(t) {
      const isDarpa = t < audi - 0.6;
      const isWaymo = t >= waymo - 4.2;
      const variant = isDarpa ? "darpa" : isWaymo ? "hero" : "minimal";

      car.update(t, { variant, speed: 0.4, lidarGlow: 0.85 });
      car.group.rotation.y = t * 0.12;

      const waymoProg = kit.ease(kit.progress(t, waymo - 4.0, 2.4), "out");
      rangeSphere.update(t, { opacity: waymoProg * 0.85, radiusScale: 0.35 + 0.65 * waymoProg, spin: 0.6 });
      ped.group.visible = isWaymo;
      ped.update(t, { walkSpeed: 0 });
      bldg.group.visible = isWaymo;
      bldg.update(t, {});

      if (t < audi - 0.6) {
        kit.push(camera, t, { ...pose1, amount: 0.6, start: 0, dur: audi - 0.8 });
      } else if (t < waymo - 4.2) {
        kit.fly(camera, t, { from: pose1, to: pose2, start: audi - 0.6, dur: 1.5, ease: "inOut" });
      } else {
        kit.fly(camera, t, { from: pose2, to: pose3, start: waymo - 4.2, dur: 1.8, ease: "inOut" });
      }
    },
  };
}
