// Vignette 3 (pcb_chips): Exploded SSD lid reveals PCB with NAND flash chips (#F59E0B) and controller (#E879F9).
import { deskWorld } from "./hook.js";

export async function build(kit) {
  const world = await kit.world("desk", deskWorld);
  const pose = { pos: [0.56, 3.05, 3.25], look: [0.46, 0.26, -0.04], fov: 36 };
  const camera = kit.camera(pose);
  const pcb = kit.beat("pcb");
  const nand = kit.beat("nand");
  const ctrl = kit.beat("ctrl");

  kit.callout({
    text: "BO MẠCH SSD",
    anchor: world.ssd.anchors.pcb,
    at: 1.0,
    hold: 3.0,
    gap: 230,
  });
  kit.callout({
    text: "CHIP NAND",
    anchor: world.ssd.anchors.nandCluster,
    at: nand,
    hold: 1.6,
    gap: 230,
  });
  kit.callout({
    text: "BỘ ĐIỀU KHIỂN",
    anchor: world.ssd.anchors.controller,
    at: ctrl - 0.5,
    hold: 2.0,
    gap: 230,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.ssd.group],
    update(t) {
      const openFull = kit.ease(kit.progress(t, 0.2, 1.4), "inOut");
      const nandHi = kit.ease(kit.progress(t, nand - 0.3, 0.6), "out");
      const ctrlHi = kit.ease(kit.progress(t, ctrl - 0.3, 0.6), "out");

      world.set(t, {
        ssdMode: "cutaway",
        cutaway: kit.lerp(0.85, 1.0, openFull),
        power: 1,
        circuit: 0.4 + 0.45 * ctrlHi,
        nandGlow: 0.6 + 0.4 * nandHi,
        ctrlGlow: 0.45 + 0.55 * ctrlHi,
        hostGlow: 0.5,
        pktVisible: false,
      });

      kit.push(camera, t, { ...pose, amount: 0.6, start: pcb, dur: 4.5 });
    },
  };
}
