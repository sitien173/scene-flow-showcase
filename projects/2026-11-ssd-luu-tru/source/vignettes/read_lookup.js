// Vignette 14 (read_lookup): Host sends logical address (#2D7FF9) without naming physical cell;
// controller looks up new page in NAND (#E879F9) and returns data (#2D7FF9) to host.
import { controllerBusWorld } from "./write_new_page.js";

export async function build(kit) {
  const world = await kit.world("controller_bus", controllerBusWorld);
  const addr = kit.beat("addr");
  const returnData = kit.beat("return_data");

  const lookupFlow = kit.beads(
    [[-1.15, 0.32, 0.15], [0.05, 0.32, 0.0], [1.25, 0.28, -0.15]],
    { distance: 6.2, fov: 38, color: "#E879F9", glow: "#F5C2FF", start: addr, end: returnData, onTop: true }
  );
  const returnFlow = kit.beads(
    [[1.25, 0.36, -0.15], [0.05, 0.38, 0.0], [-1.15, 0.36, 0.15], [-2.2, 0.42, 0.3]],
    { distance: 6.2, fov: 38, color: "#2D7FF9", glow: "#A8D0FF", start: returnData - 1.2, end: 9.2, onTop: true }
  );
  kit.group.add(lookupFlow.group, returnFlow.group);

  const pose = { pos: [-0.2, 3.55, 5.95], look: [0.05, 0.35, 0.0], fov: 38 };
  const camera = kit.camera(pose);

  kit.callout({
    text: "ĐỊA CHỈ LOGIC",
    anchor: world.ctrl.anchors.lut,
    at: addr,
    hold: 4.5,
    gap: 220,
  });
  kit.callout({
    text: "TRẢ DỮ LIỆU",
    anchor: world.pkt.anchors.center,
    at: returnData,
    hold: 1.5,
    gap: 220,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.ctrl.group, world.nand.group, world.pkt.group],
    update(t) {
      const goIn = kit.ease(kit.progress(t, 0.3, returnData - 2.0), "inOut");
      const goOut = kit.ease(kit.progress(t, returnData - 1.2, 2.2), "inOut");

      world.pkt.group.visible = true;
      if (t < returnData - 1.2) {
        world.pkt.group.position.set(
          kit.lerp(-2.35, -1.52, goIn),
          0.46,
          kit.lerp(0.5, 0.22, goIn)
        );
      } else {
        world.pkt.group.position.set(
          kit.lerp(0.9, -2.35, goOut),
          0.48 + 0.12 * Math.sin(goOut * Math.PI),
          kit.lerp(0.2, 0.48, goOut)
        );
      }
      world.pkt.update(t, { pulse: 0.85, spin: 0.6 });

      world.ctrl.update(t, {
        mode: "lut_read",
        sending: t >= addr,
        lutHostRow: 1,
        lutPhysRow: 2,
      });
      world.nand.update(t, {
        open: 1,
        hideLid: true,
        mode: "page_highlight",
        activeBlock: 2,
        activePage: 2,
        highlightPage: t >= addr + 0.8,
      });

      lookupFlow.update(t);
      returnFlow.update(t);

      kit.push(camera, t, { ...pose, amount: 0.55, start: returnData - 1.5, dur: 2.5 });
    },
  };
}
