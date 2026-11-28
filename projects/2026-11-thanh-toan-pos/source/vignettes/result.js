// a1b / result: Approval (#2D884E) or rejection (#DD3428) returns from system to POS screen.
import { cafeWorld } from "./tap.js";

export async function build(kit) {
  const world = await kit.world("cafe", cafeWorld);
  const from = { pos: [0.55, 2.3, 2.55], look: [0.15, 1.58, 0.22], fov: 35 };
  const to = { pos: [0.42, 2.18, 2.25], look: [0.22, 1.58, 0.22], fov: 34 };
  const camera = kit.camera(from);
  const decBeat = kit.beat("decision");

  const returnStream = kit.beads(
    [[4.6, 1.7, -0.05], [2.4, 1.72, 0.12], [0.65, 1.62, 0.22]],
    { distance: 2.5, fov: 35, color: "#2D884E", glow: "#2D884E", start: 0, end: decBeat + 0.5, onTop: true }
  );
  kit.group.add(returnStream.group);
  kit.mark({
    kind: "check",
    anchor: world.pos.anchors.screen,
    at: decBeat,
    hold: 1.2,
  });
  kit.mark({
    kind: "x",
    anchor: [0.62, 1.66, 0.44],
    at: decBeat + 1.4,
    hold: 0.9,
  });
  kit.card({
    title: "KẾT QUẢ TỪ HỆ THỐNG",
    body: "CHẤP THUẬN · TỪ CHỐI",
    at: decBeat,
    hold: 2.2,
    y: 410,
    width: 640,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.pos.group, world.cup.group],
    update(t) {
      const showBad = t >= decBeat + 1.4 && t < decBeat + 2.3;
      const status = t < decBeat ? "wait" : (showBad ? "bad" : "good");
      world.set(t, {
        posStatus: status,
        phoneVisible: false,
      });
      returnStream.update(t);
      kit.drift(camera, t, { from, to, start: 0.2, dur: 3.2 });
    },
  };
}
