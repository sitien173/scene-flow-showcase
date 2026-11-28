// Scene 3: reveal_name — daylight reveal of self-driving car with LiDAR name & 2020 survey context.
import { streetWorld } from "./hook_night.js";

export async function build(kit) {
  const world = await kit.world("street", streetWorld);
  const center = [0, 1.15, -2.8];
  const camera = kit.camera({ pos: [3.2, 2.7, 2.8], look: center, fov: 38 });

  const acronym = kit.beat("acronym");
  const survey = kit.beat("survey");

  kit.card({
    title: "LIDAR",
    body: "Light Detection\nand Ranging",
    at: acronym,
    hold: survey - acronym - 0.7,
    y: 620,
    width: 640,
  });
  kit.callout({ text: "TỔNG QUAN 2020", anchor: world.lidar.anchors.top, at: survey, hold: 3.6 });

  return {
    scene: world.scene,
    camera,
    hero: [world.car.group, world.lidar.group],
    update(t) {
      world.set(t, {
        carPos: [0, 0, -2.8],
        spin: 0.75,
        emit: 0.5,
        pedVisible: false,
      });

      kit.orbit(camera, t, { center, radius: 6.4, height: 1.65, angle: 0.52, speed: 0.09, fov: 38 });
    },
  };
}
