// a1a: Application 1 — Reversing the cycle in summer turns the indoor unit into an evaporator
// pulling heat (#F08A4B) out of the room and rejecting it outdoors like an air conditioner.
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("home", homeWorld);
  const camera = kit.camera({ pos: [0.0, 2.2, 9.2], look: [0.0, 1.45, 0.0], fov: 40 });

  const summer = kit.beat("summer");
  const reverseCool = kit.beat("reverse_cool");
  const doubleDuty = kit.beat("double_duty");

  // Warm summer sun disc in top-left sky (strictly procedural toon3d, visible once summer hits)
  const sunGroup = new THREE.Group();
  sunGroup.position.set(-3.2, 4.4, -1.8);
  const sunDisc = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 10), kit.toon("#FCD53E", { emissive: "#F08A4B" }));
  sunGroup.add(sunDisc);
  kit.ink(sunGroup, { width: 2.0, shadows: false });

  // Heat beads pulled from indoor room -> indoor coil -> conduit bridge -> outdoor unit -> outside
  const roomHeatOut = kit.beads(
    [[1.65, 1.10, 0.30], [1.35, 1.75, 0.15], [0.25, 1.41, -0.18], [-0.78, 0.58, -0.12], [-1.62, 0.96, 0.15], [-2.75, 1.15, 0.55]],
    { distance: 9.0, color: "#F08A4B", glow: "#FCD53E", start: summer - 0.2, onTop: true }
  );

  kit.group.add(sunGroup, roomHeatOut.group);

  kit.label({ text: "MÙA HÈ · ĐẢO CHIỀU CHU TRÌNH", at: summer, hold: 2.4, y: 460 });
  kit.callout({ text: "HÚT NHIỆT PHÒNG", anchor: world.inCoil.anchors.center, at: reverseCool, hold: 2.5 });
  kit.card({ title: "2 TRONG 1", body: "ĐÔNG: SƯỞI · HÈ: ĐIỀU HÒA", at: doubleDuty, hold: 1.2, y: 430, width: 640 });

  return {
    scene: world.scene,
    camera,
    hero: [world.hp.group, world.room.group],
    update(t) {
      const rev = kit.ease(kit.progress(t, summer - 0.5, 1.4), "inOut");
      const isSummer = rev > 0.45;
      world.set(t, {
        hpCutaway: 1,
        hpActive: 1,
        hpMode: isSummer ? "cooling" : "heating",
        hpHeatFlow: 0.4 + 0.6 * rev,
        roomCutaway: 1,
        roomSeason: isSummer ? "summer" : "winter",
        roomWarmth: 0.35 + 0.55 * rev,
        fanSpeed: 1.3,
        outCoilMode: isSummer ? "ac" : "induced",
        inCoilMode: isSummer ? "induced" : "ac",
      });

      kit.orbit(camera, t, {
        center: [0.0, 1.45, 0.0],
        radius: 9.2,
        height: 0.85,
        angle: 0.05,
        speed: 0.015,
        fov: 40,
      });

      kit.popIn(sunGroup, t, summer - 0.3, { dur: 0.4 });
      roomHeatOut.update(t);
    },
  };
}
