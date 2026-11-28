// w1a: Unexpected truth (dusk) — Conventional electric heater generates heat 1:1 from electricity (#FCD53E),
// whereas heat pump uses electricity (#FCD53E) to move existing outdoor heat (#F08A4B) indoors.
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("home", homeWorld);
  const startPose = { pos: [-1.30, 2.25, 9.60], look: [-1.30, 1.45, 0.15], fov: 40 };
  const camera = kit.camera(startPose);

  const surprise = kit.beat("surprise");
  const moveHeat = kit.beat("move_heat");

  // Conventional electric resistance heater on the left at dusk
  const heater = new THREE.Group();
  heater.position.set(-4.35, 0, 0.35);
  const bodyMat = kit.toon("#8D92A6");
  const darkMat = kit.toon("#3A3B4A");
  const elemMat = kit.toon("#F08A4B", { emissive: "#F08A4B" });
  const elecMat = kit.toon("#FCD53E", { emissive: "#B59112" });

  const base = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.14, 0.78), darkMat);
  base.position.y = 0.07;
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.55, 0.60), bodyMat);
  chassis.position.y = 0.90;
  const grill = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.92, 0.08), darkMat);
  grill.position.set(0, 0.96, 0.30);
  for (let i = 0; i < 3; i++) {
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.78, 8), elemMat);
    bar.rotation.z = Math.PI / 2;
    bar.position.set(0, 0.72 + i * 0.24, 0.35);
    heater.add(bar);
  }
  const plugCord = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.62, 0.25, 0),
    new THREE.Vector3(-1.15, 0.08, 0.25),
    new THREE.Vector3(-1.55, 0.08, 0.10),
  ]);
  const cord = new THREE.Mesh(new THREE.TubeGeometry(plugCord, 12, 0.04, 6, false), elecMat);
  heater.add(base, chassis, grill, cord);
  kit.ink(heater);

  // Left: electric work (#FCD53E) directly generating heat (#F08A4B)
  const heaterElec = kit.beads(
    [[-5.85, 0.12, 0.15], [-5.25, 0.18, 0.25], [-4.65, 0.45, 0.30]],
    { distance: 9.0, color: "#FCD53E", glow: "#FFF6C8", start: 0.4, onTop: true }
  );
  const heaterOut = kit.beads(
    [[-4.35, 1.05, 0.45], [-4.35, 1.45, 0.75], [-4.35, 1.95, 0.90]],
    { distance: 9.0, color: "#F08A4B", glow: "#FCD53E", start: 0.6, onTop: true }
  );

  // Right: heat pump uses small electrical input (#FCD53E) to move abundant outdoor heat (#F08A4B) indoors
  const hpElec = kit.beads(
    [[-2.55, 0.16, 0.45], [-1.95, 0.25, 0.35], [-1.45, 0.45, 0.20]],
    { distance: 9.0, color: "#FCD53E", glow: "#FFF6C8", start: 0.5, onTop: true }
  );
  const hpMove = kit.beads(
    [[-2.80, 1.05, 0.20], [-1.55, 0.95, 0.10], [-0.20, 1.35, 0.0], [1.35, 1.75, 0.15], [1.65, 1.10, 0.35]],
    { distance: 9.0, color: "#F08A4B", glow: "#FCD53E", start: 0.5, onTop: true }
  );

  kit.group.add(heater, heaterElec.group, heaterOut.group, hpElec.group, hpMove.group);

  kit.label({ text: "SỰ THẬT BẤT NGỜ", at: surprise, hold: 2.0, y: 460 });
  kit.card({
    title: "SO SÁNH CƠ CHẾ",
    body: "TỰ TẠO NHIỆT vs DI CHUYỂN NHIỆT",
    at: moveHeat,
    hold: 2.4,
    y: 430,
    width: 700,
  });

  return {
    scene: world.scene,
    camera,
    hero: [heater, world.hp.group],
    update(t) {
      world.set(t, {
        hpCutaway: 1,
        hpActive: 1,
        hpHeatFlow: 1,
        roomCutaway: 1,
        roomWarmth: 0.85,
        outCoilMode: "induced",
        inCoilMode: "ac",
      });

      kit.push(camera, t, { ...startPose, amount: 1.25, start: moveHeat, dur: 4.2 });
      heaterElec.update(t);
      heaterOut.update(t);
      hpElec.update(t);
      hpMove.update(t);
    },
  };
}
