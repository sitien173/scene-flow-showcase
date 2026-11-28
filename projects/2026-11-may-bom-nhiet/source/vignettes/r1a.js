// r1a: Analogy with household refrigerator — fridge pulls heat from inside food to rear,
// whereas heat pump reverses the target to pull outdoor heat into the living room.
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("home", homeWorld);
  const fridgePose = { pos: [-3.4, 2.15, 7.6], look: [-3.5, 1.35, 0.2], fov: 40 };
  const hpPose = { pos: [0.0, 2.25, 8.8], look: [0.0, 1.35, 0.0], fov: 40 };
  const camera = kit.camera(fridgePose);

  const tuLanh = kit.beat("tu_lanh");
  const pushOut = kit.beat("push_out");
  const reverse = kit.beat("reverse");
  const pullIn = kit.beat("pull_in");

  // Procedural toon3d cutaway refrigerator placed cleanly to the left of the outdoor pad
  const fridge = new THREE.Group();
  fridge.position.set(-4.35, 0, 0.35);
  const shellMat = kit.toon("#FAFCFB");
  const innerMat = kit.toon("#D6ECF7");
  const trimMat = kit.toon("#5B5E70");
  const foodMat = kit.toon("#9BD06B");
  const bowlMat = kit.toon("#E8C8A8");

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.35, 2.35, 1.05), shellMat);
  body.position.set(0, 1.18, -0.10);
  const cavity = new THREE.Mesh(new THREE.BoxGeometry(1.08, 1.45, 0.72), innerMat);
  cavity.position.set(0, 1.02, 0.14);
  const freezer = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.48, 0.72), innerMat);
  freezer.position.set(0, 2.04, 0.14);
  const shelf = new THREE.Mesh(new THREE.BoxGeometry(1.04, 0.05, 0.66), trimMat);
  shelf.position.set(0, 1.05, 0.14);
  const apple = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), foodMat);
  apple.position.set(-0.22, 1.22, 0.18);
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.14, 0.16, 10), bowlMat);
  bowl.position.set(0.22, 1.16, 0.18);
  const door = new THREE.Mesh(new THREE.BoxGeometry(1.30, 2.28, 0.08), shellMat);
  door.position.set(-1.12, 1.18, 0.78);
  door.rotation.y = 0.75;
  const backCoil = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.65, 0.08), trimMat);
  backCoil.position.set(0, 1.25, -0.68);

  fridge.add(body, cavity, freezer, shelf, apple, bowl, door, backCoil);
  kit.ink(fridge);

  const fridgeAnchor = new THREE.Object3D();
  fridgeAnchor.position.set(-4.35, 2.35, 0.25);

  // Heat beads leaving food inside fridge out toward its rear condenser (sentences 5-6)
  const fridgeHeatOut = kit.beads(
    [[-4.35, 1.22, 0.25], [-4.35, 1.30, -0.25], [-4.35, 1.42, -0.78], [-4.35, 1.75, -1.25]],
    { distance: 7.8, color: "#F08A4B", glow: "#FCD53E", start: pushOut - 0.8, end: reverse + 0.3, onTop: true }
  );

  // Reversed target: heat beads pulled from outdoor air into the indoor room (sentences 7-8)
  const hpHeatIn = kit.beads(
    [[-2.8, 1.1, 0.25], [-1.55, 0.95, 0.15], [-0.2, 1.35, 0.05], [1.35, 1.75, 0.15], [1.65, 1.15, 0.35]],
    { distance: 8.8, color: "#F08A4B", glow: "#FCD53E", start: reverse - 0.3, onTop: true }
  );

  kit.group.add(fridge, fridgeAnchor, fridgeHeatOut.group, hpHeatIn.group);

  kit.callout({ text: "TỦ LẠNH ĐẨY NHIỆT", anchor: fridgeAnchor, at: tuLanh, hold: 2.4 });
  kit.callout({ text: "ĐẢO NGƯỢC CHIỀU", anchor: world.hp.anchors.shell, at: reverse, hold: 2.0 });
  kit.bigText({ text: "NGOÀI → VÀO TRONG", at: pullIn, hold: 2.0, y: 1080, size: 92 });

  return {
    scene: world.scene,
    camera,
    hero: [fridge, world.hp.group],
    update(t) {
      const revAmt = kit.ease(kit.progress(t, reverse - 0.5, 1.5), "inOut");
      world.set(t, {
        hpCutaway: 1,
        hpActive: 1,
        hpHeatFlow: 0.35 + 0.65 * revAmt,
        roomCutaway: 1,
        roomWarmth: 0.45 + 0.45 * revAmt,
        outCoilMode: "induced",
        inCoilMode: revAmt > 0.2 ? "ac" : "idle",
        inCoilIntensity: revAmt,
      });

      kit.fly(camera, t, { from: fridgePose, to: hpPose, start: reverse - 0.5, dur: 1.5, ease: "inOut" });
      fridgeHeatOut.update(t);
      hpHeatIn.update(t);
    },
  };
}
