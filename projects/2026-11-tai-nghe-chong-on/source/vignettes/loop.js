// Sentence 8: the light turns to night (vignettes.json) while the camera circles the fridge and the whole loop runs;
// a counter ticks the cycles as they repeat.
import { benchWorld } from "./pipe.js";

export async function build(kit) {
  const world = await kit.world("bench", benchWorld);
  const camera = kit.camera({ pos: [0, 2.6, 7.5], look: [0, 1.6, -0.4], fov: 40 });
  const again = kit.beat("again");
  const warm = kit.beat("warm");
  const flow = kit.beads(world.box.path("loop"), { distance: 9.5, color: "#FFF6C8", closed: true, start: 0 });
  const cycles = kit.counter({ from: 1, to: 4, start: again, dur: warm - again + 0.6, steps: 3, prefix: "Vòng " });
  kit.group.add(flow.group);
  return {
    scene: world.scene,
    camera,
    hero: world.box.group,
    update(t) {
      // the fridge warms a little before each cycle: the condenser pulses with the counter
      const pulse = kit.flight(kit.progress(t, again, warm - again + 0.6), 0.5);
      world.box.update(t, { heat: 0.3 + 0.5 * pulse, frost: 0.8 });
      kit.orbit(camera, t, { center: [0, 2.2, -0.4], radius: 9.5, height: 0.6, angle: 0.5, speed: 0.22 });
      flow.update(t);
      kit.label({ text: cycles(t), at: again, hold: warm - again + 1.2, y: 480 });
    },
  };
}
