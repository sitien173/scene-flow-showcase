// Scene 1: hook_night — dark unlit midnight street, pedestrian in dark clothes steps into road, self-driving car approaches.
import { selfDrivingCar } from "./self-driving-car/self-driving-car.js";
import { lidarSensor } from "./lidar-sensor/lidar-sensor.js";
import { pedestrian } from "./pedestrian/pedestrian.js";
import { building } from "./building/building.js";

export function streetWorld(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ yard: 12, clear: 7, seed: 11 });

  // Dedicated asphalt street strip along Z inside the yard so car & pedestrian sit on a clean road
  const roadMat = kit.toon("#3F4663", { map: kit.paperTexture(6) });
  const road = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 22), roadMat);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.01, 0);
  road.receiveShadow = true;
  road.userData.noInk = true;
  scene.add(road);

  const curbMat = kit.toon("#B9B8B3", { map: kit.paperTexture(4) });
  for (const sx of [-3.4, 3.4]) {
    const walk = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 22), curbMat);
    walk.position.set(sx, 0.04, 0);
    walk.receiveShadow = true;
    walk.userData.noInk = true;
    scene.add(walk);
  }

  const dashMat = kit.toon("#F4F2EA");
  for (let z = -9.6; z <= 9.6; z += 2.2) {
    const d = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.015, 1.05), dashMat);
    d.position.set(0, 0.015, z);
    d.receiveShadow = true;
    d.userData.noInk = true;
    scene.add(d);
  }

  const car = selfDrivingCar(kit, { variant: "hero" });
  scene.add(car.group);

  const lidar = lidarSensor(kit, { beamLength: 4.5 });
  scene.add(lidar.group);

  const ped = pedestrian(kit, { walkSpeed: 1.3 });
  scene.add(ped.group);

  const bldgL = building(kit, { showTree: true, showLamp: false });
  bldgL.group.position.set(-5.6, 0, -1.2);
  bldgL.group.rotation.y = Math.PI / 2;
  scene.add(bldgL.group);

  const bldgR = building(kit, { showTree: true, showLamp: false });
  bldgR.group.position.set(5.6, 0, 2.2);
  bldgR.group.rotation.y = -Math.PI / 2;
  scene.add(bldgR.group);

  function set(t, state = {}) {
    const carPos = state.carPos ?? [0, 0, -2.8];
    car.group.position.set(carPos[0], carPos[1], carPos[2]);
    car.group.rotation.y = state.carRotY ?? 0;
    car.group.visible = state.carVisible ?? true;
    car.update(t, {
      hideRoofLidar: state.useHeroLidar !== false,
      variant: state.carVariant ?? "hero",
      speed: state.carSpeed ?? 0,
      headlights: state.headlights ?? 0,
      showCameraCone: state.cameraCone ?? 0,
      lidarGlow: state.lidarGlow ?? 0.6,
      bbox: state.carBbox ?? 0,
    });

    lidar.group.visible = (state.carVisible ?? true) && (state.useHeroLidar !== false) && (state.lidarVisible ?? true);
    lidar.group.position.set(carPos[0], carPos[1] + 1.54, carPos[2] - 0.09);
    lidar.group.rotation.y = state.carRotY ?? 0;
    lidar.group.scale.setScalar(state.lidarScale ?? 0.72);
    lidar.update(t, {
      cutaway: state.cutaway ?? 0,
      spin: state.spin ?? 0,
      angle: state.lidarAngle,
      emit: state.emit ?? 0,
      receive: state.receive ?? 0,
      clock: state.clock ?? 0,
      beamMode: state.beamMode ?? "none",
      beamLength: state.beamLength ?? 4.5,
      beamActive: state.beamActive ?? 1,
    });

    const pedPos = state.pedPos ?? [0.55, 0, 3.2];
    ped.group.position.set(pedPos[0], pedPos[1], pedPos[2]);
    ped.group.rotation.y = state.pedRotY ?? -Math.PI / 2;
    ped.group.visible = state.pedVisible ?? true;
    ped.update(t, {
      walkSpeed: state.pedWalk ?? 0,
      solid: state.pedSolid ?? 1,
      hit: state.pedHit ?? 0,
      hitY: state.pedHitY ?? 1.16,
      pointCloud: state.pedCloud ?? 0,
      bbox: state.pedBbox ?? 0,
      trackArrow: state.pedTrack ?? 0,
    });

    const bldgsOn = state.bldgsVisible ?? true;
    bldgL.group.visible = bldgsOn;
    bldgR.group.visible = bldgsOn;
    const bState = {
      solid: state.bldgSolid ?? 1,
      showTree: state.showTree ?? true,
      showLamp: state.showLamp ?? false,
      pointCloud: state.bldgCloud ?? 0,
      bbox: state.bldgBbox ?? 0,
      treeBbox: state.treeBbox ?? 0,
    };
    bldgL.update(t, bState);
    bldgR.update(t, bState);
  }

  return { scene, car, lidar, ped, bldgL, bldgR, set };
}

export async function build(kit) {
  const world = await kit.world("street", streetWorld);
  const startPose = { pos: [3.2, 3.0, 7.4], look: [0.2, 1.0, 0.2], fov: 38 };
  const camera = kit.camera(startPose);
  const pedBeat = kit.beat("ped");
  const ask = kit.beat("ask");

  kit.callout({ text: "NHÌN THẤY SAO?", anchor: world.ped.anchors.head, at: ask, hold: 0.9 });

  return {
    scene: world.scene,
    camera,
    hero: [world.car.group, world.ped.group],
    update(t) {
      const carZ = kit.lerp(-5.4, -2.8, kit.ease(kit.progress(t, 0, 7.8), "out"));
      const walkProg = kit.ease(kit.progress(t, pedBeat - 0.6, 4.6), "inOut");
      const pedX = kit.lerp(2.7, 0.55, walkProg);
      const walking = walkProg > 0.01 && walkProg < 0.99 ? 1.3 : 0;

      world.set(t, {
        carPos: [0, 0, carZ],
        carSpeed: t < 7.6 ? 1.6 : 0,
        headlights: 0.75,
        spin: 0.45,
        pedPos: [pedX, 0, 3.2],
        pedRotY: -Math.PI / 2,
        pedWalk: walking,
      });

      kit.push(camera, t, { ...startPose, amount: 1.4, start: 2.6, dur: 5.2 });
    },
  };
}
