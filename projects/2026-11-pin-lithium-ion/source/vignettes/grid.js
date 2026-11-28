// Vignette 17 (grid, sentences 41-42): scale up to EV and solar/wind renewable energy storage
// in the clean-energy park of appsWorld.
import { appsWorld } from "./devices.js";

export async function build(kit) {
  const world = await kit.world("apps", appsWorld);
  const startPose = { pos: [5.55, 2.25, 8.4], look: [5.45, 1.30, 0], fov: 42 };
  const camera = kit.camera(startPose);
  const ev = kit.beat("ev");
  const renew = kit.beat("renew");

  // Animated energy beads from battery pack to EV and to renewable station
  const toEv = kit.beads(
    [[3.85, 0.45, -0.45], [4.55, 0.28, 0.45], [5.45, 0.35, 1.15]],
    { distance: 8.4, fov: 42, color: "#FCD53E", glow: "#FFF6C8", start: 0.4, onTop: true }
  );
  const toGrid = kit.beads(
    [[3.85, 0.55, -0.45], [5.05, 0.55, -0.55], [5.85, 0.65, -0.55]],
    { distance: 8.4, fov: 42, color: "#14B8A6", glow: "#5EEAD4", start: 0.4, onTop: true }
  );
  kit.group.add(toEv.group, toGrid.group);
  kit.callout({ text: "XE ĐIỆN", anchor: world.evAnchor, at: ev, hold: 1.5 });
  kit.callout({ text: "ĐIỆN MẶT TRỜI · GIÓ", anchor: world.renewAnchor, at: renew, hold: 2.0 });

  return {
    scene: world.scene,
    camera,
    hero: world.gridRoot,
    update(t) {
      world.packCells.forEach((bc, idx) => {
        bc.update(t, { charge: 0.78 + 0.15 * Math.sin(t * 2 + idx), dcOut: 0.9, rectGlow: 0.8, regGlow: 0.8, chargerGlow: 0.8 });
      });
      world.hub.rotation.z = -t * 2.4;
      world.evGroup.position.x = 0.25 + 0.55 * kit.ease(kit.progress(t, 0.8, 5.8), "inOut");

      toEv.update(t);
      toGrid.update(t);

      if (t >= 0.8) {
        kit.orbit(camera, t - 0.8, {
          center: [5.45, 1.30, 0],
          radius: 8.4,
          height: 0.95,
          angle: 0.02,
          speed: 0.055,
          look: [5.45, 1.30, 0],
          fov: 42,
        });
      } else {
        kit.setPose(camera, startPose);
      }
    },
  };
}
