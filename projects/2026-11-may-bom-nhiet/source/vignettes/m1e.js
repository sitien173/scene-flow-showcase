// m1e: Mechanism step 3 — Hot high-pressure gas (#DD3428) enters indoor condenser coil,
// radiates heat energy (#F08A4B) to warm the room, and condenses back into warm liquid (#DD3428).
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("home", homeWorld);
  const camera = kit.camera({ pos: [1.35, 2.05, 4.75], look: [1.25, 1.55, 0.0], fov: 40 });

  const condenser = kit.beat("condenser");
  const radiate = kit.beat("radiate");
  const warmRoom = kit.beat("warm_room");
  const liquid = kit.beat("liquid");

  // Hot gas (#DD3428) flowing through the indoor solenoid copper coil
  const hotInCoil = kit.beads(world.inCoil.path("coil"), {
    distance: 4.5,
    color: "#DD3428",
    glow: "#FF9F8F",
    start: 0.3,
    onTop: true,
  });

  // Heat energy streams (#F08A4B) radiating from indoor unit into the living room
  const warmFlowA = kit.beads(
    [[1.35, 1.85, 0.18], [1.35, 1.55, 0.45], [1.10, 1.15, 0.65], [0.75, 0.72, 0.45]],
    { distance: 4.5, color: "#F08A4B", glow: "#FCD53E", start: radiate - 0.5, onTop: true }
  );
  const warmFlowB = kit.beads(
    [[1.65, 1.85, 0.18], [1.95, 1.45, 0.45], [2.05, 1.00, 0.35], [1.45, 0.70, 0.25]],
    { distance: 4.5, color: "#F08A4B", glow: "#FCD53E", start: radiate - 0.2, onTop: true }
  );

  // Condensing warm liquid droplets (#DD3428) forming at the condenser outlet
  const dropGroup = new THREE.Group();
  const dropMat = kit.toon("#DD3428", { emissive: "#7A1812" });
  const drops = [];
  for (let i = 0; i < 5; i++) {
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), dropMat);
    dropGroup.add(d);
    drops.push(d);
  }
  kit.ink(dropGroup, { width: 1.8, shadows: false });

  kit.group.add(hotInCoil.group, warmFlowA.group, warmFlowB.group, dropGroup);

  kit.callout({ text: "DÀN NGƯNG TỤ", anchor: world.inCoil.anchors.center, at: condenser, hold: 2.2 });
  kit.callout({ text: "SƯỞI ẤM PHÒNG", anchor: world.room.anchors.room, at: warmRoom, hold: 2.4 });
  kit.label({ text: "KHÍ → CHẤT LỎNG", at: liquid, hold: 1.2, y: 480 });

  return {
    scene: world.scene,
    camera,
    hero: [world.inCoil.group, world.hp.group, world.room.group],
    update(t) {
      const warmAmt = kit.ease(kit.progress(t, radiate - 0.5, 4.5), "inOut");
      const liqAmt = kit.ease(kit.progress(t, liquid - 2.0, 2.0), "inOut");

      world.set(t, {
        hpCutaway: 1,
        hpActive: 1,
        hpHeatFlow: 0.45 + 0.55 * warmAmt,
        roomCutaway: 1,
        roomWarmth: 0.25 + 0.75 * warmAmt,
        roomSeason: "winter",
        fanSpeed: 1.35,
        outCoilMode: "induced",
        inCoilMode: "ac",
        inCoilIntensity: 0.9,
      });

      kit.orbit(camera, t, {
        center: [1.25, 1.50, 0.0],
        radius: 4.85,
        height: 0.50,
        angle: -0.05,
        speed: 0.016,
        fov: 40,
      });

      hotInCoil.update(t);
      warmFlowA.update(t);
      warmFlowB.update(t);

      drops.forEach((d, i) => {
        d.visible = liqAmt > 0.05;
        if (!d.visible) return;
        const u = ((t * 0.75 + i / drops.length) % 1 + 1) % 1;
        d.position.set(0.68 - u * 0.14, 1.85 - u * 0.55, 0.16);
        d.scale.setScalar((0.5 + 0.5 * Math.sin(u * Math.PI)) * liqAmt);
      });
    },
  };
}
