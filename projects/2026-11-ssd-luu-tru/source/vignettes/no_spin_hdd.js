// Vignette 18 (no_spin_hdd): Data moves internally while host address stays fixed;
// unlike HDD with moving read-write actuator arm over platter, SSD needs no platter wait.
// Exports deskOutroWorld(kit) shared with solid_state_payoff.
import { ssdCutaway } from "./ssd-cutaway/ssd-cutaway.js";
import { dataPacket } from "./data-packet/data-packet.js";

export function deskOutroWorld(kit) {
  const scene = kit.stage({ yard: 10, clear: 6, seed: 29 });
  const ssd = ssdCutaway(kit, { mode: "active_circuit" });
  ssd.group.position.set(0, 0, 0);
  scene.add(ssd.group);

  const pkt = dataPacket(kit, { kind: "token", color: "#2D7FF9" });
  pkt.group.scale.setScalar(1.35);
  pkt.group.position.set(0.55, 0.25, 1.05);
  scene.add(pkt.group);

  return { scene, ssd, pkt };
}

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("desk_outro", deskOutroWorld);

  const moved = kit.beat("moved");
  const noWait = kit.beat("no_wait");
  const hddBeat = kit.beat("hdd");

  // Procedural HDD comparison block with a stationary disc (no platter rotation) and a moving mechanical arm
  const hddGroup = new THREE.Group();
  hddGroup.position.set(2.55, 0, 0);
  const hddBody = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.24, 1.55), kit.toon("#555A6C"));
  hddBody.position.set(0, 0.12, 0);
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 0.04, 24), kit.toon("#D6D2C7"));
  disc.position.set(-0.12, 0.26, -0.08);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.07, 14), kit.toon("#353846"));
  hub.position.set(-0.12, 0.28, -0.08);

  const armPivot = new THREE.Group();
  armPivot.position.set(0.62, 0.30, 0.45);
  const armBase = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.08, 12), kit.toon("#353846"));
  const armBar = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.04, 0.78), kit.toon("#DD3428"));
  armBar.position.set(-0.22, 0.03, -0.34);
  armBar.rotation.y = 0.52;
  armPivot.add(armBase, armBar);

  hddGroup.add(hddBody, disc, hub, armPivot);
  kit.ink(hddGroup);
  kit.group.add(hddGroup);

  const hddAnchor = new THREE.Object3D();
  hddAnchor.position.set(2.55, 0.36, 0);
  kit.group.add(hddAnchor);

  const ssdPose = { pos: [0.0, 3.85, 6.75], look: [0.0, 0.58, 0.0], fov: 38 };
  const comparePose = { pos: [1.18, 4.9, 10.6], look: [1.18, 0.45, 0.0], fov: 40 };
  const camera = kit.camera(ssdPose);

  kit.callout({
    text: "ĐỊA CHỈ CŨ",
    anchor: world.pkt.anchors.center,
    at: moved,
    hold: 4.5,
    gap: 220,
  });
  kit.callout({
    text: "ĐẦU ĐỌC CƠ KHÍ",
    anchor: hddAnchor,
    at: hddBeat,
    hold: 3.3,
    gap: 220,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.ssd.group, hddGroup],
    update(t) {
      const hddPop = kit.progress(t, noWait - 0.5, 0.4);
      kit.popIn(hddGroup, t, noWait - 0.5, { dur: 0.4 });
      void hddPop;

      // Only the mechanical actuator arm sweeps back and forth (disc stays stationary)
      armPivot.rotation.y = 0.25 * Math.sin(t * 4.2);

      world.ssd.update(t, {
        mode: "cutaway",
        cutaway: 1.0,
        power: 1,
        circuit: 0.65,
        nandGlow: 0.9,
        ctrlGlow: 0.8,
        hostGlow: 0.7,
      });
      world.pkt.group.visible = true;
      world.pkt.group.position.set(0.55, 0.26, 1.05);
      world.pkt.update(t, { pulse: 0.6, spin: 0 });

      kit.fly(camera, t, {
        from: ssdPose,
        to: comparePose,
        start: noWait - 0.4,
        dur: 1.6,
        ease: "inOut",
      });
    },
  };
}
