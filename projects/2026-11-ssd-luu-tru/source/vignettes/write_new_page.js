// Vignette 13 (write_new_page): Controller writes edited video part to a free page instead of overwriting,
// updates the mapping LUT (#E879F9), and illustrates suitcase changing shelf while keeping its number tag.
// Exports controllerBusWorld(kit) shared by write_new_page, read_lookup, and ecc_repair.
import { controllerChip } from "./controller-chip/controller-chip.js";
import { nandChip } from "./nand-chip/nand-chip.js";
import { dataPacket } from "./data-packet/data-packet.js";

export function controllerBusWorld(kit) {
  const scene = kit.stage({ yard: 11, clear: 6, seed: 17 });
  const ctrl = controllerChip(kit, { mode: "lut_update" });
  ctrl.group.position.set(-1.15, 0, 0.15);
  scene.add(ctrl.group);

  const nand = nandChip(kit, { mode: "page_highlight" });
  nand.group.position.set(1.25, 0, -0.15);
  scene.add(nand.group);

  const pkt = dataPacket(kit, { kind: "token", color: "#2D7FF9" });
  pkt.group.scale.setScalar(1.3);
  scene.add(pkt.group);

  return { scene, ctrl, nand, pkt };
}

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("controller_bus", controllerBusWorld);

  const cutSave = kit.beat("cut_save");
  const freePage = kit.beat("free_page");
  const lut = kit.beat("lut");
  const suitcase = kit.beat("suitcase");

  // Procedural 2-shelf rack + suitcase with #2D7FF9 number tag at X = 5.2
  const rackX = 5.2;
  const shelfGroup = new THREE.Group();
  shelfGroup.position.set(rackX, 0, 0);
  const frameMat = kit.toon("#525B72");
  const shelf1Mat = kit.toon("#6B6D78");
  const shelf2Mat = kit.toon("#F59E0B");
  const postL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.0, 0.68), frameMat);
  postL.position.set(-0.85, 1.0, 0);
  const postR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.0, 0.68), frameMat);
  postR.position.set(0.85, 1.0, 0);
  const shelf1 = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.08, 0.64), shelf1Mat);
  shelf1.position.set(0, 0.45, 0);
  const shelf2 = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.08, 0.64), shelf2Mat);
  shelf2.position.set(0, 1.32, 0);
  shelfGroup.add(postL, postR, shelf1, shelf2);

  const caseGroup = new THREE.Group();
  const caseBody = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.54, 0.42), kit.toon("#E6E6E1"));
  const caseHandle = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.10, 0.10), kit.toon("#353846"));
  caseHandle.position.set(0, 0.32, 0);
  const tag = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 0.06), kit.toon("#2D7FF9"));
  tag.position.set(0.18, 0.04, 0.23);
  caseGroup.add(caseBody, caseHandle, tag);
  caseGroup.position.set(0, 0.78, 0);
  shelfGroup.add(caseGroup);
  kit.ink(shelfGroup);
  kit.group.add(shelfGroup);

  const writeFlow = kit.beads(
    [[-1.15, 0.32, 0.15], [0.05, 0.34, 0.0], [1.25, 0.28, -0.15]],
    { distance: 6.5, fov: 38, color: "#E879F9", glow: "#F5C2FF", start: freePage - 0.5, end: suitcase, onTop: true }
  );
  kit.group.add(writeFlow.group);

  const busPose = { pos: [0.05, 3.85, 6.2], look: [0.05, 0.35, 0.0], fov: 38 };
  const rackPose = { pos: [rackX, 1.8, 5.2], look: [rackX, 0.95, 0.0], fov: 38 };
  const camera = kit.camera(busPose);

  kit.callout({
    text: "TRANG TRỐNG MỚI",
    anchor: world.nand.anchors.block2,
    at: freePage,
    hold: 2.8,
    gap: 220,
  });
  kit.card({
    title: "BẢNG TRA ÁNH XẠ",
    body: "ĐỊA CHỈ CŨ → CHỖ MỚI",
    at: lut,
    hold: 3.2,
    y: 485,
    width: 640,
  });
  kit.label({
    text: "ĐỔI KỆ · GIỮ THẺ",
    at: suitcase,
    hold: 3.1,
    y: 480,
    size: 56,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.ctrl.group, world.nand.group, shelfGroup],
    update(t) {
      const toNewPage = kit.ease(kit.progress(t, cutSave + 0.5, freePage - cutSave + 1.0), "inOut");
      world.pkt.group.visible = t < suitcase;
      world.pkt.group.position.set(
        kit.lerp(-1.95, 0.89, toNewPage),
        0.48 + 0.14 * Math.sin(toNewPage * Math.PI),
        kit.lerp(0.35, 0.21, toNewPage)
      );
      world.pkt.update(t, { pulse: 0.75, spin: 0.5 });

      const lutMix = kit.ease(kit.progress(t, lut - 0.4, 2.0), "inOut");
      world.ctrl.update(t, {
        mode: "lut_update",
        sending: t >= freePage - 0.5 && t < suitcase,
        lutHostRow: 1,
        lutPhysRow: 2,
        lutMix,
      });
      world.nand.update(t, {
        open: 1,
        hideLid: true,
        mode: "page_highlight",
        activeBlock: 2,
        activePage: 2,
        highlightPage: t >= freePage - 0.4,
      });

      writeFlow.update(t);

      const moveCase = kit.ease(kit.progress(t, suitcase - 0.4, 1.5), "inOut");
      caseGroup.position.set(
        0.35 * Math.sin(moveCase * Math.PI),
        kit.lerp(0.76, 1.63, moveCase),
        0.32 * Math.sin(moveCase * Math.PI)
      );

      if (t < suitcase - 1.1) {
        kit.drift(camera, t, {
          from: busPose,
          to: { pos: [-0.2, 3.55, 5.8], look: [0.05, 0.35, 0.0], fov: 38 },
          start: 1.0,
          dur: Math.max(1.5, suitcase - 2.2),
        });
      } else {
        kit.fly(camera, t, {
          from: { pos: [-0.2, 3.55, 5.8], look: [0.05, 0.35, 0.0], fov: 38 },
          to: rackPose,
          start: suitcase - 1.1,
          dur: 1.25,
          ease: "stop",
          arc: 0.3,
        });
      }
    },
  };
}
