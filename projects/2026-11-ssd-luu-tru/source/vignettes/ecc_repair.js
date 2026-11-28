// Vignette 15 (ecc_repair): Controller uses ECC parity bits added during write to recover bit errors
// up to a finite limit.
import { controllerBusWorld } from "./write_new_page.js";

export async function build(kit) {
  const world = await kit.world("controller_bus", controllerBusWorld);
  const pose = { pos: [-0.87, 2.15, 2.05], look: [-0.87, 0.24, -0.18], fov: 35 };
  const camera = kit.camera(pose);

  const ecc = kit.beat("ecc");
  const limit = kit.beat("limit");

  kit.callout({
    text: "MÃ SỬA LỖI (ECC)",
    anchor: world.ctrl.anchors.ecc,
    at: ecc,
    hold: 3.8,
    gap: 220,
  });
  kit.mark({
    kind: "check",
    anchor: world.ctrl.anchors.ecc,
    at: ecc + 1.2,
    hold: 2.2,
  });
  kit.mark({
    kind: "x",
    anchor: world.ctrl.anchors.ecc,
    at: limit - 0.3,
    hold: 1.2,
  });
  kit.label({
    text: "CÓ GIỚI HẠN",
    at: limit - 0.6,
    hold: 1.5,
    y: 495,
    size: 56,
    color: "#DD3428",
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.ctrl.group],
    update(t) {
      world.pkt.group.visible = false;
      const over = t >= limit - 0.5;
      world.ctrl.update(t, {
        mode: "ecc_check",
        errorCount: over ? 3 : 1,
        eccOverLimit: over,
        sending: false,
      });
      world.nand.update(t, { open: 1, hideLid: true });

      kit.push(camera, t, { ...pose, amount: 0.35, start: ecc, dur: 4.5 });
    },
  };
}
