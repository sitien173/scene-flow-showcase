// c1b: Quick electric heater contrast, then 3D shell cutaway (cutaway: 0 -> 1) revealing coils & internals.
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("home", homeWorld);
  const fromPose = { pos: [-0.2, 2.2, 8.2], look: [0.0, 1.35, 0.0], fov: 38 };
  const toPose = { pos: [0.45, 2.0, 7.6], look: [0.1, 1.35, 0.0], fov: 38 };
  const camera = kit.camera(fromPose);

  const save = kit.beat("save");
  const slice = kit.beat("slice");

  // Compact conventional electric resistance heater prop on the left for quick saving comparison
  const heater = new THREE.Group();
  heater.position.set(-3.3, 0, 0.4);
  const bodyMat = kit.toon("#8D92A6");
  const grilleMat = kit.toon("#3A3B4A");
  const glowMat = kit.toon("#F08A4B", { emissive: "#F08A4B" });
  const cordMat = kit.toon("#FCD53E");
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.05, 0.42), bodyMat);
  box.position.y = 0.56;
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.08, 0.56), grilleMat);
  base.position.y = 0.04;
  const face = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.62, 0.06), grilleMat);
  face.position.set(0, 0.62, 0.21);
  const bar1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.52, 8), glowMat);
  bar1.rotation.z = Math.PI / 2;
  bar1.position.set(0, 0.74, 0.25);
  const bar2 = bar1.clone();
  bar2.position.y = 0.52;
  const cordCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.42, 0.12, 0),
    new THREE.Vector3(-0.78, 0.06, 0.2),
    new THREE.Vector3(-1.05, 0.06, 0.1),
  ]);
  const cord = new THREE.Mesh(new THREE.TubeGeometry(cordCurve, 12, 0.03, 6, false), cordMat);
  heater.add(box, base, face, bar1, bar2, cord);
  kit.ink(heater);
  kit.group.add(heater);

  kit.card({ title: "MÁY BƠM NHIỆT", body: "TIẾT KIỆM ĐIỆN HƠN MÁY SƯỞI", at: save, hold: 1.8, y: 440, width: 640 });
  kit.label({ text: "CẮT LỚP 3D", at: slice, hold: 2.2, y: 1100 });

  return {
    scene: world.scene,
    camera,
    hero: [world.hp.group, world.outCoil.group, world.inCoil.group],
    update(t) {
      const cut = kit.ease(kit.progress(t, slice, 1.15), "inOut");
      const heaterShow = 1 - kit.ease(kit.progress(t, slice - 0.3, 0.6), "inOut");
      heater.visible = heaterShow > 0.03;
      heater.scale.setScalar(Math.max(0.01, heaterShow));

      world.set(t, {
        hpCutaway: cut,
        hpActive: 0.25 + 0.75 * cut,
        hpHeatFlow: 0.3 + 0.7 * cut,
        roomCutaway: 1,
        roomWarmth: 0.75,
        fanSpeed: 1.0 + 0.4 * cut,
        outCoilMode: cut > 0.2 ? "induced" : "idle",
        outCoilIntensity: cut,
        inCoilMode: cut > 0.2 ? "ac" : "idle",
        inCoilIntensity: cut,
      });

      kit.drift(camera, t, { from: fromPose, to: toPose, start: slice, dur: 3.2 });
    },
  };
}
