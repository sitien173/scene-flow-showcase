// Vignette 5 (write_charge): Host sends write request + data (#2D7FF9) -> controller issues write command (#E879F9)
// -> high voltage drives #22D3EE electrons through lower insulator into charge trap.
import { dataPacket } from "./data-packet/data-packet.js";
import { controllerChip } from "./controller-chip/controller-chip.js";
import { nandChip } from "./nand-chip/nand-chip.js";
import { memoryCell } from "./memory-cell/memory-cell.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("write_bus", k => {
    const scene = k.stage({ yard: 11, clear: 6, seed: 23 });

    // Host terminal block on the left
    const host = new THREE.Group();
    const hBox = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.55, 0.72), k.toon("#353846"));
    hBox.position.set(0, 0.275, 0);
    const hScreen = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.36, 0.06), k.toon("#2D7FF9"));
    hScreen.position.set(0, 0.30, 0.36);
    host.add(hBox, hScreen);
    k.ink(host);
    host.position.set(-2.3, 0, 0.2);
    scene.add(host);

    const ctrl = controllerChip(k, { mode: "dispatch_write" });
    ctrl.group.scale.setScalar(0.82);
    ctrl.group.position.set(-0.6, 0, 0.1);
    scene.add(ctrl.group);

    const nand = nandChip(k, { mode: "page_highlight" });
    nand.group.scale.setScalar(0.85);
    nand.group.position.set(1.3, 0, -0.2);
    scene.add(nand.group);

    const cell = memoryCell(k, { mode: "tunnel_write" });
    cell.group.position.set(3.8, 0, 0.6);
    scene.add(cell.group);

    const pkt = dataPacket(k, { kind: "token", color: "#2D7FF9" });
    pkt.group.scale.setScalar(1.35);
    scene.add(pkt.group);

    return { scene, host, ctrl, nand, cell, pkt };
  });

  const hostReq = kit.beat("host_req");
  const cmd = kit.beat("cmd");
  const tunnel = kit.beat("tunnel");

  const hostFlow = kit.beads(
    [[-2.0, 0.25, 0.2], [-1.3, 0.25, 0.15], [-0.6, 0.25, 0.1]],
    { distance: 6.8, fov: 38, color: "#2D7FF9", glow: "#A8D0FF", start: 0.6, end: cmd + 0.5, onTop: true }
  );
  const cmdFlow = kit.beads(
    [[-0.2, 0.26, 0.1], [0.5, 0.28, -0.05], [1.3, 0.26, -0.2], [2.6, 0.72, 0.2], [3.8, 1.25, 0.6]],
    { distance: 6.5, fov: 38, color: "#E879F9", glow: "#F5C2FF", start: cmd - 0.3, end: 12.2, onTop: true }
  );
  kit.group.add(hostFlow.group, cmdFlow.group);

  const widePose = { pos: [-0.35, 3.25, 6.7], look: [-0.25, 0.45, 0.05], fov: 38 };
  const cellPose = { pos: [3.9, 1.52, 5.7], look: [3.95, 0.76, 0.6], fov: 37 };
  const camera = kit.camera(widePose);

  kit.callout({
    text: "YÊU CẦU GHI",
    anchor: world.pkt.anchors.center,
    at: hostReq,
    hold: 3.5,
    gap: 220,
  });
  kit.callout({
    text: "LỆNH GHI",
    anchor: world.ctrl.anchors.cmdCore,
    at: cmd,
    hold: 2.8,
    gap: 220,
  });
  kit.callout({
    text: "ĐIỆN ÁP CAO",
    anchor: world.cell.anchors.gate,
    at: tunnel,
    hold: 2.1,
    gap: 220,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.ctrl.group, world.nand.group, world.cell.group],
    update(t) {
      const reqTravel = kit.ease(kit.progress(t, hostReq - 0.4, 3.2), "inOut");
      world.pkt.group.position.set(
        kit.lerp(-1.95, -0.55, reqTravel),
        0.48 + 0.1 * Math.sin(reqTravel * Math.PI),
        kit.lerp(0.25, 0.12, reqTravel)
      );
      world.pkt.update(t, { pulse: 0.7, spin: 0.4 });
      world.ctrl.update(t, { mode: "dispatch_write", sending: t >= cmd - 0.5, cmdStrength: t >= cmd - 0.5 ? 1 : 0.4 });
      world.nand.update(t, { open: 1, hideLid: true, mode: "page_highlight", activeBlock: 1, activePage: 1, highlightPage: t >= cmd });

      const tunFrac = kit.clamp01(kit.progress(t, tunnel - 1.2, 2.8));
      world.cell.update(t, {
        mode: "tunnel_write",
        charge: 0.25 + 0.65 * tunFrac,
        tunnel: t >= tunnel - 1.2 ? 1 : 0,
        gateGlow: t >= cmd ? 1 : 0.15,
        showGauge: true,
      });

      hostFlow.update(t);
      cmdFlow.update(t);

      const flyStart = cmd + 0.5;
      if (t < flyStart) {
        kit.drift(camera, t, {
          from: widePose,
          to: { pos: [-0.05, 3.05, 6.2], look: [0.1, 0.42, 0.0], fov: 38 },
          start: 0.4,
          dur: Math.max(1.2, flyStart - 0.4),
        });
      } else if (t < tunnel - 0.4) {
        kit.fly(camera, t, {
          from: { pos: [-0.05, 3.05, 6.2], look: [0.1, 0.42, 0.0], fov: 38 },
          to: cellPose,
          start: flyStart,
          dur: Math.max(1.2, tunnel - 0.5 - flyStart),
          ease: "stop",
          arc: 0.45,
        });
      } else {
        kit.push(camera, t, { ...cellPose, amount: 0.45, start: tunnel - 0.4, dur: 2.8 });
      }
    },
  };
}
