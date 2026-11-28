// Vignette 1 (hook): SSD without a spinning disk on the toon3d desk; clicking save readies the film data-packet.
// Exports deskWorld(kit) shared by hook, power_off, and pcb_chips.
import { ssdCutaway } from "./ssd-cutaway/ssd-cutaway.js";
import { dataPacket } from "./data-packet/data-packet.js";
import { nandChip } from "./nand-chip/nand-chip.js";
import { controllerChip } from "./controller-chip/controller-chip.js";

export function deskWorld(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ yard: 8, clear: 6, seed: 7 });

  const ssd = ssdCutaway(kit, { mode: "closed" });
  ssd.group.position.set(0, 0, 0);
  scene.add(ssd.group);

  const pkt = dataPacket(kit, { kind: "token", color: "#2D7FF9" });
  pkt.group.scale.setScalar(1.45);
  pkt.group.position.set(-1.35, 0.24, 0.85);
  scene.add(pkt.group);

  // Embedded schematic chips on the PCB area for close-up inspection in pcb_chips
  const nand = nandChip(kit, { mode: "page_highlight" });
  nand.group.scale.setScalar(0.32);
  nand.group.position.set(0.56, 0.14, -0.30);
  nand.group.visible = false;
  scene.add(nand.group);

  const ctrl = controllerChip(kit, { mode: "dispatch_write" });
  ctrl.group.scale.setScalar(0.24);
  ctrl.group.position.set(0.33, 0.14, 0.36);
  ctrl.group.visible = false;
  scene.add(ctrl.group);

  function set(t, {
    ssdMode = "cutaway",
    cutaway = 0.7,
    power = 1,
    circuit = 0.2,
    nandGlow = 0.5,
    ctrlGlow = 0.4,
    hostGlow = 0.5,
    pktVisible = true,
    pktPos = [-1.35, 0.24, 0.85],
    pktPulse = 0.3,
    pktSpin = 0,
    showDetailChips = false,
  } = {}) {
    ssd.update(t, { mode: ssdMode, cutaway, power, circuit, nandGlow, ctrlGlow, hostGlow });
    pkt.group.visible = pktVisible;
    pkt.group.position.set(...pktPos);
    pkt.update(t, { pulse: pktPulse, spin: pktSpin });
    nand.group.visible = showDetailChips;
    ctrl.group.visible = showDetailChips;
    if (showDetailChips) {
      nand.update(t, { open: 0, litFraction: 0.75 });
      ctrl.update(t, { cmdStrength: 0.9, sending: false });
    }
    void THREE;
  }

  return { scene, ssd, pkt, nand, ctrl, set };
}

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("desk", deskWorld);
  const pose = { pos: [0.25, 4.3, 8.2], look: [0.0, 0.72, 0.0], fov: 38 };
  const camera = kit.camera(pose);
  const open = kit.beat("open");
  const trace = kit.beat("trace");

  // Procedural SAVE button pad next to the film data-packet
  const btnGroup = new THREE.Group();
  const btnBase = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.10, 0.46), kit.toon("#E6E6E1"));
  btnBase.position.set(0, 0.05, 0);
  const btnCap = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.09, 0.32), kit.toon("#2D7FF9"));
  btnCap.position.set(0, 0.13, 0);
  btnGroup.add(btnBase, btnCap);
  kit.ink(btnGroup);
  btnGroup.position.set(-1.35, 0.0, 1.45);
  kit.group.add(btnGroup);

  kit.callout({
    text: "KHÔNG ĐĨA QUAY?",
    anchor: world.ssd.anchors.emptyBay,
    at: open,
    hold: 4.5,
    gap: 240,
  });
  kit.callout({
    text: "ĐOẠN PHIM",
    anchor: world.pkt.anchors.center,
    at: trace - 0.25,
    hold: 1.7,
    gap: 220,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.ssd.group, world.pkt.group],
    update(t) {
      const lidOpen = kit.ease(kit.progress(t, 0.5, 1.9), "inOut");
      const pressed = kit.ease(kit.progress(t, trace, 0.25), "out");
      const release = kit.ease(kit.progress(t, trace + 0.3, 0.35), "out");
      const pressDepth = 0.055 * (pressed - 0.6 * release);
      btnCap.position.y = 0.13 - pressDepth;

      const ready = kit.ease(kit.progress(t, trace, 1.0), "inOut");
      world.set(t, {
        ssdMode: "cutaway",
        cutaway: kit.lerp(0.08, 0.78, lidOpen),
        power: 1,
        circuit: 0.25 + 0.4 * ready,
        nandGlow: 0.55,
        ctrlGlow: 0.45,
        hostGlow: 0.35 + 0.65 * ready,
        pktVisible: true,
        pktPos: [
          kit.lerp(-1.35, -0.55, ready),
          0.26 + 0.12 * Math.sin(ready * Math.PI),
          kit.lerp(0.85, 0.92, ready),
        ],
        pktPulse: 0.25 + 0.75 * ready,
        pktSpin: ready * 0.4,
      });

      kit.push(camera, t, { ...pose, amount: 0.95, start: 2.6, dur: 4.8 });
    },
  };
}
