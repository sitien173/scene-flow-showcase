// Scene 13: classify_track — bounding boxes (#DD3428) around pedestrian, neutral vehicle, and tree + ML labels + velocity vector.
import { streetWorld } from "./hook_night.js";

export async function build(kit) {
  const world = await kit.world("street", streetWorld);
  const poseA = { pos: [4.0, 2.45, 6.2], look: [0.4, 1.15, 1.8], fov: 38 };
  const poseB = { pos: [3.6, 2.35, 4.4], look: [0.2, 1.1, 0.6], fov: 38 };
  const camera = kit.camera(poseA);

  const bbox = kit.beat("bbox");
  const label = kit.beat("label");
  const track = kit.beat("track");

  kit.callout({ text: "HỘP BAO", anchor: world.ped.anchors.bboxTop, at: bbox, hold: label - bbox - 0.4 });
  kit.card({ title: "PHÂN LOẠI HỌC MÁY", body: "NGƯỜI · Ô TÔ · CÂY", at: label, hold: track - label - 1.1, y: 620, width: 680 });
  kit.label({ text: "HƯỚNG & TỐC ĐỘ", at: track, hold: 1.5, y: 520, size: 62 });

  return {
    scene: world.scene,
    camera,
    hero: [world.ped.group],
    update(t) {
      const boxOn = kit.ease(kit.progress(t, bbox - 0.2, 0.6), "out");
      const trackOn = kit.ease(kit.progress(t, track - 0.3, 0.6), "out");
      const pedZ = kit.lerp(3.2, 1.2, kit.progress(t, 0, 12.5));

      world.set(t, {
        carPos: [-0.9, 0, -1.6],
        carVariant: "neutral",
        carSpeed: 0,
        carBbox: boxOn,
        pedPos: [0.85, 0, pedZ],
        pedRotY: Math.PI,
        pedWalk: 1.35,
        pedCloud: 1,
        pedBbox: boxOn,
        pedTrack: trackOn,
        bldgCloud: 1,
        treeBbox: boxOn,
      });

      kit.drift(camera, t, { from: poseA, to: poseB, start: label, dur: 6.5 });
    },
  };
}
