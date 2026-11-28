// a1 / maps_offline: Back on daytime street; #2D884E fix feeds #2D7FF9 Google Maps blue dot,
// draws navigation route inside downloaded offline driving region.
import { streetWorld } from "./hook_dot.js";

export async function build(kit) {
  const world = await kit.world("street", streetWorld);

  const p0 = { pos: [0.0, 1.72, 2.32], look: [0.0, 1.35, 0.0], fov: 36 };
  const p1 = { pos: [0.0, 1.56, 1.92], look: [0.0, 1.36, 0.02], fov: 35 };
  const camera = kit.camera(p0);

  const gmapsDot = kit.beat("gmaps_dot");
  const mapRoute = kit.beat("map_route");
  const offlineDl = kit.beat("offline_dl");
  const inRegion = kit.beat("in_region");

  kit.callout({
    text: "CHẤM XANH MAPS",
    anchor: world.phone.anchors.blueDot,
    at: gmapsDot,
    hold: offlineDl - gmapsDot - 0.35,
  });
  kit.card({
    title: "BẢN ĐỒ NGOẠI TUYẾN",
    body: "DẪN ĐƯỜNG LÁI XE KHI MẤT MẠNG",
    at: offlineDl,
    hold: 4.8,
    anchor: world.phone.anchors.screen,
    y: 460,
    width: 680,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.phone.group],
    update(t) {
      const routeProg = kit.ease(kit.progress(t, mapRoute - 0.2, 0.8), "out");
      const offProg = kit.ease(kit.progress(t, offlineDl - 0.2, 0.7), "out");

      world.set(t, {
        phonePos: [0, 1.35, 0],
        phoneRot: [0.95, 0, 0],
        dotPulse: t >= gmapsDot ? 1 : 0.3,
        haloRadius: 0.28,
        route: routeProg,
        offline: offProg,
        canyon: 0,
      });

      if (t >= inRegion - 0.4) {
        kit.fly(camera, t, { from: p0, to: p1, start: inRegion - 0.4, dur: 1.4, ease: "inOut" });
      } else {
        kit.drift(camera, t, { from: p0, to: { ...p0, pos: [0.08, 1.68, 2.2] }, start: 0.9, dur: 10.0 });
      }
    },
  };
}
