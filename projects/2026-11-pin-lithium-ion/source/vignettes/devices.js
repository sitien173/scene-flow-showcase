// Vignette 16 (devices, sentences 39-40): commercial launch 1991; battery-cell slides neatly
// into a thin smartphone and sleek laptop on the stage.
// Exports appsWorld(kit) shared with grid.
import { smartphone } from "./smartphone/smartphone.js";
import { batteryCell } from "./battery-cell/battery-cell.js";

export function appsWorld(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ yard: 13, clear: 6, seed: 37 });

  // Zone A (x = 0): 1991 thin devices desk
  const desk = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.14, 2.4), kit.toon("#D6D2C7"));
  desk.position.set(0, 0.07, 0);
  kit.ink(desk);
  scene.add(desk);

  const phone = smartphone(kit, { screenMode: "applePay" });
  phone.group.position.set(-0.95, 0.72, 0.32);
  phone.group.rotation.x = Math.PI / 2 - 0.15;
  phone.group.rotation.z = -0.18;
  phone.group.scale.setScalar(1.15);
  scene.add(phone.group);

  // Sleek geometric toon3d laptop at x = +0.70
  const laptop = new THREE.Group();
  laptop.position.set(0.70, 0.14, -0.05);
  laptop.rotation.y = -0.25;
  const lBase = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.07, 1.05), kit.toon("#B4BCCB"));
  lBase.position.y = 0.035;
  const lidPivot = new THREE.Group();
  lidPivot.position.set(0, 0.07, -0.50);
  lidPivot.rotation.x = -0.24;
  const lScreenBack = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.96, 0.05), kit.toon("#4C536B"));
  lScreenBack.position.set(0, 0.48, 0);
  const screenTex = kit.canvasTexture(192, 128, (g, w, h) => {
    g.fillStyle = "#1E2433";
    g.fillRect(0, 0, w, h);
    g.fillStyle = "#2D884E";
    g.fillRect(16, 20, 68, 86);
    g.fillStyle = "#FCD53E";
    g.fillRect(96, 20, 80, 42);
    g.fillStyle = "#FAFCFB";
    g.fillRect(96, 74, 80, 32);
  });
  const lScreen = new THREE.Mesh(new THREE.BoxGeometry(1.40, 0.82, 0.02), kit.toon("#FFFFFF", { map: screenTex }));
  lScreen.position.set(0, 0.48, 0.03);
  lidPivot.add(lScreenBack, lScreen);
  laptop.add(lBase, lidPivot);
  kit.ink(laptop);
  scene.add(laptop);

  const laptopAnchor = new THREE.Object3D();
  laptopAnchor.position.set(0.70, 1.10, -0.05);
  scene.add(laptopAnchor);

  const insertCell = batteryCell(kit);
  insertCell.group.scale.setScalar(0.85);
  insertCell.group.position.set(-0.95, 0.72, 0.35);
  scene.add(insertCell.group);

  // Zone B (x = 5.2): EV + solar + wind turbine clean-energy grid (for grid vignette)
  const gridRoot = new THREE.Group();
  gridRoot.position.set(5.2, 0, 0);
  scene.add(gridRoot);

  // Road strip for EV
  const road = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.04, 1.5), kit.toon("#40496E"));
  road.position.set(0, 0.02, 1.15);
  gridRoot.add(road);

  // Modular battery pack stack feeding the grid
  const packGroup = new THREE.Group();
  packGroup.position.set(-1.35, 0.04, -0.45);
  const packCells = [0, 0.24, 0.48].map(py => {
    const bc = batteryCell(kit);
    bc.group.scale.setScalar(0.85);
    bc.group.position.set(0, py, 0);
    packGroup.add(bc.group);
    return bc;
  });
  gridRoot.add(packGroup);

  // Geometric toon3d Electric Vehicle
  const evGroup = new THREE.Group();
  evGroup.position.set(0.45, 0.04, 1.15);
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.42, 0.82), kit.toon("#14B8A6"));
  chassis.position.y = 0.36;
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.34, 0.74), kit.toon("#FAFCFB"));
  cabin.position.set(0.05, 0.72, 0);
  const wheelMat = kit.toon("#2B2D38");
  for (const wx of [-0.48, 0.48]) {
    for (const wz of [-0.42, 0.42]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 14), wheelMat);
      w.rotation.x = Math.PI / 2;
      w.position.set(wx, 0.18, wz);
      evGroup.add(w);
    }
  }
  evGroup.add(chassis, cabin);
  kit.ink(evGroup);
  gridRoot.add(evGroup);

  const evAnchor = new THREE.Object3D();
  evAnchor.position.set(0, 0.95, 0);
  evGroup.add(evAnchor);

  // Solar panel + wind turbine storage station
  const renewGroup = new THREE.Group();
  renewGroup.position.set(1.15, 0, -0.75);
  const panelStand = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.55, 8), kit.toon("#4C536B"));
  panelStand.position.set(-0.55, 0.275, 0.25);
  const solarPanel = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.06, 0.65), kit.toon("#3B5C9E"));
  solarPanel.position.set(-0.55, 0.58, 0.25);
  solarPanel.rotation.x = 0.42;

  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 2.05, 10), kit.toon("#FAFCFB"));
  tower.position.set(0.35, 1.025, -0.15);
  const hub = new THREE.Group();
  hub.position.set(0.35, 2.02, -0.02);
  const hubCone = new THREE.Mesh(new THREE.SphereGeometry(0.10, 10, 8), kit.toon("#4C536B"));
  hub.add(hubCone);
  for (let i = 0; i < 3; i++) {
    const bPivot = new THREE.Group();
    bPivot.rotation.z = (i * Math.PI * 2) / 3;
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.88, 0.03), kit.toon("#FAFCFB"));
    blade.position.y = 0.48;
    bPivot.add(blade);
    hub.add(bPivot);
  }
  renewGroup.add(panelStand, solarPanel, tower, hub);
  kit.ink(renewGroup);
  gridRoot.add(renewGroup);

  const renewAnchor = new THREE.Object3D();
  renewAnchor.position.set(0.35, 2.15, -0.02);
  renewGroup.add(renewAnchor);

  return {
    scene,
    phone,
    laptop,
    laptopAnchor,
    insertCell,
    packCells,
    evGroup,
    evAnchor,
    hub,
    renewAnchor,
    gridRoot,
  };
}

export async function build(kit) {
  const world = await kit.world("apps", appsWorld);
  const startPose = { pos: [0.25, 1.75, 7.4], look: [0.05, 0.85, 0], fov: 42 };
  const camera = kit.camera(startPose);
  const year1991 = kit.beat("year1991");
  const thin = kit.beat("thin");
  kit.bigText({ text: "1991", at: year1991, hold: 3.4, y: 540 });
  kit.callout({ text: "MỎNG NHẸ", anchor: world.laptopAnchor, at: thin, hold: 1.1 });

  return {
    scene: world.scene,
    camera,
    hero: [world.phone.group, world.laptop],
    update(t) {
      // Slide battery-cell into the phone/laptop bay
      const slide = kit.ease(kit.progress(t, 0.9, 1.4), "inOut");
      world.insertCell.group.visible = slide < 0.95;
      world.insertCell.group.position.set(kit.lerp(0.0, -0.92, slide), kit.lerp(1.45, 0.72, slide), kit.lerp(0.95, 0.35, slide));
      world.insertCell.group.scale.setScalar(kit.lerp(0.85, 0.38, slide));
      world.insertCell.update(t, { charge: 0.92, dcOut: 0.9, full: 1 });

      const lit = t >= year1991 ? 1 : 0.2;
      world.phone.update(t, { cardPulse: lit, coilGlow: lit });

      kit.push(camera, t, { ...startPose, amount: -1.4, start: year1991, dur: 4.2, ease: "drift" });
    },
  };
}
